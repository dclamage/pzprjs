/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["nanro"],{MouseEvent:{inputModes:{edit:["number","clear"],play:["copynum","number","numexist","numblank","clear"]},mouseinput_other:function(){"copynum"===this.inputMode&&this.dragnumber_nanro()},mouseinput_auto:function(){this.puzzle.playmode?this.mousestart||this.mousemove?"left"===this.btn?this.dragnumber_nanro():this.mousemove&&"right"===this.btn&&this.inputDot_nanro():this.mouseend&&this.notInputted()&&(this.mouseCell=this.board.emptycell,this.inputqnum()):this.puzzle.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&(this.mouseCell=this.board.emptycell,this.inputqnum()))},dragnumber_nanro:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(this.mouseCell.isnull?(this.inputData=a.getNum(),-2===this.inputData?this.inputData=null:-1===this.inputData&&(1===a.qsub?this.inputData=-2:2===a.qsub&&(this.inputData=-3)),this.mouseCell=a):-1===a.qnum&&(a.room!==this.mouseCell.room&&this.inputData>0&&(this.inputData=1===a.room.numkind?a.room.number:-2),a.setNum(this.inputData),this.mouseCell=a,a.draw()))},inputDot_nanro:function(){var a=this.getcell();a.isnull||a===this.mouseCell||a.isNum()||(null===this.inputData&&(this.inputData=2===a.qsub?0:2),2===this.inputData?(a.setAnum(-1),a.setQsub(2)):0===this.inputData&&(a.setAnum(-1),a.setQsub(0)),this.mouseCell=a,a.draw())}},KeyEvent:{enablemake:!0,enableplay:!0,keyinput:function(a){this.key_view(a)},key_view:function(a){this.puzzle.playmode&&("q"===a||"a"===a||"z"===a?a="s1":"w"===a||"s"===a||"x"===a?a="s2":"e"!==a&&"d"!==a&&"c"!==a&&"-"!==a||(a=" ")),this.key_inputqnum(a)}},Cell:{numberWithMB:!0,maxnum:function(){return this.room.clist.length}},Board:{cols:8,rows:8,hasborder:1},AreaNumberGraph:{enabled:!0},AreaRoomGraph:{enabled:!0,relation:{"cell.qnum":"info","cell.anum":"info","border.ques":"separator"},modifyOtherInfo:function(a,b){this.setNumOfRoom(a.room)},setExtraData:function(a){this.common.setExtraData.call(this,a),this.setNumOfRoom(a)},setNumOfRoom:function(a){for(var b=a.clist,c=[],d=0,e=-1,f=0;f<b.length;f++){var g=b[f].getNum();-1!==g&&(isNaN(c[g])?(d++,e=g,c[g]=1):c[g]++)}a.number=e,a.numcnt=c[e],a.numkind=d}},Graphic:{gridcolor_type:"LIGHT",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawMBs(),this.drawAnsNumbers(),this.drawQuesNumbers(),this.drawBorders(),this.drawChassis(),this.drawCursor()}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeNumber16()},decodeKanpen:function(){this.fio.decodeAreaRoom(),this.fio.decodeCellQnum_kanpen()},encodeKanpen:function(){this.fio.encodeAreaRoom(),this.fio.encodeCellQnum_kanpen()}},FileIO:{decodeData:function(){this.decodeAreaRoom(),this.decodeCellQnum(),this.decodeCellAnumsub()},encodeData:function(){this.encodeAreaRoom(),this.encodeCellQnum(),this.encodeCellAnumsub()}},AnsCheck:{checklist:["check2x2NumberCell","checkSideAreaNumber","checkNotMultiNum","checkNumCountOver","checkConnectNumber","checkNumCountLack","checkNoEmptyArea"],check2x2NumberCell:function(){this.check2x2Block(function(a){return a.isNum()},"nm2x2")},checkSideAreaNumber:function(){this.checkSideAreaCell(function(a,b){return a.sameNumber(b)},!1,"cbSameNum")},checkNotMultiNum:function(){this.checkAllErrorRoom(function(a){return!(a.numkind>1)},"bkPlNum")},checkNumCountLack:function(){this.checkAllErrorRoom(function(a){return!(1===a.numkind&&a.number>a.numcnt)},"nmCountLt")},checkNumCountOver:function(){this.checkAllErrorRoom(function(a){return!(1===a.numkind&&a.number<a.numcnt)},"nmCountGt")},checkNoEmptyArea:function(){this.checkAllErrorRoom(function(a){return 0!==a.numkind},"bkNoNum")},checkAllErrorRoom:function(a,b){for(var c=this.board.roommgr.components,d=0;d<c.length;d++){var e=c[d];if(e&&!a(e)){if(this.failcode.add(b),this.checkOnly)break;e.clist.seterr(1)}}}},FailCode:{bkNoNum:["数字が含まれていないブロックがあります。","There is an empty room."],nm2x2:["数字が2x2のカタマリになっています。","There is a 2x2 block of numbers."],cbSameNum:["同じ数字が境界線を挟んで隣り合っています。","Adjacent blocks have the same number."],nmCountGt:["入っている数字の数が数字より多いです。","A number is bigger than the count."],nmCountLt:["入っている数字の数が数字より少ないです。","A number is smaller than the count."]}});
//# sourceMappingURL=nanro.js.map