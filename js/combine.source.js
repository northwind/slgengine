/**
 * @author : tongye
 * version	: 0.4
 * email	: norristong_x@qq.com
 */

(function(){
	
	
	

/*!
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function(A,w){function ma(){if(!c.isReady){try{s.documentElement.doScroll("left")}catch(a){setTimeout(ma,1);return}c.ready()}}function Qa(a,b){b.src?c.ajax({url:b.src,async:false,dataType:"script"}):c.globalEval(b.text||b.textContent||b.innerHTML||"");b.parentNode&&b.parentNode.removeChild(b)}function X(a,b,d,f,e,j){var i=a.length;if(typeof b==="object"){for(var o in b)X(a,o,b[o],f,e,d);return a}if(d!==w){f=!j&&f&&c.isFunction(d);for(o=0;o<i;o++)e(a[o],b,f?d.call(a[o],o,e(a[o],b)):d,j);return a}return i?
e(a[0],b):w}function J(){return(new Date).getTime()}function Y(){return false}function Z(){return true}function na(a,b,d){d[0].type=a;return c.event.handle.apply(b,d)}function oa(a){var b,d=[],f=[],e=arguments,j,i,o,k,n,r;i=c.data(this,"events");if(!(a.liveFired===this||!i||!i.live||a.button&&a.type==="click")){a.liveFired=this;var u=i.live.slice(0);for(k=0;k<u.length;k++){i=u[k];i.origType.replace(O,"")===a.type?f.push(i.selector):u.splice(k--,1)}j=c(a.target).closest(f,a.currentTarget);n=0;for(r=
j.length;n<r;n++)for(k=0;k<u.length;k++){i=u[k];if(j[n].selector===i.selector){o=j[n].elem;f=null;if(i.preType==="mouseenter"||i.preType==="mouseleave")f=c(a.relatedTarget).closest(i.selector)[0];if(!f||f!==o)d.push({elem:o,handleObj:i})}}n=0;for(r=d.length;n<r;n++){j=d[n];a.currentTarget=j.elem;a.data=j.handleObj.data;a.handleObj=j.handleObj;if(j.handleObj.origHandler.apply(j.elem,e)===false){b=false;break}}return b}}function pa(a,b){return"live."+(a&&a!=="*"?a+".":"")+b.replace(/\./g,"`").replace(/ /g,
"&")}function qa(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function ra(a,b){var d=0;b.each(function(){if(this.nodeName===(a[d]&&a[d].nodeName)){var f=c.data(a[d++]),e=c.data(this,f);if(f=f&&f.events){delete e.handle;e.events={};for(var j in f)for(var i in f[j])c.event.add(this,j,f[j][i],f[j][i].data)}}})}function sa(a,b,d){var f,e,j;b=b&&b[0]?b[0].ownerDocument||b[0]:s;if(a.length===1&&typeof a[0]==="string"&&a[0].length<512&&b===s&&!ta.test(a[0])&&(c.support.checkClone||!ua.test(a[0]))){e=
true;if(j=c.fragments[a[0]])if(j!==1)f=j}if(!f){f=b.createDocumentFragment();c.clean(a,b,f,d)}if(e)c.fragments[a[0]]=j?f:1;return{fragment:f,cacheable:e}}function K(a,b){var d={};c.each(va.concat.apply([],va.slice(0,b)),function(){d[this]=a});return d}function wa(a){return"scrollTo"in a&&a.document?a:a.nodeType===9?a.defaultView||a.parentWindow:false}var c=function(a,b){return new c.fn.init(a,b)},Ra=A.jQuery,Sa=A.$,s=A.document,T,Ta=/^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,Ua=/^.[^:#\[\.,]*$/,Va=/\S/,
Wa=/^(\s|\u00A0)+|(\s|\u00A0)+$/g,Xa=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,P=navigator.userAgent,xa=false,Q=[],L,$=Object.prototype.toString,aa=Object.prototype.hasOwnProperty,ba=Array.prototype.push,R=Array.prototype.slice,ya=Array.prototype.indexOf;c.fn=c.prototype={init:function(a,b){var d,f;if(!a)return this;if(a.nodeType){this.context=this[0]=a;this.length=1;return this}if(a==="body"&&!b){this.context=s;this[0]=s.body;this.selector="body";this.length=1;return this}if(typeof a==="string")if((d=Ta.exec(a))&&
(d[1]||!b))if(d[1]){f=b?b.ownerDocument||b:s;if(a=Xa.exec(a))if(c.isPlainObject(b)){a=[s.createElement(a[1])];c.fn.attr.call(a,b,true)}else a=[f.createElement(a[1])];else{a=sa([d[1]],[f]);a=(a.cacheable?a.fragment.cloneNode(true):a.fragment).childNodes}return c.merge(this,a)}else{if(b=s.getElementById(d[2])){if(b.id!==d[2])return T.find(a);this.length=1;this[0]=b}this.context=s;this.selector=a;return this}else if(!b&&/^\w+$/.test(a)){this.selector=a;this.context=s;a=s.getElementsByTagName(a);return c.merge(this,
a)}else return!b||b.jquery?(b||T).find(a):c(b).find(a);else if(c.isFunction(a))return T.ready(a);if(a.selector!==w){this.selector=a.selector;this.context=a.context}return c.makeArray(a,this)},selector:"",jquery:"1.4.2",length:0,size:function(){return this.length},toArray:function(){return R.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this.slice(a)[0]:this[a]},pushStack:function(a,b,d){var f=c();c.isArray(a)?ba.apply(f,a):c.merge(f,a);f.prevObject=this;f.context=this.context;if(b===
"find")f.selector=this.selector+(this.selector?" ":"")+d;else if(b)f.selector=this.selector+"."+b+"("+d+")";return f},each:function(a,b){return c.each(this,a,b)},ready:function(a){c.bindReady();if(c.isReady)a.call(s,c);else Q&&Q.push(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(R.apply(this,arguments),"slice",R.call(arguments).join(","))},map:function(a){return this.pushStack(c.map(this,
function(b,d){return a.call(b,d,b)}))},end:function(){return this.prevObject||c(null)},push:ba,sort:[].sort,splice:[].splice};c.fn.init.prototype=c.fn;c.extend=c.fn.extend=function(){var a=arguments[0]||{},b=1,d=arguments.length,f=false,e,j,i,o;if(typeof a==="boolean"){f=a;a=arguments[1]||{};b=2}if(typeof a!=="object"&&!c.isFunction(a))a={};if(d===b){a=this;--b}for(;b<d;b++)if((e=arguments[b])!=null)for(j in e){i=a[j];o=e[j];if(a!==o)if(f&&o&&(c.isPlainObject(o)||c.isArray(o))){i=i&&(c.isPlainObject(i)||
c.isArray(i))?i:c.isArray(o)?[]:{};a[j]=c.extend(f,i,o)}else if(o!==w)a[j]=o}return a};c.extend({noConflict:function(a){A.$=Sa;if(a)A.jQuery=Ra;return c},isReady:false,ready:function(){if(!c.isReady){if(!s.body)return setTimeout(c.ready,13);c.isReady=true;if(Q){for(var a,b=0;a=Q[b++];)a.call(s,c);Q=null}c.fn.triggerHandler&&c(s).triggerHandler("ready")}},bindReady:function(){if(!xa){xa=true;if(s.readyState==="complete")return c.ready();if(s.addEventListener){s.addEventListener("DOMContentLoaded",
L,false);A.addEventListener("load",c.ready,false)}else if(s.attachEvent){s.attachEvent("onreadystatechange",L);A.attachEvent("onload",c.ready);var a=false;try{a=A.frameElement==null}catch(b){}s.documentElement.doScroll&&a&&ma()}}},isFunction:function(a){return $.call(a)==="[object Function]"},isArray:function(a){return $.call(a)==="[object Array]"},isPlainObject:function(a){if(!a||$.call(a)!=="[object Object]"||a.nodeType||a.setInterval)return false;if(a.constructor&&!aa.call(a,"constructor")&&!aa.call(a.constructor.prototype,
"isPrototypeOf"))return false;var b;for(b in a);return b===w||aa.call(a,b)},isEmptyObject:function(a){for(var b in a)return false;return true},error:function(a){throw a;},parseJSON:function(a){if(typeof a!=="string"||!a)return null;a=c.trim(a);if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return A.JSON&&A.JSON.parse?A.JSON.parse(a):(new Function("return "+
a))();else c.error("Invalid JSON: "+a)},noop:function(){},globalEval:function(a){if(a&&Va.test(a)){var b=s.getElementsByTagName("head")[0]||s.documentElement,d=s.createElement("script");d.type="text/javascript";if(c.support.scriptEval)d.appendChild(s.createTextNode(a));else d.text=a;b.insertBefore(d,b.firstChild);b.removeChild(d)}},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,b,d){var f,e=0,j=a.length,i=j===w||c.isFunction(a);if(d)if(i)for(f in a){if(b.apply(a[f],
d)===false)break}else for(;e<j;){if(b.apply(a[e++],d)===false)break}else if(i)for(f in a){if(b.call(a[f],f,a[f])===false)break}else for(d=a[0];e<j&&b.call(d,e,d)!==false;d=a[++e]);return a},trim:function(a){return(a||"").replace(Wa,"")},makeArray:function(a,b){b=b||[];if(a!=null)a.length==null||typeof a==="string"||c.isFunction(a)||typeof a!=="function"&&a.setInterval?ba.call(b,a):c.merge(b,a);return b},inArray:function(a,b){if(b.indexOf)return b.indexOf(a);for(var d=0,f=b.length;d<f;d++)if(b[d]===
a)return d;return-1},merge:function(a,b){var d=a.length,f=0;if(typeof b.length==="number")for(var e=b.length;f<e;f++)a[d++]=b[f];else for(;b[f]!==w;)a[d++]=b[f++];a.length=d;return a},grep:function(a,b,d){for(var f=[],e=0,j=a.length;e<j;e++)!d!==!b(a[e],e)&&f.push(a[e]);return f},map:function(a,b,d){for(var f=[],e,j=0,i=a.length;j<i;j++){e=b(a[j],j,d);if(e!=null)f[f.length]=e}return f.concat.apply([],f)},guid:1,proxy:function(a,b,d){if(arguments.length===2)if(typeof b==="string"){d=a;a=d[b];b=w}else if(b&&
!c.isFunction(b)){d=b;b=w}if(!b&&a)b=function(){return a.apply(d||this,arguments)};if(a)b.guid=a.guid=a.guid||b.guid||c.guid++;return b},uaMatch:function(a){a=a.toLowerCase();a=/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||!/compatible/.test(a)&&/(mozilla)(?:.*? rv:([\w.]+))?/.exec(a)||[];return{browser:a[1]||"",version:a[2]||"0"}},browser:{}});P=c.uaMatch(P);if(P.browser){c.browser[P.browser]=true;c.browser.version=P.version}if(c.browser.webkit)c.browser.safari=
true;if(ya)c.inArray=function(a,b){return ya.call(b,a)};T=c(s);if(s.addEventListener)L=function(){s.removeEventListener("DOMContentLoaded",L,false);c.ready()};else if(s.attachEvent)L=function(){if(s.readyState==="complete"){s.detachEvent("onreadystatechange",L);c.ready()}};(function(){c.support={};var a=s.documentElement,b=s.createElement("script"),d=s.createElement("div"),f="script"+J();d.style.display="none";d.innerHTML="   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
var e=d.getElementsByTagName("*"),j=d.getElementsByTagName("a")[0];if(!(!e||!e.length||!j)){c.support={leadingWhitespace:d.firstChild.nodeType===3,tbody:!d.getElementsByTagName("tbody").length,htmlSerialize:!!d.getElementsByTagName("link").length,style:/red/.test(j.getAttribute("style")),hrefNormalized:j.getAttribute("href")==="/a",opacity:/^0.55$/.test(j.style.opacity),cssFloat:!!j.style.cssFloat,checkOn:d.getElementsByTagName("input")[0].value==="on",optSelected:s.createElement("select").appendChild(s.createElement("option")).selected,
parentNode:d.removeChild(d.appendChild(s.createElement("div"))).parentNode===null,deleteExpando:true,checkClone:false,scriptEval:false,noCloneEvent:true,boxModel:null};b.type="text/javascript";try{b.appendChild(s.createTextNode("window."+f+"=1;"))}catch(i){}a.insertBefore(b,a.firstChild);if(A[f]){c.support.scriptEval=true;delete A[f]}try{delete b.test}catch(o){c.support.deleteExpando=false}a.removeChild(b);if(d.attachEvent&&d.fireEvent){d.attachEvent("onclick",function k(){c.support.noCloneEvent=
false;d.detachEvent("onclick",k)});d.cloneNode(true).fireEvent("onclick")}d=s.createElement("div");d.innerHTML="<input type='radio' name='radiotest' checked='checked'/>";a=s.createDocumentFragment();a.appendChild(d.firstChild);c.support.checkClone=a.cloneNode(true).cloneNode(true).lastChild.checked;c(function(){var k=s.createElement("div");k.style.width=k.style.paddingLeft="1px";s.body.appendChild(k);c.boxModel=c.support.boxModel=k.offsetWidth===2;s.body.removeChild(k).style.display="none"});a=function(k){var n=
s.createElement("div");k="on"+k;var r=k in n;if(!r){n.setAttribute(k,"return;");r=typeof n[k]==="function"}return r};c.support.submitBubbles=a("submit");c.support.changeBubbles=a("change");a=b=d=e=j=null}})();c.props={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"};var G="jQuery"+J(),Ya=0,za={};c.extend({cache:{},expando:G,noData:{embed:true,object:true,
applet:true},data:function(a,b,d){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var f=a[G],e=c.cache;if(!f&&typeof b==="string"&&d===w)return null;f||(f=++Ya);if(typeof b==="object"){a[G]=f;e[f]=c.extend(true,{},b)}else if(!e[f]){a[G]=f;e[f]={}}a=e[f];if(d!==w)a[b]=d;return typeof b==="string"?a[b]:a}},removeData:function(a,b){if(!(a.nodeName&&c.noData[a.nodeName.toLowerCase()])){a=a==A?za:a;var d=a[G],f=c.cache,e=f[d];if(b){if(e){delete e[b];c.isEmptyObject(e)&&c.removeData(a)}}else{if(c.support.deleteExpando)delete a[c.expando];
else a.removeAttribute&&a.removeAttribute(c.expando);delete f[d]}}}});c.fn.extend({data:function(a,b){if(typeof a==="undefined"&&this.length)return c.data(this[0]);else if(typeof a==="object")return this.each(function(){c.data(this,a)});var d=a.split(".");d[1]=d[1]?"."+d[1]:"";if(b===w){var f=this.triggerHandler("getData"+d[1]+"!",[d[0]]);if(f===w&&this.length)f=c.data(this[0],a);return f===w&&d[1]?this.data(d[0]):f}else return this.trigger("setData"+d[1]+"!",[d[0],b]).each(function(){c.data(this,
a,b)})},removeData:function(a){return this.each(function(){c.removeData(this,a)})}});c.extend({queue:function(a,b,d){if(a){b=(b||"fx")+"queue";var f=c.data(a,b);if(!d)return f||[];if(!f||c.isArray(d))f=c.data(a,b,c.makeArray(d));else f.push(d);return f}},dequeue:function(a,b){b=b||"fx";var d=c.queue(a,b),f=d.shift();if(f==="inprogress")f=d.shift();if(f){b==="fx"&&d.unshift("inprogress");f.call(a,function(){c.dequeue(a,b)})}}});c.fn.extend({queue:function(a,b){if(typeof a!=="string"){b=a;a="fx"}if(b===
w)return c.queue(this[0],a);return this.each(function(){var d=c.queue(this,a,b);a==="fx"&&d[0]!=="inprogress"&&c.dequeue(this,a)})},dequeue:function(a){return this.each(function(){c.dequeue(this,a)})},delay:function(a,b){a=c.fx?c.fx.speeds[a]||a:a;b=b||"fx";return this.queue(b,function(){var d=this;setTimeout(function(){c.dequeue(d,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])}});var Aa=/[\n\t]/g,ca=/\s+/,Za=/\r/g,$a=/href|src|style/,ab=/(button|input)/i,bb=/(button|input|object|select|textarea)/i,
cb=/^(a|area)$/i,Ba=/radio|checkbox/;c.fn.extend({attr:function(a,b){return X(this,a,b,true,c.attr)},removeAttr:function(a){return this.each(function(){c.attr(this,a,"");this.nodeType===1&&this.removeAttribute(a)})},addClass:function(a){if(c.isFunction(a))return this.each(function(n){var r=c(this);r.addClass(a.call(this,n,r.attr("class")))});if(a&&typeof a==="string")for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1)if(e.className){for(var j=" "+e.className+" ",
i=e.className,o=0,k=b.length;o<k;o++)if(j.indexOf(" "+b[o]+" ")<0)i+=" "+b[o];e.className=c.trim(i)}else e.className=a}return this},removeClass:function(a){if(c.isFunction(a))return this.each(function(k){var n=c(this);n.removeClass(a.call(this,k,n.attr("class")))});if(a&&typeof a==="string"||a===w)for(var b=(a||"").split(ca),d=0,f=this.length;d<f;d++){var e=this[d];if(e.nodeType===1&&e.className)if(a){for(var j=(" "+e.className+" ").replace(Aa," "),i=0,o=b.length;i<o;i++)j=j.replace(" "+b[i]+" ",
" ");e.className=c.trim(j)}else e.className=""}return this},toggleClass:function(a,b){var d=typeof a,f=typeof b==="boolean";if(c.isFunction(a))return this.each(function(e){var j=c(this);j.toggleClass(a.call(this,e,j.attr("class"),b),b)});return this.each(function(){if(d==="string")for(var e,j=0,i=c(this),o=b,k=a.split(ca);e=k[j++];){o=f?o:!i.hasClass(e);i[o?"addClass":"removeClass"](e)}else if(d==="undefined"||d==="boolean"){this.className&&c.data(this,"__className__",this.className);this.className=
this.className||a===false?"":c.data(this,"__className__")||""}})},hasClass:function(a){a=" "+a+" ";for(var b=0,d=this.length;b<d;b++)if((" "+this[b].className+" ").replace(Aa," ").indexOf(a)>-1)return true;return false},val:function(a){if(a===w){var b=this[0];if(b){if(c.nodeName(b,"option"))return(b.attributes.value||{}).specified?b.value:b.text;if(c.nodeName(b,"select")){var d=b.selectedIndex,f=[],e=b.options;b=b.type==="select-one";if(d<0)return null;var j=b?d:0;for(d=b?d+1:e.length;j<d;j++){var i=
e[j];if(i.selected){a=c(i).val();if(b)return a;f.push(a)}}return f}if(Ba.test(b.type)&&!c.support.checkOn)return b.getAttribute("value")===null?"on":b.value;return(b.value||"").replace(Za,"")}return w}var o=c.isFunction(a);return this.each(function(k){var n=c(this),r=a;if(this.nodeType===1){if(o)r=a.call(this,k,n.val());if(typeof r==="number")r+="";if(c.isArray(r)&&Ba.test(this.type))this.checked=c.inArray(n.val(),r)>=0;else if(c.nodeName(this,"select")){var u=c.makeArray(r);c("option",this).each(function(){this.selected=
c.inArray(c(this).val(),u)>=0});if(!u.length)this.selectedIndex=-1}else this.value=r}})}});c.extend({attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(a,b,d,f){if(!a||a.nodeType===3||a.nodeType===8)return w;if(f&&b in c.attrFn)return c(a)[b](d);f=a.nodeType!==1||!c.isXMLDoc(a);var e=d!==w;b=f&&c.props[b]||b;if(a.nodeType===1){var j=$a.test(b);if(b in a&&f&&!j){if(e){b==="type"&&ab.test(a.nodeName)&&a.parentNode&&c.error("type property can't be changed");
a[b]=d}if(c.nodeName(a,"form")&&a.getAttributeNode(b))return a.getAttributeNode(b).nodeValue;if(b==="tabIndex")return(b=a.getAttributeNode("tabIndex"))&&b.specified?b.value:bb.test(a.nodeName)||cb.test(a.nodeName)&&a.href?0:w;return a[b]}if(!c.support.style&&f&&b==="style"){if(e)a.style.cssText=""+d;return a.style.cssText}e&&a.setAttribute(b,""+d);a=!c.support.hrefNormalized&&f&&j?a.getAttribute(b,2):a.getAttribute(b);return a===null?w:a}return c.style(a,b,d)}});var O=/\.(.*)$/,db=function(a){return a.replace(/[^\w\s\.\|`]/g,
function(b){return"\\"+b})};c.event={add:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){if(a.setInterval&&a!==A&&!a.frameElement)a=A;var e,j;if(d.handler){e=d;d=e.handler}if(!d.guid)d.guid=c.guid++;if(j=c.data(a)){var i=j.events=j.events||{},o=j.handle;if(!o)j.handle=o=function(){return typeof c!=="undefined"&&!c.event.triggered?c.event.handle.apply(o.elem,arguments):w};o.elem=a;b=b.split(" ");for(var k,n=0,r;k=b[n++];){j=e?c.extend({},e):{handler:d,data:f};if(k.indexOf(".")>-1){r=k.split(".");
k=r.shift();j.namespace=r.slice(0).sort().join(".")}else{r=[];j.namespace=""}j.type=k;j.guid=d.guid;var u=i[k],z=c.event.special[k]||{};if(!u){u=i[k]=[];if(!z.setup||z.setup.call(a,f,r,o)===false)if(a.addEventListener)a.addEventListener(k,o,false);else a.attachEvent&&a.attachEvent("on"+k,o)}if(z.add){z.add.call(a,j);if(!j.handler.guid)j.handler.guid=d.guid}u.push(j);c.event.global[k]=true}a=null}}},global:{},remove:function(a,b,d,f){if(!(a.nodeType===3||a.nodeType===8)){var e,j=0,i,o,k,n,r,u,z=c.data(a),
C=z&&z.events;if(z&&C){if(b&&b.type){d=b.handler;b=b.type}if(!b||typeof b==="string"&&b.charAt(0)==="."){b=b||"";for(e in C)c.event.remove(a,e+b)}else{for(b=b.split(" ");e=b[j++];){n=e;i=e.indexOf(".")<0;o=[];if(!i){o=e.split(".");e=o.shift();k=new RegExp("(^|\\.)"+c.map(o.slice(0).sort(),db).join("\\.(?:.*\\.)?")+"(\\.|$)")}if(r=C[e])if(d){n=c.event.special[e]||{};for(B=f||0;B<r.length;B++){u=r[B];if(d.guid===u.guid){if(i||k.test(u.namespace)){f==null&&r.splice(B--,1);n.remove&&n.remove.call(a,u)}if(f!=
null)break}}if(r.length===0||f!=null&&r.length===1){if(!n.teardown||n.teardown.call(a,o)===false)Ca(a,e,z.handle);delete C[e]}}else for(var B=0;B<r.length;B++){u=r[B];if(i||k.test(u.namespace)){c.event.remove(a,n,u.handler,B);r.splice(B--,1)}}}if(c.isEmptyObject(C)){if(b=z.handle)b.elem=null;delete z.events;delete z.handle;c.isEmptyObject(z)&&c.removeData(a)}}}}},trigger:function(a,b,d,f){var e=a.type||a;if(!f){a=typeof a==="object"?a[G]?a:c.extend(c.Event(e),a):c.Event(e);if(e.indexOf("!")>=0){a.type=
e=e.slice(0,-1);a.exclusive=true}if(!d){a.stopPropagation();c.event.global[e]&&c.each(c.cache,function(){this.events&&this.events[e]&&c.event.trigger(a,b,this.handle.elem)})}if(!d||d.nodeType===3||d.nodeType===8)return w;a.result=w;a.target=d;b=c.makeArray(b);b.unshift(a)}a.currentTarget=d;(f=c.data(d,"handle"))&&f.apply(d,b);f=d.parentNode||d.ownerDocument;try{if(!(d&&d.nodeName&&c.noData[d.nodeName.toLowerCase()]))if(d["on"+e]&&d["on"+e].apply(d,b)===false)a.result=false}catch(j){}if(!a.isPropagationStopped()&&
f)c.event.trigger(a,b,f,true);else if(!a.isDefaultPrevented()){f=a.target;var i,o=c.nodeName(f,"a")&&e==="click",k=c.event.special[e]||{};if((!k._default||k._default.call(d,a)===false)&&!o&&!(f&&f.nodeName&&c.noData[f.nodeName.toLowerCase()])){try{if(f[e]){if(i=f["on"+e])f["on"+e]=null;c.event.triggered=true;f[e]()}}catch(n){}if(i)f["on"+e]=i;c.event.triggered=false}}},handle:function(a){var b,d,f,e;a=arguments[0]=c.event.fix(a||A.event);a.currentTarget=this;b=a.type.indexOf(".")<0&&!a.exclusive;
if(!b){d=a.type.split(".");a.type=d.shift();f=new RegExp("(^|\\.)"+d.slice(0).sort().join("\\.(?:.*\\.)?")+"(\\.|$)")}e=c.data(this,"events");d=e[a.type];if(e&&d){d=d.slice(0);e=0;for(var j=d.length;e<j;e++){var i=d[e];if(b||f.test(i.namespace)){a.handler=i.handler;a.data=i.data;a.handleObj=i;i=i.handler.apply(this,arguments);if(i!==w){a.result=i;if(i===false){a.preventDefault();a.stopPropagation()}}if(a.isImmediatePropagationStopped())break}}}return a.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
fix:function(a){if(a[G])return a;var b=a;a=c.Event(b);for(var d=this.props.length,f;d;){f=this.props[--d];a[f]=b[f]}if(!a.target)a.target=a.srcElement||s;if(a.target.nodeType===3)a.target=a.target.parentNode;if(!a.relatedTarget&&a.fromElement)a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement;if(a.pageX==null&&a.clientX!=null){b=s.documentElement;d=s.body;a.pageX=a.clientX+(b&&b.scrollLeft||d&&d.scrollLeft||0)-(b&&b.clientLeft||d&&d.clientLeft||0);a.pageY=a.clientY+(b&&b.scrollTop||
d&&d.scrollTop||0)-(b&&b.clientTop||d&&d.clientTop||0)}if(!a.which&&(a.charCode||a.charCode===0?a.charCode:a.keyCode))a.which=a.charCode||a.keyCode;if(!a.metaKey&&a.ctrlKey)a.metaKey=a.ctrlKey;if(!a.which&&a.button!==w)a.which=a.button&1?1:a.button&2?3:a.button&4?2:0;return a},guid:1E8,proxy:c.proxy,special:{ready:{setup:c.bindReady,teardown:c.noop},live:{add:function(a){c.event.add(this,a.origType,c.extend({},a,{handler:oa}))},remove:function(a){var b=true,d=a.origType.replace(O,"");c.each(c.data(this,
"events").live||[],function(){if(d===this.origType.replace(O,""))return b=false});b&&c.event.remove(this,a.origType,oa)}},beforeunload:{setup:function(a,b,d){if(this.setInterval)this.onbeforeunload=d;return false},teardown:function(a,b){if(this.onbeforeunload===b)this.onbeforeunload=null}}}};var Ca=s.removeEventListener?function(a,b,d){a.removeEventListener(b,d,false)}:function(a,b,d){a.detachEvent("on"+b,d)};c.Event=function(a){if(!this.preventDefault)return new c.Event(a);if(a&&a.type){this.originalEvent=
a;this.type=a.type}else this.type=a;this.timeStamp=J();this[G]=true};c.Event.prototype={preventDefault:function(){this.isDefaultPrevented=Z;var a=this.originalEvent;if(a){a.preventDefault&&a.preventDefault();a.returnValue=false}},stopPropagation:function(){this.isPropagationStopped=Z;var a=this.originalEvent;if(a){a.stopPropagation&&a.stopPropagation();a.cancelBubble=true}},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=Z;this.stopPropagation()},isDefaultPrevented:Y,isPropagationStopped:Y,
isImmediatePropagationStopped:Y};var Da=function(a){var b=a.relatedTarget;try{for(;b&&b!==this;)b=b.parentNode;if(b!==this){a.type=a.data;c.event.handle.apply(this,arguments)}}catch(d){}},Ea=function(a){a.type=a.data;c.event.handle.apply(this,arguments)};c.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){c.event.special[a]={setup:function(d){c.event.add(this,b,d&&d.selector?Ea:Da,a)},teardown:function(d){c.event.remove(this,b,d&&d.selector?Ea:Da)}}});if(!c.support.submitBubbles)c.event.special.submit=
{setup:function(){if(this.nodeName.toLowerCase()!=="form"){c.event.add(this,"click.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="submit"||d==="image")&&c(b).closest("form").length)return na("submit",this,arguments)});c.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,d=b.type;if((d==="text"||d==="password")&&c(b).closest("form").length&&a.keyCode===13)return na("submit",this,arguments)})}else return false},teardown:function(){c.event.remove(this,".specialSubmit")}};
if(!c.support.changeBubbles){var da=/textarea|input|select/i,ea,Fa=function(a){var b=a.type,d=a.value;if(b==="radio"||b==="checkbox")d=a.checked;else if(b==="select-multiple")d=a.selectedIndex>-1?c.map(a.options,function(f){return f.selected}).join("-"):"";else if(a.nodeName.toLowerCase()==="select")d=a.selectedIndex;return d},fa=function(a,b){var d=a.target,f,e;if(!(!da.test(d.nodeName)||d.readOnly)){f=c.data(d,"_change_data");e=Fa(d);if(a.type!=="focusout"||d.type!=="radio")c.data(d,"_change_data",
e);if(!(f===w||e===f))if(f!=null||e){a.type="change";return c.event.trigger(a,b,d)}}};c.event.special.change={filters:{focusout:fa,click:function(a){var b=a.target,d=b.type;if(d==="radio"||d==="checkbox"||b.nodeName.toLowerCase()==="select")return fa.call(this,a)},keydown:function(a){var b=a.target,d=b.type;if(a.keyCode===13&&b.nodeName.toLowerCase()!=="textarea"||a.keyCode===32&&(d==="checkbox"||d==="radio")||d==="select-multiple")return fa.call(this,a)},beforeactivate:function(a){a=a.target;c.data(a,
"_change_data",Fa(a))}},setup:function(){if(this.type==="file")return false;for(var a in ea)c.event.add(this,a+".specialChange",ea[a]);return da.test(this.nodeName)},teardown:function(){c.event.remove(this,".specialChange");return da.test(this.nodeName)}};ea=c.event.special.change.filters}s.addEventListener&&c.each({focus:"focusin",blur:"focusout"},function(a,b){function d(f){f=c.event.fix(f);f.type=b;return c.event.handle.call(this,f)}c.event.special[b]={setup:function(){this.addEventListener(a,
d,true)},teardown:function(){this.removeEventListener(a,d,true)}}});c.each(["bind","one"],function(a,b){c.fn[b]=function(d,f,e){if(typeof d==="object"){for(var j in d)this[b](j,f,d[j],e);return this}if(c.isFunction(f)){e=f;f=w}var i=b==="one"?c.proxy(e,function(k){c(this).unbind(k,i);return e.apply(this,arguments)}):e;if(d==="unload"&&b!=="one")this.one(d,f,e);else{j=0;for(var o=this.length;j<o;j++)c.event.add(this[j],d,i,f)}return this}});c.fn.extend({unbind:function(a,b){if(typeof a==="object"&&
!a.preventDefault)for(var d in a)this.unbind(d,a[d]);else{d=0;for(var f=this.length;d<f;d++)c.event.remove(this[d],a,b)}return this},delegate:function(a,b,d,f){return this.live(b,d,f,a)},undelegate:function(a,b,d){return arguments.length===0?this.unbind("live"):this.die(b,null,d,a)},trigger:function(a,b){return this.each(function(){c.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0]){a=c.Event(a);a.preventDefault();a.stopPropagation();c.event.trigger(a,b,this[0]);return a.result}},
toggle:function(a){for(var b=arguments,d=1;d<b.length;)c.proxy(a,b[d++]);return this.click(c.proxy(a,function(f){var e=(c.data(this,"lastToggle"+a.guid)||0)%d;c.data(this,"lastToggle"+a.guid,e+1);f.preventDefault();return b[e].apply(this,arguments)||false}))},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var Ga={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};c.each(["live","die"],function(a,b){c.fn[b]=function(d,f,e,j){var i,o=0,k,n,r=j||this.selector,
u=j?this:c(this.context);if(c.isFunction(f)){e=f;f=w}for(d=(d||"").split(" ");(i=d[o++])!=null;){j=O.exec(i);k="";if(j){k=j[0];i=i.replace(O,"")}if(i==="hover")d.push("mouseenter"+k,"mouseleave"+k);else{n=i;if(i==="focus"||i==="blur"){d.push(Ga[i]+k);i+=k}else i=(Ga[i]||i)+k;b==="live"?u.each(function(){c.event.add(this,pa(i,r),{data:f,selector:r,handler:e,origType:i,origHandler:e,preType:n})}):u.unbind(pa(i,r),e)}}return this}});c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function(a,b){c.fn[b]=function(d){return d?this.bind(b,d):this.trigger(b)};if(c.attrFn)c.attrFn[b]=true});A.attachEvent&&!A.addEventListener&&A.attachEvent("onunload",function(){for(var a in c.cache)if(c.cache[a].handle)try{c.event.remove(c.cache[a].handle.elem)}catch(b){}});(function(){function a(g){for(var h="",l,m=0;g[m];m++){l=g[m];if(l.nodeType===3||l.nodeType===4)h+=l.nodeValue;else if(l.nodeType!==8)h+=a(l.childNodes)}return h}function b(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];
if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1&&!p){t.sizcache=l;t.sizset=q}if(t.nodeName.toLowerCase()===h){y=t;break}t=t[g]}m[q]=y}}}function d(g,h,l,m,q,p){q=0;for(var v=m.length;q<v;q++){var t=m[q];if(t){t=t[g];for(var y=false;t;){if(t.sizcache===l){y=m[t.sizset];break}if(t.nodeType===1){if(!p){t.sizcache=l;t.sizset=q}if(typeof h!=="string"){if(t===h){y=true;break}}else if(k.filter(h,[t]).length>0){y=t;break}}t=t[g]}m[q]=y}}}var f=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e=0,j=Object.prototype.toString,i=false,o=true;[0,0].sort(function(){o=false;return 0});var k=function(g,h,l,m){l=l||[];var q=h=h||s;if(h.nodeType!==1&&h.nodeType!==9)return[];if(!g||typeof g!=="string")return l;for(var p=[],v,t,y,S,H=true,M=x(h),I=g;(f.exec(""),v=f.exec(I))!==null;){I=v[3];p.push(v[1]);if(v[2]){S=v[3];break}}if(p.length>1&&r.exec(g))if(p.length===2&&n.relative[p[0]])t=ga(p[0]+p[1],h);else for(t=n.relative[p[0]]?[h]:k(p.shift(),h);p.length;){g=p.shift();if(n.relative[g])g+=p.shift();
t=ga(g,t)}else{if(!m&&p.length>1&&h.nodeType===9&&!M&&n.match.ID.test(p[0])&&!n.match.ID.test(p[p.length-1])){v=k.find(p.shift(),h,M);h=v.expr?k.filter(v.expr,v.set)[0]:v.set[0]}if(h){v=m?{expr:p.pop(),set:z(m)}:k.find(p.pop(),p.length===1&&(p[0]==="~"||p[0]==="+")&&h.parentNode?h.parentNode:h,M);t=v.expr?k.filter(v.expr,v.set):v.set;if(p.length>0)y=z(t);else H=false;for(;p.length;){var D=p.pop();v=D;if(n.relative[D])v=p.pop();else D="";if(v==null)v=h;n.relative[D](y,v,M)}}else y=[]}y||(y=t);y||k.error(D||
g);if(j.call(y)==="[object Array]")if(H)if(h&&h.nodeType===1)for(g=0;y[g]!=null;g++){if(y[g]&&(y[g]===true||y[g].nodeType===1&&E(h,y[g])))l.push(t[g])}else for(g=0;y[g]!=null;g++)y[g]&&y[g].nodeType===1&&l.push(t[g]);else l.push.apply(l,y);else z(y,l);if(S){k(S,q,l,m);k.uniqueSort(l)}return l};k.uniqueSort=function(g){if(B){i=o;g.sort(B);if(i)for(var h=1;h<g.length;h++)g[h]===g[h-1]&&g.splice(h--,1)}return g};k.matches=function(g,h){return k(g,null,null,h)};k.find=function(g,h,l){var m,q;if(!g)return[];
for(var p=0,v=n.order.length;p<v;p++){var t=n.order[p];if(q=n.leftMatch[t].exec(g)){var y=q[1];q.splice(1,1);if(y.substr(y.length-1)!=="\\"){q[1]=(q[1]||"").replace(/\\/g,"");m=n.find[t](q,h,l);if(m!=null){g=g.replace(n.match[t],"");break}}}}m||(m=h.getElementsByTagName("*"));return{set:m,expr:g}};k.filter=function(g,h,l,m){for(var q=g,p=[],v=h,t,y,S=h&&h[0]&&x(h[0]);g&&h.length;){for(var H in n.filter)if((t=n.leftMatch[H].exec(g))!=null&&t[2]){var M=n.filter[H],I,D;D=t[1];y=false;t.splice(1,1);if(D.substr(D.length-
1)!=="\\"){if(v===p)p=[];if(n.preFilter[H])if(t=n.preFilter[H](t,v,l,p,m,S)){if(t===true)continue}else y=I=true;if(t)for(var U=0;(D=v[U])!=null;U++)if(D){I=M(D,t,U,v);var Ha=m^!!I;if(l&&I!=null)if(Ha)y=true;else v[U]=false;else if(Ha){p.push(D);y=true}}if(I!==w){l||(v=p);g=g.replace(n.match[H],"");if(!y)return[];break}}}if(g===q)if(y==null)k.error(g);else break;q=g}return v};k.error=function(g){throw"Syntax error, unrecognized expression: "+g;};var n=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
CLASS:/\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(g){return g.getAttribute("href")}},
relative:{"+":function(g,h){var l=typeof h==="string",m=l&&!/\W/.test(h);l=l&&!m;if(m)h=h.toLowerCase();m=0;for(var q=g.length,p;m<q;m++)if(p=g[m]){for(;(p=p.previousSibling)&&p.nodeType!==1;);g[m]=l||p&&p.nodeName.toLowerCase()===h?p||false:p===h}l&&k.filter(h,g,true)},">":function(g,h){var l=typeof h==="string";if(l&&!/\W/.test(h)){h=h.toLowerCase();for(var m=0,q=g.length;m<q;m++){var p=g[m];if(p){l=p.parentNode;g[m]=l.nodeName.toLowerCase()===h?l:false}}}else{m=0;for(q=g.length;m<q;m++)if(p=g[m])g[m]=
l?p.parentNode:p.parentNode===h;l&&k.filter(h,g,true)}},"":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("parentNode",h,m,g,p,l)},"~":function(g,h,l){var m=e++,q=d;if(typeof h==="string"&&!/\W/.test(h)){var p=h=h.toLowerCase();q=b}q("previousSibling",h,m,g,p,l)}},find:{ID:function(g,h,l){if(typeof h.getElementById!=="undefined"&&!l)return(g=h.getElementById(g[1]))?[g]:[]},NAME:function(g,h){if(typeof h.getElementsByName!=="undefined"){var l=[];
h=h.getElementsByName(g[1]);for(var m=0,q=h.length;m<q;m++)h[m].getAttribute("name")===g[1]&&l.push(h[m]);return l.length===0?null:l}},TAG:function(g,h){return h.getElementsByTagName(g[1])}},preFilter:{CLASS:function(g,h,l,m,q,p){g=" "+g[1].replace(/\\/g,"")+" ";if(p)return g;p=0;for(var v;(v=h[p])!=null;p++)if(v)if(q^(v.className&&(" "+v.className+" ").replace(/[\t\n]/g," ").indexOf(g)>=0))l||m.push(v);else if(l)h[p]=false;return false},ID:function(g){return g[1].replace(/\\/g,"")},TAG:function(g){return g[1].toLowerCase()},
CHILD:function(g){if(g[1]==="nth"){var h=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2]==="even"&&"2n"||g[2]==="odd"&&"2n+1"||!/\D/.test(g[2])&&"0n+"+g[2]||g[2]);g[2]=h[1]+(h[2]||1)-0;g[3]=h[3]-0}g[0]=e++;return g},ATTR:function(g,h,l,m,q,p){h=g[1].replace(/\\/g,"");if(!p&&n.attrMap[h])g[1]=n.attrMap[h];if(g[2]==="~=")g[4]=" "+g[4]+" ";return g},PSEUDO:function(g,h,l,m,q){if(g[1]==="not")if((f.exec(g[3])||"").length>1||/^\w/.test(g[3]))g[3]=k(g[3],null,null,h);else{g=k.filter(g[3],h,l,true^q);l||m.push.apply(m,
g);return false}else if(n.match.POS.test(g[0])||n.match.CHILD.test(g[0]))return true;return g},POS:function(g){g.unshift(true);return g}},filters:{enabled:function(g){return g.disabled===false&&g.type!=="hidden"},disabled:function(g){return g.disabled===true},checked:function(g){return g.checked===true},selected:function(g){return g.selected===true},parent:function(g){return!!g.firstChild},empty:function(g){return!g.firstChild},has:function(g,h,l){return!!k(l[3],g).length},header:function(g){return/h\d/i.test(g.nodeName)},
text:function(g){return"text"===g.type},radio:function(g){return"radio"===g.type},checkbox:function(g){return"checkbox"===g.type},file:function(g){return"file"===g.type},password:function(g){return"password"===g.type},submit:function(g){return"submit"===g.type},image:function(g){return"image"===g.type},reset:function(g){return"reset"===g.type},button:function(g){return"button"===g.type||g.nodeName.toLowerCase()==="button"},input:function(g){return/input|select|textarea|button/i.test(g.nodeName)}},
setFilters:{first:function(g,h){return h===0},last:function(g,h,l,m){return h===m.length-1},even:function(g,h){return h%2===0},odd:function(g,h){return h%2===1},lt:function(g,h,l){return h<l[3]-0},gt:function(g,h,l){return h>l[3]-0},nth:function(g,h,l){return l[3]-0===h},eq:function(g,h,l){return l[3]-0===h}},filter:{PSEUDO:function(g,h,l,m){var q=h[1],p=n.filters[q];if(p)return p(g,l,h,m);else if(q==="contains")return(g.textContent||g.innerText||a([g])||"").indexOf(h[3])>=0;else if(q==="not"){h=
h[3];l=0;for(m=h.length;l<m;l++)if(h[l]===g)return false;return true}else k.error("Syntax error, unrecognized expression: "+q)},CHILD:function(g,h){var l=h[1],m=g;switch(l){case "only":case "first":for(;m=m.previousSibling;)if(m.nodeType===1)return false;if(l==="first")return true;m=g;case "last":for(;m=m.nextSibling;)if(m.nodeType===1)return false;return true;case "nth":l=h[2];var q=h[3];if(l===1&&q===0)return true;h=h[0];var p=g.parentNode;if(p&&(p.sizcache!==h||!g.nodeIndex)){var v=0;for(m=p.firstChild;m;m=
m.nextSibling)if(m.nodeType===1)m.nodeIndex=++v;p.sizcache=h}g=g.nodeIndex-q;return l===0?g===0:g%l===0&&g/l>=0}},ID:function(g,h){return g.nodeType===1&&g.getAttribute("id")===h},TAG:function(g,h){return h==="*"&&g.nodeType===1||g.nodeName.toLowerCase()===h},CLASS:function(g,h){return(" "+(g.className||g.getAttribute("class"))+" ").indexOf(h)>-1},ATTR:function(g,h){var l=h[1];g=n.attrHandle[l]?n.attrHandle[l](g):g[l]!=null?g[l]:g.getAttribute(l);l=g+"";var m=h[2];h=h[4];return g==null?m==="!=":m===
"="?l===h:m==="*="?l.indexOf(h)>=0:m==="~="?(" "+l+" ").indexOf(h)>=0:!h?l&&g!==false:m==="!="?l!==h:m==="^="?l.indexOf(h)===0:m==="$="?l.substr(l.length-h.length)===h:m==="|="?l===h||l.substr(0,h.length+1)===h+"-":false},POS:function(g,h,l,m){var q=n.setFilters[h[2]];if(q)return q(g,l,h,m)}}},r=n.match.POS;for(var u in n.match){n.match[u]=new RegExp(n.match[u].source+/(?![^\[]*\])(?![^\(]*\))/.source);n.leftMatch[u]=new RegExp(/(^(?:.|\r|\n)*?)/.source+n.match[u].source.replace(/\\(\d+)/g,function(g,
h){return"\\"+(h-0+1)}))}var z=function(g,h){g=Array.prototype.slice.call(g,0);if(h){h.push.apply(h,g);return h}return g};try{Array.prototype.slice.call(s.documentElement.childNodes,0)}catch(C){z=function(g,h){h=h||[];if(j.call(g)==="[object Array]")Array.prototype.push.apply(h,g);else if(typeof g.length==="number")for(var l=0,m=g.length;l<m;l++)h.push(g[l]);else for(l=0;g[l];l++)h.push(g[l]);return h}}var B;if(s.documentElement.compareDocumentPosition)B=function(g,h){if(!g.compareDocumentPosition||
!h.compareDocumentPosition){if(g==h)i=true;return g.compareDocumentPosition?-1:1}g=g.compareDocumentPosition(h)&4?-1:g===h?0:1;if(g===0)i=true;return g};else if("sourceIndex"in s.documentElement)B=function(g,h){if(!g.sourceIndex||!h.sourceIndex){if(g==h)i=true;return g.sourceIndex?-1:1}g=g.sourceIndex-h.sourceIndex;if(g===0)i=true;return g};else if(s.createRange)B=function(g,h){if(!g.ownerDocument||!h.ownerDocument){if(g==h)i=true;return g.ownerDocument?-1:1}var l=g.ownerDocument.createRange(),m=
h.ownerDocument.createRange();l.setStart(g,0);l.setEnd(g,0);m.setStart(h,0);m.setEnd(h,0);g=l.compareBoundaryPoints(Range.START_TO_END,m);if(g===0)i=true;return g};(function(){var g=s.createElement("div"),h="script"+(new Date).getTime();g.innerHTML="<a name='"+h+"'/>";var l=s.documentElement;l.insertBefore(g,l.firstChild);if(s.getElementById(h)){n.find.ID=function(m,q,p){if(typeof q.getElementById!=="undefined"&&!p)return(q=q.getElementById(m[1]))?q.id===m[1]||typeof q.getAttributeNode!=="undefined"&&
q.getAttributeNode("id").nodeValue===m[1]?[q]:w:[]};n.filter.ID=function(m,q){var p=typeof m.getAttributeNode!=="undefined"&&m.getAttributeNode("id");return m.nodeType===1&&p&&p.nodeValue===q}}l.removeChild(g);l=g=null})();(function(){var g=s.createElement("div");g.appendChild(s.createComment(""));if(g.getElementsByTagName("*").length>0)n.find.TAG=function(h,l){l=l.getElementsByTagName(h[1]);if(h[1]==="*"){h=[];for(var m=0;l[m];m++)l[m].nodeType===1&&h.push(l[m]);l=h}return l};g.innerHTML="<a href='#'></a>";
if(g.firstChild&&typeof g.firstChild.getAttribute!=="undefined"&&g.firstChild.getAttribute("href")!=="#")n.attrHandle.href=function(h){return h.getAttribute("href",2)};g=null})();s.querySelectorAll&&function(){var g=k,h=s.createElement("div");h.innerHTML="<p class='TEST'></p>";if(!(h.querySelectorAll&&h.querySelectorAll(".TEST").length===0)){k=function(m,q,p,v){q=q||s;if(!v&&q.nodeType===9&&!x(q))try{return z(q.querySelectorAll(m),p)}catch(t){}return g(m,q,p,v)};for(var l in g)k[l]=g[l];h=null}}();
(function(){var g=s.createElement("div");g.innerHTML="<div class='test e'></div><div class='test'></div>";if(!(!g.getElementsByClassName||g.getElementsByClassName("e").length===0)){g.lastChild.className="e";if(g.getElementsByClassName("e").length!==1){n.order.splice(1,0,"CLASS");n.find.CLASS=function(h,l,m){if(typeof l.getElementsByClassName!=="undefined"&&!m)return l.getElementsByClassName(h[1])};g=null}}})();var E=s.compareDocumentPosition?function(g,h){return!!(g.compareDocumentPosition(h)&16)}:
function(g,h){return g!==h&&(g.contains?g.contains(h):true)},x=function(g){return(g=(g?g.ownerDocument||g:0).documentElement)?g.nodeName!=="HTML":false},ga=function(g,h){var l=[],m="",q;for(h=h.nodeType?[h]:h;q=n.match.PSEUDO.exec(g);){m+=q[0];g=g.replace(n.match.PSEUDO,"")}g=n.relative[g]?g+"*":g;q=0;for(var p=h.length;q<p;q++)k(g,h[q],l);return k.filter(m,l)};c.find=k;c.expr=k.selectors;c.expr[":"]=c.expr.filters;c.unique=k.uniqueSort;c.text=a;c.isXMLDoc=x;c.contains=E})();var eb=/Until$/,fb=/^(?:parents|prevUntil|prevAll)/,
gb=/,/;R=Array.prototype.slice;var Ia=function(a,b,d){if(c.isFunction(b))return c.grep(a,function(e,j){return!!b.call(e,j,e)===d});else if(b.nodeType)return c.grep(a,function(e){return e===b===d});else if(typeof b==="string"){var f=c.grep(a,function(e){return e.nodeType===1});if(Ua.test(b))return c.filter(b,f,!d);else b=c.filter(b,f)}return c.grep(a,function(e){return c.inArray(e,b)>=0===d})};c.fn.extend({find:function(a){for(var b=this.pushStack("","find",a),d=0,f=0,e=this.length;f<e;f++){d=b.length;
c.find(a,this[f],b);if(f>0)for(var j=d;j<b.length;j++)for(var i=0;i<d;i++)if(b[i]===b[j]){b.splice(j--,1);break}}return b},has:function(a){var b=c(a);return this.filter(function(){for(var d=0,f=b.length;d<f;d++)if(c.contains(this,b[d]))return true})},not:function(a){return this.pushStack(Ia(this,a,false),"not",a)},filter:function(a){return this.pushStack(Ia(this,a,true),"filter",a)},is:function(a){return!!a&&c.filter(a,this).length>0},closest:function(a,b){if(c.isArray(a)){var d=[],f=this[0],e,j=
{},i;if(f&&a.length){e=0;for(var o=a.length;e<o;e++){i=a[e];j[i]||(j[i]=c.expr.match.POS.test(i)?c(i,b||this.context):i)}for(;f&&f.ownerDocument&&f!==b;){for(i in j){e=j[i];if(e.jquery?e.index(f)>-1:c(f).is(e)){d.push({selector:i,elem:f});delete j[i]}}f=f.parentNode}}return d}var k=c.expr.match.POS.test(a)?c(a,b||this.context):null;return this.map(function(n,r){for(;r&&r.ownerDocument&&r!==b;){if(k?k.index(r)>-1:c(r).is(a))return r;r=r.parentNode}return null})},index:function(a){if(!a||typeof a===
"string")return c.inArray(this[0],a?c(a):this.parent().children());return c.inArray(a.jquery?a[0]:a,this)},add:function(a,b){a=typeof a==="string"?c(a,b||this.context):c.makeArray(a);b=c.merge(this.get(),a);return this.pushStack(qa(a[0])||qa(b[0])?b:c.unique(b))},andSelf:function(){return this.add(this.prevObject)}});c.each({parent:function(a){return(a=a.parentNode)&&a.nodeType!==11?a:null},parents:function(a){return c.dir(a,"parentNode")},parentsUntil:function(a,b,d){return c.dir(a,"parentNode",
d)},next:function(a){return c.nth(a,2,"nextSibling")},prev:function(a){return c.nth(a,2,"previousSibling")},nextAll:function(a){return c.dir(a,"nextSibling")},prevAll:function(a){return c.dir(a,"previousSibling")},nextUntil:function(a,b,d){return c.dir(a,"nextSibling",d)},prevUntil:function(a,b,d){return c.dir(a,"previousSibling",d)},siblings:function(a){return c.sibling(a.parentNode.firstChild,a)},children:function(a){return c.sibling(a.firstChild)},contents:function(a){return c.nodeName(a,"iframe")?
a.contentDocument||a.contentWindow.document:c.makeArray(a.childNodes)}},function(a,b){c.fn[a]=function(d,f){var e=c.map(this,b,d);eb.test(a)||(f=d);if(f&&typeof f==="string")e=c.filter(f,e);e=this.length>1?c.unique(e):e;if((this.length>1||gb.test(f))&&fb.test(a))e=e.reverse();return this.pushStack(e,a,R.call(arguments).join(","))}});c.extend({filter:function(a,b,d){if(d)a=":not("+a+")";return c.find.matches(a,b)},dir:function(a,b,d){var f=[];for(a=a[b];a&&a.nodeType!==9&&(d===w||a.nodeType!==1||!c(a).is(d));){a.nodeType===
1&&f.push(a);a=a[b]}return f},nth:function(a,b,d){b=b||1;for(var f=0;a;a=a[d])if(a.nodeType===1&&++f===b)break;return a},sibling:function(a,b){for(var d=[];a;a=a.nextSibling)a.nodeType===1&&a!==b&&d.push(a);return d}});var Ja=/ jQuery\d+="(?:\d+|null)"/g,V=/^\s+/,Ka=/(<([\w:]+)[^>]*?)\/>/g,hb=/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,La=/<([\w:]+)/,ib=/<tbody/i,jb=/<|&#?\w+;/,ta=/<script|<object|<embed|<option|<style/i,ua=/checked\s*(?:[^=]|=\s*.checked.)/i,Ma=function(a,b,d){return hb.test(d)?
a:b+"></"+d+">"},F={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};F.optgroup=F.option;F.tbody=F.tfoot=F.colgroup=F.caption=F.thead;F.th=F.td;if(!c.support.htmlSerialize)F._default=[1,"div<div>","</div>"];c.fn.extend({text:function(a){if(c.isFunction(a))return this.each(function(b){var d=
c(this);d.text(a.call(this,b,d.text()))});if(typeof a!=="object"&&a!==w)return this.empty().append((this[0]&&this[0].ownerDocument||s).createTextNode(a));return c.text(this)},wrapAll:function(a){if(c.isFunction(a))return this.each(function(d){c(this).wrapAll(a.call(this,d))});if(this[0]){var b=c(a,this[0].ownerDocument).eq(0).clone(true);this[0].parentNode&&b.insertBefore(this[0]);b.map(function(){for(var d=this;d.firstChild&&d.firstChild.nodeType===1;)d=d.firstChild;return d}).append(this)}return this},
wrapInner:function(a){if(c.isFunction(a))return this.each(function(b){c(this).wrapInner(a.call(this,b))});return this.each(function(){var b=c(this),d=b.contents();d.length?d.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){c(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){c.nodeName(this,"body")||c(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.appendChild(a)})},
prepend:function(){return this.domManip(arguments,true,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,this)});else if(arguments.length){var a=c(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,false,function(b){this.parentNode.insertBefore(b,
this.nextSibling)});else if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,c(arguments[0]).toArray());return a}},remove:function(a,b){for(var d=0,f;(f=this[d])!=null;d++)if(!a||c.filter(a,[f]).length){if(!b&&f.nodeType===1){c.cleanData(f.getElementsByTagName("*"));c.cleanData([f])}f.parentNode&&f.parentNode.removeChild(f)}return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++)for(b.nodeType===1&&c.cleanData(b.getElementsByTagName("*"));b.firstChild;)b.removeChild(b.firstChild);
return this},clone:function(a){var b=this.map(function(){if(!c.support.noCloneEvent&&!c.isXMLDoc(this)){var d=this.outerHTML,f=this.ownerDocument;if(!d){d=f.createElement("div");d.appendChild(this.cloneNode(true));d=d.innerHTML}return c.clean([d.replace(Ja,"").replace(/=([^="'>\s]+\/)>/g,'="$1">').replace(V,"")],f)[0]}else return this.cloneNode(true)});if(a===true){ra(this,b);ra(this.find("*"),b.find("*"))}return b},html:function(a){if(a===w)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(Ja,
""):null;else if(typeof a==="string"&&!ta.test(a)&&(c.support.leadingWhitespace||!V.test(a))&&!F[(La.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Ka,Ma);try{for(var b=0,d=this.length;b<d;b++)if(this[b].nodeType===1){c.cleanData(this[b].getElementsByTagName("*"));this[b].innerHTML=a}}catch(f){this.empty().append(a)}}else c.isFunction(a)?this.each(function(e){var j=c(this),i=j.html();j.empty().append(function(){return a.call(this,e,i)})}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&
this[0].parentNode){if(c.isFunction(a))return this.each(function(b){var d=c(this),f=d.html();d.replaceWith(a.call(this,b,f))});if(typeof a!=="string")a=c(a).detach();return this.each(function(){var b=this.nextSibling,d=this.parentNode;c(this).remove();b?c(b).before(a):c(d).append(a)})}else return this.pushStack(c(c.isFunction(a)?a():a),"replaceWith",a)},detach:function(a){return this.remove(a,true)},domManip:function(a,b,d){function f(u){return c.nodeName(u,"table")?u.getElementsByTagName("tbody")[0]||
u.appendChild(u.ownerDocument.createElement("tbody")):u}var e,j,i=a[0],o=[],k;if(!c.support.checkClone&&arguments.length===3&&typeof i==="string"&&ua.test(i))return this.each(function(){c(this).domManip(a,b,d,true)});if(c.isFunction(i))return this.each(function(u){var z=c(this);a[0]=i.call(this,u,b?z.html():w);z.domManip(a,b,d)});if(this[0]){e=i&&i.parentNode;e=c.support.parentNode&&e&&e.nodeType===11&&e.childNodes.length===this.length?{fragment:e}:sa(a,this,o);k=e.fragment;if(j=k.childNodes.length===
1?(k=k.firstChild):k.firstChild){b=b&&c.nodeName(j,"tr");for(var n=0,r=this.length;n<r;n++)d.call(b?f(this[n],j):this[n],n>0||e.cacheable||this.length>1?k.cloneNode(true):k)}o.length&&c.each(o,Qa)}return this}});c.fragments={};c.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){c.fn[a]=function(d){var f=[];d=c(d);var e=this.length===1&&this[0].parentNode;if(e&&e.nodeType===11&&e.childNodes.length===1&&d.length===1){d[b](this[0]);
return this}else{e=0;for(var j=d.length;e<j;e++){var i=(e>0?this.clone(true):this).get();c.fn[b].apply(c(d[e]),i);f=f.concat(i)}return this.pushStack(f,a,d.selector)}}});c.extend({clean:function(a,b,d,f){b=b||s;if(typeof b.createElement==="undefined")b=b.ownerDocument||b[0]&&b[0].ownerDocument||s;for(var e=[],j=0,i;(i=a[j])!=null;j++){if(typeof i==="number")i+="";if(i){if(typeof i==="string"&&!jb.test(i))i=b.createTextNode(i);else if(typeof i==="string"){i=i.replace(Ka,Ma);var o=(La.exec(i)||["",
""])[1].toLowerCase(),k=F[o]||F._default,n=k[0],r=b.createElement("div");for(r.innerHTML=k[1]+i+k[2];n--;)r=r.lastChild;if(!c.support.tbody){n=ib.test(i);o=o==="table"&&!n?r.firstChild&&r.firstChild.childNodes:k[1]==="<table>"&&!n?r.childNodes:[];for(k=o.length-1;k>=0;--k)c.nodeName(o[k],"tbody")&&!o[k].childNodes.length&&o[k].parentNode.removeChild(o[k])}!c.support.leadingWhitespace&&V.test(i)&&r.insertBefore(b.createTextNode(V.exec(i)[0]),r.firstChild);i=r.childNodes}if(i.nodeType)e.push(i);else e=
c.merge(e,i)}}if(d)for(j=0;e[j];j++)if(f&&c.nodeName(e[j],"script")&&(!e[j].type||e[j].type.toLowerCase()==="text/javascript"))f.push(e[j].parentNode?e[j].parentNode.removeChild(e[j]):e[j]);else{e[j].nodeType===1&&e.splice.apply(e,[j+1,0].concat(c.makeArray(e[j].getElementsByTagName("script"))));d.appendChild(e[j])}return e},cleanData:function(a){for(var b,d,f=c.cache,e=c.event.special,j=c.support.deleteExpando,i=0,o;(o=a[i])!=null;i++)if(d=o[c.expando]){b=f[d];if(b.events)for(var k in b.events)e[k]?
c.event.remove(o,k):Ca(o,k,b.handle);if(j)delete o[c.expando];else o.removeAttribute&&o.removeAttribute(c.expando);delete f[d]}}});var kb=/z-?index|font-?weight|opacity|zoom|line-?height/i,Na=/alpha\([^)]*\)/,Oa=/opacity=([^)]*)/,ha=/float/i,ia=/-([a-z])/ig,lb=/([A-Z])/g,mb=/^-?\d+(?:px)?$/i,nb=/^-?\d/,ob={position:"absolute",visibility:"hidden",display:"block"},pb=["Left","Right"],qb=["Top","Bottom"],rb=s.defaultView&&s.defaultView.getComputedStyle,Pa=c.support.cssFloat?"cssFloat":"styleFloat",ja=
function(a,b){return b.toUpperCase()};c.fn.css=function(a,b){return X(this,a,b,true,function(d,f,e){if(e===w)return c.curCSS(d,f);if(typeof e==="number"&&!kb.test(f))e+="px";c.style(d,f,e)})};c.extend({style:function(a,b,d){if(!a||a.nodeType===3||a.nodeType===8)return w;if((b==="width"||b==="height")&&parseFloat(d)<0)d=w;var f=a.style||a,e=d!==w;if(!c.support.opacity&&b==="opacity"){if(e){f.zoom=1;b=parseInt(d,10)+""==="NaN"?"":"alpha(opacity="+d*100+")";a=f.filter||c.curCSS(a,"filter")||"";f.filter=
Na.test(a)?a.replace(Na,b):b}return f.filter&&f.filter.indexOf("opacity=")>=0?parseFloat(Oa.exec(f.filter)[1])/100+"":""}if(ha.test(b))b=Pa;b=b.replace(ia,ja);if(e)f[b]=d;return f[b]},css:function(a,b,d,f){if(b==="width"||b==="height"){var e,j=b==="width"?pb:qb;function i(){e=b==="width"?a.offsetWidth:a.offsetHeight;f!=="border"&&c.each(j,function(){f||(e-=parseFloat(c.curCSS(a,"padding"+this,true))||0);if(f==="margin")e+=parseFloat(c.curCSS(a,"margin"+this,true))||0;else e-=parseFloat(c.curCSS(a,
"border"+this+"Width",true))||0})}a.offsetWidth!==0?i():c.swap(a,ob,i);return Math.max(0,Math.round(e))}return c.curCSS(a,b,d)},curCSS:function(a,b,d){var f,e=a.style;if(!c.support.opacity&&b==="opacity"&&a.currentStyle){f=Oa.test(a.currentStyle.filter||"")?parseFloat(RegExp.$1)/100+"":"";return f===""?"1":f}if(ha.test(b))b=Pa;if(!d&&e&&e[b])f=e[b];else if(rb){if(ha.test(b))b="float";b=b.replace(lb,"-$1").toLowerCase();e=a.ownerDocument.defaultView;if(!e)return null;if(a=e.getComputedStyle(a,null))f=
a.getPropertyValue(b);if(b==="opacity"&&f==="")f="1"}else if(a.currentStyle){d=b.replace(ia,ja);f=a.currentStyle[b]||a.currentStyle[d];if(!mb.test(f)&&nb.test(f)){b=e.left;var j=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;e.left=d==="fontSize"?"1em":f||0;f=e.pixelLeft+"px";e.left=b;a.runtimeStyle.left=j}}return f},swap:function(a,b,d){var f={};for(var e in b){f[e]=a.style[e];a.style[e]=b[e]}d.call(a);for(e in b)a.style[e]=f[e]}});if(c.expr&&c.expr.filters){c.expr.filters.hidden=function(a){var b=
a.offsetWidth,d=a.offsetHeight,f=a.nodeName.toLowerCase()==="tr";return b===0&&d===0&&!f?true:b>0&&d>0&&!f?false:c.curCSS(a,"display")==="none"};c.expr.filters.visible=function(a){return!c.expr.filters.hidden(a)}}var sb=J(),tb=/<script(.|\s)*?\/script>/gi,ub=/select|textarea/i,vb=/color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,N=/=\?(&|$)/,ka=/\?/,wb=/(\?|&)_=.*?(&|$)/,xb=/^(\w+:)?\/\/([^\/?#]+)/,yb=/%20/g,zb=c.fn.load;c.fn.extend({load:function(a,b,d){if(typeof a!==
"string")return zb.call(this,a);else if(!this.length)return this;var f=a.indexOf(" ");if(f>=0){var e=a.slice(f,a.length);a=a.slice(0,f)}f="GET";if(b)if(c.isFunction(b)){d=b;b=null}else if(typeof b==="object"){b=c.param(b,c.ajaxSettings.traditional);f="POST"}var j=this;c.ajax({url:a,type:f,dataType:"html",data:b,complete:function(i,o){if(o==="success"||o==="notmodified")j.html(e?c("<div />").append(i.responseText.replace(tb,"")).find(e):i.responseText);d&&j.each(d,[i.responseText,o,i])}});return this},
serialize:function(){return c.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?c.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||ub.test(this.nodeName)||vb.test(this.type))}).map(function(a,b){a=c(this).val();return a==null?null:c.isArray(a)?c.map(a,function(d){return{name:b.name,value:d}}):{name:b.name,value:a}}).get()}});c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function(a,b){c.fn[b]=function(d){return this.bind(b,d)}});c.extend({get:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b=null}return c.ajax({type:"GET",url:a,data:b,success:d,dataType:f})},getScript:function(a,b){return c.get(a,null,b,"script")},getJSON:function(a,b,d){return c.get(a,b,d,"json")},post:function(a,b,d,f){if(c.isFunction(b)){f=f||d;d=b;b={}}return c.ajax({type:"POST",url:a,data:b,success:d,dataType:f})},ajaxSetup:function(a){c.extend(c.ajaxSettings,a)},ajaxSettings:{url:location.href,
global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:A.XMLHttpRequest&&(A.location.protocol!=="file:"||!A.ActiveXObject)?function(){return new A.XMLHttpRequest}:function(){try{return new A.ActiveXObject("Microsoft.XMLHTTP")}catch(a){}},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},etag:{},ajax:function(a){function b(){e.success&&
e.success.call(k,o,i,x);e.global&&f("ajaxSuccess",[x,e])}function d(){e.complete&&e.complete.call(k,x,i);e.global&&f("ajaxComplete",[x,e]);e.global&&!--c.active&&c.event.trigger("ajaxStop")}function f(q,p){(e.context?c(e.context):c.event).trigger(q,p)}var e=c.extend(true,{},c.ajaxSettings,a),j,i,o,k=a&&a.context||e,n=e.type.toUpperCase();if(e.data&&e.processData&&typeof e.data!=="string")e.data=c.param(e.data,e.traditional);if(e.dataType==="jsonp"){if(n==="GET")N.test(e.url)||(e.url+=(ka.test(e.url)?
"&":"?")+(e.jsonp||"callback")+"=?");else if(!e.data||!N.test(e.data))e.data=(e.data?e.data+"&":"")+(e.jsonp||"callback")+"=?";e.dataType="json"}if(e.dataType==="json"&&(e.data&&N.test(e.data)||N.test(e.url))){j=e.jsonpCallback||"jsonp"+sb++;if(e.data)e.data=(e.data+"").replace(N,"="+j+"$1");e.url=e.url.replace(N,"="+j+"$1");e.dataType="script";A[j]=A[j]||function(q){o=q;b();d();A[j]=w;try{delete A[j]}catch(p){}z&&z.removeChild(C)}}if(e.dataType==="script"&&e.cache===null)e.cache=false;if(e.cache===
false&&n==="GET"){var r=J(),u=e.url.replace(wb,"$1_="+r+"$2");e.url=u+(u===e.url?(ka.test(e.url)?"&":"?")+"_="+r:"")}if(e.data&&n==="GET")e.url+=(ka.test(e.url)?"&":"?")+e.data;e.global&&!c.active++&&c.event.trigger("ajaxStart");r=(r=xb.exec(e.url))&&(r[1]&&r[1]!==location.protocol||r[2]!==location.host);if(e.dataType==="script"&&n==="GET"&&r){var z=s.getElementsByTagName("head")[0]||s.documentElement,C=s.createElement("script");C.src=e.url;if(e.scriptCharset)C.charset=e.scriptCharset;if(!j){var B=
false;C.onload=C.onreadystatechange=function(){if(!B&&(!this.readyState||this.readyState==="loaded"||this.readyState==="complete")){B=true;b();d();C.onload=C.onreadystatechange=null;z&&C.parentNode&&z.removeChild(C)}}}z.insertBefore(C,z.firstChild);return w}var E=false,x=e.xhr();if(x){e.username?x.open(n,e.url,e.async,e.username,e.password):x.open(n,e.url,e.async);try{if(e.data||a&&a.contentType)x.setRequestHeader("Content-Type",e.contentType);if(e.ifModified){c.lastModified[e.url]&&x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]);c.etag[e.url]&&x.setRequestHeader("If-None-Match",c.etag[e.url])}r||x.setRequestHeader("X-Requested-With","XMLHttpRequest");x.setRequestHeader("Accept",e.dataType&&e.accepts[e.dataType]?e.accepts[e.dataType]+", */*":e.accepts._default)}catch(ga){}if(e.beforeSend&&e.beforeSend.call(k,x,e)===false){e.global&&!--c.active&&c.event.trigger("ajaxStop");x.abort();return false}e.global&&f("ajaxSend",[x,e]);var g=x.onreadystatechange=function(q){if(!x||x.readyState===0||q==="abort"){E||
d();E=true;if(x)x.onreadystatechange=c.noop}else if(!E&&x&&(x.readyState===4||q==="timeout")){E=true;x.onreadystatechange=c.noop;i=q==="timeout"?"timeout":!c.httpSuccess(x)?"error":e.ifModified&&c.httpNotModified(x,e.url)?"notmodified":"success";var p;if(i==="success")try{o=c.httpData(x,e.dataType,e)}catch(v){i="parsererror";p=v}if(i==="success"||i==="notmodified")j||b();else c.handleError(e,x,i,p);d();q==="timeout"&&x.abort();if(e.async)x=null}};try{var h=x.abort;x.abort=function(){x&&h.call(x);
g("abort")}}catch(l){}e.async&&e.timeout>0&&setTimeout(function(){x&&!E&&g("timeout")},e.timeout);try{x.send(n==="POST"||n==="PUT"||n==="DELETE"?e.data:null)}catch(m){c.handleError(e,x,null,m);d()}e.async||g();return x}},handleError:function(a,b,d,f){if(a.error)a.error.call(a.context||a,b,d,f);if(a.global)(a.context?c(a.context):c.event).trigger("ajaxError",[b,a,f])},active:0,httpSuccess:function(a){try{return!a.status&&location.protocol==="file:"||a.status>=200&&a.status<300||a.status===304||a.status===
1223||a.status===0}catch(b){}return false},httpNotModified:function(a,b){var d=a.getResponseHeader("Last-Modified"),f=a.getResponseHeader("Etag");if(d)c.lastModified[b]=d;if(f)c.etag[b]=f;return a.status===304||a.status===0},httpData:function(a,b,d){var f=a.getResponseHeader("content-type")||"",e=b==="xml"||!b&&f.indexOf("xml")>=0;a=e?a.responseXML:a.responseText;e&&a.documentElement.nodeName==="parsererror"&&c.error("parsererror");if(d&&d.dataFilter)a=d.dataFilter(a,b);if(typeof a==="string")if(b===
"json"||!b&&f.indexOf("json")>=0)a=c.parseJSON(a);else if(b==="script"||!b&&f.indexOf("javascript")>=0)c.globalEval(a);return a},param:function(a,b){function d(i,o){if(c.isArray(o))c.each(o,function(k,n){b||/\[\]$/.test(i)?f(i,n):d(i+"["+(typeof n==="object"||c.isArray(n)?k:"")+"]",n)});else!b&&o!=null&&typeof o==="object"?c.each(o,function(k,n){d(i+"["+k+"]",n)}):f(i,o)}function f(i,o){o=c.isFunction(o)?o():o;e[e.length]=encodeURIComponent(i)+"="+encodeURIComponent(o)}var e=[];if(b===w)b=c.ajaxSettings.traditional;
if(c.isArray(a)||a.jquery)c.each(a,function(){f(this.name,this.value)});else for(var j in a)d(j,a[j]);return e.join("&").replace(yb,"+")}});var la={},Ab=/toggle|show|hide/,Bb=/^([+-]=)?([\d+-.]+)(.*)$/,W,va=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];c.fn.extend({show:function(a,b){if(a||a===0)return this.animate(K("show",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");
this[a].style.display=d||"";if(c.css(this[a],"display")==="none"){d=this[a].nodeName;var f;if(la[d])f=la[d];else{var e=c("<"+d+" />").appendTo("body");f=e.css("display");if(f==="none")f="block";e.remove();la[d]=f}c.data(this[a],"olddisplay",f)}}a=0;for(b=this.length;a<b;a++)this[a].style.display=c.data(this[a],"olddisplay")||"";return this}},hide:function(a,b){if(a||a===0)return this.animate(K("hide",3),a,b);else{a=0;for(b=this.length;a<b;a++){var d=c.data(this[a],"olddisplay");!d&&d!=="none"&&c.data(this[a],
"olddisplay",c.css(this[a],"display"))}a=0;for(b=this.length;a<b;a++)this[a].style.display="none";return this}},_toggle:c.fn.toggle,toggle:function(a,b){var d=typeof a==="boolean";if(c.isFunction(a)&&c.isFunction(b))this._toggle.apply(this,arguments);else a==null||d?this.each(function(){var f=d?a:c(this).is(":hidden");c(this)[f?"show":"hide"]()}):this.animate(K("toggle",3),a,b);return this},fadeTo:function(a,b,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,d)},
animate:function(a,b,d,f){var e=c.speed(b,d,f);if(c.isEmptyObject(a))return this.each(e.complete);return this[e.queue===false?"each":"queue"](function(){var j=c.extend({},e),i,o=this.nodeType===1&&c(this).is(":hidden"),k=this;for(i in a){var n=i.replace(ia,ja);if(i!==n){a[n]=a[i];delete a[i];i=n}if(a[i]==="hide"&&o||a[i]==="show"&&!o)return j.complete.call(this);if((i==="height"||i==="width")&&this.style){j.display=c.css(this,"display");j.overflow=this.style.overflow}if(c.isArray(a[i])){(j.specialEasing=
j.specialEasing||{})[i]=a[i][1];a[i]=a[i][0]}}if(j.overflow!=null)this.style.overflow="hidden";j.curAnim=c.extend({},a);c.each(a,function(r,u){var z=new c.fx(k,j,r);if(Ab.test(u))z[u==="toggle"?o?"show":"hide":u](a);else{var C=Bb.exec(u),B=z.cur(true)||0;if(C){u=parseFloat(C[2]);var E=C[3]||"px";if(E!=="px"){k.style[r]=(u||1)+E;B=(u||1)/z.cur(true)*B;k.style[r]=B+E}if(C[1])u=(C[1]==="-="?-1:1)*u+B;z.custom(B,u,E)}else z.custom(B,u,"")}});return true})},stop:function(a,b){var d=c.timers;a&&this.queue([]);
this.each(function(){for(var f=d.length-1;f>=0;f--)if(d[f].elem===this){b&&d[f](true);d.splice(f,1)}});b||this.dequeue();return this}});c.each({slideDown:K("show",1),slideUp:K("hide",1),slideToggle:K("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(a,b){c.fn[a]=function(d,f){return this.animate(b,d,f)}});c.extend({speed:function(a,b,d){var f=a&&typeof a==="object"?a:{complete:d||!d&&b||c.isFunction(a)&&a,duration:a,easing:d&&b||b&&!c.isFunction(b)&&b};f.duration=c.fx.off?0:typeof f.duration===
"number"?f.duration:c.fx.speeds[f.duration]||c.fx.speeds._default;f.old=f.complete;f.complete=function(){f.queue!==false&&c(this).dequeue();c.isFunction(f.old)&&f.old.call(this)};return f},easing:{linear:function(a,b,d,f){return d+f*a},swing:function(a,b,d,f){return(-Math.cos(a*Math.PI)/2+0.5)*f+d}},timers:[],fx:function(a,b,d){this.options=b;this.elem=a;this.prop=d;if(!b.orig)b.orig={}}});c.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this);(c.fx.step[this.prop]||
c.fx.step._default)(this);if((this.prop==="height"||this.prop==="width")&&this.elem.style)this.elem.style.display="block"},cur:function(a){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];return(a=parseFloat(c.css(this.elem,this.prop,a)))&&a>-10000?a:parseFloat(c.curCSS(this.elem,this.prop))||0},custom:function(a,b,d){function f(j){return e.step(j)}this.startTime=J();this.start=a;this.end=b;this.unit=d||this.unit||"px";this.now=this.start;
this.pos=this.state=0;var e=this;f.elem=this.elem;if(f()&&c.timers.push(f)&&!W)W=setInterval(c.fx.tick,13)},show:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.show=true;this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());c(this.elem).show()},hide:function(){this.options.orig[this.prop]=c.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(a){var b=J(),d=true;if(a||b>=this.options.duration+this.startTime){this.now=
this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;for(var f in this.options.curAnim)if(this.options.curAnim[f]!==true)d=false;if(d){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;a=c.data(this.elem,"olddisplay");this.elem.style.display=a?a:this.options.display;if(c.css(this.elem,"display")==="none")this.elem.style.display="block"}this.options.hide&&c(this.elem).hide();if(this.options.hide||this.options.show)for(var e in this.options.curAnim)c.style(this.elem,
e,this.options.orig[e]);this.options.complete.call(this.elem)}return false}else{e=b-this.startTime;this.state=e/this.options.duration;a=this.options.easing||(c.easing.swing?"swing":"linear");this.pos=c.easing[this.options.specialEasing&&this.options.specialEasing[this.prop]||a](this.state,e,0,1,this.options.duration);this.now=this.start+(this.end-this.start)*this.pos;this.update()}return true}};c.extend(c.fx,{tick:function(){for(var a=c.timers,b=0;b<a.length;b++)a[b]()||a.splice(b--,1);a.length||
c.fx.stop()},stop:function(){clearInterval(W);W=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){c.style(a.elem,"opacity",a.now)},_default:function(a){if(a.elem.style&&a.elem.style[a.prop]!=null)a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit;else a.elem[a.prop]=a.now}}});if(c.expr&&c.expr.filters)c.expr.filters.animated=function(a){return c.grep(c.timers,function(b){return a===b.elem}).length};c.fn.offset="getBoundingClientRect"in s.documentElement?
function(a){var b=this[0];if(a)return this.each(function(e){c.offset.setOffset(this,a,e)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);var d=b.getBoundingClientRect(),f=b.ownerDocument;b=f.body;f=f.documentElement;return{top:d.top+(self.pageYOffset||c.support.boxModel&&f.scrollTop||b.scrollTop)-(f.clientTop||b.clientTop||0),left:d.left+(self.pageXOffset||c.support.boxModel&&f.scrollLeft||b.scrollLeft)-(f.clientLeft||b.clientLeft||0)}}:function(a){var b=
this[0];if(a)return this.each(function(r){c.offset.setOffset(this,a,r)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return c.offset.bodyOffset(b);c.offset.initialize();var d=b.offsetParent,f=b,e=b.ownerDocument,j,i=e.documentElement,o=e.body;f=(e=e.defaultView)?e.getComputedStyle(b,null):b.currentStyle;for(var k=b.offsetTop,n=b.offsetLeft;(b=b.parentNode)&&b!==o&&b!==i;){if(c.offset.supportsFixedPosition&&f.position==="fixed")break;j=e?e.getComputedStyle(b,null):b.currentStyle;
k-=b.scrollTop;n-=b.scrollLeft;if(b===d){k+=b.offsetTop;n+=b.offsetLeft;if(c.offset.doesNotAddBorder&&!(c.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(b.nodeName))){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=d;d=b.offsetParent}if(c.offset.subtractsBorderForOverflowNotVisible&&j.overflow!=="visible"){k+=parseFloat(j.borderTopWidth)||0;n+=parseFloat(j.borderLeftWidth)||0}f=j}if(f.position==="relative"||f.position==="static"){k+=o.offsetTop;n+=o.offsetLeft}if(c.offset.supportsFixedPosition&&
f.position==="fixed"){k+=Math.max(i.scrollTop,o.scrollTop);n+=Math.max(i.scrollLeft,o.scrollLeft)}return{top:k,left:n}};c.offset={initialize:function(){var a=s.body,b=s.createElement("div"),d,f,e,j=parseFloat(c.curCSS(a,"marginTop",true))||0;c.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"});b.innerHTML="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
a.insertBefore(b,a.firstChild);d=b.firstChild;f=d.firstChild;e=d.nextSibling.firstChild.firstChild;this.doesNotAddBorder=f.offsetTop!==5;this.doesAddBorderForTableAndCells=e.offsetTop===5;f.style.position="fixed";f.style.top="20px";this.supportsFixedPosition=f.offsetTop===20||f.offsetTop===15;f.style.position=f.style.top="";d.style.overflow="hidden";d.style.position="relative";this.subtractsBorderForOverflowNotVisible=f.offsetTop===-5;this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==j;a.removeChild(b);
c.offset.initialize=c.noop},bodyOffset:function(a){var b=a.offsetTop,d=a.offsetLeft;c.offset.initialize();if(c.offset.doesNotIncludeMarginInBodyOffset){b+=parseFloat(c.curCSS(a,"marginTop",true))||0;d+=parseFloat(c.curCSS(a,"marginLeft",true))||0}return{top:b,left:d}},setOffset:function(a,b,d){if(/static/.test(c.curCSS(a,"position")))a.style.position="relative";var f=c(a),e=f.offset(),j=parseInt(c.curCSS(a,"top",true),10)||0,i=parseInt(c.curCSS(a,"left",true),10)||0;if(c.isFunction(b))b=b.call(a,
d,e);d={top:b.top-e.top+j,left:b.left-e.left+i};"using"in b?b.using.call(a,d):f.css(d)}};c.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),d=this.offset(),f=/^body|html$/i.test(b[0].nodeName)?{top:0,left:0}:b.offset();d.top-=parseFloat(c.curCSS(a,"marginTop",true))||0;d.left-=parseFloat(c.curCSS(a,"marginLeft",true))||0;f.top+=parseFloat(c.curCSS(b[0],"borderTopWidth",true))||0;f.left+=parseFloat(c.curCSS(b[0],"borderLeftWidth",true))||0;return{top:d.top-
f.top,left:d.left-f.left}},offsetParent:function(){return this.map(function(){for(var a=this.offsetParent||s.body;a&&!/^body|html$/i.test(a.nodeName)&&c.css(a,"position")==="static";)a=a.offsetParent;return a})}});c.each(["Left","Top"],function(a,b){var d="scroll"+b;c.fn[d]=function(f){var e=this[0],j;if(!e)return null;if(f!==w)return this.each(function(){if(j=wa(this))j.scrollTo(!a?f:c(j).scrollLeft(),a?f:c(j).scrollTop());else this[d]=f});else return(j=wa(e))?"pageXOffset"in j?j[a?"pageYOffset":
"pageXOffset"]:c.support.boxModel&&j.document.documentElement[d]||j.document.body[d]:e[d]}});c.each(["Height","Width"],function(a,b){var d=b.toLowerCase();c.fn["inner"+b]=function(){return this[0]?c.css(this[0],d,false,"padding"):null};c.fn["outer"+b]=function(f){return this[0]?c.css(this[0],d,false,f?"margin":"border"):null};c.fn[d]=function(f){var e=this[0];if(!e)return f==null?null:this;if(c.isFunction(f))return this.each(function(j){var i=c(this);i[d](f.call(this,j,i[d]()))});return"scrollTo"in
e&&e.document?e.document.compatMode==="CSS1Compat"&&e.document.documentElement["client"+b]||e.document.body["client"+b]:e.nodeType===9?Math.max(e.documentElement["client"+b],e.body["scroll"+b],e.documentElement["scroll"+b],e.body["offset"+b],e.documentElement["offset"+b]):f===w?c.css(e,d):this.css(d,typeof f==="string"?f:f+"px")}});A.jQuery=A.$=c})(window);
/*! Copyright (c) 2010 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.4
 * 
 * Requires: 1.2.2+
 */

