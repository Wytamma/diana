import{s as ae,y as J,A as _e,e as z,a as H,c as L,b as N,g as G,f as p,a8 as ue,m as g,v as Z,i as C,h as D,Q as R,B as ve,C as pe,D as be,E as Ge,a9 as de,w as Ue,z as me,aa as B,O as Le,t as Q,l as x,d as X,n as Y,ab as Qe,G as qe,j as he,ac as Oe,J as Xe,k as oe,K as Se}from"../chunks/BhI1zJCn.js";import{S as re,i as ie,t as A,g as O,a as j,c as K,f as Ke,b as $,d as ee,m as te,e as se}from"../chunks/Cx8QCVXx.js";import{e as De}from"../chunks/CzSYVJTr.js";import{g as Ye}from"../chunks/DTPFbZC-.js";import"../chunks/CTwa16_9.js";import{g as Ze}from"../chunks/CN4WR7uZ.js";import{P as xe}from"../chunks/LTQc53xn.js";import{a as fe}from"../chunks/CYJFvo7s.js";import{i as ne}from"../chunks/C1t0Bbsy.js";import{i as ce,t as ze}from"../chunks/CAdaqKIe.js";import{r as le}from"../chunks/CGe6Vnpq.js";const $e=t=>({}),Fe=t=>({}),et=t=>({}),Ve=t=>({}),tt=t=>({}),Ne=t=>({});function We(t){let e,s,a;const n=t[18].lead,l=_e(n,t,t[17],Ne);return{c(){e=z("div"),l&&l.c(),this.h()},l(r){e=L(r,"DIV",{class:!0});var i=N(e);l&&l.l(i),i.forEach(p),this.h()},h(){g(e,"class",s="dropzone-lead "+t[5])},m(r,i){C(r,e,i),l&&l.m(e,null),a=!0},p(r,i){l&&l.p&&(!a||i[0]&131072)&&ve(l,n,r,r[17],a?be(n,r[17],i,tt):pe(r[17]),Ne),(!a||i[0]&32&&s!==(s="dropzone-lead "+r[5]))&&g(e,"class",s)},i(r){a||(A(l,r),a=!0)},o(r){j(l,r),a=!1},d(r){r&&p(e),l&&l.d(r)}}}function st(t){let e,s="Upload a file",a;return{c(){e=z("strong"),e.textContent=s,a=Q(" or drag and drop")},l(n){e=L(n,"STRONG",{"data-svelte-h":!0}),x(e)!=="svelte-13uz6lq"&&(e.textContent=s),a=X(n," or drag and drop")},m(n,l){C(n,e,l),C(n,a,l)},p:Y,d(n){n&&(p(e),p(a))}}}function Ae(t){let e,s,a;const n=t[18].meta,l=_e(n,t,t[17],Fe);return{c(){e=z("small"),l&&l.c(),this.h()},l(r){e=L(r,"SMALL",{class:!0});var i=N(e);l&&l.l(i),i.forEach(p),this.h()},h(){g(e,"class",s="dropzone-meta "+t[7])},m(r,i){C(r,e,i),l&&l.m(e,null),a=!0},p(r,i){l&&l.p&&(!a||i[0]&131072)&&ve(l,n,r,r[17],a?be(n,r[17],i,$e):pe(r[17]),Fe),(!a||i[0]&128&&s!==(s="dropzone-meta "+r[7]))&&g(e,"class",s)},i(r){a||(A(l,r),a=!0)},o(r){j(l,r),a=!1},d(r){r&&p(e),l&&l.d(r)}}}function nt(t){let e,s,a,n,l,r,i,u,h,w,I,k,v,b,T,E,V=[{type:"file"},{name:t[2]},{class:a="dropzone-input "+t[9]},t[11]()],o={};for(let m=0;m<V.length;m+=1)o=J(o,V[m]);let d=t[13].lead&&We(t);const _=t[18].message,S=_e(_,t,t[17],Ve),W=S||st();let f=t[13].meta&&Ae(t);return{c(){e=z("div"),s=z("input"),n=H(),l=z("div"),r=z("div"),d&&d.c(),i=H(),u=z("div"),W.c(),w=H(),f&&f.c(),this.h()},l(m){e=L(m,"DIV",{class:!0,"data-testid":!0});var y=N(e);s=L(y,"INPUT",{type:!0,name:!0,class:!0}),n=G(y),l=L(y,"DIV",{class:!0});var F=N(l);r=L(F,"DIV",{class:!0});var M=N(r);d&&d.l(M),i=G(M),u=L(M,"DIV",{class:!0});var P=N(u);W.l(P),P.forEach(p),w=G(M),f&&f.l(M),M.forEach(p),F.forEach(p),y.forEach(p),this.h()},h(){ue(s,o),g(u,"class",h="dropzone-message "+t[6]),g(r,"class",I="dropzone-interface-text "+t[4]),g(l,"class",k="dropzone-interface "+t[8]+" "+t[3]),g(e,"class",v="dropzone "+t[10]),g(e,"data-testid","file-dropzone"),Z(e,"opacity-50",t[12].disabled)},m(m,y){C(m,e,y),D(e,s),s.autofocus&&s.focus(),t[32](s),D(e,n),D(e,l),D(l,r),d&&d.m(r,null),D(r,i),D(r,u),W.m(u,null),D(r,w),f&&f.m(r,null),b=!0,T||(E=[R(s,"change",t[31]),R(s,"change",t[19]),R(s,"dragenter",t[20]),R(s,"dragover",t[21]),R(s,"dragleave",t[22]),R(s,"drop",t[23]),R(s,"click",t[24]),R(s,"keydown",t[25]),R(s,"keyup",t[26]),R(s,"keypress",t[27]),R(s,"focus",t[28]),R(s,"focusin",t[29]),R(s,"focusout",t[30])],T=!0)},p(m,y){ue(s,o=Ze(V,[{type:"file"},(!b||y[0]&4)&&{name:m[2]},(!b||y[0]&512&&a!==(a="dropzone-input "+m[9]))&&{class:a},m[11]()])),m[13].lead?d?(d.p(m,y),y[0]&8192&&A(d,1)):(d=We(m),d.c(),A(d,1),d.m(r,i)):d&&(O(),j(d,1,1,()=>{d=null}),K()),S&&S.p&&(!b||y[0]&131072)&&ve(S,_,m,m[17],b?be(_,m[17],y,et):pe(m[17]),Ve),(!b||y[0]&64&&h!==(h="dropzone-message "+m[6]))&&g(u,"class",h),m[13].meta?f?(f.p(m,y),y[0]&8192&&A(f,1)):(f=Ae(m),f.c(),A(f,1),f.m(r,null)):f&&(O(),j(f,1,1,()=>{f=null}),K()),(!b||y[0]&16&&I!==(I="dropzone-interface-text "+m[4]))&&g(r,"class",I),(!b||y[0]&264&&k!==(k="dropzone-interface "+m[8]+" "+m[3]))&&g(l,"class",k),(!b||y[0]&1024&&v!==(v="dropzone "+m[10]))&&g(e,"class",v),(!b||y[0]&5120)&&Z(e,"opacity-50",m[12].disabled)},i(m){b||(A(d),A(W,m),A(f),b=!0)},o(m){j(d),j(W,m),j(f),b=!1},d(m){m&&p(e),t[32](null),d&&d.d(),W.d(m),f&&f.d(),T=!1,Ge(E)}}}const lt="textarea relative flex justify-center items-center",at="w-full absolute top-0 left-0 right-0 bottom-0 z-[1] opacity-0 disabled:!opacity-0 cursor-pointer",rt="flex justify-center items-center text-center";function it(t,e,s){let a,n,l;const r=["files","fileInput","name","border","padding","rounded","regionInterface","regionInterfaceText","slotLead","slotMessage","slotMeta"];let i=de(e,r),{$$slots:u={},$$scope:h}=e;const w=Ue(u);let{files:I=void 0}=e,{fileInput:k=void 0}=e,{name:v}=e,{border:b="border-2 border-dashed"}=e,{padding:T="p-4 py-8"}=e,{rounded:E="rounded-container-token"}=e,{regionInterface:V=""}=e,{regionInterfaceText:o=""}=e,{slotLead:d="mb-4"}=e,{slotMessage:_=""}=e,{slotMeta:S="opacity-75"}=e;function W(){return delete i.class,i}function f(c){B.call(this,t,c)}function m(c){B.call(this,t,c)}function y(c){B.call(this,t,c)}function F(c){B.call(this,t,c)}function M(c){B.call(this,t,c)}function P(c){B.call(this,t,c)}function U(c){B.call(this,t,c)}function q(c){B.call(this,t,c)}function ke(c){B.call(this,t,c)}function Ie(c){B.call(this,t,c)}function Te(c){B.call(this,t,c)}function Ee(c){B.call(this,t,c)}function ye(){I=this.files,s(0,I)}function we(c){Le[c?"unshift":"push"](()=>{k=c,s(1,k)})}return t.$$set=c=>{s(33,e=J(J({},e),me(c))),s(12,i=de(e,r)),"files"in c&&s(0,I=c.files),"fileInput"in c&&s(1,k=c.fileInput),"name"in c&&s(2,v=c.name),"border"in c&&s(14,b=c.border),"padding"in c&&s(15,T=c.padding),"rounded"in c&&s(16,E=c.rounded),"regionInterface"in c&&s(3,V=c.regionInterface),"regionInterfaceText"in c&&s(4,o=c.regionInterfaceText),"slotLead"in c&&s(5,d=c.slotLead),"slotMessage"in c&&s(6,_=c.slotMessage),"slotMeta"in c&&s(7,S=c.slotMeta),"$$scope"in c&&s(17,h=c.$$scope)},t.$$.update=()=>{s(10,a=`${lt} ${b} ${T} ${E} ${e.class??""}`)},s(9,n=`${at}`),s(8,l=`${rt}`),e=me(e),[I,k,v,V,o,d,_,S,l,n,a,W,i,w,b,T,E,h,u,f,m,y,F,M,P,U,q,ke,Ie,Te,Ee,ye,we]}class ot extends re{constructor(e){super(),ie(this,e,it,nt,ae,{files:0,fileInput:1,name:2,border:14,padding:15,rounded:16,regionInterface:3,regionInterfaceText:4,slotLead:5,slotMessage:6,slotMeta:7},null,[-1,-1])}}function Me(t){let e,s;const a=t[22].default,n=_e(a,t,t[21],null);return{c(){e=z("div"),n&&n.c(),this.h()},l(l){e=L(l,"DIV",{class:!0});var r=N(e);n&&n.l(r),r.forEach(p),this.h()},h(){g(e,"class","slide-toggle-text ml-3")},m(l,r){C(l,e,r),n&&n.m(e,null),s=!0},p(l,r){n&&n.p&&(!s||r[0]&2097152)&&ve(n,a,l,l[21],s?be(a,l[21],r,null):pe(l[21]),null)},i(l){s||(A(n,l),s=!0)},o(l){j(n,l),s=!1},d(l){l&&p(e),n&&n.d(l)}}}function ct(t){let e,s,a,n,l,r,i,u,h,w,I,k,v,b,T,E=[{type:"checkbox"},{class:"slide-toggle-input hidden"},{name:t[1]},t[8](),{disabled:n=t[9].disabled}],V={};for(let d=0;d<E.length;d+=1)V=J(V,E[d]);let o=t[10].default&&Me(t);return{c(){e=z("div"),s=z("label"),a=z("input"),l=H(),r=z("div"),i=z("div"),w=H(),o&&o.c(),this.h()},l(d){e=L(d,"DIV",{id:!0,class:!0,"data-testid":!0,role:!0,"aria-label":!0,"aria-checked":!0,tabindex:!0});var _=N(e);s=L(_,"LABEL",{class:!0});var S=N(s);a=L(S,"INPUT",{type:!0,class:!0,name:!0}),l=G(S),r=L(S,"DIV",{class:!0});var W=N(r);i=L(W,"DIV",{class:!0}),N(i).forEach(p),W.forEach(p),w=G(S),o&&o.l(S),S.forEach(p),_.forEach(p),this.h()},h(){ue(a,V),g(i,"class",u="slide-toggle-thumb "+t[3]),Z(i,"cursor-not-allowed",t[9].disabled),g(r,"class",h="slide-toggle-track "+t[4]),Z(r,"cursor-not-allowed",t[9].disabled),g(s,"class",I="slide-toggle-label "+t[5]),g(e,"id",t[2]),g(e,"class",k="slide-toggle "+t[6]),g(e,"data-testid","slide-toggle"),g(e,"role","switch"),g(e,"aria-label",t[2]),g(e,"aria-checked",t[0]),g(e,"tabindex","0")},m(d,_){C(d,e,_),D(e,s),D(s,a),a.autofocus&&a.focus(),a.checked=t[0],D(s,l),D(s,r),D(r,i),D(s,w),o&&o.m(s,null),v=!0,b||(T=[R(a,"change",t[31]),R(a,"click",t[23]),R(a,"keydown",t[24]),R(a,"keyup",t[25]),R(a,"keypress",t[26]),R(a,"mouseover",t[27]),R(a,"change",t[28]),R(a,"focus",t[29]),R(a,"blur",t[30]),R(e,"keydown",t[7])],b=!0)},p(d,_){ue(a,V=Ze(E,[{type:"checkbox"},{class:"slide-toggle-input hidden"},(!v||_[0]&2)&&{name:d[1]},d[8](),(!v||_[0]&512&&n!==(n=d[9].disabled))&&{disabled:n}])),_[0]&1&&(a.checked=d[0]),(!v||_[0]&8&&u!==(u="slide-toggle-thumb "+d[3]))&&g(i,"class",u),(!v||_[0]&520)&&Z(i,"cursor-not-allowed",d[9].disabled),(!v||_[0]&16&&h!==(h="slide-toggle-track "+d[4]))&&g(r,"class",h),(!v||_[0]&528)&&Z(r,"cursor-not-allowed",d[9].disabled),d[10].default?o?(o.p(d,_),_[0]&1024&&A(o,1)):(o=Me(d),o.c(),A(o,1),o.m(s,null)):o&&(O(),j(o,1,1,()=>{o=null}),K()),(!v||_[0]&32&&I!==(I="slide-toggle-label "+d[5]))&&g(s,"class",I),(!v||_[0]&4)&&g(e,"id",d[2]),(!v||_[0]&64&&k!==(k="slide-toggle "+d[6]))&&g(e,"class",k),(!v||_[0]&4)&&g(e,"aria-label",d[2]),(!v||_[0]&1)&&g(e,"aria-checked",d[0])},i(d){v||(A(o),v=!0)},o(d){j(o),v=!1},d(d){d&&p(e),o&&o.d(),b=!1,Ge(T)}}}const ft="inline-block",ut="unstyled flex items-center",dt="flex transition-all duration-[200ms] cursor-pointer",mt="w-[50%] h-full scale-[0.8] transition-all duration-[200ms] shadow";function ht(t,e,s){let a,n,l,r,i,u,h,w;const I=["name","checked","size","background","active","border","rounded","label"];let k=de(e,I),{$$slots:v={},$$scope:b}=e;const T=Ue(v),E=Qe();let{name:V}=e,{checked:o=!1}=e,{size:d="md"}=e,{background:_="bg-surface-400 dark:bg-surface-700"}=e,{active:S="bg-surface-900 dark:bg-surface-300"}=e,{border:W=""}=e,{rounded:f="rounded-full"}=e,{label:m=""}=e,y;switch(d){case"sm":y="w-12 h-6";break;case"lg":y="w-20 h-10";break;default:y="w-16 h-8"}function F(c){["Enter","Space"].includes(c.code)&&(c.preventDefault(),E("keyup",c),c.currentTarget.firstChild.click())}function M(){return delete k.class,k}function P(c){B.call(this,t,c)}function U(c){B.call(this,t,c)}function q(c){B.call(this,t,c)}function ke(c){B.call(this,t,c)}function Ie(c){B.call(this,t,c)}function Te(c){B.call(this,t,c)}function Ee(c){B.call(this,t,c)}function ye(c){B.call(this,t,c)}function we(){o=this.checked,s(0,o)}return t.$$set=c=>{s(9,e=J(J({},e),me(c))),s(33,k=de(e,I)),"name"in c&&s(1,V=c.name),"checked"in c&&s(0,o=c.checked),"size"in c&&s(11,d=c.size),"background"in c&&s(12,_=c.background),"active"in c&&s(13,S=c.active),"border"in c&&s(14,W=c.border),"rounded"in c&&s(15,f=c.rounded),"label"in c&&s(2,m=c.label),"$$scope"in c&&s(21,b=c.$$scope)},t.$$.update=()=>{t.$$.dirty[0]&12289&&s(19,a=o?S:`${_} cursor-pointer`),t.$$.dirty[0]&1&&s(18,n=o?"bg-white/75":"bg-white"),t.$$.dirty[0]&1&&s(17,l=o?"translate-x-full":""),s(20,r=e.disabled===!0?"opacity-50":"hover:brightness-[105%] dark:hover:brightness-110 cursor-pointer"),s(6,i=`${ft} ${f} ${r} ${e.class??""}`),t.$$.dirty[0]&638976&&s(4,h=`${dt} ${W} ${f} ${y} ${a}`),t.$$.dirty[0]&425984&&s(3,w=`${mt} ${f} ${n} ${l}`)},s(5,u=`${ut}`),e=me(e),[o,V,m,w,h,u,i,F,M,e,T,d,_,S,W,f,y,l,n,a,r,b,v,P,U,q,ke,Ie,Te,Ee,ye,we]}class gt extends re{constructor(e){super(),ie(this,e,ht,ct,ae,{name:1,checked:0,size:11,background:12,active:13,border:14,rounded:15,label:2},null,[-1,-1])}}const ge=t=>t.replace(/\.[^/.]+$/,"");function _t(t){let e,s=t[0]?"Treatment":"Control",a,n;return{c(){e=z("span"),a=Q(s),this.h()},l(l){e=L(l,"SPAN",{class:!0});var r=N(e);a=X(r,s),r.forEach(p),this.h()},h(){g(e,"class",n=`chip ${t[0]?"variant-soft-primary":"variant-soft-surface"}`)},m(l,r){C(l,e,r),D(e,a)},p(l,r){r&1&&s!==(s=l[0]?"Treatment":"Control")&&he(a,s),r&1&&n!==(n=`chip ${l[0]?"variant-soft-primary":"variant-soft-surface"}`)&&g(e,"class",n)},d(l){l&&p(e)}}}function vt(t){let e,s,a,n,l=ge(t[1])+"",r,i,u,h,w,I,k,v='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>',b,T,E;function V(d){t[4](d)}let o={active:"variant-soft-primary",size:"sm",class:"mr-2",name:"slide",$$slots:{default:[_t]},$$scope:{ctx:t}};return t[0]!==void 0&&(o.checked=t[0]),h=new gt({props:o}),Le.push(()=>Ke(h,"checked",V)),h.$on("change",t[5]),{c(){e=z("div"),s=z("div"),a=z("div"),n=z("p"),r=Q(l),i=H(),u=z("div"),$(h.$$.fragment),I=H(),k=z("button"),k.innerHTML=v,this.h()},l(d){e=L(d,"DIV",{class:!0});var _=N(e);s=L(_,"DIV",{class:!0});var S=N(s);a=L(S,"DIV",{class:!0});var W=N(a);n=L(W,"P",{class:!0});var f=N(n);r=X(f,l),f.forEach(p),i=G(W),u=L(W,"DIV",{class:!0});var m=N(u);ee(h.$$.fragment,m),I=G(m),k=L(m,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),x(k)!=="svelte-1m0ck3b"&&(k.innerHTML=v),m.forEach(p),W.forEach(p),S.forEach(p),_.forEach(p),this.h()},h(){g(n,"class","text-lg"),g(k,"type","button"),g(k,"class","btn-icon hover:variant-ringed-tertiary"),g(u,"class","flex justify-between items-center min-w-64"),g(a,"class","flex flex-col space-y-2 w-full"),g(s,"class","flex justify-center items-center space-x-2"),g(e,"class","card p-4")},m(d,_){C(d,e,_),D(e,s),D(s,a),D(a,n),D(n,r),D(a,i),D(a,u),te(h,u,null),D(u,I),D(u,k),b=!0,T||(E=R(k,"click",function(){qe(t[2])&&t[2].apply(this,arguments)}),T=!0)},p(d,[_]){t=d,(!b||_&2)&&l!==(l=ge(t[1])+"")&&he(r,l);const S={};_&65&&(S.$$scope={dirty:_,ctx:t}),!w&&_&1&&(w=!0,S.checked=t[0],Oe(()=>w=!1)),h.$set(S)},i(d){b||(A(h.$$.fragment,d),b=!0)},o(d){j(h.$$.fragment,d),b=!1},d(d){d&&p(e),se(h),T=!1,E()}}}function pt(t,e,s){let{filename:a}=e,{onRemove:n}=e,{onToggle:l}=e,{isTreatment:r=!1}=e;function i(h){r=h,s(0,r)}const u=()=>l(r);return t.$$set=h=>{"filename"in h&&s(1,a=h.filename),"onRemove"in h&&s(2,n=h.onRemove),"onToggle"in h&&s(3,l=h.onToggle),"isTreatment"in h&&s(0,r=h.isTreatment)},[r,a,n,l,i,u]}class bt extends re{constructor(e){super(),ie(this,e,pt,vt,ae,{filename:1,onRemove:2,onToggle:3,isTreatment:0})}}function kt(t){let e,s,a,n,l=ge(t[0])+"",r,i,u,h,w,I,k,v,b='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path></svg>',T,E;return{c(){e=z("div"),s=z("div"),a=z("div"),n=z("p"),r=Q(l),i=H(),u=z("div"),h=z("span"),w=Q(t[2]),k=H(),v=z("button"),v.innerHTML=b,this.h()},l(V){e=L(V,"DIV",{class:!0});var o=N(e);s=L(o,"DIV",{class:!0});var d=N(s);a=L(d,"DIV",{class:!0});var _=N(a);n=L(_,"P",{class:!0});var S=N(n);r=X(S,l),S.forEach(p),i=G(_),u=L(_,"DIV",{class:!0});var W=N(u);h=L(W,"SPAN",{class:!0});var f=N(h);w=X(f,t[2]),f.forEach(p),k=G(W),v=L(W,"BUTTON",{type:!0,class:!0,"data-svelte-h":!0}),x(v)!=="svelte-1m0ck3b"&&(v.innerHTML=b),W.forEach(p),_.forEach(p),d.forEach(p),o.forEach(p),this.h()},h(){g(n,"class","text-lg"),g(h,"class",I=`chip ${t[3]}`),g(v,"type","button"),g(v,"class","btn-icon hover:variant-ringed-tertiary"),g(u,"class","flex justify-between items-center min-w-64"),g(a,"class","flex flex-col space-y-2 w-full"),g(s,"class","flex justify-center items-center space-x-2"),g(e,"class","card p-4")},m(V,o){C(V,e,o),D(e,s),D(s,a),D(a,n),D(n,r),D(a,i),D(a,u),D(u,h),D(h,w),D(u,k),D(u,v),T||(E=R(v,"click",function(){qe(t[1])&&t[1].apply(this,arguments)}),T=!0)},p(V,[o]){t=V,o&1&&l!==(l=ge(t[0])+"")&&he(r,l),o&4&&he(w,t[2]),o&8&&I!==(I=`chip ${t[3]}`)&&g(h,"class",I)},i:Y,o:Y,d(V){V&&p(e),T=!1,E()}}}function It(t,e,s){let{filename:a}=e,{onRemove:n}=e,{type:l}=e,{chip:r="variant-soft-success"}=e;return t.$$set=i=>{"filename"in i&&s(0,a=i.filename),"onRemove"in i&&s(1,n=i.onRemove),"type"in i&&s(2,l=i.type),"chip"in i&&s(3,r=i.chip)},[a,n,l,r]}class Je extends re{constructor(e){super(),ie(this,e,It,kt,ae,{filename:0,onRemove:1,type:2,chip:3})}}const Tt=t=>{let e="+";t.startsWith("complement(")&&(e="-",t=t.replace("complement(","").replace(")","")),t=t.replace(/</g,"").replace(/>/g,"");const[s,a]=t.split(".."),n=parseInt(s,10),l=parseInt(a,10);if(isNaN(n)||isNaN(l))throw new Error(`Invalid location: ${t}`);return{start:n,end:l,strand:e}};function Et(t){const e=t.split(`
`),s={features:[],currentFeature:null,multiline:!1},a=e.reduce((n,l)=>{const r=/^\s+([a-zA-Z_]+)\s+((?:complement\()?[<>]?\d+\.\.[<>]?\d+\)?)/;if(r.test(l)){n.currentFeature&&n.features.push(n.currentFeature);const i=l.match(r);if(i){const u=i[1],h=i[2],{start:w,end:I,strand:k}=Tt(h);n.currentFeature={type:u,start:w,end:I,strand:k,attributes:{}}}n.multiline=!1}else if(l.trim().startsWith("/")){const i=l.trim().match(/^\/(\S+?)=(?:"([^"]+)"|(.+))/);if(i&&n.currentFeature){const[,u,h,w]=i,I=h||w||"";n.currentFeature.attributes[u]=I,n.multiline=I.startsWith('"')&&!I.endsWith('"')||I.startsWith("(")&&!I.endsWith(")")}}else if(n.multiline&&n.currentFeature&&/^\s+[^/]/.test(l)){const i=Object.keys(n.currentFeature.attributes),u=i[i.length-1];u&&(n.currentFeature.attributes[u]+=l.trim()),l.trim().endsWith('"')&&(n.multiline=!1)}else n.currentFeature&&(n.features.push(n.currentFeature),n.currentFeature=null,n.multiline=!1);return n},s);return a.currentFeature&&a.features.push(a.currentFeature),a.features}function yt(t){const s=t.split(`
`).find(w=>w.startsWith("LOCUS")),a=s?s.split(/\s+/)[1]:"",n=t.match(/FEATURES\s+([\s\S]+?)ORIGIN/),l=n?n[1]:"",r=Et(l),i=t.match(/ORIGIN\s+([\s\S]+)/),h=(i?i[1]:"").replace(/[^a-zA-Z]/g,"");return{locusId:a,sequence:h,features:r}}function wt(t){const s=t.split(/\n(?=LOCUS)/).map(yt),a=s.map(l=>{const r=[`>${l.locusId}`];for(let i=0;i<l.sequence.length;i+=60)r.push(l.sequence.slice(i,i+60));return r.join(`
`)}),n=["##gff-version 3"];return s.forEach(l=>{l.features.forEach(r=>{const i={...r.attributes};i.name||i.Name?i.Name=i.name||i.Name:i.gene?i.Name=i.gene:i.product?i.Name=i.product:i.locus_tag&&(i.Name=i.locus_tag),r.type==="source"&&i.organism&&(i.Name=i.organism);const u=Object.entries(i).map(([h,w])=>`${h}=${w.replace(/"/g,"").replace(/;/g,",")}`).join(";");n.push(`${l.locusId}	diana	${r.type}	${r.start}	${r.end}	.	${r.strand}	.	${u}`)})}),{gff:n.join(`
`),fasta:a.join(`
`)}}async function St(t,e,s=5e4){const a=[];a.push(`variableStep chrom=${e}`);const n=t.split(`
`);for(let l=0;l<n.length;l+=s)n.slice(l,l+s).forEach((i,u)=>{let[h,w]=i.split(/\s+/).map(I=>parseInt(I,10));isNaN(w)&&(w=0),isNaN(h)&&(h=0),h!==0&&a.push(`${l+u+1} ${h}`),w!==0&&a.push(`${l+u+1} -${w}`)}),await new Promise(i=>setTimeout(i,0));return a.join(`
`)}function Re(t,e,s){const a=t.slice();return a[11]=e[s][0],a[12]=e[s][1].isTreatment,a[14]=s,a}function Pe(t){let e,s,a;return s=new Je({props:{type:"Reference",filename:t[3].filename,onRemove:le.reset}}),{c(){e=z("div"),$(s.$$.fragment),this.h()},l(n){e=L(n,"DIV",{class:!0});var l=N(e);ee(s.$$.fragment,l),l.forEach(p),this.h()},h(){g(e,"class","m-2 w-full md:w-auto")},m(n,l){C(n,e,l),te(s,e,null),a=!0},p(n,l){const r={};l&8&&(r.filename=n[3].filename),s.$set(r)},i(n){a||(A(s.$$.fragment,n),a=!0)},o(n){j(s.$$.fragment,n),a=!1},d(n){n&&p(e),se(s)}}}function je(t){let e,s,a;return s=new Je({props:{type:"Annotations",chip:"variant-soft-warning",filename:t[2].filename,onRemove:fe.reset}}),{c(){e=z("div"),$(s.$$.fragment),this.h()},l(n){e=L(n,"DIV",{class:!0});var l=N(e);ee(s.$$.fragment,l),l.forEach(p),this.h()},h(){g(e,"class","m-2 w-full md:w-auto")},m(n,l){C(n,e,l),te(s,e,null),a=!0},p(n,l){const r={};l&4&&(r.filename=n[2].filename),s.$set(r)},i(n){a||(A(s.$$.fragment,n),a=!0)},o(n){j(s.$$.fragment,n),a=!1},d(n){n&&p(e),se(s)}}}function Ce(t){let e,s,a,n;function l(...i){return t[6](t[11],...i)}function r(){return t[7](t[11])}return s=new bt({props:{isTreatment:t[12],onToggle:l,onRemove:r,filename:t[11]}}),{c(){e=z("div"),$(s.$$.fragment),a=H(),this.h()},l(i){e=L(i,"DIV",{class:!0});var u=N(e);ee(s.$$.fragment,u),a=G(u),u.forEach(p),this.h()},h(){g(e,"class","m-2 w-full md:w-auto ")},m(i,u){C(i,e,u),te(s,e,null),D(e,a),n=!0},p(i,u){t=i;const h={};u&16&&(h.isTreatment=t[12]),u&16&&(h.onToggle=l),u&16&&(h.onRemove=r),u&16&&(h.filename=t[11]),s.$set(h)},i(i){n||(A(s.$$.fragment,i),n=!0)},o(i){j(s.$$.fragment,i),n=!1},d(i){i&&p(e),se(s)}}}function zt(t){let e,s,a;function n(r){t[8](r)}let l={padding:"py-4",name:"files",multiple:!0,$$slots:{meta:[Vt],message:[Ft],lead:[Dt]},$$scope:{ctx:t}};return t[0]!==void 0&&(l.files=t[0]),e=new ot({props:l}),Le.push(()=>Ke(e,"files",n)),e.$on("change",t[5]),e.$on("click",Be),e.$on("drop",Be),{c(){$(e.$$.fragment)},l(r){ee(e.$$.fragment,r)},m(r,i){te(e,r,i),a=!0},p(r,i){const u={};i&32768&&(u.$$scope={dirty:i,ctx:r}),!s&&i&1&&(s=!0,u.files=r[0],Oe(()=>s=!1)),e.$set(u)},i(r){a||(A(e.$$.fragment,r),a=!0)},o(r){j(e.$$.fragment,r),a=!1},d(r){se(e,r)}}}function Lt(t){let e,s,a;return s=new xe({props:{value:void 0,width:"w-16",strokeLinecap:"round"}}),{c(){e=z("div"),$(s.$$.fragment),this.h()},l(n){e=L(n,"DIV",{class:!0});var l=N(e);ee(s.$$.fragment,l),l.forEach(p),this.h()},h(){g(e,"class","flex items-center justify-center align-middle")},m(n,l){C(n,e,l),te(s,e,null),a=!0},p:Y,i(n){a||(A(s.$$.fragment,n),a=!0)},o(n){j(s.$$.fragment,n),a=!1},d(n){n&&p(e),se(s)}}}function Dt(t){let e,s='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"></path></svg>';return{c(){e=z("div"),e.innerHTML=s,this.h()},l(a){e=L(a,"DIV",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-stz8rw"&&(e.innerHTML=s),this.h()},h(){g(e,"class","flex justify-center")},m(a,n){C(a,e,n)},p:Y,d(a){a&&p(e)}}}function Ft(t){let e,s='<span class="font-semibold">Load files</span> or drag and drop';return{c(){e=z("p"),e.innerHTML=s,this.h()},l(a){e=L(a,"P",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-10rbgmq"&&(e.innerHTML=s),this.h()},h(){g(e,"class","text-xl ")},m(a,n){C(a,e,n)},p:Y,d(a){a&&p(e)}}}function Vt(t){let e;return{c(){e=Q("GENBANK, GFF, FASTA, WIG and UserPlot files allowed.")},l(s){e=X(s,"GENBANK, GFF, FASTA, WIG and UserPlot files allowed.")},m(s,a){C(s,e,a)},d(s){s&&p(e)}}}function Nt(t){let e,s='<div class="flex flex-col items-center align-baseline justify-center max-w-4xl space-y-8 "><figure class="card-hover rounded-full svelte-ppo8by"><div><section class="img-bg svelte-ppo8by"></section></div> <img class="logo-img mt-8 svelte-ppo8by" src="/images/logo.webp" alt="Skeleton Logo"/></figure> <h1 class="text-center text-3xl mx-2">Transposon Sequencing Data Visualiser</h1></div>',a,n,l,r,i,u,h,w,I,k,v,b,T=t[3].filename&&Pe(t),E=t[2].filename&&je(t),V=De(Array.from(t[4].entries()).sort(He)),o=[];for(let f=0;f<V.length;f+=1)o[f]=Ce(Re(t,V,f));const d=f=>j(o[f],1,1,()=>{o[f]=null}),_=[Lt,zt],S=[];function W(f,m){return f[1]?0:1}return k=W(t),v=S[k]=_[k](t),{c(){e=z("div"),e.innerHTML=s,a=H(),n=z("div"),l=z("div"),T&&T.c(),r=H(),E&&E.c(),i=H(),u=z("div");for(let f=0;f<o.length;f+=1)o[f].c();h=H(),w=z("div"),I=z("div"),v.c(),this.h()},l(f){e=L(f,"DIV",{class:!0,"data-svelte-h":!0}),x(e)!=="svelte-4f6vzo"&&(e.innerHTML=s),a=G(f),n=L(f,"DIV",{class:!0});var m=N(n);l=L(m,"DIV",{class:!0});var y=N(l);T&&T.l(y),r=G(y),E&&E.l(y),y.forEach(p),i=G(m),u=L(m,"DIV",{class:!0});var F=N(u);for(let U=0;U<o.length;U+=1)o[U].l(F);F.forEach(p),m.forEach(p),h=G(f),w=L(f,"DIV",{class:!0});var M=N(w);I=L(M,"DIV",{class:!0});var P=N(I);v.l(P),P.forEach(p),M.forEach(p),this.h()},h(){g(e,"class","flex justify-center mb-6"),g(l,"class","flex flex-wrap justify-center w-full"),g(u,"class","flex flex-wrap justify-center "),g(n,"class","flex flex-col justify-center items-center mb-6"),g(I,"class","w-full max-w-3xl mx-4 mb-4"),g(w,"class","flex justify-center ")},m(f,m){C(f,e,m),C(f,a,m),C(f,n,m),D(n,l),T&&T.m(l,null),D(l,r),E&&E.m(l,null),D(n,i),D(n,u);for(let y=0;y<o.length;y+=1)o[y]&&o[y].m(u,null);C(f,h,m),C(f,w,m),D(w,I),S[k].m(I,null),b=!0},p(f,[m]){if(f[3].filename?T?(T.p(f,m),m&8&&A(T,1)):(T=Pe(f),T.c(),A(T,1),T.m(l,r)):T&&(O(),j(T,1,1,()=>{T=null}),K()),f[2].filename?E?(E.p(f,m),m&4&&A(E,1)):(E=je(f),E.c(),A(E,1),E.m(l,null)):E&&(O(),j(E,1,1,()=>{E=null}),K()),m&16){V=De(Array.from(f[4].entries()).sort(He));let F;for(F=0;F<V.length;F+=1){const M=Re(f,V,F);o[F]?(o[F].p(M,m),A(o[F],1)):(o[F]=Ce(M),o[F].c(),A(o[F],1),o[F].m(u,null))}for(O(),F=V.length;F<o.length;F+=1)d(F);K()}let y=k;k=W(f),k===y?S[k].p(f,m):(O(),j(S[y],1,1,()=>{S[y]=null}),K(),v=S[k],v?v.p(f,m):(v=S[k]=_[k](f),v.c()),A(v,1),v.m(I,null))},i(f){if(!b){A(T),A(E);for(let m=0;m<V.length;m+=1)A(o[m]);A(v),b=!0}},o(f){j(T),j(E),o=o.filter(Boolean);for(let m=0;m<o.length;m+=1)j(o[m]);j(v),b=!1},d(f){f&&(p(e),p(a),p(n),p(h),p(w)),T&&T.d(),E&&E.d(),Xe(o,f),S[k].d()}}}function Wt(t){const e=t.split(`
`);let s="",a="",n=!1;for(const l of e){if(l.startsWith("##")&&l.includes("FASTA")){n=!0;continue}n&&(l.startsWith(">")?(a&&(s+=a+`
`),a=l+`
`):a+=l.trim())}return a&&(s+=a+`
`),s.trim()}function Be(){const t=document.getElementsByName("files")[0];t.value=""}const He=([t],[e])=>t.localeCompare(e);function At(t,e,s){let a,n,l,r;oe(t,fe,b=>s(2,a=b)),oe(t,ce,b=>s(9,n=b)),oe(t,le,b=>s(3,l=b)),oe(t,ne,b=>s(4,r=b));const i=Ye();let u,h=!1;function w(b){if(!u||u.length===0)return;s(1,h=!0);let T=[];for(let E=0;E<u.length;E++){const V=u[E],o=V.name,d=new FileReader;T.push(new Promise((_,S)=>{d.onload=async W=>{var m,y;let f=(y=(m=W.target)==null?void 0:m.result)==null?void 0:y.toString();if(o.endsWith(".gb")||o.endsWith(".gbk")||o.endsWith(".genbank")){let F="",M="";try{const P=wt(f);F=P.gff,M=P.fasta}catch(P){console.error("Error converting GenBank file:",P);const q={message:"Error converting GenBank file: "+P,background:"variant-glass-error"};i.trigger(q),S("Error converting GenBank file: "+P)}await fe.load(o,F),Se(ce,n.locus=void 0,n),M.length>0&&(await le.load(o,M).catch(P=>{console.error("Error loading reference:",P);const q={message:"Error loading reference: "+P,background:"variant-glass-error"};i.trigger(q)}),await ze.load(M),_(0))}else if(o.endsWith(".gff")||o.endsWith(".gff3")){await fe.load(o,f),Se(ce,n.locus=void 0,n);const F=Wt(f);F.length>0&&(await le.load(o,F).catch(M=>{console.error("Error loading reference:",M);const U={message:"Error loading reference: "+M,background:"variant-glass-error"};i.trigger(U)}),await ze.load(F),_(0))}else if(o.endsWith(".fasta")||o.endsWith(".fa")||o.endsWith(".fna"))await le.load(o,f),await ze.load(f),Se(ce,n.locus=void 0,n),_(0);else if(o.endsWith(".wig")||o.endsWith(".wiggle"))await ne.load(o,f),_(0);else if(o.endsWith(".userplot")||o.endsWith(".plot")){const F=a.chromosomes.keys().next().value;if(F){const M={message:`Converting UserPlot file '${o}' to Wig Format. Assuming the first chromosome in the annotations is the reference chromosome`,background:"variant-glass-warning"};i.trigger(M);const P=await St(f,F);await ne.load(o,P),_(0)}else{console.error("No chromosome found in annotations");const P={message:"Please load annotations before loading userplot files",background:"variant-glass-error"};i.trigger(P),S("No chromosome found in annotations")}}else{console.error("Unsupported file type:",o);const M={message:"Unsupported file type: "+o,background:"variant-glass-error"};i.trigger(M),S("Unsupported file type: "+o)}_(0)},d.onerror=S,d.readAsText(V)}))}Promise.all(T).then(E=>{s(1,h=!1)}).catch(E=>{console.error("Error reading files:",E),s(1,h=!1)})}const I=(b,T)=>ne.setIsTreatment(b,T),k=b=>ne.remove(b);function v(b){u=b,s(0,u)}return[u,h,a,l,r,w,I,k,v]}class Zt extends re{constructor(e){super(),ie(this,e,At,Nt,ae,{})}}export{Zt as component};
