(function(t){function e(e){for(var n,r,s=e[0],u=e[1],p=e[2],m=0,c=[];m<s.length;m++)r=s[m],i[r]&&c.push(i[r][0]),i[r]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(t[n]=u[n]);l&&l(e);while(c.length)c.shift()();return o.push.apply(o,p||[]),a()}function a(){for(var t,e=0;e<o.length;e++){for(var a=o[e],n=!0,s=1;s<a.length;s++){var u=a[s];0!==i[u]&&(n=!1)}n&&(o.splice(e--,1),t=r(r.s=a[0]))}return t}var n={},i={app:0},o=[];function r(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=n,r.d=function(t,e,a){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(r.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(a,n,function(e){return t[e]}.bind(null,n));return a},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/Metronome/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var p=0;p<s.length;p++)e(s[p]);var l=u;o.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("cd49")},"0063":function(t,e,a){},"00c3":function(t,e,a){"use strict";var n=a("6fde"),i=a.n(n);i.a},"3b52":function(t,e,a){"use strict";var n=a("0063"),i=a.n(n);i.a},"555a":function(t,e,a){t.exports=a.p+"img/icon.526931fa.png"},"6fde":function(t,e,a){},cd49:function(t,e,a){"use strict";a.r(e);var n=a("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("b-navbar",{attrs:{type:"dark",variant:"primary"}},[n("b-navbar-brand",[n("img",{staticClass:"d-inline-block align-top",attrs:{src:a("555a"),width:"32",height:"32"}}),t._v("\n\t\t\t\tMetronome\n\t\t\t")]),n("b-navbar-nav",{staticClass:"ml-auto"},[n("b-dropdown-item",{attrs:{href:"https://github.com/SeanSobey/Metronome"}},[n("font-awesome-icon",{attrs:{icon:["fab","github"],size:"lg"}})],1)],1)],1),n("b-jumbotron",{staticClass:"my-2",attrs:{"text-variant":"center"}},[n("h2",[n("font-awesome-icon",{staticClass:"mr-3",attrs:{icon:"clock"}}),n("label",[t._v(t._s(t._f("time")(t.time)))])],1),n("PlaybackInput",{on:{play:t.onPlay,stop:t.onStop,pause:t.onPause}}),n("VolumeInput",{on:{"volume-down":t.onVolumeDown,"volume-up":t.onVolumeUp,"volume-on":t.onVolumeOn,"volume-off":t.onVolumeOff}}),n("hr"),n("BpmIndicator",{attrs:{currentNote:t.currentNote}}),n("hr"),n("BpmInput",{staticClass:"my-4",model:{value:t.bpm,callback:function(e){t.bpm=e},expression:"bpm"}}),n("BpmRampInput",{staticClass:"my-4",model:{value:t.bpmRamp,callback:function(e){t.bpmRamp=e},expression:"bpmRamp"}})],1)],1)])},o=[],r=a("9ab4"),s=a("60a3"),u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button-group",{staticClass:"m-2",attrs:{size:"lg"}},[a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"Play"},on:{click:t.playOnClick}},[a("font-awesome-icon",{attrs:{icon:"play"}})],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"Pause"},on:{click:t.pauseOnClick}},[a("font-awesome-icon",{attrs:{icon:"pause"}})],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"Stop"},on:{click:t.stopOnClick}},[a("font-awesome-icon",{attrs:{icon:"stop"}})],1)],1)},p=[];let l=class extends s["c"]{playOnClick(){this.$emit("play")}stopOnClick(){this.$emit("stop")}pauseOnClick(){this.$emit("pause")}};l=r["a"]([Object(s["a"])({})],l);var m=l,c=m,b=a("2877"),h=Object(b["a"])(c,u,p,!1,null,"591b167e",null),d=h.exports,f=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-button-group",{staticClass:"m-2",attrs:{size:"lg"}},[a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"Volume Down"},on:{click:t.volumeDownOnClick}},[a("font-awesome-icon",{attrs:{icon:"volume-down"}})],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"Volume Up"},on:{click:t.volumeUpOnClick}},[a("font-awesome-icon",{attrs:{icon:"volume-up"}})],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:t.mute?"Volume On":"Volume Off"},on:{click:t.volumeOffOnClick}},[a("font-awesome-icon",{attrs:{icon:"volume-off"}}),t._v(" "+t._s(t._f("volume")(t.volume,t.mute))+"\n\t")],1)],1)},v=[];s["c"].filter("volume",(t,e)=>{if(e)return"";const a=t>0?"+":"";return`${a}${t}db`});let V=class extends s["c"]{constructor(){super(...arguments),this.mute=!1,this.volume=0}volumeDownOnClick(){this.mute=!1,this.volume=Math.round(Math.max(this.volume-3,-24)),this.$emit("volume-down",this.volume)}volumeUpOnClick(){this.mute=!1,this.volume=Math.round(Math.min(this.volume+3,24)),this.$emit("volume-up",this.volume)}volumeOffOnClick(){this.mute=!this.mute,this.mute?this.$emit("volume-off"):this.$emit("volume-on")}};V=r["a"]([Object(s["a"])({})],V);var g=V,_=g,y=Object(b["a"])(_,f,v,!1,null,"e11c679c",null),M=y.exports,w=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-input-group",{attrs:{size:"lg"}},[a("b-input-group-prepend",[a("b-input-group-text",[a("font-awesome-icon",{staticClass:"mr-1",attrs:{icon:"spinner"}}),t._v("BPM\n\t\t")],1)],1),a("b-form-input",{attrs:{type:"range",size:"lg",min:t.bpmMin,max:t.bpmMax},model:{value:t.inputValue,callback:function(e){t.inputValue=t._n(e)},expression:"inputValue"}}),a("b-input-group-append",[a("b-button-group",[a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"BPM--"},on:{click:function(e){return t.decBpm()}}},[a("font-awesome-icon",{attrs:{icon:"minus"}})],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"primary",title:"BPM++"},on:{click:function(e){return t.incBpm()}}},[a("font-awesome-icon",{attrs:{icon:"plus"}})],1)],1),a("b-button",{directives:[{name:"b-tooltip",rawName:"v-b-tooltip.hover",modifiers:{hover:!0}}],attrs:{variant:"outline-primary",title:"BPM Tap"},on:{click:function(e){return t.tapBpm(e)}}},[t._v("Tap")]),a("b-input-group-text",[t._v(t._s(t.formatBpm(t.inputValue)))])],1)],1)},x=[];const O=10,k=300;class T{static bpm(t,e){const a=t.toString(10);return a.length<3?"0"+a:a}}class j extends s["c"]{constructor(){super(...arguments),this.inputValue=this.value}inputValueWatcher(t){this.$emit("input",t)}}r["a"]([Object(s["b"])()],j.prototype,"value",void 0),r["a"]([Object(s["d"])("inputValue")],j.prototype,"inputValueWatcher",null);const C=4e3;let $=class extends j{constructor(){super(...arguments),this.bpmMin=O,this.bpmMax=k,this.bpmValue=this.value,this.taps=[],this.formatBpm=T.bpm}incBpm(){this.inputValue>=this.bpmMax||(this.inputValue++,this.$emit("input",this.inputValue))}decBpm(){this.inputValue<=this.bpmMin||(this.inputValue--,this.$emit("input",this.inputValue))}tapBpm(t){const e=t.target;e.blur();const a=(new Date).getTime();if(this.taps.length>0&&a-this.taps[this.taps.length-1]>C&&(this.taps=[],this.inputValue=100),this.taps.push(a),1===this.taps.length)return;const n=[];for(let o=1;o<this.taps.length;o++)n.push(this.taps[o]-this.taps[o-1]);const i=n.reduce((t,e)=>t+e)/n.length;this.inputValue=Math.round(6e4/i),this.$emit("input",this.inputValue)}};$=r["a"]([Object(s["a"])({})],$);var B=$,P=B,N=Object(b["a"])(P,w,x,!1,null,"06997cc8",null),R=N.exports,S=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"Pills"}},t._l(4,function(e){return a("b-badge",{key:e,staticClass:"mx-2 bpm-indicator",attrs:{pill:"",variant:t.getVariant(e)}},[t._v(t._s(e))])}),1)},I=[];let E=class extends s["c"]{getVariant(t){return this.currentNote===t?"dark":"primary"}};r["a"]([Object(s["b"])({required:!1,default:0})],E.prototype,"currentNote",void 0),E=r["a"]([Object(s["a"])({})],E);var D=E,W=D,q=(a("3b52"),Object(b["a"])(W,S,I,!1,null,"800e5fe2",null)),z=q.exports,U=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-input-group",{attrs:{size:"lg"}},[a("b-input-group-prepend",[a("b-input-group-text",[a("font-awesome-icon",{staticClass:"mr-1",attrs:{icon:"signal"}}),t._v("Ramp\n\t\t")],1)],1),a("b-input-group-text",{staticClass:"rounded-0 bg-white flex-fill"},[a("CompoundNumberInput",{attrs:{disabled:!t.isEnabled(),min:t.bpmMin,max:t.bpmMax},model:{value:t.inputValue.from,callback:function(e){t.$set(t.inputValue,"from",t._n(e))},expression:"inputValue.from"}})],1),a("b-input-group-prepend",{staticClass:"bpm-ramp-input-inline-prepend"},[a("b-input-group-text",[t._v("To")])],1),a("b-input-group-text",{staticClass:"rounded-0 bg-white flex-fill"},[a("CompoundNumberInput",{attrs:{disabled:!t.isEnabled(),min:t.bpmMin,max:t.bpmMax},model:{value:t.inputValue.to,callback:function(e){t.$set(t.inputValue,"to",t._n(e))},expression:"inputValue.to"}})],1),a("b-input-group-prepend",{staticClass:"bpm-ramp-input-inline-prepend"},[a("b-input-group-text",[t._v("Over")])],1),a("b-form-input",{staticClass:"h-100",attrs:{type:"number"}}),a("b-input-group-append",[a("b-input-group-text",[a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.inputValue.rampMode,expression:"inputValue.rampMode",modifiers:{number:!0}}],attrs:{type:"radio",value:"1"},domProps:{checked:t._q(t.inputValue.rampMode,t._n("1"))},on:{change:function(e){t.$set(t.inputValue,"rampMode",t._n("1"))}}}),t._v("\n\t\t\tSecs\n\t\t\t \n\t\t\t"),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.inputValue.rampMode,expression:"inputValue.rampMode",modifiers:{number:!0}}],attrs:{type:"radio",value:"2"},domProps:{checked:t._q(t.inputValue.rampMode,t._n("2"))},on:{change:function(e){t.$set(t.inputValue,"rampMode",t._n("2"))}}}),t._v("\n\t\t\tBars\n\t\t\t \n\t\t\t"),a("input",{directives:[{name:"model",rawName:"v-model.number",value:t.inputValue.rampMode,expression:"inputValue.rampMode",modifiers:{number:!0}}],attrs:{type:"radio",value:"0"},domProps:{checked:t._q(t.inputValue.rampMode,t._n("0"))},on:{change:function(e){t.$set(t.inputValue,"rampMode",t._n("0"))}}}),t._v("\n\t\t\tOff\n\t\t")])],1)],1)},A=[],F=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-row",[a("b-col",[a("b-input-group",{attrs:{size:"sm"}},[a("b-button",{attrs:{slot:"prepend",variant:"primary",disabled:t.disabled},on:{click:function(e){return t.dec()}},slot:"prepend"},[a("font-awesome-icon",{attrs:{icon:"minus"}})],1),a("b-form-input",{attrs:{type:"number",disabled:t.disabled,min:t.min,max:t.max},model:{value:t.inputValue,callback:function(e){t.inputValue=t._n(e)},expression:"inputValue"}}),a("b-button",{attrs:{slot:"append",variant:"primary",disabled:t.disabled},on:{click:function(e){return t.inc()}},slot:"append"},[a("font-awesome-icon",{attrs:{icon:"plus"}})],1)],1)],1)],1),a("b-row",[a("b-col",[a("b-form-input",{attrs:{type:"range",disabled:t.disabled,min:t.min,max:t.max},model:{value:t.inputValue,callback:function(e){t.inputValue=t._n(e)},expression:"inputValue"}})],1)],1)],1)},J=[];let H=class extends j{inc(){this.inputValue+10>this.max||(this.inputValue+=10,this.$emit("input",this.inputValue))}dec(){this.inputValue-10<this.min||(this.inputValue-=10,this.$emit("input",this.inputValue))}};r["a"]([Object(s["b"])({required:!1,default:0})],H.prototype,"min",void 0),r["a"]([Object(s["b"])({required:!1,default:100})],H.prototype,"max",void 0),r["a"]([Object(s["b"])({required:!1,default:!1})],H.prototype,"disabled",void 0),H=r["a"]([Object(s["a"])({})],H);var L=H,G=L,K=Object(b["a"])(G,F,J,!1,null,"a60d3e00",null),Q=K.exports;var X;(function(t){t[t["Off"]=0]="Off",t[t["Secs"]=1]="Secs",t[t["Bars"]=2]="Bars"})(X||(X={}));let Y=class extends j{constructor(){super(...arguments),this.bpmMin=O,this.bpmMax=k,this.formatBpm=T.bpm}inputValueWatcher(t){this.$emit("input",this.inputValue)}incBpmFrom(){this.inputValue.from>=this.bpmMax||this.inputValue.from++}decBpmFrom(){this.inputValue.from<=this.bpmMin||this.inputValue.from--}incBpmTo(){this.inputValue.to>=this.bpmMax||this.inputValue.to++}decBpmTo(){this.inputValue.to<=this.bpmMin||this.inputValue.to--}isEnabled(){return this.inputValue.rampMode!==X.Off}};r["a"]([Object(s["d"])("inputValue",{deep:!0})],Y.prototype,"inputValueWatcher",null),Y=r["a"]([Object(s["a"])({components:{CompoundNumberInput:Q}})],Y);var Z=Y,tt=Z,et=(a("00c3"),Object(b["a"])(tt,U,A,!1,null,"42939948",null)),at=et.exports,nt=a("8cc4"),it=a.n(nt);class ot{constructor(){this._startTime=null,this._timer=null,this._interval=250}start(t){null===this._startTime&&(this._startTime=(new Date).getTime()),this._timer=setInterval(()=>{const e=(new Date).getTime();if(null===this._startTime)throw new Error("startTime is null");const a=e-this._startTime,n=Math.floor(a%864e5/36e5),i=Math.floor(a%36e5/6e4),o=Math.floor(a%6e4/1e3),r=Math.floor(a%1e3);t(n,i,o,r)},this._interval)}pause(){this._timer&&clearInterval(this._timer)}stop(){this._timer&&clearInterval(this._timer),this._startTime=null}}s["c"].filter("time",t=>`${t.h}:${("0"+t.m).slice(-2)}:${("0"+t.s).slice(-2)}`);let rt=class extends s["c"]{constructor(){super(...arguments),this.time={h:0,m:0,s:0,ms:0},this.bpm=100,this.bpmRamp={from:100,to:100,rampMode:X.Off,interval:60},this.timer=new ot,this.isPlaying=!1,this.currentNote=0,this.accent=new it.a.Player("./sounds/Ping Hi.wav").toMaster(),this.beat=new it.a.Player("./sounds/Ping Low.wav").toMaster()}onPlay(){this.onStop(),this.bpmRamp.rampMode!==X.Off&&(this.bpm=this.bpmRamp.from),it.a.Transport.bpm.value=this.bpm,it.a.Transport.bpm.setValueAtTime(this.bpm,"+0"),this.bpmRamp.rampMode===X.Secs&&it.a.Transport.bpm.rampTo(this.bpmRamp.to,this.bpmRamp.interval),it.a.Transport.scheduleRepeat(this._loop.bind(this),"4n"),it.a.Transport.start(),this.timer.start((t,e,a,n)=>this.time={h:t,m:e,s:a,ms:n})}onStop(){this.currentNote=0,it.a.Transport.stop(),it.a.Transport.cancel(),this.timer.stop(),this.time={h:0,m:0,s:0,ms:0}}onPause(){it.a.Transport.pause(),this.timer.pause()}onVolumeDown(t){it.a.Master.mute=!1,it.a.Master.volume.value=t}onVolumeUp(t){it.a.Master.mute=!1,it.a.Master.volume.value=t}onVolumeOn(){it.a.Master.mute=!1}onVolumeOff(){it.a.Master.mute=!0}bpmWatcher(){it.a.Transport.bpm.value=this.bpm}bpmRampWatcher(){}_loop(t){const e=Array.isArray(it.a.Transport.timeSignature)?it.a.Transport.timeSignature[0]:it.a.Transport.timeSignature;if(this.currentNote=this.currentNote%e+1,1===this.currentNote?this.accent.start(t):this.beat.start(t),this.bpmRamp.rampMode===X.Bars&&this.currentNote===e){const e=(this.bpmRamp.to-this.bpmRamp.from)/this.bpmRamp.interval,a=Math.round(Math.max(Math.min(it.a.Transport.bpm.value+e,this.bpmRamp.to),this.bpmRamp.from));it.a.Transport.bpm.setValueAtTime(a,t)}this.bpm=Math.round(it.a.Transport.bpm.value)}};r["a"]([Object(s["d"])("bpm")],rt.prototype,"bpmWatcher",null),r["a"]([Object(s["d"])("bpmRamp",{deep:!0})],rt.prototype,"bpmRampWatcher",null),rt=r["a"]([Object(s["a"])({components:{PlaybackInput:d,VolumeInput:M,BpmInput:R,BpmRampInput:at,BpmIndicator:z}})],rt);var st=rt,ut=st,pt=Object(b["a"])(ut,i,o,!1,null,"f37dd376",null),lt=pt.exports,mt=a("9f7b"),ct=a.n(mt),bt=(a("f9e3"),a("2dd8"),a("ecee")),ht=a("c074"),dt=a("f2d1"),ft=a("ad3d");n["default"].config.productionTip=!1,n["default"].use(ct.a),bt["c"].add(ht["c"],ht["f"],ht["j"],ht["e"],ht["l"],ht["k"],ht["m"],ht["i"],dt["a"],ht["g"],ht["d"],ht["h"],ht["b"],ht["a"]),n["default"].component("font-awesome-icon",ft["a"]),n["default"].component("font-awesome-layers",ft["b"]),n["default"].component("font-awesome-layers-text",ft["c"]),new n["default"]({render:t=>t(lt)}).$mount("#app")}});
//# sourceMappingURL=app.e1365e07.js.map