(function($) {

var types = ['DOMMouseScroll', 'mousewheel'];

$.event.special.mousewheel = {
    setup: function() {
        if ( this.addEventListener ) {
            for ( var i=types.length; i; ) {
                this.addEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = handler;
        }
    },
    
    teardown: function() {
        if ( this.removeEventListener ) {
            for ( var i=types.length; i; ) {
                this.removeEventListener( types[--i], handler, false );
            }
        } else {
            this.onmousewheel = null;
        }
    }
};

$.fn.extend({
    mousewheel: function(fn) {
        return fn ? this.bind("mousewheel", fn) : this.trigger("mousewheel");
    },
    
    unmousewheel: function(fn) {
        return this.unbind("mousewheel", fn);
    }
});


function handler(event) {
    var orgEvent = event || window.event, args = [].slice.call( arguments, 1 ), delta = 0, returnValue = true, deltaX = 0, deltaY = 0;
    event = $.event.fix(orgEvent);
    event.type = "mousewheel";
    
    // Old school scrollwheel delta
    if ( event.wheelDelta ) { delta = event.wheelDelta/120; }
    if ( event.detail     ) { delta = -event.detail/3; }
    
    // New school multidimensional scroll (touchpads) deltas
    deltaY = delta;
    
    // Gecko
    if ( orgEvent.axis !== undefined && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
        deltaY = 0;
        deltaX = -1*delta;
    }
    
    // Webkit
    if ( orgEvent.wheelDeltaY !== undefined ) { deltaY = orgEvent.wheelDeltaY/120; }
    if ( orgEvent.wheelDeltaX !== undefined ) { deltaX = -1*orgEvent.wheelDeltaX/120; }
    
    // Add event and delta to the front of the arguments
    args.unshift(event, delta, deltaX, deltaY);
    
    return $.event.handle.apply(this, args);
}

})(jQuery);/**
 * 工具集
 */
if ( window.console == undefined )
	console = {};
if ( console.debug == undefined )
	console.debug = function( str ){};
function log( str ){
	if ( DEBUG )
		console.debug( str );
}	
/*
 * 获得index值
*/
function getIndex( x, y ){
	return x * CELL_YNUM + y;
}
//判断是否为空
 function _isEmpty( obj ){
	for( var i in obj )
		return false;
	return true;	
}
/*
 * 输入event或者具体数值返回相对坐标值
*/
function getPoints( x, y ){
	if (typeof x == "number") {
		return {
			x: x % CELL_XNUM,
			y: parseInt(y / CELL_YNUM)
		}
	}
	
	if ( x.layerY ){
		//events时
		y = x.layerY;
		x = x.layerX;
	}
	
	var o =  {
		x    :   parseInt ( x   / CELL_WIDTH ),
		y	 :  parseInt( y   / CELL_HEIGHT)
	}
	return o;
}
//载入image
function	_loadImg( src, onload, onerror ){
	var img = new Image();
	img.onload = onload || function(){};
	img.onerror = onerror || function(){};
	img.src = src;
}

//获取时间戳
var __d = new Date();
function getTime(){
	return __d.getTime() + "" + Math.round( (Math.random() * 1000) );
}

//绑定作用域
function bind( fn,scope ){
	return function(){
		if ( fn )
			fn.apply( scope || this, arguments );
	}
}




/**
 * Class 
 * 所有类的基类，支持继承的功能
 * 每个类必须有init方法
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" && 
        typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();
/**
 * 观察者设计模式
 * 所有对象具有事件响应的能力
 * 事件支持回调函数
 * 
 * one : 只执行一次
 * -sync: 异步执行
 * fn	: 回调
 * scope
*/
var EventObs = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};

