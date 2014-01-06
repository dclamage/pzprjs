/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
!function(){var a=pzpr.consts;pzpr.createCustoms("tawa",{MouseEvent:{mouseinput:function(){this.owner.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.owner.editmode&&this.mousestart&&this.inputqnum()},getcell:function(){var a=this.owner,b=a.board,c=this.getpos(0);if(this.inputY%a.painter.ch===0)return b.emptycell;if(!c.isinside())return b.emptycell;var d=c.getc();return d.isnull?c.move(1,0).getc():d},getpos:function(){var a=this.owner.painter;return new this.owner.Address(this.inputPoint.px/a.bw|0,2*(this.inputPoint.py/a.ch|0)+1)}},KeyEvent:{enablemake:!0},TargetCursor:{adjust_init:function(){this.pos.getc().isnull&&this.pos.bx++},movedir_cursor:function(b,c){this.pos.movedir(b,c),b===a.UP?this.pos.bx===this.maxx||this.pos.bx>this.minx&&0===(2&this.pos.by)?this.pos.bx--:this.pos.bx++:b===a.DN&&(this.pos.bx===this.minx||this.pos.bx<this.maxx&&2===(2&this.pos.by)?this.pos.bx++:this.pos.bx--)}},Cell:{numberIsWhite:!0,maxnum:6,minnum:0},Board:{qcols:6,qrows:7,shape:3,setShape:function(a){this.shape=a,this.setminmax()},estimateSize:function(a,b,c){var d=0;return d=0==this.shape?(c>>1)*(2*b-1)+(c%2==1?b:0):3==this.shape||void 0==this.shape?(c>>1)*(2*b+1)+(c%2==1?b:0):b*c},setposCells:function(){this.cellmax=this.cell.length;for(var a=0;a<this.cellmax;a++){var b=this.cell[a];if(b.id=a,b.isnull=!1,0==this.shape){var c=2*a/(2*this.qcols-1)|0;b.bx=(2*a%(2*this.qcols-1)|0)+1,b.by=2*c+1}else if(1==this.shape){var c=a/this.qcols|0;b.bx=2*(a%this.qcols|0)+(1&c?1:0)+1,b.by=2*c+1}else if(2==this.shape){var c=a/this.qcols|0;b.bx=2*(a%this.qcols|0)+(1&c?0:1)+1,b.by=2*c+1}else if(3==this.shape){var c=(2*a+1)/(2*this.qcols+1)|0;b.bx=((2*a+1)%(2*this.qcols+1)|0)+1,b.by=2*c+1}}},setminmax:function(){this.minbx=0,this.minby=0,this.maxbx=2*this.qcols+[0,1,1,2][this.shape],this.maxby=2*this.qrows,this.owner.cursor.setminmax()},getc:function(a,b,c,d){var e=null;if(void 0===c&&(c=this.qcols,d=this.qrows),a>=this.minbx+1&&a<=this.maxbx-1&&b>=this.minby+1&&b<=this.maxby-1){var f=b>>1;0===this.shape?a+f&1&&(e=a-1+f*(2*c-1)>>1):1===this.shape?a+f&1&&(e=a-1+2*f*c>>1):2===this.shape?a+f&1||(e=a-1+2*f*c>>1):3===this.shape&&(a+f&1||(e=a-1+f*(2*c+1)>>1))}return null!==e?this.cell[e]:this.emptycell},cellinside:function(a,b,c,d){for(var e=new this.owner.CellList,f=1|b;d>=f;f+=2)for(var g=a;c>=g;g++){var h=this.getc(g,f);h.isnull||e.add(h)}return e}},BoardExec:{execadjust:function(a){var b=this.owner.board;if(0===a.indexOf("reduce"))if("reduceup"===a||"reducedn"===a){if(b.qrows<=1)return}else if(("reducelt"===a||"reducert"===a)&&b.qcols<=1&&3!==b.shape)return;this.Common.prototype.execadjust.call(this,a)},expandreduce:function(b){var c=this.owner.board;if(b&a.EXPAND){switch(15&b){case a.LT:c.qcols+=[0,0,1,1][c.shape],c.shape=[2,3,0,1][c.shape];break;case a.RT:c.qcols+=[0,1,0,1][c.shape],c.shape=[1,0,3,2][c.shape];break;case a.UP:c.qcols+=[-1,0,0,1][c.shape],c.shape=[3,2,1,0][c.shape],c.qrows++;break;case a.DN:c.qrows++}c.setminmax(),this.expandGroup(a.CELL,b)}else if(b&a.REDUCE)switch(this.reduceGroup(a.CELL,b),15&b){case a.LT:c.qcols-=[1,1,0,0][c.shape],c.shape=[2,3,0,1][c.shape];break;case a.RT:c.qcols-=[1,0,1,0][c.shape],c.shape=[1,0,3,2][c.shape];break;case a.UP:c.qcols-=[1,0,0,-1][c.shape],c.shape=[3,2,1,0][c.shape],c.qrows--;break;case a.DN:c.qrows--}c.setposAll()},turnflip:function(b,c){var d=this.owner.board,c={x1:d.minbx,y1:d.minby,x2:d.maxbx,y2:d.maxby};b===a.FLIPY?1&d.qrows||(d.shape={0:3,1:2,2:1,3:0}[d.shape]):b===a.FLIPX&&(d.shape={0:0,1:2,2:1,3:3}[d.shape]),this.turnflipGroup(a.CELL,b,c),d.setposAll()},distObj:function(b,c){var d=this.owner.board;return b&=15,b===a.UP?c.by:b===a.DN?d.maxby-c.by:b===a.LT?c.bx:b===a.RT?d.maxbx-c.bx:-1}},Flags:{use:!0},Graphic:{initialize:function(){this.Common.prototype.initialize.call(this),this.setBGCellColorFunc("qans1")},paint:function(){this.drawBGCells(),this.drawDotCells(!1),this.drawGrid_tawa(),this.drawNumbers(),this.drawTarget()},flushCanvas:function(){this.flushCanvas=this.use.canvas?function(){var a=this.currentContext,b=(this.owner.board,this.range.x1),c=this.range.y1,d=this.range.x2,e=this.range.y2;a.fillStyle="rgb(255, 255, 255)",a.fillRect(b*this.bw,c*this.bh,(d-b)*this.bw+1,(e-c)*this.bh+1)}:function(){this.zidx=1},this.flushCanvas()},drawGrid_tawa:function(){var a=this.vinc("grid","crispEdges"),b=this.owner.board,c=this.range.x1,d=this.range.y1,e=this.range.x2,f=this.range.y2;c<b.minbx&&(c=b.minbx),e>b.maxbx&&(e=b.maxbx),d<b.minby&&(d=b.minby),f>b.maxby&&(f=b.maxby);var g=Math.max(this.cw/36,1),h=(g-1)/2,i=["bdx_","bdy"];a.fillStyle=this.gridcolor;var j=Math.max(c,b.minbx),k=Math.min(e,b.maxbx),l=Math.max(d,b.minby),m=Math.min(f,b.maxby);l-=1&l;for(var n=l;m>=n;n+=2){var o=n>>1;if(this.vnop(i[0]+n,this.NONE)){var p=0,q=0;3===b.shape&&(n===b.minby||n===b.maxby&&1&o)||0===b.shape&&n===b.maxby&&!(1&o)?(p=1,q=2):2===b.shape&&(n===b.minby||n===b.maxby&&1&o)||1===b.shape&&n===b.maxby&&!(1&o)?(p=1,q=1):(1===b.shape&&(n===b.minby||n===b.maxby&&1&o)||2===b.shape&&n===b.maxby&&!(1&o))&&(p=0,q=1),a.fillRect((c+p)*this.bw-h,n*this.bh-h,(e-c-q)*this.bw+1,g)}if(n>=b.maxby)break;var r=j;(2===b.shape||3===b.shape)^(1&o)!==(1&r)&&r++;for(var s=r;k>=s;s+=2)this.vnop([i[1],s,n].join("_"),this.NONE)&&a.fillRect(s*this.bw-h,n*this.bh-h,g,this.ch+1)}}},Encode:{decodePzpr:function(){this.decodeTawamurenga()},encodePzpr:function(){this.encodeTawamurenga()},decodeTawamurenga:function(){var a=this.outbstr.split("/"),b=this.owner.board;b.setShape(parseInt(a[0])),b.initBoardSize(b.qcols,b.qrows),a[1]&&(this.outbstr=a[1],this.decodeNumber10())},encodeTawamurenga:function(){this.outbstr=this.owner.board.shape+"/",this.encodeNumber10()}},FileIO:{decodeData:function(){var a=this.owner.board;a.setShape(parseInt(this.readLine())),a.initBoardSize(a.qcols,a.qrows);for(var b=0,c=this.getItemList(a.qrows),d=a.minby+1;d<a.maxby;d+=2)for(var e=0;e<=a.maxbx;e++){var f=a.getc(e,d);f.isnull||("#"===c[b]?f.qans=1:"+"===c[b]?f.qsub=1:"-"===c[b]?f.qnum=-2:"."!==c[b]&&(f.qnum=parseInt(c[b])),b++)}},encodeData:function(){var a=this.owner.board;this.datastr=a.shape+"\n";for(var b="",c=a.minby+1;c<a.maxby;c+=2){for(var d=0;d<=a.maxbx;d++){var e=a.getc(d,c);e.isnull||(b+=-2===e.qnum?"- ":-1!==e.qnum?""+e.qnum+" ":1===e.qans?"# ":1===e.qsub?"+ ":". ")}b+="\n"}this.datastr+=b}},AnsCheck:{checkAns:function(){return this.checkThreeBlackCells()?this.checkUnderCells()?this.checkNumbers()?null:"ceBcellNe":"bcNotOnBc":"bcConsecGt3"},checkThreeBlackCells:function(){for(var a=!0,b=this.owner.board,c=b.minby+1;c<b.maxby;c+=2){for(var d=new this.owner.CellList,e=0;e<=b.maxbx;e++){var f=b.getc(e,c);if(!f.isnull)if(f.isWhite()||f.isNum()){if(d.length>=3)break;d=new this.owner.CellList}else d.add(f)}if(d.length>=3){if(this.checkOnly)return!1;d.seterr(1),a=!1}}return a},checkNumbers:function(){for(var a=!0,b=this.owner.board,c=0;c<b.cellmax;c++){var d=b.cell[c];if(d.isValidNum()){var e=new this.owner.CellList;e.add(d.relcell(-1,-2)),e.add(d.relcell(1,-2)),e.add(d.relcell(-2,0)),e.add(d.relcell(2,0)),e.add(d.relcell(-1,2)),e.add(d.relcell(1,2));var f=e.filter(function(a){return a.isBlack()}).length;if(d.getQnum()!==f){if(this.checkOnly)return!1;d.seterr(1),e.seterr(1),a=!1}}}return a},checkUnderCells:function(){for(var a=!0,b=this.owner.board,c=0;c<b.cellmax;c++){var d=b.cell[c];if(!d.isWhite()&&d.by!==b.maxby-1&&d.relcell(-1,2).isWhite()&&d.relcell(1,2).isWhite()){if(this.checkOnly)return!1;d.seterr(1),d.relcell(-1,2).seterr(1),d.relcell(1,2).seterr(1),a=!1}}return a}},FailCode:{ceBcellNe:["数字の周りに入っている黒マスの数が違います。","The number of black cells around a number is not correct."],bcConsecGt3:["黒マスが横に3マス以上続いています。","There or more black cells continue horizonally."],bcNotOnBc:["黒マスの下に黒マスがありません。","There are no black cells under a black cell."]}})}();