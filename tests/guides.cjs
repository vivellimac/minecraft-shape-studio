const fs=require('fs'),assert=require('assert'),path=require('path');
const source=fs.readFileSync(path.join(__dirname,'../guides.js'),'utf8').replaceAll('export ','');
const {guideKind,planeAxes}=new Function(source+';return {guideKind,planeAxes}')();
assert.equal(guideKind(0,7,true,false),1);
assert.equal(guideKind(7,0,true,false),1);
assert.equal(guideKind(5,5,false,true),2);
assert.equal(guideKind(5,-5,false,true),2);
assert.equal(guideKind(0,0,true,true),3);
assert.equal(guideKind(2,5,true,true),0);
assert.equal(guideKind(0,0,false,false),0);
assert.equal(guideKind(.5,7.5,true,false),1);
assert.equal(guideKind(-.5,7.5,true,false),1);
assert.equal(guideKind(5,5.5,false,true),2);
assert.equal(guideKind(5,6.5,false,true),0);
for(const [w,h] of [[21,21],[20,20],[21,20],[256,128]])for(let u=0;u<w;u++)for(let v=0;v<h;v++){
 const x=u+.5-w/2,y=v+.5-h/2;
 assert.equal(guideKind(x,y,true,true),guideKind(-x,y,true,true));
 assert.equal(guideKind(x,y,true,true),guideKind(y,x,true,true));
}
assert.deepEqual(planeAxes(0),[2,1]);assert.deepEqual(planeAxes(1),[0,2]);assert.deepEqual(planeAxes(2),[0,1]);
console.log('Guide symmetry, even/odd centers, true 45° diagonals, and slice planes passed.');
