(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{334:function(t,e,n){var content=n(344);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(69).default)("c26b16c8",content,!0,{sourceMap:!1})},343:function(t,e,n){"use strict";n(334)},344:function(t,e,n){var o=n(68)(!1);o.push([t.i,'#editor[data-v-565a2aa0]{font-size:1.2em;font-family:"Sorts Mill Goudy","Georgia",serif;border-radius:5px;height:calc(100vh - 120px);padding:80px 60px 200px;background-color:#fff}*[data-v-565a2aa0] h1,*[data-v-565a2aa0] h2,*[data-v-565a2aa0] h3,*[data-v-565a2aa0] h4,*[data-v-565a2aa0] h5,*[data-v-565a2aa0] h6{margin-top:1.5em;margin-bottom:.5em}',""]),t.exports=o},364:function(t,e,n){"use strict";n.r(e);n(17),n(16),n(11),n(24),n(19),n(15),n(37);var o={props:["value","disabled","disableFormatting","refresh"],data:function(){return{content:this.value}},computed:{html:function(){var t,e=this,content=this.content;return content=null===(t=content)||void 0===t?void 0:t.split(/\n+/).map((function(t){var n,o="p",c="",r=/^(#+) /,l=null===(n=r.exec(t))||void 0===n?void 0:n[1].length,d=/^(\*) /,f=/^(\[)(.+)(\])$/;if(!e.disableFormatting){var h=function(text){return'<span style="color: #ccc">'.concat(text,"</span>")};if(l?(o="h".concat(l),t=t.replace(r,h("$1 "))):d.test(t)?(o="li",t=t.replace(d,h("$1 "))):f.test(t)&&(t=t.replace(f,'<button class="btn btn-primary">'.concat(h("$1"),"$2").concat(h("$3"),"</button>"))),t.trim()){var v,m=/(\*{1,2})(.*?)(\*{1,2})/g,$=null===(v=m.exec(t))||void 0===v?void 0:v[1].length,x=/(\[)(.+?)(\]\(.+?\))/g,w=/(==)(.+?)(==)/g;if($){var y=["em","strong"][$-1];t=t.replace(m,"".concat(h("$1"),"<").concat(y,">$2</").concat(y,">").concat(h("$3")))}x.test(t)&&(t=t.replace(x,"".concat(h("$1"),'<a href="$4">$2</a>').concat(h("$3")))),w.test(t)&&(t=t.replace(w,"".concat(h("$1"),"<mark>$2</mark>").concat(h("$3"))))}else c=' style="height: 1em"'}return"<".concat(o).concat(c,">").concat(t,"</").concat(o,">")})).join("\n")}},methods:{blur:function(t){document.activeElement!==t.target&&(this.content=this.value)}},watch:{refresh:function(){this.content=this.value}}},c=(n(343),n(66)),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cool-shadow",style:{"background-color":t.disabled?"#eee":"#fff",overflowY:"scroll"},attrs:{id:"editor"}},[n("div",{staticStyle:{outline:"none"},attrs:{contenteditable:!t.disabled},domProps:{innerHTML:t._s(t.html)},on:{input:function(e){return t.$emit("input",e.target.innerText)},blur:t.blur}})])}),[],!1,null,"565a2aa0",null);e.default=component.exports}}]);