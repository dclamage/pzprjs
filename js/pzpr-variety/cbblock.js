/*! @license pzpr.js v70f4534 (c) 2009-2021 sabo2, MIT license
 *   https://github.com/sabo2/pzprv3 */

!function(a,b){"object"==typeof module&&module.exports?module.exports=[a,b]:pzpr.classmgr.makeCustom(a,b)}(["cbblock","dbchoco","nikoji"],{"MouseEvent@cbblock":{inputModes:{edit:["border"],play:["border","subline"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&("left"===this.btn&&this.isBorderMode()?this.inputborder():this.inputQsubLine()):this.puzzle.editmode&&(this.mousestart||this.mousemove)&&this.inputborder()}},"MouseEvent@dbchoco":{inputModes:{edit:["shade","number","clear"],play:["border","subline"]},mouseinput_auto:function(){if(this.puzzle.playmode)(this.mousestart||this.mousemove)&&("left"===this.btn&&this.isBorderMode()?this.inputborder():this.inputQsubLine());else if(this.puzzle.editmode){var a=this.getcell();if(a.isnull)return;!this.mousestart||"right"===this.btn&&a!==this.cursor.getc()||(this.inputData=-1),this.mousestart&&a!==this.cursor.getc()&&"right"===this.btn||this.mousemove&&this.inputData>=0?this.inputShade():this.mouseend&&this.notInputted()&&(a!==this.cursor.getc()&&"auto"===this.inputMode&&"left"===this.btn?this.setcursor(a):this.inputqnum(a))}},inputShade:function(){this.inputIcebarn()}},"MouseEvent@nikoji":{inputModes:{edit:["number","clear"],play:["border","subline"]},mouseinput_auto:function(){this.puzzle.playmode?(this.mousestart||this.mousemove)&&("left"===this.btn&&this.isBorderMode()?this.inputborder():this.inputQsubLine()):this.puzzle.editmode&&(this.mousestart||this.mousemove)&&this.inputqnum()}},"KeyEvent@dbchoco":{enablemake:!0,keyinput:function(a){if("q"===a){var b=this.cursor.getc();b.setQues(6!==b.ques?6:0),this.prev=b,b.draw()}else this.key_inputqnum(a)}},"KeyEvent@nikoji":{enablemake:!0},"Border@cbblock":{ques:1,enableLineNG:!0,isLineNG:function(){return 1===this.ques},isGround:function(){return this.ques>0}},Board:{cols:8,rows:8,hascross:1,hasborder:1,addExtraInfo:function(){this.tilegraph=this.addInfoList(this.klass.AreaTileGraph),this.blockgraph=this.addInfoList(this.klass.AreaBlockGraph)}},"Board@nikoji":{recountNumbers:function(){var a=new Set;this.cell.each(function(b){b.qnum>=0&&a.add(b.qnum)}),this.nums=Array.from(a)},addExtraInfo:function(){}},"Cell@dbchoco":{maxnum:function(){var a=this.board;return a.cols*a.rows>>1}},"Cell@nikoji":{maxnum:52,numberAsLetter:!0,disInputHatena:!0,posthook:{qnum:function(){this.board.roommgr.setExtraData(this.room),this.board.recountNumbers()}}},"AreaTileGraph:AreaGraphBase":{enabled:!0,setComponentRefs:function(a,b){a.tile=b},getObjNodeList:function(a){return a.tilenodes},resetObjNodeList:function(a){a.tilenodes=[]},isnodevalid:function(a){return!0},setExtraData:function(a){if(this.klass.AreaGraphBase.prototype.setExtraData.call(this,a),!this.rebuildmode&&0!==a.clist.length){var b=a.clist[0].block;b&&this.board.blockgraph.setComponentInfo(b)}}},"AreaTileGraph@cbblock":{relation:{"border.ques":"separator"},isedgevalidbylinkobj:function(a){return a.isGround()}},"AreaTileGraph@dbchoco":{relation:{"border.qans":"separator","cell.ques":"node"},isedgevalidbylinkobj:function(a){return!a.sidecell[0].isnull&&!a.sidecell[1].isnull&&(0===a.qans&&a.sidecell[0].ques===a.sidecell[1].ques)}},"AreaBlockGraph:AreaRoomGraph":{enabled:!0,getComponentRefs:function(a){return a.block},setComponentRefs:function(a,b){a.block=b},getObjNodeList:function(a){return a.blocknodes},resetObjNodeList:function(a){a.blocknodes=[]},isedgevalidbylinkobj:function(a){return 0===a.qans},setExtraData:function(a){var b=0,c=a.clist=new this.klass.CellList(a.getnodeobjs());a.size=c.length;for(var d=this.board.tilegraph.components,e=0;e<d.length;e++)d[e].count=0;for(var e=0;e<c.length;e++){if(!c[e].tile)return void(a.dotcnt=0);c[e].tile.count++}for(var e=0;e<d.length;e++)d[e].count>0&&b++;a.dotcnt=b}},"AreaRoomGraph@nikoji":{enabled:!0,setExtraData:function(a){var b=a.clist=new this.klass.CellList(a.getnodeobjs()),c=b.filter(function(a){return-1!==a.qnum});a.numcell=1===c.length?c[0]:null,a.num=a.numcell?a.numcell.qnum:null}},CellList:{getBlockShapes:function(){if(this.shape)return this.shape;for(var a=this.board,b=this.getRectSize(),c=[[],[],[],[],[],[],[],[]],d={cols:b.cols,rows:b.rows,data:[]},e=0;e<2*b.rows;e+=2)for(var f=0;f<2*b.cols;f+=2)c[0].push(this.include(a.getc(b.x1+f,b.y1+e))?1:0),c[1].push(this.include(a.getc(b.x1+f,b.y2-e))?1:0);for(var f=0;f<2*b.cols;f+=2)for(var e=0;e<2*b.rows;e+=2)c[4].push(this.include(a.getc(b.x1+f,b.y1+e))?1:0),c[5].push(this.include(a.getc(b.x1+f,b.y2-e))?1:0);c[2]=c[1].concat().reverse(),c[3]=c[0].concat().reverse(),c[6]=c[5].concat().reverse(),c[7]=c[4].concat().reverse();for(var g=0;g<8;g++)d.data[g]=c[g].join("");return this.shape=d}},Graphic:{gridcolor_type:"LIGHT",paint:function(){this.drawBGCells(),this.drawDashedGrid(),this.drawBorders(),this.drawBorderQsubs(),this.drawBaseMarks(),this.drawChassis(),this.drawPekes(),"dbchoco"!==this.pid&&"nikoji"!==this.pid||(this.drawQuesNumbers(),this.drawTarget())}},"Graphic@cbblock":{getBorderColor:function(a){if(1===a.ques){var b=a.sidecell[1];return b.isnull||0===b.error?"white":this.errbcolor1}return 1===a.qans?1===a.error?this.errcolor1:a.trial?this.trialcolor:this.qanscolor:null}},"Graphic@dbchoco":{bgcellcolor_func:"icebarn",icecolor:"rgb(204,204,204)",bordercolor_func:"qans"},"Graphic@nikoji":{bordercolor_func:"qans"},"Encode@cbblock":{decodePzpr:function(a){this.decodeCBBlock()},encodePzpr:function(a){this.encodeCBBlock()},decodeCBBlock:function(){for(var a=this.outbstr,b=this.board,c=[16,8,4,2,1],d=a?Math.min((b.border.length+4)/5|0,a.length):0,e=0,f=0;f<d;f++)for(var g=parseInt(a.charAt(f),32),h=0;h<5;h++)b.border[e]&&(b.border[e].ques=g&c[h]?1:0,e++);this.outbstr=a.substr(d)},encodeCBBlock:function(){for(var a=0,b=0,c="",d=this.board,e=[16,8,4,2,1],f=0,g=d.border.length;f<g;f++)d.border[f].isGround()&&(b+=e[a]),5===++a&&(c+=b.toString(32),a=0,b=0);a>0&&(c+=b.toString(32)),this.outbstr+=c}},"Encode@dbchoco":{decodePzpr:function(a){this.decodeDBChoco()},encodePzpr:function(a){this.encodeDBChoco()},decodeDBChoco:function(){this.decodeIce(),this.decodeNumber16()},encodeDBChoco:function(){this.encodeIce(),this.encodeNumber16()}},"Encode@nikoji":{decodePzpr:function(a){this.decodeNumber16()},encodePzpr:function(a){this.encodeNumber16()}},"FileIO@cbblock":{decodeData:function(){this.decodeBorder(function(a,b){"3"===b?(a.ques=0,a.qans=1,a.qsub=1):"1"===b?(a.ques=0,a.qans=1):"-1"===b?(a.ques=1,a.qsub=1):"-2"===b?(a.ques=0,a.qsub=1):a.ques="2"===b?0:1})},encodeData:function(){this.encodeBorder(function(a){return 1===a.qans&&1===a.qsub?"3 ":1===a.qans?"1 ":1===a.ques&&1===a.qsub?"-1 ":0===a.ques&&1===a.qsub?"-2 ":0===a.ques?"2 ":"0 "})}},"FileIO@dbchoco":{decodeData:function(){this.decodeCell(function(a,b){"-"===b.charAt(0)&&(a.ques=6,b=b.substr(1)),"0"===b?a.qnum=-2:"."!==b&&+b>0&&(a.qnum=+b)}),this.decodeBorderAns()},encodeData:function(){this.encodeCell(function(a){var b="";return 6===a.ques&&(b+="-"),-2===a.qnum?b+="0":-1!==a.qnum&&(b+=a.qnum.toString()),""===b&&(b="."),b+" "}),this.encodeBorderAns()}},"FileIO@nikoji":{decodeData:function(){this.decodeCellQnum(),this.decodeBorderAns()},encodeData:function(){this.encodeCellQnum(),this.encodeBorderAns()}},AnsCheck:{checklist:["checkBorderDeadend","checkSingleBlock","checkSmallNumberArea@dbchoco","checkBlockNotRect@cbblock","checkDifferentShapeBlock@cbblock","checkLargeBlock","checkEqualShapes@dbchoco","checkLargeNumberArea@dbchoco"],checkBlockNotRect:function(){this.checkAllArea(this.board.blockgraph,function(a,b,c,d){return a*b!==c},"bkRect")},checkSingleBlock:function(){this.checkMiniBlockCount(1,"bkSubLt2")},checkLargeBlock:function(){this.checkMiniBlockCount(3,"bkSubGt2")},checkMiniBlockCount:function(a,b){for(var c=this.board.blockgraph.components,d=0;d<c.length;d++){var e=c[d].dotcnt;if(!(1===a&&e>1||3===a&&e<=2)){if(this.failcode.add(b),this.checkOnly)break;c[d].clist.seterr(1)}}},checkDifferentShapeBlock:function(){for(var a=this.board.blockgraph.getSideAreaInfo(),b=0;b<a.length;b++){var c=a[b][0],d=a[b][1];if(2===c.dotcnt&&2===d.dotcnt&&!this.isDifferentShapeBlock(c,d)){if(this.failcode.add("bsSameShape"),this.checkOnly)break;c.clist.seterr(1),d.clist.seterr(1)}}},isDifferentShapeBlock:function(a,b){if(a.size!==b.size)return!0;for(var c=a.clist.getBlockShapes(),d=b.clist.getBlockShapes(),e=c.cols===d.cols&&c.rows===d.rows?0:4,f=c.cols===d.rows&&c.rows===d.cols?8:4,g=e;g<f;g++)if(d.data[0]===c.data[g])return!1;return!0},checkSmallNumberArea:function(){return this.checkNumberArea(-1,"bkSizeLt")},checkLargeNumberArea:function(){return this.checkNumberArea(1,"bkSizeGt")},checkNumberArea:function(a,b){for(var c=this.board.tilegraph.components,d=0;d<c.length;d++)for(var e=c[d].clist,f=e.length,g=0;g<e.length;g++){var h=e[g],i=h.qnum;if(!(i<=0)&&(a<0&&f<i||a>0&&f>i)){if(this.failcode.add(b),this.checkOnly)return;e.seterr(1)}}},checkEqualShapes:function(){for(var a=this.board.blockgraph.components,b=0;b<a.length;b++){var c=a[b];if(2===c.dotcnt&&!this.isEqualShapes(c.clist)){if(this.failcode.add("bkDifferentShape"),this.checkOnly)break;c.clist.seterr(1)}}},isEqualShapes:function(a){for(var b=0;b<a.length;b++)for(var c=a[b],d=[c.adjborder.right,c.adjborder.bottom],e=0;e<d.length;e++){var f=d[e];if(f&&!f.isnull){var g=f.sidecell[0],h=f.sidecell[1];if(0===f.qans&&!g.isnull&&!h.isnull&&g.ques!==h.ques)return!this.isDifferentShapeBlock(g.tile,h.tile)}}return!1}},"AnsCheck@nikoji":{checklist:["checkNoNumber","checkIdenticalShapes","checkIdenticalOrientation","checkIdenticalPositions","checkUniqueShapes","checkDoubleNumber","checkBorderDeadend"],checkIdenticalShapes:function(){this.board.nums||this.board.recountNumbers();for(var a=this.board.roommgr.components,b=0;b<this.board.nums.length;b++)for(var c=this.board.nums[b],d=null,e=0;e<a.length;e++){var f=a[e];if(f.num===c)if(d){if(this.isDifferentShapeBlock(d,f)){if(this.failcode.add("bkDifferentShape"),this.checkOnly)return;d.clist.seterr(1),f.clist.seterr(1)}}else d=f}},checkIdenticalOrientation:function(){this.board.nums||this.board.recountNumbers();for(var a=this.board.roommgr.components,b=0;b<this.board.nums.length;b++)for(var c=this.board.nums[b],d=null,e=null,f=0;f<a.length;f++){var g=a[f];if(g.num===c)if(d){var h=g.clist,i=g.clist.getBlockShapes();if(e.rows!==i.rows||e.cols!==i.cols||e.data[0]!==i.data[0]){if(this.failcode.add("bkDifferentOrientation"),this.checkOnly)return;d.seterr(1),h.seterr(1)}}else d=g.clist,e=g.clist.getBlockShapes()}},checkIdenticalPositions:function(){this.board.nums||this.board.recountNumbers();for(var a=this.board.roommgr.components,b=0;b<this.board.nums.length;b++)for(var c=this.board.nums[b],d=null,e=null,f=0;f<a.length;f++){var g=a[f];if(g.num===c)if(d){var h=g,i=g.clist.getRectSize();if(e.rows!==i.rows||e.cols!==i.cols)continue;if(d.numcell.bx-e.x1==h.numcell.bx-i.x1&&d.numcell.by-e.y1==h.numcell.by-i.y1)continue;if(this.failcode.add("bkDifferentPosition"),this.checkOnly)return;d.clist.seterr(1),h.clist.seterr(1)}else d=g,e=g.clist.getRectSize()}},checkUniqueShapes:function(){this.board.nums||this.board.recountNumbers();for(var a=this.board.roommgr.components,b={},c=0;c<a.length;c++){var d=a[c];if(null!==d.num){var e=d.num+"";e in b||(b[e]=d)}}for(var f=[],g=0;g<this.board.nums.length;g++){var h=this.board.nums[g];h in b&&f.push(b[h])}for(var i=0;i<f.length;i++)for(var j=i+1;j<f.length;j++)if(!this.isDifferentShapeBlock(f[i],f[j])){if(this.failcode.add("bkDifferentLetters"),this.checkOnly)return;f[i].clist.seterr(1),f[j].clist.seterr(1)}}},"FailCode@cbblock":{bkRect:["ブロックが四角形になっています。","A block is rectangle."],bsSameShape:["同じ形のブロックが接しています。","The blocks that has the same shape are adjacent."],bkSubLt2:["ブロックが1つの点線からなる領域で構成されています。","A block has one area framed by dotted line."],bkSubGt2:["ブロックが3つ以上の点線からなる領域で構成されています。","A block has three or more areas framed by dotted line."]},"FailCode@dbchoco":{bkSubLt2:["1色のマスしか入っていないブロックがあります。","A block contains a single color."],bkSubGt2:["同じ色のマスのカタマリが3個以上入っているブロックがあります。","A block has three or more shapes."],bkSizeLt:["同じ色のマスのカタマリの大きさより数字が大きいです。","A number is bigger than the size of the shape."],bkSizeGt:["同じ色のマスのカタマリの大きさより数字が小さいです。","A number is smaller than the size of the shape."],bkDifferentShape:["同じ形でないマスのカタマリを含むブロックがあります。","The two shapes inside a block are different."]},"FailCode@nikoji":{bkNoNum:["(please translate) An area has no letter.","An area has no letter."],bkNumGe2:["(please translate) An area has multiple letters.","An area has multiple letters."],bkDifferentShape:["(please translate) Two areas with equal letters have different shapes.","Two areas with equal letters have different shapes."],bkDifferentOrientation:["(please translate) Two areas with equal letters have different orientation.","Two areas with equal letters have different orientation."],bkDifferentPosition:["(please translate) Two areas with equal letters have the letter in different positions.","Two areas with equal letters have the letter in different positions."],bkDifferentLetters:["(please translate) Two areas with different letters have the same shape.","Two areas with different letters have the same shape."]}});
//# sourceMappingURL=cbblock.js.map