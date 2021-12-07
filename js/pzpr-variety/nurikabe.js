/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["nurikabe","nuribou","mochikoro","mochinyoro"],{MouseEvent:{use:!0,inputModes:{edit:["number","clear"],play:["shade","unshade"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&this.inputqnum()}},"MouseEvent@nurikabe":{inputModes:{edit:["number","clear","info-blk"],play:["shade","unshade","info-blk"]}},KeyEvent:{enablemake:!0},Cell:{numberRemainsUnshaded:!0},"Cell@mochikoro,mochinyoro":{getdir8clist:function(){for(var a=[],b=[this.relcell(-2,-2),this.relcell(0,-2),this.relcell(2,-2),this.relcell(-2,0),this.relcell(2,0),this.relcell(-2,2),this.relcell(0,2),this.relcell(2,2)],c=0;c<8;c++)"cell"!==b[c].group||b[c].isnull||a.push([b[c],c+1]);return a}},"Board@mochikoro,mochinyoro":{addExtraInfo:function(){this.ublk8mgr=this.addInfoList(this.klass.AreaUnshade8Graph)}},AreaShadeGraph:{enabled:!0},"AreaShadeGraph@mochikoro":{enabled:!1},AreaUnshadeGraph:{enabled:!0},"AreaUnshade8Graph:AreaUnshadeGraph@mochikoro,mochinyoro":{setComponentRefs:function(a,b){a.ublk8=b},getObjNodeList:function(a){return a.ublk8nodes},resetObjNodeList:function(a){a.ublk8nodes=[]},getSideObjByNodeObj:function(a){for(var b=a.getdir8clist(),c=[],d=0;d<b.length;d++){var e=b[d][0];this.isnodevalid(e)&&c.push(e)}return c}},Graphic:{numbercolor_func:"qnum",qanscolor:"black",paint:function(){this.drawBGCells(),this.drawShadedCells(),"nurikabe"===this.pid&&this.drawDotCells(),this.drawGrid(),this.drawQuesNumbers(),this.drawChassis(),this.drawTarget()}},"Graphic@nuribou,mochikoro,mochinyoro":{bgcellcolor_func:"qsub1",enablebcolor:!0},Encode:{decodePzpr:function(a){this.decodeNumber16()},encodePzpr:function(a){this.encodeNumber16()}},"Encode@nurikabe":{decodeKanpen:function(){this.fio.decodeCellQnum_kanpen()},encodeKanpen:function(){this.fio.encodeCellQnum_kanpen()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeCellAns()},encodeData:function(){this.encodeCellQnum(),this.encodeCellAns()}},"FileIO@nurikabe":{decodeData:function(){this.decodeCellQnumAns()},encodeData:function(){this.encodeCellQnumAns()},kanpenOpen:function(){this.decodeCellQnumAns_kanpen()},kanpenSave:function(){this.encodeCellQnumAns_kanpen()},kanpenOpenXML:function(){this.decodeCellQnumAns_XMLBoard()},kanpenSaveXML:function(){this.encodeCellQnumAns_XMLBoard(),this.encodeCellAns_XMLAnswer()},decodeCellQnumAns_XMLBoard:function(){this.decodeCellXMLBoard(function(a,b){b>0?a.qnum=b:-1===b?a.qsub=1:-2===b?a.qans=1:-3===b&&(a.qnum=-2)})},encodeCellQnumAns_XMLBoard:function(){this.encodeCellXMLBoard(function(a){var b=0;return a.qnum>0?b=a.qnum:-2===a.qnum?b=-3:1===a.qans?b=-2:1===a.qsub&&(b=-1),b})}},"AnsCheck@nurikabe":{checklist:["check2x2ShadeCell","checkNoNumberInUnshade","checkConnectShade","checkDoubleNumberInUnshade","checkNumberAndUnshadeSize","doneShadingDecided"]},"AnsCheck@nuribou#1":{checklist:["checkBou","checkCorners","checkNoNumberInUnshade","checkDoubleNumberInUnshade","checkNumberAndUnshadeSize","doneShadingDecided"]},"AnsCheck@mochikoro,mochinyoro#1":{checklist:["checkShadeCellExist","check2x2ShadeCell","checkConnectUnshaded_mochikoro","checkUnshadeRect","checkDoubleNumberInUnshade","checkNumberAndUnshadeSize","checkShadeNotRect@mochinyoro","doneShadingDecided"]},AnsCheck:{checkDoubleNumberInUnshade:function(){this.checkAllBlock(this.board.ublkmgr,function(a){return a.isNum()},function(a,b,c,d){return c<2},"bkNumGe2")},checkNumberAndUnshadeSize:function(){this.checkAllArea(this.board.ublkmgr,function(a,b,c,d){return d<=0||d===c},"bkSizeNe")}},"AnsCheck@nuribou":{checkBou:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return 1===a||1===b},"csWidthGt1")},checkCorners:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(c.bx!==a.maxbx-1&&c.by!==a.maxby-1){var d,e=c.adjacent,f=[[c,e.right.adjacent.bottom],[e.right,e.bottom]];for(d=0;d<2&&(!f[d][0].isShade()||!f[d][1].isShade());d++);if(2!==d){var g=f[d][0].sblk.clist,h=f[d][1].sblk.clist;if(g.length===h.length){if(this.failcode.add("csCornerSize"),this.checkOnly)break;g.seterr(1),h.seterr(1)}}}}}},"AnsCheck@nurikabe,nuribou":{checkNoNumberInUnshade:function(){this.checkAllBlock(this.board.ublkmgr,function(a){return a.isNum()},function(a,b,c,d){return 0!==c},"bkNoNum")}},"AnsCheck@mochikoro,mochinyoro":{checkConnectUnshaded_mochikoro:function(){this.checkOneArea(this.board.ublk8mgr,"csDivide8")},checkUnshadeRect:function(){this.checkAllArea(this.board.ublkmgr,function(a,b,c,d){return a*b===c},"cuNotRect")}},"AnsCheck@mochinyoro":{checkShadeNotRect:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return a*b!==c},"csRect")}},FailCode:{bkNoNum:["数字の入っていないシマがあります。","An area of unshaded cells has no numbers."],bkNumGe2:["1つのシマに2つ以上の数字が入っています。","An area of unshaded cells has more than one number."],bkSizeNe:["数字とシマの面積が違います。","The number is not equal to the size of the area."]},"FailCode@nuribou":{csWidthGt1:["「幅１マス、長さ１マス以上」ではない黒マスのカタマリがあります。","There is a mass of shaded cells whose width is more than two."],csCornerSize:["同じ面積の黒マスのカタマリが、角を共有しています。","Masses of shaded cells with the same length share a corner."]},"FailCode@mochikoro,mochinyoro":{cuNotRect:["四角形でない白マスのブロックがあります。","There is a block of unshaded cells that is not a rectangle."],csRect:["四角形になっている黒マスのブロックがあります。","There is a block of shaded cells that is a rectangle."],csDivide8:["孤立した白マスのブロックがあります。","The unshaded cells are divided."]}});
//# sourceMappingURL=nurikabe.js.map