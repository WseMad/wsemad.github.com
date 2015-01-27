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

	// 非H5浏览器？
	var i_NohH5Brsr = (!document.getElementsByClassName);

	//-------- 文档就绪

	var $ = window.jQuery;
	$(document).ready(function () {

		//--------------------- 如果像素率不是1，对布局环境应用全局缩放！（此时浏览器一定支持2D变换）

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

		//--------------------- 禁用浏览器拖选文字？

		//	$(document).bind("selectstart", function () { return false; });

		//--------------------- 按钮（3D）

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

		//--------------------- 实用函数

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


				//-------- 产品体系节

				// 文字旋转
				(function () {
					// 非H5浏览器不作处理
					if (i_NohH5Brsr)
					{ return; }

					// 计算mi_text_div的内容高度
					var l_TextDiv = $(".mi_product_hierarchy .mi_col .mi_cell .mi_text_div").get(0);
					var l_$TextDiv = $(l_TextDiv);
					var l_PadTp = parseFloat(l_$TextDiv.css("paddingTop"));
					var l_PadBm = parseFloat(l_$TextDiv.css("paddingBottom"));
					var l_TextDivCtntHgt = l_TextDiv.clientHeight - l_PadTp - l_PadBm;

					var l_$RotTextDivs = $(".mi_rot_text_div");
					l_$RotTextDivs.each(function (a_Idx, a_Dom) {
						var l_This = a_Dom;
						var l_$This = $(l_This);
						var l_$Nh5Plchd = l_$This.prev(".mi_nh5_plchd");
						var l_Nh5Plchd = l_$Nh5Plchd.get(0);

						// 交换宽高
						//	l_This.style.width = l_Nh5Plchd.offsetHeight + "px";
						l_This.style.width = l_TextDivCtntHgt + "px";		// 用这个
						l_This.style.height = l_Nh5Plchd.offsetWidth + "px";

						// 交换显示
						l_Nh5Plchd.style.visibility = "hidden";	// 用这个，为了保持原位
						l_This.style.display = "block";
					});
				})();

				// 左右箭头
				(function () {
					var l_$LtArw = $(".mi_solution .mi_btn.mi_arw.mi_lt");
					var l_$RtArw = $(".mi_solution .mi_btn.mi_arw.mi_rt");

					l_$LtArw.bind("click",
						function (a_Evt) {
							var l_EvtTgt = a_Evt.target;
							nApp.fShowSltnCell(nApp.g_SltnCellOfstIdx - 1);
						});

					l_$RtArw.bind("click",
						function (a_Evt) {
							var l_EvtTgt = a_Evt.target;
							nApp.fShowSltnCell(nApp.g_SltnCellOfstIdx + 1);
						});

					// 暴露API
					nApp.g_SltnCellOfstIdx = 0;	// 初始为0
					nApp.fShowSltnCell = function (a_CellIdx) {
						var l_$SldSlot = $(".mi_solution .mi_sld_slot");
						var l_$Cells = l_$SldSlot.children(".mi_cell");
						if (0 == l_$Cells.length)
						{ return; }

						var i_ShowCpct = 4;
						var l_SldSlot = l_$SldSlot.get(0);
						var l_Cells = l_$Cells.get();
						var l_MgnLt = parseFloat(l_$Cells.css("marginLeft"));
						var l_MgnRt = parseFloat(l_$Cells.css("marginRight"));
						var l_CellTotWid = l_Cells[0].offsetWidth + l_MgnLt + l_MgnRt;

						if (a_CellIdx < 0)
						{ a_CellIdx = 0; }
						else
							if (a_CellIdx > l_Cells.length - i_ShowCpct)
							{ a_CellIdx = l_Cells.length - i_ShowCpct; }

						var l_OldX = l_SldSlot.offsetLeft;
						var l_NewX = -(a_CellIdx * l_CellTotWid);	// 注意负号
						l_SldSlot.style.left = (l_NewX).toString() + "px";
						nApp.g_SltnCellOfstIdx = a_CellIdx;

						// 隐藏箭头按钮
						if (0 == a_CellIdx) {
							l_$LtArw.hide();
							l_$RtArw.show();
						}
						else
							if (a_CellIdx == l_Cells.length - i_ShowCpct) {
								l_$LtArw.show();
								l_$RtArw.hide();
							}
							else {
								l_$LtArw.show();
								l_$RtArw.show();
							}

						//【注意】下面这部分是可选的，作个动画
						nWse.stCssUtil.cSetPosLt(l_SldSlot, l_OldX);	// 先回到刚才的位置
						nWse.stCssUtil.cAnmt(l_SldSlot,
							{
								"left": l_NewX + "px"
							},
							{
								c_Dur: 0.4
								, c_fEsn: fEsn_PrbItp
							});
					};

					nApp.fShowSltnCell(0);	// 一上来显示[0]
				})();

				// 圆点
				(function () {
					var l_$DotBtns = $(".mi_dot_div.mi_btn");
					l_$DotBtns.click(function (a_Evt) {
						var l_$This = $(this);
						$(".mi_dots_boa .mi_dot").removeClass("mi_slcd");
						l_$This.find(".mi_dot").addClass("mi_slcd");
					});
				})();

				//-------- 硬件展示节

				(function () {
					/*
					// 旗帜3D变换动画
					var l_Flags = nWse.stDomUtil.cQryAll(".mi_flag");
					nWse.stAryUtil.cFor(l_Flags,
						function (a_Flags, a_Idx, a_Flag) {
							// 绕X轴从90°到0°旋转，不用取到90，取一个接近的数就好，数值稳定
							nWse.stNumUtil.cInitQtn$AaRad(nWse.stCssUtil.cAcsExtdAnmt_3dTsfm(a_Flag).c_Rot, 1, 0, 0, nWse.stNumUtil.cRadFromDeg(89.5));
							nWse.stCssUtil.cUpdExtdAnmt_3dTsfm(a_Flag);

							var l_EndQtn = {};
							nWse.stNumUtil.cInitQtn$AaRad(l_EndQtn, 1, 0, 0, 0);

							nWse.stCssUtil.cAnmt(a_Flag,
								{
									"Wse_3dTsfm": [
										{
											c_Name: "rotate3d",
											c_End: l_EndQtn
										}
									]
								},
								{
									c_Dur: 2
									,c_Tot: -1
									,c_EvenCntRvs: true
									,c_fEsn: fEsn_PrbItp
								});
						});
					//*/

				})();

			})(); // if { ... }
		} // if 首页
	}); // doc rdy
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////