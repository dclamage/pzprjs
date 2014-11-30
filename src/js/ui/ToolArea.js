// ToolArea.js v3.4.0
/* global ui:false, getEL:false */

// メニュー描画/取得/html表示系
// toolareaオブジェクト
ui.toolarea = {
	isdisp : true,		// ツールパネルを表示しているか

	items : {},			// ツールパネルのエレメント等を保持する
	captions : [],		// 言語指定を切り替えた際のキャプションを保持する

	//---------------------------------------------------------------------------
	// toolarea.reset()  ツールパネル・ボタン領域の初期設定を行う
	//---------------------------------------------------------------------------
	reset : function(){
		this.walkElement(getEL("usepanel"));
		this.walkElement(getEL("checkpanel"));
		this.walkElement(getEL('btnarea'));
		
		this.display();
	},

	//---------------------------------------------------------------------------
	// toolarea.walkElement()  エレメントを探索して領域の初期設定を行う
	//---------------------------------------------------------------------------
	walkElement : function(parent){
		var toolarea = this;
		ui.misc.walker(parent, function(el){
			if(el.nodeType===1){
				/* ツールパネル領域 */
				if(el.className==="configtool"){
					toolarea.items[el["data-config"] || el.dataset.config] = {el:el};
				}
				else if(el.className.match(/child/)){
					var parent = el.parentNode, idname = parent["data-config"] || parent.dataset.config;
					var item = toolarea.items[idname];
					if(!item.children){ item.children=[];}
					item.children.push(el);
					
					ui.event.addEvent(el, "mousedown", toolarea, toolarea.toolclick);
				}
				else if(el.nodeName==="INPUT" && el.type==="checkbox"){
					var parent = el.parentNode, idname = parent["data-config"] || parent.dataset.config;
					if(!idname){ return;}
					toolarea.items[idname].checkbox=el;
					
					ui.event.addEvent(el, "click", toolarea, toolarea.toolclick);
				}
				else if(el.nodeName==="SPAN"){
					var disppid = el["data-disp-pid"] || el.dataset.dispPid;
					if(!!disppid){ el.style.display = (ui.checkpid(disppid) ? "" : "none");}
				}
				
				/* ボタン領域 */
				var role = el['data-button-exec'] || el.dataset.buttonExec;
				if(!!role){
					ui.event.addEvent(el, "mousedown", toolarea, toolarea[role]);
				}
				role = el['data-buttonup-exec'] || el.dataset.buttonupExec;
				if(!!role){
					ui.event.addEvent(el, "mouseup", toolarea, toolarea[role]);
				}
			}
			else if(el.nodeType===3){
				if(el.data.match(/^__(.+)__(.+)__$/)){
					toolarea.captions.push({textnode:el, str_jp:RegExp.$1, str_en:RegExp.$2});
				}
			}
		});
	},

	//---------------------------------------------------------------------------
	// toolarea.display()    全てのラベルに対して文字列を設定する
	// toolarea.setdisplay() 管理パネルに表示する文字列を個別に設定する
	//---------------------------------------------------------------------------
	display : function(){
		/* ツールパネル領域 */
		/* -------------- */
		var mandisp  = (this.isdisp ? 'block' : 'none');
		getEL('usepanel').style.display = mandisp;
		getEL('checkpanel').style.display = mandisp;
		getEL('menuboard').style.paddingBottom = (this.isdisp ? '8pt' : '0pt');
		/* 経過時間の表示/非表示設定 */
		getEL('separator2').style.display = ((pzpr.PLAYER && this.isdisp) ? 'block' : 'none');
		getEL('timerpanel').style.display = (pzpr.PLAYER ? 'block' : 'none');
		
		for(var idname in this.items){ this.setdisplay(idname);}
		
		/* ボタン領域 */
		/* --------- */
		getEL('btnarea').style.display = "";
		pzpr.util.unselectable(getEL('btnarea'));
		
		this.setdisplay("operation");
		getEL('btnclear2').style.display  = (!ui.puzzle.flags.disable_subclear ? "" : "none");
		getEL('btncircle').style.display  = (ui.puzzle.pid==='pipelinkr' ? "" : "none");
		getEL('btncolor').style.display   = (ui.puzzle.pid==='tentaisho' ? "" : "none");
		/* ボタンエリアの色分けボタンは、ツールパネル領域が消えている時に表示 */
		getEL('btnirowake').style.display = (((ui.puzzle.flags.irowake || ui.puzzle.flags.irowakeblk) && !this.isdisp) ? "" : "none");
		
		/* 共通：キャプションの設定 */
		/* --------------------- */
		for(var i=0;i<this.captions.length;i++){
			var obj = this.captions[i];
			obj.textnode.data = ui.selectStr(obj.str_jp, obj.str_en);
		}
	},
	setdisplay : function(idname){
		if(idname==="operation"){
			var opemgr = ui.puzzle.opemgr;
			getEL('btnundo').style.color = (!opemgr.enableUndo ? 'silver' : '');
			getEL('btnredo').style.color = (!opemgr.enableRedo ? 'silver' : '');
		}
		else if(this.items===null || !this.items[idname]){
			/* DO NOTHING */
		}
		else if(ui.validConfig(idname)){
			var toolitem = this.items[idname];
			toolitem.el.style.display = "";
			
			/* 子要素の設定を行う */
			if(!!toolitem.children){
				var children = toolitem.children;
				for(var i=0;i<children.length;i++){
					var child = children[i], selected = ((child["data-value"] || child.dataset.value)===""+ui.getConfig(idname));
					child.className = (selected ? "child childsel" : "child");
				}
			}
			/* チェックボックスの表記の設定 */
			else if(!!toolitem.checkbox){
				var check = toolitem.checkbox;
				if(!!check){ check.checked = ui.getConfig(idname);}
				
				var disabled = null;
				if(idname==="keypopup"){ disabled = !ui.keypopup.paneltype[ui.getConfig("mode")];}
				if(idname==="bgcolor") { disabled = (ui.getConfig("mode")!==3);}
				if(disabled!==null){
					toolitem.checkbox.disabled = (!disabled ? "" : "true");
					toolitem.el.style.color    = (!disabled ? "" : "silver");
				}
			}
			
			if((idname==="disptype_pipelinkr") && !!getEL('btncircle')){
				getEL('btncircle').innerHTML = ((ui.getConfig(idname)===1)?"○":"■");
			}
		}
		else if(!!this.items[idname]){
			this.items[idname].el.style.display = "none";
		}
	},

	//---------------------------------------------------------------------------
	// toolarea.toolclick()   ツールパネルの入力があった時、設定を変更する
	//---------------------------------------------------------------------------
	toolclick : function(e){
		var el = e.target, parent = el.parentNode;
		var idname = (parent["data-config"] || parent.dataset.config), value;
		if(!!this.items[idname].checkbox){ value = !!el.checked;}
		else                             { value = (el["data-value"] || el.dataset.value);}
		ui.setConfig(idname, value);
	},

	//---------------------------------------------------------------------------
	// Canvas下にあるボタンが押された/放された時の動作
	//---------------------------------------------------------------------------
	answercheck : function(){ ui.menuarea.answercheck();},
	undo     : function(){ ui.puzzle.undotimer.startButtonUndo();},
	undostop : function(){ ui.puzzle.undotimer.stopButtonUndo();},
	redo     : function(){ ui.puzzle.undotimer.startButtonRedo();},
	redostop : function(){ ui.puzzle.undotimer.stopButtonRedo();},
	ansclear : function(){ ui.menuarea.ACconfirm();},
	subclear : function(){ ui.menuarea.ASconfirm();},
	irowake  : function(){ ui.puzzle.irowake();},
	encolorall : function(){ ui.puzzle.board.encolorall();}, /* 天体ショーのボタン */

	//---------------------------------------------------------------------------
	// toolarea.toggledisp()   帰ってきたパイプリンクでアイスと○などの表示切り替え時の処理を行う
	//---------------------------------------------------------------------------
	toggledisp : function(){
		var current = ui.puzzle.getConfig('disptype_pipelinkr');
		ui.puzzle.setConfig('disptype_pipelinkr', (current===1?2:1));
	}
};
