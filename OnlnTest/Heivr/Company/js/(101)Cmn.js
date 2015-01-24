/*
* 注意：搜索【TODO】填写未完成的部分！
*/

(function () {

	//-------- 一些常量：

	// 触摸事件名
	var i_EvtName_TchBgn = "mousedown touchstart";
	var i_EvtName_TchMove = "mousemove touchmove";
	var i_EvtName_TchEnd = "mouseup touchend";

	// 设备像素率，默认1
	var i_DvcPxlRat = window.devicePixelRatio || 1;
	console.log("i_DvcPxlRat = " + i_DvcPxlRat);

	//-------- 文档就绪

	var $ = window.jQuery;
	$(document).ready(function () {

		// 如果像素率不是1，对布局环境应用全局缩放！（此时浏览器一定支持2D变换）
		var s_LotEnv = document.getElementById("k_LotEnv");
		var s_LotEnvMinWid = parseFloat($(s_LotEnv).css("minWidth")); // 取得最小宽度
		console.log("s_LotEnvMinWid = " + s_LotEnvMinWid);
		(function () {
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
				
				var l_Scl = l_VW / (s_LotEnvMinWid);
				s_LotEnv.style[s_TsfmStr] = "scale(" + (l_Scl).toString() + ")";
			}

			if (1 != i_DvcPxlRat) {
				fGlbScl();
				$(window).bind("resize", function () { fGlbScl(); });
			}
		})();

		// 按钮（3D）
		(function () {
			var l_$Btns = $(".mi_btn");
			var l_$3dBtns = $(".mi_btn.mi_3d");

			// 禁止拖选
			l_$Btns.bind("selectstart", function (a_Evt) { return false; });

			// 3D按下、弹起
			// 注意i_TchEnd必须在document上也进行处理
			l_$3dBtns.bind(i_EvtName_TchBgn, function (a_Evt) { $(a_Evt.target).addClass("mi_prsd"); return false; });
			l_$3dBtns.bind(i_EvtName_TchEnd,
				function (a_Evt) {
					$(a_Evt.target).removeClass("mi_prsd");

					//【TODO】在这里处理页面跳转
					switch (a_Evt.target.id) {
						case "k_MoreStuff": { window.location; } break;
					}

					return false;
				});
			$(document).bind(i_EvtName_TchEnd, function (a_Evt) { l_$3dBtns.removeClass("mi_prsd"); return false; })

		})();
	});
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////