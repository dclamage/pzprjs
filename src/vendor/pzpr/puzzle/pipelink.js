/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
!function(){var a=pzpr.consts;pzpr.createCustoms("pipelink",{MouseEvent:{mouseinput:function(){this.owner.playmode?this.btn.Left?this.mousestart||this.mousemove?this.inputLine():this.mouseend&&this.notInputted()&&this.inputpeke():this.btn.Right&&(this.mousestart||this.mousemove)&&this.inputpeke():this.owner.editmode&&this.mousestart&&this.inputQues([0,11,12,13,14,15,16,17,-2])},inputRed:function(){this.dispRedLine()}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputLineParts(a)},key_inputLineParts:function(a){if(this.owner.playmode)return!1;var b=this.cursor.getTCC();if("q"==a)b.setQues(11);else if("w"==a)b.setQues(12);else if("e"==a)b.setQues(13);else if("r"==a)b.setQues(0);else if(" "==a)b.setQues(0);else if("a"==a)b.setQues(14);else if("s"==a)b.setQues(15);else if("d"==a)b.setQues(16);else if("f"==a)b.setQues(17);else if("-"==a)b.setQues(-2!==b.getQues()?-2:0);else{if("pipelinkr"!==this.owner.pid||"1"!=a)return!1;b.setQues(6)}return b.drawaround(),!0}},Border:{enableLineNG:!0,enableLineCombined:!0},Board:{isborder:1},BoardExec:{adjustBoardData:function(a,b){var c=pzpr.consts;if(a&c.TURNFLIP){var d={};switch(a){case c.FLIPY:d={14:17,15:16,16:15,17:14};break;case c.FLIPX:d={14:15,15:14,16:17,17:16};break;case c.TURNR:d={12:13,13:12,14:17,15:14,16:15,17:16};break;case c.TURNL:d={12:13,13:12,14:15,15:16,16:17,17:14}}for(var e=this.owner.board.cellinside(b.x1,b.y1,b.x2,b.y2),f=0;f<e.length;f++){var g=e[f],h=d[g.getQues()];h&&g.setQues(h)}}}},LineManager:{isCenterLine:!0,isLineCross:!0},Flags:{redline:!0,irowake:1},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.gridcolor=this.gridcolor_LIGHT,this.linecolor=this.linecolor_LIGHT,this.minYdeg=.42,this.circleratio=[.42,.37]},paint:function(){this.drawBGCells(),this.drawDashedGrid(),"pipelinkr"===this.owner.pid&&(this.drawCircles(),this.drawBorders()),this.drawHatenas(),this.drawLines(),this.drawPekes(),this.drawLineParts(),this.drawChassis(),this.drawTarget()},getBGCellColor:function(a){return 1===a.error?this.errbcolor1:6===a.ques&&2==this.getConfig("disptype_pipelinkr")?this.icecolor:null},getBorderColor:function(a){if(2==this.getConfig("disptype_pipelinkr")){var b=a.sidecell[0],c=a.sidecell[1];if(!b.isnull&&!c.isnull&&b.ice()^c.ice())return this.cellcolor}return null},getCircleStrokeColor:function(a){return 1==this.getConfig("disptype_pipelinkr")&&6===a.ques?this.cellcolor:null},getCircleFillColor:function(){return null},repaintParts:function(a){this.range.cells=a.cellinside(),this.drawLineParts()}},Encode:{decodePzpr:function(){this.decodePipelink(),this.checkPuzzleid(),"pipelinkr"===this.owner.pid&&this.setConfig("disptype_pipelinkr",this.checkpflag("i")?2:1)},encodePzpr:function(a){this.outpflag="pipelinkr"===this.owner.pid&&2==this.getConfig("disptype_pipelinkr")?"i":"",this.encodePipelink(a)},decodePipelink:function(){for(var a=0,b=this.outbstr,c=this.owner.board,d=0;d<b.length;d++){var e=b.charAt(d);if("."==e)c.cell[a].ques=-2;else if(e>="0"&&"9">=e){for(var f=0,g=parseInt(e,10)+1;g>f;f++)a<c.cellmax&&(c.cell[a].ques=6,a++);a--}else e>="a"&&"g">=e?c.cell[a].ques=parseInt(e,36)+1:e>="h"&&"z">=e&&(a+=parseInt(e,36)-17);if(a++,a>=c.cellmax)break}this.outbstr=b.substr(d)},encodePipelink:function(b){var c,d="",e=this.owner.board;c=0;for(var f=0;f<e.cellmax;f++){var g="",h=e.cell[f].ques;if(-2===h)g=".";else if(6===h)if(b===a.URL_PZPRV3){for(var i=1;10>i&&!(f+i>=e.cellmax||6!==e.cell[f+i].ques);i++);g=(i-1).toString(10),f=f+i-1}else b===a.URL_PZPRAPP&&(g="0");else h>=11&&17>=h?g=(h-1).toString(36):c++;0===c?d+=g:(g||19===c)&&(d+=(16+c).toString(36)+g,c=0)}c>0&&(d+=(16+c).toString(36)),this.outbstr+=d},checkPuzzleid:function(){var a=this.owner,b=a.board;if("pipelink"===a.pid)for(var c=0;c<b.cellmax;c++)if(6===b.cell[c].ques){a.pid="pipelinkr";break}}},FileIO:{decodeData:function(){var a=this.readLine();this.decodeCell(function(a,b){"o"===b?a.ques=6:"-"===b?a.ques=-2:"."!==b&&(a.ques=parseInt(b,36)+1)}),this.decodeBorderLine(),this.owner.enc.checkPuzzleid(),"pipelinkr"===this.owner.pid&&this.setConfig("disptype_pipelinkr","circle"==a?1:2)},encodeData:function(){"pipelink"===this.owner.pid?this.datastr+="pipe\n":"pipelinkr"===this.owner.pid&&(this.datastr+=1==this.getConfig("disptype_pipelinkr")?"circle\n":"ice\n"),this.encodeCell(function(a){return 6==a.ques?"o ":-2==a.ques?"- ":a.ques>=11&&a.ques<=17?""+(a.ques-1).toString(36)+" ":". "}),this.encodeBorderLine()}},AnsCheck:{checkAns:function(){if(!this.checkenableLineParts(1))return"ceAddLine";if(!this.checkLineCount(3))return"lnBranch";if("pipelinkr"===this.owner.pid){var a=2==this.getConfig("disptype_pipelinkr");if(!this.checkCrossOutOfMark())return a?"lnCrossExIce":"lnCrossExCir";if(!this.checkIceLines())return a?"lnCurveOnIce":"lnCurveOnCir"}return this.checkOneLoop()?this.checkCrossLineOnCross()?this.checkLineCount(0)?this.checkLineCount(1)?null:"lnDeadEnd":"ceEmpty":"lnNotCrossMk":"lnPlLoop"},checkCrossOutOfMark:function(){return this.checkAllCell(function(a){return 4===a.lcnt()&&6!==a.getQues()&&11!==a.getQues()})},checkCrossLineOnCross:function(){return this.checkAllCell(function(a){return 11===a.getQues()&&4!==a.lcnt()})}},FailCode:{ceEmpty:["線が引かれていないマスがあります。","there is an empty cell."],lnCrossExCir:["○の部分以外で線が交差しています。","there is a crossing line out of circles."],lnCurveOnCir:["○の部分で線が曲がっています。","A line curves on circles."]}})}();