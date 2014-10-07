﻿/*
 *
 */


(function ()
{
	//@ 全局对象，同时支持页面主线程，WebWorker线程，和Node.js
	var i_InNodeJs = ("undefined" == typeof self);
	var l_Glb = i_InNodeJs ? global : self;

	//@ 如果本文件已经包含过
	if (l_Glb.nWse)
	{
		//@ 避免重复执行相同的初始化代码
		return;
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// using

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 静态函数

	/// 获取名称
	/// a_fTgt：Function，目标函数
	/// 返回：String，函数名
	function fGetFctnName(a_fTgt)
	{
		// 除IE以外的浏览器普遍具有name属性
		if (a_fTgt.name)
		{ return a_fTgt.name; }

		// 若无，使用正则表达式匹配之
		// function、函数名、(，之间可有行注释，块注释，空白
		var i_Rgx = /^function(?:\/\/.*?\r?\n|\/\*[\S\s]*?\*\/|\s)*([^\/\s\(]*)/;
		var l_Str = a_fTgt.toString();
		var l_Mch = i_Rgx.exec(l_Str);
		return (l_Mch && l_Mch[1]) ? l_Mch[1] : "";
	}

	/// 获取信息
	/// a_fTgt：Function，目标函数
	/// a_Name：Boolean，是否获取名称
	/// a_Prms：Boolean，是否获取形参
	/// a_Body：Boolean，是否获取函数体
	/// 注意：若不传a_Name，a_Prms，a_Body，则认为全部是true
	/// 返回：Object，
	/// {
	/// c_Name：String，名称
	/// c_Prms：String[]，形参名数组
	/// c_Body：String，函数体
	/// }
	function fGetFctnInfo(a_fTgt, a_Name, a_Prms, a_Body)
	{
		// 如果三个实参皆无则默认为true
		if (1 == arguments.length)
		{ a_Name = a_Prms = a_Body = true; }

		// 结果初始化
		var l_Rst = { "c_Name": "", "c_Prms": null, "c_Body": "" };

		// 如果只要求名称
		if (a_Name && (! a_Prms) && (! a_Body))
		{
			l_Rst.c_Name = fGetFctnName(a_fTgt);
			return l_Rst;
		}

		// 对于其他获取方式，需要完全匹配三部分
		// 使用fInit，确保复杂的正则表达式只被创建一次，在首次使用时
		function fInit()
		{
			var l_Ptn_CmtAndSpc = "(?:\\/\\/.*?\\r?\\n|\\/\\*[\\S\\s]*?\\*\\/|\\s)*";
			var l_Ptn_Id = "[^\\/\\s\\(\\)]*";
			var l_Ptn_Name = "(" + l_Ptn_Id + ")";
			var l_Ptn_Prms = "\\(" + l_Ptn_CmtAndSpc + "((?:" + l_Ptn_Id + l_Ptn_CmtAndSpc + ",?" + l_Ptn_CmtAndSpc + ")*)\\)";
			var l_Ptn_Body = "{([\\S\\s]*)}$";
			var l_RgxStr = "^function" + l_Ptn_CmtAndSpc + l_Ptn_Name + l_Ptn_CmtAndSpc + l_Ptn_Prms + l_Ptn_CmtAndSpc + l_Ptn_Body;
			fInit.c_RgxMch = new RegExp(l_RgxStr);
			fInit.c_RgxRmv = new RegExp(l_Ptn_CmtAndSpc, "g");
		}

		if (! fInit.c_RgxMch)
		{ fInit(); }

		var l_Str = a_fTgt.toString();
		var l_Mch = fInit.c_RgxMch.exec(l_Str);
		if (! l_Mch)
		{
			if (a_Name)	// 未匹配时假定toString返回的就是函数名
			{ l_Rst.c_Name = l_Str;	}
		}
		else
		{
			if (l_Mch[1] && a_Name)
			{ l_Rst.c_Name = l_Mch[1]; }

			if (l_Mch[2] && a_Prms)
			{ l_Rst.c_Prms = l_Mch[2].replace(fInit.c_RgxRmv, "").split(","); }

			if (l_Mch[3] && a_Body)
			{ l_Rst.c_Body = l_Mch[3]; }
		}
		return l_Rst;
	}

	/// 定义数据属性，如不支持Object.defineProperty，则以赋值方式定义，并放弃设置特性
	/// a_Tgt：Object，目标
	/// a_PptyName：String，属性名
	/// a_Cfgbl：Boolean，是否可配置
	/// a_Enmbl：Boolean，是否可列举
	/// a_Wrtbl：Boolean，是否可写
	/// a_Val：任意类型，属性值
	function fDfnDataPpty(a_Tgt, a_PptyName, a_Cfgbl, a_Enmbl, a_Wrtbl, a_Val)
	{
		Object.defineProperty(a_Tgt, a_PptyName, { configurable : a_Cfgbl, enumerable : a_Enmbl, writable : a_Wrtbl, value : a_Val });
	}

	/// 浅赋值
	/// a_Dst：Object，目的
	/// a___：Object，来源，将跳过undefined字段
	/// 返回：a_Dst
	function fShlwAsn(a_Dst, a___)
	{
		var i = 1, l_Len = arguments.length, l_Agm, l_PN, l_PV;
		for (; i<l_Len; ++i)
		{
			l_Agm = arguments[i];
			for (l_PN in l_Agm)
			{
				l_PV = l_Agm[l_PN];
				if (undefined !== l_PV)
				{ a_Dst[l_PN] = l_PV; }
			}
		}
		return a_Dst;
	}

	/// 拼接字符串，空子串将被跳过
	/// a___：String，各个子串
	/// 返回：String
	function fCcat(a___)
	{
		var l_Rst = "";
		var i = 0, l_Len = arguments.length;
		for (; i<l_Len; ++i)
		{
			if (arguments[i])
			{ l_Rst += arguments[i]; }
		}
		return l_Rst;
	}

	/// 确保是目录，即确保以“/”或“\”结尾
	/// a_Path：String，路径，若为null则返回null
	/// 返回：String
	function fEnsrDiry(a_Path)
	{
		var i_Rgx = /[\/\\]$/;
		return a_Path ? (i_Rgx.test(a_Path) ? a_Path : (a_Path + "/")) : null;
	}

	/// 确保是JavaScript文件，即确保以“.js”结尾
	/// a_Path：String，路径，若为null则返回null
	/// 返回：String
	function fEnsrJs(a_Path)
	{
		var i_Rgx = /\.js$/i;
		return a_Path ? (i_Rgx.test(a_Path) ? a_Path : (a_Path + ".js")) : null;
	}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 名字空间

	// 默认定义的三个名字空间
	var nWse, nApp, unKnl;

	function fNmspc(a_nPrnSpc, a_fCtor)
	{
		// 默认父空间为l_Glb
		if (! a_nPrnSpc)
		{ a_nPrnSpc = l_Glb; }

		// 取得空间名
		var l_SpcName = fGetFctnName(a_fCtor);
		if (! l_SpcName)
		{ throw new Error("构造函数名即为空间名，不能为空！"); }

		/// 父空间
		a_fCtor.oc_nPrnSpc = a_nPrnSpc;

		/// 名称，如"nSelf"
		a_fCtor.oc_Name = l_SpcName;

		/// 全名，如"nWse.nSelf"
		a_fCtor.oc_FullName = (function ()
		{
			var l_Rst = l_SpcName;
			var l_nPrnSpc = a_nPrnSpc;
			while (l_nPrnSpc.oc_Name)
			{
				l_Rst = l_nPrnSpc.oc_Name + "." + l_Rst;
				l_nPrnSpc = l_nPrnSpc.oc_nPrnSpc;
			}
			return l_Rst;
		})();

		/// 构建全名，如"nWse.nSelf.tClass"
		/// a_Name：名称
		/// 返回：全名
		a_fCtor.ocBldFullName = function (a_Name)
		{ return a_fCtor.oc_FullName + "." + a_Name; };

		// 作为父空间的字段添加
		a_nPrnSpc[l_SpcName] = a_fCtor;
		return a_fCtor;
	}

	// 定义名字空间nWse和nApp，记录全局变量
	nWse = fNmspc(l_Glb,
		/// 冬至引擎
		function nWse(){ return nWse; });
	nApp = fNmspc(l_Glb,
		/// 应用程序
		function nApp(){ return nApp; });

	/// Boolean，是否在Node.js里
	nWse.i_InNodeJs = i_InNodeJs;

	/// String，生成模式，∈{ "Dbg"（默认），"Rls" }
	nWse.g_BldMode = "Dbg";

	/// Number，异步延迟（秒），用于模拟异步请求时的网络延迟，应仅用于开发时！
	nWse.g_AsynDly = 0;

	/// 是否异步延迟？
	nWse.fIsAsynDly = function ()
	{
		return ("Dbg" == nWse.g_BldMode) && (nWse.g_AsynDly > 0);
	};

	/// 名字空间
	/// a_nPrnSpc：父空间，默认为l_Glb
	/// a_fCtor：a_fCtor：Function，构造函数，不会调用，只使用函数名
	/// 返回：新定义的名字空间
	nWse.fNmspc = function (a_nPrnSpc, a_fCtor)
	{
		// 建立，并在构造函数上记录构造器
		fNmspc(a_nPrnSpc, a_fCtor);
		fDfnDataPpty(a_fCtor, "constructor", false, false, false, nWse.fNmspc);
		return a_fCtor;
	};

	// 在nWse和nApp构造函数上记录构造器
	fDfnDataPpty(nWse, "constructor", false, false, false, nWse.fNmspc);
	fDfnDataPpty(nApp, "constructor", false, false, false, nWse.fNmspc);

	/// 是否为名字空间？
	/// a_Any：任意
	/// 返回：Boolean，是否
	nWse.fIsNmspc = function (a_Any)
	{
		return a_Any && (a_Any.constructor === nWse.fNmspc);
	};

	// 定义内核空间，并装配之
	unKnl = nWse.fNmspc(nWse, function unKnl() { });
	unKnl.fGetFctnName = fGetFctnName;
	unKnl.fGetFctnInfo = fGetFctnInfo;
	unKnl.fDfnDataPpty = fDfnDataPpty;
	unKnl.fShlwAsn = fShlwAsn;
	unKnl.fCcat = fCcat;
	unKnl.fEnsrDiry = fEnsrDiry;
	unKnl.fEnsrJs = fEnsrJs;

	/// 断言
	/// a_Expr：Boolean，表达式
	/// a_Info：String，信息
	nWse.fAst = function (a_Expr, a_Info)
	{
		if (! a_Expr)
		{ throw new Error(a_Info || "断言失败！"); }
	};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 异步包含

	var stAsynIcld;
	(function ()
	{
		///  异步包含
		stAsynIcld = function () { };
		nWse.stAsynIcld = stAsynIcld;
		stAsynIcld.oc_nHost = nWse;
		stAsynIcld.oc_FullName = nWse.ocBldFullName("stAsynIcld");

		/// 构建全名
		stAsynIcld.ocBldFullName = function (a_Name)
		{ return stAsynIcld.oc_FullName + "." + a_Name; };

		//======== 私有字段

		var e_LibDiryMap = { "nWse": "../nWse/" };		// 库目录映射
		eInitLibDiryMap();

		var e_CpltRgtr = {};							// 注册表
		var e_FromLibQue = [];							// 调用队列
		var e_Dom_Head = i_InNodeJs ? null : l_Glb.document.documentElement.firstChild;	// <head>

		//======== 私有函数

		// 初始化库目录映射
		function eInitLibDiryMap()
		{
			if (i_InNodeJs)
			{ return; }

			var l_Doms = l_Glb.document.getElementsByTagName("script");
			var l_Src = l_Doms[l_Doms.length - 1].getAttribute("src");	// 取最后一个，即为当前脚本
			var l_Idx = l_Src.toLowerCase().indexOf("/nwse/(0)seed.js");
			if (l_Idx >= 0)
			{ e_LibDiryMap["nWse"] = l_Src.slice(0, l_Idx + 6); }
		}

		// 新建完成条目
		function eNewCpltEtr(a_LwrPath, a_Sta, a_Dom_Script, a_fCabk)
		{
			return (e_CpltRgtr[a_LwrPath] = {
				c_Sta : a_Sta,	// c_Sta：-1=出错；0=未发出；1=待定；2=未回调；3=完成
				c_Dom_Script : a_Dom_Script || null,
				c_fCabk : a_fCabk || null
			});
		}

		// 替换库路径
		function eSbstLibPath(a_LibPath, a_Idx)
		{
			var l_Idx = (undefined === a_Idx) ? a_LibPath.indexOf(":") : a_Idx;
			return (l_Idx < 0) ? e_LibDiryMap[a_LibPath] : fCcat(e_LibDiryMap[a_LibPath.slice(0, l_Idx)], a_LibPath.slice(l_Idx + 1));
		}

		// 生成默认目录
		function eGnrtDftDiry(a_DftLibDiry)
		{
			return a_DftLibDiry ? fEnsrDiry(eSbstLibPath(a_DftLibDiry)) : e_LibDiryMap["nWse"];
		}

		// 生成路径，a_LibPath没有“:”时采用默认目录
		function eGnrtPath(a_DftDiry, a_LibPath)
		{
			var l_Idx = a_LibPath.indexOf(":");
			return (l_Idx < 0) ? fCcat(a_DftDiry, a_LibPath) : eSbstLibPath(a_LibPath, l_Idx);
		}

		// 统计包含三函数
		function eIcldByAry(a_AsynAry, a_DftDiry, a_Paths)
		{
			var i = 0, l_Len = a_Paths ? a_Paths.length : 0;
			var l_Key;
			for (; i<l_Len; ++i)
			{
				l_Key = a_Paths[i];
				if (l_Key)
				{ eIcldKey(a_AsynAry, a_DftDiry, fEnsrJs(l_Key)); }
			}
		}

		function eIcldKey(a_AsynAry, a_DftDiry, a_Key)
		{
			// 如果已登记，立即返回
			var l_Path = eGnrtPath(a_DftDiry, a_Key);
			var l_LwrPath = l_Path.toLowerCase();
			var l_Sta;
			if (l_LwrPath in e_CpltRgtr)
			{
				// 如果状态为-1、3，立即返回
				l_Sta = e_CpltRgtr[l_LwrPath].c_Sta;
				if ((-1 == l_Sta) || (3 == l_Sta))
				{ return; }
			}

			// Node.js里使用require函数同步加载
			if (i_InNodeJs)
			{
				require(l_Path);
				e_CpltRgtr[l_LwrPath] = { c_Sta : 3 };		// 完成
			}
			else // 浏览器里异步加载
			{
				a_AsynAry.push(l_Path);
			}
		}

		// 异步
		function fAsyn(a_fRoot, a_fCabk)
		{
			var i = 0, l_Len = a_fCabk.Wse_Dpdts.length;
			var l_Path, l_LwrPath;
			var l_Dom_Script = null;
			for (; i < l_Len; ++i)
			{
				l_Path = a_fCabk.Wse_Dpdts[i];
				l_LwrPath = l_Path.toLowerCase();

				(function (a_Idx, a_Path, a_LwrPath, a_RegItem)
				{
					// 如果已登记
					if (a_RegItem)
					{
						// 此时状态必为0、1、2，非2时添加事件处理器，2时只需等待回调树
						nWse.fAst((0 <= a_RegItem.c_Sta) || (a_RegItem.c_Sta <= 2), "状态应该是0、1、2");
						if (2 != a_RegItem.c_Sta)
						{ a_RegItem.c_OnCplt.push(fOnCplt); }
					}
					else // 生成脚本标记，并登记
					{
						l_Dom_Script = l_Glb.document.createElement("script");
						l_Dom_Script.type = "text/javascript";
						l_Dom_Script.onerror = fOnErr;
						l_Dom_Script.onload = fOnLoad;
						l_Dom_Script.src = a_Path;
						a_RegItem = eNewCpltEtr(a_LwrPath, 1, l_Dom_Script, null);	// 待定
						a_RegItem.c_OnCplt = [fOnCplt];								// 当完成时
						e_Dom_Head.appendChild(l_Dom_Script);						// 加入文档
					}

					function fOnErr()
					{
						a_RegItem.c_Sta = -1;		// 出错

						// 记录错误
						a_fCabk.Wse_Errs ? a_fCabk.Wse_Errs.push(a_Path) : (a_fCabk.Wse_Errs = [a_Path]);

						// 通知完成
						fNtfCplt(false);
					}

					function fOnLoad()
					{
						a_RegItem.c_Sta = 2;		// 就绪

						// 将缓存的实参转储到注册项里，
						// 若队列为空，说明未调用，表示这一分支不存在依赖，此时保持初始值
						var l_Agms = null;
						if (e_FromLibQue.length > 0)
						{
							if (e_FromLibQue.length >= 2)
							{ console.log("【警告】e_FromLibQue.length >= 2"); }

							l_Agms = e_FromLibQue.shift();
							a_RegItem.c_fCabk = l_Agms.c_fCabk;
							a_RegItem.c_AsynAry = l_Agms.c_AsynAry;
						}

						// 通知完成
						fNtfCplt(true);
					}

					function fNtfCplt(a_OnLoad)
					{
						var l_Ary = a_RegItem.c_OnCplt, i=0, l_Len = l_Ary.length;
						for (; i<l_Len; ++i)
						{
							// 如果返回true，表示整个过程完结，立即跳出
							if (l_Ary[i](a_OnLoad))
							{ break; }
						}
					}

					function fOnCplt(a_OnLoad)
					{
						if (a_OnLoad) // onload
						{
							// 递归构建依赖树，注意这里的路径都已计算好，故不需要默认目录
							eBldDpdtTree(a_fRoot, null, a_RegItem.c_AsynAry, a_RegItem.c_fCabk);
						}
						else // onerror
						{
							//
						}

						// 从根开始遍历回调树
						return eCabkTree(a_fRoot, a_fRoot);
					}
				})(i, l_Path, l_LwrPath, e_CpltRgtr[l_LwrPath]);
			}
		}

		// 构建依赖树，返回true表示回调完成
		function eBldDpdtTree(a_fRoot, a_DftDiry, a_Paths, a_fCabk)
		{
			// 早期逻辑
			if (eElyLgc(a_fRoot, a_Paths, a_fCabk))
			{ return true; }

			// 需要异步加载的文件名存入这里
			var l_AsynAry = [];
			eIcldByAry(l_AsynAry, a_DftDiry, a_Paths);

			// 如果有需要异步加载的文件
			if (l_AsynAry.length > 0)
			{
				// 记录依赖，异步
				a_fCabk.Wse_Dpdts = l_AsynAry;
				fAsyn(a_fRoot, a_fCabk);
				return false;
			}
			else // 没有，立即回调
			{
				return eCabkTree(a_fRoot, a_fCabk);
			}
		}

		// 早期逻辑，返回true表示已处理完
		function eElyLgc(a_fRoot, a_Paths, a_fCabk)
		{
			// 空回调函数？
			if ((! a_fCabk))
			{ return true; }

			// 空路径数组？
			var i, l_Len, l_ImdtCabk = ! a_Paths;
			if ((! l_ImdtCabk) && ("length" in a_Paths))
			{
				if (0 == a_Paths.length)
				{
					l_ImdtCabk = true;
				}
				else
				{
					l_Len = a_Paths.length;
					for (i=0; i<l_Len; ++i)
					{
						if (null != a_Paths[i])
						{ break; }
					}

					if (i == l_Len)
					{ l_ImdtCabk = true; }
				}
			}

			// 立即回调？
			if (l_ImdtCabk)
			{ eCabkTree(a_fRoot, a_fCabk); }

			return l_ImdtCabk;
		}

		// 回调树，返回bool，表示子树是否已回调完
		function eCabkTree(a_fRoot, a_fCabk)
		{
			// 已回调过？
			if (a_fCabk.Wse_Called)
			{ return true; }

			// 如果有依赖
			var l_SubtreeRdy = true, l_RtnVal;
			var l_Dpdts, l_LwrPath, i, l_Len, l_RegItem;
			if (a_fCabk.Wse_Dpdts)
			{
				l_Dpdts = a_fCabk.Wse_Dpdts;
				l_Len = l_Dpdts.length;
				for (i=0; i<l_Len; ++i)
				{
					// 取得注册项，一定存在，状态不可能为0
					// 遇到状态为1的表示子树未就绪，暂且跳过
					// 跳过状态为-1、3的，或无回调的
					l_LwrPath = l_Dpdts[i].toLowerCase();
					l_RegItem = e_CpltRgtr[l_LwrPath];
					nWse.fAst(l_RegItem && (0 != l_RegItem.c_Sta), "注册项一定存在，状态不可能为0");

					if (1 == l_RegItem.c_Sta)
					{
						l_SubtreeRdy = false;
						continue;
					}

					if ((-1 == l_RegItem.c_Sta) || (3 == l_RegItem.c_Sta) || (! l_RegItem.c_fCabk))
					{ continue; }

					// 递归，然后检查子树是否已回调完
					l_RtnVal = eCabkTree(a_fRoot, l_RegItem.c_fCabk);
					if (l_RtnVal)
					{ eClrRegItem(l_RegItem); }		// 清理注册项
					else
					{ l_SubtreeRdy = false; }		// 子树尚未就绪
				}
			}

			// 如果子树都回调完，就可以回调a_fCabk
			if (l_SubtreeRdy)
			{
				try
				{ a_fCabk(a_fCabk.Wse_Errs || null); }
				finally
				{ a_fCabk.Wse_Called = true; }
			}
			return l_SubtreeRdy;
		}

		function eClrRegItem(a_RegItem)
		{
			a_RegItem.c_Sta = 3;		// 完成
			a_RegItem.c_Dom_Script.onerror = null;
			a_RegItem.c_Dom_Script.onload = null;
			delete a_RegItem.c_Dom_Script;
			delete a_RegItem.c_fCabk;
			delete a_RegItem.c_OnCplt;
			delete a_RegItem.c_AsynAry;
		}

		//======== 公有函数

		/// 库目录映射
		stAsynIcld.cLibDiryMap = function (a_Map)
		{
			for (var l_PN in a_Map) { e_LibDiryMap[l_PN] = fEnsrDiry(a_Map[l_PN]); }
			return stAsynIcld;
		};

		/// 解析路径，即将所含的库目录替换成实际目录
		stAsynIcld.cPsePath = function (a_Path)
		{
			var l_Idx = a_Path.indexOf(":");
			if (l_Idx < 0)
			{ return a_Path; }

			var l_LibDiry = a_Path.slice(0, l_Idx);
			var l_ActuDiry = e_LibDiryMap[l_LibDiry];
			if (! l_ActuDiry)
			{ throw new Error("库目录“" + l_LibDiry + "”没有注册！"); }

			return fCcat(l_ActuDiry, a_Path.slice(l_Idx + 1));
		};

		/// 来自App
		stAsynIcld.cFromApp = function (a_DftLibDiry, a_LibPaths, a_fCabk)
		{
			// 构建依赖树
			eBldDpdtTree(a_fCabk, eGnrtDftDiry(a_DftLibDiry), a_LibPaths, a_fCabk);
			return stAsynIcld;
		};

		/// 来自库
		stAsynIcld.cFromLib = function (a_DftLibDiry, a_LibPaths, a_fCabk)
		{
			var l_DftDiry = eGnrtDftDiry(a_DftLibDiry);
			a_fCabk = a_fCabk || function (a_Errs) {};

			// 需要异步加载的文件名存入这里
			var l_AsynAry = [];
			eIcldByAry(l_AsynAry, l_DftDiry, a_LibPaths);

			if (l_AsynAry.length > 0) // 压入实参至队列
			{ e_FromLibQue.push({ c_fCabk : a_fCabk, c_AsynAry : l_AsynAry }); }
			else // 立即回调
			{ eCabkTree(null, a_fCabk); }

			return stAsynIcld;
		};

		/// 预载入
		stAsynIcld.cPreLoad = function (a_DftLibDiry, a_LibPaths)
		{
			var l_DftDiry = eGnrtDftDiry(a_DftLibDiry);

			var i = 0, l_Len = a_LibPaths ? a_LibPaths.length : 0;
			var l_Path, l_LwrPath, l_Dom_Script, l_Sta;
			for (; i<l_Len; ++i)
			{
				if (! a_LibPaths[i])
				{ continue; }

				// 登记
				l_LwrPath = eGnrtPath(l_DftDiry, fEnsrJs(a_LibPaths[i])).toLowerCase();
				if (! e_CpltRgtr[l_LwrPath])
				{ e_CpltRgtr[l_LwrPath] = { }; }

				e_CpltRgtr[l_LwrPath].c_Sta = 3;	// 完成
			}
			return stAsynIcld;
		};
	})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Over

	if (i_InNodeJs)
	{
		module.exports = nWse;
	}
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////