/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["bonsan","heyabon","rectslider","satogaeri"],{"MouseEvent@bonsan,heyabon":{inputModes:{edit:["number","clear"],play:["line","bgcolor","bgcolor1","bgcolor2","clear","completion"]},mouseinput:function(){"completion"===this.inputMode?this.mousestart&&this.inputqcmp(1):this.common.mouseinput.call(this)}},"MouseEvent@satogaeri":{inputModes:{edit:["number","clear"],play:["line","clear","completion"]},mouseinput:function(){"completion"===this.inputMode?this.mousestart&&this.inputqcmp(1):this.common.mouseinput.call(this)}},"MouseEvent@rectslider":{inputModes:{edit:["number","clear"],play:["line","bgcolor","subcircle","subcross","clear"]}},MouseEvent:{mouseinput_auto:function(){this.puzzle.playmode?this.mousestart||this.mousemove?"left"===this.btn&&this.inputLine():this.mouseend&&this.notInputted()&&this.inputlight():this.puzzle.editmode&&(this.mousestart||this.mousemove?"heyabon"!==this.pid&&"satogaeri"!==this.pid||this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())},inputLine:function(){this.common.inputLine.call(this),!this.puzzle.execConfig("autocmp")||this.puzzle.execConfig("dispmove")||this.notInputted()||this.inputautodark()},inputautodark:function(){var a=this.puzzle.opemgr,b=a.lastope;if("border"===b.group&&"line"===b.property){var c=this.board.getb(b.bx,b.by),d=new this.klass.CellList;Array.prototype.push.apply(d,c.sideobj),d=d.notnull().filter(function(a){return null!==a.path||a.isNum()}),d.each(function(a){null===a.path?a.isNum()&&a.draw():a.path.clist.each(function(a){a.isNum()&&a.draw()})})}},inputlight:function(){var a=this.getcell();if(!a.isnull){var b=this.puzzle;"rectslider"!==b.pid&&this.inputdark(a,1)||"satogaeri"!==b.pid&&(this.mouseend&&this.notInputted()&&(this.mouseCell=this.board.emptycell),this.inputBGcolor())}},inputqcmp:function(a){var b=this.getcell();b.isnull||this.inputdark(b,a)},inputdark:function(a,b){var a=this.getcell();if(a.isnull)return!1;var c=this.puzzle.execConfig("dispmove")?a.base:a,d=this.inputPoint.bx-a.bx,e=this.inputPoint.by-a.by;return!(!c.isNum()||!("completion"===this.inputMode||-2===c.qnum&&d*d+e*e<.36))&&(c.setQcmp(c.qcmp!==b?b:0),a.draw(),!0)}},KeyEvent:{enablemake:!0},Cell:{isCmp:function(){return this.isCmp_bonsan(this.puzzle.execConfig("autocmp"),this.puzzle.execConfig("dispmove"))},isCmp_bonsan:function(a,b){var c=b?this.base:this;if(1===c.qcmp)return!0;if(!a)return!1;var d=c.getNum();if(null===this.path)return 0===d;var e=null!==this.path?this.path.clist:[this],f=e.getRectSize();return(1===f.cols||1===f.rows)&&d===e.length-1},maxnum:function(){var a=this.board,b=this.bx,c=this.by,d=(b<a.maxbx>>1?a.maxbx-b:b)>>1,e=(c<a.maxby>>1?a.maxby-c:c)>>1;return Math.max(d,e)},minnum:0},"Cell@satogaeri":{posthook:{qcmp:function(a){this.path.destination.room.checkAutoCmp()}}},Border:{prehook:{line:function(a){return this.puzzle.execConfig("dispmove")&&this.checkFormCurve(a)}}},"Border@satogaeri":{posthook:{line:function(a){if(a)this.sidecell[0].room.checkAutoCmp(),this.sidecell[1].room.checkAutoCmp(),this.sidecell[0].path.departure.room.checkAutoCmp(),this.sidecell[0].path.destination.room.checkAutoCmp();else for(var b=0;b<=1;b++)this.sidecell[b].path?(this.sidecell[b].path.departure.room.checkAutoCmp(),this.sidecell[b].path.destination.room.checkAutoCmp()):this.sidecell[b].room.checkAutoCmp()}}},"Cell@heyabon,satogaeri":{distance:null,getState:function(){var a=this.adjacent,b=this.adjborder,c=this.distance-1;return this.isDestination()?8:b.top.isLine()&&a.top.distance===c?0:b.left.isLine()&&a.left.distance===c?1:b.bottom.isLine()&&a.bottom.distance===c?2:b.right.isLine()&&a.right.distance===c?3:-1},setState:function(a){if(!isNaN(a)){var b=this.adjborder;0===a?b.top.line=1:1===a?b.left.line=1:2===a?b.bottom.line=1:3===a&&(b.right.line=1)}}},Board:{cols:8,rows:8,hasborder:1},LineGraph:{enabled:!0,moveline:!0,resetExtraData:function(a){a.distance=a.qnum>=0?a.qnum:null,this.common.resetExtraData.call(this,a)},setExtraData:function(a){this.common.setExtraData.call(this,a);var b=a.departure,c=b.qnum;if(c=c>=0?c:this.board.cell.length,b.distance=c,0!==b.lcnt)for(var d=b.getdir(b.pathnodes[0].nodes[0].obj,2),e=b.getaddr(),f=b.distance;;){e.movedir(d,2);var b=e.getc(),g=b.adjborder;if(b.isnull||b.lcnt>=3||0===b.lcnt)break;if(b.distance=--f,b===a.destination)break;1!==d&&g.bottom.isLine()?d=2:2!==d&&g.top.isLine()?d=1:3!==d&&g.right.isLine()?d=4:4!==d&&g.left.isLine()&&(d=3)}}},"AreaRoomGraph@bonsan,heyabon,satogaeri":{enabled:!0},"AreaShadeGraph@rectslider":{enabled:!0,relation:{"cell.qnum":"node","border.line":"move"},isnodevalid:function(a){return-1!==a.base.qnum},modifyOtherInfo:function(a,b){this.setEdgeByNodeObj(a.sidecell[0]),this.setEdgeByNodeObj(a.sidecell[1])}},"Graphic@bonsan,heyabon,rectslider":{bgcellcolor_func:"qsub2",autocmp:"number"},"Graphic@satogaeri":{bgcellcolor_func:"qcmp",autocmp:"room"},"CellList@satogaeri":{checkCmp:function(){return 1===this.filter(function(a){return a.isDestination()&&a.isCmp_bonsan(!0,!0)}).length}},Graphic:{hideHatena:!0,gridcolor_type:"LIGHT",numbercolor_func:"move",qsubcolor1:"rgb(224, 224, 255)",qsubcolor2:"rgb(255, 255, 144)",circlefillcolor_func:"qcmp",paint:function(){this.drawBGCells(),this.drawGrid(),"heyabon"!==this.pid&&"satogaeri"!==this.pid||this.drawBorders(),this.drawTip(),this.drawDepartures(),this.drawLines(),this.drawCircledNumbers(),this.drawChassis(),this.drawTarget()}},"Graphic@rectslider":{fontShadecolor:"white",qcmpcolor:"gray",paint:function(){this.drawDashedGrid(),this.drawTip(),this.drawDepartures(),this.drawLines(),this.drawQuesCells(),this.drawMBs(),this.drawQuesNumbers(),this.drawChassis(),this.drawTarget()},getQuesCellColor:function(a){var b=this.puzzle;if(-1===(b.execConfig("dispmove")?a.base:a).qnum)return null;if(b.execConfig("dispmove")&&b.mouse.mouseCell===a)return this.movecolor;var c=a.error||a.qinfo;return 0===c?this.quescolor:1===c?this.errcolor1:null},getQuesNumberColor:function(a){return a.isCmp()?this.qcmpcolor:this.fontShadecolor}},"Encode@bonsan":{decodePzpr:function(a){this.checkpflag("c")||this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.outpflag="c",this.encodeNumber16()}},"Encode@heyabon":{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()}},"Encode@satogaeri":{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()},decodeKanpen:function(){this.fio.decodeAreaRoom(),this.fio.decodeQnum_PBox_Sato()},encodeKanpen:function(){this.fio.encodeAreaRoom(),this.fio.encodeQnum_PBox_Sato()}},"Encode@rectslider":{decodePzpr:function(a){this.decodeNumber16()},encodePzpr:function(a){this.encodeNumber16()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeCellQsubQcmp(),"rectslider"!==this.pid&&this.decodeBorderQues(),this.decodeBorderLine()},encodeData:function(){this.encodeCellQnum(),this.encodeCellQsubQcmp(),"rectslider"!==this.pid&&this.encodeBorderQues(),this.encodeBorderLine()},decodeCellQsubQcmp:function(){this.decodeCell(function(a,b){"0"!==b&&(a.qsub=15&+b,a.qcmp=+b>>4)})},encodeCellQsubQcmp:function(){this.encodeCell(function(a){return a.qsub+(a.qcmp<<4)+" "})},kanpenOpen:function(){this.decodeAreaRoom(),this.decodeQnum_PBox_Sato(),this.decodeLine_PBox_Sato()},kanpenSave:function(){this.encodeAreaRoom(),this.encodeQnum_PBox_Sato(),this.encodeLine_PBox_Sato()},decodeQnum_PBox_Sato:function(){this.decodeCell(function(a,b){"-"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)})},encodeQnum_PBox_Sato:function(){this.encodeCell(function(a){return a.qnum>=0?a.qnum+" ":-2===a.qnum?"- ":". "})},decodeLine_PBox_Sato:function(){this.decodeCell(function(a,b){a.setState(+b)})},encodeLine_PBox_Sato:function(){this.encodeCell(function(a){var b=a.getState();return b>=0?b+" ":". "})},kanpenOpenXML:function(){this.decodeAreaRoom_XMLBoard(),this.decodeCellQnum_XMLBoard(),this.decodeBorderLine_satogaeri_XMLAnswer()},kanpenSaveXML:function(){this.encodeAreaRoom_XMLBoard(),this.encodeCellQnum_XMLBoard(),this.encodeBorderLine_satogaeri_XMLAnswer()},UNDECIDED_NUM_XML:-2,decodeBorderLine_satogaeri_XMLAnswer:function(){this.decodeCellXMLArow(function(a,b){a.setState(+b.substr(1))})},encodeBorderLine_satogaeri_XMLAnswer:function(){this.encodeCellXMLArow(function(a){return"n"+a.getState()})}},AnsCheck:{checklist:["checkLineExist+","checkBranchLine","checkCrossLine","checkConnectObject","checkLineOverLetter","checkCurveLine","checkMovedBlockRect@rectslider","checkMovedBlockSize@rectslider","checkLineLength","checkFractal@bonsan,heyabon","checkNoObjectBlock@satogaeri,heyabon","checkNoMoveCircle","checkDisconnectLine"],checkCurveLine:function(){this.checkAllArea(this.board.linegraph,function(a,b,c,d){return 1===a||1===b},"laCurve")},checkLineLength:function(){this.checkAllArea(this.board.linegraph,function(a,b,c,d){return d<0||1===c||d===c-1},"laLenNe")},checkNoMoveCircle:function(){this.checkAllCell(function(a){return a.qnum>=1&&0===a.lcnt},"nmNoMove")},checkFractal:function(){var a=this.board.roommgr.components;a:for(var b=0;b<a.length;b++){var c=a[b].clist,d=c.getRectSize();d.xx=d.x1+d.x2,d.yy=d.y1+d.y2;for(var e=0;e<c.length;e++){var f=c[e];if(f.isDestination()!==this.board.getc(d.xx-f.bx,d.yy-f.by).isDestination()){if(this.failcode.add("bonsan"===this.pid?"brObjNotSym":"bkObjNotSym"),this.checkOnly)break a;c.filter(function(a){return a.isDestination()}).seterr(1)}}}},checkNoObjectBlock:function(){this.checkNoMovedObjectInRoom(this.board.roommgr)}},"AnsCheck@rectslider":{checkMovedBlockRect:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return a*b===c},"csNotRect")},checkMovedBlockSize:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return c>1},"bkSize1")}},FailCode:{bkNoNum:["○のない部屋があります。","A room has no circle."],bkObjNotSym:["部屋の中の○が点対称に配置されていません。","Position of circles in the room is not point symmetric."],brObjNotSym:["○が点対称に配置されていません。","Position of circles is not point symmetric."],laOnNum:["○の上を線が通過しています。","A line goes through a circle."],laIsolate:["○につながっていない線があります。","A line doesn't connect any circle."],nmConnected:["○が繋がっています。","There are connected circles."],nmNoMove:["○から線が出ていません。","A circle doesn't start any line."]},"FailCode@rectslider":{csNotRect:["黒マスのカタマリが正方形か長方形ではありません。","A mass of shaded cells is not rectangle."],bkSize1:["黒マスが一つで孤立しています。","There is a isolated shaded cells."],laOnNum:["黒マスの上を線が通過しています。","A line goes through a shaded cell."],laIsolate:["黒マスにつながっていない線があります。","A line doesn't connect any shaded cell."],nmConnected:["黒マスが繋がっています。","There are connected shaded cells."],nmNoMove:["黒マスから線が出ていません。","A shaded cell doesn't start any line."]}});
//# sourceMappingURL=bonsan.js.map