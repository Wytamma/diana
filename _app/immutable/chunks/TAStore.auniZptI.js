import{B as F,c as u}from"./annotationStore.CSH3VeDA.js";import{d as L,w as T}from"./index.Ccku256h.js";function v(i){const c=[];return i.forEach((s,d)=>{s.forEach(l=>{const p=l+2,t=`${d}	${l}	${p}`;c.push(t)})}),c.join(`
`)}function A(){const i={raw:new Map},{subscribe:c,set:s,update:d}=T(i);return{subscribe:c,set:s,update:d,reset:()=>s(i),load:async l=>{const p=l.split(`
`);let t="",n="";const b=new Map;for(const a of p)a.startsWith(">")?(t&&n&&b.set(t,n),t=a.substring(1).split(/\s+/)[0].trim(),n=""):n+=a.trim();t&&n&&b.set(t,n);const w=new Map;b.forEach((a,S)=>{const f=[];for(let r=0;r<a.length-1;r++)a[r]==="T"&&a[r+1]==="A"&&f.push(r);w.set(S,f)});const g=v(w),e=await new F([{tool:"tabix",version:"1.17",urlPrefix:`${window.location.origin}./tools/tabix`},{tool:"bgzip",version:"1.17",urlPrefix:`${window.location.origin}./tools/bgzip`}]),o=await e.mount([{name:"data.bed",data:g}]);await e.exec(`bgzip ${o[0]}`),await e.exec(`tabix -p bed ${o[0]}.gz`);const $=await e.fs.stat(`${o[0]}.gz`),h=await e.read({path:`${o[0]}.gz`,length:$.size}),z=u(h),x=await e.fs.stat(`${o[0]}.gz.tbi`),m=await e.read({path:`${o[0]}.gz.tbi`,length:x.size}),M=u(m);s({raw:w,url:z,indexUrl:M})}}}const B=A();L(B,i=>i);export{B as t};