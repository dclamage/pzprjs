/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["interbd"],{MouseEvent:{use:!0,inputModes:{edit:["number","color","color-","clear"],play:["shade","unshade"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&this.mouseinput_numcolor()},mouseinput_numcolor:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(a!==this.cursor.getc()?this.setcursor(a):(this.setNewNumColor(a),a.draw()),this.mouseCell=a)},setNewNumColor:function(a){var b=a.getNumColor();"left"===this.btn?65===b?a.setNumColor(-1):-1===b?a.setNumColor(0):b>=60?a.setNumColor(b%10+1):a.setNumColor(b+10):"right"===this.btn&&(-1===b?a.setNumColor(65):0===b?a.setNumColor(-1):b<10?a.setNumColor(b+59):a.setNumColor(b-10))},getNewNumber:function(a,b){var c=0!==a.ques,d=a.getmaxnum(),e=a.getminnum(),f=-1;return"left"===this.btn?f=b>=d?c?-2:-1:-1===b?-2:b<e?e:b+1:"right"===this.btn&&(f=-1===b||b>d||-2===b&&c?d:b<=e?-2:-2===b?-1:b-1),f},mouseinput_other:function(){!this.mousestart||"left"!==this.btn&&"right"!==this.btn||"color"!==this.inputMode&&"color-"!==this.inputMode||this.mouseinput_color()},mouseinput_color:function(){var a=this.getcell();a.isnull||a===this.mouseCell||(a!==this.cursor.getc()?this.setcursor(a):(this.setNewQues(a),a.draw()),this.mouseCell=a)},setNewQues:function(a){var b=a.ques,c=a.qnum;"left"===this.btn==("color"===this.inputMode)?b>=6?(-2===c&&a.setQnum(-1),a.setQues(0)):0===b&&-1===c?a.setNum(-2):a.setQues(b+1):0===b?-2===c?a.setQnum(-1):(-1===c&&a.setNum(-2),a.setQues(6)):a.setQues(b-1)}},KeyEvent:{enablemake:!0,keyinput:function(a){"-"===a?this.key_undef():this.key_interbd(a)},keyrows:["qwerty","asdfgh","zxcvbn"],key_undef:function(){var a=this.cursor.getc();-2!==a.qnum?a.setQnum(-2):0!==a.ques?a.setQues(0):a.setQnum(-1),a.draw()},key_interbd:function(a){var b=this.cursor.getc(),c=-1;for(var d in this.keyrows)if(-1!==(c=this.keyrows[d].indexOf(a))){c+=1;break}-1!==c?(b.ques!==c||-1===b.qnum?b.setQues(c):(b.setQues(0),c=-1),-1===c&&-2===b.qnum?b.setQnum(-1):-1===b.qnum&&b.setNum(-2),b.draw()):this.key_inputqnum(a)}},Cell:{numberRemainsUnshaded:!0,minnum:0,maxnum:4,getNumColor:function(){if(-1===this.qnum&&0===this.ques)return-1;var a=this.qnum<0?0:this.qnum+1;return 10*this.ques+a},setNumColor:function(a){if(a<0)this.setQnum(-1),this.setQues(0);else{var b=a%10;this.setQnum(b>0?b-1:-2),this.setQues(a/10|0),this.setQans(0),this.setQsub(0)}},posthook:{qnum:function(a){-1===a&&this.setQues(0)}}},AreaUnshadeGraph:{enabled:!0},Graphic:{numbercolor_func:"qnum",qanscolor:"black",circleratio:[.43,.37],colors:["gray","red","blue","green","#c000c0","#ff8000","#00c0c0"],paint:function(){this.drawBGCells(),this.drawShadedCells(),this.drawDotCells(),this.drawGrid(),this.drawCircles(),this.drawQuesMarks(),this.drawQuesNumbers(),this.drawChassis(),this.drawTarget()},getCircleStrokeColor:function(a){return 1!==this.puzzle.getConfig("disptype_interbd")?null:a.ques<1||a.ques>6?-1!==a.qnum?this.colors[0]:null:this.colors[a.ques]},getQuesNumberText:function(a){return-2!==a.qnum||1!==this.puzzle.getConfig("disptype_interbd")&&0===a.ques?this.getNumberText(a,a.qnum):""},getQuesNumberColor:function(a){return 2===this.puzzle.getConfig("disptype_interbd")||3===this.puzzle.getConfig("disptype_interbd")&&0===a.ques?this.quescolor:this.colors[a.ques]},getNumberVerticalOffset:function(a){return this.fontsizeratio=1===this.puzzle.getConfig("disptype_interbd")?.65:.45,1!==this.puzzle.getConfig("disptype_interbd")&&3===a.ques?.1*this.cw:0},drawQuesMarks:function(){var a=this.vinc("cell_mark","auto"),b=this.puzzle.getConfig("disptype_interbd");a.lineWidth=Math.max(this.cw/18,2);for(var c=.4*this.cw,d=.867*c,e=c,f=Math.sin(.4*Math.PI)*c,g=Math.cos(.4*Math.PI)*c,h=Math.sin(.8*Math.PI)*c,i=Math.cos(.8*Math.PI)*c,j=Math.sin(.333*Math.PI)*c,k=Math.cos(.333*Math.PI)*c,l=this.range.cells,m=0;m<l.length;m++){var n=l[m];if(a.vid="c_mk_"+n.id,1!==b){a.strokeStyle=2===b?this.quescolor:this.colors[n.ques];var o=n.bx*this.bw,p=n.by*this.bh;switch(n.ques){case 1:a.strokeCircle(o,p,c);break;case 2:a.beginPath(),a.setOffsetLinePath(o,p,0,-c,c,0,0,c,-c,0,!0),a.stroke();break;case 3:a.beginPath(),a.setOffsetLinePath(o,p,0,-d,-e,d,e,d,!0),a.stroke();break;case 4:a.strokeRectCenter(o,p,c,c);break;case 5:a.beginPath(),a.setOffsetLinePath(o,p,0,-c,-f,-g,-h,-i,h,-i,f,-g,!0),a.stroke();break;case 6:a.beginPath(),a.setOffsetLinePath(o,p,c,0,k,j,-k,j,-c,0,-k,-j,k,-j,!0),a.stroke();break;default:a.vhide()}}else a.vhide()}}},Encode:{decodePzpr:function(a){this.decodeNumColor()},encodePzpr:function(a){this.encodeNumColor()},decodeNumColor:function(){for(var a=0,b=0,c=this.outbstr,d=this.board;b<c.length&&d.cell[a];){var e=d.cell[a],f=c.charAt(b),g=this.readNumber16(c,b);-1!==g[0]?(e.setNumColor(g[0]),b+=g[1],a++):f>="g"&&f<="z"?(a+=parseInt(f,36)-15,b++):b++}this.outbstr=c.substr(b)},encodeNumColor:function(){for(var a=0,b="",c=this.board,d=0;d<c.cell.length;d++){var e=c.cell[d].getNumColor(),f=this.writeNumber16(e);""===f&&a++,0===a?b+=f:(f||20===a)&&(b+=(15+a).toString(36)+f,a=0)}a>0&&(b+=(15+a).toString(36)),this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeCellNumColorAns()},encodeData:function(){this.encodeCellNumColorAns()},decodeCellNumColorAns:function(){this.decodeCell(function(a,b){"#"===b?a.qans=1:"+"===b?a.qsub=1:"."!==b&&a.setNumColor(+b)})},encodeCellNumColorAns:function(){this.encodeCell(function(a){var b=a.getNumColor();return b>=0?b+" ":1===a.qans?"# ":1===a.qsub?"+ ":". "})}},AnsCheck:{checklist:["checkDir4ShadeOver","checkNoColor","checkSurrounded","checkSeparated","checkColors","checkDir4ShadeLess+","checkDivision"],checkDir4ShadeOver:function(){this.checkDir4Cell(function(a){return a.isShade()},2,"nmShadeGt")},checkDir4ShadeLess:function(){this.checkDir4Cell(function(a){return a.isShade()},1,"nmShadeLt")},checkColors:function(){this.checkSameObjectInRoom(this.board.ublkmgr,function(a){return a.ques-1},"bkPlColor")},checkNoColor:function(){this.checkAllBlock(this.board.ublkmgr,function(a){return a.ques>0},function(a,b,c,d){return 0!==c},"bkNoColor")},checkSurrounded:function(){for(var a=0;a<this.board.cell.length;a++){var b=this.board.cell[a];if(b.isShade()){if(!(b.countDir4Cell(function(a){return!a.isShade()})>=2)){if(this.failcode.add("shSurrounded"),this.checkOnly)break;b.seterr(1)}}}},checkSeparated:function(){for(var a=this.board.ublkmgr.components,b=0;b<a.length;b++)a[b].colors=0;for(var c=0;c<this.board.cell.length;c++){var d=this.board.cell[c];0!==d.ques&&(d.ublk.colors|=1<<d.ques-1)}for(var e=0,f=0,a=this.board.ublkmgr.components,b=0;b<a.length;b++){var g=a[b].colors;f|=g&e,e|=g}if(0!==f&&(this.failcode.add("bkSepColor"),!this.checkOnly))for(var c=0;c<this.board.cell.length;c++){var d=this.board.cell[c];0!==d.ques&&(f&1<<d.ques-1&&d.seterr(1))}},checkDivision:function(){for(var a=0;a<this.board.cell.length;a++){var b=this.board.cell[a];if(1===b.qans){var c=b.getdir4clist().filter(function(a){return!a[0].isShade()});if(!(c.length<2)){for(var d=c[0][0].ublk,e=!1,f=1;f<c.length;f++)if(c[f][0].ublk!==d){e=!0;break}if(!e){if(this.failcode.add("shNoDivide"),this.checkOnly)break;b.seterr(1)}}}}}},FailCode:{nmShadeLt:["(please translate) The number of shaded cells around a number is not correct.","The number of shaded cells around a number is not correct."],nmShadeGt:["(please translate) The number of shaded cells around a number is not correct.","The number of shaded cells around a number is not correct."],bkPlColor:["(please translate) A country has more than one color.","A country has more than one color."],bkNoColor:["(please translate) A country has no color.","A country has no color."],bkSepColor:["(please translate) One kind of color is included in different countries.","One kind of color is included in different countries."],shSurrounded:["(please translate) A shaded cell cannot divide two or more countries.","A shaded cell cannot divide two or more countries."],shNoDivide:["(please translate) A shaded cell does not divide two or more countries.","A shaded cell does not divide two or more countries."]}});
//# sourceMappingURL=interbd.js.map