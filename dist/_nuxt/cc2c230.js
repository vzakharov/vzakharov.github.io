(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{339:function(t,e,n){var content=n(351);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("a6c28732",content,!0,{sourceMap:!1})},350:function(t,e,n){"use strict";n(339)},351:function(t,e,n){var r=n(68)(!1);r.push([t.i,"thead{top:0}tfoot,thead{position:-webkit-sticky;position:sticky;z-index:1;background-color:#fff}tfoot{bottom:0}",""]),t.exports=r},379:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(24),c=(n(21),n(5),n(4),n(2),n(1),n(6),n(3),n(7),n(67),n(325));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var f={props:["notion"],data:function(){return{allProjects:null,filters:{status:null,type:null}}},mounted:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.notion.queryDatabase("96c49f14abd94d679ab877b308e859b6");case 2:t.allProjects=e.sent;case 3:case"end":return e.stop()}}),e)})))()},computed:{projects:function(){var t=this.allProjects,e=this.filters,n=(e.status,e.type,this.filters);return Object(c.filter)(t,(function(t){for(var e in n){var r;if(n[e]&&(null===(r=t[e])||void 0===r?void 0:r.name)!==n[e])return!1}return!0}))}},watch:{filters:{handler:function(t){JSON.stringify(t)!==JSON.stringify(this.$route.query)&&this.$router.push({query:Object(c.pickBy)(t,c.identity)})},deep:!0},"$route.query":{handler:function(t){this.filters=function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({status:null,type:null},t),console.log(JSON.stringify(this.filters))},deep:!0,immediate:!0}},methods:{hex:function(t){return{green:"#c8f7c5",yellow:"#fff5b3",red:"#f7c5c5",blue:"#c5e0f7",gray:"#e0e0e0",lightGray:"#f7f7f7",pink:"#f7c5f7",brown:"#f7c5c5"}[t]||"#fff"},sumBy:c.sumBy,countBy:c.countBy,chain:c.chain,identity:c.identity}},y=f,d=(n(350),n(66)),component=Object(d.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("Projects")]),t._v(" "),t.projects?[t.projects.length>0?n("b-button",{attrs:{size:"sm mb-2",to:Object.assign({},t.$route,{name:"admin-projects-chart"===t.$route.name?"admin-projects":"admin-projects-chart"}),variant:"admin-projects-chart"===t.$route.name?"secondary":"outline-secondary"},domProps:{textContent:t._s("admin-projects-chart"===t.$route.name?"Hide chart":"Show chart")}}):t._e(),t._v(" "),t.projects?n("NuxtChild",t._b({},"NuxtChild",{projects:t.projects},!1)):t._e(),t._v(" "),n("b-table",{attrs:{items:t.projects,striped:"",small:"","no-border-collapse":"",bordered:"",outlined:"","foot-clone":"",fields:["name",{key:"status.name",label:"Status"},{key:"type.name",label:"Type"},"words","usdEq","hoursNet","wordsPerHourNet","usdPerHourNet"]},scopedSlots:t._u([{key:"cell(name)",fn:function(e){var r=e.item;return[n("a",{staticStyle:{"text-decoration":"none"},attrs:{href:r.details.url,target:"_blank"}},[t._v("\n          "+t._s(r.name)+"\n        ")])]}},{key:"cell(status.name)",fn:function(e){var r=e.item;return[r.status?n("span",{style:{backgroundColor:t.hex(r.status.color)},domProps:{textContent:t._s(r.status.name)}}):t._e()]}},{key:"cell(type.name)",fn:function(e){var r=e.item;return[r.type?n("span",{style:{backgroundColor:t.hex(r.type.color)},domProps:{textContent:t._s(r.type.name)}}):t._e()]}},{key:"head(status.name)",fn:function(){return[n("b-select",{staticClass:"mr-2",attrs:{size:"sm",options:[{value:null,text:t.filters.status?"All":"Status"}].concat(t.chain(t.allProjects).map("status.name").uniq().filter(t.identity).value())},model:{value:t.filters.status,callback:function(e){t.$set(t.filters,"status",e)},expression:"filters.status"}})]},proxy:!0},{key:"head(type.name)",fn:function(){return[n("b-select",{staticClass:"mr-2",attrs:{size:"sm",options:[{value:null,text:t.filters.type?"All":"Type"}].concat(t.chain(t.allProjects).map("type.name").uniq().filter(t.identity).value())},model:{value:t.filters.type,callback:function(e){t.$set(t.filters,"type",e)},expression:"filters.type"}})]},proxy:!0},{key:"foot(name)",fn:function(){return[n("span",{domProps:{textContent:t._s("Total: "+t.projects.length+" items")}})]},proxy:!0},{key:"foot(status.name)",fn:function(){return t._l(t.countBy(t.projects,"status.name"),(function(e,r){return n("span",{key:r,staticClass:"fw-normal"},[t._v("\n          "+t._s(r[0])+":"+t._s(e)+"\n        ")])}))},proxy:!0},{key:"foot(type.name)",fn:function(){return t._l(t.countBy(t.projects,"type.name"),(function(e,r){return n("span",{key:r,staticClass:"fw-normal"},[t._v("\n          "+t._s(r[0])+":"+t._s(e)+"\n        ")])}))},proxy:!0},{key:"foot(words)",fn:function(){return[t._v("\n        "+t._s(t.sumBy(t.projects,"words").toLocaleString())+" words\n      ")]},proxy:!0},{key:"foot(usdEq)",fn:function(){return[t._v("\n        "+t._s(t.sumBy(t.projects,"usdEq").toLocaleString())+" USD\n      ")]},proxy:!0},{key:"foot(hoursNet)",fn:function(){return[t._v("\n        "+t._s(t.sumBy(t.projects,"hoursNet").toLocaleString())+" hours\n      ")]},proxy:!0},{key:"foot(wordsPerHourNet)",fn:function(){return[t._v("\n        ~"+t._s(10*Math.round(t.sumBy(t.projects,"words")/t.sumBy(t.projects,"hoursNet")/10))+" words/hour\n      ")]},proxy:!0},{key:"foot(usdPerHourNet)",fn:function(){return[t._v("\n        ~"+t._s(10*Math.round(t.sumBy(t.projects,"usdEq")/t.sumBy(t.projects,"hoursNet")/10))+" USD/hour\n      ")]},proxy:!0}],null,!0)})]:n("b-spinner")],2)}),[],!1,null,null,null);e.default=component.exports}}]);