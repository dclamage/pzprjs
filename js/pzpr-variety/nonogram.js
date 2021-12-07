/*! @license pzpr.js vfc10661 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

function sameArray(a,b){if(a.length!==b.length)return!1;for(var c=0;c<b.length;c++)if(a[c]!==b[c])return!1;return!0}!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["nonogram"],{MouseEvent:{use:!0,inputModes:{edit:["number"],play:["shade","unshade"]},mouseinput:function(){"shade"===this.inputMode||"unshade"===this.inputMode?this.inputcell():this.common.mouseinput.call(this)},mouseinput_number:function(){this.mousestart&&this.inputqnum_excell()},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.puzzle.editmode&&this.mousestart&&this.inputqnum_excell()},inputqnum_excell:function(){var a=this.getcell_excell();a.isnull||"excell"!==a.group||(a!==this.cursor.getex()?this.setcursor(a):this.inputqnum_main(a))}},KeyEvent:{enablemake:!0,moveTarget:function(a){var b=this.cursor,c=b.getex(),d=c.NDIR;switch(a){case"up":b.miny<b.by&&(d=c.UP);break;case"down":(b.bx<0&&b.maxy>b.by||b.bx>0&&b.by<-1)&&(d=c.DN);break;case"left":b.minx<b.bx&&(d=c.LT);break;case"right":(b.by<0&&b.maxx>b.bx||b.by>0&&b.bx<-1)&&(d=c.RT)}return d!==c.NDIR&&(b.movedir(d,2),c.draw(),b.draw(),!0)},keyinput:function(a){this.key_inputexcell(a)},key_inputexcell:function(a){var b=this.cursor.getex(),c=b.qnum,d=b.getmaxnum(),e=b.getminnum();if("0"<=a&&a<="9"){var f=+a;c<=0||this.prev!==b?f<=d&&f>=e&&b.setQnum(f):10*c+f<=d?b.setQnum(10*c+f):f<=d&&f>=e&&b.setQnum(f)}else{if(" "!==a&&"-"!==a)return;b.setQnum(-1)}this.prev=b,this.cursor.draw()}},TargetCursor:{initCursor:function(){this.init(-1,-1)}},ExCell:{disInputHatena:!0,maxnum:function(){var a=this.bx,b=this.by;return a<0&&b<0?0:b<0?this.board.rows:this.board.cols},posthook:{qnum:function(a){this.puzzle.board.excellOffsets=null}}},Board:{hasexcell:1,hasflush:1,cols:10,rows:10,excellRows:function(a,b){return b+1>>1},excellCols:function(a,b){return a+1>>1},excellOffsets:null,getOffsets:function(){if(null!==this.excellOffsets)return this.excellOffsets;this.excellOffsets=[this.minbx/-2,this.minby/-2];for(var a=this.minbx+1;a<0;a+=2)for(var b=1;b<this.maxby;b+=2)-1!==this.getex(a,b).qnum&&(this.excellOffsets[0]=(this.minbx+1-a)/-2,a=0);for(var b=this.minby+1;b<0;b+=2)for(var a=1;a<this.maxbx;a+=2)-1!==this.getex(a,b).qnum&&(this.excellOffsets[1]=(this.minby+1-b)/-2,b=0);return this.excellOffsets}},BoardExec:{adjustBoardData:function(a,b){this.adjustExCellTopLeft_1(a,b)},adjustBoardData2:function(a,b){this.adjustExCellTopLeft_2(a,b)}},Graphic:{enablebcolor:!0,paint:function(){this.drawBGCells(),this.drawDotCells(),this.drawShadedCells(),this.drawGrid(),this.drawNumbersExCell(),this.drawChassis(!0),this.drawTarget()},getBoardCols:function(){return this.getOffsetCols()+this.board.maxbx/2},getBoardRows:function(){return this.getOffsetRows()+this.board.maxby/2},getOffsetCols:function(){var a=this.board,b=this.puzzle.playeronly||this.outputImage?a.getOffsets()[0]:0;return(0-a.minbx)/2-b},getOffsetRows:function(){var a=this.board,b=this.puzzle.playeronly||this.outputImage?a.getOffsets()[1]:0;return(0-a.minby)/2-b}},Encode:{decodePzpr:function(a){this.decodeNumber16ExCell()},encodePzpr:function(a){this.encodeNumber16ExCellFlushed()}},FileIO:{decodeData:function(){this.decodeCellExCell(function(a,b){"."!==b&&("excell"!==a.group||a.isnull?"cell"===a.group&&("#"===b?a.qans=1:"+"===b&&(a.qsub=1)):a.qnum=+b)})},encodeData:function(){this.encodeCellExCell(function(a){if("excell"===a.group&&!a.isnull&&-1!==a.qnum)return a.qnum+" ";if("cell"===a.group){if(1===a.qans)return"# ";if(1===a.qsub)return"+ "}return". "})}},AnsCheck:{checklist:["checkNonogram"],checkNonogram:function(){this.checkRowsCols(this.isExCellCount,"exNoMatch")},isExCellCount:function(a){for(var b=a.getRectSize(),c=this.board,d=b.x1===b.x2?c.excellinside(b.x1,c.minby,b.x1,-1):c.excellinside(c.minbx,b.y1,-1,b.y1),e=[],f=0;f<d.length;f++){var g=d[f].qnum;-1!==g&&e.push(g)}return!!sameArray(e,this.getLines(a))||(a.seterr(1),d.seterr(1),!1)},getLines:function(a){for(var b=[],c=0,d=0;d<a.length;d++){0!==a[d].qans?c++:c>0&&(b.push(c),c=0)}return c>0&&b.push(c),b}},FailCode:{exNoMatch:["(please translate) The shaded cells don't match the clues in the row or column.","The shaded cells don't match the clues in the row or column."]}});
//# sourceMappingURL=nonogram.js.map