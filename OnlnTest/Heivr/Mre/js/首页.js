/*
*
*/


(function () {

	//【PHP】这段代码只在?里有用！

	//【已转移】
	//$(document).ready(function () {
		
	//	// 折叠框
	//	var l_Acods = nWse.stDomUtil.cGetElmtsByCssc("cnApp_tAcod");
	//	nApp.g_AcodAry = [];
	//	nWse.stAryUtil.cFor(l_Acods,
	//		function (a_Ary, a_Idx, a_Acod)
	//		{
	//			nApp.g_AcodAry.push(new nApp.tAcod(l_Acods[a_Idx], false));
	//		});

	//	// 标签栏
	//	var l_Tabs = nWse.stDomUtil.cGetElmtsByCssc("cnApp_tTabs");
	//	nApp.g_TabsAry = [];
	//	nWse.stAryUtil.cFor(l_Tabs,
	//		function (a_Ary, a_Idx, a_Tabs)
	//		{
	//			nApp.g_TabsAry.push(new nApp.tTabs(l_Tabs[a_Idx], false));
	//		});
	//});

	//【已转移】
	////【注意】，因为要计算图片宽度，必须等到图片下载完成后才能运行这段代码！
	//$(window).load(function () {
	//	// 取得所有图像数组，遍历
	//	var l_AllFigAry = nWse.stDomUtil.cQryAll(".cnApp_SlideSlot>.cnApp_FigAry");
	//	nWse.stAryUtil.cFor(l_AllFigAry,
	//		function (a_AllFigAry, a_FigAryIdx, a_FigAry) {
	//			// 取得所有<figure>，计算总宽度
	//			var l_AllFigs = nWse.stDomUtil.cGetChdsOfTag(a_FigAry, "figure");
	//			var l_TotWid = nWse.stAryUtil.cSum(0, l_AllFigs,
	//				function (a_Acc, a_AllFigs, a_FigIdx, a_Fig) {
	//					nWse.stCssUtil.cSetDimWid(a_Fig, a_Fig.offsetWidth);	// 现在应该是百分比，改成像素，因为下面要调整容器的宽度
	//					return a_Acc + a_Fig.offsetWidth;
	//				});
	//			nWse.stCssUtil.cSetDimWid(a_FigAry, l_TotWid);	// 设置宽度
	//			//	console.log("l_TotWid = " + l_TotWid);
	//		});
	//});
	////【End】

	//$(window).load(function () {
	//	console.log("window.onload");
	//});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////