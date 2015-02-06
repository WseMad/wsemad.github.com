/*
*
*/


(function () {

	// 常用类型
	var stNumUtil = nWse.stNumUtil;
	var stStrUtil = nWse.stStrUtil;
	var stDomUtil = nWse.stDomUtil;
	var stCssUtil = nWse.stCssUtil;
	var tPntIpt = nWse.tPntIptTrkr.tPntIpt;
	var tPntIptKind = tPntIpt.tKind;

	// 播放声音
	function fPlayMp3(a_Mp3)
	{
		a_Mp3.cStop().cPlay();
	}

	// 文档就绪
	nWse.stPageInit.cAddEvtHdlr_DocRdy(function ()
	{
		// 应用程序
		var stApp;
		(function ()
		{
			/// 应用程序
			stApp = function () { };
			nApp.stApp = stApp;
			stApp.oc_nHost = nApp;
			stApp.oc_FullName = nApp.ocBldFullName("stApp");

			/// 构建全名
			stApp.ocBldFullName = function (a_Name)
			{
				return stApp.oc_FullName + "." + a_Name;
			};

			//======== 初值设定

			// 声音支持？
			stApp.e_AudSupt = true;

			// 开始游戏倒计时（秒），∈整数[0, 5]
			stApp.e_CntDn = 0;

			// 游戏时长（秒），∈整数[0, 99]
			stApp.e_PlayDur = 10;

			// 时间到时结束游戏？
			stApp.e_GameOver = false;

			// 当剩余多少羊毛时，羊头变成难过，∈整数[1, 9]
			stApp.e_RmnForSad = 6;

			// 当剩余多少羊毛时，羊头变成大哭，∈整数[0, stApp.e_RmnForSad - 1]
			stApp.e_RmnForCry = 2;

			// 羊毛动画时长（秒）
			stApp.e_FurAnmtDur = 0.2;

			// 羊跳动画时长（秒）
			stApp.e_SheepJumpAnmtDur = 0.5;

			// 羊跳振幅（像素）
			stApp.e_SheepJumpAmp = 40;

			// 话总数，∈[0, 8]整数
			stApp.e_WordsTot = 8;

			// 随机产生几句？
			stApp.e_RandWordsAmt = 3;
		})();

		// 呈现目标
		stApp.c_PrstTgt = document.getElementById("k_PrstTgt");

		//===================================================== stApp

		// 游戏状态
		nWse.fEnum(stApp,
			function tGameSta() {},
			null,
			"i_Init",
			"i_Run",
			"i_Cplt"
		);
		stApp.e_GameSta = stApp.tGameSta.i_Init; // 初始状态

		// 更新全局缩放
		var i_DvcPxlRat = 2;//window.devicePixelRatio;	// 像素率，【固定2】
		stApp.e_GlbSclDiv = document.getElementById("k_GlbSclDiv");
		stApp.i_DsnWid = stApp.e_GlbSclDiv.offsetWidth;		// 设计宽度，iPhone6的宽度
		stApp.i_DsnHgt = stApp.e_GlbSclDiv.offsetHeight;	// 设计高度，iPhone6的高度
		console.log("设计宽高 = " + stApp.i_DsnWid + ", " + stApp.i_DsnHgt);

		nWse.stCssUtil.cSetDim(stApp.e_GlbSclDiv,
			Math.round(stApp.i_DsnWid / i_DvcPxlRat),
			Math.round(stApp.i_DsnHgt / i_DvcPxlRat));

		stApp.eUpdGlbScl = function (){
			var i_GlbSclX = nWse.stDomUtil.cGetVwptWid() * i_DvcPxlRat / stApp.i_DsnWid;	// 全局缩放X
			var i_GlbSclY = nWse.stDomUtil.cGetVwptHgt() * i_DvcPxlRat / stApp.i_DsnHgt;	// 全局缩放Y
			stApp.i_GlbSclX = i_GlbSclX;
			stApp.i_GlbSclY = i_GlbSclY;
			console.log("全局缩放 = " + i_GlbSclX + ", " + i_GlbSclY);

			// 应用！
			var l_Tsfm;
			l_Tsfm = nWse.stCssUtil.cAcsExtdAnmt_2dTsfm(stApp.e_GlbSclDiv);
			l_Tsfm.c_Scl.x = i_GlbSclX;
			l_Tsfm.c_Scl.y = i_GlbSclY;
			nWse.stCssUtil.cUpdExtdAnmt_2dTsfm(stApp.e_GlbSclDiv);
		};

		// 调整尺寸
		stApp.cOnWndRsz = function ()
		{
		//	console.log("肖像画 = " + stDomUtil.cMaybePtraMode());

			// 更新全局缩放
			stApp.eUpdGlbScl();

			// 羊动画立即结束，跳到最后，执行回调
			if (stApp.e_SheepDiv)
			{
				nWse.stCssUtil.cFnshAnmt(stApp.e_SheepDiv, true, true);
			}
		};
		stApp.cOnWndRsz();	// 一开始先调用一次
		stDomUtil.cAddEvtHdlr(window, "resize", nWse.stFctnUtil.cBindThis(stApp, stApp.cOnWndRsz));

		// 初始化
		stApp.cInit = function ()
		{
			var l_This = this;

			// 点输入追踪器
			l_This.e_PIT = new nWse.tPntIptTrkr();
			l_This.e_PIT.cInit({
				c_HdlMode: 1
			});
			l_This.e_PIT.cSetImdtHdlr(nWse.stFctnUtil.cBindThis(l_This, l_This.eHdlIpt));

			// 倒计时
			stApp.eCntDn();

			// 延迟加载资源
			nWse.stDfrdLoad.cAsnSrcPpty("[data-wse_src]");

			// 随机下载三句话
			if (stApp.e_WordsTot > 0)
			{
				stApp.e_WrodsImg = document.getElementById("k_WordsImg");

				stApp.e_RandWordsNums = fRandDiffIntNums(null, stApp.e_RandWordsAmt, 1, stApp.e_WordsTot);
				stApp.e_RandWordsImgs = new Array(stApp.e_RandWordsAmt);
				nWse.stAryUtil.cFor(stApp.e_RandWordsNums,
					function (a_Nums, a_Idx, a_Num)
					{
						var l_Img = new Image();
						l_Img.src = "./media/Words/" + a_Num + ".png";
						stApp.e_RandWordsImgs[a_Idx] = l_Img;
					});
			}

			// 加载声音
			if (stApp.e_AudSupt)
			{
				stApp.eLoadAud();
			}
		};

		stApp.eLoadAud = function ()
		{
			if (! stApp.e_AudSupt)
			{ return; }

			stApp.e_Mp3_Baa = new nWse.nAud.tAudRsrc();
			stApp.e_Mp3_Baa.cLoadFromUrl("./media/Baa.mp3");
			stApp.e_Mp3_Coin = new nWse.nAud.tAudRsrc();
			stApp.e_Mp3_Coin.cLoadFromUrl("./media/Coin.mp3");
		};

		// 随机产生不同的整数路径
		function fRandDiffIntNums(a_Rst, a_Amt, a_Min, a_Max)
		{
			if (! a_Rst)
			{ a_Rst = []; }

			var l_Tot = a_Max - a_Min + 1;
			if (a_Amt > l_Tot)
			{ throw new Error("a_Amt大于(a_Max - a_Min + 1)！"); }

			var i, n, l_LoopCnt = 0;
			for (i = 0; i<a_Amt; ++i)
			{
				do
				{
					n = nWse.stNumUtil.cRandInt(a_Min, a_Max);
					++ l_LoopCnt;
				} while ((a_Rst.indexOf(n) >= 0) && (l_LoopCnt < 100)); // 小心长时间跳不出
				a_Rst.push(n);
			}
			return a_Rst;
		}

		stApp.eObtnScrn = function (a_Name)
		{
			return stDomUtil.cQryOne(".mi_scrn.mi_" + a_Name);
		};

		stApp.eShowHideScrnBySta = function (a_Sta, a_Show)
		{
			var l_Name = a_Sta.toString();
			l_Name = l_Name.slice(2, l_Name.length);
			var l_Scrn = stApp.eObtnScrn(l_Name);
			l_Scrn.style.display = a_Show ? "block" : "none";
		};

		// 羊毛状态
		nWse.fEnum(stApp,
			function tFurSta() {},
			null,
			"i_Atch",
			"i_Fly",
			"i_Dspr"
		);

		// 羊div，加入到第一屏，并将宽度改成auto，然后自动计算XY
		stApp.e_SheepDiv = document.getElementById("k_SheepDiv");
		stApp.e_SheepDiv.style.width = "auto";
		stApp.eObtnScrn("Init").appendChild(stApp.e_SheepDiv);
		stApp.e_SheepDivOrigY = stApp.e_SheepDiv.offsetTop;

		stApp.e_SheepShdwDiv = document.getElementById("k_SheepShdwDiv");

		stApp.eSheepPutCen = function ()
		{
			nWse.stCssUtil.cSetPos(stApp.e_SheepDiv,
				(stApp.i_DsnWid / i_DvcPxlRat - stApp.e_SheepDiv.offsetWidth) / 2,
			//	(stApp.e_SheepDiv.parentNode.offsetWidth - stApp.e_SheepDiv.offsetWidth) / 2,
				stApp.e_SheepDivOrigY);
		};
		stApp.eSheepPutCen(); // 羊居中

		// 初始化羊的各个部分
		stApp.e_SheepBody = document.getElementById("k_SheepBody");
		stApp.e_SheepHeads = nWse.stDomUtil.cQryAll(".mi_head");
		stApp.e_SheepFurs = nWse.stDomUtil.cQryAll(".mi_fur");
		nWse.stAryUtil.cFor(stApp.e_SheepFurs,
			function (a_Ary, a_Idx, a_Fur) // 计算坐标，注意缩放比例
			{
				a_Fur.App_Data = { };
				a_Fur.App_Data.App_Sta = stApp.tFurSta.i_Atch;
				a_Fur.App_Data.App_X = parseFloat(a_Fur.getAttribute("data-x")) / 2;
				a_Fur.App_Data.App_Y = parseFloat(a_Fur.getAttribute("data-y")) / 2;

				a_Fur.style.zIndex = (a_Ary.length - a_Idx) + 20;	// 21-30
			});

		stApp.eShowSheepHeadByCssc = function (a_Cssc)
		{
			nWse.stAryUtil.cFor(stApp.e_SheepHeads,
				function (a_Ary, a_Idx, a_Head) // 显示微笑
				{
					if (nWse.stCssUtil.cHasCssc(a_Head, a_Cssc))
					{
						a_Head.style.display = "block";
					}
					else
					{
						a_Head.style.display = "none";
					}
				});
		};

		stApp.eGetAtchFurAmt = function ()
		{
			var l_Rst = 0;
			nWse.stAryUtil.cFor(stApp.e_SheepFurs,
				function (a_Ary, a_Idx, a_Fur)
				{
					if (a_Fur.App_Data.App_Sta == stApp.tFurSta.i_Atch)
					{ ++l_Rst; }
				});
			return l_Rst;
		};

		// 复位羊各个部分
		stApp.eRsetSheepParts = function ()
		{
			// 复位头
			stApp.eShowSheepHeadByCssc("mi_head_smile");

			// 复位羊
			nWse.stAryUtil.cFor(stApp.e_SheepFurs,
				function (a_Ary, a_Idx, a_Fur)
				{
					// 如果在动画里，先结束动画
					nWse.stCssUtil.cFnshAnmt(a_Fur, true, true);

					a_Fur.style.position = "absolute";	// 绝对定位
					a_Fur.style.display = "block";		// 显示出来
					a_Fur.style.opacity = "1";			// 复位不透明度
					nWse.stCssUtil.cSetPos(a_Fur, a_Fur.App_Data.App_X, a_Fur.App_Data.App_Y); // 位置还原
					a_Fur.App_Data.App_Sta = stApp.tFurSta.i_Atch;	// 还原状态
				});
		};
		stApp.eRsetSheepParts();

		// 金币
		stApp.e_CoinCnt = 0;
		stApp.e_CoinCntrDiv = document.getElementById("k_CoinCntrDiv");
		stApp.e_CoinCntr = document.getElementById("k_CoinCntr");

		stApp.eCntDn = function ()
		{
			function fTsitSta_Next()
			{
				l_This.eShowHideScrnBySta(l_This.e_GameSta, false);	// 隐藏第一屏
				l_This.eSttGame();
			}

			var l_This = this;
			if (l_This.e_CntDn <= 0)
			{
				fTsitSta_Next();
				return;
			}

			// 设置初始CSS
			l_This.e_CntDnNum = document.getElementById("k_CntDnNum");
			stCssUtil.cAddCssc(l_This.e_CntDnNum, ("mi_" + l_This.e_CntDn));

			function fCntDn()
			{
				if (l_This.e_CntDn > 0) // 递减计数
				{ --l_This.e_CntDn;	}

				if (l_This.e_CntDn <= 0) // 倒计时完成，开始游戏
				{
					fTsitSta_Next();
				}
				else
				{
					stCssUtil.cRmvCssc(l_This.e_CntDnNum, ("mi_" + (l_This.e_CntDn + 1)));
					stCssUtil.cAddCssc(l_This.e_CntDnNum, ("mi_" + l_This.e_CntDn));
					window.setTimeout(fCntDn, 1000); // 继续
				}
			}

			window.setTimeout(fCntDn, 1000);
		};

		stApp.eTsitStaToCplt = function()
		{
			var l_This = this;
			l_This.eShowHideScrnBySta(l_This.e_GameSta, false);	// 隐藏运行屏
			l_This.e_GameSta = stApp.tGameSta.i_Cplt; // 跳转状态
			l_This.eShowHideScrnBySta(l_This.e_GameSta, true);	// 显示完成瓶

			l_This.eObtnScrn("Cplt").appendChild(stApp.e_CoinCntrDiv);	// 金币加入到完成屏

			l_This.e_AcpPrz = document.getElementById("k_AcpPrz");
		};

		stApp.eSttGame = function ()
		{
			var l_This = this;
			l_This.e_GameSta = stApp.tGameSta.i_Run; // 跳转状态
			l_This.eShowHideScrnBySta(l_This.e_GameSta, true);		// 显示运行屏
			l_This.eTsitSta_RunEnt();	// 进入

			if (l_This.eIsGameTimeUp()) // 继续跳转
			{
				l_This.eTsitStaToCplt();
			}
		};

		stApp.eTsitSta_RunEnt = function ()
		{
			var l_This = this;

			// 羊加入到第二屏
			stApp.eObtnScrn("Run").appendChild(stApp.e_SheepDiv);

			l_This.e_PlayTmr = l_This.e_PlayDur; // 复位倒计时计时器
			if (l_This.eIsGameTimeUp()) // 立即跳转？
			{ return; }

			// 取得UI相关元素
			l_This.e_TimeLine_TensPlc = document.getElementById("k_TimeLine_TensPlc");
			l_This.e_TimeLine_OnesPlc = document.getElementById("k_TimeLine_OnesPlc");
			l_This.e_TimePgrs = document.getElementById("k_TimePgrs");
			l_This.e_TimeSph = document.getElementById("k_TimeSph");

			// 更新CSS类，以匹配JS逻辑
			if (10 != l_This.e_PlayTmr)
			{
				stCssUtil.cRmvCssc(l_This.e_TimeLine_TensPlc, "mi_1");
				stCssUtil.cRmvCssc(l_This.e_TimeLine_OnesPlc, "mi_0");
				l_This.eUpdGameRunUi(true);
			}

			// 倒计时
			function fPlayCntDn()
			{
				if (l_This.e_PlayTmr > 0) // 递减计数
				{ --l_This.e_PlayTmr;	}

				l_This.eUpdGameRunUi(false);

				if (l_This.eIsGameTimeUp()) // 倒计时完成
				{
					// 1秒后再跳转
					window.setTimeout(
						function ()
						{
							// 跳转到完成
							if (stApp.e_GameOver)
							{
								l_This.eTsitStaToCplt();
							}
						}, 1000);
				}
				else
				{
					window.setTimeout(fPlayCntDn, 1000); // 继续
				}
			}

			window.setTimeout(fPlayCntDn, 1000);
		};

		stApp.eRmvCssc_NumRge = function (a_DomElmt, a_Bgn, a_End)
		{
			var l_Num, l_Cssc;
			for (l_Num = a_Bgn; l_Num <= a_End; ++ l_Num)
			{
				l_Cssc = "mi_" + l_Num;
				if (stCssUtil.cHasCssc(a_DomElmt, l_Cssc))
				{
					stCssUtil.cRmvCssc(a_DomElmt, l_Cssc);
					break;
				}
			}
		};

		stApp.eUpdGameRunUi = function (a_WriteOnly)
		{
			var l_This = this;

			if (! a_WriteOnly)
			{
				stApp.eRmvCssc_NumRge(l_This.e_TimeLine_TensPlc, 0, 9);
				stApp.eRmvCssc_NumRge(l_This.e_TimeLine_OnesPlc, 0, 9);
			}

			var l_TensNum = 0, l_OnesNum = 0;
			if (l_This.e_PlayTmr >= 10)
			{
				l_TensNum = Math.floor(l_This.e_PlayTmr / 10);
				stCssUtil.cAddCssc(l_This.e_TimeLine_TensPlc, ("mi_" + l_TensNum));

			}
			else
			{
				l_TensNum = 0;
				if (! stCssUtil.cHasCssc(l_This.e_TimeLine_TensPlc, ("mi_0")))
				{ stCssUtil.cAddCssc(l_This.e_TimeLine_TensPlc, ("mi_0")); }
			}

			l_OnesNum = l_This.e_PlayTmr - l_TensNum * 10;
			stCssUtil.cAddCssc(l_This.e_TimeLine_OnesPlc, ("mi_" + l_OnesNum));

			// 更改进度条宽度
			var l_Pct = Math.round(l_This.e_PlayTmr / l_This.e_PlayDur * 100);
			l_This.e_TimePgrs.style.width = l_Pct + "%";

			// 如果没有时间了，把进度条的球也换成白底
			if (l_This.eIsGameTimeUp())
			{
				stCssUtil.cAddCssc(l_This.e_TimeSph, "mi_emt");
			}

			// 更新话，从第二秒开始
			var l_EachWordsDur, l_CrntWordsIdx, l_PathNum, l_WordsX;
			if (stApp.e_RandWordsAmt > 0)
			{
				l_EachWordsDur = Math.round((stApp.e_PlayDur - 1) / stApp.e_RandWordsAmt);
				l_CrntWordsIdx = Math.floor((stApp.e_PlayDur - 1 - l_This.e_PlayTmr) / l_EachWordsDur);
				if ((l_CrntWordsIdx < stApp.e_RandWordsImgs.length) &&
					(stApp.e_WrodsImg.src != stApp.e_RandWordsImgs[l_CrntWordsIdx].src))
				{
					stApp.e_WrodsImg.src = stApp.e_RandWordsImgs[l_CrntWordsIdx].src;

					l_PathNum = stApp.e_RandWordsNums[l_CrntWordsIdx];
					l_WordsX = parseFloat(stApp.e_WrodsImg.parentNode.getAttribute(
						(l_PathNum % 2) ? "data-odd_x" : "data-even-x"));
					stApp.e_WrodsImg.parentNode.style.left = l_WordsX + "px";
				}
			}
		};

		stApp.eIsGameTimeUp = function ()
		{
			return (this.e_PlayTmr <= 0);
		};

		stApp.eHdlIpt = function (a_Ipt)
		{
			var l_This = this;

			var l_DmntTch = a_Ipt.c_Tchs[0];
		//	console.log(l_DmntTch.c_Kind.toString());
			var l_EvtTgt = l_DmntTch.cAcsEvtTgt();

			// 运行状态
			if (stApp.tGameSta.i_Run == l_This.e_GameSta)
			{
				l_This.eHdlIpt_StaRun(a_Ipt);
			}
			else // 完成状态
			if (stApp.tGameSta.i_Cplt == l_This.e_GameSta)
			{
				l_This.eHdlIpt_StaCplt(a_Ipt);
			}

			// 不要再继续处理
			nWse.stAryUtil.cFor(a_Ipt.c_Tchs,
			function (a_Tchs, a_Idx, a_Tch)
			{
				a_Tch.c_Hdld = true;
			});
			return false;
		};

		stApp.eHdlIpt_StaRun = function (a_Ipt)
		{
			var l_This = this;
			var l_Tchs = a_Ipt.c_Tchs;

			// 对每个触点
			nWse.stAryUtil.cFor(l_Tchs,
				function (a_Tchs, a_TchIdx, a_Tch)
				{
					// 只处理i_TchBgn
					if (tPntIptKind.i_TchBgn != a_Tch.c_Kind)
					{ return; }

					// 如果点中羊毛
					var l_EvtTgt = a_Tch.cAcsEvtTgt();
					var l_FurIdx = l_This.e_SheepFurs.indexOf(l_EvtTgt);
					if (l_FurIdx >= 0)
					{
					//	console.log("羊毛");
						stApp.eHdlIpt_Fur(l_FurIdx);
					}
				});
		};

		stApp.eHdlIpt_Fur = function (a_FurIdx)
		{
			var l_This = this;
			var l_Fur = l_This.e_SheepFurs[a_FurIdx];

			// 非附着状态不处理！
			if (l_Fur.App_Data.App_Sta != stApp.tFurSta.i_Atch)
			{
				return;
			}

			// 更新金币
			++ stApp.e_CoinCnt;
			nWse.stDomUtil.cSetTextCtnt(stApp.e_CoinCntr,
				(((stApp.e_CoinCnt < 10) ? "0" : "") + stApp.e_CoinCnt.toString()));

			// 羊毛渐隐动画
		//	l_Fur.style.display = "none";
		//	l_Fur.App_Data.App_Sta = stApp.tFurSta.i_Dspr;	// 消失
			l_Fur.App_Data.App_Sta = stApp.tFurSta.i_Fly;	// 飞行
			nWse.stCssUtil.cAnmt(l_Fur,
				{
					"opacity": 0
				},
				{
					c_Dur: stApp.e_FurAnmtDur
				//	,c_fEsn: stNumUtil.cEsn_FastToSlow
					,c_fOnEnd: function (a_Fur)
					{
						// 复位样式
						l_Fur.style.display = "none";
						l_Fur.style.opacity = "1";
						l_Fur.App_Data.App_Sta = stApp.tFurSta.i_Dspr;	// 消失
					}
				});

			//// 复位样式
			//l_Fur.style.display = "none";
			//l_Fur.style.opacity = "1";
			//l_Fur.App_Data.App_Sta = stApp.tFurSta.i_Dspr;	// 消失

			// 更新羊头表情
			var l_RmnFurAmt = stApp.eGetAtchFurAmt();
			if (l_RmnFurAmt <= stApp.e_RmnForCry)
			{
				stApp.eShowSheepHeadByCssc("mi_head_cry");

				// 播放羊叫
				if (l_RmnFurAmt == stApp.e_RmnForCry)
				{
					fPlayMp3(stApp.e_Mp3_Baa);
				}
			}
			else
			if (l_RmnFurAmt <= stApp.e_RmnForSad)
			{
				stApp.eShowSheepHeadByCssc("mi_head_sad");

				// 播放羊叫
				if (l_RmnFurAmt == stApp.e_RmnForSad)
				{
					fPlayMp3(stApp.e_Mp3_Baa);
				}
			}

			// 播放金币
			fPlayMp3(stApp.e_Mp3_Coin);

			// 如果一片毛不剩
			if (0 == l_RmnFurAmt)
			{
				// 换羊
				l_This.eChgSheep();
			}
		};

		stApp.eChgSheep = function ()
		{
			var l_This = this;

			var i_Dur = stApp.e_SheepJumpAnmtDur;

			function fDplc(a_Rst, a_DomElmt, a_Bgn, a_End,
						   a_NmlScl, a_EsnScl, a_FrmTime, a_FrmItvl, a_FrmNum)
			{
				// w = 2π/T，加绝对值成π/T，若要过程含两个周期，则再×2，得π/T * 2
				var l_Omg = Math.PI / i_Dur * 2;
				var l_DtaY = -stApp.e_SheepJumpAmp * Math.abs(Math.sin(l_Omg * a_FrmTime));
				a_Rst.y += l_DtaY;
			}

			// 动画期间可能屏幕朝向改变，重新校准
			//l_This.eRsetSheepParts(); // 复位羊各个部分
			//stApp.eSheepPutCen(); // 羊居中;
			//stApp.e_SheepShdwDiv.style.visibility = "visible"; // 显示阴影

		//	/*
			// 先离开
			nWse.stCssUtil.cAnmt(l_This.e_SheepDiv,
				{
				//	"left": (-l_This.e_SheepDiv.offsetWidth) + "px"
					"left": "-187px"
				},
				{
					c_Dur: i_Dur
				//	,c_fEsn: nWse.stNumUtil.cEsn_SlowToFast
				//	,c_fDplc: fDplc
				//	,c_fOnEnd: fOnLea
				});

			stApp.e_SheepShdwDiv.style.visibility = "hidden"; // 隐藏阴影

			// 后进入
			function fOnLea()
			{
				l_This.eRsetSheepParts(); // 复位羊各个部分

				nWse.stCssUtil.cSetPos(l_This.e_SheepDiv, stApp.i_DsnWid / i_DvcPxlRat, stApp.e_SheepDivOrigY);
				var l_CtX = (stApp.i_DsnWid / i_DvcPxlRat - stApp.e_SheepDiv.offsetWidth) / 2;

				nWse.stCssUtil.cAnmt(l_This.e_SheepDiv,
					{
						"left": (l_CtX) + "px"
					},
					{
						c_Dur: i_Dur
					//	,c_fEsn: nWse.stNumUtil.cEsn_SlowToFast
					//	,c_fDplc: fDplc
						,c_fOnEnd: function ()
						{
							// 动画期间可能屏幕朝向改变，重新校准
							stApp.eSheepPutCen(); // 羊居中;
							stApp.e_SheepShdwDiv.style.visibility = "visible"; // 显示阴影
						}
					});
			}
			//*/
		};

		stApp.eHdlIpt_StaCplt = function (a_Ipt)
		{
			var l_This = this;

			var l_DmntTch = a_Ipt.c_Tchs[0];
			var l_EvtTgt = l_DmntTch.cAcsEvtTgt();

			// 只处理i_TchBgn
			if (tPntIptKind.i_TchBgn != l_DmntTch.c_Kind)
			{
				return false;
			}

			// 去领红包？
			if (l_This.e_AcpPrz && stDomUtil.cIsSelfOrAcst(l_This.e_AcpPrz, l_EvtTgt))
			{
				console.log("去领红包！");
			}
		};
	});

	// 窗口加载
	nWse.stPageInit.cAddEvtHdlr_WndLoad(function ()
	{
		console.log("window.onload");

		// 初始化
		nApp.stApp.cInit();
	});

})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////