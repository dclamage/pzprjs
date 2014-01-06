/*! @license pzpr.js v3.4.0-pre (c) 2009-2014 sabo2, MIT license
 *   https://bitbucket.org/sabo2/pzprv3 */
!function(){var a=pzpr.consts;pzpr.createCustoms("box",{MouseEvent:{mouseinput:function(){this.owner.playmode?(this.mousestart||this.mousemove)&&this.inputcell():this.owner.editmode&&this.mousestart&&this.input_onstart()},input_onstart:function(){var a=this.getcell_excell();!a.isnull&&a.isexcellobj&&(a!==this.cursor.getTEC()?this.setcursor(a):this.inputnumber(a))},inputnumber:function(a){var b=a.getQnum(),c=a.nummaxfunc();this.btn.Left?a.setQnum(b!==c?b+1:0):this.btn.Right&&a.setQnum(0!==b?b-1:c),a.draw()}},KeyEvent:{enablemake:!0,moveTarget:function(b){var c=this.cursor,d=c.getTEC(),e=c.getTCP(),f=a.NDIR;switch(b){case this.KEYUP:e.bx===c.minx&&c.miny<e.by&&(f=a.UP);break;case this.KEYDN:e.bx===c.minx&&c.maxy>e.by&&(f=a.DN);break;case this.KEYLT:e.by===c.miny&&c.minx<e.bx&&(f=a.LT);break;case this.KEYRT:e.by===c.miny&&c.maxx>e.bx&&(f=a.RT)}return f!==a.NDIR?(c.pos.movedir(f,2),d.draw(),c.getTCP().draw(),this.stopEvent(),!0):!1},keyinput:function(a){this.key_inputexcell(a)},key_inputexcell:function(a){var b=this.cursor.getTEC(),c=b.getQnum(),d=b.nummaxfunc();if(a>="0"&&"9">=a){var e=parseInt(a);0>=c||this.prev!==b?d>=e&&b.setQnum(e):d>=10*c+e?b.setQnum(10*c+e):d>=e&&b.setQnum(e)}else{if(" "!=a&&"-"!=a)return;b.setQnum(0)}this.prev=b,this.cursor.getTCP().draw()}},TargetCursor:{initCursor:function(){this.setTEC(this.owner.board.excell[0])}},EXCell:{qnum:0,disInputHatena:!0,nummaxfunc:function(){var a=this.bx,b=this.by;if(-1!==a||-1!==b){for(var c=0,d=-1===a?this.owner.board.qrows:this.owner.board.qcols;d>0;d--)c+=d;return c}},minnum:0},Board:{qcols:9,qrows:9,isexcell:1},BoardExec:{adjustBoardData:function(a,b){var c=1|b.x1,d=1|b.y1;this.qnumw=[],this.qnumh=[];for(var e=this.owner.board,f=d;f<=b.y2;f+=2)this.qnumw[f]=e.getex(-1,f).getQnum();for(var g=c;g<=b.x2;g+=2)this.qnumh[g]=e.getex(g,-1).getQnum()},adjustBoardData2:function(b,c){var d=c.x1+c.x2,e=c.y1+c.y2,f=1|c.x1,g=1|c.y1,h=this.owner.board;switch(b){case a.FLIPY:for(var i=f;i<=c.x2;i+=2)h.getex(i,-1).setQnum(this.qnumh[i]);break;case a.FLIPX:for(var j=g;j<=c.y2;j+=2)h.getex(-1,j).setQnum(this.qnumw[j]);break;case a.TURNR:for(var j=g;j<=c.y2;j+=2)h.getex(-1,j).setQnum(this.qnumh[j]);for(var i=f;i<=c.x2;i+=2)h.getex(i,-1).setQnum(this.qnumw[d-i]);break;case a.TURNL:for(var j=g;j<=c.y2;j+=2)h.getex(-1,j).setQnum(this.qnumh[e-j]);for(var i=f;i<=c.x2;i+=2)h.getex(i,-1).setQnum(this.qnumw[i])}}},Flags:{use:!0},Graphic:{paint:function(){this.drawBGCells(),this.drawDotCells(!1),this.drawBlackCells(),this.drawGrid(),this.drawBGEXcells(),this.drawNumbers_box(),this.drawCircledNumbers_box(),this.drawChassis(),this.drawTarget()},getBoardCols:function(){var a=this.owner.board;return(a.maxbx-a.minbx>>1)+1},getBoardRows:function(){var a=this.owner.board;return(a.maxby-a.minby>>1)+1},getOffsetCols:function(){return 0},getOffsetRows:function(){return 0},drawNumbers_box:function(){for(var a=(this.vinc("excell_number","auto"),this.range.excells),b=0;b<a.length;b++){var c=a[b],d="excell_"+c.id;if(!(c.id>=this.owner.board.qcols+this.owner.board.qrows||-1===c.bx&&-1===c.by)){var e=1!==c.error?this.fontcolor:this.fontErrcolor,f=c.qnum<10?.8:.7,g=c.bx*this.bw,h=c.by*this.bh;this.dispnum(d,1,""+c.qnum,f,e,g,h)}}},drawCircledNumbers_box:function(){var a=[],b=this.owner.board,c=this.range.x1,d=this.range.y1,e=this.range.x2,f=this.range.y2;if(e>=b.maxbx)for(var g=1|d,h=Math.min(b.maxby,f);h>=g;g+=2)a.push([b.maxbx+1,g]);if(f>=b.maxby)for(var i=1|c,h=Math.min(b.maxbx,e);h>=i;i+=2)a.push([i,b.maxby+1]);var j=this.vinc("excell_circle","auto"),k="ex2_cir_",l=.36*this.cw;j.fillStyle=this.circledcolor,j.strokeStyle=this.cellcolor;for(var m=0;m<a.length;m++){var n=(a[m][0]!==b.maxbx+1?a[m][0]:a[m][1])+1>>1;0>=n||this.vnop([k,a[m][0],a[m][1]].join("_"),this.NONE)&&j.shapeCircle(a[m][0]*this.bw,a[m][1]*this.bh,l)}for(var j=this.vinc("excell_number2","auto"),o="ex2_cir_",m=0;m<a.length;m++){var n=(a[m][0]!==b.maxbx+1?a[m][0]:a[m][1])+1>>1;if(!(0>=n)){var o=[k,a[m][0],a[m][1]].join("_"),p=10>n?.7:.6;this.dispnum(o,1,""+n,p,this.fontcolor,a[m][0]*this.bw,a[m][1]*this.bh)}}}},Encode:{decodePzpr:function(){this.decodeBox()},encodePzpr:function(){this.encodeBox()},decodeBox:function(){for(var a=0,b=this.outbstr,c=this.owner.board,d=0;d<b.length;d++){var e=b.charAt(d),f=c.excell[a];if("-"===e?(f.qnum=parseInt(b.substr(d+1,2),32),d+=2):f.qnum=parseInt(e,32),a++,a>=c.qcols+c.qrows){d++;break}}this.outbstr=b.substr(d)},encodeBox:function(){for(var a="",b=this.owner.board,c=0,d=b.qcols+b.qrows;d>c;c++){var e=b.excell[c].qnum;a+=32>e?""+e.toString(32):"-"+e.toString(32)}this.outbstr+=a}},FileIO:{decodeData:function(){for(var a=this.owner.board,b=this.getItemList(a.qrows+1),c=0;c<b.length;c++){var d=b[c];if("."!=d){var e=c%(a.qcols+1)*2-1,f=(c/(a.qcols+1)<<1)-1,g=a.getex(e,f);g.isnull||(g.qnum=parseInt(d));var h=a.getc(e,f);h.isnull||("#"===d?h.qans=1:"+"===d&&(h.qsub=1))}}},encodeData:function(){for(var a=this.owner.board,b=-1;b<a.maxby;b+=2){for(var c=-1;c<a.maxbx;c+=2){var d=a.getex(c,b);if(d.isnull){var e=a.getc(c,b);this.datastr+=e.isnull?". ":1===e.qans?"# ":1===e.qsub?"+ ":". "}else this.datastr+=d.qnum.toString()+" "}this.datastr+="\n"}}},AnsCheck:{checkAns:function(){return this.checkBlackCells()?null:"nmSumRowBcNe"},checkBlackCells:function(){for(var a=!0,b=this.owner.board,c=0;c<b.excellmax;c++){var d,e=b.excell[c],f=e.getQnum(),g=e.getaddr(),h=0,i=new this.owner.CellList;if(-1===g.by&&g.bx>0&&g.bx<2*b.qcols)for(d=g.move(0,2).getc();!d.isnull;)1===d.qans&&(h+=g.by+1>>1),i.add(d),d=g.move(0,2).getc();else{if(!(-1===g.bx&&g.by>0&&g.by<2*b.qrows))continue;for(d=g.move(2,0).getc();!d.isnull;)1===d.qans&&(h+=g.bx+1>>1),i.add(d),d=g.move(2,0).getc()}if(f!==h){if(this.checkOnly)return!1;e.seterr(1),i.seterr(1),a=!1}}return a}},FailCode:{nmSumRowBcNe:["数字と黒マスになった数字の合計が正しくありません。","A number is not equal to the sum of the number of black cells."]}})}();