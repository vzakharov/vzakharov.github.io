(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{374:function(e,t,n){"use strict";n.r(t);var r=n(24),o=(n(67),{props:["notion"],data:function(){return{projects:null}},mounted:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.notion.queryDatabase("96c49f14abd94d679ab877b308e859b6");case 2:e.projects=t.sent;case 3:case"end":return t.stop()}}),t)})))()},methods:{color:function(e){return{green:"#c8f7c5",yellow:"#fff5b3",red:"#f7c5c5",blue:"#c5e0f7",gray:"#e0e0e0",pink:"#f7c5f7"}[e]||"#fff"}}}),c=n(66),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("Projects")]),e._v(" "),e.projects?n("b-table",{attrs:{items:e.projects,striped:"",fields:["name",{key:"status.name",label:"Status"}]},scopedSlots:e._u([{key:"cell(name)",fn:function(t){var r=t.item;return[n("a",{staticStyle:{"text-decoration":"none"},attrs:{href:r.details.url,target:"_blank"}},[e._v("\n        "+e._s(r.name)+"\n      ")])]}},{key:"cell(status.name)",fn:function(t){var r=t.item;return[n("span",{style:{backgroundColor:e.color(r.status.color)},domProps:{textContent:e._s(r.status.name)}})]}}],null,!0)}):n("b-spinner")],1)}),[],!1,null,null,null);t.default=component.exports}}]);