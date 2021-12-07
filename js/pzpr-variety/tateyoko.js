/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["tateyoko"],{MouseEvent:{inputModes:{edit:["number","shade","clear"]},mouseinput:function(){"shade"===this.inputMode?this.inputBlock():this.common.mouseinput.call(this)},mouseinput_auto:function(){this.puzzle.playmode?this.inputTateyoko():this.puzzle.editmode&&this.mousestart&&this.inputqnum()},clickTateyoko:function(){var a=this.getcell();a.isnull||1===a.ques||(a.setQans(("left"===this.btn?{0:12,12:13,13:0}:{0:13,12:0,13:12})[a.qans]),a.draw())},inputBlock:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(a.setQues(1===a.ques?0:1),a.draw(),this.mouseCell=a)}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputqnum_tateyoko(a)||this.key_inputqnum(a)},key_inputqnum_tateyoko:function(a){var b=this.cursor.getc();return("q"===a||"q1"===a||"q2"===a)&&("q"===a&&(a=1!==b.ques?"q1":"q2"),"q1"===a?(b.setQues(1),b.setQans(0),b.qnum>4&&b.setQnum(-1)):"q2"===a&&b.setQues(0),this.prev=b,b.draw(),!0)}},Cell:{maxnum:function(){var a=this.board;return 1===this.ques?4:Math.max(a.cols,a.rows)},minnum:0},Board:{disable_subclear:!0,addExtraInfo:function(){this.bargraph=this.addInfoList(this.klass.AreaBarGraph)}},BoardExec:{adjustBoardData:function(a,b){if(a&this.TURN)for(var c={0:0,12:13,13:12},d=this.board.cellinside(b.x1,b.y1,b.x2,b.y2),e=0;e<d.length;e++){var f=d[e];f.setQans(c[f.qans])}}},"AreaBarGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qans":"node"},setComponentRefs:function(a,b){a.bar=b},getObjNodeList:function(a){return a.barnodes},resetObjNodeList:function(a){a.barnodes=[]},isnodevalid:function(a){return a.qans>0},isedgevalidbynodeobj:function(a,b){var c=a.getdir(b,2);return c===a.UP||c===a.DN?12===a.qans&&12===b.qans:(c===a.LT||c===a.RT)&&(13===a.qans&&13===b.qans)}},Graphic:{gridcolor_type:"LIGHT",fontShadecolor:"white",paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawTateyokos(),this.drawShadeAtNumber(),this.drawQuesNumbers(),this.drawChassis(),this.drawTarget()},drawShadeAtNumber:function(){for(var a=this.vinc("cell_bcells","crispEdges",!0),b=this.range.cells,c=0;c<b.length;c++){var d=b[c];a.vid="c_full_"+d.id,1===d.ques?(a.fillStyle=1===d.error?this.errcolor1:this.quescolor,a.fillRectCenter(d.bx*this.bw,d.by*this.bh,this.bw+.5,this.bh+.5)):a.vhide()}},getQuesNumberColor:function(a){return 1!==a.ques?this.quescolor:this.fontShadecolor}},Encode:{decodePzpr:function(a){this.decodeTateyoko()},encodePzpr:function(a){this.encodeTateyoko()},decodeTateyoko:function(){var a=0,b=0,c=this.outbstr,d=this.board;for(b=0;b<c.length;b++){var e=c.charAt(b),f=d.cell[a];if("x"===e?f.ques=1:this.include(e,"o","s")?(f.ques=1,f.qnum=parseInt(e,29)-24):this.include(e,"0","9")||this.include(e,"a","f")?f.qnum=parseInt(e,16):"-"===e?(f.qnum=parseInt(c.substr(b+1,2),16),b+=2):"i"===e&&(a+=parseInt(c.charAt(b+1),16)-1,b++),a++,!d.cell[a])break}this.outbstr=c.substr(b)},encodeTateyoko:function(a){for(var b="",c=0,d=this.board,e=0;e<d.cell.length;e++){var f="",g=d.cell[e].ques,h=d.cell[e].qnum;0===g?-1===h?c++:-2===h?f=".":h<16?f=""+h.toString(16):h<256?f="-"+h.toString(16):(f="",c++):1===g&&(f=h>=0?(h+24).toString(29):"x"),0===c?b+=f:(f||15===c)&&(b+=1===c?"n"+f:"i"+c.toString(16)+f,c=0)}1===c?b+="n":c>1&&(b+="i"+c.toString(16)),this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeCell(function(a,b){b>="a"&&b<="f"?(a.ques=1,a.qnum={a:1,b:2,c:3,d:4,e:0,f:-1}[b]):"?"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)}),this.decodeCell(function(a,b){"1"===b?a.qans=12:"2"===b&&(a.qans=13)})},encodeData:function(){this.encodeCell(function(a){return 1===a.ques?-1===a.qnum||-2===a.qnum?"f ":{0:"e ",1:"a ",2:"b ",3:"c ",4:"d "}[a.qnum]:-2===a.qnum?"? ":a.qnum>=0?a.qnum+" ":". "}),this.encodeCell(function(a){if(1!==a.ques){if(0===a.qans)return"0 ";if(12===a.qans)return"1 ";if(13===a.qans)return"2 "}return". "})}},AnsCheck:{checklist:["checkBarOverNum","checkDoubleNumberInBar","checkSizeAndNumberInBar","checkBarLessNum","checkEmptyCell_tateyoko+"],checkDoubleNumberInBar:function(){var a=this.board.cell,b=this.failcode.length;this.checkAllBlock(this.board.bargraph,function(a){return a.isNum()},function(a,b,c,d){return c<2},"baPlNum"),b!==this.failcode.length&&a.setnoerr()},checkSizeAndNumberInBar:function(){var a=this.board.cell,b=this.failcode.length;this.checkAllArea(this.board.bargraph,function(a,b,c,d){return d<=0||d===c},"bkSizeNe"),b!==this.failcode.length&&a.setnoerr()},checkBarOverNum:function(){this.checkShade(1,"nmConnBarWrong")},checkBarLessNum:function(){this.checkShade(2,"nmConnBarWrong")},checkShade:function(a,b){for(var c=this.board,d=0;d<c.cell.length;d++){var e=c.cell[d],f=e.qnum;if(!(1!==e.ques||f<0)){var g,h=0,i=0,j=e.adjacent;if(g=j.top,g.isnull||(12===g.qans?h++:13===g.qans&&i++),g=j.bottom,g.isnull||(12===g.qans?h++:13===g.qans&&i++),g=j.left,g.isnull||(13===g.qans?h++:12===g.qans&&i++),g=j.right,g.isnull||(13===g.qans?h++:12===g.qans&&i++),!(1===a&&f<=4-i&&f>=h||2===a&&f===h)){if(this.failcode.add(b),this.checkOnly)break;e.seterr(1)}}}},checkEmptyCell_tateyoko:function(){this.checkAllCell(function(a){return 0===a.ques&&0===a.qans},"ceNoBar")}},FailCode:{ceNoBar:["何も入っていないマスがあります。","There is an empty cell."],bkSizeNe:["数字と棒の長さが違います。","The number is different from the length of the line."],baPlNum:["1つの棒に2つ以上の数字が入っています。","A line passes more than one number."],nmConnBarWrong:["黒マスに繋がる線の数が正しくありません。","The number of lines connected to a shaded cell is wrong."]}});
//# sourceMappingURL=tateyoko.js.map