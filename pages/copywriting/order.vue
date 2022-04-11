<template>
  <ContainerSimple
    title="Let’s write something"
  >
    <!-- Cart, displayed as a table with total words and total price. Disabled if order is in progress -->
    <b-row 
      v-if="cart.length > 0 && !orderInProgress"
      class="mt-2" 
    >
      <b-col>
        <b-table
          :fields="['name', 'words', 'quantity', 'price']"
          :items="cart"
          class="table-sm"
          foot-clone
        >

          <!-- Show quantity as a numeric input -->
          <template #cell(quantity)="{ item }">
            <b-form-input
              v-model="item.quantity"
              type="number"
              min="1"
              @input="recountItem(item, { quantity:  $event })"
              style="width: 4em;"
            />
          </template>

          <!-- Show words per piece as a numeric input with a step of 50 and a minimum of 50 -->
          <template #cell(words)="{ item }">
            <b-form-input
              v-model="item.words"
              type="number"
              min="50"
              step="50"
              @input="recountItem(item, { words:  $event })"
              style="width: 6em;"
            />
          </template>

          <!-- Show price as dollars -->
          <template #cell(price)="{ item }">
            ${{ getItemPrice(item) }}
            <span class="close float-end" @click="removeItem(item)"
              style="cursor: pointer;"
            >&times;</span>
          </template>

          <!-- Show words header as "Words per item" -->
          <template #head(words)>
            Words per item
          </template>

          <!-- Totals in the footer -->
          <template #foot(name)>
            TOTAL
          </template>

          <template #foot(words)>
            {{ sumBy(cart, ({ words, quantity }) => words * quantity) }} words
          </template>

          <template #foot(quantity)>
            {{ sumBy(cart, 'quantity') }} items
          </template>

          <template #foot(price)>
            <!-- If total price is not equal to the sum of the prices of the items in the cart, show the base price striked through and not bold, and the discounted price in bold -->
            <template
              v-if="totalPrice !== sumBy(cart, getItemPrice)"
            >
              <div class="text-end">
                <span
                  class="text-muted"
                  style="text-decoration: line-through; font-weight: normal;"
                >
                  ${{ sumBy(cart, getItemPrice) }}
                </span>
                <span class="h2 text-success">
                  ${{ totalPrice }}
                </span>
              </div>
              <!-- Also show the discount in percentage like "20% off!" -->
              <div style="font-weight: normal;" class="text-end">
                ${{ discount }} off!
              </div>
            </template>
            <!-- Otherwise, show the total price in bold -->
            <span
              v-else
              class="h2"
            >
              ${{ totalPrice }}
            </span>
            
          </template>

          <template #foot()>
            <span/>
          </template>
        </b-table>

        <!-- Text area with comments, only shown if addComments is true -->
        <b-form-textarea
          ref="comments"
          v-if="addComments"
          v-model="comments"
          placeholder="Enter any information that you think might be helpful"
          rows="3"
          class="mb-2"
        />

        <div class="text-end">
          <!-- Muted text, if clicked, sets addComments to true and focuses the text area on the $nextTick -->
          <span
            v-if="!addComments"
            class="text-muted small"
            @click="addComments = true; $nextTick(() => $refs.comments.focus())"
            style="cursor: pointer;"
            v-text="'Add comments'"
          />

          <!-- Email input -->
          <b-input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="ms-2 w-25 d-inline"
            size="sm"
          />

          <!-- Button to place order; disabled if email is not valid -->
          <b-button
            :disabled="!isEmailValid"
            variant="success"
            class="ms-2"
            @click="placeOrder"
          >
            Place order
          </b-button>

          <b-button
            variant="outline-danger"
            class="ms-2"
            @click="clearCartAfterConfirmation"
          >
            Clear cart
          </b-button>
        </div>

      </b-col>
    </b-row>

    <!-- Order status: if order is in progress, show a spinner, otherwise show the order status in either green or red -->
    <b-row
      v-if="orderInProgress"
      class="mt-2"
    >
      <b-col>
        <b-spinner
          variant="primary"
          animation="grow"
          size="sm"
          class="mr-2"
        />
        <span>
          Placing order...
        </span>
      </b-col>
    </b-row>
    <b-row
      v-else
      class="mt-2"
    >
      <b-col>
        <b-alert
          :show="orderStatus === 'success'"
          variant="success"
          dismissible
          @dismissed="orderStatus = ''"
        >
          Order placed! I will get back to you soon.
        </b-alert>
        <b-alert
          :show="orderStatus === 'error'"
          variant="danger"
          dismissible
          @dismissed="orderStatus = ''"
        >
          Something went wrong. Please contact me at <a :href="'mailto:'+vovasEmail">{{ vovasEmail }}</a>.
          Here’s your order content to copy and paste:
          <textarea
            class="form-control"
            rows="10"
            readonly
            v-model="orderContent"
          />

          <!-- Copy to clipboard link -->
          <span
            class="text-muted"
            @click="$copyText(orderContent); copiedToClipboard = true"
            style="cursor: pointer;"
            v-text="copiedToClipboard ? 'Copied!' : 'Copy to clipboard'"
          />

        </b-alert>
      </b-col>
    </b-row>
    
    <!-- Available content types -->
    <b-row class="mt-2" cols="1" cols-md="2">
      <b-col
        v-for="contentType in contentTypes"
        :key="contentType.name"
      >
        <ContentCard
          v-bind="{ contentType, totalWords }"
          v-on="{ addToCart }"
          :size.sync="contentType.size"
          :customWords.sync="contentType.customWords"
        />
      </b-col>
    </b-row>


  </ContainerSimple>
