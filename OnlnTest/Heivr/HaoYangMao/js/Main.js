(function ()
{
	//========================================================= 配置

	// 设计宽高，iPhone6
	var i_DsnWid = 750, i_DsnHgt = 1334;

	// 声音支持？
	var i_AudSupt = true;

	// 开始游戏倒计时（秒），∈整数[0, 5]
	var i_CntDn = 0;

	// 游戏时长（秒），∈整数[0, 99]
	var i_PlayDur = 10;

	// 时间到时结束游戏？
	var i_GameOver = false;

	// 当剩余多少羊毛时，羊头变成难过，∈整数[1, 9]
	var i_RmnForSad = 6;

	// 当剩余多少羊毛时，羊头变成大哭，∈整数[0, i_RmnForSad - 1]
	var i_RmnForCry = 2;

	// 羊毛动画时长（秒）
	var i_FurAnmtDur = 0.2;

	// 羊跳动画时长（秒）
	var i_SheepJumpAnmtDur = 0.8;

	// 羊跳动随机速率范围（像素）
	var i_SheepJumpRandSpdRge = 20;

	// 羊跳振幅（像素）
	var i_SheepJumpAmp = 50;

	// 话总数，∈[0, 8]整数
	var i_WordsTot = 8;

	// 随机产生几句？
	var i_RandWordsAmt = 3;

	//========================================================= 启动

	nWse.stPageInit.cAddEvtHdlr_DocRdy(function ()
	{
	});

	nWse.stPageInit.cAddEvtHdlr_WndLoad(function ()
	{
		console.log("window.onload");

		// 开始
		nApp.g_RltmAfx = new nWse.tRltmAfx();
		nApp.g_RltmAfx.cInit({
			c_PrstSrc: "k_PrstSrc"
			,c_PrstTgt: "k_PrstTgt"
			,c_AdpMode: nWse.tRltmAfx.tAdpMode.i_FullScrn
			,c_App: new nApp.tApp()
		});

		nApp.g_RltmAfx.cRun();
	});

	//========================================================= tApp

	// 常用
	var stNumUtil = nWse.stNumUtil;
	var stAryUtil = nWse.stAryUtil;
	var stDomUtil = nWse.stDomUtil;
	var tPntIptKind = nWse.tPntIptTrkr.tPntIpt.tKind;

	// 应用程序
	nWse.fClass(nApp,
		function tApp()
		{
			tApp.oc_tBase.call(this);

			var l_This = this;
		},
		nWse.tRltmAfx.atApp,
		{
			/// 当初始化时
			vdOnInit: function ()
			{
				var l_This = this;

				// 有限状态机
				l_This.e_Fsm = new nWse.tFsm();
				l_This.e_Fsm.cRegSta(new nApp.tApp.tGameSta_Rdy(l_This));
				l_This.e_Fsm.cRegSta(new nApp.tApp.tGameSta_Run(l_This));
				l_This.e_Fsm.cRegSta(new nApp.tApp.tGameSta_Cplt(l_This));
				l_This.e_Fsm.cTsit(l_This.e_Fsm.cAcsStaAry()[0].cGetName());	// 进入首个状态

				// 画布和图形设备
				l_This.e_Dom_Canv = document.getElementById("k_2dCanv");
				l_This.e_GpuDvc = new nWse.nGpu.tGpuDvc();
				l_This.e_GpuDvc.cBindCanv(l_This.e_Dom_Canv);
				l_This.e_2dDvcCtxt = l_This.e_GpuDvc.cCrt2dDvcCtxt(null);

				// 点输入追踪器
				l_This.e_PIT = new nWse.tPntIptTrkr();
				l_This.e_PIT.cInit({
					c_HdlMode: 1
				});
				l_This.e_PIT.cSetImdtHdlr(nWse.stFctnUtil.cBindThis(l_This, l_This.eHdlIpt));
			}
			,
			/// 当退出时
			vdOnExit: function ()
			{
			}
			,
			/// 当呈现目标重置时
			vdOnPrstTgtRset: function ()
			{
				var l_This = this;
				l_This.e_GlbScl = nWse.fCalcGlbScl(l_This.e_GlbScl, i_DsnWid, i_DsnHgt);
				nApp.g_GlbScl = l_This.e_GlbScl;
				console.log("e_GlbScl.c_CtanScl = " + l_This.e_GlbScl.c_CtanScl);

				// 校准画布尺寸
				var l_PrstTgt = nApp.g_RltmAfx.cAcsPrstTgt();
				l_This.e_GpuDvc.cSetCanvDim(l_PrstTgt.offsetWidth, l_PrstTgt.offsetHeight);

				// 将所有非跳离的羊摆放到屏幕中央，注意这里不需要锁定
				if (l_This.e_SheepAry)
				{
					stAryUtil.cFor(l_This.e_SheepAry.cAcsAry(),
						function (a_SheepAry, a_SheepIdx, a_Sheep)
						{
							if (2 == a_Sheep.e_Sta)
							{ return; }

							a_Sheep.cCenPut(true);
						});
				}
			}
			,
			/// 当呈现目标丢失时
			vdOnPrstTgtLost: function ()
			{
			}
			,
			/// 当更新时
			vdOnUpd: function ()
			{
				var l_This = this;
				l_This.e_Fsm.cUpd();
			}
			,
			/// 当更新到渲染时
			vdOnUpdToRnd: function ()
			{
				var l_This = this;
				l_This.e_Fsm.cUpdToRnd();
			}
			,
			/// 当渲染时
			vdOnRnd: function ()
			{
				var l_This = this;
				l_This.e_Fsm.cRnd();
			}
			,
			eHdlIpt : function (a_Ipt)
			{
				var l_This = this;

				// 交给状态处理
				if (l_This.e_Fsm.cAcsSta())
				{
					l_This.e_Fsm.cAcsSta().vcHdlIpt(a_Ipt);
				}

				// 不要再继续处理
				stAryUtil.cFor(a_Ipt.c_Tchs,
					function (a_Tchs, a_Idx, a_Tch)
					{
						a_Tch.c_Hdld = true;
					});
				return false;
			}
			,
			eAddSheep: function ()
			{
				var l_This = this;
				var l_Sheep = new nApp.tApp.tSheep(l_This);
				l_This.e_SheepAry.cReg(l_Sheep);
				console.log("注册一只羊");
				return l_Sheep;
			}
			,
			eOnSheepOver: function (a_Sheep)
			{
				var l_This = this;

				// 跳离
				a_Sheep.cJumpOut();

				// 添加一只新羊，跳入
				var l_NewSheep = l_This.eAddSheep();
				l_NewSheep.cJumpIn();
			}
		});

	// 游戏状态
	nWse.fClass(nApp.tApp,
		function tGameSta(a_App, a_Name)
		{
			tGameSta.oc_tBase.call(this, a_Name);

			var l_This = this;
			l_This.d_App = a_App;
		},
		nWse.tFsm.atSta,
		{
			vcHdlIpt: function (a_Ipt)
			{
				// 派生类实现
			}
			,
			dGetCtanScl: function ()
			{
				return this.d_App.e_GlbScl.c_CtanScl;
			}
			,
			dClrCanv: function ()
			{
				// 清空画布
				//【必须清，否则可能产生锯齿？！
				// 因为其中包含透明，重复叠加会产生色块！】
				this.d_App.e_2dDvcCtxt.cClr();
			}
			,
			dAcs2dDvcCtxt: function ()
			{
				return this.d_App.e_2dDvcCtxt;
			}
			,
			dMapWithCenScl : function (a_Y, a_Img, a_SrcSara)
			{
				var l_DvcCtxt = this.dAcs2dDvcCtxt();
				var l_DstSara = l_DvcCtxt.c_MapDstSara;
				l_DstSara.c_Y = a_Y;
				l_DstSara.c_W = a_SrcSara ? a_SrcSara.c_W : a_Img.width;
				l_DstSara.c_H = a_SrcSara ? a_SrcSara.c_H : a_Img.height;
				nApp.fCenSclSara(l_DstSara);
				l_DvcCtxt.cMap(l_DstSara, a_Img, a_SrcSara);
			}
			,
			dUpdSheep: function ()
			{
				var l_This = this;

				// 这里需要锁定遍历，因为cUpd可能会修改e_SheepAry
				var l_LockAry = l_This.d_App.e_SheepAry;
				l_LockAry.cFor(function (a_Ary)
				{
					var i;
					for (i = 0; i<a_Ary.length; ++i)
					{
						a_Ary[i].cUpd();

						// 如果已经消失，注销
						if (-1 == a_Ary[i].e_Sta)
						{
							l_LockAry.cUrg(a_Ary[i]);
							console.log("注销一只羊");
						}
					}
				});
			}
			,
			dRndSheep: function ()
			{
				var l_This = this;

				// 这里需要锁定遍历，因为cUpd可能会修改e_SheepAry
				var l_LockAry = l_This.d_App.e_SheepAry;
				var l_Ary = l_LockAry.cAcsAry();
				var i;
				for (i = 0; i<l_Ary.length; ++i)
				{
					l_Ary[i].cRnd();
				}
			}
			,
			dPickSheepAndFur: function (a_Rst, a_X, a_Y)
			{
				a_Rst.c_SheepIdx = -1;
				a_Rst.c_FurIdx = -1;

				var l_This = this;

				// 下面的遍历，只查询，故不用锁定（成员函数cFor）
				var l_LockAry = l_This.d_App.e_SheepAry;
				var l_Ary = l_LockAry.cAcsAry();
				var i, l_Sheep, l_FurIdx;
				for (i = 0; i<l_Ary.length; ++i)
				{
					l_Sheep = l_Ary[i];
					if (2 == l_Sheep.e_Sta) // 跳过正在离开的羊
					{ continue; }

					l_FurIdx = l_Sheep.cPickFur(a_X, a_Y);
					if (l_FurIdx >= 0)
					{
						a_Rst.c_SheepIdx = i;
						a_Rst.c_FurIdx = l_FurIdx;
						break;
					}
				}
				return a_Rst;
			}
		});

	// 准备
	nWse.fClass(nApp.tApp,
		function tGameSta_Rdy(a_App)
		{
			tGameSta_Rdy.oc_tBase.call(this, a_App, "Rdy");

			var l_This = this;
			l_This.e_CntDnTmr = new nWse.tFxdItvlTmr();
			l_This.e_CntDnTmr.cInit({
				c_TotDur: i_CntDn
				,c_ItvlDur: 1
				,c_CntDn: true
				,c_fOnStep: nWse.stFctnUtil.cBindThis(l_This, l_This.eOnCntDnStep)
				,c_fOnCplt: nWse.stFctnUtil.cBindThis(l_This, l_This.eOnCntDnCplt)
			});
		},
		nApp.tApp.tGameSta,
		{
			/// 进入
			/// a_Prev：atSta，前一个状态
			vcEnt : function (a_Prev)
			{
				var l_This = this;

				// 载入图像
				l_This.e_Img_PopupRdy = new Image();
				l_This.e_Img_PopupRdy.src = "media/PopupRdy.png";
				l_This.e_Img_CntDn = new Image();
				l_This.e_Img_CntDn.src = "media/CountDown.png";

				// 羊数组，使用带锁数组
				nApp.tApp.tSheep.scInit();
				l_This.d_App.e_SheepAry = new nWse.tLockAry(null, null,
					function fFor(a_Ary, a_Agms)
					{
						a_Agms[0](a_Ary); // 再次回调
					});
				l_This.d_App.eAddSheep();	// 添加羊

				// 开始倒计时
				l_This.e_CntDnTmr.cRun();
			}
			,
			/// 离开
			/// a_Next：atSta，后一个状态
			vcLea : function (a_Next)
			{
				//
			}
			,
			/// 更新
			vcUpd : function ()
			{
				//
			}
			,
			/// 更新到渲染
			vcUpdToRnd: function ()
			{
				//
			}
			,
			/// 渲染
			vcRnd : function ()
			{
				var l_This = this;
			//	console.log("vcRnd");

				// 清空画布
				l_This.dClrCanv();

				// 贴图
				if (nWse.nGpu.fIsImgAvlb(l_This.e_Img_PopupRdy))
				{
					l_This.dMapWithCenScl(160, l_This.e_Img_PopupRdy);
				}

				if (nWse.nGpu.fIsImgAvlb(l_This.e_Img_CntDn))
				{
					l_This.dAcs2dDvcCtxt().c_MapSrcSara.cInit(
						60 * (l_This.e_CntDnTmr.cGetCrntTime() - 1), 0,
						60, l_This.e_Img_CntDn.height);
					l_This.dMapWithCenScl(446, l_This.e_Img_CntDn, l_This.dAcs2dDvcCtxt().c_MapSrcSara);
				}

				// 羊
				l_This.dRndSheep();
			}
			,
			eOnCntDnStep: function (a_Tmr)
			{

			}
			,
			eOnCntDnCplt: function (a_Tmr)
			{
				var l_This = this;

				// 跳转状态
				l_This.d_App.e_Fsm.cTsit("Run");
			}
		});

	// 运行
	nWse.fClass(nApp.tApp,
		function tGameSta_Run(a_App)
		{
			tGameSta_Run.oc_tBase.call(this, a_App, "Run");

			var l_This = this;
		},
		nApp.tApp.tGameSta,
		{
			/// 进入
			/// a_Prev：atSta，前一个状态
			vcEnt : function (a_Prev)
			{
				//
			}
			,
			/// 离开
			/// a_Next：atSta，后一个状态
			vcLea : function (a_Next)
			{
				//
			}
			,
			/// 更新
			vcUpd : function ()
			{
				var l_This = this;

				// 羊
				l_This.dUpdSheep();
			}
			,
			/// 更新到渲染
			vcUpdToRnd: function ()
			{
				//
			}
			,
			/// 渲染
			vcRnd : function ()
			{
				var l_This = this;

				// 清空画布
				l_This.dClrCanv();

				// 羊
				l_This.dRndSheep();
			}
			,
			vcHdlIpt: function (a_Ipt)
			{
				var l_This = this;

				l_PickRst = {};

				// 对每个触点
				stAryUtil.cFor(a_Ipt.c_Tchs,
					function (a_Tchs, a_TchIdx, a_Tch)
					{
						// 拾取羊
						l_This.dPickSheepAndFur(l_PickRst, a_Tch.c_X, a_Tch.c_Y);
						if (l_PickRst.c_SheepIdx < 0)
						{ return; }

					//	console.log(l_PickRst.c_FurIdx);

						// 处理羊毛
						l_This.d_App.e_SheepAry.cAcsElmt(l_PickRst.c_SheepIdx).cHaoFur(l_PickRst.c_FurIdx, a_Tch);
					});

			//	console.log(a_Ipt.c_Tchs[0].c_Kind.toString());
			}
		});

	// 完成
	nWse.fClass(nApp.tApp,
		function tGameSta_Cplt(a_App)
		{
			tGameSta_Cplt.oc_tBase.call(this, a_App, "Cplt");

			var l_This = this;
		},
		nApp.tApp.tGameSta,
		{
			/// 进入
			/// a_Prev：atSta，前一个状态
			vcEnt : function (a_Prev)
			{
				//
			}
			,
			/// 离开
			/// a_Next：atSta，后一个状态
			vcLea : function (a_Next)
			{
				//
			}
			,
			/// 更新
			vcUpd : function ()
			{
				//
			}
			,
			/// 更新到渲染
			vcUpdToRnd: function ()
			{
				//
			}
			,
			/// 渲染
			vcRnd : function ()
			{
				//
			}
		});

	// 羊
	nWse.fClass(nApp.tApp,
		function tSheep(a_App)
		{
			this.e_App = a_App;

			// 状态：0=居中，1=进入，2=离开，-1=消失
			this.e_Sta = 0;
			this.e_JumpSpd = 0;		// 跳动速率
			this.e_JumpTmr = 0;

			// e_Pos相对于画布
			this.e_Pos = new nWse.nGpu.t4dVct(0, 0);
			this.cCenPut(true);

			// 羊身
			this.e_BodyWid = 373;
			this.e_BodyHgt = 336;
			this.e_PosRelToImgOfstX = -this.e_BodyWid / 2;	// e_Pos相对于图像左上角的偏移
			this.e_PosRelToImgOfstY = -this.e_BodyHgt;

			// 羊头
			this.e_HeadWid = 386;
			this.e_HeadHgt = 346;
			this.e_HeadAry = new Array(3);
			this.e_HeadIdx = 0;
			var l_HeadDstX = (this.e_BodyWid - this.e_HeadWid) / 2, l_HeadDstY = -301;
			this.e_HeadAry[0] = { c_DstX : l_HeadDstX, c_DstY : l_HeadDstY, c_SrcSara: new nWse.tSara(374, 0, this.e_HeadWid, this.e_HeadHgt) };
			this.e_HeadAry[1] = { c_DstX : l_HeadDstX, c_DstY : l_HeadDstY, c_SrcSara: new nWse.tSara(761, 0, this.e_HeadWid, this.e_HeadHgt) };
			this.e_HeadAry[2] = { c_DstX : l_HeadDstX, c_DstY : l_HeadDstY, c_SrcSara: new nWse.tSara(1148, 0, this.e_HeadWid, this.e_HeadHgt) };

			// 羊毛
			var l_FurABCSrcX = 1535;
			var l_FurASrcY = 0, l_FurBSrcY = 104, l_FurCSrcY = 218;
			var l_FurAWid = 148, l_FurBWid = 126, l_FurCWid = 117;
			var l_FurAHgt = 103, l_FurBHgt = 113, l_FurCHgt = 82;
			this.e_FurAry = new Array(10);
			this.e_FurAry[0] = { c_DstX : 27, c_DstY : 45, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurBSrcY, l_FurBWid, l_FurBHgt) };
			this.e_FurAry[1] = { c_DstX : 132, c_DstY : 6, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurASrcY, l_FurAWid, l_FurAHgt) };
			this.e_FurAry[2] = { c_DstX : 134, c_DstY : 115, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurASrcY, l_FurAWid, l_FurAHgt) };
			this.e_FurAry[3] = { c_DstX : 192, c_DstY : 53, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurASrcY, l_FurAWid, l_FurAHgt) };
			this.e_FurAry[4] = { c_DstX : 74, c_DstY : 142, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurBSrcY, l_FurBWid, l_FurBHgt) };
			this.e_FurAry[5] = { c_DstX : 164, c_DstY : 142, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurBSrcY, l_FurBWid, l_FurBHgt) };
			this.e_FurAry[6] = { c_DstX : 206, c_DstY : 99, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurBSrcY, l_FurBWid, l_FurBHgt) };
			this.e_FurAry[7] = { c_DstX : 29, c_DstY : 121, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurASrcY, l_FurAWid, l_FurAHgt) };
			this.e_FurAry[8] = { c_DstX : 122, c_DstY : 61, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurCSrcY, l_FurCWid, l_FurCHgt) };
			this.e_FurAry[9] = { c_DstX : 74, c_DstY : 8, c_SrcSara: new nWse.tSara(l_FurABCSrcX, l_FurCSrcY, l_FurCWid, l_FurCHgt) };
			stAryUtil.cFor(this.e_FurAry,
				function (a_FurAry, a_FurIdx, a_Fur)
				{
					a_Fur.c_Sta = 0;
					a_Fur.c_Tmr = 0;
				});

			// 其他
			this.e_TempSara = new nWse.tSara();
		},
		null,
		{
			cCenPut: function (a_BslnY)
			{
				this.e_Pos.x = stDomUtil.cGetVwptWid() / 2;
				if (a_BslnY)
				{
					this.e_Pos.y = this.cCalcBslnY();
				}
				return this;
			}
			,
			cCalcBslnY : function ()
			{
				return 1200 * nApp.g_GlbScl.c_CtanScl;
			}
			,
			eRandJumpSpd: function ()
			{
				// 随机跳动速率，约(半屏宽+半羊宽)/i_SheepJumpAnmtDur（像素/秒）
				var l_This = this;
				var l_JumpStdSpd = (stDomUtil.cGetVwptWid() / 2 + l_This.e_BodyWid * nApp.g_GlbScl.c_CtanScl / 2) / i_SheepJumpAnmtDur;
				l_This.e_JumpSpd = l_JumpStdSpd + stNumUtil.cRandInt(-i_SheepJumpRandSpdRge, +i_SheepJumpRandSpdRge);
			}
			,
			cJumpOut: function ()
			{
				var l_This = this;

				l_This.e_Sta = 2;	// 跳转状态
				l_This.e_JumpTmr = 0;
				l_This.eRandJumpSpd();
			}
			,
			cJumpIn: function ()
			{
				var l_This = this;

				l_This.e_Sta = 1;	// 跳转状态
				l_This.e_JumpTmr = stNumUtil.cRand(0, i_SheepJumpAnmtDur);	// 来一个随机时间偏移，避免和跳离的羊同步跳！
				l_This.eRandJumpSpd();

				// 摆到屏幕右侧
				l_This.e_Pos.x = stDomUtil.cGetVwptWid() + l_This.e_BodyWid * nApp.g_GlbScl.c_CtanScl / 2;
			}
			,
			eCalcJumpDtaY : function ()
			{
				// w = 2π/T
				var l_Omg = 2 * Math.PI / i_SheepJumpAnmtDur;
				var l_DtaY = -i_SheepJumpAmp * Math.abs(Math.sin(l_Omg * this.e_JumpTmr));
				return l_DtaY;
			}
			,
			cUpd: function ()
			{
				var l_This = this;

				var l_FrmItvl = nApp.g_RltmAfx.cGetFrmItvl();

				// 更新羊身
				if (1 == l_This.e_Sta) // 正在进入
				{
					(function ()
					{
						l_This.e_Pos.x -= l_This.e_JumpSpd * l_FrmItvl;
						l_This.e_JumpTmr += l_FrmItvl;
						var l_BslnY = l_This.cCalcBslnY();
						l_This.e_Pos.y = l_BslnY + l_This.eCalcJumpDtaY();

						// 已经居中？注意脚必须落地，误差的设置很关键！
						var l_AVW = stDomUtil.cGetVwptWid() / 2;
						var l_ABW = l_This.e_BodyWid * nApp.g_GlbScl.c_CtanScl / 2;
						if (((l_This.e_Pos.x < l_AVW + l_ABW / 2) &&	// 在偏左一点
							stNumUtil.cEq(l_This.e_Pos.y, l_BslnY, 10)) ||
							(l_This.e_Pos.x < l_ABW))	// 跳到这里必须停下，防止跳出去！
						{
							l_This.e_Sta = 0;
							l_This.e_Pos.y = l_BslnY;	// 强制
						}
					})();
				}
				else
				if (2 == l_This.e_Sta) // 正在离开
				{
					(function ()
					{
						l_This.e_Pos.x -= l_This.e_JumpSpd * l_FrmItvl;
						l_This.e_JumpTmr += l_FrmItvl;
						l_This.e_Pos.y = l_This.cCalcBslnY() + l_This.eCalcJumpDtaY();

						// 已经消失？
						if (l_This.e_Pos.x + l_This.e_BodyWid * nApp.g_GlbScl.c_CtanScl / 2 < 0)
						{
							l_This.e_Sta = -1;
						}
					})();
				}

				if (-1 == l_This.e_Sta) // 已经消失？
				{
					return;
				}

				// 更新羊毛，注意反向遍历，与图层顺序保持一致
				stAryUtil.cRvsFor(l_This.e_FurAry,
					function (a_FurAry, a_FurIdx, a_Fur)
					{
						var l_Fur = a_Fur;
						if (2 == l_Fur.c_Sta) // 跳过消失的羊毛
						{ return; }

						if (1 == l_Fur.c_Sta) // 更新计时器
						{
							l_Fur.c_Tmr += l_FrmItvl;
							if (l_Fur.c_Tmr >= i_FurAnmtDur) // 超时，跳转状态
							{
								l_Fur.c_Sta = 2; // 消失
							}
						//	return;
						}
						// 附着状态
					});
			}
			,
			cRnd: function ()
			{
				var l_This = this;

				var l_DvcCtxt = l_This.e_App.e_2dDvcCtxt;
				var l_MapDstSara = l_DvcCtxt.c_MapDstSara;
				var l_MapSrcSara = l_DvcCtxt.c_MapSrcSara;

				// 渲染羊身
				l_MapDstSara.cInit(l_This.eFromRelToBodyX(0), l_This.eFromRelToBodyY(0), l_This.e_BodyWid, l_This.e_BodyHgt);
				l_This.eSclAndTslt(l_MapDstSara);
				l_MapSrcSara.cInit(0, 0, l_This.e_BodyWid, l_This.e_BodyHgt);

			//	l_DvcCtxt.cCastShdw(0, 10, 10, nWse.tClo.i_Black);
				l_DvcCtxt.cMap(l_MapDstSara, l_This.constructor.se_SpriImg, l_MapSrcSara);
			//	l_DvcCtxt.cZeroShdw();

				// 渲染羊毛，注意反向遍历，与图层顺序保持一致
				stAryUtil.cRvsFor(l_This.e_FurAry,
					function (a_FurAry, a_FurIdx, a_Fur)
					{
						var l_Fur = a_Fur;
						if (2 == l_Fur.c_Sta) // 跳过消失的羊毛
						{ return; }

						// 调整透明度
						var l_Aph = 1;
						if (1 == l_Fur.c_Sta)
						{
							l_Aph = 1 - (l_Fur.c_Tmr / i_FurAnmtDur);
						}
						l_DvcCtxt.cSetAph(l_Aph);

						l_This.eCalcFurDstSara(l_MapDstSara, l_Fur);
						l_DvcCtxt.cMap(l_MapDstSara, l_This.constructor.se_SpriImg, l_Fur.c_SrcSara);
					});

				l_DvcCtxt.cRsetAph();	// 复位

				// 渲染羊头
				var l_Head = l_This.e_HeadAry[l_This.e_HeadIdx];
				l_MapDstSara.cInit(l_This.eFromRelToBodyX(l_Head.c_DstX), l_This.eFromRelToBodyY(l_Head.c_DstY),
					l_Head.c_SrcSara.c_W, l_Head.c_SrcSara.c_H);
				l_This.eSclAndTslt(l_MapDstSara);
				l_DvcCtxt.cMap(l_MapDstSara, l_This.constructor.se_SpriImg, l_Head.c_SrcSara);
				return this;
			}
			,
			cPickFur: function (a_X, a_Y)
			{
				// 遍历羊毛，注意反向遍历，与图层顺序保持一致
				var l_This = this;
				var l_Idx = stAryUtil.cRvsFind(l_This.e_FurAry,
					function (a_FurAry, a_FurIdx, a_Fur)
					{
						var l_Fur = a_Fur;
						if (0 != l_Fur.c_Sta) // 跳过非附着状态的羊毛
						{ return; }

						l_This.eCalcFurDstSara(l_This.e_TempSara, l_Fur);
						return nWse.tSara.scCtan$Xy(l_This.e_TempSara, a_X, a_Y);
					});
				return l_Idx;
			}
			,
			cHaoFur: function (a_FurIdx, a_Tch)
			{
				// 只处理i_TchBgn
				if (tPntIptKind.i_TchBgn != a_Tch.c_Kind)
				{ return; }

				var l_This = this;
				var l_Fur = l_This.e_FurAry[a_FurIdx];

				// 羊毛状态机：0=附着，1=掉落，2=消失
				if (0 != l_Fur.c_Sta) // 跳过非附着状态的羊毛
				{
					return;
				}

				l_Fur.c_Sta = 1;	// 开始掉落
				l_Fur.c_Tmr = 0;	// 复位计时器

				// 统计剩余羊毛，更换羊头
				var l_RmnFurAmt = l_This.eCalcRmnAtchFur();

				if (l_RmnFurAmt <= i_RmnForCry)
				{
					l_This.e_HeadIdx = 2;
				}
				else
				if (l_RmnFurAmt <= i_RmnForSad)
				{
					l_This.e_HeadIdx = 1;
				}

				// 如果没有毛了
				if (0 == l_RmnFurAmt)
				{
					// 通知应用程序
					l_This.e_App.eOnSheepOver(l_This);
				}
			}
			,
			eHasAtchFur: function ()
			{
				var l_This = this;
				return (stAryUtil.cFind(l_This.e_FurAry,
					function (a_FurAry, a_FurIdx, a_Fur)
					{
						return (0 == a_Fur.c_Sta);
					}) >= 0);
			}
			,
			eCalcRmnAtchFur: function ()
			{
				var l_This = this;
				var l_Rst = 0;
				stAryUtil.cFind(l_This.e_FurAry,
					function (a_FurAry, a_FurIdx, a_Fur)
					{
						if (0 == a_Fur.c_Sta)
						{ ++ l_Rst; }
					});
				return l_Rst;
			}
			,
			eFromRelToBodyX: function (a_X)
			{
				return this.e_PosRelToImgOfstX + a_X;
			}
			,
			eFromRelToBodyY: function (a_Y)
			{
				return this.e_PosRelToImgOfstY + a_Y;
			}
			,
			eSclAndTslt: function (a_Sara)
			{
				nApp.fSclSara(a_Sara);
				a_Sara.c_X += this.e_Pos.x;
				a_Sara.c_Y += this.e_Pos.y;
				return a_Sara;
			}
			,
			eCalcFurDstSara: function (a_Rst, a_Fur)
			{
				a_Rst.cInit(this.eFromRelToBodyX(a_Fur.c_DstX), this.eFromRelToBodyY(a_Fur.c_DstY),
					a_Fur.c_SrcSara.c_W, a_Fur.c_SrcSara.c_H);
				this.eSclAndTslt(a_Rst);
				return a_Rst;
			}
		},
		{
			se_SpriImg: null
			,
			scInit: function ()
			{
				this.se_SpriImg = new Image();
				this.se_SpriImg.src = "media/Sheep.png";
			}
		});

	//========================================================= 实用函数

	// 缩放
	nApp.fSclSara = function (a_Sara)
	{
		nWse.tSara.scScl(a_Sara, nApp.g_GlbScl.c_CtanScl);
		return a_Sara;
	};

	// 居中缩放
	nApp.fCenSclSara = function (a_Sara)
	{
		nApp.fSclSara(a_Sara);
		a_Sara.c_X = (stDomUtil.cGetVwptWid() - a_Sara.c_W) / 2;
		return a_Sara;
	};

	// 播放mp3
	nApp.fPlayMp3 = function (a_Mp3)
	{
		try
		{
			a_Mp3.cStop().cPlay()
		}
		catch (a_Exc)
		{

		}
	};

	 //// FTP测试账号
	 //115.28.57.71 huangmeng yellow
	 //http://wx.heivr.com/
	 ///tpl/Home/Hisense/HaoYangMao/
	 //http://wx.heivr.com/tpl/Home/Hisense/HaoYangMao/Main.html
})();