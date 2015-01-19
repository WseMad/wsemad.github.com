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
		//【注意】IE8有个问题，当页面含flash时，文档就绪事件触发之际，底部菜单<div>竟然还没有加载！
		(function () {

			function fFixMenu(a_1st) {
				var l_MenuBm = nWse.stDomUtil.cQryOne(".mi_menu_bm");
				if (!l_MenuBm) //【IE8】这里会返回
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

			if (nWse.fMaybeNonHtml5Brsr()) //【IE8】window.onload时再次修正
			{
				nWse.stPageInit.cAddEvtHdlr_WndLoad(function () {
					fFixMenu(true);
				});
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

		// logo动画
		(function () {
			var l_Dom = nWse.stDomUtil.cQryOne(".mi_menu_bm .mi_boa.mi_nav .mi_list > li.mi_logo .mi_icon");
			if (!l_Dom)
			{ return; }

			function fRmvCssc() {
				nWse.stCssUtil.cRmvCssc(l_Dom, "mi_anmt");
			}
			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "webkitAnimationEnd", fRmvCssc);
			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "mozAnimationEnd", fRmvCssc);
			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "msAnimationEnd", fRmvCssc);
			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "oAnimationEnd", fRmvCssc);
			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "animationend", fRmvCssc);

			nWse.stDomUtil.cAddEvtHdlr(l_Dom, "mouseover",
				function () {
					nWse.stCssUtil.cAddCssc(l_Dom, "mi_anmt");
				});
		})();

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

		// 图像序列播放器
		(function () {
			nWse.fClass(nApp,
				function tImgSqncPlr() {
					this.e_ImgSqnc = null;
					this.e_SucsCnt = 0;
					this.e_FailCnt = 0;
					this.e_AccTchOfst = 0;
					this.e_SpinSpd = 8;
					this.e_PlayIdx = 0;
				},
				null,
				{
					/// a_Cfg：Object，
					/// {
					///	c_UrlDiry：String，如"http://wx.heivr.com/tpl/Home/huiyuan/huxing/zc/nk/"
					/// c_Bgn，c_Amt：Number，如0，26
					/// c_Extd：String，如".png"
					/// c_fOnFnshOne：void f(this, Image a_Img)，当完成一个时
					/// c_fOnFnshAll：void f(this, a_Errs)，当完成全部时
					/// c_ImgTgt：HTMLElement，<img>目标
					/// }
					cInit: function (a_Cfg) {
						var l_This = this;
						l_This.e_Cfg = a_Cfg;
						l_This.e_ImgTgt = a_Cfg.c_ImgTgt;
						l_This.eLoadImgSqnc((a_Cfg.c_UrlDiry || "./"), (a_Cfg.c_Bgn || 0), a_Cfg.c_Amt, (a_Cfg.c_Extd || ".png"));
						return this;
					}
					,
					cGetSucsCnt: function () {
						return this.e_SucsCnt;
					}
					,
					cGetFailCnt: function () {
						return this.e_FailCnt;
					}
					,
					cGetPgrsPct: function () {
						var l_This = this;
						if ((!l_This.e_ImgSqnc) || (0 == l_This.e_ImgSqnc.length))
						{ return 0; }

						return ((l_This.e_FailCnt + l_This.e_SucsCnt) / l_This.e_ImgSqnc.length) * 100;
					}
					,
					cIsLoadCplt: function () {
						var l_This;
						if ((!l_This.e_ImgSqnc) || (0 == l_This.e_ImgSqnc.length))
						{ return true; }

						return (l_This.e_FailCnt + l_This.e_SucsCnt) >= l_This.e_ImgSqnc.length;
					}
					,
					cHdlIpt: function (a_Ipt, a_DmntTch) {
						var l_This = this;
						var l_DmntTch = a_DmntTch;

						if ((nWse.tPntIptTrkr.tPntIpt.tKind.i_TchMove == l_DmntTch.c_Kind)) {
							l_This.e_AccTchOfst += Math.abs(l_DmntTch.c_OfstX);
							if (l_This.e_AccTchOfst > l_This.e_SpinSpd) {
								l_This.eRgltAccTchOfst();
								if (l_DmntTch.c_OfstX < 0) {
									l_This.cPlayNext();
								}
								else {
									l_This.cPlayPrev();
								}
							}
						}

						return this;
					}
					,
					eRgltAccTchOfst: function () {
						var l_This = this;
						l_This.e_AccTchOfst -= Math.floor(l_This.e_AccTchOfst / l_This.e_SpinSpd) * l_This.e_SpinSpd;
						return this;
					}
					,
					cPlayByIdx: function (a_Idx, a_NoWrap) {
						var l_This = this;
						if (0 == l_This.e_ImgSqnc.length)
						{ return this; }

						if (a_Idx < 0) {
							a_Idx = l_This.e_ImgSqnc.length - 1;
						}
						else
							if (a_Idx >= l_This.e_ImgSqnc.length) {
								a_Idx = 0;
							}

						l_This.ePutOneImgByIdx(a_Idx);
						l_This.e_PlayIdx = a_Idx;
						return this;
					}
					,
					cPlayPrev: function (a_NoWrap) {
						return this.cPlayByIdx(this.e_PlayIdx - 1, a_NoWrap);
					}
					,
					cPlayNext: function (a_NoWrap) {
						return this.cPlayByIdx(this.e_PlayIdx + 1, a_NoWrap);
					}
					,
					eOneFrm: function (a_FrmTime, a_FrmItvl, a_FrmNum) {
						var l_This = this;
						var l_Tpf = 1 / 30;
					}
					,
					ePutOneImgByIdx: function (a_Idx) {
						var l_This = this;
						//if (! l_This.e_ImgSqnc[a_Idx].complete)
						//{ return l_This; }

						l_This.e_ImgTgt.src = l_This.e_ImgSqnc[a_Idx].src;
						return l_This;
					}
					,
					eLoadImgSqnc: function (a_UrlDiry, a_Bgn, a_Amt, a_Extd) {
						if (a_Amt <= 0)
						{ return this; }

						var l_This = this;
						l_This.e_ImgSqnc = new Array(a_Amt);
						l_This.e_Errs = null;

						var l_Url, l_Img;
						var i;
						for (i = 0; i < a_Amt; ++i) {
							l_Url = a_UrlDiry + (a_Bgn + i).toString() + a_Extd;
							l_Img = new Image();
							l_Img.onerror = fOnErr;
							("onload" in l_Img) ? (l_Img.onload = fOnLoad) : (l_Img.onreadystatechange = fOnLoad);
							l_Img.src = l_Url;
							l_This.e_ImgSqnc[i] = l_Img;
						}

						function fOnErr() {
							if (!l_This.e_Errs)
							{ l_This.e_Errs = []; }

							l_This.e_Errs.push(this.src);

							// 处理……
							fFnshOne(false, this);
						}

						function fOnLoad() {
							// IE8
							if (nWse.fMaybeNonHtml5Brsr()) {
								// 继续等待
								//if (("loaded" != this.readyState) && ("complete" != this.readyState))
								//{ return; }

								console.log(this.readyState);
							}

							// 处理……
							fFnshOne(true, this);
						}

						function fFnshOne(a_Sucs, a_Img) {
							// 递增计数
							a_Sucs ? ++l_This.e_SucsCnt : ++l_This.e_FailCnt;

							// 回调
							if (l_This.e_Cfg.c_fOnFnshOne) {
								l_This.e_Cfg.c_fOnFnshOne(l_This, a_Img);
							}

							// 继续等待？
							if (l_This.e_FailCnt + l_This.e_SucsCnt < l_This.e_ImgSqnc.length)
							{ return; }

							// 已完成，回调
							if (l_This.e_Cfg.c_fOnFnshAll) {
								l_This.e_Cfg.c_fOnFnshAll(l_This, l_This.e_Errs);
							}
						}
					}
				});
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

				// 修正位置尺寸
				var l_Pnl = nWse.stDomUtil.cQryOne(".mi_pnl");
				var l_CtntDiv = nWse.stDomUtil.cQryOne(".mi_ctnt_div");

				function fFixPosDim() {

					// 不能这么算，因为受图像影响，但图像可能尚未载入！
					// 固定宽高比为2:1
					var i_ImgAr = 2 / 1;
					var l_H, l_Y;

					l_H = Math.round(nWse.stDomUtil.cGetVwptWid() / i_ImgAr);
					nWse.stCssUtil.cSetDimHgt(l_CtntDiv, l_H);

					l_H = Math.max(100, nWse.stDomUtil.cGetVwptHgt() - l_CtntDiv.offsetHeight);
					nWse.stCssUtil.cSetDimHgt(l_Pnl, l_H);
					l_H = l_Pnl.offsetHeight; // 可能会受最小高度的影响！

					l_Y = nWse.stDomUtil.cGetVwptHgt() - l_H;
					nWse.stCssUtil.cSetPosTp(l_Pnl, l_Y);
				}

				fFixPosDim();
				nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);


				// 输入处理
				function fHdlIpt(a_Ipt) {
					var l_DmntTch = a_Ipt.c_Tchs[0];
					l_DmntTch.c_Hdld = true;

					// 点中图像时才处理？算了，总是处理！
					var l_EvtTgt = l_DmntTch.cAcsEvtTgt();
					//	if (l_EvtTgt && ("IMG" == l_EvtTgt.tagName))
					{
						nApp.g_ISP.cHdlIpt(a_Ipt, l_DmntTch);
					}
					return false;
				}

				// 图像序列播放器
				var l_DomLoadPgrs = document.getElementById("k_LoadPgrs");
				//	nWse.stDomUtil.cSetTextCtnt(l_DomLoadPgrs, "0％"); // html里

				var i_ImgTot = 26;
				nApp.g_ISP = new nApp.tImgSqncPlr();
				nApp.g_ISP.cInit({
					c_UrlDiry: "http://wx.heivr.com/tpl/Home/huiyuan/huxing/zc/nk/",
					c_Bgn: 0,
					c_Amt: i_ImgTot,
					c_Extd: ".png",
					c_ImgTgt: document.getElementById("k_ImgTgt"),
					c_fOnFnshOne: function (a_This, a_Img) {
						//	console.log("finish: " + a_Img.src);

						var l_Pct = Math.round(a_This.cGetPgrsPct());
						nWse.stDomUtil.cSetTextCtnt(l_DomLoadPgrs, l_Pct + "％");
					},
					c_fOnFnshAll: function (a_This, a_Errs) {

						// 隐藏这些提示
						var l_Hints = nWse.stDomUtil.cQryAll(".mi_load_pgrs_hint");
						nWse.stAryUtil.cFor(l_Hints,
							function (a_Ary, a_Idx, a_Hint) {
								a_Hint.style.display = "none";
							});

						// 显示提示图像
						var l_HintImg = document.getElementById("k_Zcss");
						if (l_HintImg) {
							l_HintImg.style.display = "inline";
						}

						console.log("开始播放");
						nApp.g_PIT = new nWse.tPntIptTrkr();
						nApp.g_PIT.cInit({
							c_HdlMode: 1,
							c_HdlMosMove: true
						});
						nApp.g_PIT.cSetImdtHdlr(fHdlIpt);
					}
				});
			})();
		}
	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////