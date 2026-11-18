const fs=require('fs'),assert=require('assert');let messages=[];const src=fs.readFileSync(require('path').join(__dirname,'../worker.js'),'utf8');const run=new Function('postMessage','let onmessage;'+src+';return onmessage;')(m=>messages.push(m));let version=0;function gen(s){messages=[];run({data:{type:'generate',s,version:++version}});let m=messages[0];assert.equal(m.type,'generated');for(let c of m.counts)assert.equal(c.reduce((a,b)=>a+b),m.total);return m;}const base={w:32,h:24,d:36,shape:'ellipsoid',fill:'hollow',thick:1,tube:30,cap:false,orient:[1,2,3]};let full=gen(base);let rot=gen({...base,orient:[1,-3,2]});assert.equal(rot.total,full.total);assert.deepEqual(rot.dims,[32,36,24]);let half=gen({...base,shape:'half-ellipsoid'});assert.equal(half.total*2,full.total);let cap=gen({...base,shape:'half-ellipsoid',cap:true});assert(cap.total>half.total);let thick=gen({...base,thick:2});assert(thick.total>full.total);let solid=gen({...base,fill:'solid'});assert(solid.total>thick.total);for(let shape of ['sphere','ellipsoid','half-ellipsoid','half-sphere','torus','half-torus','cylinder','ellipse','circle']){let m=gen({...base,shape,h:['ellipse','circle'].includes(shape)?1:24});assert(m.total>0);messages=[];run({data:{type:'mesh',version,request:1,axis:1,layer:5,start:0,mode:'single'}});let mesh=messages[0];assert.equal(mesh.visible,m.counts[1][5]||0);assert(mesh.vertices.every(Number.isFinite));}
console.time('256 solid generation');let large=gen({...base,w:256,h:256,d:256,shape:'sphere',fill:'solid'});console.timeEnd('256 solid generation');console.time('256 surface mesh');messages=[];run({data:{type:'mesh',version,request:1,axis:1,layer:128,start:0,mode:'all'}});console.timeEnd('256 surface mesh');assert.equal(messages[0].visible,large.total);console.log('All checks passed. Max sphere blocks:',large.total,'mesh MB:',messages[0].vertices.byteLength/1e6);

for(let cut=0;cut<3;cut++){
 const config={...base,shape:'half-ellipsoid',cut};
 const open=gen(config); const capped=gen({...config,cap:true}); const filled=gen({...config,fill:'solid'});
 const plane=Math.floor([base.w,base.h,base.d][cut]/2);
 assert.equal(capped.counts[cut][plane],filled.counts[cut][plane]);
 assert(capped.counts[cut][plane]>open.counts[cut][plane]);
 for(let i=plane+1;i<capped.counts[cut].length;i++)assert.equal(capped.counts[cut][i],open.counts[cut][i]);
 const flipped=gen({...config,orient:cut===0?[-1,2,3]:cut===1?[1,-2,3]:[1,2,-3]});
 assert.equal(flipped.total,open.total);
 assert.equal(flipped.bounds[cut][0],0);
 assert.equal(flipped.bounds[cut][1],plane-1);
}
console.log('Cut faces, caps, flips, and occupied bounds passed.');
