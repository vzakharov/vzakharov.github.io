(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{327:function(t,e,n){"use strict";e.a={methods:{getPrice:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;if(e)return this.getPrice(t+e)-this.getPrice(e);var n=170,o=this.getWph(t),c=n/o,r=c*t,d=20;return r=Math.ceil(r/d)*d-1},getWph:function(t){var e=this.$store.state,n=e.wphMax,o=e.wphMin,c=e.midpoint;return(n*t+o*c)/(t+c)}}}},347:function(t,e,n){"use strict";n.r(e);n(1);var o={props:["contentType","totalWords"],mixins:[n(327).a],computed:{words:function(){return this.contentType.customWords||this.contentType.wordsBySize[this.contentType.size]},basePrice:function(){return this.getPrice(this.words)},discountedPrice:function(){return this.getPrice(this.words,this.totalWords)}},methods:{setSize:function(t){this.$emit("update:size",t)}},watch:{"contentType.customWords":function(t){var e=this;t&&this.$nextTick((function(){return["focus","select"].forEach((function(t){return e.$refs.customWordsInput[t]()}))}))}}},c=n(66),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b-card",{staticClass:"mb-4",attrs:{"no-body":""}},[n("b-card-header",[n("b-card-title",{attrs:{id:t.contentType.id}},[t._v("\n      "+t._s(t.contentType.name)+"\n    ")])],1),t._v(" "),n("b-card-body",[n("p",[t._v("\n      "+t._s(t.contentType.description)+"\n    ")]),t._v(" "),t.contentType.customWords?t._e():t._l(t.contentType.wordsBySize,(function(e,o){return n("b-button",{key:o,staticClass:"me-2",attrs:{block:"",variant:o===t.contentType.size?"outline-secondary":"light",size:"sm"},on:{click:function(e){return t.setSize(o)}}},[t._v("\n        "+t._s(o.toUpperCase())+"\n      ")])})),t._v(" "),t.contentType.customWords?t._e():n("span",{staticClass:"text-muted",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.$emit("update:customWords",t.words)}}},[t._v("\n      ~"+t._s(t.words)+" words\n    ")]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:t.contentType.customWords,expression:"contentType.customWords"}]},[n("b-form-input",{ref:"customWordsInput",staticClass:"mb-2 d-inline w-75",attrs:{type:"number",min:"100",step:"100",value:t.contentType.customWords},on:{change:function(e){t.$emit("update:customWords",parseInt(e))}}}),t._v(" "),n("span",{staticClass:"close nofloat",staticStyle:{cursor:"pointer"},on:{click:function(e){return t.$emit("update:customWords",null)}}},[t._v("×")])],1),t._v(" "),n("div",{},[t.basePrice!==t.discountedPrice?n("span",{staticClass:"text-muted",staticStyle:{"text-decoration":"line-through"}},[t._v("\n        $"+t._s(t.basePrice)+"\n      ")]):t._e(),t._v(" "),t.discountedPrice?n("span",{staticClass:"h2 me-2"},[t._v("\n        $"+t._s(t.discountedPrice)+"\n      ")]):n("span",{staticClass:"h2 text-success"},[t._v("\n        FREE!\n      ")]),t._v(" "),n("b-button",{staticClass:"float-end",attrs:{variant:"outline-primary"},on:{click:function(e){return t.$emit("addToCart",t.contentType)}}},[t._v("\n        Add to cart\n      ")])],1)],2)],1)}),[],!1,null,null,null);e.default=component.exports}}]);