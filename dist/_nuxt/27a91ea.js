(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{329:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},333:function(t,e,n){var content=n(340);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("20139912",content,!0,{sourceMap:!1})},338:function(t,e,n){"use strict";var l=n(14),r=n(130);l({target:"String",proto:!0,forced:n(131)("blink")},{blink:function(){return r(this,"blink","","")}})},339:function(t,e,n){"use strict";n(333)},340:function(t,e,n){var l=n(68)(!1);l.push([t.i,"[contenteditable=true][data-v-3211f41e]:empty:after{content:attr(data-ph);color:#bbb}",""]),t.exports=l},363:function(t,e,n){"use strict";n.r(e);n(39),n(338);var l={props:{value:{},tag:{default:"span"},placeholder:{default:"…"},editable:{default:!0},lazy:{default:!1},type:{default:"text"},display:{default:"inline"}},data:function(){return{initialContent:this.value,blink:null,blinkInterval:null,focused:null}},mounted:function(){var t=this;this.$watch("value",{immediate:!0,handler:function(t){var e=this;t?clearInterval(this.blinkInterval):this.blinkInterval=setInterval((function(){e.blink=!e.blink}),500)}}),this.$once("hook:beforeDestroy",(function(){return clearInterval(t.blinkInterval)}))},watch:{value:function(t){t!=this.$refs.me.innerText&&(this.initialContent=t)}},methods:{escape:n(327).escape}},r=(n(339),n(66)),component=Object(r.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.tag,{ref:"me",tag:"component",class:{"text-muted":!t.initialContent,"border-start border-dark":t.focused&&!t.value&&t.blink,editable:!0},style:{display:t.display,outline:"none","white-space":"pre-wrap"},attrs:{contenteditable:t.editable,"data-ph":!t.focused&&t.placeholder},domProps:{textContent:t._s(t.initialContent)},on:{input:function(e){t.val=e.target.innerText.replace(" "," "),"number"===t.type&&(t.val=parseFloat(t.val)),t.$emit("input",t.val)},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1,t.initialContent=t.value}}})}),[],!1,null,"3211f41e",null);e.default=component.exports}}]);