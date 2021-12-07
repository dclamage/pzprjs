/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["shimaguni","chocona","stostone"],{MouseEvent:{use:!0,inputModes:{edit:["border","number","clear"],play:["shade","unshade"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())}},KeyEvent:{enablemake:!0},"KeyEvent@stostone":{keyDispInfo:function(a){return"x"!==a||(this.board.operate(this.keydown?"drop":"resetpos"),!1)}},Cell:{maxnum:function(){return Math.min(999,this.room.clist.length)}},"Cell@chocona":{minnum:0},"Cell@stostone":{getFallableLength:function(){if(!this.base.stone)return 0;for(var a=this,b=0;!(a.isnull||(a=a.relcell(0,2),a.isnull||a.base.stone&&this.base.stone!==a.base.stone));)b++;return b}},Board:{hasborder:1},"Board@shimaguni,stostone":{addExtraInfo:function(){this.stonegraph=this.addInfoList(this.klass.AreaStoneGraph)}},"Board@stostone":{cols:8,rows:8,falling:!1,fallstate:0,initBoardSize:function(a,b){this.common.initBoardSize.call(this,a,b),this.falling=!1,this.fallstate=0},errclear:function(){return this.falling=!1,this.common.errclear.call(this)},operate:function(a){switch(a){case"drop":this.drop(),this.falling=!0,this.hasinfo=!0,this.puzzle.redraw();break;case"resetpos":this.puzzle.errclear();break;default:this.common.operate.call(this,a)}},resetpos:function(){for(var a=0;a<this.cell.length;a++){var b=this.cell[a];b.base=b.destination=b.isShade()?b:this.emptycell}},drop:function(){if(1!==this.fallstate){this.resetpos();for(var a=!0,b=this.stonegraph.components;a;){a=!1;for(var c=b.length-1;c>=0;--c){b[c].clist.fall()>0&&(a=!0)}}this.fallstate=1}}},"CellList@stostone":{fall:function(){for(var a=this.board.rows,b=0;b<this.length;b++)if(this[b].stone!==this[b].relcell(0,2).stone){var c=this[b].destination.getFallableLength();if(a>c&&(a=c),0===a)return 0}for(var d=a+(Math.abs(this[0].destination.by-this[0].by)>>1),b=0;b<this.length;b++)this[b].destination.base=this.board.emptycell;for(var b=0;b<this.length;b++){var e=this[b].relcell(0,2*d);this[b].destination=e,e.base=this[b]}return a}},"AreaShadeGraph@chocona":{enabled:!0},"AreaStoneGraph:AreaShadeGraph@shimaguni,stostone":{enabled:!0,relation:{"cell.qans":"node","border.ques":"separator"},setComponentRefs:function(a,b){a.stone=b},getObjNodeList:function(a){return a.stonenodes},resetObjNodeList:function(a){a.stonenodes=[]},isedgevalidbylinkobj:function(a){return!a.isBorder()}},"AreaStoneGraph@stostone":{coloring:!0},AreaRoomGraph:{enabled:!0,hastop:!0},Graphic:{gridcolor_type:"LIGHT",enablebcolor:!0,bgcellcolor_func:"qsub1",paint:function(){this.drawBGCells(),this.drawGrid(),"stostone"===this.pid&&this.drawDotCells_stostone(),this.drawShadedCells(),this.drawQuesNumbers(),this.drawBorders(),"stostone"===this.pid&&this.drawNarrowBorders(),this.drawChassis(),this.drawBoxBorders(!1),this.drawTarget()}},"Graphic@shimaguni":{bcolor:"rgb(191, 191, 255)"},"Graphic@stostone":{irowakeblk:!0,enablebcolor:!1,bgcellcolor_func:"error1",qanscolor:"black",minYdeg:.08,maxYdeg:.5,drawDotCells_stostone:function(){for(var a=this.vinc("cell_dot","auto",!0),b=.2*this.cw,c=this.range.cells,d=0;d<c.length;d++){var e=c[d];a.vid="c_dot_"+e.id,1===e.qsub?(a.fillStyle=this.bcolor,a.fillCircle(e.bx*this.bw,e.by*this.bh,b)):a.vhide()}},drawNarrowBorders:function(){if(this.vinc("border_narrow","crispEdges",!0),this.board.falling){var a=this.getBorderColor;this.getBorderColor=this.getNarrowBorderColor,this.lw/=2,this.lm/=2,this.drawBorders_common("b_bd2_"),this.getBorderColor=a,this.lw*=2,this.lm*=2}},getShadedCellColor:function(a){var b=a;if(this.board.falling&&(a=a.base),1!==a.qans)return null;var c=b.error||b.qinfo;return 1===c?this.errcolor1:2===c?this.errcolor2:a.trial?this.trialcolor:this.puzzle.execConfig("irowakeblk")?a.stone.color:this.shadecolor},getBorderColor:function(a){if(this.board.falling){var b=a.sidecell[0].base.stone,c=a.sidecell[1].base.stone;if(b||c)return null}return a.isBorder()?this.quescolor:null},getNarrowBorderColor:function(a){return a.sidecell[0].base.stone!==a.sidecell[1].base.stone?"white":null},getQuesNumberText:function(a){return this.board.falling&&a.base.stone?"":this.common.getQuesNumberText.call(this,a)},getQuesNumberColor:function(a){return this.board.falling&&(a=a.base),this.common.getQuesNumberColor_mixed.call(this,a)}},Encode:{decodePzpr:function(a){this.decodeBorder(),this.decodeRoomNumber16()},encodePzpr:function(a){this.encodeBorder(),this.encodeRoomNumber16()}},FileIO:{decodeData:function(){this.decodeAreaRoom(),this.decodeCellQnum(),this.decodeCellAns()},encodeData:function(){this.encodeAreaRoom(),this.encodeCellQnum(),this.encodeCellAns()}},"AnsCheck@shimaguni,stostone#1":{checklist:["checkSideAreaShadeCell","checkSeqBlocksInRoom","checkFallenBlock@stostone","checkShadeCellCount","checkSideAreaLandSide@shimaguni","checkRemainingSpace@stostone","checkNoShadeCellInArea"]},"AnsCheck@chocona#1":{checklist:["checkShadeCellExist","checkShadeRect","checkShadeCellCount"]},"AnsCheck@shimaguni,stostone":{checkSideAreaShadeCell:function(){this.checkSideAreaCell(function(a,b){return a.isShade()&&b.isShade()},!0,"cbShade")},checkSideAreaLandSide:function(){this.checkSideAreaSize(this.board.roommgr,function(a){return a.clist.filter(function(a){return a.isShade()}).length},"bsEqShade")},checkSeqBlocksInRoom:function(){for(var a=this.board.roommgr.components,b=0;b<a.length;b++){for(var c=a[b].clist,d=null,e=!0,f=0;f<c.length;f++)if(null===c[f].stone);else if(c[f].stone!==d){if(null!==d){e=!1;break}d=c[f].stone}if(!e){if(this.failcode.add("bkShadeDivide"),this.checkOnly)break;c.seterr(1)}}}},"AnsCheck@stostone":{checkAns:function(a){this.board.drop(),this.common.checkAns.call(this,a)},resetCache:function(){this.common.resetCache.call(this),this.board.fallstate=0},checkFallenBlock:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(!(c.by>a.maxby/2||c.base.isnull)){if(this.failcode.add("csUpper"),this.checkOnly)break;a.falling=!0,c.seterr(1)}}},checkRemainingSpace:function(){for(var a=this.board,b=0;b<a.cell.length;b++){var c=a.cell[b];if(!(c.by<a.maxby/2)&&c.base.isnull){if(this.failcode.add("cuLower"),this.checkOnly)break;a.falling=!0,c.base.isnull&&c.seterr(1)}}}},"AnsCheck@chocona":{checkShadeRect:function(){this.checkAllArea(this.board.sblkmgr,function(a,b,c,d){return a*b===c},"csNotRect")}},"FailCode@shimaguni":{bkShadeNe:["海域内の数字と国のマス数が一致していません。","The number of shaded cells is not equal to the number."],bkShadeDivide:["1つの海域に入る国が2つ以上に分裂しています。","The shaded cells in a marine area are divided."],bkNoShade:["黒マスのカタマリがない海域があります。","A marine area has no shaded cells."],cbShade:["異なる海域にある国どうしが辺を共有しています。","Countries in different marine areas are adjacent."],bsEqShade:["隣り合う海域にある国の大きさが同じです。","The sizes of countries that are in adjacent marine areas are the same."]},"FailCode@chocona":{csNotRect:["黒マスのカタマリが正方形か長方形ではありません。","A mass of shaded cells is not rectangle."],bkShadeNe:["数字のある領域と、領域の中にある黒マスの数が違います。","The number of shaded cells in the area and the number written in the area is different."]},"FailCode@stostone":{cbShade:["異なる部屋にある黒マスどうしが辺を共有しています。","Shaded cells are adjacent over a border."],csUpper:["ブロックを落とした後に黒マスが盤面の上半分に残っています。","Shaded cells remain in the upper half of the board after the blocks have fallen."],cuLower:["ブロックを落とした後の空間が盤面の下半分にあります。","Unshaded cells exist in the lower half of the board after the blocks have fallen."]}});
//# sourceMappingURL=shimaguni.js.map