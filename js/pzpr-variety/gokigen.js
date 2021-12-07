/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["gokigen","wagiri"],{MouseEvent:{use:!0,inputModes:{edit:["number","clear"],play:["info-line"]},mouseinput_clear:function(){this.inputclean_cross()},mouseinput_number:function(){this.mousestart&&this.inputqnum_cross()},mouseinput_auto:function(){var a=this.puzzle;a.playmode?this.mousestart||this.mousemove?this.inputslash():this.mouseend&&this.notInputted()&&this.clickslash():a.editmode&&this.mousestart&&("gokigen"===a.pid?this.inputqnum_cross():"wagiri"===a.pid&&this.inputquestion())},inputslash:function(){var a=this.getcell();if(!a.isnull){if(this.mouseCell!==a)this.firstPoint.set(this.inputPoint);else if(null!==this.firstPoint.bx){var b=null,c=this.inputPoint.bx-this.firstPoint.bx,d=this.inputPoint.by-this.firstPoint.by;c*d>0&&Math.abs(c)>=.5&&Math.abs(d)>=.5?b=31:c*d<0&&Math.abs(c)>=.5&&Math.abs(d)>=.5&&(b=32),null!==b&&(null===this.inputData?(b===a.qans&&(b=0),this.inputData=+(b>0)):0===this.inputData&&(b=b===a.qans?0:null),null!==b&&(a.setQans(b),a.draw()),this.firstPoint.reset())}this.mouseCell=a}},clickslash:function(){var a=this.getcell();if(!a.isnull){var b=this.puzzle.getConfig("use"),c="left"===this.btn?31:32,d=a.qans;1===b?a.setQans(d!==c?c:0):2===b&&a.setQans(("left"===this.btn?{0:31,31:32,32:0}:{0:32,31:0,32:31})[d]),a.drawaround()}},dispInfoLine:function(){var a=this.getcell();this.mousereset(),a.isnull||0===a.qans||null===a.path||(this.board.cell.setinfo(-1),a.path.setedgeinfo(2),this.board.hasinfo=!0,this.puzzle.redraw())}},"MouseEvent@wagiri":{inputquestion:function(){var a=this.getpos(.33);a.isinside()&&(this.cursor.equals(a)?a.oncross()?this.inputqnum_cross():a.oncell()&&this.inputwagiri(a):this.setcursor(a))},inputwagiri:function(a){var b=a.getc();if(!b.isnull){var c="left"===this.btn?[-1,1,0,2,-2]:[2,-2,0,-1,1];b.setNum(c[b.qnum+2]),b.draw()}}},"KeyEvent@gokigen":{enablemake:!0,moveTarget:function(a){return this.moveTCross(a)},keyinput:function(a){this.key_inputcross(a)}},"KeyEvent@wagiri":{enablemake:!0,moveTarget:function(a){return this.moveTBorder(a)},keyinput:function(a){this.key_wagiri(a)},key_wagiri:function(a){var b=this.cursor;if(b.oncross())this.key_inputcross(a);else if(b.oncell()){var c=b.getc(),d=0;"1"===a?d=1:"2"===a?d=2:"-"===a?d=-2:" "===a&&(d=-1),c.isnull||0===d||(c.setNum(d),c.draw())}}},TargetCursor:{crosstype:!0},Cell:{setSideObj:function(){this.sideobj=[null,null],31===this.qans?this.sideobj=[this.relcross(-1,-1),this.relcross(1,1)]:32===this.qans&&(this.sideobj=[this.relcross(-1,1),this.relcross(1,-1)])}},Cross:{maxnum:4,minnum:0},Board:{cols:7,rows:7,disable_subclear:!0},BoardExec:{adjustBoardData:function(a,b){if(a&this.TURNFLIP)for(var c=this.board.cell,d=0;d<c.length;d++){var e=c[d];e.setQans({0:0,31:32,32:31}[e.qans])}}},LineGraph:{enabled:!0,relation:{"cell.qans":"link"},pointgroup:"cross",linkgroup:"cell",rebuild2:function(){for(var a=this.board.cell,b=0;b<a.length;b++)a[b].setSideObj(),a[b].isloop=!1;this.common.rebuild2.call(this)},isedgevalidbylinkobj:function(a){return a.qans>0},setEdgeByLinkObj:function(a){null!==a.path&&(this.incdecLineCount(a,!1),this.removeEdgeByLinkObj(a)),a.qans>0&&(a.setSideObj(),this.incdecLineCount(a,!0),this.addEdgeByLinkObj(a))},setExtraData:function(a){this.common.setExtraData.call(this,a);for(var b=a.getedgeobjs(),c=0;c<b.length;c++)b[c].isloop=!1;if(!(a.circuits<=0))for(var d,e=this.board,f=[a.nodes[0].obj],g={},h=e.maxbx-e.minbx+1;f.length>0;){var i=f[f.length-1],j=null,k=g[i.by*h+i.bx];if(void 0===k)k=g[i.by*h+i.bx]=f.length-1;else if("cross"===i.group&&f.length-1>k)for(var l=f.length-2;l>=0&&f[l]!==i;l--)"cell"===f[l].group&&(f[l].isloop=!0);if("cross"===i.group){d=i;for(var l=0;l<i.pathnodes[0].nodes.length;l++){var m=i.pathnodes[0].nodes[l].obj,n=e.getc(i.bx+m.bx>>1,i.by+m.by>>1);if(void 0===g[n.by*h+n.bx]){j=n;break}}}else for(var l=0;l<i.sideobj.length;l++){var o=i.sideobj[l];if(o!==d&&o!==f[f.length-2]){j=o;break}}j?f.push(j):f.pop()}}},Graphic:{irowake:!0,margin:.5,gridcolor_type:"DLIGHT",numbercolor_func:"fixed",errcolor1:"red",crosssize:.33,paintRange:function(a,b,c,d){var e=this.board;e.haserror||e.hasinfo||!this.puzzle.getConfig("autoerr")?this.setRange(a,b,c,d):this.setRange(e.minbx-2,e.minby-2,e.maxbx+2,e.maxby+2),this.prepaint()},paint:function(){this.drawBGCells(),this.drawDashedGrid(!1),"wagiri"===this.pid&&this.drawQuesNumbers(),this.drawSlashes(),this.drawCrosses(),this.drawTarget()},getBGCellColor:function(a){return 0===a.qans&&1===a.error?this.errbcolor1:null},drawSlashes:function(){var a=this.puzzle,b=a.board;if(b.haserror||b.hasinfo||!a.getConfig("autoerr"))this.common.drawSlashes.call(this);else{var c=this.pid;b.cell.each(function(a){a.qinfo=a.isloop?"gokigen"===c?1:3:0}),this.common.drawSlashes.call(this),b.cell.setinfo(0)}},repaintLines:function(a){this.range.cells=a,this.drawSlashes(),this.context.use.canvas&&this.drawCrosses()}},"Graphic@wagiri":{fontsizeratio:.7,getNumberTextCore:function(a){return{"-2":"?",1:"輪",2:"切"}[a]||""},drawTarget:function(){var a=!this.puzzle.cursor.onborder();this.drawCursor(a,this.puzzle.editmode)}},"Encode@gokigen":{decodePzpr:function(a){var b=this.puzzle.pzpr.parser;a===b.URL_PZPRAPP&&!this.checkpflag("c")||a===b.URL_PZPRV3&&this.checkpflag("d")?this.decodecross_old():this.decode4Cross()},encodePzpr:function(a){this.encode4Cross()}},"Encode@wagiri":{decodePzpr:function(a){this.decode4Cross(),this.decodeNumber10()},encodePzpr:function(a){this.encode4Cross(),this.encodeNumber10()}},FileIO:{decodeData:function(){this.decodeCrossNum(),"wagiri"===this.pid&&this.decodeCellQnum(),this.decodeCell(function(a,b){"1"===b?a.qans=31:"2"===b&&(a.qans=32)})},encodeData:function(){this.encodeCrossNum(),"wagiri"===this.pid&&this.encodeCellQnum(),this.encodeCell(function(a){return 31===a.qans?"1 ":32===a.qans?"2 ":". "})}},AnsCheck:{checklist:["checkSlashLoop","checkQnumCross","checkSlashNoLoop@wagiri","checkNoSlashCell+"],checkQnumCross:function(){for(var a=this.board,b=0;b<a.cross.length;b++){var c=a.cross[b],d=c.qnum;if(!(d<0||d===c.lcnt)){if(this.failcode.add("crConnSlNe"),this.checkOnly)break;c.seterr(1)}}},checkNoSlashCell:function(){this.checkAllCell(function(a){return 0===a.qans},"ceNoSlash")}},"AnsCheck@gokigen":{checkSlashLoop:function(){var a=this.board.cell.filter(function(a){return a.qans>0&&a.isloop});a.length>0&&(this.failcode.add("slLoop"),this.board.cell.setnoerr(),a.seterr(1))}},"AnsCheck@wagiri":{checkSlashLoop:function(){this.checkLoops_wagiri(!1,"slLoopGiri")},checkSlashNoLoop:function(){this.checkLoops_wagiri(!0,"slNotLoopWa")},checkLoops_wagiri:function(a,b){var c=a?function(a){return!a.isloop&&a.qans>0&&1===a.qnum}:function(a){return a.isloop&&a.qans>0&&2===a.qnum},d=this.board.cell.filter(c);d.length>0&&(this.failcode.add(b),this.board.cell.setnoerr(),d.seterr(1))}},FailCode:{slLoop:["斜線で輪っかができています。","There is a loop consisted in some slashes."],slLoopGiri:["'切'が含まれた線が輪っかになっています。","There is a loop that consists '切'."],slNotLoopWa:["'輪'が含まれた線が輪っかになっていません。","There is not a loop that consists '輪'."],crConnSlNe:["数字に繋がる線の数が間違っています。","A number is not equal to count of lines that is connected to it."],ceNoSlash:["斜線がないマスがあります。","There is an empty cell."]}});
//# sourceMappingURL=gokigen.js.map