EventObs.prototype = {
	index	: 0,
	suspend : false,
	splice	: false,	//有需要清除的监听器
	
    addListener : function(fn, scope, options){
        if(!this.isListening(fn, scope)){
            var l = this.createListener(fn, scope, options);
            if(!this.firing){
                this.listeners.push(l);
            }else{ // if we are currently firing this event, don't disturb the listener loop
                this.listeners = this.listeners.slice(0);
                this.listeners.push(l);
            }
        }
    },

    createListener : function(fn, scope, o){
        return { fn: fn, scope: scope || this.obj, options: o || {} };
    },

    findListener : function(fn, scope){
        scope = scope || this.obj;
        var ls = this.listeners;
        for(var i = 0, len = ls.length; i < len; i++){
            var l = ls[i];
            if(l.fn == fn && l.scope == scope){
                return i;
            }
        }
        return -1;
    },

    isListening : function(fn, scope){
        return this.findListener(fn, scope) != -1;
    },

    removeListener : function(fn, scope){
        var index;
        if((index = this.findListener(fn, scope)) != -1){
            if(!this.firing){
                this.listeners.splice(index, 1);
            }else{
                this.listeners = this.listeners.slice(0);
                this.listeners.splice(index, 1);
            }
            return true;
        }
        return false;
    },

    clearListeners : function(){
        this.listeners.length = 0
    },

    fire : function(){
		//复制当前监听器数组的副本
        this.ls = this.listeners.slice(0);
        this.firing = true;
		this.index = 0; //重置为0
		this.args = Array.prototype.slice.call(arguments, 0);
		
		this.next();
		
        return true;
    },
	
	next	: function(){
		if ( this.suspend || !this.ls )		//暂停时什么都不做
			return;
		
		var len = this.ls.length;
		if ( this.index == len ) {
			//指向最后一个
			this.done();
			return;
		}
		else {
			
			var l = this.ls[ this.index ];
			//执行
			l.fn.apply(l.scope , this.args );
			
			//删除单次执行
			if (l.options.one) {
				this.splice = true;
				l.remove = true;	//标记为待删除
			}			
			
			if (!this.suspend) {
				this.index++; //递增
				this.next();
			}	
		}		
	},
	
	bind	: function( fn, scope ){
		this.fn = fn;
		this.scope = scope;
	},
	
	//事件中所有的监听器均执行完毕
	done	: function(){
		//剔除需要删除的监听器
		if ( this.splice ){
			this.splice = false;
			var len = this.listeners.length;
			for (var i= len - 1; i >= 0; i-- ) {
				var l = this.listeners[ i ];
				if ( l.remove )
					this.listeners.splice( i, 1 );
			}
		}
		
		this.firing = false;
		
		if ( this.fn )
			this.fn.apply( this.scope, this.args );
		
		delete this.ls;
		delete this.args;		
	},
	
	pause	: function(){
		this.suspend = true;
	},
	
	resume	: function(){
		this.suspend = false;
		this.index++; //递增
		this.next();	//继续执行下一个监听器
	}	
};
/**
 * 即时消息
 * 用于高效循环类的消息
*/
var EventImd = function(obj, name){
    this.obj = obj;
    this.listeners = [];
};
EventImd.prototype = {
    addListener : function(fn, scope ){
        this.listeners.push( {
			scope: scope || this.obj,
			fn: fn
		} );
    },

    fire : function(){
		var ls = this.listeners;
		for (var i= 0, len = ls.length; i<len; i++ ) {
			var l = ls[ i ];
			
			l.fn.apply( l.scope, arguments );
		}
    }
};
/**
 * 默认消息
*/
var EventNormal = function(obj, name){
    this.name = name;
    this.obj = obj;
    this.listeners = [];
};
EventNormal.prototype = {
	
    addListener : function(fn, scope,o){
        var l = this.createListener(fn, scope, o);
        this.listeners.push(l);
    },

    createListener : function(fn, scope,o){
        return { scope: scope || this.obj, fn: fn, options : o || {} };
    },

    findListener : function(fn, scope){
        scope = scope || this.obj;
        var ls = this.listeners;
        for(var i = 0, len = ls.length; i < len; i++){
            var l = ls[i];
            if(l.fn == fn && l.scope == scope){
                return i;
            }
        }
        return -1;
    },

    removeListener : function(fn, scope){
        var index;
        if((index = this.findListener(fn, scope)) != -1){
            if(!this.firing){
                this.listeners.splice(index, 1);
            }else{
                this.listeners = this.listeners.slice(0);
                this.listeners.splice(index, 1);
            }
            return true;
        }
        return false;
    },

    clearListeners : function(){
        this.listeners.length = 0
    },

    fire : function(){
		var ls = this.listeners.slice( 0 );
		for (var i= 0, len = ls.length; i<len; i++ ) {
			var l = ls[ i ];
			
			if ( l.options.one )
				this.listeners.splice( i, 1 );
							
			l.fn.apply( l.scope, arguments );
		}
    }
};
/**
 * 观察者模式
 * 注册与分发消息
 * 先添加事件再注册
*/
var Observable = Class.extend({
	eventsSuspended : false,
	
	init: function(){
		$.extend( this, arguments[0] || {} );
		if ( !this.events )
			this.events = {};
					
	    if(this.listeners){
	        this.on(this.listeners);
	        delete this.listeners;
	    }		
	},	
	
	/**
	 * this.fireEvent( "name", argumetns, ... );
	*/	
    fireEvent : function( name ){
        //if(this.eventsSuspended !== true){
			var ce = this.getEvent( name );
						
            if ( ce ) {
				return ce.fire.apply(ce, Array.prototype.slice.call(arguments, 1));
			}else if ( DEBUG )
				log( "no event : " + name );
        //}
    },
	
	/** 
	 * 	需要回调的事件先绑定回调函数
	 */
	bindEvent	: function( name, fn, scope ){
		var ce = this.getEvent( name );
		if ( ce ){
			if (!ce.bind) {
				if (DEBUG) 
					log("event : " + name + " no bind function");
			}
			else 
				ce.bind(fn, scope);
		}
		return this;
	},
	
	getEvent : function( name ){
		return this.events[ name ];
	},
	
	/**
	 * 监听单个事件
	 * this.on( "name", fn, scope, {...} ); 
	 * 多个事件共享同一配置
	 * this.on( {
	 * 				"name" : fn1,
	 * 				"name2": fn2,
	 * 				scope  : scope,
	 *              one	   : true
	 *           } );
	 * 监听多个事件，每个监听器配置不相同          
	 * this.on( {
	 * 				"name" : {
	 * 							fn : fn,
	 * 							scope : scope,
	 * 							one : true,
	 * 						  }
	 *           } );
	*/
    on : function(eventName, fn, scope, o){
        if(typeof eventName == "object"){
            o = eventName;
            for(var e in o){
                if(typeof o[e] == "function"){
                    // shared options
                    this.on(e, o[e], o.scope,  o);
                }else{
                    // individual options
                    this.on(e, o[e].fn, o[e].scope, o[e]);
                }
            }
            return this;
        }
		
		var ce = this.getEvent( eventName );
		if (!ce) {
			this.addEvents(eventName);
			ce = this.getEvent( eventName );
		}
       	ce.addListener(fn, scope, o);
		
		return this;
    },

    un : function(eventName, fn, scope){
        var ce = this.events[eventName];
        if(typeof ce == "object" && ce.removeListener){
            ce.removeListener(fn, scope);
        }
		return this;
    },

    purgeListeners : function(){
        for(var evt in this.events){
            if(typeof this.events[evt] == "object"){
                 this.events[evt].clearListeners();
            }
        }
    },

    addEvents : function(){
		if ( !this.events )
			this.events = {};
		
        for (var i = 0, a = arguments, v; v = a[i]; i++) {
			var name = v, type = 1;
			if ( typeof v == "object" ){
				name = v.name;
				type = v.type;
			}
			
			if ( !this.events[ name ] ){
				var obj;
				if ( type == 2 ){
					obj = new EventObs( this, name );
				}else if ( type == 3 )
					obj = new EventImd(this, name );
				else	
					obj = new EventNormal(this, name );					
					
				this.events[ name ] = obj;
			} 
		}
    },

    hasListener : function(eventName){
        var e = this.events[eventName];
        return typeof e == "object" && e.listeners.length > 0;
    },

    suspendEvents : function(){
        this.eventsSuspended = true;
    },

    resumeEvents : function(){
        this.eventsSuspended = false;
    },

    suspendEvent : function( eventName ){
		//log( "suspendEvent function : " + eventName );
        var ce = this.getEvent( eventName );
		if ( ce )
			ce.pause();
    },

    resumeEvent : function( eventName ){
		//log( "resumeEvent function : " + eventName );
        var ce = this.getEvent( eventName );
		if ( ce )
			ce.resume();
    },
		
	destroy		 : function(){
		this.suspendEvents = true;
		this.purgeListeners();
		this.events = {};
	}
});/**
 * 管理类
 * 负责管理子对象
 */
var Manager = Observable.extend({
	len	: 0,
	
	init	: function(){
		this.addEvents( "add","remove" );
		this._super( arguments[0] );
		
		this.items = {};
		
		return this;
	},
	
	//key, value
	reg		: function( key, value ){
		if ( key != undefined && value != undefined  ) {
			if (!this.has(key)) {
				this.len++;
				this.items[key] = value;
				
				this.fireEvent( "add", key, value, this );
			}else	
				this.items[key] = value;
		}
		return this;
	},
	
	unreg	: function( key ){
		if ( this.has(key) != undefined ) {
			this.len--;
			var value = this.items[ key ];
			delete this.items[ key ];	
			
			this.fireEvent( "remove", key, value, this );
		}
		
		return this;
	},
	
	get		: function( key ){
		return this.items[ key ];
	},
	
	has		: function( key ){
		return this.items[ key ] != undefined;
	},
	
	count	: function(){
		return this.len;
	},
	
	each	: function( fn, scope ){
		for( var key in this.items ){
			var item = this.items[ key ];
			fn.call( scope || item, key, item );
		}
	},
	
	destroy	: function(){
		for (var i=0; i<this.items.length; i++) {
			if ( this.items[i].destroy )
				this.items[i].destroy();
		};		
	}	
});
/**
 * 全局参数
 */
var 
CELL_WIDTH	= 48,
CELL_HEIGHT	= 48,
CELL_XNUM	= 20,
CELL_YNUM	= 20,

MAX_H = CELL_HEIGHT * CELL_YNUM,
MAX_W = CELL_WIDTH * CELL_XNUM,

UNDERCOVER = false, 
DEBUG	= false,
PANEL = null,
//窗口的宽高
WINDOW_WIDTH = 960,
WINDOW_HEIGHT= 480,
DISPLAY_HEIGHT = 160,

SPEED	= 8,	//调节unit切换图片的速度
STEP	= 4 ,	//调节走路速度
ASPEED  = 2,  //攻击速度
TIPSPEED  = 5,  //提示信息显示速度

HPHEIGHT = 7,//血条的高度
//血条颜色展示 共五档，每档用两个色值
HPCLR	= [ ["#7a2200", "#8d2b00"] ,  ["#8a3200", "#9d3b00"] ,  ["#7a7100", "#978c00"] ,
			  ["#297a00", "#329700"] ,  ["#007a00", "#009700"]      ],
//主要信息颜色 边框、背景
MAJORBORDER = [  "#fdc92b", "#15D317", "#FF654E" ],
MAJORBG ="rgba(31,41,61,0.4)",

CELLCOLOR = [ "rgba(255,255,255,0.6)"  ], //单元格颜色信息
SELECTEDCLR = [ "#fdc92b"  ],   //选中的颜色

MOVECOLOR = "rgba(39,167,216,0.6)",  //移动时颜色 
ATTACKCOLOR = "rgba(255,0,0,0.5)",	//攻击时颜色 

HighLightDeep = 190,    //高亮度

STRENGTHHP	= 10, //一点力量增加的血量
AGILITYDEF  = 0.5, //一点敏捷增加的防御值
INTELLIGENCEMP = 10,  //一点智力增加的魔法值

PATH = "http://www.sinaimg.cn/cj/newjs/slg/"
;  
//物品 魔法
var 
GOODS = {
			1 : {
			id			: 1,
			desc	: "恢复HP",
			count	: 1,
			name	: "恢复用豆",
			consumable : true,
			effect	: 3,
			src		: "images/item/82-1.png",
			animation : {
				color	: "#00ff80",
				text	: "+50"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.onIncrease( 50 );
				}
			}
		}, 
			2	: {
			id			: 2,
			desc	: "下雨",
			count	: 1,
			name	: "水灵珠",
			consumable : false,
			nounit	: true,
			effect	: 7,
			src		: "images/item/87-1.png",
			listeners : {
				apply	: function( unit ){
					
				}
			}
		},
			3 : 	{
			id			: 3,
			desc	: "小李飞刀",
			count	: 10,
			name	: "飞镖",
			rangeType : 2,
			range	: 2, 
			consumable : true,
			effect	: 7,
			src		: "images/item/1-1.png",
			animation : {
				color	: "#ff0000",
				text	: "-20"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.getHurt( 20, fireman );
				}
			}			
		}, 
			4: 		{
			id			: 4,
			desc	: "恢复MP",
			count	: 5,
			name	: "绛珠仙草",
			consumable : true,
			effect	: 3,
			src		: "images/item/94-1.png",
			animation : {
				color	: "#0080ff",
				text	: "+50"		
			},
			listeners : {
				apply	: function( unit, fireman ){
					unit.onIncreaseMP( 50 );
				}
			}
		},			
		"taipingqing"	: {
			id			: "taipingqing",
			desc	: "太平清领道",
			count	: 0,
			name	: "水灵珠",
			consumable : false,
			nounit	: true,
			effect	: 7,
			src		: "images/item/77-1.png",
			listeners : {
				apply	: function( unit ){
					
				}
			}
		},
		},		
		//状态
		BUFFS = {
			confuse : {
				last	: 2,
				src	   : "images/magic/49-1.png",
				desc  : "迷糊中",
				listeners : {
					apply	: function( unit ){
						unit.lock = true;	//锁定用户
					}
				}					
			},
			stop		   : {
				src	   : "images/magic/51-1.png",
				desc  : "不能移动"
			}
		},
		
		ANIMATIONS = {
			fire	: {
				src	   : "images/magic/fire.png",
				w		: 48,
				h		: 48,
				inter   : 5
			},
			redStar	: {
				src	   : "images/magic/35-1.png",
				w		: 64,
				h		: 64,
				inter   : 1
			},
			storm	: {
				src	   : "images/magic/25-1.png",
				w		: 75,
				h		: 90,
				inter   : 2
			},
			zhuque	: {
				src	   : "images/magic/zhuque.png",
				w		: 300,
				h		: 300,
				inter   : 3,
				audio : "bird"
			}			
		},
		
		MAGICS = {
			light	: {
				name	: "圣光",
				desc	: "恢复HP",
				img		: "images/item/82-1.png",
				animation : "redStar",
				range	: 1, 			
				rangeType : 1,     	
				needMP	: 10,	
				effect	: 3,	
				listeners : {
					apply	: function( unit, fireman ){
						unit.onIncrease( 50 );
					},
					over	: function( magic, fireman ){
						//fireman.finish();
					}
				}	
			},
			storm	: {
				name	: "风暴",
				desc	: "单体减伤",
				img	   	: "images/item/1-1.png",
				needMP	: 50,
				range	: 4, 			
				rangeType : 2,     
				animation : "storm",	
				effect	: 7,	
				listeners : {
					apply	: function( unit, fireman ){
						unit.getHurt( 50, fireman );
					},
					over	: function( magic, fireman ){
						//fireman.finish();
					}
				}					
			}
		},
		
		AUDIOS	= {
			battle	: {
				src : "audios/battle.ogg", loop : true
			},
			attack	: {
				src : "audios/attack.ogg"
			},
			dead	: {
				src : "audios/dead.ogg"
			},
			gain	: {
				src : "audios/gain.ogg"
			},
			movefoot	: {
				src : "audios/move1.ogg", loop : true
			},
			movehorse	: {
				src : "audios/movehorse.ogg" , loop : true
			},
			turn	: {
				src : "audios/turn.ogg"
			},
			upgrade	: {
				src : "audios/upgrade.ogg"
			},
			appear	: {
				src : "audios/appear.ogg"
			},
			bird		: {
				src : "audios/bird.ogg"
			},
			script	: {
				src : "audios/open.ogg"
			}
		};
		
// 全局变量
var canvas, ctx;
//阵营 队伍 及快捷方式 //第几回合
var FACTION = 1, TEAM = 100, MYTEAM, FRIENDS, ENEMY, ROUND = 0;

		
		/**
 * 组件类
 * 主要负责DOM组件的操作
 * 显示/隐藏 设置宽高等
 */
var Component = Observable.extend({
	hidden	: false,
	absolute: true,
	
	init: function( config ){
		this.addEvents( "hide","show" );
		this._super( config );
		
    	if ( !this.el )
			this.el = $("<div/>");
		else
			this.el = $( this.el );	
		
		if ( this.w )
			this.width( this.w );
		
		if ( this.h )
			this.height( this.h );
			
		if ( this.cls )
			this.el.addClass( this.cls );	

		return this;	
  	},
	
	showAt	: function( x,y ){
		if ( x.constructor == Array )
			return arguments.callee( x[0], x[1] );
		else if ( typeof x == "object" )
			return arguments.callee( x.left, x.top );	
		else if ( typeof x == "number" && typeof y == "number" )
			this.el.css({
				left	: x,
				top		: y
			});		
			
		return this;	
	},
	
	width	: function( w ){
		return this.el.width( w );
	},
	
	setBgImage : function( img ){
		this.el.css("background-image", "url(" + img + ")")
			.addClass("unselect");
		return this;
	},
	
	setBgColor : function( clr ){
		this.el.css("backgroundColor", clr);
		return this;
	},	
	
	height	: function( h ){
		return this.el.height( h );
	},	
	
	pri		: function( level ){
		if (typeof level == "number") {
			this.el.css("zIndex", this._pri = level);
			return this;
		}
		else
			return this.el.css("zIndex");
	},
	
	show	: function(){
		if (this.hidden) {
			this.hidden = false;
		
			this.el.show.apply( this.el, arguments );
			this.fireEvent( "show", this );
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden) {
			this.hidden = true;
		
			this.el.hide.apply( this.el, arguments );
			this.fireEvent( "hide", this );
		}
		return this;
	},		
	
	destroy	: function(){
		if ( this.el )
			this.el.remove();
	}
});/**
 * 战场采用分层展示，该类是其他层的基类
 */
