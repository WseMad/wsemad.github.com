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
				if (! l_DlgDiv)
				{ return ; }

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
				if (! l_DlgDiv)
				{ return ; }

				l_DlgDiv.style.display = "block";
				var l_X = Math.max(0, (nWse.stDomUtil.cGetVwptWid() - l_DlgDiv.offsetWidth) / 2);
				var l_Y = Math.max(0, (nWse.stDomUtil.cGetVwptHgt() - l_DlgDiv.offsetHeight) / 2);
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