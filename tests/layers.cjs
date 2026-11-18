const fs=require('fs'),path=require('path'),assert=require('assert');
const source=fs.readFileSync(path.join(__dirname,'../layers.js'),'utf8').replaceAll('export ','');
const {layerDomain,layerIndex}=new Function(source+';return {layerDomain,layerIndex}')();
let messages=[];const run=new Function('postMessage','let onmessage;'+fs.readFileSync(path.join(__dirname,'../worker.js'),'utf8')+';return onmessage;')(m=>messages.push(m));let version=0,cases=0;
for(const h of [15,16,30,61])for(const cut of [0,1,2])for(const orient of [[1,2,3],[1,-2,3],[-3,1,2],[2,-1,-3]])for(const cap of [false,true]){
const s={shape:'half-ellipsoid',w:21,h,d:25,thick:1,tube:30,fill:'hollow',cap,cut,orient};messages=[];run({data:{type:'generate',version:++version,s}});const g=messages[0];
for(let axis=0;axis<3;axis++){
const domain=layerDomain(g.bounds,axis);let sum=0;
for(let display=1;display<=domain.length;display++){
const index=layerIndex(g.bounds,axis,display);assert(g.counts[axis][index]>0,'No phantom empty layers');sum+=g.counts[axis][index];
messages=[];run({data:{type:'layer',version,request:1,axis,layer:index}});assert.equal(messages[0].grids[1].reduce((a,b)=>a+b),g.counts[axis][index]);
if(display===1||display===domain.length){messages=[];run({data:{type:'mesh',version,request:2,axis,layer:index,start:domain.first,mode:'single'}});assert.equal(messages[0].visible,g.counts[axis][index]);}
}
assert.equal(sum,g.total);
messages=[];run({data:{type:'mesh',version,request:3,axis,layer:layerIndex(g.bounds,axis,domain.length),start:layerIndex(g.bounds,axis,1),mode:'range'}});assert.equal(messages[0].visible,g.total);
const half=Math.ceil(domain.length/2);messages=[];run({data:{type:'mesh',version,request:4,axis,layer:layerIndex(g.bounds,axis,half),start:domain.first,mode:'upto'}});assert.equal(messages[0].visible,g.counts[axis].slice(domain.first,domain.first+half).reduce((a,b)=>a+b));
cases++;
}}
console.log(`${cases} layer-domain checks passed: odd/even dimensions, cuts, flips, rotations, caps, 2D/3D, ranges and half views.`);
