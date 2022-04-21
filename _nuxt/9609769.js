(window.webpackJsonp=window.webpackJsonp||[]).push([[11,4],{339:function(t,e,r){var content=r(352);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(69).default)("a6c28732",content,!0,{sourceMap:!1})},344:function(t,e,r){"use strict";r.r(e);r(16);var o=r(347),n={props:["projects"],data:function(){return{chart:null}},computed:{config:function(){return{type:"scatter",data:{datasets:[{label:"Words per hour",backgroundColor:"rgba(54,162,235,0.2)",borderColor:"rgba(54,162,235,1)",data:this.projects.map((function(t){return{x:t.words,y:t.wordsPerHourNet}}))}]},options:{scales:{x:{min:0,max:4e3},y:{min:0,max:1500}}}}}},mounted:function(){this.$watch("config",{immediate:!0,handler:function(t){this.chart&&this.chart.destroy(),this.chart=new o.a(document.getElementById("chart"),t)}})}},c=r(66),component=Object(c.a)(n,(function(){var t=this.$createElement;return(this._self._c||t)("canvas",{attrs:{id:"chart"}})}),[],!1,null,null,null);e.default=component.exports},351:function(t,e,r){"use strict";r(339)},352:function(t,e,r){var o=r(68)(!1);o.push([t.i,"thead{top:0}tfoot,thead{position:-webkit-sticky;position:sticky;z-index:1;background-color:#fff}tfoot{bottom:0}",""]),t.exports=o},379:function(t,e,r){"use strict";r.r(e);var o=r(0),n=r(34),c=r(24),l=(r(67),r(21),r(1),r(45),r(47),r(5),r(4),r(2),r(6),r(3),r(7),r(325));function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function y(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m={props:["notion"],data:function(){return{allProjects:null,customers:null,filters:{customer:null,status:null,type:null},currency:"USD"}},mounted:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=3,Promise.all([t.notion.queryDatabase("96c49f14abd94d679ab877b308e859b6"),t.notion.queryDatabase("444a7af76a5e4704bb94ad070a1c8d6d")]);case 3:r=e.sent,o=Object(n.a)(r,2),t.allProjects=o[0],t.customers=o[1],t.customers=Object(l.sortBy)(t.customers,(function(t){return t.name.toLowerCase()}));case 8:case"end":return e.stop()}}),e)})))()},computed:{projects:function(){var t=this,e=this.allProjects,r=this.filters,o=(r.status,r.type,this.filters);return Object(l.filter)(e,(function(e){for(var r in o){var n;if("customer"==r){if(o[r]&&t.projectCustomerName(e)!=o[r])return!1}else if(o[r]&&(null===(n=e[r])||void 0===n?void 0:n.name)!==o[r])return!1}return!0}))},filledProjects:function(){return Object(l.filter)(this.projects,(function(t){return["usdEq","words","hoursNet"].every((function(e){return t[e]}))}))},showChart:{get:function(){return void 0!==this.$route.query.chart},set:function(t){console.log(t),this.$router.push(y(y({},this.$route),{},{query:y(y({},this.$route.query),{},{chart:t?null:void 0})}))}}},watch:{filters:{handler:function(t){JSON.stringify(Object(l.pickBy)(t,l.identity))!==JSON.stringify(Object(l.pick)(this.$route.query,["status","type","customer"]))&&this.$router.push({query:y(y({},this.$route.query),Object(l.mapValues)(this.filters,(function(t){return t||void 0})))})},deep:!0},"$route.query":{handler:function(t){this.filters=y({status:null,type:null,customer:null},Object(l.pickBy)(Object(l.pick)(t,["status","type","customer"]),l.identity))},deep:!0,immediate:!0}},methods:{hex:function(t){return{green:"#c8f7c5",yellow:"#fff5b3",red:"#f7c5c5",blue:"#c5e0f7",gray:"#e0e0e0",lightGray:"#f7f7f7",pink:"#f7c5f7",brown:"#f7c5c5"}[t]||"#fff"},format:function(t){return(null==t?void 0:t.toLocaleString())||"n/a"},projectCustomerName:function(t){var e,r,o=null===(e=t.customer[0])||void 0===e?void 0:e.id;return null===(r=Object(l.find)(this.customers,{details:{id:o}}))||void 0===r?void 0:r.name},sumBy:l.sumBy,countBy:l.countBy,chain:l.chain,identity:l.identity,find:l.find,map:l.map}},d=(r(351),r(66)),component=Object(d.a)(m,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",[t._v("Projects")]),t._v(" "),t.projects?[r("b-button",{attrs:{size:"sm mb-2",variant:t.showChart?"outline-primary":"outline-secondary",to:Object.assign({},t.$route,{query:Object.assign({},t.$route.query,{chart:t.showChart?void 0:null})})},domProps:{textContent:t._s(t.showChart?"Hide chart":"Show chart")}}),t._v(" "),r("b-button",{attrs:{size:"sm mb-2",variant:"outline-secondary"},domProps:{textContent:t._s("Switch to "+("RUB"===t.currency?"USD":"RUB"))},on:{click:function(e){t.currency="RUB"===t.currency?"USD":"RUB"}}}),t._v(" "),r("b-container",[r("b-row",[t.showChart?r("b-col",{attrs:{cols:"12",md:"5",lg:"4"}},[r("Chart",t._b({},"Chart",{projects:t.projects},!1))],1):t._e(),t._v(" "),r("b-col",t._b({},"b-col",Object.assign({},t.showChart?{cols:12,md:7,lg:8}:{}),!1),[r("b-table",{attrs:{items:t.projects,striped:"",small:"","no-border-collapse":"",bordered:"",outlined:"","foot-clone":"","label-sort-asc":"","label-sort-desc":"","label-sort-clear":"",fields:[{key:"name",sortable:!0},{key:"customer",sortable:!0},{key:"status.name",label:"Status",sortable:!0},{key:"type.name",label:"Type",sortable:!0},{key:"words",label:"Words",sortable:!0},{key:t.currency.toLowerCase()+"Eq",label:t.currency,sortable:!0},{key:"hoursNet",label:"Hours",sortable:!0},{key:"wordsPerHourNet",label:"Words/hour",sortable:!0},{key:t.currency.toLowerCase()+"PerHourNet",label:t.currency+"/hour",sortable:!0}]},scopedSlots:t._u([{key:"cell(name)",fn:function(e){var o=e.item;return[r("a",{staticStyle:{"text-decoration":"none"},attrs:{href:o.details.url,target:"_blank"}},[t._v("\n                "+t._s(o.name)+"\n              ")])]}},{key:"cell(customer)",fn:function(e){var r=e.item;return[t._v("\n              "+t._s(t.projectCustomerName(r))+"\n            ")]}},{key:"cell(status.name)",fn:function(e){var o=e.item;return[o.status?r("span",{style:{backgroundColor:t.hex(o.status.color)},domProps:{textContent:t._s(o.status.name)}}):t._e()]}},{key:"cell(type.name)",fn:function(e){var o=e.item;return[o.type?r("span",{style:{backgroundColor:t.hex(o.type.color)},domProps:{textContent:t._s(o.type.name)}}):t._e()]}},{key:"head(status.name)",fn:function(){return[r("b-select",{staticClass:"mr-2",attrs:{size:"sm",options:[{value:null,text:t.filters.status?"All":"Status"}].concat(t.chain(t.allProjects).map("status.name").uniq().filter(t.identity).value())},model:{value:t.filters.status,callback:function(e){t.$set(t.filters,"status",e)},expression:"filters.status"}})]},proxy:!0},{key:"head(type.name)",fn:function(){return[r("b-select",{staticClass:"mr-2",attrs:{size:"sm",options:[{value:null,text:t.filters.type?"All":"Type"}].concat(t.chain(t.allProjects).map("type.name").uniq().filter(t.identity).value())},model:{value:t.filters.type,callback:function(e){t.$set(t.filters,"type",e)},expression:"filters.type"}})]},proxy:!0},{key:"head(customer)",fn:function(){return[r("b-select",{staticClass:"mr-2",attrs:{size:"sm",options:[{value:null,text:t.filters.customer?"All":"Customer"}].concat(t.map(t.customers,"name"))},model:{value:t.filters.customer,callback:function(e){t.$set(t.filters,"customer",e)},expression:"filters.customer"}})]},proxy:!0},{key:"foot(name)",fn:function(){return[r("span",{domProps:{textContent:t._s("Total: "+t.projects.length+" items")}})]},proxy:!0},{key:"foot(status.name)",fn:function(){return t._l(t.countBy(t.projects,"status.name"),(function(e,o){return r("span",{key:o,staticClass:"fw-normal"},[t._v("\n                "+t._s(o[0])+":"+t._s(e)+"\n              ")])}))},proxy:!0},{key:"foot(type.name)",fn:function(){return t._l(t.countBy(t.projects,"type.name"),(function(e,o){return r("span",{key:o,staticClass:"fw-normal"},[t._v("\n                "+t._s(o[0])+":"+t._s(e)+"\n              ")])}))},proxy:!0},{key:"foot(words)",fn:function(){return[t._v("\n              "+t._s(t.format(t.sumBy(t.projects,"words")))+" words\n            ")]},proxy:!0},{key:"foot(usdEq)",fn:function(){return[t._v("\n              "+t._s(t.format(t.sumBy(t.projects,"usdEq")))+" USD\n            ")]},proxy:!0},{key:"foot(rubEq)",fn:function(){return[t._v("\n              "+t._s(t.format(t.sumBy(t.projects,"rubEq")))+" RUB\n            ")]},proxy:!0},{key:"foot(hoursNet)",fn:function(){return[t._v("\n              "+t._s(t.format(t.sumBy(t.projects,"hoursNet")))+" hours\n            ")]},proxy:!0},{key:"foot(wordsPerHourNet)",fn:function(){return[t._v("\n              ~"+t._s(10*Math.round(t.sumBy(t.filledProjects,"words")/t.sumBy(t.projects,"hoursNet")/10))+" words/hour\n            ")]},proxy:!0},{key:"foot(usdPerHourNet)",fn:function(){return[t._v("\n              ~"+t._s(10*Math.round(t.sumBy(t.filledProjects,"usdEq")/t.sumBy(t.projects,"hoursNet")/10))+" USD/hour\n            ")]},proxy:!0},{key:"foot(rubPerHourNet)",fn:function(){return[t._v("\n              ~"+t._s(10*Math.round(t.sumBy(t.filledProjects,"rubEq")/t.sumBy(t.projects,"hoursNet")/10))+" RUB/hour\n            ")]},proxy:!0}],null,!0)})],1)],1)],1)]:r("b-spinner")],2)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{Chart:r(344).default})}}]);