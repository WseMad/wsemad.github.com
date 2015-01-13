﻿/*
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
	var $ = window.jQuery;
	$(document).ready(function () {
		//	console.log("document.ready");

		// 窗口调整尺寸响应速率
		var i_WndRszRspsSpd = 1 / 75;

		// flash尺寸
		var i_FlashWid = 1920, i_FlashHgt = 1080, i_FlashAr = i_FlashWid / i_FlashHgt;

		// 当前位置尺寸，比例（取两个方向更小的那个）
		var s_FlashX = 0, s_FlashY = 0, s_FlashWid = i_FlashWid, s_FlashHgt = i_FlashHgt, s_FlashScl = 1;
		function fUpdFlashScl()
		{
			s_FlashScl = Math.min(nWse.stDomUtil.cGetVwptWid() / i_FlashWid, nWse.stDomUtil.cGetVwptHgt() / i_FlashHgt);			
			s_FlashWid = i_FlashWid * s_FlashScl;
			s_FlashHgt = i_FlashHgt * s_FlashScl;
			s_FlashX = (nWse.stDomUtil.cGetVwptWid() - s_FlashWid) / 2;
			s_FlashY = (nWse.stDomUtil.cGetVwptHgt() - s_FlashHgt) / 2;
			console.log("s_FlashScl = " + s_FlashScl);
		}

		fUpdFlashScl();
		nWse.stDomUtil.cAddEvtHdlr_WndRsz(fUpdFlashScl, i_WndRszRspsSpd);

		//===================================================== 共同

		// 调整底部菜单的位置宽度
		(function () {

			function fFixMenu() {
				var l_MenuBm = nWse.stDomUtil.cQryOne(".mi_menu_bm");
				if (!l_MenuBm)
				{ return; }

				var l_X, l_Y;
				l_X = 0;
				l_Y = s_FlashY + s_FlashHgt - l_MenuBm.offsetHeight;
				nWse.stCssUtil.cSetPos(l_MenuBm, l_X, l_Y);
			}

			fFixMenu();
			nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixMenu, i_WndRszRspsSpd);
		})();

		var s_DomBody = nWse.stDomUtil.cAcsBody();

		//===================================================== 正在加载

		if (nWse.stCssUtil.cHasCssc(s_DomBody, "mi_loading")) {
			(function () {

				// 调整按钮位置尺寸
				function fFixBtnPosDim()
				{
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


	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////