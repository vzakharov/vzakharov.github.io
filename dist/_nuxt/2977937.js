(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{330:function(e,t,n){"use strict";n(5),n(4),n(2),n(6),n(3),n(7);function r(source,e){if(null==source)return{};var t,i,n=function(source,e){if(null==source)return{};var t,i,n={},r=Object.keys(source);for(i=0;i<r.length;i++)t=r[i],e.indexOf(t)>=0||(n[t]=source[t]);return n}(source,e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(source);for(i=0;i<r.length;i++)t=r[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(source,t)&&(n[t]=source[t])}return n}var o=n(29),c=n(0),l=(n(67),n(11),n(19),n(16),n(1),n(44),n(46),n(81),n(84)),f=n.n(l),d=n(326),v=["properties"];function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function h(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}function y(e){var t=f.a.create({baseURL:"https://ideality.app/api/notion/",headers:h({},e?{Authorization:"Bearer ".concat(e)}:{})});Object.assign(this,{createPage:function(e){return Object(o.a)(regeneratorRuntime.mark((function n(){var r,o,l,data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=e.parent,o=e.properties,e.content,n.next=3,t.post("pages",{parent:r,properties:Object(d.chain)(o).mapValues((function(e,t){return"string"==typeof e?Object(c.a)({},"name"===t?"title":"rich_text",[{text:{content:e}}]):"number"==typeof e?{number:e}:void 0})).mapKeys((function(e,t){return Object(d.upperFirst)(t).replace(/([a-z])([A-Z])/g,"$1 $2")})).value()});case 3:return l=n.sent,O(data=l.data),n.abrupt("return",data);case 7:case"end":return n.stop()}}),n)})))()},getPage:function(e){return Object(o.a)(regeneratorRuntime.mark((function n(){var r,data;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.get("pages/".concat(e));case 2:return r=n.sent,O(data=r.data),n.abrupt("return",data);case 6:case"end":return n.stop()}}),n)})))()},getUser:function(){return Object(o.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e){n.next=2;break}throw new Error("No token provided. Please use an instance of Notion with a token.");case 2:return n.next=4,t.get("users/me");case 4:return n.abrupt("return",n.sent.data);case 5:case"end":return n.stop()}}),n)})))()},queryDatabase:function(e,n){return Object(o.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.post("databases/".concat(e,"/query"),n);case 2:return o.abrupt("return",o.sent.data.results.map((function(e){e.properties;var details=r(e,v);return O(e),h(h({},e.properties),{},{details:details})})));case 3:case"end":return o.stop()}}),o)})))()},getBlock:function(e){var n=arguments,r=this;return Object(o.a)(regeneratorRuntime.mark((function o(){var c,l,f,d,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return c=n.length>1&&void 0!==n[1]?n[1]:{},l=c.recurse,f=void 0!==l&&l,o.next=3,t.get("blocks/".concat(e));case 3:if(d=o.sent,data=d.data,!d.data.has_children){o.next=10;break}return o.next=9,r.getBlockChildren(e,{recurse:f});case 9:data.children=o.sent;case 10:return o.abrupt("return",data);case 11:case"end":return o.stop()}}),o)})))()},getBlockChildren:function(e){var n=arguments,r=this;return Object(o.a)(regeneratorRuntime.mark((function c(){var l,f,d,v,m;return regeneratorRuntime.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return l=n.length>1&&void 0!==n[1]?n[1]:{},f=l.recurse,d=void 0!==f&&f,c.next=3,t.get("blocks/".concat(e,"/children"));case 3:if(v=c.sent,m=v.data.results,!d){c.next=8;break}return c.next=8,Promise.all(m.map(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.has_children){e.next=5;break}return e.next=4,r.getBlockChildren(t.id,{recurse:d});case 4:t.children=e.sent;case 5:return e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 8:return c.abrupt("return",m);case 9:case"end":return c.stop()}}),c)})))()}})}function O(data){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"properties";data[e]=Object(d.chain)(data[e]).mapKeys((function(e,t){return Object(d.camelCase)(t)})).mapValues((function(object,e){var t,n=function e(object){return null!=object&&object.type?e(object[object.type]):object}(object);["title","rich_text"].includes(object.type)&&(n=null===(t=n[0])||void 0===t?void 0:t.plain_text);return n})).value()}y.anon=new y;t.a=y},339:function(e,t,n){var content=n(351);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(69).default)("8bb2898c",content,!0,{sourceMap:!1})},350:function(e,t,n){"use strict";n(339)},351:function(e,t,n){var r=n(68)(!1);r.push([e.i,".toast:not(.show){display:block}",""]),e.exports=r},378:function(e,t,n){"use strict";n.r(t);var r=n(29),o=(n(67),n(330)),c={data:function(){return{notionKey:null,mounted:!1,notionWorkspace:null,notion:null}},mounted:function(){this.notionKey=localStorage.getItem("notionKey"),this.mounted=!0},watch:{notionKey:function(e){var t=this;return Object(r.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!e){n.next=13;break}return n.prev=1,t.notion=new o.a(e),n.next=5,t.notion.getUser();case 5:t.notionWorkspace=n.sent,localStorage.setItem("notionKey",e),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(1),t.notionKey=null,t.$nextTick((function(){var e=n.t0.response&&403===n.t0.response.status;t.$root.$bvToast.toast(e?"Invalid Notion API key":"Something went wrong. Check the developer console for more details.",{title:"Oops!",variant:"danger",solid:!0,autoHideDelay:3e3})}));case 13:case"end":return n.stop()}}),n,null,[[1,9]])})))()}}},l=(n(350),n(66)),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"p-3"},[e.mounted?e.notionKey?n("div",[e.notionWorkspace?[n("div",{staticClass:"text-end"},[e._v("\n        Logged on to "+e._s(e.notionWorkspace.name)+"\n        "),n("b-button",{attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(t){e.notionKey=null}}},[e._v("\n          Log out\n        ")])],1),e._v(" "),n("NuxtChild",e._b({},"NuxtChild",{notion:e.notion},!1))]:n("b-spinner",[e._v("\n      Loading...\n    ")])],2):n("b-form",{staticClass:"mb-3",on:{submit:function(t){return t.preventDefault(),e.setNotionKey.apply(null,arguments)}}},[n("b-form-group",{attrs:{label:"Notion API key","label-for":"notionKey"}},[n("b-form-input",{attrs:{id:"notionKey",lazy:"",placeholder:"Enter your Notion API key"},model:{value:e.notionKey,callback:function(t){e.notionKey=t},expression:"notionKey"}})],1)],1):n("b-spinner",[e._v("\n    Loading...\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports}}]);