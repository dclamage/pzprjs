/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
!function(){pzpr.consts;pzpr.createCustoms("bonsan",{MouseEvent:{mouseinput:function(){this.owner.playmode?this.mousestart||this.mousemove?this.btn.Left&&this.inputMoveLine():this.mouseend&&this.notInputted()&&this.inputlight():this.owner.editmode&&(this.mousestart||this.mousemove?"heyabon"===this.owner.pid&&this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())},inputLine:function(){this.Common.prototype.inputLine.call(this),!this.getConfig("circolor")||this.getConfig("dispmove")||this.notInputted()||this.inputautodark()},inputautodark:function(){var a=this.owner.opemgr,b=a.ope[a.position-1];if("border"===b.group&&"line"===b.property){var c=this.owner.board.getb(b.bx,b.by),d=this.owner.board.linfo,e=new this.owner.CellList;Array.prototype.push.apply(e,c.lineedge),e=e.notnull().filter(function(a){return!!d.id[a.id]}),e.each(function(a){d.getClistByCell(a).each(function(a){a.isNum()&&a.draw()})})}},inputlight:function(){var a=this.getcell();a.isnull||this.getConfig("circolor")&&this.inputdark(a)||(0===a.getQsub()?a.setQsub(this.btn.Left?1:2):1===a.getQsub()?a.setQsub(this.btn.Left?2:0):2===a.getQsub()&&a.setQsub(this.btn.Left?0:1),a.draw())},inputdark:function(a){var b=this.getConfig("dispmove")?a.base:a;return pc=this.owner.painter,distance=.3*pc.cw,dx=this.inputPoint.px-a.bx*pc.bw,dy=this.inputPoint.py-a.by*pc.bh,-2===b.qnum&&distance*distance>dx*dx+dy*dy?(b.setQdark(0===b.getQdark()?1:0),b.draw(),!0):!1}},KeyEvent:{enablemake:!0},Cell:{isDark:function(){var a=this.getConfig("dispmove"),b=a?this.base:this;if(1===b.qdark)return!0;var c=b.getNum(),d=this.owner.board.linfo.getClistByCell(this),e=d.getRectSize();return(1===e.cols||1===e.rows)&&c===d.length-1},nummaxfunc:function(){var a=this.owner.board;return Math.max(a.qcols,a.qrows)-1},minnum:0},Board:{qcols:8,qrows:8,isborder:1},LineManager:{isCenterLine:!0},AreaRoomManager:{enabled:!0},AreaLineManager:{enabled:!0,moveline:!0},Graphic:{hideHatena:!0,initialize:function(){this.Common.prototype.initialize.call(this),this.gridcolor=this.gridcolor_LIGHT,this.qsubcolor1="rgb(224, 224, 255)",this.qsubcolor2="rgb(255, 255, 144)",this.setBGCellColorFunc("qsub2"),this.fontsizeratio=.9},paint:function(){this.drawBGCells(),this.drawGrid(),"heyabon"===this.owner.pid&&this.drawBorders(),this.drawTip(),this.drawDepartures(),this.drawLines(),this.drawCircles(),this.drawNumbers(),this.drawChassis(),this.drawTarget()},getCircleFillColor:function(a){var b=a.error,c=this.getConfig("dispmove"),d=(c?a.base:a).qnum;return-1!==d?1===b||4===b?this.errbcolor1:this.getConfig("circolor")&&a.isDark()?"silver":this.circledcolor:null}},Encode:{decodePzpr:function(){this.checkpflag("c")||this.decodeBorder(),this.decodeNumber16(),this.checkPuzzleid()},encodePzpr:function(a){1===a||"heyabon"===this.owner.pid?this.encodeBorder():this.outpflag="c",this.encodeNumber16()},checkPuzzleid:function(){var a=this.owner,b=a.board;if("bonsan"===a.pid)for(var c=0;c<b.bdmax;c++)if(1===b.border[c].ques){a.pid="heyabon";break}}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeCellQsub(),this.decodeBorderQues(),this.decodeBorderLine(),this.owner.enc.checkPuzzleid()},encodeData:function(){this.encodeCellQnum(),this.encodeCellQsub(),this.encodeBorderQues(),this.encodeBorderLine()}},AnsCheck:{checkAns:function(){var a=this.owner.pid,b=this.owner.board;if(!this.checkLineCount(3))return"lnBranch";if(!this.checkLineCount(4))return"lnCross";var c=b.getLareaInfo();if(!this.checkDoubleObject(c))return"nmConnected";if(!this.checkLineOverLetter())return"laOnNum";if(!this.checkCurveLine(c))return"laCurve";if(!this.checkLineLength(c))return"laLenNe";var d=b.getRoomInfo();return this.checkFractal(d)?"heyabon"!==a||this.checkNoMovedObjectInRoom(d)?this.checkNoLineCircle()?this.checkDisconnectLine(c)?null:"laIsolate":"nmIsolate":"bkNoNum":"bonsan"===a?"brObjNotSym":"bkObjNotSym"},checkCurveLine:function(a){return this.checkAllArea(a,function(a,b){return 1===a||1===b})},checkLineLength:function(a){return this.checkAllArea(a,function(a,b,c,d){return 0>d||1===c||d===c-1})},checkNoLineCircle:function(){return this.checkAllCell(function(a){return a.getQnum()>=1&&0===a.lcnt()})},checkFractal:function(a){for(var b=1;b<=a.max;b++){var c=a.room[b].clist,d=c.getRectSize();d.xx=d.x1+d.x2,d.yy=d.y1+d.y2;for(var e=0;e<c.length;e++){var f=c[e];if(f.isDestination()^this.owner.board.getc(d.xx-f.bx,d.yy-f.by).isDestination())return c.filter(function(a){return a.isDestination()}).seterr(1),!1}}return!0}},FailCode:{bkNoNum:["○のない部屋があります。","A room has no circle."],bkObjNotSym:["部屋の中の○が点対称に配置されていません。","Position of circles in the room is not point symmetric."],brObjNotSym:["○が点対称に配置されていません。","Position of circles is not point symmetric."],laOnNum:["○の上を線が通過しています。","A line goes through a circle."],laIsolate:["○につながっていない線があります。","A line doesn't connect any circle."],nmConnected:["○が繋がっています。","There are connected circles."],nmIsolate:["○から線が出ていません。","A circle doesn't start any line."]}})}();