var Layer = Observable.extend({
	hidden : false,
	
	init: function( config ){
		this.items = new Manager();
		
    	this._super( config );
		
		return this;
  	},
		
	show	: function(){
		if (this.hidden) {
			this.hidden = false;
			this.items.each( function(){
				if ( this.show )
					this.show();
			} );
		}
		return this;
	},	
	
	hide	: function(){
		if ( !this.hidden ) {
			this.hidden = true;
			this.items.each( function(){
				if ( this.hide )
					this.hide();
			} );
		}
		return this;
	},
	
	//interface
	clear	: function(){
		
	},		
	
	destroy	: function(){
		//销毁这层上的所有单元
		this.items.each( function(){
			if ( this.destroy )
				this.destroy();
		} );
	
		this._super();
	}
});
/**
 * 单元格
 * x : 行
 * y : 列
 * dx : 所在行的像素
 * dy : 所在列的像素
 */

var Cell = function( config ){
	$.extend( this, config );
	
	this.dx = this.x * CELL_WIDTH;
	this.dy = this.y * CELL_HEIGHT;
	this.index = Cell.getIndex( this.x, this.y );
};

Cell.prototype = {
	parent 	: null,	//用于寻路
	
	/*	方位  相对于自身
	 * 			4		3		2
	 * 			1		0		-1
	 * 			-2		-3		-4
	*/		
	direct	: function( to ){
		var diffX = to.x - this.x,
				diffY = this.y - to.y;
		if ( diffX == 0 && diffY == 0 ) return 0;
				
		var d = Math.pow( diffX*diffX + diffY * diffY, 0.5 ),
			   a = Math.acos( diffY/ d );
		
		var r = ( a > Cell.a1 && a <= Cell.a2 ) ? (  diffX > 0 ? -1 : 1 ) : ( diffY > 0 ? 3 : -3 );
		return r;	
		//return (to.y > this.y ? 1 : ( to.y == this.y ? 0 : -1 )) * 3 + 
		//			(to.x > this.x ? 1 : ( to.x == this.x ? 0 : -1 ));
	},

	directT : function( to ){
		var n = this.direct( to );
		
		switch( n ) {
			case -3: //下
				return "down";
			case 3://上
				return "up";
			case -2://左上
			case 1://左下	
			case 4://左
				return "left";
			case -4://右上
			case 2://右下
			case -1://右
				return "right";
			default:
				return "down";	
		}
	},
	
	up	: function(){
		return CellMgr.get( this.x, this.y -1 );
	},
	down	: function(){
		return CellMgr.get( this.x, this.y +1 );
	},
	left	: function(){
		return CellMgr.get( this.x - 1, this.y );
	},
	right	: function(){
		return CellMgr.get( this.x + 1, this.y );
	},
	distance	: function( cell ){
		return Math.abs( this.x - cell.x ) +  Math.abs( this.y - cell.y );
	}			
};
Cell.a1 = Math.PI / 4;
Cell.a2 = 3 * Math.PI / 4;
/**
 * 获得index值
*/
Cell.getIndex = function( x, y){
	return x * CELL_YNUM + y;
}

CellMgr	= new function(){
	var cells = {};
	
	return {
		get		: function( x, y ){
			var index =  Cell.getIndex( x, y );
			if ( cells[ index ] )
				return cells[ index ];
			else if ( x < 0 || y < 0 || x >= CELL_XNUM || y >= CELL_YNUM ){
				return null; //超出边界
			} else {
				var cell = new Cell( {
					x 	:	x, y : y
				} );
				cells[ index ] = cell;
				return cell;
			}
		}
	}
	
};
/**
 * 单元格层
 * 负责显示单元格的着色
 */
var CellLayer = Layer.extend({
	selected	: null,
	clicked		: null,
	lines			: false, //画格子
	
	init	: function(){
		this.cells = {};
		this.borders = {};
		this._super( arguments[0] );
		
		PANEL.on("mousemove", this.activeCell, this )
					 .on("paint", this.onPaint, this )
					 .on("mouseleave", this.unactiveCell, this );
		
		return this;
	},
	
	showGrid	: function(){
		this.lines = true;
		return this;
	},
	
	hideGrid	: function(){
		this.lines = false;
		return this;		
	},
	
	x	: -1,
	y	: -1,	
	
	//获得当前鼠标经过的CELL
	activeCell	: function(x, y){
		var o = getPoints( x, y );
		
		this.x = o.x;
		this.y = o.y;
		
		return this;
	},
	
	//不再显示鼠标滑过时的效果
	unactiveCell	: function(){
		this.x = this.y = -1;
		return this;
	},
	
	onPaint					: function(){
		//画格子
		if ( (this.lines || DEBUG) && this.x > -1 && this.y > -1 ){
			ctx.save();
			
			ctx.fillStyle  = "rgba(255,255,255, 1)";
			ctx.font = "14px";

			ctx.translate( Math.max(0,PANEL.scrollLeft), Math.max(0,PANEL.scrollTop) );
			ctx.fillText( "(" + this.x + "," + this.y + ")" , 5, 15 );
			ctx.restore();				
		}
		//绘制cell
		for( var color in  this.cells ){
			ctx.save();
			
			ctx.fillStyle = color;
			var obj = this.cells[ color ];
			for( var key in obj ){
				var cell = obj[ key ];
				ctx.fillRect( cell.dx , cell.dy, CELL_WIDTH, CELL_HEIGHT );
			}
			ctx.restore();			
		}
		//只绘制cell边框
		for( var color in  this.borders ){
			ctx.save();
			ctx.strokeStyle = color;
			var w = 4, half = w/ 2;
			ctx.lineWidth = w;  
			//确保画到正确位置
			ctx.translate( half, half  );
			//纠正方块宽高
			var width = CELL_WIDTH - w -1 , 
					height = CELL_HEIGHT - w - 1;
/*
			ctx.shadowOffsetX = 2;  
			ctx.shadowOffsetY = 2;  
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  	
*/
						
			var obj = this.borders[ color ];
			for( var key in obj ){
				var cell = obj[ key ];
				ctx.strokeRect( cell.dx + 1 , cell.dy + 1, width , height );
			}
			ctx.restore();			
		}		
		//鼠标滑过
		if ( this.x >= 0 && this.y >= 0 ){
			ctx.save();
			var w = 2, half = w/ 2;
			ctx.lineWidth = w;
/*
			ctx.shadowOffsetX = 1;  
			ctx.shadowOffsetY = 1;  
			ctx.shadowColor = "rgba(0, 0, 0, 0.5)";  
*/
					
			ctx.strokeStyle = CELLCOLOR[0];
			ctx.strokeRect( this.x * CELL_WIDTH + half , this.y * CELL_HEIGHT + half, CELL_WIDTH - w, CELL_HEIGHT -w );
			
			ctx.restore();
		}
	},
	
	strokeCells			: function( color, cell ){
		if ( this.borders[ color ] == undefined )
			  this.borders[ color ] = {};
		
		//if ( cell.constructor == Cell )
		if ( cell.direct )
			this.borders[ color ][ cell.index ] = cell;
		else
			this.borders[ color ] = cell;
			
		return this;		
	},
	
	paintCells				: function( color, cell ){
		if ( this.cells[ color ] == undefined )
			  this.cells[ color ] = {};
		
		//if ( cell.constructor == Cell )
		if ( cell.direct )
			this.cells[ color ][ cell.index ] = cell;
		else
			this.cells[ color ] = cell;
			
		return this;		
	},	
	
	clear			: function( color ){
		if ( color )
			delete this.cells[ color ];
		else
			this.cells = {};
			
		return this;	
	}
			
}); /**
 * 动画类
 * inter	: 相隔的帧数
 * imgs		: 图片集合
 * index	: 当前图片的指针
 * fn, scode
 */
var Animation = Observable.extend({
	id		: "", 
	imgs	: [], //图片
	img		: null,
	inter	: 0,
	count	: 0,
	index   : 0,
	playing : false,
	dx		: 0,
	dy		: 0,
	//w		: 0,
	//h  		: 0,
	fn		: null,
	scope   : null,
	audio	: "",	//音效
	
	init	: function(){
		this.addEvents( "end" );
		this._super( arguments[0] );
		
		if ( this.audio )
			this.audioObj = SoundMgr.get( this.audio );
		
		return this;
	},
	
	onPaint	: function(){
		var item = this.imgs[ this.index ];
		
		if ( item && item.constructor == Object ) {
			//修正坐标信息
			if ( item.dx )  this.dx = item.dx;
			if ( item.dy )  this.dy = item.dy;
			if ( item.w != undefined )  this.w = item.w;
			if ( item.h != undefined )  this.h = item.h;
			this.img = item.img;
		} else{
			this.img = item;
		}		
		//绘制图像
		if ( this.img ) {
			this.w = this.w == undefined ? this.img.width : this.w;
			this.h = this.h == undefined ? this.img.height : this.h;
			try {
				ctx.drawImage( this.img, this.dx, this.dy, this.w, this.h );
			} 
			catch (e) {}
		}		
	},
	
	play	: function(){
		if ( this.index == 0 && this.audioObj ){
				this.audioObj.play();
		}
		this.onPaint();
		
		if ( this.inter == 1 || ++this.count == this.inter ){
			this.count = 0;
			this.next();
		}	
					
		return this;
	},
	
	next	: function(){
		this.index++;
		//到最后一个位置后从新开始
		if (this.index == this.imgs.length) {
			
			this.fireEvent( "end", this );
			
			if ( this.fn )
				this.fn.call( this.scope || this, this );
				
			this.index = 0;
		}
	},
	
	from	: function( i ){
		this.index = i;
		return this;
	},
	
	stop	: function(){
		return this;
	},
	
	//TODO 根据窗口自动调整播放位置
	position	: function( x, y ){
		this.dx = x;
		this.dy = y;
		
		return this;
	},
	
	callback	: function( fn, scope ){
		this.fn = fn;
		this.scope = scope;
		
		return this;
	}		
}); 

Animation.get = function( name, config ){
	config = $.extend( ANIMATIONS[ name ], { id : name }, config );
	
	return new Animation( config );
}
/**
 * 静物层 不可移动的单位，同时可位于角色底部播放动画
 */
var StaticLayer = Layer.extend({
	
	init	: function(){
		this.addEvents( "add", "remove" );
		this._super( arguments[0] );
		
		this.items = new Manager();
		
		PANEL.on("paint", this.onPaint, this );
		
		return this;
	},
	
	onPaint					: function(){
		this.items.each( function( i, n ){
			n.play();		
		} );
	},
	
	_gerateKey	: function( a, b, c){
		return "" + a + b + "" + c;
	},
	
	/**
	 * 	[{ name : "name", x : x, y : y  }, {...}, ... ], fn, scope
	 * TODO 改为只接收config
	*/
	add		: function( name, x, y, fn, scope ){
		if ($.isArray(name)) {
			fn = x;
			scope = y;
			for (var i = 0; i < name.length; i++) {
				var config = name[i];
				this.add(config.name, config.x, config.y);
			}
		}
		else {
			var dx = x * CELL_WIDTH, dy = y * CELL_HEIGHT;
			var a = Animation.get(name, { dx: dx, dy: dy });
			
			this.items.reg(this._gerateKey(name, dx, dy), a);
			this.fireEvent("add", x, y, a, this);
		}
		if ( fn )
			setTimeout( bind( fn, scope||this ), 100 );
	},
	
	remove	: function( name, x, y , fn, scope ){
		var dx = x * CELL_WIDTH, dy = y * CELL_HEIGHT, key = this._gerateKey(name , dx , dy),
			a = this.items.get( key ); 
		
		this.items.unreg( key );
		this.fireEvent("remove", x, y, a, this );
		if ( fn )
			fn.call( scope || this, this );		
	}
				
}); /**
 * 角色形象展示
 */
var Figure  = Observable.extend({
	imgMove	: "",		//移动
	imgAtk	: "",		//攻击
	imgSpc	: "",		//特殊
	imgFace	: "",		//头像
	
	init	: function( config ){
		this.grays = {};
		this.highlights = {};
		
		if( UNDERCOVER ){
			$.extend( config, {
				imgMove	: "images/move/0.png",
				imgAtk	: "images/atk/0.png",
				imgSpc	: "images/spc/0.png",
				imgFace	: "images/face/0.png"
			} );
		}else{
			$.extend( config, {
				imgMove	: PATH + config.imgMove,
				imgAtk	: PATH + config.imgAtk,
				imgSpc	: PATH + config.imgSpc,
				imgFace	: PATH + config.imgFace
			} );			
		}		
		this.addEvents( "load" );
		this._super( config );
		
		this._getImageData();
		
		//用主动循环检测替代被动接收
		//canvas.toDataURL或drawImage是异步的
		var _self = this, attrs = ["down","up","left","right","fall"];
		this.timer = setInterval( function(){
			var done = true;
			for (var i=0; i<attrs.length; i++) {
				var a = _self[attrs[i]];
				if ( a ) {
					for (var j = 0; j < a.length; j++) {
						var img = a[j];
						if ( !(img && img.width != 0) ) {
							done = false;
							return;
						}
					}
				}else
					done = false;
			}
			if ( done ){
				clearInterval( _self.timer );
				_self.fireEvent( "load", _self );
			}
		}, 10 );
		
		return this;
	},
	
	/**
	 * 将整张图片切割为很多小图片 并缓存起来
	*/
	_getImageData	: function(){
		var _self = this, 
				loaded = 0;
		
		//4张图片全部加载完之后
		function done( src ){
			//log( _self.name + " : " + src + " done");
			//if (loaded++ >= 3) {
				//_self.fireEvent( "load", _self );
			//}
		}
		
		//移动		
		var fn	= function(){
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.down = [
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*6, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*0, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];

			_self.up = [ 	PS.putImgToCanvas( this, 0, CELL_HEIGHT*7, CELL_WIDTH, CELL_HEIGHT ), 
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *3, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.left = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.putImgToCanvas( this, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *5, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.fall = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT*9, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvas( this, 0, CELL_HEIGHT *10, CELL_WIDTH, CELL_HEIGHT ) ];			

			_self.right = [ PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*8, CELL_WIDTH, CELL_HEIGHT ),  
							PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT ),
							PS.putImgToCanvasTurn( this,  0, CELL_HEIGHT*5, CELL_WIDTH, CELL_HEIGHT ) ];
		}
		_loadImg( _self.imgMove, fn );	
		
		//攻击
		var fn2	= function(){
			var w = 64, h = 64, h2 = 48;
			//每个方位对应一个数组　第一位为静态站立时的图像，后两位为行动时的动画
			_self.adown = [
							PS.putImgToCanvas( this, 0, 8 + h * 0, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h      , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 2, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 3, w, h2 ) ];
							
			_self.aup =[PS.putImgToCanvas( this, 0, 8 + h * 4, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h   *   5   , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h     * 6, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h     * 7, w, h2 ) ];
							
			_self.aleft =[PS.putImgToCanvas( this, 0, 8 + h * 8, w, h2 ),
							PS.putImgToCanvas( this, 0, 8 + h    *  9  , w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 10, w, h2 ) ,
							PS.putImgToCanvas( this, 0, 8 + h * 11, w, h2 ) ];

			_self.aright =[	PS.putImgToCanvasTurn( this,  0, 8 + h*8,  w, h2 ),
							PS.putImgToCanvasTurn( this,  0, 8 + h*9,  w, h2 ) ,
							PS.putImgToCanvasTurn( this,  0, 8 + h*10, w, h2 ) ,
							PS.putImgToCanvasTurn( this,  0, 8 + h*11, w, h2 ) ];	
			
			//done( _self.imgAtk );
		}
		_loadImg( _self.imgAtk, fn2 );	
		
		//防御 被击中  致命一击
		var fn3	= function(){
			_self.ddown = [	PS.putImgToCanvas( this, 0, CELL_HEIGHT * 0, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dup = [ PS.putImgToCanvas( this, 0, CELL_HEIGHT*1, CELL_WIDTH, CELL_HEIGHT ) ];
							
			_self.dleft = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT )];
							
			_self.attacked = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*3, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.lift = [PS.putImgToCanvas( this, 0, CELL_HEIGHT*4, CELL_WIDTH, CELL_HEIGHT )];
			
			_self.dright = [PS.putImgToCanvasTurn(  this,  0, CELL_HEIGHT*2, CELL_WIDTH, CELL_HEIGHT ) ];
			
		}
		_loadImg( _self.imgSpc, fn3 );		
		
		//头像	
		var fn4	= function(){
			
			_self.face = [	this ];
																				
			done( _self.imgFace );
		}
		_loadImg( _self.imgFace, fn4 );				
	},
	
	gray	: function( key, img ){
		//缓存灰化图像
		if ( !this.grays[ key ] ){
			this.grays[ key ] = PS.grayImg( img );
		}
		
		return this.grays[ key ];	
	},
	
	//高亮攻击图像
	highlight	: function( key, img, deep ){
		//缓存高亮图像
		if ( !this.highlights[ key ] ){
			this.highlights[ key ] = PS.highlightImg( img, deep );
		}
		
		return this.highlights[ key ];	
	}	
}); /**
 * 角色的UI控制，每个动画执行完毕后均支持回调
 * 
 * 动画配置
 * direct : 执行动画后角色面对方向
 * params : 回调函数中接受的参数
 * inter  :  没一副图片相隔的帧数
 * count : 执行过的帧数
 * loop	  : 循环播放
 * index  : 图片索引 
 */
