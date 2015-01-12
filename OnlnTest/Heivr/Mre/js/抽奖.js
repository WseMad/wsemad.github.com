/*
*
*/


(function () {

	//【PHP】这段代码只在产品详情里有用！

	$(document).ready(function () {

		// 查看详情
		(function () {
			$("#k_ViewDetails").click(function () {
				$(".cnApp_Sect.cnApp_InitDsplNone").show();
				$("#k_ViewDetails").hide();

				// 怪物头像换到左边，包扩他说得话
				var l_MonsterHead = document.getElementById("k_MonsterHead");
				nWse.stCssUtil.cAddCssc(l_MonsterHead, "cnApp_HrztMir cnApp_Lt");
				nWse.stCssUtil.cAddCssc(document.getElementById("k_MonsterWords"), "cnApp_Lt");
			});
		})();

		// 计算详情
		(function () {
			$("#k_CalcDetails").click(function () {
				$(".cnApp_FullScrnDiv").show();

				// 居中
				var l_DlgDiv = document.getElementById("k_CalcMethodsDlg");
				if (!l_DlgDiv)
				{ return; }

				l_DlgDiv.style.display = "block";
				var l_X = Math.max(0, (nWse.stDomUtil.cGetVwptWid() - l_DlgDiv.offsetWidth) / 2);
				var l_Y = Math.max(0, (nWse.stDomUtil.cGetVwptHgt() - l_DlgDiv.offsetHeight) / 2);
				nWse.stCssUtil.cSetPos(l_DlgDiv, l_X, l_Y);
			});
		})();

		// 我要抽奖
		(function () {
			$("#k_Draw").click(function () {
				$(".cnApp_FullScrnDiv").show();

				// 随机产生一个
				var l_WhichDlg = (Math.random() < 0.5) ? "k_SuccessDlg" : "k_FailedDlg";

				// 居中
				var l_DlgDiv = document.getElementById(l_WhichDlg);
				if (!l_DlgDiv)
				{ return; }

				l_DlgDiv.style.display = "block";

				var l_X = Math.max(0, (nWse.stDomUtil.cGetVwptWid() - l_DlgDiv.offsetWidth) / 2);
				var l_Y = Math.max(0, (nWse.stDomUtil.cGetVwptHgt() - l_DlgDiv.offsetHeight) / 2);

				var l_Scl;
				if (nWse.stDomUtil.cQryOne(".cnApp_Mbl")) // 手机版
				{
					l_X = l_Y = 0;
					l_Scl = nWse.stCssUtil.cAcsExtdAnmt_2dTsfm(l_DlgDiv).c_Scl;
					l_Scl.x = nWse.stDomUtil.cGetVwptWid() / l_DlgDiv.offsetWidth;
					l_Scl.y = l_Scl.x;
					nWse.stCssUtil.cUpdExtdAnmt_2dTsfm(l_DlgDiv);

					l_Y = nWse.stDomUtil.cGetVwptHgt() - l_DlgDiv.offsetHeight * l_Scl.y;	// 底对齐
				}

				nWse.stCssUtil.cSetPos(l_DlgDiv, l_X, l_Y);
			});
		})();

		// 计算方法的关闭
		(function () {
			$("#k_CalcMethodsDlg .cnApp_ClsDiv .cnApp_Btn").click(function () {
				$("#k_CalcMethodsDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();

		// 成功的关闭
		(function () {
			$("#k_SuccessDlg .cnApp_ClsDiv .cnApp_Btn").click(function () {
				$("#k_SuccessDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();

		// 失败的关闭
		(function () {
			$("#k_FailedDlg .cnApp_ClsDiv .cnApp_Btn").click(function () {
				$("#k_FailedDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();

		// 分享好友
		(function () {
			$(".cnApp_Mbl .cnApp_Btn.cnApp_ShrFrnds").click(function () {
				//	console.log("abc");

				// 把对话框关闭，留住遮罩。
				$("#k_SuccessDlg").hide();
				$("#k_FailedDlg").hide();

				// 把提示显示出来
				$("#k_Hint").show();
			});
		})();

		// 手机版页面高度修正
		(function () {

			function fFixDrawHeaderHgt() {
				var l_EarthDiv = nWse.stDomUtil.cQryOne(".cnApp_Mbl .cnApp_EarthDiv");
				if (!l_EarthDiv)
				{ return; }

				var i_ImgWidPct = 40;
				var i_EarthImgAr = 454 / 435;
				var i_HintImgAr = 523 / 174;

				var l_EarthImgWid = Math.round(nWse.stDomUtil.cGetVwptWid() * i_ImgWidPct / 100);
				var l_EarthImgHgt = Math.round(l_EarthImgWid / i_EarthImgAr);
				var l_HintImgWid = Math.round(nWse.stDomUtil.cGetVwptWid() * i_ImgWidPct / 100);
				var l_HintImgHgt = Math.round(l_HintImgWid / i_HintImgAr);

				var l_DrawHeader = nWse.stDomUtil.cQryOne(".cnApp_DrawHeader");
				//	console.log(l_EarthDiv.offsetHeight + ", " + l_DrawHeader.offsetHeight);
				var i_Scl = 1.2;	// 这个比例是合适的，但是取决于BG_Mbl.jpg的大小

				nWse.stCssUtil.cSetDimHgt(l_EarthDiv, l_EarthImgHgt);
				//	console.log("l_EarthImgHgt = " + l_EarthImgHgt);
				var l_DHH = Math.round(l_EarthImgHgt * i_Scl);
				nWse.stCssUtil.cSetDimHgt(l_DrawHeader, l_DHH);

				// 地球垂直居中
				var l_Y = (l_DHH - l_EarthImgHgt) / 2;
				nWse.stCssUtil.cSetPosTp(l_EarthDiv, l_Y);

				// 文字相对于地球垂直居中
				var l_CptnDiv = nWse.stDomUtil.cQryOne(".cnApp_CptnDiv");
				nWse.stCssUtil.cSetDimHgt(l_CptnDiv, l_HintImgHgt);
				l_Y = l_Y + (l_EarthImgHgt - l_HintImgHgt) / 2;
				nWse.stCssUtil.cSetPosTp(l_CptnDiv, l_Y);
			}

			// 一开始修一次，以后每当窗口尺寸改变时继续修正
			fFixDrawHeaderHgt();
			nWse.stDomUtil.cAddEvtHdlr_WndRsz(fFixDrawHeaderHgt, 0.1);

		})();
	});

	//【等到全部加装完后才执行的代码！】
	$(window).load(function () {

		// 地球旋转
		(function () {
			var l_Dom = document.getElementById("k_Earth");
			nWse.stCssUtil.cAnmt(l_Dom,
				{
					"Wse_2dTsfm": [
						{
							c_Name: "rotate",
							c_End: { w: -2 * Math.PI }
						}
					]
				},
				{
					c_Dur: 10,
					c_Tot: -1
				});
		})();
	});

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////