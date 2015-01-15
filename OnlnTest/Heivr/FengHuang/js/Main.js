/*
*
*/

/*
		<div id="myFlashContentDiv" style="z-index:1;">
			<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%" id="myFlashContent" style="z-index:1; position:absolute;">
				<param name="movie" value="frame.swf" />
				<param name="wmode" value="transparent">
				<!--[if !IE]>-->
				<object type="application/x-shockwave-flash" data="frame.swf" width="100%" height="100%" style="z-index:1; position:absolute;">
					<param name="movie" value="frame.swf" />
					<param name="wmode" value="transparent">
					<!--<![endif]-->
					<a href="http://www.adobe.com/go/getflashplayer"> <img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="点击获取最新版FlashPlayer" /> </a>
					<!--[if !IE]>-->
				</object>
				<!--<![endif]-->
			</object>
		</div>
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

		// 垂直居中（要求绝对定位）
		(function () {
			function fFixPos() {
				var l_All = nWse.stDomUtil.cQryAll(".mi_vtic_aln_ct");
				nWse.stAryUtil.cFor(l_All,
					function (a_Ary, a_Idx, a_DomElmt) {
						var l_PrnElmt = a_DomElmt.parentNode;
						if (!l_PrnElmt)
						{ return; }

						var l_Y = (l_PrnElmt.offsetHeight - a_DomElmt.offsetHeight) / 2;
						nWse.stCssUtil.cSetPosTp(a_DomElmt, l_Y);
					});
			}

			fFixPos();
			nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPos, i_WndRszRspsSpd);
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

		//===================================================== 区位价值

		//if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_qu_wei_jia_zhi")) {
		//	(function () {
		//		// 调整位置尺寸
		//		function fFixPosDim() {
		//			var l_DomBlbd = nWse.stDomUtil.cQryOne(".mi_tit_blbd");
		//			var l_X = l_DomBlbd.offsetLeft, l_Y = l_DomBlbd.offsetTop, l_W = l_DomBlbd.offsetWidth, l_H = l_DomBlbd.offsetHeight;

		//			var l_DomBtn = nWse.stDomUtil.cQryOne(".mi_btn");
		//			var i_BtnDim = l_DomBtn.offsetWidth;
		//			l_Y += l_H + (i_BtnDim / 2) * s_FlashScl;
		//			l_W = l_H = i_BtnDim;// * s_FlashScl;由于使用了图标，不能缩放！
		//			l_X = Math.round(s_FlashX + (s_FlashWid - l_W) / 2);
		//			nWse.stCssUtil.cSetPos(l_DomBtn, l_X, l_Y);
		//			//	nWse.stCssUtil.cSetDim(l_DomBtn, l_W, l_H);
		//		}

		//		fFixPosDim();
		//		nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixPosDim, i_WndRszRspsSpd);

		//	})();
		//}

	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////