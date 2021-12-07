/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["reflect"],{MouseEvent:{inputModes:{edit:["quesmark","quesmark-","number","info-line"],play:["line","peke","info-line"]},mouseinput_other:function(){this.inputMode.match(/quesmark/)&&this.mousestart&&this.inputQuesTriangle()},mouseinput_auto:function(){this.puzzle.playmode?"left"===this.btn?this.mousestart||this.mousemove?this.inputLine():this.mouseend&&this.notInputted()&&this.inputpeke():"right"===this.btn&&(this.mousestart||this.mousemove)&&this.inputpeke():this.puzzle.editmode&&this.mousestart&&this.inputQuesTriangle()},inputQuesTriangle:function(a){this.inputQues([0,2,3,4,5,11])}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputLineParts(a)||this.key_inputqnum(a)},key_inputLineParts:function(a){var b=this.cursor.getc();if("q"===a)b.setQues(2),b.setQnum(-1);else if("w"===a)b.setQues(3),b.setQnum(-1);else if("e"===a)b.setQues(4),b.setQnum(-1);else if("r"===a)b.setQues(5),b.setQnum(-1);else if("t"===a)b.setQues(11),b.setQnum(-1);else{if("y"!==a)return!1;b.setQues(0),b.setQnum(-1)}return b.drawaround(),!0}},Cell:{disInputHatena:!0,maxnum:function(){var a=this.ques,b=-1;return 2===a||3===a?b+=1+(this.by>>1):4!==a&&5!==a||(b+=this.board.rows-(this.by>>1)),3===a||4===a?b+=1+(this.bx>>1):2!==a&&5!==a||(b+=this.board.cols-(this.bx>>1)),b},minnum:3,getTriLine:function(){var a,b=new this.klass.BorderList,c=this.adjborder;for(a=c.left;!a.isnull&&a.isLine();)b.add(a),a=a.relbd(-2,0);for(a=c.right;!a.isnull&&a.isLine();)b.add(a),a=a.relbd(2,0);for(a=c.top;!a.isnull&&a.isLine();)b.add(a),a=a.relbd(0,-2);for(a=c.bottom;!a.isnull&&a.isLine();)b.add(a),a=a.relbd(0,2);return b}},Border:{enableLineNG:!0},Board:{hasborder:1},BoardExec:{adjustBoardData:function(a,b){if(a&this.TURNFLIP){var c={};switch(a){case this.FLIPY:c={2:5,3:4,4:3,5:2};break;case this.FLIPX:c={2:3,3:2,4:5,5:4};break;case this.TURNR:c={2:5,3:2,4:3,5:4};break;case this.TURNL:c={2:3,3:4,4:5,5:2}}for(var d=this.board.cellinside(b.x1,b.y1,b.x2,b.y2),e=0;e<d.length;e++){var f=d[e],g=c[f.ques];g&&f.setQues(g)}}}},LineGraph:{enabled:!0,isLineCross:!0},Graphic:{hideHatena:!0,irowake:!0,gridcolor_type:"LIGHT",paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawPekes(),this.drawLines(),this.drawTriangle(),this.drawTriangleBorder(),this.drawNumbers_reflect(),this.draw11s(),this.drawChassis(),this.drawTarget()},getTriangleColor:function(a){return 1===a.error||4===a.error||1===a.qinfo||4===a.qinfo?this.errcolor1:this.quescolor},drawTriangleBorder:function(){for(var a=this.vinc("cell_triangle_border","crispEdges",!0),b=this.range.borders,c=0;c<b.length;c++){var d=b[c],e=d.isVert(),f=d.sidecell[0].ques,g=d.sidecell[1].ques,h=d.bx*this.bw,i=d.by*this.bh;a.vid="b_tb_"+d.id,a.fillStyle=this.gridcolor,!e||3!==f&&4!==f||2!==g&&5!==g?e||2!==f&&3!==f||4!==g&&5!==g?a.vhide():a.fillRectCenter(h,i,this.bw,.5):a.fillRectCenter(h,i,.5,this.bh)}},draw11s:function(){for(var a=this.vinc("cell_ques","crispEdges",!0),b=this.range.cells,c=0;c<b.length;c++){var d=b[c];if(a.vid="c_lp11_"+d.id,11===d.ques){var e=this.lw+2,f=(e-1)/2,g=.38*this.cw,h=d.bx*this.bw,i=d.by*this.bh;a.fillStyle=this.quescolor,a.beginPath(),a.setOffsetLinePath(h,i,-f,-f,-f,-g,f,-g,f,-f,g,-f,g,f,f,f,f,g,-f,g,-f,f,-g,f,-g,-f,!0),a.fill()}else a.vhide()}},drawNumbers_reflect:function(){var a=this.vinc("cell_number","auto");a.fillStyle="white";for(var b=this.range.cells,c=0;c<b.length;c++){var d=b[c],e=this.getQuesNumberText(d);a.vid="cell_text_"+d.id,e?this.disptext(e,d.bx*this.bw,d.by*this.bh,{position:d.ques,ratio:.45}):a.vhide()}},getQuesNumberText:function(a){return a.ques>=2&&a.ques<=5?this.getNumberTextCore(a.qnum):""},repaintParts:function(a){this.range.cells=a.cellinside(),this.draw11s()}},Encode:{decodePzpr:function(a){this.decodeReflectlink()},encodePzpr:function(a){this.encodeReflectlink()},decodeReflectlink:function(){for(var a=0,b=this.outbstr,c=this.board,d=0;d<b.length;d++){var e=b.charAt(d),f=c.cell[a];if("5"===e?f.ques=11:this.include(e,"1","4")?(f.ques=parseInt(e,10)+1,f.qnum=parseInt(b.substr(d+1,1),16),d++):this.include(e,"6","9")?(f.ques=parseInt(e,10)-4,f.qnum=parseInt(b.substr(d+1,2),16),d+=2):this.include(e,"a","z")&&(a+=parseInt(e,36)-10),0===f.qnum&&(f.qnum=-1),a++,!c.cell[a])break}this.outbstr=b.substr(d)},encodeReflectlink:function(a){for(var b="",c="",d=0,e=this.board,f=0;f<e.cell.length;f++){var g=e.cell[f].ques;if(11===g)c="5";else if(g>=2&&g<=5){var h=e.cell[f].qnum;h<=0?c=g-1+"0":h>=1&&h<16?c=""+(g-1)+h.toString(16):h>=16&&h<256&&(c=""+(g+4)+h.toString(16))}else c="",d++;0===d?b+=c:(c||26===d)&&(b+=(9+d).toString(36)+c,d=0)}d>0&&(b+=(9+d).toString(36)),this.outbstr+=b}},FileIO:{decodeData:function(){this.decodeCell(function(a,b){"+"===b?a.ques=11:"."!==b&&(a.ques=+b.charAt(0)+1,b.length>1&&(a.qnum=+b.substr(1)))}),this.decodeBorderLine()},encodeData:function(){this.encodeCell(function(a){return 11===a.ques?"+ ":a.ques>=2&&a.ques<=5?""+(a.ques-1)+(-1!==a.qnum?a.qnum:"")+" ":". "}),this.encodeBorderLine()}},AnsCheck:{checklist:["checkLineExist+","checkBranchLine","checkCrossOutOfMark","checkLongLines","checkTriangle","checkShortLines","checkNotCrossOnMark","checkDeadendLine+","checkOneLoop"],checkCrossOutOfMark:function(){this.checkAllCell(function(a){return 4===a.lcnt&&11!==a.ques},"lnCrossExMk")},checkTriangle:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(!(0===c.ques||11===c.ques||c.lcnt>0)){if(this.failcode.add("lnExTri"),this.checkOnly)break;c.seterr(4)}}},checkLongLines:function(){this.checkTriNumber(1,"lnLenGt")},checkShortLines:function(){this.checkTriNumber(2,"lnLenLt")},checkTriNumber:function(a,b){for(var c=!0,d=this.board,e=0;e<d.cell.length;e++){var f=d.cell[e];if(0!==f.ques&&11!==f.ques&&f.isValidNum()){var g=f.getTriLine();if(!(1===a?f.qnum>=g.length+1:f.qnum<=g.length+1)){if(c=!1,this.checkOnly)break;f.seterr(4),g.seterr(1)}}}c||(this.failcode.add(b),d.border.setnoerr())}},FailCode:{lnCrossExMk:["十字以外の場所で線が交差しています。","There is a crossing outside given crosses."],lnExTri:["線が三角形を通過していません。","A line doesn't goes through a triangle."],lnLenGt:["三角形の数字とそこから延びる線の長さが一致していません。","The lines passing a triangle are too long."],lnLenLt:["三角形の数字とそこから延びる線の長さが一致していません。","The lines passing a triangle are too short."]}});
//# sourceMappingURL=reflect.js.map