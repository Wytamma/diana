import{d as p,w as h}from"./index.Ccku256h.js";function w(){const{subscribe:o,set:a,update:s}=h(new Map);return{subscribe:o,set:a,update:s,reset:()=>a(new Map),load:async(t,n)=>{const e=await T(n);t.toLowerCase().includes("0")||(e.isTreatment=!0),s(r=>(r.set(t,e),r))},remove:t=>s(n=>(n.delete(t),n)),setIsTreatment:(t,n)=>s(e=>{const r=e.get(t);return r&&(r.isTreatment=n),e}),containsControlAndTreatment:()=>{let t=!1,n=!1;return o(e=>{e.forEach(r=>{console.log(r.isTreatment),r.isTreatment?t=!0:n=!0})}),t&&n}}}async function T(o,a=5e4){const s=o.split(`
`),t=[],n={wig:"",total:[],isTreatment:!1};t.push("track type=wiggle_0 visibility=full autoScale=on color=255,150,0 yLineMark=0 yLineOnOff=on"),t.push("variableStep chrom=chrom span=2");for(let e=0;e<s.length;e+=a)s.slice(e,e+a).forEach((l,u)=>{const[c,f]=l.split(/\s+/).map(m=>parseInt(m,10));let i=f;isNaN(i)&&(i=0),n.total.push(c+i),c!==0&&t.push(`${e+u} ${c}`),i!==0&&t.push(`${e+u} -${i}`)}),await new Promise(l=>setTimeout(l,0));return n.wig=t.join(`
`),n}const d=w(),y=p(d,o=>{let a=!1,s=!1;return o.forEach(t=>{t.isTreatment?a=!0:s=!0}),a&&s});export{y as c,d as i};