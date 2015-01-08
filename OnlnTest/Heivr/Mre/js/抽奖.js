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

				// 怪物头像换到左边
				var l_MonsterHead = document.getElementById("k_MonsterHead");
				nWse.stCssUtil.cAddCssc(l_MonsterHead, "cnApp_HrztMir cnApp_Lt");
			});
		})();

		// 计算详情
		(function (){
			$("#k_CalcDetails").click(function (){
				$(".cnApp_FullScrnDiv").show();

				// 居中
				var l_DlgDiv = document.getElementById("k_CalcMethodsDlg");
				l_DlgDiv.style.display = "block";
				var l_X = Math.max(0, (nWse.stDomUtil.cGetVwptWid() - l_DlgDiv.offsetWidth) / 2);
				var l_Y = Math.max(0, (nWse.stDomUtil.cGetVwptHgt() - l_DlgDiv.offsetHeight) / 2);
				nWse.stCssUtil.cSetPos(l_DlgDiv, l_X, l_Y);
			});

			$("#k_CalcMethodsDlg .cnApp_ClsDiv .cnApp_Btn").click(function (){
				$("#k_CalcMethodsDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();

		// 成功
		(function (){
			$("#k_SuccessDlg .cnApp_ClsDiv .cnApp_Btn").click(function (){
				$("#k_SuccessDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();

		// 失败
		(function (){
			$("#k_FailedDlg .cnApp_ClsDiv .cnApp_Btn").click(function (){
				$("#k_FailedDlg").hide();
				$(".cnApp_FullScrnDiv").hide();
			});
		})();
	});

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////