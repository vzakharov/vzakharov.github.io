(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{347:function(t,o,e){var content=e(366);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(69).default)("0f27d93a",content,!0,{sourceMap:!1})},365:function(t,o,e){"use strict";e(347)},366:function(t,o,e){var n=e(68)(!1);n.push([t.i,'[contenteditable]:empty:after{content:"Hello world!";color:#999}.full-height{height:calc(100vh - 48px)}#editor{font-size:1.2em;font-family:"Sorts Mill Goudy","Georgia",serif;box-shadow:0 2px 5px -1px rgba(50,50,93,.25),0 1px 3px -1px rgba(0,0,0,.3);border-radius:5px;min-height:calc(100vh - 120px);background-color:#fff}.ql-toolbar{display:none}',""]),t.exports=n},391:function(t,o,e){"use strict";e.r(o);var n=e(34),r=(e(338),e(16),e(2),e(1),e(46),e(126),e(101),e(241),e(11),e(165),e(24),e(39),e(14),e(36),e(19),e(3),e(326)),c=e.n(r),l=e(341),d=e(364),h=c.a.findIndex,m=c.a.without;function f(){return{content:"",created:Date.now(),id:1e3*Math.round(Date.now()+Math.random())}}var v={components:{VueEditor:d.VueEditor},data:function(){return{mounted:!1,showSidebar:null,width:null,tempContent:null,workspaceTop:0,docs:null,doc:null,docChanged:!0,window:null,docTimer:null,idleTimer:null,historyPreview:null,showHistoryChart:!0,historyChart:null,autoStartDocTimer:!0,console:console,document:document}},mounted:function(){var t=this;this.docs=c()(localStorage).keys().filter((function(t){return t.startsWith("doc_")})).map((function(t){return JSON.parse(localStorage.getItem(t))})).value(),this.docs.length||(this.docs=[f()]),this.doc=c.a.find(this.docs,{id:Number(this.$route.query.id||localStorage.getItem("lastDocId"))})||this.docs[0];var o=function(){t.width=window.innerWidth,t.workspaceTop=document.getElementById("workspace").offsetTop,t.showSidebar=t.width>=768};window.addEventListener("resize",o),this.window=window,this.mounted=!0,this.$nextTick((function(){o(),t.$watch("chartConfig",{immediate:!0,handler:function(t){var o,e=document.getElementById("history-chart");console.log(e),null===(o=this.historyChart)||void 0===o||o.destroy(),this.historyChart=new l.a(e,t)}})}))},computed:{content:{get:function(){return(this.historyPreview||this.doc).content},set:function(t){(this.historyPreview||this.doc).content=t}},docTimeAsHHMMSS:{get:function(){return this.timeAsHHMMSS(this.doc.time)},set:function(t){var o=this.doc;if(t.match(/^\d\d?:\d\d:\d\d$/)){var e=t.split(":"),r=Object(n.a)(e,3),c=r[0],l=r[1],d=r[2];o.time=3600*Number(c)+60*Number(l)+Number(d)}}},wordcount:function(){var content=(this.historyPreview||this.doc).content;return this.getWordcount(content)},chartConfig:function(){var t,o=this;return{type:"scatter",data:{datasets:[{label:"Words vs minutes",backgroundColor:"rgba(54,162,235,0.2)",borderColor:"rgba(54,162,235,1)",data:null===(t=this.doc.history)||void 0===t?void 0:t.map((function(t){var time=t.time,content=t.content;return{x:time/60,y:o.getWordcount(content)}}))}]},options:{animation:{duration:0},scales:{x:{min:0},y:{min:0}},onHover:function(t,e){var r=Object(n.a)(e,1)[0];if(r){var c=o.doc.history[r.index];o.historyPreview=c}else{var l=o.historyPreview;setTimeout((function(){o.historyPreview==l&&(o.historyPreview=null)}),1e3)}}}}}},methods:{startDocTimer:function(){var t=this;void 0===this.doc.time&&this.$set(this.doc,"time",0),this.docTimer||(this.docTimer=setInterval((function(){t.doc.time+=1}),1e3))},timeAsHHMMSS:function(time){if(!time)return"--:--:--";var t=Math.floor(time/3600),o=Math.floor((time-3600*t)/60),e=time-3600*t-60*o;return"".concat(t,":").concat(o<10?"0":"").concat(o,":").concat(e<10?"0":"").concat(e)},getWordcount:function(content){if(null==content||!content.trim())return 0;var t=content.replace(/<[^>]+>/g," ");console.log("stripped",t);var o=t.split(/\W+/).filter((function(t){return t.trim()}));return console.log("words",o),o.length},newDoc:f,without:m,findIndex:h},watch:{"doc.id":{handler:function(){this.tempContent=this.doc.content,this.$nextTick((function(){var t;null===(t=document.getElementById("editor"))||void 0===t||t.focus()})),localStorage.setItem("lastDocId",this.doc.id),this.docChanged=!0}},"doc.content":{handler:function(){var t=this,o=this.doc;this.docChanged?this.docChanged=!1:(clearTimeout(this.idleTimer),this.idleTimer=setTimeout((function(){var e=o.history||t.$set(o,"history",[]),time=o.time,content=o.content;e.push({time:time,content:content})}),5e3),this.autoStartDocTimer&&this.startDocTimer())}},doc:{handler:function(t){localStorage.setItem("doc_".concat(t.id),JSON.stringify(t))},deep:!0},docs:{handler:function(t){c()(localStorage).keys().filter((function(t){return t.startsWith("doc_")})).filter((function(o){return!t.find((function(t){return t.id===parseInt(o.replace("doc_",""))}))})).forEach((function(t){return localStorage.removeItem(t)}))}}}},w=(e(365),e(66)),component=Object(w.a)(v,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return t.doc?e("b-container",{staticClass:"px-0",staticStyle:{overflow:"hidden"},attrs:{fluid:""}},[e("div",{staticClass:"d-flex justify-content-start align-items-center sticky-top pb-1 border"},[e("b-button",{staticClass:"m-1",attrs:{size:"sm",variant:t.showSidebar?"outline-secondary":"light"},on:{click:function(){return t.showSidebar=!t.showSidebar}}},[t._v("\n      ≡\n    ")]),t._v(" "),e("b-button",{staticClass:"m-1",attrs:{size:"sm",variant:t.docTimer?"outline-danger":"success"},on:{click:function(){t.docTimer?(t.window.clearInterval(t.docTimer),t.docTimer=null):t.startDocTimer()}}},[t._v("\n      "+t._s(t.docTimer?"Stop timer":"Start timer")+"\n    ")]),t._v(" "),e("b-form-input",{staticClass:"m-1",staticStyle:{"max-width":"100px"},attrs:{type:"text",size:"sm",variant:"outline-secondary"},model:{value:t.docTimeAsHHMMSS,callback:function(o){t.docTimeAsHHMMSS=o},expression:"docTimeAsHHMMSS"}}),t._v(" "),e("b-check",{staticClass:"m-1",attrs:{size:"sm",variant:"outline-secondary"},model:{value:t.autoStartDocTimer,callback:function(o){t.autoStartDocTimer=o},expression:"autoStartDocTimer"}},[t._v("\n      Start on input\n    ")])],1),t._v(" "),e("b-row",{staticClass:"full-height px-2",style:{"--full-height":"calc(100vh - "+t.workspaceTop+"px)"},attrs:{id:"workspace"}},[e("b-col",{directives:[{name:"show",rawName:"v-show",value:t.showSidebar,expression:"showSidebar"}],class:{"position-absolute":t.width<768,"shadow bg-light full-height":!0},style:{opacity:t.width<768&&.9,overflowY:"auto",fontSize:"0.7em"},attrs:{cols:"8",md:"5",lg:"4",xl:"3"}},[t._l(t.docs,(function(o,n){return e("b-row",{key:n},[e("b-col",{staticClass:"p-2",style:Object.assign({},{cursor:"pointer",overflow:"hidden","white-space":"nowrap","text-overflow":"ellipsis"},!o.content&&{"font-style":"italic",color:"#868686"},o===t.doc&&{"font-weight":"bold"}),attrs:{cols:"9"},domProps:{textContent:t._s(o.content.replace(/<[^>]+>/g,"")||new Date(o.created).toLocaleString("en-US",{weekday:"short",month:"short",day:"numeric",hour:"numeric",minute:"numeric",hour12:!0}))},on:{click:function(e){t.doc=o,t.$router.push({query:{id:o.id}})}}}),t._v(" "),e("b-col",[t.docs.length>1?e("b-button-close",{attrs:{size:"sm"},on:{click:function(e){t.window.confirm("Are you sure? THERE IS NO UNDO!")&&(t.doc=t.docs[n-1]||t.docs[n+1]||null,t.docs=t.without(t.docs,o))}}}):t._e()],1)],1)})),t._v(" "),e("b-button",{staticClass:"mt-2",attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(o){t.doc=t.newDoc(),t.docs=t.docs.concat([t.doc])}}},[t._v("\n        +\n      ")]),t._v(" "),t.doc.history&&t.doc.history.length?[e("h5",{staticClass:"mt-4"},[t._v("\n          Revision history\n        ")]),t._v(" "),e("b-button",{staticClass:"mt-2",attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(o){t.showHistoryChart=!t.showHistoryChart}}},[t._v("\n          "+t._s(t.showHistoryChart?"Table":"Chart")+"\n        ")]),t._v(" "),e("canvas",{directives:[{name:"show",rawName:"v-show",value:t.showHistoryChart,expression:"showHistoryChart"}],attrs:{id:"history-chart"}}),t._v(" "),t.showHistoryChart?t._e():e("b-table",{attrs:{items:t.doc.history,fields:[{key:"time",label:"Time"},{key:"content",label:"Words",formatter:t.getWordcount},{key:"remove",label:""}]},scopedSlots:t._u([{key:"cell(time)",fn:function(o){var n=o.item;return[e("span",{style:{cursor:"pointer","font-weight":n===t.historyPreview?"bold":"normal"},domProps:{textContent:t._s(t.timeAsHHMMSS(n.time))},on:{click:function(o){t.historyPreview=n},mouseover:function(o){t.historyPreview=n},mouseleave:function(o){t.window.setTimeout((function(){t.historyPreview==n&&(t.historyPreview=null)}),1e3)}}})]}},{key:"cell(remove)",fn:function(o){var n=o.item;return[e("b-button-close",{attrs:{size:"sm"},on:{click:function(o){t.window.confirm("Are you sure? THERE IS NO UNDO!")&&(t.doc.history=t.without(t.doc.history,n))}}})]}}],null,!1,532269713)}),t._v(" "),t.historyPreview?e("b-button",{staticClass:"mt-2",attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(o){t.historyPreview=null}}},[t._v("\n          Exit preview\n        ")]):t._e(),t._v(" "),e("b-button",{staticClass:"mt-2",attrs:{size:"sm",variant:"outline-secondary"},on:{click:function(o){t.window.confirm("Are you sure? THERE IS NO UNDO!")&&(t.doc.history=[])}}},[t._v("\n          Clear history\n        ")])]:t._e()],2),t._v(" "),e("b-col",{staticClass:"full-height bg-light pt-4",staticStyle:{overflow:"auto"}},[e("div",{style:{maxWidth:"900px",margin:"0 auto"}},[e("VueEditor",{style:{backgroundColor:t.historyPreview?"#eee":"#fff"},attrs:{id:"editor",placeholder:"Hello, world!",disabled:!!t.historyPreview},model:{value:t.content,callback:function(o){t.content=o},expression:"content"}}),t._v(" "),e("div",{staticClass:"small",staticStyle:{color:"#bbb",position:"fixed",right:"0",top:"0","z-index":"1",padding:"0.5em","background-color":"#fff"}},[t._v("\n          "+t._s(t.wordcount)+" "+t._s(1===t.wordcount?"word":"words")+"\n          "),t._v("\n          ~"+t._s(10*Math.round(t.wordcount/(t.historyPreview||t.doc).time*3600/10))+" words/hour\n        ")])],1),t._v(" "),e("div",{staticStyle:{height:"200px"}})])],1)],1):t._e()}),[],!1,null,null,null);o.default=component.exports}}]);