import{s as de,q as De,n as Te,c as ue}from"../chunks/scheduler.Cxdq5DjT.js";import{S as he,i as ge,e as b,t as q,s as C,c as R,a as T,b as V,d as $,f as D,k as Pe,l as O,o as $e,g as A,h as d,j as ne,q as E,r as ye,u as S,v as Ce,w as B,x as k,y as I,z as L,C as Se}from"../chunks/index.Bp_61F_m.js";import{i as Fe}from"../chunks/insertStore.DJYib06i.js";import{a as Be}from"../chunks/annotationStore.D01fgoLY.js";import{g as pe}from"../chunks/generateGeneInsertSites.ozbo97IV.js";import"../chunks/ProgressBar.svelte_svelte_type_style_lang.DkJRRaEQ.js";import{P as ke}from"../chunks/ProgressRadial.BwNK8EGC.js";import{P as _e}from"../chunks/plotly.cbd5aJyv.js";import{e as ve}from"../chunks/each.J0AVf1RG.js";import{S as Ie,R as Le,T as se,a as le,b as Ge,P as je,D as Oe}from"../chunks/Datatable.svelte_svelte_type_style_lang.CdBywFzy.js";async function ze(n,e,t=0){const r=[];for(let a=0;a<n[0].length;a++){const o=n[0][a].name,l=n[0][a].start,s=n[0][a].end;let m=0,u=0;for(let p=0;p<n.length;p++)m+=n[p][a].readCount;for(let p=0;p<e.length;p++)u+=e[p][a].readCount;if(m<t&&u<t)continue;const g=Math.log2((u+1)/(m+1));r.push({id:a,name:o,start:l,end:s,logFC:g}),a%100===0&&await new Promise(p=>setTimeout(p,0))}return r}function we(n){let e,t,r;return t=new ke({props:{value:void 0,width:"w-14",strokeLinecap:"round"}}),{c(){e=b("div"),B(t.$$.fragment),this.h()},l(a){e=R(a,"DIV",{class:!0});var o=T(e);k(t.$$.fragment,o),o.forEach($),this.h()},h(){O(e,"class","flex items-center justify-center align-middle m-12")},m(a,o){A(a,e,o),I(t,e,null),r=!0},p:Te,i(a){r||(E(t.$$.fragment,a),r=!0)},o(a){S(t.$$.fragment,a),r=!1},d(a){a&&$(e),L(t)}}}function Ae(n){let e,t,r,a,o,l,s,m,u,g=`The logFC represents the log2 fold-change between control and condition read counts for each
    gene.`,p,i=n[1]&&we();return{c(){e=b("div"),t=b("header"),r=q(n[0]),a=C(),o=b("section"),l=b("div"),s=C(),i&&i.c(),m=C(),u=b("footer"),u.textContent=g,this.h()},l(h){e=R(h,"DIV",{class:!0});var c=T(e);t=R(c,"HEADER",{class:!0});var G=T(t);r=V(G,n[0]),G.forEach($),a=D(c),o=R(c,"SECTION",{class:!0});var y=T(o);l=R(y,"DIV",{id:!0,style:!0}),T(l).forEach($),s=D(y),i&&i.l(y),y.forEach($),m=D(c),u=R(c,"FOOTER",{class:!0,"data-svelte-h":!0}),Pe(u)!=="svelte-1x1cclb"&&(u.textContent=g),c.forEach($),this.h()},h(){O(t,"class","card-header"),O(l,"id",n[2]),$e(l,"width","100%"),$e(l,"height","100%"),O(o,"class","p-4"),O(u,"class","card-footer"),O(e,"class","card")},m(h,c){A(h,e,c),d(e,t),d(t,r),d(e,a),d(e,o),d(o,l),d(o,s),i&&i.m(o,null),d(e,m),d(e,u),p=!0},p(h,[c]){(!p||c&1)&&ne(r,h[0]),h[1]?i?(i.p(h,c),c&2&&E(i,1)):(i=we(),i.c(),E(i,1),i.m(o,null)):i&&(ye(),S(i,1,1,()=>{i=null}),Ce())},i(h){p||(E(i),p=!0)},o(h){S(i),p=!1},d(h){h&&$(e),i&&i.d()}}}function He(n,e,t){let r,{filename:a}=e,{comparisonResults:o}=e,{filterData:l}=e,s=`plotly-${a}`,m=!1;const u=()=>{const g=document.getElementById(s);g&&_e.relayout(g,{width:g.clientWidth,height:g.clientHeight})};return De(()=>{window.removeEventListener("resize",u)}),n.$$set=g=>{"filename"in g&&t(0,a=g.filename),"comparisonResults"in g&&t(3,o=g.comparisonResults),"filterData"in g&&t(4,l=g.filterData)},n.$$.update=()=>{if(n.$$.dirty&8&&t(1,r=o.length===0),n.$$.dirty&58&&!r&&!m){const g={yaxis:{title:"Log2 Fold Change (logFC)"},xaxis:{zeroline:!1,rangemode:"nonnegative"},margin:{b:25,t:25,r:25},barmode:"overlay",modebar:{orientation:"v"},dragmode:"select"},p={modeBarButtonsToRemove:["autoScale2d"],responsive:!0,displaylogo:!1},i={x:o.map(c=>c.start),y:o.map(c=>c.logFC),text:o.map(c=>c.name),type:"scatter",mode:"markers"};_e.newPlot(s,[i],g,p),window.addEventListener("resize",u);const h=document.getElementById(s);h==null||h.on("plotly_selected",function(c){if(c===void 0)return;const G=c.points.map(y=>y.text);l(G)}),h==null||h.on("plotly_deselect",function(){l([])}),t(5,m=!0)}},[a,r,s,o,l,m]}class Ne extends he{constructor(e){super(),ge(this,e,He,Ae,de,{filename:0,comparisonResults:3,filterData:4})}}function Ee(n,e,t){const r=n.slice();return r[4]=e[t],r}function qe(n){let e;return{c(){e=q("Gene Name")},l(t){e=V(t,"Gene Name")},m(t,r){A(t,e,r)},d(t){t&&$(e)}}}function Ve(n){let e;return{c(){e=q("Start")},l(t){e=V(t,"Start")},m(t,r){A(t,e,r)},d(t){t&&$(e)}}}function Me(n){let e;return{c(){e=q("End")},l(t){e=V(t,"End")},m(t,r){A(t,e,r)},d(t){t&&$(e)}}}function We(n){let e;return{c(){e=q("Log2 Fold Change")},l(t){e=V(t,"Log2 Fold Change")},m(t,r){A(t,e,r)},d(t){t&&$(e)}}}function be(n){let e,t,r=n[4].name+"",a,o,l,s=n[4].start+"",m,u,g,p=n[4].end+"",i,h,c,G=n[4].logFC+"",y,W;return{c(){e=b("tr"),t=b("td"),a=q(r),o=C(),l=b("td"),m=q(s),u=C(),g=b("td"),i=q(p),h=C(),c=b("td"),y=q(G),W=C()},l(v){e=R(v,"TR",{});var _=T(e);t=R(_,"TD",{});var X=T(t);a=V(X,r),X.forEach($),o=D(_),l=R(_,"TD",{});var H=T(l);m=V(H,s),H.forEach($),u=D(_),g=R(_,"TD",{});var Z=T(g);i=V(Z,p),Z.forEach($),h=D(_),c=R(_,"TD",{});var N=T(c);y=V(N,G),N.forEach($),W=D(_),_.forEach($)},m(v,_){A(v,e,_),d(e,t),d(t,a),d(e,o),d(e,l),d(l,m),d(e,u),d(e,g),d(g,i),d(e,h),d(e,c),d(c,y),d(e,W)},p(v,_){_&1&&r!==(r=v[4].name+"")&&ne(a,r),_&1&&s!==(s=v[4].start+"")&&ne(m,s),_&1&&p!==(p=v[4].end+"")&&ne(i,p),_&1&&G!==(G=v[4].logFC+"")&&ne(y,G)},d(v){v&&$(e)}}}function Ye(n){let e,t,r,a,o,l,s,m,u,g,p,i,h,c,G,y,W,v,_,X,H,Z,N,oe,Y,ie,x,fe,M,J,me,K,re;r=new Ie({props:{handler:n[1]}}),o=new Le({props:{handler:n[1]}}),g=new se({props:{handler:n[1],orderBy:"name",$$slots:{default:[qe]},$$scope:{ctx:n}}}),i=new se({props:{handler:n[1],orderBy:"start",$$slots:{default:[Ve]},$$scope:{ctx:n}}}),c=new se({props:{handler:n[1],orderBy:"end",$$slots:{default:[Me]},$$scope:{ctx:n}}}),y=new se({props:{handler:n[1],orderBy:"logFC",$$slots:{default:[We]},$$scope:{ctx:n}}}),_=new le({props:{handler:n[1],filterBy:"name"}}),H=new le({props:{handler:n[1],filterBy:"start"}}),N=new le({props:{handler:n[1],filterBy:"end"}}),Y=new le({props:{handler:n[1],filterBy:"logFC"}});let ee=ve(n[0]),F=[];for(let f=0;f<ee.length;f+=1)F[f]=be(Ee(n,ee,f));return J=new Ge({props:{handler:n[1]}}),K=new je({props:{handler:n[1]}}),{c(){e=b("div"),t=b("header"),B(r.$$.fragment),a=C(),B(o.$$.fragment),l=C(),s=b("table"),m=b("thead"),u=b("tr"),B(g.$$.fragment),p=C(),B(i.$$.fragment),h=C(),B(c.$$.fragment),G=C(),B(y.$$.fragment),W=C(),v=b("tr"),B(_.$$.fragment),X=C(),B(H.$$.fragment),Z=C(),B(N.$$.fragment),oe=C(),B(Y.$$.fragment),ie=C(),x=b("tbody");for(let f=0;f<F.length;f+=1)F[f].c();fe=C(),M=b("footer"),B(J.$$.fragment),me=C(),B(K.$$.fragment),this.h()},l(f){e=R(f,"DIV",{class:!0});var P=T(e);t=R(P,"HEADER",{class:!0});var j=T(t);k(r.$$.fragment,j),a=D(j),k(o.$$.fragment,j),j.forEach($),l=D(P),s=R(P,"TABLE",{class:!0});var Q=T(s);m=R(Q,"THEAD",{});var U=T(m);u=R(U,"TR",{});var z=T(u);k(g.$$.fragment,z),p=D(z),k(i.$$.fragment,z),h=D(z),k(c.$$.fragment,z),G=D(z),k(y.$$.fragment,z),z.forEach($),W=D(U),v=R(U,"TR",{});var w=T(v);k(_.$$.fragment,w),X=D(w),k(H.$$.fragment,w),Z=D(w),k(N.$$.fragment,w),oe=D(w),k(Y.$$.fragment,w),w.forEach($),U.forEach($),ie=D(Q),x=R(Q,"TBODY",{});var te=T(x);for(let ce=0;ce<F.length;ce+=1)F[ce].l(te);te.forEach($),Q.forEach($),fe=D(P),M=R(P,"FOOTER",{class:!0});var ae=T(M);k(J.$$.fragment,ae),me=D(ae),k(K.$$.fragment,ae),ae.forEach($),P.forEach($),this.h()},h(){O(t,"class","flex justify-between gap-4"),O(s,"class","table table-hover table-compact w-full table-auto"),O(M,"class","flex justify-between"),O(e,"class","overflow-x-auto space-y-4")},m(f,P){A(f,e,P),d(e,t),I(r,t,null),d(t,a),I(o,t,null),d(e,l),d(e,s),d(s,m),d(m,u),I(g,u,null),d(u,p),I(i,u,null),d(u,h),I(c,u,null),d(u,G),I(y,u,null),d(m,W),d(m,v),I(_,v,null),d(v,X),I(H,v,null),d(v,Z),I(N,v,null),d(v,oe),I(Y,v,null),d(s,ie),d(s,x);for(let j=0;j<F.length;j+=1)F[j]&&F[j].m(x,null);d(e,fe),d(e,M),I(J,M,null),d(M,me),I(K,M,null),re=!0},p(f,[P]){const j={};P&128&&(j.$$scope={dirty:P,ctx:f}),g.$set(j);const Q={};P&128&&(Q.$$scope={dirty:P,ctx:f}),i.$set(Q);const U={};P&128&&(U.$$scope={dirty:P,ctx:f}),c.$set(U);const z={};if(P&128&&(z.$$scope={dirty:P,ctx:f}),y.$set(z),P&1){ee=ve(f[0]);let w;for(w=0;w<ee.length;w+=1){const te=Ee(f,ee,w);F[w]?F[w].p(te,P):(F[w]=be(te),F[w].c(),F[w].m(x,null))}for(;w<F.length;w+=1)F[w].d(1);F.length=ee.length}},i(f){re||(E(r.$$.fragment,f),E(o.$$.fragment,f),E(g.$$.fragment,f),E(i.$$.fragment,f),E(c.$$.fragment,f),E(y.$$.fragment,f),E(_.$$.fragment,f),E(H.$$.fragment,f),E(N.$$.fragment,f),E(Y.$$.fragment,f),E(J.$$.fragment,f),E(K.$$.fragment,f),re=!0)},o(f){S(r.$$.fragment,f),S(o.$$.fragment,f),S(g.$$.fragment,f),S(i.$$.fragment,f),S(c.$$.fragment,f),S(y.$$.fragment,f),S(_.$$.fragment,f),S(H.$$.fragment,f),S(N.$$.fragment,f),S(Y.$$.fragment,f),S(J.$$.fragment,f),S(K.$$.fragment,f),re=!1},d(f){f&&$(e),L(r),L(o),L(g),L(i),L(c),L(y),L(_),L(H),L(N),L(Y),Se(F,f),L(J),L(K)}}}function Je(n,e,t){let r,{comparisonResults:a}=e,o=new Oe(a,{rowsPerPage:5}),l=o.getRows();return ue(n,l,s=>t(0,r=s)),n.$$set=s=>{"comparisonResults"in s&&t(3,a=s.comparisonResults)},n.$$.update=()=>{n.$$.dirty&8&&a&&o.setRows(a)},[r,o,l,a]}class Ke extends he{constructor(e){super(),ge(this,e,Je,Ye,de,{comparisonResults:3})}}function Re(n){let e,t;return e=new Ke({props:{comparisonResults:n[1]}}),{c(){B(e.$$.fragment)},l(r){k(e.$$.fragment,r)},m(r,a){I(e,r,a),t=!0},p(r,a){const o={};a&2&&(o.comparisonResults=r[1]),e.$set(o)},i(r){t||(E(e.$$.fragment,r),t=!0)},o(r){S(e.$$.fragment,r),t=!1},d(r){L(e,r)}}}function Qe(n){let e,t,r,a,o;t=new Ne({props:{comparisonResults:n[0],filterData:n[2],filename:"log2FC"}});let l=n[1].length>0&&Re(n);return{c(){e=b("div"),B(t.$$.fragment),r=C(),a=b("div"),l&&l.c(),this.h()},l(s){e=R(s,"DIV",{class:!0});var m=T(e);k(t.$$.fragment,m),m.forEach($),r=D(s),a=R(s,"DIV",{class:!0});var u=T(a);l&&l.l(u),u.forEach($),this.h()},h(){O(e,"class","m-4"),O(a,"class","m-4")},m(s,m){A(s,e,m),I(t,e,null),A(s,r,m),A(s,a,m),l&&l.m(a,null),o=!0},p(s,[m]){const u={};m&1&&(u.comparisonResults=s[0]),t.$set(u),s[1].length>0?l?(l.p(s,m),m&2&&E(l,1)):(l=Re(s),l.c(),E(l,1),l.m(a,null)):l&&(ye(),S(l,1,1,()=>{l=null}),Ce())},i(s){o||(E(t.$$.fragment,s),E(l),o=!0)},o(s){S(t.$$.fragment,s),S(l),o=!1},d(s){s&&($(e),$(r),$(a)),L(t),l&&l.d()}}}function Ue(n,e,t){let r,a;ue(n,Be,i=>t(5,r=i)),ue(n,Fe,i=>t(6,a=i));let o=[],l=[],s=[],m=[];const u=Array.from(a.entries());o=u.filter(([i,h])=>i.toLowerCase().includes("0")).map(([i,h])=>h.total),l=u.filter(([i,h])=>!i.toLowerCase().includes("0")).map(([i,h])=>h.total);async function g(){const i=await Promise.all(o.map(c=>pe(r.features,c,[],0,0))),h=await Promise.all(l.map(c=>pe(r.features,c,[],0,0)));t(0,s=await ze(i,h)),t(1,m=[...s])}const p=i=>{if(i.length===0){t(1,m=s);return}t(1,m=s.filter(h=>i.includes(h.name)))};return n.$$.update=()=>{n.$$.dirty&24&&o.length&&l.length&&g()},[s,m,p,o,l]}class ot extends he{constructor(e){super(),ge(this,e,Ue,Qe,de,{})}}export{ot as component};
