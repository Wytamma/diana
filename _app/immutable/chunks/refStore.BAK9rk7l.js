import{w as x}from"./index.Ccku256h.js";import{B as p,c as i}from"./aioli.BDahayWZ.js";function h(){const e={text:void 0,url:void 0,indexUrl:void 0,name:void 0},{subscribe:o,set:t,update:n}=x(e);return{subscribe:o,set:t,update:n,reset:()=>t(e),load:async(f,s)=>{const a=await new p(["samtools/1.17"]),r=await a.mount([{name:"fasta.fa",data:s}]);await a.exec(`samtools faidx --output fasta.fa --fai-idx fasta.fai ${r[0]}`);const c=await a.fs.stat("fasta.fa"),d=await a.read({path:"fasta.fa",length:c.size}),l=i(d),u=await a.fs.stat("fasta.fai"),w=await a.read({path:"fasta.fai",length:u.size}),m=i(w);t({name:f,text:s,url:l,indexUrl:m})}}}const F=h();export{F as r};