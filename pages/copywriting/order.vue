<template>
  <ContainerSimple
    title="Let’s write something"
  >
    <!-- Cart, displayed as a table with total words and total price -->
    <b-row class="mt-2" v-if="cart.length > 0">
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
              @change="recountItem(item, parseInt($event))"
            />
          </template>


          <!-- Totals in the footer -->
          <template #foot(name)>
            TOTAL
          </template>
          <template #foot(words)>
            {{ sumBy(cart, 'words') }} words
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

        <!-- Button to clear cart -->
        <b-button
          variant="outline-danger"
          class="float-end"
          @click="clearCart"
        >
          Clear cart
        </b-button>

      </b-col>
    </b-row>
    
    <!-- Available content types -->
    <b-row class="mt-2" cols="1" cols-md="2">
      <b-col
        v-for="contentType in contentTypes"
        :key="contentType.name"
      >
        <ContentCard
          v-bind="{ contentType, currentTotalWords }"
          v-on="{ addToCart }"
          :size.sync="contentType.size"
        />
      </b-col>
    </b-row>


  </ContainerSimple>
</template>

<script>

  import {
    without, sumBy
  } from 'lodash'

  import copyPrice from '@/plugins/copyPrice'
  import contentTypes from '@/plugins/contentTypes'

  export default {

    mixins: [
      copyPrice,
      contentTypes
    ],

    data() {

      return {
        cart: []
      }
    },

    computed: {

      currentTotalWords() {
        return sumBy(this.cart, ({ words, quantity }) => words * quantity)
      },

      totalPrice() {
        return this.copyPrice(this.currentTotalWords)
      },

      discount() {
        return sumBy(this.cart, 'price') - this.totalPrice
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

      recountItem(item, quantity) {
        // if zero, remove from cart
        if (!quantity) {
          this.cart = without(this.cart, item)
        } else {
          item.quantity = quantity
          item.price = this.copyPrice(item.words) * quantity
        }        
      },

      sumBy
        
    },

  }

</script>

<style>

</style>