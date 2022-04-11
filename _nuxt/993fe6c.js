(window.webpackJsonp=window.webpackJsonp||[]).push([[6,2,3],{324:function(t,e,n){"use strict";n.r(e);var r=n(65),component=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",[n("b-row",{staticClass:"mt-2 mt-md-5"},[n("b-col",{attrs:{cols:"12",lg:"8","offset-lg":"2"}},[n("h1",{staticClass:"display-4"},[t._v("\n        "+t._s(t.$attrs.title)+"\n      ")]),t._v(" "),t.$attrs.subtitle?n("h2",{staticClass:"lead mb-4"},[t._v("\n        "+t._s(t.$attrs.subtitle)+"\n      ")]):t._e(),t._v(" "),t._t("default")],2)],1)],1)}),[],!1,null,null,null);e.default=component.exports},325:function(t,e,n){"use strict";e.a={methods:{copyPrice:function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(n)return t(e+n)-t(n);var r=150,a=1300,b=250,o=1900,c=e,l=(a*c+b*o)/(c+o),d=r/l,m=d*e,f=20;return m=Math.ceil(m/f)*f-1}}}},334:function(t,e,n){"use strict";n.r(e);var r={props:["contentType","totalWords"],mixins:[n(325).a],computed:{words:function(){return this.contentType.wordsBySize[this.contentType.size]},basePrice:function(){return this.copyPrice(this.words)},discountedPrice:function(){return this.copyPrice(this.words,this.totalWords)}},methods:{setSize:function(t){this.$emit("update:size",t)}}},o=n(65),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card",{staticClass:"mb-4",attrs:{"no-body":""}},[n("b-card-header",[n("b-card-title",[t._v("\n      "+t._s(t.contentType.name)+"\n    ")])],1),t._v(" "),n("b-card-body",[n("p",[t._v("\n      "+t._s(t.contentType.description)+"\n    ")]),t._v(" "),t._l(t.contentType.wordsBySize,(function(e,r){return n("b-button",{key:r,staticClass:"me-2",attrs:{block:"",variant:r===t.contentType.size?"outline-secondary":"light",size:"sm"},on:{click:function(e){return t.setSize(r)}}},[t._v("\n      "+t._s(r.toUpperCase())+"\n    ")])})),t._v(" "),n("span",{staticClass:"text-muted"},[t._v("\n      ~"+t._s(t.words)+" words\n    ")]),t._v(" "),n("div",{},[t.basePrice!==t.discountedPrice?n("span",{staticClass:"text-muted",staticStyle:{"text-decoration":"line-through"}},[t._v("\n        $"+t._s(t.basePrice)+"\n      ")]):t._e(),t._v(" "),t.discountedPrice?n("span",{staticClass:"h2 me-2"},[t._v("\n        $"+t._s(t.discountedPrice)+"\n      ")]):n("span",{staticClass:"h2 text-success"},[t._v("\n        FREE!\n      ")]),t._v(" "),n("b-button",{staticClass:"float-end",attrs:{variant:"outline-primary"},on:{click:function(e){return t.$emit("addToCart",t.contentType)}}},[t._v("\n        Add to cart\n      ")])],1)],2)],1)}),[],!1,null,null,null);e.default=component.exports},358:function(t,e,n){"use strict";n.r(e);var r=n(23),o=(n(66),n(17),n(16),n(21),n(14),n(2),n(1),n(100),n(240),n(340)),c=n(99),l=n.n(c),d={mixins:[n(325).a,{data:function(){var t=[{name:"Landing page",description:"Introduce your product or service, explain its benefits, and invite your users to take action.",wordsBySize:{s:300,m:500,l:700}},{name:"Blog post",description:"Share your knowledge or experience with readers and gain their trust and some SEO juice.",wordsBySize:{s:700,m:1e3,l:1300,xl:2e3}},{name:"Social media post",description:"Stay connected with your audience while they scroll through their social media feeds.",wordsBySize:{s:50,m:100,l:150}},{name:"Email",description:"Send a message to your users, a newsletter to your subscribers, or a cold email to your prospects.",wordsBySize:{s:100,m:200,l:300}}];return t.forEach((function(t){t.size="m"})),{contentTypes:t}}}],data:function(){return{cart:[],orderInProgress:!1,orderStatus:null,copiedToClipboard:!1}},computed:{totalWords:function(){return Object(o.sumBy)(this.cart,(function(t){return t.words*t.quantity}))},totalPrice:function(){return this.copyPrice(this.totalWords)},discount:function(){return Object(o.sumBy)(this.cart,"price")-this.totalPrice},vovasEmail:function(){return"vzakharov@gmail.com"},orderContent:function(){var content=this.cart.map((function(t){var e=t.name,n=t.words,r=t.quantity;return"".concat(r," × ").concat(e," (").concat(n," words").concat(r>1?" each":"",")")})).join("\n");return content+="\n\nTotal words: ".concat(this.totalWords,"\nTotal price: $").concat(this.totalPrice)}},methods:{addToCart:function(t){var e=t.name,n=t.size,r=t.wordsBySize[n],c=this.copyPrice(r),l=Object(o.sumBy)(this.cart.filter((function(t){return t.name===e&&t.words===r})),"quantity")||0;if(0===l)this.cart.push({name:e,words:r,quantity:1,price:c});else{var d=this.cart.find((function(t){return t.name===e&&t.words===r}));d.quantity++,d.price=c*d.quantity}},clearCart:function(){this.cart=[]},recountItem:function(t,e){0===e.quantity?this.cart=Object(o.without)(this.cart,t):(e=Object(o.mapValues)(e,Number),Object.assign(t,e),console.log(t),t.price=this.copyPrice(t.words)*t.quantity)},removeItem:function(t){this.cart=Object(o.without)(this.cart,t)},placeOrder:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n,r,o,title,c,d;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.orderInProgress){e.next=4;break}return e.abrupt("return");case 4:t.orderInProgress=!0;case 5:return e.prev=5,n=t.totalWords,r=t.totalPrice,o=t.orderContent,title="".concat((new Date).toLocaleDateString("en-US",{weekday:"long",day:"numeric",month:"short"})," (").concat(n," words)"),e.next=10,l.a.post("https://ideality-stage.herokuapp.com/api/notion/pages",{parent:{database_id:"3df4dd3f18b3422887a63658bde65815"},properties:{Name:{title:[{text:{content:title}}]},Words:{number:n},Price:{number:r}},children:[{object:"block",type:"paragraph",paragraph:{rich_text:[{text:{content:o}}]}}]});case 10:c=e.sent,d=c.data.url,l.a.post("https://b.ideality.app/api/1.1/wf/sendEmailToVova",{email:"vzakharov@gmail.com",subject:"New order: ".concat(title),emailCopy:"".concat(o,"\n\n").concat(d)}),t.orderStatus="success",t.clearCart(),e.next=21;break;case 17:e.prev=17,e.t0=e.catch(5),console.error(e.t0),t.orderStatus="error";case 21:return e.prev=21,t.orderInProgress=!1,e.finish(21);case 24:case"end":return e.stop()}}),e,null,[[5,17,21,24]])})))()},sumBy:o.sumBy}},m=d,f=n(65),component=Object(f.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ContainerSimple",{attrs:{title:"Let’s write something"}},[t.cart.length>0?n("b-row",{staticClass:"mt-2",attrs:{disabled:t.orderInProgress}},[n("b-col",[n("b-table",{staticClass:"table-sm",attrs:{items:t.cart,"foot-clone":""},scopedSlots:t._u([{key:"cell(quantity)",fn:function(e){var r=e.item;return[n("b-form-input",{staticStyle:{width:"4em"},attrs:{type:"number",min:"0"},on:{input:function(e){return t.recountItem(r,{quantity:e})}},model:{value:r.quantity,callback:function(e){t.$set(r,"quantity",e)},expression:"item.quantity"}}),t._v(" "),n("b-button",{staticClass:"inline-block",attrs:{size:"sm",variant:"outline-danger"},on:{click:function(e){return t.removeItem(r)}}},[t._v("\n            Remove\n          ")])]}},{key:"cell(words)",fn:function(e){var r=e.item;return[n("b-form-input",{staticStyle:{width:"6em"},attrs:{type:"number",min:"50",step:"50"},on:{input:function(e){return t.recountItem(r,{words:e})}},model:{value:r.words,callback:function(e){t.$set(r,"words",e)},expression:"item.words"}})]}},{key:"cell(price)",fn:function(e){var n=e.item;return[t._v("\n          $"+t._s(n.price)+"\n        ")]}},{key:"head(words)",fn:function(){return[t._v("\n          Words per item\n        ")]},proxy:!0},{key:"foot(name)",fn:function(){return[t._v("\n          TOTAL\n        ")]},proxy:!0},{key:"foot(words)",fn:function(){return[t._v("\n          "+t._s(t.sumBy(t.cart,(function(t){return t.words*t.quantity})))+" words\n        ")]},proxy:!0},{key:"foot(quantity)",fn:function(){return[t._v("\n          "+t._s(t.sumBy(t.cart,"quantity"))+" items\n        ")]},proxy:!0},{key:"foot(price)",fn:function(){return[t.totalPrice!==t.sumBy(t.cart,"price")?[n("div",{staticClass:"text-end"},[n("span",{staticClass:"text-muted",staticStyle:{"text-decoration":"line-through","font-weight":"normal"}},[t._v("\n                $"+t._s(t.sumBy(t.cart,"price"))+"\n              ")]),t._v(" "),n("span",{staticClass:"h2 text-success"},[t._v("\n                $"+t._s(t.totalPrice)+"\n              ")])]),t._v(" "),n("div",{staticClass:"text-end",staticStyle:{"font-weight":"normal"}},[t._v("\n              $"+t._s(t.discount)+" off!\n            ")])]:n("span",{staticClass:"h2"},[t._v("\n            $"+t._s(t.totalPrice)+"\n          ")])]},proxy:!0},{key:"foot()",fn:function(){return[n("span")]},proxy:!0}],null,!1,3754158946)}),t._v(" "),t._l([{name:"Place order",variant:"success",method:t.placeOrder},{name:"Clear cart",variant:"outline-danger",method:t.clearCart}],(function(e,r){return n("b-button",t._g({key:r,staticClass:"float-end ms-2",attrs:{variant:e.variant}},{click:e.method}),[t._v("\n        "+t._s(e.name)+"\n      ")])}))],2)],1):t._e(),t._v(" "),t.orderInProgress?n("b-row",{staticClass:"mt-2"},[n("b-col",[n("b-spinner",{staticClass:"mr-2",attrs:{variant:"primary",animation:"grow",size:"sm"}}),t._v(" "),n("span",[t._v("\n        Placing order...\n      ")])],1)],1):n("b-row",{staticClass:"mt-2"},[n("b-col",[n("b-alert",{attrs:{show:"success"===t.orderStatus,variant:"success",dismissible:""},on:{dismissed:function(e){t.orderStatus=""}}},[t._v("\n        Order placed!\n      ")]),t._v(" "),n("b-alert",{attrs:{show:"error"===t.orderStatus,variant:"danger",dismissible:""},on:{dismissed:function(e){t.orderStatus=""}}},[t._v("\n        Something went wrong. Please contact me at "),n("a",{attrs:{href:"mailto:"+t.vovasEmail}},[t._v(t._s(t.vovasEmail))]),t._v(".\n        Here’s your order content to copy and paste:\n        "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.orderContent,expression:"orderContent"}],staticClass:"form-control",attrs:{rows:"10",readonly:""},domProps:{value:t.orderContent},on:{input:function(e){e.target.composing||(t.orderContent=e.target.value)}}}),t._v(" "),n("span",{staticClass:"text-muted",staticStyle:{cursor:"pointer"},domProps:{textContent:t._s(t.copiedToClipboard?"Copied!":"Copy to clipboard")},on:{click:function(e){t.$copyText(t.orderContent),t.copiedToClipboard=!0}}})])],1)],1),t._v(" "),n("b-row",{staticClass:"mt-2",attrs:{cols:"1","cols-md":"2"}},t._l(t.contentTypes,(function(e){return n("b-col",{key:e.name},[n("ContentCard",t._g(t._b({attrs:{size:e.size},on:{"update:size":function(n){return t.$set(e,"size",n)}}},"ContentCard",{contentType:e,totalWords:t.totalWords},!1),{addToCart:t.addToCart}))],1)})),1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ContentCard:n(334).default,ContainerSimple:n(324).default})}}]);