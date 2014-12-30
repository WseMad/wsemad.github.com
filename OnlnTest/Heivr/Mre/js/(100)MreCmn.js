﻿/*
*
*/


(function () {
	var $ = window.jQuery;
	$(document).ready(function () {

		//nWse.fClass(nApp,
		//	function tNavBtnHdl()
		//	{
		//	},
		//	null,
		//	{

		//	});

		// 导航按钮
		nApp.stNavBtn = {
			cInit: function () {
				var l_This = this;
				l_This.e_Menu = nWse.stDomUtil.cQryOne(".cnApp_Menu");
				if (! l_This.e_Menu) // PC版，立即返回
				{ return this; }

				l_This.e_MenuHgt = 0;
				l_This.e_1stUl = nWse.stDomUtil.cQryOne(".cnApp_1st>ul");
				l_This.e_2ndUls = nWse.stDomUtil.cQryAll(".cnApp_2nd>ul");
				l_This.e_1stLis = nWse.stDomUtil.cGetChdsOfTag(l_This.e_1stUl, "li");
				l_This.e_CrntIdx = -1;	// 初始无效
				l_This.eSlc1stLi(0);	// 选中0

				// 交互处理
				nWse.stDomUtil.cAddEvtHdlr(l_This.e_1stUl, "click",
					function (a_Evt) {
						a_Evt = a_Evt || window.event;

						// 点中<ul>，不作处理
						if (("UL" == a_Evt.target.tagName))
						{ return; }

						// 取得点中的<li>，若没有则不作处理
						var l_Li = nWse.stDomUtil.cSrchSelfAndAcstForTag(a_Evt.target, "li");
						if (!l_Li)
						{ return; }

						// 选中新项
						var l_LiIdx = l_This.e_1stLis.indexOf(l_Li);
						if (l_LiIdx >= 0) {
							l_This.eSlc1stLi(l_LiIdx);
						}
					});

				// 与主菜单交互
				l_This.e_Menu.style.display = "none";	// 一开始隐藏

				var l_$NavBtn = $(".cnApp_NavBtnDiv");
				l_$NavBtn.click(nWse.stFctnUtil.cBindThis(l_This, l_This.cTgl));
			}
			,
			eSlc1stLi: function (a_Idx) {
				var l_This = this;
				if (l_This.e_CrntIdx == a_Idx)
				{ return this; }

				var l_OldIdx = l_This.e_CrntIdx;
				l_This.e_CrntIdx = a_Idx;

				// 设置第一级菜单中<li>的样式
				if (l_OldIdx >= 0) {
					nWse.stCssUtil.cRmvCssc(l_This.e_1stLis[l_OldIdx], "cnApp_Crnt");
				}

				if (l_This.e_CrntIdx >= 0) {
					nWse.stCssUtil.cAddCssc(l_This.e_1stLis[l_This.e_CrntIdx], "cnApp_Crnt");
				}

				// 控制第二级菜单的显隐
				nWse.stAryUtil.cFor(l_This.e_2ndUls,
					function (a_UlAry, a_UlIdx, a_Ul) {
						if (a_UlIdx == l_This.e_CrntIdx) {
							a_Ul.style.display = "block";
						}
						else {
							a_Ul.style.display = "none";
						}
					});
				return this;
			}
			,
			cIsShow: function () {
				return ("block" == this.e_Menu.style.display);
			}
			,
			cShow: function () {
				var l_This = this;
				if (l_This.cIsShow())
				{ return l_This; }

				// 来一个动画效果
				l_This.e_Menu.style.display = "block";	// 先设置
				if (l_This.e_MenuHgt < l_This.e_Menu.offsetHeight)
				{ 
					l_This.e_MenuHgt = l_This.e_Menu.offsetHeight;	// 后读取（只有当显示出来后，几何数据才是正确的）
				}
				
				if (l_This.e_Menu.offsetHeight == l_This.e_MenuHgt)
				{
					nWse.stCssUtil.cSetDimHgt(l_This.e_Menu, 0);
				}

				nWse.stCssUtil.cAnmt(l_This.e_Menu,
					{
						"height": (l_This.e_MenuHgt).toString() + "px="
					},
					{
						c_Dur: 0.6,
						c_fEsn: function (a_Scl) {
							return nWse.stNumUtil.cPrbItp$Ovfl(0, 1, 1.2, a_Scl, false);
						},
						c_fOnEnd: function () {
						}
					});
			}
			,
			cHide: function () {
				var l_This = this;
				if (!l_This.cIsShow())
				{ return l_This; }

				nWse.stCssUtil.cAnmt(l_This.e_Menu,
					{
						"height": "0px="
					},
					{
						c_Dur: 0.6,
						c_fEsn: function (a_Scl) {
							return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
						},
						c_fOnEnd: function () {
							l_This.e_Menu.style.display = "none";
						}
					});
			}
			,
			cTgl: function () {
				if (nWse.stCssUtil.cIsDurAnmt(this.e_Menu)) // 动画期间不允许再次切换
				{ return this; }

				this.cIsShow() ? this.cHide() : this.cShow();
				return this;
			}
		};

		nApp.stNavBtn.cInit();	// 立即初始化

		// 折叠框
		nWse.fClass(nApp,
			/// 折叠框
			/// a_Ctanr：HTMLElement，容器
			/// a_Cptn：HTMLElement，标题
			/// a_InitExpd：Boolean，初始展开？默认false
			function tAcod(a_Ctanr, a_InitExpd) {
				if (!a_Ctanr)
				{ return this; }

				this.e_Ctnt = nWse.stDomUtil.cQryOne(".cnApp_Ctnt", a_Ctanr);	// 取首个
				if (!this.e_Ctnt)
				{ throw new Error("tAcod：容器里没有Tag“ul”的元素！"); }

				this.e_Cptn = nWse.stDomUtil.cQryOne(".cnApp_Cptn", a_Ctanr);	// 取首个
				if (!this.e_Cptn)
				{ throw new Error("tAcod：容器里没有CSS类“cnApp_Cptn”的元素！"); }

				this.e_IdctArw = nWse.stDomUtil.cQryOne(".cnApp_IdctArw", this.e_Cptn);

				var l_This = this;
				$(l_This.e_Cptn).click(function () {
					l_This.cTgl();
				});

				if (!a_InitExpd) {
					this.eShowHide(false);
				}
			},
			null,
			{
				eShowHide: function (a_Show) {
					if (a_Show) {
						this.e_Ctnt.style.display = "block";
						if (this.e_IdctArw) {
							this.e_IdctArw.textContent = "∨";
						}
					}
					else {
						this.e_Ctnt.style.display = "none";
						if (this.e_IdctArw) {
							this.e_IdctArw.textContent = "＞";
						}
					}
				}
				,
				cIsShow: function () {
					return this.e_Ctnt && ("none" != this.e_Ctnt.style.display);
				}
				,
				cShow: function () {
					var l_This = this;
					if (l_This.cIsShow())
					{ return l_This; }

					// 来一个动画效果
					l_This.eShowHide(true);	// 先设置
					var l_Hgt = l_This.e_Ctnt.offsetHeight;	// 后读取（只有当显示出来后，几何数据才是正确的）
					nWse.stCssUtil.cSetDimHgt(l_This.e_Ctnt, 0);
					nWse.stCssUtil.cAnmt(l_This.e_Ctnt,
						{
							"height": (l_Hgt).toString() + "px="
						},
						{
							c_Dur: 0.4,
							c_fEsn: function (a_Scl) {
								return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
							}
						});
				}
				,
				cHide: function () {
					var l_This = this;
					if (!l_This.cIsShow())
					{ return l_This; }

					nWse.stCssUtil.cAnmt(l_This.e_Ctnt,
						{
							"height": "0px="
						},
						{
							c_Dur: 0.4,
							c_fEsn: function (a_Scl) {
								return nWse.stNumUtil.cPrbItp(0, 1, a_Scl, false);
							},
							c_fOnEnd: function () {
								l_This.eShowHide(false);
							}
						});
				}
				,
				cTgl: function () {
					this.cIsShow() ? this.cHide() : this.cShow();
					return this;
				}
			});

		// 标签栏
		nWse.fClass(nApp,
			/// 标签栏
			function tTabs(a_Ctanr) {
				if (!a_Ctanr)
				{ return this; }

				this.e_Cptns = nWse.stDomUtil.cQryAll(".cnApp_CptnGrp>.cnApp_Cptn", a_Ctanr, false);
				if (!this.e_Cptns)
				{ return this; }

				this.e_Pages = nWse.stDomUtil.cQryAll(".cnApp_TabPage", a_Ctanr, true);	// 只考虑父子关系
				if (!this.e_Pages)
				{ throw new Error("tTabs：有标题，却无标签页！"); }

				if (this.e_Cptns.length != this.e_Pages.length)
				{ throw new Error("tTabs：标题和标签页数量不匹配！"); }

				// 只保留一个，其余隐藏
				var l_This = this;
				l_This.e_CrntCptnIdx = nWse.stAryUtil.cFind(l_This.e_Cptns,
					function (a_Cptns, a_CptnIdx, a_Cptn) {
						return nWse.stCssUtil.cHasCssc("cnApp_Crnt");
					});
				if (l_This.e_CrntCptnIdx < 0) // 默认选中第一个
				{
					l_This.e_CrntCptnIdx = 0;
				}

				nWse.stAryUtil.cFor(l_This.e_Pages,
					function (a_Pages, a_PageIdx, a_Page) {
						if (a_PageIdx == l_This.e_CrntCptnIdx)
						{ return; }

						a_Page.style.display = "none";
					});

				// 绑定事件处理器
				nWse.stAryUtil.cFor(l_This.e_Cptns,
					function (a_Cptns, a_CptnIdx, a_Cptn) {
						nWse.stDomUtil.cAddEvtHdlr(a_Cptn, "click",
							function (a_Evt) {
								a_Evt = a_Evt || window.event;

								l_This.eSlcTab(a_CptnIdx);
							});
					});
			},
			null,
			{
				eSlcTab: function (a_Idx) {
					var l_This = this;
					var l_OldIdx = l_This.e_CrntCptnIdx;
					l_This.e_CrntCptnIdx = a_Idx;
					nWse.stCssUtil.cRmvCssc(l_This.e_Cptns[l_OldIdx], "cnApp_Crnt");
					nWse.stCssUtil.cAddCssc(l_This.e_Cptns[l_This.e_CrntCptnIdx], "cnApp_Crnt");
					l_This.e_Pages[l_OldIdx].style.display = "none";
					l_This.e_Pages[l_This.e_CrntCptnIdx].style.display = "block";
				}
			});

		// 修正输入框的尺寸，填充可用区间
		nApp.stFixIptBoxDim = {
			cFix: function (a_IptBox, a_Eps) {
				if ((!a_IptBox) || (!a_IptBox.parentNode))
				{ return this; }

				nWse.stDomUtil.cRmvNonElmtChds(a_IptBox.parentNode);	// 移除非元素子节点（空白）
				var l_PrnDimInfo = nWse.stCssUtil.cGetCtntWid({}, a_IptBox.parentNode);
				var l_Lab = $(a_IptBox).prev("label").get(0);
				var l_Wid = l_PrnDimInfo.c_CtntWid;
				if (l_Lab)
				{ l_Wid -= l_Lab.offsetWidth + (a_Eps || 0); }

				nWse.stCssUtil.cSetDimWid(a_IptBox, l_Wid);
				//	console.log(l_LabDimInfo.c_CtntWid);
				return this;
			}
		};


		//============================================================== 生成控件

		// 折叠框
		var l_Acods = nWse.stDomUtil.cGetElmtsByCssc("cnApp_tAcod");
		nApp.g_AcodAry = [];
		nWse.stAryUtil.cFor(l_Acods,
			function (a_Ary, a_Idx, a_Acod) {
				nApp.g_AcodAry.push(new nApp.tAcod(l_Acods[a_Idx], false));
			});

		// 标签栏
		var l_Tabs = nWse.stDomUtil.cGetElmtsByCssc("cnApp_tTabs");
		nApp.g_TabsAry = [];
		nWse.stAryUtil.cFor(l_Tabs,
			function (a_Ary, a_Idx, a_Tabs) {
				nApp.g_TabsAry.push(new nApp.tTabs(l_Tabs[a_Idx], false));
			});

	});	// jQuery ready

	//【注意】，因为要计算图片宽度，必须等到图片下载完成后才能运行这段代码！
	$(window).load(function () {
		// 取得所有图像数组，遍历
		var l_AllFigAry = nWse.stDomUtil.cQryAll(".cnApp_SlideSlot>.cnApp_FigAry");
		nWse.stAryUtil.cFor(l_AllFigAry,
			function (a_AllFigAry, a_FigAryIdx, a_FigAry) {
				// 取得所有<figure>，计算总宽度
				var l_AllFigs = nWse.stDomUtil.cGetChdsOfTag(a_FigAry, "figure");
				var l_TotWid = nWse.stAryUtil.cSum(0, l_AllFigs,
					function (a_Acc, a_AllFigs, a_FigIdx, a_Fig) {
					//	nWse.stCssUtil.cSetDimWid(a_Fig, a_Fig.offsetWidth);	// 现在应该是百分比，改成像素，因为下面要调整容器的宽度
						return a_Acc + a_Fig.offsetWidth;
					});
				nWse.stCssUtil.cSetDimWid(a_FigAry, l_TotWid);	// 设置宽度
				//	console.log("l_TotWid = " + l_TotWid);
			});
	});
	//【End】
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////