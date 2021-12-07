/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["wblink"],{MouseEvent:{inputModes:{edit:["circle-shade","circle-unshade","undef","clear"],play:["line","peke"]},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart||this.mousemove?this.inputLine():this.mouseend&&this.notInputted()&&this.inputpeke():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputpeke():this.puzzle.editmode&&this.mousestart&&this.inputqnum()},inputLine:function(){var a=this.getpos(.1);if(!this.prevPos.equals(a)){var b=this.prevPos.getlineobj(a);if(!b.isnull){var c=b.getlinesize(),d=this.board.borderinside(c.x1,c.y1,c.x2,c.y2);null===this.inputData&&(this.inputData=b.isLine()?0:1),1===this.inputData?d.setLine():0===this.inputData&&d.removeLine(),this.inputData=2,this.puzzle.painter.paintRange(c.x1-1,c.y1-1,c.x2+1,c.y2+1)}this.prevPos=a}},inputpeke:function(){var a=this.getpos(.22);if("right"!==this.btn||!this.prevPos.equals(a)){var b=a.getb();if(!b.isnull){null===this.inputData&&(this.inputData=2!==b.qsub?2:0),b.setQsub(this.inputData);var c=b.getlinesize();this.board.borderinside(c.x1,c.y1,c.x2,c.y2).setLineVal(0),this.prevPos=a,this.puzzle.painter.paintRange(c.x1-1,c.y1-1,c.x2+1,c.y2+1),b.draw()}}}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputcircle(a)},key_inputcircle:function(a){var b=this.cursor.getc();if("1"===a)b.setQnum(1!==b.qnum?1:-1);else if("2"===a)b.setQnum(2!==b.qnum?2:-1);else if("-"===a)b.setQnum(-2!==b.qnum?-2:-1);else{if("3"!==a&&" "!==a)return;b.setQnum(-1)}b.draw()}},Cell:{numberAsObject:!0,maxnum:2},Border:{getlinesize:function(){var a=this.getaddr(),b=a.clone();if(this.isVert()){for(;a.move(-1,0).getc().noNum();)a.move(-1,0);for(;b.move(1,0).getc().noNum();)b.move(1,0)}else{for(;a.move(0,-1).getc().noNum();)a.move(0,-1);for(;b.move(0,1).getc().noNum();)b.move(0,1)}return a.getc().isnull||b.getc().isnull?{x1:-1,y1:-1,x2:-1,y2:-1}:{x1:a.bx,y1:a.by,x2:b.bx,y2:b.by}}},BorderList:{setLine:function(){this.each(function(a){a.setLine()})},removeLine:function(){this.each(function(a){a.removeLine()})},setLineVal:function(a){this.each(function(b){b.setLineVal(a)})}},Address:{getlineobj:function(a){return 1==(1&a.bx)&&this.bx===a.bx&&1===Math.abs(this.by-a.by)||1==(1&a.by)&&this.by===a.by&&1===Math.abs(this.bx-a.bx)?(this.onborder()?this:a).getb():this.board.nullobj}},Board:{cols:8,rows:8,hasborder:1},LineGraph:{enabled:!0,makeClist:!0},Graphic:{gridcolor_type:"THIN",circlefillcolor_func:"qnum2",circlestrokecolor_func:"qnum2",circleratio:[.35,.3],lwratio:8,paint:function(){this.drawBGCells(),this.drawGrid(!1,this.puzzle.editmode&&!this.outputImage),this.drawPekes(),this.drawLines(),this.drawCircles(),this.drawHatenas(),this.drawTarget()}},Encode:{decodePzpr:function(a){this.decodeCircle()},encodePzpr:function(a){this.encodeCircle()}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeBorderLine()},encodeData:function(){this.encodeCellQnum(),this.encodeBorderLine()}},AnsCheck:{checklist:["checkLineExist+","checkCrossLine","checkTripleObject","checkUnshadedCircle","checkShadedCircle","checkNoLineObject+"],checkUnshadedCircle:function(){this.checkWBcircle(1,"lcInvWhite")},checkShadedCircle:function(){this.checkWBcircle(2,"lcInvBlack")},checkWBcircle:function(a,b){for(var c=!0,d=this.board.linegraph.components,e=0;e<d.length;e++){var f=d[e].clist;if(!(f.length<=1)){var g=f[0],h=f[f.length-1];if(g.qnum===a&&h.qnum===a){if(c=!1,this.checkOnly)break;d[e].setedgeerr(1),d[e].clist.seterr(1),g.seterr(1),h.seterr(1)}}}c||(this.failcode.add(b),this.board.border.setnoerr())}},FailCode:{lcTripleNum:["3つ以上の○が繋がっています。","Three or more objects are connected."],lcInvWhite:["白丸同士が繋がっています。","Two white circles are connected."],lcInvBlack:["黒丸同士が繋がっています。","Two black circles are connected."],nmNoLine:["○から線が出ていません。","A circle doesn't start any line."]}});
//# sourceMappingURL=wblink.js.map