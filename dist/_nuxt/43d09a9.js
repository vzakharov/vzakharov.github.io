(window.webpackJsonp=window.webpackJsonp||[]).push([[19,8],{329:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},333:function(t,e,n){var content=n(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("20139912",content,!0,{sourceMap:!1})},338:function(t,e,n){"use strict";var o=n(14),r=n(130);o({target:"String",proto:!0,forced:n(131)("blink")},{blink:function(){return r(this,"blink","","")}})},339:function(t,e,n){"use strict";n(333)},340:function(t,e,n){var o=n(68)(!1);o.push([t.i,"[contenteditable=true][data-v-3211f41e]:empty:after{content:attr(data-ph);color:#bbb}",""]),t.exports=o},350:function(t,e,n){var content=n(371);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("fafdc48c",content,!0,{sourceMap:!1})},363:function(t,e,n){"use strict";n.r(e);n(39),n(338);var o={props:{value:{},tag:{default:"span"},placeholder:{default:"…"},editable:{default:!0},lazy:{default:!1},type:{default:"text"},display:{default:"inline"}},data:function(){return{initialContent:this.value,blink:null,blinkInterval:null,focused:null}},mounted:function(){var t=this;this.$watch("value",{immediate:!0,handler:function(t){var e=this;t?clearInterval(this.blinkInterval):this.blinkInterval=setInterval((function(){e.blink=!e.blink}),500)}}),this.$once("hook:beforeDestroy",(function(){return clearInterval(t.blinkInterval)}))},watch:{value:function(t){t!=this.$refs.me.innerText&&(this.initialContent=t)}},methods:{escape:n(327).escape}},r=(n(339),n(66)),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.tag,{ref:"me",tag:"component",class:{"text-muted":!t.initialContent,"border-start border-dark":t.focused&&!t.value&&t.blink,editable:!0},style:{display:t.display,outline:"none","white-space":"pre-wrap"},attrs:{contenteditable:t.editable,"data-ph":!t.focused&&t.placeholder},domProps:{textContent:t._s(t.initialContent)},on:{input:function(e){t.val=e.target.innerText.replace(" "," "),"number"===t.type&&(t.val=parseFloat(t.val)),t.$emit("input",t.val)},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1,t.initialContent=t.value}}})}),[],!1,null,"3211f41e",null);e.default=component.exports},370:function(t,e,n){"use strict";n(350)},371:function(t,e,n){var o=n(68)(!1);o.push([t.i,"@media screen{.editable{background-color:#e6f7ff}}@media print{.noprint{display:none}}",""]),t.exports=o},435:function(t,e,n){"use strict";n.r(e);n(5),n(4),n(6),n(3),n(7);var o=n(23),r=n(29),c=n(0),l=(n(67),n(241),n(11),n(19),n(17),n(2),n(1),n(39),n(15),n(18),n(327));function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(c.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f={data:function(){return{invoice:{number:null,date:null,issuer:null,payer:null,unit:null,currency:null,items:null,discount:null,tax:null,paymentDetails:null,initials:null},mounted:!1,numberCopied:!1}},mounted:function(){var t=this;if(this.invoice=v(v({},this.invoice),JSON.parse(this.$route.query.invoice||"{}")),!this.invoice.number){var e=Number(localStorage.getItem("lastInvoiceNumber"));this.invoice.number=e?e+1:1}localStorage.setItem("lastInvoiceNumber",this.invoice.number);var n=JSON.parse(localStorage.getItem("invoice")),o={number:Math.floor(1e6*Math.random()),date:this.today,issuer:"Enter your company name, address and other details here.\nFeel free to add as many lines as needed.",payer:"Enter the name, address, etc. of the payer here.\nFeel free to add as many lines as needed.",unit:"pcs",currency:"USD",items:[{title:"Enter the item title here",quantity:1,price:100}],paymentDetails:"Enter the payment details here.\nFeel free to add as many lines as needed.",initials:"Jane Doe"};Object(l.forEach)(this.invoice,(function(e,r){e||(t.invoice[r]=(null==n?void 0:n[r])||o[r])})),this.$watch("invoice",(function(e){t.$router.replace({query:{invoice:JSON.stringify(e)}}),localStorage.setItem("invoice",JSON.stringify(e))}),{deep:!0}),this.mounted=!0},computed:{today:function(){var t,e;return null===(t=(e=new Date).toLocaleDateString)||void 0===t?void 0:t.call(e,"en-US",{month:"long",day:"numeric",year:"numeric"})},modifiers:function(){var t=this;return["discount","tax"].filter((function(e){return void 0!==t.invoice[e]})).join(" & ")}},methods:{copyToClipboard:function(text,t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,navigator.clipboard.writeText(text);case 2:e[t]=!0,setTimeout((function(){e[t]=!1}),1e3);case 4:case"end":return n.stop()}}),n)})))()},focusOnNextTick:function(t){var e=this,select=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];this.$nextTick((function(){var element=e.$refs[t];Object(l.isArray)(element)&&(element=element[0]),element.$el&&(element=element.$el),console.log(element),element.focus(),select&&document.execCommand("selectAll",!1,null)}))},addItem:function(){this.invoice.items=[].concat(Object(o.a)(this.invoice.items),[{title:"Another item",quantity:"1",price:"100"}]),this.focusOnNextTick("title")},total:function(t){return Object(l.sumBy)(this.invoice.items,(function(e){return parseFloat(e[t])||0}))},generateNumber:function(){var t=this.invoice,e=t.payer,n=t.date,o=e&&(e[0]+e.slice(1).replace(/[^bcdfghjklmnpqrstvwxyz]/gi,"").slice(0,2)).toUpperCase();this.invoice.number=Object(l.filter)([o,new Date(n+" UTC").toISOString().slice(2,10).replace(/-/g,"")],l.identity).join("-")},without:l.without,sumBy:l.sumBy,upperFirst:l.upperFirst}},m=f,y=(n(370),n(66)),component=Object(y.a)(m,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-container",{staticClass:"mt-5"},[n("b-row",[n("b-col",{attrs:{cols:"12",lg:"8","offset-lg":"2"}},[t.mounted?[n("div",[n("span",{staticClass:"h1"},[t._v("Invoice #"),n("Editable",{model:{value:t.invoice.number,callback:function(e){t.$set(t.invoice,"number",e)},expression:"invoice.number"}})],1),t._v(" "),n("b-button",{staticClass:"text-muted noprint",attrs:{variant:"light",size:"sm"},domProps:{textContent:t._s("Generate")},on:{click:t.generateNumber}}),t._v(" "),n("b-button",{staticClass:"text-muted noprint",attrs:{disabled:t.numberCopied,variant:"light",size:"sm"},domProps:{textContent:t._s(t.numberCopied?"Copied!":"Copy number to clipboard")},on:{click:function(e){return t.copyToClipboard(t.invoice.number,"numberCopied")}}})],1),t._v(" "),t._v("\n        dated "),n("Editable",{model:{value:t.invoice.date,callback:function(e){t.$set(t.invoice,"date",e)},expression:"invoice.date"}}),t._v(" "),t.invoice.date!=t.today?n("b-button",{staticClass:"ms-2 text-muted noprint",attrs:{variant:"light",size:"sm"},domProps:{textContent:t._s("Set to today")},on:{click:function(e){t.invoice.date=t.today}}}):t._e(),t._v(" "),n("b-row",{staticClass:"my-5"},t._l(["Issuer","Payer"],(function(e){return n("b-col",{key:e,attrs:{cols:"6"}},[n("h4",{domProps:{textContent:t._s(e)}}),t._v(" "),n("Editable",{staticClass:"small",attrs:{tag:"div"},model:{value:t.invoice[e.toLowerCase()],callback:function(n){t.$set(t.invoice,e.toLowerCase(),n)},expression:"invoice[party.toLowerCase()]"}})],1)})),1),t._v(" "),n("h3",{staticClass:"mb-3"},[t._v("Invoice items")]),t._v(" "),n("b-table",{attrs:{items:t.invoice.items,fields:["title","quantity","price"],striped:"",hover:"",small:"",bordered:"",responsive:"","foot-clone":""},scopedSlots:t._u([{key:"head(price)",fn:function(){return[t._v("\n            Price ("),n("Editable",{model:{value:t.invoice.currency,callback:function(e){t.$set(t.invoice,"currency",e)},expression:"invoice.currency"}}),t._v(")\n          ")]},proxy:!0},{key:"head(quantity)",fn:function(){return[t._v("\n            Quantity ("),n("Editable",{model:{value:t.invoice.unit,callback:function(e){t.$set(t.invoice,"unit",e)},expression:"invoice.unit"}}),t._v(")\n          ")]},proxy:!0},{key:"cell(title)",fn:function(e){var o=e.item;return[n("Editable",{ref:"title",model:{value:o.title,callback:function(e){t.$set(o,"title",e)},expression:"item.title"}})]}},{key:"cell(quantity)",fn:function(e){var o=e.item;return[n("Editable",{attrs:{type:"number"},model:{value:o.quantity,callback:function(e){t.$set(o,"quantity",e)},expression:"item.quantity"}})]}},{key:"cell(price)",fn:function(e){var o=e.item;return[n("Editable",{attrs:{type:"number"},model:{value:o.price,callback:function(e){t.$set(o,"price",e)},expression:"item.price"}}),t._v(" "),o!==t.invoice.items[0]?n("span",{staticClass:"close noprint",staticStyle:{cursor:"pointer"},on:{click:function(e){t.invoice.items=t.without(t.invoice.items,o)}}},[t._v("×")]):t._e()]}},{key:"foot(title)",fn:function(){return[t._v("\n            "+t._s(t.modifiers?"Total without "+t.modifiers:"Total")+"\n          ")]},proxy:!0},{key:"foot(quantity)",fn:function(){return[t._v("\n            "+t._s(t.total("quantity"))+"\n          ")]},proxy:!0},{key:"foot(price)",fn:function(){return[t._v("\n            "+t._s(t.total("price"))+"\n          ")]},proxy:!0}])}),t._v(" "),n("b-button",{staticClass:"mb-3 text-muted noprint",attrs:{variant:"outline-secondary",size:"sm"},on:{click:t.addItem}},[t._v("\n          Add item\n        ")]),t._v(" "),n("div",{staticClass:"text-end my-5"},[t._l(["discount","tax"],(function(e){return n("div",{key:e,staticClass:"mb-2"},[void 0!==t.invoice[e]?[n("span",{staticClass:"h6"},[t._v("\n                "+t._s(t.upperFirst(e))+":\n                \n                "),"discount"===e?n("span",{domProps:{textContent:t._s("(")}}):t._e(),n("Editable",{ref:e,refInFor:!0,attrs:{type:"number"},model:{value:t.invoice[e],callback:function(n){t.$set(t.invoice,e,n)},expression:"invoice[modifier]"}}),"discount"===e?n("span",{domProps:{textContent:t._s(")")}}):t._e(),t._v("\n              \n                "+t._s(t.invoice.currency)+"\n              ")],1),t._v(" "),n("span",{staticClass:"close noprint nofloat",staticStyle:{cursor:"pointer"},on:{click:function(n){t.invoice[e]=void 0}}},[t._v("×")])]:n("b-button",{staticClass:"text-muted noprint",attrs:{variant:"light",size:"sm"},on:{click:function(n){t.invoice[e]=0,t.focusOnNextTick(e)}}},[t._v("\n              Add "+t._s(e)+"\n            ")])],2)})),t._v(" "),n("h3",{staticClass:"mt-3"},[t._v("Total payable: "+t._s(t.total("price")-(t.invoice.discount||0)+(t.invoice.tax||0))+" "+t._s(t.invoice.currency))])],2),t._v(" "),n("h3",{staticClass:"mb-2"},[t._v("\n          Payment details\n        ")]),t._v(" "),n("Editable",{staticClass:"small",attrs:{tag:"div"},model:{value:t.invoice.paymentDetails,callback:function(e){t.$set(t.invoice,"paymentDetails",e)},expression:"invoice.paymentDetails"}}),t._v(" "),n("p",{staticClass:"mt-5"},[n("Editable",{model:{value:t.invoice.initials,callback:function(e){t.$set(t.invoice,"initials",e)},expression:"invoice.initials"}})],1),t._v(" "),n("div",{staticClass:"noprint",staticStyle:{height:"100px"}})]:n("b-card",{staticClass:"text-center"},[n("b-spinner",{attrs:{type:"grow",variant:"primary"}}),t._v(" "),n("p",{staticClass:"mt-3"},[t._v("\n          Loading your invoice...\n        ")])],1)],2)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Editable:n(363).default})}}]);