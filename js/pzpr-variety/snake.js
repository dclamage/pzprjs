/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["snake"],{MouseEvent:{use:!0,inputModes:{edit:["number","circle-shade","circle-unshade","clear"],play:["shade","unshade"]},mouseinput:function(){"shade"===this.inputMode||"unshade"===this.inputMode?this.inputcell():this.common.mouseinput.call(this)},mouseinput_number:function(){this.mousestart&&this.inputqnum_excell()},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&(this.inputqnum_excell()||this.inputqnum())},inputqnum_excell:function(){var a=this.getcell_excell();return!a.isnull&&"excell"===a.group&&(a!==this.cursor.getex()?this.setcursor(a):this.inputqnum_main(a),!0)}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputexcell(a)||this.key_inputqnum(a)},key_inputexcell:function(a){var b=this.cursor.getex(),c=b.qnum;if(b.isnull)return!1;var d=b.getmaxnum();if("0"<=a&&a<="9"){var e=+a;c<=0||this.prev!==b?e<=d&&b.setQnum(e):10*c+e<=d?b.setQnum(10*c+e):e<=d&&b.setQnum(e)}else{if(" "!==a&&"-"!==a)return!0;b.setQnum(-1)}return this.prev=b,this.cursor.draw(),!0}},TargetCursor:{initCursor:function(){this.init(-1,-1)}},Cell:{numberAsObject:!0,disInputHatena:!0,maxnum:2,prehook:{qsub:function(){return-1!==this.qnum}},shades:function(){return this.countDir4Cell(function(a){return a.isShade()})}},ExCell:{disInputHatena:!0,maxnum:function(){var a=this.bx,b=this.by;return-1===a&&-1===b?0:-1===b?this.board.rows:this.board.cols},minnum:0},Board:{hasexcell:1,cols:8,rows:8},AreaShadeGraph:{enabled:!0},BoardExec:{adjustBoardData:function(a,b){this.adjustExCellTopLeft_1(a,b)},adjustBoardData2:function(a,b){this.adjustExCellTopLeft_2(a,b)}},Graphic:{enablebcolor:!0,shadecolor:"rgb(80, 80, 80)",circlefillcolor_func:"qnum2",getCircleStrokeColor:function(a){return a.qnum>0?this.quescolor:null},paint:function(){this.drawBGCells(),this.drawDotCells(),this.drawShadedCells(),this.drawGrid(),this.drawNumbersExCell(),this.drawCircles(),this.drawChassis(),this.drawTarget()}},Encode:{decodePzpr:function(a){this.decodeCircle(),this.decodeNumber16ExCell()},encodePzpr:function(a){this.encodeCircle(),this.encodeNumber16ExCell()}},FileIO:{decodeData:function(){this.decodeCellExCell(function(a,b){if("."!==b)if("excell"!==a.group||a.isnull){if("cell"===a.group){var c=3&+b,d=(12&+b)>>2;a.qnum=c>=0?c:-1,1===d?a.qans=1:2===d&&(a.qsub=1)}}else a.qnum=+b})},encodeData:function(){this.encodeCellExCell(function(a){if("excell"===a.group&&!a.isnull&&-1!==a.qnum)return a.qnum+" ";if("cell"===a.group){var b=a.qnum||0;return b<0&&(b=0),1===a.qans?b|=4:1===a.qsub&&(b|=8),b+" "}return". "})}},AnsCheck:{checklist:["checkShadeCellExist+","check2x2ShadeCell","checkShadeBranch","checkShadeOnCircle","checkCircleEndpoint","checkCircleMidpoint","checkShadeDiagonal","checkShadeCount+","checkConnectShade","checkShadeLoop"],checkShadeBranch:function(){this.checkAllCell(function(a){return a.isShade()&&a.countDir4Cell(function(a){return a.isShade()})>2},"shBranch")},checkShadeDiagonal:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(!(c.bx>=a.maxbx-1||c.by>=a.maxby-1)){var d=c.bx,e=c.by,f=a.cellinside(d,e,d+2,e+2).filter(function(a){return a.isShade()});if(2===f.length){var g=f[0],h=f[1];if(g.bx!==h.bx&&g.by!==h.by&&(g.sblk===h.sblk||2===g.shades()||2===h.shades())){if(this.failcode.add("shDiag"),this.checkOnly)break;f.seterr(1)}}}}},checkCircleEndpoint:function(){this.checkAllCell(function(a){return 2===a.qnum&&1!==a.shades()},"shEndpoint")},checkCircleMidpoint:function(){this.checkAllCell(function(a){return 1===a.qnum&&2!==a.shades()},"shMidpoint")},checkShadeOnCircle:function(){this.checkAllCell(function(a){return!a.isShade()&&a.qnum>0},"circleUnshade")},checkShadeCount:function(){this.checkRowsCols(this.isExCellCount,"exShadeNe")},checkShadeLoop:function(){for(var a=this.board.sblkmgr.components,b=0;b<a.length;b++){for(var c=a[b].clist,d=!0,e=0;e<c.length;e++){if(2!==c[e].shades()){d=!1;break}}if(d&&(this.failcode.add("shLoop"),c.seterr(1),this.checkOnly))break}},isExCellCount:function(a){var b=a.getRectSize(),c=this.board,d=a.filter(function(a){return a.isShade()}).length,e=!0;if(b.x1===b.x2){var f=c.getex(b.x1,-1);-1!==f.qnum&&f.qnum!==d&&(f.seterr(1),e=!1)}if(b.y1===b.y2){var f=c.getex(-1,b.y1);-1!==f.qnum&&f.qnum!==d&&(f.seterr(1),e=!1)}return e||a.seterr(1),e}},FailCode:{cs2x2:["スネークが自分自身とタテヨコナナメに接しています。","The snake loops back on itself."],shBranch:["スネークが分岐しています。","The snake branches off."],shLoop:["頭または尾がありません。","The snake has no head or tail."],shEndpoint:["頭または尾になっていない黒丸があります。","A black circle is not on an endpoint."],shMidpoint:["胴体になっていない白丸があります。","A white circle is not a middle."],shDiag:["スネークが自分自身とタテヨコナナメに接しています。","The snake touches itself diagonally."],circleUnshade:["塗られていない丸があります。","A circle is not shaded."],exShadeNe:["行または列内にあるスネークのマスの数と外の数字が異なります。","The number of shaded cells in the row or column is not correct."]}});
//# sourceMappingURL=snake.js.map