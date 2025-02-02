import{s as qe,e as k,t as O,a as g,c as B,b as D,d as j,f as h,g as p,m as H,i as X,h as l,Q as Ve,j as he,n as Ie,k as Fe,J as Qe,l as We}from"../chunks/DfgCqy7z.js";import{S as He,i as Oe,b as A,d as P,m as F,t as w,g as Ye,c as ze,a as T,e as I}from"../chunks/P-XqeZIV.js";import{e as Le}from"../chunks/DvuRD1Iq.js";import{S as Xe,D as Ze,T as Ee,a as Te,R as xe,b as et,P as tt,c as nt}from"../chunks/Dn8e9DGT.js";import{a as Re}from"../chunks/8Ozl1p9l.js";function rt(n){let e,t,r,$,s,i=Ce(n[2],n[0])+"",o,v,u;return{c(){e=k("button"),t=k("span"),r=O(n[1]),$=g(),s=k("span"),o=O(i),this.h()},l(E){e=B(E,"BUTTON",{class:!0});var R=D(e);t=B(R,"SPAN",{class:!0});var _=D(t);r=j(_,n[1]),_.forEach(h),$=p(R),s=B(R,"SPAN",{class:!0});var z=D(s);o=j(z,i),z.forEach(h),R.forEach(h),this.h()},h(){H(t,"class","font-semibold bg-surface-500 px-1 py-1"),H(s,"class","px-1 py-1 mr-1"),H(e,"class","inline-flex items-center rounded m-1 overflow-hidden border border-surface-200 [&>*]:pointer-events-none")},m(E,R){X(E,e,R),l(e,t),l(t,r),l(e,$),l(e,s),l(s,o),v||(u=Ve(e,"click",n[3]),v=!0)},p(E,[R]){R&2&&he(r,E[1]),R&5&&i!==(i=Ce(E[2],E[0])+"")&&he(o,i)},i:Ie,o:Ie,d(E){E&&h(e),v=!1,u()}}}function Ce(n,e){return n.length>e?n.substring(0,e)+"...":n}function at(n,e,t){let{keyName:r}=e,{value:$}=e,{maxLength:s=15}=e;function i(){s===$.length?t(0,s=15):t(0,s=$.length)}return n.$$set=o=>{"keyName"in o&&t(1,r=o.keyName),"value"in o&&t(2,$=o.value),"maxLength"in o&&t(0,s=o.maxLength)},[s,r,$,i]}class lt extends He{constructor(e){super(),Oe(this,e,at,rt,qe,{keyName:1,value:2,maxLength:0})}}function st(n){let e,t,r,$;return{c(){e=k("th"),t=k("input"),this.h()},l(s){e=B(s,"TH",{class:!0});var i=D(e);t=B(i,"INPUT",{type:!0,class:!0}),i.forEach(h),this.h()},h(){H(t,"type","checkbox"),H(t,"class","checkbox"),t.checked=n[0],H(e,"class","cursor-pointer select-none text-center")},m(s,i){X(s,e,i),l(e,t),r||($=Ve(e,"click",n[3]),r=!0)},p(s,[i]){i&1&&(t.checked=s[0])},i:Ie,o:Ie,d(s){s&&h(e),r=!1,$()}}}function ot(n,e,t){let r,$,{handler:s}=e;const i=s.isAllSelected();Fe(n,i,u=>t(0,$=u));const o=s.getSelected();Fe(n,o,u=>t(5,r=u));function v(){s.selectAll({selectBy:"_id"}),Re.setFilteredFeatures(r)}return n.$$set=u=>{"handler"in u&&t(4,s=u.handler)},[$,i,o,v,s]}class ft extends He{constructor(e){super(),Oe(this,e,ot,st,qe,{handler:4})}}function Ue(n,e,t){const r=n.slice();return r[9]=e[t],r}function Me(n,e,t){const r=n.slice();return r[12]=e[t][0],r[13]=e[t][1],r}function ut(n){let e;return{c(){e=O("Seqname")},l(t){e=j(t,"Seqname")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function $t(n){let e;return{c(){e=O("Name")},l(t){e=j(t,"Name")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function ht(n){let e;return{c(){e=O("Type")},l(t){e=j(t,"Type")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function it(n){let e;return{c(){e=O("Start")},l(t){e=j(t,"Start")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function ct(n){let e;return{c(){e=O("End")},l(t){e=j(t,"End")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function dt(n){let e;return{c(){e=O("Strand")},l(t){e=j(t,"Strand")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function mt(n){let e;return{c(){e=O("Attributes")},l(t){e=j(t,"Attributes")},m(t,r){X(t,e,r)},d(t){t&&h(e)}}}function Ge(n){let e,t;return e=new lt({props:{keyName:n[12],value:n[13]?n[13]:"",maxLength:15}}),{c(){A(e.$$.fragment)},l(r){P(e.$$.fragment,r)},m(r,$){F(e,r,$),t=!0},p(r,$){const s={};$&2&&(s.keyName=r[12]),$&2&&(s.value=r[13]?r[13]:""),e.$set(s)},i(r){t||(w(e.$$.fragment,r),t=!0)},o(r){T(e.$$.fragment,r),t=!1},d(r){I(e,r)}}}function Je(n){let e,t,r,$,s,i,o=n[9].seqId+"",v,u,E,R=n[9].attributes.Name+"",_,z,C,le=n[9].type+"",G,ce,U,se=n[9].start+"",J,de,M,oe=n[9].stop+"",Q,me,S,K=n[9].strand+"",ne,ie,Z,x,V,ee,ke;function fe(){return n[6](n[9])}let te=Le(Object.entries(n[9].attributes)),d=[];for(let b=0;b<te.length;b+=1)d[b]=Ge(Me(n,te,b));const De=b=>T(d[b],1,1,()=>{d[b]=null});return{c(){e=k("tr"),t=k("td"),r=k("input"),s=g(),i=k("td"),v=O(o),u=g(),E=k("td"),_=O(R),z=g(),C=k("td"),G=O(le),ce=g(),U=k("td"),J=O(se),de=g(),M=k("td"),Q=O(oe),me=g(),S=k("td"),ne=O(K),ie=g(),Z=k("td");for(let b=0;b<d.length;b+=1)d[b].c();x=g(),this.h()},l(b){e=B(b,"TR",{class:!0});var f=D(e);t=B(f,"TD",{});var m=D(t);r=B(m,"INPUT",{class:!0,type:!0}),m.forEach(h),s=p(f),i=B(f,"TD",{});var ue=D(i);v=j(ue,o),ue.forEach(h),u=p(f),E=B(f,"TD",{});var re=D(E);_=j(re,R),re.forEach(h),z=p(f),C=B(f,"TD",{});var Be=D(C);G=j(Be,le),Be.forEach(h),ce=p(f),U=B(f,"TD",{});var $e=D(U);J=j($e,se),$e.forEach(h),de=p(f),M=B(f,"TD",{});var Se=D(M);Q=j(Se,oe),Se.forEach(h),me=p(f),S=B(f,"TD",{});var Y=D(S);ne=j(Y,K),Y.forEach(h),ie=p(f),Z=B(f,"TD",{class:!0});var ae=D(Z);for(let ge=0;ge<d.length;ge+=1)d[ge].l(ae);ae.forEach(h),x=p(f),f.forEach(h),this.h()},h(){H(r,"class","checkbox"),H(r,"type","checkbox"),r.checked=$=n[0].includes(n[9]._id),H(Z,"class","text-left"),H(e,"class","text-center")},m(b,f){X(b,e,f),l(e,t),l(t,r),l(e,s),l(e,i),l(i,v),l(e,u),l(e,E),l(E,_),l(e,z),l(e,C),l(C,G),l(e,ce),l(e,U),l(U,J),l(e,de),l(e,M),l(M,Q),l(e,me),l(e,S),l(S,ne),l(e,ie),l(e,Z);for(let m=0;m<d.length;m+=1)d[m]&&d[m].m(Z,null);l(e,x),V=!0,ee||(ke=Ve(r,"click",fe),ee=!0)},p(b,f){if(n=b,(!V||f&3&&$!==($=n[0].includes(n[9]._id)))&&(r.checked=$),(!V||f&2)&&o!==(o=n[9].seqId+"")&&he(v,o),(!V||f&2)&&R!==(R=n[9].attributes.Name+"")&&he(_,R),(!V||f&2)&&le!==(le=n[9].type+"")&&he(G,le),(!V||f&2)&&se!==(se=n[9].start+"")&&he(J,se),(!V||f&2)&&oe!==(oe=n[9].stop+"")&&he(Q,oe),(!V||f&2)&&K!==(K=n[9].strand+"")&&he(ne,K),f&2){te=Le(Object.entries(n[9].attributes));let m;for(m=0;m<te.length;m+=1){const ue=Me(n,te,m);d[m]?(d[m].p(ue,f),w(d[m],1)):(d[m]=Ge(ue),d[m].c(),w(d[m],1),d[m].m(Z,null))}for(Ye(),m=te.length;m<d.length;m+=1)De(m);ze()}},i(b){if(!V){for(let f=0;f<te.length;f+=1)w(d[f]);V=!0}},o(b){d=d.filter(Boolean);for(let f=0;f<d.length;f+=1)T(d[f]);V=!1},d(b){b&&h(e),Qe(d,b),ee=!1,ke()}}}function gt(n){let e,t,r,$,s,i,o,v,u,E,R,_,z,C,le,G,ce,U,se,J,de,M,oe,Q,me,S,K,ne=n[0].length+"",ie,Z,x,V,ee,ke,fe,te,d,De,b,f,m,ue,re,Be,$e,Se,Y,ae,ge,pe,je,_e,Ne;r=new Xe({props:{handler:n[2]}}),s=new Ze({props:{handler:n[2]}}),E=new ft({props:{handler:n[2]}}),_=new Ee({props:{handler:n[2],orderBy:"seqId",$$slots:{default:[ut]},$$scope:{ctx:n}}}),C=new Ee({props:{handler:n[2],orderBy:"attributes",$$slots:{default:[$t]},$$scope:{ctx:n}}}),G=new Ee({props:{handler:n[2],orderBy:"type",$$slots:{default:[ht]},$$scope:{ctx:n}}}),U=new Ee({props:{handler:n[2],orderBy:"start",$$slots:{default:[it]},$$scope:{ctx:n}}}),J=new Ee({props:{handler:n[2],orderBy:"end",$$slots:{default:[ct]},$$scope:{ctx:n}}}),M=new Ee({props:{handler:n[2],orderBy:"strand",$$slots:{default:[dt]},$$scope:{ctx:n}}}),Q=new Ee({props:{handler:n[2],orderBy:"attributes",$$slots:{default:[mt]},$$scope:{ctx:n}}}),x=new Te({props:{handler:n[2],filterBy:"seqId"}}),ee=new Te({props:{handler:n[2],filterBy:"attributes"}}),fe=new Te({props:{handler:n[2],filterBy:"type"}}),d=new Te({props:{handler:n[2],filterBy:"start"}}),b=new Te({props:{handler:n[2],filterBy:"end"}}),m=new Te({props:{handler:n[2],filterBy:"strand"}}),re=new Te({props:{handler:n[2],filterBy:"attributes"}});let be=Le(n[1]),y=[];for(let a=0;a<be.length;a+=1)y[a]=Je(Ue(n,be,a));const Ke=a=>T(y[a],1,1,()=>{y[a]=null});return ae=new xe({props:{handler:n[2]}}),pe=new et({props:{handler:n[2]}}),_e=new tt({props:{handler:n[2]}}),{c(){e=k("div"),t=k("header"),A(r.$$.fragment),$=g(),A(s.$$.fragment),i=g(),o=k("table"),v=k("thead"),u=k("tr"),A(E.$$.fragment),R=g(),A(_.$$.fragment),z=g(),A(C.$$.fragment),le=g(),A(G.$$.fragment),ce=g(),A(U.$$.fragment),se=g(),A(J.$$.fragment),de=g(),A(M.$$.fragment),oe=g(),A(Q.$$.fragment),me=g(),S=k("tr"),K=k("th"),ie=O(ne),Z=g(),A(x.$$.fragment),V=g(),A(ee.$$.fragment),ke=g(),A(fe.$$.fragment),te=g(),A(d.$$.fragment),De=g(),A(b.$$.fragment),f=g(),A(m.$$.fragment),ue=g(),A(re.$$.fragment),Be=g(),$e=k("tbody");for(let a=0;a<y.length;a+=1)y[a].c();Se=g(),Y=k("footer"),A(ae.$$.fragment),ge=g(),A(pe.$$.fragment),je=g(),A(_e.$$.fragment),this.h()},l(a){e=B(a,"DIV",{class:!0});var c=D(e);t=B(c,"HEADER",{class:!0});var W=D(t);P(r.$$.fragment,W),$=p(W),P(s.$$.fragment,W),W.forEach(h),i=p(c),o=B(c,"TABLE",{class:!0});var ve=D(o);v=B(ve,"THEAD",{});var we=D(v);u=B(we,"TR",{});var L=D(u);P(E.$$.fragment,L),R=p(L),P(_.$$.fragment,L),z=p(L),P(C.$$.fragment,L),le=p(L),P(G.$$.fragment,L),ce=p(L),P(U.$$.fragment,L),se=p(L),P(J.$$.fragment,L),de=p(L),P(M.$$.fragment,L),oe=p(L),P(Q.$$.fragment,L),L.forEach(h),me=p(we),S=B(we,"TR",{});var q=D(S);K=B(q,"TH",{class:!0});var Ae=D(K);ie=j(Ae,ne),Ae.forEach(h),Z=p(q),P(x.$$.fragment,q),V=p(q),P(ee.$$.fragment,q),ke=p(q),P(fe.$$.fragment,q),te=p(q),P(d.$$.fragment,q),De=p(q),P(b.$$.fragment,q),f=p(q),P(m.$$.fragment,q),ue=p(q),P(re.$$.fragment,q),q.forEach(h),we.forEach(h),Be=p(ve),$e=B(ve,"TBODY",{});var Pe=D($e);for(let ye=0;ye<y.length;ye+=1)y[ye].l(Pe);Pe.forEach(h),ve.forEach(h),Se=p(c),Y=B(c,"FOOTER",{class:!0});var N=D(Y);P(ae.$$.fragment,N),ge=p(N),P(pe.$$.fragment,N),je=p(N),P(_e.$$.fragment,N),N.forEach(h),c.forEach(h),this.h()},h(){H(t,"class","flex justify-between gap-4"),H(K,"class","text-center"),H(o,"class","table table-hover table-compact w-full table-auto"),H(Y,"class","flex justify-between"),H(e,"class","overflow-x-auto space-y-4")},m(a,c){X(a,e,c),l(e,t),F(r,t,null),l(t,$),F(s,t,null),l(e,i),l(e,o),l(o,v),l(v,u),F(E,u,null),l(u,R),F(_,u,null),l(u,z),F(C,u,null),l(u,le),F(G,u,null),l(u,ce),F(U,u,null),l(u,se),F(J,u,null),l(u,de),F(M,u,null),l(u,oe),F(Q,u,null),l(v,me),l(v,S),l(S,K),l(K,ie),l(S,Z),F(x,S,null),l(S,V),F(ee,S,null),l(S,ke),F(fe,S,null),l(S,te),F(d,S,null),l(S,De),F(b,S,null),l(S,f),F(m,S,null),l(S,ue),F(re,S,null),l(o,Be),l(o,$e);for(let W=0;W<y.length;W+=1)y[W]&&y[W].m($e,null);l(e,Se),l(e,Y),F(ae,Y,null),l(Y,ge),F(pe,Y,null),l(Y,je),F(_e,Y,null),Ne=!0},p(a,[c]){const W={};c&65536&&(W.$$scope={dirty:c,ctx:a}),_.$set(W);const ve={};c&65536&&(ve.$$scope={dirty:c,ctx:a}),C.$set(ve);const we={};c&65536&&(we.$$scope={dirty:c,ctx:a}),G.$set(we);const L={};c&65536&&(L.$$scope={dirty:c,ctx:a}),U.$set(L);const q={};c&65536&&(q.$$scope={dirty:c,ctx:a}),J.$set(q);const Ae={};c&65536&&(Ae.$$scope={dirty:c,ctx:a}),M.$set(Ae);const Pe={};if(c&65536&&(Pe.$$scope={dirty:c,ctx:a}),Q.$set(Pe),(!Ne||c&1)&&ne!==(ne=a[0].length+"")&&he(ie,ne),c&35){be=Le(a[1]);let N;for(N=0;N<be.length;N+=1){const ye=Ue(a,be,N);y[N]?(y[N].p(ye,c),w(y[N],1)):(y[N]=Je(ye),y[N].c(),w(y[N],1),y[N].m($e,null))}for(Ye(),N=be.length;N<y.length;N+=1)Ke(N);ze()}},i(a){if(!Ne){w(r.$$.fragment,a),w(s.$$.fragment,a),w(E.$$.fragment,a),w(_.$$.fragment,a),w(C.$$.fragment,a),w(G.$$.fragment,a),w(U.$$.fragment,a),w(J.$$.fragment,a),w(M.$$.fragment,a),w(Q.$$.fragment,a),w(x.$$.fragment,a),w(ee.$$.fragment,a),w(fe.$$.fragment,a),w(d.$$.fragment,a),w(b.$$.fragment,a),w(m.$$.fragment,a),w(re.$$.fragment,a);for(let c=0;c<be.length;c+=1)w(y[c]);w(ae.$$.fragment,a),w(pe.$$.fragment,a),w(_e.$$.fragment,a),Ne=!0}},o(a){T(r.$$.fragment,a),T(s.$$.fragment,a),T(E.$$.fragment,a),T(_.$$.fragment,a),T(C.$$.fragment,a),T(G.$$.fragment,a),T(U.$$.fragment,a),T(J.$$.fragment,a),T(M.$$.fragment,a),T(Q.$$.fragment,a),T(x.$$.fragment,a),T(ee.$$.fragment,a),T(fe.$$.fragment,a),T(d.$$.fragment,a),T(b.$$.fragment,a),T(m.$$.fragment,a),T(re.$$.fragment,a),y=y.filter(Boolean);for(let c=0;c<y.length;c+=1)T(y[c]);T(ae.$$.fragment,a),T(pe.$$.fragment,a),T(_e.$$.fragment,a),Ne=!1},d(a){a&&h(e),I(r),I(s),I(E),I(_),I(C),I(G),I(U),I(J),I(M),I(Q),I(x),I(ee),I(fe),I(d),I(b),I(m),I(re),Qe(y,a),I(ae),I(pe),I(_e)}}}function pt(n,e,t){let r,$,s;Fe(n,Re,_=>t(7,$=_));const i=$.features,o=new nt(i,{rowsPerPage:5}),v=o.getRows();Fe(n,v,_=>t(1,s=_));const u=o.getSelected();Fe(n,u,_=>t(0,r=_)),o.on("change",()=>{u.set($.filteredFeatures.map(_=>_._id))}),Re.subscribe(_=>{u.set(_.filteredFeatures.map(z=>z._id))});function E(_){o.select(_),Re.setFilteredFeatures(r)}return[r,s,o,v,u,E,_=>E(_._id)]}class _t extends He{constructor(e){super(),Oe(this,e,pt,gt,qe,{})}}function bt(n){let e,t,r='<h1 class="h1 mb-1">Features &amp; annotations</h1> <p>Explore and filter the features and annotations that will be used for downstream analysis.</p>',$,s,i;return s=new _t({}),{c(){e=k("div"),t=k("div"),t.innerHTML=r,$=g(),A(s.$$.fragment),this.h()},l(o){e=B(o,"DIV",{class:!0});var v=D(e);t=B(v,"DIV",{class:!0,"data-svelte-h":!0}),We(t)!=="svelte-1fc3wog"&&(t.innerHTML=r),$=p(v),P(s.$$.fragment,v),v.forEach(h),this.h()},h(){H(t,"class","mb-4"),H(e,"class","m-4")},m(o,v){X(o,e,v),l(e,t),l(e,$),F(s,e,null),i=!0},p:Ie,i(o){i||(w(s.$$.fragment,o),i=!0)},o(o){T(s.$$.fragment,o),i=!1},d(o){o&&h(e),I(s)}}}class Bt extends He{constructor(e){super(),Oe(this,e,null,bt,qe,{})}}export{Bt as component};
