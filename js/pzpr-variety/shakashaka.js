/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["shakashaka"],{MouseEvent:{inputModes:{edit:["number","clear"],play:["objblank","completion"]},mouseinput_auto:function(){if(this.puzzle.playmode){var a=+this.puzzle.getConfig("use_tri");1===a?"left"===this.btn?this.mousestart?this.inputTriangle_corner_start():this.mousemove&&null!==this.inputData&&this.inputMove():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputDot():2===a?"left"===this.btn?this.mousestart?this.inputTriangle_pull_start():this.mousemove&&null===this.inputData?this.inputTriangle_pull_move():this.mousemove&&null!==this.inputData?this.inputMove():this.mouseend&&this.notInputted()&&this.inputTriangle_pull_end():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputDot():3===a&&this.mousestart&&this.inputTriangle_onebtn(),this.mouseend&&this.notInputted()&&this.inputqcmp()}else this.puzzle.editmode&&this.mousestart&&this.inputqnum()},inputMove:function(){this.inputData>=2&&this.inputData<=5?this.inputTriangle_drag():0!==this.inputData&&-1!==this.inputData||this.inputDot()},inputTriangle_corner_start:function(){var a=this.getcell();a.isnull||(this.inputData=this.checkCornerData(a),a.setAnswer(this.inputData),this.mouseCell=a,a.draw())},checkCornerData:function(a){if(a.isNum())return-1;var b=null;if(this.puzzle.getConfig("support_tri")){var c=a.adjacent,d={count:0},e={top:[2,3],bottom:[4,5],left:[3,4],right:[2,5]};for(var f in c){var g=c[f];d[f]=g.isWall()||g.qans===e[f][0]||g.qans===e[f][1],d[f]&&++d.count}if(d.count>2||2===d.count&&(d.top&&d.bottom||d.left&&d.right))return 0===a.qsub?-1:0;2===d.count&&(b=d.bottom&&d.left?2:d.bottom&&d.right?3:d.top&&d.right?4:d.top&&d.left?5:0)}if(null===b){var h=this.inputPoint.bx-a.bx,i=this.inputPoint.by-a.by;b=h<=0?i<=0?5:2:i<=0?4:3}return b===a.qans?b=-1:1===a.qsub&&(b=0),b},inputTriangle_pull_start:function(){var a=this.getcell();if(a.isnull||a.isNum())return void this.mousereset();this.firstPoint.set(this.inputPoint),this.mouseCell=a},inputTriangle_pull_move:function(){var a=this.mouseCell,b=this.inputPoint.bx-this.firstPoint.bx,c=this.inputPoint.by-this.firstPoint.by;b<=-.33&&c>=.33?this.inputData=2:b<=-.33&&c<=-.33?this.inputData=5:b>=.33&&c>=.33?this.inputData=3:b>=.33&&c<=-.33&&(this.inputData=4),null!==this.inputData&&(this.inputData===a.qans&&(this.inputData=0),a.setAnswer(this.inputData)),a.draw()},inputTriangle_pull_end:function(){var a=this.inputPoint.bx-this.firstPoint.bx,b=this.inputPoint.by-this.firstPoint.by;if(Math.abs(a)<=.1&&Math.abs(b)<=.1){var c=this.mouseCell;c.setAnswer(1!==c.qsub?-1:0),c.draw()}},inputTriangle_drag:function(){if(!(null===this.inputData||this.inputData<=0)){var a=this.getcell();if(!a.isnull&&!a.isNum()){var b=a.bx-this.mouseCell.bx,c=a.by-this.mouseCell.by,d=this.checkCornerData(a),e=null,f=this.inputData;2===b&&2===c||-2===b&&-2===c?2!==f&&4!==f||(e=f):2===b&&-2===c||-2===b&&2===c?3!==f&&5!==f||(e=f):0===b&&-2===c?(2!==f&&3!==f||d===f)&&(4!==f&&5!==f||d!==f)||(e=[null,null,5,4,3,2][f]):0===b&&2===c?(4!==f&&5!==f||d===f)&&(2!==f&&3!==f||d!==f)||(e=[null,null,5,4,3,2][f]):-2===b&&0===c?(3!==f&&4!==f||d===f)&&(2!==f&&5!==f||d!==f)||(e=[null,null,3,2,5,4][f]):2===b&&0===c&&((2!==f&&5!==f||d===f)&&(3!==f&&4!==f||d!==f)||(e=[null,null,3,2,5,4][f])),null!==e&&(a.setAnswer(e),this.inputData=e,this.mouseCell=a),a.draw()}}},inputDot:function(){var a=this.getcell();a.isnull||a.isNum()||(null===this.inputData&&(this.inputData=1===a.qsub?0:-1),a.setAnswer(this.inputData),this.mouseCell=a,a.draw())},inputTriangle_onebtn:function(){var a=this.getcell();if(!a.isnull&&!a.isNum()){var b=a.getAnswer();"left"===this.btn?this.inputData=[0,2,1,3,4,5,-1][b+1]:"right"===this.btn&&(this.inputData=[5,-1,1,0,2,3,4][b+1]),a.setAnswer(this.inputData),this.mouseCell=a,a.draw()}},inputqcmp:function(){var a=this.getcell();a.isnull||a.noNum()||(a.setQcmp(+!a.qcmp),a.draw(),this.mousereset())}},KeyEvent:{enablemake:!0},Cell:{numberRemainsUnshaded:!0,maxnum:4,minnum:0,getAnswer:function(){return this.isNum()?0:this.qans>0?this.qans:1===this.qsub?-1:0},setAnswer:function(a){this.isNum()||(this.setQans(a>=2&&a<=5?a:0),this.setQsub(-1===a?1:0))},isTri:function(){return 0!==this.qans},isWall:function(){return this.isnull||this.isNum()},isCmp:function(){if(1===this.qcmp)return!0;if(!this.puzzle.execConfig("autocmp"))return!1;var a=this.adjacent,b=new this.klass.CellList([a.top,a.right,a.bottom,a.left]),c=function(a){return!a.isnull&&-1===a.qnum&&0===a.qans&&0===a.qsub};if(b.some(c))return!1;var d=function(a){return a.isTri()};return this.qnum===this.countDir4Cell(d)},posthook:{qnum:function(){this.redrawAdjacent()},qans:function(){this.redrawAdjacent()},qsub:function(){this.redrawAdjacent()}},redrawAdjacent:function(){var a=this.adjacent,b=new this.klass.CellList([a.top,a.right,a.bottom,a.left]);this.board.redrawAffected(b)}},Board:{addExtraInfo:function(){this.wrectmgr=this.addInfoList(this.klass.AreaWrectGraph)},redrawAffected:function(a){for(var b=0;b<a.length;b++){var c=a[b];c.isnull||-1===c.qnum||-2===c.qnum||c.draw()}}},BoardExec:{adjustBoardData:function(a,b){var c=[];switch(a){case this.FLIPY:c=[0,1,5,4,3,2];break;case this.FLIPX:c=[0,1,3,2,5,4];break;case this.TURNR:c=[0,1,5,2,3,4];break;case this.TURNL:c=[0,1,3,4,5,2];break;default:return}for(var d=this.board.cell,e=0;e<d.length;e++){var f=d[e],g=c[f.qans];g&&(f.qans=g)}}},"AreaWrectGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qnum":"node","cell.qans":"node"},setComponentRefs:function(a,b){a.wrect=b},getObjNodeList:function(a){return a.wrectnodes},resetObjNodeList:function(a){a.wrectnodes=[]},isnodevalid:function(a){return-1===a.qnum},sldir:[[],[!0,!1,!0,!0,!1,!1],[!0,!1,!1,!1,!0,!0],[!0,!1,!1,!0,!0,!1],[!0,!1,!0,!1,!1,!0]],isedgevalidbynodeobj:function(a,b){return this.sldir[a.getdir(b,2)][a.qans]&&this.sldir[b.getdir(a,2)][b.qans]}},Graphic:{hideHatena:!0,autocmp:"number",gridcolor_type:"LIGHT",qanscolor:"black",fgcellcolor_func:"qnum",fontShadecolor:"white",qcmpcolor:"rgb(127,127,127)",paint:function(){this.drawBGCells(),this.drawDotCells(),this.drawDashedGrid(),this.drawQuesCells(),this.drawQuesNumbers(),this.drawTriangle(),this.drawChassis(),this.drawTarget()},getTriangleColor:function(a){return a.trial?this.trialcolor:this.shadecolor},getQuesNumberColor:function(a){return a.isCmp()?this.qcmpcolor:this.fontShadecolor}},Encode:{decodePzpr:function(a){this.decode4Cell()},encodePzpr:function(a){this.encode4Cell()},decodeKanpen:function(){this.fio.decodeCellQnumb()},encodeKanpen:function(){this.fio.encodeCellQnumb()}},FileIO:{decodeData:function(){this.decodeCellQnumb(),this.decodeCellQanssubcmp()},encodeData:function(){this.encodeCellQnumb(),this.encodeCellQanssubcmp()},decodeCellQanssubcmp:function(){this.decodeCell(function(a,b){"+"===b?a.qsub=1:"-"===b?a.qcmp=1:"."!==b&&(a.qans=+b)})},encodeCellQanssubcmp:function(){this.encodeCell(function(a){return 0!==a.qans?a.qans+" ":1===a.qsub?"+ ":1===a.qcmp?"- ":". "})},kanpenOpen:function(){this.decodeCell(function(a,b){"5"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)}),this.decodeCell(function(a,b){"+"===b?a.qsub=1:"."!==b&&(a.qans=+b)})},kanpenSave:function(){this.encodeCell(function(a){return a.qnum>=0?a.qnum+" ":-2===a.qnum?"5 ":". "}),this.encodeCell(function(a){return 1===a.qsub?"+ ":a.qans>=2?a.qans+" ":". "})},kanpenOpenXML:function(){this.decodeCellQnum_XMLBoard(),this.decodeCellShakashaka_XMLAnswer()},kanpenSaveXML:function(){this.encodeCellQnum_XMLBoard(),this.encodeCellShakashaka_XMLAnswer()},UNDECIDED_NUM_XML:-2,decodeCellShakashaka_XMLAnswer:function(){this.decodeCellXMLArow(function(a,b){"n"===b.charAt(0)?a.qans=2+(+b.substr(1)-1&3):"s"===b&&(a.qsub=1)})},encodeCellShakashaka_XMLAnswer:function(){this.encodeCellXMLArow(function(a){return a.qans>0?"n"+(4+(a.qans-1&3)):1===a.qsub?"s":"u"})}},AnsCheck:{checklist:["checkTriangleExist","checkOverTriangle","checkWhiteArea","checkLessTriangle"],checkTriangleExist:function(){this.board.cell.some(function(a){return a.qans>0})||this.failcode.add("brNoTriangle")},checkOverTriangle:function(){this.checkDir4Cell(function(a){return a.isTri()},2,"nmTriangleGt")},checkLessTriangle:function(){this.checkDir4Cell(function(a){return a.isTri()},1,"nmTriangleLt")},checkWhiteArea:function(){for(var a=this.board.wrectmgr.components,b=0;b<a.length;b++){var c=a[b].clist,d=c.getRectSize(),e=c.filter(function(a){return 0===a.qans}).length;if(d.cols*d.rows!==e&&!this.isAreaRect_slope(a[b])){if(this.failcode.add("cuNotRectx"),this.checkOnly)break;c.seterr(1)}}},isAreaRect_slope:function(a){for(var b=a.clist,c=0;c<b.length;c++){var d=b[c],e=d.adjacent,f=d.qans;if((4===f||5===f)!=(e.top.wrect!==a)||(2===f||3===f)!=(e.bottom.wrect!==a)||(2===f||5===f)!=(e.left.wrect!==a)||(3===f||4===f)!=(e.right.wrect!==a))return!1}return!0}},FailCode:{brNoTriangle:["盤面に三角形がありません。","There are no triangles on the board."],cuNotRectx:["白マスが長方形(正方形)ではありません。","A white area is not rectangle."],nmTriangleGt:["数字のまわりにある黒い三角形の数が間違っています。","The number of triangles in four adjacent cells is bigger than it."],nmTriangleLt:["数字のまわりにある黒い三角形の数が間違っています。","The number of triangles in four adjacent cells is smaller than it."]}});
//# sourceMappingURL=shakashaka.js.map