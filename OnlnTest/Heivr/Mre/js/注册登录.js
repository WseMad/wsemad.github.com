/*
*
*/


(function () {
	var $ = window.jQuery;

	//【PHP】这段代码只在注册页面里有用！
	$(document).ready(function () {

		//======================= PC

		////---- 改变验证码
		//var l_ChangeCaptcha = document.getElementById("k_ChangeCaptcha");
		//if (l_ChangeCaptcha)
		//{
		//	fChangeCaptcha();
		//}

		//function fChangeCaptcha()
		//{
		//	$.get(
		//		"",
		//		{
		//		},
		//		function (a_Data)
		//		{
		//		},
		//		"text"
		//	);
		//}

		//======================= Mbl

		// 非手机端注册页面立即返回
		var l_Ipt_Nick = document.getElementById("k_Ipt_Nick");
		if (! l_Ipt_Nick)
		{ return; }

		// 同意复选框，未选中时隐藏提交按钮
		var l_AgrChkBox = document.getElementById("k_ChkBox_Agreement");
		if (l_AgrChkBox)
		{
			nWse.stDomUtil.cAddEvtHdlr(l_AgrChkBox, "change",
				function ()
				{
					var l_SbmtDiv = $(".cnApp_Sbmt").get(0);
					l_SbmtDiv.style.display = l_AgrChkBox.checked ? "block" : "none";
				});
		}

		// 取得表单
		var l_Form = document.forms[0];
		nWse.stDomUtil.cAddEvtHdlr(l_Form, "submit",
			function (a_Evt)
			{
				a_Evt = a_Evt || window.event;
				var l_Rst = true;

				// 同意？
				if (l_AgrChkBox && (! l_AgrChkBox.checked))
				{
					l_Rst = false;
				}

				// 继续验证
				if (l_Rst)
				{
					l_Rst = fFormVldt(l_Form);
				}
				
				// 未通过
				if ((! l_Rst) && (a_Evt.preventDefault))
				{
					a_Evt.preventDefault();	// Chrome要求调用这个，“return false;”是不行的
				}
				return l_Rst;
			});
		});

	// 表单验证
	function fFormVldt(a_Form)
	{
		var l_Rst = true;
		var l_Fld = null, l_Vldt = null;
		function fShowVldtErr(a_Text)
		{
			l_Vldt.style.display = "block";
			if (a_Text)
			{
				$(l_Vldt).children(".cnApp_Text").text(a_Text);
			}
		}
		function fHideVldtErr()
		{
			l_Vldt.style.display = "none";
		}

		function fChkVal(a_Id, a_LenRge, a_Id$Rgx, a_ErrText)
		{
			var l_Ipt = document.getElementById(a_Id);
			var l_AnthIpt = null;
			l_Fld = $(l_Ipt).parents(".cnApp_Fld").get(0);
			l_Vldt = $(l_Fld).find(".cnApp_Vldt").get(0);
			if ((! l_Ipt.value))
			{
				fShowVldtErr();
				l_Rst = false;
			}
			else
			if (a_LenRge)
			{
				if ((l_Ipt.value.length < a_LenRge[0]) || (a_LenRge[1] < l_Ipt.value.length))
				{
					fShowVldtErr("长度不合要求！");
					l_Rst = false;
				}
			}
			else
			if (a_Id$Rgx && nWse.fIsStr(a_Id$Rgx))
			{
				l_AnthIpt = document.getElementById(a_Id$Rgx);
				if (l_Ipt.value != l_AnthIpt.value)
				{
					fShowVldtErr(a_ErrText);
					l_Rst = false;
				}
			}
			else
			if (a_Id$Rgx && nWse.fIsRgx(a_Id$Rgx) && (! a_Id$Rgx.test(l_Ipt.value)))
			{
				fShowVldtErr(a_ErrText);
				l_Rst = false;
			}
			else
			{
				fHideVldtErr();
			}
		}

		// 昵称
		fChkVal("k_Ipt_Nick", null);

		// 手机号码
		fChkVal("k_Ipt_Phone", null, /^(\+?(86))?0?\d{11}$/, "手机号码格式不对！");

		// 短信码
		fChkVal("k_Ipt_Sms", null);

		// 身份证号
		fChkVal("k_Ipt_IdCard", null, 
			// 15													 18
			/(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$)/, 
			"身份证号格式不对！");

		// 密码
		fChkVal("k_Ipt_Pswd", [6, 15]);

		// 确认密码
		fChkVal("k_Ipt_CfmPswd", null, "k_Ipt_Pswd", "两次密码不一致！");
		return l_Rst;
	}

	//【End】


	//【PHP】这段代码只在登录页面里有用！
	$(document).ready(function () {
		// 非登录页面立即返回
		if (!document.getElementById("k_Ipt_Acnt"))
		{ return; }

		// 修正输入框尺寸
		fFixIptBoxDim();
		nWse.stDomUtil.cAddEvtHdlr_WndRsz(function () {
			fFixIptBoxDim();
		}, 0.1);	// 1秒处理10次就够了
	});

	function fFixIptBoxDim() {
		nApp.stFixIptBoxDim.cFix(document.getElementById("k_Ipt_Acnt"), 2);
		nApp.stFixIptBoxDim.cFix(document.getElementById("k_Ipt_Pswd"), 2);
	}
	//【End】
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////