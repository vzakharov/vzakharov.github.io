(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{327:function(t,e,n){var content=n(333);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("60ba9ca8",content,!0,{sourceMap:!1})},331:function(t,e,n){"use strict";var l=n(13),o=n(125);l({target:"String",proto:!0,forced:n(126)("blink")},{blink:function(){return o(this,"blink","","")}})},332:function(t,e,n){"use strict";n(327)},333:function(t,e,n){var l=n(68)(!1);l.push([t.i,"[contenteditable=true][data-v-36f85b81]:empty:after{content:attr(data-ph);color:#bbb}",""]),t.exports=l},341:function(t,e,n){"use strict";n.r(e);n(39),n(331);var l={props:{value:{},tag:{default:"span"},placeholder:{default:"…"},editable:{default:!0},lazy:{default:!1},type:{default:"text"}},data:function(){return{initialContent:this.value,blink:null,blinkInterval:null,focused:null}},mounted:function(){var t=this;this.$watch("value",{immediate:!0,handler:function(t){var e=this;t?clearInterval(this.blinkInterval):this.blinkInterval=setInterval((function(){e.blink=!e.blink}),500)}}),this.$once("hook:beforeDestroy",(function(){return clearInterval(t.blinkInterval)}))},watch:{value:function(t){t!=this.$refs.me.innerText&&(this.initialContent=t)}},methods:{escape:n(326).escape}},o=(n(332),n(66)),component=Object(o.a)(l,(function(){var t=this,e=t.$createElement;return(t._self._c||e)(t.tag,{ref:"me",tag:"component",class:{"text-muted":!t.initialContent,"border-start border-dark":t.focused&&!t.value&&t.blink,editable:!0},style:{display:"inline",outline:"none","white-space":"pre-wrap"},attrs:{contenteditable:t.editable,"data-ph":!t.focused&&t.placeholder},domProps:{textContent:t._s(t.initialContent)},on:{input:function(e){t.val=e.target.innerText.replace(" "," "),"number"===t.type&&(t.val=parseFloat(t.val)),t.$emit("input",t.val)},focus:function(e){t.focused=!0},blur:function(e){t.focused=!1,t.initialContent=t.value}}})}),[],!1,null,"36f85b81",null);e.default=component.exports}}]);