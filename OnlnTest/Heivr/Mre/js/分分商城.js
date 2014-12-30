/*
*
*/


(function () {

	//【PHP】这段代码只在分分商城里有用！
	$(document).ready(function () {

		$(".cnApp_Btn.cnApp_SwapBtn").click(function () {

			var l_Swap1 = $(".cnApp_Swap1").get(0);
			var l_Swap2 = $(".cnApp_Swap2").get(0);
			var l_Idx1 = l_Swap1.selectedIndex;
			var l_Idx2 = l_Swap2.selectedIndex;


			// 不能选中占位项
			var l_Opt1 = l_Swap1.options[l_Idx1];
			var l_Opt2 = l_Swap2.options[l_Idx2];
			if ($(l_Opt1).hasClass("cnApp_VoidOptn") || $(l_Opt2).hasClass("cnApp_VoidOptn"))
			{ return; }
	
			l_Swap1.options[l_Idx2].selected = true;
			l_Swap2.options[l_Idx1].selected = true;
		});
	});
	//【End】

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////