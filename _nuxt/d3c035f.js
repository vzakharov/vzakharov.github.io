(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{328:function(e,t,r){"use strict";function n(source,e){if(null==source)return{};var t,i,r=function(source,e){if(null==source)return{};var t,i,r={},n=Object.keys(source);for(i=0;i<n.length;i++)t=n[i],e.indexOf(t)>=0||(r[t]=source[t]);return r}(source,e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(source);for(i=0;i<n.length;i++)t=n[i],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(source,t)&&(r[t]=source[t])}return r}r.d(t,"a",(function(){return n}))},329:function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},332:function(e,t,r){"use strict";r(5),r(4),r(2),r(6),r(3),r(7);var n=r(328),o=r(29),c=r(0),l=(r(67),r(11),r(19),r(16),r(1),r(44),r(47),r(82),r(90)),f=r.n(l),d=r(327),h=["properties"];function m(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?m(Object(source),!0).forEach((function(t){Object(c.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):m(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}function x(e){var t=f.a.create({baseURL:"https://ideality.app/api/notion/",headers:v({},e?{Authorization:"Bearer ".concat(e)}:{})});Object.assign(this,{createPage:function(e){return Object(o.a)(regeneratorRuntime.mark((function r(){var n,o,l,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n=e.parent,o=e.properties,e.content,r.next=3,t.post("pages",{parent:n,properties:Object(d.chain)(o).mapValues((function(e,t){return"string"==typeof e?Object(c.a)({},"name"===t?"title":"rich_text",[{text:{content:e}}]):"number"==typeof e?{number:e}:void 0})).mapKeys((function(e,t){return Object(d.upperFirst)(t).replace(/([a-z])([A-Z])/g,"$1 $2")})).value()});case 3:return l=r.sent,O(data=l.data),r.abrupt("return",data);case 7:case"end":return r.stop()}}),r)})))()},getPage:function(e){return Object(o.a)(regeneratorRuntime.mark((function r(){var n,data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,t.get("pages/".concat(e));case 2:return n=r.sent,O(data=n.data),r.abrupt("return",data);case 6:case"end":return r.stop()}}),r)})))()},getUser:function(){return Object(o.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(e){r.next=2;break}throw new Error("No token provided. Please use an instance of Notion with a token.");case 2:return r.next=4,t.get("users/me");case 4:return r.abrupt("return",r.sent.data);case 5:case"end":return r.stop()}}),r)})))()},queryDatabase:function(e,r){return Object(o.a)(regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,t.post("databases/".concat(e,"/query"),r);case 2:return o.abrupt("return",o.sent.data.results.map((function(e){e.properties;var details=Object(n.a)(e,h);return O(e),v(v({},e.properties),{},{details:details})})));case 3:case"end":return o.stop()}}),o)})))()},getBlock:function(e){var r=arguments,n=this;return Object(o.a)(regeneratorRuntime.mark((function o(){var c,l,f,d,data;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return c=r.length>1&&void 0!==r[1]?r[1]:{},l=c.recurse,f=void 0!==l&&l,o.next=3,t.get("blocks/".concat(e));case 3:if(d=o.sent,data=d.data,!d.data.has_children){o.next=10;break}return o.next=9,n.getBlockChildren(e,{recurse:f});case 9:data.children=o.sent;case 10:return o.abrupt("return",data);case 11:case"end":return o.stop()}}),o)})))()},getBlockChildren:function(e){var r=arguments,n=this;return Object(o.a)(regeneratorRuntime.mark((function c(){var l,f,d,h,m;return regeneratorRuntime.wrap((function(c){for(;;)switch(c.prev=c.next){case 0:return l=r.length>1&&void 0!==r[1]?r[1]:{},f=l.recurse,d=void 0!==f&&f,c.next=3,t.get("blocks/".concat(e,"/children"));case 3:if(h=c.sent,m=h.data.results,!d){c.next=8;break}return c.next=8,Promise.all(m.map(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.has_children){e.next=5;break}return e.next=4,n.getBlockChildren(t.id,{recurse:d});case 4:t.children=e.sent;case 5:return e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 8:return c.abrupt("return",m);case 9:case"end":return c.stop()}}),c)})))()}})}function O(data){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"properties";data[e]=Object(d.chain)(data[e]).mapKeys((function(e,t){return Object(d.camelCase)(t)})).mapValues((function(object,e){var t,r=function e(object){return null!=object&&object.type?e(object[object.type]):object}(object);["title","rich_text"].includes(object.type)&&(r=null===(t=r[0])||void 0===t?void 0:t.plain_text);return r})).value()}x.anon=new x,t.a=x},436:function(e,t,r){"use strict";r.r(t);var n=r(29),o=(r(39),r(11),r(165),r(67),r(332)),c={data:function(){var e=this.$route.query;return{id:e.id,url:e.url,shortLink:null,copied:!1,mounted:!1}},mounted:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=e.url,n=e.id,!r){t.next=5;break}e.shorten(),t.next=10;break;case 5:if(!n){t.next=10;break}return t.next=8,o.a.anon.getPage(n);case 8:c=t.sent.properties.url,window.location=c;case 10:e.mounted=!0;case 11:case"end":return t.stop()}}),t)})))()},methods:{copyToClipboard:function(){var e=this,t=this.shortLink;navigator.clipboard.writeText(t),this.copied=!0,setTimeout((function(){return e.copied=!1}),1e3)},shorten:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(r=e.url)){t.next=15;break}return t.prev=2,t.next=5,o.a.anon.createPage({parent:{database_id:"7bcfca75ac5f40b68c3cf876b08316e2"},properties:{name:r.match(/^(?:\w+:\/\/)([^\/]+)/)[1],url:r}});case 5:n=t.sent,c=n.properties.shortLink,console.log({shortLink:c}),Object.assign(e,{shortLink:c,url:null}),t.next=15;break;case 11:t.prev=11,t.t0=t.catch(2),e.url=null,console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[2,11]])})))()}},watch:{url:function(e){e&&this.shorten()}}},l=r(66),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"vh-100 d-flex align-items-center justify-content-center text-center"},[!e.mounted||e.id||e.url?r("span",[r("b-spinner",{staticClass:"ml-2",attrs:{variant:"primary",animation:{name:"border",duration:1e3,timing:"ease-in-out",delay:100}}}),e._v(" "),r("span",{staticClass:"ml-2",domProps:{textContent:e._s(e.url?"Shortening your link":e.id?"Redirecting":"Loading")}}),e._v(", please wait...\n  ")],1):[e.shortLink?r("span",{staticClass:"text-muted",staticStyle:{cursor:"pointer"},domProps:{textContent:e._s(e.copied?"Copied!":e.shortLink+" (click to copy)")},on:{click:e.copyToClipboard}}):r("b-form-input",{staticClass:"mb-3",staticStyle:{"max-width":"400px"},attrs:{lazy:"",placeholder:e.shortLink?"Enter another long URL":"Enter a long URL"},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})]],2)}),[],!1,null,null,null);t.default=component.exports}}]);