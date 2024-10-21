import{s as W,c as F,o as X,b as Y,d as M,e as N}from"../chunks/scheduler.D4l2_50T.js";import{S as Z,i as x,e as w,m as P,c as y,a as D,n as R,d as _,l as J,g as b,o as G,p as V,q,r as A,u as U,s as H,f as j,v as K,w as tt,t as C,b as S,h as I,j as et}from"../chunks/index.GLNPzUOZ.js";import{e as L}from"../chunks/each.bfnIeBsL.js";import{g as nt}from"../chunks/generateGeneInsertSites.BfmONhhf.js";import{a as ot}from"../chunks/annotationStore.B8SpThiG.js";import{i as at}from"../chunks/insertStore.D6hhx-AE.js";import{P as st}from"../chunks/plotly.cbd5aJyv.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.Dyxst68F.js";import{T as rt,a as z}from"../chunks/Tab.DUXPhubS.js";import{t as it}from"../chunks/TAStore.CjcekbWH.js";function O(r,e,t){const o=r.slice();return o[12]=e[t],o[14]=t,o}function lt(r){let e;return{c(){e=C("Read Counts")},l(t){e=S(t,"Read Counts")},m(t,o){b(t,e,o)},d(t){t&&_(e)}}}function ut(r){let e;return{c(){e=C("Insert Count")},l(t){e=S(t,"Insert Count")},m(t,o){b(t,e,o)},d(t){t&&_(e)}}}function ft(r){let e;return{c(){e=C("Insert Index")},l(t){e=S(t,"Insert Index")},m(t,o){b(t,e,o)},d(t){t&&_(e)}}}function pt(r){let e,t,o,n,i,s,f,c,g;function v(a){r[2](a)}let p={name:"readCount",value:"readCount",$$slots:{default:[lt]},$$scope:{ctx:r}};r[0]!==void 0&&(p.group=r[0]),e=new z({props:p}),M.push(()=>U(e,"group",v));function m(a){r[3](a)}let $={name:"insertCount",value:"insertCount",$$slots:{default:[ut]},$$scope:{ctx:r}};r[0]!==void 0&&($.group=r[0]),n=new z({props:$}),M.push(()=>U(n,"group",m));function B(a){r[4](a)}let l={name:"insertIndex",value:"insertIndex",$$slots:{default:[ft]},$$scope:{ctx:r}};return r[0]!==void 0&&(l.group=r[0]),f=new z({props:l}),M.push(()=>U(f,"group",B)),{c(){P(e.$$.fragment),o=H(),P(n.$$.fragment),s=H(),P(f.$$.fragment)},l(a){R(e.$$.fragment,a),o=j(a),R(n.$$.fragment,a),s=j(a),R(f.$$.fragment,a)},m(a,u){G(e,a,u),b(a,o,u),G(n,a,u),b(a,s,u),G(f,a,u),g=!0},p(a,u){const d={};u&32768&&(d.$$scope={dirty:u,ctx:a}),!t&&u&1&&(t=!0,d.group=a[0],N(()=>t=!1)),e.$set(d);const h={};u&32768&&(h.$$scope={dirty:u,ctx:a}),!i&&u&1&&(i=!0,h.group=a[0],N(()=>i=!1)),n.$set(h);const E={};u&32768&&(E.$$scope={dirty:u,ctx:a}),!c&&u&1&&(c=!0,E.group=a[0],N(()=>c=!1)),f.$set(E)},i(a){g||(V(e.$$.fragment,a),V(n.$$.fragment,a),V(f.$$.fragment,a),g=!0)},o(a){q(e.$$.fragment,a),q(n.$$.fragment,a),q(f.$$.fragment,a),g=!1},d(a){a&&(_(o),_(s)),A(e,a),A(n,a),A(f,a)}}}function Q(r){let e,t,o=r[12]+"",n,i,s,f,c,g,v;return{c(){e=w("div"),t=w("h3"),n=C(o),i=C(" - "),s=C(r[0]),f=H(),c=w("div"),v=H(),this.h()},l(p){e=y(p,"DIV",{});var m=D(e);t=y(m,"H3",{});var $=D(t);n=S($,o),i=S($," - "),s=S($,r[0]),$.forEach(_),f=j(m),c=y(m,"DIV",{id:!0}),D(c).forEach(_),v=j(m),m.forEach(_),this.h()},h(){J(c,"id",g=`plotly-histogram-${r[0]}-${r[14]}`)},m(p,m){b(p,e,m),I(e,t),I(t,n),I(t,i),I(t,s),I(e,f),I(e,c),I(e,v)},p(p,m){m&1&&et(s,p[0]),m&1&&g!==(g=`plotly-histogram-${p[0]}-${p[14]}`)&&J(c,"id",g)},d(p){p&&_(e)}}}function mt(r){let e,t=L(r[1].sort()),o=[];for(let n=0;n<t.length;n+=1)o[n]=Q(O(r,t,n));return{c(){for(let n=0;n<o.length;n+=1)o[n].c();e=K()},l(n){for(let i=0;i<o.length;i+=1)o[i].l(n);e=K()},m(n,i){for(let s=0;s<o.length;s+=1)o[s]&&o[s].m(n,i);b(n,e,i)},p(n,i){if(i&3){t=L(n[1].sort());let s;for(s=0;s<t.length;s+=1){const f=O(n,t,s);o[s]?o[s].p(f,i):(o[s]=Q(f),o[s].c(),o[s].m(e.parentNode,e))}for(;s<o.length;s+=1)o[s].d(1);o.length=t.length}},d(n){n&&_(e),tt(o,n)}}}function ct(r){let e,t,o;return t=new rt({props:{$$slots:{panel:[mt],default:[pt]},$$scope:{ctx:r}}}),{c(){e=w("div"),P(t.$$.fragment),this.h()},l(n){e=y(n,"DIV",{class:!0});var i=D(e);R(t.$$.fragment,i),i.forEach(_),this.h()},h(){J(e,"class","m-4")},m(n,i){b(n,e,i),G(t,e,null),o=!0},p(n,[i]){const s={};i&32769&&(s.$$scope={dirty:i,ctx:n}),t.$set(s)},i(n){o||(V(t.$$.fragment,n),o=!0)},o(n){q(t.$$.fragment,n),o=!1},d(n){n&&_(e),A(t)}}}function _t(r,e,t){let o,n,i;F(r,it,l=>t(5,o=l)),F(r,ot,l=>t(6,n=l)),F(r,at,l=>t(7,i=l));let s="insertIndex";const f=Array.from(i.keys()),c=Array.from(i.values());function g(l){const a=l.map(u=>u.minus+u.plus);return nt(n.features,a,o,0,0)}function v(l,a,u){const d={title:`Histogram of ${u}`,xaxis:{title:`${u}`},yaxis:{title:"Count"}};document.getElementById(l)&&st.newPlot(l,[a],d)}function p(l){c.forEach((a,u)=>{const d=g(a);let h;l==="readCount"?h={x:d.map(k=>k.readCount),type:"histogram"}:l==="insertCount"?h={x:d.map(k=>k.insertCount),type:"histogram"}:l==="insertIndex"&&(h={x:d.map(k=>k.insIndex),type:"histogram"});const E=`plotly-histogram-${l}-${u}`,T=f[u];v(E,h,T)})}X(()=>{p(s)}),Y(()=>{p(s)});function m(l){s=l,t(0,s)}function $(l){s=l,t(0,s)}function B(l){s=l,t(0,s)}return[s,f,m,$,B]}class kt extends Z{constructor(e){super(),x(this,e,_t,ct,W,{})}}export{kt as component};
