/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["yinyang"],{MouseEvent:{inputModes:{edit:["circle-shade","circle-unshade","clear"],play:["copycircle","circle-shade","circle-unshade","border","subline","clear"]},mouseinput_other:function(){"copycircle"===this.inputMode&&this.dragmarks()},mouseinput_auto:function(){this.puzzle.playmode&&(this.mousestart||this.mousemove)?"left"===this.btn?this.dragmarks():"right"===this.btn&&(this.isBorderMode()?this.inputborder():this.inputQsubLine()):this.mousestart||this.mousemove?this.dragmarks():this.mouseend&&this.notInputted()&&this.inputqnum_main(this.getcell())},dragmarks:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(this.mouseCell.isnull?(this.inputData=a.getNum(),this.mouseCell=a):a.getNum()!==this.inputData&&(a.setNum(this.inputData),this.mouseCell=a,a.draw()))}},Cell:{numberAsObject:!0,disInputHatena:!0,maxnum:2},Board:{hasborder:1,disable_subclear:!0,addExtraInfo:function(){this.yingraph=this.addInfoList(this.klass.AreaYinGraph),this.yanggraph=this.addInfoList(this.klass.AreaYangGraph)}},"AreaYinGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qnum":"node","cell.anum":"node"},setComponentRefs:function(a,b){a.yin=b},getObjNodeList:function(a){return a.yinnodes},resetObjNodeList:function(a){a.yinnodes=[]},isnodevalid:function(a){return 2===a.getNum()}},"AreaYangGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qnum":"node","cell.anum":"node"},setComponentRefs:function(a,b){a.yang=b},getObjNodeList:function(a){return a.yangnodes},resetObjNodeList:function(a){a.yangnodes=[]},isnodevalid:function(a){return 1===a.getNum()}},Graphic:{bordercolor_func:"qans",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawBorders(),this.drawBorderQsubs(),this.drawCircles(),this.drawChassis(),this.drawTarget()},getBGCellColor_error1:function(a){return 1===a.error||1===a.qinfo?this.errbcolor1:this.puzzle.execConfig("dispqnumbg")&&-1!==a.qnum?"silver":null},getCircleStrokeColor:function(a){return 1===a.qnum||1===a.anum?1===a.error?this.errcolor1:1===a.qnum?this.quescolor:a.trial?this.trialcolor:this.puzzle.editmode&&!this.puzzle.execConfig("dispqnumbg")?"silver":this.quescolor:null},getCircleFillColor:function(a){return 2===a.qnum||2===a.anum?1===a.error?this.errcolor1:2===a.qnum?this.quescolor:a.trial?this.trialcolor:this.puzzle.editmode&&!this.puzzle.execConfig("dispqnumbg")?"silver":this.quescolor:1===a.qnum&&this.puzzle.execConfig("dispqnumbg")&&0===a.error?"white":null}},Encode:{decodePzpr:function(a){this.decodeCircle()},encodePzpr:function(a){this.encodeCircle()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeCellQnum(),this.encodeCellAnumsub()}},AnsCheck:{checklist:["check2x2ShadedCircle","check2x2UnshadedCircle","checkConnectShadedCircle","checkConnectUnshadedCircle","checkNoNumCell"],checkConnectShadedCircle:function(){this.checkOneArea(this.board.yingraph,"msDivide")},checkConnectUnshadedCircle:function(){this.checkOneArea(this.board.yanggraph,"muDivide")},check2x2ShadedCircle:function(){this.check2x2Block(function(a){return 2===a.getNum()},"ms2x2")},check2x2UnshadedCircle:function(){this.check2x2Block(function(a){return 1===a.getNum()},"mu2x2")}},FailCode:{ceNoNum:["まるの入っていないマスがあります。","There is an empty cell."],ms2x2:["2x2のくろまるのカタマリがあります。","There is a 2x2 block of shaded circles."],mu2x2:["2x2のしろまるのカタマリがあります。","There is a 2x2 block of unshaded circles."],msDivide:["タテヨコにつながっていないくろまるがあります。","Shaded circles are divided."],muDivide:["タテヨコにつながっていないしろまるがあります。","Unshaded circles are divided."]}});
//# sourceMappingURL=yinyang.js.map