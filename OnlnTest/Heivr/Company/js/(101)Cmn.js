/*
* 注意：搜索【TODO】填写未完成的部分！
*/

(function () {

	//-------- 一些常量：

	// 触摸事件名
	var i_EvtName_TchBgn = "mousedown touchstart";
	var i_EvtName_TchMove = "mousemove touchmove";
	var i_EvtName_TchEnd = "mouseup touchend";

	// 设备像素率，默认1
	var i_DvcPxlRat = window.devicePixelRatio || 1;
	console.log("i_DvcPxlRat = " + i_DvcPxlRat);

	//-------- 文档就绪

	var $ = window.jQuery;
	$(document).ready(function () {

		// 如果像素率不是1，对布局环境应用全局缩放！（此时浏览器一定支持2D变换）
		var s_LotEnv = document.getElementById("k_LotEnv");
		var s_LotEnvMinWid = parseFloat($(s_LotEnv).css("minWidth")); // 取得最小宽度
		console.log("s_LotEnvMinWid = " + s_LotEnvMinWid);
		(function () {
			var s_TsfmStr = null;
			var l_Stl = s_LotEnv.style;
			if ("transform" in l_Stl)
			{ s_TsfmStr = "transform"; }
			else
				if ("webkitTransform" in l_Stl)
				{ s_TsfmStr = "webkitTransform"; }
				else
					if ("mozTransform" in l_Stl)
					{ s_TsfmStr = "mozTransform"; }
					else
						if ("OTransform" in l_Stl)
						{ s_TsfmStr = "OTransform"; }
						else
							if ("msTransform" in l_Stl)
							{ s_TsfmStr = "msTransform"; }
							else
							{ s_TsfmStr = ""; } // 空串表示不支持

			function fGlbScl() {
				var l_VW = $(window).innerWidth();

				var l_Scl = l_VW / (s_LotEnvMinWid);
				s_LotEnv.style[s_TsfmStr] = "scale(" + (l_Scl).toString() + ")";
			}

			if (1 != i_DvcPxlRat) {
				fGlbScl();
				$(window).bind("resize", function () { fGlbScl(); });
			}
		})();

		// 按钮（3D）
		(function () {
			var l_$Btns = $(".mi_btn");
			var l_$3dBtns = $(".mi_btn.mi_3d");

			// 禁止拖选
			l_$Btns.bind("selectstart", function (a_Evt) { return false; });

			// 3D按下、弹起
			// 注意i_TchEnd必须在document上也进行处理
			l_$3dBtns.bind(i_EvtName_TchBgn, function (a_Evt) { $(a_Evt.target).addClass("mi_prsd"); return false; });
			l_$3dBtns.bind(i_EvtName_TchEnd,
				function (a_Evt) {
					$(a_Evt.target).removeClass("mi_prsd");

					//【TODO】在这里处理页面跳转
					switch (a_Evt.target.id) {
						case "k_MoreStuff": { window.location; } break;
					}

					return false;
				});
			$(document).bind(i_EvtName_TchEnd, function (a_Evt) { l_$3dBtns.removeClass("mi_prsd"); return false; })
		})();

		// 松弛函数
		function fEsn_PrbItp(a_Scl) {
			return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
		}

		//===================================================== 首页

		if ($("body").hasClass("mi_page_home")) {
			(function () {

				//-------- 案例展示里的标签页

				nApp.fShowTabPage_CaseShow = function (a_Idx) {
					var l_QryStr = ".mi_case_show .mi_tab_page";
					var l_$TabPages = $(l_QryStr);
					var l_TabPages = l_$TabPages.get();
					if ((a_Idx < 0) || (l_TabPages.length <= a_Idx))
					{ return false; }

					// 首次运行，设置z-index
					if (!l_TabPages[0].style.zIndex) {
						nWse.stAryUtil.cFor(l_TabPages,
						function (a_Ary, a_PageIdx, a_Page) {
							a_Page.style.zIndex = (l_TabPages.length - 1 - a_PageIdx).toString();
						});
					}

					// 更新z-index
					var l_NewTab = l_TabPages[a_Idx];
					var l_NewTabZidx = parseInt(l_NewTab.style.zIndex);
					var l_Zidx;
					nWse.stAryUtil.cFor(l_TabPages,
						function (a_Ary, a_PageIdx, a_Page) {
							if (a_PageIdx == a_Idx) {
								a_Page.style.zIndex = (l_TabPages.length - 1).toString();
							}
							else {
								l_Zidx = parseInt(a_Page.style.zIndex);
								if (l_Zidx > l_NewTabZidx) {
									a_Page.style.zIndex = (l_Zidx - 1).toString();
								}
							}
						});

					//【注意】下面这部分是可选的，作个动画
					l_NewTab.style.opacity = "0";
					nWse.stCssUtil.cAnmt(l_NewTab,
						{
							"opacity": 1
						},
						{
							c_Dur: 0.4
							, c_fEsn: fEsn_PrbItp
						});

					return true;
				};

				(function () {
					var l_TagPageAmt = $(".mi_case_show .mi_tab_page").length;
					var l_QryStr = ".mi_case_show .mi_tab_page .mi_cir.mi_btn";
					var l_$CirBtns = $(l_QryStr);
					var l_CirBtns = l_$CirBtns.get();

					nApp.fShowTabPage_CaseShow(0); // 一开始显示0页

					l_$CirBtns.click(function (a_Evt) {
						// 找到索引，显示
						var l_EvtTgt = a_Evt.target;
						var l_Idx = l_CirBtns.indexOf(l_EvtTgt) % l_TagPageAmt; // 对数量求余
						nApp.fShowTabPage_CaseShow(l_Idx);
						//	console.log(l_Idx);	// 218, 164
					});
				})();

				//-------- 案例展示里的图像标题

				(function () {
					var l_$Cells = $(".mi_case_show .mi_cell");
					l_$Cells.mouseenter(function (a_Evt) {
						var l_EvtTgt = a_Evt.currentTarget;
						if (this !== l_EvtTgt)
						{ return; }

						var l_This = this;
						var l_$FigCptn = $(l_This).children(".mi_fig_cptn");
						l_$FigCptn.show();

						//【注意】下面这部分是可选的，作个动画
						var l_FigCptn = l_$FigCptn.get(0);
						if (!l_FigCptn)
						{ return; }

					//	var l_Dir = nWse.stNumUtil.cRandInt(0, 3); // 上右下左
						var l_Dir = 2;
						var l_BgnX = 0, l_BgnY = 0, l_EndX = 0, l_EndY = 0;
						if (0 == l_Dir) {
							l_BgnY = -l_FigCptn.offsetHeight;
						}
						else
							if (1 == l_Dir) {
								l_BgnX = l_FigCptn.offsetWidth;
							}
							else
								if (2 == l_Dir) {
									l_BgnY = l_FigCptn.offsetHeight;
								}
								else {
									l_BgnX = -l_FigCptn.offsetWidth;
								}

						nWse.stCssUtil.cSetPos(l_FigCptn, l_BgnX, l_BgnY);
						nWse.stCssUtil.cAnmt(l_FigCptn,
							{
								"left": l_EndX + "px",
								"top": l_EndY + "px"
							},
							{
								c_Dur: 0.3
								, c_fEsn: fEsn_PrbItp
							});
					});
					l_$Cells.mouseleave(function (a_Evt) {
						var l_EvtTgt = a_Evt.currentTarget;
						if (this !== l_EvtTgt)
						{ return; }

						var l_This = this;
						var l_$FigCptn = $(l_This).children(".mi_fig_cptn");
						l_$FigCptn.hide();

						//【注意】下面这部分是可选的，作个动画
						var l_FigCptn = l_$FigCptn.get(0);
						if (!l_FigCptn)
						{ return; }

						l_$FigCptn.show(); // 先显示
						nWse.stCssUtil.cAnmt(l_FigCptn,
							{
								"top": l_FigCptn.offsetHeight + "px"
							},
							{
								c_Dur: 0.3
								, c_fEsn: fEsn_PrbItp
								, c_fOnEnd: function () {
									l_$FigCptn.hide(); // 动画完了隐藏
								}
							});
					});
				})();

			})();
		}

	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////