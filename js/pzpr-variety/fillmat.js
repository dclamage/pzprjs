/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["fillmat","usotatami"],{MouseEvent:{inputModes:{edit:["number","clear"],play:["border","subline"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&("left"===this.btn&&this.isBorderMode()?this.inputborder():this.inputQsubLine()):this.puzzle.editmode&&this.mousestart&&this.inputqnum()}},KeyEvent:{enablemake:!0},"Cell@fillmat":{maxnum:4},Board:{hasborder:1},"Board@usotatami":{cols:8,rows:8},AreaRoomGraph:{enabled:!0},Graphic:{gridcolor_type:"DLIGHT",bordercolor_func:"qans",numbercolor_func:"qnum",paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawBorders(),this.drawQuesNumbers(),this.drawBorderQsubs(),this.drawChassis(),this.drawTarget()}},"Encode@fillmat":{decodePzpr:function(a){this.decodeNumber10()},encodePzpr:function(a){this.encodeNumber10()}},"Encode@usotatami":{decodePzpr:function(a){this.decodeNumber10or16()},encodePzpr:function(a){this.encodeNumber10or16()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeBorderAns()},encodeData:function(){this.encodeCellQnum(),this.encodeBorderAns()}},"AnsCheck@fillmat":{checklist:["checkBorderCross","checkSideAreaRoomSize","checkTatamiMaxSize","checkDoubleNumber","checkNumberAndSize","checkBorderDeadend+"],checkTatamiMaxSize:function(){this.checkAllArea(this.board.roommgr,function(a,b,c,d){return(1===a||1===b)&&c<=4},"bkLenGt4")},checkSideAreaRoomSize:function(){this.checkSideAreaSize(this.board.roommgr,function(a){return a.clist.length},"bsSizeEq")}},"AnsCheck@usotatami":{checklist:["checkBorderCross","checkNoNumber","checkDoubleNumber","checkTatamiDiffSize","checkBorderDeadend+","checkTatamiBreadth"],checkTatamiDiffSize:function(){this.checkAllArea(this.board.roommgr,function(a,b,c,d){return d<0||d!==c},"bkSizeEq")},checkTatamiBreadth:function(){this.checkAllArea(this.board.roommgr,function(a,b,c,d){return 1===a||1===b},"bkWidthGt1")}},FailCode:{bkNoNum:["数字の入っていないタタミがあります。","A tatami has no numbers."],bkNumGe2:["1つのタタミに2つ以上の数字が入っています。","A tatami has more than one number."],bkSizeNe:["数字とタタミの大きさが違います。","The number is different from the size of the tatami."],bkSizeEq:["数字とタタミの大きさが同じです。","The number is equal to the size of the tatami."],bkLenGt4:["「幅１マス、長さ１～４マス」ではないタタミがあります。","The width of the tatami is more than one, or the length is more than four."],bsSizeEq:["隣り合うタタミの大きさが同じです。","Tatamis of the same size are adjacent."]}});
//# sourceMappingURL=fillmat.js.map