/*
* 注意：搜索【TODO】填写未完成的部分！
*/

(function () {

	//-------- 文档就绪

	var $ = window.jQuery;
	$(document).ready(function () {

		//-------- 导航链接

		(function () {

			// 如果手机版
			if (nApp.i_IsPhoneVer) {
				(function () {

					// 修正列表宽度
					//【注意】一开始不要用display:none，那会使宽度的计算不正确！
					var s_$ListDiv = $(".mi_sect.mi_logo .mi_list_div");
					var s_ListDiv = s_$ListDiv.get(0);
					var s_List = $(".mi_sect.mi_logo .mi_list_div .mi_list").get(0);

					// 导航按钮交互
					nApp.stNavBtn = {
						c_Dom_Btn: document.getElementById("k_NavBtn")
						,
						cIsCls: function () {
							return $(this.c_Dom_Btn).hasClass("mi_icon_nav_expd");
						}
						,
						cExpd: function () {
							if (!this.cIsCls())
							{ return this; }

							$(this.c_Dom_Btn).removeClass("mi_icon_nav_expd").addClass("mi_icon_nav_cls");

							// 第一次运行（宽度尚未写入）？修正宽度，其中最小值是开发时测得的
							if (!s_List.style.width) {
								nApp.fFixSldWid(s_List, ".mi_sect.mi_logo .mi_list_div .mi_list > li", false, 1350, s_ListDiv);
							}

							s_$ListDiv.show(400);
							return this;
						}
						,
						cCls: function () {
							if (this.cIsCls())
							{ return this; }

							$(this.c_Dom_Btn).removeClass("mi_icon_nav_cls").addClass("mi_icon_nav_expd");
							s_$ListDiv.hide(400);
							return this;
						}
						,
						cTgl: function () {
							this.cIsCls() ? this.cExpd() : this.cCls();
							return this;
						}
					};

					var l_$NavBtn = $(nApp.stNavBtn.c_Dom_Btn);
					l_$NavBtn.bind(nApp.i_EvtName_TchBgn, function () { nApp.stNavBtn.cTgl(); });
				})();
			}

			$(".mi_nav a").bind(nApp.i_EvtName_TchEnd, function (a_Evt) {
				// 提取元素ID
				var l_EvtTgt = a_Evt.target;
				var l_Href = l_EvtTgt.href;
				var i_Rgx = /#.+$/;
				var l_Mch = l_Href.match(i_Rgx);
				if (!l_Mch)
				{ return; }

				var l_ElmtId = l_Mch[0].slice(1, l_Mch[0].length);
				//	console.log(l_ElmtId);
				var l_DomElmt = document.getElementById(l_ElmtId);
				if (!l_DomElmt)
				{ return; }

				// 计算页面区域，滚动到那里
				var l_PageSara = nApp.fCalcPageSara(l_DomElmt);
				nWse.stDomUtil.cAnmtPpty(window,
					{
						"scrollY": l_PageSara.c_Y
					},
					{
						c_Dur: 0.6
						, c_fEsn: nWse.stNumUtil.cEsn_SlowToFastToSlow
					});

				// 取消默认动作
				return false;
			});
		})();


		//-------- 案例展示里的标签页

		nApp.g_ShowTabPageIdx_CaseShow = -1; // 当前索引，初始-1

		nApp.fShowTabPage_CaseShow = function (a_Idx) {
			if (nApp.g_ShowTabPageIdx_CaseShow == a_Idx) // 防止重复点击
			{ return; }

			var l_QryStr = ".mi_case_show .mi_tab_page";
			var l_$TabPages = $(l_QryStr);
			var l_TabPages = l_$TabPages.get();
			if (0 == l_TabPages.length)
			{ return; }

			// 环绕索引
			while (a_Idx < 0)
			{ a_Idx += l_TabPages.length; }
			a_Idx = a_Idx % l_TabPages.length;

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

			// 记录当前索引
			nApp.g_ShowTabPageIdx_CaseShow = a_Idx;

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

			var l_SwchFrqc = 2; // 每过一段时间自动换页
			var l_TmrId = null;
			function fSttTmr(a_Frqc) {
				l_SwchFrqc = a_Frqc || 2; // 默认2秒
				l_TmrId = window.setTimeout(function () {
					nApp.fShowTabPage_CaseShow(nApp.g_ShowTabPageIdx_CaseShow + 1);
					fSttTmr();	// 继续
				}, l_SwchFrqc * 1000);
			}
			function fClrTmr() {
				if (l_TmrId) {
					window.clearTimeout(l_TmrId);
					l_TmrId = null;
				}
			}
			fSttTmr();

			l_$CirBtns.bind(nApp.i_EvtName_TchEnd, function (a_Evt) {
				// 找到索引，显示
				var l_EvtTgt = a_Evt.target;
				var l_Idx = l_CirBtns.indexOf(l_EvtTgt) % l_TagPageAmt; // 对数量求余
				nApp.fShowTabPage_CaseShow(l_Idx);

				// 重新开始计时
				fClrTmr();
				fSttTmr(10);	// 单击后等10秒
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
			if (nApp.i_NonH5Brsr)
			{ return; }

			// 计算mi_text_div的内容高度
			var l_TextDiv = $(".mi_product_hierarchy .mi_col .mi_cell .mi_text_div").get(0);
			if (!l_TextDiv)
			{ return; }

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

		//-------- 解决方案节

		// 左右箭头
		(function () {

			// 激活滑动面板
			nApp.fActSldBoas();

			// 图标的基底和形状动画
			(function () {
				var l_All = nWse.stDomUtil.cQryAll(".mi_base, .mi_shp");

				function fRstAnmtData() {
					nWse.stAryUtil.cFor(l_All,
						function (a_All, a_Idx, a_One) {
							nWse.stCssUtil.cFnshAnmt(a_One, false, false);
							nWse.stCssUtil.cSetPos(a_One, 0, 0);
						});
				}

				function fIsuAnmt() {
					if (0 != nApp.g_EntAnmtSta_Solution) // 检查状态机
					{ return; }

					fRstAnmtData(); // 复位动画数据，然后动画
					var i_Dur = 1;
					nWse.stAryUtil.cFor(l_All,
						function (a_All, a_Idx, a_One) {
							var l_IsBase = nWse.stCssUtil.cHasCssc(a_One, "mi_base");
							var l_X = l_IsBase ? (-a_One.offsetWidth) : a_One.offsetWidth;
							var l_Y = l_IsBase ? (-a_One.offsetHeight) : a_One.offsetHeight;
							nWse.stCssUtil.cSetPos(a_One, l_X, l_Y);
							nWse.stCssUtil.cAnmt(a_One,
								{
									"left": "0px",
									"top": "0px"
								},
								{
									c_Dur: i_Dur
									//	,c_Tot: -1
									//	,c_EvenCntRvs: true
									, c_fEsn: fEsn_PrbItp
									, c_fOnEnd: (a_Idx == l_All.length - 1) ? function () { nApp.g_EntAnmtSta_Solution = 2; } : null // 最后一个负责更新状态机
								});
						});

					nApp.g_EntAnmtSta_Solution = 1; // 更新状态机
				}

				function fTryIsu() {
					var l_DomElmt = document.getElementById("k_Solution");
					var l_AnmtIsud = (0 != nApp.g_EntAnmtSta_Solution); // 动画已发出？发出后降低评估要求，未发出则增加
					if (nApp.fIsuEntAnmt(l_DomElmt, (l_AnmtIsud ? 0.3 : 0.7))) {
						fIsuAnmt();
					}
					else
						if (l_AnmtIsud) {
							nApp.g_EntAnmtSta_Solution = 0;	// 复位状态机
							fRstAnmtData();	// 复位动画数据
						}
				}

				nApp.g_EntAnmtSta_Solution = 0; // 使用简单状态机跟踪动画状态
				//fTryIsu(); //【一开始不用，因为这里是文档就绪，样式表可能还未就位，所以位置计算可能不正确！】
				nWse.stDomUtil.cAddEvtHdlr_WndScrl(fTryIsu, nApp.i_SrsEvtHdlFrqc);
			})();
		})();

		// 圆点
		(function () {
			var l_$DotBtns = $(".mi_dot_div.mi_btn");
			l_$DotBtns.bind(nApp.i_EvtName_TchEnd, function (a_Evt) {
				var l_$This = $(this);
				$(".mi_dots_boa .mi_dot").removeClass("mi_slcd");
				l_$This.find(".mi_dot").addClass("mi_slcd");
			});
		})();

		//-------- 硬件展示节

		(function () {
			if (nApp.i_IsPhoneVer)
			{ return; }

			// 旗帜3D变换动画
			var l_Flags = nWse.stDomUtil.cQryAll(".mi_flag");

			function fRstAnmtData() {
				nWse.stAryUtil.cFor(l_Flags,
					function (a_Flags, a_Idx, a_Flag) {
						// 绕X轴从90°到0°旋转，不用取到90，取一个接近的数就好，数值稳定
						nWse.stCssUtil.cFnshAnmt(a_Flag, false, false);
						nWse.stNumUtil.cInitQtn$AaRad(nWse.stCssUtil.cAcsExtdAnmt_3dTsfm(a_Flag).c_Rot, 1, 0, 0, nWse.stNumUtil.cRadFromDeg(89.5));
						nWse.stCssUtil.cUpdExtdAnmt_3dTsfm(a_Flag);
					});
			}

			function fIsuAnmt() {
				if (0 != nApp.g_EntAnmtSta_Hardware) // 检查状态机
				{ return; }

				fRstAnmtData(); // 复位动画数据，然后动画
				var i_Dur = 0.5;
				nWse.stAryUtil.cFor(l_Flags,
					function (a_Flags, a_Idx, a_Flag) {
						nWse.stCssUtil.cAnmt(a_Flag,
							{
								"Wse_3dTsfm": [
									{
										c_Name: "rotate3d",
										c_End: nWse.stNumUtil.cInitQtn$AaRad({}, 1, 0, 0, 0)
									}
								]
							},
							{
								c_Dly: a_Idx * i_Dur
								, c_Dur: i_Dur
								//	,c_Tot: -1
								//	,c_EvenCntRvs: true
								//	, c_fEsn: fEsn_PrbItp
								, c_fEsn: function (a_Scl) { return nWse.stNumUtil.cPrbItp$Ovfl(0, 1, 1.2, a_Scl, false); }
								, c_fOnEnd: (a_Idx == l_Flags.length - 1) ? function () { nApp.g_EntAnmtSta_Hardware = 2; } : null // 最后一个负责更新状态机
							});
					});

				nApp.g_EntAnmtSta_Hardware = 1; // 更新状态机
			}

			function fTryIsu() {
				var l_DomElmt = document.getElementById("k_Hardware");
				var l_AnmtIsud = (0 != nApp.g_EntAnmtSta_Hardware); // 动画已发出？发出后降低评估要求，未发出则增加
				if (nApp.fIsuEntAnmt(l_DomElmt, (l_AnmtIsud ? 0.3 : 0.7))) {
					fIsuAnmt();
				}
				else
					if (l_AnmtIsud) {
						nApp.g_EntAnmtSta_Hardware = 0;	// 复位状态机
						fRstAnmtData();	// 复位动画数据
					}
			}

			nApp.g_EntAnmtSta_Hardware = 0; // 使用简单状态机跟踪动画状态
			//fTryIsu(); //【一开始不用，因为这里是文档就绪，样式表可能还未就位，所以位置计算可能不正确！】
			nWse.stDomUtil.cAddEvtHdlr_WndScrl(fTryIsu, nApp.i_SrsEvtHdlFrqc);
		})();

		//-------- 公司分布节

		(function () {
			if (nApp.i_IsPhoneVer)
			{ return; }

			// 标签3D变换动画
			var l_Labs = nWse.stDomUtil.cQryAll(".mi_lab_tp, .mi_lab_bm");

			function fRstAnmtData() {
				nWse.stAryUtil.cFor(l_Labs,
					function (a_Labs, a_Idx, a_Lab) {
						// 绕X轴从90°到0°旋转，不用取到90，取一个接近的数就好，数值稳定
						nWse.stCssUtil.cFnshAnmt(a_Lab, false, false);
						var l_Tp = nWse.stCssUtil.cHasCssc(a_Lab, "mi_lab_tp");
						nWse.stNumUtil.cInitQtn$AaRad(nWse.stCssUtil.cAcsExtdAnmt_3dTsfm(a_Lab).c_Rot, 1, 0, 0, nWse.stNumUtil.cRadFromDeg((l_Tp ? 1 : -1) * 89.5));
						nWse.stCssUtil.cUpdExtdAnmt_3dTsfm(a_Lab);
					});
			}

			function fIsuAnmt() {
				if (0 != nApp.g_EntAnmtSta_Distribution) // 检查状态机
				{ return; }

				fRstAnmtData(); // 复位动画数据，然后动画
				var i_Dur = 1;
				nWse.stAryUtil.cFor(l_Labs,
					function (a_Labs, a_Idx, a_Lab) {
						nWse.stCssUtil.cAnmt(a_Lab,
							{
								"Wse_3dTsfm": [
									{
										c_Name: "rotate3d",
										c_End: nWse.stNumUtil.cInitQtn$AaRad({}, 1, 0, 0, 0)
									}
								]
							},
							{
								c_Dly: (a_Idx < (l_Labs.length / 2)) ? (a_Idx * i_Dur) : ((a_Idx - l_Labs.length / 2) * i_Dur)
								, c_Dur: i_Dur
								//	,c_Tot: -1
								//	,c_EvenCntRvs: true
								, c_fEsn: fEsn_PrbItp
								//	, c_fEsn: function (a_Scl) { return nWse.stNumUtil.cPrbItp$Ovfl(0, 1, 1.2, a_Scl, false); }
								, c_fOnEnd: (a_Idx == l_Labs.length - 1) ? function () { nApp.g_EntAnmtSta_Distribution = 2; } : null // 最后一个负责更新状态机
							});
					});

				nApp.g_EntAnmtSta_Distribution = 1; // 更新状态机
			}

			function fTryIsu() {
				var l_DomElmt = document.getElementById("k_Distribution");
				var l_AnmtIsud = (0 != nApp.g_EntAnmtSta_Distribution); // 动画已发出？发出后降低评估要求，未发出则增加
				if (nApp.fIsuEntAnmt(l_DomElmt, (l_AnmtIsud ? 0.3 : 0.7))) {
					fIsuAnmt();
				}
				else
					if (l_AnmtIsud) {
						nApp.g_EntAnmtSta_Distribution = 0;	// 复位状态机
						fRstAnmtData();	// 复位动画数据
					}
			}

			nApp.g_EntAnmtSta_Distribution = 0; // 使用简单状态机跟踪动画状态
			//fTryIsu(); //【一开始不用，因为这里是文档就绪，样式表可能还未就位，所以位置计算可能不正确！】
			nWse.stDomUtil.cAddEvtHdlr_WndScrl(fTryIsu, nApp.i_SrsEvtHdlFrqc);
		})();
	});	// doc rdy
})();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////