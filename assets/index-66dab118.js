(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function Tc(t){const e=Object.create(null);for(const n of t.split(","))e[n]=1;return n=>n in e}const Le={},es=[],Zt=()=>{},Q_=()=>!1,aa=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&(t.charCodeAt(2)>122||t.charCodeAt(2)<97),Ic=t=>t.startsWith("onUpdate:"),lt=Object.assign,Ac=(t,e)=>{const n=t.indexOf(e);n>-1&&t.splice(n,1)},J_=Object.prototype.hasOwnProperty,Ne=(t,e)=>J_.call(t,e),Ee=Array.isArray,ts=t=>la(t)==="[object Map]",Wf=t=>la(t)==="[object Set]",we=t=>typeof t=="function",Ze=t=>typeof t=="string",hr=t=>typeof t=="symbol",qe=t=>t!==null&&typeof t=="object",Kf=t=>(qe(t)||we(t))&&we(t.then)&&we(t.catch),Qf=Object.prototype.toString,la=t=>Qf.call(t),Y_=t=>la(t).slice(8,-1),Jf=t=>la(t)==="[object Object]",bc=t=>Ze(t)&&t!=="NaN"&&t[0]!=="-"&&""+parseInt(t,10)===t,Ys=Tc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),ca=t=>{const e=Object.create(null);return n=>e[n]||(e[n]=t(n))},X_=/-(\w)/g,Jt=ca(t=>t.replace(X_,(e,n)=>n?n.toUpperCase():"")),Z_=/\B([A-Z])/g,Lr=ca(t=>t.replace(Z_,"-$1").toLowerCase()),ua=ca(t=>t.charAt(0).toUpperCase()+t.slice(1)),ol=ca(t=>t?`on${ua(t)}`:""),nr=(t,e)=>!Object.is(t,e),yo=(t,...e)=>{for(let n=0;n<t.length;n++)t[n](...e)},Yf=(t,e,n,r=!1)=>{Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:r,value:n})},Nl=t=>{const e=parseFloat(t);return isNaN(e)?t:e};let Lh;const ha=()=>Lh||(Lh=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Rc(t){if(Ee(t)){const e={};for(let n=0;n<t.length;n++){const r=t[n],s=Ze(r)?ry(r):Rc(r);if(s)for(const i in s)e[i]=s[i]}return e}else if(Ze(t)||qe(t))return t}const ey=/;(?![^(]*\))/g,ty=/:([^]+)/,ny=/\/\*[^]*?\*\//g;function ry(t){const e={};return t.replace(ny,"").split(ey).forEach(n=>{if(n){const r=n.split(ty);r.length>1&&(e[r[0].trim()]=r[1].trim())}}),e}function Dn(t){let e="";if(Ze(t))e=t;else if(Ee(t))for(let n=0;n<t.length;n++){const r=Dn(t[n]);r&&(e+=r+" ")}else if(qe(t))for(const n in t)t[n]&&(e+=n+" ");return e.trim()}const sy="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",iy=Tc(sy);function Xf(t){return!!t||t===""}const Zf=t=>!!(t&&t.__v_isRef===!0),Oe=t=>Ze(t)?t:t==null?"":Ee(t)||qe(t)&&(t.toString===Qf||!we(t.toString))?Zf(t)?Oe(t.value):JSON.stringify(t,ep,2):String(t),ep=(t,e)=>Zf(e)?ep(t,e.value):ts(e)?{[`Map(${e.size})`]:[...e.entries()].reduce((n,[r,s],i)=>(n[al(r,i)+" =>"]=s,n),{})}:Wf(e)?{[`Set(${e.size})`]:[...e.values()].map(n=>al(n))}:hr(e)?al(e):qe(e)&&!Ee(e)&&!Jf(e)?String(e):e,al=(t,e="")=>{var n;return hr(t)?`Symbol(${(n=t.description)!=null?n:e})`:t};/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ut;class oy{constructor(e=!1){this.detached=e,this._active=!0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Ut,!e&&Ut&&(this.index=(Ut.scopes||(Ut.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].pause();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,n;if(this.scopes)for(e=0,n=this.scopes.length;e<n;e++)this.scopes[e].resume();for(e=0,n=this.effects.length;e<n;e++)this.effects[e].resume()}}run(e){if(this._active){const n=Ut;try{return Ut=this,e()}finally{Ut=n}}}on(){Ut=this}off(){Ut=this.parent}stop(e){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){const s=this.parent.scopes.pop();s&&s!==this&&(this.parent.scopes[this.index]=s,s.index=this.index)}this.parent=void 0}}}function ay(){return Ut}let Ue;const ll=new WeakSet;class tp{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ut&&Ut.active&&Ut.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,ll.has(this)&&(ll.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||rp(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fh(this),sp(this);const e=Ue,n=en;Ue=this,en=!0;try{return this.fn()}finally{ip(this),Ue=e,en=n,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Cc(e);this.deps=this.depsTail=void 0,Fh(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?ll.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ol(this)&&this.run()}get dirty(){return Ol(this)}}let np=0,Xs,Zs;function rp(t,e=!1){if(t.flags|=8,e){t.next=Zs,Zs=t;return}t.next=Xs,Xs=t}function Sc(){np++}function Pc(){if(--np>0)return;if(Zs){let e=Zs;for(Zs=void 0;e;){const n=e.next;e.next=void 0,e.flags&=-9,e=n}}let t;for(;Xs;){let e=Xs;for(Xs=void 0;e;){const n=e.next;if(e.next=void 0,e.flags&=-9,e.flags&1)try{e.trigger()}catch(r){t||(t=r)}e=n}}if(t)throw t}function sp(t){for(let e=t.deps;e;e=e.nextDep)e.version=-1,e.prevActiveLink=e.dep.activeLink,e.dep.activeLink=e}function ip(t){let e,n=t.depsTail,r=n;for(;r;){const s=r.prevDep;r.version===-1?(r===n&&(n=s),Cc(r),ly(r)):e=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=s}t.deps=e,t.depsTail=n}function Ol(t){for(let e=t.deps;e;e=e.nextDep)if(e.dep.version!==e.version||e.dep.computed&&(op(e.dep.computed)||e.dep.version!==e.version))return!0;return!!t._dirty}function op(t){if(t.flags&4&&!(t.flags&16)||(t.flags&=-17,t.globalVersion===di))return;t.globalVersion=di;const e=t.dep;if(t.flags|=2,e.version>0&&!t.isSSR&&t.deps&&!Ol(t)){t.flags&=-3;return}const n=Ue,r=en;Ue=t,en=!0;try{sp(t);const s=t.fn(t._value);(e.version===0||nr(s,t._value))&&(t._value=s,e.version++)}catch(s){throw e.version++,s}finally{Ue=n,en=r,ip(t),t.flags&=-3}}function Cc(t,e=!1){const{dep:n,prevSub:r,nextSub:s}=t;if(r&&(r.nextSub=s,t.prevSub=void 0),s&&(s.prevSub=r,t.nextSub=void 0),n.subs===t&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let i=n.computed.deps;i;i=i.nextDep)Cc(i,!0)}!e&&!--n.sc&&n.map&&n.map.delete(n.key)}function ly(t){const{prevDep:e,nextDep:n}=t;e&&(e.nextDep=n,t.prevDep=void 0),n&&(n.prevDep=e,t.nextDep=void 0)}let en=!0;const ap=[];function dr(){ap.push(en),en=!1}function fr(){const t=ap.pop();en=t===void 0?!0:t}function Fh(t){const{cleanup:e}=t;if(t.cleanup=void 0,e){const n=Ue;Ue=void 0;try{e()}finally{Ue=n}}}let di=0;class cy{constructor(e,n){this.sub=e,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class kc{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(e){if(!Ue||!en||Ue===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ue)n=this.activeLink=new cy(Ue,this),Ue.deps?(n.prevDep=Ue.depsTail,Ue.depsTail.nextDep=n,Ue.depsTail=n):Ue.deps=Ue.depsTail=n,lp(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=Ue.depsTail,n.nextDep=void 0,Ue.depsTail.nextDep=n,Ue.depsTail=n,Ue.deps===n&&(Ue.deps=r)}return n}trigger(e){this.version++,di++,this.notify(e)}notify(e){Sc();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{Pc()}}}function lp(t){if(t.dep.sc++,t.sub.flags&4){const e=t.dep.computed;if(e&&!t.dep.subs){e.flags|=20;for(let r=e.deps;r;r=r.nextDep)lp(r)}const n=t.dep.subs;n!==t&&(t.prevSub=n,n&&(n.nextSub=t)),t.dep.subs=t}}const xl=new WeakMap,Rr=Symbol(""),Ml=Symbol(""),fi=Symbol("");function wt(t,e,n){if(en&&Ue){let r=xl.get(t);r||xl.set(t,r=new Map);let s=r.get(n);s||(r.set(n,s=new kc),s.map=r,s.key=n),s.track()}}function Rn(t,e,n,r,s,i){const o=xl.get(t);if(!o){di++;return}const l=c=>{c&&c.trigger()};if(Sc(),e==="clear")o.forEach(l);else{const c=Ee(t),h=c&&bc(n);if(c&&n==="length"){const d=Number(r);o.forEach((p,m)=>{(m==="length"||m===fi||!hr(m)&&m>=d)&&l(p)})}else switch((n!==void 0||o.has(void 0))&&l(o.get(n)),h&&l(o.get(fi)),e){case"add":c?h&&l(o.get("length")):(l(o.get(Rr)),ts(t)&&l(o.get(Ml)));break;case"delete":c||(l(o.get(Rr)),ts(t)&&l(o.get(Ml)));break;case"set":ts(t)&&l(o.get(Rr));break}}Pc()}function Hr(t){const e=De(t);return e===t?e:(wt(e,"iterate",fi),Kt(t)?e:e.map(Tt))}function da(t){return wt(t=De(t),"iterate",fi),t}const uy={__proto__:null,[Symbol.iterator](){return cl(this,Symbol.iterator,Tt)},concat(...t){return Hr(this).concat(...t.map(e=>Ee(e)?Hr(e):e))},entries(){return cl(this,"entries",t=>(t[1]=Tt(t[1]),t))},every(t,e){return Tn(this,"every",t,e,void 0,arguments)},filter(t,e){return Tn(this,"filter",t,e,n=>n.map(Tt),arguments)},find(t,e){return Tn(this,"find",t,e,Tt,arguments)},findIndex(t,e){return Tn(this,"findIndex",t,e,void 0,arguments)},findLast(t,e){return Tn(this,"findLast",t,e,Tt,arguments)},findLastIndex(t,e){return Tn(this,"findLastIndex",t,e,void 0,arguments)},forEach(t,e){return Tn(this,"forEach",t,e,void 0,arguments)},includes(...t){return ul(this,"includes",t)},indexOf(...t){return ul(this,"indexOf",t)},join(t){return Hr(this).join(t)},lastIndexOf(...t){return ul(this,"lastIndexOf",t)},map(t,e){return Tn(this,"map",t,e,void 0,arguments)},pop(){return js(this,"pop")},push(...t){return js(this,"push",t)},reduce(t,...e){return Uh(this,"reduce",t,e)},reduceRight(t,...e){return Uh(this,"reduceRight",t,e)},shift(){return js(this,"shift")},some(t,e){return Tn(this,"some",t,e,void 0,arguments)},splice(...t){return js(this,"splice",t)},toReversed(){return Hr(this).toReversed()},toSorted(t){return Hr(this).toSorted(t)},toSpliced(...t){return Hr(this).toSpliced(...t)},unshift(...t){return js(this,"unshift",t)},values(){return cl(this,"values",Tt)}};function cl(t,e,n){const r=da(t),s=r[e]();return r!==t&&!Kt(t)&&(s._next=s.next,s.next=()=>{const i=s._next();return i.value&&(i.value=n(i.value)),i}),s}const hy=Array.prototype;function Tn(t,e,n,r,s,i){const o=da(t),l=o!==t&&!Kt(t),c=o[e];if(c!==hy[e]){const p=c.apply(t,i);return l?Tt(p):p}let h=n;o!==t&&(l?h=function(p,m){return n.call(this,Tt(p),m,t)}:n.length>2&&(h=function(p,m){return n.call(this,p,m,t)}));const d=c.call(o,h,r);return l&&s?s(d):d}function Uh(t,e,n,r){const s=da(t);let i=n;return s!==t&&(Kt(t)?n.length>3&&(i=function(o,l,c){return n.call(this,o,l,c,t)}):i=function(o,l,c){return n.call(this,o,Tt(l),c,t)}),s[e](i,...r)}function ul(t,e,n){const r=De(t);wt(r,"iterate",fi);const s=r[e](...n);return(s===-1||s===!1)&&Nc(n[0])?(n[0]=De(n[0]),r[e](...n)):s}function js(t,e,n=[]){dr(),Sc();const r=De(t)[e].apply(t,n);return Pc(),fr(),r}const dy=Tc("__proto__,__v_isRef,__isVue"),cp=new Set(Object.getOwnPropertyNames(Symbol).filter(t=>t!=="arguments"&&t!=="caller").map(t=>Symbol[t]).filter(hr));function fy(t){hr(t)||(t=String(t));const e=De(this);return wt(e,"has",t),e.hasOwnProperty(t)}class up{constructor(e=!1,n=!1){this._isReadonly=e,this._isShallow=n}get(e,n,r){if(n==="__v_skip")return e.__v_skip;const s=this._isReadonly,i=this._isShallow;if(n==="__v_isReactive")return!s;if(n==="__v_isReadonly")return s;if(n==="__v_isShallow")return i;if(n==="__v_raw")return r===(s?i?Iy:pp:i?fp:dp).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(r)?e:void 0;const o=Ee(e);if(!s){let c;if(o&&(c=uy[n]))return c;if(n==="hasOwnProperty")return fy}const l=Reflect.get(e,n,Rt(e)?e:r);return(hr(n)?cp.has(n):dy(n))||(s||wt(e,"get",n),i)?l:Rt(l)?o&&bc(n)?l:l.value:qe(l)?s?gp(l):fa(l):l}}class hp extends up{constructor(e=!1){super(!1,e)}set(e,n,r,s){let i=e[n];if(!this._isShallow){const c=Cr(i);if(!Kt(r)&&!Cr(r)&&(i=De(i),r=De(r)),!Ee(e)&&Rt(i)&&!Rt(r))return c?!1:(i.value=r,!0)}const o=Ee(e)&&bc(n)?Number(n)<e.length:Ne(e,n),l=Reflect.set(e,n,r,Rt(e)?e:s);return e===De(s)&&(o?nr(r,i)&&Rn(e,"set",n,r):Rn(e,"add",n,r)),l}deleteProperty(e,n){const r=Ne(e,n);e[n];const s=Reflect.deleteProperty(e,n);return s&&r&&Rn(e,"delete",n,void 0),s}has(e,n){const r=Reflect.has(e,n);return(!hr(n)||!cp.has(n))&&wt(e,"has",n),r}ownKeys(e){return wt(e,"iterate",Ee(e)?"length":Rr),Reflect.ownKeys(e)}}class py extends up{constructor(e=!1){super(!0,e)}set(e,n){return!0}deleteProperty(e,n){return!0}}const my=new hp,gy=new py,_y=new hp(!0);const Ll=t=>t,lo=t=>Reflect.getPrototypeOf(t);function yy(t,e,n){return function(...r){const s=this.__v_raw,i=De(s),o=ts(i),l=t==="entries"||t===Symbol.iterator&&o,c=t==="keys"&&o,h=s[t](...r),d=n?Ll:e?Fl:Tt;return!e&&wt(i,"iterate",c?Ml:Rr),{next(){const{value:p,done:m}=h.next();return m?{value:p,done:m}:{value:l?[d(p[0]),d(p[1])]:d(p),done:m}},[Symbol.iterator](){return this}}}}function co(t){return function(...e){return t==="delete"?!1:t==="clear"?void 0:this}}function vy(t,e){const n={get(s){const i=this.__v_raw,o=De(i),l=De(s);t||(nr(s,l)&&wt(o,"get",s),wt(o,"get",l));const{has:c}=lo(o),h=e?Ll:t?Fl:Tt;if(c.call(o,s))return h(i.get(s));if(c.call(o,l))return h(i.get(l));i!==o&&i.get(s)},get size(){const s=this.__v_raw;return!t&&wt(De(s),"iterate",Rr),Reflect.get(s,"size",s)},has(s){const i=this.__v_raw,o=De(i),l=De(s);return t||(nr(s,l)&&wt(o,"has",s),wt(o,"has",l)),s===l?i.has(s):i.has(s)||i.has(l)},forEach(s,i){const o=this,l=o.__v_raw,c=De(l),h=e?Ll:t?Fl:Tt;return!t&&wt(c,"iterate",Rr),l.forEach((d,p)=>s.call(i,h(d),h(p),o))}};return lt(n,t?{add:co("add"),set:co("set"),delete:co("delete"),clear:co("clear")}:{add(s){!e&&!Kt(s)&&!Cr(s)&&(s=De(s));const i=De(this);return lo(i).has.call(i,s)||(i.add(s),Rn(i,"add",s,s)),this},set(s,i){!e&&!Kt(i)&&!Cr(i)&&(i=De(i));const o=De(this),{has:l,get:c}=lo(o);let h=l.call(o,s);h||(s=De(s),h=l.call(o,s));const d=c.call(o,s);return o.set(s,i),h?nr(i,d)&&Rn(o,"set",s,i):Rn(o,"add",s,i),this},delete(s){const i=De(this),{has:o,get:l}=lo(i);let c=o.call(i,s);c||(s=De(s),c=o.call(i,s)),l&&l.call(i,s);const h=i.delete(s);return c&&Rn(i,"delete",s,void 0),h},clear(){const s=De(this),i=s.size!==0,o=s.clear();return i&&Rn(s,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(s=>{n[s]=yy(s,t,e)}),n}function Vc(t,e){const n=vy(t,e);return(r,s,i)=>s==="__v_isReactive"?!t:s==="__v_isReadonly"?t:s==="__v_raw"?r:Reflect.get(Ne(n,s)&&s in r?n:r,s,i)}const Ey={get:Vc(!1,!1)},wy={get:Vc(!1,!0)},Ty={get:Vc(!0,!1)};const dp=new WeakMap,fp=new WeakMap,pp=new WeakMap,Iy=new WeakMap;function Ay(t){switch(t){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function by(t){return t.__v_skip||!Object.isExtensible(t)?0:Ay(Y_(t))}function fa(t){return Cr(t)?t:Dc(t,!1,my,Ey,dp)}function mp(t){return Dc(t,!1,_y,wy,fp)}function gp(t){return Dc(t,!0,gy,Ty,pp)}function Dc(t,e,n,r,s){if(!qe(t)||t.__v_raw&&!(e&&t.__v_isReactive))return t;const i=s.get(t);if(i)return i;const o=by(t);if(o===0)return t;const l=new Proxy(t,o===2?r:n);return s.set(t,l),l}function ns(t){return Cr(t)?ns(t.__v_raw):!!(t&&t.__v_isReactive)}function Cr(t){return!!(t&&t.__v_isReadonly)}function Kt(t){return!!(t&&t.__v_isShallow)}function Nc(t){return t?!!t.__v_raw:!1}function De(t){const e=t&&t.__v_raw;return e?De(e):t}function Ry(t){return!Ne(t,"__v_skip")&&Object.isExtensible(t)&&Yf(t,"__v_skip",!0),t}const Tt=t=>qe(t)?fa(t):t,Fl=t=>qe(t)?gp(t):t;function Rt(t){return t?t.__v_isRef===!0:!1}function ge(t){return _p(t,!1)}function Sy(t){return _p(t,!0)}function _p(t,e){return Rt(t)?t:new Py(t,e)}class Py{constructor(e,n){this.dep=new kc,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?e:De(e),this._value=n?e:Tt(e),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(e){const n=this._rawValue,r=this.__v_isShallow||Kt(e)||Cr(e);e=r?e:De(e),nr(e,n)&&(this._rawValue=e,this._value=r?e:Tt(e),this.dep.trigger())}}function je(t){return Rt(t)?t.value:t}const Cy={get:(t,e,n)=>e==="__v_raw"?t:je(Reflect.get(t,e,n)),set:(t,e,n,r)=>{const s=t[e];return Rt(s)&&!Rt(n)?(s.value=n,!0):Reflect.set(t,e,n,r)}};function yp(t){return ns(t)?t:new Proxy(t,Cy)}class ky{constructor(e,n,r){this.fn=e,this.setter=n,this._value=void 0,this.dep=new kc(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=di-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&Ue!==this)return rp(this,!0),!0}get value(){const e=this.dep.track();return op(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}}function Vy(t,e,n=!1){let r,s;return we(t)?r=t:(r=t.get,s=t.set),new ky(r,s,n)}const uo={},No=new WeakMap;let wr;function Dy(t,e=!1,n=wr){if(n){let r=No.get(n);r||No.set(n,r=[]),r.push(t)}}function Ny(t,e,n=Le){const{immediate:r,deep:s,once:i,scheduler:o,augmentJob:l,call:c}=n,h=H=>s?H:Kt(H)||s===!1||s===0?Sn(H,1):Sn(H);let d,p,m,_,S=!1,k=!1;if(Rt(t)?(p=()=>t.value,S=Kt(t)):ns(t)?(p=()=>h(t),S=!0):Ee(t)?(k=!0,S=t.some(H=>ns(H)||Kt(H)),p=()=>t.map(H=>{if(Rt(H))return H.value;if(ns(H))return h(H);if(we(H))return c?c(H,2):H()})):we(t)?e?p=c?()=>c(t,2):t:p=()=>{if(m){dr();try{m()}finally{fr()}}const H=wr;wr=d;try{return c?c(t,3,[_]):t(_)}finally{wr=H}}:p=Zt,e&&s){const H=p,ce=s===!0?1/0:s;p=()=>Sn(H(),ce)}const D=ay(),F=()=>{d.stop(),D&&D.active&&Ac(D.effects,d)};if(i&&e){const H=e;e=(...ce)=>{H(...ce),F()}}let L=k?new Array(t.length).fill(uo):uo;const $=H=>{if(!(!(d.flags&1)||!d.dirty&&!H))if(e){const ce=d.run();if(s||S||(k?ce.some((le,A)=>nr(le,L[A])):nr(ce,L))){m&&m();const le=wr;wr=d;try{const A=[ce,L===uo?void 0:k&&L[0]===uo?[]:L,_];c?c(e,3,A):e(...A),L=ce}finally{wr=le}}}else d.run()};return l&&l($),d=new tp(p),d.scheduler=o?()=>o($,!1):$,_=H=>Dy(H,!1,d),m=d.onStop=()=>{const H=No.get(d);if(H){if(c)c(H,4);else for(const ce of H)ce();No.delete(d)}},e?r?$(!0):L=d.run():o?o($.bind(null,!0),!0):d.run(),F.pause=d.pause.bind(d),F.resume=d.resume.bind(d),F.stop=F,F}function Sn(t,e=1/0,n){if(e<=0||!qe(t)||t.__v_skip||(n=n||new Set,n.has(t)))return t;if(n.add(t),e--,Rt(t))Sn(t.value,e,n);else if(Ee(t))for(let r=0;r<t.length;r++)Sn(t[r],e,n);else if(Wf(t)||ts(t))t.forEach(r=>{Sn(r,e,n)});else if(Jf(t)){for(const r in t)Sn(t[r],e,n);for(const r of Object.getOwnPropertySymbols(t))Object.prototype.propertyIsEnumerable.call(t,r)&&Sn(t[r],e,n)}return t}/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Ci(t,e,n,r){try{return r?t(...r):t()}catch(s){pa(s,e,n)}}function _n(t,e,n,r){if(we(t)){const s=Ci(t,e,n,r);return s&&Kf(s)&&s.catch(i=>{pa(i,e,n)}),s}if(Ee(t)){const s=[];for(let i=0;i<t.length;i++)s.push(_n(t[i],e,n,r));return s}}function pa(t,e,n,r=!0){const s=e?e.vnode:null,{errorHandler:i,throwUnhandledErrorInProduction:o}=e&&e.appContext.config||Le;if(e){let l=e.parent;const c=e.proxy,h=`https://vuejs.org/error-reference/#runtime-${n}`;for(;l;){const d=l.ec;if(d){for(let p=0;p<d.length;p++)if(d[p](t,c,h)===!1)return}l=l.parent}if(i){dr(),Ci(i,null,10,[t,c,h]),fr();return}}Oy(t,n,s,r,o)}function Oy(t,e,n,r=!0,s=!1){if(s)throw t;console.error(t)}const Vt=[];let ln=-1;const rs=[];let Kn=null,zr=0;const vp=Promise.resolve();let Oo=null;function Oc(t){const e=Oo||vp;return t?e.then(this?t.bind(this):t):e}function xy(t){let e=ln+1,n=Vt.length;for(;e<n;){const r=e+n>>>1,s=Vt[r],i=pi(s);i<t||i===t&&s.flags&2?e=r+1:n=r}return e}function xc(t){if(!(t.flags&1)){const e=pi(t),n=Vt[Vt.length-1];!n||!(t.flags&2)&&e>=pi(n)?Vt.push(t):Vt.splice(xy(e),0,t),t.flags|=1,Ep()}}function Ep(){Oo||(Oo=vp.then(Tp))}function My(t){Ee(t)?rs.push(...t):Kn&&t.id===-1?Kn.splice(zr+1,0,t):t.flags&1||(rs.push(t),t.flags|=1),Ep()}function Bh(t,e,n=ln+1){for(;n<Vt.length;n++){const r=Vt[n];if(r&&r.flags&2){if(t&&r.id!==t.uid)continue;Vt.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function wp(t){if(rs.length){const e=[...new Set(rs)].sort((n,r)=>pi(n)-pi(r));if(rs.length=0,Kn){Kn.push(...e);return}for(Kn=e,zr=0;zr<Kn.length;zr++){const n=Kn[zr];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Kn=null,zr=0}}const pi=t=>t.id==null?t.flags&2?-1:1/0:t.id;function Tp(t){const e=Zt;try{for(ln=0;ln<Vt.length;ln++){const n=Vt[ln];n&&!(n.flags&8)&&(n.flags&4&&(n.flags&=-2),Ci(n,n.i,n.i?15:14),n.flags&4||(n.flags&=-2))}}finally{for(;ln<Vt.length;ln++){const n=Vt[ln];n&&(n.flags&=-2)}ln=-1,Vt.length=0,wp(),Oo=null,(Vt.length||rs.length)&&Tp()}}let $t=null,Ip=null;function xo(t){const e=$t;return $t=t,Ip=t&&t.type.__scopeId||null,e}function ei(t,e=$t,n){if(!e||t._n)return t;const r=(...s)=>{r._d&&Qh(-1);const i=xo(e);let o;try{o=t(...s)}finally{xo(i),r._d&&Qh(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function Ly(t,e){if($t===null)return t;const n=ya($t),r=t.dirs||(t.dirs=[]);for(let s=0;s<e.length;s++){let[i,o,l,c=Le]=e[s];i&&(we(i)&&(i={mounted:i,updated:i}),i.deep&&Sn(o),r.push({dir:i,instance:n,value:o,oldValue:void 0,arg:l,modifiers:c}))}return t}function vr(t,e,n,r){const s=t.dirs,i=e&&e.dirs;for(let o=0;o<s.length;o++){const l=s[o];i&&(l.oldValue=i[o].value);let c=l.dir[r];c&&(dr(),_n(c,n,8,[t.el,l,t,e]),fr())}}const Fy=Symbol("_vte"),Uy=t=>t.__isTeleport;function Mc(t,e){t.shapeFlag&6&&t.component?(t.transition=e,Mc(t.component.subTree,e)):t.shapeFlag&128?(t.ssContent.transition=e.clone(t.ssContent),t.ssFallback.transition=e.clone(t.ssFallback)):t.transition=e}/*! #__NO_SIDE_EFFECTS__ */function Ap(t,e){return we(t)?(()=>lt({name:t.name},e,{setup:t}))():t}function bp(t){t.ids=[t.ids[0]+t.ids[2]+++"-",0,0]}function Mo(t,e,n,r,s=!1){if(Ee(t)){t.forEach((S,k)=>Mo(S,e&&(Ee(e)?e[k]:e),n,r,s));return}if(ti(r)&&!s){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Mo(t,e,n,r.component.subTree);return}const i=r.shapeFlag&4?ya(r.component):r.el,o=s?null:i,{i:l,r:c}=t,h=e&&e.r,d=l.refs===Le?l.refs={}:l.refs,p=l.setupState,m=De(p),_=p===Le?()=>!1:S=>Ne(m,S);if(h!=null&&h!==c&&(Ze(h)?(d[h]=null,_(h)&&(p[h]=null)):Rt(h)&&(h.value=null)),we(c))Ci(c,l,12,[o,d]);else{const S=Ze(c),k=Rt(c);if(S||k){const D=()=>{if(t.f){const F=S?_(c)?p[c]:d[c]:c.value;s?Ee(F)&&Ac(F,i):Ee(F)?F.includes(i)||F.push(i):S?(d[c]=[i],_(c)&&(p[c]=d[c])):(c.value=[i],t.k&&(d[t.k]=c.value))}else S?(d[c]=o,_(c)&&(p[c]=o)):k&&(c.value=o,t.k&&(d[t.k]=o))};o?(D.id=-1,Lt(D,n)):D()}}}ha().requestIdleCallback;ha().cancelIdleCallback;const ti=t=>!!t.type.__asyncLoader,Rp=t=>t.type.__isKeepAlive;function By(t,e){Sp(t,"a",e)}function $y(t,e){Sp(t,"da",e)}function Sp(t,e,n=bt){const r=t.__wdc||(t.__wdc=()=>{let s=n;for(;s;){if(s.isDeactivated)return;s=s.parent}return t()});if(ma(e,r,n),n){let s=n.parent;for(;s&&s.parent;)Rp(s.parent.vnode)&&jy(r,e,n,s),s=s.parent}}function jy(t,e,n,r){const s=ma(e,t,r,!0);ki(()=>{Ac(r[e],s)},n)}function ma(t,e,n=bt,r=!1){if(n){const s=n[t]||(n[t]=[]),i=e.__weh||(e.__weh=(...o)=>{dr();const l=Vi(n),c=_n(e,n,t,o);return l(),fr(),c});return r?s.unshift(i):s.push(i),i}}const Fn=t=>(e,n=bt)=>{(!gi||t==="sp")&&ma(t,(...r)=>e(...r),n)},qy=Fn("bm"),ws=Fn("m"),Hy=Fn("bu"),zy=Fn("u"),Gy=Fn("bum"),ki=Fn("um"),Wy=Fn("sp"),Ky=Fn("rtg"),Qy=Fn("rtc");function Jy(t,e=bt){ma("ec",t,e)}const Pp="components";function Ul(t,e){return Xy(Pp,t,!0,e)||t}const Yy=Symbol.for("v-ndc");function Xy(t,e,n=!0,r=!1){const s=$t||bt;if(s){const i=s.type;if(t===Pp){const l=Fv(i,!1);if(l&&(l===e||l===Jt(e)||l===ua(Jt(e))))return i}const o=$h(s[t]||i[t],e)||$h(s.appContext[t],e);return!o&&r?i:o}}function $h(t,e){return t&&(t[e]||t[Jt(e)]||t[ua(Jt(e))])}function Xr(t,e,n,r){let s;const i=n&&n[r],o=Ee(t);if(o||Ze(t)){const l=o&&ns(t);let c=!1;l&&(c=!Kt(t),t=da(t)),s=new Array(t.length);for(let h=0,d=t.length;h<d;h++)s[h]=e(c?Tt(t[h]):t[h],h,void 0,i&&i[h])}else if(typeof t=="number"){s=new Array(t);for(let l=0;l<t;l++)s[l]=e(l+1,l,void 0,i&&i[l])}else if(qe(t))if(t[Symbol.iterator])s=Array.from(t,(l,c)=>e(l,c,void 0,i&&i[c]));else{const l=Object.keys(t);s=new Array(l.length);for(let c=0,h=l.length;c<h;c++){const d=l[c];s[c]=e(t[d],d,c,i&&i[c])}}else s=[];return n&&(n[r]=s),s}const Bl=t=>t?Qp(t)?ya(t):Bl(t.parent):null,ni=lt(Object.create(null),{$:t=>t,$el:t=>t.vnode.el,$data:t=>t.data,$props:t=>t.props,$attrs:t=>t.attrs,$slots:t=>t.slots,$refs:t=>t.refs,$parent:t=>Bl(t.parent),$root:t=>Bl(t.root),$host:t=>t.ce,$emit:t=>t.emit,$options:t=>Lc(t),$forceUpdate:t=>t.f||(t.f=()=>{xc(t.update)}),$nextTick:t=>t.n||(t.n=Oc.bind(t.proxy)),$watch:t=>vv.bind(t)}),hl=(t,e)=>t!==Le&&!t.__isScriptSetup&&Ne(t,e),Zy={get({_:t},e){if(e==="__v_skip")return!0;const{ctx:n,setupState:r,data:s,props:i,accessCache:o,type:l,appContext:c}=t;let h;if(e[0]!=="$"){const _=o[e];if(_!==void 0)switch(_){case 1:return r[e];case 2:return s[e];case 4:return n[e];case 3:return i[e]}else{if(hl(r,e))return o[e]=1,r[e];if(s!==Le&&Ne(s,e))return o[e]=2,s[e];if((h=t.propsOptions[0])&&Ne(h,e))return o[e]=3,i[e];if(n!==Le&&Ne(n,e))return o[e]=4,n[e];$l&&(o[e]=0)}}const d=ni[e];let p,m;if(d)return e==="$attrs"&&wt(t.attrs,"get",""),d(t);if((p=l.__cssModules)&&(p=p[e]))return p;if(n!==Le&&Ne(n,e))return o[e]=4,n[e];if(m=c.config.globalProperties,Ne(m,e))return m[e]},set({_:t},e,n){const{data:r,setupState:s,ctx:i}=t;return hl(s,e)?(s[e]=n,!0):r!==Le&&Ne(r,e)?(r[e]=n,!0):Ne(t.props,e)||e[0]==="$"&&e.slice(1)in t?!1:(i[e]=n,!0)},has({_:{data:t,setupState:e,accessCache:n,ctx:r,appContext:s,propsOptions:i}},o){let l;return!!n[o]||t!==Le&&Ne(t,o)||hl(e,o)||(l=i[0])&&Ne(l,o)||Ne(r,o)||Ne(ni,o)||Ne(s.config.globalProperties,o)},defineProperty(t,e,n){return n.get!=null?t._.accessCache[e]=0:Ne(n,"value")&&this.set(t,e,n.value,null),Reflect.defineProperty(t,e,n)}};function jh(t){return Ee(t)?t.reduce((e,n)=>(e[n]=null,e),{}):t}let $l=!0;function ev(t){const e=Lc(t),n=t.proxy,r=t.ctx;$l=!1,e.beforeCreate&&qh(e.beforeCreate,t,"bc");const{data:s,computed:i,methods:o,watch:l,provide:c,inject:h,created:d,beforeMount:p,mounted:m,beforeUpdate:_,updated:S,activated:k,deactivated:D,beforeDestroy:F,beforeUnmount:L,destroyed:$,unmounted:H,render:ce,renderTracked:le,renderTriggered:A,errorCaptured:y,serverPrefetch:v,expose:b,inheritAttrs:I,components:R,directives:E,filters:U}=e;if(h&&tv(h,r,null),o)for(const Z in o){const ue=o[Z];we(ue)&&(r[Z]=ue.bind(n))}if(s){const Z=s.call(n,n);qe(Z)&&(t.data=fa(Z))}if($l=!0,i)for(const Z in i){const ue=i[Z],tt=we(ue)?ue.bind(n,n):we(ue.get)?ue.get.bind(n,n):Zt,zt=!we(ue)&&we(ue.set)?ue.set.bind(n):Zt,Gt=Be({get:tt,set:zt});Object.defineProperty(r,Z,{enumerable:!0,configurable:!0,get:()=>Gt.value,set:He=>Gt.value=He})}if(l)for(const Z in l)Cp(l[Z],r,n,Z);if(c){const Z=we(c)?c.call(n):c;Reflect.ownKeys(Z).forEach(ue=>{vo(ue,Z[ue])})}d&&qh(d,t,"c");function fe(Z,ue){Ee(ue)?ue.forEach(tt=>Z(tt.bind(n))):ue&&Z(ue.bind(n))}if(fe(qy,p),fe(ws,m),fe(Hy,_),fe(zy,S),fe(By,k),fe($y,D),fe(Jy,y),fe(Qy,le),fe(Ky,A),fe(Gy,L),fe(ki,H),fe(Wy,v),Ee(b))if(b.length){const Z=t.exposed||(t.exposed={});b.forEach(ue=>{Object.defineProperty(Z,ue,{get:()=>n[ue],set:tt=>n[ue]=tt})})}else t.exposed||(t.exposed={});ce&&t.render===Zt&&(t.render=ce),I!=null&&(t.inheritAttrs=I),R&&(t.components=R),E&&(t.directives=E),v&&bp(t)}function tv(t,e,n=Zt){Ee(t)&&(t=jl(t));for(const r in t){const s=t[r];let i;qe(s)?"default"in s?i=tn(s.from||r,s.default,!0):i=tn(s.from||r):i=tn(s),Rt(i)?Object.defineProperty(e,r,{enumerable:!0,configurable:!0,get:()=>i.value,set:o=>i.value=o}):e[r]=i}}function qh(t,e,n){_n(Ee(t)?t.map(r=>r.bind(e.proxy)):t.bind(e.proxy),e,n)}function Cp(t,e,n,r){let s=r.includes(".")?qp(n,r):()=>n[r];if(Ze(t)){const i=e[t];we(i)&&is(s,i)}else if(we(t))is(s,t.bind(n));else if(qe(t))if(Ee(t))t.forEach(i=>Cp(i,e,n,r));else{const i=we(t.handler)?t.handler.bind(n):e[t.handler];we(i)&&is(s,i,t)}}function Lc(t){const e=t.type,{mixins:n,extends:r}=e,{mixins:s,optionsCache:i,config:{optionMergeStrategies:o}}=t.appContext,l=i.get(e);let c;return l?c=l:!s.length&&!n&&!r?c=e:(c={},s.length&&s.forEach(h=>Lo(c,h,o,!0)),Lo(c,e,o)),qe(e)&&i.set(e,c),c}function Lo(t,e,n,r=!1){const{mixins:s,extends:i}=e;i&&Lo(t,i,n,!0),s&&s.forEach(o=>Lo(t,o,n,!0));for(const o in e)if(!(r&&o==="expose")){const l=nv[o]||n&&n[o];t[o]=l?l(t[o],e[o]):e[o]}return t}const nv={data:Hh,props:zh,emits:zh,methods:Ws,computed:Ws,beforeCreate:kt,created:kt,beforeMount:kt,mounted:kt,beforeUpdate:kt,updated:kt,beforeDestroy:kt,beforeUnmount:kt,destroyed:kt,unmounted:kt,activated:kt,deactivated:kt,errorCaptured:kt,serverPrefetch:kt,components:Ws,directives:Ws,watch:sv,provide:Hh,inject:rv};function Hh(t,e){return e?t?function(){return lt(we(t)?t.call(this,this):t,we(e)?e.call(this,this):e)}:e:t}function rv(t,e){return Ws(jl(t),jl(e))}function jl(t){if(Ee(t)){const e={};for(let n=0;n<t.length;n++)e[t[n]]=t[n];return e}return t}function kt(t,e){return t?[...new Set([].concat(t,e))]:e}function Ws(t,e){return t?lt(Object.create(null),t,e):e}function zh(t,e){return t?Ee(t)&&Ee(e)?[...new Set([...t,...e])]:lt(Object.create(null),jh(t),jh(e??{})):e}function sv(t,e){if(!t)return e;if(!e)return t;const n=lt(Object.create(null),t);for(const r in e)n[r]=kt(t[r],e[r]);return n}function kp(){return{app:null,config:{isNativeTag:Q_,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let iv=0;function ov(t,e){return function(r,s=null){we(r)||(r=lt({},r)),s!=null&&!qe(s)&&(s=null);const i=kp(),o=new WeakSet,l=[];let c=!1;const h=i.app={_uid:iv++,_component:r,_props:s,_container:null,_context:i,_instance:null,version:Bv,get config(){return i.config},set config(d){},use(d,...p){return o.has(d)||(d&&we(d.install)?(o.add(d),d.install(h,...p)):we(d)&&(o.add(d),d(h,...p))),h},mixin(d){return i.mixins.includes(d)||i.mixins.push(d),h},component(d,p){return p?(i.components[d]=p,h):i.components[d]},directive(d,p){return p?(i.directives[d]=p,h):i.directives[d]},mount(d,p,m){if(!c){const _=h._ceVNode||it(r,s);return _.appContext=i,m===!0?m="svg":m===!1&&(m=void 0),p&&e?e(_,d):t(_,d,m),c=!0,h._container=d,d.__vue_app__=h,ya(_.component)}},onUnmount(d){l.push(d)},unmount(){c&&(_n(l,h._instance,16),t(null,h._container),delete h._container.__vue_app__)},provide(d,p){return i.provides[d]=p,h},runWithContext(d){const p=ss;ss=h;try{return d()}finally{ss=p}}};return h}}let ss=null;function vo(t,e){if(bt){let n=bt.provides;const r=bt.parent&&bt.parent.provides;r===n&&(n=bt.provides=Object.create(r)),n[t]=e}}function tn(t,e,n=!1){const r=bt||$t;if(r||ss){const s=ss?ss._context.provides:r?r.parent==null?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(s&&t in s)return s[t];if(arguments.length>1)return n&&we(e)?e.call(r&&r.proxy):e}}const Vp={},Dp=()=>Object.create(Vp),Np=t=>Object.getPrototypeOf(t)===Vp;function av(t,e,n,r=!1){const s={},i=Dp();t.propsDefaults=Object.create(null),Op(t,e,s,i);for(const o in t.propsOptions[0])o in s||(s[o]=void 0);n?t.props=r?s:mp(s):t.type.props?t.props=s:t.props=i,t.attrs=i}function lv(t,e,n,r){const{props:s,attrs:i,vnode:{patchFlag:o}}=t,l=De(s),[c]=t.propsOptions;let h=!1;if((r||o>0)&&!(o&16)){if(o&8){const d=t.vnode.dynamicProps;for(let p=0;p<d.length;p++){let m=d[p];if(ga(t.emitsOptions,m))continue;const _=e[m];if(c)if(Ne(i,m))_!==i[m]&&(i[m]=_,h=!0);else{const S=Jt(m);s[S]=ql(c,l,S,_,t,!1)}else _!==i[m]&&(i[m]=_,h=!0)}}}else{Op(t,e,s,i)&&(h=!0);let d;for(const p in l)(!e||!Ne(e,p)&&((d=Lr(p))===p||!Ne(e,d)))&&(c?n&&(n[p]!==void 0||n[d]!==void 0)&&(s[p]=ql(c,l,p,void 0,t,!0)):delete s[p]);if(i!==l)for(const p in i)(!e||!Ne(e,p))&&(delete i[p],h=!0)}h&&Rn(t.attrs,"set","")}function Op(t,e,n,r){const[s,i]=t.propsOptions;let o=!1,l;if(e)for(let c in e){if(Ys(c))continue;const h=e[c];let d;s&&Ne(s,d=Jt(c))?!i||!i.includes(d)?n[d]=h:(l||(l={}))[d]=h:ga(t.emitsOptions,c)||(!(c in r)||h!==r[c])&&(r[c]=h,o=!0)}if(i){const c=De(n),h=l||Le;for(let d=0;d<i.length;d++){const p=i[d];n[p]=ql(s,c,p,h[p],t,!Ne(h,p))}}return o}function ql(t,e,n,r,s,i){const o=t[n];if(o!=null){const l=Ne(o,"default");if(l&&r===void 0){const c=o.default;if(o.type!==Function&&!o.skipFactory&&we(c)){const{propsDefaults:h}=s;if(n in h)r=h[n];else{const d=Vi(s);r=h[n]=c.call(null,e),d()}}else r=c;s.ce&&s.ce._setProp(n,r)}o[0]&&(i&&!l?r=!1:o[1]&&(r===""||r===Lr(n))&&(r=!0))}return r}const cv=new WeakMap;function xp(t,e,n=!1){const r=n?cv:e.propsCache,s=r.get(t);if(s)return s;const i=t.props,o={},l=[];let c=!1;if(!we(t)){const d=p=>{c=!0;const[m,_]=xp(p,e,!0);lt(o,m),_&&l.push(..._)};!n&&e.mixins.length&&e.mixins.forEach(d),t.extends&&d(t.extends),t.mixins&&t.mixins.forEach(d)}if(!i&&!c)return qe(t)&&r.set(t,es),es;if(Ee(i))for(let d=0;d<i.length;d++){const p=Jt(i[d]);Gh(p)&&(o[p]=Le)}else if(i)for(const d in i){const p=Jt(d);if(Gh(p)){const m=i[d],_=o[p]=Ee(m)||we(m)?{type:m}:lt({},m),S=_.type;let k=!1,D=!0;if(Ee(S))for(let F=0;F<S.length;++F){const L=S[F],$=we(L)&&L.name;if($==="Boolean"){k=!0;break}else $==="String"&&(D=!1)}else k=we(S)&&S.name==="Boolean";_[0]=k,_[1]=D,(k||Ne(_,"default"))&&l.push(p)}}const h=[o,l];return qe(t)&&r.set(t,h),h}function Gh(t){return t[0]!=="$"&&!Ys(t)}const Mp=t=>t[0]==="_"||t==="$stable",Fc=t=>Ee(t)?t.map(cn):[cn(t)],uv=(t,e,n)=>{if(e._n)return e;const r=ei((...s)=>Fc(e(...s)),n);return r._c=!1,r},Lp=(t,e,n)=>{const r=t._ctx;for(const s in t){if(Mp(s))continue;const i=t[s];if(we(i))e[s]=uv(s,i,r);else if(i!=null){const o=Fc(i);e[s]=()=>o}}},Fp=(t,e)=>{const n=Fc(e);t.slots.default=()=>n},Up=(t,e,n)=>{for(const r in e)(n||r!=="_")&&(t[r]=e[r])},hv=(t,e,n)=>{const r=t.slots=Dp();if(t.vnode.shapeFlag&32){const s=e._;s?(Up(r,e,n),n&&Yf(r,"_",s,!0)):Lp(e,r)}else e&&Fp(t,e)},dv=(t,e,n)=>{const{vnode:r,slots:s}=t;let i=!0,o=Le;if(r.shapeFlag&32){const l=e._;l?n&&l===1?i=!1:Up(s,e,n):(i=!e.$stable,Lp(e,s)),o=e}else e&&(Fp(t,e),o={default:1});if(i)for(const l in s)!Mp(l)&&o[l]==null&&delete s[l]},Lt=Rv;function fv(t){return pv(t)}function pv(t,e){const n=ha();n.__VUE__=!0;const{insert:r,remove:s,patchProp:i,createElement:o,createText:l,createComment:c,setText:h,setElementText:d,parentNode:p,nextSibling:m,setScopeId:_=Zt,insertStaticContent:S}=t,k=(w,T,C,B=null,O=null,q=null,Q=void 0,W=null,G=!!T.dynamicChildren)=>{if(w===T)return;w&&!qs(w,T)&&(B=x(w),He(w,O,q,!0),w=null),T.patchFlag===-2&&(G=!1,T.dynamicChildren=null);const{type:z,ref:he,shapeFlag:ee}=T;switch(z){case _a:D(w,T,C,B);break;case kr:F(w,T,C,B);break;case Eo:w==null&&L(T,C,B,Q);break;case It:R(w,T,C,B,O,q,Q,W,G);break;default:ee&1?ce(w,T,C,B,O,q,Q,W,G):ee&6?E(w,T,C,B,O,q,Q,W,G):(ee&64||ee&128)&&z.process(w,T,C,B,O,q,Q,W,G,ne)}he!=null&&O&&Mo(he,w&&w.ref,q,T||w,!T)},D=(w,T,C,B)=>{if(w==null)r(T.el=l(T.children),C,B);else{const O=T.el=w.el;T.children!==w.children&&h(O,T.children)}},F=(w,T,C,B)=>{w==null?r(T.el=c(T.children||""),C,B):T.el=w.el},L=(w,T,C,B)=>{[w.el,w.anchor]=S(w.children,T,C,B,w.el,w.anchor)},$=({el:w,anchor:T},C,B)=>{let O;for(;w&&w!==T;)O=m(w),r(w,C,B),w=O;r(T,C,B)},H=({el:w,anchor:T})=>{let C;for(;w&&w!==T;)C=m(w),s(w),w=C;s(T)},ce=(w,T,C,B,O,q,Q,W,G)=>{T.type==="svg"?Q="svg":T.type==="math"&&(Q="mathml"),w==null?le(T,C,B,O,q,Q,W,G):v(w,T,O,q,Q,W,G)},le=(w,T,C,B,O,q,Q,W)=>{let G,z;const{props:he,shapeFlag:ee,transition:se,dirs:me}=w;if(G=w.el=o(w.type,q,he&&he.is,he),ee&8?d(G,w.children):ee&16&&y(w.children,G,null,B,O,dl(w,q),Q,W),me&&vr(w,null,B,"created"),A(G,w,w.scopeId,Q,B),he){for(const Te in he)Te!=="value"&&!Ys(Te)&&i(G,Te,null,he[Te],q,B);"value"in he&&i(G,"value",null,he.value,q),(z=he.onVnodeBeforeMount)&&an(z,B,w)}me&&vr(w,null,B,"beforeMount");const de=mv(O,se);de&&se.beforeEnter(G),r(G,T,C),((z=he&&he.onVnodeMounted)||de||me)&&Lt(()=>{z&&an(z,B,w),de&&se.enter(G),me&&vr(w,null,B,"mounted")},O)},A=(w,T,C,B,O)=>{if(C&&_(w,C),B)for(let q=0;q<B.length;q++)_(w,B[q]);if(O){let q=O.subTree;if(T===q||zp(q.type)&&(q.ssContent===T||q.ssFallback===T)){const Q=O.vnode;A(w,Q,Q.scopeId,Q.slotScopeIds,O.parent)}}},y=(w,T,C,B,O,q,Q,W,G=0)=>{for(let z=G;z<w.length;z++){const he=w[z]=W?Qn(w[z]):cn(w[z]);k(null,he,T,C,B,O,q,Q,W)}},v=(w,T,C,B,O,q,Q)=>{const W=T.el=w.el;let{patchFlag:G,dynamicChildren:z,dirs:he}=T;G|=w.patchFlag&16;const ee=w.props||Le,se=T.props||Le;let me;if(C&&Er(C,!1),(me=se.onVnodeBeforeUpdate)&&an(me,C,T,w),he&&vr(T,w,C,"beforeUpdate"),C&&Er(C,!0),(ee.innerHTML&&se.innerHTML==null||ee.textContent&&se.textContent==null)&&d(W,""),z?b(w.dynamicChildren,z,W,C,B,dl(T,O),q):Q||ue(w,T,W,null,C,B,dl(T,O),q,!1),G>0){if(G&16)I(W,ee,se,C,O);else if(G&2&&ee.class!==se.class&&i(W,"class",null,se.class,O),G&4&&i(W,"style",ee.style,se.style,O),G&8){const de=T.dynamicProps;for(let Te=0;Te<de.length;Te++){const Re=de[Te],gt=ee[Re],nt=se[Re];(nt!==gt||Re==="value")&&i(W,Re,gt,nt,O,C)}}G&1&&w.children!==T.children&&d(W,T.children)}else!Q&&z==null&&I(W,ee,se,C,O);((me=se.onVnodeUpdated)||he)&&Lt(()=>{me&&an(me,C,T,w),he&&vr(T,w,C,"updated")},B)},b=(w,T,C,B,O,q,Q)=>{for(let W=0;W<T.length;W++){const G=w[W],z=T[W],he=G.el&&(G.type===It||!qs(G,z)||G.shapeFlag&70)?p(G.el):C;k(G,z,he,null,B,O,q,Q,!0)}},I=(w,T,C,B,O)=>{if(T!==C){if(T!==Le)for(const q in T)!Ys(q)&&!(q in C)&&i(w,q,T[q],null,O,B);for(const q in C){if(Ys(q))continue;const Q=C[q],W=T[q];Q!==W&&q!=="value"&&i(w,q,W,Q,O,B)}"value"in C&&i(w,"value",T.value,C.value,O)}},R=(w,T,C,B,O,q,Q,W,G)=>{const z=T.el=w?w.el:l(""),he=T.anchor=w?w.anchor:l("");let{patchFlag:ee,dynamicChildren:se,slotScopeIds:me}=T;me&&(W=W?W.concat(me):me),w==null?(r(z,C,B),r(he,C,B),y(T.children||[],C,he,O,q,Q,W,G)):ee>0&&ee&64&&se&&w.dynamicChildren?(b(w.dynamicChildren,se,C,O,q,Q,W),(T.key!=null||O&&T===O.subTree)&&Bp(w,T,!0)):ue(w,T,C,he,O,q,Q,W,G)},E=(w,T,C,B,O,q,Q,W,G)=>{T.slotScopeIds=W,w==null?T.shapeFlag&512?O.ctx.activate(T,C,B,Q,G):U(T,C,B,O,q,Q,G):J(w,T,G)},U=(w,T,C,B,O,q,Q)=>{const W=w.component=Nv(w,B,O);if(Rp(w)&&(W.ctx.renderer=ne),Ov(W,!1,Q),W.asyncDep){if(O&&O.registerDep(W,fe,Q),!w.el){const G=W.subTree=it(kr);F(null,G,T,C)}}else fe(W,w,T,C,O,q,Q)},J=(w,T,C)=>{const B=T.component=w.component;if(Av(w,T,C))if(B.asyncDep&&!B.asyncResolved){Z(B,T,C);return}else B.next=T,B.update();else T.el=w.el,B.vnode=T},fe=(w,T,C,B,O,q,Q)=>{const W=()=>{if(w.isMounted){let{next:ee,bu:se,u:me,parent:de,vnode:Te}=w;{const rt=$p(w);if(rt){ee&&(ee.el=Te.el,Z(w,ee,Q)),rt.asyncDep.then(()=>{w.isUnmounted||W()});return}}let Re=ee,gt;Er(w,!1),ee?(ee.el=Te.el,Z(w,ee,Q)):ee=Te,se&&yo(se),(gt=ee.props&&ee.props.onVnodeBeforeUpdate)&&an(gt,de,ee,Te),Er(w,!0);const nt=fl(w),xt=w.subTree;w.subTree=nt,k(xt,nt,p(xt.el),x(xt),w,O,q),ee.el=nt.el,Re===null&&bv(w,nt.el),me&&Lt(me,O),(gt=ee.props&&ee.props.onVnodeUpdated)&&Lt(()=>an(gt,de,ee,Te),O)}else{let ee;const{el:se,props:me}=T,{bm:de,m:Te,parent:Re,root:gt,type:nt}=w,xt=ti(T);if(Er(w,!1),de&&yo(de),!xt&&(ee=me&&me.onVnodeBeforeMount)&&an(ee,Re,T),Er(w,!0),se&&xe){const rt=()=>{w.subTree=fl(w),xe(se,w.subTree,w,O,null)};xt&&nt.__asyncHydrate?nt.__asyncHydrate(se,w,rt):rt()}else{gt.ce&&gt.ce._injectChildStyle(nt);const rt=w.subTree=fl(w);k(null,rt,C,B,w,O,q),T.el=rt.el}if(Te&&Lt(Te,O),!xt&&(ee=me&&me.onVnodeMounted)){const rt=T;Lt(()=>an(ee,Re,rt),O)}(T.shapeFlag&256||Re&&ti(Re.vnode)&&Re.vnode.shapeFlag&256)&&w.a&&Lt(w.a,O),w.isMounted=!0,T=C=B=null}};w.scope.on();const G=w.effect=new tp(W);w.scope.off();const z=w.update=G.run.bind(G),he=w.job=G.runIfDirty.bind(G);he.i=w,he.id=w.uid,G.scheduler=()=>xc(he),Er(w,!0),z()},Z=(w,T,C)=>{T.component=w;const B=w.vnode.props;w.vnode=T,w.next=null,lv(w,T.props,B,C),dv(w,T.children,C),dr(),Bh(w),fr()},ue=(w,T,C,B,O,q,Q,W,G=!1)=>{const z=w&&w.children,he=w?w.shapeFlag:0,ee=T.children,{patchFlag:se,shapeFlag:me}=T;if(se>0){if(se&128){zt(z,ee,C,B,O,q,Q,W,G);return}else if(se&256){tt(z,ee,C,B,O,q,Q,W,G);return}}me&8?(he&16&&Ot(z,O,q),ee!==z&&d(C,ee)):he&16?me&16?zt(z,ee,C,B,O,q,Q,W,G):Ot(z,O,q,!0):(he&8&&d(C,""),me&16&&y(ee,C,B,O,q,Q,W,G))},tt=(w,T,C,B,O,q,Q,W,G)=>{w=w||es,T=T||es;const z=w.length,he=T.length,ee=Math.min(z,he);let se;for(se=0;se<ee;se++){const me=T[se]=G?Qn(T[se]):cn(T[se]);k(w[se],me,C,null,O,q,Q,W,G)}z>he?Ot(w,O,q,!0,!1,ee):y(T,C,B,O,q,Q,W,G,ee)},zt=(w,T,C,B,O,q,Q,W,G)=>{let z=0;const he=T.length;let ee=w.length-1,se=he-1;for(;z<=ee&&z<=se;){const me=w[z],de=T[z]=G?Qn(T[z]):cn(T[z]);if(qs(me,de))k(me,de,C,null,O,q,Q,W,G);else break;z++}for(;z<=ee&&z<=se;){const me=w[ee],de=T[se]=G?Qn(T[se]):cn(T[se]);if(qs(me,de))k(me,de,C,null,O,q,Q,W,G);else break;ee--,se--}if(z>ee){if(z<=se){const me=se+1,de=me<he?T[me].el:B;for(;z<=se;)k(null,T[z]=G?Qn(T[z]):cn(T[z]),C,de,O,q,Q,W,G),z++}}else if(z>se)for(;z<=ee;)He(w[z],O,q,!0),z++;else{const me=z,de=z,Te=new Map;for(z=de;z<=se;z++){const ct=T[z]=G?Qn(T[z]):cn(T[z]);ct.key!=null&&Te.set(ct.key,z)}let Re,gt=0;const nt=se-de+1;let xt=!1,rt=0;const jn=new Array(nt);for(z=0;z<nt;z++)jn[z]=0;for(z=me;z<=ee;z++){const ct=w[z];if(gt>=nt){He(ct,O,q,!0);continue}let Wt;if(ct.key!=null)Wt=Te.get(ct.key);else for(Re=de;Re<=se;Re++)if(jn[Re-de]===0&&qs(ct,T[Re])){Wt=Re;break}Wt===void 0?He(ct,O,q,!0):(jn[Wt-de]=z+1,Wt>=rt?rt=Wt:xt=!0,k(ct,T[Wt],C,null,O,q,Q,W,G),gt++)}const Cs=xt?gv(jn):es;for(Re=Cs.length-1,z=nt-1;z>=0;z--){const ct=de+z,Wt=T[ct],Gi=ct+1<he?T[ct+1].el:B;jn[z]===0?k(null,Wt,C,Gi,O,q,Q,W,G):xt&&(Re<0||z!==Cs[Re]?Gt(Wt,C,Gi,2):Re--)}}},Gt=(w,T,C,B,O=null)=>{const{el:q,type:Q,transition:W,children:G,shapeFlag:z}=w;if(z&6){Gt(w.component.subTree,T,C,B);return}if(z&128){w.suspense.move(T,C,B);return}if(z&64){Q.move(w,T,C,ne);return}if(Q===It){r(q,T,C);for(let ee=0;ee<G.length;ee++)Gt(G[ee],T,C,B);r(w.anchor,T,C);return}if(Q===Eo){$(w,T,C);return}if(B!==2&&z&1&&W)if(B===0)W.beforeEnter(q),r(q,T,C),Lt(()=>W.enter(q),O);else{const{leave:ee,delayLeave:se,afterLeave:me}=W,de=()=>r(q,T,C),Te=()=>{ee(q,()=>{de(),me&&me()})};se?se(q,de,Te):Te()}else r(q,T,C)},He=(w,T,C,B=!1,O=!1)=>{const{type:q,props:Q,ref:W,children:G,dynamicChildren:z,shapeFlag:he,patchFlag:ee,dirs:se,cacheIndex:me}=w;if(ee===-2&&(O=!1),W!=null&&Mo(W,null,C,w,!0),me!=null&&(T.renderCache[me]=void 0),he&256){T.ctx.deactivate(w);return}const de=he&1&&se,Te=!ti(w);let Re;if(Te&&(Re=Q&&Q.onVnodeBeforeUnmount)&&an(Re,T,w),he&6)on(w.component,C,B);else{if(he&128){w.suspense.unmount(C,B);return}de&&vr(w,null,T,"beforeUnmount"),he&64?w.type.remove(w,T,C,ne,B):z&&!z.hasOnce&&(q!==It||ee>0&&ee&64)?Ot(z,T,C,!1,!0):(q===It&&ee&384||!O&&he&16)&&Ot(G,T,C),B&&ze(w)}(Te&&(Re=Q&&Q.onVnodeUnmounted)||de)&&Lt(()=>{Re&&an(Re,T,w),de&&vr(w,null,T,"unmounted")},C)},ze=w=>{const{type:T,el:C,anchor:B,transition:O}=w;if(T===It){$n(C,B);return}if(T===Eo){H(w);return}const q=()=>{s(C),O&&!O.persisted&&O.afterLeave&&O.afterLeave()};if(w.shapeFlag&1&&O&&!O.persisted){const{leave:Q,delayLeave:W}=O,G=()=>Q(C,q);W?W(w.el,q,G):G()}else q()},$n=(w,T)=>{let C;for(;w!==T;)C=m(w),s(w),w=C;s(T)},on=(w,T,C)=>{const{bum:B,scope:O,job:q,subTree:Q,um:W,m:G,a:z}=w;Wh(G),Wh(z),B&&yo(B),O.stop(),q&&(q.flags|=8,He(Q,w,T,C)),W&&Lt(W,T),Lt(()=>{w.isUnmounted=!0},T),T&&T.pendingBranch&&!T.isUnmounted&&w.asyncDep&&!w.asyncResolved&&w.suspenseId===T.pendingId&&(T.deps--,T.deps===0&&T.resolve())},Ot=(w,T,C,B=!1,O=!1,q=0)=>{for(let Q=q;Q<w.length;Q++)He(w[Q],T,C,B,O)},x=w=>{if(w.shapeFlag&6)return x(w.component.subTree);if(w.shapeFlag&128)return w.suspense.next();const T=m(w.anchor||w.el),C=T&&T[Fy];return C?m(C):T};let te=!1;const Y=(w,T,C)=>{w==null?T._vnode&&He(T._vnode,null,null,!0):k(T._vnode||null,w,T,null,null,null,C),T._vnode=w,te||(te=!0,Bh(),wp(),te=!1)},ne={p:k,um:He,m:Gt,r:ze,mt:U,mc:y,pc:ue,pbc:b,n:x,o:t};let Ae,xe;return e&&([Ae,xe]=e(ne)),{render:Y,hydrate:Ae,createApp:ov(Y,Ae)}}function dl({type:t,props:e},n){return n==="svg"&&t==="foreignObject"||n==="mathml"&&t==="annotation-xml"&&e&&e.encoding&&e.encoding.includes("html")?void 0:n}function Er({effect:t,job:e},n){n?(t.flags|=32,e.flags|=4):(t.flags&=-33,e.flags&=-5)}function mv(t,e){return(!t||t&&!t.pendingBranch)&&e&&!e.persisted}function Bp(t,e,n=!1){const r=t.children,s=e.children;if(Ee(r)&&Ee(s))for(let i=0;i<r.length;i++){const o=r[i];let l=s[i];l.shapeFlag&1&&!l.dynamicChildren&&((l.patchFlag<=0||l.patchFlag===32)&&(l=s[i]=Qn(s[i]),l.el=o.el),!n&&l.patchFlag!==-2&&Bp(o,l)),l.type===_a&&(l.el=o.el)}}function gv(t){const e=t.slice(),n=[0];let r,s,i,o,l;const c=t.length;for(r=0;r<c;r++){const h=t[r];if(h!==0){if(s=n[n.length-1],t[s]<h){e[r]=s,n.push(r);continue}for(i=0,o=n.length-1;i<o;)l=i+o>>1,t[n[l]]<h?i=l+1:o=l;h<t[n[i]]&&(i>0&&(e[r]=n[i-1]),n[i]=r)}}for(i=n.length,o=n[i-1];i-- >0;)n[i]=o,o=e[o];return n}function $p(t){const e=t.subTree.component;if(e)return e.asyncDep&&!e.asyncResolved?e:$p(e)}function Wh(t){if(t)for(let e=0;e<t.length;e++)t[e].flags|=8}const _v=Symbol.for("v-scx"),yv=()=>tn(_v);function is(t,e,n){return jp(t,e,n)}function jp(t,e,n=Le){const{immediate:r,deep:s,flush:i,once:o}=n,l=lt({},n),c=e&&r||!e&&i!=="post";let h;if(gi){if(i==="sync"){const _=yv();h=_.__watcherHandles||(_.__watcherHandles=[])}else if(!c){const _=()=>{};return _.stop=Zt,_.resume=Zt,_.pause=Zt,_}}const d=bt;l.call=(_,S,k)=>_n(_,d,S,k);let p=!1;i==="post"?l.scheduler=_=>{Lt(_,d&&d.suspense)}:i!=="sync"&&(p=!0,l.scheduler=(_,S)=>{S?_():xc(_)}),l.augmentJob=_=>{e&&(_.flags|=4),p&&(_.flags|=2,d&&(_.id=d.uid,_.i=d))};const m=Ny(t,e,l);return gi&&(h?h.push(m):c&&m()),m}function vv(t,e,n){const r=this.proxy,s=Ze(t)?t.includes(".")?qp(r,t):()=>r[t]:t.bind(r,r);let i;we(e)?i=e:(i=e.handler,n=e);const o=Vi(this),l=jp(s,i.bind(r),n);return o(),l}function qp(t,e){const n=e.split(".");return()=>{let r=t;for(let s=0;s<n.length&&r;s++)r=r[n[s]];return r}}const Ev=(t,e)=>e==="modelValue"||e==="model-value"?t.modelModifiers:t[`${e}Modifiers`]||t[`${Jt(e)}Modifiers`]||t[`${Lr(e)}Modifiers`];function wv(t,e,...n){if(t.isUnmounted)return;const r=t.vnode.props||Le;let s=n;const i=e.startsWith("update:"),o=i&&Ev(r,e.slice(7));o&&(o.trim&&(s=n.map(d=>Ze(d)?d.trim():d)),o.number&&(s=n.map(Nl)));let l,c=r[l=ol(e)]||r[l=ol(Jt(e))];!c&&i&&(c=r[l=ol(Lr(e))]),c&&_n(c,t,6,s);const h=r[l+"Once"];if(h){if(!t.emitted)t.emitted={};else if(t.emitted[l])return;t.emitted[l]=!0,_n(h,t,6,s)}}function Hp(t,e,n=!1){const r=e.emitsCache,s=r.get(t);if(s!==void 0)return s;const i=t.emits;let o={},l=!1;if(!we(t)){const c=h=>{const d=Hp(h,e,!0);d&&(l=!0,lt(o,d))};!n&&e.mixins.length&&e.mixins.forEach(c),t.extends&&c(t.extends),t.mixins&&t.mixins.forEach(c)}return!i&&!l?(qe(t)&&r.set(t,null),null):(Ee(i)?i.forEach(c=>o[c]=null):lt(o,i),qe(t)&&r.set(t,o),o)}function ga(t,e){return!t||!aa(e)?!1:(e=e.slice(2).replace(/Once$/,""),Ne(t,e[0].toLowerCase()+e.slice(1))||Ne(t,Lr(e))||Ne(t,e))}function fl(t){const{type:e,vnode:n,proxy:r,withProxy:s,propsOptions:[i],slots:o,attrs:l,emit:c,render:h,renderCache:d,props:p,data:m,setupState:_,ctx:S,inheritAttrs:k}=t,D=xo(t);let F,L;try{if(n.shapeFlag&4){const H=s||r,ce=H;F=cn(h.call(ce,H,d,p,_,m,S)),L=l}else{const H=e;F=cn(H.length>1?H(p,{attrs:l,slots:o,emit:c}):H(p,null)),L=e.props?l:Tv(l)}}catch(H){ri.length=0,pa(H,t,1),F=it(kr)}let $=F;if(L&&k!==!1){const H=Object.keys(L),{shapeFlag:ce}=$;H.length&&ce&7&&(i&&H.some(Ic)&&(L=Iv(L,i)),$=us($,L,!1,!0))}return n.dirs&&($=us($,null,!1,!0),$.dirs=$.dirs?$.dirs.concat(n.dirs):n.dirs),n.transition&&Mc($,n.transition),F=$,xo(D),F}const Tv=t=>{let e;for(const n in t)(n==="class"||n==="style"||aa(n))&&((e||(e={}))[n]=t[n]);return e},Iv=(t,e)=>{const n={};for(const r in t)(!Ic(r)||!(r.slice(9)in e))&&(n[r]=t[r]);return n};function Av(t,e,n){const{props:r,children:s,component:i}=t,{props:o,children:l,patchFlag:c}=e,h=i.emitsOptions;if(e.dirs||e.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?Kh(r,o,h):!!o;if(c&8){const d=e.dynamicProps;for(let p=0;p<d.length;p++){const m=d[p];if(o[m]!==r[m]&&!ga(h,m))return!0}}}else return(s||l)&&(!l||!l.$stable)?!0:r===o?!1:r?o?Kh(r,o,h):!0:!!o;return!1}function Kh(t,e,n){const r=Object.keys(e);if(r.length!==Object.keys(t).length)return!0;for(let s=0;s<r.length;s++){const i=r[s];if(e[i]!==t[i]&&!ga(n,i))return!0}return!1}function bv({vnode:t,parent:e},n){for(;e;){const r=e.subTree;if(r.suspense&&r.suspense.activeBranch===t&&(r.el=t.el),r===t)(t=e.vnode).el=n,e=e.parent;else break}}const zp=t=>t.__isSuspense;function Rv(t,e){e&&e.pendingBranch?Ee(t)?e.effects.push(...t):e.effects.push(t):My(t)}const It=Symbol.for("v-fgt"),_a=Symbol.for("v-txt"),kr=Symbol.for("v-cmt"),Eo=Symbol.for("v-stc"),ri=[];let jt=null;function ie(t=!1){ri.push(jt=t?null:[])}function Sv(){ri.pop(),jt=ri[ri.length-1]||null}let mi=1;function Qh(t,e=!1){mi+=t,t<0&&jt&&e&&(jt.hasOnce=!0)}function Gp(t){return t.dynamicChildren=mi>0?jt||es:null,Sv(),mi>0&&jt&&jt.push(t),t}function ae(t,e,n,r,s,i){return Gp(N(t,e,n,r,s,i,!0))}function Wp(t,e,n,r,s){return Gp(it(t,e,n,r,s,!0))}function Fo(t){return t?t.__v_isVNode===!0:!1}function qs(t,e){return t.type===e.type&&t.key===e.key}const Kp=({key:t})=>t??null,wo=({ref:t,ref_key:e,ref_for:n})=>(typeof t=="number"&&(t=""+t),t!=null?Ze(t)||Rt(t)||we(t)?{i:$t,r:t,k:e,f:!!n}:t:null);function N(t,e=null,n=null,r=0,s=null,i=t===It?0:1,o=!1,l=!1){const c={__v_isVNode:!0,__v_skip:!0,type:t,props:e,key:e&&Kp(e),ref:e&&wo(e),scopeId:Ip,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:i,patchFlag:r,dynamicProps:s,dynamicChildren:null,appContext:null,ctx:$t};return l?(Uc(c,n),i&128&&t.normalize(c)):n&&(c.shapeFlag|=Ze(n)?8:16),mi>0&&!o&&jt&&(c.patchFlag>0||i&6)&&c.patchFlag!==32&&jt.push(c),c}const it=Pv;function Pv(t,e=null,n=null,r=0,s=null,i=!1){if((!t||t===Yy)&&(t=kr),Fo(t)){const l=us(t,e,!0);return n&&Uc(l,n),mi>0&&!i&&jt&&(l.shapeFlag&6?jt[jt.indexOf(t)]=l:jt.push(l)),l.patchFlag=-2,l}if(Uv(t)&&(t=t.__vccOpts),e){e=Cv(e);let{class:l,style:c}=e;l&&!Ze(l)&&(e.class=Dn(l)),qe(c)&&(Nc(c)&&!Ee(c)&&(c=lt({},c)),e.style=Rc(c))}const o=Ze(t)?1:zp(t)?128:Uy(t)?64:qe(t)?4:we(t)?2:0;return N(t,e,n,r,s,o,i,!0)}function Cv(t){return t?Nc(t)||Np(t)?lt({},t):t:null}function us(t,e,n=!1,r=!1){const{props:s,ref:i,patchFlag:o,children:l,transition:c}=t,h=e?kv(s||{},e):s,d={__v_isVNode:!0,__v_skip:!0,type:t.type,props:h,key:h&&Kp(h),ref:e&&e.ref?n&&i?Ee(i)?i.concat(wo(e)):[i,wo(e)]:wo(e):i,scopeId:t.scopeId,slotScopeIds:t.slotScopeIds,children:l,target:t.target,targetStart:t.targetStart,targetAnchor:t.targetAnchor,staticCount:t.staticCount,shapeFlag:t.shapeFlag,patchFlag:e&&t.type!==It?o===-1?16:o|16:o,dynamicProps:t.dynamicProps,dynamicChildren:t.dynamicChildren,appContext:t.appContext,dirs:t.dirs,transition:c,component:t.component,suspense:t.suspense,ssContent:t.ssContent&&us(t.ssContent),ssFallback:t.ssFallback&&us(t.ssFallback),el:t.el,anchor:t.anchor,ctx:t.ctx,ce:t.ce};return c&&r&&Mc(d,c.clone(d)),d}function Xt(t=" ",e=0){return it(_a,null,t,e)}function To(t,e){const n=it(Eo,null,t);return n.staticCount=e,n}function At(t="",e=!1){return e?(ie(),Wp(kr,null,t)):it(kr,null,t)}function cn(t){return t==null||typeof t=="boolean"?it(kr):Ee(t)?it(It,null,t.slice()):Fo(t)?Qn(t):it(_a,null,String(t))}function Qn(t){return t.el===null&&t.patchFlag!==-1||t.memo?t:us(t)}function Uc(t,e){let n=0;const{shapeFlag:r}=t;if(e==null)e=null;else if(Ee(e))n=16;else if(typeof e=="object")if(r&65){const s=e.default;s&&(s._c&&(s._d=!1),Uc(t,s()),s._c&&(s._d=!0));return}else{n=32;const s=e._;!s&&!Np(e)?e._ctx=$t:s===3&&$t&&($t.slots._===1?e._=1:(e._=2,t.patchFlag|=1024))}else we(e)?(e={default:e,_ctx:$t},n=32):(e=String(e),r&64?(n=16,e=[Xt(e)]):n=8);t.children=e,t.shapeFlag|=n}function kv(...t){const e={};for(let n=0;n<t.length;n++){const r=t[n];for(const s in r)if(s==="class")e.class!==r.class&&(e.class=Dn([e.class,r.class]));else if(s==="style")e.style=Rc([e.style,r.style]);else if(aa(s)){const i=e[s],o=r[s];o&&i!==o&&!(Ee(i)&&i.includes(o))&&(e[s]=i?[].concat(i,o):o)}else s!==""&&(e[s]=r[s])}return e}function an(t,e,n,r=null){_n(t,e,7,[n,r])}const Vv=kp();let Dv=0;function Nv(t,e,n){const r=t.type,s=(e?e.appContext:t.appContext)||Vv,i={uid:Dv++,vnode:t,type:r,parent:e,appContext:s,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new oy(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:e?e.provides:Object.create(s.provides),ids:e?e.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:xp(r,s),emitsOptions:Hp(r,s),emit:null,emitted:null,propsDefaults:Le,inheritAttrs:r.inheritAttrs,ctx:Le,data:Le,props:Le,attrs:Le,slots:Le,refs:Le,setupState:Le,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return i.ctx={_:i},i.root=e?e.root:i,i.emit=wv.bind(null,i),t.ce&&t.ce(i),i}let bt=null,Uo,Hl;{const t=ha(),e=(n,r)=>{let s;return(s=t[n])||(s=t[n]=[]),s.push(r),i=>{s.length>1?s.forEach(o=>o(i)):s[0](i)}};Uo=e("__VUE_INSTANCE_SETTERS__",n=>bt=n),Hl=e("__VUE_SSR_SETTERS__",n=>gi=n)}const Vi=t=>{const e=bt;return Uo(t),t.scope.on(),()=>{t.scope.off(),Uo(e)}},Jh=()=>{bt&&bt.scope.off(),Uo(null)};function Qp(t){return t.vnode.shapeFlag&4}let gi=!1;function Ov(t,e=!1,n=!1){e&&Hl(e);const{props:r,children:s}=t.vnode,i=Qp(t);av(t,r,i,e),hv(t,s,n);const o=i?xv(t,e):void 0;return e&&Hl(!1),o}function xv(t,e){const n=t.type;t.accessCache=Object.create(null),t.proxy=new Proxy(t.ctx,Zy);const{setup:r}=n;if(r){dr();const s=t.setupContext=r.length>1?Lv(t):null,i=Vi(t),o=Ci(r,t,0,[t.props,s]),l=Kf(o);if(fr(),i(),(l||t.sp)&&!ti(t)&&bp(t),l){if(o.then(Jh,Jh),e)return o.then(c=>{Yh(t,c,e)}).catch(c=>{pa(c,t,0)});t.asyncDep=o}else Yh(t,o,e)}else Jp(t,e)}function Yh(t,e,n){we(e)?t.type.__ssrInlineRender?t.ssrRender=e:t.render=e:qe(e)&&(t.setupState=yp(e)),Jp(t,n)}let Xh;function Jp(t,e,n){const r=t.type;if(!t.render){if(!e&&Xh&&!r.render){const s=r.template||Lc(t).template;if(s){const{isCustomElement:i,compilerOptions:o}=t.appContext.config,{delimiters:l,compilerOptions:c}=r,h=lt(lt({isCustomElement:i,delimiters:l},o),c);r.render=Xh(s,h)}}t.render=r.render||Zt}{const s=Vi(t);dr();try{ev(t)}finally{fr(),s()}}}const Mv={get(t,e){return wt(t,"get",""),t[e]}};function Lv(t){const e=n=>{t.exposed=n||{}};return{attrs:new Proxy(t.attrs,Mv),slots:t.slots,emit:t.emit,expose:e}}function ya(t){return t.exposed?t.exposeProxy||(t.exposeProxy=new Proxy(yp(Ry(t.exposed)),{get(e,n){if(n in e)return e[n];if(n in ni)return ni[n](t)},has(e,n){return n in e||n in ni}})):t.proxy}function Fv(t,e=!0){return we(t)?t.displayName||t.name:t.name||e&&t.__name}function Uv(t){return we(t)&&"__vccOpts"in t}const Be=(t,e)=>Vy(t,e,gi);function Yp(t,e,n){const r=arguments.length;return r===2?qe(e)&&!Ee(e)?Fo(e)?it(t,null,[e]):it(t,e):it(t,null,e):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&Fo(n)&&(n=[n]),it(t,e,n))}const Bv="3.5.13";/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let zl;const Zh=typeof window<"u"&&window.trustedTypes;if(Zh)try{zl=Zh.createPolicy("vue",{createHTML:t=>t})}catch{}const Xp=zl?t=>zl.createHTML(t):t=>t,$v="http://www.w3.org/2000/svg",jv="http://www.w3.org/1998/Math/MathML",An=typeof document<"u"?document:null,ed=An&&An.createElement("template"),qv={insert:(t,e,n)=>{e.insertBefore(t,n||null)},remove:t=>{const e=t.parentNode;e&&e.removeChild(t)},createElement:(t,e,n,r)=>{const s=e==="svg"?An.createElementNS($v,t):e==="mathml"?An.createElementNS(jv,t):n?An.createElement(t,{is:n}):An.createElement(t);return t==="select"&&r&&r.multiple!=null&&s.setAttribute("multiple",r.multiple),s},createText:t=>An.createTextNode(t),createComment:t=>An.createComment(t),setText:(t,e)=>{t.nodeValue=e},setElementText:(t,e)=>{t.textContent=e},parentNode:t=>t.parentNode,nextSibling:t=>t.nextSibling,querySelector:t=>An.querySelector(t),setScopeId(t,e){t.setAttribute(e,"")},insertStaticContent(t,e,n,r,s,i){const o=n?n.previousSibling:e.lastChild;if(s&&(s===i||s.nextSibling))for(;e.insertBefore(s.cloneNode(!0),n),!(s===i||!(s=s.nextSibling)););else{ed.innerHTML=Xp(r==="svg"?`<svg>${t}</svg>`:r==="mathml"?`<math>${t}</math>`:t);const l=ed.content;if(r==="svg"||r==="mathml"){const c=l.firstChild;for(;c.firstChild;)l.appendChild(c.firstChild);l.removeChild(c)}e.insertBefore(l,n)}return[o?o.nextSibling:e.firstChild,n?n.previousSibling:e.lastChild]}},Hv=Symbol("_vtc");function zv(t,e,n){const r=t[Hv];r&&(e=(e?[e,...r]:[...r]).join(" ")),e==null?t.removeAttribute("class"):n?t.setAttribute("class",e):t.className=e}const td=Symbol("_vod"),Gv=Symbol("_vsh"),Wv=Symbol(""),Kv=/(^|;)\s*display\s*:/;function Qv(t,e,n){const r=t.style,s=Ze(n);let i=!1;if(n&&!s){if(e)if(Ze(e))for(const o of e.split(";")){const l=o.slice(0,o.indexOf(":")).trim();n[l]==null&&Io(r,l,"")}else for(const o in e)n[o]==null&&Io(r,o,"");for(const o in n)o==="display"&&(i=!0),Io(r,o,n[o])}else if(s){if(e!==n){const o=r[Wv];o&&(n+=";"+o),r.cssText=n,i=Kv.test(n)}}else e&&t.removeAttribute("style");td in t&&(t[td]=i?r.display:"",t[Gv]&&(r.display="none"))}const nd=/\s*!important$/;function Io(t,e,n){if(Ee(n))n.forEach(r=>Io(t,e,r));else if(n==null&&(n=""),e.startsWith("--"))t.setProperty(e,n);else{const r=Jv(t,e);nd.test(n)?t.setProperty(Lr(r),n.replace(nd,""),"important"):t[r]=n}}const rd=["Webkit","Moz","ms"],pl={};function Jv(t,e){const n=pl[e];if(n)return n;let r=Jt(e);if(r!=="filter"&&r in t)return pl[e]=r;r=ua(r);for(let s=0;s<rd.length;s++){const i=rd[s]+r;if(i in t)return pl[e]=i}return e}const sd="http://www.w3.org/1999/xlink";function id(t,e,n,r,s,i=iy(e)){r&&e.startsWith("xlink:")?n==null?t.removeAttributeNS(sd,e.slice(6,e.length)):t.setAttributeNS(sd,e,n):n==null||i&&!Xf(n)?t.removeAttribute(e):t.setAttribute(e,i?"":hr(n)?String(n):n)}function od(t,e,n,r,s){if(e==="innerHTML"||e==="textContent"){n!=null&&(t[e]=e==="innerHTML"?Xp(n):n);return}const i=t.tagName;if(e==="value"&&i!=="PROGRESS"&&!i.includes("-")){const l=i==="OPTION"?t.getAttribute("value")||"":t.value,c=n==null?t.type==="checkbox"?"on":"":String(n);(l!==c||!("_value"in t))&&(t.value=c),n==null&&t.removeAttribute(e),t._value=n;return}let o=!1;if(n===""||n==null){const l=typeof t[e];l==="boolean"?n=Xf(n):n==null&&l==="string"?(n="",o=!0):l==="number"&&(n=0,o=!0)}try{t[e]=n}catch{}o&&t.removeAttribute(s||e)}function Gr(t,e,n,r){t.addEventListener(e,n,r)}function Yv(t,e,n,r){t.removeEventListener(e,n,r)}const ad=Symbol("_vei");function Xv(t,e,n,r,s=null){const i=t[ad]||(t[ad]={}),o=i[e];if(r&&o)o.value=r;else{const[l,c]=Zv(e);if(r){const h=i[e]=nE(r,s);Gr(t,l,h,c)}else o&&(Yv(t,l,o,c),i[e]=void 0)}}const ld=/(?:Once|Passive|Capture)$/;function Zv(t){let e;if(ld.test(t)){e={};let r;for(;r=t.match(ld);)t=t.slice(0,t.length-r[0].length),e[r[0].toLowerCase()]=!0}return[t[2]===":"?t.slice(3):Lr(t.slice(2)),e]}let ml=0;const eE=Promise.resolve(),tE=()=>ml||(eE.then(()=>ml=0),ml=Date.now());function nE(t,e){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;_n(rE(r,n.value),e,5,[r])};return n.value=t,n.attached=tE(),n}function rE(t,e){if(Ee(e)){const n=t.stopImmediatePropagation;return t.stopImmediatePropagation=()=>{n.call(t),t._stopped=!0},e.map(r=>s=>!s._stopped&&r&&r(s))}else return e}const cd=t=>t.charCodeAt(0)===111&&t.charCodeAt(1)===110&&t.charCodeAt(2)>96&&t.charCodeAt(2)<123,sE=(t,e,n,r,s,i)=>{const o=s==="svg";e==="class"?zv(t,r,o):e==="style"?Qv(t,n,r):aa(e)?Ic(e)||Xv(t,e,n,r,i):(e[0]==="."?(e=e.slice(1),!0):e[0]==="^"?(e=e.slice(1),!1):iE(t,e,r,o))?(od(t,e,r),!t.tagName.includes("-")&&(e==="value"||e==="checked"||e==="selected")&&id(t,e,r,o,i,e!=="value")):t._isVueCE&&(/[A-Z]/.test(e)||!Ze(r))?od(t,Jt(e),r,i,e):(e==="true-value"?t._trueValue=r:e==="false-value"&&(t._falseValue=r),id(t,e,r,o))};function iE(t,e,n,r){if(r)return!!(e==="innerHTML"||e==="textContent"||e in t&&cd(e)&&we(n));if(e==="spellcheck"||e==="draggable"||e==="translate"||e==="form"||e==="list"&&t.tagName==="INPUT"||e==="type"&&t.tagName==="TEXTAREA")return!1;if(e==="width"||e==="height"){const s=t.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return cd(e)&&Ze(n)?!1:e in t}const ud=t=>{const e=t.props["onUpdate:modelValue"]||!1;return Ee(e)?n=>yo(e,n):e};function oE(t){t.target.composing=!0}function hd(t){const e=t.target;e.composing&&(e.composing=!1,e.dispatchEvent(new Event("input")))}const gl=Symbol("_assign"),aE={created(t,{modifiers:{lazy:e,trim:n,number:r}},s){t[gl]=ud(s);const i=r||s.props&&s.props.type==="number";Gr(t,e?"change":"input",o=>{if(o.target.composing)return;let l=t.value;n&&(l=l.trim()),i&&(l=Nl(l)),t[gl](l)}),n&&Gr(t,"change",()=>{t.value=t.value.trim()}),e||(Gr(t,"compositionstart",oE),Gr(t,"compositionend",hd),Gr(t,"change",hd))},mounted(t,{value:e}){t.value=e??""},beforeUpdate(t,{value:e,oldValue:n,modifiers:{lazy:r,trim:s,number:i}},o){if(t[gl]=ud(o),t.composing)return;const l=(i||t.type==="number")&&!/^0\d/.test(t.value)?Nl(t.value):t.value,c=e??"";l!==c&&(document.activeElement===t&&t.type!=="range"&&(r&&e===n||s&&t.value.trim()===c)||(t.value=c))}},lE=["ctrl","shift","alt","meta"],cE={stop:t=>t.stopPropagation(),prevent:t=>t.preventDefault(),self:t=>t.target!==t.currentTarget,ctrl:t=>!t.ctrlKey,shift:t=>!t.shiftKey,alt:t=>!t.altKey,meta:t=>!t.metaKey,left:t=>"button"in t&&t.button!==0,middle:t=>"button"in t&&t.button!==1,right:t=>"button"in t&&t.button!==2,exact:(t,e)=>lE.some(n=>t[`${n}Key`]&&!e.includes(n))},Bc=(t,e)=>{const n=t._withMods||(t._withMods={}),r=e.join(".");return n[r]||(n[r]=(s,...i)=>{for(let o=0;o<e.length;o++){const l=cE[e[o]];if(l&&l(s,e))return}return t(s,...i)})},uE=lt({patchProp:sE},qv);let dd;function hE(){return dd||(dd=fv(uE))}const dE=(...t)=>{const e=hE().createApp(...t),{mount:n}=e;return e.mount=r=>{const s=pE(r);if(!s)return;const i=e._component;!we(i)&&!i.render&&!i.template&&(i.template=s.innerHTML),s.nodeType===1&&(s.textContent="");const o=n(s,!1,fE(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),o},e};function fE(t){if(t instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&t instanceof MathMLElement)return"mathml"}function pE(t){return Ze(t)?document.querySelector(t):t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zp=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},mE=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],c=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},em={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,c=s+2<t.length,h=c?t[s+2]:0,d=i>>2,p=(i&3)<<4|l>>4;let m=(l&15)<<2|h>>6,_=h&63;c||(_=64,o||(m=64)),r.push(n[d],n[p],n[m],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Zp(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):mE(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const h=s<t.length?n[t.charAt(s)]:64;++s;const p=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||h==null||p==null)throw new gE;const m=i<<2|l>>4;if(r.push(m),h!==64){const _=l<<4&240|h>>2;if(r.push(_),p!==64){const S=h<<6&192|p;r.push(S)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class gE extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const _E=function(t){const e=Zp(t);return em.encodeByteArray(e,!0)},Bo=function(t){return _E(t).replace(/\./g,"")},tm=function(t){try{return em.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yE(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vE=()=>yE().__FIREBASE_DEFAULTS__,EE=()=>{if(typeof process>"u"||typeof process.env>"u")return;const t={}.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},wE=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&tm(t[1]);return e&&JSON.parse(e)},va=()=>{try{return vE()||EE()||wE()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},nm=t=>{var e,n;return(n=(e=va())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},TE=t=>{const e=nm(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},rm=()=>{var t;return(t=va())===null||t===void 0?void 0:t.config},sm=t=>{var e;return(e=va())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IE{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t),l="";return[Bo(JSON.stringify(n)),Bo(JSON.stringify(o)),l].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pt(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function bE(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Pt())}function RE(){var t;const e=(t=va())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function SE(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function PE(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function CE(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function kE(){const t=Pt();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function VE(){return!RE()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function DE(){try{return typeof indexedDB=="object"}catch{return!1}}function NE(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE="FirebaseError";class Un extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=OE,Object.setPrototypeOf(this,Un.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Di.prototype.create)}}class Di{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?xE(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new Un(s,l,r)}}function xE(t,e){return t.replace(ME,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const ME=/\{\$([^}]+)}/g;function LE(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function $o(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(fd(i)&&fd(o)){if(!$o(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function fd(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ni(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function FE(t,e){const n=new UE(t,e);return n.subscribe.bind(n)}class UE{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");BE(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=_l),s.error===void 0&&(s.error=_l),s.complete===void 0&&(s.complete=_l);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function BE(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function _l(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(t){return t&&t._delegate?t._delegate:t}class Vr{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new IE;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(qE(e))try{this.getOrInitializeService({instanceIdentifier:Tr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Tr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tr){return this.instances.has(e)}getOptions(e=Tr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:jE(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tr){return this.component?this.component.multipleInstances?e:Tr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function jE(t){return t===Tr?void 0:t}function qE(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HE{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new $E(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var be;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(be||(be={}));const zE={debug:be.DEBUG,verbose:be.VERBOSE,info:be.INFO,warn:be.WARN,error:be.ERROR,silent:be.SILENT},GE=be.INFO,WE={[be.DEBUG]:"log",[be.VERBOSE]:"log",[be.INFO]:"info",[be.WARN]:"warn",[be.ERROR]:"error"},KE=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=WE[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $c{constructor(e){this.name=e,this._logLevel=GE,this._logHandler=KE,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in be))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?zE[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,be.DEBUG,...e),this._logHandler(this,be.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,be.VERBOSE,...e),this._logHandler(this,be.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,be.INFO,...e),this._logHandler(this,be.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,be.WARN,...e),this._logHandler(this,be.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,be.ERROR,...e),this._logHandler(this,be.ERROR,...e)}}const QE=(t,e)=>e.some(n=>t instanceof n);let pd,md;function JE(){return pd||(pd=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function YE(){return md||(md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const im=new WeakMap,Gl=new WeakMap,om=new WeakMap,yl=new WeakMap,jc=new WeakMap;function XE(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(rr(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&im.set(n,t)}).catch(()=>{}),jc.set(e,t),e}function ZE(t){if(Gl.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});Gl.set(t,e)}let Wl={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Gl.get(t);if(e==="objectStoreNames")return t.objectStoreNames||om.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return rr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function ew(t){Wl=t(Wl)}function tw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(vl(this),e,...n);return om.set(r,e.sort?e.sort():[e]),rr(r)}:YE().includes(t)?function(...e){return t.apply(vl(this),e),rr(im.get(this))}:function(...e){return rr(t.apply(vl(this),e))}}function nw(t){return typeof t=="function"?tw(t):(t instanceof IDBTransaction&&ZE(t),QE(t,JE())?new Proxy(t,Wl):t)}function rr(t){if(t instanceof IDBRequest)return XE(t);if(yl.has(t))return yl.get(t);const e=nw(t);return e!==t&&(yl.set(t,e),jc.set(e,t)),e}const vl=t=>jc.get(t);function rw(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=rr(o);return r&&o.addEventListener("upgradeneeded",c=>{r(rr(o.result),c.oldVersion,c.newVersion,rr(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),l.then(c=>{i&&c.addEventListener("close",()=>i()),s&&c.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),l}const sw=["get","getKey","getAll","getAllKeys","count"],iw=["put","add","delete","clear"],El=new Map;function gd(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(El.get(e))return El.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=iw.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||sw.includes(n)))return;const i=async function(o,...l){const c=this.transaction(o,s?"readwrite":"readonly");let h=c.store;return r&&(h=h.index(l.shift())),(await Promise.all([h[n](...l),s&&c.done]))[0]};return El.set(e,i),i}ew(t=>({...t,get:(e,n,r)=>gd(e,n)||t.get(e,n,r),has:(e,n)=>!!gd(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ow{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(aw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function aw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Kl="@firebase/app",_d="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On=new $c("@firebase/app"),lw="@firebase/app-compat",cw="@firebase/analytics-compat",uw="@firebase/analytics",hw="@firebase/app-check-compat",dw="@firebase/app-check",fw="@firebase/auth",pw="@firebase/auth-compat",mw="@firebase/database",gw="@firebase/data-connect",_w="@firebase/database-compat",yw="@firebase/functions",vw="@firebase/functions-compat",Ew="@firebase/installations",ww="@firebase/installations-compat",Tw="@firebase/messaging",Iw="@firebase/messaging-compat",Aw="@firebase/performance",bw="@firebase/performance-compat",Rw="@firebase/remote-config",Sw="@firebase/remote-config-compat",Pw="@firebase/storage",Cw="@firebase/storage-compat",kw="@firebase/firestore",Vw="@firebase/vertexai-preview",Dw="@firebase/firestore-compat",Nw="firebase",Ow="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql="[DEFAULT]",xw={[Kl]:"fire-core",[lw]:"fire-core-compat",[uw]:"fire-analytics",[cw]:"fire-analytics-compat",[dw]:"fire-app-check",[hw]:"fire-app-check-compat",[fw]:"fire-auth",[pw]:"fire-auth-compat",[mw]:"fire-rtdb",[gw]:"fire-data-connect",[_w]:"fire-rtdb-compat",[yw]:"fire-fn",[vw]:"fire-fn-compat",[Ew]:"fire-iid",[ww]:"fire-iid-compat",[Tw]:"fire-fcm",[Iw]:"fire-fcm-compat",[Aw]:"fire-perf",[bw]:"fire-perf-compat",[Rw]:"fire-rc",[Sw]:"fire-rc-compat",[Pw]:"fire-gcs",[Cw]:"fire-gcs-compat",[kw]:"fire-fst",[Dw]:"fire-fst-compat",[Vw]:"fire-vertex","fire-js":"fire-js",[Nw]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jo=new Map,Mw=new Map,Jl=new Map;function yd(t,e){try{t.container.addComponent(e)}catch(n){On.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function hs(t){const e=t.name;if(Jl.has(e))return On.debug(`There were multiple attempts to register component ${e}.`),!1;Jl.set(e,t);for(const n of jo.values())yd(n,t);for(const n of Mw.values())yd(n,t);return!0}function qc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Pn(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lw={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},sr=new Di("app","Firebase",Lw);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fw{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Vr("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw sr.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ts=Ow;function am(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Ql,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw sr.create("bad-app-name",{appName:String(s)});if(n||(n=rm()),!n)throw sr.create("no-options");const i=jo.get(s);if(i){if($o(n,i.options)&&$o(r,i.config))return i;throw sr.create("duplicate-app",{appName:s})}const o=new HE(s);for(const c of Jl.values())o.addComponent(c);const l=new Fw(n,r,o);return jo.set(s,l),l}function lm(t=Ql){const e=jo.get(t);if(!e&&t===Ql&&rm())return am();if(!e)throw sr.create("no-app",{appName:t});return e}function ir(t,e,n){var r;let s=(r=xw[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),On.warn(l.join(" "));return}hs(new Vr(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uw="firebase-heartbeat-database",Bw=1,_i="firebase-heartbeat-store";let wl=null;function cm(){return wl||(wl=rw(Uw,Bw,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(_i)}catch(n){console.warn(n)}}}}).catch(t=>{throw sr.create("idb-open",{originalErrorMessage:t.message})})),wl}async function $w(t){try{const n=(await cm()).transaction(_i),r=await n.objectStore(_i).get(um(t));return await n.done,r}catch(e){if(e instanceof Un)On.warn(e.message);else{const n=sr.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});On.warn(n.message)}}}async function vd(t,e){try{const r=(await cm()).transaction(_i,"readwrite");await r.objectStore(_i).put(e,um(t)),await r.done}catch(n){if(n instanceof Un)On.warn(n.message);else{const r=sr.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});On.warn(r.message)}}}function um(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jw=1024,qw=30*24*60*60*1e3;class Hw{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Gw(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Ed();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=qw}),this._storage.overwrite(this._heartbeatsCache))}catch(r){On.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ed(),{heartbeatsToSend:r,unsentEntries:s}=zw(this._heartbeatsCache.heartbeats),i=Bo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return On.warn(n),""}}}function Ed(){return new Date().toISOString().substring(0,10)}function zw(t,e=jw){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),wd(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),wd(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Gw{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return DE()?NE().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await $w(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return vd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return vd(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function wd(t){return Bo(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ww(t){hs(new Vr("platform-logger",e=>new ow(e),"PRIVATE")),hs(new Vr("heartbeat",e=>new Hw(e),"PRIVATE")),ir(Kl,_d,t),ir(Kl,_d,"esm2017"),ir("fire-js","")}Ww("");var Kw="firebase",Qw="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ir(Kw,Qw,"app");var Td=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Sr,hm;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(A,y){function v(){}v.prototype=y.prototype,A.D=y.prototype,A.prototype=new v,A.prototype.constructor=A,A.C=function(b,I,R){for(var E=Array(arguments.length-2),U=2;U<arguments.length;U++)E[U-2]=arguments[U];return y.prototype[I].apply(b,E)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(A,y,v){v||(v=0);var b=Array(16);if(typeof y=="string")for(var I=0;16>I;++I)b[I]=y.charCodeAt(v++)|y.charCodeAt(v++)<<8|y.charCodeAt(v++)<<16|y.charCodeAt(v++)<<24;else for(I=0;16>I;++I)b[I]=y[v++]|y[v++]<<8|y[v++]<<16|y[v++]<<24;y=A.g[0],v=A.g[1],I=A.g[2];var R=A.g[3],E=y+(R^v&(I^R))+b[0]+3614090360&4294967295;y=v+(E<<7&4294967295|E>>>25),E=R+(I^y&(v^I))+b[1]+3905402710&4294967295,R=y+(E<<12&4294967295|E>>>20),E=I+(v^R&(y^v))+b[2]+606105819&4294967295,I=R+(E<<17&4294967295|E>>>15),E=v+(y^I&(R^y))+b[3]+3250441966&4294967295,v=I+(E<<22&4294967295|E>>>10),E=y+(R^v&(I^R))+b[4]+4118548399&4294967295,y=v+(E<<7&4294967295|E>>>25),E=R+(I^y&(v^I))+b[5]+1200080426&4294967295,R=y+(E<<12&4294967295|E>>>20),E=I+(v^R&(y^v))+b[6]+2821735955&4294967295,I=R+(E<<17&4294967295|E>>>15),E=v+(y^I&(R^y))+b[7]+4249261313&4294967295,v=I+(E<<22&4294967295|E>>>10),E=y+(R^v&(I^R))+b[8]+1770035416&4294967295,y=v+(E<<7&4294967295|E>>>25),E=R+(I^y&(v^I))+b[9]+2336552879&4294967295,R=y+(E<<12&4294967295|E>>>20),E=I+(v^R&(y^v))+b[10]+4294925233&4294967295,I=R+(E<<17&4294967295|E>>>15),E=v+(y^I&(R^y))+b[11]+2304563134&4294967295,v=I+(E<<22&4294967295|E>>>10),E=y+(R^v&(I^R))+b[12]+1804603682&4294967295,y=v+(E<<7&4294967295|E>>>25),E=R+(I^y&(v^I))+b[13]+4254626195&4294967295,R=y+(E<<12&4294967295|E>>>20),E=I+(v^R&(y^v))+b[14]+2792965006&4294967295,I=R+(E<<17&4294967295|E>>>15),E=v+(y^I&(R^y))+b[15]+1236535329&4294967295,v=I+(E<<22&4294967295|E>>>10),E=y+(I^R&(v^I))+b[1]+4129170786&4294967295,y=v+(E<<5&4294967295|E>>>27),E=R+(v^I&(y^v))+b[6]+3225465664&4294967295,R=y+(E<<9&4294967295|E>>>23),E=I+(y^v&(R^y))+b[11]+643717713&4294967295,I=R+(E<<14&4294967295|E>>>18),E=v+(R^y&(I^R))+b[0]+3921069994&4294967295,v=I+(E<<20&4294967295|E>>>12),E=y+(I^R&(v^I))+b[5]+3593408605&4294967295,y=v+(E<<5&4294967295|E>>>27),E=R+(v^I&(y^v))+b[10]+38016083&4294967295,R=y+(E<<9&4294967295|E>>>23),E=I+(y^v&(R^y))+b[15]+3634488961&4294967295,I=R+(E<<14&4294967295|E>>>18),E=v+(R^y&(I^R))+b[4]+3889429448&4294967295,v=I+(E<<20&4294967295|E>>>12),E=y+(I^R&(v^I))+b[9]+568446438&4294967295,y=v+(E<<5&4294967295|E>>>27),E=R+(v^I&(y^v))+b[14]+3275163606&4294967295,R=y+(E<<9&4294967295|E>>>23),E=I+(y^v&(R^y))+b[3]+4107603335&4294967295,I=R+(E<<14&4294967295|E>>>18),E=v+(R^y&(I^R))+b[8]+1163531501&4294967295,v=I+(E<<20&4294967295|E>>>12),E=y+(I^R&(v^I))+b[13]+2850285829&4294967295,y=v+(E<<5&4294967295|E>>>27),E=R+(v^I&(y^v))+b[2]+4243563512&4294967295,R=y+(E<<9&4294967295|E>>>23),E=I+(y^v&(R^y))+b[7]+1735328473&4294967295,I=R+(E<<14&4294967295|E>>>18),E=v+(R^y&(I^R))+b[12]+2368359562&4294967295,v=I+(E<<20&4294967295|E>>>12),E=y+(v^I^R)+b[5]+4294588738&4294967295,y=v+(E<<4&4294967295|E>>>28),E=R+(y^v^I)+b[8]+2272392833&4294967295,R=y+(E<<11&4294967295|E>>>21),E=I+(R^y^v)+b[11]+1839030562&4294967295,I=R+(E<<16&4294967295|E>>>16),E=v+(I^R^y)+b[14]+4259657740&4294967295,v=I+(E<<23&4294967295|E>>>9),E=y+(v^I^R)+b[1]+2763975236&4294967295,y=v+(E<<4&4294967295|E>>>28),E=R+(y^v^I)+b[4]+1272893353&4294967295,R=y+(E<<11&4294967295|E>>>21),E=I+(R^y^v)+b[7]+4139469664&4294967295,I=R+(E<<16&4294967295|E>>>16),E=v+(I^R^y)+b[10]+3200236656&4294967295,v=I+(E<<23&4294967295|E>>>9),E=y+(v^I^R)+b[13]+681279174&4294967295,y=v+(E<<4&4294967295|E>>>28),E=R+(y^v^I)+b[0]+3936430074&4294967295,R=y+(E<<11&4294967295|E>>>21),E=I+(R^y^v)+b[3]+3572445317&4294967295,I=R+(E<<16&4294967295|E>>>16),E=v+(I^R^y)+b[6]+76029189&4294967295,v=I+(E<<23&4294967295|E>>>9),E=y+(v^I^R)+b[9]+3654602809&4294967295,y=v+(E<<4&4294967295|E>>>28),E=R+(y^v^I)+b[12]+3873151461&4294967295,R=y+(E<<11&4294967295|E>>>21),E=I+(R^y^v)+b[15]+530742520&4294967295,I=R+(E<<16&4294967295|E>>>16),E=v+(I^R^y)+b[2]+3299628645&4294967295,v=I+(E<<23&4294967295|E>>>9),E=y+(I^(v|~R))+b[0]+4096336452&4294967295,y=v+(E<<6&4294967295|E>>>26),E=R+(v^(y|~I))+b[7]+1126891415&4294967295,R=y+(E<<10&4294967295|E>>>22),E=I+(y^(R|~v))+b[14]+2878612391&4294967295,I=R+(E<<15&4294967295|E>>>17),E=v+(R^(I|~y))+b[5]+4237533241&4294967295,v=I+(E<<21&4294967295|E>>>11),E=y+(I^(v|~R))+b[12]+1700485571&4294967295,y=v+(E<<6&4294967295|E>>>26),E=R+(v^(y|~I))+b[3]+2399980690&4294967295,R=y+(E<<10&4294967295|E>>>22),E=I+(y^(R|~v))+b[10]+4293915773&4294967295,I=R+(E<<15&4294967295|E>>>17),E=v+(R^(I|~y))+b[1]+2240044497&4294967295,v=I+(E<<21&4294967295|E>>>11),E=y+(I^(v|~R))+b[8]+1873313359&4294967295,y=v+(E<<6&4294967295|E>>>26),E=R+(v^(y|~I))+b[15]+4264355552&4294967295,R=y+(E<<10&4294967295|E>>>22),E=I+(y^(R|~v))+b[6]+2734768916&4294967295,I=R+(E<<15&4294967295|E>>>17),E=v+(R^(I|~y))+b[13]+1309151649&4294967295,v=I+(E<<21&4294967295|E>>>11),E=y+(I^(v|~R))+b[4]+4149444226&4294967295,y=v+(E<<6&4294967295|E>>>26),E=R+(v^(y|~I))+b[11]+3174756917&4294967295,R=y+(E<<10&4294967295|E>>>22),E=I+(y^(R|~v))+b[2]+718787259&4294967295,I=R+(E<<15&4294967295|E>>>17),E=v+(R^(I|~y))+b[9]+3951481745&4294967295,A.g[0]=A.g[0]+y&4294967295,A.g[1]=A.g[1]+(I+(E<<21&4294967295|E>>>11))&4294967295,A.g[2]=A.g[2]+I&4294967295,A.g[3]=A.g[3]+R&4294967295}r.prototype.u=function(A,y){y===void 0&&(y=A.length);for(var v=y-this.blockSize,b=this.B,I=this.h,R=0;R<y;){if(I==0)for(;R<=v;)s(this,A,R),R+=this.blockSize;if(typeof A=="string"){for(;R<y;)if(b[I++]=A.charCodeAt(R++),I==this.blockSize){s(this,b),I=0;break}}else for(;R<y;)if(b[I++]=A[R++],I==this.blockSize){s(this,b),I=0;break}}this.h=I,this.o+=y},r.prototype.v=function(){var A=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);A[0]=128;for(var y=1;y<A.length-8;++y)A[y]=0;var v=8*this.o;for(y=A.length-8;y<A.length;++y)A[y]=v&255,v/=256;for(this.u(A),A=Array(16),y=v=0;4>y;++y)for(var b=0;32>b;b+=8)A[v++]=this.g[y]>>>b&255;return A};function i(A,y){var v=l;return Object.prototype.hasOwnProperty.call(v,A)?v[A]:v[A]=y(A)}function o(A,y){this.h=y;for(var v=[],b=!0,I=A.length-1;0<=I;I--){var R=A[I]|0;b&&R==y||(v[I]=R,b=!1)}this.g=v}var l={};function c(A){return-128<=A&&128>A?i(A,function(y){return new o([y|0],0>y?-1:0)}):new o([A|0],0>A?-1:0)}function h(A){if(isNaN(A)||!isFinite(A))return p;if(0>A)return D(h(-A));for(var y=[],v=1,b=0;A>=v;b++)y[b]=A/v|0,v*=4294967296;return new o(y,0)}function d(A,y){if(A.length==0)throw Error("number format error: empty string");if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(A.charAt(0)=="-")return D(d(A.substring(1),y));if(0<=A.indexOf("-"))throw Error('number format error: interior "-" character');for(var v=h(Math.pow(y,8)),b=p,I=0;I<A.length;I+=8){var R=Math.min(8,A.length-I),E=parseInt(A.substring(I,I+R),y);8>R?(R=h(Math.pow(y,R)),b=b.j(R).add(h(E))):(b=b.j(v),b=b.add(h(E)))}return b}var p=c(0),m=c(1),_=c(16777216);t=o.prototype,t.m=function(){if(k(this))return-D(this).m();for(var A=0,y=1,v=0;v<this.g.length;v++){var b=this.i(v);A+=(0<=b?b:4294967296+b)*y,y*=4294967296}return A},t.toString=function(A){if(A=A||10,2>A||36<A)throw Error("radix out of range: "+A);if(S(this))return"0";if(k(this))return"-"+D(this).toString(A);for(var y=h(Math.pow(A,6)),v=this,b="";;){var I=H(v,y).g;v=F(v,I.j(y));var R=((0<v.g.length?v.g[0]:v.h)>>>0).toString(A);if(v=I,S(v))return R+b;for(;6>R.length;)R="0"+R;b=R+b}},t.i=function(A){return 0>A?0:A<this.g.length?this.g[A]:this.h};function S(A){if(A.h!=0)return!1;for(var y=0;y<A.g.length;y++)if(A.g[y]!=0)return!1;return!0}function k(A){return A.h==-1}t.l=function(A){return A=F(this,A),k(A)?-1:S(A)?0:1};function D(A){for(var y=A.g.length,v=[],b=0;b<y;b++)v[b]=~A.g[b];return new o(v,~A.h).add(m)}t.abs=function(){return k(this)?D(this):this},t.add=function(A){for(var y=Math.max(this.g.length,A.g.length),v=[],b=0,I=0;I<=y;I++){var R=b+(this.i(I)&65535)+(A.i(I)&65535),E=(R>>>16)+(this.i(I)>>>16)+(A.i(I)>>>16);b=E>>>16,R&=65535,E&=65535,v[I]=E<<16|R}return new o(v,v[v.length-1]&-2147483648?-1:0)};function F(A,y){return A.add(D(y))}t.j=function(A){if(S(this)||S(A))return p;if(k(this))return k(A)?D(this).j(D(A)):D(D(this).j(A));if(k(A))return D(this.j(D(A)));if(0>this.l(_)&&0>A.l(_))return h(this.m()*A.m());for(var y=this.g.length+A.g.length,v=[],b=0;b<2*y;b++)v[b]=0;for(b=0;b<this.g.length;b++)for(var I=0;I<A.g.length;I++){var R=this.i(b)>>>16,E=this.i(b)&65535,U=A.i(I)>>>16,J=A.i(I)&65535;v[2*b+2*I]+=E*J,L(v,2*b+2*I),v[2*b+2*I+1]+=R*J,L(v,2*b+2*I+1),v[2*b+2*I+1]+=E*U,L(v,2*b+2*I+1),v[2*b+2*I+2]+=R*U,L(v,2*b+2*I+2)}for(b=0;b<y;b++)v[b]=v[2*b+1]<<16|v[2*b];for(b=y;b<2*y;b++)v[b]=0;return new o(v,0)};function L(A,y){for(;(A[y]&65535)!=A[y];)A[y+1]+=A[y]>>>16,A[y]&=65535,y++}function $(A,y){this.g=A,this.h=y}function H(A,y){if(S(y))throw Error("division by zero");if(S(A))return new $(p,p);if(k(A))return y=H(D(A),y),new $(D(y.g),D(y.h));if(k(y))return y=H(A,D(y)),new $(D(y.g),y.h);if(30<A.g.length){if(k(A)||k(y))throw Error("slowDivide_ only works with positive integers.");for(var v=m,b=y;0>=b.l(A);)v=ce(v),b=ce(b);var I=le(v,1),R=le(b,1);for(b=le(b,2),v=le(v,2);!S(b);){var E=R.add(b);0>=E.l(A)&&(I=I.add(v),R=E),b=le(b,1),v=le(v,1)}return y=F(A,I.j(y)),new $(I,y)}for(I=p;0<=A.l(y);){for(v=Math.max(1,Math.floor(A.m()/y.m())),b=Math.ceil(Math.log(v)/Math.LN2),b=48>=b?1:Math.pow(2,b-48),R=h(v),E=R.j(y);k(E)||0<E.l(A);)v-=b,R=h(v),E=R.j(y);S(R)&&(R=m),I=I.add(R),A=F(A,E)}return new $(I,A)}t.A=function(A){return H(this,A).h},t.and=function(A){for(var y=Math.max(this.g.length,A.g.length),v=[],b=0;b<y;b++)v[b]=this.i(b)&A.i(b);return new o(v,this.h&A.h)},t.or=function(A){for(var y=Math.max(this.g.length,A.g.length),v=[],b=0;b<y;b++)v[b]=this.i(b)|A.i(b);return new o(v,this.h|A.h)},t.xor=function(A){for(var y=Math.max(this.g.length,A.g.length),v=[],b=0;b<y;b++)v[b]=this.i(b)^A.i(b);return new o(v,this.h^A.h)};function ce(A){for(var y=A.g.length+1,v=[],b=0;b<y;b++)v[b]=A.i(b)<<1|A.i(b-1)>>>31;return new o(v,A.h)}function le(A,y){var v=y>>5;y%=32;for(var b=A.g.length-v,I=[],R=0;R<b;R++)I[R]=0<y?A.i(R+v)>>>y|A.i(R+v+1)<<32-y:A.i(R+v);return new o(I,A.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,hm=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=d,Sr=o}).apply(typeof Td<"u"?Td:typeof self<"u"?self:typeof window<"u"?window:{});var ho=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var dm,Ks,fm,Ao,Yl,pm,mm,gm;(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,u,f){return a==Array.prototype||a==Object.prototype||(a[u]=f.value),a};function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ho=="object"&&ho];for(var u=0;u<a.length;++u){var f=a[u];if(f&&f.Math==Math)return f}throw Error("Cannot find global object")}var r=n(this);function s(a,u){if(u)e:{var f=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var P=a[g];if(!(P in f))break e;f=f[P]}a=a[a.length-1],g=f[a],u=u(g),u!=g&&u!=null&&e(f,a,{configurable:!0,writable:!0,value:u})}}function i(a,u){a instanceof String&&(a+="");var f=0,g=!1,P={next:function(){if(!g&&f<a.length){var V=f++;return{value:u(V,a[V]),done:!1}}return g=!0,{done:!0,value:void 0}}};return P[Symbol.iterator]=function(){return P},P}s("Array.prototype.values",function(a){return a||function(){return i(this,function(u,f){return f})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function c(a){var u=typeof a;return u=u!="object"?u:a?Array.isArray(a)?"array":u:"null",u=="array"||u=="object"&&typeof a.length=="number"}function h(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function d(a,u,f){return a.call.apply(a.bind,arguments)}function p(a,u,f){if(!a)throw Error();if(2<arguments.length){var g=Array.prototype.slice.call(arguments,2);return function(){var P=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(P,g),a.apply(u,P)}}return function(){return a.apply(u,arguments)}}function m(a,u,f){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?d:p,m.apply(null,arguments)}function _(a,u){var f=Array.prototype.slice.call(arguments,1);return function(){var g=f.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function S(a,u){function f(){}f.prototype=u.prototype,a.aa=u.prototype,a.prototype=new f,a.prototype.constructor=a,a.Qb=function(g,P,V){for(var K=Array(arguments.length-2),Me=2;Me<arguments.length;Me++)K[Me-2]=arguments[Me];return u.prototype[P].apply(g,K)}}function k(a){const u=a.length;if(0<u){const f=Array(u);for(let g=0;g<u;g++)f[g]=a[g];return f}return[]}function D(a,u){for(let f=1;f<arguments.length;f++){const g=arguments[f];if(c(g)){const P=a.length||0,V=g.length||0;a.length=P+V;for(let K=0;K<V;K++)a[P+K]=g[K]}else a.push(g)}}class F{constructor(u,f){this.i=u,this.j=f,this.h=0,this.g=null}get(){let u;return 0<this.h?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function L(a){return/^[\s\xa0]*$/.test(a)}function $(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function H(a){return H[" "](a),a}H[" "]=function(){};var ce=$().indexOf("Gecko")!=-1&&!($().toLowerCase().indexOf("webkit")!=-1&&$().indexOf("Edge")==-1)&&!($().indexOf("Trident")!=-1||$().indexOf("MSIE")!=-1)&&$().indexOf("Edge")==-1;function le(a,u,f){for(const g in a)u.call(f,a[g],g,a)}function A(a,u){for(const f in a)u.call(void 0,a[f],f,a)}function y(a){const u={};for(const f in a)u[f]=a[f];return u}const v="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function b(a,u){let f,g;for(let P=1;P<arguments.length;P++){g=arguments[P];for(f in g)a[f]=g[f];for(let V=0;V<v.length;V++)f=v[V],Object.prototype.hasOwnProperty.call(g,f)&&(a[f]=g[f])}}function I(a){var u=1;a=a.split(":");const f=[];for(;0<u&&a.length;)f.push(a.shift()),u--;return a.length&&f.push(a.join(":")),f}function R(a){l.setTimeout(()=>{throw a},0)}function E(){var a=tt;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class U{constructor(){this.h=this.g=null}add(u,f){const g=J.get();g.set(u,f),this.h?this.h.next=g:this.g=g,this.h=g}}var J=new F(()=>new fe,a=>a.reset());class fe{constructor(){this.next=this.g=this.h=null}set(u,f){this.h=u,this.g=f,this.next=null}reset(){this.next=this.g=this.h=null}}let Z,ue=!1,tt=new U,zt=()=>{const a=l.Promise.resolve(void 0);Z=()=>{a.then(Gt)}};var Gt=()=>{for(var a;a=E();){try{a.h.call(a.g)}catch(f){R(f)}var u=J;u.j(a),100>u.h&&(u.h++,a.next=u.g,u.g=a)}ue=!1};function He(){this.s=this.s,this.C=this.C}He.prototype.s=!1,He.prototype.ma=function(){this.s||(this.s=!0,this.N())},He.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function ze(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}ze.prototype.h=function(){this.defaultPrevented=!0};var $n=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const f=()=>{};l.addEventListener("test",f,u),l.removeEventListener("test",f,u)}catch{}return a}();function on(a,u){if(ze.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var f=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget){if(ce){e:{try{H(u.nodeName);var P=!0;break e}catch{}P=!1}P||(u=null)}}else f=="mouseover"?u=a.fromElement:f=="mouseout"&&(u=a.toElement);this.relatedTarget=u,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Ot[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&on.aa.h.call(this)}}S(on,ze);var Ot={2:"touch",3:"pen",4:"mouse"};on.prototype.h=function(){on.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var x="closure_listenable_"+(1e6*Math.random()|0),te=0;function Y(a,u,f,g,P){this.listener=a,this.proxy=null,this.src=u,this.type=f,this.capture=!!g,this.ha=P,this.key=++te,this.da=this.fa=!1}function ne(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Ae(a){this.src=a,this.g={},this.h=0}Ae.prototype.add=function(a,u,f,g,P){var V=a.toString();a=this.g[V],a||(a=this.g[V]=[],this.h++);var K=w(a,u,g,P);return-1<K?(u=a[K],f||(u.fa=!1)):(u=new Y(u,this.src,V,!!g,P),u.fa=f,a.push(u)),u};function xe(a,u){var f=u.type;if(f in a.g){var g=a.g[f],P=Array.prototype.indexOf.call(g,u,void 0),V;(V=0<=P)&&Array.prototype.splice.call(g,P,1),V&&(ne(u),a.g[f].length==0&&(delete a.g[f],a.h--))}}function w(a,u,f,g){for(var P=0;P<a.length;++P){var V=a[P];if(!V.da&&V.listener==u&&V.capture==!!f&&V.ha==g)return P}return-1}var T="closure_lm_"+(1e6*Math.random()|0),C={};function B(a,u,f,g,P){if(g&&g.once)return Q(a,u,f,g,P);if(Array.isArray(u)){for(var V=0;V<u.length;V++)B(a,u[V],f,g,P);return null}return f=me(f),a&&a[x]?a.K(u,f,h(g)?!!g.capture:!!g,P):O(a,u,f,!1,g,P)}function O(a,u,f,g,P,V){if(!u)throw Error("Invalid event type");var K=h(P)?!!P.capture:!!P,Me=ee(a);if(Me||(a[T]=Me=new Ae(a)),f=Me.add(u,f,g,K,V),f.proxy)return f;if(g=q(),f.proxy=g,g.src=a,g.listener=f,a.addEventListener)$n||(P=K),P===void 0&&(P=!1),a.addEventListener(u.toString(),g,P);else if(a.attachEvent)a.attachEvent(z(u.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return f}function q(){function a(f){return u.call(a.src,a.listener,f)}const u=he;return a}function Q(a,u,f,g,P){if(Array.isArray(u)){for(var V=0;V<u.length;V++)Q(a,u[V],f,g,P);return null}return f=me(f),a&&a[x]?a.L(u,f,h(g)?!!g.capture:!!g,P):O(a,u,f,!0,g,P)}function W(a,u,f,g,P){if(Array.isArray(u))for(var V=0;V<u.length;V++)W(a,u[V],f,g,P);else g=h(g)?!!g.capture:!!g,f=me(f),a&&a[x]?(a=a.i,u=String(u).toString(),u in a.g&&(V=a.g[u],f=w(V,f,g,P),-1<f&&(ne(V[f]),Array.prototype.splice.call(V,f,1),V.length==0&&(delete a.g[u],a.h--)))):a&&(a=ee(a))&&(u=a.g[u.toString()],a=-1,u&&(a=w(u,f,g,P)),(f=-1<a?u[a]:null)&&G(f))}function G(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[x])xe(u.i,a);else{var f=a.type,g=a.proxy;u.removeEventListener?u.removeEventListener(f,g,a.capture):u.detachEvent?u.detachEvent(z(f),g):u.addListener&&u.removeListener&&u.removeListener(g),(f=ee(u))?(xe(f,a),f.h==0&&(f.src=null,u[T]=null)):ne(a)}}}function z(a){return a in C?C[a]:C[a]="on"+a}function he(a,u){if(a.da)a=!0;else{u=new on(u,this);var f=a.listener,g=a.ha||a.src;a.fa&&G(a),a=f.call(g,u)}return a}function ee(a){return a=a[T],a instanceof Ae?a:null}var se="__closure_events_fn_"+(1e9*Math.random()>>>0);function me(a){return typeof a=="function"?a:(a[se]||(a[se]=function(u){return a.handleEvent(u)}),a[se])}function de(){He.call(this),this.i=new Ae(this),this.M=this,this.F=null}S(de,He),de.prototype[x]=!0,de.prototype.removeEventListener=function(a,u,f,g){W(this,a,u,f,g)};function Te(a,u){var f,g=a.F;if(g)for(f=[];g;g=g.F)f.push(g);if(a=a.M,g=u.type||u,typeof u=="string")u=new ze(u,a);else if(u instanceof ze)u.target=u.target||a;else{var P=u;u=new ze(g,a),b(u,P)}if(P=!0,f)for(var V=f.length-1;0<=V;V--){var K=u.g=f[V];P=Re(K,g,!0,u)&&P}if(K=u.g=a,P=Re(K,g,!0,u)&&P,P=Re(K,g,!1,u)&&P,f)for(V=0;V<f.length;V++)K=u.g=f[V],P=Re(K,g,!1,u)&&P}de.prototype.N=function(){if(de.aa.N.call(this),this.i){var a=this.i,u;for(u in a.g){for(var f=a.g[u],g=0;g<f.length;g++)ne(f[g]);delete a.g[u],a.h--}}this.F=null},de.prototype.K=function(a,u,f,g){return this.i.add(String(a),u,!1,f,g)},de.prototype.L=function(a,u,f,g){return this.i.add(String(a),u,!0,f,g)};function Re(a,u,f,g){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();for(var P=!0,V=0;V<u.length;++V){var K=u[V];if(K&&!K.da&&K.capture==f){var Me=K.listener,ut=K.ha||K.src;K.fa&&xe(a.i,K),P=Me.call(ut,g)!==!1&&P}}return P&&!g.defaultPrevented}function gt(a,u,f){if(typeof a=="function")f&&(a=m(a,f));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(u)?-1:l.setTimeout(a,u||0)}function nt(a){a.g=gt(()=>{a.g=null,a.i&&(a.i=!1,nt(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class xt extends He{constructor(u,f){super(),this.m=u,this.l=f,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:nt(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function rt(a){He.call(this),this.h=a,this.g={}}S(rt,He);var jn=[];function Cs(a){le(a.g,function(u,f){this.g.hasOwnProperty(f)&&G(u)},a),a.g={}}rt.prototype.N=function(){rt.aa.N.call(this),Cs(this)},rt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ct=l.JSON.stringify,Wt=l.JSON.parse,Gi=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function za(){}za.prototype.h=null;function Gu(a){return a.h||(a.h=a.i())}function Wu(){}var ks={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ga(){ze.call(this,"d")}S(Ga,ze);function Wa(){ze.call(this,"c")}S(Wa,ze);var mr={},Ku=null;function Wi(){return Ku=Ku||new de}mr.La="serverreachability";function Qu(a){ze.call(this,mr.La,a)}S(Qu,ze);function Vs(a){const u=Wi();Te(u,new Qu(u))}mr.STAT_EVENT="statevent";function Ju(a,u){ze.call(this,mr.STAT_EVENT,a),this.stat=u}S(Ju,ze);function Ct(a){const u=Wi();Te(u,new Ju(u,a))}mr.Ma="timingevent";function Yu(a,u){ze.call(this,mr.Ma,a),this.size=u}S(Yu,ze);function Ds(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},u)}function Ns(){this.g=!0}Ns.prototype.xa=function(){this.g=!1};function R_(a,u,f,g,P,V){a.info(function(){if(a.g)if(V)for(var K="",Me=V.split("&"),ut=0;ut<Me.length;ut++){var Ce=Me[ut].split("=");if(1<Ce.length){var _t=Ce[0];Ce=Ce[1];var yt=_t.split("_");K=2<=yt.length&&yt[1]=="type"?K+(_t+"="+Ce+"&"):K+(_t+"=redacted&")}}else K=null;else K=V;return"XMLHTTP REQ ("+g+") [attempt "+P+"]: "+u+`
`+f+`
`+K})}function S_(a,u,f,g,P,V,K){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+P+"]: "+u+`
`+f+`
`+V+" "+K})}function Br(a,u,f,g){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+C_(a,f)+(g?" "+g:"")})}function P_(a,u){a.info(function(){return"TIMEOUT: "+u})}Ns.prototype.info=function(){};function C_(a,u){if(!a.g)return u;if(!u)return null;try{var f=JSON.parse(u);if(f){for(a=0;a<f.length;a++)if(Array.isArray(f[a])){var g=f[a];if(!(2>g.length)){var P=g[1];if(Array.isArray(P)&&!(1>P.length)){var V=P[0];if(V!="noop"&&V!="stop"&&V!="close")for(var K=1;K<P.length;K++)P[K]=""}}}}return ct(f)}catch{return u}}var Ki={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Xu={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Ka;function Qi(){}S(Qi,za),Qi.prototype.g=function(){return new XMLHttpRequest},Qi.prototype.i=function(){return{}},Ka=new Qi;function qn(a,u,f,g){this.j=a,this.i=u,this.l=f,this.R=g||1,this.U=new rt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Zu}function Zu(){this.i=null,this.g="",this.h=!1}var eh={},Qa={};function Ja(a,u,f){a.L=1,a.v=Zi(En(u)),a.m=f,a.P=!0,th(a,null)}function th(a,u){a.F=Date.now(),Ji(a),a.A=En(a.v);var f=a.A,g=a.R;Array.isArray(g)||(g=[String(g)]),mh(f.i,"t",g),a.C=0,f=a.j.J,a.h=new Zu,a.g=Nh(a.j,f?u:null,!a.m),0<a.O&&(a.M=new xt(m(a.Y,a,a.g),a.O)),u=a.U,f=a.g,g=a.ca;var P="readystatechange";Array.isArray(P)||(P&&(jn[0]=P.toString()),P=jn);for(var V=0;V<P.length;V++){var K=B(f,P[V],g||u.handleEvent,!1,u.h||u);if(!K)break;u.g[K.key]=K}u=a.H?y(a.H):{},a.m?(a.u||(a.u="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,u)):(a.u="GET",a.g.ea(a.A,a.u,null,u)),Vs(),R_(a.i,a.u,a.A,a.l,a.R,a.m)}qn.prototype.ca=function(a){a=a.target;const u=this.M;u&&wn(a)==3?u.j():this.Y(a)},qn.prototype.Y=function(a){try{if(a==this.g)e:{const yt=wn(this.g);var u=this.g.Ba();const qr=this.g.Z();if(!(3>yt)&&(yt!=3||this.g&&(this.h.h||this.g.oa()||Th(this.g)))){this.J||yt!=4||u==7||(u==8||0>=qr?Vs(3):Vs(2)),Ya(this);var f=this.g.Z();this.X=f;t:if(nh(this)){var g=Th(this.g);a="";var P=g.length,V=wn(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){gr(this),Os(this);var K="";break t}this.h.i=new l.TextDecoder}for(u=0;u<P;u++)this.h.h=!0,a+=this.h.i.decode(g[u],{stream:!(V&&u==P-1)});g.length=0,this.h.g+=a,this.C=0,K=this.h.g}else K=this.g.oa();if(this.o=f==200,S_(this.i,this.u,this.A,this.l,this.R,yt,f),this.o){if(this.T&&!this.K){t:{if(this.g){var Me,ut=this.g;if((Me=ut.g?ut.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!L(Me)){var Ce=Me;break t}}Ce=null}if(f=Ce)Br(this.i,this.l,f,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Xa(this,f);else{this.o=!1,this.s=3,Ct(12),gr(this),Os(this);break e}}if(this.P){f=!0;let Yt;for(;!this.J&&this.C<K.length;)if(Yt=k_(this,K),Yt==Qa){yt==4&&(this.s=4,Ct(14),f=!1),Br(this.i,this.l,null,"[Incomplete Response]");break}else if(Yt==eh){this.s=4,Ct(15),Br(this.i,this.l,K,"[Invalid Chunk]"),f=!1;break}else Br(this.i,this.l,Yt,null),Xa(this,Yt);if(nh(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),yt!=4||K.length!=0||this.h.h||(this.s=1,Ct(16),f=!1),this.o=this.o&&f,!f)Br(this.i,this.l,K,"[Invalid Chunked Response]"),gr(this),Os(this);else if(0<K.length&&!this.W){this.W=!0;var _t=this.j;_t.g==this&&_t.ba&&!_t.M&&(_t.j.info("Great, no buffering proxy detected. Bytes received: "+K.length),sl(_t),_t.M=!0,Ct(11))}}else Br(this.i,this.l,K,null),Xa(this,K);yt==4&&gr(this),this.o&&!this.J&&(yt==4?Ch(this.j,this):(this.o=!1,Ji(this)))}else W_(this.g),f==400&&0<K.indexOf("Unknown SID")?(this.s=3,Ct(12)):(this.s=0,Ct(13)),gr(this),Os(this)}}}catch{}finally{}};function nh(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function k_(a,u){var f=a.C,g=u.indexOf(`
`,f);return g==-1?Qa:(f=Number(u.substring(f,g)),isNaN(f)?eh:(g+=1,g+f>u.length?Qa:(u=u.slice(g,g+f),a.C=g+f,u)))}qn.prototype.cancel=function(){this.J=!0,gr(this)};function Ji(a){a.S=Date.now()+a.I,rh(a,a.I)}function rh(a,u){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ds(m(a.ba,a),u)}function Ya(a){a.B&&(l.clearTimeout(a.B),a.B=null)}qn.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(P_(this.i,this.A),this.L!=2&&(Vs(),Ct(17)),gr(this),this.s=2,Os(this)):rh(this,this.S-a)};function Os(a){a.j.G==0||a.J||Ch(a.j,a)}function gr(a){Ya(a);var u=a.M;u&&typeof u.ma=="function"&&u.ma(),a.M=null,Cs(a.U),a.g&&(u=a.g,a.g=null,u.abort(),u.ma())}function Xa(a,u){try{var f=a.j;if(f.G!=0&&(f.g==a||Za(f.h,a))){if(!a.K&&Za(f.h,a)&&f.G==3){try{var g=f.Da.g.parse(u)}catch{g=null}if(Array.isArray(g)&&g.length==3){var P=g;if(P[0]==0){e:if(!f.u){if(f.g)if(f.g.F+3e3<a.F)io(f),ro(f);else break e;rl(f),Ct(18)}}else f.za=P[1],0<f.za-f.T&&37500>P[2]&&f.F&&f.v==0&&!f.C&&(f.C=Ds(m(f.Za,f),6e3));if(1>=oh(f.h)&&f.ca){try{f.ca()}catch{}f.ca=void 0}}else yr(f,11)}else if((a.K||f.g==a)&&io(f),!L(u))for(P=f.Da.g.parse(u),u=0;u<P.length;u++){let Ce=P[u];if(f.T=Ce[0],Ce=Ce[1],f.G==2)if(Ce[0]=="c"){f.K=Ce[1],f.ia=Ce[2];const _t=Ce[3];_t!=null&&(f.la=_t,f.j.info("VER="+f.la));const yt=Ce[4];yt!=null&&(f.Aa=yt,f.j.info("SVER="+f.Aa));const qr=Ce[5];qr!=null&&typeof qr=="number"&&0<qr&&(g=1.5*qr,f.L=g,f.j.info("backChannelRequestTimeoutMs_="+g)),g=f;const Yt=a.g;if(Yt){const ao=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(ao){var V=g.h;V.g||ao.indexOf("spdy")==-1&&ao.indexOf("quic")==-1&&ao.indexOf("h2")==-1||(V.j=V.l,V.g=new Set,V.h&&(el(V,V.h),V.h=null))}if(g.D){const il=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;il&&(g.ya=il,$e(g.I,g.D,il))}}f.G=3,f.l&&f.l.ua(),f.ba&&(f.R=Date.now()-a.F,f.j.info("Handshake RTT: "+f.R+"ms")),g=f;var K=a;if(g.qa=Dh(g,g.J?g.ia:null,g.W),K.K){ah(g.h,K);var Me=K,ut=g.L;ut&&(Me.I=ut),Me.B&&(Ya(Me),Ji(Me)),g.g=K}else Sh(g);0<f.i.length&&so(f)}else Ce[0]!="stop"&&Ce[0]!="close"||yr(f,7);else f.G==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?yr(f,7):nl(f):Ce[0]!="noop"&&f.l&&f.l.ta(Ce),f.v=0)}}Vs(4)}catch{}}var V_=class{constructor(a,u){this.g=a,this.map=u}};function sh(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ih(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function oh(a){return a.h?1:a.g?a.g.size:0}function Za(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function el(a,u){a.g?a.g.add(u):a.h=u}function ah(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}sh.prototype.cancel=function(){if(this.i=lh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function lh(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const f of a.g.values())u=u.concat(f.D);return u}return k(a.i)}function D_(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(c(a)){for(var u=[],f=a.length,g=0;g<f;g++)u.push(a[g]);return u}u=[],f=0;for(g in a)u[f++]=a[g];return u}function N_(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(c(a)||typeof a=="string"){var u=[];a=a.length;for(var f=0;f<a;f++)u.push(f);return u}u=[],f=0;for(const g in a)u[f++]=g;return u}}}function ch(a,u){if(a.forEach&&typeof a.forEach=="function")a.forEach(u,void 0);else if(c(a)||typeof a=="string")Array.prototype.forEach.call(a,u,void 0);else for(var f=N_(a),g=D_(a),P=g.length,V=0;V<P;V++)u.call(void 0,g[V],f&&f[V],a)}var uh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function O_(a,u){if(a){a=a.split("&");for(var f=0;f<a.length;f++){var g=a[f].indexOf("="),P=null;if(0<=g){var V=a[f].substring(0,g);P=a[f].substring(g+1)}else V=a[f];u(V,P?decodeURIComponent(P.replace(/\+/g," ")):"")}}}function _r(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof _r){this.h=a.h,Yi(this,a.j),this.o=a.o,this.g=a.g,Xi(this,a.s),this.l=a.l;var u=a.i,f=new Ls;f.i=u.i,u.g&&(f.g=new Map(u.g),f.h=u.h),hh(this,f),this.m=a.m}else a&&(u=String(a).match(uh))?(this.h=!1,Yi(this,u[1]||"",!0),this.o=xs(u[2]||""),this.g=xs(u[3]||"",!0),Xi(this,u[4]),this.l=xs(u[5]||"",!0),hh(this,u[6]||"",!0),this.m=xs(u[7]||"")):(this.h=!1,this.i=new Ls(null,this.h))}_r.prototype.toString=function(){var a=[],u=this.j;u&&a.push(Ms(u,dh,!0),":");var f=this.g;return(f||u=="file")&&(a.push("//"),(u=this.o)&&a.push(Ms(u,dh,!0),"@"),a.push(encodeURIComponent(String(f)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),f=this.s,f!=null&&a.push(":",String(f))),(f=this.l)&&(this.g&&f.charAt(0)!="/"&&a.push("/"),a.push(Ms(f,f.charAt(0)=="/"?L_:M_,!0))),(f=this.i.toString())&&a.push("?",f),(f=this.m)&&a.push("#",Ms(f,U_)),a.join("")};function En(a){return new _r(a)}function Yi(a,u,f){a.j=f?xs(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function Xi(a,u){if(u){if(u=Number(u),isNaN(u)||0>u)throw Error("Bad port number "+u);a.s=u}else a.s=null}function hh(a,u,f){u instanceof Ls?(a.i=u,B_(a.i,a.h)):(f||(u=Ms(u,F_)),a.i=new Ls(u,a.h))}function $e(a,u,f){a.i.set(u,f)}function Zi(a){return $e(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function xs(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ms(a,u,f){return typeof a=="string"?(a=encodeURI(a).replace(u,x_),f&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function x_(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var dh=/[#\/\?@]/g,M_=/[#\?:]/g,L_=/[#\?]/g,F_=/[#\?@]/g,U_=/#/g;function Ls(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Hn(a){a.g||(a.g=new Map,a.h=0,a.i&&O_(a.i,function(u,f){a.add(decodeURIComponent(u.replace(/\+/g," ")),f)}))}t=Ls.prototype,t.add=function(a,u){Hn(this),this.i=null,a=$r(this,a);var f=this.g.get(a);return f||this.g.set(a,f=[]),f.push(u),this.h+=1,this};function fh(a,u){Hn(a),u=$r(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function ph(a,u){return Hn(a),u=$r(a,u),a.g.has(u)}t.forEach=function(a,u){Hn(this),this.g.forEach(function(f,g){f.forEach(function(P){a.call(u,P,g,this)},this)},this)},t.na=function(){Hn(this);const a=Array.from(this.g.values()),u=Array.from(this.g.keys()),f=[];for(let g=0;g<u.length;g++){const P=a[g];for(let V=0;V<P.length;V++)f.push(u[g])}return f},t.V=function(a){Hn(this);let u=[];if(typeof a=="string")ph(this,a)&&(u=u.concat(this.g.get($r(this,a))));else{a=Array.from(this.g.values());for(let f=0;f<a.length;f++)u=u.concat(a[f])}return u},t.set=function(a,u){return Hn(this),this.i=null,a=$r(this,a),ph(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},t.get=function(a,u){return a?(a=this.V(a),0<a.length?String(a[0]):u):u};function mh(a,u,f){fh(a,u),0<f.length&&(a.i=null,a.g.set($r(a,u),k(f)),a.h+=f.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(var f=0;f<u.length;f++){var g=u[f];const V=encodeURIComponent(String(g)),K=this.V(g);for(g=0;g<K.length;g++){var P=V;K[g]!==""&&(P+="="+encodeURIComponent(String(K[g]))),a.push(P)}}return this.i=a.join("&")};function $r(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function B_(a,u){u&&!a.j&&(Hn(a),a.i=null,a.g.forEach(function(f,g){var P=g.toLowerCase();g!=P&&(fh(this,g),mh(this,P,f))},a)),a.j=u}function $_(a,u){const f=new Ns;if(l.Image){const g=new Image;g.onload=_(zn,f,"TestLoadImage: loaded",!0,u,g),g.onerror=_(zn,f,"TestLoadImage: error",!1,u,g),g.onabort=_(zn,f,"TestLoadImage: abort",!1,u,g),g.ontimeout=_(zn,f,"TestLoadImage: timeout",!1,u,g),l.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else u(!1)}function j_(a,u){const f=new Ns,g=new AbortController,P=setTimeout(()=>{g.abort(),zn(f,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:g.signal}).then(V=>{clearTimeout(P),V.ok?zn(f,"TestPingServer: ok",!0,u):zn(f,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(P),zn(f,"TestPingServer: error",!1,u)})}function zn(a,u,f,g,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),g(f)}catch{}}function q_(){this.g=new Gi}function H_(a,u,f){const g=f||"";try{ch(a,function(P,V){let K=P;h(P)&&(K=ct(P)),u.push(g+V+"="+encodeURIComponent(K))})}catch(P){throw u.push(g+"type="+encodeURIComponent("_badmap")),P}}function eo(a){this.l=a.Ub||null,this.j=a.eb||!1}S(eo,za),eo.prototype.g=function(){return new to(this.l,this.j)},eo.prototype.i=function(a){return function(){return a}}({});function to(a,u){de.call(this),this.D=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(to,de),t=to.prototype,t.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=u,this.readyState=1,Us(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const u={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(u.body=a),(this.D||l).fetch(new Request(this.A,u)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Fs(this)),this.readyState=0},t.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Us(this)),this.g&&(this.readyState=3,Us(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;gh(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function gh(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}t.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.v.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?Fs(this):Us(this),this.readyState==3&&gh(this)}},t.Ra=function(a){this.g&&(this.response=this.responseText=a,Fs(this))},t.Qa=function(a){this.g&&(this.response=a,Fs(this))},t.ga=function(){this.g&&Fs(this)};function Fs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Us(a)}t.setRequestHeader=function(a,u){this.u.append(a,u)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var f=u.next();!f.done;)f=f.value,a.push(f[0]+": "+f[1]),f=u.next();return a.join(`\r
`)};function Us(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(to.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function _h(a){let u="";return le(a,function(f,g){u+=g,u+=":",u+=f,u+=`\r
`}),u}function tl(a,u,f){e:{for(g in f){var g=!1;break e}g=!0}g||(f=_h(f),typeof a=="string"?f!=null&&encodeURIComponent(String(f)):$e(a,u,f))}function Ke(a){de.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(Ke,de);var z_=/^https?$/i,G_=["POST","PUT"];t=Ke.prototype,t.Ha=function(a){this.J=a},t.ea=function(a,u,f,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Ka.g(),this.v=this.o?Gu(this.o):Gu(Ka),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(V){yh(this,V);return}if(a=f||"",f=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var P in g)f.set(P,g[P]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const V of g.keys())f.set(V,g.get(V));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(f.keys()).find(V=>V.toLowerCase()=="content-type"),P=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(G_,u,void 0))||g||P||f.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[V,K]of f)this.g.setRequestHeader(V,K);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{wh(this),this.u=!0,this.g.send(a),this.u=!1}catch(V){yh(this,V)}};function yh(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.m=5,vh(a),no(a)}function vh(a){a.A||(a.A=!0,Te(a,"complete"),Te(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,Te(this,"complete"),Te(this,"abort"),no(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),no(this,!0)),Ke.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Eh(this):this.bb())},t.bb=function(){Eh(this)};function Eh(a){if(a.h&&typeof o<"u"&&(!a.v[1]||wn(a)!=4||a.Z()!=2)){if(a.u&&wn(a)==4)gt(a.Ea,0,a);else if(Te(a,"readystatechange"),wn(a)==4){a.h=!1;try{const K=a.Z();e:switch(K){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var f;if(!(f=u)){var g;if(g=K===0){var P=String(a.D).match(uh)[1]||null;!P&&l.self&&l.self.location&&(P=l.self.location.protocol.slice(0,-1)),g=!z_.test(P?P.toLowerCase():"")}f=g}if(f)Te(a,"complete"),Te(a,"success");else{a.m=6;try{var V=2<wn(a)?a.g.statusText:""}catch{V=""}a.l=V+" ["+a.Z()+"]",vh(a)}}finally{no(a)}}}}function no(a,u){if(a.g){wh(a);const f=a.g,g=a.v[0]?()=>{}:null;a.g=null,a.v=null,u||Te(a,"ready");try{f.onreadystatechange=g}catch{}}}function wh(a){a.I&&(l.clearTimeout(a.I),a.I=null)}t.isActive=function(){return!!this.g};function wn(a){return a.g?a.g.readyState:0}t.Z=function(){try{return 2<wn(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Wt(u)}};function Th(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function W_(a){const u={};a=(a.g&&2<=wn(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(L(a[g]))continue;var f=I(a[g]);const P=f[0];if(f=f[1],typeof f!="string")continue;f=f.trim();const V=u[P]||[];u[P]=V,V.push(f)}A(u,function(g){return g.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Bs(a,u,f){return f&&f.internalChannelParams&&f.internalChannelParams[a]||u}function Ih(a){this.Aa=0,this.i=[],this.j=new Ns,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Bs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Bs("baseRetryDelayMs",5e3,a),this.cb=Bs("retryDelaySeedMs",1e4,a),this.Wa=Bs("forwardChannelMaxRetries",2,a),this.wa=Bs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new sh(a&&a.concurrentRequestLimit),this.Da=new q_,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=Ih.prototype,t.la=8,t.G=1,t.connect=function(a,u,f,g){Ct(0),this.W=a,this.H=u||{},f&&g!==void 0&&(this.H.OSID=f,this.H.OAID=g),this.F=this.X,this.I=Dh(this,null,this.W),so(this)};function nl(a){if(Ah(a),a.G==3){var u=a.U++,f=En(a.I);if($e(f,"SID",a.K),$e(f,"RID",u),$e(f,"TYPE","terminate"),$s(a,f),u=new qn(a,a.j,u),u.L=2,u.v=Zi(En(f)),f=!1,l.navigator&&l.navigator.sendBeacon)try{f=l.navigator.sendBeacon(u.v.toString(),"")}catch{}!f&&l.Image&&(new Image().src=u.v,f=!0),f||(u.g=Nh(u.j,null),u.g.ea(u.v)),u.F=Date.now(),Ji(u)}Vh(a)}function ro(a){a.g&&(sl(a),a.g.cancel(),a.g=null)}function Ah(a){ro(a),a.u&&(l.clearTimeout(a.u),a.u=null),io(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function so(a){if(!ih(a.h)&&!a.s){a.s=!0;var u=a.Ga;Z||zt(),ue||(Z(),ue=!0),tt.add(u,a),a.B=0}}function K_(a,u){return oh(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=u.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ds(m(a.Ga,a,u),kh(a,a.B)),a.B++,!0)}t.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const P=new qn(this,this.j,a);let V=this.o;if(this.S&&(V?(V=y(V),b(V,this.S)):V=this.S),this.m!==null||this.O||(P.H=V,V=null),this.P)e:{for(var u=0,f=0;f<this.i.length;f++){t:{var g=this.i[f];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(u+=g,4096<u){u=f;break e}if(u===4096||f===this.i.length-1){u=f+1;break e}}u=1e3}else u=1e3;u=Rh(this,P,u),f=En(this.I),$e(f,"RID",a),$e(f,"CVER",22),this.D&&$e(f,"X-HTTP-Session-Id",this.D),$s(this,f),V&&(this.O?u="headers="+encodeURIComponent(String(_h(V)))+"&"+u:this.m&&tl(f,this.m,V)),el(this.h,P),this.Ua&&$e(f,"TYPE","init"),this.P?($e(f,"$req",u),$e(f,"SID","null"),P.T=!0,Ja(P,f,null)):Ja(P,f,u),this.G=2}}else this.G==3&&(a?bh(this,a):this.i.length==0||ih(this.h)||bh(this))};function bh(a,u){var f;u?f=u.l:f=a.U++;const g=En(a.I);$e(g,"SID",a.K),$e(g,"RID",f),$e(g,"AID",a.T),$s(a,g),a.m&&a.o&&tl(g,a.m,a.o),f=new qn(a,a.j,f,a.B+1),a.m===null&&(f.H=a.o),u&&(a.i=u.D.concat(a.i)),u=Rh(a,f,1e3),f.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),el(a.h,f),Ja(f,g,u)}function $s(a,u){a.H&&le(a.H,function(f,g){$e(u,g,f)}),a.l&&ch({},function(f,g){$e(u,g,f)})}function Rh(a,u,f){f=Math.min(a.i.length,f);var g=a.l?m(a.l.Na,a.l,a):null;e:{var P=a.i;let V=-1;for(;;){const K=["count="+f];V==-1?0<f?(V=P[0].g,K.push("ofs="+V)):V=0:K.push("ofs="+V);let Me=!0;for(let ut=0;ut<f;ut++){let Ce=P[ut].g;const _t=P[ut].map;if(Ce-=V,0>Ce)V=Math.max(0,P[ut].g-100),Me=!1;else try{H_(_t,K,"req"+Ce+"_")}catch{g&&g(_t)}}if(Me){g=K.join("&");break e}}}return a=a.i.splice(0,f),u.D=a,g}function Sh(a){if(!a.g&&!a.u){a.Y=1;var u=a.Fa;Z||zt(),ue||(Z(),ue=!0),tt.add(u,a),a.v=0}}function rl(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ds(m(a.Fa,a),kh(a,a.v)),a.v++,!0)}t.Fa=function(){if(this.u=null,Ph(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ds(m(this.ab,this),a)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ct(10),ro(this),Ph(this))};function sl(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Ph(a){a.g=new qn(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var u=En(a.qa);$e(u,"RID","rpc"),$e(u,"SID",a.K),$e(u,"AID",a.T),$e(u,"CI",a.F?"0":"1"),!a.F&&a.ja&&$e(u,"TO",a.ja),$e(u,"TYPE","xmlhttp"),$s(a,u),a.m&&a.o&&tl(u,a.m,a.o),a.L&&(a.g.I=a.L);var f=a.g;a=a.ia,f.L=1,f.v=Zi(En(u)),f.m=null,f.P=!0,th(f,a)}t.Za=function(){this.C!=null&&(this.C=null,ro(this),rl(this),Ct(19))};function io(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Ch(a,u){var f=null;if(a.g==u){io(a),sl(a),a.g=null;var g=2}else if(Za(a.h,u))f=u.D,ah(a.h,u),g=1;else return;if(a.G!=0){if(u.o)if(g==1){f=u.m?u.m.length:0,u=Date.now()-u.F;var P=a.B;g=Wi(),Te(g,new Yu(g,f)),so(a)}else Sh(a);else if(P=u.s,P==3||P==0&&0<u.X||!(g==1&&K_(a,u)||g==2&&rl(a)))switch(f&&0<f.length&&(u=a.h,u.i=u.i.concat(f)),P){case 1:yr(a,5);break;case 4:yr(a,10);break;case 3:yr(a,6);break;default:yr(a,2)}}}function kh(a,u){let f=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(f*=2),f*u}function yr(a,u){if(a.j.info("Error code "+u),u==2){var f=m(a.fb,a),g=a.Xa;const P=!g;g=new _r(g||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||Yi(g,"https"),Zi(g),P?$_(g.toString(),f):j_(g.toString(),f)}else Ct(2);a.G=0,a.l&&a.l.sa(u),Vh(a),Ah(a)}t.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ct(2)):(this.j.info("Failed to ping google.com"),Ct(1))};function Vh(a){if(a.G=0,a.ka=[],a.l){const u=lh(a.h);(u.length!=0||a.i.length!=0)&&(D(a.ka,u),D(a.ka,a.i),a.h.i.length=0,k(a.i),a.i.length=0),a.l.ra()}}function Dh(a,u,f){var g=f instanceof _r?En(f):new _r(f);if(g.g!="")u&&(g.g=u+"."+g.g),Xi(g,g.s);else{var P=l.location;g=P.protocol,u=u?u+"."+P.hostname:P.hostname,P=+P.port;var V=new _r(null);g&&Yi(V,g),u&&(V.g=u),P&&Xi(V,P),f&&(V.l=f),g=V}return f=a.D,u=a.ya,f&&u&&$e(g,f,u),$e(g,"VER",a.la),$s(a,g),g}function Nh(a,u,f){if(u&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Ca&&!a.pa?new Ke(new eo({eb:f})):new Ke(a.pa),u.Ha(a.J),u}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function Oh(){}t=Oh.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function oo(){}oo.prototype.g=function(a,u){return new Mt(a,u)};function Mt(a,u){de.call(this),this.g=new Ih(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.va&&(a?a["X-WebChannel-Client-Profile"]=u.va:a={"X-WebChannel-Client-Profile":u.va}),this.g.S=a,(a=u&&u.Sb)&&!L(a)&&(this.g.m=a),this.v=u&&u.supportsCrossDomainXhr||!1,this.u=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!L(u)&&(this.g.D=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new jr(this)}S(Mt,de),Mt.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Mt.prototype.close=function(){nl(this.g)},Mt.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var f={};f.__data__=a,a=f}else this.u&&(f={},f.__data__=ct(a),a=f);u.i.push(new V_(u.Ya++,a)),u.G==3&&so(u)},Mt.prototype.N=function(){this.g.l=null,delete this.j,nl(this.g),delete this.g,Mt.aa.N.call(this)};function xh(a){Ga.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const f in u){a=f;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}S(xh,Ga);function Mh(){Wa.call(this),this.status=1}S(Mh,Wa);function jr(a){this.g=a}S(jr,Oh),jr.prototype.ua=function(){Te(this.g,"a")},jr.prototype.ta=function(a){Te(this.g,new xh(a))},jr.prototype.sa=function(a){Te(this.g,new Mh)},jr.prototype.ra=function(){Te(this.g,"b")},oo.prototype.createWebChannel=oo.prototype.g,Mt.prototype.send=Mt.prototype.o,Mt.prototype.open=Mt.prototype.m,Mt.prototype.close=Mt.prototype.close,gm=function(){return new oo},mm=function(){return Wi()},pm=mr,Yl={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Ki.NO_ERROR=0,Ki.TIMEOUT=8,Ki.HTTP_ERROR=6,Ao=Ki,Xu.COMPLETE="complete",fm=Xu,Wu.EventType=ks,ks.OPEN="a",ks.CLOSE="b",ks.ERROR="c",ks.MESSAGE="d",de.prototype.listen=de.prototype.K,Ks=Wu,Ke.prototype.listenOnce=Ke.prototype.L,Ke.prototype.getLastError=Ke.prototype.Ka,Ke.prototype.getLastErrorCode=Ke.prototype.Ba,Ke.prototype.getStatus=Ke.prototype.Z,Ke.prototype.getResponseJson=Ke.prototype.Oa,Ke.prototype.getResponseText=Ke.prototype.oa,Ke.prototype.send=Ke.prototype.ea,Ke.prototype.setWithCredentials=Ke.prototype.Ha,dm=Ke}).apply(typeof ho<"u"?ho:typeof self<"u"?self:typeof window<"u"?window:{});const Id="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Et.UNAUTHENTICATED=new Et(null),Et.GOOGLE_CREDENTIALS=new Et("google-credentials-uid"),Et.FIRST_PARTY=new Et("first-party-uid"),Et.MOCK_USER=new Et("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Is="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dr=new $c("@firebase/firestore");function Hs(){return Dr.logLevel}function re(t,...e){if(Dr.logLevel<=be.DEBUG){const n=e.map(Hc);Dr.debug(`Firestore (${Is}): ${t}`,...n)}}function xn(t,...e){if(Dr.logLevel<=be.ERROR){const n=e.map(Hc);Dr.error(`Firestore (${Is}): ${t}`,...n)}}function ds(t,...e){if(Dr.logLevel<=be.WARN){const n=e.map(Hc);Dr.warn(`Firestore (${Is}): ${t}`,...n)}}function Hc(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t="Unexpected state"){const e=`FIRESTORE (${Is}) INTERNAL ASSERTION FAILED: `+t;throw xn(e),new Error(e)}function Pe(t,e){t||pe()}function ve(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class X extends Un{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Jw{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(Et.UNAUTHENTICATED))}shutdown(){}}class Yw{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class Xw{constructor(e){this.t=e,this.currentUser=Et.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){Pe(this.o===void 0);let r=this.i;const s=c=>this.i!==r?(r=this.i,n(c)):Promise.resolve();let i=new fn;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new fn,e.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const c=i;e.enqueueRetryable(async()=>{await c.promise,await s(this.currentUser)})},l=c=>{re("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(c=>l(c)),setTimeout(()=>{if(!this.auth){const c=this.t.getImmediate({optional:!0});c?l(c):(re("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new fn)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(re("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Pe(typeof r.accessToken=="string"),new _m(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Pe(e===null||typeof e=="string"),new Et(e)}}class Zw{constructor(e,n,r){this.l=e,this.h=n,this.P=r,this.type="FirstParty",this.user=Et.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class e0{constructor(e,n,r){this.l=e,this.h=n,this.P=r}getToken(){return Promise.resolve(new Zw(this.l,this.h,this.P))}start(e,n){e.enqueueRetryable(()=>n(Et.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class t0{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class n0{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,n){Pe(this.o===void 0);const r=i=>{i.error!=null&&re("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,re("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable(()=>r(i))};const s=i=>{re("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):re("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(Pe(typeof n.token=="string"),this.R=n.token,new t0(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r0(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=r0(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<n&&(r+=e.charAt(s[i]%e.length))}return r}}function ke(t,e){return t<e?-1:t>e?1:0}function fs(t,e,n){return t.length===e.length&&t.every((r,s)=>n(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xe{constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new X(M.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<-62135596800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new X(M.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return Xe.fromMillis(Date.now())}static fromDate(e){return Xe.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*n));return new Xe(n,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?ke(this.nanoseconds,e.nanoseconds):ke(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.timestamp=e}static fromTimestamp(e){return new _e(e)}static min(){return new _e(new Xe(0,0))}static max(){return new _e(new Xe(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,n,r){n===void 0?n=0:n>e.length&&pe(),r===void 0?r=e.length-n:r>e.length-n&&pe(),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return yi.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof yi?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const i=e.get(s),o=n.get(s);if(i<o)return-1;if(i>o)return 1}return e.length<n.length?-1:e.length>n.length?1:0}}class Fe extends yi{construct(e,n,r){return new Fe(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new X(M.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new Fe(n)}static emptyPath(){return new Fe([])}}const s0=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ft extends yi{construct(e,n,r){return new ft(e,n,r)}static isValidIdentifier(e){return s0.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ft(["__name__"])}static fromServerFormat(e){const n=[];let r="",s=0;const i=()=>{if(r.length===0)throw new X(M.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;s<e.length;){const l=e[s];if(l==="\\"){if(s+1===e.length)throw new X(M.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[s+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new X(M.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=c,s+=2}else l==="`"?(o=!o,s++):l!=="."||o?(r+=l,s++):(i(),s++)}if(i(),o)throw new X(M.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ft(n)}static emptyPath(){return new ft([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e){this.path=e}static fromPath(e){return new oe(Fe.fromString(e))}static fromName(e){return new oe(Fe.fromString(e).popFirst(5))}static empty(){return new oe(Fe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&Fe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return Fe.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new oe(new Fe(e.slice()))}}function i0(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,s=_e.fromTimestamp(r===1e9?new Xe(n+1,0):new Xe(n,r));return new ar(s,oe.empty(),e)}function o0(t){return new ar(t.readTime,t.key,-1)}class ar{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new ar(_e.min(),oe.empty(),-1)}static max(){return new ar(_e.max(),oe.empty(),-1)}}function a0(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=oe.comparator(t.documentKey,e.documentKey),n!==0?n:ke(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l0="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class c0{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Oi(t){if(t.code!==M.FAILED_PRECONDITION||t.message!==l0)throw t;re("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class j{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&pe(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new j((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(n,i).next(r,s)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof j?n:j.resolve(n)}catch(n){return j.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):j.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):j.reject(n)}static resolve(e){return new j((n,r)=>{n(e)})}static reject(e){return new j((n,r)=>{r(e)})}static waitFor(e){return new j((n,r)=>{let s=0,i=0,o=!1;e.forEach(l=>{++s,l.next(()=>{++i,o&&i===s&&n()},c=>r(c))}),o=!0,i===s&&n()})}static or(e){let n=j.resolve(!1);for(const r of e)n=n.next(s=>s?j.resolve(s):r());return n}static forEach(e,n){const r=[];return e.forEach((s,i)=>{r.push(n.call(this,s,i))}),this.waitFor(r)}static mapArray(e,n){return new j((r,s)=>{const i=e.length,o=new Array(i);let l=0;for(let c=0;c<i;c++){const h=c;n(e[h]).next(d=>{o[h]=d,++l,l===i&&r(o)},d=>s(d))}})}static doWhile(e,n){return new j((r,s)=>{const i=()=>{e()===!0?n().next(()=>{i()},s):r()};i()})}}function u0(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function xi(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zc{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ie(r),this.se=r=>n.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}zc.oe=-1;function Mi(t){return t==null}function qo(t){return t===0&&1/t==-1/0}function h0(t){return typeof t=="number"&&Number.isInteger(t)&&!qo(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ad(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function Fr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function vm(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,n){this.comparator=e,this.root=n||dt.EMPTY}insert(e,n){return new We(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,dt.BLACK,null,null))}remove(e){return new We(this.comparator,this.root.remove(e,this.comparator).copy(null,null,dt.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return n+r.left.size;s<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new fo(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new fo(this.root,e,this.comparator,!1)}getReverseIterator(){return new fo(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new fo(this.root,e,this.comparator,!0)}}class fo{constructor(e,n,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=n?r(e.key,n):1,n&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class dt{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??dt.RED,this.left=s??dt.EMPTY,this.right=i??dt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,s,i){return new dt(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s.copy(null,n,null,null,null):s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return dt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,s=this;if(n(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,n),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),n(e,s.key)===0){if(s.right.isEmpty())return dt.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,n))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,dt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,dt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw pe();const e=this.left.check();if(e!==this.right.check())throw pe();return e+(this.isRed()?0:1)}}dt.EMPTY=null,dt.RED=!0,dt.BLACK=!1;dt.EMPTY=new class{constructor(){this.size=0}get key(){throw pe()}get value(){throw pe()}get color(){throw pe()}get left(){throw pe()}get right(){throw pe()}copy(e,n,r,s,i){return this}insert(e,n,r){return new dt(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt{constructor(e){this.comparator=e,this.data=new We(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;n(s.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new bd(this.data.getIterator())}getIteratorFrom(e){return new bd(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof pt)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new pt(this.comparator);return n.data=e,n}}class bd{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.fields=e,e.sort(ft.comparator)}static empty(){return new qt([])}unionWith(e){let n=new pt(ft.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new qt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return fs(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Em("Invalid base64 string: "+i):i}}(e);return new mt(n)}static fromUint8Array(e){const n=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(e);return new mt(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ke(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}mt.EMPTY_BYTE_STRING=new mt("");const d0=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function lr(t){if(Pe(!!t),typeof t=="string"){let e=0;const n=d0.exec(t);if(Pe(!!n),n[1]){let s=n[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Qe(t.seconds),nanos:Qe(t.nanos)}}function Qe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function Nr(t){return typeof t=="string"?mt.fromBase64String(t):mt.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gc(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="server_timestamp"}function Wc(t){const e=t.mapValue.fields.__previous_value__;return Gc(e)?Wc(e):e}function vi(t){const e=lr(t.mapValue.fields.__local_write_time__.timestampValue);return new Xe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class f0{constructor(e,n,r,s,i,o,l,c,h){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=c,this.useFetchStreams=h}}class Ei{constructor(e,n){this.projectId=e,this.database=n||"(default)"}static empty(){return new Ei("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof Ei&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Or(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Gc(t)?4:m0(t)?9007199254740991:p0(t)?10:11:pe()}function yn(t,e){if(t===e)return!0;const n=Or(t);if(n!==Or(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return vi(t).isEqual(vi(e));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=lr(s.timestampValue),l=lr(i.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(s,i){return Nr(s.bytesValue).isEqual(Nr(i.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(s,i){return Qe(s.geoPointValue.latitude)===Qe(i.geoPointValue.latitude)&&Qe(s.geoPointValue.longitude)===Qe(i.geoPointValue.longitude)}(t,e);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return Qe(s.integerValue)===Qe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=Qe(s.doubleValue),l=Qe(i.doubleValue);return o===l?qo(o)===qo(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return fs(t.arrayValue.values||[],e.arrayValue.values||[],yn);case 10:case 11:return function(s,i){const o=s.mapValue.fields||{},l=i.mapValue.fields||{};if(Ad(o)!==Ad(l))return!1;for(const c in o)if(o.hasOwnProperty(c)&&(l[c]===void 0||!yn(o[c],l[c])))return!1;return!0}(t,e);default:return pe()}}function wi(t,e){return(t.values||[]).find(n=>yn(n,e))!==void 0}function ps(t,e){if(t===e)return 0;const n=Or(t),r=Or(e);if(n!==r)return ke(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ke(t.booleanValue,e.booleanValue);case 2:return function(i,o){const l=Qe(i.integerValue||i.doubleValue),c=Qe(o.integerValue||o.doubleValue);return l<c?-1:l>c?1:l===c?0:isNaN(l)?isNaN(c)?0:-1:1}(t,e);case 3:return Rd(t.timestampValue,e.timestampValue);case 4:return Rd(vi(t),vi(e));case 5:return ke(t.stringValue,e.stringValue);case 6:return function(i,o){const l=Nr(i),c=Nr(o);return l.compareTo(c)}(t.bytesValue,e.bytesValue);case 7:return function(i,o){const l=i.split("/"),c=o.split("/");for(let h=0;h<l.length&&h<c.length;h++){const d=ke(l[h],c[h]);if(d!==0)return d}return ke(l.length,c.length)}(t.referenceValue,e.referenceValue);case 8:return function(i,o){const l=ke(Qe(i.latitude),Qe(o.latitude));return l!==0?l:ke(Qe(i.longitude),Qe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Sd(t.arrayValue,e.arrayValue);case 10:return function(i,o){var l,c,h,d;const p=i.fields||{},m=o.fields||{},_=(l=p.value)===null||l===void 0?void 0:l.arrayValue,S=(c=m.value)===null||c===void 0?void 0:c.arrayValue,k=ke(((h=_==null?void 0:_.values)===null||h===void 0?void 0:h.length)||0,((d=S==null?void 0:S.values)===null||d===void 0?void 0:d.length)||0);return k!==0?k:Sd(_,S)}(t.mapValue,e.mapValue);case 11:return function(i,o){if(i===po.mapValue&&o===po.mapValue)return 0;if(i===po.mapValue)return 1;if(o===po.mapValue)return-1;const l=i.fields||{},c=Object.keys(l),h=o.fields||{},d=Object.keys(h);c.sort(),d.sort();for(let p=0;p<c.length&&p<d.length;++p){const m=ke(c[p],d[p]);if(m!==0)return m;const _=ps(l[c[p]],h[d[p]]);if(_!==0)return _}return ke(c.length,d.length)}(t.mapValue,e.mapValue);default:throw pe()}}function Rd(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ke(t,e);const n=lr(t),r=lr(e),s=ke(n.seconds,r.seconds);return s!==0?s:ke(n.nanos,r.nanos)}function Sd(t,e){const n=t.values||[],r=e.values||[];for(let s=0;s<n.length&&s<r.length;++s){const i=ps(n[s],r[s]);if(i)return i}return ke(n.length,r.length)}function ms(t){return Xl(t)}function Xl(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=lr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return Nr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return oe.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",s=!0;for(const i of n.values||[])s?s=!1:r+=",",r+=Xl(i);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Xl(n.fields[o])}`;return s+"}"}(t.mapValue):pe()}function Pd(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Zl(t){return!!t&&"integerValue"in t}function Kc(t){return!!t&&"arrayValue"in t}function Cd(t){return!!t&&"nullValue"in t}function kd(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function bo(t){return!!t&&"mapValue"in t}function p0(t){var e,n;return((n=(((e=t==null?void 0:t.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||n===void 0?void 0:n.stringValue)==="__vector__"}function si(t){if(t.geoPointValue)return{geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){const e={mapValue:{fields:{}}};return Fr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=si(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=si(t.arrayValue.values[n]);return e}return Object.assign({},t)}function m0(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e){this.value=e}static empty(){return new Dt({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!bo(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=si(n)}setAll(e){let n=ft.emptyPath(),r={},s=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const c=this.getFieldsMap(n);this.applyChanges(c,r,s),r={},s=[],n=l.popLast()}o?r[l.lastSegment()]=si(o):s.push(l.lastSegment())});const i=this.getFieldsMap(n);this.applyChanges(i,r,s)}delete(e){const n=this.field(e.popLast());bo(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return yn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=n.mapValue.fields[e.get(r)];bo(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=s),n=s}return n.mapValue.fields}applyChanges(e,n,r){Fr(n,(s,i)=>e[s]=i);for(const s of r)delete e[s]}clone(){return new Dt(si(this.value))}}function wm(t){const e=[];return Fr(t.fields,(n,r)=>{const s=new ft([n]);if(bo(r)){const i=wm(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)}),new qt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,n,r,s,i,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=l}static newInvalidDocument(e){return new at(e,0,_e.min(),_e.min(),_e.min(),Dt.empty(),0)}static newFoundDocument(e,n,r,s){return new at(e,1,n,_e.min(),r,s,0)}static newNoDocument(e,n){return new at(e,2,n,_e.min(),_e.min(),Dt.empty(),0)}static newUnknownDocument(e,n){return new at(e,3,n,_e.min(),_e.min(),Dt.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(_e.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Dt.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Dt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=_e.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof at&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new at(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(e,n){this.position=e,this.inclusive=n}}function Vd(t,e,n){let r=0;for(let s=0;s<t.position.length;s++){const i=e[s],o=t.position[s];if(i.field.isKeyField()?r=oe.comparator(oe.fromName(o.referenceValue),n.key):r=ps(o,n.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Dd(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!yn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ti{constructor(e,n="asc"){this.field=e,this.dir=n}}function g0(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{}class Ye extends Tm{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new y0(e,n,r):n==="array-contains"?new w0(e,r):n==="in"?new T0(e,r):n==="not-in"?new I0(e,r):n==="array-contains-any"?new A0(e,r):new Ye(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new v0(e,r):new E0(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&this.matchesComparison(ps(n,this.value)):n!==null&&Or(this.value)===Or(n)&&this.matchesComparison(ps(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return pe()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class rn extends Tm{constructor(e,n){super(),this.filters=e,this.op=n,this.ae=null}static create(e,n){return new rn(e,n)}matches(e){return Im(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Im(t){return t.op==="and"}function Am(t){return _0(t)&&Im(t)}function _0(t){for(const e of t.filters)if(e instanceof rn)return!1;return!0}function ec(t){if(t instanceof Ye)return t.field.canonicalString()+t.op.toString()+ms(t.value);if(Am(t))return t.filters.map(e=>ec(e)).join(",");{const e=t.filters.map(n=>ec(n)).join(",");return`${t.op}(${e})`}}function bm(t,e){return t instanceof Ye?function(r,s){return s instanceof Ye&&r.op===s.op&&r.field.isEqual(s.field)&&yn(r.value,s.value)}(t,e):t instanceof rn?function(r,s){return s instanceof rn&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,l)=>i&&bm(o,s.filters[l]),!0):!1}(t,e):void pe()}function Rm(t){return t instanceof Ye?function(n){return`${n.field.canonicalString()} ${n.op} ${ms(n.value)}`}(t):t instanceof rn?function(n){return n.op.toString()+" {"+n.getFilters().map(Rm).join(" ,")+"}"}(t):"Filter"}class y0 extends Ye{constructor(e,n,r){super(e,n,r),this.key=oe.fromName(r.referenceValue)}matches(e){const n=oe.comparator(e.key,this.key);return this.matchesComparison(n)}}class v0 extends Ye{constructor(e,n){super(e,"in",n),this.keys=Sm("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class E0 extends Ye{constructor(e,n){super(e,"not-in",n),this.keys=Sm("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function Sm(t,e){var n;return(((n=e.arrayValue)===null||n===void 0?void 0:n.values)||[]).map(r=>oe.fromName(r.referenceValue))}class w0 extends Ye{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return Kc(n)&&wi(n.arrayValue,this.value)}}class T0 extends Ye{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&wi(this.value.arrayValue,n)}}class I0 extends Ye{constructor(e,n){super(e,"not-in",n)}matches(e){if(wi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&!wi(this.value.arrayValue,n)}}class A0 extends Ye{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!Kc(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>wi(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b0{constructor(e,n=null,r=[],s=[],i=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=l,this.ue=null}}function Nd(t,e=null,n=[],r=[],s=null,i=null,o=null){return new b0(t,e,n,r,s,i,o)}function Qc(t){const e=ve(t);if(e.ue===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>ec(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),Mi(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>ms(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>ms(r)).join(",")),e.ue=n}return e.ue}function Jc(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!g0(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!bm(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!Dd(t.startAt,e.startAt)&&Dd(t.endAt,e.endAt)}function tc(t){return oe.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e,n=null,r=[],s=[],i=null,o="F",l=null,c=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=l,this.endAt=c,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function R0(t,e,n,r,s,i,o,l){return new As(t,e,n,r,s,i,o,l)}function Ea(t){return new As(t)}function Od(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function Pm(t){return t.collectionGroup!==null}function ii(t){const e=ve(t);if(e.ce===null){e.ce=[];const n=new Set;for(const i of e.explicitOrderBy)e.ce.push(i),n.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new pt(ft.comparator);return o.filters.forEach(c=>{c.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(i=>{n.has(i.canonicalString())||i.isKeyField()||e.ce.push(new Ti(i,r))}),n.has(ft.keyField().canonicalString())||e.ce.push(new Ti(ft.keyField(),r))}return e.ce}function pn(t){const e=ve(t);return e.le||(e.le=S0(e,ii(t))),e.le}function S0(t,e){if(t.limitType==="F")return Nd(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Ti(s.field,i)});const n=t.endAt?new Ho(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new Ho(t.startAt.position,t.startAt.inclusive):null;return Nd(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function nc(t,e){const n=t.filters.concat([e]);return new As(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function zo(t,e,n){return new As(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function wa(t,e){return Jc(pn(t),pn(e))&&t.limitType===e.limitType}function Cm(t){return`${Qc(pn(t))}|lt:${t.limitType}`}function Wr(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(s=>Rm(s)).join(", ")}]`),Mi(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(s=>ms(s)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(s=>ms(s)).join(",")),`Target(${r})`}(pn(t))}; limitType=${t.limitType})`}function Ta(t,e){return e.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):oe.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(t,e)&&function(r,s){for(const i of ii(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(t,e)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(t,e)&&function(r,s){return!(r.startAt&&!function(o,l,c){const h=Vd(o,l,c);return o.inclusive?h<=0:h<0}(r.startAt,ii(r),s)||r.endAt&&!function(o,l,c){const h=Vd(o,l,c);return o.inclusive?h>=0:h>0}(r.endAt,ii(r),s))}(t,e)}function P0(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function km(t){return(e,n)=>{let r=!1;for(const s of ii(t)){const i=C0(s,e,n);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function C0(t,e,n){const r=t.field.isKeyField()?oe.comparator(e.key,n.key):function(i,o,l){const c=o.data.field(i),h=l.data.field(i);return c!==null&&h!==null?ps(c,h):pe()}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return pe()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,n]);s.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[n]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Fr(this.inner,(n,r)=>{for(const[s,i]of r)e(s,i)})}isEmpty(){return vm(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k0=new We(oe.comparator);function Mn(){return k0}const Vm=new We(oe.comparator);function Qs(...t){let e=Vm;for(const n of t)e=e.insert(n.key,n);return e}function Dm(t){let e=Vm;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function Ar(){return oi()}function Nm(){return oi()}function oi(){return new bs(t=>t.toString(),(t,e)=>t.isEqual(e))}const V0=new We(oe.comparator),D0=new pt(oe.comparator);function Ie(...t){let e=D0;for(const n of t)e=e.add(n);return e}const N0=new pt(ke);function O0(){return N0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yc(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qo(e)?"-0":e}}function Om(t){return{integerValue:""+t}}function x0(t,e){return h0(e)?Om(e):Yc(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ia{constructor(){this._=void 0}}function M0(t,e,n){return t instanceof Ii?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Gc(i)&&(i=Wc(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(n,e):t instanceof Ai?Mm(t,e):t instanceof bi?Lm(t,e):function(s,i){const o=xm(s,i),l=xd(o)+xd(s.Pe);return Zl(o)&&Zl(s.Pe)?Om(l):Yc(s.serializer,l)}(t,e)}function L0(t,e,n){return t instanceof Ai?Mm(t,e):t instanceof bi?Lm(t,e):n}function xm(t,e){return t instanceof Go?function(r){return Zl(r)||function(i){return!!i&&"doubleValue"in i}(r)}(e)?e:{integerValue:0}:null}class Ii extends Ia{}class Ai extends Ia{constructor(e){super(),this.elements=e}}function Mm(t,e){const n=Fm(e);for(const r of t.elements)n.some(s=>yn(s,r))||n.push(r);return{arrayValue:{values:n}}}class bi extends Ia{constructor(e){super(),this.elements=e}}function Lm(t,e){let n=Fm(e);for(const r of t.elements)n=n.filter(s=>!yn(s,r));return{arrayValue:{values:n}}}class Go extends Ia{constructor(e,n){super(),this.serializer=e,this.Pe=n}}function xd(t){return Qe(t.integerValue||t.doubleValue)}function Fm(t){return Kc(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F0{constructor(e,n){this.field=e,this.transform=n}}function U0(t,e){return t.field.isEqual(e.field)&&function(r,s){return r instanceof Ai&&s instanceof Ai||r instanceof bi&&s instanceof bi?fs(r.elements,s.elements,yn):r instanceof Go&&s instanceof Go?yn(r.Pe,s.Pe):r instanceof Ii&&s instanceof Ii}(t.transform,e.transform)}class B0{constructor(e,n){this.version=e,this.transformResults=n}}class Nt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new Nt}static exists(e){return new Nt(void 0,e)}static updateTime(e){return new Nt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Ro(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class Aa{}function Um(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new ba(t.key,Nt.none()):new Li(t.key,t.data,Nt.none());{const n=t.data,r=Dt.empty();let s=new pt(ft.comparator);for(let i of e.fields)if(!s.has(i)){let o=n.field(i);o===null&&i.length>1&&(i=i.popLast(),o=n.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new pr(t.key,r,new qt(s.toArray()),Nt.none())}}function $0(t,e,n){t instanceof Li?function(s,i,o){const l=s.value.clone(),c=Ld(s.fieldTransforms,i,o.transformResults);l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof pr?function(s,i,o){if(!Ro(s.precondition,i))return void i.convertToUnknownDocument(o.version);const l=Ld(s.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(Bm(s)),c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()}(t,e,n):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function ai(t,e,n,r){return t instanceof Li?function(i,o,l,c){if(!Ro(i.precondition,o))return l;const h=i.value.clone(),d=Fd(i.fieldTransforms,c,o);return h.setAll(d),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(t,e,n,r):t instanceof pr?function(i,o,l,c){if(!Ro(i.precondition,o))return l;const h=Fd(i.fieldTransforms,c,o),d=o.data;return d.setAll(Bm(i)),d.setAll(h),o.convertToFoundDocument(o.version,d).setHasLocalMutations(),l===null?null:l.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(i,o,l){return Ro(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function j0(t,e){let n=null;for(const r of t.fieldTransforms){const s=e.data.field(r.field),i=xm(r.transform,s||null);i!=null&&(n===null&&(n=Dt.empty()),n.set(r.field,i))}return n||null}function Md(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&fs(r,s,(i,o)=>U0(i,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class Li extends Aa{constructor(e,n,r,s=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class pr extends Aa{constructor(e,n,r,s,i=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Bm(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function Ld(t,e,n){const r=new Map;Pe(t.length===n.length);for(let s=0;s<n.length;s++){const i=t[s],o=i.transform,l=e.data.field(i.field);r.set(i.field,L0(o,l,n[s]))}return r}function Fd(t,e,n){const r=new Map;for(const s of t){const i=s.transform,o=n.data.field(s.field);r.set(s.field,M0(i,o,e))}return r}class ba extends Aa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class $m extends Aa{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q0{constructor(e,n,r,s){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&$0(i,e,r[s])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=ai(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=ai(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=Nm();return this.mutations.forEach(s=>{const i=e.get(s.key),o=i.overlayedDocument;let l=this.applyToLocalView(o,i.mutatedFields);l=n.has(s.key)?null:l;const c=Um(o,l);c!==null&&r.set(s.key,c),o.isValidDocument()||o.convertToNoDocument(_e.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),Ie())}isEqual(e){return this.batchId===e.batchId&&fs(this.mutations,e.mutations,(n,r)=>Md(n,r))&&fs(this.baseMutations,e.baseMutations,(n,r)=>Md(n,r))}}class Xc{constructor(e,n,r,s){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=s}static from(e,n,r){Pe(e.mutations.length===r.length);let s=function(){return V0}();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Xc(e,n,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H0{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z0{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Je,Se;function jm(t){switch(t){default:return pe();case M.CANCELLED:case M.UNKNOWN:case M.DEADLINE_EXCEEDED:case M.RESOURCE_EXHAUSTED:case M.INTERNAL:case M.UNAVAILABLE:case M.UNAUTHENTICATED:return!1;case M.INVALID_ARGUMENT:case M.NOT_FOUND:case M.ALREADY_EXISTS:case M.PERMISSION_DENIED:case M.FAILED_PRECONDITION:case M.ABORTED:case M.OUT_OF_RANGE:case M.UNIMPLEMENTED:case M.DATA_LOSS:return!0}}function qm(t){if(t===void 0)return xn("GRPC error has no .code"),M.UNKNOWN;switch(t){case Je.OK:return M.OK;case Je.CANCELLED:return M.CANCELLED;case Je.UNKNOWN:return M.UNKNOWN;case Je.DEADLINE_EXCEEDED:return M.DEADLINE_EXCEEDED;case Je.RESOURCE_EXHAUSTED:return M.RESOURCE_EXHAUSTED;case Je.INTERNAL:return M.INTERNAL;case Je.UNAVAILABLE:return M.UNAVAILABLE;case Je.UNAUTHENTICATED:return M.UNAUTHENTICATED;case Je.INVALID_ARGUMENT:return M.INVALID_ARGUMENT;case Je.NOT_FOUND:return M.NOT_FOUND;case Je.ALREADY_EXISTS:return M.ALREADY_EXISTS;case Je.PERMISSION_DENIED:return M.PERMISSION_DENIED;case Je.FAILED_PRECONDITION:return M.FAILED_PRECONDITION;case Je.ABORTED:return M.ABORTED;case Je.OUT_OF_RANGE:return M.OUT_OF_RANGE;case Je.UNIMPLEMENTED:return M.UNIMPLEMENTED;case Je.DATA_LOSS:return M.DATA_LOSS;default:return pe()}}(Se=Je||(Je={}))[Se.OK=0]="OK",Se[Se.CANCELLED=1]="CANCELLED",Se[Se.UNKNOWN=2]="UNKNOWN",Se[Se.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",Se[Se.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",Se[Se.NOT_FOUND=5]="NOT_FOUND",Se[Se.ALREADY_EXISTS=6]="ALREADY_EXISTS",Se[Se.PERMISSION_DENIED=7]="PERMISSION_DENIED",Se[Se.UNAUTHENTICATED=16]="UNAUTHENTICATED",Se[Se.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",Se[Se.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",Se[Se.ABORTED=10]="ABORTED",Se[Se.OUT_OF_RANGE=11]="OUT_OF_RANGE",Se[Se.UNIMPLEMENTED=12]="UNIMPLEMENTED",Se[Se.INTERNAL=13]="INTERNAL",Se[Se.UNAVAILABLE=14]="UNAVAILABLE",Se[Se.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G0(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W0=new Sr([4294967295,4294967295],0);function Ud(t){const e=G0().encode(t),n=new hm;return n.update(e),new Uint8Array(n.digest())}function Bd(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new Sr([n,r],0),new Sr([s,i],0)]}class Zc{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new Js(`Invalid padding: ${n}`);if(r<0)throw new Js(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Js(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new Js(`Invalid padding when bitmap length is 0: ${n}`);this.Ie=8*e.length-n,this.Te=Sr.fromNumber(this.Ie)}Ee(e,n,r){let s=e.add(n.multiply(Sr.fromNumber(r)));return s.compare(W0)===1&&(s=new Sr([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const n=Ud(e),[r,s]=Bd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);if(!this.de(o))return!1}return!0}static create(e,n,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Zc(i,s,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.Ie===0)return;const n=Ud(e),[r,s]=Bd(n);for(let i=0;i<this.hashCount;i++){const o=this.Ee(r,s,i);this.Ae(o)}}Ae(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class Js extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ra{constructor(e,n,r,s,i){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const s=new Map;return s.set(e,Fi.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new Ra(_e.min(),s,new We(ke),Mn(),Ie())}}class Fi{constructor(e,n,r,s,i){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Fi(r,n,Ie(),Ie(),Ie())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(e,n,r,s){this.Re=e,this.removedTargetIds=n,this.key=r,this.Ve=s}}class Hm{constructor(e,n){this.targetId=e,this.me=n}}class zm{constructor(e,n,r=mt.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=s}}class $d{constructor(){this.fe=0,this.ge=qd(),this.pe=mt.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=Ie(),n=Ie(),r=Ie();return this.ge.forEach((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:n=n.add(s);break;case 1:r=r.add(s);break;default:pe()}}),new Fi(this.pe,this.ye,e,n,r)}Ce(){this.we=!1,this.ge=qd()}Fe(e,n){this.we=!0,this.ge=this.ge.insert(e,n)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Pe(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class K0{constructor(e){this.Le=e,this.Be=new Map,this.ke=Mn(),this.qe=jd(),this.Qe=new We(ke)}Ke(e){for(const n of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(n,e.Ve):this.Ue(n,e.key,e.Ve);for(const n of e.removedTargetIds)this.Ue(n,e.key,e.Ve)}We(e){this.forEachTarget(e,n=>{const r=this.Ge(n);switch(e.state){case 0:this.ze(n)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(n);break;case 3:this.ze(n)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(n)&&(this.je(n),r.De(e.resumeToken));break;default:pe()}})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.Be.forEach((r,s)=>{this.ze(s)&&n(s)})}He(e){const n=e.targetId,r=e.me.count,s=this.Je(n);if(s){const i=s.target;if(tc(i))if(r===0){const o=new oe(i.path);this.Ue(n,o,at.newNoDocument(o,_e.min()))}else Pe(r===1);else{const o=this.Ye(n);if(o!==r){const l=this.Ze(e),c=l?this.Xe(l,e,o):1;if(c!==0){this.je(n);const h=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(n,h)}}}}}Ze(e){const n=e.me.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=n;let o,l;try{o=Nr(r).toUint8Array()}catch(c){if(c instanceof Em)return ds("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{l=new Zc(o,s,i)}catch(c){return ds(c instanceof Js?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return l.Ie===0?null:l}Xe(e,n,r){return n.me.count===r-this.nt(e,n.targetId)?0:2}nt(e,n){const r=this.Le.getRemoteKeysForTarget(n);let s=0;return r.forEach(i=>{const o=this.Le.tt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(l)||(this.Ue(n,i,null),s++)}),s}rt(e){const n=new Map;this.Be.forEach((i,o)=>{const l=this.Je(o);if(l){if(i.current&&tc(l.target)){const c=new oe(l.target.path);this.ke.get(c)!==null||this.it(o,c)||this.Ue(o,c,at.newNoDocument(c,e))}i.be&&(n.set(o,i.ve()),i.Ce())}});let r=Ie();this.qe.forEach((i,o)=>{let l=!0;o.forEachWhile(c=>{const h=this.Je(c);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(i))}),this.ke.forEach((i,o)=>o.setReadTime(e));const s=new Ra(e,n,this.Qe,this.ke,r);return this.ke=Mn(),this.qe=jd(),this.Qe=new We(ke),s}$e(e,n){if(!this.ze(e))return;const r=this.it(e,n.key)?2:0;this.Ge(e).Fe(n.key,r),this.ke=this.ke.insert(n.key,n),this.qe=this.qe.insert(n.key,this.st(n.key).add(e))}Ue(e,n,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,n)?s.Fe(n,1):s.Me(n),this.qe=this.qe.insert(n,this.st(n).delete(e)),r&&(this.ke=this.ke.insert(n,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const n=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+n.addedDocuments.size-n.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let n=this.Be.get(e);return n||(n=new $d,this.Be.set(e,n)),n}st(e){let n=this.qe.get(e);return n||(n=new pt(ke),this.qe=this.qe.insert(e,n)),n}ze(e){const n=this.Je(e)!==null;return n||re("WatchChangeAggregator","Detected inactive target",e),n}Je(e){const n=this.Be.get(e);return n&&n.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new $d),this.Le.getRemoteKeysForTarget(e).forEach(n=>{this.Ue(e,n,null)})}it(e,n){return this.Le.getRemoteKeysForTarget(e).has(n)}}function jd(){return new We(oe.comparator)}function qd(){return new We(oe.comparator)}const Q0=(()=>({asc:"ASCENDING",desc:"DESCENDING"}))(),J0=(()=>({"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"}))(),Y0=(()=>({and:"AND",or:"OR"}))();class X0{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function rc(t,e){return t.useProto3Json||Mi(e)?e:{value:e}}function Wo(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Gm(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Z0(t,e){return Wo(t,e.toTimestamp())}function Ht(t){return Pe(!!t),_e.fromTimestamp(function(n){const r=lr(n);return new Xe(r.seconds,r.nanos)}(t))}function eu(t,e){return sc(t,e).canonicalString()}function sc(t,e){const n=function(s){return new Fe(["projects",s.projectId,"databases",s.database])}(t).child("documents");return e===void 0?n:n.child(e)}function Wm(t){const e=Fe.fromString(t);return Pe(Zm(e)),e}function Ko(t,e){return eu(t.databaseId,e.path)}function li(t,e){const n=Wm(e);if(n.get(1)!==t.databaseId.projectId)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new X(M.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new oe(Qm(n))}function Km(t,e){return eu(t.databaseId,e)}function eT(t){const e=Wm(t);return e.length===4?Fe.emptyPath():Qm(e)}function ic(t){return new Fe(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function Qm(t){return Pe(t.length>4&&t.get(4)==="documents"),t.popFirst(5)}function Hd(t,e,n){return{name:Ko(t,e),fields:n.value.mapValue.fields}}function tT(t,e){return"found"in e?function(r,s){Pe(!!s.found),s.found.name,s.found.updateTime;const i=li(r,s.found.name),o=Ht(s.found.updateTime),l=s.found.createTime?Ht(s.found.createTime):_e.min(),c=new Dt({mapValue:{fields:s.found.fields}});return at.newFoundDocument(i,o,l,c)}(t,e):"missing"in e?function(r,s){Pe(!!s.missing),Pe(!!s.readTime);const i=li(r,s.missing),o=Ht(s.readTime);return at.newNoDocument(i,o)}(t,e):pe()}function nT(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:pe()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=function(h,d){return h.useProto3Json?(Pe(d===void 0||typeof d=="string"),mt.fromBase64String(d||"")):(Pe(d===void 0||d instanceof Buffer||d instanceof Uint8Array),mt.fromUint8Array(d||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const d=h.code===void 0?M.UNKNOWN:qm(h.code);return new X(d,h.message||"")}(o);n=new zm(r,s,i,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=li(t,r.document.name),i=Ht(r.document.updateTime),o=r.document.createTime?Ht(r.document.createTime):_e.min(),l=new Dt({mapValue:{fields:r.document.fields}}),c=at.newFoundDocument(s,i,o,l),h=r.targetIds||[],d=r.removedTargetIds||[];n=new So(h,d,c.key,c)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=li(t,r.document),i=r.readTime?Ht(r.readTime):_e.min(),o=at.newNoDocument(s,i),l=r.removedTargetIds||[];n=new So([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=li(t,r.document),i=r.removedTargetIds||[];n=new So([],i,s,null)}else{if(!("filter"in e))return pe();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new z0(s,i),l=r.targetId;n=new Hm(l,o)}}return n}function Jm(t,e){let n;if(e instanceof Li)n={update:Hd(t,e.key,e.value)};else if(e instanceof ba)n={delete:Ko(t,e.key)};else if(e instanceof pr)n={update:Hd(t,e.key,e.data),updateMask:hT(e.fieldMask)};else{if(!(e instanceof $m))return pe();n={verify:Ko(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(i,o){const l=o.transform;if(l instanceof Ii)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Ai)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof bi)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Go)return{fieldPath:o.field.canonicalString(),increment:l.Pe};throw pe()}(0,r))),e.precondition.isNone||(n.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Z0(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:pe()}(t,e.precondition)),n}function rT(t,e){return t&&t.length>0?(Pe(e!==void 0),t.map(n=>function(s,i){let o=s.updateTime?Ht(s.updateTime):Ht(i);return o.isEqual(_e.min())&&(o=Ht(i)),new B0(o,s.transformResults||[])}(n,e))):[]}function sT(t,e){return{documents:[Km(t,e.path)]}}function iT(t,e){const n={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=Km(t,s);const i=function(h){if(h.length!==0)return Xm(rn.create(h,"and"))}(e.filters);i&&(n.structuredQuery.where=i);const o=function(h){if(h.length!==0)return h.map(d=>function(m){return{field:Kr(m.field),direction:lT(m.dir)}}(d))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=rc(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:n,parent:s}}function oT(t){let e=eT(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let s=null;if(r>0){Pe(r===1);const d=n.from[0];d.allDescendants?s=d.collectionId:e=e.child(d.collectionId)}let i=[];n.where&&(i=function(p){const m=Ym(p);return m instanceof rn&&Am(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(S){return new Ti(Qr(S.field),function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(n.orderBy));let l=null;n.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,Mi(m)?null:m}(n.limit));let c=null;n.startAt&&(c=function(p){const m=!!p.before,_=p.values||[];return new Ho(_,m)}(n.startAt));let h=null;return n.endAt&&(h=function(p){const m=!p.before,_=p.values||[];return new Ho(_,m)}(n.endAt)),R0(e,s,o,i,l,"F",c,h)}function aT(t,e){const n=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return pe()}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function Ym(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Qr(n.unaryFilter.field);return Ye.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Qr(n.unaryFilter.field);return Ye.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Qr(n.unaryFilter.field);return Ye.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Qr(n.unaryFilter.field);return Ye.create(o,"!=",{nullValue:"NULL_VALUE"});default:return pe()}}(t):t.fieldFilter!==void 0?function(n){return Ye.create(Qr(n.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return pe()}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return rn.create(n.compositeFilter.filters.map(r=>Ym(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return pe()}}(n.compositeFilter.op))}(t):pe()}function lT(t){return Q0[t]}function cT(t){return J0[t]}function uT(t){return Y0[t]}function Kr(t){return{fieldPath:t.canonicalString()}}function Qr(t){return ft.fromServerFormat(t.fieldPath)}function Xm(t){return t instanceof Ye?function(n){if(n.op==="=="){if(kd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NAN"}};if(Cd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(kd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NAN"}};if(Cd(n.value))return{unaryFilter:{field:Kr(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kr(n.field),op:cT(n.op),value:n.value}}}(t):t instanceof rn?function(n){const r=n.getFilters().map(s=>Xm(s));return r.length===1?r[0]:{compositeFilter:{op:uT(n.op),filters:r}}}(t):pe()}function hT(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function Zm(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,n,r,s,i=_e.min(),o=_e.min(),l=mt.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=c}withSequenceNumber(e){return new tr(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new tr(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e){this.ct=e}}function fT(t){const e=oT({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?zo(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pT{constructor(){this.un=new mT}addToCollectionParentIndex(e,n){return this.un.add(n),j.resolve()}getCollectionParents(e,n){return j.resolve(this.un.getEntries(n))}addFieldIndex(e,n){return j.resolve()}deleteFieldIndex(e,n){return j.resolve()}deleteAllFieldIndexes(e){return j.resolve()}createTargetIndexes(e,n){return j.resolve()}getDocumentsMatchingTarget(e,n){return j.resolve(null)}getIndexType(e,n){return j.resolve(0)}getFieldIndexes(e,n){return j.resolve([])}getNextCollectionGroupToUpdate(e){return j.resolve(null)}getMinOffset(e,n){return j.resolve(ar.min())}getMinOffsetFromCollectionGroup(e,n){return j.resolve(ar.min())}updateCollectionGroup(e,n,r){return j.resolve()}updateIndexEntries(e,n){return j.resolve()}}class mT{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n]||new pt(Fe.comparator),i=!s.has(r);return this.index[n]=s.add(r),i}has(e){const n=e.lastSegment(),r=e.popLast(),s=this.index[n];return s&&s.has(r)}getEntries(e){return(this.index[e]||new pt(Fe.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gs{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new gs(0)}static kn(){return new gs(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gT{constructor(){this.changes=new bs(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,at.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?j.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yT{constructor(e,n,r,s){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,n))).next(s=>(r!==null&&ai(r.mutation,s,qt.empty(),Xe.now()),s))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,Ie()).next(()=>r))}getLocalViewOfDocuments(e,n,r=Ie()){const s=Ar();return this.populateOverlays(e,s,n).next(()=>this.computeViews(e,n,s,r).next(i=>{let o=Qs();return i.forEach((l,c)=>{o=o.insert(l,c.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=Ar();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,Ie()))}populateOverlays(e,n,r){const s=[];return r.forEach(i=>{n.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(e,s).next(i=>{i.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,s){let i=Mn();const o=oi(),l=function(){return oi()}();return n.forEach((c,h)=>{const d=r.get(h.key);s.has(h.key)&&(d===void 0||d.mutation instanceof pr)?i=i.insert(h.key,h):d!==void 0?(o.set(h.key,d.mutation.getFieldMask()),ai(d.mutation,h,d.mutation.getFieldMask(),Xe.now())):o.set(h.key,qt.empty())}),this.recalculateAndSaveOverlays(e,i).next(c=>(c.forEach((h,d)=>o.set(h,d)),n.forEach((h,d)=>{var p;return l.set(h,new _T(d,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,n){const r=oi();let s=new We((o,l)=>o-l),i=Ie();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(c=>{const h=n.get(c);if(h===null)return;let d=r.get(c)||qt.empty();d=l.applyToLocalView(h,d),r.set(c,d);const p=(s.get(l.batchId)||Ie()).add(c);s=s.insert(l.batchId,p)})}).next(()=>{const o=[],l=s.getReverseIterator();for(;l.hasNext();){const c=l.getNext(),h=c.key,d=c.value,p=Nm();d.forEach(m=>{if(!i.has(m)){const _=Um(n.get(m),r.get(m));_!==null&&p.set(m,_),i=i.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return j.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,s){return function(o){return oe.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):Pm(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,s):this.getDocumentsMatchingCollectionQuery(e,n,r,s)}getNextDocuments(e,n,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,s-i.size):j.resolve(Ar());let l=-1,c=i;return o.next(h=>j.forEach(h,(d,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),i.get(d)?j.resolve():this.remoteDocumentCache.getEntry(e,d).next(m=>{c=c.insert(d,m)}))).next(()=>this.populateOverlays(e,h,i)).next(()=>this.computeViews(e,c,h,Ie())).next(d=>({batchId:l,changes:Dm(d)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new oe(n)).next(r=>{let s=Qs();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,n,r,s){const i=n.collectionGroup;let o=Qs();return this.indexManager.getCollectionParents(e,i).next(l=>j.forEach(l,c=>{const h=function(p,m){return new As(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(d=>{d.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,i,s))).next(o=>{i.forEach((c,h)=>{const d=h.getKey();o.get(d)===null&&(o=o.insert(d,at.newInvalidDocument(d)))});let l=Qs();return o.forEach((c,h)=>{const d=i.get(c);d!==void 0&&ai(d.mutation,h,qt.empty(),Xe.now()),Ta(n,h)&&(l=l.insert(c,h))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vT{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,n){return j.resolve(this.hr.get(n))}saveBundleMetadata(e,n){return this.hr.set(n.id,function(s){return{id:s.id,version:s.version,createTime:Ht(s.createTime)}}(n)),j.resolve()}getNamedQuery(e,n){return j.resolve(this.Pr.get(n))}saveNamedQuery(e,n){return this.Pr.set(n.name,function(s){return{name:s.name,query:fT(s.bundledQuery),readTime:Ht(s.readTime)}}(n)),j.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ET{constructor(){this.overlays=new We(oe.comparator),this.Ir=new Map}getOverlay(e,n){return j.resolve(this.overlays.get(n))}getOverlays(e,n){const r=Ar();return j.forEach(n,s=>this.getOverlay(e,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((s,i)=>{this.ht(e,n,i)}),j.resolve()}removeOverlaysForBatchId(e,n,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.Ir.delete(r)),j.resolve()}getOverlaysForCollection(e,n,r){const s=Ar(),i=n.length+1,o=new oe(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const c=l.getNext().value,h=c.getKey();if(!n.isPrefixOf(h.path))break;h.path.length===i&&c.largestBatchId>r&&s.set(c.getKey(),c)}return j.resolve(s)}getOverlaysForCollectionGroup(e,n,r,s){let i=new We((h,d)=>h-d);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===n&&h.largestBatchId>r){let d=i.get(h.largestBatchId);d===null&&(d=Ar(),i=i.insert(h.largestBatchId,d)),d.set(h.getKey(),h)}}const l=Ar(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach((h,d)=>l.set(h,d)),!(l.size()>=s)););return j.resolve(l)}ht(e,n,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new H0(n,r));let i=this.Ir.get(n);i===void 0&&(i=Ie(),this.Ir.set(n,i)),this.Ir.set(n,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wT{constructor(){this.sessionToken=mt.EMPTY_BYTE_STRING}getSessionToken(e){return j.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,j.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(){this.Tr=new pt(ot.Er),this.dr=new pt(ot.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,n){const r=new ot(e,n);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.Vr(new ot(e,n))}mr(e,n){e.forEach(r=>this.removeReference(r,n))}gr(e){const n=new oe(new Fe([])),r=new ot(n,e),s=new ot(n,e+1),i=[];return this.dr.forEachInRange([r,s],o=>{this.Vr(o),i.push(o.key)}),i}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const n=new oe(new Fe([])),r=new ot(n,e),s=new ot(n,e+1);let i=Ie();return this.dr.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(e){const n=new ot(e,0),r=this.Tr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class ot{constructor(e,n){this.key=e,this.wr=n}static Er(e,n){return oe.comparator(e.key,n.key)||ke(e.wr,n.wr)}static Ar(e,n){return ke(e.wr,n.wr)||oe.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TT{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Sr=1,this.br=new pt(ot.Er)}checkEmpty(e){return j.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,s){const i=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new q0(i,n,r,s);this.mutationQueue.push(o);for(const l of s)this.br=this.br.add(new ot(l.key,i)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return j.resolve(o)}lookupMutationBatch(e,n){return j.resolve(this.Dr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,s=this.vr(r),i=s<0?0:s;return j.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return j.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return j.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new ot(n,0),s=new ot(n,Number.POSITIVE_INFINITY),i=[];return this.br.forEachInRange([r,s],o=>{const l=this.Dr(o.wr);i.push(l)}),j.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new pt(ke);return n.forEach(s=>{const i=new ot(s,0),o=new ot(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([i,o],l=>{r=r.add(l.wr)})}),j.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,s=r.length+1;let i=r;oe.isDocumentKey(i)||(i=i.child(""));const o=new ot(new oe(i),0);let l=new pt(ke);return this.br.forEachWhile(c=>{const h=c.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(l=l.add(c.wr)),!0)},o),j.resolve(this.Cr(l))}Cr(e){const n=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&n.push(s)}),n}removeMutationBatch(e,n){Pe(this.Fr(n.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return j.forEach(n.mutations,s=>{const i=new ot(s.key,n.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,n){const r=new ot(n,0),s=this.br.firstAfterOrEqual(r);return j.resolve(n.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,j.resolve()}Fr(e,n){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const n=this.vr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class IT{constructor(e){this.Mr=e,this.docs=function(){return new We(oe.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,s=this.docs.get(r),i=s?s.size:0,o=this.Mr(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return j.resolve(r?r.document.mutableCopy():at.newInvalidDocument(n))}getEntries(e,n){let r=Mn();return n.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():at.newInvalidDocument(s))}),j.resolve(r)}getDocumentsMatchingQuery(e,n,r,s){let i=Mn();const o=n.path,l=new oe(o.child("")),c=this.docs.getIteratorFrom(l);for(;c.hasNext();){const{key:h,value:{document:d}}=c.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||a0(o0(d),r)<=0||(s.has(d.key)||Ta(n,d))&&(i=i.insert(d.key,d.mutableCopy()))}return j.resolve(i)}getAllFromCollectionGroup(e,n,r,s){pe()}Or(e,n){return j.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new AT(this)}getSize(e){return j.resolve(this.size)}}class AT extends gT{constructor(e){super(),this.cr=e}applyChanges(e){const n=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?n.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),j.waitFor(n)}getFromCache(e,n){return this.cr.getEntry(e,n)}getAllFromCache(e,n){return this.cr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bT{constructor(e){this.persistence=e,this.Nr=new bs(n=>Qc(n),Jc),this.lastRemoteSnapshotVersion=_e.min(),this.highestTargetId=0,this.Lr=0,this.Br=new tu,this.targetCount=0,this.kr=gs.Bn()}forEachTarget(e,n){return this.Nr.forEach((r,s)=>n(s)),j.resolve()}getLastRemoteSnapshotVersion(e){return j.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return j.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),j.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.Lr&&(this.Lr=n),j.resolve()}Kn(e){this.Nr.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.kr=new gs(n),this.highestTargetId=n),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,n){return this.Kn(n),this.targetCount+=1,j.resolve()}updateTargetData(e,n){return this.Kn(n),j.resolve()}removeTargetData(e,n){return this.Nr.delete(n.target),this.Br.gr(n.targetId),this.targetCount-=1,j.resolve()}removeTargets(e,n,r){let s=0;const i=[];return this.Nr.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.Nr.delete(o),i.push(this.removeMatchingKeysForTargetId(e,l.targetId)),s++)}),j.waitFor(i).next(()=>s)}getTargetCount(e){return j.resolve(this.targetCount)}getTargetData(e,n){const r=this.Nr.get(n)||null;return j.resolve(r)}addMatchingKeys(e,n,r){return this.Br.Rr(n,r),j.resolve()}removeMatchingKeys(e,n,r){this.Br.mr(n,r);const s=this.persistence.referenceDelegate,i=[];return s&&n.forEach(o=>{i.push(s.markPotentiallyOrphaned(e,o))}),j.waitFor(i)}removeMatchingKeysForTargetId(e,n){return this.Br.gr(n),j.resolve()}getMatchingKeysForTargetId(e,n){const r=this.Br.yr(n);return j.resolve(r)}containsKey(e,n){return j.resolve(this.Br.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(e,n){this.qr={},this.overlays={},this.Qr=new zc(0),this.Kr=!1,this.Kr=!0,this.$r=new wT,this.referenceDelegate=e(this),this.Ur=new bT(this),this.indexManager=new pT,this.remoteDocumentCache=function(s){return new IT(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new dT(n),this.Gr=new vT(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new ET,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.qr[e.toKey()];return r||(r=new TT(n,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,n,r){re("MemoryPersistence","Starting transaction:",e);const s=new ST(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(i=>this.referenceDelegate.jr(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Hr(e,n){return j.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,n)))}}class ST extends c0{constructor(e){super(),this.currentSequenceNumber=e}}class nu{constructor(e){this.persistence=e,this.Jr=new tu,this.Yr=null}static Zr(e){return new nu(e)}get Xr(){if(this.Yr)return this.Yr;throw pe()}addReference(e,n,r){return this.Jr.addReference(r,n),this.Xr.delete(r.toString()),j.resolve()}removeReference(e,n,r){return this.Jr.removeReference(r,n),this.Xr.add(r.toString()),j.resolve()}markPotentiallyOrphaned(e,n){return this.Xr.add(n.toString()),j.resolve()}removeTarget(e,n){this.Jr.gr(n.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(s=>{s.forEach(i=>this.Xr.add(i.toString()))}).next(()=>r.removeTargetData(e,n))}zr(){this.Yr=new Set}jr(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return j.forEach(this.Xr,r=>{const s=oe.fromPath(r);return this.ei(e,s).next(i=>{i||n.removeEntry(s,_e.min())})}).next(()=>(this.Yr=null,n.apply(e)))}updateLimboDocument(e,n){return this.ei(e,n).next(r=>{r?this.Xr.delete(n.toString()):this.Xr.add(n.toString())})}Wr(e){return 0}ei(e,n){return j.or([()=>j.resolve(this.Jr.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Hr(e,n)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,n,r,s){this.targetId=e,this.fromCache=n,this.$i=r,this.Ui=s}static Wi(e,n){let r=Ie(),s=Ie();for(const i of n.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ru(e,n.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CT{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return VE()?8:u0(Pt())>0?6:4}()}initialize(e,n){this.Ji=e,this.indexManager=n,this.Gi=!0}getDocumentsMatchingQuery(e,n,r,s){const i={result:null};return this.Yi(e,n).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.Zi(e,n,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new PT;return this.Xi(e,n,o).next(l=>{if(i.result=l,this.zi)return this.es(e,n,o,l.size)})}).next(()=>i.result)}es(e,n,r,s){return r.documentReadCount<this.ji?(Hs()<=be.DEBUG&&re("QueryEngine","SDK will not create cache indexes for query:",Wr(n),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),j.resolve()):(Hs()<=be.DEBUG&&re("QueryEngine","Query:",Wr(n),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(Hs()<=be.DEBUG&&re("QueryEngine","The SDK decides to create cache indexes for query:",Wr(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,pn(n))):j.resolve())}Yi(e,n){if(Od(n))return j.resolve(null);let r=pn(n);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(n.limit!==null&&s===1&&(n=zo(n,null,"F"),r=pn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(i=>{const o=Ie(...i);return this.Ji.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(c=>{const h=this.ts(n,l);return this.ns(n,h,o,c.readTime)?this.Yi(e,zo(n,null,"F")):this.rs(e,h,n,c)}))})))}Zi(e,n,r,s){return Od(n)||s.isEqual(_e.min())?j.resolve(null):this.Ji.getDocuments(e,r).next(i=>{const o=this.ts(n,i);return this.ns(n,o,r,s)?j.resolve(null):(Hs()<=be.DEBUG&&re("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Wr(n)),this.rs(e,o,n,i0(s,-1)).next(l=>l))})}ts(e,n){let r=new pt(km(e));return n.forEach((s,i)=>{Ta(e,i)&&(r=r.add(i))}),r}ns(e,n,r,s){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const i=e.limitType==="F"?n.last():n.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Xi(e,n,r){return Hs()<=be.DEBUG&&re("QueryEngine","Using full collection scan to execute query:",Wr(n)),this.Ji.getDocumentsMatchingQuery(e,n,ar.min(),r)}rs(e,n,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(i=>(n.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kT{constructor(e,n,r,s){this.persistence=e,this.ss=n,this.serializer=s,this.os=new We(ke),this._s=new bs(i=>Qc(i),Jc),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new yT(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.os))}}function VT(t,e,n,r){return new kT(t,e,n,r)}async function eg(t,e){const n=ve(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let s;return n.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,n.ls(e),n.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],l=[];let c=Ie();for(const h of s){o.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}for(const h of i){l.push(h.batchId);for(const d of h.mutations)c=c.add(d.key)}return n.localDocuments.getDocuments(r,c).next(h=>({hs:h,removedBatchIds:o,addedBatchIds:l}))})})}function DT(t,e){const n=ve(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),i=n.cs.newChangeBuffer({trackRemovals:!0});return function(l,c,h,d){const p=h.batch,m=p.keys();let _=j.resolve();return m.forEach(S=>{_=_.next(()=>d.getEntry(c,S)).next(k=>{const D=h.docVersions.get(S);Pe(D!==null),k.version.compareTo(D)<0&&(p.applyToRemoteDocument(k,h),k.isValidDocument()&&(k.setReadTime(h.commitVersion),d.addEntry(k)))})}),_.next(()=>l.mutationQueue.removeMutationBatch(c,p))}(n,r,e,i).next(()=>i.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let c=Ie();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(c=c.add(l.batch.mutations[h].key));return c}(e))).next(()=>n.localDocuments.getDocuments(r,s))})}function tg(t){const e=ve(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.Ur.getLastRemoteSnapshotVersion(n))}function NT(t,e){const n=ve(t),r=e.snapshotVersion;let s=n.os;return n.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=n.cs.newChangeBuffer({trackRemovals:!0});s=n.os;const l=[];e.targetChanges.forEach((d,p)=>{const m=s.get(p);if(!m)return;l.push(n.Ur.removeMatchingKeys(i,d.removedDocuments,p).next(()=>n.Ur.addMatchingKeys(i,d.addedDocuments,p)));let _=m.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?_=_.withResumeToken(mt.EMPTY_BYTE_STRING,_e.min()).withLastLimboFreeSnapshotVersion(_e.min()):d.resumeToken.approximateByteSize()>0&&(_=_.withResumeToken(d.resumeToken,r)),s=s.insert(p,_),function(k,D,F){return k.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-k.snapshotVersion.toMicroseconds()>=3e8?!0:F.addedDocuments.size+F.modifiedDocuments.size+F.removedDocuments.size>0}(m,_,d)&&l.push(n.Ur.updateTargetData(i,_))});let c=Mn(),h=Ie();if(e.documentUpdates.forEach(d=>{e.resolvedLimboDocuments.has(d)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(i,d))}),l.push(OT(i,o,e.documentUpdates).next(d=>{c=d.Ps,h=d.Is})),!r.isEqual(_e.min())){const d=n.Ur.getLastRemoteSnapshotVersion(i).next(p=>n.Ur.setTargetsMetadata(i,i.currentSequenceNumber,r));l.push(d)}return j.waitFor(l).next(()=>o.apply(i)).next(()=>n.localDocuments.getLocalViewOfDocuments(i,c,h)).next(()=>c)}).then(i=>(n.os=s,i))}function OT(t,e,n){let r=Ie(),s=Ie();return n.forEach(i=>r=r.add(i)),e.getEntries(t,r).next(i=>{let o=Mn();return n.forEach((l,c)=>{const h=i.get(l);c.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(l)),c.isNoDocument()&&c.version.isEqual(_e.min())?(e.removeEntry(l,c.readTime),o=o.insert(l,c)):!h.isValidDocument()||c.version.compareTo(h.version)>0||c.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(c),o=o.insert(l,c)):re("LocalStore","Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",c.version)}),{Ps:o,Is:s}})}function xT(t,e){const n=ve(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function MT(t,e){const n=ve(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return n.Ur.getTargetData(r,e).next(i=>i?(s=i,j.resolve(s)):n.Ur.allocateTargetId(r).next(o=>(s=new tr(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=n.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.os=n.os.insert(r.targetId,r),n._s.set(e,r.targetId)),r})}async function oc(t,e,n){const r=ve(t),s=r.os.get(e),i=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!xi(o))throw o;re("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function zd(t,e,n){const r=ve(t);let s=_e.min(),i=Ie();return r.persistence.runTransaction("Execute query","readwrite",o=>function(c,h,d){const p=ve(c),m=p._s.get(d);return m!==void 0?j.resolve(p.os.get(m)):p.Ur.getTargetData(h,d)}(r,o,pn(e)).next(l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(o,l.targetId).next(c=>{i=c})}).next(()=>r.ss.getDocumentsMatchingQuery(o,e,n?s:_e.min(),n?i:Ie())).next(l=>(LT(r,P0(e),l),{documents:l,Ts:i})))}function LT(t,e,n){let r=t.us.get(e)||_e.min();n.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),t.us.set(e,r)}class Gd{constructor(){this.activeTargetIds=O0()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class FT{constructor(){this.so=new Gd,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,n,r){this.oo[e]=n}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Gd,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class UT{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){re("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){re("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let mo=null;function Tl(){return mo===null?mo=function(){return 268435456+Math.round(2147483648*Math.random())}():mo++,"0x"+mo.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BT={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $T{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="WebChannelConnection";class jT extends class{constructor(n){this.databaseInfo=n,this.databaseId=n.databaseId;const r=n.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+n.host,this.vo=`projects/${s}/databases/${i}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get Fo(){return!1}Mo(n,r,s,i,o){const l=Tl(),c=this.xo(n,r.toUriEncodedString());re("RestConnection",`Sending RPC '${n}' ${l}:`,c,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,i,o),this.No(n,c,h,s).then(d=>(re("RestConnection",`Received RPC '${n}' ${l}: `,d),d),d=>{throw ds("RestConnection",`RPC '${n}' ${l} failed with error: `,d,"url: ",c,"request:",s),d})}Lo(n,r,s,i,o,l){return this.Mo(n,r,s,i,o)}Oo(n,r,s){n["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Is}(),n["Content-Type"]="text/plain",this.databaseInfo.appId&&(n["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>n[o]=i),s&&s.headers.forEach((i,o)=>n[o]=i)}xo(n,r){const s=BT[n];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,n,r,s){const i=Tl();return new Promise((o,l)=>{const c=new dm;c.setWithCredentials(!0),c.listenOnce(fm.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Ao.NO_ERROR:const d=c.getResponseJson();re(vt,`XHR for RPC '${e}' ${i} received:`,JSON.stringify(d)),o(d);break;case Ao.TIMEOUT:re(vt,`RPC '${e}' ${i} timed out`),l(new X(M.DEADLINE_EXCEEDED,"Request time out"));break;case Ao.HTTP_ERROR:const p=c.getStatus();if(re(vt,`RPC '${e}' ${i} failed with status:`,p,"response text:",c.getResponseText()),p>0){let m=c.getResponseJson();Array.isArray(m)&&(m=m[0]);const _=m==null?void 0:m.error;if(_&&_.status&&_.message){const S=function(D){const F=D.toLowerCase().replace(/_/g,"-");return Object.values(M).indexOf(F)>=0?F:M.UNKNOWN}(_.status);l(new X(S,_.message))}else l(new X(M.UNKNOWN,"Server responded with status "+c.getStatus()))}else l(new X(M.UNAVAILABLE,"Connection failed."));break;default:pe()}}finally{re(vt,`RPC '${e}' ${i} completed.`)}});const h=JSON.stringify(s);re(vt,`RPC '${e}' ${i} sending request:`,s),c.send(n,"POST",h,r,15)})}Bo(e,n,r){const s=Tl(),i=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=gm(),l=mm(),c={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(c.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(c.useFetchStreams=!0),this.Oo(c.initMessageHeaders,n,r),c.encodeInitMessageHeaders=!0;const d=i.join("");re(vt,`Creating RPC '${e}' stream ${s}: ${d}`,c);const p=o.createWebChannel(d,c);let m=!1,_=!1;const S=new $T({Io:D=>{_?re(vt,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(m||(re(vt,`Opening RPC '${e}' stream ${s} transport.`),p.open(),m=!0),re(vt,`RPC '${e}' stream ${s} sending:`,D),p.send(D))},To:()=>p.close()}),k=(D,F,L)=>{D.listen(F,$=>{try{L($)}catch(H){setTimeout(()=>{throw H},0)}})};return k(p,Ks.EventType.OPEN,()=>{_||(re(vt,`RPC '${e}' stream ${s} transport opened.`),S.yo())}),k(p,Ks.EventType.CLOSE,()=>{_||(_=!0,re(vt,`RPC '${e}' stream ${s} transport closed`),S.So())}),k(p,Ks.EventType.ERROR,D=>{_||(_=!0,ds(vt,`RPC '${e}' stream ${s} transport errored:`,D),S.So(new X(M.UNAVAILABLE,"The operation could not be completed")))}),k(p,Ks.EventType.MESSAGE,D=>{var F;if(!_){const L=D.data[0];Pe(!!L);const $=L,H=$.error||((F=$[0])===null||F===void 0?void 0:F.error);if(H){re(vt,`RPC '${e}' stream ${s} received error:`,H);const ce=H.status;let le=function(v){const b=Je[v];if(b!==void 0)return qm(b)}(ce),A=H.message;le===void 0&&(le=M.INTERNAL,A="Unknown error status: "+ce+" with message "+H.message),_=!0,S.So(new X(le,A)),p.close()}else re(vt,`RPC '${e}' stream ${s} received:`,L),S.bo(L)}}),k(l,pm.STAT_EVENT,D=>{D.stat===Yl.PROXY?re(vt,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===Yl.NOPROXY&&re(vt,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{S.wo()},0),S}}function Il(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sa(t){return new X0(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,n,r=1e3,s=1.5,i=6e4){this.ui=e,this.timerId=n,this.ko=r,this.qo=s,this.Qo=i,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const n=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,n-r);s>0&&re("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ng{constructor(e,n,r,s,i,o,l,c){this.ui=e,this.Ho=r,this.Jo=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=c,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new su(e,n)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,n){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():n&&n.code===M.RESOURCE_EXHAUSTED?(xn(n.toString()),xn("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):n&&n.code===M.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(n)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),n=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===n&&this.P_(r,s)},r=>{e(()=>{const s=new X(M.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,n){const r=this.h_(this.Yo);this.stream=this.T_(e,n),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return re("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return n=>{this.ui.enqueueAndForget(()=>this.Yo===e?n():(re("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class qT extends ng{constructor(e,n,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}T_(e,n){return this.connection.Bo("Listen",e,n)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const n=nT(this.serializer,e),r=function(i){if(!("targetChange"in i))return _e.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?_e.min():o.readTime?Ht(o.readTime):_e.min()}(e);return this.listener.d_(n,r)}A_(e){const n={};n.database=ic(this.serializer),n.addTarget=function(i,o){let l;const c=o.target;if(l=tc(c)?{documents:sT(i,c)}:{query:iT(i,c)._t},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=Gm(i,o.resumeToken);const h=rc(i,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(_e.min())>0){l.readTime=Wo(i,o.snapshotVersion.toTimestamp());const h=rc(i,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const r=aT(this.serializer,e);r&&(n.labels=r),this.a_(n)}R_(e){const n={};n.database=ic(this.serializer),n.removeTarget=e,this.a_(n)}}class HT extends ng{constructor(e,n,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,s,o),this.serializer=i}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,n){return this.connection.Bo("Write",e,n)}E_(e){return Pe(!!e.streamToken),this.lastStreamToken=e.streamToken,Pe(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Pe(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const n=rT(e.writeResults,e.commitTime),r=Ht(e.commitTime);return this.listener.g_(r,n)}p_(){const e={};e.database=ic(this.serializer),this.a_(e)}m_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>Jm(this.serializer,r))};this.a_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zT extends class{}{constructor(e,n,r,s){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,n,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Mo(e,sc(n,r),s,i,o)).catch(i=>{throw i.name==="FirebaseError"?(i.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new X(M.UNKNOWN,i.toString())})}Lo(e,n,r,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Lo(e,sc(n,r),s,o,l,i)).catch(o=>{throw o.name==="FirebaseError"?(o.code===M.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new X(M.UNKNOWN,o.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class GT{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(xn(n),this.D_=!1):re("OnlineStateTracker",n)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WT{constructor(e,n,r,s,i){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=i,this.k_._o(o=>{r.enqueueAndForget(async()=>{Ur(this)&&(re("RemoteStore","Restarting streams for network reachability change."),await async function(c){const h=ve(c);h.L_.add(4),await Ui(h),h.q_.set("Unknown"),h.L_.delete(4),await Pa(h)}(this))})}),this.q_=new GT(r,s)}}async function Pa(t){if(Ur(t))for(const e of t.B_)await e(!0)}async function Ui(t){for(const e of t.B_)await e(!1)}function rg(t,e){const n=ve(t);n.N_.has(e.targetId)||(n.N_.set(e.targetId,e),lu(n)?au(n):Rs(n).r_()&&ou(n,e))}function iu(t,e){const n=ve(t),r=Rs(n);n.N_.delete(e),r.r_()&&sg(n,e),n.N_.size===0&&(r.r_()?r.o_():Ur(n)&&n.q_.set("Unknown"))}function ou(t,e){if(t.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(_e.min())>0){const n=t.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(n)}Rs(t).A_(e)}function sg(t,e){t.Q_.xe(e),Rs(t).R_(e)}function au(t){t.Q_=new K0({getRemoteKeysForTarget:e=>t.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>t.N_.get(e)||null,tt:()=>t.datastore.serializer.databaseId}),Rs(t).start(),t.q_.v_()}function lu(t){return Ur(t)&&!Rs(t).n_()&&t.N_.size>0}function Ur(t){return ve(t).L_.size===0}function ig(t){t.Q_=void 0}async function KT(t){t.q_.set("Online")}async function QT(t){t.N_.forEach((e,n)=>{ou(t,e)})}async function JT(t,e){ig(t),lu(t)?(t.q_.M_(e),au(t)):t.q_.set("Unknown")}async function YT(t,e,n){if(t.q_.set("Online"),e instanceof zm&&e.state===2&&e.cause)try{await async function(s,i){const o=i.cause;for(const l of i.targetIds)s.N_.has(l)&&(await s.remoteSyncer.rejectListen(l,o),s.N_.delete(l),s.Q_.removeTarget(l))}(t,e)}catch(r){re("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Qo(t,r)}else if(e instanceof So?t.Q_.Ke(e):e instanceof Hm?t.Q_.He(e):t.Q_.We(e),!n.isEqual(_e.min()))try{const r=await tg(t.localStore);n.compareTo(r)>=0&&await function(i,o){const l=i.Q_.rt(o);return l.targetChanges.forEach((c,h)=>{if(c.resumeToken.approximateByteSize()>0){const d=i.N_.get(h);d&&i.N_.set(h,d.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,h)=>{const d=i.N_.get(c);if(!d)return;i.N_.set(c,d.withResumeToken(mt.EMPTY_BYTE_STRING,d.snapshotVersion)),sg(i,c);const p=new tr(d.target,c,h,d.sequenceNumber);ou(i,p)}),i.remoteSyncer.applyRemoteEvent(l)}(t,n)}catch(r){re("RemoteStore","Failed to raise snapshot:",r),await Qo(t,r)}}async function Qo(t,e,n){if(!xi(e))throw e;t.L_.add(1),await Ui(t),t.q_.set("Offline"),n||(n=()=>tg(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{re("RemoteStore","Retrying IndexedDB access"),await n(),t.L_.delete(1),await Pa(t)})}function og(t,e){return e().catch(n=>Qo(t,n,e))}async function Ca(t){const e=ve(t),n=cr(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;XT(e);)try{const s=await xT(e.localStore,r);if(s===null){e.O_.length===0&&n.o_();break}r=s.batchId,ZT(e,s)}catch(s){await Qo(e,s)}ag(e)&&lg(e)}function XT(t){return Ur(t)&&t.O_.length<10}function ZT(t,e){t.O_.push(e);const n=cr(t);n.r_()&&n.V_&&n.m_(e.mutations)}function ag(t){return Ur(t)&&!cr(t).n_()&&t.O_.length>0}function lg(t){cr(t).start()}async function eI(t){cr(t).p_()}async function tI(t){const e=cr(t);for(const n of t.O_)e.m_(n.mutations)}async function nI(t,e,n){const r=t.O_.shift(),s=Xc.from(r,e,n);await og(t,()=>t.remoteSyncer.applySuccessfulWrite(s)),await Ca(t)}async function rI(t,e){e&&cr(t).V_&&await async function(r,s){if(function(o){return jm(o)&&o!==M.ABORTED}(s.code)){const i=r.O_.shift();cr(r).s_(),await og(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await Ca(r)}}(t,e),ag(t)&&lg(t)}async function Kd(t,e){const n=ve(t);n.asyncQueue.verifyOperationInProgress(),re("RemoteStore","RemoteStore received new credentials");const r=Ur(n);n.L_.add(3),await Ui(n),r&&n.q_.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.L_.delete(3),await Pa(n)}async function sI(t,e){const n=ve(t);e?(n.L_.delete(2),await Pa(n)):e||(n.L_.add(2),await Ui(n),n.q_.set("Unknown"))}function Rs(t){return t.K_||(t.K_=function(n,r,s){const i=ve(n);return i.w_(),new qT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:KT.bind(null,t),Ro:QT.bind(null,t),mo:JT.bind(null,t),d_:YT.bind(null,t)}),t.B_.push(async e=>{e?(t.K_.s_(),lu(t)?au(t):t.q_.set("Unknown")):(await t.K_.stop(),ig(t))})),t.K_}function cr(t){return t.U_||(t.U_=function(n,r,s){const i=ve(n);return i.w_(),new HT(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(t.datastore,t.asyncQueue,{Eo:()=>Promise.resolve(),Ro:eI.bind(null,t),mo:rI.bind(null,t),f_:tI.bind(null,t),g_:nI.bind(null,t)}),t.B_.push(async e=>{e?(t.U_.s_(),await Ca(t)):(await t.U_.stop(),t.O_.length>0&&(re("RemoteStore",`Stopping write stream with ${t.O_.length} pending writes`),t.O_=[]))})),t.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(e,n,r,s,i){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new fn,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,i){const o=Date.now()+r,l=new cu(e,n,o,s,i);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new X(M.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function uu(t,e){if(xn("AsyncQueue",`${e}: ${t}`),xi(t))return new X(M.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class os{constructor(e){this.comparator=e?(n,r)=>e(n,r)||oe.comparator(n.key,r.key):(n,r)=>oe.comparator(n.key,r.key),this.keyedMap=Qs(),this.sortedSet=new We(this.comparator)}static emptySet(e){return new os(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof os)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const s=n.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new os;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qd{constructor(){this.W_=new We(oe.comparator)}track(e){const n=e.doc.key,r=this.W_.get(n);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(n,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(n):e.type===1&&r.type===2?this.W_=this.W_.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(n,{type:2,doc:e.doc}):pe():this.W_=this.W_.insert(n,e)}G_(){const e=[];return this.W_.inorderTraversal((n,r)=>{e.push(r)}),e}}class _s{constructor(e,n,r,s,i,o,l,c,h){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=c,this.hasCachedResults=h}static fromInitialDocuments(e,n,r,s,i){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new _s(e,n,os.emptySet(n),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&wa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let s=0;s<n.length;s++)if(n[s].type!==r[s].type||!n[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class oI{constructor(){this.queries=Jd(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(n,r){const s=ve(n),i=s.queries;s.queries=Jd(),i.forEach((o,l)=>{for(const c of l.j_)c.onError(r)})})(this,new X(M.ABORTED,"Firestore shutting down"))}}function Jd(){return new bs(t=>Cm(t),wa)}async function hu(t,e){const n=ve(t);let r=3;const s=e.query;let i=n.queries.get(s);i?!i.H_()&&e.J_()&&(r=2):(i=new iI,r=e.J_()?0:1);try{switch(r){case 0:i.z_=await n.onListen(s,!0);break;case 1:i.z_=await n.onListen(s,!1);break;case 2:await n.onFirstRemoteStoreListen(s)}}catch(o){const l=uu(o,`Initialization of query '${Wr(e.query)}' failed`);return void e.onError(l)}n.queries.set(s,i),i.j_.push(e),e.Z_(n.onlineState),i.z_&&e.X_(i.z_)&&fu(n)}async function du(t,e){const n=ve(t),r=e.query;let s=3;const i=n.queries.get(r);if(i){const o=i.j_.indexOf(e);o>=0&&(i.j_.splice(o,1),i.j_.length===0?s=e.J_()?0:1:!i.H_()&&e.J_()&&(s=2))}switch(s){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function aI(t,e){const n=ve(t);let r=!1;for(const s of e){const i=s.query,o=n.queries.get(i);if(o){for(const l of o.j_)l.X_(s)&&(r=!0);o.z_=s}}r&&fu(n)}function lI(t,e,n){const r=ve(t),s=r.queries.get(e);if(s)for(const i of s.j_)i.onError(n);r.queries.delete(e)}function fu(t){t.Y_.forEach(e=>{e.next()})}var ac,Yd;(Yd=ac||(ac={})).ea="default",Yd.Cache="cache";class pu{constructor(e,n,r){this.query=e,this.ta=n,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new _s(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.na?this.ia(e)&&(this.ta.next(e),n=!0):this.sa(e,this.onlineState)&&(this.oa(e),n=!0),this.ra=e,n}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let n=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),n=!0),n}sa(e,n){if(!e.fromCache||!this.J_())return!0;const r=n!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const n=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}oa(e){e=_s.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==ac.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(e){this.key=e}}class ug{constructor(e){this.key=e}}class cI{constructor(e,n){this.query=e,this.Ta=n,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=Ie(),this.mutatedKeys=Ie(),this.Aa=km(e),this.Ra=new os(this.Aa)}get Va(){return this.Ta}ma(e,n){const r=n?n.fa:new Qd,s=n?n.Ra:this.Ra;let i=n?n.mutatedKeys:this.mutatedKeys,o=s,l=!1;const c=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((d,p)=>{const m=s.get(d),_=Ta(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),k=!!_&&(_.hasLocalMutations||this.mutatedKeys.has(_.key)&&_.hasCommittedMutations);let D=!1;m&&_?m.data.isEqual(_.data)?S!==k&&(r.track({type:3,doc:_}),D=!0):this.ga(m,_)||(r.track({type:2,doc:_}),D=!0,(c&&this.Aa(_,c)>0||h&&this.Aa(_,h)<0)&&(l=!0)):!m&&_?(r.track({type:0,doc:_}),D=!0):m&&!_&&(r.track({type:1,doc:m}),D=!0,(c||h)&&(l=!0)),D&&(_?(o=o.add(_),i=k?i.add(d):i.delete(d)):(o=o.delete(d),i=i.delete(d)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const d=this.query.limitType==="F"?o.last():o.first();o=o.delete(d.key),i=i.delete(d.key),r.track({type:1,doc:d})}return{Ra:o,fa:r,ns:l,mutatedKeys:i}}ga(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,s){const i=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const o=e.fa.G_();o.sort((d,p)=>function(_,S){const k=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return pe()}};return k(_)-k(S)}(d.type,p.type)||this.Aa(d.doc,p.doc)),this.pa(r),s=s!=null&&s;const l=n&&!s?this.ya():[],c=this.da.size===0&&this.current&&!s?1:0,h=c!==this.Ea;return this.Ea=c,o.length!==0||h?{snapshot:new _s(this.query,e.Ra,i,o,e.mutatedKeys,c===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:l}:{wa:l}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Qd,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(n=>this.Ta=this.Ta.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.Ta=this.Ta.delete(n)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=Ie(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const n=[];return e.forEach(r=>{this.da.has(r)||n.push(new ug(r))}),this.da.forEach(r=>{e.has(r)||n.push(new cg(r))}),n}ba(e){this.Ta=e.Ts,this.da=Ie();const n=this.ma(e.documents);return this.applyChanges(n,!0)}Da(){return _s.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class uI{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class hI{constructor(e){this.key=e,this.va=!1}}class dI{constructor(e,n,r,s,i,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Ca={},this.Fa=new bs(l=>Cm(l),wa),this.Ma=new Map,this.xa=new Set,this.Oa=new We(oe.comparator),this.Na=new Map,this.La=new tu,this.Ba={},this.ka=new Map,this.qa=gs.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function fI(t,e,n=!0){const r=gg(t);let s;const i=r.Fa.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.Da()):s=await hg(r,e,n,!0),s}async function pI(t,e){const n=gg(t);await hg(n,e,!0,!1)}async function hg(t,e,n,r){const s=await MT(t.localStore,pn(e)),i=s.targetId,o=t.sharedClientState.addLocalQueryTarget(i,n);let l;return r&&(l=await mI(t,e,i,o==="current",s.resumeToken)),t.isPrimaryClient&&n&&rg(t.remoteStore,s),l}async function mI(t,e,n,r,s){t.Ka=(p,m,_)=>async function(k,D,F,L){let $=D.view.ma(F);$.ns&&($=await zd(k.localStore,D.query,!1).then(({documents:A})=>D.view.ma(A,$)));const H=L&&L.targetChanges.get(D.targetId),ce=L&&L.targetMismatches.get(D.targetId)!=null,le=D.view.applyChanges($,k.isPrimaryClient,H,ce);return Zd(k,D.targetId,le.wa),le.snapshot}(t,p,m,_);const i=await zd(t.localStore,e,!0),o=new cI(e,i.Ts),l=o.ma(i.documents),c=Fi.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",s),h=o.applyChanges(l,t.isPrimaryClient,c);Zd(t,n,h.wa);const d=new uI(e,n,o);return t.Fa.set(e,d),t.Ma.has(n)?t.Ma.get(n).push(e):t.Ma.set(n,[e]),h.snapshot}async function gI(t,e,n){const r=ve(t),s=r.Fa.get(e),i=r.Ma.get(s.targetId);if(i.length>1)return r.Ma.set(s.targetId,i.filter(o=>!wa(o,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await oc(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),n&&iu(r.remoteStore,s.targetId),lc(r,s.targetId)}).catch(Oi)):(lc(r,s.targetId),await oc(r.localStore,s.targetId,!0))}async function _I(t,e){const n=ve(t),r=n.Fa.get(e),s=n.Ma.get(r.targetId);n.isPrimaryClient&&s.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),iu(n.remoteStore,r.targetId))}async function yI(t,e,n){const r=bI(t);try{const s=await function(o,l){const c=ve(o),h=Xe.now(),d=l.reduce((_,S)=>_.add(S.key),Ie());let p,m;return c.persistence.runTransaction("Locally write mutations","readwrite",_=>{let S=Mn(),k=Ie();return c.cs.getEntries(_,d).next(D=>{S=D,S.forEach((F,L)=>{L.isValidDocument()||(k=k.add(F))})}).next(()=>c.localDocuments.getOverlayedDocuments(_,S)).next(D=>{p=D;const F=[];for(const L of l){const $=j0(L,p.get(L.key).overlayedDocument);$!=null&&F.push(new pr(L.key,$,wm($.value.mapValue),Nt.exists(!0)))}return c.mutationQueue.addMutationBatch(_,h,F,l)}).next(D=>{m=D;const F=D.applyToLocalDocumentSet(p,k);return c.documentOverlayCache.saveOverlays(_,D.batchId,F)})}).then(()=>({batchId:m.batchId,changes:Dm(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(o,l,c){let h=o.Ba[o.currentUser.toKey()];h||(h=new We(ke)),h=h.insert(l,c),o.Ba[o.currentUser.toKey()]=h}(r,s.batchId,n),await Bi(r,s.changes),await Ca(r.remoteStore)}catch(s){const i=uu(s,"Failed to persist write");n.reject(i)}}async function dg(t,e){const n=ve(t);try{const r=await NT(n.localStore,e);e.targetChanges.forEach((s,i)=>{const o=n.Na.get(i);o&&(Pe(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.va=!0:s.modifiedDocuments.size>0?Pe(o.va):s.removedDocuments.size>0&&(Pe(o.va),o.va=!1))}),await Bi(n,r,e)}catch(r){await Oi(r)}}function Xd(t,e,n){const r=ve(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const s=[];r.Fa.forEach((i,o)=>{const l=o.view.Z_(e);l.snapshot&&s.push(l.snapshot)}),function(o,l){const c=ve(o);c.onlineState=l;let h=!1;c.queries.forEach((d,p)=>{for(const m of p.j_)m.Z_(l)&&(h=!0)}),h&&fu(c)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function vI(t,e,n){const r=ve(t);r.sharedClientState.updateQueryState(e,"rejected",n);const s=r.Na.get(e),i=s&&s.key;if(i){let o=new We(oe.comparator);o=o.insert(i,at.newNoDocument(i,_e.min()));const l=Ie().add(i),c=new Ra(_e.min(),new Map,new We(ke),o,l);await dg(r,c),r.Oa=r.Oa.remove(i),r.Na.delete(e),mu(r)}else await oc(r.localStore,e,!1).then(()=>lc(r,e,n)).catch(Oi)}async function EI(t,e){const n=ve(t),r=e.batch.batchId;try{const s=await DT(n.localStore,e);pg(n,r,null),fg(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Bi(n,s)}catch(s){await Oi(s)}}async function wI(t,e,n){const r=ve(t);try{const s=await function(o,l){const c=ve(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let d;return c.mutationQueue.lookupMutationBatch(h,l).next(p=>(Pe(p!==null),d=p.keys(),c.mutationQueue.removeMutationBatch(h,p))).next(()=>c.mutationQueue.performConsistencyCheck(h)).next(()=>c.documentOverlayCache.removeOverlaysForBatchId(h,d,l)).next(()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,d)).next(()=>c.localDocuments.getDocuments(h,d))})}(r.localStore,e);pg(r,e,n),fg(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Bi(r,s)}catch(s){await Oi(s)}}function fg(t,e){(t.ka.get(e)||[]).forEach(n=>{n.resolve()}),t.ka.delete(e)}function pg(t,e,n){const r=ve(t);let s=r.Ba[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(n?i.reject(n):i.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function lc(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Ma.get(e))t.Fa.delete(r),n&&t.Ca.$a(r,n);t.Ma.delete(e),t.isPrimaryClient&&t.La.gr(e).forEach(r=>{t.La.containsKey(r)||mg(t,r)})}function mg(t,e){t.xa.delete(e.path.canonicalString());const n=t.Oa.get(e);n!==null&&(iu(t.remoteStore,n),t.Oa=t.Oa.remove(e),t.Na.delete(n),mu(t))}function Zd(t,e,n){for(const r of n)r instanceof cg?(t.La.addReference(r.key,e),TI(t,r)):r instanceof ug?(re("SyncEngine","Document no longer in limbo: "+r.key),t.La.removeReference(r.key,e),t.La.containsKey(r.key)||mg(t,r.key)):pe()}function TI(t,e){const n=e.key,r=n.path.canonicalString();t.Oa.get(n)||t.xa.has(r)||(re("SyncEngine","New document in limbo: "+n),t.xa.add(r),mu(t))}function mu(t){for(;t.xa.size>0&&t.Oa.size<t.maxConcurrentLimboResolutions;){const e=t.xa.values().next().value;t.xa.delete(e);const n=new oe(Fe.fromString(e)),r=t.qa.next();t.Na.set(r,new hI(n)),t.Oa=t.Oa.insert(n,r),rg(t.remoteStore,new tr(pn(Ea(n.path)),r,"TargetPurposeLimboResolution",zc.oe))}}async function Bi(t,e,n){const r=ve(t),s=[],i=[],o=[];r.Fa.isEmpty()||(r.Fa.forEach((l,c)=>{o.push(r.Ka(c,e,n).then(h=>{var d;if((h||n)&&r.isPrimaryClient){const p=h?!h.fromCache:(d=n==null?void 0:n.targetChanges.get(c.targetId))===null||d===void 0?void 0:d.current;r.sharedClientState.updateQueryState(c.targetId,p?"current":"not-current")}if(h){s.push(h);const p=ru.Wi(c.targetId,h);i.push(p)}}))}),await Promise.all(o),r.Ca.d_(s),await async function(c,h){const d=ve(c);try{await d.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>j.forEach(h,m=>j.forEach(m.$i,_=>d.persistence.referenceDelegate.addReference(p,m.targetId,_)).next(()=>j.forEach(m.Ui,_=>d.persistence.referenceDelegate.removeReference(p,m.targetId,_)))))}catch(p){if(!xi(p))throw p;re("LocalStore","Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const _=d.os.get(m),S=_.snapshotVersion,k=_.withLastLimboFreeSnapshotVersion(S);d.os=d.os.insert(m,k)}}}(r.localStore,i))}async function II(t,e){const n=ve(t);if(!n.currentUser.isEqual(e)){re("SyncEngine","User change. New user:",e.toKey());const r=await eg(n.localStore,e);n.currentUser=e,function(i,o){i.ka.forEach(l=>{l.forEach(c=>{c.reject(new X(M.CANCELLED,o))})}),i.ka.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Bi(n,r.hs)}}function AI(t,e){const n=ve(t),r=n.Na.get(e);if(r&&r.va)return Ie().add(r.key);{let s=Ie();const i=n.Ma.get(e);if(!i)return s;for(const o of i){const l=n.Fa.get(o);s=s.unionWith(l.view.Va)}return s}}function gg(t){const e=ve(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=dg.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=AI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=vI.bind(null,e),e.Ca.d_=aI.bind(null,e.eventManager),e.Ca.$a=lI.bind(null,e.eventManager),e}function bI(t){const e=ve(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=EI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=wI.bind(null,e),e}class Jo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Sa(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,n){return null}Ha(e,n){return null}za(e){return VT(this.persistence,new CT,e.initialUser,this.serializer)}Ga(e){return new RT(nu.Zr,this.serializer)}Wa(e){return new FT}async terminate(){var e,n;(e=this.gcScheduler)===null||e===void 0||e.stop(),(n=this.indexBackfillerScheduler)===null||n===void 0||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Jo.provider={build:()=>new Jo};class cc{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Xd(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=II.bind(null,this.syncEngine),await sI(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new oI}()}createDatastore(e){const n=Sa(e.databaseInfo.databaseId),r=function(i){return new jT(i)}(e.databaseInfo);return function(i,o,l,c){return new zT(i,o,l,c)}(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,s,i,o,l){return new WT(r,s,i,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>Xd(this.syncEngine,n,0),function(){return Wd.D()?new Wd:new UT}())}createSyncEngine(e,n){return function(s,i,o,l,c,h,d){const p=new dI(s,i,o,l,c,h);return d&&(p.Qa=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(s){const i=ve(s);re("RemoteStore","RemoteStore shutting down."),i.L_.add(5),await Ui(i),i.k_.shutdown(),i.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(n=this.eventManager)===null||n===void 0||n.terminate()}}cc.provider={build:()=>new cc};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):xn("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new X(M.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(s,i){const o=ve(s),l={documents:i.map(p=>Ko(o.serializer,p))},c=await o.Lo("BatchGetDocuments",o.serializer.databaseId,Fe.emptyPath(),l,i.length),h=new Map;c.forEach(p=>{const m=tT(o.serializer,p);h.set(m.key.toString(),m)});const d=[];return i.forEach(p=>{const m=h.get(p.toString());Pe(!!m),d.push(m)}),d}(this.datastore,e);return n.forEach(r=>this.recordVersion(r)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new ba(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,r)=>{const s=oe.fromPath(r);this.mutations.push(new $m(s,this.precondition(s)))}),await async function(r,s){const i=ve(r),o={writes:s.map(l=>Jm(i.serializer,l))};await i.Mo("Commit",i.serializer.databaseId,Fe.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw pe();n=_e.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!n.isEqual(r))throw new X(M.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(_e.min())?Nt.exists(!1):Nt.updateTime(n):Nt.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(_e.min()))throw new X(M.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Nt.updateTime(n)}return Nt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SI{constructor(e,n,r,s,i){this.asyncQueue=e,this.datastore=n,this.options=r,this.updateFunction=s,this.deferred=i,this._u=r.maxAttempts,this.t_=new su(this.asyncQueue,"transaction_retry")}au(){this._u-=1,this.uu()}uu(){this.t_.Go(async()=>{const e=new RI(this.datastore),n=this.cu(e);n&&n.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.lu(s)}))}).catch(r=>{this.lu(r)})})}cu(e){try{const n=this.updateFunction(e);return!Mi(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}lu(e){this._u>0&&this.hu(e)?(this._u-=1,this.asyncQueue.enqueueAndForget(()=>(this.uu(),Promise.resolve()))):this.deferred.reject(e)}hu(e){if(e.name==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!jm(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e,n,r,s,i){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this.databaseInfo=s,this.user=Et.UNAUTHENTICATED,this.clientId=ym.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,async o=>{re("FirestoreClient","Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(re("FirestoreClient","Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new fn;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=uu(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Al(t,e){t.asyncQueue.verifyOperationInProgress(),re("FirestoreClient","Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async s=>{r.isEqual(s)||(await eg(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function ef(t,e){t.asyncQueue.verifyOperationInProgress();const n=await CI(t);re("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>Kd(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,s)=>Kd(e.remoteStore,s)),t._onlineComponents=e}async function CI(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){re("FirestoreClient","Using user provided OfflineComponentProvider");try{await Al(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(s){return s.name==="FirebaseError"?s.code===M.FAILED_PRECONDITION||s.code===M.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(n))throw n;ds("Error using user provided cache. Falling back to memory cache: "+n),await Al(t,new Jo)}}else re("FirestoreClient","Using default OfflineComponentProvider"),await Al(t,new Jo);return t._offlineComponents}async function _u(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(re("FirestoreClient","Using user provided OnlineComponentProvider"),await ef(t,t._uninitializedComponentsProvider._online)):(re("FirestoreClient","Using default OnlineComponentProvider"),await ef(t,new cc))),t._onlineComponents}function kI(t){return _u(t).then(e=>e.syncEngine)}function VI(t){return _u(t).then(e=>e.datastore)}async function Yo(t){const e=await _u(t),n=e.eventManager;return n.onListen=fI.bind(null,e.syncEngine),n.onUnlisten=gI.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=pI.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=_I.bind(null,e.syncEngine),n}function DI(t,e,n={}){const r=new fn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,h){const d=new gu({next:m=>{d.Za(),o.enqueueAndForget(()=>du(i,p));const _=m.docs.has(l);!_&&m.fromCache?h.reject(new X(M.UNAVAILABLE,"Failed to get document because the client is offline.")):_&&m.fromCache&&c&&c.source==="server"?h.reject(new X(M.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new pu(Ea(l.path),d,{includeMetadataChanges:!0,_a:!0});return hu(i,p)}(await Yo(t),t.asyncQueue,e,n,r)),r.promise}function NI(t,e,n={}){const r=new fn;return t.asyncQueue.enqueueAndForget(async()=>function(i,o,l,c,h){const d=new gu({next:m=>{d.Za(),o.enqueueAndForget(()=>du(i,p)),m.fromCache&&c.source==="server"?h.reject(new X(M.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(m)},error:m=>h.reject(m)}),p=new pu(l,d,{includeMetadataChanges:!0,_a:!0});return hu(i,p)}(await Yo(t),t.asyncQueue,e,n,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _g(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tf=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yg(t,e,n){if(!n)throw new X(M.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function OI(t,e,n,r){if(e===!0&&r===!0)throw new X(M.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function nf(t){if(!oe.isDocumentKey(t))throw new X(M.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function rf(t){if(oe.isDocumentKey(t))throw new X(M.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function ka(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":pe()}function Qt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new X(M.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=ka(t);throw new X(M.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}function xI(t,e){if(e<=0)throw new X(M.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sf{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new X(M.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(n=e.ssl)===null||n===void 0||n;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new X(M.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}OI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=_g((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new X(M.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Va{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new sf({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new X(M.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new X(M.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new sf(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Jw;switch(r.type){case"firstParty":return new e0(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new X(M.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=tf.get(n);r&&(re("ComponentProvider","Removing Datastore"),tf.delete(n),r.terminate())}(this),Promise.resolve()}}function MI(t,e,n,r={}){var s;const i=(t=Qt(t,Va))._getSettings(),o=`${e}:${n}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&ds("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),t._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let l,c;if(typeof r.mockUserToken=="string")l=r.mockUserToken,c=Et.MOCK_USER;else{l=AE(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new X(M.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");c=new Et(h)}t._authCredentials=new Yw(new _m(l,c))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Bn(this.firestore,e,this._query)}}class St{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new or(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new St(this.firestore,e,this._key)}}class or extends Bn{constructor(e,n,r){super(e,n,Ea(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new St(this.firestore,null,new oe(e))}withConverter(e){return new or(this.firestore,e,this._path)}}function mn(t,e,...n){if(t=et(t),yg("collection","path",e),t instanceof Va){const r=Fe.fromString(e,...n);return rf(r),new or(t,null,r)}{if(!(t instanceof St||t instanceof or))throw new X(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return rf(r),new or(t.firestore,null,r)}}function hn(t,e,...n){if(t=et(t),arguments.length===1&&(e=ym.newId()),yg("doc","path",e),t instanceof Va){const r=Fe.fromString(e,...n);return nf(r),new St(t,null,new oe(r))}{if(!(t instanceof St||t instanceof or))throw new X(M.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(Fe.fromString(e,...n));return nf(r),new St(t.firestore,t instanceof or?t.converter:null,new oe(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class of{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new su(this,"async_queue_retry"),this.Vu=()=>{const r=Il();r&&re("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const n=Il();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const n=Il();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const n=new fn;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!xi(e))throw e;re("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const n=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(o){let l=o.message||"";return o.stack&&(l=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),l}(r);throw xn("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=n,n}enqueueAfterDelay(e,n,r){this.fu(),this.Ru.indexOf(e)>-1&&(n=0);const s=cu.createAndSchedule(this,e,n,r,i=>this.yu(i));return this.Tu.push(s),s}fu(){this.Eu&&pe()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const n of this.Tu)if(n.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.Tu)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const n=this.Tu.indexOf(e);this.Tu.splice(n,1)}}function af(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const s=n;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(t,["next","error","complete"])}class ur extends Va{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new of,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new of(e),this._firestoreClient=void 0,await e}}}function LI(t,e){const n=typeof t=="object"?t:lm(),r=typeof t=="string"?t:e||"(default)",s=qc(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=TE("firestore");i&&MI(s,...i)}return s}function $i(t){if(t._terminated)throw new X(M.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||FI(t),t._firestoreClient}function FI(t){var e,n,r;const s=t._freezeSettings(),i=function(l,c,h,d){return new f0(l,c,h,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,_g(d.experimentalLongPollingOptions),d.useFetchStreams)}(t._databaseId,((e=t._app)===null||e===void 0?void 0:e.options.appId)||"",t._persistenceKey,s);t._componentsProvider||!((n=s.localCache)===null||n===void 0)&&n._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(t._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),t._firestoreClient=new PI(t._authCredentials,t._appCheckCredentials,t._queue,i,t._componentsProvider&&function(l){const c=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xr{constructor(e){this._byteString=e}static fromBase64String(e){try{return new xr(mt.fromBase64String(e))}catch(n){throw new X(M.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new xr(mt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Da{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new X(M.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ft(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Na{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yu{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new X(M.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new X(M.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return ke(this._lat,e._lat)||ke(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vu{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UI=/^__.*__$/;class BI{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new pr(e,this.data,this.fieldMask,n,this.fieldTransforms):new Li(e,this.data,n,this.fieldTransforms)}}class vg{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new pr(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function Eg(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw pe()}}class Eu{constructor(e,n,r,s,i,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.vu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Eu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var n;const r=(n=this.path)===null||n===void 0?void 0:n.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return Xo(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Eg(this.Cu)&&UI.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class $I{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||Sa(e)}Qu(e,n,r,s=!1){return new Eu({Cu:e,methodName:n,qu:r,path:ft.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function wu(t){const e=t._freezeSettings(),n=Sa(t._databaseId);return new $I(t._databaseId,!!e.ignoreUndefinedProperties,n)}function wg(t,e,n,r,s,i={}){const o=t.Qu(i.merge||i.mergeFields?2:0,e,n,s);Iu("Data must be an object, but it was:",o,r);const l=Tg(r,o);let c,h;if(i.merge)c=new qt(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const d=[];for(const p of i.mergeFields){const m=uc(e,p,n);if(!o.contains(m))throw new X(M.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Ag(d,m)||d.push(m)}c=new qt(d),h=o.fieldTransforms.filter(p=>c.covers(p.field))}else c=null,h=o.fieldTransforms;return new BI(new Dt(l),c,h)}class Oa extends Na{_toFieldTransform(e){if(e.Cu!==2)throw e.Cu===1?e.Bu(`${this._methodName}() can only appear at the top level of your update data`):e.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Oa}}class Tu extends Na{_toFieldTransform(e){return new F0(e.path,new Ii)}isEqual(e){return e instanceof Tu}}function jI(t,e,n,r){const s=t.Qu(1,e,n);Iu("Data must be an object, but it was:",s,r);const i=[],o=Dt.empty();Fr(r,(c,h)=>{const d=Au(e,c,n);h=et(h);const p=s.Nu(d);if(h instanceof Oa)i.push(d);else{const m=ji(h,p);m!=null&&(i.push(d),o.set(d,m))}});const l=new qt(i);return new vg(o,l,s.fieldTransforms)}function qI(t,e,n,r,s,i){const o=t.Qu(1,e,n),l=[uc(e,r,n)],c=[s];if(i.length%2!=0)throw new X(M.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<i.length;m+=2)l.push(uc(e,i[m])),c.push(i[m+1]);const h=[],d=Dt.empty();for(let m=l.length-1;m>=0;--m)if(!Ag(h,l[m])){const _=l[m];let S=c[m];S=et(S);const k=o.Nu(_);if(S instanceof Oa)h.push(_);else{const D=ji(S,k);D!=null&&(h.push(_),d.set(_,D))}}const p=new qt(h);return new vg(d,p,o.fieldTransforms)}function HI(t,e,n,r=!1){return ji(n,t.Qu(r?4:3,e))}function ji(t,e){if(Ig(t=et(t)))return Iu("Unsupported field value:",e,t),Tg(t,e);if(t instanceof Na)return function(r,s){if(!Eg(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const l of r){let c=ji(l,s.Lu(o));c==null&&(c={nullValue:"NULL_VALUE"}),i.push(c),o++}return{arrayValue:{values:i}}}(t,e)}return function(r,s){if((r=et(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return x0(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=Xe.fromDate(r);return{timestampValue:Wo(s.serializer,i)}}if(r instanceof Xe){const i=new Xe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Wo(s.serializer,i)}}if(r instanceof yu)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof xr)return{bytesValue:Gm(s.serializer,r._byteString)};if(r instanceof St){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Bu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:eu(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof vu)return function(o,l){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.Bu("VectorValues must only contain numeric values.");return Yc(l.serializer,c)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${ka(r)}`)}(t,e)}function Tg(t,e){const n={};return vm(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Fr(t,(r,s)=>{const i=ji(s,e.Mu(r));i!=null&&(n[r]=i)}),{mapValue:{fields:n}}}function Ig(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof Xe||t instanceof yu||t instanceof xr||t instanceof St||t instanceof Na||t instanceof vu)}function Iu(t,e,n){if(!Ig(n)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(n)){const r=ka(n);throw r==="an object"?e.Bu(t+" a custom object"):e.Bu(t+" "+r)}}function uc(t,e,n){if((e=et(e))instanceof Da)return e._internalPath;if(typeof e=="string")return Au(t,e);throw Xo("Field path arguments must be of type string or ",t,!1,void 0,n)}const zI=new RegExp("[~\\*/\\[\\]]");function Au(t,e,n){if(e.search(zI)>=0)throw Xo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new Da(...e.split("."))._internalPath}catch{throw Xo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Xo(t,e,n,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${r}`),o&&(c+=` in document ${s}`),c+=")"),new X(M.INVALID_ARGUMENT,l+t+c)}function Ag(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(e,n,r,s,i){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new St(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new GI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(xa("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class GI extends Zo{data(){return super.data()}}function xa(t,e){return typeof e=="string"?Au(t,e):e instanceof Da?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bg(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new X(M.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bu{}class Ru extends bu{}function hc(t,e,...n){let r=[];e instanceof bu&&r.push(e),r=r.concat(n),function(i){const o=i.filter(c=>c instanceof Su).length,l=i.filter(c=>c instanceof Ma).length;if(o>1||o>0&&l>0)throw new X(M.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)t=s._apply(t);return t}class Ma extends Ru{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new Ma(e,n,r)}_apply(e){const n=this._parse(e);return Rg(e._query,n),new Bn(e.firestore,e.converter,nc(e._query,n))}_parse(e){const n=wu(e.firestore);return function(i,o,l,c,h,d,p){let m;if(h.isKeyField()){if(d==="array-contains"||d==="array-contains-any")throw new X(M.INVALID_ARGUMENT,`Invalid Query. You can't perform '${d}' queries on documentId().`);if(d==="in"||d==="not-in"){cf(p,d);const _=[];for(const S of p)_.push(lf(c,i,S));m={arrayValue:{values:_}}}else m=lf(c,i,p)}else d!=="in"&&d!=="not-in"&&d!=="array-contains-any"||cf(p,d),m=HI(l,o,p,d==="in"||d==="not-in");return Ye.create(h,d,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function WI(t,e,n){const r=e,s=xa("where",t);return Ma._create(s,r,n)}class Su extends bu{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new Su(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:rn.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(s,i){let o=s;const l=i.getFlattenedFilters();for(const c of l)Rg(o,c),o=nc(o,c)}(e._query,n),new Bn(e.firestore,e.converter,nc(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Pu extends Ru{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new Pu(e,n)}_apply(e){const n=function(s,i,o){if(s.startAt!==null)throw new X(M.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new X(M.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ti(i,o)}(e._query,this._field,this._direction);return new Bn(e.firestore,e.converter,function(s,i){const o=s.explicitOrderBy.concat([i]);return new As(s.path,s.collectionGroup,o,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,n))}}function KI(t,e="asc"){const n=e,r=xa("orderBy",t);return Pu._create(r,n)}class Cu extends Ru{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Cu(e,n,r)}_apply(e){return new Bn(e.firestore,e.converter,zo(e._query,this._limit,this._limitType))}}function QI(t){return xI("limit",t),Cu._create("limit",t,"F")}function lf(t,e,n){if(typeof(n=et(n))=="string"){if(n==="")throw new X(M.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Pm(e)&&n.indexOf("/")!==-1)throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(Fe.fromString(n));if(!oe.isDocumentKey(r))throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Pd(t,new oe(r))}if(n instanceof St)return Pd(t,n._key);throw new X(M.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ka(n)}.`)}function cf(t,e){if(!Array.isArray(t)||t.length===0)throw new X(M.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Rg(t,e){const n=function(s,i){for(const o of s)for(const l of o.getFlattenedFilters())if(i.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new X(M.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new X(M.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}class Sg{convertValue(e,n="none"){switch(Or(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Qe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(Nr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw pe()}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return Fr(e,(s,i)=>{r[s]=this.convertValue(i,n)}),r}convertVectorValue(e){var n,r,s;const i=(s=(r=(n=e.fields)===null||n===void 0?void 0:n.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(o=>Qe(o.doubleValue));return new vu(i)}convertGeoPoint(e){return new yu(Qe(e.latitude),Qe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=Wc(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(vi(e));default:return null}}convertTimestamp(e){const n=lr(e);return new Xe(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=Fe.fromString(e);Pe(Zm(r));const s=new Ei(r.get(1),r.get(3)),i=new oe(r.popFirst(5));return s.isEqual(n)||xn(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pg(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class JI extends Sg{constructor(e){super(),this.firestore=e}convertBytes(e){return new xr(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new St(this.firestore,null,n)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zr{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ku extends Zo{constructor(e,n,r,s,i,o){super(e,n,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Po(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(xa("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}}class Po extends ku{data(e={}){return super.data(e)}}class Cg{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new Zr(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Po(this._firestore,this._userDataWriter,r.key,r,new Zr(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new X(M.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(l=>{const c=new Po(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Zr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(l=>i||l.type!==3).map(l=>{const c=new Po(s._firestore,s._userDataWriter,l.doc.key,l.doc,new Zr(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,d=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),d=o.indexOf(l.doc.key)),{type:YI(l.type),doc:c,oldIndex:h,newIndex:d}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}}function YI(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return pe()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dc(t){t=Qt(t,St);const e=Qt(t.firestore,ur);return DI($i(e),t._key).then(n=>Vg(e,t,n))}class La extends Sg{constructor(e){super(),this.firestore=e}convertBytes(e){return new xr(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new St(this.firestore,null,n)}}function Nn(t){t=Qt(t,Bn);const e=Qt(t.firestore,ur),n=$i(e),r=new La(e);return bg(t._query),NI(n,t._query).then(s=>new Cg(e,r,t,s))}function fc(t,e,n){t=Qt(t,St);const r=Qt(t.firestore,ur),s=Pg(t.converter,e,n);return kg(r,[wg(wu(r),"setDoc",t._key,s,t.converter!==null,n).toMutation(t._key,Nt.none())])}function XI(t){return kg(Qt(t.firestore,ur),[new ba(t._key,Nt.none())])}function ZI(t,...e){var n,r,s;t=et(t);let i={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||af(e[o])||(i=e[o],o++);const l={includeMetadataChanges:i.includeMetadataChanges,source:i.source};if(af(e[o])){const p=e[o];e[o]=(n=p.next)===null||n===void 0?void 0:n.bind(p),e[o+1]=(r=p.error)===null||r===void 0?void 0:r.bind(p),e[o+2]=(s=p.complete)===null||s===void 0?void 0:s.bind(p)}let c,h,d;if(t instanceof St)h=Qt(t.firestore,ur),d=Ea(t._key.path),c={next:p=>{e[o]&&e[o](Vg(h,t,p))},error:e[o+1],complete:e[o+2]};else{const p=Qt(t,Bn);h=Qt(p.firestore,ur),d=p._query;const m=new La(h);c={next:_=>{e[o]&&e[o](new Cg(h,m,p,_))},error:e[o+1],complete:e[o+2]},bg(t._query)}return function(m,_,S,k){const D=new gu(k),F=new pu(_,D,S);return m.asyncQueue.enqueueAndForget(async()=>hu(await Yo(m),F)),()=>{D.Za(),m.asyncQueue.enqueueAndForget(async()=>du(await Yo(m),F))}}($i(h),d,l,c)}function kg(t,e){return function(r,s){const i=new fn;return r.asyncQueue.enqueueAndForget(async()=>yI(await kI(r),s,i)),i.promise}($i(t),e)}function Vg(t,e,n){const r=n.docs.get(e._key),s=new La(t);return new ku(t,s,e._key,r,new Zr(n.hasPendingWrites,n.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eA={maxAttempts:5};function zs(t,e){if((t=et(t)).firestore!==e)throw new X(M.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tA extends class{constructor(n,r){this._firestore=n,this._transaction=r,this._dataReader=wu(n)}get(n){const r=zs(n,this._firestore),s=new JI(this._firestore);return this._transaction.lookup([r._key]).then(i=>{if(!i||i.length!==1)return pe();const o=i[0];if(o.isFoundDocument())return new Zo(this._firestore,s,o.key,o,r.converter);if(o.isNoDocument())return new Zo(this._firestore,s,r._key,null,r.converter);throw pe()})}set(n,r,s){const i=zs(n,this._firestore),o=Pg(i.converter,r,s),l=wg(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,l),this}update(n,r,s,...i){const o=zs(n,this._firestore);let l;return l=typeof(r=et(r))=="string"||r instanceof Da?qI(this._dataReader,"Transaction.update",o._key,r,s,i):jI(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,l),this}delete(n){const r=zs(n,this._firestore);return this._transaction.delete(r._key),this}}{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=zs(e,this._firestore),r=new La(this._firestore);return super.get(e).then(s=>new ku(this._firestore,r,n._key,s._document,new Zr(!1,!1),n.converter))}}function pc(t,e,n){t=Qt(t,ur);const r=Object.assign(Object.assign({},eA),n);return function(i){if(i.maxAttempts<1)throw new X(M.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,o,l){const c=new fn;return i.asyncQueue.enqueueAndForget(async()=>{const h=await VI(i);new SI(i.asyncQueue,h,l,o,c).au()}),c.promise}($i(t),s=>e(new tA(t,s)),r)}function Vu(){return new Tu("serverTimestamp")}(function(e,n=!0){(function(s){Is=s})(Ts),hs(new Vr("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),l=new ur(new Xw(r.getProvider("auth-internal")),new n0(r.getProvider("app-check-internal")),function(h,d){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new X(M.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ei(h.options.projectId,d)}(o,s),o);return i=Object.assign({useFetchStreams:n},i),l._setSettings(i),l},"PUBLIC").setMultipleInstances(!0)),ir(Id,"4.7.3",e),ir(Id,"4.7.3","esm2017")})();function Du(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Dg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const nA=Dg,Ng=new Di("auth","Firebase",Dg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ea=new $c("@firebase/auth");function rA(t,...e){ea.logLevel<=be.WARN&&ea.warn(`Auth (${Ts}): ${t}`,...e)}function Co(t,...e){ea.logLevel<=be.ERROR&&ea.error(`Auth (${Ts}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vn(t,...e){throw Ou(t,...e)}function nn(t,...e){return Ou(t,...e)}function Nu(t,e,n){const r=Object.assign(Object.assign({},nA()),{[e]:n});return new Di("auth","Firebase",r).create(e,{appName:t.name})}function Pr(t){return Nu(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function sA(t,e,n){const r=n;if(!(e instanceof r))throw r.name!==e.constructor.name&&vn(t,"argument-error"),Nu(t,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function Ou(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Ng.create(t,...e)}function ye(t,e,...n){if(!t)throw Ou(e,...n)}function Cn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Co(e),new Error(e)}function Ln(t,e){t||Cn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mc(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function iA(){return uf()==="http:"||uf()==="https:"}function uf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oA(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(iA()||PE()||"connection"in navigator)?navigator.onLine:!0}function aA(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ln(n>e,"Short delay should be less than long delay!"),this.isMobile=bE()||CE()}get(){return oA()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(t,e){Ln(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Og{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Cn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Cn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Cn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lA={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cA=new qi(3e4,6e4);function Mu(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Ss(t,e,n,r,s={}){return xg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Ni(Object.assign({key:t.config.apiKey},o)).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const h=Object.assign({method:e,headers:c},i);return SE()||(h.referrerPolicy="no-referrer"),Og.fetch()(Mg(t,t.config.apiHost,n,l),h)})}async function xg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},lA),e);try{const s=new hA(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw go(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[c,h]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw go(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw go(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw go(t,"user-disabled",o);const d=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Nu(t,d,h);vn(t,d)}}catch(s){if(s instanceof Un)throw s;vn(t,"network-request-failed",{message:String(s)})}}async function uA(t,e,n,r,s={}){const i=await Ss(t,e,n,r,s);return"mfaPendingCredential"in i&&vn(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Mg(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?xu(t.config,s):`${t.config.apiScheme}://${s}`}class hA{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(nn(this.auth,"network-request-failed")),cA.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function go(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=nn(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dA(t,e){return Ss(t,"POST","/v1/accounts:delete",e)}async function Lg(t,e){return Ss(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ci(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function fA(t,e=!1){const n=et(t),r=await n.getIdToken(e),s=Lu(r);ye(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:ci(bl(s.auth_time)),issuedAtTime:ci(bl(s.iat)),expirationTime:ci(bl(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function bl(t){return Number(t)*1e3}function Lu(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Co("JWT malformed, contained fewer than 3 sections"),null;try{const s=tm(n);return s?JSON.parse(s):(Co("Failed to decode base64 JWT payload"),null)}catch(s){return Co("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function hf(t){const e=Lu(t);return ye(e,"internal-error"),ye(typeof e.exp<"u","internal-error"),ye(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ri(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Un&&pA(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function pA({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mA{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=ci(this.lastLoginAt),this.creationTime=ci(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ta(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Ri(t,Lg(n,{idToken:r}));ye(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Fg(i.providerUserInfo):[],l=_A(t.providerData,o),c=t.isAnonymous,h=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),d=c?h:!1,p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new gc(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,p)}async function gA(t){const e=et(t);await ta(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function _A(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Fg(t){return t.map(e=>{var{providerId:n}=e,r=Du(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yA(t,e){const n=await xg(t,{},async()=>{const r=Ni({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Mg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Og.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function vA(t,e){return Ss(t,"POST","/v2/accounts:revokeToken",Mu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ye(e.idToken,"internal-error"),ye(typeof e.idToken<"u","internal-error"),ye(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):hf(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){ye(e.length!==0,"internal-error");const n=hf(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(ye(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await yA(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new as;return r&&(ye(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(ye(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(ye(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new as,this.toJSON())}_performRefresh(){return Cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gn(t,e){ye(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class kn{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Du(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new mA(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new gc(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Ri(this,this.stsTokenManager.getToken(this.auth,e));return ye(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return fA(this,e)}reload(){return gA(this)}_assign(e){this!==e&&(ye(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new kn(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){ye(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await ta(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Pn(this.auth.app))return Promise.reject(Pr(this.auth));const e=await this.getIdToken();return await Ri(this,dA(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,c,h,d;const p=(r=n.displayName)!==null&&r!==void 0?r:void 0,m=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,S=(o=n.photoURL)!==null&&o!==void 0?o:void 0,k=(l=n.tenantId)!==null&&l!==void 0?l:void 0,D=(c=n._redirectEventId)!==null&&c!==void 0?c:void 0,F=(h=n.createdAt)!==null&&h!==void 0?h:void 0,L=(d=n.lastLoginAt)!==null&&d!==void 0?d:void 0,{uid:$,emailVerified:H,isAnonymous:ce,providerData:le,stsTokenManager:A}=n;ye($&&A,e,"internal-error");const y=as.fromJSON(this.name,A);ye(typeof $=="string",e,"internal-error"),Gn(p,e.name),Gn(m,e.name),ye(typeof H=="boolean",e,"internal-error"),ye(typeof ce=="boolean",e,"internal-error"),Gn(_,e.name),Gn(S,e.name),Gn(k,e.name),Gn(D,e.name),Gn(F,e.name),Gn(L,e.name);const v=new kn({uid:$,auth:e,email:m,emailVerified:H,displayName:p,isAnonymous:ce,photoURL:S,phoneNumber:_,tenantId:k,stsTokenManager:y,createdAt:F,lastLoginAt:L});return le&&Array.isArray(le)&&(v.providerData=le.map(b=>Object.assign({},b))),D&&(v._redirectEventId=D),v}static async _fromIdTokenResponse(e,n,r=!1){const s=new as;s.updateFromServerResponse(n);const i=new kn({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ta(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];ye(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Fg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new as;l.updateFromIdToken(r);const c=new kn({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new gc(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,h),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const df=new Map;function Vn(t){Ln(t instanceof Function,"Expected a class definition");let e=df.get(t);return e?(Ln(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,df.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ug{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ug.type="NONE";const ff=Ug;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ko(t,e,n){return`firebase:${t}:${e}:${n}`}class ls{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=ko(this.userKey,s.apiKey,i),this.fullPersistenceKey=ko("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?kn._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ls(Vn(ff),e,r);const s=(await Promise.all(n.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||Vn(ff);const o=ko(r,e.config.apiKey,e.name);let l=null;for(const h of n)try{const d=await h._get(o);if(d){const p=kn._fromJSON(e,d);h!==i&&(l=p),i=h;break}}catch{}const c=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new ls(i,e,r):(i=c[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new ls(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(qg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Bg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(zg(e))return"Blackberry";if(Gg(e))return"Webos";if($g(e))return"Safari";if((e.includes("chrome/")||jg(e))&&!e.includes("edge/"))return"Chrome";if(Hg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Bg(t=Pt()){return/firefox\//i.test(t)}function $g(t=Pt()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function jg(t=Pt()){return/crios\//i.test(t)}function qg(t=Pt()){return/iemobile/i.test(t)}function Hg(t=Pt()){return/android/i.test(t)}function zg(t=Pt()){return/blackberry/i.test(t)}function Gg(t=Pt()){return/webos/i.test(t)}function Fu(t=Pt()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function EA(t=Pt()){var e;return Fu(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function wA(){return kE()&&document.documentMode===10}function Wg(t=Pt()){return Fu(t)||Hg(t)||Gg(t)||zg(t)||/windows phone/i.test(t)||qg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kg(t,e=[]){let n;switch(t){case"Browser":n=pf(Pt());break;case"Worker":n=`${pf(Pt())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ts}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class TA{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const c=e(i);o(c)}catch(c){l(c)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function IA(t,e={}){return Ss(t,"GET","/v2/passwordPolicy",Mu(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const AA=6;class bA{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:AA,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const c={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,c),this.validatePasswordCharacterOptions(e,c),c.isValid&&(c.isValid=(n=c.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),c.isValid&&(c.isValid=(r=c.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),c.isValid&&(c.isValid=(s=c.containsLowercaseLetter)!==null&&s!==void 0?s:!0),c.isValid&&(c.isValid=(i=c.containsUppercaseLetter)!==null&&i!==void 0?i:!0),c.isValid&&(c.isValid=(o=c.containsNumericCharacter)!==null&&o!==void 0?o:!0),c.isValid&&(c.isValid=(l=c.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),c}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RA{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new mf(this),this.idTokenSubscription=new mf(this),this.beforeStateQueue=new TA(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ng,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Vn(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await ls.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Lg(this,{idToken:e}),r=await kn._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Pn(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(s=c.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ye(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await ta(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=aA()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Pn(this.app))return Promise.reject(Pr(this));const n=e?et(e):null;return n&&ye(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&ye(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Pn(this.app)?Promise.reject(Pr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Pn(this.app)?Promise.reject(Pr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Vn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await IA(this),n=new bA(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new Di("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await vA(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Vn(e)||this._popupRedirectResolver;ye(n,this,"argument-error"),this.redirectPersistenceManager=await ls.create(this,[Vn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(ye(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const c=e.addObserver(n,r,s);return()=>{o=!0,c()}}else{const c=e.addObserver(n);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ye(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Kg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&rA(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Fa(t){return et(t)}class mf{constructor(e){this.auth=e,this.observer=null,this.addObserver=FE(n=>this.observer=n)}get next(){return ye(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Uu={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function SA(t){Uu=t}function PA(t){return Uu.loadJS(t)}function CA(){return Uu.gapiScript}function kA(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function VA(t,e){const n=qc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if($o(i,e??{}))return s;vn(s,"already-initialized")}return n.initialize({options:e})}function DA(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Vn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function NA(t,e,n){const r=Fa(t);ye(r._canInitEmulator,r,"emulator-config-failed"),ye(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!!(n!=null&&n.disableWarnings),i=Qg(e),{host:o,port:l}=OA(e),c=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${c}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),s||xA()}function Qg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function OA(t){const e=Qg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:gf(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:gf(o)}}}function gf(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function xA(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Cn("not implemented")}_getIdTokenResponse(e){return Cn("not implemented")}_linkToIdToken(e,n){return Cn("not implemented")}_getReauthenticationResolver(e){return Cn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cs(t,e){return uA(t,"POST","/v1/accounts:signInWithIdp",Mu(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MA="http://localhost";class Mr extends Jg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Mr(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):vn("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Du(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Mr(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return cs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,cs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,cs(e,n)}buildRequest(){const e={requestUri:MA,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Ni(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hi extends Bu{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn extends Hi{constructor(){super("facebook.com")}static credential(e){return Mr._fromParams({providerId:Yn.PROVIDER_ID,signInMethod:Yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yn.credentialFromTaggedObject(e)}static credentialFromError(e){return Yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yn.credential(e.oauthAccessToken)}catch{return null}}}Yn.FACEBOOK_SIGN_IN_METHOD="facebook.com";Yn.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn extends Hi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Mr._fromParams({providerId:dn.PROVIDER_ID,signInMethod:dn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return dn.credentialFromTaggedObject(e)}static credentialFromError(e){return dn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return dn.credential(n,r)}catch{return null}}}dn.GOOGLE_SIGN_IN_METHOD="google.com";dn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn extends Hi{constructor(){super("github.com")}static credential(e){return Mr._fromParams({providerId:Xn.PROVIDER_ID,signInMethod:Xn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Xn.credentialFromTaggedObject(e)}static credentialFromError(e){return Xn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Xn.credential(e.oauthAccessToken)}catch{return null}}}Xn.GITHUB_SIGN_IN_METHOD="github.com";Xn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn extends Hi{constructor(){super("twitter.com")}static credential(e,n){return Mr._fromParams({providerId:Zn.PROVIDER_ID,signInMethod:Zn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Zn.credentialFromTaggedObject(e)}static credentialFromError(e){return Zn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Zn.credential(n,r)}catch{return null}}}Zn.TWITTER_SIGN_IN_METHOD="twitter.com";Zn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await kn._fromIdTokenResponse(e,r,s),o=_f(r);return new ys({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=_f(r);return new ys({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function _f(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na extends Un{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,na.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new na(e,n,r,s)}}function Yg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?na._fromErrorAndOperation(t,i,e,r):i})}async function LA(t,e,n=!1){const r=await Ri(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ys._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function FA(t,e,n=!1){const{auth:r}=t;if(Pn(r.app))return Promise.reject(Pr(r));const s="reauthenticate";try{const i=await Ri(t,Yg(r,s,e,t),n);ye(i.idToken,r,"internal-error");const o=Lu(i.idToken);ye(o,r,"internal-error");const{sub:l}=o;return ye(t.uid===l,r,"user-mismatch"),ys._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&vn(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function UA(t,e,n=!1){if(Pn(t.app))return Promise.reject(Pr(t));const r="signIn",s=await Yg(t,r,e),i=await ys._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BA(t,e){return et(t).setPersistence(e)}function $A(t,e,n,r){return et(t).onIdTokenChanged(e,n,r)}function jA(t,e,n){return et(t).beforeAuthStateChanged(e,n)}function qA(t,e,n,r){return et(t).onAuthStateChanged(e,n,r)}function HA(t){return et(t).signOut()}const ra="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(ra,"1"),this.storage.removeItem(ra),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zA=1e3,GA=10;class Zg extends Xg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Wg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);wA()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,GA):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},zA)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Zg.type="LOCAL";const e_=Zg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class t_ extends Xg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}t_.type="SESSION";const n_=t_;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WA(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ua{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Ua(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async h=>h(n.origin,i)),c=await WA(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:c})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Ua.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $u(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KA{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,c)=>{const h=$u("",20);s.port1.start();const d=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const m=p;if(m.data.eventId===h)switch(m.data.status){case"ack":clearTimeout(d),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(m.data.response);break;default:clearTimeout(d),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gn(){return window}function QA(t){gn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function r_(){return typeof gn().WorkerGlobalScope<"u"&&typeof gn().importScripts=="function"}async function JA(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function YA(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function XA(){return r_()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s_="firebaseLocalStorageDb",ZA=1,sa="firebaseLocalStorage",i_="fbase_key";class zi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Ba(t,e){return t.transaction([sa],e?"readwrite":"readonly").objectStore(sa)}function eb(){const t=indexedDB.deleteDatabase(s_);return new zi(t).toPromise()}function _c(){const t=indexedDB.open(s_,ZA);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(sa,{keyPath:i_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(sa)?e(r):(r.close(),await eb(),e(await _c()))})})}async function yf(t,e,n){const r=Ba(t,!0).put({[i_]:e,value:n});return new zi(r).toPromise()}async function tb(t,e){const n=Ba(t,!1).get(e),r=await new zi(n).toPromise();return r===void 0?null:r.value}function vf(t,e){const n=Ba(t,!0).delete(e);return new zi(n).toPromise()}const nb=800,rb=3;class o_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await _c(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>rb)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return r_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Ua._getInstance(XA()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await JA(),!this.activeServiceWorker)return;this.sender=new KA(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||YA()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await _c();return await yf(e,ra,"1"),await vf(e,ra),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>yf(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>tb(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>vf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Ba(s,!1).getAll();return new zi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),nb)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}o_.type="LOCAL";const sb=o_;new qi(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function a_(t,e){return e?Vn(e):(ye(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ju extends Jg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return cs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return cs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return cs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function ib(t){return UA(t.auth,new ju(t),t.bypassAuthState)}function ob(t){const{auth:e,user:n}=t;return ye(n,e,"internal-error"),FA(n,new ju(t),t.bypassAuthState)}async function ab(t){const{auth:e,user:n}=t;return ye(n,e,"internal-error"),LA(n,new ju(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ib;case"linkViaPopup":case"linkViaRedirect":return ab;case"reauthViaPopup":case"reauthViaRedirect":return ob;default:vn(this.auth,"internal-error")}}resolve(e){Ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ln(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lb=new qi(2e3,1e4);async function cb(t,e,n){if(Pn(t.app))return Promise.reject(nn(t,"operation-not-supported-in-this-environment"));const r=Fa(t);sA(t,e,Bu);const s=a_(r,n);return new br(r,"signInViaPopup",e,s).executeNotNull()}class br extends l_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,br.currentPopupAction&&br.currentPopupAction.cancel(),br.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ye(e,this.auth,"internal-error"),e}async onExecution(){Ln(this.filter.length===1,"Popup operations only handle one event");const e=$u();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(nn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(nn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,br.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(nn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,lb.get())};e()}}br.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ub="pendingRedirect",Vo=new Map;class hb extends l_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Vo.get(this.auth._key());if(!e){try{const r=await db(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Vo.set(this.auth._key(),e)}return this.bypassAuthState||Vo.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function db(t,e){const n=mb(e),r=pb(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function fb(t,e){Vo.set(t._key(),e)}function pb(t){return Vn(t._redirectPersistence)}function mb(t){return ko(ub,t.config.apiKey,t.name)}async function gb(t,e,n=!1){if(Pn(t.app))return Promise.reject(Pr(t));const r=Fa(t),s=a_(r,e),o=await new hb(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _b=10*60*1e3;class yb{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!vb(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!c_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(nn(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=_b&&this.cachedEventUids.clear(),this.cachedEventUids.has(Ef(e))}saveEventToCache(e){this.cachedEventUids.add(Ef(e)),this.lastProcessedEventTime=Date.now()}}function Ef(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function c_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function vb(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return c_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Eb(t,e={}){return Ss(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wb=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Tb=/^https?/;async function Ib(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Eb(t);for(const n of e)try{if(Ab(n))return}catch{}vn(t,"unauthorized-domain")}function Ab(t){const e=mc(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Tb.test(n))return!1;if(wb.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bb=new qi(3e4,6e4);function wf(){const t=gn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Rb(t){return new Promise((e,n)=>{var r,s,i;function o(){wf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{wf(),n(nn(t,"network-request-failed"))},timeout:bb.get()})}if(!((s=(r=gn().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=gn().gapi)===null||i===void 0)&&i.load)o();else{const l=kA("iframefcb");return gn()[l]=()=>{gapi.load?o():n(nn(t,"network-request-failed"))},PA(`${CA()}?onload=${l}`).catch(c=>n(c))}}).catch(e=>{throw Do=null,e})}let Do=null;function Sb(t){return Do=Do||Rb(t),Do}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pb=new qi(5e3,15e3),Cb="__/auth/iframe",kb="emulator/auth/iframe",Vb={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Db=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Nb(t){const e=t.config;ye(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?xu(e,kb):`https://${t.config.authDomain}/${Cb}`,r={apiKey:e.apiKey,appName:t.name,v:Ts},s=Db.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Ni(r).slice(1)}`}async function Ob(t){const e=await Sb(t),n=gn().gapi;return ye(n,t,"internal-error"),e.open({where:document.body,url:Nb(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Vb,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=nn(t,"network-request-failed"),l=gn().setTimeout(()=>{i(o)},Pb.get());function c(){gn().clearTimeout(l),s(r)}r.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xb={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Mb=500,Lb=600,Fb="_blank",Ub="http://localhost";class Tf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Bb(t,e,n,r=Mb,s=Lb){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c=Object.assign(Object.assign({},xb),{width:r.toString(),height:s.toString(),top:i,left:o}),h=Pt().toLowerCase();n&&(l=jg(h)?Fb:n),Bg(h)&&(e=e||Ub,c.scrollbars="yes");const d=Object.entries(c).reduce((m,[_,S])=>`${m}${_}=${S},`,"");if(EA(h)&&l!=="_self")return $b(e||"",l),new Tf(null);const p=window.open(e||"",l,d);ye(p,t,"popup-blocked");try{p.focus()}catch{}return new Tf(p)}function $b(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jb="__/auth/handler",qb="emulator/auth/handler",Hb=encodeURIComponent("fac");async function If(t,e,n,r,s,i){ye(t.config.authDomain,t,"auth-domain-config-required"),ye(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ts,eventId:s};if(e instanceof Bu){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",LE(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[d,p]of Object.entries(i||{}))o[d]=p}if(e instanceof Hi){const d=e.getScopes().filter(p=>p!=="");d.length>0&&(o.scopes=d.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const d of Object.keys(l))l[d]===void 0&&delete l[d];const c=await t._getAppCheckToken(),h=c?`#${Hb}=${encodeURIComponent(c)}`:"";return`${zb(t)}?${Ni(l).slice(1)}${h}`}function zb({config:t}){return t.emulator?xu(t,qb):`https://${t.authDomain}/${jb}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rl="webStorageSupport";class Gb{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=n_,this._completeRedirectFn=gb,this._overrideRedirectResult=fb}async _openPopup(e,n,r,s){var i;Ln((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await If(e,n,r,mc(),s);return Bb(e,o,$u())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await If(e,n,r,mc(),s);return QA(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Ln(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await Ob(e),r=new yb(e);return n.register("authEvent",s=>(ye(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Rl,{type:Rl},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[Rl];o!==void 0&&n(!!o),vn(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Ib(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Wg()||$g()||Fu()}}const Wb=Gb;var Af="@firebase/auth",bf="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kb{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){ye(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qb(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Jb(t){hs(new Vr("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;ye(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Kg(t)},h=new RA(r,s,i,c);return DA(h,n),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),hs(new Vr("auth-internal",e=>{const n=Fa(e.getProvider("auth").getImmediate());return(r=>new Kb(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ir(Af,bf,Qb(t)),ir(Af,bf,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yb=5*60,Xb=sm("authIdTokenMaxAge")||Yb;let Rf=null;const Zb=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Xb)return;const s=n==null?void 0:n.token;Rf!==s&&(Rf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function eR(t=lm()){const e=qc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=VA(t,{popupRedirectResolver:Wb,persistence:[sb,e_,n_]}),r=sm("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=Zb(i.toString());jA(n,o,()=>o(n.currentUser)),$A(n,l=>o(l))}}const s=nm("auth");return s&&NA(n,`http://${s}`),n}function tR(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}SA({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=nn("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",tR().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Jb("Browser");const nR={apiKey:"AIzaSyAcA-g50NVo-sgCQStBhDWZyMJuVYucpyQ",authDomain:"eurovisionvotingapp-bfa92.firebaseapp.com",projectId:"eurovisionvotingapp-bfa92",storageBucket:"eurovisionvotingapp-bfa92.firebasestorage.app",messagingSenderId:"951848335066",appId:"1:951848335066:web:450ca4a90dd21a9f3997e3",measurementId:"G-TQGCLLGPQJ"},u_=am(nR),Ge=LI(u_),Ft=eR(u_),Sl="eurovision_session",st=ge(null),ht=ge(null),bn=ge(null),Bt=ge(!0),Pl=ge(!1);let Sf=!1;const Pf=()=>Sf?void 0:(Bt.value=!0,Sf=!0,BA(Ft,e_).catch(e=>{console.error("Error setting persistence:",e)}),qA(Ft,async e=>{if(e)st.value=e,ht.value&&(localStorage.removeItem("guestUser"),ht.value=null);else{st.value=null;const n=localStorage.getItem("guestUser");n&&(ht.value=JSON.parse(n))}Bt.value=!1},e=>{console.error("Auth state error:",e),bn.value=e.message,Bt.value=!1})),rR=async t=>{try{Bt.value=!0,bn.value=null;const e=`name_${t}`,n=hn(Ge,"guestUsers",e);return await fc(n,{displayName:t,createdAt:Vu()}),ht.value={id:e,displayName:t},localStorage.setItem("guestUser",JSON.stringify({id:e,displayName:t})),ht.value}catch(e){throw console.error("Error signing in with name:",e),bn.value="Failed to sign in. Please try again.",e}finally{Bt.value=!1}};function Ps(t){const e=()=>{sessionStorage.removeItem(Sl),localStorage.removeItem("user"),localStorage.removeItem("guestUser"),localStorage.removeItem("eurovision_votes"),Ft.currentUser&&Ft.setPersistence(Ft.Auth.Persistence.NONE).catch(p=>console.error("Error clearing auth persistence:",p)),st.value=null,ht.value=null,bn.value=null},n=async()=>{try{Bt.value=!0,bn.value=null;const p=await cb(Ft,new dn),{user:m}=p,_=hn(Ge,"users",m.uid);return await fc(_,{displayName:m.displayName,email:m.email,photoURL:m.photoURL,lastLogin:Vu()},{merge:!0}),st.value={uid:m.uid,id:m.uid,displayName:m.displayName,email:m.email,picture:m.photoURL,type:"google"},st.value}catch(p){throw console.error("Error signing in with Google:",p),bn.value="Failed to sign in with Google. Please try again.",p}finally{Bt.value=!1}},r=async p=>{try{if(!dn.credentialFromResult(p))throw new Error("No credential received");const _={uid:p.user.uid,email:p.user.email,displayName:p.user.displayName,type:"google"};return await fc(hn(Ge,"users",p.user.uid),_),st.value=_,localStorage.setItem("user",JSON.stringify(_)),_}catch(m){throw console.error("Login error:",m),bn.value=m.message,m}},s=async()=>{try{Bt.value=!0,st.value&&Ft.currentUser&&await HA(Ft),ht.value&&(localStorage.removeItem("guestUser"),ht.value=null),localStorage.removeItem("eurovision_votes"),sessionStorage.removeItem(Sl),st.value=null,ht.value=null,bn.value=null,e(),t&&(await t.push("/"),window.location.reload())}catch(p){throw console.error("Logout error:",p),p}finally{Bt.value=!1}};ws(()=>{const p=Pf(),m=localStorage.getItem("user");return m&&(st.value=JSON.parse(m)),Ft.onAuthStateChanged(_=>{if(Bt.value=!1,_){const S={uid:_.uid,email:_.email,displayName:_.displayName,type:"google"};st.value=S,localStorage.setItem("user",JSON.stringify(S))}else st.value=null,localStorage.removeItem("user")}),()=>{p&&p()}});const i=Be(()=>!!st.value||!!ht.value),o=Be(()=>{var p,m,_;return(p=st.value)!=null&&p.displayName?st.value.displayName:(m=st.value)!=null&&m.name?st.value.name:(_=ht.value)!=null&&_.name?ht.value.name:""}),l=Be(()=>st.value?"google":ht.value?"guest":null),c=Be(()=>Ft.currentUser?Ft.currentUser.uid:ht.value?ht.value.id:null),h=()=>{const p=sessionStorage.getItem(Sl);if(p)try{const m=JSON.parse(p);if(Date.now()-m.timestamp>24*60*60*1e3){e();return}if(m.type==="google"){if(!Ft.currentUser){e();return}st.value=m}else m.type==="guest"&&(ht.value=m);const S=localStorage.getItem("intendedRoute");S&&(t.push(S),localStorage.removeItem("intendedRoute"))}catch(m){console.error("Error parsing session:",m),e()}};return t&&is(()=>t.currentRoute.value,p=>{["/vote","/leaderboard"].includes(p.path)&&!i.value&&t.push("/")}),h(),{user:st,guestUser:ht,error:bn,isLoading:Bt,signInWithGoogle:n,signInWithName:rR,logout:s,initializeAuth:Pf,isLoggedIn:i,userName:o,userType:l,login:r,initAuth:h,getUserId:c,isAuthenticated:Pl,checkAuthState:async()=>{if(Bt.value)try{const p=localStorage.getItem("auth_token");Pl.value=!!p}catch(p){console.error("Error checking auth state:",p),Pl.value=!1}finally{Bt.value=!1}}}}/*!
  * vue-router v4.5.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const Jr=typeof document<"u";function h_(t){return typeof t=="object"||"displayName"in t||"props"in t||"__vccOpts"in t}function sR(t){return t.__esModule||t[Symbol.toStringTag]==="Module"||t.default&&h_(t.default)}const Ve=Object.assign;function Cl(t,e){const n={};for(const r in e){const s=e[r];n[r]=sn(s)?s.map(t):t(s)}return n}const ui=()=>{},sn=Array.isArray,d_=/#/g,iR=/&/g,oR=/\//g,aR=/=/g,lR=/\?/g,f_=/\+/g,cR=/%5B/g,uR=/%5D/g,p_=/%5E/g,hR=/%60/g,m_=/%7B/g,dR=/%7C/g,g_=/%7D/g,fR=/%20/g;function qu(t){return encodeURI(""+t).replace(dR,"|").replace(cR,"[").replace(uR,"]")}function pR(t){return qu(t).replace(m_,"{").replace(g_,"}").replace(p_,"^")}function yc(t){return qu(t).replace(f_,"%2B").replace(fR,"+").replace(d_,"%23").replace(iR,"%26").replace(hR,"`").replace(m_,"{").replace(g_,"}").replace(p_,"^")}function mR(t){return yc(t).replace(aR,"%3D")}function gR(t){return qu(t).replace(d_,"%23").replace(lR,"%3F")}function _R(t){return t==null?"":gR(t).replace(oR,"%2F")}function Si(t){try{return decodeURIComponent(""+t)}catch{}return""+t}const yR=/\/$/,vR=t=>t.replace(yR,"");function kl(t,e,n="/"){let r,s={},i="",o="";const l=e.indexOf("#");let c=e.indexOf("?");return l<c&&l>=0&&(c=-1),c>-1&&(r=e.slice(0,c),i=e.slice(c+1,l>-1?l:e.length),s=t(i)),l>-1&&(r=r||e.slice(0,l),o=e.slice(l,e.length)),r=IR(r??e,n),{fullPath:r+(i&&"?")+i+o,path:r,query:s,hash:Si(o)}}function ER(t,e){const n=e.query?t(e.query):"";return e.path+(n&&"?")+n+(e.hash||"")}function Cf(t,e){return!e||!t.toLowerCase().startsWith(e.toLowerCase())?t:t.slice(e.length)||"/"}function wR(t,e,n){const r=e.matched.length-1,s=n.matched.length-1;return r>-1&&r===s&&vs(e.matched[r],n.matched[s])&&__(e.params,n.params)&&t(e.query)===t(n.query)&&e.hash===n.hash}function vs(t,e){return(t.aliasOf||t)===(e.aliasOf||e)}function __(t,e){if(Object.keys(t).length!==Object.keys(e).length)return!1;for(const n in t)if(!TR(t[n],e[n]))return!1;return!0}function TR(t,e){return sn(t)?kf(t,e):sn(e)?kf(e,t):t===e}function kf(t,e){return sn(e)?t.length===e.length&&t.every((n,r)=>n===e[r]):t.length===1&&t[0]===e}function IR(t,e){if(t.startsWith("/"))return t;if(!t)return e;const n=e.split("/"),r=t.split("/"),s=r[r.length-1];(s===".."||s===".")&&r.push("");let i=n.length-1,o,l;for(o=0;o<r.length;o++)if(l=r[o],l!==".")if(l==="..")i>1&&i--;else break;return n.slice(0,i).join("/")+"/"+r.slice(o).join("/")}const Wn={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var Pi;(function(t){t.pop="pop",t.push="push"})(Pi||(Pi={}));var hi;(function(t){t.back="back",t.forward="forward",t.unknown=""})(hi||(hi={}));function AR(t){if(!t)if(Jr){const e=document.querySelector("base");t=e&&e.getAttribute("href")||"/",t=t.replace(/^\w+:\/\/[^\/]+/,"")}else t="/";return t[0]!=="/"&&t[0]!=="#"&&(t="/"+t),vR(t)}const bR=/^[^#]+#/;function RR(t,e){return t.replace(bR,"#")+e}function SR(t,e){const n=document.documentElement.getBoundingClientRect(),r=t.getBoundingClientRect();return{behavior:e.behavior,left:r.left-n.left-(e.left||0),top:r.top-n.top-(e.top||0)}}const $a=()=>({left:window.scrollX,top:window.scrollY});function PR(t){let e;if("el"in t){const n=t.el,r=typeof n=="string"&&n.startsWith("#"),s=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!s)return;e=SR(s,t)}else e=t;"scrollBehavior"in document.documentElement.style?window.scrollTo(e):window.scrollTo(e.left!=null?e.left:window.scrollX,e.top!=null?e.top:window.scrollY)}function Vf(t,e){return(history.state?history.state.position-e:-1)+t}const vc=new Map;function CR(t,e){vc.set(t,e)}function kR(t){const e=vc.get(t);return vc.delete(t),e}let VR=()=>location.protocol+"//"+location.host;function y_(t,e){const{pathname:n,search:r,hash:s}=e,i=t.indexOf("#");if(i>-1){let l=s.includes(t.slice(i))?t.slice(i).length:1,c=s.slice(l);return c[0]!=="/"&&(c="/"+c),Cf(c,"")}return Cf(n,t)+r+s}function DR(t,e,n,r){let s=[],i=[],o=null;const l=({state:m})=>{const _=y_(t,location),S=n.value,k=e.value;let D=0;if(m){if(n.value=_,e.value=m,o&&o===S){o=null;return}D=k?m.position-k.position:0}else r(_);s.forEach(F=>{F(n.value,S,{delta:D,type:Pi.pop,direction:D?D>0?hi.forward:hi.back:hi.unknown})})};function c(){o=n.value}function h(m){s.push(m);const _=()=>{const S=s.indexOf(m);S>-1&&s.splice(S,1)};return i.push(_),_}function d(){const{history:m}=window;m.state&&m.replaceState(Ve({},m.state,{scroll:$a()}),"")}function p(){for(const m of i)m();i=[],window.removeEventListener("popstate",l),window.removeEventListener("beforeunload",d)}return window.addEventListener("popstate",l),window.addEventListener("beforeunload",d,{passive:!0}),{pauseListeners:c,listen:h,destroy:p}}function Df(t,e,n,r=!1,s=!1){return{back:t,current:e,forward:n,replaced:r,position:window.history.length,scroll:s?$a():null}}function NR(t){const{history:e,location:n}=window,r={value:y_(t,n)},s={value:e.state};s.value||i(r.value,{back:null,current:r.value,forward:null,position:e.length-1,replaced:!0,scroll:null},!0);function i(c,h,d){const p=t.indexOf("#"),m=p>-1?(n.host&&document.querySelector("base")?t:t.slice(p))+c:VR()+t+c;try{e[d?"replaceState":"pushState"](h,"",m),s.value=h}catch(_){console.error(_),n[d?"replace":"assign"](m)}}function o(c,h){const d=Ve({},e.state,Df(s.value.back,c,s.value.forward,!0),h,{position:s.value.position});i(c,d,!0),r.value=c}function l(c,h){const d=Ve({},s.value,e.state,{forward:c,scroll:$a()});i(d.current,d,!0);const p=Ve({},Df(r.value,c,null),{position:d.position+1},h);i(c,p,!1),r.value=c}return{location:r,state:s,push:l,replace:o}}function OR(t){t=AR(t);const e=NR(t),n=DR(t,e.state,e.location,e.replace);function r(i,o=!0){o||n.pauseListeners(),history.go(i)}const s=Ve({location:"",base:t,go:r,createHref:RR.bind(null,t)},e,n);return Object.defineProperty(s,"location",{enumerable:!0,get:()=>e.location.value}),Object.defineProperty(s,"state",{enumerable:!0,get:()=>e.state.value}),s}function xR(t){return typeof t=="string"||t&&typeof t=="object"}function v_(t){return typeof t=="string"||typeof t=="symbol"}const E_=Symbol("");var Nf;(function(t){t[t.aborted=4]="aborted",t[t.cancelled=8]="cancelled",t[t.duplicated=16]="duplicated"})(Nf||(Nf={}));function Es(t,e){return Ve(new Error,{type:t,[E_]:!0},e)}function In(t,e){return t instanceof Error&&E_ in t&&(e==null||!!(t.type&e))}const Of="[^/]+?",MR={sensitive:!1,strict:!1,start:!0,end:!0},LR=/[.+*?^${}()[\]/\\]/g;function FR(t,e){const n=Ve({},MR,e),r=[];let s=n.start?"^":"";const i=[];for(const h of t){const d=h.length?[]:[90];n.strict&&!h.length&&(s+="/");for(let p=0;p<h.length;p++){const m=h[p];let _=40+(n.sensitive?.25:0);if(m.type===0)p||(s+="/"),s+=m.value.replace(LR,"\\$&"),_+=40;else if(m.type===1){const{value:S,repeatable:k,optional:D,regexp:F}=m;i.push({name:S,repeatable:k,optional:D});const L=F||Of;if(L!==Of){_+=10;try{new RegExp(`(${L})`)}catch(H){throw new Error(`Invalid custom RegExp for param "${S}" (${L}): `+H.message)}}let $=k?`((?:${L})(?:/(?:${L}))*)`:`(${L})`;p||($=D&&h.length<2?`(?:/${$})`:"/"+$),D&&($+="?"),s+=$,_+=20,D&&(_+=-8),k&&(_+=-20),L===".*"&&(_+=-50)}d.push(_)}r.push(d)}if(n.strict&&n.end){const h=r.length-1;r[h][r[h].length-1]+=.7000000000000001}n.strict||(s+="/?"),n.end?s+="$":n.strict&&!s.endsWith("/")&&(s+="(?:/|$)");const o=new RegExp(s,n.sensitive?"":"i");function l(h){const d=h.match(o),p={};if(!d)return null;for(let m=1;m<d.length;m++){const _=d[m]||"",S=i[m-1];p[S.name]=_&&S.repeatable?_.split("/"):_}return p}function c(h){let d="",p=!1;for(const m of t){(!p||!d.endsWith("/"))&&(d+="/"),p=!1;for(const _ of m)if(_.type===0)d+=_.value;else if(_.type===1){const{value:S,repeatable:k,optional:D}=_,F=S in h?h[S]:"";if(sn(F)&&!k)throw new Error(`Provided param "${S}" is an array but it is not repeatable (* or + modifiers)`);const L=sn(F)?F.join("/"):F;if(!L)if(D)m.length<2&&(d.endsWith("/")?d=d.slice(0,-1):p=!0);else throw new Error(`Missing required param "${S}"`);d+=L}}return d||"/"}return{re:o,score:r,keys:i,parse:l,stringify:c}}function UR(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=e[n]-t[n];if(r)return r;n++}return t.length<e.length?t.length===1&&t[0]===40+40?-1:1:t.length>e.length?e.length===1&&e[0]===40+40?1:-1:0}function w_(t,e){let n=0;const r=t.score,s=e.score;for(;n<r.length&&n<s.length;){const i=UR(r[n],s[n]);if(i)return i;n++}if(Math.abs(s.length-r.length)===1){if(xf(r))return 1;if(xf(s))return-1}return s.length-r.length}function xf(t){const e=t[t.length-1];return t.length>0&&e[e.length-1]<0}const BR={type:0,value:""},$R=/[a-zA-Z0-9_]/;function jR(t){if(!t)return[[]];if(t==="/")return[[BR]];if(!t.startsWith("/"))throw new Error(`Invalid path "${t}"`);function e(_){throw new Error(`ERR (${n})/"${h}": ${_}`)}let n=0,r=n;const s=[];let i;function o(){i&&s.push(i),i=[]}let l=0,c,h="",d="";function p(){h&&(n===0?i.push({type:0,value:h}):n===1||n===2||n===3?(i.length>1&&(c==="*"||c==="+")&&e(`A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`),i.push({type:1,value:h,regexp:d,repeatable:c==="*"||c==="+",optional:c==="*"||c==="?"})):e("Invalid state to consume buffer"),h="")}function m(){h+=c}for(;l<t.length;){if(c=t[l++],c==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:c==="/"?(h&&p(),o()):c===":"?(p(),n=1):m();break;case 4:m(),n=r;break;case 1:c==="("?n=2:$R.test(c)?m():(p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--);break;case 2:c===")"?d[d.length-1]=="\\"?d=d.slice(0,-1)+c:n=3:d+=c;break;case 3:p(),n=0,c!=="*"&&c!=="?"&&c!=="+"&&l--,d="";break;default:e("Unknown state");break}}return n===2&&e(`Unfinished custom RegExp for param "${h}"`),p(),o(),s}function qR(t,e,n){const r=FR(jR(t.path),n),s=Ve(r,{record:t,parent:e,children:[],alias:[]});return e&&!s.record.aliasOf==!e.record.aliasOf&&e.children.push(s),s}function HR(t,e){const n=[],r=new Map;e=Uf({strict:!1,end:!0,sensitive:!1},e);function s(p){return r.get(p)}function i(p,m,_){const S=!_,k=Lf(p);k.aliasOf=_&&_.record;const D=Uf(e,p),F=[k];if("alias"in p){const H=typeof p.alias=="string"?[p.alias]:p.alias;for(const ce of H)F.push(Lf(Ve({},k,{components:_?_.record.components:k.components,path:ce,aliasOf:_?_.record:k})))}let L,$;for(const H of F){const{path:ce}=H;if(m&&ce[0]!=="/"){const le=m.record.path,A=le[le.length-1]==="/"?"":"/";H.path=m.record.path+(ce&&A+ce)}if(L=qR(H,m,D),_?_.alias.push(L):($=$||L,$!==L&&$.alias.push(L),S&&p.name&&!Ff(L)&&o(p.name)),T_(L)&&c(L),k.children){const le=k.children;for(let A=0;A<le.length;A++)i(le[A],L,_&&_.children[A])}_=_||L}return $?()=>{o($)}:ui}function o(p){if(v_(p)){const m=r.get(p);m&&(r.delete(p),n.splice(n.indexOf(m),1),m.children.forEach(o),m.alias.forEach(o))}else{const m=n.indexOf(p);m>-1&&(n.splice(m,1),p.record.name&&r.delete(p.record.name),p.children.forEach(o),p.alias.forEach(o))}}function l(){return n}function c(p){const m=WR(p,n);n.splice(m,0,p),p.record.name&&!Ff(p)&&r.set(p.record.name,p)}function h(p,m){let _,S={},k,D;if("name"in p&&p.name){if(_=r.get(p.name),!_)throw Es(1,{location:p});D=_.record.name,S=Ve(Mf(m.params,_.keys.filter($=>!$.optional).concat(_.parent?_.parent.keys.filter($=>$.optional):[]).map($=>$.name)),p.params&&Mf(p.params,_.keys.map($=>$.name))),k=_.stringify(S)}else if(p.path!=null)k=p.path,_=n.find($=>$.re.test(k)),_&&(S=_.parse(k),D=_.record.name);else{if(_=m.name?r.get(m.name):n.find($=>$.re.test(m.path)),!_)throw Es(1,{location:p,currentLocation:m});D=_.record.name,S=Ve({},m.params,p.params),k=_.stringify(S)}const F=[];let L=_;for(;L;)F.unshift(L.record),L=L.parent;return{name:D,path:k,params:S,matched:F,meta:GR(F)}}t.forEach(p=>i(p));function d(){n.length=0,r.clear()}return{addRoute:i,resolve:h,removeRoute:o,clearRoutes:d,getRoutes:l,getRecordMatcher:s}}function Mf(t,e){const n={};for(const r of e)r in t&&(n[r]=t[r]);return n}function Lf(t){const e={path:t.path,redirect:t.redirect,name:t.name,meta:t.meta||{},aliasOf:t.aliasOf,beforeEnter:t.beforeEnter,props:zR(t),children:t.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in t?t.components||null:t.component&&{default:t.component}};return Object.defineProperty(e,"mods",{value:{}}),e}function zR(t){const e={},n=t.props||!1;if("component"in t)e.default=n;else for(const r in t.components)e[r]=typeof n=="object"?n[r]:n;return e}function Ff(t){for(;t;){if(t.record.aliasOf)return!0;t=t.parent}return!1}function GR(t){return t.reduce((e,n)=>Ve(e,n.meta),{})}function Uf(t,e){const n={};for(const r in t)n[r]=r in e?e[r]:t[r];return n}function WR(t,e){let n=0,r=e.length;for(;n!==r;){const i=n+r>>1;w_(t,e[i])<0?r=i:n=i+1}const s=KR(t);return s&&(r=e.lastIndexOf(s,r-1)),r}function KR(t){let e=t;for(;e=e.parent;)if(T_(e)&&w_(t,e)===0)return e}function T_({record:t}){return!!(t.name||t.components&&Object.keys(t.components).length||t.redirect)}function QR(t){const e={};if(t===""||t==="?")return e;const r=(t[0]==="?"?t.slice(1):t).split("&");for(let s=0;s<r.length;++s){const i=r[s].replace(f_," "),o=i.indexOf("="),l=Si(o<0?i:i.slice(0,o)),c=o<0?null:Si(i.slice(o+1));if(l in e){let h=e[l];sn(h)||(h=e[l]=[h]),h.push(c)}else e[l]=c}return e}function Bf(t){let e="";for(let n in t){const r=t[n];if(n=mR(n),r==null){r!==void 0&&(e+=(e.length?"&":"")+n);continue}(sn(r)?r.map(i=>i&&yc(i)):[r&&yc(r)]).forEach(i=>{i!==void 0&&(e+=(e.length?"&":"")+n,i!=null&&(e+="="+i))})}return e}function JR(t){const e={};for(const n in t){const r=t[n];r!==void 0&&(e[n]=sn(r)?r.map(s=>s==null?null:""+s):r==null?r:""+r)}return e}const YR=Symbol(""),$f=Symbol(""),ja=Symbol(""),Hu=Symbol(""),Ec=Symbol("");function Gs(){let t=[];function e(r){return t.push(r),()=>{const s=t.indexOf(r);s>-1&&t.splice(s,1)}}function n(){t=[]}return{add:e,list:()=>t.slice(),reset:n}}function Jn(t,e,n,r,s,i=o=>o()){const o=r&&(r.enterCallbacks[s]=r.enterCallbacks[s]||[]);return()=>new Promise((l,c)=>{const h=m=>{m===!1?c(Es(4,{from:n,to:e})):m instanceof Error?c(m):xR(m)?c(Es(2,{from:e,to:m})):(o&&r.enterCallbacks[s]===o&&typeof m=="function"&&o.push(m),l())},d=i(()=>t.call(r&&r.instances[s],e,n,h));let p=Promise.resolve(d);t.length<3&&(p=p.then(h)),p.catch(m=>c(m))})}function Vl(t,e,n,r,s=i=>i()){const i=[];for(const o of t)for(const l in o.components){let c=o.components[l];if(!(e!=="beforeRouteEnter"&&!o.instances[l]))if(h_(c)){const d=(c.__vccOpts||c)[e];d&&i.push(Jn(d,n,r,o,l,s))}else{let h=c();i.push(()=>h.then(d=>{if(!d)throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);const p=sR(d)?d.default:d;o.mods[l]=d,o.components[l]=p;const _=(p.__vccOpts||p)[e];return _&&Jn(_,n,r,o,l,s)()}))}}return i}function jf(t){const e=tn(ja),n=tn(Hu),r=Be(()=>{const c=je(t.to);return e.resolve(c)}),s=Be(()=>{const{matched:c}=r.value,{length:h}=c,d=c[h-1],p=n.matched;if(!d||!p.length)return-1;const m=p.findIndex(vs.bind(null,d));if(m>-1)return m;const _=qf(c[h-2]);return h>1&&qf(d)===_&&p[p.length-1].path!==_?p.findIndex(vs.bind(null,c[h-2])):m}),i=Be(()=>s.value>-1&&n1(n.params,r.value.params)),o=Be(()=>s.value>-1&&s.value===n.matched.length-1&&__(n.params,r.value.params));function l(c={}){if(t1(c)){const h=e[je(t.replace)?"replace":"push"](je(t.to)).catch(ui);return t.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>h),h}return Promise.resolve()}return{route:r,href:Be(()=>r.value.href),isActive:i,isExactActive:o,navigate:l}}function XR(t){return t.length===1?t[0]:t}const ZR=Ap({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:jf,setup(t,{slots:e}){const n=fa(jf(t)),{options:r}=tn(ja),s=Be(()=>({[Hf(t.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Hf(t.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const i=e.default&&XR(e.default(n));return t.custom?i:Yp("a",{"aria-current":n.isExactActive?t.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:s.value},i)}}}),e1=ZR;function t1(t){if(!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)&&!t.defaultPrevented&&!(t.button!==void 0&&t.button!==0)){if(t.currentTarget&&t.currentTarget.getAttribute){const e=t.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(e))return}return t.preventDefault&&t.preventDefault(),!0}}function n1(t,e){for(const n in e){const r=e[n],s=t[n];if(typeof r=="string"){if(r!==s)return!1}else if(!sn(s)||s.length!==r.length||r.some((i,o)=>i!==s[o]))return!1}return!0}function qf(t){return t?t.aliasOf?t.aliasOf.path:t.path:""}const Hf=(t,e,n)=>t??e??n,r1=Ap({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(t,{attrs:e,slots:n}){const r=tn(Ec),s=Be(()=>t.route||r.value),i=tn($f,0),o=Be(()=>{let h=je(i);const{matched:d}=s.value;let p;for(;(p=d[h])&&!p.components;)h++;return h}),l=Be(()=>s.value.matched[o.value]);vo($f,Be(()=>o.value+1)),vo(YR,l),vo(Ec,s);const c=ge();return is(()=>[c.value,l.value,t.name],([h,d,p],[m,_,S])=>{d&&(d.instances[p]=h,_&&_!==d&&h&&h===m&&(d.leaveGuards.size||(d.leaveGuards=_.leaveGuards),d.updateGuards.size||(d.updateGuards=_.updateGuards))),h&&d&&(!_||!vs(d,_)||!m)&&(d.enterCallbacks[p]||[]).forEach(k=>k(h))},{flush:"post"}),()=>{const h=s.value,d=t.name,p=l.value,m=p&&p.components[d];if(!m)return zf(n.default,{Component:m,route:h});const _=p.props[d],S=_?_===!0?h.params:typeof _=="function"?_(h):_:null,D=Yp(m,Ve({},S,e,{onVnodeUnmounted:F=>{F.component.isUnmounted&&(p.instances[d]=null)},ref:c}));return zf(n.default,{Component:D,route:h})||D}}});function zf(t,e){if(!t)return null;const n=t(e);return n.length===1?n[0]:n}const s1=r1;function i1(t){const e=HR(t.routes,t),n=t.parseQuery||QR,r=t.stringifyQuery||Bf,s=t.history,i=Gs(),o=Gs(),l=Gs(),c=Sy(Wn);let h=Wn;Jr&&t.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const d=Cl.bind(null,x=>""+x),p=Cl.bind(null,_R),m=Cl.bind(null,Si);function _(x,te){let Y,ne;return v_(x)?(Y=e.getRecordMatcher(x),ne=te):ne=x,e.addRoute(ne,Y)}function S(x){const te=e.getRecordMatcher(x);te&&e.removeRoute(te)}function k(){return e.getRoutes().map(x=>x.record)}function D(x){return!!e.getRecordMatcher(x)}function F(x,te){if(te=Ve({},te||c.value),typeof x=="string"){const T=kl(n,x,te.path),C=e.resolve({path:T.path},te),B=s.createHref(T.fullPath);return Ve(T,C,{params:m(C.params),hash:Si(T.hash),redirectedFrom:void 0,href:B})}let Y;if(x.path!=null)Y=Ve({},x,{path:kl(n,x.path,te.path).path});else{const T=Ve({},x.params);for(const C in T)T[C]==null&&delete T[C];Y=Ve({},x,{params:p(T)}),te.params=p(te.params)}const ne=e.resolve(Y,te),Ae=x.hash||"";ne.params=d(m(ne.params));const xe=ER(r,Ve({},x,{hash:pR(Ae),path:ne.path})),w=s.createHref(xe);return Ve({fullPath:xe,hash:Ae,query:r===Bf?JR(x.query):x.query||{}},ne,{redirectedFrom:void 0,href:w})}function L(x){return typeof x=="string"?kl(n,x,c.value.path):Ve({},x)}function $(x,te){if(h!==x)return Es(8,{from:te,to:x})}function H(x){return A(x)}function ce(x){return H(Ve(L(x),{replace:!0}))}function le(x){const te=x.matched[x.matched.length-1];if(te&&te.redirect){const{redirect:Y}=te;let ne=typeof Y=="function"?Y(x):Y;return typeof ne=="string"&&(ne=ne.includes("?")||ne.includes("#")?ne=L(ne):{path:ne},ne.params={}),Ve({query:x.query,hash:x.hash,params:ne.path!=null?{}:x.params},ne)}}function A(x,te){const Y=h=F(x),ne=c.value,Ae=x.state,xe=x.force,w=x.replace===!0,T=le(Y);if(T)return A(Ve(L(T),{state:typeof T=="object"?Ve({},Ae,T.state):Ae,force:xe,replace:w}),te||Y);const C=Y;C.redirectedFrom=te;let B;return!xe&&wR(r,ne,Y)&&(B=Es(16,{to:C,from:ne}),Gt(ne,ne,!0,!1)),(B?Promise.resolve(B):b(C,ne)).catch(O=>In(O)?In(O,2)?O:zt(O):ue(O,C,ne)).then(O=>{if(O){if(In(O,2))return A(Ve({replace:w},L(O.to),{state:typeof O.to=="object"?Ve({},Ae,O.to.state):Ae,force:xe}),te||C)}else O=R(C,ne,!0,w,Ae);return I(C,ne,O),O})}function y(x,te){const Y=$(x,te);return Y?Promise.reject(Y):Promise.resolve()}function v(x){const te=$n.values().next().value;return te&&typeof te.runWithContext=="function"?te.runWithContext(x):x()}function b(x,te){let Y;const[ne,Ae,xe]=o1(x,te);Y=Vl(ne.reverse(),"beforeRouteLeave",x,te);for(const T of ne)T.leaveGuards.forEach(C=>{Y.push(Jn(C,x,te))});const w=y.bind(null,x,te);return Y.push(w),Ot(Y).then(()=>{Y=[];for(const T of i.list())Y.push(Jn(T,x,te));return Y.push(w),Ot(Y)}).then(()=>{Y=Vl(Ae,"beforeRouteUpdate",x,te);for(const T of Ae)T.updateGuards.forEach(C=>{Y.push(Jn(C,x,te))});return Y.push(w),Ot(Y)}).then(()=>{Y=[];for(const T of xe)if(T.beforeEnter)if(sn(T.beforeEnter))for(const C of T.beforeEnter)Y.push(Jn(C,x,te));else Y.push(Jn(T.beforeEnter,x,te));return Y.push(w),Ot(Y)}).then(()=>(x.matched.forEach(T=>T.enterCallbacks={}),Y=Vl(xe,"beforeRouteEnter",x,te,v),Y.push(w),Ot(Y))).then(()=>{Y=[];for(const T of o.list())Y.push(Jn(T,x,te));return Y.push(w),Ot(Y)}).catch(T=>In(T,8)?T:Promise.reject(T))}function I(x,te,Y){l.list().forEach(ne=>v(()=>ne(x,te,Y)))}function R(x,te,Y,ne,Ae){const xe=$(x,te);if(xe)return xe;const w=te===Wn,T=Jr?history.state:{};Y&&(ne||w?s.replace(x.fullPath,Ve({scroll:w&&T&&T.scroll},Ae)):s.push(x.fullPath,Ae)),c.value=x,Gt(x,te,Y,w),zt()}let E;function U(){E||(E=s.listen((x,te,Y)=>{if(!on.listening)return;const ne=F(x),Ae=le(ne);if(Ae){A(Ve(Ae,{replace:!0,force:!0}),ne).catch(ui);return}h=ne;const xe=c.value;Jr&&CR(Vf(xe.fullPath,Y.delta),$a()),b(ne,xe).catch(w=>In(w,12)?w:In(w,2)?(A(Ve(L(w.to),{force:!0}),ne).then(T=>{In(T,20)&&!Y.delta&&Y.type===Pi.pop&&s.go(-1,!1)}).catch(ui),Promise.reject()):(Y.delta&&s.go(-Y.delta,!1),ue(w,ne,xe))).then(w=>{w=w||R(ne,xe,!1),w&&(Y.delta&&!In(w,8)?s.go(-Y.delta,!1):Y.type===Pi.pop&&In(w,20)&&s.go(-1,!1)),I(ne,xe,w)}).catch(ui)}))}let J=Gs(),fe=Gs(),Z;function ue(x,te,Y){zt(x);const ne=fe.list();return ne.length?ne.forEach(Ae=>Ae(x,te,Y)):console.error(x),Promise.reject(x)}function tt(){return Z&&c.value!==Wn?Promise.resolve():new Promise((x,te)=>{J.add([x,te])})}function zt(x){return Z||(Z=!x,U(),J.list().forEach(([te,Y])=>x?Y(x):te()),J.reset()),x}function Gt(x,te,Y,ne){const{scrollBehavior:Ae}=t;if(!Jr||!Ae)return Promise.resolve();const xe=!Y&&kR(Vf(x.fullPath,0))||(ne||!Y)&&history.state&&history.state.scroll||null;return Oc().then(()=>Ae(x,te,xe)).then(w=>w&&PR(w)).catch(w=>ue(w,x,te))}const He=x=>s.go(x);let ze;const $n=new Set,on={currentRoute:c,listening:!0,addRoute:_,removeRoute:S,clearRoutes:e.clearRoutes,hasRoute:D,getRoutes:k,resolve:F,options:t,push:H,replace:ce,go:He,back:()=>He(-1),forward:()=>He(1),beforeEach:i.add,beforeResolve:o.add,afterEach:l.add,onError:fe.add,isReady:tt,install(x){const te=this;x.component("RouterLink",e1),x.component("RouterView",s1),x.config.globalProperties.$router=te,Object.defineProperty(x.config.globalProperties,"$route",{enumerable:!0,get:()=>je(c)}),Jr&&!ze&&c.value===Wn&&(ze=!0,H(s.location).catch(Ae=>{}));const Y={};for(const Ae in Wn)Object.defineProperty(Y,Ae,{get:()=>c.value[Ae],enumerable:!0});x.provide(ja,te),x.provide(Hu,mp(Y)),x.provide(Ec,c);const ne=x.unmount;$n.add(x),x.unmount=function(){$n.delete(x),$n.size<1&&(h=Wn,E&&E(),E=null,c.value=Wn,ze=!1,Z=!1),ne()}}};function Ot(x){return x.reduce((te,Y)=>te.then(()=>v(Y)),Promise.resolve())}return on}function o1(t,e){const n=[],r=[],s=[],i=Math.max(e.matched.length,t.matched.length);for(let o=0;o<i;o++){const l=e.matched[o];l&&(t.matched.find(h=>vs(h,l))?r.push(l):n.push(l));const c=t.matched[o];c&&(e.matched.find(h=>vs(h,c))||s.push(c))}return[n,r,s]}function qa(){return tn(ja)}function vP(t){return tn(Hu)}const a1={class:"app-wrapper"},l1={key:0,class:"user-nav"},c1=["aria-expanded"],u1={key:0,class:"user-dropdown"},h1={class:"user-dropdown-content"},d1={class:"user-info-header"},f1={class:"user-name"},p1={class:"user-type-label"},m1={__name:"App",setup(t){const e=qa(),{isLoggedIn:n,userName:r,userType:s,logout:i,guestUser:o}=Ps(e),l=ge(!1),c=p=>{const m=document.querySelector(".user-nav");m&&!m.contains(p.target)&&(l.value=!1)},h=()=>{l.value=!l.value};ws(()=>{document.addEventListener("click",c)}),ki(()=>{document.removeEventListener("click",c)});const d=async()=>{try{await i(),l.value=!1,e.push("/")}catch(p){console.error("Logout error:",p)}};return(p,m)=>{var k;const _=Ul("router-link"),S=Ul("router-view");return ie(),ae("div",a1,[N("nav",null,[it(_,{to:"/"},{default:ei(()=>m[0]||(m[0]=[Xt("Home")])),_:1}),it(_,{to:"/vote"},{default:ei(()=>m[1]||(m[1]=[Xt("Vote")])),_:1}),it(_,{to:"/leaderboard"},{default:ei(()=>m[2]||(m[2]=[Xt("Leaderboard")])),_:1}),je(n)?(ie(),ae("div",l1,[N("button",{onClick:h,class:"user-icon-button","aria-expanded":l.value,"aria-haspopup":"true"},m[3]||(m[3]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-6 h-6"},[N("path",{"fill-rule":"evenodd",d:"M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z","clip-rule":"evenodd"})],-1)]),8,c1),l.value?(ie(),ae("div",u1,[N("div",h1,[N("div",d1,[N("div",f1,Oe(je(s)==="guest"?(k=je(o))==null?void 0:k.displayName:je(r)),1),N("div",p1,Oe(je(s)==="guest"?"Guest Account":"Google Account"),1)]),N("button",{onClick:d,class:"dropdown-logout"},m[4]||(m[4]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"currentColor",class:"w-5 h-5"},[N("path",{"fill-rule":"evenodd",d:"M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z","clip-rule":"evenodd"})],-1),Xt(" Logout ")]))])])):At("",!0)])):At("",!0)]),it(S)])}}},g1="modulepreload",_1=function(t){return"/eurovision-voting-app/"+t},Gf={},y1=function(e,n,r){if(!n||n.length===0)return e();const s=document.getElementsByTagName("link");return Promise.all(n.map(i=>{if(i=_1(i),i in Gf)return;Gf[i]=!0;const o=i.endsWith(".css"),l=o?'[rel="stylesheet"]':"";if(!!r)for(let d=s.length-1;d>=0;d--){const p=s[d];if(p.href===i&&(!o||p.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${l}`))return;const h=document.createElement("link");if(h.rel=o?"stylesheet":g1,o||(h.as="script",h.crossOrigin=""),h.href=i,document.head.appendChild(h),o)return new Promise((d,p)=>{h.addEventListener("load",d),h.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${i}`)))})})).then(()=>e()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})};const Ha=(t,e)=>{const n=t.__vccOpts||t;for(const[r,s]of e)n[r]=s;return n},v1=["disabled"],E1={class:"gsi-material-button-content-wrapper"},w1={class:"gsi-material-button-icon"},T1={version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48","xmlns:xlink":"http://www.w3.org/1999/xlink",style:{display:"block"}},I1={__name:"GoogleLogin",emits:["success","error"],setup(t,{emit:e}){const n=e,r=ge(!1),{signInWithGoogle:s}=Ps(),i=async()=>{if(!r.value){r.value=!0;try{const o=await s();n("success",o)}catch(o){console.error("Google login error:",o),n("error",o)}finally{r.value=!1}}};return(o,l)=>(ie(),ae("button",{class:"gsi-material-button",onClick:i,disabled:r.value},[l[2]||(l[2]=N("div",{class:"gsi-material-button-state"},null,-1)),N("div",E1,[N("div",w1,[(ie(),ae("svg",T1,l[0]||(l[0]=[To('<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" data-v-d1563e1e></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" data-v-d1563e1e></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" data-v-d1563e1e></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" data-v-d1563e1e></path><path fill="none" d="M0 0h48v48H0z" data-v-d1563e1e></path>',5)])))]),l[1]||(l[1]=N("span",{class:"gsi-material-button-contents"}," Continue with Google ",-1))])],8,v1))}},A1=Ha(I1,[["__scopeId","data-v-d1563e1e"]]),wc="eurovision_votes",I_=ge([]),Yr=ge(!0),Ir=ge(null),_o=ge(null),b1=ge({first:"",second:"",third:""}),{user:un,guestUser:ia}=Ps(),er=Be(()=>{var t,e;return((t=un.value)==null?void 0:t.type)==="google"?un.value.uid?un.value.uid:(console.error("No UID found for Google user:",un.value),null):(e=ia.value)!=null&&e.id?ia.value.id:null}),R1=Be(()=>{if(!er.value)return!1;const t=localStorage.getItem(wc);return t?!!JSON.parse(t)[er.value]:!1}),S1=Be(()=>!!er.value),Dl=async()=>{try{const t=await Nn(mn(Ge,"results"));I_.value=t.docs.map(e=>({id:e.id,name:e.id,totalPoints:e.data().totalPoints||0})),Ir.value=null}catch(t){console.error("Error loading countries:",t),Ir.value="Failed to load countries"}finally{Yr.value=!1}};function zu(){const t=async()=>{if(!er.value)return null;try{const o=hn(Ge,"votes",er.value),l=await dc(o);return l.exists()?l.data():null}catch(o){return console.error("Error checking existing vote:",o),null}},e=async o=>{var c,h;let l;if(((c=un.value)==null?void 0:c.type)==="google"?un.value.uid&&(l=un.value.uid):ia.value?l=`name_${ia.value.displayName}`:(h=un.value)!=null&&h.uid&&(l=un.value.uid),!l)throw console.error("No valid user ID found"),new Error("Please sign in or enter your name to vote");try{Yr.value=!0,await pc(Ge,async d=>{var D;const p=hn(Ge,"votes",l),m=await d.get(p),_=new Map;if(m.exists()){const F=m.data().votes;for(const L of F){const $=hn(Ge,"results",L.countryId),H=await d.get($);_.set(L.countryId,{ref:$,doc:H})}}for(const F of o)if(F&&!_.has(F.id)){const L=hn(Ge,"results",F.id),$=await d.get(L);_.set(F.id,{ref:L,doc:$})}const S=new Map;if(m.exists()){const F=m.data().votes;for(const L of F)S.set(L.countryId,-L.points)}o.forEach((F,L)=>{const $=[12,10,8][L],H=S.get(F.id)||0;S.set(F.id,H+$)});for(const[F,L]of S.entries()){const{ref:$,doc:H}=_.get(F),ce=H.exists()&&H.data().totalPoints||0,le=Math.max(0,ce+L);d.update($,{totalPoints:le})}const k={userId:l,userType:((D=un.value)==null?void 0:D.type)==="google"?"google":"guest",votes:o.map((F,L)=>({countryId:F.id,points:[12,10,8][L]})),timestamp:Vu()};d.set(p,k),_o.value=k}),Ir.value=null}catch(d){throw console.error("Error submitting votes:",d),Ir.value="Failed to submit votes",d}finally{Yr.value=!1}},n=async o=>{try{const l=hc(mn(Ge,"votes"),WI("userId","==",o),KI("timestamp","desc"),QI(1)),c=await Nn(l);if(!c.empty){const h=c.docs[0];return{id:h.id,...h.data()}}return null}catch(l){throw console.error("Error getting vote history:",l),new Error("Failed to get vote history")}},r=()=>{_o.value=null},s=async()=>{try{return Yr.value=!0,Ir.value=null,await pc(Ge,async o=>{(await Nn(mn(Ge,"results"))).docs.forEach(h=>{o.update(h.ref,{totalPoints:0})}),(await Nn(mn(Ge,"votes"))).docs.forEach(h=>{o.delete(h.ref)})}),console.log("All points have been reset successfully"),!0}catch(o){throw console.error("Error resetting results:",o),Ir.value=o.message,o}finally{Yr.value=!1}},i=async()=>{if(er.value)try{const o=hn(Ge,"votes",er.value);await XI(o);const l=localStorage.getItem(wc);if(l){const c=JSON.parse(l);delete c[er.value],localStorage.setItem(wc,JSON.stringify(c))}_o.value=null,await Dl()}catch(o){throw console.error("Error clearing votes:",o),o}};return ws(()=>{Dl(),t()}),{countries:I_,selectedVotes:b1,submitVotes:e,loadCountries:Dl,isLoading:Yr,error:Ir,resetAllResults:s,currentVote:_o,checkExistingVote:t,clearCurrentVote:r,getUserVoteHistory:n,hasVoted:R1,canUpdateVote:S1,clearVotes:i}}const P1={class:"page-container"},C1={class:"content-container"},k1={key:0,class:"loading-state"},V1={key:1,class:"welcome-section"},D1={class:"user-header"},N1={class:"page-title"},O1={key:0,class:"admin-status",title:"As a party admin, you have extra controls for managing users and votes"},x1={class:"user-type"},M1={class:"user-type-label"},L1={class:"action-buttons"},F1={key:0,class:"admin-controls"},U1=["disabled"],B1={key:0},$1={key:1},j1=["disabled"],q1={key:0},H1={key:1},z1={key:2,class:"login-section"},G1={class:"input-group"},W1={key:0,class:"error-message"},K1=["disabled"],Q1={class:"google-button-container"},J1={key:0,class:"modal-backdrop"},Y1={class:"modal-content"},X1={class:"flex justify-end space-x-4"},Z1=["disabled"],eS={key:1,class:"modal-backdrop"},tS={class:"modal-content"},nS={class:"flex justify-end space-x-4"},rS=["disabled"],sS={__name:"Home",setup(t){const e=qa(),{isLoggedIn:n,userType:r,login:s,logout:i,signInWithName:o,isLoading:l,user:c,guestUser:h}=Ps(e),{resetAllResults:d}=zu(),p=ge(""),m=ge(!1),_=ge(""),S=Be(()=>{const E=p.value.trim();return E.length>=2&&E.length<=50}),k=Be(()=>{var U;const E=localStorage.getItem("user");return E?JSON.parse(E).displayName:((U=h.value)==null?void 0:U.displayName)||""}),D=()=>{_.value="",m.value=!1},F=async()=>{m.value=!1,_.value="";const E=p.value.trim();if(!S.value){m.value=!0;return}try{await o(E),p.value="",e.push("/")}catch(U){console.error("Quick login error:",U),U.code,_.value="This name is already taken. Please choose a different name."}},L=async E=>{try{await s(E),e.push("/vote")}catch(U){console.error("Login error:",U)}},$=E=>{console.error("Login failed:",E)},H=async()=>{try{await i(),e.push("/")}catch(E){console.error("Logout error:",E)}},ce=ge(!1),le=ge(!1),A=ge(!1),y=ge(!1),v=Be(()=>{var E;return((E=c.value)==null?void 0:E.email)==="dprybysh@gmail.com"}),b=async()=>{y.value=!0},I=async()=>{try{A.value=!0,await d(),y.value=!1,e.push("/leaderboard")}catch(E){console.error("Error resetting votes:",E)}finally{A.value=!1}},R=async()=>{try{le.value=!0,await pc(Ge,async E=>{const U=await Nn(mn(Ge,"users")),J=await Nn(mn(Ge,"guestUsers")),fe=await Nn(mn(Ge,"votes"));U.docs.forEach(Z=>{E.delete(Z.ref)}),J.docs.forEach(Z=>{E.delete(Z.ref)}),fe.docs.forEach(Z=>{E.delete(Z.ref)})}),ce.value=!1,e.go(0)}catch(E){console.error("Error deleting users:",E)}finally{le.value=!1}};return(E,U)=>(ie(),ae(It,null,[N("div",P1,[N("div",C1,[U[15]||(U[15]=N("div",{class:"title-container"},[N("h1",{class:"eurovision-title"},"EUROVISION VOTING 2025")],-1)),je(l)?(ie(),ae("div",k1,U[6]||(U[6]=[N("div",{class:"spinner"},null,-1),N("p",null,"Loading...",-1)]))):je(n)?(ie(),ae("div",V1,[N("div",D1,[N("h2",N1," Welcome, "+Oe(k.value)+"! ",1),v.value?(ie(),ae("div",O1,U[7]||(U[7]=[To('<svg class="admin-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" data-v-937c7242><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" data-v-937c7242></path><path d="M15.5 15.5l1.5.5-1.5 4-1.5-.5zM9 16l1.5-.5 1.5 4-1.5.5z" data-v-937c7242></path><circle cx="12" cy="8" r="2" data-v-937c7242></circle><path d="M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm7 5H5v-1c0-.6 2.67-2 7-2s7 1.4 7 2v1z" data-v-937c7242></path></svg><span data-v-937c7242>You are the party admin</span>',2)]))):At("",!0)]),N("div",x1,[N("p",M1," Logged in as "+Oe(je(r)==="guest"?"Guest":"Google User"),1)]),U[11]||(U[11]=N("p",{class:"welcome-text"},"Ready to cast your votes for Eurovision?",-1)),N("div",L1,[N("button",{onClick:U[0]||(U[0]=J=>je(e).push("/vote")),class:"primary-button"},"Cast Your Vote"),N("button",{onClick:U[1]||(U[1]=J=>je(e).push("/leaderboard")),class:"secondary-button"},"View Leaderboard")]),v.value?(ie(),ae("div",F1,[N("button",{onClick:U[2]||(U[2]=J=>ce.value=!0),class:"admin-danger-button flex items-center justify-center gap-2 rounded-full",disabled:le.value},[U[8]||(U[8]=N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[N("path",{"fill-rule":"evenodd",d:"M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z","clip-rule":"evenodd"})],-1)),le.value?(ie(),ae("span",B1,"Deleting Users...")):(ie(),ae("span",$1,"Delete All Users"))],8,U1),N("button",{onClick:b,class:"admin-danger-button flex items-center justify-center gap-2 rounded-full",disabled:A.value},[U[9]||(U[9]=N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},[N("path",{"fill-rule":"evenodd",d:"M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"})],-1)),A.value?(ie(),ae("span",q1,"Resetting...")):(ie(),ae("span",H1,"Reset All Votes"))],8,j1)])):At("",!0),N("button",{onClick:H,class:"logout-button"},U[10]||(U[10]=[N("svg",{"data-v-2dc54a20":"",class:"logout-icon",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[N("path",{"data-v-2dc54a20":"","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"})],-1),Xt(" Logout ")]))])):(ie(),ae("div",z1,[U[13]||(U[13]=N("p",{class:"login-text"},"Please enter at least 2 characters to continue.",-1)),N("form",{onSubmit:Bc(F,["prevent"]),class:"quick-login-form"},[N("div",G1,[Ly(N("input",{id:"name-input","onUpdate:modelValue":U[3]||(U[3]=J=>p.value=J),type:"text",name:"name",placeholder:"Enter your name",class:Dn(["name-input",{"input-error":m.value||_.value}]),required:"",minlength:"2",maxlength:"50",autocomplete:"name",onInput:D},null,34),[[aE,p.value]]),_.value?(ie(),ae("p",W1,Oe(_.value),1)):At("",!0)]),N("button",{type:"submit",class:"guest-button",disabled:!S.value}," Continue as Guest ",8,K1),U[12]||(U[12]=N("p",{class:"quick-login-note"}," Quick login with name allows you to start voting instantly. Note: Once you log out, you won't be able to edit your votes. For permanent access, use Google login instead. ",-1))],32),U[14]||(U[14]=N("div",{class:"divider"},[N("span",null,"or")],-1)),N("div",Q1,[it(A1,{onSuccess:L,onError:$})])]))])]),ce.value?(ie(),ae("div",J1,[N("div",Y1,[U[16]||(U[16]=To('<h3 class="text-xl font-bold mb-4" data-v-937c7242>Delete All Users</h3><div class="text-gray-600 mb-6" data-v-937c7242><p class="mb-2" data-v-937c7242>Are you sure you want to delete all users?</p><p class="mb-2" data-v-937c7242>This will:</p><ul class="list-disc ml-6 mt-2" data-v-937c7242><li data-v-937c7242>Remove all user accounts</li><li data-v-937c7242>Delete all associated votes</li><li data-v-937c7242>This action cannot be undone</li></ul></div>',2)),N("div",X1,[N("button",{onClick:U[4]||(U[4]=J=>ce.value=!1),class:"secondary-button"}," Cancel "),N("button",{onClick:R,class:"admin-danger-button",disabled:le.value},Oe(le.value?"Deleting...":"Delete All Users"),9,Z1)])])])):At("",!0),y.value?(ie(),ae("div",eS,[N("div",tS,[U[17]||(U[17]=To('<h3 class="text-xl font-bold mb-4" data-v-937c7242>Reset All Votes</h3><div class="text-gray-600 mb-6" data-v-937c7242><p class="mb-2" data-v-937c7242>Are you sure you want to reset all votes?</p><p class="mb-2" data-v-937c7242>This will:</p><ul class="list-disc ml-6 mt-2" data-v-937c7242><li data-v-937c7242>Remove all existing votes</li><li data-v-937c7242>Reset the leaderboard</li><li data-v-937c7242>Allow users to vote again</li><li data-v-937c7242>This action cannot be undone</li></ul></div>',2)),N("div",nS,[N("button",{onClick:U[5]||(U[5]=J=>y.value=!1),class:"secondary-button"}," Cancel "),N("button",{onClick:I,class:"admin-danger-button",disabled:A.value},Oe(A.value?"Resetting...":"Yes, Reset Votes"),9,rS)])])])):At("",!0)],64))}},iS=Ha(sS,[["__scopeId","data-v-937c7242"]]),oS={Albania:"AL",Armenia:"AM",Australia:"AU",Austria:"AT",Azerbaijan:"AZ",Belgium:"BE",Croatia:"HR",Cyprus:"CY",Czechia:"CZ",Denmark:"DK",Estonia:"EE",Finland:"FI",France:"FR",Georgia:"GE",Germany:"DE",Greece:"GR",Iceland:"IS",Ireland:"IE",Israel:"IL",Italy:"IT",Latvia:"LV",Lithuania:"LT",Luxembourg:"LU",Malta:"MT",Moldova:"MD",Netherlands:"NL",Norway:"NO",Poland:"PL",Portugal:"PT",Romania:"RO","San Marino":"SM",Serbia:"RS",Slovenia:"SI",Spain:"ES",Sweden:"SE",Switzerland:"CH",Ukraine:"UA","United Kingdom":"GB"},oa=t=>{const e=oS[t];return e?e.toUpperCase().replace(/./g,n=>String.fromCodePoint(n.charCodeAt(0)+127397)):""};const aS={class:"page-container"},lS={class:"content-container"},cS={key:0,class:"loading-state"},uS={key:1,class:"error-message"},hS={key:2,class:"results-wrapper"},dS={class:"vote-grid"},fS={class:"points-box"},pS={class:"custom-select"},mS=["onClick"],gS={key:0},_S={class:"country-flag"},yS={key:1},vS={key:0,class:"dropdown-menu"},ES={class:"dropdown-content"},wS=["onClick"],TS={class:"country-flag"},IS={class:"button-container"},AS=["disabled"],bS={key:0,class:"spinner"},RS={key:1},SS={key:2},PS={key:3},CS={key:4},kS={key:5},VS={key:4,class:"loading-overlay"},DS={class:"loading-container"},NS={class:"loading-text"},OS={__name:"Vote",setup(t){const e=qa(),{user:n}=Ps(),{countries:r,error:s,isLoading:i,hasVoted:o,submitVotes:l,checkExistingVote:c,canUpdateVote:h,clearVotes:d,loadCountries:p}=zu(),m=ge([null,null,null]),_=ge(!1),S=ge(!1),k=ge(null),D=ge(!1),F=ge(!1),L=ge(null),$=ge(null);ge(!1);const H=Be(()=>m.value.every(U=>U!==null)&&new Set(m.value).size===3),ce=U=>r.value.filter(J=>!m.value.includes(J)||m.value[U]===J),le=async()=>{try{const U=await c();if(U){const J=U.votes.sort((fe,Z)=>Z.points-fe.points).map(fe=>r.value.find(Z=>Z.id===fe.countryId));m.value=[...J],$.value=[...J],_.value=!0}}catch(U){console.error("Error loading existing votes:",U),s.value="Failed to load your previous votes"}},A=Be(()=>$.value?m.value.some((U,J)=>{var ue,tt;const fe=(ue=$.value[J])==null?void 0:ue.id,Z=(tt=m.value[J])==null?void 0:tt.id;return fe!==Z}):!1),y=async()=>{if(H.value&&!(_.value&&!A.value))try{D.value=!0,await l(m.value),_.value=!0,S.value=!1,$.value=m.value.map(U=>({...U})),await new Promise(U=>setTimeout(U,500)),e.push("/leaderboard")}catch(U){console.error("Error submitting vote:",U)}finally{D.value=!1}},v=async U=>{if(_.value&&!S.value){F.value=!0,L.value={index:U,type:"select"};return}if(k.value=k.value===U?null:U,k.value!==null)document.body.classList.add("dropdown-open"),Oc(()=>{const J=document.querySelector(".dropdown-menu");J&&J.classList.add("active")});else{document.body.classList.remove("dropdown-open");const J=document.querySelector(".dropdown-menu");J&&J.classList.remove("active")}},b=U=>{U.target.closest(".custom-select")||(k.value=null)};is(()=>{var U;return(U=n.value)==null?void 0:U.type},async U=>{if(U==="google"){const J=await c();if(J){const fe=J.votes.sort((Z,ue)=>ue.points-Z.points).map(Z=>r.value.find(ue=>ue.id===Z.countryId));m.value=fe,_.value=!0}}},{immediate:!0}),ws(()=>{le(),document.addEventListener("click",b)}),ki(()=>{document.removeEventListener("click",b),document.body.classList.remove("dropdown-open")});const I=async(U,J)=>{if(_.value&&!S.value){F.value=!0,L.value={index:U,country:J,type:"country"};return}m.value[U]=J,k.value=null,document.body.classList.remove("dropdown-open")},R=()=>{if(!L.value)return;const{index:U,country:J,type:fe}=L.value;fe==="country"?(m.value[U]=J,k.value=null,document.body.classList.remove("dropdown-open")):fe==="select"&&(k.value=U,document.body.classList.add("dropdown-open")),S.value=!0,F.value=!1,L.value=null},E=()=>{S.value||(m.value=$.value.map(U=>({...U}))),F.value=!1,L.value=null,S.value=!1,k.value=null,document.body.classList.remove("dropdown-open")};return(U,J)=>(ie(),ae("div",aS,[N("div",lS,[J[10]||(J[10]=N("h1",{class:"eurovision-title"},"EUROVISION VOTING 2025",-1)),je(i)?(ie(),ae("div",cS,J[3]||(J[3]=[N("div",{class:"spinner"},null,-1),N("p",null,"Loading countries...",-1)]))):je(s)?(ie(),ae("div",uS,[N("p",null,Oe(je(s)),1),N("button",{onClick:J[0]||(J[0]=(...fe)=>je(p)&&je(p)(...fe)),class:"primary-button"},"Try Again")])):(ie(),ae("div",hS,[J[5]||(J[5]=N("h2",{class:"section-title"},"Your Votes",-1)),J[6]||(J[6]=N("p",{class:"vote-instructions"}," Assign points to your favorite countries by selecting them from the dropdown menus below. ",-1)),N("div",dS,[(ie(),ae(It,null,Xr([12,10,8],(fe,Z)=>N("div",{key:fe,class:"vote-row"},[N("div",fS,Oe(fe),1),N("div",pS,[N("button",{onClick:ue=>v(Z),class:Dn(["select-button",{active:k.value===Z}])},[m.value[Z]?(ie(),ae("span",gS,[N("span",_S,Oe(je(oa)(m.value[Z].name)),1),Xt(" "+Oe(m.value[Z].name),1)])):(ie(),ae("span",yS,"Select a country")),(ie(),ae("svg",{class:Dn(["dropdown-arrow",{rotated:k.value===Z}])},J[4]||(J[4]=[N("path",{d:"M6 9l6 6 6-6"},null,-1)]),2))],10,mS),k.value===Z?(ie(),ae("div",vS,[N("div",{class:"dropdown-backdrop",onClick:J[1]||(J[1]=ue=>k.value=null)}),N("div",ES,[(ie(!0),ae(It,null,Xr(ce(Z),ue=>{var tt;return ie(),ae("button",{key:ue.id,onClick:zt=>I(Z,ue),class:Dn(["country-option",{selected:((tt=m.value[Z])==null?void 0:tt.id)===ue.id}])},[N("span",TS,Oe(je(oa)(ue.name)),1),Xt(" "+Oe(ue.name),1)],10,wS)}),128))])])):At("",!0)])])),64))]),N("div",IS,[N("button",{onClick:y,disabled:!H.value||D.value||_.value&&!S.value||_.value&&S.value&&!A.value,class:"submit-vote-button"},[D.value?(ie(),ae("span",bS)):At("",!0),_.value&&!S.value?(ie(),ae("span",RS,"Vote Submitted")):_.value&&S.value&&!A.value?(ie(),ae("span",SS,"No Changes Made")):_.value&&S.value?(ie(),ae("span",PS,"Update Vote")):H.value?(ie(),ae("span",kS,"Submit Vote")):(ie(),ae("span",CS,"Select All Countries"))],8,AS)])])),F.value?(ie(),ae("div",{key:3,class:"confirmation-modal",onClick:E},[N("div",{class:"confirmation-content",onClick:J[2]||(J[2]=Bc(()=>{},["stop"]))},[J[7]||(J[7]=N("h3",{class:"confirmation-title"},"Update Your Vote?",-1)),J[8]||(J[8]=N("p",{class:"confirmation-message"}," You have already submitted your vote. Are you sure you want to update it? ",-1)),N("div",{class:"confirmation-buttons"},[N("button",{onClick:R,class:"confirm-button"}," Yes, update my vote "),N("button",{onClick:E,class:"cancel-button"}," Cancel ")])])])):At("",!0),D.value?(ie(),ae("div",VS,[N("div",DS,[J[9]||(J[9]=N("div",{class:"loading-spinner"},null,-1)),N("p",NS,Oe(S.value?"Updating":"Submitting")+" your vote...",1)])])):At("",!0)])]))}},xS=Ha(OS,[["__scopeId","data-v-8e96c097"]]);const MS={class:"page-container"},LS={class:"content-container"},FS={class:"results-header"},US={class:"total-votes"},BS={class:"leaderboard-actions"},$S={key:0,class:"loading-state"},jS={key:1,class:"text-center py-8"},qS={class:"text-red-500"},HS={key:2,class:"results-wrapper"},zS={class:"leaderboard-grid"},GS={class:"rank-box"},WS={class:"flag"},KS={class:"country-name"},QS={class:"points"},JS={key:0,class:"text-center py-8"},YS={key:0,class:"voters-list"},XS=["onClick"],ZS={class:"voter-button-content"},eP={class:"voter-name text-lg"},tP={key:0,class:"voter-details bg-gray-50 border-t border-gray-200"},nP={class:"country-info"},rP={class:"country-flag text-xl",role:"img"},sP={class:"country-name font-medium"},iP={class:"points-badge bg-blue-50 text-blue-600"},oP={class:"flex justify-between items-center mb-6 pb-3 border-b"},aP={class:"text-xl font-semibold text-gray-800"},lP={class:"space-y-4"},cP={class:"font-medium"},uP={class:"text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full"},hP={class:"mt-4 text-sm text-gray-500"},dP=Object.assign({name:"Leaderboard"},{__name:"Leaderboard",setup(t){const e=ge(null),n=ge([]),r=ge(!0),s=ge(null),i=ge(null),o=ge(null);ge(""),ge(!1);const l=ge(null),{user:c}=Ps(),{resetAllResults:h,checkExistingVote:d}=zu();qa(),ge(!1),ge(!1),ge(!1),ge(!1);const p=ge([]);Be(()=>{var y;return((y=c.value)==null?void 0:y.type)==="google"}),Be(()=>{var y;return((y=c.value)==null?void 0:y.email)==="dprybysh@gmail.com"});const m=ge(null),_=ge(null),S=ge(!1),k=ge(!1),D=Be(()=>[...n.value].sort((y,v)=>v.totalPoints!==y.totalPoints?v.totalPoints-y.totalPoints:y.name.localeCompare(v.name))),F=ge(0),L=async()=>{try{r.value=!0,s.value=null;const y=hc(mn(Ge,"votes")),v=ZI(y,async b=>{const I=new Map;b.docs.forEach(U=>{U.data().votes.forEach(fe=>{const Z=I.get(fe.countryId)||0;I.set(fe.countryId,Z+fe.points)})});const R=hc(mn(Ge,"results")),E=await Nn(R);n.value=E.docs.map(U=>({name:U.id,totalPoints:I.get(U.id)||0})),r.value=!1},b=>{console.error("Error in vote updates:",b),s.value="Failed to get vote updates",r.value=!1})}catch(y){console.error("Error loading results:",y),s.value="Failed to load leaderboard"}finally{r.value=!1}},$=y=>{if(!y)return"";let v;if(y instanceof Xe)v=y.toDate();else if(typeof y=="number")v=new Date(y);else if(y.seconds)v=new Date(y.seconds*1e3);else return"Invalid date";return new Intl.DateTimeFormat("en-US",{dateStyle:"medium",timeStyle:"short"}).format(v)},H=()=>{l.value=null},ce=async()=>{try{const y=[],v=new Map,b=await Nn(mn(Ge,"votes"));for(const I of b.docs){const R=I.data(),E=R.userId;if(E)try{let U="",J=!1;if(E.startsWith("name_"))U=E.replace("name_",""),J=!0;else if(R.userType==="google"){const fe=hn(Ge,"users",E),Z=await dc(fe);Z.exists()?(U=Z.data().displayName,J=!1):console.error("Google user document not found:",E)}else{const fe=hn(Ge,"guestUsers",E),Z=await dc(fe);Z.exists()&&(U=Z.data().displayName,J=!0)}if(U){const fe={id:I.id,displayName:U,isGuest:J,timestamp:R.timestamp,votes:R.votes,userId:E},Z=v.get(E);(!Z||Z.timestamp&&fe.timestamp&&fe.timestamp.seconds>Z.timestamp.seconds)&&v.set(E,fe)}}catch(U){console.error(`Error fetching user ${E}:`,U)}}y.push(...v.values()),p.value=y.sort((I,R)=>!I.timestamp||!R.timestamp?0:R.timestamp.seconds-I.timestamp.seconds),F.value=v.size}catch(y){console.error("Error loading voters:",y),s.value="Failed to load voters list"}},le=y=>{m.value=m.value===y.id?null:y.id},A=()=>{var y;(y=_.value)==null||y.scrollIntoView({behavior:"smooth",block:"start"})};return ws(async()=>{L(),ce();const y=new IntersectionObserver(v=>{v.forEach(b=>{b.isIntersecting&&(S.value=!0)})},{threshold:.1});_.value&&y.observe(_.value);try{const v=await d();k.value=!!v}catch(v){console.error("Error checking existing vote:",v)}}),ki(()=>{typeof i.value=="function"&&i.value(),typeof o.value=="function"&&o.value(),e.value&&clearTimeout(e.value)}),(y,v)=>{const b=Ul("router-link");return ie(),ae("div",MS,[N("div",LS,[v[8]||(v[8]=N("h1",{class:"eurovision-title"},"EUROVISION VOTING 2025",-1)),N("div",FS,[N("div",US,[Xt(" Total Votes Cast: "+Oe(F.value)+" ",1),N("div",BS,[N("button",{onClick:A,class:"view-voters-link"},v[1]||(v[1]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[N("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"})],-1),Xt(" View Voters ")])),k.value?(ie(),Wp(b,{key:0,to:"/vote",class:"update-votes-button"},{default:ei(()=>v[2]||(v[2]=[N("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor"},[N("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"})],-1),Xt(" Update My Votes ")])),_:1})):At("",!0)])])]),r.value?(ie(),ae("div",$S,v[3]||(v[3]=[N("div",{class:"spinner"},null,-1),N("p",{class:"loading-text"},"Loading leaderboard...",-1)]))):s.value?(ie(),ae("div",jS,[N("p",qS,Oe(s.value),1),N("button",{onClick:L,class:"primary-button"}," Retry ")])):(ie(),ae("div",HS,[N("div",zS,[(ie(!0),ae(It,null,Xr(D.value,(I,R)=>(ie(),ae("div",{key:I.name,class:"country-row"},[N("div",GS,Oe(R+1),1),N("div",WS,Oe(je(oa)(I.name)),1),N("div",KS,Oe(I.name),1),N("div",QS,Oe(I.totalPoints),1)]))),128))]),D.value.length===0?(ie(),ae("div",JS,v[4]||(v[4]=[N("p",{class:"text-gray-600"},"No results available yet",-1)]))):At("",!0),N("div",{ref_key:"votersSection",ref:_,class:Dn(["voters-section",{"animate-in":S.value}])},[v[6]||(v[6]=N("h2",{class:"section-title"},"Voters",-1)),p.value.length>0?(ie(),ae("div",YS,[(ie(!0),ae(It,null,Xr(p.value,I=>(ie(),ae("div",{key:I.id,class:"voter-card hover:bg-gray-50"},[N("button",{onClick:R=>le(I),class:"voter-button py-4"},[N("div",ZS,[N("span",eP,Oe(I.displayName),1),(ie(),ae("svg",{class:Dn(["text-gray-400 transition-transform duration-200",{"transform rotate-90":m.value===I.id}]),xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor"},v[5]||(v[5]=[N("path",{"fill-rule":"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z","clip-rule":"evenodd"},null,-1)]),2))])],8,XS),m.value===I.id?(ie(),ae("div",tP,[(ie(!0),ae(It,null,Xr(I.votes,R=>(ie(),ae("div",{key:R.countryId,class:"vote-item hover:bg-white"},[N("div",nP,[N("span",rP,Oe(je(oa)(R.countryId)),1),N("span",sP,Oe(R.countryId),1)]),N("span",iP,Oe(R.points),1)]))),128))])):At("",!0)]))),128))])):At("",!0)],2)])),l.value?(ie(),ae("div",{key:3,class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4",onClick:H},[N("div",{class:"bg-white rounded-lg shadow-xl p-6 max-w-md w-full",onClick:v[0]||(v[0]=Bc(()=>{},["stop"]))},[N("div",oP,[N("h3",aP,Oe(l.value.userDisplayName)+"'s Votes ",1),N("button",{onClick:H,class:"primary-button",title:"Close details"},v[7]||(v[7]=[N("svg",{fill:"none",stroke:"currentColor",viewBox:"0 0 24 24"},[N("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M6 18L18 6M6 6l12 12"})],-1),N("span",null,"Close",-1)]))]),N("div",lP,[(ie(!0),ae(It,null,Xr(l.value.votes,I=>(ie(),ae("div",{key:I.countryId,class:"flex justify-between items-center p-3 bg-gray-50 rounded-lg"},[N("span",cP,Oe(I.countryName),1),N("span",uP,Oe(I.points)+" points ",1)]))),128))]),N("div",hP," Voted: "+Oe($(l.value.timestamp)),1)])])):At("",!0)])])}}}),fP=Ha(dP,[["__scopeId","data-v-777c09a9"]]),pP=[{path:"/",name:"Home",component:iS},{path:"/vote",name:"Vote",component:xS,meta:{requiresAuth:!0}},{path:"/leaderboard",name:"Leaderboard",component:fP,meta:{requiresAuth:!0}},{path:"/login",name:"Login",component:()=>y1(()=>import("./Login-8a792545.js"),["assets/Login-8a792545.js","assets/Login-e3b0c442.css"])}],A_=i1({history:OR(),routes:pP});A_.beforeEach(async(t,e,n)=>{const r=()=>new Promise(s=>{const i=Ft.onAuthStateChanged(o=>{i(),s(o)})});if(t.matched.some(s=>s.meta.requiresAuth)){const s=await r(),i=localStorage.getItem("guestUser");!s&&!i?(localStorage.setItem("intendedRoute",t.fullPath),n({path:"/login",query:{redirect:t.fullPath}})):n()}else n()});const b_=dE(m1);b_.use(A_);b_.mount("#app");export{A1 as G,Ha as _,ae as a,N as b,Be as c,Ly as d,it as e,qa as f,vP as g,ie as h,Dn as n,ws as o,ge as r,Ps as u,aE as v,Bc as w};
