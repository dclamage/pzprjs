/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["amibo"],{MouseEvent:{inputModes:{edit:["number","clear"],play:["bar","peke"]},mouseinput_auto:function(){if(this.puzzle.playmode){if((this.mousestart||this.mousemove)&&("left"===this.btn?this.inputTateyoko():"right"===this.btn&&this.inputpeke()),this.mouseend&&this.notInputted()){if(this.inputpeke_ifborder())return;this.clickTateyoko()}}else this.puzzle.editmode&&this.mousestart&&this.inputqnum()},clickTateyoko:function(){var a=this.getcell();a.isnull||a.isNum()||(a.setQans(("left"===this.btn?{0:12,12:13,13:11,11:0}:{0:11,11:13,13:12,12:0})[a.qans]),a.draw())}},KeyEvent:{enablemake:!0},Cell:{numberRemainsUnshaded:!0,maxnum:function(){var a=this.board,b=this.bx,c=this.by,d=(b<a.maxbx>>1?a.maxbx-b:b)>>1,e=(c<a.maxby>>1?a.maxby-c:c)>>1;return Math.max(d,e)},minnum:2,getPoleBar:function(){var a,b=this.adjacent,c=[];return a=b.top,a.isnull||11!==a.qans&&12!==a.qans||c.push(a.barnodes[0].component),a=b.bottom,a.isnull||11!==a.qans&&12!==a.qans||c.push(a.barnodes[0].component),a=b.left,a.isnull||11!==a.qans&&13!==a.qans||c.push(a.barnodes[a.barnodes.length<2?0:1].component),a=b.right,a.isnull||11!==a.qans&&13!==a.qans||c.push(a.barnodes[a.barnodes.length<2?0:1].component),c}},Board:{hasborder:1,cols:8,rows:8,addExtraInfo:function(){this.netgraph=this.addInfoList(this.klass.AreaNetGraph),this.bargraph=this.addInfoList(this.klass.AreaBarGraph)},irowakeRemake:function(){this.netgraph.newIrowake()}},BoardExec:{adjustBoardData:function(a,b){if(a&this.TURN)for(var c={0:0,11:11,12:13,13:12},d=this.board.cell,e=0;e<d.length;e++){var f=d[e];f.setQans(c[f.qans])}}},"AreaNetGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qans":"node"},coloring:!0,setComponentRefs:function(a,b){a.net=b},getObjNodeList:function(a){return a.netnodes},resetObjNodeList:function(a){a.netnodes=[]},isnodevalid:function(a){return a.qans>0},isedgevalidbynodeobj:function(a,b){var c=a.getdir(b,2);return c===a.UP||c===a.DN?!(0===a.qans||13===a.qans||0===b.qans||13===b.qans):(c===a.LT||c===a.RT)&&!(0===a.qans||12===a.qans||0===b.qans||12===b.qans)},setExtraData:function(a){a.clist=new this.klass.CellList(a.getnodeobjs()),a.color||(a.color=this.puzzle.painter.getNewLineColor())},getLongColor:function(a){return this.klass.GraphBase.prototype.getLongColor.call(this,a)},setLongColor:function(a,b){this.klass.GraphBase.prototype.setLongColor.call(this,a,b)},repaintNodes:function(a){this.klass.AreaShadeGraph.prototype.repaintNodes.call(this,a)},newIrowake:function(){this.klass.GraphBase.prototype.newIrowake.call(this)}},"AreaBarGraph:AreaGraphBase":{enabled:!0,relation:{"cell.qans":"node"},setComponentRefs:function(a,b){a.bar=b},getObjNodeList:function(a){return a.barnodes},resetObjNodeList:function(a){a.barnodes=[]},isnodevalid:function(a){return a.qans>0},isedgevalidbynodeobj:function(a,b){return this.klass.AreaNetGraph.prototype.isedgevalidbynodeobj.call(this,a,b)},calcNodeCount:function(a){return{0:0,11:2,12:1,13:1}[a.qans]},removeEdgeByNodeObj:function(a){for(var b=this.getSideObjByNodeObj(a),c=this.getObjNodeList(a),d=0;d<b.length;d++){var e=a.getdir(b[d],2),f=e===a.LT||e===a.RT,g=this.getObjNodeList(b[d]),h=c[c.length<2||!f?0:1],i=g[g.length<2||!f?0:1];h&&i&&this.removeEdge(h,i)}for(var d=c.length;d>0;d--)this.deleteNode(a.barnodes[0])},addEdgeByNodeObj:function(a){for(var b=0,c=this.calcNodeCount(a);b<c;b++)this.createNode(a);for(var d=this.getSideObjByNodeObj(a),e=this.getObjNodeList(a),b=0;b<d.length;b++)if(this.isedgevalidbynodeobj(a,d[b])){var f=a.getdir(d[b],2),g=f===a.LT||f===a.RT,h=this.getObjNodeList(d[b]),i=e[e.length<2||!g?0:1],j=h[h.length<2||!g?0:1];i&&j&&this.addEdge(i,j)}},searchGraph:function(){for(var a=this.klass.AreaGraphBase.prototype.searchGraph.call(this),b=0;b<a.length;b++)this.setExtraData(a[b]);return a},setExtraData:function(a){if(a.clist=new this.klass.CellList(a.getnodeobjs()),a.size=a.clist.length,a.nodes>1){var b=a.clist.getRectSize();a.vert=1===b.cols}else 1===a.nodes[0].obj.barnodes.length?a.vert=12===a.nodes[0].obj.qans:a.vert=0===a.nodes[0].obj.barnodes.indexOf(a.nodes[0])},getCrossBars:function(a){for(var b=[],c=0;c<a.nodes.length;c++){var d=a.nodes[c];2===d.obj.barnodes.length&&b.push(d.obj.barnodes[1===d.obj.barnodes.indexOf(d)?0:1].component)}return b}},CellList:{setErrorBar:function(a){for(var b=0;b<this.length;b++){var c=this[b],d=c.error;4===d||(5===d?a||c.seterr(4):6===d?a&&c.seterr(4):c.seterr(a?5:6))}}},ObjectOperation:{decode:function(a){var b=this.common.decode.call(this,a);return this.old=[0,12,13,11][this.old],this.num=[0,12,13,11][this.num],b}},Graphic:{hideHatena:!0,irowake:!0,gridcolor_type:"LIGHT",numbercolor_func:"fixed",circleratio:[.45,.4],setRange:function(a,b,c,d){this.common.setRange.call(this,a-2,b-2,c+2,d+2)},paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawTateyokos(),this.drawTateyokos_sub(),this.drawCircledNumbers(),this.drawPekeBorder(),this.drawChassis(),this.drawTarget()},drawTateyokos_sub:function(){var a=this.vinc("cell_tateyoko","crispEdges",!0);a.fillStyle=this.linecolor;for(var b=this.range.cells,c=this.bw,d=this.bh,e=0;e<b.length;e++){var f=b[e],g=f.isNum(),h=Math.max(c/3,3),i=c-h/2,j=f.bx*c,k=f.by*d,l=f.adjacent.top,m=l.qans;a.vid="c_bars1a_"+f.id,!g||11!==m&&12!==m?a.vhide():(a.fillStyle=this.getBarColor(l,!0),a.fillRect(j-c+i,k-d,h,d));var l=f.adjacent.bottom,m=l.qans;a.vid="c_bars1b_"+f.id,!g||11!==m&&12!==m?a.vhide():(a.fillStyle=this.getBarColor(l,!0),a.fillRect(j-c+i,k+1,h,d));var l=f.adjacent.left,m=l.qans;a.vid="c_bars2a_"+f.id,!g||11!==m&&13!==m?a.vhide():(a.fillStyle=this.getBarColor(l,!1),a.fillRect(j-c,k-d+i,c,h));var l=f.adjacent.right,m=l.qans;a.vid="c_bars2b_"+f.id,!g||11!==m&&13!==m?a.vhide():(a.fillStyle=this.getBarColor(l,!1),a.fillRect(j+1,k-d+i,c,h))}},drawPekeBorder:function(){for(var a=this.vinc("border_pbd","crispEdges",!0),b=.6*this.bw,c=this.lm,d=this.range.borders,e=0;e<d.length;e++){var f=d[e];if(a.vid="b_qsub2_"+f.id,2===f.qsub){var g=f.bx*this.bw,h=f.by*this.bh;a.fillStyle=f.trial?this.trialcolor:"rgb(64,64,64)",f.isVert()?a.fillRectCenter(g,h,c,b+c):a.fillRectCenter(g,h,b+c,c)}else a.vhide()}},getBarColor:function(a,b){var c=a.error,d=1===c||4===c||5===c&&b||6===c&&!b;return this.addlw=0,a.trial&&this.puzzle.execConfig("irowake")?this.addlw=-this.lm:d&&(this.addlw=1),d?this.errlinecolor:0!==c?this.noerrcolor:this.puzzle.execConfig("irowake")&&a.net&&a.net.color?a.net.color:a.trial?this.trialcolor:this.linecolor}},Encode:{decodePzpr:function(a){this.decodeNumber10or16()},encodePzpr:function(a){this.encodeNumber10or16()}},FileIO:{decodeData:function(){this.decodeCell(function(a,b){"l"===b?a.qans=12:"-"===b?a.qans=13:"+"===b?a.qans=11:"#"===b?a.qnum=-2:"."!==b&&(a.qnum=+b)}),this.decodeBorderLine()},encodeData:function(){this.encodeCell(function(a){return 12===a.qans?"l ":13===a.qans?"- ":11===a.qans?"+ ":a.qnum>=0?a.qnum+" ":-2===a.qnum?"# ":". "}),this.encodeBorderLine()}},AnsCheck:{checklist:["checkBarExist+","checkNotMultiBar","checkLoop_amibo","checkLongBar","checkCrossedLength","checkShortBar","checkSingleBar","checkAllBarConnect+"],checkBarExist:function(){this.board.netgraph.components.length>0||this.failcode.add("brNoLine")},checkNotMultiBar:function(){this.checkOutgoingBars(1,"nmLineGt1")},checkSingleBar:function(){this.checkOutgoingBars(2,"nmNoLine")},checkOutgoingBars:function(a,b){for(var c=this.board,d=0;d<c.cell.length;d++){var e=c.cell[d];if(e.isNum()){var f=e.getPoleBar();if(!(1===a&&f.length<=1||2===a&&f.length>0)){if(this.failcode.add(b),this.checkOnly)break;e.seterr(1)}}}},checkLongBar:function(){this.checkPoleLength(1,"lbLenGt")},checkShortBar:function(){this.checkPoleLength(2,"lbLenLt")},checkPoleLength:function(a,b){for(var c=!0,d=this.board,e=0;e<d.cell.length;e++){var f=d.cell[e];if(f.isValidNum()){var g=f.getPoleBar()[0];if(g){var h=f.getNum(),i=g.clist,j=i.length;if(!(1===a&&j<=h||2===a&&j>=h)){if(c=!1,this.checkOnly)break;f.seterr(1),i.setErrorBar(g.vert)}}}}c||(this.failcode.add(b),d.cell.filter(function(a){return a.noNum()}).setnoerr())},checkCrossedLength:function(){for(var a=!0,b=this.board,c=b.bargraph.components,d=0,e=c.length;d<e;d++){for(var f=!1,g=c[d],h=b.bargraph.getCrossBars(g),i=0,j=h.length;i<j;i++)if(g.size===h[i].size){f=!0;break}if(!f){if(a=!1,this.checkOnly)break;g.clist.setErrorBar(g.vert)}}a||(this.failcode.add("lbNotCrossEq"),b.cell.filter(function(a){return a.noNum()}).setnoerr())},checkAllBarConnect:function(){this.checkOneArea(this.board.netgraph,"lbDivide")},checkLoop_amibo:function(){for(var a=this.board,b=a.netgraph.components,c=0;c<b.length;c++)if(0!==b[c].circuits){if(this.failcode.add("lbLoop"),this.checkOnly)return;a.cell.filter(function(a){return a.noNum()}).setnoerr(),this.searchloop(b[c]).seterr(4)}},searchloop:function(a){if(a.circuits<=0)return new this.klass.CellList;for(var b=this.board,c=new this.klass.CellList,d=[a.clist[0]],e=null,f={},g=b.maxbx-b.minbx;d.length>0;){var h=d[d.length-1],i=null,j=f[h.by*g+h.bx];if(void 0===j)j=f[h.by*g+h.bx]=d.length-1;else if(d.length-1>j)for(var k=d.length-2;k>=0&&("cell"===d[k].group&&c.add(d[k]),d[k]!==h);k--);if("cell"===h.group){e=h;for(var k=0;k<h.netnodes[0].nodes.length;k++){var l=h.netnodes[0].nodes[k].obj,m=b.getb(h.bx+l.bx>>1,h.by+l.by>>1);if(void 0===f[m.by*g+m.bx]){i=m;break}}}else for(var k=0;k<h.sidecell.length;k++){var n=h.sidecell[k];if(n!==e&&n!==d[d.length-2]){i=n;break}}i?d.push(i):d.pop()}return c}},FailCode:{lbDivide:["棒が１つに繋がっていません。","The bars are not connected."],lbLenGt:["白丸から出る棒の長さが長いです。","The length of the bar is too long."],lbLenLt:["白丸から出る棒の長さが短いです。","The length of the bar is too short."],lbLoop:["棒で輪っかができています。","There is a loop of bars."],lbNotCrossEq:["同じ長さの棒と交差していません。","A bar doesn't cross a bar whose length is the same."],nmLineGt1:["白丸に線が2本以上つながっています。","Multiple lines connect to a white circle."],nmNoLine:["白丸に線がつながっていません。","No bar connects to a white circle."]}});
//# sourceMappingURL=amibo.js.map