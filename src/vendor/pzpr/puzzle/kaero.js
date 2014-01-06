/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
pzpr.createCustoms("kaero",{MouseEvent:{mouseinput:function(){this.owner.playmode?this.mousestart||this.mousemove?this.btn.Left?this.inputMoveLine():this.btn.Right&&this.inputpeke():this.mouseend&&this.notInputted()&&this.inputlight():this.owner.editmode&&(this.mousestart||this.mousemove?this.inputborder():this.mouseend&&this.notInputted()&&this.inputqnum())},inputlight:function(){var a=this.getcell();a.isnull||(0===a.getQsub()?a.setQsub(this.btn.Left?1:2):1===a.getQsub()?a.setQsub(this.btn.Left?2:0):2===a.getQsub()&&a.setQsub(this.btn.Left?0:1),a.draw())}},KeyEvent:{enablemake:!0,keyinput:function(a){this.key_inputqnum_kaero(a)},key_inputqnum_kaero:function(a){var b=this.cursor.getTCC();if(a>="a"&&"z">=a){var c=parseInt(a,36)-10,d=b.getQnum();(d-1)%26==c&&d>0&&26>=d?b.setQnum(d+26):(d-1)%26==c?b.setQnum(-1):b.setQnum(c+1)}else if("-"==a)b.setQnum(-2!==b.getQnum()?-2:-1);else{if(" "!=a)return;b.setQnum(-1)}this.prev=b,b.draw()}},Cell:{maxnum:52},CellList:{getDeparture:function(){return this.map(function(a){return a.base}).notnull()}},Board:{qcols:6,qrows:6,isborder:1},LineManager:{isCenterLine:!0},AreaRoomManager:{enabled:!0},AreaLineManager:{enabled:!0,moveline:!0},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.gridcolor=this.gridcolor_LIGHT,this.qsubcolor1="rgb(224, 224, 255)",this.qsubcolor2="rgb(255, 255, 144)",this.setBGCellColorFunc("qsub2")},paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawBorders(),this.drawTip(),this.drawPekes(),this.drawDepartures(),this.drawLines(),this.drawCellSquare(),this.drawNumbers_kaero(),this.drawChassis(),this.drawTarget()},drawCellSquare:function(){for(var a=this.vinc("cell_number_base","crispEdges"),b=.7*this.bw-1,c=.7*this.bh-1,d="c_sq_",e=this.getConfig("dispmove"),f=this.range.cells,g=0;g<f.length;g++){var h=f[g];if(!e&&h.isDeparture()||e&&h.isDestination()){if(a.fillStyle=1===h.error?this.errbcolor1:1===h.qsub?this.qsubcolor1:2===h.qsub?this.qsubcolor2:"white",this.vnop(d+h.id,this.FILL)){var i=h.bx*this.bw,j=h.by*this.bh;a.fillRect(i-b,j-c,2*b+1,2*c+1)}}else this.vhide(d+h.id)}},drawNumbers_kaero:function(){for(var a=(this.vinc("cell_number","auto"),this.getConfig("dispmove")),b=this.range.cells,c=0;c<b.length;c++){var d=b[c],e="cell_"+d.id,f=d.qnum;if(a&&(f=d.base.qnum),-1!==f){var g=this.getCellNumberColor(d),h="";-2==f?h="?":h+=f>0&&26>=f?(f+9).toString(36).toUpperCase():f>26&&52>=f?(f-17).toString(36).toLowerCase():f;var i=d.bx*this.bw,j=d.by*this.bh;this.dispnum(e,1,h,.85,g,i,j)}else this.hidenum(e)}}},Encode:{decodePzpr:function(){this.decodeBorder(),this.decodeKaero()},encodePzpr:function(){this.encodeBorder(),this.encodeKaero()},decodeKaero:function(){for(var a=0,b=0,c=this.outbstr,d=this.owner.board,e=0;e<c.length;e++){var f=c.charAt(e),g=d.cell[a];if(this.include(f,"0","9")?g.qnum=parseInt(f,36)+27:this.include(f,"A","Z")?g.qnum=parseInt(f,36)-9:"-"===f?(g.qnum=parseInt(c.charAt(e+1),36)+37,e++):"."===f?g.qnum=-2:this.include(f,"a","z")&&(a+=parseInt(f,36)-10),a++,a>=d.cellmax){b=e+1;break}}this.outbstr=c.substring(b)},encodeKaero:function(){for(var a="",b=0,c=this.owner.board,d=0;d<c.cellmax;d++){var e="",f=c.cell[d].qnum;-2==f?e=".":f>=1&&26>=f?e=""+(f+9).toString(36).toUpperCase():f>=27&&36>=f?e=""+(f-27).toString(10):f>=37&&72>=f?e="-"+(f-37).toString(36).toUpperCase():b++,0==b?a+=e:(e||26==b)&&(a+=(9+b).toString(36).toLowerCase()+e,b=0)}b>0&&(a+=(9+b).toString(36).toLowerCase()),this.outbstr+=a}},FileIO:{decodeData:function(){this.decodeCellQnum(),this.decodeCellQanssub(),this.decodeBorderQues(),this.decodeBorderLine()},encodeData:function(){this.encodeCellQnum(),this.encodeCellQanssub(),this.encodeBorderQues(),this.encodeBorderLine()}},AnsCheck:{checkAns:function(){var a=this.owner.board;if(!this.checkLineCount(3))return"lnBranch";if(!this.checkLineCount(4))return"lnCross";var b=a.getLareaInfo();if(!this.checkDoubleObject(b))return"nmConnected";if(!this.checkLineOverLetter())return"laOnNum";var c=a.getRoomInfo();return this.checkSameObjectInRoom_kaero(c)?this.checkGatheredObject(c)?this.checkNoMovedObjectInRoom(c)?this.checkDisconnectLine(b)?null:"laIsolate":"bkNoNum":"bkSepNum":"bkPlNum"},checkSameObjectInRoom_kaero:function(a){for(var b=!0,c=1;c<=a.max;c++)for(var d=a.room[c].clist,e=-1,f=d.getDeparture(),g=0;g<f.length;g++){var h=f[g].qnum;if(-1===e)e=h;else if(e!==h){if(this.checkOnly)return!1;this.getConfig("dispmove")||f.seterr(4),d.seterr(1),b=!1}}return b},checkGatheredObject:function(a){for(var b=0,c=this.owner.board,d=0;d<c.cellmax;d++){var e=c.cell[d].base.qnum;e>b&&(b=e)}for(var e=0;b>=e;e++)for(var f=c.cell.filter(function(a){return e===a.base.qnum}),g=null,h=0;h<f.length;h++){var i=a.getRoomID(f[h]);if(null===g)g=i;else if(null!==i&&g!==i)return this.getConfig("dispmove")||f.getDeparture().seterr(4),f.seterr(1),!1}return!0}},FailCode:{bkNoNum:["アルファベットのないブロックがあります。","A block has no letters."],bkPlNum:["１つのブロックに異なるアルファベットが入っています。","A block has plural kinds of letters."],bkSepNum:["同じアルファベットが異なるブロックに入っています。","Same kinds of letters are placed different blocks."]}});