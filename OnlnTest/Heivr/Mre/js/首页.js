/*
*
*/


(function () {

	$(document).ready(function () {

		// 导航菜单交互
		(function () {
			function fShow(a_Ul) {
				if (!a_Ul)
				{ return; }

				a_Ul.style.width = "2000px"			// 足够大，防止<li>掉落，后面会修正
				a_Ul.style.visibility = "hidden";	// 先不可见，计算完后再显示，防止闪烁！
				a_Ul.style.display = "block";		// 显示出来，现在浏览器才能正确计算offsetWidth

				// 调整<ul>宽度，等于所有字节的的宽度之和
				var l_Wid = 0;
				var l_Chds = nWse.stDomUtil.cGetAllChds(a_Ul);
				nWse.stAryUtil.cFor(l_Chds,
				function (a_Ary, a_Idx, a_Li) {
					l_Wid += a_Li.offsetWidth;
				});

				a_Ul.style.width = (l_Wid + 1).toString() + "px";	// 稍微增大点，防止意外

				// 如果过宽，可能显示不开，向左平移
				var l_BCR = a_Ul.getBoundingClientRect();
				var l_VW = $(window).innerWidth();
				var l_LrMgn = (l_VW - $(".mi_sect.mi_header").get(0).offsetWidth) / 2;
				if (l_BCR.right > l_VW - l_LrMgn)
				{
					a_Ul.style.left = (l_VW - l_LrMgn - l_BCR.right) + "px";
				}

				a_Ul.style.visibility = "visible";	// 显示

				// 为链接添加CSS类
				$(a_Ul).prev("a").addClass("mi_expd");
			}

			function fHide(a_Ul) {
				if (!a_Ul)
				{ return; }

				a_Ul.style.display = "none";

				// 为链接移除CSS类
				$(a_Ul).prev("a").removeClass("mi_expd");
			}

			function fTgl(a_Ul) {
				if (!a_Ul)
				{ return; }

				if ("block" == a_Ul.style.display) {
					fHide(a_Ul);
				}
				else {
					fShow(a_Ul);
				}
			}

			function fHideAllL2Uls()
			{
				$(".mi_list.mi_2").hide();
				$(".mi_list.mi_1>li>a").removeClass("mi_expd");
			}

			// 移除二级菜单的非元素子节点
			var l_L2Uls = $(".mi_list.mi_2").get();
			nWse.stAryUtil.cFor(l_L2Uls,
				function (a_Ary, a_Idx, a_Ul) {
					nWse.stDomUtil.cRmvNonElmtChds(a_Ul);
				});

			// 事件
			var l_Lis = $(".mi_list.mi_1>li");
			l_Lis.bind("click",
				function () {
					var l_This = this;
					fTgl($(l_This).children(".mi_list.mi_2").get(0));
				});

			l_Lis.bind("mouseover",
				function () {
					var l_This = this;

					// 先隐藏全部第二级菜单
					fHideAllL2Uls();

					// 后显示这个<li>的
					fShow($(l_This).children(".mi_list.mi_2").get(0));
				});

			$(".mi_banner").bind("mouseover",
				function (a_Evt){
					// 隐藏全部第二级菜单
					fHideAllL2Uls();
				});
		})();
	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////