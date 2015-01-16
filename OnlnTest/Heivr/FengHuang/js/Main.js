/*
*
*/

(function () {
	nWse.stPageInit.cAddEvtHdlr_DocRdy(function () {
		//	console.log("document.ready");

		// 窗口调整尺寸响应速率
		var i_WndRszRspsSpd = 1 / 75;

		// flash尺寸
		var i_FlashWid = 1920, i_FlashHgt = 1080, i_FlashAr = i_FlashWid / i_FlashHgt;

		// 当前位置尺寸，比例（取两个方向更小的那个）
		var s_FlashX = 0, s_FlashY = 0, s_FlashWid = i_FlashWid, s_FlashHgt = i_FlashHgt, s_FlashScl = 1;
		function fUpdFlashScl() {
			s_FlashScl = Math.min(nWse.stDomUtil.cGetVwptWid() / i_FlashWid, nWse.stDomUtil.cGetVwptHgt() / i_FlashHgt);
			s_FlashWid = i_FlashWid * s_FlashScl;
			s_FlashHgt = i_FlashHgt * s_FlashScl;
			s_FlashX = (nWse.stDomUtil.cGetVwptWid() - s_FlashWid) / 2;
			s_FlashY = (nWse.stDomUtil.cGetVwptHgt() - s_FlashHgt) / 2;
			//	console.log("s_FlashScl = " + s_FlashScl);
		}

		fUpdFlashScl();
		nWse.stDomUtil.cAddEvtHdlr_WndRsz(fUpdFlashScl, i_WndRszRspsSpd);

		//===================================================== 全局

		// 整个文档禁用选取
		nWse.stDomUtil.cAddEvtHdlr(document, "selectstart",
			function (a_Evt) {
				a_Evt = a_Evt || window.event;
				if (a_Evt.preventDefault) {
					a_Evt.preventDefault();
				}
				return false;
			});

		//===================================================== 共同

		// 调整底部菜单的位置宽度
		(function () {

			function fFixMenu(a_1st) {
				var l_MenuBm = nWse.stDomUtil.cQryOne(".mi_menu_bm");
				if (!l_MenuBm)
				{ return; }

				var l_X, l_Y;
				l_X = 0;
				//	l_Y = s_FlashY + s_FlashHgt - l_MenuBm.offsetHeight; // 和flash无关，总是紧靠最底部
				l_Y = nWse.stDomUtil.cGetVwptHgt() - l_MenuBm.offsetHeight;
				//	nWse.stCssUtil.cSetPos(l_MenuBm, l_X, l_Y);

				// 第一次动画
				if (true === a_1st) {
					nWse.stCssUtil.cSetPos(l_MenuBm, l_X, nWse.stDomUtil.cGetVwptHgt());
					nWse.stCssUtil.cAnmt(l_MenuBm,
						{
							"top": l_Y + "px"
						},
						{
							c_Dur: 0.6,
							c_fEsn: function (a_Scl) {
								return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
							}
						});
				}
				else {
					nWse.stCssUtil.cSetPos(l_MenuBm, l_X, l_Y);
				}
			}

			fFixMenu(true);
			nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixMenu, i_WndRszRspsSpd);
		})();

		var s_DomBody = nWse.stDomUtil.cAcsBody();


		//===================================================== API

		// 垂直居中
		(function () {
			nApp.fVticAln = function (a_DomElmt) {
				if (!a_DomElmt)
				{ return; }

				var l_DomPrn = a_DomElmt.parentNode;
				var l_PrnHgt = l_DomPrn ? l_DomPrn.offsetHeight : nWse.stDomUtil.cGetVwptHgt();
				var l_Y = (l_PrnHgt - a_DomElmt.offsetHeight) / 2;
				nWse.stCssUtil.cSetPosTp(a_DomElmt, l_Y);
			};
		})();

		//===================================================== 公共

		// 主标题广告牌
		(function () {
			var l_DomBlbd = nWse.stDomUtil.cQryOne(".mi_tit_blbd");
			if (!l_DomBlbd)
			{ return; }

			// 调整位置尺寸
			function fFixPosDim() {
				var i_StdWid = 326, i_StdHgt = 203;
				var i_MyScl = s_FlashScl * 1; // 太小，放大？
				var l_W = Math.round(i_StdWid * i_MyScl), l_H = Math.round(i_StdHgt * i_MyScl);
				nWse.stCssUtil.cSetDim(l_DomBlbd, l_W, l_H);

				var l_X, l_Y;
				l_X = Math.round(s_FlashX + (s_FlashWid - l_W) / 2);
				l_Y = Math.round(s_FlashY + s_FlashHgt * 0.3); // 固定比例
				nWse.stCssUtil.cSetPos(l_DomBlbd, l_X, l_Y);

				// 按钮
				var l_DomBtn = nWse.stDomUtil.cQryOne(".mi_btn");
				if (!l_DomBtn)
				{ return; }

				var i_BtnDim = l_DomBtn.offsetWidth;
				l_Y += l_H + (i_BtnDim / 2) * s_FlashScl;
				l_W = l_H = i_BtnDim;// * s_FlashScl;由于使用了图标，不能缩放！
				l_X = Math.round(s_FlashX + (s_FlashWid - l_W) / 2);
				nWse.stCssUtil.cSetPos(l_DomBtn, l_X, l_Y);
				//	nWse.stCssUtil.cSetDim(l_DomBtn, l_W, l_H);
			}

			fFixPosDim();
			nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);
		})();

		//===================================================== 正在加载

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_loading")) {
			(function () {

				// 调整按钮位置尺寸
				function fFixBtnPosDim() {
					var i_BtnStdDim = 44, i_BtnStdYscl = 640 / 945;
					var l_BtnDim = Math.round(i_BtnStdDim * s_FlashScl);
					var l_DomBtn = nWse.stDomUtil.cQryOne(".mi_btn");
					nWse.stCssUtil.cSetDim(l_DomBtn, l_BtnDim, l_BtnDim);

					var l_X, l_Y;
					l_X = Math.round(s_FlashX + (s_FlashWid - l_BtnDim) / 2);
					l_Y = Math.round(s_FlashY + s_FlashHgt * i_BtnStdYscl);
					nWse.stCssUtil.cSetPos(l_DomBtn, l_X, l_Y);
				}

				fFixBtnPosDim();
				nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixBtnPosDim, i_WndRszRspsSpd);

			})();
		}

		//===================================================== 户型

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_hu_xing")) {
			// 垂直居中（要求绝对定位）
			(function () {
				var l_Cols = nWse.stDomUtil.cQryAll(".mi_col");
				var l_DomBoa = l_Cols[0].parentNode;
				var l_DomPrn = l_DomBoa.parentNode;

				function fFixPosDim() {

					// 宽高比为1:1，两列等宽，故使用列1的offsetWidth
					// 注意不要使用offsetHeight，因为图像可能尚未下载完成！
					nWse.stCssUtil.cSetDimHgt(l_DomBoa, l_Cols[1].offsetWidth);
					var l_Y = Math.max(0, (l_DomPrn.offsetHeight - l_DomBoa.offsetHeight) / 2);
					nWse.stCssUtil.cSetPosTp(l_DomBoa, l_Y);
				}

				fFixPosDim();
				nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);

				//-------- 输入处理

				// 选项板
				(function () {
					var l_Boa = document.getElementById("k_OptnsBoa");
					nWse.stDomUtil.cAddEvtHdlr(l_Boa, "click",
						function (a_Evt) {
							a_Evt = a_Evt || window.event;
							var l_EvtTgt = a_Evt.target || a_Evt.srcElement;

							if (!nWse.stCssUtil.cHasCssc(l_EvtTgt, "mi_icon"))
							{ return; }

							// 计算索引
							var l_Icons = nWse.stDomUtil.cQryAll("#k_OptnsBoa .mi_icon");
							var l_Idx = nWse.stAryUtil.cFind(l_Icons,
								function (a_Ary, a_Idx, a_Icon) { return (a_Icon === l_EvtTgt); });

							if (l_Idx < 0)
							{ return; }

							fSlcHx(l_EvtTgt, l_Idx);
							return false;
						});

					function fSlcHx(a_Which, a_Idx) {

						// 文字作为图像名，加载
						var l_Text = nWse.stDomUtil.cGetTextCtnt(a_Which);
						var l_Path = "images/diagrams/hx_" + l_Text + ".png";
						var l_DomImg = document.getElementById("k_Diagram");
						if (l_DomImg) {
							l_DomImg.src = l_Path;
						}

						// 同时更新上面的类型及相关信息
						var l_Divs = nWse.stDomUtil.cQryAll(".mi_sumr_div");
						nWse.stAryUtil.cFor(l_Divs,
							function (a_Ary, a_DivIdx, a_Div) {
								if (a_DivIdx == a_Idx) {
									nWse.stCssUtil.cRmvCssc(a_Div, "mi_dspl_none");
								}
								else {
									nWse.stCssUtil.cAddCssc(a_Div, "mi_dspl_none");
								}
							});

						// CSS类
						var l_Old = nWse.stDomUtil.cQryOne(".mi_icon.mi_slcd", l_Boa);
						if (l_Old !== a_Which) {
							nWse.stCssUtil.cRplcCssc(l_Old, "mi_slcd", "mi_wait", true);
							nWse.stCssUtil.cRplcCssc(a_Which, "mi_wait", "mi_slcd", true);
						}
					}
				})();
			})();
		}

		//===================================================== 景观漫游

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_jing_guan_man_you")) {
			(function () {
				function fFixPosDim() {
					var l_BtnsBoa = document.getElementById("k_BtnsBoa");
					if (!l_BtnsBoa)
					{ return; }

					var l_DomBlbd = nWse.stDomUtil.cQryOne(".mi_tit_blbd");
					//	var l_X = (nWse.stDomUtil.cGetVwptWid() - l_BtnsBoa.offsetWidth) / 2;	// 注意在一瞬间可能会换行，所以采用全宽＋居中对齐方案，X总是0
					var l_Y = l_DomBlbd.offsetTop + l_DomBlbd.offsetHeight + 30;
					nWse.stCssUtil.cSetPos(l_BtnsBoa, 0, l_Y);
				}

				fFixPosDim();
				nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);
			})();
		}

		//===================================================== 介绍

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_jie_shao")) {
			(function () {
				var l_Pane = document.getElementById("k_Pane");
				var l_Arws = nWse.stDomUtil.cQryAll(".mi_nav_arw_div");

				function fFixPosDim() {
					nApp.fVticAln(l_Pane);
					nWse.stAryUtil.cFor(l_Arws,
						function (a_Ary, a_Idx, a_Arw) {
							nApp.fVticAln(a_Arw);
						});
				}

				fFixPosDim();
				nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);
			})();
		}

		//===================================================== 项目鸟瞰

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_xiang_mu_niao_kan")) {
			(function () {
				nWse.stDomUtil.cAddEvtHdlr(window, "mousemove",
					function (a_Evt) {
						//a_Evt = a_Evt || window.event;
						//if (a_Evt.preventDefault) {
						//	a_Evt.preventDefault();
						//}
						//return false;
					});
			})();
		}
	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////