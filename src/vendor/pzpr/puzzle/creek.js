/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
pzpr.createCustoms("creek",{MouseEvent:{mouseinput:function(){this.owner.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.owner.editmode&&this.mousestart&&this.inputcross()}},KeyEvent:{enablemake:!0,moveTarget:function(a){return this.moveTCross(a)},keyinput:function(a){this.key_inputcross(a)}},TargetCursor:{crosstype:!0},Cross:{maxnum:4,minnum:0},Board:{iscross:2},AreaWhiteManager:{enabled:!0},Flags:{use:!0},Graphic:{margin:.5,initialize:function(){this.Common.prototype.initialize.call(this),this.cellcolor="rgb(96, 96, 96)",this.setBGCellColorFunc("qans1"),this.crosssize=.35},paint:function(){this.drawBGCells(),this.drawDotCells(!1),this.drawGrid(),this.drawChassis(),this.drawCrosses(),this.drawTarget()}},Encode:{decodePzpr:function(a){var b=1==a&&!this.checkpflag("c")||0==a&&this.checkpflag("d");b?this.decodecross_old():this.decode4Cross()},encodePzpr:function(a){1==a&&(this.outpflag="c"),this.encode4Cross()}},FileIO:{decodeData:function(){this.decodeCrossNum(),this.decodeCellAns()},encodeData:function(){this.encodeCrossNum(),this.encodeCellAns()}},AnsCheck:{checkAns:function(){if(!this.checkQnumCross(1))return"crBcellGt";var a=this.owner.board.getWCellInfo();return this.checkOneArea(a)?this.checkQnumCross(2)?null:"crBcellLt":"wcDivide"},checkQnumCross:function(a){for(var b=!0,c=this.owner.board,d=0;d<c.crossmax;d++){var e=c.cross[d],f=e.getQnum();if(!(0>f)){var g=e.bx,h=e.by,i=c.cellinside(g-1,h-1,g+1,h+1),j=i.filter(function(a){return a.isBlack()}).length;if(1===a&&j>f||2===a&&f>j){if(this.checkOnly)return!1;e.seterr(1),b=!1}}}return b}},FailCode:{crBcellGt:["数字のまわりにある黒マスの数が間違っています。","The number of black cells around a number on crossing is big."],crBcellLt:["数字のまわりにある黒マスの数が間違っています。","The number of black cells around a number on crossing is small."]}});