var UnitUI = Observable.extend({
	unit	: null, 	//unit主体
	foot	: 1,
	img		: null,
	direct  : "down",
	oriDirect : "down",
	w	: CELL_WIDTH,
	h  : CELL_HEIGHT,
	step : 0, //步伐计数器
	
	init	: function( config ){
		this._super( config );
		
		this.imgStack = [];
		this.tipStack = [];
		
		//初始化方向
		this.oriDirect = this.direct = this.unit.direct || "down";
		
		//获取相同角色的img集合
		var unit = this.unit;
		this.imgs = ImgMgr.get( unit.symbol );
		
		return this;
	},
	
	_changeFoot	: function(){
		this.foot = this.foot == 2 ? 1 : 2;
		return this.foot;
	},
	
	draw	:  function( timestamp ){
		var unit = this.unit, cell = unit.cell;
		var w, h;
		 
		//有待执行的动画
		if( this.imgStack.length > 0 ){
			var a = this.imgStack[0];

			if ( a.inter == 1 || a.count++ == a.inter ) {
				a.count = 0;
				//如果已经没有图像可画
				if ( a.index >= a.items.length ) {
					//更改角色所处方向
					if ( a.direct )
						this.direct = a.direct;
					//还原宽高	
					this.w = CELL_WIDTH;
					this.h = CELL_HEIGHT;
					
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					if ( !a.loop )
						//从队列中抛弃当前动画
						this.imgStack.shift();
					else
						a.index = 0;	
				}
				else {
					var index = a.index++, item = a.items[ index ];
					
					if ( !item ){
						//空图像
						this.img = null;
					}else  if ( item.constructor == Object ) {
						//修正坐标信息
						if ( item.dx )  this.dx = item.dx;
						if ( item.dy )  this.dy = item.dy;
						if ( item.w != undefined )  this.w = item.w;
						if ( item.h != undefined )  this.h = item.h;
						this.img = item.img;
					}
					else {
						//只传了图像
						this.dx = cell.dx;
						this.dy = cell.dy;
						this.img = item;
					}
				}
			}
		}else{
			this.dx = cell.dx;
			this.dy = cell.dy;
			
			//长时间执行的状态
			//切换步伐
			if( this.step++ >= SPEED ){
				this.step = 0;
				this._changeFoot();
			}
			
			if ( !PANEL.isScripting() ) {
				if (unit.standby) {
						//待机
						this.img = this.imgs.gray(this.direct, this.imgs[this.direct][0]);
				} else
				if (!unit.moving && unit.debility) {
					//虚弱时
					this.img = this.imgs.fall[this.foot - 1];
				}
				else {
						this.img = this.imgs[this.direct][this.foot];
					}
			}else{
				//执行脚本时，锁定图像
				if (unit.standby) {
						//待机
						this.img = this.imgs.gray(this.direct, this.imgs[this.direct][0]);
				} else 
				if (!unit.moving && unit.debility) {
					//虚弱时
					this.img = this.imgs.fall[ 0 ];
				}
				else {
					this.img = this.imgs[this.direct][ 0 ];
				}				
			}
		}

		//绘制图像
		if ( this.img ) {
			this.w = this.w == undefined ? this.img.width : this.w;
			this.h = this.h == undefined ? this.img.height : this.h;
			try {
				ctx.drawImage( this.img, 0, 0, this.w, this.h, this.dx, this.dy, this.w, this.h );
			} 
			catch (e) {}
		}
	},
	
	drawBuff	: function(){
		var unit = this.unit;
		if ( unit.moving || unit.attacking )
			return;
		
		var buffs = this.unit.buffs, cell = this.unit.cell, w = 12, h = 12, count = 0;
		for( var key in buffs ){
			var buff = buffs[ key ];
			try {
				ctx.drawImage( buff.img, cell.dx + count * w, Math.max( 0, cell.dy - 8 ), w, h );
			} 
			catch (e) {}			
			//右移
			count++;
			//最多画4个
			if ( count >= 4 )
				break;
		}
	},
	
	drawTip	:  function( timestamp ){
		var unit =this.unit, cell = unit.cell,
			dx = cell.dx, dy = cell.dy;
			
		//当角色位于两边时调证坐标系
		ctx.save();
		
		//绘制血条
		var y = dy - 9;
		if ( unit.hpLine || PANEL.unitsLayer.hpLineForce ) {
			y = y < 0 ? 0 : y;
			//血条黑色背景
			ctx.fillStyle = "rgb(0,0,0)";
			ctx.fillRect(dx, y, CELL_WIDTH, HPHEIGHT);
			//血条
			var colors = HPCLR[Math.min(4, parseInt(unit.hpPercent / 20) )];
			var lingrad = ctx.createLinearGradient(dx, y + 1, dx, y + HPHEIGHT - 1);
			lingrad.addColorStop(0, colors[0]);
			lingrad.addColorStop(0.5, colors[1]);
			lingrad.addColorStop(1, colors[0]);
			
			ctx.fillStyle = lingrad;
			ctx.fillRect(dx, y + 1, CELL_WIDTH * unit.hpPercent / 100, HPHEIGHT - 2);
		}
		//绘制主要信息
		if ( unit.major ){	
			//主要信息
			//边框 
			var off = 5, h = 30;
			if ( dy - 9 < 0 )
				y += h + CELL_HEIGHT + 5;			
			ctx.lineJoin = "round";
			ctx.miterLimit = 15;
			ctx.lineWidth = 2;
			//不同队伍显示不同颜色的边框
			var bcolor = 0;
			if ( unit.isFriend( FACTION, TEAM ) )
				bcolor = 1;
			else if ( unit.isEnemy( FACTION, TEAM ) )
				bcolor = 2;	
			ctx.strokeStyle = MAJORBORDER[ bcolor ];
			
			ctx.strokeRect(  dx - off,  y - 30 - 3, CELL_WIDTH + off * 2 ,  h  );
			ctx.fillStyle = MAJORBG;
			ctx.fillRect(  dx - off,  y - 30 - off + 2, CELL_WIDTH + off * 2 ,  h - 2  );
			
			//名称
			ctx.lineWidth = 1;
			ctx.font = "10px 宋体";
			ctx.strokeStyle = "#e5e6e9";
			ctx.strokeText( unit.name,  dx,  y - 20 );
			
			//级别
			ctx.strokeText( "级别　" + unit.level,  dx,  y - 8 );   			
		}
		ctx.restore();		
				
		//有待执行的动画
		if( this.tipStack.length > 0 ){
			var a = this.tipStack[0];
			
			//if ( a.count++ >= a.inter ) {
				//a.count = 0;
				
				//绘完所有帧
				if ( a.frame == 0 ) {
					if (a.fn) 
						a.fn.apply(a.scope || this, a.params || [] );
					
					//从队列中抛弃当前动画
					this.tipStack.shift();
				}
				else {
					a.frame--;
					//更改位置
					a.from[ 0 ] += a.increment[ 0 ];
					a.from[ 1 ] += a.increment[ 1 ];
				}
			//}
			
			ctx.save();
			if ( a.font )
				ctx.font =  a.font;
			if ( a.color )	
				ctx.fillStyle = a.color;
			if ( a.text )
				ctx.fillText( a.text, a.from[ 0 ], a.from[ 1 ] );
	
			ctx.restore();			
		}
	},	
	
	pushImg : function(){
		for (var i=0; i<arguments.length; i++) {
			var a = arguments[ i ];
			a.index = a.index || 0;
			a.count = a.count || 0;	//内部变量
			
			this.imgStack.push( a );
		}
	},

	pushTip : function(){
		for (var i=0; i<arguments.length; i++) {
			var a = arguments[ i ];
			var cell = this.unit.cell, dx = cell.dx, dy = cell.dy;
			
			a.count = a.count || 0;	//内部变量
			a.inter = a.inter || TIPSPEED;
			a.color	= a.color || "rgba(255,255,0,1)";
			a.font = a.font || "15px";
			a.from = a.from || [ dx + CELL_WIDTH / 3, dy + CELL_HEIGHT / 2 ];
			a.increment = a.increment  || [ 0, -1 ];
			a.frame = a.frame || 15;
					
			this.tipStack.push( a );
		}
	},
		
	moveTo	: function( way ){
		if (way.length == 0) {
			//原地
			this.unit.onMove( this.unit.cell );
		}
		else {
			this.oriDirect = this.direct;
			
			var i = 0, from = this.unit.cell, steps = [];
			way.reverse();
			//循环添加
			SoundMgr.play( "movefoot" );
			while( i < way.length ){
				var to = way[ i++ ];
				var direct = from.directT( to );
				
				var arr = this._fillMoveSteps( from, direct, 4 );	
				
				var obj = {
					inter	: 1,
					items	: arr,
					fn 		: function( cell ){
						this.fireEvent( "walk", this, this.cell, cell );
						this.cell = cell;
						//移动到最后一个位置时触发move事件
						if (cell == way[way.length - 1]) {
							SoundMgr.pause( "movefoot" );
							this.onMove(cell);
						}
					}, 
					params	: [ to ],
					direct  : direct,
					scope	: this.unit
				}
				
				this.pushImg( obj );
				from = to;
			}
		}
	},
	
	//从一个单元格移动到另一个单元格时 需要移动的步数
	_fillMoveSteps	: function( from, direct, count ){
		var actions = this.imgs[ direct];
		var dx = from.dx, dy = from.dy, ret = [];
		
		for (var i=1; i<= count; i++) {
			//动态生成移动位置
			switch( direct ) {
				case "down": //下
					dx1 = dx; dy1 = dy + i * CELL_HEIGHT/count;
					break;
				case "up"://上
					dx1 = dx; dy1 = dy - i * CELL_HEIGHT/count;
					break;
				case "left"://左
					dx1 = dx - i * CELL_WIDTH /count ; dy1 = dy;
					break;
				case "right"://右
					dx1 = dx + i * CELL_WIDTH /count ; dy1 = dy;
					break;
			}
					
			ret.push( {
				img	: actions[ this._changeFoot() ],
				dx  : dx1, dy : dy1 
			} );
		}
		
		return ret;			
	},
	
	homing	: function(){
		this.direct = this.oriDirect;
	},
	
	//分为两个阶段 1聚起武器 2攻击
	attack	: function( cell, bursting, hit, fn , scope ){
		//判断方向
		var direct = cell ? this.unit.cell.directT( cell ) : this.direct;	
		var actions = this.imgs["a" + direct], first  = actions[ 0 ];
		//如果致命一击 则高亮第一个动作
		if ( bursting ){
			first = this.imgs.highlight( "a" + direct, actions[ 0 ], HighLightDeep );
		}
		
		var obj1 = {
			inter	: ASPEED,
			//延长攻击第一帧显示时间
			items	: [{
				img	: first,  w : 64
			},{
				img	: first,  w : 64
			},{
				img	: actions[1],  w : 64
			} ],
			fn 		: function(){
				SoundMgr.play( "attack" );
				if ( fn )
					fn.apply( scope, arguments );
			}, 
			scope	: scope,
			direct	: direct
		}
		var obj2 = {
			inter	: ASPEED,
			items	: [ {
				img	: actions[2],  w : 64
			}, {
				img	: actions[3],  w : 64
			}],
			direct	: direct
		}	
		this.pushImg( obj1 );
		this.pushImg( obj2 );
		//SoundMgr.play( "attack" );
	},

	dead	: function( fn , scope ){
		var fall = this.imgs.fall[0];
					
		var obj = {
			inter	: 2,
			//延长攻击第一帧显示时间
			items	: [ fall, null, fall, null, fall, null ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );
		SoundMgr.play( "dead" );
	},
	
	standby	: function( fn , scope ){
		var obj = {
			inter	: 5,
			items	: [ this.imgs.gray( this.direct, this.imgs[ this.direct ][0] ) ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},

	speak	: function( fn , scope ){
		var i=0, items = [], deeps = [ 20,30,40,50,60,70,80,90,100,100,90,80,70,60,50,40,30 ];
		var status = this.direct;
		if ( this.unit.excited )
			status = "lift";
		else if ( this.unit.debility  )	
			status = "fall";
		
		for (var i=0; i<deeps.length; i++) {
			items.push( this.imgs.highlight( status + deeps[i], this.imgs[ status ][0], deeps[i] ) )
		}
		var obj = {
			inter	: 1,
			loop	: true,
			items	: items,
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},
	stopAnimation	: function(){
		this.imgStack.shift();
	},
	clearAnimation	: function(){
		this.imgStack.length = 0;
	},	
	fall		: function( fn, scope ){
		var obj = {
			inter	: SPEED,
			items	: [ this.imgs.fall[1], this.imgs.fall[0], this.imgs.fall[1], this.imgs.fall[0],  this.imgs.fall[1] ],
			fn 		: fn, 
			scope	: scope
		}
		
		this.pushImg( obj );	
	},
	
	turnLeft	: function( fn, scope ){
		this.direct = "left";
		var obj = {
			inter	: SPEED ,
			items	: [ this.imgs.left[0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );		
		SoundMgr.play( "turn" );		
	},		
	
	turnRight	: function( fn, scope ){
		this.direct = "right";
		var obj = {
			inter	: SPEED ,
			items	: [ this.imgs.right[0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );			
		SoundMgr.play( "turn" );	
	},
	
	turnUp	: function( fn, scope ){
		this.direct = "up";
		var obj = {
			inter	: SPEED ,
			items	: [ this.imgs.up[0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );			
		SoundMgr.play( "turn" );
	},	
	
	turnDown	: function( fn, scope ){
		this.direct = "down";
		var obj = {
			inter	: SPEED,
			items	: [ this.imgs.down[0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );	
		SoundMgr.play( "turn" );			
	},		
	_fillDisappear : function( n ){
		var ret = [];
		for (var i=0; i<=n; i++) {
			ret.push( {
				img	: this.imgs.ddown[0],
				h		: i * this.imgs.ddown[0].height / n
			}  )
		}
		return ret.reverse();
	},			
	disappear	: function( fn, scope ){
		var items = this._fillDisappear( 14 );
		items.push( null );
		var obj = {
			inter	: 1,
			items	: items,
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );				
	},
	appear		: function( fn, scope ){
		var obj = {
			inter	: 2,
			items	: [ this.imgs[this.direct][0], this.imgs[this.direct][0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );		
		SoundMgr.play( "appear" );
	},
				
	invincible	: function( fn , scope ){
		this.pushTip( {
			text	: "无效",	fn : fn, scope : scope
		} );	
	},
	
	addTip 	: function( config ){
		this.pushTip( config );
	},	
	
	miss	: function( fn , scope ){
		this.pushTip( {
			text	: "我闪",	fn : fn, scope : scope, color : "rgba(255,255,255,1)"
		} );	
	},	
	
	attacked	: function( v, fn , scope ){
		var obj = {
			inter	: SPEED,
			items	: [ this.imgs.attacked[0] ]
		}
		this.pushImg( obj );		
		
		this.pushTip( {
			text	: "-"+v,	fn : fn, scope : scope, color : "rgb(255,0,0)"
		} );	
	},
	
	upgrade		: function( fn , scope ){
		this.pushTip( {
			text	: "升级啦",	fn : fn, scope : scope, color : "rgb(255,255,255)"
		} );			
		SoundMgr.play( "upgrade" );
	},
	
	lift	: function( fn, scope ){
		var obj = {
			inter	: SPEED * 2,
			items	: [ this.imgs.lift[0] ],
			fn 		: fn, 
			scope	: scope
		};
		
		this.pushImg( obj );				
	},
		
	//在magic层播放动画
	gainStuff	: function( stuff, num, fn, scope ){
		var imgs = [], from = this.unit.cell.dy + 16, last = 16;
		//人物动画
		var obj = {
			inter	: 4,
			items	: [ this.imgs.lift[0], this.imgs.lift[0], this.imgs.lift[0], this.imgs.lift[0] ]
		}
		this.pushImg( obj );			
		
		//物品及文字动画
		for (var i=0; i< last; i++) {
			imgs.push({
				dx	: this.unit.cell.dx,
				dy	: from -= 1,
				img : stuff.img
			})
		}
		
		var a = new Animation({
			inter : 2,
			imgs  : imgs,
			fn	: fn,
			scope : scope			
		});
		
		this.pushTip( {
			text	: "获得" + stuff.name + "×" + num , color : "rgb(255,255,255)",
			from	: [ this.unit.cell.dx, this.unit.cell.dy - 5],	increment : [ 0, 0 ]
		} );
		
		PANEL.playAnimation( a );
		SoundMgr.play( "gain" );
		
		return this;
	},
	
	addBuff		: function( buff, fn, scope ){
		//在角色上方画圆
		var dx = this.unit.cell.dx, dy = Math.max( 0, this.unit.cell.dy - 8 ), imgs = [],
			diffx = (CELL_WIDTH - 12 )/ 5, diffy = 9,
			path = [ [ dx, dy ], [ dx + diffx, dy + diffy ], [ dx + diffx*2, dy + diffy*2 ],[ dx + diffx *3, dy + diffy ],[ dx + diffx *4, dy ],
					 [ dx + diffx * 3, dy- diffy ], [ dx + diffx*2, dy - diffy*2 ], [ dx + diffx, dy - diffy ],[ dx, dy ] ];
					 
		for (var i=0; i< path.length; i++) {
			imgs.push({
				dx	: path[i][0],
				dy	: path[i][1],
				w	: 12,
				h	: 12,
				img : buff.img
			})
		}
		imgs.push( null );
		
		var a = new Animation({
			inter : 2,
			imgs  : imgs,
			fn	: fn,
			scope : scope			
		});
		
		PANEL.playAnimation( a );		
	}	
}); /**
 * 状态类
 * 每个状态都有 apply 方法，使用时触发
 */
var Buff = Observable.extend({
	id		: "", 
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	unit		: null,
	w	: 0,
	h  : 0,
	last	: 0, 	//持续回合数
	
	init	: function(){
		this.addEvents( "invalid", "over" );
		this.addEvents( { name : "apply", type :2 } );
		
		this._super( arguments[0] );
		
		this.bindEvent( "apply", this.afterApply, this );
		
		return this;
	},
	
	apply	: function( unit ){
		this.onApply( unit );
	},
	
	onApply	: function( unit ){
		//减少持续回合数
		if( this.last == 0 ){
			this.fireEvent( "invalid", this );
			this.afterApply();
			return;
		}
		this.last--;
							
		this.fireEvent( "apply", unit, this );
	},
	
	afterApply	: function(){
		
		this.fireEvent( "over", this );
		
	}
	
}); /**
 * 负责处理角色的所有对外接口和内部逻辑处理
 */
var Unit = Observable.extend({
	//id			: 1,
	name	: "步兵",
	symbol	: "footman",	//区别角色UI样式
	moveable: true,    		//是否可以移动
	lock	: true,		//锁定角色 不能移动
	type	:-1,			//类型
	tipable :false,			//是否有提示框
	active  : true,			//是否有效
	overlay	: false,			//是否可以叠加
	auto	: false,	//是否在自动移动
	visiable: true,		//是否可见
	gx		: -1,			//所处行
	gy		: -1,			//所处列
	step		: 5,          //行动力
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型
	
	face		: null, //头像
	level		: 1,	//级别
	exp			: 0,    //经验
	role		: 0, 	//职业
	
	hpMax		: 100,	//血量
	hp			: 100,	//血量
	hpPercent   :   100, 	//血量百分比
	mpMax		: 100,	//魔法
	mp			: 100,	//魔法
	atknumMax	: 32,	//攻击力上限
	atknumMin	: 20,   //攻击力下限
	defnum	: 3,	//防御力
	strength: 3,	//力量
	agility : 3,	//敏捷
	intelligence : 3,	//智力
	
	miss		: 5,  //百分数 躲闪的概率
	burst		:  5,	//百分数 暴击的概率
	enlarge	: 1.5,  //暴击时系数
	revenge	: 5, //反击
	invincible	: false, //无敌
	debility : false,	//濒临死亡
	dead		: false,
	killer			: null,
	moving : false,
	speaking	: false,
		
	qHead		: null,	//头部装备
	qClothes	: null, //衣服
	qWeapon		: null, //武器
	qFoot		: null, //脚
	qAccessory	: null,	//左侧饰品	
	qAccessory2	: null, //右侧饰品
	
	cell		: null,   //当前所在的位置
	oriCell : null,   //移动前所在的位置
	
	major	: false,		//是否显示简要信息
	hpLine : false,    //是否显示血条
	hpLineForce : false, //是否一定显示
	
	attackFreqMax	: 1, 		//一回合可攻击总数		
	attackFreq		: 0,		//本回合攻击几次了
	attacking		: false, //是否正在攻击
	missing		: false, //闪避中
	gainExp	: 0,		//单次攻击累计获得经验数
	
	faction		: 0, //阵营  不同阵营既是敌人，可攻击  -1即是中立 任何人都不能攻击
	team	: 1,		//所处队伍 同一阵营下同一队伍为我军，不同队伍为友军
	
	standby	: false,	//待机
	excited	: false,
	//buffs	: [],	//增益buff
	//magics	: {}, //会的魔法
	
	ui		: null,
	
	init	: function( config ){
		this.moves	= {};
		this.attacks= {};
		this.way = [];
		this.magicNames = [];
		this.magics = {};
		this.buffs = this.buffs || [];
		
		this.addEvents( "click", "start", "unclick","change", "afterAttack", "walk","speak", "appear", "move" );
		this.addEvents( { name : "preDead", type : 2 },	{ name : "preAttack", type : 2 }, { name : "upgrade", type : 2 },
						{ name : "attack", type : 2 }, { name : "defend", type : 2 } , { name : "dead", type : 2 }, 
						{ name : "standby", type : 2 });
		this._super( config );
				
		//如果没有id则自动生成一个
		this.id = this.id || Unit.ID();
		this.hp = Math.min( this.hp || this.hpMax, this.hpMax) ;
		this.mp = Math.min( this.mp || this.mpMax, this.mpMax );
		this._calcHpPercent();
		
		this.setCell();
		this.setUI();
		this.setMagic();
		//this.setTeam();
		
		//绑定事件回调函数
		this.bindEvent( "attack", this.onAttack, this );
		
		return this;
	},
	
	//每回合开始时被调起
	start		: function( fn, scope ){
		if ( fn )
			fn.call( scope || this, this );
		
		this.unLock();	
		this.applyBuff( 0, function(){
			log( this.name + " ready to go" );
			this.fireEvent( "start", this );			
		}, this );
	},
	
	//按序调用附加的状态
	applyBuff	: function( i, fn, scope ){
		if ( i >= this.buffs.length ){
			if ( fn )
				fn.call( scope|| this, this );
		}else{
			var buff = this.buffs[ i ];
			buff.on( "over", function(){
				this.applyBuff( ++i, fn, scope );
			}, this, { one : true } ).apply( this );
		}
	},
	
	setCell		: function(){
		this.cell = this.oriCell = PANEL.getCell( this.gx, this.gy );
		return this;
	},
	
	setMagic	: function(){
		for (var i=0; i<this.magicNames.length; i++) {
			this.learnMagic( this.magicNames[i] );
		}				
	},
		
	setUI	: function(){
		//UI加载完成后触发load事件
		this.ui = new UnitUI( { 
			unit : this
		} );
		//转向操作都交由UI处理
		var _self = this;
		$( [ "turnLeft", "turnRight", "turnUp", "turnDown", "fall" ] ).each( function( i, n){
			_self[ n ] = function(){
				_self.ui[ n ].apply( _self.ui, arguments );
			} 
		} );
		
		this.face = this.face || this.ui.imgs.imgFace;
			
		return this;
	},
	
	setTeam	: function( team ){
		this.teamObj =  team;
	},
	
	//绘制图像
	//继承者需要覆盖次方法
	draw	: function( ){
		this.ui.draw( );	
	},
	//绘制提示信息
	drawBuff	: function( ){
		this.ui.drawBuff( );			
	},	
	//绘制提示信息
	drawTip	: function( ){
		this.ui.drawTip( );			
	},
	
	addTip	: function( config, fn, scope ){
		config.fn = fn;
		config.scope = scope;
		this.ui.addTip( config );
	},
	
	showMajor	: function(){
		this.major = true;
		this.hpLine = true;
		return this;
	},
	
	hideMajor	: function(){
		this.major = false;
		this.hpLine = false;
		return this;
	},	
	getMoves	: function(){
		return this.layer.getWalkCells( this.cell, this.step, this );
	},
	getAttacks	: function(){
		return this.layer.getAttackCells( this.cell, this.range, this.rangeType, this.team );
	},
	//显示可移动单元格
	showMoves	: function(){
		this.moves = this.getMoves();
		PANEL.cellLayer.paintCells( MOVECOLOR, this.moves );
		return this.moves;
	},
	clearMoves	: function(){
		PANEL.cellLayer.paintCells( MOVECOLOR, {} );
	},
	//获得可攻击的格子
	showAttack	: function(){
		this.attacks = this.getAttacks();
		PANEL.cellLayer.paintCells( ATTACKCOLOR, this.attacks );
		return this.attacks;
	},
	clearAttack	: function(){
		PANEL.cellLayer.paintCells( ATTACKCOLOR, {} );
	},
	//窗口移动到可以显示该角色
	followMe		: function( fn, scope ){
		PANEL.moveToCell( this.cell, fn, scope );
		return this;
	},	
	//如果角色不在战场内，则显示改单位
	catchMe	: function(){
		if ( !PANEL.isInside( this.cell ) )
			PANEL.moveToCell( this.cell );	//镜头对着说话的角色
	},
				
	canMove	: function( cell ){
		return !this.moving && !this.lock && this.moves && this.moves[ cell.index ];
	},
	
	canAttack	: function( cell, unit ){
		return this.attacks && this.attacks[ cell.index ] && this.isEnemy( unit );
	},
	
	moveTo		: function( cell ){
		if (!this.moving) {
			//寻路
			var way = [];
			while (cell.parent && cell != this.cell) {
				way.push(cell);
				cell = cell.parent;
			}
			
			this.throughway( way );
		}
		return this;
	},
	
	//直接走到某个单元格
	go	: function( to, fn, scope ){
		if (!this.moving) {
			if ( !(to instanceof Cell) )
				to = CellMgr.get( to.x, to.y );
			
			var way = this.layer.findWay( this, this.cell, to );
			
			if ( fn )
				this.on( "move", fn, scope, { one : true});
			
			this.throughway( way );				
		} else if ( fn )
			fn.call( scope || this, this );
			
		return this;
	},
	
	throughway		: function( way ){
		this.moving = true;
		this.lock = true;
		delete this.moves;
		
		this.oriCell = this.cell;
					
		this.way = way;
		this.ui.moveTo( this.way );
	},
	
	//回到行动前的状态
	homing		: function(){
		this.moving = false;
		this.lock = false;
		delete this.attacks;
		this.way = [];
		//触发walk事件
		if (this.cell != this.oriCell) {
			this.fireEvent("walk", this, this.cell, this.oriCell);
			this.cell = this.oriCell;
		}
		this.ui.homing();
		
		return this;
	},
	
	onMove	: function( cell ){
		this.moving = false;
		this.fireEvent( "move", this, this.cell );
	},
	
	attack			: function( unit, fn, scope ){
		if (typeof unit == "string")
			unit = PANEL.getUnitById( unit );
		
		if ( unit ){
			delete this.attacks;
			this.gainExp = 0;
			if ( fn )
				this.on( "afterAttack", fn, scope, { one : true } );
						
			log( this.name + "  preAttack" );
			this.bindEvent( "preAttack", function(){
						this.attacking = true;
						this.fire( unit );
					}, this )
				  .fireEvent("preAttack", this, unit );
		}
			
		return this;
	},
	
	//真正攻击时调用的函数
	fire			: function( unit ){
		//判断暴击
		var bursting = false;
		if ( (1 + Math.random() * 99) <= this.burst ){
			bursting = true;
		}	
		var hit = this._genHitValue( bursting );
					
		this.ui.attack( unit.cell, bursting, hit, function(){
			//log( this.name + "attack over : freq : " + this.attackFreq );
			this.attackFreq++;
			//通知被攻击者
			unit.attacked( this, hit, function( defender, self, v ){
				log( "unit attacked callback " + defender.name + " v = " + v);
				//计算一回可攻击的次数，不足继续攻击
				this.gainExp += Unit.getExpByBlood( this, unit, v );
				
				if ( this.attackFreq == this.attackFreqMax || defender.dead ){
					this.fireEvent("attack", this, unit, hit );
				}else{
					//继续攻击同一目标
					this.fire( unit );
				}
			}, this );
			
		}, this);
		
	},
	//本回合是否还可以继续攻击
	hasFreq				: function(){
		return this.attackFreq < this.attackFreqMax;
	},
	
	//攻击完成后
	onAttack				: function( self, unit, hit ){
		log( "unit onAttack : " + this.name );
		this.attackFreq = 0;
		this.attacking = false;
		
		if (this.dead) {
			//被反击死 不能获得经验
			this.fireEvent("afterAttack", this, unit);
		}
		else {
			//增加经验
			this.addExp(this.gainExp, function(){
				this.fireEvent("afterAttack", this, unit);
			//攻击后自动待机
			//this.finish();
			}, this);
		}
	},
	
	//挥击武器 只播放动画
	swing		: function( fn, scope ){
		this.ui.attack( null, false, 0, fn, scope );		
	},
	
	//被攻击
	attacked		: function( unit, v, fn, scope ){
		//判断是否可攻击
		if (this.invincible) {
			this.ui.invincible(function(){
				//this.fireEvent( "defend", this, unit, 0 );
				if ( fn )
					fn.call( scope || this, this, unit, 0 );
			}, this);
		}
		else {
			if (fn) {
				//判断反击 attacking == true时证明是自己发起的反击,则不能再反击
				//并且在自己的攻击范围内  	并且攻击者本回合已经不能再攻击
				if ( !this.attacking && unit && (1 + Math.random() * 99) <= this.revenge && !unit.hasFreq() && this.isInRange( unit ) ) {
					//反击后再回调
					this.on("defend", function(){
						if (!this.dead) { //如果没有死
							var a = Array.prototype.slice.call(arguments, 0);
							this.attack(unit, function(){
								fn.apply(scope || this, a);
							}, this);
						}
						else {
							fn.apply(scope || this, arguments);
						}	
					}, this, { one: true });
					
				}else				
					this.on("defend", fn, scope, { one: true });				
			}
			//判断闪避
			if ((1 + Math.random() * 99) <= this.miss) {
				this.ui.miss(function(){
					this.fireEvent( "defend", this, unit, 0 );
				}, this);
			}
			else //判断抵抗
			//扣血
			{
				//伤害值
				var decrease = this._genDamageValue(v);
				this.getHurt(decrease, unit );
			}
		}
	},
	
	//在自己的攻击范围内
	isInRange	: function( unit ){
		return this.getAttacks().hasOwnProperty( unit.cell.index );
	},
	
	_calcHpPercent	: function(){
		this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
		if (this.hpPercent < 20) {
			//濒临死亡
			this.debility = true;
		}
	},
	//使他人受到伤害
	hurt	: function( d, unit, fn, scope ){
		log( "unit hurt : " +  unit.name );
		if ( isNaN( d) )		
			d = 0;
		// ...
	},	
	//受到伤害
	getHurt	: function( d, unit, fn, scope ){
		log( "unit getHurt : " +  this.name );
		if ( isNaN( d) )		
			d = 0;
		if ( fn )
			this.on( "defend", fn, scope, { one : true } );
			
		this.ui.attacked( d, function(){
			this.onDecrease( d, unit );
		}, this );		
	},
	
	//扣血
	onDecrease	: function( d, unit ){
		d = this.hp > d ? d : this.hp;		//计算实际伤血值
		this.hp = Math.max(0, this.hp - d );
		this._calcHpPercent();
		
		this.fireEvent( "change", this );
		
		//如果死亡，则播放动画后再执行回调函数
		if (this.hp == 0) {
			this.bindEvent( "preDead", function(){
						if ( this.hp > 0 ){
							//如果不让死
							this.fireEvent( "defend", this, unit, d );						
						}else{
							this.die( unit, d );
						}				
					}, this )
				   .fireEvent( "preDead", this, unit, d );
		}else{
			this.fireEvent( "defend", this, unit, d );
		}
	},
	
	//加血
	onIncrease	: function( d ){
		if (!isNaN(d) && d >= 0) {
			this.HPincrease = parseInt(d);
			
			this.hp += this.HPincrease;
			this.hpPercent = Math.min(100, this.hp * 100 / this.hpMax);
			
			this.fireEvent( "change", this );
			
			//解除濒临死亡
			if (this.hpPercent >= 20) {
				this.debility = false;
			}
		}
	},	
	
	die		: function( unit, d, fn, scope ){
		//省略unit,d
		if ($.isFunction(unit)) {
			fn = unit;		
			scope = d;
		}
		log( this.name + " die" );
		if ( fn )
			this.on( "defend", fn, scope, { one : true } );
					
		this.ui.dead( function(){
			this.dead = true;
			
			this.bindEvent( "defend", this.onDead, this )
				   .fireEvent( "defend", this, unit, d );
		}, this );		
	},
	
	onDead		: function( self, unit, d ){
		//死亡时锁定角色
		this.lock = true;
		this.killer = unit;	//记住杀死他的角色
		this.bindEvent( "dead", function(){
					//死了也要触发standby事件
					//this.fireEvent( "standby", this );			
				}, this )
			   .fireEvent( "dead", this, unit, d );
	},
	
	//计算攻击值 攻击上限与攻击下限间随机取值 最小为0
	//暴击时乘以enlarge倍 返回整数值
	_genHitValue	: function( bursting ){
		var v = Math.max( 0, this.atknumMin + Math.random() * ( this.atknumMax - this.atknumMin ) );
		if ( bursting )
			v = v * this.enlarge;
		
		return Math.round( v );	
	},
	
	//计算伤害值
	_genDamageValue	: function( v ){
		return Math.max( 0, Math.round(v) - this.defnum );
	},
		
	hideAttack	: function(){
		delete this.attacks;
		PANEL.unitsLayer._removeCells();
	},
	
	onDecreaseMP	: function( n ){
		this.mp = Math.max( 0, this.mp-n );
		this.fireEvent( "change", this );
	},
	onIncreaseMP	: function( n ){
		this.mp = Math.min( this.mpMax , this.mp+n );
		this.fireEvent( "change", this );
	},
		
	unClick	: function(){
		if (!this.standby && this.lock) {
			this.homing();
		}
		this.fireEvent( "unclick", this );
	},
	
	//操作结束
	finish	: function(){
		if (!this.standby) {
			log( "unit finish : " +  this.name );
			this.standby = true;
			this.lock = true;
			this.oriCell = this.cell;
			this.attackFreq = 0;
			this.clearAttack();
			this.clearMoves();
			
			if (this.dead) {
				//如果已经阵亡， 则直接触发standby事件
				log(this.name + " standby");
				this.fireEvent("standby", this);
			}
			else {
				this.layer.bindEvent( "enter", function(){
					this.ui.standby(function(){
						log(this.name + " standby");
						this.fireEvent("standby", this);
					}, this);					
				}, this )
				.fireEvent( "enter", this, this.cell.x, this.cell.y );
			}
		}
	},
	
	//取消锁定与待机状态
	unLock	: function(){
		this.lock = false;
	},
	//取消待机状态
	restore		: function(){
		this.standby = false;
	},
	
	click		: function( e ){
		this.fireEvent( 'click', this );
	},
	//同一阵营 不同队伍
	isFriend	: function( faction, team ){
		if (faction instanceof Unit) {
			faction = faction.faction;
			team = faction.team;
		}
		return faction == this.faction && team != this.team;
	},
	//同一阵营 同一队伍	
	isSibling	: function( faction, team ){
		if (faction instanceof Unit) {
			faction = faction.faction;
			team = faction.team;
		}		
		return faction == this.faction && team == this.team;
	},
	//不同阵营
	isEnemy	: function( faction, team ){
		if ( faction instanceof Unit )
			faction = faction.faction;
			
		return faction != this.faction;
	},
	//同一阵营
	isBrother	: function( faction, team ){
		if ( faction instanceof Unit )
			faction = faction.faction;		
		return faction == this.faction;
	},
	
	nextExp		: function(){
		return Unit.calcExp( this.level );
	},
	
	addExp		: function( n, fn, scope ){
		this.exp += n;
		if ( this.exp >= this.nextExp() ){
			this.onUpgrade( fn, scope );
		}else{
			this.fireEvent( "change", this );
			if ( fn )
				fn.call( scope ||  this, this );			
		}
	},
	
	onUpgrade	: function( fn, scope ){
		this.exp = this.exp - this.nextExp();
		this.level++;
		var getpoint = 5;
		
		this.addStrength( 2 );
		this.addAgility( 2 );
		this.addIntelligence( 1 );
		
		//升级后再调用change事件
		this.ui.upgrade( function(){
			log( this.name + "upgrade"  );
			this.bindEvent( "upgrade", function(){
						var callback = function(){
							//继续升级
							if ( this.exp >= this.nextExp() )
								this.onUpgrade( fn, scope );
							else{
								if ( fn )
									fn.call( scope ||  this, this );
							} 
						};
						if ( this.auto )
							callback.call( this );
						else	
							this.excite(  "我升级了",  callback, this  );  
				   }, this )
				   .fireEvent( "upgrade", this );
				   
		}, this );		
	},
	
	//力量
	addStrength	: function( n ){
		this.strength += n;
		this.hpMax += n * STRENGTHHP;
		this._calcHpPercent();
		this.fireEvent( "change", this );	
	},
	
	//敏捷
	addAgility	: function( n ){
		this.agility += n;
		this.defnum += n * AGILITYDEF;
		this.fireEvent( "change", this );	
	},
	
	//智力	
	addIntelligence	: function( n ){
		this.intelligence  += n;
		this.mpMax += n * INTELLIGENCEMP;
		this.fireEvent( "change", this );	
	},
	
	//一次只能说一句话
	speak	: function( text, fn, scope ){
		this.catchMe();
			
		this.speaking = true;
		this.ui.speak();
		
		if ( fn )
			this.on( "speak", fn, scope, { one : true } );
			
		PANEL.speak( this, text );
		
		return this;
	},
	//跟某人说话 自动转向
	speakTo	: function( unit, text, fn, scope ){
		if ( !( unit instanceof Unit ) )
			unit = PANEL.getUnitById( unit ); 
		
		var d =  this.cell.directT( unit.cell );
		if ( d != this.ui.direct ){
			//同方向时没必要转身
			d = d.replace( /\S/, function( a ){ return a.toUpperCase() } );
			var fnName = "turn" + d;
			//转身后再执行
			this.ui[ fnName ]( function(){
				this.speak( text, fn, scope );	
			}, this );			
		} else	  
			this.speak( text, fn, scope );	
	},
	//举起武器庆贺
	excite	: function( text, fn, scope ){
		this.catchMe();
		this.excited = true;
		this.speak( text, function(){
			this.excited = false;
			if ( fn )
				fn.call( scope|| this, this );
		}, this );	
	},	
	lift		: function( fn, scope ){
		this.catchMe();
		this.ui.lift( fn, scope );
	},
	//停止说话300ms后再触发speak事件
	stopSpeak : function(){
		if ( this.speaking ){
			//this.ui.stopAnimation();
			this.ui.clearAnimation();
			this.speaking = false;	
						
			setTimeout( bind(function(){
				this.fireEvent( "speak", this );
			}, this ), 300 );			
		}
		return this;
	},
	
	disappear	: function( fn, scope ){
		this.catchMe();
		this.ui.disappear( function(){
			this.onDead();
			if ( fn )
				fn.call( scope|| this );
		}, this );
	},
	
	//增加角色状态
	addBuff	: function( name, fn, scope ){
		this.catchMe();
					
		var config = $.extend( BUFFS[ name ],  { id : name } );
		var buff = new Buff( config );
		
		//失效后删除buff
		buff.on( "invalid", this.removeBuff, this, { one : true } );
		
		this.ui.addBuff( buff, function(){
			this.removeBuff( name );
				
			this.buffs.push( buff );
			
			if ( fn )
				fn.call( scope || this, this, buff );
			
		}, this );
		
		return this;
	},
	
	findBuff	: function( name ){
		if ( name instanceof Buff )
			name = name.id;
		
		var n = -1;	
		for (var i=0; i<this.buffs.length; i++) {
			if (this.buffs[i].id == name) {
				n = i;
				break;
			}
		}
		return n;
	},
	
	removeBuff	: function( name, fn, scope ){
		var n = this.findBuff( name ), b;
		if (n > -1) {
			b= this.buffs[ n ];
			this.buffs.splice(n, 1);
			b = null;
		}

		if ( fn )
			fn.call( scope || this, this );
						
		return this;	
	},
	
	learnMagic	: function( name ){
		this.magics[ name ] = MagicMgr.get( name );
	},
	hasMagic	: function(){
		var count = 0;
		for( var key in this.magics){
			count++;
			break;
		}
		return count > 0; 
	},
	
	//获得物品
	gainStuff	: function( stuff, num, fn, scope ){
		this.catchMe();
		
		if ( !(stuff instanceof Stuff) )
			stuff = Pocket.get( stuff );
			
		this.ui.gainStuff( stuff, num, function(){
			stuff.count += num;
			
			if ( fn )
				fn.call( scope || this, this, stuff );
			
		}, this );

		return this;
	},
	
	//将物品给予杀死自己的人
	award	: function( stuff, num, fn, scope ){
		if (!(stuff instanceof Stuff)) 
			stuff = Pocket.get(stuff);
				
		if (this.killer) {
			this.killer.gainStuff(stuff, num, function(){
				stuff.count += num;
				
				if (fn) 
					fn.call(scope || this, this, stuff);
				
			}, this);
		}else if ( fn )
			fn.call(scope || this, this, stuff);
			
		return this;
	},	
	
	choose	: function( title, options, fn, scope ){
		PANEL._choose( this.face, title, options, fn, scope );
	},
	
	//后出现在战场上
	//可传x,y 也可省略
	appear		: function( x, y, fn, scope ){
		if ( $.isFunction( x ) ){
			fn = x;
			scope = y;
		}else{
			this.gx = x;
			this.gy = y;
		}
		this.setCell();
		this.visiable = true;
		this.layer.showAt( this );
		this.catchMe();
		
		if ( fn )
			this.on( "appear", fn, scope, { one : true } );
		
		this.ui.appear( function(){
			this.fireEvent( "appear", this );
		}, this );
	},
	
	//判断是否在某角色附近
	//在相距两步的范围内即判断为在附近
	isAround	: function( unit ){
		if ( !( unit instanceof Unit ) )
			unit = PANEL.getUnitById( unit ); 		
		
		return this.cell.distance( unit.cell ) < 3;
	}
}); 

$.extend( Unit, {
	//计算升级所需经验
	//每升一级需额外50点 起始值100
	calcExp 				:	function( level ){
		return (level -1) * 50 + 100;
	},
	//通过伤敌血量获得经验值
	//没3级一格档次,共五档
	//120% 110% 100% 70% 50%
	addition				: [ 0.5, 0.7, 1 , 1 ,1.1 ,1.2],
	getExpByBlood	: function( attacker, casualty, v ){
		var diff = Math.ceil( ( casualty.level - attacker.level ) / 3 ) + 2,
				index = Math.max( Math.min( diff, 5 ) , 0 );
		return  parseInt( Unit.addition[ index ] * v );
	},
	//自增长ID
	count :  0,
	ID 						: function(){
		return ++Unit.count;
	}
} );

/**
 * 队伍类
 * 管理整个个队伍中的单位，检测回合结束与是否都阵亡等
 * 触发teamStart,teamEnd,teamOver
 */
var Team = Manager.extend({
	name	: "",
	faction : 0,
	team	: 0,
	layer	: null,
	readyCount : 0,
	
	init	: function(){
		this.addEvents( "teamStart","teamEnd","teamOver" );
		this._super( arguments[0] );
		
		return this;
	},
	
	add		: function( unit ){
		unit.bindEvent( "standby", this.checkEnd, this )
			  .on( "dead", function( unit ){
				this.remove( unit );
				if ( !PANEL.isScripting() )
					this.checkOver( unit );
			 }, this )
			 .on( "start", this.ready, this );
				
		this.reg( unit.id, unit  );
	},

	checkEnd	: function(){
		var flag = true;
		for ( var key in this.items ) {
			var unit = this.items[key];
			//当同一队伍中有任何一个可以移动时跳出循环
			if ( !unit.standby ) {
				flag = false;
				break;
			}
		}
		if (flag) {
			this.end();
		}		
	},
	
	checkOver	: function(){
		var flag = true;
		for ( var key in this.items ) {
			var unit = this.items[key];
			//当同一队伍中有任何一个可以移动时跳出循环
			if ( !unit.dead ) {
				flag = false;
				break;
			}
		}
		if (flag) {
			this.over();
		}		
	},
	
	start			: function(){
		log( "team : start : " + this.name );
		this.readyCount = 0;
		this.each( function(){
			this.start();
		} );			
	},
	
	ready			: function( unit ){
		this.readyCount++;
		if ( this.readyCount == this.count() ){
			this.fireEvent( "teamStart", this );
		}
	},
	
	end			: function(){
		log( "team : end : " + this.name );
		this.each( function(){
			this.restore();			
		} );				
		this.fireEvent( "teamEnd", this );
	},
	
	finish		: function(){
		log( "team : finish :" + this.name  );
		this.end();		
	},
	
	over		: function(){
		log( "team : over :" + this.name  );
		this.fireEvent( "teamOver", this );
	},
	
	restore	: function(){
		log( "team : restore :" + this.name  );
		this.each( function(){
			this.restore();
		} );
	},
	
	remove	: function( unit ){
		log( "team : " + this.name + " remove unit : " + unit.id ); 
		this.unreg( unit.id );
	},
	
	members	: function(){
		return this.items;
	},
	
	destroy	: function(){
		
	},
	
	equal		: function( f, t ){
		return this.faction == f && this.team == t;
	}
	
});
/**
 * 单元层
 * 负责统一调用角色的接口
 * 触发 回合/队伍 事件
 * 支持寻路/攻击/移动的方法
 * units	: 当前战场中可见的所有角色
 * items	: 所有角色 包括未上场或已经死亡的角色
 */
var UnitLayer = Layer.extend({
	clicked : null,	//已点击
	overed	 : null,  //滑过的
	
	teamIndex	: 0,	//当前哪只队伍在行动
	
	victoryN	: 0,
	failedN		: 0,
	win			: false,
	
	init	: function(){
		this.addEvents( "click");
		this.addEvents( { name : "roundStart", type : 2 }, { name : "roundEnd", type : 2 }, 
		                { name : "battleStart", type : 2 },{ name : "battleOver", type : 2 } ,
						{ name : "teamStart", type : 2 }, { name :"teamEnd", type : 2 },
						{ name : "teamOver", type : 2 }, { name : "enter", type : 2 },
						{ name : "battleWin", type : 2 }, { name :"battleFail", type : 2 } );
									 
		this._super( arguments[0] );
		
		this.teams = [];
		this.units = {};
		
		this.setTeams( TEAMS );
		this.setUnits( UNITS );
				
		//点击画布
		PANEL.on("click", this.onClick, this)
			 .on("contextmenu", this.onContextmenu, this)
			 .on("mousemove", this.onMousemove, this)
			 .on("keydown", this.onKeydown, this)
			 .on("keyup", this.onKeyup, this)
			 .on("paint", this.onPaint, this ); //定时更新
		
		this.bindEvent( "battleStart", this.startRound, this )
			 .bindEvent( "roundStart", this.onRoundStart, this )
			 .bindEvent( "roundEnd", this.onRoundEnd, this )
			 //.bindEvent( "teamStart", this.onTeamStart, this )	//AI自动接手
			 .bindEvent( "teamEnd", this.onTeamEnd, this )
			 .bindEvent( "teamOver", this.onTeamOver, this )
			 .bindEvent( "battleWin", this.onBattleWin, this )
			 .bindEvent( "battleFail", this.onBattleFail, this );
		
		return this;
	},
	
	setTeams : function( data ){
		for (var i=0; i<data.length; i++) {
			this.addTeam( data[i] );
		}
		return this;
	},
	
	addTeam	: function( team ){
		team.layer = this;
		var t = new Team( team );
		
		//设置全局变量
		if ( t.equal( FACTION, TEAM ) )
			MYTEAM = t;
		else if ( t.faction != FACTION )
			ENEMY = t;
		else
			FRIENDS = t;		
		//处理team相关的事件 增加回合参数
		t.on( "teamStart", function( team ){
			this.fireEvent( "teamStart", team, ROUND );
		}, this ).on( "teamEnd", function( team ){
			this.fireEvent( "teamEnd", team, ROUND );
		}, this ).on( "teamOver", function( team ){
			this.fireEvent( "teamOver", team, ROUND );
		}, this )
		
		this.teams.push( t );
	},
	
	findTeam	: function( f, t ){
		for (var i=0; i<this.teams.length; i++) {
			var team = this.teams[ i ];
			if ( team.equal( f, t ) )
				return team;
		}
		return null;
	},
	
	removeTeam	: function( team ){
		var i = $.inArray( team, this.teams );
		if (i > -1) {
			if ( this.teamIndex >= i  )
				this.teamIndex--;			//指针回退一格
				
			this.teams.splice(i, 1);
		}
	},
	
	getCurrentTeam	: function(){
		return this.teams[ this.teamIndex ];
	},
	
	start		: function(){
		log( "this.unitsLayer.start" );
		
		SoundMgr.play( "battle" );
		
		this.fireEvent( "battleStart", this );		
	},
	
	startRound	: function(){
		//先播放动画再触发事件			
		ROUND++;
		log( "startRound : " + ROUND );
		//第一回合不显示动画
		if (ROUND == 1) {
			this.fireEvent( "roundStart", ROUND );
		}
		else {
			//PANEL._showTopLine("第 " + ROUND + " 回合", function(){
				this.fireEvent( "roundStart", ROUND );
			//}, this);
		}
	},
	
	onRoundStart	:  function(){
		this.teamIndex = 0;
		var team = this.getCurrentTeam();
		if ( team )
			this.startTeam( team );
		else{
			//没有队伍可执行了
		}	
	},
	
	onRoundEnd	: function(){
		this.startRound();
	},
	
	startTeam	: function( team ){
		if ( team.count() == 0 ){
			//没有可行动的角色时 跳过该队伍
			this.onTeamEnd();
		}else{
			log( "startTeam : " + team.name );
			var tip = team.name + "阶段";
			//将回合信息放在第一个执行的队伍后
			if ( this.teamIndex == 0 )
				tip += "<small>第" + ROUND + "回合</small>";
			
			if ( UNDERCOVER )
				tip = ROUND;	
			PANEL._showTopLine( tip, function(){
				team.start();
			}, this);
		}		
	},
	
	onTeamStart	: function(){
	},
	
	onTeamEnd	: function(){
		if ( this.teamIndex++ == this.teams.length - 1 ) {
			//回合结束
			log( "roundEnd : " + ROUND );
			this.fireEvent( "roundEnd", ROUND );
		}else{
			//继续下一个队伍
			var team = this.getCurrentTeam();
			if ( team )
				this.startTeam( team );
		}			
	},
	
	onTeamOver	: function( team ){
		this.removeTeam( team );
	},
	
	finishTeam : function( f, t ){
		var team = this.findTeam( f, t );
		if ( team )
			team.finish();
	},
	
	setUnits : function( data ){
		for (var i = 0; i < data.length; i++) {
			var unit = this._initUnit( data[i] );
			this.items.reg( unit.id, unit );
			
			//添加没有阵亡同时可见的角色
			if ( !unit.dead && unit.visiable ){
				this.units[ unit.cell.index ] = unit;
			}
		}			
		return this;
	},
	
	//角色进入某一个单元格
	//判断获得物品
	onEnter	: function( unit ){
		unit.suspendEvent( "standby" );
		this.bindEvent( "enter", function( unit ){
				unit.resumeEvent( "standby" );
			 }, this )
			 .fireEvent("enter", unit, unit.cell.x, unit.cell.y );
	},
		
	onPaint	: function(){
		//绘制图像
		for( var key in this.units ){
			this.units[ key ].draw();
		}
		//绘制状态图标
		for( var key in this.units ){
			this.units[ key ].drawBuff();
		}				
		//绘制提示信息
		for( var key in this.units ){
			this.units[ key ].drawTip();
		}			
	},
	
	onKeydown	: function( e ){
		//按ALT时
		if ( e.which == 18 )
			for( var index in this.units )
				this.units[ index ].hpLineForce = true;
				
		//没有弹出菜单时右键才有效
		if ( e.which == 27 && PANEL.winLayer.passby() ){
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}			
	},	
	
	onKeyup	: function( e ){
		//按ALT时
		if ( e.which == 18 ){
			for( var index in this.units )
				this.units[ index ].hpLineForce = false;
		}
	},		
	
	onMousemove	: function( e ){
		var  cell = PANEL.getCell( e );
		if (cell) {
			var unit = this.getUnitByIndex( cell.index );
			//已经存在则隐藏
			if (this.overed && unit != this.overed) {
				this.overed.hideMajor();
				delete this.overed;
			}
			if ( unit && this.overed != unit) {
				this.overed = unit.showMajor();
			}
		}
	},
	
	canClick	: function(){
		return PANEL.winLayer.passby() && !PANEL.isScripting();
	},
	
	onClick	: function( e ){
		//有弹出菜单时不触发click
		if ( this.canClick() ) {
			var cell = PANEL.getCell(e),
				unit = this.getUnitByIndex( cell.index );
			
			//注册的事件返回false时不继续执行
			this.fireEvent("click", cell, unit, this); 
			
			if (this.clicked) {
				//如果可以攻击
				if ( unit && this.clicked.canAttack(cell, unit ) ) {
					this._removeCells();
					
					this.clicked.attack( unit, function(){
						log( "after unit attack" );
						this.finish();
					}, this.clicked, { one : true } );
				}
				else 
					//如果可以移动
					if (this.clicked.canMove(cell)) {
					
						this._removeCells();
						this.clicked.moveTo(cell);
					}
			}
			else {
				if ( unit ) 
					unit.click(e);
				//没有锁定同时具有移动性
				if ( unit && !unit.lock && unit.moveable && unit.isSibling( FACTION, TEAM) ) {
				//if ( unit && !unit.lock && unit.moveable ) {
					unit.showMoves();
					
					this.clicked = unit;
				}
			}
		}
	},
	
	_removeCells			: function(){
		PANEL.cellLayer.paintCells( MOVECOLOR, {} );
		PANEL.cellLayer.paintCells( ATTACKCOLOR, {} );
		PANEL.cellLayer.strokeCells( ATTACKCOLOR, {} );
	},
	
	showAttackCells		: function( obj ){
		PANEL.cellLayer.paintCells( ATTACKCOLOR, obj );
	},
	
	//得到以cell为中心，相隔range的所有cell
	_getRectAtkCells	: function( cell, range ){
		var all = {}, x = cell.x, y = cell.y;
		
		for ( i= x-range ; i<=x + range; i++) {
			for ( j= y-range ; j<=y + range; j++) {
					var node = PANEL.getCell( i, j);
					if ( node )
						all[ node.index ] = node;
			}
		}			
		return all;
	},
	
	getAttackCells	: function( cell,	range, type ){
		var all = {}, index = cell.index, x = cell.x, y = cell.y;
		
		switch( type ) {
			case 1:	//全方位攻击
				all = this._getRectAtkCells( cell, range );		
				break;
			case 2:	//蔓延型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) <= range ){
						all[ tmp.index ] = tmp;
					}
				}
				break;
			case 3:	//散射型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) == range ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;		
			case 4:	//十字型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) == range && ( tmp.x == cell.x || tmp.y == cell.y ) ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;		
			case 5:	//直线型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( cell.distance( tmp ) <= range && ( tmp.x == cell.x || tmp.y == cell.y ) ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;	
			case 6:	//方框型
				//先找出全方位攻击的CELL
				var  ret = this._getRectAtkCells( cell, range );	
				//再筛选相距cell range远的单元格 并且X/Y轴相等
				for( var key in ret ){
					var tmp = ret[ key ];
					if ( tmp.x == (cell.x + range) || tmp.y == (cell.y + range) ||
						 tmp.x == (cell.x - range) || tmp.y == (cell.y - range)  ){
						all[ tmp.index ] = tmp;
					}
				}
				
				break;													
		}
		
		//把自身刨出去
		delete all[ index ];

		return all;		
	},
	
	//可以移动到的单元格
	getWalkCells : function( cell, step, walker ){
		if ( step <= 0 )
				return {}[ cell.index ]  = cell ;
		
		var open = {}, closed = {}, units = this.units;
		//删除原指针
		delete cell.parent;
		open[ cell.index ] = cell;
		
		function prepare( x,y,parent ){
			var key = getIndex( x, y ), unit = units[ key ], child =  PANEL.getCell( x, y );
			//判断是否可以行走/是否已经计算过/如果有单位判断是否为友军
			if ( child && !open[key] && !closed[key] && MAP[y] && MAP[y][x] ==0 && (unit ? walker.isFriend( unit.faction ) : true  ) ) {
				child.parent = parent;
				open[key] = child;
			}	
		}
			
		while( !_isEmpty( open ) && step-- >0 ){
			for (var key in open ) {
				node = open[ key ];
				//添加到已处理过的closed表
				closed[ key ] = node;
				
				//添加子节点
				//up
				prepare( node.x, node.y-1, node );	
				//down
				prepare( node.x, node.y +1 , node );
				//left
				prepare( node.x -1, node.y, node );
				//right
				prepare( node.x +1, node.y, node );
				
				//并从OPEN表中删除
				delete open[ key ];
			}
		}
		//剔除掉友军所占据的单元格
		for( var key in closed ){
			if ( units[ key ] && units[ key ] != walker  )
				delete closed[ key ];
		}
		
		return closed;
	},
	
	//A* 算法寻路
	findWay			: function( character, from, to ){
		var ret =[], opened = {}, closed = {}, units = this.units, 
			node = null, minD, tmpNode, faction = character.faction,
			targetX = to.x, targetY = to.y, loops = 0, rate = 20, weight ;
		
		//直线距离 	
	    function calcD( tmp ){
			if ( tmp.d )
				return tmp.d;
				
			var m = targetX - tmp.x , n = targetY - tmp.y;
	        tmp.d = Math.sqrt( m *m + n * n );
			//优化 走直线权值偏大 相当于行走路径偏小
			if ( tmp.parent && rate && tmp.parent.face == tmp.direct( tmp.parent ) )
				tmp.d -= weight;
				
			return tmp.d;
	    } 
		function insertSon( node, p ){
			if( !node || node == p ) return;	//抛除父结点 
			
			var key = node.index, unit = units[key];
			
			if (!open[key] && !closed[key] && node && MAP[node.y][node.x] == 0 && (unit ? ( unit.isFriend(faction) ) : true)) {
				node.parent = p;
				calcD(node, p );
				node.face   = node.direct( p );		//记住子结点相对父结点运动的方向
				opened[node.index] = node;
			}
		}			
		//获得子节点
		function getChildren( node ){
			weight = node.d / rate;			//动态更改权值
			//up
			insertSon( node.up(), node );
			//down
			insertSon( node.down(), node );
			//left
			insertSon( node.left(), node );
			//right
			insertSon( node.right(), node );
		} 	

		//删除原指针
		delete from.parent;
		calcD( from );
		weight = from.d / rate;
		opened[ from.index ] = from;
				
		while( !_isEmpty( opened ) && loops++ < 100 ){
			minD = 10000000; 
			//找到权值最小的节点
			for( var i in opened ){
				tmpNode = opened[i];
				var d = calcD( tmpNode );
				if ( minD > d ){
					minD = d;
					node = tmpNode;
				}	
			}
			
			//添加到已处理过的closed表
			closed[ node.index ] = node;
						
			//如果找到了，终止循环
			if ( node == to ) {
				opened = {};
				break;
			}else{
				if ( node )
					//获得子节点
					getChildren( node );
			}
			
			//并从OPEN表中删除
			delete opened[ node.index ];				
		}
		
		//回朔找出路径
		if ( closed[ to.index ] ){
			var step = node;// closed[ target.key ];
			while ( step.parent ) {
				ret.push( step );
				step = step.parent;
			}
		}
		//如果终点已经有人站着，则回退一格
		do{
			var cell = ret[ 0 ];
			if ( units[ cell.index ] )
				ret.shift();
			else 
				break;	
		}while( ret.length > 0 )
		
		return ret;				
	},
			
	onContextmenu	: function( e ){
		//没有弹出菜单时右键才有效
		if ( !PANEL.winLayer.hasWindow() ) {
			if ( this.clicked )
				this.clicked.unClick();
			
			this._removeCells();	
		}
	},	
	
	//在战场上新出现的角色
	showAt				: function( unit ){
		this.units[ unit.cell.index ] = unit; 
		
		var team = this.findTeam( unit.faction, unit.team );
		if ( team )
			team.add( unit );
		
		return this;
	},
	
	getUnitByIndex	: function( key ){
		return this.units[ key ];
	},	
	
	getUnitById : function( id ){
		return this.items.get( id ); 
	},		
	
	delUnitByIndex	: function( index ){
		delete this.units[ index ];
	},
	
	//取消已选中
	deleteClicked	: function( unit ){
		if ( unit == this.clicked )
			delete this.clicked;
	},
	
	_initUnit	: function( config ){
		config.layer = this;
		var unit = new Unit( config );
			
		unit.on( "standby", this.deleteClicked, this )
			//.on( "standby", this.onEnter, this )
			.on( "move", function( unit ){
				//运行脚本时不弹框
				if ( !PANEL.isScripting() && !unit.auto )
					PANEL.popActionMenu( unit, unit.cell.dx - CELL_WIDTH * 2, unit.cell.dy - CELL_HEIGHT );
			}, this )
			.on( "walk", function( unit, from, to ){
				//角色移动时及时更新管理器
				//窗口自动跟随
				if ( unit.auto ){
					if ( !PANEL.isInside( to ) )
						PANEL.moveToCell( to );
				}
				//TODO 优化存储
				//已存在的不覆盖
				if ( !this.units[to.index] ) {
					this.units[to.index] = unit;
					
					delete this.units[ unit.tempIndex || from.index];
					delete unit[ "tempIndex" ];
				}else{
					//记录暂时所处的位置 待移动后再删除
					if ( !unit.tempIndex )
						unit.tempIndex = from.index;
				}
				
			}, this )
			//点击角色时显示该角色属性
			.on( "click", PANEL.showUnitAttr, PANEL )
			//状态更改时重新显示该角色属性
			.on( "change", function( unit ){
				if ( unit == this.clicked )
					PANEL.showUnitAttr( unit );
			}, this )
			//取消点击时,隐藏该角色属性
			.on( "unclick", function( unit ){
				if ( unit == this.clicked )
					PANEL.hideUnitAttr();
					
				this.deleteClicked( unit );
			}, this )
			.on( "dead", function( unit ){
				this.delUnitByIndex( unit.cell.index );
			}, this );
		
		if (unit.visiable) {
			var team = this.findTeam(unit.faction, unit.team);
			if (team) {
				team.add(unit);
			}
		}
		return unit;
	},
	
	//显示胜利/失败条件
	showGoal		: function( fn, scope ){
		PANEL.showWhole( GOAL, fn, scope ); 
	},
	checkGoal		: function(fn, scope){
		this.victoryN++;
		if ( this.victoryN >= VICTORYN ){
			this.win = true;
			this.fireEvent( "battleWin", this );
		}else
			if ( fn )
				fn.call( scope || this );
	},
	checkFail		: function(fn, scope){
		this.failedN++;
		if ( this.failedN >= FAILEDN ){
			this.win = false;
			this.fireEvent( "battleFail", this );
		}else
			if ( fn )
				fn.call( scope || this );
	},
	
	onBattleWin	: function(){
		this.fireEvent( "battleOver", this.win );
	},
	onBattleFail	: function(){
		this.fireEvent( "battleOver", this.win );
	}	
}); /**
 * 魔法层
 * items 存放需要播放的动画
 * 支持同时播放多个动画
 */
var MagicLayer = Layer.extend({
	
	init	: function(){
		this._super( arguments[0] );
		this.items = [];
		
		PANEL.on("paint", this.onPaint, this );
		
		return this;
	},
	
	onPaint					: function(){
		if ( this.items.length > 0 ){
			var item = this.items[0];
			item.play();
		}
	},
	
	add		: function( a ){
		//执行结束后自动丢弃
		a.on( "end", function(){
			
			this.items.shift();
			
		}, this, { one : true } );
		
		this.items.push( a );
	}				
}); /**
 * 层管理器
 * 采用canvas后基本不需要管理层
 */
var LayerMgr = Manager.extend({
	
	init	: function( panel ){
		return this._super();
	},
	
	setWrap	: function( wrap ){
		this.wrap = wrap;
	},
	
	reg		: function( level, w, h, layerDiff ){
		var obj = layerDiff || Layer, 
			l = new obj( { level : level, 
									ct : this.wrap,
									ctx: PANEL.ctx								
						} );
		
		this._super( level, l );
		return l;
	}
	
});
//单例
LayerMgr = new LayerMgr();
/**
 * 窗口类
 * 所有弹出窗口的基类
 * 统一样式与取消操作
 */
var Win = Component.extend({
	cls		: "_win",
	hidden  : true,
	
	init: function( config ){
		this.addEvents( "pop" );
		this._super( config );
		
		this.layer = PANEL.winLayer;
		this.el.appendTo( this.ct );
		
		var _self = this;
		this.content = $("<div>").appendTo( this.el );
		//取消按钮
		this.canselBtn = $("<button>").addClass("_cansel").text("取消").wrap("<div></div>")
								.mousedown( function( e ){
									if ( e.which == 1 )
										_self.cansel( e );
								} )
								.appendTo( this.el );
								
		this.el.mousemove( function( e ){
			e.stopPropagation();
			//取消正在显示的鼠标滑过的效果
			PANEL.cellLayer.unactiveCell();
		} );
		
		this.on( "show", this.onShow, this );
		
		return this;	
  	},
	
	onShow	: function(){
		var x = this.el.position().left, y = this.el.position().top,
			   w = this.el.outerWidth( true ), h = this.el.outerHeight( true );
		
		//边缘检测
		if ( x < 0 )
			x = CELL_WIDTH * 2;
		if ( y < 0 )
			y = CELL_HEIGHT;
		if ( x + w > MAX_W )
			x = MAX_W  -w;
		if ( y + h > MAX_H )
			y = MAX_H - h;	
		
		this.showAt( x, y );					
		//清除正在显示的攻击单元格
		PANEL.unitsLayer._removeCells();		
	},
	
	//取消菜单时
	cansel	: function( e ){
		this.hide();
	}
	
});
/**
 * 装备
 */
/**
 * 物品类
 * 每个物品都有 apply 方法，使用后调用该方法
 */
var Stuff = Observable.extend({
	id		: "", 
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	consumable : false, //是否可消耗
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	count	: 1, //数量
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型	
	nounit	: false,	//是否需要选择角色
	
	init	: function(){
		this.addEvents( "apply","empty","over" );
		this._super( arguments[0] );
		
		return this;
	},
	
	//units : unit数组
	apply	: function( units ){
		if ( units && units.constructor == Array ){
			for (var i = 0; i < units.length; i++) {
				this.onApply( units[i] );	
			}			
		}else{
			this.onApply( units );
		}	
	},
	
	onApply	: function( unit ){
		this.hideAttack();
		//先执行动画
		unit.addTip( this.animation || {}, function(){
			//消耗型
			if( this.consumable ){
				this.count--;
			}
							
			this.fireEvent( "apply", unit, this.unit, this );
			
			//用光的时候
			if( this.count <= 0 ){
				this.fireEvent( "empty", this );
			}
			
			this.fireEvent( "over", this );
							
		}, this );
	},
	
	use		: function( unit ){
		this.bind( unit);
		this.showAttack();
	},
	
	showAttack	: function(){
		var unit= this.unit;
		var cell = unit.cell;
		//获得可攻击的格子
		obj = PANEL.unitsLayer.getAttackCells( unit.cell, this.range, this.rangeType );
		//添加自身
		obj[ cell.index ] = cell;
		
		PANEL.unitsLayer.showAttackCells( obj );
		this.attacks = obj;
		this.preAttack = true;
	},
	
	hideAttack	: function(){
		this.preAttack = false;
		delete this.attacks;
		PANEL.unitsLayer.showAttackCells( {} );
	},
	
	canAttack	: function( cell, unit ){
		var flag = false;
		
		if( ( this.nounit || !this.nounit && unit) && this.attacks && this.attacks[ cell.index ] ){
			//我军
			if ( this.effect & 1 ){
				flag = unit.isSibling( this.unit.faction, this.unit.team );
			}
			//友军
			if ( !flag && this.effect & 2 ){
				flag = unit.isFriend( this.unit.faction, this.unit.team );
			}
			//敌军
			if ( !flag && this.effect & 4 ){
				flag = unit.isEnemy( this.unit.faction, this.unit.team );
			}
		}
		return flag;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}				
			
}); /**
 * PocketWin 显示所拥有的物品
*/
var PocketWin = Win.extend({
	cls		: "_win _prop",	
	unit	: null,
	selected	: null,
	
	init: function( config ){
		this.addEvents( "over" );
		this._super( config );
		
		this.content.addClass( "_tablect" );
		
		this.table = $( '<table cellspacing="0" ><thead>' +
                			    '<tr><td width="150px" >名称</td><td align="center" width="100px">功效</td>' +
								'<td align="center" width="40px">库存</td>' +
                			    '</tr></thead><tbody></tbody></table>' ).appendTo( this.content );
		
		PANEL.unitsLayer.on( "click", this.onClick, this );
		this.on( "show", this.list, this );
		
		return this;	
  	},
	
	list	: function(){
		this.fragment = document.createDocumentFragment();
		
		Pocket.each( this._createTr, this );
		
		var _self = this;
		this.table.children("tbody").empty().append( this.fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} ).click( function(){
			var id = $(this).attr("param");
			_self.select( id );
		} );
	},
	
	_createTr	: function( key, item ){
		if ( item.count > 0 )
		this.fragment.appendChild( $( '<tr param="' + item.id + '"><td><img src="' + item.src + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.count +
						'</td></tr>' )[ 0 ] );
	},
	
	select		: function( id ){
		this.layer.concealWin();
		this.hide();
		this.selected = Pocket.get( id );
		this.selected.use( this.unit );
	},
	
	onClick		: function( cell, unit ){
		//如果有选道具
		if ( this.selected ){
			if ( this.selected.canAttack( cell, unit ) ){
				this.layer.lock();
				
				this.selected.on( "over", this.onOver, this, { one : true} );
				//使用
				this.selected.apply( unit );
				delete this.selected;
			}
			return false;
		}
	},
	
	onOver		: function(){
		if (true) {
			this.layer.unreg(this);
			this.layer.unlock();
			this.fireEvent("over", this);
			delete this.unit;
		}
	},
	
	//覆盖父类 
	cansel	: function( e ){
		this._super(e);
		this.layer.unreg( this );
		delete this.selected;
		delete this.unit;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}
});
/**
 * 物品管理类
*/
var Pocket = Manager.extend({
	
	start	: function( data ){
		this.data = data;
		
		for( var key in GOODS ){
			var stuff = new Stuff( GOODS[key] );
			
			this.reg( key, stuff );
		}
	}
});

Pocket = new Pocket();
/**
 * 魔法类
 * 每个物品都有 apply 方法，使用后调用该方法
 */
var Magic = Observable.extend({
	id		: "", 
	name	: "",
	img		: "", //图片
	desc	: "", //描述
	active  : false, //是否生效
	effect	: 1, //对谁起作用 1 我军 2友军 4敌军 可以任意组合相加 
	range	: 1, 			//攻击长度
	rangeType : 1,      //攻击类型	
	nounit	: false,	//是否需要选择角色
	needMP	: 0, 
	animation : null,
	
	init	: function(){
		this.addEvents( "apply","over" );
		this._super( arguments[0] );
		
		this.animation = Animation.get( this.animation );
		
		return this;
	},
	
	//units : unit数组
	apply	: function( cell, units ){
		this.hideAttack();
		
		//居中播放
		var x = cell.dx - (this.animation.w - CELL_WIDTH) / 2,
			  y =  cell.dy - (this.animation.h - CELL_HEIGHT) / 2;
		//播放动画	  
		this.animation.position( x, y )
			.callback( function(){
				
				if ( units && units.constructor == Array ){
					for (var i = 0; i < units.length; i++) {
						this.onApply( units[i] );	
					}			
				}else{
					this.onApply( units );
				}			
				//TODO 每个unit执行动画后触发over
				this.fireEvent( "over", this, this.unit );
				//this.unit.finish();	
			}, this );
			
		PANEL.playAnimation( this.animation );
		//减去MP
		this.unit.onDecreaseMP( this.needMP );
	},
	
	onApply	: function( unit ){
		this.fireEvent( "apply", unit, this.unit, this );
	},
	
	use		: function( unit ){
		this.bind( unit);
		this.showAttack();
	},
	
	showAttack	: function(){
		var unit= this.unit;
		var cell = unit.cell;
		//获得可攻击的格子
		obj = PANEL.unitsLayer.getAttackCells( unit.cell, this.range, this.rangeType );
		//添加自身
		obj[ cell.index ] = cell;
		
		PANEL.unitsLayer.showAttackCells( obj );
		this.attacks = obj;
		this.preAttack = true;
	},
	
	hideAttack	: function(){
		this.preAttack = false;
		delete this.attacks;
		PANEL.unitsLayer.showAttackCells( {} );
	},
	
	canAttack	: function( cell, unit ){
		var flag = false;
		
		if( ( this.nounit || !this.nounit && unit) && this.attacks && this.attacks[ cell.index ] ){
			//我军
			if ( this.effect & 1 ){
				flag = unit.isSibling( this.unit.faction, this.unit.team );
			}
			//友军
			if ( !flag && this.effect & 2 ){
				flag = unit.isFriend( this.unit.faction, this.unit.team );
			}
			//敌军
			if ( !flag && this.effect & 4 ){
				flag = unit.isEnemy( this.unit.faction, this.unit.team );
			}
		}
		return flag;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}				
			
}); 

var MagicMgr = Manager.extend({
	get		: function( name ){
		var m = this._super( name );
		if (!m) {
			var config = $.extend( MAGICS[name], { id : name });
	
			m = new Magic( config );
			this.reg(name, m);
		}
		return m;	
	}
});
//单例
MagicMgr = new MagicMgr();/**
 *	负责展示每个角色会使用的魔法
    选中后调用魔法的apply方法
 */
var MagicBox = Win.extend({
	cls		: "_win _prop",	
	unit	: null,
	selected	: null,
	
	init: function( config ){
		this.addEvents( "over" );
		this._super( config );
		
		this.content.addClass( "_tablect" );
		
		this.table = $( '<table cellspacing="0" ><thead>' +
                			    '<tr><td width="150px" >名称</td><td align="center" width="100px">功效</td>' +
								'<td align="center" width="40px">消耗MP</td>' +
                			    '</tr></thead><tbody></tbody></table>' ).appendTo( this.content );
		
		PANEL.unitsLayer.on( "click", this.onClick, this );
		this.on( "show", this.list, this );
		
		return this;	
  	},
	
	list	: function(){
		var fragment = document.createDocumentFragment();
		for( var key in this.unit.magics ){
			var item = this.unit.magics[ key ];
			
			fragment.appendChild( this._createTr( item ) );
		}
		
		var _self = this;
		this.table.children("tbody").empty().append( fragment ).find( 'tr' ).hover( function(){
			$( this ).toggleClass( "active" );
		} ).click( function(){
			// MP不足时点击不生效
			if (!$(this).hasClass("unactive")) {
				var id = $(this).attr("param");
				_self.select(id);
			}
		} );
	},
	
	_createTr	: function( item ){
		return $( '<tr param="' + item.id + '"><td><img src="' + item.img + '">' + item.name +
						'</td><td align="center">' + item.desc + 
						'</td><td align="center">' + item.needMP +
						'</td></tr>' )
						.addClass( item.needMP > this.unit.mp ? "unactive" : "" )
						[ 0 ];
	},
	
	select		: function( id ){
		this.layer.concealWin();
		this.hide();
		this.selected = this.unit.magics[ id ];
		this.selected.use( this.unit );
	},
	
	onClick		: function( cell, unit ){
		//如果有选道具
		if ( this.selected ){
			if ( this.selected.canAttack( cell, unit ) ){
				this.layer.lock();
				
				//this.unit.on( "standby", this.onOver, this, { one : true} );
				this.selected.on( "over", this.onOver, this, { one : true} );
				//使用
				this.selected.apply( cell, unit );
				
				delete this.selected;
			}
			return false;
		}
	},
	
	onOver		: function(){
		//判断施放魔法后是否还可以继续行动
		if (true) {
			this.layer.unreg(this);
			this.layer.unlock();
			this.fireEvent("over", this);
			delete this.unit;
		}
	},
	
	//覆盖父类 
	cansel	: function( e ){
		this._super(e);
		this.layer.unreg( this );
		delete this.selected;
		delete this.unit;
	},
		
	bind	: function( unit ){
		this.unit = unit;
		return this;
	}
	
});/**
 * 角色移动后弹出的菜单项
*/
var ActionMenu = Win.extend({
	unit	: null,
	
	init: function( config ){
		this._super( config );
		
		this.ul = $("<ul>").appendTo( this.content );
		
		this.btnAttack = this.createAction( "进攻", "images/system/1-1.png", this.onAttack );
		this.btnMagic = this.createAction( "策略", "images/system/76-1.png", this.onMagic );
		this.btnProp = this.createAction( "道具", "images/system/82-1.png", this.onProp );
		this.btnStandby = this.createAction( "待命", "images/system/98-1.png", this.onStandBy );
		
		this.on( "show", this.onShow, this );
		
		return this;	
  	},
	
	createAction	: function( text, img, onclick ){
		var li = $("<li>").appendTo( this.ul ), _self = this;;
		var btn = $("<button>").text( text ).css( "background-image", "url(" + PATH + img + ")" ) .click( function( e ){
			//if (  e.which == 1 )
				if ( ($(this).attr( "disabled" )+"") != "true" )
					onclick.call( _self, e, text );
					
		} ).appendTo( li );
		
		return btn;
	},
	
	onShow		: function(){
		this._super();
		if ( !this.unit.hasMagic() ){
			this.btnMagic.attr( "disabled", "true" );
		}else{
			this.btnMagic.removeAttr( "disabled" );
		}
	},
	
	onKeydown	: function( e ){
		//空格时
		if (e.which == 32 ) {
			e.preventDefault();
			this.onStandBy();
		}		
	},
	
	onAttack	: function( e ){
		this.layer.concealWin();
		this.hide();
		this.unit.showAttack();
	},
	
	onMagic	: function( e ){
		if (!this.magicBox ) {
			this.magicBox = new MagicBox({
				ct	: this.ct
			});
			this.magicBox.on( "over", this.onStandBy, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		
		this.magicBox.bind( this.unit ).showAt( x - 240 , y ).show();
		this.layer.reg( this.magicBox );
	},
	
	onProp	: function(e){
		if (!this.pocketWin) {
			this.pocketWin = new PocketWin({
				ct	: this.ct
			});
			this.pocketWin.on( "over", this.onStandBy, this );
		}
		var x = this.el.position().left;
		var y = this.el.position().top;
		
		this.pocketWin.bind( this.unit ).showAt( x - 240 , y ).show();
		this.layer.reg( this.pocketWin );
	},
	
	onStandBy	: function(){
		this.hide();
		this.unit.finish();
	},
	
	disappear	: function(){
		this.hide();
		this.layer.unreg( this );
		this.layer.unlock();		
	},
	
	//覆盖父类 增加角色回退功能
	cansel	: function( e ){
		if (this.unit) {
			this.unit.un("standby", this.cansel);
			this.unit.unClick();
			delete this.unit;
		}
		this._super(e);
		this.layer.unreg( this );
	},
	
	bind	: function( unit ){
		this.unit = unit;
		this.unit.un("standby", this.cansel);
		this.unit.on( "standby", this.cansel, this, { one : true } );
		return this;
	}
	
});/**
 * 窗口层
 * 统一控制窗口，同一时间只有一个窗口可显示
 * 统一处理 ESC/右键 取消当前窗口
 */
var WinLayer = Component.extend({
	cls	: "_winLayer",
	top	: null,  //最顶层窗口
	items : null, //管理弹出菜单
	conceal	: false,	//临时hide
	busy	: false,	//busy时不可执行任何操作
	
	init	: function( config ){
		$.extend( config, {
			el	: $("#winLayer"),
			w	: MAX_W,
			h	: MAX_H
		} );
		
		this._super( config );
		this.items = [];
		
		//点击右键时取消菜单
		PANEL.on("keydown", function( e ){
			if ( this.hasWindow() && !this.busy ) {
				//按ESC时
				if ( e.which == 27 ) {
					e.preventDefault();
					e.stopPropagation();
					
					this.onContextmenu();
				} else
				//管理器主动调用onKeydown
				if ( !this.passby() )
					this.items[ 0 ].onKeydown( e );
			}	
		}, this ).on( "contextmenu", function( e ){
			if ( this.hasWindow() && !this.busy ) {
				e.stopPropagation();
				
				this.onContextmenu();
			}
		}, this );		
		
		return this;
	},
	
	//触发右键/ESC
	onContextmenu		: function(){
		if (this.conceal) {
			this.conceal = false;
			this.items[0].show();
		}
		else 
			this.items[0].cansel();		
	},
	
	popActionMenu		: function( unit, x, y ){
		if ( !this.menuAction ){
			this.menuAction = new ActionMenu({
				ct	: this.el
			}) ;
		}
		this.menuAction.bind( unit ).showAt( x, y ).show();
		this.clear().reg( this.menuAction );
		
		return this;
	},
	
	hasWindow		: function(){
		return this.items.length > 0;
	},
	
	passby		: function(){
		return !this.hasWindow() || (this.hasWindow() && this.conceal );
	},
		
	reg				: function( win ){
		if ( this.items[0] )
			this.items[0].hide();
				
		//添加到第一个
		this.items.unshift(win);
		
		return this;
	},
	
	unreg			: function(){
		this.items.shift();
		if ( this.items.length > 0 ){
			this.items[ 0 ].show();
		}
		
		return this;		
	},
	
	concealWin		: function(){
		this.conceal = true;
	},
	
	clear			: function( color ){
		this.items = [];
		this.conceal = false;
		return this;	
	},
	
	lock			: function(){
		this.busy = true;
	},
	
	unlock			: function(){
		this.busy = false;
	}				
}); /**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AIUnit  = Observable.extend({
	unit	: null,
	enemy	: null,
	running	: false,
	suspend : false,
	
	init	: function(){
		this.addEvents( "end" );
		this._super( arguments[0] );
		
		return this;
	},
	
	start	: function( unit ){
		log( "aiunit start : " + unit.name );
		this.unit  = unit;
		
		this.unit.on( "standby", function( unit ){
			delete this.enemy;
			delete this.unit;			
			this.fireEvent( "end", unit, this );
		}, this,  { one : true } );
		
		this.running = true;
		this.unit.auto = true;
		this.unit.followMe();

		this.enemy = this.scanEnemy();
		
		//有敌人并且未锁定时 发动攻击		
		if ( this.enemy && !this.unit.lock ) {
			this.fight(this.enemy);
		}else{
			this.end();
		}
	},
	
	end	: function(){
		this.running = false;
		this.unit.finish();
	},
	
	fight	: function( enemy ){
		var attackPoints = this.canAttack( enemy );
		if ( attackPoints ){
			this.attack( enemy, attackPoints );
		}else{
			this.closeTo( enemy );
		}
	},
	//移动后并攻击敌人
	attack	: function( enemy, points ){
		//获得移动距离最小的点
		var minD = 10000, cell = this.unit.cell, min;
		for( var index in points ){
			var d = cell.distance( points[index] );
			if ( minD > d ){
				minD = d;
				min = points[index];
			}
		}
		
		//没有移动 直接攻击
		if (min == cell) {
			this.sword(enemy);
		}
		else {
			//显示移动的单元格
			this.unit.showMoves();
			setTimeout(bind(function(){
				this.unit.clearMoves();
				
				this.unit.on("move", function(){
					this.sword(enemy);
				}, this, { 	one: true });
				this.unit.moveTo( min );
				
			}, this), 500);
		}
	},
	
	sword	: function( enemy ){
		//显示攻击的单元格
		this.unit.showAttack();
		setTimeout(bind(function(){
			this.unit.clearAttack();
			
			this.unit.on("attack", this.end, this, { one: true })
					 .attack(enemy);
		}, this), 500);		
	},
	
	//靠近敌人
	closeTo	: function( enemy ){
		var cell = this.nearCell( enemy );
		if ( cell ){
			//显示移动的单元格
			this.unit.showMoves();
			setTimeout( bind( function(){
				this.unit.clearMoves();
				
				this.unit.on( "move", function(){
					this.end();
				}, this, { one:true } );				
				this.unit.moveTo( cell );
						
			}, this), 500 );
		}else{
			//没有可移动的
			this.end();
		}
	},
	
	//判断是否可攻击
	//有返回可供攻击的单元格
	//没有返回false
	canAttack	: function( enemy ){
		var walks = this.unit.getMoves(), has = false, include = {},  eIndex = enemy.cell.index,
			range= this.unit.range, rangeType= this.unit.rangeType;
		//添加自身所处单元格
		walks[ this.unit.cell.index ] = 	this.unit.cell;
		//遍历所有移动单元格	
		for ( var index in walks ){
			//该单元格可以攻击到 则添加
			if ( PANEL.unitsLayer.getAttackCells(walks[index], range, rangeType)[ eIndex ] ) {
				has = true;
				include[index] = walks[index];
			}
		}
		
		return has ? include : false;
	},
	
	//找到可移动到的 离敌人最近的单元格
	nearCell	: function( enemy ){
		var walkCells = this.unit.getMoves(),
			   min = 10000, near = null, origin = enemy.cell;
		for( var index in walkCells ){
			var cell = walkCells[ index ], d = origin.distance( cell ), 
					unit = PANEL.unitsLayer.getUnitByIndex( cell.index );
			//排除已站人的单元格		
			if ( (!unit || ( unit && unit.overlay ) ) && d < min ){
				min = d;
				near = cell;
				//已走到最近则跳出循环
				if ( min == 1 )
					break;
			}
		}
		
		return near;
	},
	
	isInRange	: function( cell ){
		var attackCells = this.unit.getAttacks();
		return attackCells.hasOwnProperty( cell.index );
	},
	
	stop	: function(){},
	
	//找到离自己最近的敌人
	scanEnemy	: function(){
		var units = PANEL.unitsLayer.units, min = 10000, neighbor = null, origin = this.unit.cell,
				faction = this.unit.faction;
				
		for( var key in units ){
			var unit = units[ key ];
			if ( unit.isEnemy( faction ) ){
				var d = origin.distance( unit.cell );
				if ( d < min  ){
					min = d;
					neighbor = unit;
				}				
			}
		}
		
		return neighbor;
	},
	
	pause	: function(){
		if ( this.running ) {
			this.suspend = true;
		}
	},
	
	goon	: function(){
		if ( this.running ) {
			this.suspend = false;
		}
	}
		
}); 

/**
 * 队伍AI
 * 负责协调调度各个角色执行顺序
 */
var AITeam = Observable.extend({
	unit	: null,
	units	: null,
	mode	: null, //TODO 每个角色拥有各自的AI逻辑
	running : false,
	suspend	: false,	//暂停
	
	init	: function(){
		this._super( arguments[0] );
		
		this.units = {};
		this.mode = new AIUnit();
		this.mode.on( "end", this.onModeEnd, this );
		
		return this;
	},
	
	start	: function(){
		log("aiteam start");
		this.running = true;
		this.scanUnits();
		this.analyze();
	},
	
	onModeEnd	: function( unit ){
		log( "aiunit : end : " + unit.name );
		delete this.units[ unit.id ];
		delete this.unit;
		this.analyze();
	},
	
	//分析执行顺序
	analyze	: function(){
		if (!this.suspend) {
			for (var key in this.units) {
				var unit = this.units[key];
				this.unit = unit;
				this.mode.start(this.unit);
				return;
			}
			log( "aiteam : no next unit " );
		}
	},
	
	stop	: function(){
		this.running = false;
		delete this.team;
		//delete this.units;	//不删除units aiunit.end事件 迟到反馈
	},
	
	pause	: function(){
		this.suspend = true;
		if ( this.running ) {
			if ( this.unit )
				this.mode.pause( this.unit );
		}
	},
	
	goon	: function(){
		this.suspend = false;
		if ( this.running ) {
			
			if ( this.unit )
				this.mode.goon( this.unit );
			else
				this.analyze();	//寻找下一个	
		}else{
			this.start();	//开始运行
		}
	},	
	
	//扫描自己人
	scanUnits	: function(){
		var units = this.team.members();
		this.units = {};
		for( var key in units )
			this.units[ key ] = units[ key ];  
	},
	
	bind	: function( team ){
		this.team = team;
	}	
}); 

/**
 * AI控制器
 * 负责开启与关闭AI
 * 主动轮询是否正在执行脚本，如果是则暂停
 */
var AIController = Observable.extend({
	teamAI	: null,
	running	: false,
	suspend	: false,	//暂停
	active	: true,
	
	init: function(){
		this._super(arguments[0]);
		
		return this;
	},
	
	start	: function(){
		if ( !this.active )
			return;
			
		PANEL.on( "runScript", this.pause, this )
			 .on( "stopScript", this.goon, this );
		
		PANEL.unitsLayer.on( "teamStart", this.onTeamStart, this )
					    .on( "teamEnd", this.onTeamEnd, this );	 
	},
	
	getAITeam	: function(){
		if ( !this.teamAI ){
			this.teamAI = new AITeam();
		} 
		return this.teamAI;
	},
	
	onTeamStart	: function( team ){
		if ( !this.running && !team.equal( FACTION ,TEAM) ){
			log( "ai start : team = " + team.name + " suspend = " + this.suspend );
			this.running = true;
			this.team = team;
			this.getAITeam().bind( team );
			
			if ( !this.suspend )
				this.getAITeam().start( team );
		} 
	},
	
	onTeamEnd	: function( team ){
		if ( this.running && this.team.equal( team.faction ,team.team ) ){
			log( "ai end : team = " + team.name );
			this.running = false;
			this.getAITeam().stop( team );
			delete this.team;
		} 
	},
	
	pause	: function(){
		this.suspend = true;
		if (this.running) {
			log( "ai pause" );
			this.getAITeam().pause();
		}
	},
	
	goon	: function(){
		this.suspend = false;
		if (this.running) {
			log( "ai goon" );
			this.getAITeam().goon();
		}
	}	
	
}); 

AIController = new AIController();
/**
 * 动作
 * 事件触发后按序执行动作
 * next  : 该动作执行过后的下个动作 >下个动作 <上一个动作
 * desc : 该动作的描述
 * type	: 动作类型 1 角色动作 2系统动作 
 * options : 弹出选择项
 */
var Action = Observable.extend({
	index		: null,
	next	: ">",
	desc : "",
	script : "",
	fn		  : null,
	scope : null,
	params	: null,
	action	: "",
	obj	: null,
	options : null,	
	
	init	: function(){
		this._super( arguments[0] );
		this.params = this.params || [];
		this.params.push( this.fn, this.scope );
		
		return this;
	},
	
	getObj	: 	function(){
		return this.obj;
	},
	
	start	: function(){
		var obj = this.getObj();
		if ( obj && obj[ this.action ])
			obj[ this.action ].apply( obj, this.params );
		else{
			log( "没有执行主体或没有方法 ： " + obj + " action : " + this.action );
			//没有执行主体
			if ( this.fn )
				this.fn.call( this.scope|| this );
		}	
	},
	
	stop: function(){},
	
	getNext	: function(){
		if ( this.action == "showOptions" ){
			//如果是有选择框 第一个参数为选择项
			var v = arguments[0];
			return v;
		}else if ( this.next == ">" )
			return ++this.index;
		else if ( this.next == "<" )
			return --this.index;
		else				
			return this.next;
	}
}); 
//角色动作
var UnitAction = Action.extend({
	id		: "",
	
	getObj	: 	function(){
		var unit =  PANEL.getUnitById( this.id );
		if ( !unit.dead )
			return unit;
		else
			return null;	
	}
}); 
//系统动作
var SysAction = Action.extend({
	
	getObj	: 	function(){
		return PANEL;
	}
}); 
//群体动作
var GroupAction = Action.extend({
	group		: null,
	actions		: null,
	
	getObj	: 	function(){
		return eval( this.group + ".members()" );
	},
	
	start	: function(){
		var obj = this.getObj();
		if (obj) {
			
			var oriNext = this.getNext(), index = this.mgr.count(), newNext = this.mgr.count(),
				params = this.params.slice( 0, this.params.length -2 );
			//在动作数组后批次增加每个角色的动作
			for( var key in obj ){
				var unit = obj[ key ];
				var a = new UnitAction ({
					index	: index,
					id	: unit.id,
					action : this.action,
					params : Array.prototype.slice.call( params, 0 ),
					fn	   : this.fn,
					scope  : this.scope
				});
				
				this.mgr.reg( index++, a );
			}
			//设置下一个执行索引
			this.next = newNext;
			//全部执行完毕后回跳到原来该执行的动作
			this.mgr.get( this.mgr.count() -1 ).next = oriNext;
			
			//没有执行主体
			if (this.fn) 
				this.fn.call(this.scope || this);			
		}
		else {
			//没有执行主体
			if (this.fn) 
				this.fn.call(this.scope || this);
		}	
	}	
}); 
/**
 * 事件
 * 负责引导动作执行，依序执行
 * name	 : 事件名
 * options : 事件的配置 默认只执行一次
 * type	: 事件类型 1 角色事件 2系统事件 
 * current : 当前动作
 * index	: 从第几个动作开始执行
 */
var Event = Manager.extend({
	name : "",
	fn		  : null,
	scope : null,
	options	: null,
	current	: null,
	index	: 0, 
	condition : null,
	
	init	: function( config ){
		this._super( arguments[0] );
		
		this.options = this.options;
		
		return this;
	},
	
	getObj	: 	function(){
		return this.obj;
	},
	
	hung	: function(){
		var obj = this.getObj();
		if (obj) {
			var actions = this.actions;
			for (var i=0; i<actions.length; i++) {
				var a, config = $.extend( {
					index	: i,
					type	: 1,
					mgr		: this,
					actions	: this.actions,
					fn	: this.next,
					scope : this
				}, actions[ i ] );
				
				if ( config.type == 1 )
					a = new UnitAction( config );
				else if ( config.type == 2 )
					a = new SysAction( config );
				else if ( config.type == 3 )
					a = new GroupAction( config );
				else
					a = new Action( config );	
					
				this.reg( i, a );					
			}
			//注册事件
			obj.on( this.name, this.check, this );
		}
	},
	
	/**
	 * 进行判断
	 * index : 第几个参数
	 * symbol : == | >= | <= | < | > ...
	 * compare	 :  待对比项
	 * script  : 自定义脚本
	 */
	check	: function(){
		//log( "event check : " + this.name );
		var flag = true;
		if ( this.condition && this.condition.length > 0 ){
			for (var i=0; i<this.condition.length; i++) {
				var c = this.condition[i], str;
				var l = c.index || 0;
				if ( c.script )
					str = "flag=flag && (" + c.script + ")";
				else
					str = "flag=flag && ( arguments[ " + l + " ] " + (c.symbol || "==") + c.compare + ")";
						
				try {
					eval( str );
				} 
				catch (e) {
					flag = true;
				}
			}
		}
		if ( flag ){
			//取消注册
			this.getObj().un( this.name, this.check, this );
			this.start();
		}
	},
	
	next	: function(){
		var b = this.current.getNext.apply( this.current, arguments );
		log( "next = " + b );
		if ( b == -1 ){
			// no next
			this.stop();
		}	else if ( b != undefined || b != null )
			this.process( b );
		else
			this.stop();	
	},
	
	//继续执行
	process	: function( id ){
		var a = typeof id == "object" ? id :  this.get( id );
		if (a) {
			this.current = a;
			a.start();
		}else{
			//执行不下去了
			this.stop();
		}		
	},
	
	//事件响应后开始执行	
	start	: function(){
		log( "event start function : " + this.name );
		//block事件
		this.getObj().suspendEvent( this.name );	
		PANEL.runScript();
		this.current = this.get( this.index );
		if ( this.current ) 
			this.current.start();
		else
			this.stop();	
	},	
	
	stop: function(){
		log( "stop event : " + this.name );
		delete this.current;
		this.active = false;
		//block事件
		this.getObj().resumeEvent( this.name );	
		PANEL.stopScript();		
	}
}); 
//角色事件
var UnitEvent = Event.extend({
	id		: "",  //角色ID
	
	getObj	: 	function(){
		return PANEL.getUnitById( this.id );
	}
}); 
//系统事件
var SysEvent = Event.extend({
	
	getObj	: 	function(){
		return PANEL;
	}
}); 
//战场事件
var BattleEvent = Event.extend({
	
	getObj	: 	function(){
		return PANEL.unitsLayer;
	}
}); 


//事件管理器 执行某个事件需从这里接入
var ScriptMgr = Manager.extend({
	current	: null,	
	
	//工厂模式生成事件对象
	load	: function(){
		for (var i=0; i<ACTIONGROUPS.length; i++) {
			var g = ACTIONGROUPS[i];
			
			if ( g.event && g.event.active === true ){
				var e, econfig = $.extend( {
					actions	: g.actions
				} ,g.event );
				
				if ( econfig.type == 1 )
					e = new UnitEvent( econfig );
				else if ( econfig.type == 2 )
					e= new SysEvent( econfig );
				else if ( econfig.type == 3 )
					e= new BattleEvent( econfig );	
				else
					e = new Event( econfig );
				
				this.reg( i, e);
				e.hung();						
			}
		}
		return this;
	}		
}); 

ScriptMgr = new ScriptMgr();
/**
 * 工具条
 * 每个按钮拥有一个对应的事件，点击后触发
 */
var Toolbar  = Observable.extend({
	active	: false,
	
	init	: function(){
		this.addEvents( "endTeam","saveGame","loadGame","condition","restart", "mute" );
		this._super( arguments[0] );
		
		return this;
	},
	
	start	: function( unit ){
		PANEL.unitsLayer.on( "teamStart", this.onTeamStart, this )
						.on( "teamEnd", this.onTeamEnd, this );
		
		this.el = $("#toolbar").show();
		this.unactiveButtons();
		
		var _self = this;
		this.el.find("button").click( function(){
			_self.fireEvent( $(this).attr("param") );
		} );
		
		this.on( "restart", function(){
			window.location.reload();
		} );
		
		this.on( "endTeam", function(){
			PANEL.unitsLayer.finishTeam( FACTION, TEAM );
		}, this );	
		
		this.on("condition", function(){
			PANEL.showGoal();
		});
		
		this.el.find( "#mute" ).unbind("click").toggle( function(){
			SoundMgr.turnOff();
			$(this).html( "开启音效" );
		}, function(){
			SoundMgr.turnOn();
			$(this).html( "关闭音效" );
		} );	
		
		this.on("script", function(){
			alert( "制作中，敬请期待" );
		});		
	},

	onTeamStart	: function( team ){
		if ( team == MYTEAM ){
			this.active = true;
			this.activeButtons();
		}else{
			this.active = false;
			this.unactiveButtons();
		} 
	},
	
	onTeamEnd	: function(){
		this.active = false;
		this.unactiveButtons();
	},
	
	activeButtons	: function(){
		this.el.find(".active").removeAttr( "disabled" );
	},
	
	unactiveButtons	: function(){
		this.el.find(".active").attr( "disabled", "true" );
	}
				
}); 

var Toolbar = new Toolbar();
/**
 * 图像处理工具
 * 灰化高亮切割图片等操作
 */
var PS = function( config ){
	$.extend( this, config );
	
	this.canvas = $("<canvas>").addClass("_bboard").appendTo("body")[0];
	if ( this.canvas.getContext )
		this.ctx = this.canvas.getContext("2d");
	
	return this;
}

PS.prototype = {
	
	/**
	 * 复制ctx中某一区域图像，转成Image
	*/
	getCanImage	: function( ctxOri, x,y, w, h, callback ){
		var img = new Image(), can = this.canvas;
		
		var data = ctxOri.getImageData( x,y, w,h );
		
		can.width = w;
		can.height = h;
		
		this.ctx.putImageData( data, 0 ,0 );
		data = can.toDataURL();
		
		//img.onload = callback;
		img.src = data;
		
		return img;
	},
	/**
	 * 将图片存入在一个canvas中
	*/
	putImgToCanvas	: function( img, x,y, w, h ){
		var ret = document.createElement("canvas"),
			   c = ret.getContext("2d");
		ret.width = w;
		ret.height = h;
		
		try {
			c.drawImage( img, x, y, w, h, 0, 0, w, h );
		} catch (e) {}

		return ret;
	},	
	/**
	 * 反转图片并裁剪
	 * 没有传裁剪信息时返回整张图
	*/
	getCanImageTurn	: function( img, x, y, w, h ){
		var ret = new Image(), can = this.canvas, c = this.ctx;
		var w = w || img.width, h = h || img.height;
		
		can.width = w;
		can.height = h;
		
		c.save();
		var matrix  = this.getMatrix( Math.PI, 1, -1 );
		//变换坐标系
		c.translate( w, 0 );
		c.transform( matrix.M11,  matrix.M12, matrix.M21, matrix.M22, 0,0 );
		
		if ( x == undefined )
			c.drawImage( img, 0, 0 );
		else
			c.drawImage( img, x, y, w, h, 0, 0, w, h );
			
		var data = can.toDataURL();
		
		c.restore();
		
		ret.src = data;
		return ret;
	},
	/**
	 * 将图片存入在一个canvas中
	*/
	putImgToCanvasTurn	: function( img, x,y, w, h ){
		var ret = document.createElement("canvas"),
			   c = ret.getContext("2d");

		ret.width = w;
		ret.height = h;
		
		var matrix  = this.getMatrix( Math.PI, 1, -1 );
		//变换坐标系
		c.translate( w, 0 );
		c.transform( matrix.M11,  matrix.M12, matrix.M21, matrix.M22, 0,0 );
				
		try {
			c.drawImage( img, x, y, w, h, 0, 0, w, h );
		} catch (e) {}

		return ret;
	},		
	getMatrix	:    function (radian, x, y) {
        var Cos = Math.cos(radian), Sin = Math.sin(radian);
        return {
            M11: Cos * x, M12:-Sin * y,
            M21: Sin * x, M22: Cos * y
        };
    },
		
	//将图像灰化
	gray		: function( ctx, imageData ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		for (i=0; i<w; i++)
		{
			for (j=0; j<h; j++)
			{
			    var index=(i*h+j) * 4;
			
			    var red=imageData.data[index];
			    var green=imageData.data[index+1];
			    var blue=imageData.data[index+2];
			    var alpha=imageData.data[index+3];
			
			    var average=(red+green+blue)/3;
			
			    ret.data[index]=average;
			    ret.data[index+1]=average;
			    ret.data[index+2]=average;
			    ret.data[index+3]=alpha;
			  }
		}
		
		return ret;
	},

	//将图像灰化
	grayImg		: function( img ){
		var ret = document.createElement("canvas"),
			   c = ret.getContext("2d");
		var w = img.width, h = img.height;
		
		ret.width = w;
		ret.height = h;
				
		c.drawImage( img, 0, 0 );
		var data = c.getImageData( 0,0, w, h );
		try {
			var imgdata = this.gray( c, data );
			c.putImageData( imgdata, 0, 0 );
		} catch (e) {}

		return ret;
	},
		
	// 生成ImageData
	createImageData	: function( ctx, ori, from, w, h ){
			var	ret = ctx.createImageData( w, h );
			var total = w * h * 4;
			from = from * w * 4;
			for (var i= 0 ; i< total; i++) {
				ret.data[ i ] = ori.data[ from + i ];
			}
			
			return ret;
	},
	
	//生成ImageData
	//对称图像反转
	//TODO  transform 优化
	 createImageDataTurn	: function( ctx, ori, from, w, h ){
			var	ret = ctx.createImageData( w, h );
			var total = w * h * 4;
			from = from * w * 4;
			for (var j=0; j<h; j++) {
				for (var i=0; i<w; i++) {
					var  a =  (j * w + i) * 4,
							b = from + a,
							c =  (j * w + w- i) * 4;
							
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
					ret.data[ c++ ] = ori.data[ b++ ];
				}
			}
			
			return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorR	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = n; // imageData[ i ];
		    ret.data[i+1]= imageData.data[ i + 1 ];
		    ret.data[i+2]= imageData.data[ i + 2 ];
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorG	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			var red=imageData.data[i],
			    green=imageData.data[i+1],
			    blue=imageData.data[i+2];
			
			var a = (red + green + blue) / 3;
				
			ret.data[i]  = a;
		    ret.data[i+1]= a + n;
		    ret.data[i+2]= a;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//将整个图片设置为某一颜色值
	 setColorB	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = imageData.data[ i ];
		    ret.data[i+1]= imageData.data[ i + 1 ];
		    ret.data[i+2]= n;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//高亮整个图片
	 highlight	: function( ctx, imageData, n ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			
			ret.data[i]  = imageData.data[ i ] + n;
		    ret.data[i+1]= imageData.data[ i + 1 ] + n;
		    ret.data[i+2]= imageData.data[ i + 2 ] + n;
		    ret.data[ i+3]= imageData.data[ i + 3 ];
		}	
		
		return ret;
	},
	
	//高亮整个图片
	highlightImg		: function( img, n ){
		var ret = document.createElement("canvas"),
			   c = ret.getContext("2d");
		var w = img.width, h = img.height;
		
		ret.width = w;
		ret.height = h;
				
		c.drawImage( img, 0, 0 );
		var data = c.getImageData( 0,0, w, h );
		try {
			var imgdata = this.highlight( c, data, n );
			c.putImageData( imgdata, 0, 0 );
		} catch (e) {}

		return ret;
	},
		
	//去色   紫色 247, 0, 255
	 removeColor	: function( ctx, imageData, r, g, b ){
		var w = imageData.width,
				h = imageData.height,
				ret = ctx.createImageData( w, h );
		
		var total = w * h * 4;
		
		for (var i=0; i<total; i +=4 ) {
			var red=imageData.data[i],
			    green=imageData.data[i+1],
			    blue=imageData.data[i+2];
			
			//相等则全透明	
			if ( r == red && green == g && blue == b ){
				ret.data[ i+3]= 0;
			}else{
				ret.data[i]  = red;
		    	ret.data[i+1]= green;
		    	ret.data[i+2]= blue;
		    	ret.data[ i+3]= imageData.data[ i + 3 ];
			}
		}	
		
		return ret;
	},					
	
	//截断
	 cutImageData	: function( imageData, y ){
	 	//imageData.length 
	 	return Array.prototype.slice.call( imageData, 0, y * 4 );
		return imageData.slice( 0, y * 4 );
	}		
};

//DOM树加载完之后
$( function(){
	PS = new PS();
} );
/**
 * 声音管理器
 */
var Sound = Observable.extend({
	src		: "",
	loop		: false,
	pausing : false,
	loaded : false,
	playing : false,
	
	init	: function(){
		this._super( arguments[0] );
		
		var audio = new Audio( PATH + this.src );
		this.audio = audio;
		
		var _self = this;
		audio.addEventListener( "ended", function(){
			_self.onEnd();
		} , true );
		
		return this;
	},
	
	play	: function(){
		this.playing = true;
		if (!this.pausing) {
			this.pausing = false;
			this.audio.load();
			this.audio.play();
		}
	},
	
	pause: function(){
		this.pausing = true;
		this.audio.pause();
	},
	
	onEnd	: function(){
		log( "audio end : " + this.src );
		this.playing = false;
		if ( this.loop ){
			this.play();
		}
	},
	
	turnOn	: function(){
		this.audio.volume = 1;
/*
		this.audio.muted = false;
		if ( this.playing ){
			this.audio.pause();
			this.audio.play();
		}
*/		
	},
	
	//无声
	turnOff	: function(){
		this.audio.volume = 0;
/*
		this.audio.muted = true;
		if ( this.playing ){
			this.audio.pause();
			this.audio.play();
		}
*/
	}		
}); 

var SoundMgr = Manager.extend({
	pausing	: false,
	
	init	: function(){
		
		this._super( arguments[0] );
	},
	
	reg	: function( key, value ){
		if ( !(value instanceof Sound) )
			value = new Sound( value );
		
		this._super( key, value );	
	},
	
	//工厂模式生成事件对象
	load	: function(){
		for( var key in AUDIOS )
			this.reg( key, AUDIOS[ key ] );
	},
	
	play	: function( name ){
		if ( this.get( name ) )
			this.get(name).play();
		else
			log( "SoundMgr doesn`t have : " + name );
	},
	
	pause: function( name ){
		if ( this.get( name ) )
			this.get( name ).pause();
	},
	
	turnOn	: function(){
		this.each( function(){
			this.turnOn();
		} );		
	},
	
	turnOff	: function(){
		this.each( function(){
			this.turnOff();
		} );	
	}	
}); 

SoundMgr = new SoundMgr();
/**
 * 进度条
 * 所有加载完毕后再执行其他
 */
var Process = Observable.extend({
	count : 0, //当前加载进度
	msg	: "", //说明文字
		
	init	: function( config ){
		this.addEvents( "end" );
		this._super( config );
		
		this.el = $("#loader");
		
		return this;
	},
	
	//加载状态图像
	_loadBuffsImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in BUFFS ){
			count++;
		}
		for( var name in BUFFS ){
			(function(){
				var buff = BUFFS[ name ];
				buff.src = PATH + buff.src;
				_loadImg( buff.src, function(){
					buff.img = this;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 10, "状态图片加载完毕..." );
					}
				} );
			})();
		}		
	},
	//加载状态图像
	_loadGoodsImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in GOODS ){
			count++;
		}
		for( var name in GOODS ){
			(function(){
				var buff = GOODS[ name ];
				buff.src = PATH + buff.src;
				_loadImg( buff.src, function(){
					buff.img = this;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 10, "物品图片加载完毕..." );
					}
				} );
			})();
		}		
	},	
	//加载魔法图像
	_loadAnimationImg	: function(){
		var count = 0, i = 0, _self = this;
		for( var name in ANIMATIONS ){
			count++;
		}
		for( var name in ANIMATIONS ){
			(function(){
				var a = ANIMATIONS[ name ];
				a.src = PATH + a.src;
				_loadImg( a.src, function(){
					//切割图片
					var totalH = this.height, n = totalH / a.h, imgs = [];
					for (var j=0; j<n; j++) {
						imgs.push( PS.putImgToCanvas( this, 0, a.h * j, a.w, a.h ) );
					}
					a.imgs = imgs;
					i++;
					//全部加载完
					if ( i >= count ){
						_self.add( 20, "魔法图片加载完毕..." );
					}
				} );
			})();
		}		
	},		
	
	_loadBackgroundImg	: function(){
		_loadImg( BGIMAGE, bind( function(){
			this.add( 10, "背景图片加载完毕..." );
		}, this) );
	},

	_loadRoleImg	: function(){
		ImgMgr = new Manager();
		var count = 0, _self = this;
		for( var key in FIGURES ){
			count++;
		} 		
		for( var key in FIGURES ){
			var r = new Figure( $.extend( {
				id	: key,
				listeners	: {
					load	: function( role ){
						_self.add( 51/ count , role.id + "图片加载完毕..." );
					}
				}
			}, FIGURES[ key ] ) );
			
			ImgMgr.reg( key, r );
		} 
	},
			
	start	: function(){
		this.el.show();
		
		this._loadBuffsImg();
		this._loadGoodsImg();
		this._loadAnimationImg();
		this._loadBackgroundImg();
		this._loadRoleImg();
				
		return this;
	},
	
	add	: function( n, msg ){
		this.count += n;
		this.msg = msg;
		
		this.el.html( Math.ceil( this.count ) + "/100%　　" +  this.msg );
				
		if ( this.count >= 100 )
			this.end();
			
		return this;
	},
	
	end	: function(){
		this.el.html("").hide();
		
		this.fireEvent("end");
	}
});

/**
 * 战场控制
 * 外部调用统计的入口
 */
var Panel = Component.extend({
	w		: WINDOW_WIDTH,
	h		: WINDOW_HEIGHT,
	cls   : "_panel",
	suspend	: true,  //停止更新
	drawable: true,   //可以绘画
	scripting : 0, //是否正在执行脚本
	
	scrollLeft : 0,	//窗口左移的像素
	scrollTop : 0,  //窗口上移的像素
	
	cellLayer	: null,    //zIndex : 100
	unitsLayer : null, //zIndex : 200
	staticLayer : null,   //zIndex : 300
	winLayer : null,   //zIndex : 400
	
	dps		 :  24, //帧数
	
	lineTimer: 0,
	
	init		: function( config ){
		PANEL = this;
		
		this.el = $( "#panel" );
		this.ct = $("#wrap").width( MAX_W );
		
		this.addEvents( "paint", "click","runScript","stopScript","globalClick","mouseleave","mousemove","contextmenu","keydown","keyup" );
		this.addEvents( { name : "paint", type : 3 } );
		
		this._super( config );
		
		LayerMgr.setWrap( this.el );
		
		//初始化画布 开始隐藏
		canvas = $("#canvas").hide()[0];
		canvas.width = MAX_W;
		canvas.height = 3000; // MAX_H;
		if ( canvas.getContext )
			ctx = canvas.getContext("2d");
		
		//mask layer
		this.masklayer = $("#masklayer").addClass("_masklayer");
		this.display = $("._display");
		
		//绑定事件
		var x, y, drag = false, el=this.el, _self = this;
		this.el.mousedown( function( e ){
			if (e.which == 1) {
				x = e.pageX;
				y = e.pageY;
				//this.style.cursor = "pointer";
				drag = true;
				
				if ( this.setCapture )
					this.setCapture();
			}		
		} )
		.mousemove( function( e ){
			if ( drag && e.which == 1 ) {
				//if (!_self.isScripting()) {		//执行脚本时锁定屏幕
				if ( true ){
					if (x != e.pageX) 
						el.scrollLeft = (this.scrollLeft -= e.pageX - x);
					
					if (y != e.pageY) 
						el.scrollTop = (this.scrollTop -= e.pageY - y);
				}
				x = e.pageX;
				y = e.pageY;
			}
			
			_self.fireEvent( "mousemove", e, _self );			
		} )
		.click( function( e ){
			_self.fireEvent( "click", e );	
		} )
		.mousewheel( function( e, delta, x, y){
			//向下滚动
			//if (!_self.isScripting()) { //执行脚本时锁定屏幕
			if ( true ){
				if (y == -1) {
					_self.moveWinBy(0, CELL_HEIGHT);
				}
				else {
					_self.moveWinBy(0, -CELL_HEIGHT);
				}
			}
			e.preventDefault();
			return false;
		} )
		.bind("contextmenu",function( e ){
				e.preventDefault();
				e.stopPropagation();
				_self.fireEvent("contextmenu", e);			
		}).mouseleave( function(e){
			_self.fireEvent("mouseleave", e);		
		} );	
		
		$(document).mouseup( function( e ){
			if (e.which == 1) {
				drag = false;
				//拖拽兼容IE
				if (this.releaseCapture) 
					this.releaseCapture();
			}
		} ).keydown( function( e ){
			_self.fireEvent( "keydown", e );	
		} ).keyup( function( e ){
			_self.fireEvent( "keyup", e );	
		} ).click(function( e ){
			_self.fireEvent( "globalClick", e );	
		});
		
		//依旧窗口大小更改战场场景大小
		$( window ).resize( function(){
			_self.onResize();
		} ).resize();
		
		//触发器
		var mem = 0, inter = 1000 / this.dps;
		this.timer = setInterval( function(){
			if (!_self.suspend) { //停止更新
				//TODO 优化为只需要重新的地方才清除
				ctx.clearRect( 0,0, MAX_W, MAX_H );
		
				_self.fireEvent("paint");
			}
		} , inter );
		
		//创建的顺序既是绘画时的先后顺序
		this._createCellLayer();
		this._createStaticLayer();
		this._createUnitLayer();
		this._createWinLayer();
		this._createMagicLayer();
		
		this.on( "keydown", this.onKeydown, this );			
		this.on( "globalClick", this.onGlobalClick, this );
		
		this.start();
			 		
		return this;		
	},
	
	onResize	: function( e ){
		var wTo = Math.min( $(window).width(), 960 ),
			hTo = Math.max( $(window).height() - 160 - 23, 250 ),
			wDiff = wTo - WINDOW_WIDTH,
			hDiff = hTo - WINDOW_HEIGHT;
			
		WINDOW_HEIGHT = hTo;
		WINDOW_WIDTH = wTo;
		
		this.ct.width( WINDOW_WIDTH );
		this.el.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
		this.moveWinTo( this.scrollLeft - wDiff, this.scrollTop  - hDiff  );
		log( "scrollTop : " + this.scrollTop + " scrollLeft : " + this.scrollLeft );
		
		this.masklayer.css( { width	: WINDOW_WIDTH, height	: WINDOW_HEIGHT	} );
		this.display.width( WINDOW_WIDTH );
	},

	onKeydown	: function( e ){
		log( "keydown : " + e.which );
		if ( this.speaking && ( e.which == 32 || e.which == 27 || e.which == 13 ) ){
			e.preventDefault();
			this.stopSpeak();
		}
	},	
	
	onGlobalClick		: function( e ){
		if ( this.speaking ){
			this.stopSpeak();
		}
	},
	
	_createCellLayer	: function(){
		if ( this.cellLayer )
			this.cellLayer.remove();
		
		this.cellLayer = LayerMgr.reg( 100, MAX_W, MAX_H, CellLayer );
	},
	_createUnitLayer	: function(){
		if ( this.unitsLayer )
			this.unitsLayer.remove();
		
		this.unitsLayer = LayerMgr.reg( 200, MAX_W, MAX_H, UnitLayer );
		this.unitsLayer.on( "battleOver", this.onBattleOver, this );
	},	
	_createStaticLayer	: function(){
		if ( this.staticLayer )
			this.staticLayer.remove();
		
		this.staticLayer = LayerMgr.reg( 300, MAX_W, MAX_H, StaticLayer );
		//更改地图属性
		this.staticLayer.on( "add", function( x, y, a ){
			//TODO 根据动画属性判断是否增加
			MAP[ y ][ x ]++;
		}, this ).on( "remove", function( x,y,a ){
			MAP[ y ][ x ] = Math.max( 0, --MAP[ y ][ x ] );
		}, this );
	},	
	_createWinLayer	: function(){
		if ( this.winLayer )
			this.winLayer.remove();
		
		this.winLayer = LayerMgr.reg( 400, MAX_W, MAX_H, WinLayer );
	},
	_createMagicLayer	: function(){
		if ( this.magicLayer )
			this.magicLayer.remove();
		
		this.magicLayer = LayerMgr.reg( 500, MAX_W, MAX_H, MagicLayer );
	},		
		
	start				: function(){
		Pocket.start();
		Toolbar.start();
		ScriptMgr.load();
		AIController.start();
		
		canvas.height = MAX_H;
		$( canvas ).show();

		//显示控制面板
		this.display.css( "visibility", "visible" );
		this.setBgImage( BGIMAGE );
		this.board = $( "._board" );
		//开始绘制战场
		this.suspend = false;		
		//报幕
		if ( UNDERCOVER )
			this.unitsLayer.start();
		else	
			this._showTopLine( CHAPTER, function(){
				this.unitsLayer.start();
			}, this );
	},
	
	//战场中间显示提示信息
	_showTopLine		: function( str, fn, scope ){
		this.mask();
		
		if ( this.lineTimer )
			clearTimeout( this.lineTimer );
		
		$("#maskUp").html( str ).css({
				height  : 100,
				width	: MAX_W,
				background : "",
				top		: (WINDOW_HEIGHT -100)/2 
				//top		: 25
		}).show();
		
		var _self = this;
		this.lineTimer =setTimeout( function(){
			_self._hideTopLine( fn , scope );
			_self.lineTimer=0;
		}, 1500 );			
	},
	
	showGoal		: function(){
		this.unitsLayer.showGoal.apply( this.unitsLayer, arguments );
	},	
	checkGoal		: function(){
		this.unitsLayer.checkGoal.apply( this.unitsLayer, arguments );
	},
	checkFail		: function(){
		this.unitsLayer.checkFail.apply( this.unitsLayer, arguments );
	},	
	//战场结束后
	onBattleOver	: function( win ){
		if ( win )
			this.victory();
		else
			this.failed();		
	},
	
	victory			: function(){
		this.showWhole( "胜利！", function(){
			window.location.reload();
		}, this );
	},
	failed			: function(){
		this.showWhole( "失败！", function(){
			window.location.reload();
		}, this );
	},
				
	//整个战场显示提示信息
	showWhole		: function( text, fn, scope ){
		this._showTopLine(  "" , fn, scope );
		$("#maskUp").html( text ).css({
			background : "",
			width	: MAX_W,
			height  : WINDOW_HEIGHT,
			top		:  23
		});
	},	
	_hideTopLine		: function( fn, scope ){
		var _self = this;
		$("#maskUp").fadeOut( 300, function(){
			_self.unmask();
			if ( fn )
				fn.call( scope || _self )			
		} );
	},
	//  options : [ { v : 返回值, t : 显示文字 }, { ... }, ... ] 
	choose			: function( title, options, fn, scope ){
		this._choose( null, title, options, fn, scope );
	},	
	//显示选择框
	_choose		: function( src, title, options, fn, scope ){
		this.mask();
		
		var ct = $("._options").clone(), _self = this, clicked = false;
		if ( src )
			ct.find(".face").show().find("img").attr("src", src );
		else
			ct.find(".face").hide();
				
		ct.find("h6").html( title );
		
		var sel = ct.find("ul");
		for (var i=0; i<options.length; i++) {
			$("<li>").attr( "value", options[i].v ).html( (i + 1) + ". " + options[i].t ).appendTo( sel );
		}
		sel.children("li").click( function(){
			if ( clicked )
				return;
			clicked = true;	
			var v =  $(this).attr("value");
			_self._hideTopLine( function(){
				$("#maskUp")[0].style.background = "";
				if ( fn )
					fn.call( scope || this, v );				
			} );
		} ).hover( function(){
			$(this).toggleClass("active");
		} );
		
		$("#maskUp").empty().append( ct.show() ).css({
				height  : 200,
				width	: MAX_W,
				background : "none",
				top		: (WINDOW_HEIGHT -200)/2
		}).show();
	},					
	
	showGrid			: function(){
		this.cellLayer.showGrid();
		return this;
	},

	hideGrid			: function(){
		this.cellLayer.hideGrid();
		return this;
	},
	
	//移动屏幕300ms后回调	
	moveWinTo			: function(x, y, fn, scope ){
		if (x != undefined) 
			this.el[0].scrollLeft = (this.scrollLeft = x);
		
		if (y != undefined) 
			this.el[0].scrollTop = (this.scrollTop = y);
		
		if ( fn )
			setTimeout( bind( fn, scope || PANEL ), 300 );
			
		return this;			
	},
	
	moveWinBy		: function( x, y, fn, scope ){
		x = x || 0;
		y = y || 0;
		
		x = this.el[0].scrollLeft + x;
		y = this.el[0].scrollTop + y;
		
		this.moveWinTo( x, y, fn, scope );
		
		return this;
	},
	
	moveToCell	: function( cell, fn, scope ){
		var cx = WINDOW_WIDTH /2, cy = WINDOW_HEIGHT /2,
			dx = Math.max(cell.dx - cx, 0), dy = Math.max( cell.dy - cy, 0 );
		
		this.moveWinTo( dx, dy, fn, scope );
	},
	//判断单元格是否在窗口内
	isInside		: function( cell ){
		var dx = cell.dx, dy = cell.dy;
		
		if ( dx < (this.scrollLeft - CELL_WIDTH ) || dx > this.scrollLeft + WINDOW_WIDTH - CELL_WIDTH )
			return false;
		if ( dy < (this.scrollTop - CELL_HEIGHT  ) || dy > this.scrollTop + WINDOW_HEIGHT - CELL_HEIGHT )
			return false;
		
		return true;
	},
	
	//设置背景图片
	setBgImage	: function( url ){
		if ( !UNDERCOVER )
			canvas.style.background = "url('" + url + "') no-repeat";
			
		return this;
	},
	
	showUnitAttr		: function( unit ){
		if ( UNDERCOVER )
			return;
			
		$("._board ._face img").attr( "src", unit.face );
		$("#hp").text( unit.hp + "/" + unit.hpMax );
		$("#mp").text( unit.mp + "/" + unit.mpMax );
		
		$("#rolename").text( unit.name );
		$("#rolelevel").text( unit.level );
		$("#roleexp").attr( "title", unit.exp + "/" + unit.nextExp() );
		$("#roleexpline").width( 236 * Math.min( 1, unit.exp / unit.nextExp() ) );
		
		$("#roleatknum").text( unit.atknumMin + " - " + unit.atknumMax );
		$("#rolestrength").text( unit.strength );
		$("#roleagility").text( unit.agility );
		$("#roleintelligence").text( unit.intelligence );
		$("#roledefnum").text( unit.defnum );
		//添加状态
		var statusDom = $("._status");
		for( var name in unit.buff ){
			var buff = unit.buff[ name ];
			var img = $("<img>").attr({
				src : buff.src, width : 16, height : 16
			});
			$("<a>").attr( "title", buff.desc || "" ).append( img )
				.appendTo( statusDom );
		}
		
		this.board.show();
		return this;
	},
	
	hideUnitAttr	: function(){
		this.board.hide();
	},
	
	speaking		: false,	
	speakTimer		: 0,	
	speakText		: "",
	speakUnit		: null,
	speak			: function( unit, text ){
		if (this.speaking)
			this.clearSpeak();
		
		this.hideUnitAttr();	
		this.speaking = true;
		this.speakUnit = unit;
		
		if ( !UNDERCOVER )	
			$("#face").attr( "src", unit.face );
		$("._speak h2").text( unit.name );
		$("._speech").show();
		
		//动画显示
		var i = 0 , board = $("._speak p"), _self = this, l = text.length;
		this.speakText = text;
		this.speakTimer = setInterval( function(){
			i = i + 3;
			if ( i >= l ){
				_self.stopSpeakAnimate();
			}else{
				board.html( text.slice( 0, i ) );	
			}
		}, 150 );
	},
	stopSpeak		: function(){
		if ( this.speakTimer ){
			this.stopSpeakAnimate();
		} else {
			this.clearSpeak();
		}
	},
	stopSpeakAnimate : function(){
		clearInterval(this.speakTimer);
		this.speakTimer = 0;
		$("._speak p").html( this.speakText );
	},
	//取消显示并回调函数
	clearSpeak		: function(){
		this.speaking = false;
		//this.stopSpeakAnimate();
		
		$("#face").removeAttr( "src" );
		$("._speak p").html("");
		$("._speech").hide();
				
		if (this.speakUnit) {
			this.speakUnit.stopSpeak();
			delete this.speakUnit;
		}
	},
	
	getCell	: function( x, y ){
		if ( typeof x == "number" )
			return CellMgr.get( x, y );
			
		var p = getPoints( x, y );
		return CellMgr.get( p.x, p.y );
	},
	
	getUnitByIndex			: function( index ){
		return this.unitsLayer.getUnitByIndex( index );
	},
	
	getUnitById	: function( id ){
		return this.unitsLayer.getUnitById( id );
	},
		
	popActionMenu		: function( unit, x, y ){
		this.winLayer.popActionMenu( unit, x, y );
		return this;
	},
	
	mask		: function (){
		this.masklayer.show();
		return this;			  
	},

	unmask 		: function (){
		this.masklayer.hide();
		return this;	
	},
	
	//script 采取计数器方式 当减到0时触发停止执行
	runScript		: function(){
		this.scripting++;
		this.fireEvent( "runScript", this );
	},
	stopScript	: function(){
		this.scripting--;
		if ( !this.isScripting() )
			this.fireEvent( "stopScript", this );
	},
	isScripting	: function(){
		return this.scripting > 0;
	},
	addStatic	: function(){
		this.staticLayer.add.apply( this.staticLayer, arguments );
		return this;
	},
	//延迟多少毫秒
	sleep		: function( ms, fn, scope ){
		setTimeout( function(){
			if ( fn )
				fn.call( scope || this, this );
		}, ms );
	},	
		
	playAnimation	: function( a, dx, dy, fn, scope ){
		if ( typeof a == "string" ){
			a = Animation.get( a, { dx : dx, dy : dy, fn : fn, scope : scope } );
		}
		
		this.magicLayer.add( a );
	},
	lightenCell	: function( cell, fn, scope ){
		if ( !( cell instanceof Cell ) ){
			cell = CellMgr.get( cell.x, cell.y );
		}
		this.moveToCell( cell );
		this.cellLayer.paintCells( ATTACKCOLOR, cell );
		
		//2s后回调
		var _self = this;
		setTimeout( function(){
			_self.cellLayer.paintCells( ATTACKCOLOR, {} );
			if ( fn )
				fn.call( scope || this );
		}, 2000 );
	},
	lightenUnit	: function( unit, fn, scope ){
		if ( !( unit instanceof Unit ) ){
			unit = this.getUnitById( unit );
		}
		this.moveToCell( unit.cell );
		this.cellLayer.paintCells( ATTACKCOLOR, unit.cell );
		unit.major = true;		//显示主要信息
		
		//2s后回调
		var _self = this;
		setTimeout( function(){
			unit.major = false;
			_self.cellLayer.paintCells( ATTACKCOLOR, {} );
			if ( fn )
				fn.call( scope || this );
		}, 2000 );
	},		
	gainStuffOnCell	: function( x, y, stuff, num, fn, scope ){
		log( "panel gainStuffOnCell : x = " + x + " y = " + y + " stuff = " + stuff );
		var cell = this.getCell( x, y ), unit;
		if ( cell && (unit = this.getUnitByIndex( cell.index )) ){
			unit.gainStuff( stuff, num, fn, scope ) 
		}else if ( fn )
			fn.call( scope || this );
	}
});

/**
 * 战场参数
 */
var 
//队伍集合
TEAMS	= [{
	faction : 1, team : 100, name : "我军"
},{
	faction : 1, team : 200, name : "友军"
},{
	faction : 0, team : 1, name : "敌军"
}],
//形象集合
FIGURES = {
	"caocao"	: {
		imgMove	:"images/move/109-1.png",
		imgAtk	: "images/atk/109-1.png",
		imgSpc	: "images/spc/109-1.png",
		imgFace	: "images/face/1-1.png"		
	},
	"liubei"	: {
		imgMove	:"images/move/145-1.png",
		imgAtk	: "images/atk/145-1.png",
		imgSpc	: "images/spc/145-1.png",
		imgFace	: "images/face/40-1.png"		
	},	
	"guanyu"	: {
		imgMove	:"images/move/146-1.png",
		imgAtk	: "images/atk/146-1.png",
		imgSpc	: "images/spc/146-1.png",
		imgFace	: "images/face/14-1.png"		
	},	
	"zhangfei"	: {
		imgMove	:"images/move/147-1.png",
		imgAtk	: "images/atk/147-1.png",
		imgSpc	: "images/spc/147-1.png",
		imgFace	: "images/face/41-1.png"		
	},			
	"xuzijiang"	: {
		imgMove	:"images/move/80-1.png",
		imgAtk	: "images/atk/80-1.png",
		imgSpc	: "images/spc/80-1.png",
		imgFace	: "images/face/214-1.png"		
	},			
	"cavalryman"	: {  //骑兵
		imgMove	:"images/move/14-1.png",
		imgAtk	: "images/atk/14-1.png",
		imgSpc	: "images/spc/14-1.png",
		imgFace	: "images/face/181-1.png"			
	},	
	"archer"	: {
		imgMove	:"images/move/26-1.png",
		imgAtk	: "images/atk/26-1.png",
		imgSpc	: "images/spc/26-1.png",
		imgFace	: "images/face/178-1.png"			
	},
	"footman" :	{
		imgMove	:"images/move/1-1.png",
		imgAtk	: "images/atk/1-1.png",
		imgSpc	: "images/spc/1-1.png",
		imgFace	: "images/face/23-1.png"			
	},
	"huangjinjun"	: {
		imgMove	:"images/move/103-1.png",
		imgAtk	: "images/atk/103-1.png",
		imgSpc	: "images/spc/103-1.png",
		imgFace	: "images/face/192-1.png"			
	},		
	"sushiBlue" :	{
		imgMove	:"images/move/84-1.png",
		imgAtk	: "images/atk/84-1.png",
		imgSpc	: "images/spc/84-1.png",
		imgFace	: "images/face/154-1.png"			
	},	
	"enchanterYellow"	:  {  //魔法师
		imgMove	:"images/move/71-1.png",
		imgAtk	: "images/atk/71-1.png",
		imgSpc	: "images/spc/71-1.png",
		imgFace	: "images/face/176-1.png"			
	},
	"footmanYellow" :	{
		imgMove	:"images/move/2-1.png",
		imgAtk	: "images/atk/2-1.png",
		imgSpc	: "images/spc/2-1.png",
		imgFace	: "images/face/180-1.png"			
	},
	"archerYellow"	: {
		imgMove	:"images/move/23-1.png",
		imgAtk	: "images/atk/23-1.png",
		imgSpc	: "images/spc/23-1.png",
		imgFace	: "images/face/16-1.png"			
	}		
},

ACTIONGROUPS   = [{
	desc: "测试",
	event:{
		active	: false,
		type	: 3,
		name	: "battleStart"
	},	
	actions	: [{
		type	   : 2,
		action : "playAnimation",
		params : [ "zhuque", 240, 160 ]
	}]
},
			// --------------------------------------刘备攻击------------------------------------------------
{
	desc: "刘备攻击",
	event:{
		active : true,
		type	: 1,
		id		: "liubei",
		name   : "preAttack",
		condition : [{
			script : "ROUND < 3"
		}]
	},
	actions : [{
		id			: "liubei",
		action : "speak",
		params : [ "这是万民的愤怒！" ]
	}]	
},
				// -------------------------------------------走到张梁附近-------------------------------------------
{
	desc: "走到张梁附近",
	event:{
		active : true,
		type	: 1,
		id		: "caocao",
		name   : "standby",
		condition : [{
			script : " PANEL.getUnitById('caocao').isAround('zhangliang') "
		}]
	},
	actions : [{
		id	   : "caocao",
		action : "speakTo",
		params : [ "zhangliang", "你就是张梁吧，虽然身为贼军，毕竟也是一军之将，干脆乖乖投降吧。" ]
	},{
		id	   : "zhangliang",
		action : "speakTo",
		params : [ "caocao", "少废话，看我宰了你！" ]
	},{
		id	   : "caocao",
		action : "speakTo",
		params : [ "zhangliang", "贼军就是贼军，如此不识实务，不配做以军之将，哼！" ]
	}]	
},
			// -------------------------------------------开场白-------------------------------------------
{
	desc	: "开场白",
	event	: {
		active	: true,
		type	: 3,
		name	: "battleStart"
	},
	actions	: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 1000 ]
	},{
		id		: "first",
		action : "speakTo",
		params : [ "firstDie", "去死吧" ]
	},{
		id		: "first",
		action : "attack",
		params : [ "firstDie" ]
	},{
		id		: "second",
		action : "excite",
		params : [ "啊" ]
	},{
		id		: "second",
		action : "attack",
		params : [ "secondDie" ]
	},{
		id		: "thirdDie",
		action : "fall"
	},{
		id		: "thirdDie",
		action : "speak",
		params : [ "呼、呼、哈……支持不了！<br/>再这样下去，我们会全军覆没的。" ]
	},{
		id		: "foota",
		action : "speak",
		params : [ "可恶，黄巾军的人越来越多。" ]
	},{
		id		: "foota",
		action : "turnRight"
	},{
		id		: "foota",
		action : "speak",
		params : [ "再过一会儿骑兵队会来增援的。无论无何都要顶住！" ]
	},{
		id		: "footb",
		action : "turnRight"
	},{
		id		: "footb",
		action : "speak",
		params : [ "可是依我看，还是保住自家性命要紧，现在的官军谁不这么想！" ]
	},{
		id		: "footb",
		action : "turnUp"
	},{
		id		: "footb",
		action : "speak",
		params : [ "何况咱们这里是战况最激烈的颍川，我看腐败的官军不会派兵赶来送死的。" ]
	},{
		id		: "foota",
		action : "turnLeft"
	},{
		id		: "foota",
		action : "speak",
		params : [ "话虽如此，不过援军的骑兵队长是曹操，听说他是个厉害角色。" ]
	},{
		id		: "foota",
		action : "turnUp"
	},{
		id		: "foota",
		action : "speak",
		params : [ "就信他这次吧。<br/>如今也只有等他来了。" ]
	},{
		id		: "thirdDie",
		action : "speak",
		params : [ "快、快点来吧！" ]
	},{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 300 ]
	},{
		id		: "zhangbao",
		action : "turnRight"
	},{
		id		: "zhangbao",
		action : "speak",
		params : [ "对方可真顽强。" ]
	},{
		id		: "zhangliang",
		action : "speak",
		params : [ "哼，迟早要打败他们的！可恶的官军，竟然攻打这里！一定要让他们后悔。" ]
	},{
		id		: "zhangbao",
		action : "turnDown",
		next	: -1
	}]
},{
	desc: "友军阶段1",
	event: {
		active : true,
		type: 3,
		name: "teamStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "FRIENDS"
		}]
	},
	actions: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 1000 ]
	},{
		id	: "foota",
		action : "swing"
	},{
		id	: "foota",
		action : "speak",
		params : ["再坚持一会儿！<br/>让他们知道官军不是好惹的！"],
		next	: -1
	}]
},
				// -------------------------------------------刘备登场-------------------------------------------
{
	desc: "敌军阶段1",
	event: {
		active : true,
		type: 3,
		name: "teamStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "ENEMY"
		},{
			index : 1,
			symbol : "==",
			compare : "1"
		}]
	},
	actions: [{
		type	: 2,
		action : "moveWinTo",
		params : [ 400, 0 ]
	},{
		id			: "liubei",
		action : "appear"
	},{
		id			: "guanyu",
		action : "appear"
	},{
		id			: "zhangfei",
		action : "appear"
	},{
		id	: "liubei",
		action : "speak",
		params : ["看起来好像赶上了。不过在这种寡不敌众的情况下，此地的官军好像也陷入了苦战。"]
	},{
		id	: "guanyu",
		action : "speakTo",
		params : [ "liubei", "咱们应该里外夹攻，不过我军兵力还是少了些。"]
	},{
		id	: "zhangfei",
		action : "speakTo",
		params : [ "liubei", "二哥就会穷担心，我一个人就可以应付他们了。"]
	},{
		id	: "liubei",
		action : "speakTo",
		params : [ "zhangfei", "咱们可不能丢下官军不管，从背后抄过去直捣鹿岩吧。<br/>冲啊！"]
	},{
		id	: "liubei",
		action : "go",
		params : [ { x : 11, y : 5 } ]
	},{
		id	: "guanyu",
		action : "go",
		params : [ { x : 10, y : 5 } ]
	},{
		id	: "zhangfei",
		action : "go",
		params : [ { x : 12, y : 5 } ]
	}]
},
		// ---------------------------------------------角色阵亡-----------------------------------------
{
	desc: "友军弓兵firstDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "firstDie",
		name	: "preDead"
	},
	actions : [{
		id		: "firstDie",
		action : "speak",
		params : [ "可，可恨……" ],
		next	: -1		
	}]
},{
	desc: "友军术士secondDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "secondDie",
		name	: "preDead"
	},
	actions : [{
		id		: "secondDie",
		action : "speak",
		params : [ "啊……" ],
		next	: -1		
	}]
},{
	desc: "友军弓兵thirdDie阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "thirdDie",
		name	: "preDead"
	},
	actions : [{
		id		: "thirdDie",
		action : "speak",
		params : [ "唔，援军……援军还不来吗……？" ],
		next	: -1		
	}]
},{
	desc: "张宝阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "zhangbao",
		name	: "preDead"
	},
	actions : [{
		id		: "zhangbao",
		action : "speak",
		params : [ "难道我真的要死在这里？唔……" ],
		next	: -1		
	}]
},{
	desc: "张梁阵亡1",
	event:{
		active	: true,
		type	: 1,
		id		: "zhangliang",
		name	: "preDead"
	},
	actions : [{
		id		: "zhangliang",
		action : "speak",
		params : [ "可恨，竟然败在这帮家伙手上……" ],
		next	: -1		
	}]
},{
	desc: "第二回合开始",
	event:{
		active : true,
		type: 3,
		name: "roundStart",
		condition : [{
			index : 0,
			symbol : "==",
			compare : "2"
		}]
	},
	actions : [{
		id		: "liubei",
		action : "followMe"
	},{
		id		: "liubei",
		action : "speak",
		params : [ "二弟、三弟，等一等，这样下去前面的官军会被歼灭，在这里放火吧。" ]
	},{
		id		: "guanyu",
		action : "speak",
		params : [ "对！把他们的注意力引到这里……说不定敌人也会因此动摇的。" ]
	},{
		id		: "zhangfei",
		action : "speak",
		params : [ "那我去放火。" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "我可不想双方有太多人无辜丧命，你可要把握好分寸。" ]
	},{
		id		: "zhangfei",
		action : "swing"
	},{
		type : 2,	
		action : "addStatic",
		params : [ "fire", 13, 5 ] 
	},{
		id		   : "guanyu",
		action : "go",
		params : [ { x : 8, y : 5 } ] 
	},{
		id		   : "guanyu",
		action : "speak",
		params : [ "这里也点上" ] 
	},{
		id		   : "guanyu",
		action : "swing"
	},{
		type : 2,	
		action : "addStatic",
		params : [ [{ name : "fire", x : 7, y : 5 }, { name : "fire", x : 6, y : 4 }]  ] 
	},{
		type : 2,	
		action : "sleep",
		params : [ 500 ] 
	},{
		id		   : "zhangfei",
		action : "turnRight"
	},{
		id		   : "zhangfei",
		action : "turnLeft"
	},{
		id		   : "zhangfei",
		action : "turnDown"
	},{
		id		   : "zhangfei",
		action : "swing"
	},{
		id		   : "zhangfei",
		action : "speak",
		params : [ "不行、不行啊，火势太小了，根本烧不到鹿岩！" ]
	},{
		id		   : "xuzijiang",
		action : "speak",
		params : [ "呵、呵、呵，那么这样呢？" ]
	},{
		id		   : "guanyu",
		action : "turnRight"
	},{
		id		   : "guanyu",
		action : "speak",
		params : [ "咦？" ]
	},{
		id		   : "zhangfei",
		action : "turnLeft"
	},{
		id		   : "zhangfei",
		action : "speak",
		params : [ "谁？！" ]
	},{
		type	   : 2,
		action : "playAnimation",
		params : [ "zhuque", 240, 160 ]
	},{
		type : 2,	
		action : "addStatic",
		params : [ [{ name : "fire", x : 15, y : 5 }, { name : "fire", x : 15, y : 6 } , { name : "fire", x : 15, y : 7 },
						   { name : "fire", x : 14, y : 4 }, { name : "fire", x : 14, y : 5 } , { name : "fire", x : 14, y : 6 },  { name : "fire", x : 14, y : 7 } , { name : "fire", x : 14, y : 8 },
						   { name : "fire", x : 13, y : 6 }, { name : "fire", x : 13, y : 7 } , { name : "fire", x : 13, y : 8 },  { name : "fire", x : 13, y : 9 },
						   { name : "fire", x : 12, y : 6 }, { name : "fire", x : 12, y : 7 } ,
						   { name : "fire", x : 7, y : 6 }, { name : "fire", x : 7, y : 7 } , 
						   { name : "fire", x : 6, y : 5 }, { name : "fire", x : 6, y : 6 } , { name : "fire", x : 6, y : 7 }, { name : "fire", x : 6, y : 8 } , { name : "fire", x : 6, y : 9 },
						   { name : "fire", x : 5, y : 6 }, { name : "fire", x : 5, y : 7 } , { name : "fire", x : 5, y : 8 }]  ] 
	},{
		type	: 2,
		action		: "sleep",
		params : [ 500 ]
	},{
		id		: "fluster",
		action : "followMe"
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "turnRight"
	},{
		id		: "fluster",
		action : "turnLeft"
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "turnDown"
	},{
		id		: "fluster",
		action : "speak",
		params : [ "火！火！" ]
	},{
		id		: "fluster",
		action : "turnUp"
	},{
		id		: "fluster",
		action : "speak",
		params : [ "敌人从后面包抄过来了！" ]
	},{
		id	: "zhangliang",
		action : "turnUp"
	},{
		id		: "zhangliang",
		action : "speak",
		params : [ "什么？你说有人偷袭……" ]
	},{
		id	: "zhangbao",
		action : "turnUp"
	},{
		id		: "zhangbao",
		action : "speak",
		params : [ "是官军的援兵吗？" ]
	},{
		id	: "zhangbao",
		action : "turnDown"
	},{
		id		: "zhangbao",
		action : "swing"
	},{
		id		: "zhangbao",
		action : "speak",
		params : ["派人对付后面的敌人！"]
	},{
		id		: "zhangbao",
		action : "fall"
	},{
		id		: "zhangbao",
		action : "speak",
		params : ["糟了……全部都不听使唤……"]
	},{
		type	: 3,
		group	: "ENEMY",	
		action : "addBuff",
		params : [ "confuse" ]
	},{
		id		: "guanyu",
		action : "speak",
		params : [ "啊！" ]
	},{
		id		: "zhangfei",
		action : "turnDown"
	},{
		id		: "zhangfei",
		action : "speak",
		params : [ "这是怎么回事？！" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "不知道，现在管不了那么多了，眼前才是最重要的！" ]
	},{
		id		: "liubei",
		action : "swing"
	},{
		id		: "liubei",
		action : "speak",
		params : [ "如今敌人一片混乱，正是取胜的好机会！目标是敌军主将张宝、张梁。" ]
	},{
		id		: "liubei",
		action : "speak",
		params : [ "冲吧。" ]
	}, 
	// ---------------------------------------------曹操登场-----------------------------------------
	{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 0 ]
	},{		
		id		: "qibing1",
		action : "appear"
	}, {		
		id		: "qibing2",
		action : "appear"
	}, {		
		id		: "caocao",
		action : "appear"
	}, {		
		id		: "caocao",
		action : "go",
		params : [  { x : 8, y : 2 }  ]
	}, {		
		id		: "qibing1",
		action : "go",
		params : [  { x : 7, y : 2 }  ]
	}, {		
		id		: "qibing2",
		action : "go",
		params : [  { x : 8, y : 1 }  ]
	} ,{		
		id		: "caocao",
		action : "speak",
		params : [  "听说这边的官军正在苦战，这火势是……？！"  ]
	}, {		
		id		: "qibing2",
		action : "speakTo",
		params : [  "caocao", "队长，好像是那边的人放的火，不过不像是官军……"  ]
	},{		
		id		: "caocao",
		action : "speak",
		params : [  "恩，好像是义军。"  ]
	},{		
		id		: "caocao",
		action : "speakTo",
		params : [  "qibing2", "你们先去鹿岩，我到义军那边看看！"  ]
	}, {		
		id		: "qibing2",
		action : "speakTo",
		params : [  "caocao", "是"  ]
	}, {		
		id		: "qibing1",
		action : "speakTo",
		params : [ "caocao",  "是"  ]
	}, {		
		id		: "qibing2",
		action : "go",
		params : [  { x : 9,  y : 7 }  ]
	},  {		
		id		: "qibing2",
		action : "turnDown"
	},{		
		id		: "qibing1",
		action : "go",
		params : [  { x : 10,  y : 7 }  ]
	},{		
		id		: "qibing1",
		action : "turnDown"
	}, {		
		id		: "caocao",
		action : "go",
		params : [  { x : 11,  y : 4 }  ]
	}, {		
		id		: "caocao",
		action : "speakTo",
		params : [ "liubei", "我是官军骑兵队长，姓曹名操字孟德。奉朝廷之命讨伐黄巾军，请问阁下尊姓大名。"  ]
	}, {		
		id		: "liubei",
		action : "speakTo",
		params : [ "caocao", "我是刘备刘玄德，虽然只是农民出身，但看到当今天下大乱，为了拯救百姓，才率领义兵讨伐的。"  ]
	}, {		
		id		: "liubei",
		action : "speak",
		params : [ "希望让我与两位兄弟增援官军，一切还请曹大人差遣。"  ]
	},{		
		id		: "caocao",
		action : "speak",
		params : [ "多亏了玄德兄，黄巾军已经陷入混乱，我也没必要下达什么指示了。"  ]
	},{		
		id		: "caocao",
		action : "speak",
		params : [ "只要击毙鹿岩中的两人便可，你们还是自行奋战吧，那么后会有期。"  ]
	},{		
		id		: "caocao",
		action : "go",
		params : [ { x : 10, y : 6 }  ]
	},{		
		id		: "caocao",
		action : "turnDown"
	},{		
		id		: "liubei",
		action : "go",
		params : [ { x : 9, y : 6 }  ]
	},{		
		id		: "liubei",
		action : "turnDown"
	},{		
		type	: 2,
		action : "showGoal"
	},{		
		type	: 2,
		action : "lightenUnit",
		params : [ "zhangbao" ]
	},{		
		type	: 2,
		action : "lightenUnit",
		params : [ "zhangliang" ]
	},
	// ---------------------------------------------许子将登场-----------------------------------------
	{
		type	: 2,
		action : "moveWinTo",
		params : [ 0, 0 ]
	},{		
		id			: "xuzijiang",
		action : "appear"
	},	{		
		id			: "xuzijiang",
		action : "speakTo",
		params : [ "caocao", "终于要开战了，曹大人。" ]
	},{		
		id			: "caocao",
		action : "speakTo",
		params	: [ "xuzijiang", "哦？你是刚才那位给我看相的老人家，为何会到战场来？" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "因为我听人家说，这是曹大人第一次上阵，所以就赶来了。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "我来主要是想告诉你一些……战场上应该注意的基本要点。曹大人，不知您意下如何？" ]
	},{		
		type		: 2,
		action : "choose",
		params	: [ "", [{ t : "真是求之不得", v : ">" }, { t : "没有这个必要", v : ">" }] ]
	},{		
		id			: "caocao",
		action : "speak",
		params	: [ "老人家的好意我心领了。曹某毕竟也是通晓兵法之人，我看就不用劳烦赐教了。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "原来如此，真不愧是曹大人。您就当这是老头子的多虑，请别放在心上。" ]
	},{		
		id			: "xuzijiang",
		action : "speak",
		params	: [ "那小老儿告辞了。<br/>呵、呵、呵、呵。" ]
	},{		
		id			: "xuzijiang",
		action : "disappear"
	},{		
		id			: "caocao",
		action : "turnDown"
	},{		
		type		: 2,
		action : "showWhole",
		params	: [ "开始作战" ],
		next		: -1
	}
	]
},
			// ---------------------------------------------获得物品-----------------------------------------
{
	desc: "获得物品1",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "13"
		},{
			index : 2,
			symbol : "==",
			compare : "12"
		},{
			script : " arguments[0].isFriend( FACTION ) "
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 13, 12, 1, 1 ],
		next	: -1		
	}]
},{
	desc: "获得物品2",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "13"
		},{
			index : 2,
			symbol : "==",
			compare : "13"
		},{
			script : " arguments[0].isFriend( FACTION ) "
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 13, 13, 1, 1 ],
		next	: -1		
	}]
},{
	desc: "获得物品3",
	event:{
		active : true,
		type: 3,
		name: "enter",	//unit cell.x cell.y
		condition : [{
			index : 1,
			symbol : "==",
			compare : "9"
		},{
			index : 2,
			symbol : "==",
			compare : "11"
		},{
			script : " arguments[0].isFriend( FACTION ) "
		}]		
	},
	actions : [{
		type: 2,
		action : "gainStuffOnCell",
		params : [ 9, 11, 1, 1 ],
		next	: -1		
	}]
},		
	// ---------------------------------------------从死者身上搜刮物品-----------------------------------------
{
	desc: "从死者身上搜刮物品1",
	event:{
		active : true,
		type	: 1,
		id		: "zhangbao",
		name   : "dead"
	},
	actions : [{
		id			: "zhangbao",
		action : "award",
		params : [ "taipingqing", 1 ]
	}]	
},	
		// ---------------------------------------------胜利之后-----------------------------------------
{
	desc: "胜利之后",
	event:{
		active : true,
		type	: 3,
		name   : "battleWin"
	},
	actions : [{		
		type :3 ,
		group	: "ENEMY",
		action : "disappear"
	},{
		id		: "caocao",
		action : "followMe"
	},{
		id		: "caocao",
		action : "speakTo",
		params  : [ "liubei", "玄德兄只有义军之名，未免可惜，不如和我一起共事吧？" ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "caocao", "如今尚有许多地方战火未息，因此虽然承蒙好意相邀，我们还是必须前往讨贼。" ]
	},{
		id		: "caocao",
		action : "speak",
		params  : [ "是吗，那么我也不便勉强，我还有别的任务，那就后会有期了，改日相见了。" ]
	},{
		id		: "caocao",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "qibing1",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "qibing2",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "foota",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "footb",
		action : "go",
		params : [ { x :  10,  y : 18 } ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "guanyu", "此人和以往所见官军不同，叫做曹操吗？……" ]
	},{
		id		: "guanyu",
		action : "speakTo",
		params  : [ "liubei", "乱世之势不可预测，获许日后还会再见。" ]
	},{
		id		: "liubei",
		action : "speakTo",
		params  : [ "guanyu", "好，我们就一面收拾黄巾军的余孽，一面前往公孙瓒的阵营，到那之后再考虑将来吧。" ]
	},{
		id		: "zhangfei",
		action : "speakTo",
		params  : [ "liubei", "好，怎么都行，能吃饱饭就行，哈哈哈哈！" ],
		next	: -1
	}]
},	
			// ---------------------------------------------检查胜利/失败-----------------------------------------
{
	desc: "检查胜利1",
	event:{
		active : true,
		type	: 1,
		id	   : "zhangbao",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkGoal"
	}]
},{
	desc: "检查胜利2",
	event:{
		active : true,
		type	: 1,
		id	   : "zhangliang",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkGoal"
	}]
},{
	desc: "检查失败1",
	event:{
		active : true,
		type	: 1,
		id	   : "caocao",
		name   : "dead"		
	},
	actions : [{
		type: 2,
		action : "checkFail"
	}]
},{
	desc: "检查失败2",
	event:{
		active : true,
		type	: 3,
		name   : "roundEnd",
		condition : [{
			index : 0,
			symbol : ">=",
			compare : "10"
		}]		
	},
	actions : [{
		type: 2,
		action : "checkFail"
	}]
}	
],

