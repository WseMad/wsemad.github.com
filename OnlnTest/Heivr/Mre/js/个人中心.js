/*
*
*/


(function () {

	//【PHP】这段代码只在?里有用！
	$(document).ready(function () {

		// 处理cnApp_PageFlip
		nApp.g_PagePlip = {
			e_Div: null
			, e_Cptn: null
			, e_CptnListAry: null
			, e_LiAry: null
			, e_PageAry: null
			, e_CrntPageIdx: -1
			,
			eIsDurAnmt: function () {
				var l_This = this;
				return (nWse.stAryUtil.cFind(l_This.e_PageAry,
					function (a_Ary, a_Idx, a_Page) {
						return nWse.stCssUtil.cIsDurAnmt(a_Page);
					}) >= 0);
			}
			,
			eFindClkdLi: function (a_Evt) {
				var l_This = this;
				var l_Idx = nWse.stAryUtil.cFind(l_This.e_LiAry,
					function (a_Ary, a_Idx, a_Li) {
						return nWse.stDomUtil.cIsSelfOrAcst(a_Li, a_Evt.target);
					});
				return l_Idx;
			}
			,
			eIsClkRtnBtn: function (a_Evt) {
				nWse.stDomUtil.cIsSelfOrAcst
			}
			,
			eHdlClkLi: function (a_LiIdx) {
				var l_This = this;

				// 索引可能无效？
				if (!nWse.stAryUtil.cIsIdxVld(l_This.e_PageAry, a_LiIdx))
				{ return this; }

				l_This.e_CrntPageIdx = a_LiIdx; // 记录索引

				// 控制相应页面的展示
				var l_Li = l_This.e_LiAry[a_LiIdx];
				var l_Page = l_This.e_PageAry[a_LiIdx];

				l_Page.style.display = "block";		// 先设为可见
				if (l_Page.offsetHeight < l_This.e_Cptn.offsetHeight) // 各个页面的高度不能低于标题页的高度
				{
					nWse.stCssUtil.cSetDimHgt(l_Page, l_This.e_Cptn.offsetHeight);
				}

				// 来一个动画效果
				nWse.stCssUtil.cSetPos(l_Page, l_This.e_Cptn.offsetWidth, 0);
				nWse.stCssUtil.cAnmt(l_Page,
					{
						"left": "0px"
					},
					{
						c_Dur: 0.4
						, c_fEsn: function (a_Scl) {
							return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
						}
						, c_fOnEnd: function () {
						}
					});

				return this;
			}
			,
			eHidePage : function (a_Page)
			{
				if (! a_Page)
				{ return this; }

				// 来一个动画效果
				var l_This = this;
				var l_Page = a_Page;
				nWse.stCssUtil.cAnmt(l_Page,
					{
						"left": l_This.e_Cptn.offsetWidth + "px"
					},
					{
						c_Dur: 0.4
						, c_fEsn: function (a_Scl) {
							return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
						}
						, c_fOnEnd: function () {
							l_Page.style.display = "none";		// 拿掉
							l_This.e_CrntPageIdx = -1; // 记录索引
						}
					});

				return this;
			}
			,
			cInit: function () {
				var l_This = this;
				l_This.e_Div = $(".cnApp_PageFlip").get(0);
				if (!l_This.e_Div)
				{ return this; }

				l_This.e_Cptn = $(".cnApp_PageFlip .cnApp_Cptn").get(0);
				l_This.e_CptnListAry = $(".cnApp_PageFlip .cnApp_Cptn .cnApp_List").get();
				l_This.e_LiAry = $(".cnApp_PageFlip .cnApp_Cptn .cnApp_List>li").get();
				l_This.e_PageAry = $(".cnApp_PageFlip .cnApp_Page").get();
				if (l_This.e_LiAry.length != l_This.e_PageAry.length) {
					console.log("nApp.g_PagePlip：l_This.e_LiAry.length != l_This.e_PageAry.length");
				}

				// 为每个<ul>里的所有<li>绑定事件（利用冒泡）
				nWse.stDomUtil.cAddEvtHdlr(l_This.e_Cptn, "click",
					function (a_Evt) {
						a_Evt = a_Evt || window.event;

						// 动画期间不处理输入
						if (l_This.eIsDurAnmt())
						{ return; }

						// 点中<li>时才处理
						var l_ClkdLiIdx = l_This.eFindClkdLi(a_Evt);
						if (l_ClkdLiIdx < 0)
						{ return; }

						l_This.eHdlClkLi(l_ClkdLiIdx);
						//	console.log(a_Evt.target.tagName);
					});

				// 为每个返回按钮绑定事件
				$(".cnApp_PageFlip .cnApp_Page .cnApp_RtnBtn").click(function () {
					var l_Page = $(this).parents(".cnApp_Page").get(0);
					l_This.eHidePage(l_Page);
				});

				return this;
			}
		};

		nApp.g_PagePlip.cInit();	// 立即初始化
	});
	//【End】

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////