/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
pzpr.createCustoms("paintarea",{MouseEvent:{mouseinput:function(){this.owner.playmode?(this.mousestart||this.mousemove)&&this.inputtile():this.owner.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())},inputRed:function(){this.dispRed()}},KeyEvent:{enablemake:!0},Cell:{maxnum:4,minnum:0},Board:{isborder:1},AreaBlackManager:{enabled:!0},AreaRoomManager:{enabled:!0},Flags:{use:!0,redblk:!0},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.bcolor=this.bcolor_GREEN,this.bbcolor="rgb(127, 127, 127)",this.setBGCellColorFunc("qans1")},paint:function(){this.drawBGCells(),this.drawGrid(),this.drawBlackCells(),this.drawNumbers(),this.drawBorders(),this.drawChassis(),this.drawBoxBorders(!0),this.drawTarget()}},Encode:{decodePzpr:function(){this.decodeBorder(),this.decodeNumber10()},encodePzpr:function(){this.encodeBorder(),this.encodeNumber10()}},FileIO:{decodeData:function(){this.decodeAreaRoom(),this.decodeCellQnum(),this.decodeCellAns()},encodeData:function(){this.encodeAreaRoom(),this.encodeCellQnum(),this.encodeCellAns()}},AnsCheck:{checkAns:function(){if(pzpr.EDITOR&&!this.checkSameColorTile())return"bkMixed";var a=this.owner.board.getBCellInfo();return this.checkOneArea(a)?this.check2x2BlackCell()?this.checkDir4BlackCell()?this.check2x2WhiteCell()?null:"wc2x2":"nmBcellNe":"bc2x2":"bcDivide"},checkDir4BlackCell:function(){return this.checkDir4Cell(function(a){return a.isBlack()},0)},checkSameColorTile:function(){var a=this.owner.board.getRoomInfo();return this.checkSameObjectInRoom(a,function(a){return a.isBlack()?1:2})},check2x2WhiteCell:function(){return this.check2x2Block(function(a){return a.isWhite()})}},FailCode:{wc2x2:["2x2の白マスのかたまりがあります。","There is a 2x2 block of white cells."],nmBcellNe:["数字の上下左右にある黒マスの数が間違っています。","The number is not equal to the number of black cells in four adjacent cells."]}});