</template>

<script>

  import {
    without, sumBy, mapValues
  } from 'lodash'

  import axios from 'axios'

  import copyPrice from '@/plugins/copyPrice'
  import contentTypes from '@/plugins/contentTypes'

  export default {

    mixins: [
      copyPrice,
      contentTypes
    ],

    data() {

      return {
        cart: [],
        orderInProgress: false,
        orderStatus: null,
        copiedToClipboard: false,
        email: '',
        comments: '',
        addComments: false,
      }
    },

    mounted() {
      // Load cart and email from localStorage and update localstorage if it's changed
      ['cart', 'email']
        .forEach(key => {
          if (localStorage.getItem(key)) {
            this[key] = JSON.parse(localStorage.getItem(key))
          }

          this.$watch(key, { deep: true, handler: value => {
            localStorage.setItem(key, JSON.stringify(value))
          }})
        })
    },

    computed: {

      totalWords() {
        return sumBy(this.cart, ({ words, quantity }) => words * quantity)
      },

      totalPrice() {
        return this.copyPrice(this.totalWords)
      },

      discount() {
        return sumBy(this.cart, this.getItemPrice) - this.totalPrice
      },

      vovasEmail() {
        return process.env.vovasEmail
      },

      orderContent() {
        let content = this.cart.map(({ name, words, quantity }) => {
          return `${quantity} × ${name} (${words} words${ quantity > 1 ? ' each' : '' })`
        }).join('\n')
        // Include total word count & total price
        content += `\n\nTotal words: ${this.totalWords}\nTotal price: $${this.totalPrice}`
        return content
      },

      isEmailValid() {
        return this.email?.match(/^[^@]+@[^@]+\.[^@]+$/)
      },

    },

    methods: {

      addToCart(contentType) {

        let {
          name,
          size,
          wordsBySize,
          customWords
        } = contentType

        let words = customWords || wordsBySize[size]
        
        // Count the number of items with the same name and number of words in cart
        let quantity = sumBy(
          this.cart.filter(item => {
            return item.name === name && item.words === words
          }),
          'quantity'
        ) || 0

        // if quantity is 0, add to cart, else increment quantity and update price
        if (quantity === 0) {
          this.cart.push({
            name,
            words,
            quantity: 1
          })
        } else {
          let item = this.cart.find(item => {
            return item.name === name && item.words === words
          })
          item.quantity++
        }

      },

      clearCart() {
        this.cart = []
      },

      clearCartAfterConfirmation() {
        if (confirm('Are you sure you want to clear your cart? This cannot be undone!')) {
          this.clearCart()
        }
      },

      recountItem(item, changes) {
        // if quantity is zero, remove from cart
        if (changes.quantity === 0) {
          this.cart = without(this.cart, item)
        } else {
          // Convert each change to a numeric value
          changes = mapValues(changes, Number)

          Object.assign(item, changes)
        }
      },

      removeItem(item) {
        this.cart = without(this.cart, item)
      },

      async placeOrder() {

        if (this.orderInProgress)
          return
        else
          this.orderInProgress = true

        try {

          let { totalWords, totalPrice, orderContent, email } = this

          // title is email excluding @... / number of words
          let title = `${email.replace(/@.*/, '')} / ${totalWords} words`

          // Send request to notion 
          let {
            data: { url }
          } = await axios.post(process.env.notionApiUrl + 'pages', {
            parent: {
              database_id: process.env.ordersDatabaseId
            },
            properties: {
              Name: {
                title: [{
                  text: {
                    content: title
                  }
                }]
              },
              Words: {
                number: totalWords
              },
              Price: {
                number: totalPrice
              },
              Email: {
                rich_text: [{
                  text: {
                    content: email
                  }
                }]
              },
              Comments: {
                rich_text: [{
                  text: {
                    content: this.comments
                  }
                }]
              },
              Content: {
                rich_text: [{
                  text: {
                    content: orderContent
                  }
                }]
              }
            }
          })

          // Send email to Vova via Bubble's sendEmailToVova post endpoint (body parameters are email, subject, and emailCopy)
          axios.post(process.env.bubbleApiUrl + 'sendEmailToVova', {
            email: process.env.vovasEmail,
            subject: `⚠️ ${title}`,

            // content plus url in the copy
            emailCopy: `${orderContent}\n\n${url}`
          })

          this.orderStatus = 'success'

          // clear cart
          this.clearCart()

        } catch (error) {

          console.error(error)
          this.orderStatus = 'error'

        } finally {
          this.orderInProgress = false
        }

      },

      getItemPrice({ words, quantity }) {
        return this.copyPrice(words) * quantity
      },

      sumBy
        
    },

  }

</script>

<style>

</style>