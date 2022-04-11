<template>
  <ContainerSimple
    title="Let’s write something"
  >
    <!-- Cart, displayed as a table with total words and total price. Disabled if order is in progress -->
    <b-row 
      v-if="cart.length > 0"
      :disabled="orderInProgress"
      class="mt-2" 
    >
      <b-col>
        <b-table
          :items="cart"
          class="table-sm"
          foot-clone
        >

          <!-- Show quantity as a numeric input -->
          <template #cell(quantity)="{ item }">
            <b-form-input
              v-model="item.quantity"
              type="number"
              min="0"
              @input="recountItem(item, { quantity:  $event })"
              style="width: 4em;"
            />

            <!-- Also show a button to remove the item from the cart -->
            <b-button
              size="sm"
              class="inline-block"
              variant="outline-danger"
              @click="removeItem(item)"
            >
              Remove
            </b-button>
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
            ${{ item.price }}
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
              v-if="totalPrice !== sumBy(cart, 'price')"
            >
              <div class="text-end">
                <span
                  class="text-muted"
                  style="text-decoration: line-through; font-weight: normal;"
                >
                  ${{ sumBy(cart, 'price') }}
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

        <!-- Buttons to place order and clear cart -->
        <b-button
          v-for="(action, index) in [
            {
              name: 'Place order',
              variant: 'success',
              method: placeOrder
            },
            {
              name: 'Clear cart',
              variant: 'outline-danger',
              method: clearCart
            }
          ]"
          :key="index"
          :variant="action.variant"
          class="float-end ms-2"
          v-on="{ click: action.method }"
        >
          {{ action.name }}
        </b-button>

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
          Order placed!
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
      }
    },

    computed: {

      totalWords() {
        return sumBy(this.cart, ({ words, quantity }) => words * quantity)
      },

      totalPrice() {
        return this.copyPrice(this.totalWords)
      },

      discount() {
        return sumBy(this.cart, 'price') - this.totalPrice
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
      }

    },

    methods: {

      addToCart(contentType) {

        let {
          name,
          size,
          wordsBySize
        } = contentType

        let words = wordsBySize[size]
        let price = this.copyPrice(words)
        
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
            quantity: 1,
            price,
          })
        } else {
          let item = this.cart.find(item => {
            return item.name === name && item.words === words
          })
          item.quantity++
          item.price = price*item.quantity
        }

      },

      clearCart() {
        this.cart = []
      },

      recountItem(item, changes) {
        // if quantity is zero, remove from cart
        if (changes.quantity === 0) {
          this.cart = without(this.cart, item)
        } else {
          // Convert each change to a numeric value
          changes = mapValues(changes, Number)

          Object.assign(item, changes)
          console.log(item)
          item.price = this.copyPrice(item.words) * item.quantity
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

          let { totalWords, totalPrice, orderContent } = this
          let title = `${new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short' })} (${totalWords} words)`

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
            }, children: [{
              object: 'block',
              type: 'paragraph',
              paragraph: {
                rich_text: [{
                  text: { content: orderContent }
                }]
              }
            }]
          })

          // Send email to Vova via Bubble's sendEmailToVova post endpoint (body parameters are email, subject, and emailCopy)
          axios.post(process.env.bubbleApiUrl + 'sendEmailToVova', {
            email: process.env.vovasEmail,
            subject: `New order: ${title}`,

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

      sumBy
        
    },

  }

</script>

<style>

</style>