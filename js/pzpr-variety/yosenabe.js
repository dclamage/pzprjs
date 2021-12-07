/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["yosenabe"],{MouseEvent:{inputModes:{edit:["nabe","number","clear"],play:["line","peke","completion"]},mouseinput_other:function(){"nabe"===this.inputMode&&this.inputNabe()},mouseinput_auto:function(){this.puzzle.playmode?this.mousestart||this.mousemove?"left"===this.btn?this.inputLine():"right"===this.btn&&this.inputpeke():this.mouseend&&this.notInputted()&&this.inputqcmp():this.puzzle.editmode&&(this.mousestart||this.mousemove?"right"===this.btn&&this.inputNabe():this.mouseend&&this.notInputted()&&this.inputqnum_yosenabe())},inputqcmp:function(){var a=this.getcell();if(!a.isnull){var b=this.puzzle.execConfig("dispmove")?a.base:a,c=this.inputPoint.bx-a.bx,d=this.inputPoint.by-a.by;b.isNum()&&("completion"===this.inputMode||c*c+d*d<.36)&&(b.setQcmp(0===b.qcmp?1:0),a.draw())}},inputNabe:function(){var a=this.getcell();if(!a.isnull&&a!==this.mouseCell){if("nabe"!==this.inputMode){if(a.isNum())return void this.inputqnum();if(-1!==a.qnum2)return void this.inputqnum_yosenabe()}null===this.inputData&&(this.inputData=a.ice()?0:6),a.setQues(this.inputData),a.drawaround(),this.mouseCell=a}},inputqnum_yosenabe:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(a!==this.cursor.getc()?this.setcursor(a):this.inputnumber_yosenabe(a),this.mouseCell=a)},inputnumber_yosenabe:function(a){var b,c,d=a.getmaxnum(),e=-1;-1!==a.qnum?(b=a.qnum,c=1):-1!==a.qnum2?(b=a.qnum2,c=2):(b=-1,c=a.ice()?2:1),"left"===this.btn?e=b===d?-1:-1===b?-2:-2===b?1:b+1:"right"===this.btn&&(e=-1===b?d:-2===b?-1:1===b?-2:b-1),1===c?a.setQnum(e):2===c&&a.setQnum2(e),a.draw()}},KeyEvent:{enablemake:!0,key_inputqnum_main:function(a,b){this.key_inputqnum_main_yosenabe(a,b)},key_inputqnum_main_yosenabe:function(a,b){if("q"===b||"q1"===b||"q2"===b)"q"===b&&(b=-1!==a.qnum?"q1":"q2"),"q1"===b&&-1!==a.qnum?(a.setQnum2(a.qnum),a.setQnum(-1),a.draw()):"q2"===b&&-1!==a.qnum2&&(a.setQnum(a.qnum2),a.setQnum2(-1),a.draw());else if("w"===b)a.setQues(a.ice()?0:6),a.draw();else{var c=-1,d=1;-1!==a.qnum?(c=a.qnum,d=1):-1!==a.qnum2?(c=a.qnum2,d=2):d=a.ice()?2:1;var e=this.getNewNumber(a,b,c);if(null===e)return;1===d?a.setQnum(e):2===d&&a.setQnum2(e),a.draw(),this.prev=a}}},Cell:{isCmp:function(){return 1===(this.puzzle.execConfig("dispmove")?this.base:this).qcmp},posthook:{qnum:function(a){if(-1===a&&null!==this.path){this.path.getedgeobjs().forEach(function(a){a.line=0})}}}},CellList:{getDeparture:function(){return this.map(function(a){return a.base}).notnull()},getSumOfFilling:function(a){for(var b=0,c=0,d=this.length;c<d;c++)this[c].base.isValidNum()&&(b+=this[c].base.qnum);return b}},Border:{prehook:{line:function(a){return this.puzzle.execConfig("dispmove")&&this.checkFormCurve(a)}}},Board:{cols:8,rows:8,hasborder:1,addExtraInfo:function(){this.icegraph=this.addInfoList(this.klass.AreaCrockGraph)}},LineGraph:{enabled:!0,moveline:!0},"AreaCrockGraph:AreaGraphBase":{enabled:!0,relation:{"cell.ques":"node"},setComponentRefs:function(a,b){a.icebarn=b},getObjNodeList:function(a){return a.icebarnnodes},resetObjNodeList:function(a){a.icebarnnodes=[]},isnodevalid:function(a){return a.ice()}},Graphic:{hideHatena:!0,gridcolor_type:"LIGHT",bgcellcolor_func:"icebarn",bordercolor_func:"ice",numbercolor_func:"move",circlefillcolor_func:"qcmp",icecolor:"rgb(224,224,224)",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawBorders(),this.drawTip(),this.drawDepartures(),this.drawLines(),this.drawCircledNumbers(),this.drawFillingNumBase(),this.drawFillingNumbers(),this.drawPekes(),this.drawChassis(),this.drawTarget()},drawFillingNumBase:function(){for(var a=this.vinc("cell_filling_back","crispEdges",!0),b=this.puzzle.execConfig("dispmove"),c=this.range.cells,d=0;d<c.length;d++){var e=c[d],f=this.getBGCellColor(e);if(a.vid="c_full_nb_"+e.id,f&&-1!==e.qnum2&&b&&e.isDestination()){var g=(e.bx-.9)*this.bw-.5,h=(e.by-.9)*this.bh-.5;a.fillStyle=f,a.fillRect(g,h,.8*this.bw,.8*this.bh)}else a.vhide()}},drawFillingNumbers:function(){for(var a=this.vinc("cell_filling_number","auto"),b=this.puzzle.execConfig("dispmove"),c=this.range.cells,d=0;d<c.length;d++){var e=c[d],f=e.qnum2,g=e.bx*this.bw,h=e.by*this.bh;if(a.vid="cell_fill_text_"+e.id,-1!==f){var i=f>0?""+f:"?",j={style:"bold"};b&&e.isDestination()?(j.position=this.TOPLEFT,j.ratio=.4,j.width=[.5,.33]):j.ratio=.6,a.fillStyle=this.getQuesNumberColor(e),this.disptext(i,g,h,j)}else a.vhide()}}},Encode:{decodePzpr:function(a){this.decodeIce(),this.decodeNumber16_yosenabe()},encodePzpr:function(a){this.encodeIce(),this.encodeNumber16_yosenabe()},decodeNumber16_yosenabe:function(){var a=0,b=0,c=this.outbstr,d=this.board;for(b=0;b<c.length;b++){var e=d.cell[a],f=c.charAt(b);if(this.include(f,"0","9")||this.include(f,"a","f")?e.qnum=parseInt(f,16):"-"===f?(e.qnum=parseInt(c.substr(b+1,2),16),b+=2):"."===f?e.qnum=-2:"i"===f?(e.qnum2=parseInt(c.substr(b+1,1),16),b+=1):"g"===f?(e.qnum2=parseInt(c.substr(b+1,2),16),b+=2):"h"===f?e.qnum2=-2:f>="j"&&f<="z"&&(a+=parseInt(f,36)-19),a++,!d.cell[a])break}this.outbstr=c.substr(b+1)},encodeNumber16_yosenabe:function(){for(var a=0,b="",c=this.board,d=0;d<c.cell.length;d++){var e="",f=c.cell[d].qnum,g=c.cell[d].qnum2;-2===f?e=".":f>=0&&f<16?e=f.toString(16):f>=16&&f<256?e="-"+f.toString(16):-2===g?e="h":g>=0&&g<16?e="i"+g.toString(16):g>=16&&g<256?e="g"+g.toString(16):a++,0===a?b+=e:(e||17===a)&&(b+=(18+a).toString(36)+e,a=0)}a>0&&(b+=(18+a).toString(36)),this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeCell(function(a,b){"i"===b.charAt(0)&&(a.ques=6,b=b.substr(1)),"o"===b.charAt(0)?(b=b.substr(1),a.qnum=b?+b:-2):b&&"."!==b&&(a.qnum2=+b)}),this.decodeBorderLine(),this.filever>=1&&this.decodeCellQsubQcmp()},encodeData:function(){this.filever=1,this.encodeCell(function(a){var b="";return 6===a.ques&&(b+="i"),-1!==a.qnum?(b+="o",a.qnum>=0&&(b+=""+a.qnum)):a.qnum2>0&&(b+=""+a.qnum2),(b||".")+" "}),this.encodeBorderLine(),this.encodeCellQsubQcmp()},decodeCellQsubQcmp:function(){this.decodeCell(function(a,b){"0"!==b&&(a.qsub=15&+b,a.qcmp=+b>>4)})},encodeCellQsubQcmp:function(){this.encodeCell(function(a){return a.qsub+(a.qcmp<<4)+" "})}},AnsCheck:{checklist:["checkLineExist+","checkBranchLine","checkCrossLine","checkConnectObject","checkLineOverLetter","checkCurveLine","checkQuesNumber","checkDoubleNumberInNabe","checkFillingCount","checkNoFillingNabe","checkFillingOutOfNabe","checkDisconnectLine"],checkCurveLine:function(){this.checkAllArea(this.board.linegraph,function(a,b,c,d){return 1===a||1===b},"laCurve")},checkQuesNumber:function(){this.checkAllCell(function(a){return!a.ice()&&-1!==a.qnum2},"bnIllegalPos")},checkDoubleNumberInNabe:function(){this.checkAllBlock(this.board.icegraph,function(a){return-1!==a.qnum2},function(a,b,c,d){return c<2},"bkDoubleBn")},checkNoFillingNabe:function(){this.checkNoMovedObjectInRoom(this.board.icegraph)},checkFillingOutOfNabe:function(){this.checkAllCell(function(a){return a.isDestination()&&!a.ice()},"nmOutOfBk")},checkFillingCount:function(){for(var a=this.board.icegraph.components,b=0;b<a.length;b++){for(var c=a[b].clist,d=null,e=0;e<c.length;e++){var f=c[e].qnum2;if(-1!==f){if(null!==d&&d!==f){d=null;break}d=f}}if(null!==d){var g=c.getSumOfFilling();if(0!==g&&d!==g){if(this.failcode.add("bkSumNeBn"),this.checkOnly)break;c.getDeparture().seterr(4),c.seterr(1)}}}}},FailCode:{laOnNum:["具材の上を線が通過しています。","A line goes through a filling."],laIsolate:["具材につながっていない線があります。","A line doesn't connect any filling."],nmConnected:["具材が繋がっています。","There are connected fillings."],nmOutOfBk:["鍋に入っていない具材があります。","A filling isn't in a crock."],bnIllegalPos:["鍋の外に数字が書いてあります。","There is a number out of a crock."],bkDoubleBn:["鍋に数字が２つ以上書いてあります。","There is two or more numbers in a crock."],bkSumNeBn:["具材の合計値が正しくありません。","Sum of filling is not equal to a crock."],bkNoNum:["具材のない鍋があります。","A crock has no circle."]}});
//# sourceMappingURL=yosenabe.js.map