CHAPTER = "颍川之战",
BGIMAGE	= PATH + "images/bigmap/1-1.jpg",
GOAL = "胜利条件<br/>&nbsp;&nbsp;击毙张宝和张良!<br/>限制回合数&nbsp;10",
VICTORYN = 2,	//已达成胜利的条件数  当达到一定数量后获得胜利
FAILEDN = 1, 	//已失败的条件数   达到一定数量后失败

/*
	0  可以行走
	1  不可行走
*/
MAP	= 	[
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ],
			[ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ]
		]
		;  

		
		/**
 * 玩家存储的信息
 */
var 
//UNIT集合，配置项参考UNIT类
UNITS	= [{
	id: "caocao", gx :  7,  gy : 0, range : 1, rangeType : 2, hpMax : 110, step:7, hp : 110, symbol	: "caocao", 
	magicNames	: [ "light", "storm" ], direct : "down",  burst	:  35,
	faction : 1, team : 100, mpMax : 100, mp : 100, name : "曹操", level : 1,  visiable : false	
},{
	id: "qibing1", gx :  6,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "cavalryman", direct : "down",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "骑兵", level : 1, attackFreqMax : 1, visiable : false, face : "images/face/180-1.png"	
},{
	id: "qibing2", gx :  5,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "cavalryman", direct : "down",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "骑兵", level : 1, attackFreqMax : 1, visiable : false	
},{
	id: "xuzijiang", gx :  9,  gy : 0, range : 1, rangeType : 2, hpMax : 110, hp : 110, symbol	: "xuzijiang",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "许子将", level : 1, visiable : false	
},

//友军
{
	id: "liubei", gx :  14,  gy : 1, range : 1, rangeType : 2,  burst	:  35,  hpMax : 110, hp : 110, symbol	: "liubei",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "刘备", level : 1, visiable : false	
},{
	id: "guanyu", gx :  13,  gy : 2, range : 1, rangeType : 2,  burst	:  35, hpMax : 110, hp : 110, symbol	: "guanyu",
	faction : 1, team : 200, mpMax : 10,  attackFreqMax : 2,  mp : 10, name : "关羽", level : 1, visiable : false	
},{
	id: "zhangfei", gx :  13,  gy : 1, range : 1, rangeType : 2,  burst	:  35, hpMax : 110, hp : 110, symbol	: "zhangfei",
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "张飞", level : 1, visiable : false	
},
{
	id: "firstDie", gx :  7,  gy : 16, range : 2, rangeType : 3, hpMax : 110, hp : 1, symbol	: "archerYellow", miss : 0,
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓箭兵", level : 1, face : "images/face/183-1.png",
	visiable : true	 	
},{
	id : "thirdDie", direct:"up", gx :  12,  gy : 17, range : 2, rangeType : 3, hpMax : 110, hp : 20, symbol	: "archerYellow",
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "弓兵", level : 1, face : "images/face/184-1.png"	, visiable : true	
},{
	id : "foota", direct:"up", gx :  10,  gy : 17, revenge	:  35,  burst	:  15,  range : 1, rangeType : 1, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/182-1.png"	, visiable : true	
},{
	id : "footb", direct:"up", gx :  9,  gy : 18, revenge	:  35, burst	:  15, range : 1, rangeType : 1, hpMax : 110, hp : 110, symbol	: "footmanYellow", 
	 faction : 1, team : 200, mpMax : 10, mp : 10, name : "步兵", level : 1, face : "images/face/185-1.png"	, visiable : true	
},{
	id : "secondDie", gx :  12,  gy : 16, range : 1, rangeType : 2, hpMax : 110, hp : 1, symbol	: "enchanterYellow", miss : 0, 
	faction : 1, team : 200, mpMax : 10, mp : 10, name : "术士", level : 1, face : "images/face/173-1.png", visiable : true	 	
},

//敌军
{
	 id : "zhangbao", gx :  9,  gy : 11, range : 1, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue", step : 1, defnum : 10,
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张宝", level : 5, face : "images/face/154-1.png"	
},{
	 id : "zhangliang", gx :  10,  gy : 11, range : 1, rangeType : 2, hpMax : 92, hp : 92, symbol	: "sushiBlue", step : 1, defnum : 10,
	 faction : 0, team : 1, mpMax : 48, mp : 48, name : "张梁", level : 5, face : "images/face/155-1.png"	
},{
	gx :  5,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  5,  gy : 11, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "fluster2", gx :  8,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	, face : "images/face/179-1.png"
},{
	gx :  7,  gy : 11, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "fluster", gx :  12,  gy : 10, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun", step : 1,
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  12,  gy : 12, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  9,  gy : 14, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  10,  gy : 14, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  9,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	gx :  10,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true	
},{
	id : "second", gx :  12,  gy : 15, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", visiable : true
},{
	id : "first", gx :  6,  gy : 16, range : 1, rangeType : 2, hpMax : 90, hp : 90, symbol	: "huangjinjun",
	 faction : 0, team : 1, mpMax : 5, mp : 5, name : "黄巾军", direct : "right", visiable : true, face : "images/face/179-1.png"
}]
;  

		
		/**
 * 程序主入门
 */
$(function(){
	
	if ( $.browser.msie )
		return false;
	
	//初始化进度条
	var process = new Process();
	
	process.on("end", function(){
		log( "process end" );
		SoundMgr.load();
		var p = new Panel();
	}).start();	
	
	
		
 });	
	
	
})();

