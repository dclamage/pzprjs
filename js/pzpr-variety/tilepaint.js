/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["tilepaint"],{MouseEvent:{use:!0,inputModes:{edit:["clear","number","border","bgpaint"],play:["shade","unshade"]},mouseinput:function(){"shade"===this.inputMode||"unshade"===this.inputMode?this.inputtile():this.common.mouseinput.call(this)},mouseinput_clear:function(){this.input51_fixed()},mouseinput_number:function(){this.mousestart&&this.inputqnum_cell51()},mouseinput_other:function(){"bgpaint"===this.inputMode&&this.inputBGcolor1()},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputtile():this.puzzle.editmode&&("left"===this.btn?(this.mousestart||this.mousemove)&&this.inputborder():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputBGcolor1(),this.mouseend&&this.notInputted()&&this.input51())},inputBGcolor1:function(){var a=this.getcell();a.isnull||a===this.mouseCell||a.is51cell()||(null===this.inputData&&(this.inputData=0===a.qsub?3:0),a.setQsub(this.inputData),this.mouseCell=a,a.draw())}},KeyEvent:{enablemake:!0,keyinput:function(a){this.inputnumber51(a)}},Cell:{qnum:0,qnum2:0,disInputHatena:!0,getmaxnum:function(){var a=this.board;return this.puzzle.cursor.detectTarget(this)===this.RT?a.cols-(this.bx>>1)-1:a.rows-(this.by>>1)-1},minnum:0,set51cell:function(){this.setQues(51),this.setQnum(0),this.setQnum2(0),this.clrShade(),this.setQsub(0),this.set51aroundborder()},remove51cell:function(){this.setQues(0),this.setQnum(0),this.setQnum2(0),this.clrShade(),this.setQsub(0)},set51aroundborder:function(){for(var a=this.getdir4cblist(),b=0;b<a.length;b++){var c=a[b][0],d=a[b][1];d.isnull||d.setQues(this.is51cell()^c.is51cell()?1:0)}}},ExCell:{ques:51,qnum:0,qnum2:0,disInputHatena:!0,getmaxnum:function(){var a=this.board;return-1===this.by?a.rows:a.cols},minnum:0},CellList:{subclear:function(){var a=[],b={};this.length>0&&(a=this[0].getproplist(["sub","info"]),b=this[0].propnorec);for(var c=0;c<this.length;c++)for(var d=this[c],e=0;e<a.length;e++){var f=a[e],g=d.constructor.prototype[f];d[f]===g||"qsub"===f&&3===d.qsub||(b[f]||d.addOpe(f,d[f],g),d[f]=g)}}},Board:{hasborder:1,hasexcell:1},BoardExec:{adjustBoardData:function(a,b){this.adjustQues51_1(a,b)},adjustBoardData2:function(a,b){this.adjustQues51_2(a,b)}},AreaRoomGraph:{enabled:!0,isnodevalid:function(a){return!a.is51cell()}},Graphic:{enablebcolor:!0,bgcellcolor_func:"qsub3",bbcolor:"rgb(96, 96, 96)",paint:function(){this.drawBGCells(),this.drawBGExCells(),this.drawShadedCells(),this.drawQues51(),this.drawGrid(),this.drawBorders(),this.drawBoxBorders(!0),this.drawChassis_ex1(!0),this.drawQuesNumbersOn51(),this.drawTarget()}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeTilePaint()},encodePzpr:function(a){this.encodeBorder(),this.encodeTilePaint()},decodeTilePaint:function(){var a=0,b=0,c=this.outbstr,d=this.board;d.disableInfo();for(var e=0;e<c.length;e++){var f=c.charAt(e),g=d.cell[a];if(f>="g"&&f<="z"?a+=parseInt(f,36)-16:(g.set51cell(),"-"===f?(g.qnum2="."!==c.charAt(e+1)?parseInt(c.charAt(e+1),16):-1,g.qnum=parseInt(c.substr(e+2,2),16),e+=3):"+"===f?(g.qnum2=parseInt(c.substr(e+1,2),16),g.qnum="."!==c.charAt(e+3)?parseInt(c.charAt(e+3),16):-1,e+=3):"="===f?(g.qnum2=parseInt(c.substr(e+1,2),16),g.qnum=parseInt(c.substr(e+3,2),16),e+=4):(g.qnum2="."!==c.charAt(e)?parseInt(c.charAt(e),16):-1,g.qnum="."!==c.charAt(e+1)?parseInt(c.charAt(e+1),16):-1,e+=1)),a++,!d.cell[a]){b=e+1;break}}d.enableInfo(),a=0;for(var e=b;e<c.length;e++){var f=c.charAt(e),h=d.excell[a];if("."===f?h.qnum2=-1:"-"===f?(h.qnum2=parseInt(c.substr(e+1,1),16),e+=2):h.qnum2=parseInt(f,16),++a>=d.cols){b=e+1;break}}for(var e=b;e<c.length;e++){var f=c.charAt(e),h=d.excell[a];if("."===f?h.qnum=-1:"-"===f?(h.qnum=parseInt(c.substr(e+1,2),16),e+=2):h.qnum=parseInt(f,16),++a>=d.cols+d.rows){b=e+1;break}}this.outbstr=c.substr(b)},encodeTilePaint:function(a){for(var b="",c=this.board,d=0,e=0;e<c.cell.length;e++){var f="",g=c.cell[e];51===g.ques?(f+=g.qnum2.toString(16),f+=g.qnum.toString(16),g.qnum>=16&&g.qnum2>=16?f="="+f:g.qnum>=16?f="-"+f:g.qnum2>=16&&(f="+"+f)):d++,0===d?b+=f:(f||20===d)&&(b+=(d+15).toString(36)+f,d=0)}d>0&&(b+=(d+15).toString(36));for(var e=0;e<c.cols;e++){var h=c.excell[e].qnum2;h<0?b+=".":h<16?b+=h.toString(16):h<256&&(b+="-"+h.toString(16))}for(var e=c.cols;e<c.cols+c.rows;e++){var h=c.excell[e].qnum;h<0?b+=".":h<16?b+=h.toString(16):h<256&&(b+="-"+h.toString(16))}this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeAreaRoom(),this.decodeCellQnum51(),this.decodeCell(function(a,b){"#"===b?a.qans=1:"+"===b?a.qsub=1:"-"===b&&(a.qsub=3)})},encodeData:function(){this.encodeAreaRoom(),this.encodeCellQnum51(),this.encodeCell(function(a){return 1===a.qans?"# ":1===a.qsub?"+ ":3===a.qsub?"- ":". "})}},AnsCheck:{checklist:["checkShadeCellExist","checkSameColorTile","checkRowsColsShadeCell"],checkRowsColsShadeCell:function(){this.checkRowsColsPartly(this.isShadeCount,function(a){return a.is51cell()},"asShadeNe")},isShadeCount:function(a,b){var c=b.key51num,d=a.filter(function(a){return a.isShade()}).length,e=c<0||d===c;return e||(b.keycell.seterr(1),a.seterr(1)),e}},FailCode:{asShadeNe:["数字の下か右にある黒マスの数が間違っています。","The number of shaded cells underward or rightward is not correct."]}});
//# sourceMappingURL=tilepaint.js.map