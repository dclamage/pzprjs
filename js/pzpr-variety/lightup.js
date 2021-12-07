/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["lightup"],{MouseEvent:{use:!0,inputModes:{edit:["number","clear"],play:["akari","unshade","completion"]},mouseinput_other:function(){"akari"===this.inputMode&&this.mousestart&&this.inputcell()},mouseinput_auto:function(){this.puzzle.playmode?this.mousestart||this.mousemove&&1!==this.inputData?this.inputcell():this.mouseend&&this.notInputted()&&this.inputqcmp():this.puzzle.editmode&&this.mousestart&&this.inputqnum()},inputqcmp:function(){var a=this.getcell();a.isnull||a.noNum()||(a.setQcmp(+!a.qcmp),a.draw(),this.mousereset())}},KeyEvent:{enablemake:!0},Cell:{akariinfo:0,qlight:0,numberRemainsUnshaded:!0,maxnum:4,minnum:0,posthook:{qnum:function(a){this.setAkariInfo(a)},qans:function(a){this.setAkariInfo(a)}},isAkari:function(){return 1===this.qans},setAkariInfo:function(a){var b=0,c=this.akariinfo;-1!==this.qnum?b=2:1===this.qans&&(b=1),c!==b&&(this.akariinfo=b,this.setQlight(c,b))},setQlight:function(a,b){var c=this.akariRangeClist();if(0===a&&1===b)for(var d=0;d<c.length;d++)c[d].qlight=1;else{for(var d=0;d<c.length;d++){var e=c[d],f=e.qlight;0===f&&(1===a&&0===b||0===a&&2===b)||(1===f&&2===a&&0===b||(e.qlight=e.akariRangeClist().some(function(a){return a.isAkari()})?1:0))}2===b&&(this.qlight=0)}var g=this.viewRange();this.puzzle.painter.paintRange(g.x1-1,this.by-1,g.x2+1,this.by+1),this.puzzle.painter.paintRange(this.bx-1,g.y1-1,this.bx+1,g.y2+1)},akariRangeClist:function(){var a,b=new this.klass.CellList,c=this.adjacent;for(b.add(this),a=c.left;!a.isnull&&-1===a.qnum;)b.add(a),a=a.adjacent.left;for(a=c.right;!a.isnull&&-1===a.qnum;)b.add(a),a=a.adjacent.right;for(a=c.top;!a.isnull&&-1===a.qnum;)b.add(a),a=a.adjacent.top;for(a=c.bottom;!a.isnull&&-1===a.qnum;)b.add(a),a=a.adjacent.bottom;return b},viewRange:function(){var a,b,c={},d=this.adjacent;for(a=this,b=d.left;!b.isnull&&-1===b.qnum;)a=b,b=a.adjacent.left;for(c.x1=a.bx,a=this,b=d.right;!b.isnull&&-1===b.qnum;)a=b,b=a.adjacent.right;for(c.x2=a.bx,a=this,b=d.top;!b.isnull&&-1===b.qnum;)a=b,b=a.adjacent.top;for(c.y1=a.by,a=this,b=d.bottom;!b.isnull&&-1===b.qnum;)a=b,b=a.adjacent.bottom;return c.y2=a.by,c}},Board:{rebuildInfo:function(){this.initQlight()},initQlight:function(){for(var a=0;a<this.cell.length;a++){var b=this.cell[a];b.qlight=0,b.akariinfo=0,-1!==b.qnum?b.akariinfo=2:1===b.qans&&(b.akariinfo=1)}for(var a=0;a<this.cell.length;a++){var b=this.cell[a];if(1===b.akariinfo)for(var c=b.akariRangeClist(),d=0;d<c.length;d++)c[d].qlight=1}}},Graphic:{hideHatena:!0,autocmp:"akari",gridcolor_type:"LIGHT",fgcellcolor_func:"qnum",fontShadecolor:"white",qcmpcolor:"rgb(127,127,127)",bgcellcolor_func:"light",lightcolor:"rgb(192, 255, 127)",paint:function(){this.drawBGCells(),this.drawGrid(),this.drawQuesCells(),this.drawQuesNumbers(),this.drawAkari(),this.drawDotCells(),this.drawChassis(),this.drawTarget()},getBGCellColor:function(a){if(-1===a.qnum){if(1===a.error)return this.errbcolor1;if(1===a.qlight&&this.puzzle.execConfig("autocmp"))return this.lightcolor}return null},drawAkari:function(){for(var a=this.vinc("cell_akari","auto"),b=.4*this.cw,c=this.range.cells,d=0;d<c.length;d++){var e=c[d];a.vid="c_AK_"+e.id,e.isAkari()?(a.fillStyle=4===e.error?this.errcolor1:e.trial?this.trialcolor:"rgb(0, 127, 96)",a.fillCircle(e.bx*this.bw,e.by*this.bh,b)):a.vhide()}},getQuesNumberColor:function(a){return 1===a.qcmp?this.qcmpcolor:this.fontShadecolor}},Encode:{decodePzpr:function(a){this.decode4Cell()},encodePzpr:function(a){this.encode4Cell()},decodeKanpen:function(){this.fio.decodeCellQnumb()},encodeKanpen:function(){this.fio.encodeCellQnumb()}},FileIO:{decodeData:function(){this.decodeCellQnumAns(),this.decodeCellQcmp()},encodeData:function(){this.encodeCellQnumAns(),this.encodeCellQcmp()},decodeCellQcmp:function(){this.decodeCell(function(a,b){"-"===b&&(a.qcmp=1)})},encodeCellQcmp:function(){this.puzzle.board.cell.some(function(a){return 1===a.qcmp})&&this.encodeCell(function(a){return 1===a.qcmp?"- ":". "})},kanpenOpen:function(){this.decodeCell(function(a,b){"+"===b?a.qans=1:"*"===b?a.qsub=1:"5"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)})},kanpenSave:function(){this.encodeCell(function(a){return 1===a.qans?"+ ":1===a.qsub?"* ":a.qnum>=0?a.qnum+" ":-2===a.qnum?"5 ":". "})},kanpenOpenXML:function(){this.decodeCellQnum_XMLBoard(),this.decodeCellAns_XMLAnswer()},kanpenSaveXML:function(){this.encodeCellQnum_XMLBoard(),this.encodeCellAns_XMLAnswer()},UNDECIDED_NUM_XML:5},AnsCheck:{checklist:["checkNotDuplicateAkari","checkDir4Akari","checkShinedCell"],checkDir4Akari:function(){this.checkDir4Cell(function(a){return a.isAkari()},0,"nmAkariNe")},checkShinedCell:function(){this.checkAllCell(function(a){return a.noNum()&&1!==a.qlight},"ceDark")},checkNotDuplicateAkari:function(){this.checkRowsColsPartly(this.isPluralAkari,function(a){return a.isNum()},"akariDup")},isPluralAkari:function(a){var b=a.filter(function(a){return a.isAkari()}),c=b.length<=1;return c||b.seterr(4),c}},FailCode:{nmAkariNe:["数字のまわりにある照明の数が間違っています。","The number is not equal to the number of Akari around it."],akariDup:["照明に別の照明の光が当たっています。","Akari is shined from another Akari."],ceDark:["照明に照らされていないセルがあります。","A cell is not shined."]}});
//# sourceMappingURL=lightup.js.map