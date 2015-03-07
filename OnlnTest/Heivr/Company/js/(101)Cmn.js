/*
* 注意：搜索【TODO】填写未完成的部分！
*/

(function () {

	//-------- 一些常量：

	// 触摸事件名
	nApp.i_EvtName_TchBgn = "mousedown touchstart";
	nApp.i_EvtName_TchMove = "mousemove touchmove";
	nApp.i_EvtName_TchEnd = "mouseup touchend";

	// 设备像素率，默认1
	var i_DvcPxlRat = window.devicePixelRatio || 1;
	console.log("i_DvcPxlRat = " + i_DvcPxlRat);

	// 非H5浏览器？
	nApp.i_NonH5Brsr = (!document.getElementsByClassName);

	// 连续事件处理频率
	nApp.i_SrsEvtHdlFrqc = 1 / 75;

	//-------- 文档就绪

	var $ = window.jQuery;
	$(document).ready(function () {

		//--------------------- 如果像素率不是1，对布局环境应用全局缩放！（此时浏览器一定支持2D变换）

		/// 手机版本？
		nApp.i_IsPhoneVer = $("body").hasClass("mi_phone");

		/// 电脑版本？
		nApp.i_IsComVer = !nApp.i_IsPhoneVer;

		(function () {
			var s_GlbSclBnd = document.getElementById("k_GlbSclBnd");
			var s_LotEnv = document.getElementById("k_LotEnv");
			var s_LotEnvMinWid = parseFloat($(s_LotEnv).css("minWidth")); // 取得最小宽度
			console.log("s_LotEnvMinWid = " + s_LotEnvMinWid);

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
				var l_Scl = l_VW / (s_LotEnvMinWid) - 0.00001;	// 稍微缩小一点
				s_LotEnv.style[s_TsfmStr] = "scale(" + (l_Scl).toString() + ")";

				// 范围的高度与缩放后的布局环境一致！
				var l_LotEnvHgtAftScl = s_LotEnv.offsetHeight * l_Scl;
				s_GlbSclBnd.style.height = Math.round(l_LotEnvHgtAftScl).toString() + "px";
			}

			if (1 != i_DvcPxlRat) {
				fGlbScl();
				$(window).bind("resize", function () { fGlbScl(); });
			}

			// 禁用浏览器拖选文字？
			if (nApp.i_IsComVer)
			{ $(document).bind("selectstart", function () { return false; }); }
		})();

		//--------------------- 按钮（3D）

		(function () {
			var l_$Btns = $(".mi_btn");
			var l_$3dBtns = $(".mi_btn.mi_3d");

			// 禁止拖选
			l_$Btns.bind("selectstart", function (a_Evt) { return false; });

			// 3D按下、弹起
			// 注意i_TchEnd必须在document上也进行处理
			l_$3dBtns.bind(nApp.i_EvtName_TchBgn, function (a_Evt) { $(a_Evt.target).addClass("mi_prsd"); return false; });
			l_$3dBtns.bind(nApp.i_EvtName_TchEnd,
				function (a_Evt) {
					$(a_Evt.target).removeClass("mi_prsd");

					//【TODO】在这里处理页面跳转
					switch (a_Evt.target.id) {
						case "k_MoreStuff": { window.location; } break;
					}

					return false;
				});
			$(document).bind(nApp.i_EvtName_TchEnd, function (a_Evt) { l_$3dBtns.removeClass("mi_prsd"); return false; })
		})();

		//--------------------- 实用函数

		// 松弛函数
		fEsn_PrbItp = nWse.stNumUtil.cEsn_FastToSlow;
		nApp.fEsn_PrbItp = fEsn_PrbItp;

		// 计算页面区域
		nApp.fCalcPageSara = function (a_DomElmt) {
			var l_Rst = new nWse.tSara();
			nWse.tSara.scInit$DomBcr(l_Rst, a_DomElmt);
			l_Rst.c_X += nWse.stDomUtil.cGetScrlX();
			l_Rst.c_Y += nWse.stDomUtil.cGetScrlY();
			return l_Rst;
		};

		// 评估显示比例（仅垂直方向）
		nApp.fEstmShowPptn_VticOnly = function (a_PageSara) {
			var l_ScrlY = nWse.stDomUtil.cGetScrlY(), l_VwptH = nWse.fGetVwptHgt();
			if ((a_PageSara.c_Y + a_PageSara.c_H < l_ScrlY) || (l_ScrlY + l_VwptH < a_PageSara.c_Y))
			{ return 0; }

			if ((a_PageSara.c_Y <= l_ScrlY) && (a_PageSara.c_H >= l_VwptH))
			{ return 1; }

			var l_TotH = Math.min(a_PageSara.c_H, l_VwptH);
			var l_ShowH = Math.max(0, Math.min(a_PageSara.c_Y + a_PageSara.c_H - l_ScrlY, l_ScrlY + l_VwptH - a_PageSara.c_Y, l_TotH));
			return l_ShowH / l_TotH;
		};

		// 发出进入动画？
		nApp.fIsuEntAnmt = function (a_DomElmt, a_LstPptn) {
			if (!a_DomElmt)
			{ return false; }

			var l_PageSara = nApp.fCalcPageSara(a_DomElmt);
			var l_Pptn = nApp.fEstmShowPptn_VticOnly(l_PageSara);
			return (l_Pptn >= (a_LstPptn || 0.7));
		};

		// 修正滑动宽度
		nApp.fFixSldWid = function (a_SldSlct, a_ItemsSlct, a_AddWid, a_MinWid, a_DsplDom) {

			// 先显示
			if (a_DsplDom)
			{ a_DsplDom.style.display = "block"; }

			var l_List = nWse.fIsStr(a_SldSlct) ? nWse.stDomUtil.cQryOne(a_SldSlct) : a_SldSlct;
			var l_LiAry = nWse.fIsStr(a_ItemsSlct) ? nWse.stDomUtil.cQryAll(a_ItemsSlct) : a_ItemsSlct;
			var l_WidSum = nWse.stAryUtil.cSum(0, l_LiAry,
				function (a_Psum, a_Ary, a_Idx, a_Li) {
					return a_Psum + a_Li.offsetWidth;
				});
			if (nWse.fIsBool(a_AddWid)) {
				if (a_AddWid) {
					l_WidSum += l_LiAry[0].offsetWidth; // 再加宽一项
				}
			}
			else
				if (nWse.fIsNum(a_AddWid)) {
					l_WidSum += a_AddWid;
				}
			l_WidSum = Math.max(l_WidSum, (a_MinWid || 0));
			l_List.style.width = (l_WidSum) + "px";

			// 再交由样式表管理
			if (a_DsplDom)
			{ a_DsplDom.style.display = ""; }
		};

		// 激活滑动板
		nApp.fActSldBoas = function () {
			var l_$SldBoas = $(".mi_sld_boa");
			l_$SldBoas.each(function (a_Idx) {
				var l_This = this;	// SldBoa
				var l_$This = $(l_This);

				var l_$LtArw = l_$This.find(".mi_btn.mi_arw.mi_lt");
				var l_$RtArw = l_$This.find(".mi_btn.mi_arw.mi_rt");
				l_This.App_LtArw = l_$LtArw.get(0);
				l_This.App_RtArw = l_$RtArw.get(0);

				l_$LtArw.bind(nApp.i_EvtName_TchEnd,
					function (a_Evt) {
						var l_EvtTgt = a_Evt.target;
						nApp.fShowSldBoaCell(l_This, l_This.App_SltnCellOfstIdx - 1);

						// 重新开始计时
						fClrTmr();
						fSttTmr(10);
					});

				l_$RtArw.bind(nApp.i_EvtName_TchEnd,
					function (a_Evt) {
						var l_EvtTgt = a_Evt.target;
						nApp.fShowSldBoaCell(l_This, l_This.App_SltnCellOfstIdx + 1);

						// 重新开始计时
						fClrTmr();
						fSttTmr(10);
					});

				// 暴露API
				l_This.App_SltnCellOfstIdx = 0;	// 初始为0
				nApp.fShowSldBoaCell(l_This, 0);	// 一上来显示[0]

				var l_SwchFrqc = 5; // 每过一段时间自动换页
				var l_TmrId = null;
				function fSttTmr(a_Frqc) {
					l_SwchFrqc = a_Frqc || 5; // 默认5秒
					l_TmrId = window.setTimeout(function () {
						nApp.fShowSldBoaCell(l_This, l_This.App_SltnCellOfstIdx + 1, true);
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
			});
		};

		// 显示滑动面板单元
		nApp.fShowSldBoaCell = function (a_SldBoa, a_CellIdx, a_Wrap) {
			var l_$SldBoa = $(a_SldBoa);
			var l_$SldSlot = l_$SldBoa.find(".mi_sld_slot");
			var l_$Cells = l_$SldSlot.children(".mi_cell");
			if (0 == l_$Cells.length)
			{ return; }

			var l_Cells = l_$Cells.get();
			var l_MgnLt = parseFloat(l_$Cells.css("marginLeft"));
			var l_MgnRt = parseFloat(l_$Cells.css("marginRight"));
			var l_CellTotWid = l_Cells[0].offsetWidth + l_MgnLt + l_MgnRt;

			var l_Col1 = l_$SldBoa.find(".mi_col.mi_1").get(0);
			var i_ShowCpct = Math.round(l_Col1.offsetWidth / l_CellTotWid);
		//	console.log("i_ShowCpct = " + i_ShowCpct);

			if (a_Wrap) { // 环绕
				if (a_CellIdx < 0)
				{ a_CellIdx = l_Cells.length - i_ShowCpct; }
				else
					if (a_CellIdx > l_Cells.length - i_ShowCpct)
					{ a_CellIdx = 0; }
			}
			else { // 截断
				if (a_CellIdx < 0)
				{ a_CellIdx = 0; }
				else
					if (a_CellIdx > l_Cells.length - i_ShowCpct)
					{ a_CellIdx = l_Cells.length - i_ShowCpct; }
			}

			var l_SldSlot = l_$SldSlot.get(0);
			var l_OldX = l_SldSlot.offsetLeft;
			var l_NewX = -(a_CellIdx * l_CellTotWid);	// 注意负号
			l_SldSlot.style.left = (l_NewX).toString() + "px";
			a_SldBoa.App_SltnCellOfstIdx = a_CellIdx;

			// 隐藏箭头按钮
			var l_$LtArw = $(a_SldBoa.App_LtArw);
			var l_$RtArw = $(a_SldBoa.App_RtArw);

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

	}); // doc rdy
})();


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////