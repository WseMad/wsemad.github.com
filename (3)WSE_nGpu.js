﻿(function(){var i_InNodeJs = ("undefined" == typeof self);var l_Glb = i_InNodeJs ? global : self;l_Glb.nWse.stAsynIcld.cPreLoad("nWse:nGpu", ["(0)GpuMath.js","2dCtxt.js","2dPath.js"]);})();(function(){var A=("undefined"==typeof self),B=A?global:self;if(B.nWse&&B.nWse.nGpu){return}B.nWse.stAsynIcld.cFromLib("nWse:nGpu",["nWse:(3)CoreDast.js"],C);function C(D){console.log("(0)GpuMath.fOnIcld："+D);var E=B.nWse,F=E.stNumUtil,G=E.stStrUtil,H=E.stAryUtil,I=E.fNmspc(E,function nGpu(){}),J=E.fNmspc(I,function unKnl(){});function K(V,W,X,Y,Z,a,b,c,d){var e=F.cDet_2o;return+V*e(Z,a,c,d)-W*e(Y,a,b,d)+X*e(Y,Z,b,c)}function L(V,W){return Math.sqrt((V*V)+(W*W))}function M(V,W,X){return Math.sqrt((V*V)+(W*W)+(X*X))}function N(V,W,X,Y){return F.cDet_2o(W,X,Y.y,Y.z)}function O(V,W,X,Y){return F.cDet_2o(X,V,Y.z,Y.x)}function P(V,W,X,Y){return F.cDet_2o(V,W,Y.x,Y.y)}function Q(V,W,X,Y){return F.cDet_2o(-V.y,-V.z,X,Y)}function R(V,W,X,Y){return F.cDet_2o(-V.z,-V.x,Y,W)}function S(V,W,X,Y){return F.cDet_2o(-V.x,-V.y,W,X)}var T;(function(){T=E.fClass(I,function t4dVct(){this.x=0;this.y=0;this.z=0;this.w=0},null,{toString:function toString(){var V=G.cOpmzNumDspl;return "("+V(this.x)+", "+V(this.y)+", "+V(this.z)+", "+V(this.w)+")"},cAs3dPnt_Crt:function(V,W,X){if(0==arguments.length){this.x=0;this.y=0;this.z=0}else{this.x=V;this.y=W;this.z=X}this.w=1;return this},cAs3dPnt_Mul$4dMtx:function(V){this.cAs3dVct_Mul$4dMtx(V);this.x+=V.c_41;this.y+=V.c_42;this.z+=V.c_43;return this},cAs3dVct_Crt:function(V,W,X){if(0==arguments.length){this.x=0;this.y=0;this.z=0}else if(1==arguments.length){this.x=V.x;this.y=V.y;this.z=V.z}else if(2==arguments.length){this.x=W.x-V.x;this.y=W.y-V.y;this.z=W.z-V.z}else{this.x=V;this.y=W;this.z=X}this.w=0;return this},cAs3dVct_Add:function(V){this.x+=V.x;this.y+=V.y;this.z+=V.z;return this},cAs3dVct_Sub:function(V){this.x-=V.x;this.y-=V.y;this.z-=V.z;return this},cAs3dVct_Mul$Num:function(V){this.x*=V;this.y*=V;this.z*=V;return this},cAs3dVct_Mul$4dMtx:function(V){var W=this.x,X=this.y,Y=this.z;this.x=W*V.c_11+X*V.c_21+Y*V.c_31;this.y=W*V.c_12+X*V.c_22+Y*V.c_32;this.z=W*V.c_13+X*V.c_23+Y*V.c_33;return this},cAs3dVct_Div$Num:function(V){return this.cAs3dVct_Mul$Num(1/V)},cAs3dVct_cCalcLenSqr:function(){return(this.x*this.x)+(this.y*this.y)+(this.z*this.z)},cAs3dVct_cCalcLen:function(){return M(this.x,this.y,this.z)},cAs3dVct_Nmlz:function(){return this.cAs3dVct_SclTo(1)},cAs3dVct_SclTo:function(V){var W=this.cAs3dVct_cCalcLen();return(W>0)?this.cAs3dVct_Mul$Num(V/W):this},cAs3dVct_Crs:function(V){var W=this.x,X=this.y,Y=this.z;this.x=N(W,X,Y,V);this.y=O(W,X,Y,V);this.z=P(W,X,Y,V);return this},cCrt:function(V,W,X,Y){this.x=V||0;this.y=W||0;this.z=X||0;this.w=Y||0;return this},cMul$Num:function(V){this.cAs3dVct_Mul$Num();this.w*=V;return this},cMul$4dMtx:function(V){var W=this.x,X=this.y,Y=this.z,Z=this.w;this.cAs3dVct_Mul$4dMtx(V);this.x+=Z*V.c_41;this.y+=Z*V.c_42;this.z+=Z*V.c_43;this.w=W*V.c_14+X*V.c_24+Y*V.c_34+Z*V.c_44;return this},cDiv$Num:function(V){return this.cMul$Num(1/V)}},{sc_Temps:null,scEnsrTemps:function(V){return E.unKnl.fEnsrTemps(T,V)},scCopy:function(V){T.oeVrfCopyOrig(V);return T.scAsn(new T(),V)},scAsn:function(V,W,X,Y){T.oeVrfAsnDstAndSrc(V,W);V.x=W.x;V.y=W.y;V.z=W.z;V.w=W.w;return V},scEq:function(V,W,X){var Y=E.stNumUtil.cEq;return Y(V.x,W.x,X)&&Y(V.y,W.y,X)&&Y(V.z,W.z,X)&&Y(V.w,W.w,X)},scIz:function(V,W){var X=E.stNumUtil.cIz;return X(V.x,W)&&X(V.y,W)&&X(V.z,W)&&X(V.w,W)},scDot:function(V,W){return(V.x*W.x)+(V.y*W.y)+(V.z*W.z)+(V.w*W.w)}},false)})();var U;(function(){U=E.fClass(I,function t4dMtx(){this.cIdty()},null,{toString:function toString(){var V=G.cOpmzNumDspl;return "┌"+V(this.c_11)+", "+V(this.c_12)+", "+V(this.c_13)+", "+V(this.c_14)+"┐\n"+"│"+V(this.c_21)+", "+V(this.c_22)+", "+V(this.c_23)+", "+V(this.c_24)+"│\n"+"│"+V(this.c_31)+", "+V(this.c_32)+", "+V(this.c_33)+", "+V(this.c_34)+"│\n"+"└"+V(this.c_41)+", "+V(this.c_42)+", "+V(this.c_43)+", "+V(this.c_44)+"┘"},cIdty:function(){this.c_11=1;this.c_12=0;this.c_13=0;this.c_14=0;this.c_21=0;this.c_22=1;this.c_23=0;this.c_24=0;this.c_31=0;this.c_32=0;this.c_33=1;this.c_34=0;this.c_41=0;this.c_42=0;this.c_43=0;this.c_44=1;return this},cCrtRotAA:function(V,W){var X=Math.cos(W),Y=Math.sin(W),Z=1-X,a=V.x*V.x,b=V.x*V.y,c=V.x*V.z,d=V.y*V.y,e=V.y*V.z,f=V.z*V.z;this.c_11=a*Z+X;this.c_12=b*Z+V.z*Y;this.c_13=c*Z-V.y*Y;this.c_14=0;this.c_21=b*Z-V.z*Y;this.c_22=d*Z+X;this.c_23=e*Z+V.z*Y;this.c_24=0;this.c_31=c*Z+V.y*Y;this.c_32=e*Z-V.z*Y;this.c_33=f*Z+X;this.c_34=0;this.c_41=0;this.c_42=0;this.c_43=0;this.c_44=1;return this},cMul:function(V){var W=this.c_11,X=this.c_12,Y=this.c_13,Z=this.c_14;this.c_11=W*V.c_11+X*V.c_21+Y*V.c_31+Z*V.c_41;this.c_12=W*V.c_12+X*V.c_22+Y*V.c_32+Z*V.c_42;this.c_13=W*V.c_13+X*V.c_23+Y*V.c_33+Z*V.c_43;this.c_14=W*V.c_14+X*V.c_24+Y*V.c_34+Z*V.c_44;W=this.c_21;X=this.c_22;Y=this.c_23;Z=this.c_24;this.c_21=W*V.c_11+X*V.c_21+Y*V.c_31+Z*V.c_41;this.c_22=W*V.c_12+X*V.c_22+Y*V.c_32+Z*V.c_42;this.c_23=W*V.c_13+X*V.c_23+Y*V.c_33+Z*V.c_43;this.c_24=W*V.c_14+X*V.c_24+Y*V.c_34+Z*V.c_44;W=this.c_31;X=this.c_32;Y=this.c_33;Z=this.c_34;this.c_31=W*V.c_11+X*V.c_21+Y*V.c_31+Z*V.c_41;this.c_32=W*V.c_12+X*V.c_22+Y*V.c_32+Z*V.c_42;this.c_33=W*V.c_13+X*V.c_23+Y*V.c_33+Z*V.c_43;this.c_34=W*V.c_14+X*V.c_24+Y*V.c_34+Z*V.c_44;W=this.c_41;X=this.c_42;Y=this.c_43;Z=this.c_44;this.c_41=W*V.c_11+X*V.c_21+Y*V.c_31+Z*V.c_41;this.c_42=W*V.c_12+X*V.c_22+Y*V.c_32+Z*V.c_42;this.c_43=W*V.c_13+X*V.c_23+Y*V.c_33+Z*V.c_43;this.c_44=W*V.c_14+X*V.c_24+Y*V.c_34+Z*V.c_44;return this},cAs3dFrm_Put:function(V,W,X){if(0==arguments.length){this.c_41=0;this.c_42=0;this.c_43=0}else if(1==arguments.length){this.c_41=V.x;this.c_42=W.y;this.c_43=W.z}else{this.c_41=V;this.c_42=W;this.c_43=W}return this},cAs3dFrm_SclXA:function(V){this.c_11*=V;this.c_12*=V;this.c_13*=V;return this},cAs3dFrm_SclYA:function(V){this.c_21*=V;this.c_22*=V;this.c_23*=V;return this},cAs3dFrm_SclZA:function(V){this.c_31*=V;this.c_32*=V;this.c_33*=V;return this},cAs3dFrm_UniScl:function(V){return this.cAs3dFrm_SclXA(V).cAs3dFrm_SclYA(V).cAs3dFrm_SclZA(V)},cAs3dFrm_SclPA:function(V,W,X){return this.cAs3dFrm_SclXA(V).cAs3dFrm_SclYA(W).cAs3dFrm_SclZA(X)},cAs3dFrm_CalcSx:function(){return M(this.c_11,this.c_12,this.c_13)},cAs3dFrm_CalcSy:function(){return M(this.c_21,this.c_22,this.c_23)},cAs3dFrm_CalcSz:function(){return M(this.c_31,this.c_32,this.c_33)},cAs3dFrm_RotXA:function(V){var W=this.c_42,X=this.c_43;this.cAs3dFrm_SpinXA(V);this.c_42=W*this.e_Cos-X*this.e_Sin;this.c_43=W*this.e_Sin+X*this.e_Cos;return this},cAs3dFrm_RotYA:function(V){var W=this.c_41,X=this.c_43;this.cAs3dFrm_SpinYA(V);this.c_41=W*this.e_Cos+X*this.e_Sin;this.c_43=-W*this.e_Sin+X*this.e_Cos;return this},cAs3dFrm_RotZA:function(V){var W=this.c_41,X=this.c_42;this.cAs3dFrm_SpinZA(V);this.c_41=W*this.e_Cos-X*this.e_Sin;this.c_42=W*this.e_Sin+X*this.e_Cos;return this},cAs3dFrm_SpinXA:function(V){this.e_Cos=Math.cos(V);this.e_Sin=Math.sin(V);var W=this.c_12,X=this.c_13,Y=this.c_22,Z=this.c_23,a=this.c_32,b=this.c_33;this.c_12=W*this.e_Cos-X*this.e_Sin;this.c_13=W*this.e_Sin+X*this.e_Cos;this.c_22=Y*this.e_Cos-Z*this.e_Sin;this.c_23=Y*this.e_Sin+Z*this.e_Cos;this.c_32=a*this.e_Cos-b*this.e_Sin;this.c_33=a*this.e_Sin+b*this.e_Cos;return this},cAs3dFrm_SpinYA:function(V){this.e_Cos=Math.cos(V);this.e_Sin=Math.sin(V);var W=this.c_11,X=this.c_13,Y=this.c_21,Z=this.c_23,a=this.c_31,b=this.c_33;this.c_11=W*this.e_Cos+X*this.e_Sin;this.c_13=-W*this.e_Sin+X*this.e_Cos;this.c_21=Y*this.e_Cos+Z*this.e_Sin;this.c_23=-Y*this.e_Sin+Z*this.e_Cos;this.c_31=a*this.e_Cos+b*this.e_Sin;this.c_33=-a*this.e_Sin+b*this.e_Cos;return this},cAs3dFrm_SpinZA:function(V){this.e_Cos=Math.cos(V);this.e_Sin=Math.sin(V);var W=this.c_11,X=this.c_12,Y=this.c_21,Z=this.c_22,a=this.c_31,b=this.c_32;this.c_11=W*this.e_Cos-X*this.e_Sin;this.c_12=W*this.e_Sin+X*this.e_Cos;this.c_21=Y*this.e_Cos-Z*this.e_Sin;this.c_22=Y*this.e_Sin+Z*this.e_Cos;this.c_31=a*this.e_Cos-b*this.e_Sin;this.c_32=a*this.e_Sin+b*this.e_Cos;return this},cAs3dFrm_Tslt:function(V,W,X){this.c_41+=V;this.c_42+=W;this.c_43+=X;return this},cAs3dFrm_Aim:function(V){var W=V.x,X=V.y,Y=V.z,Z=F.cEq;if(Z(this.c_41,W)&&Z(this.c_42,X)&&Z(this.c_43,Y)){return this}V.x-=this.c_41;V.y-=this.c_42;V.z-=this.c_43;V.cAs3dVct_Nmlz();this.cAs3dFrm_Face(V);V.x=W;V.y=X;V.z=Y;return this},cAs3dFrm_Head:function(V){if(T.scIz(V)){return this}function W(c){this.c_31=N(this.c_11,this.c_12,this.c_13,c);this.c_32=O(this.c_11,this.c_12,this.c_13,c);this.c_33=P(this.c_11,this.c_12,this.c_13,c);var d=1/M(this.c_31,this.c_32,this.c_33);this.c_31*=d;this.c_32*=d;this.c_33*=d}var X,Y,Z,a;if(F.cEq(Math.abs(V.y),+1)){if(F.cIz(this.c_11)&&F.cIz(this.c_13)){var b=F.cSign(V.y*this.c_12);this.cAs3dFrm_SpinZA(-b*F.i_PiBy2)}else{X=this.cAs3dFrm_CalcSx();Y=this.cAs3dFrm_CalcSy();Z=this.cAs3dFrm_CalcSz();this.c_21=V.x;this.c_22=V.y;this.c_23=V.z;this.c_12=0;a=1/L(this.c_11,this.c_13);this.c_11*=a;this.c_13*=a;W.call(this,V);this.cAs3dFrm_SclPA(X,Y,Z)}}else{X=this.cAs3dFrm_CalcSx();Y=this.cAs3dFrm_CalcSy();Z=this.cAs3dFrm_CalcSz();this.c_21=V.x;this.c_22=V.y;this.c_23=V.z;this.c_11=V.z;this.c_12=0;this.c_13=-V.x;a=1/L(this.c_11,this.c_13);this.c_11*=a;this.c_13*=a;W.call(this,V);this.cAs3dFrm_SclPA(X,Y,Z)}return this},cAs3dFrm_Face:function(V){if(T.scIz(V)){return this}function W(c){this.c_21=Q(c,this.c_11,this.c_12,this.c_13);this.c_22=R(c,this.c_11,this.c_12,this.c_13);this.c_23=S(c,this.c_11,this.c_12,this.c_13);var d=1/M(this.c_21,this.c_22,this.c_23);this.c_21*=d;this.c_22*=d;this.c_23*=d}var X,Y,Z,a;if(F.cEq(Math.abs(V.y),+1)){if(F.cIz(this.c_11)&&F.cIz(this.c_13)){var b=F.cSign(-V.y*this.c_12);this.cAs3dFrm_SpinYA(+b*F.i_PiBy2)}else{X=this.cAs3dFrm_CalcSx();Y=this.cAs3dFrm_CalcSy();Z=this.cAs3dFrm_CalcSz();this.c_31=-V.x;this.c_32=-V.y;this.c_33=-V.z;this.c_12=0;a=1/L(this.c_11,this.c_13);this.c_11*=a;this.c_13*=a;W.call(this,V);this.cAs3dFrm_SclPA(X,Y,Z)}}else{X=this.cAs3dFrm_CalcSx();Y=this.cAs3dFrm_CalcSy();Z=this.cAs3dFrm_CalcSz();this.c_31=-V.x;this.c_32=-V.y;this.c_33=-V.z;this.c_11=-V.z;this.c_12=0;this.c_13=V.x;a=1/L(this.c_11,this.c_13);this.c_11*=a;this.c_13*=a;W.call(this,V);this.cAs3dFrm_SclPA(X,Y,Z)}return this},cCalcDet:function(){this.e_AC_11=+K(this.c_22,this.c_23,this.c_24,this.c_32,this.c_33,this.c_34,this.c_42,this.c_43,this.c_44);this.e_AC_12=-K(this.c_21,this.c_23,this.c_24,this.c_31,this.c_33,this.c_34,this.c_41,this.c_43,this.c_44);this.e_AC_13=+K(this.c_21,this.c_22,this.c_24,this.c_31,this.c_32,this.c_34,this.c_41,this.c_42,this.c_44);this.e_AC_14=-K(this.c_21,this.c_22,this.c_23,this.c_31,this.c_32,this.c_33,this.c_41,this.c_42,this.c_43);return this.c_11*this.e_AC_11+this.c_12*this.e_AC_12+this.c_13*this.e_AC_13+this.c_14*this.e_AC_14},cIvs:function(){var V=this.cCalcDet();if(0==V){throw new Error("cIvs：行列式为0，无法取逆！")}var W=-K(this.c_12,this.c_13,this.c_14,this.c_32,this.c_33,this.c_34,this.c_42,this.c_43,this.c_44),X=+K(this.c_11,this.c_13,this.c_14,this.c_31,this.c_33,this.c_34,this.c_41,this.c_43,this.c_44),Y=-K(this.c_11,this.c_12,this.c_14,this.c_31,this.c_32,this.c_34,this.c_41,this.c_42,this.c_44),Z=+K(this.c_11,this.c_12,this.c_13,this.c_31,this.c_32,this.c_33,this.c_41,this.c_42,this.c_43),a=+K(this.c_12,this.c_13,this.c_14,this.c_22,this.c_23,this.c_24,this.c_42,this.c_43,this.c_44),b=-K(this.c_11,this.c_13,this.c_14,this.c_21,this.c_23,this.c_24,this.c_41,this.c_43,this.c_44),c=+K(this.c_11,this.c_12,this.c_14,this.c_21,this.c_22,this.c_24,this.c_41,this.c_42,this.c_44),d=-K(this.c_11,this.c_12,this.c_13,this.c_21,this.c_22,this.c_23,this.c_41,this.c_42,this.c_43),e=-K(this.c_12,this.c_13,this.c_14,this.c_22,this.c_23,this.c_24,this.c_32,this.c_33,this.c_34),f=+K(this.c_11,this.c_13,this.c_14,this.c_21,this.c_23,this.c_24,this.c_31,this.c_33,this.c_34),g=-K(this.c_11,this.c_12,this.c_14,this.c_21,this.c_22,this.c_24,this.c_31,this.c_32,this.c_34),h=+K(this.c_11,this.c_12,this.c_13,this.c_21,this.c_22,this.c_23,this.c_31,this.c_32,this.c_33),i=1/V;this.c_11=this.e_AC_11*i;this.c_12=W*i;this.c_13=a*i;this.c_14=e*i;this.c_21=this.e_AC_12*i;this.c_22=X*i;this.c_23=b*i;this.c_24=f*i;this.c_31=this.e_AC_13*i;this.c_32=Y*i;this.c_33=c*i;this.c_34=g*i;this.c_41=this.e_AC_14*i;this.c_42=Z*i;this.c_43=d*i;this.c_44=h*i;return this}},{sc_Temps:null,scEnsrTemps:function(V){return E.unKnl.fEnsrTemps(U,V)},scCopy:function(V){U.oeVrfCopyOrig(V);return U.scAsn(new U(),V)},scAsn:function(V,W,X,Y){U.oeVrfAsnDstAndSrc(V,W);V.c_11=W.c_11;V.c_12=W.c_12;V.c_13=W.c_13;V.c_14=W.c_14;V.c_21=W.c_21;V.c_22=W.c_22;V.c_23=W.c_23;V.c_24=W.c_24;V.c_31=W.c_31;V.c_32=W.c_32;V.c_33=W.c_33;V.c_34=W.c_34;V.c_41=W.c_41;V.c_42=W.c_42;V.c_43=W.c_43;V.c_44=W.c_44;return V},scEq:function(V,W,X){var Y=E.stNumUtil.cEq;return Y(V.c_11,W.c_11,X)&&Y(V.c_12,W.c_12,X)&&Y(V.c_13,W.c_13,X)&&Y(V.c_14,W.c_14,X)&&Y(V.c_21,W.c_21,X)&&Y(V.c_22,W.c_22,X)&&Y(V.c_23,W.c_23,X)&&Y(V.c_24,W.c_24,X)&&Y(V.c_31,W.c_31,X)&&Y(V.c_32,W.c_32,X)&&Y(V.c_33,W.c_33,X)&&Y(V.c_34,W.c_34,X)&&Y(V.c_41,W.c_41,X)&&Y(V.c_42,W.c_42,X)&&Y(V.c_43,W.c_43,X)&&Y(V.c_44,W.c_44,X)}},false)})()}})();(function(){var A=("undefined"==typeof self),B=A?global:self;if(B.nWse&&B.nWse.nGpu&&B.nWse.nGpu.t2dCtxt){return}B.nWse.stAsynIcld.cFromLib("nWse:nGpu",["(0)GpuMath.js"],C);function C(D){console.log("2dCtxt.fOnIcld："+D);var E=B.nWse,F=E.stNumUtil,G=E.stStrUtil,H=E.stAryUtil,I=E.tSara,J=E.tClo,K=E.nGpu,L=K.unKnl,M=K.t4dVct,N=K.t4dMtx,O=12,P,Q,R;function S(e){if(!e){return false}if((e instanceof Image)){return e.complete}return true}L.fGpuCtxt=function(e){E.fClassBody(e,{cBindCvs:function(f){if(this.e_Cvs===f){return this.cRbndCvs()}var g=this.e_Cvs;if(this.e_Cvs){this.cUbndCvs()}this.e_Cvs=f;this.e_Ctxt=this.e_Cvs.getContext("2d");this.eOnRbndCvs();return this},cRbndCvs:function(){this.eOnRbndCvs();return this},cUbndCvs:function(){if(null==this.e_Cvs){return}this.e_Cvs=null;this.e_Ctxt=null;this.eOnRbndCvs();return this},cAcsCvs:function(){return this.e_Cvs},cAcs:function(){return this.e_Ctxt},cSetCvsDim:function(f,g){var h=(this.e_Cvs.width!=f),i=(this.e_Cvs.height!=g);if(h){this.e_Cvs.width=f}if(i){this.e_Cvs.height=g}return(h||i)?this.cRbndCvs():this},cGetCvsWid:function(){return this.e_Cvs.width},cGetCvsHgt:function(){return this.e_Cvs.height}})};function T(e){e.cAcs().setTransform(1,0,0,1,0,0)}function U(e,f){f?e.cAcs().setTransform(f.c_11,f.c_12,f.c_21,f.c_22,f.c_41,f.c_42):T(e)}L.fSetTsfm=U;function V(e){var f=e.cAcs(),g=f.font.indexOf("px");return(g>=0)?parseInt(f.font.substr(0,g),10):0}function W(e,f,g){e.e_MesrTextRst.c_W=e.e_MesrTextRst.c_H=0;if(!g){f=f.toString();if(0==f.length){return e.e_MesrTextRst}f=E.stStrUtil.cExpdTab(f)}e.e_MesrTextRst.c_W=e.cAcs().measureText(f).width;e.e_MesrTextRst.c_H=V(e);return e.e_MesrTextRst}function X(e,f,g,h){e.e_MesrTextRst.c_W=e.e_MesrTextRst.c_H=0;if(!h){f=f.toString();if(0==f.length){return e.e_MesrTextRst}f=G.cExpdTab(f)}var i=G.cSplToLines(f),j=H.cFindMax(i,function(a_Tgt,a_Idx,a_Line){var l_Rst=0;var i,l_Len=a_Line.length;for(i=0;i<l_Len;++i){l_Rst+=(a_Line.charCodeAt(i)<256)?1:2}return l_Rst});e.e_MesrTextRst.c_W=e.cAcs().measureText(i[j]).width;e.e_MesrTextRst.c_H=(V(e)+g)*i.length-g;return e.e_MesrTextRst}function Y(e){e=e.toString();if(0<e.length){e=E.stStrUtil.cExpdTab(e)}return e}function Z(e,f,g,h,i,j){f=Y(f);if(0==f.length){return e}if(h instanceof I){i=i.valueOf()}else{if(!R){R=new I()}R.c_X=h;R.c_Y=i;h=R;i=-1}if(g&&e.cClipPath){e.cAcs().save();e.cClipPath(g,null)}b(e);if(j){U(e,j)}c(e,f,g,h,i,j);if(j){T(e)}if(g){e.cAcs().restore()}return e}function a(e,f,g,h,i,j,k){f=Y(f);if(0==f.length){return e}if(i instanceof I){j=j.valueOf()}else{if(!R){R=new I()}R.c_X=i;R.c_Y=j;i=R;j=-1}if(h&&e.cClipPath){e.cAcs().save();e.cClipPath(h,null)}b(e);var l=i.c_Y;if((i.c_W>0)&&(i.c_H>0)&&(0<=j)&&(j<=8)){if(!P){P=new I()}X(e,f,g,true);P.c_W=e.e_MesrTextRst.c_W;P.c_H=e.e_MesrTextRst.c_H;I.scDockPut(P,i,j);l=P.c_Y}var m=G.cSplToLines(f),n=V(e),o=n+g;if(!Q){Q=new I()}Q.c_X=i.c_X;Q.c_W=i.c_W;Q.c_H=o;switch(j){case 1:case 8:{j=2}break;case 5:case 6:{j=4}break;case 0:case 7:{j=3}break}if(k){U(e,k)}E.stAryUtil.cFor(m,function(p,q,r){Q.c_Y=l+q*o;c(e,r,null,Q,j,k)});if(k){T(e)}if(h){e.cAcs().restore()}return e}function b(e){var f=e.cAcs();f.textAlign="start";f.textBaseline="top"}function c(e,f,g,h,i,j){var k=e.cAcs(),l=h.c_X,m=h.c_Y;if((h.c_W>0)&&(h.c_H>0)&&(0<=i)&&(i<=8)){if(!P){P=new I()}W(e,f,true);P.c_W=e.e_MesrTextRst.c_W;P.c_H=e.e_MesrTextRst.c_H;I.scDockPut(P,h,i);l=P.c_X;m=P.c_Y}(0==e_DrawMthd)?k.strokeText(f,l,m):k.fillText(f,l,m)}var d;(function(){d=E.fClassHead(K,function t2dCtxt(){this.e_DrawMthd=0;this.e_MesrTextRst={c_W:0,c_H:0}},null);L.fGpuCtxt(d);E.fClassBody(d,{eOnRbndCvs:function(){},cRsetTsfmMtx:function(){T(this);return this},cGetDrawMthd:function(){return this.e_DrawMthd},cSetDrawMthd:function(e){this.e_DrawMthd=e||0;return this},cClr:function(e){var f=this.cAcs();e?f.clearRect(e.c_X,e.c_Y,e.c_W,e.c_H):f.clearRect(0,0,this.cGetCvsWid(),this.cGetCvsHgt());return this},cFill:function(e,f){var g=this.cAcs();g.fillStyle=f?J.scToCssCloStr(f):"rgba(0, 0, 0, 1)";e?g.fillRect(e.c_X,e.c_Y,e.c_W,e.c_H):g.fillRect(0,0,this.cGetCvsWid(),this.cGetCvsHgt());return this},cSetFont:function(e,f,g,h){this.cAcs().font=(h||"normal")+" "+(g||400)+" "+(f||16)+"px "+(e||"Arial");return this},cGetFontHgt:function(){return V(this)},cMesrTextLine:function(e,f){W(this,f);e.c_W=this.e_MesrTextRst.c_W;e.c_H=this.e_MesrTextRst.c_H;return e},cMesrText:function(e,f,g){X(this,f,g);e.c_W=this.e_MesrTextRst.c_W;e.c_H=this.e_MesrTextRst.c_H;return e},cDrawTextLine:function(e,f,g,h,i){return Z(this,e,f,g,h,i)},cDrawText:function(e,f,g,h,i,j){return a(this,e,f,g,h,i,j)},cSetAph:function(e){this.e_Ctxt.globalAlpha=e;return this},cSetCpstOp_AphMap:function(){this.e_Ctxt.globalCompositeOperation="source-over";return this},cIsImgAvlb:function(e){return S(e)},cMap:function(e,f,g,h){if(!S(f)){return}if(!e){if(!P){P=new I()}P.cCrt$Wh(this.cGetCvsWid(),this.cGetCvsHgt());e=P}var i=false,j=false;if(!g){if(!Q){Q=new I()}Q.cCrt$Wh(f.width,f.height);g=Q}else{if(!Q){Q=new I()}g=I.scAsn(Q,g);if(g.c_W<0){g.c_W=-g.c_W;i=true}if(g.c_H<0){g.c_H=-g.c_H;j=true}}U(this,h);var k=e.c_W/2,l=e.c_H/2,m=e.c_X+k,n=e.c_Y+l;this.e_Ctxt.translate(m,n);if(i&&j){this.e_Ctxt.scale(-1,-1)}else if(i){this.e_Ctxt.scale(-1,1)}else if(j){this.e_Ctxt.scale(1,-1)}this.e_Ctxt.translate(-m,-n);this.e_Ctxt.drawImage(f,g.c_X,g.c_Y,g.c_W,g.c_H,e.c_X,e.c_Y,e.c_W,e.c_H);T(this);return this},cClrShdw:function(){var e=this.cAcs();e.shadowColor="rgba(0, 0, 0, 0)";e.shadowOffsetX=0;e.shadowOffsetY=0;e.shadowBlur=0;return this},cSaveCfg:function(){this.cAcs().save();return this},cRstoCfg:function(){this.cAcs().restore();return this}})})()}})();(function(){var A=("undefined"==typeof self),B=A?global:self;if(B.nWse&&B.nWse.nGpu&&B.nWse.nGpu.t2dCtxt&&B.nWse.nGpu.t2dCtxt.tPath){return}B.nWse.stAsynIcld.cFromLib("nWse:nGpu",["2dCtxt.js"],C);function C(D){console.log("2dPath.fOnIcld："+D);var E=B.nWse,F=E.stNumUtil,G=E.stStrUtil,H=E.stAryUtil,I=E.tSara,J=E.nGpu,K=J.unKnl,L=J.t4dVct,M=J.t4dMtx,N=J.t2dCtxt,O,P;function Q(U,V,W){if(W){K.fSetTsfm(U,W)}E.stAryUtil.cFor(V.e_StepAry,function(X,Y,Z){Z.c_fMthd(U,V,Y,W)});if(W){fRsetTsfm(U)}}function R(U,V,W,X){if(!V){U.cMoveTo(W,X)}else{U.cLineTo(W,X)}}function S(U,V,W,X,Y,Z,a){var b=Z+a*U,c=Math.cos(b),d=Math.sin(b),e=(U%2)?X:Y;O=V+e*c;P=W+e*d}(function(){E.fClassBody(N,{cBldPath:function(U,V){if(U){Q(this,U,V)}return this},cClipPath:function(U,V){var W=this.cAcs();if(U){Q(this,U,V)}W.clip();return this},cDrawPath:function(U,V){var W=this.cAcs();if(U){Q(this,U,V)}(0==this.e_DrawMthd)?W.stroke():W.fill();return this},cIsPntInPath:function(U,V,W){var X=this.cAcs();if(U){Q(this,U,null)}return X.isPointInPath(V,W)}})})();var T;(function(){T=E.fClass(N,function tPath(){this.cRset()},null,{dAcsStepAry:function(){return this.e_StepAry},cIsEmt:function(){return(!this.e_StepAry)||(1==this.e_StepAry.length)},cRset:function(){if(this.e_StepAry&&(1==this.e_StepAry.length)){return this}this.e_StepAry=[];var U={};U.c_fMthd=function(V,W,X,Y){V.cAcs().beginPath()};this.e_StepAry.push(U);return this},cCls:function(){var U={};U.c_fMthd=function(V,W,X,Y){V.cAcs().closePath()};this.e_StepAry.push(U);return this},cMoveTo:function(U,V){var W={};W.c_fMthd=function(X,Y,Z,a){X.cAcs().moveTo(U,V)};this.e_StepAry.push(W);return this},cLineTo:function(U,V){var W={};W.c_fMthd=function(X,Y,Z,a){X.cAcs().lineTo(U,V)};this.e_StepAry.push(W);return this},cArc:function(U,V,W,X,Y,Z){var a=Math.abs(Z-Y);if(a>=Math.PI*2){if(Y<Z){Y=0;Z=Math.PI*2}else{Y=Math.PI*2;Z=0}}var b,c,d,e;if(!U){b=Math.cos(Y);c=Math.sin(Y);d=V+X*b;e=W+X*c;this.cMoveTo(d,e)}var f={};f.c_fMthd=function(g,h,i,j){g.cAcs().arc(V,W,X,Y,Z,(Y>Z))};this.e_StepAry.push(f);return this},cElpsArc:function(U,V,W,X,Y,Z,a){var b=Math.abs(a-Z);if(b>=Math.PI*2){if(Z<a){Z=0;a=Math.PI*2}else{Z=Math.PI*2;a=0}}if(!U){l_Cos=Math.cos(Z);l_Sin=Math.sin(Z);l_STPx=V+X*l_Cos;l_STPy=W+Y*l_Sin;this.cMoveTo(l_STPx,l_STPy)}var c={};c.c_fMthd=function(d,e,f,g){var h=d.cAcs();h.translate(V,W);h.scale(X,Y);h.arc(0,0,1,Z,a,(Z>a));K.fSetTsfm(d,g)};this.e_StepAry.push(c);return this},cFan:function(U,V,W,X,Y,Z){return this.cElpsFan(U,V,W,X,X,Y,Z)},cElpsFan:function(U,V,W,X,Y,Z,a){var b=Math.abs(a-Z);if(b>=Math.PI*2){this.cElpsArc(U,V,W,X,Y,Z,a);return this}this.cElpsArc(U,V,W,X,Y,Z,a);this.cLineTo(V,W);return this},cRingArc:function(U,V,W,X,Y,Z,a){return this.cElpsRingArc(U,V,W,X,X,Y,Z,a)},cElpsRingArc:function(U,V,W,X,Y,Z,a,b){if(!b){return this.cElpsArc(U,V,W,X,Y,Z,a)}var c=X+b,d=Y+b;if((c<=0)||(d<=0)){return this.cElpsFan(U,V,W,X,Y,Z,a)}var e=Math.abs(a-Z);if(e>=Math.PI*2){this.cElpsArc(U,V,W,X,Y,Z,a);this.cElpsArc(false,V,W,c,d,a,Z);return this}var f,g,h,i;f=Math.cos(Z);g=Math.sin(Z);h=V+X*f;i=W+Y*g;this.cElpsArc(U,V,W,X,Y,Z,a);this.cElpsArc(true,V,W,c,d,a,Z);this.cLineTo(h,i);return this},cArcTo:function(U,V,W,X,Y){var Z={};Z.c_fMthd=function(a,b,c,d){a.cAcs().arcTo(U,V,W,X,Y)};this.e_StepAry.push(Z);return this},cBzrTo:function(U,V,W,X,Y,Z){var a={};a.c_fMthd=function(b,c,d,e){b.cAcs().bezierCurveTo(U,V,W,X,Y,Z)};this.e_StepAry.push(a);return this},cQdrTo:function(U,V,W,X){var Y={};Y.c_fMthd=function(Z,a,b,c){Z.cAcs().quadraticCurveTo(U,V,W,X)};this.e_StepAry.push(Y);return this},cPlgn:function(U,V){var W=V[0],X;R(this,U,W.x,W.y);var i,Y=V.length;for(i=1;i<Y;++i){X=V[i];this.cLineTo(X.x,X.y)}if(Y>=3){this.cLineTo(W.x,W.y)}return this},cTrg:function(U,V,W,X,Y,Z,a){R(this,U,V,W);this.cLineTo(X,Y);this.cLineTo(Z,a);this.cLineTo(V,W);return this},cCir:function(U,V,W,X,Y){var Z=Y?(Math.PI*2):0,a=Y?0:(Math.PI*2);return this.cArc(U,V,W,X,Z,a)},cRing:function(U,V,W,X,Y,Z){var a=Z?(Math.PI*2):0,b=Z?0:(Math.PI*2);return this.cRingArc(U,V,W,X,a,b,Y)},cElps:function(U,V,W,X,Y,Z){var a=Z?(Math.PI*2):0,b=Z?0:(Math.PI*2);return this.cElpsArc(U,V,W,X,Y,a,b)},cElpsRing:function(U,V,W,X,Y,Z,a){var b=a?(Math.PI*2):0,c=a?0:(Math.PI*2);return this.cElpsRingArc(U,V,W,X,Y,b,c,Z)},cCaps:function(U,V,W,X,Y){var Z=Math.abs(X),a=Math.abs(Y),b=E.stNumUtil.cCmpr(Z,a),c,d;if(0==b){c=X/2;d=Math.abs(c);return this.cCir(U,V+c,W+c,d)}var e=(b>0);c=e?Y/2:X/2;d=Math.abs(c);R(this,U,V+c,W);this.cArcTo(V+X,W,V+X,W+Y,d);this.cArcTo(V+X,W+Y,V,W+Y,d);this.cArcTo(V,W+Y,V,W,d);this.cArcTo(V,W,V+X,W,d);return this},cRect:function(U,V,W,X,Y){R(this,U,V,W);this.cLineTo(V+X,W);this.cLineTo(V+X,W+Y);this.cLineTo(V,W+Y);this.cLineTo(V,W);return this},cRcRect:function(U,V,W,X,Y,Z){var a=Math.abs(X),b=Math.abs(Y),c,d,e,f,g,h,i,j;if(E.fIsNum(Z)){if(Z<=0){return this.cRect(U,V,W,X,Y)}if(Z*2>=Math.min(a,b)){return this.cCaps(U,V,W,X,Y)}c=d=e=f=Z}else if(E.fIsAry(Z)){c=Z[0];d=Z[1];e=Z[2];f=Z[3];if(c+d>a){g=a/(c+d)*c;h=a/(c+d)*d;c=g;d=h}if(d+e>b){h=b/(d+e)*d;i=b/(d+e)*e;d=h;e=i}if(e+f>a){i=a/(e+f)*e;j=a/(e+f)*f;e=i;f=j}if(f+c>b){j=b/(f+c)*f;g=b/(f+c)*c;f=j;c=g}}else{return this.cRect(U,V,W,X,Y)}var k=E.stNumUtil.cSign(X);R(this,U,V+k*c,W);this.cArcTo(V+X,W,V+X,W+Y,d);this.cArcTo(V+X,W+Y,V,W+Y,e);this.cArcTo(V,W+Y,V,W,f);this.cArcTo(V,W,V+X,W,c);return this},cEcRect:function(U,V,W,X,Y,Z,a){var b=Math.abs(X),c=Math.abs(Y),d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s;if(E.fIsNum(Z)){if((Z<=0)||(a<=0)){return this.cRect(U,V,W,X,Y)}if((Z*2>=b)&&(a*2>=c)){return this.cElps(U,V+X/2,W+Y/2,X/2,Y/2)}d=e=f=g=Z;l=m=n=o=a}else if(E.fIsAry(Z)){d=Z[0];e=Z[1];f=Z[2];g=Z[3];l=a[0];m=a[1];n=a[2];o=a[3];if(d+e>b){h=b/(d+e)*d;i=b/(d+e)*e;d=h;e=i}if(m+n>c){q=c/(m+n)*m;r=c/(m+n)*n;m=q;n=r}if(f+g>b){j=b/(f+g)*f;k=b/(f+g)*g;f=j;g=k}if(o+l>c){s=c/(o+l)*o;p=c/(o+l)*l;o=s;l=p}}else{return this.cRect(U,V,W,X,Y)}if(X<0){if(Y<0){R(this,U,V+b-f,W+c);this.cLineTo(V+g,W+c);this.cElpsArc(true,V+g,W+c-o,g,o,-Math.PI*3/2,-Math.PI);this.cLineTo(V,W+l);this.cElpsArc(true,V+d,W+l,d,l,-Math.PI,-Math.PI/2);this.cLineTo(V+b-e,W);this.cElpsArc(true,V+b-e,W+m,e,m,-Math.PI/2,0);this.cLineTo(V+b,W+c-n);this.cElpsArc(true,V+b-f,W+c-n,f,n,0,Math.PI/2)}else{R(this,U,V+b-e,W);this.cLineTo(V+d,W);this.cElpsArc(true,V+d,W+l,d,l,Math.PI*3/2,Math.PI);this.cLineTo(V,W+c-o);this.cElpsArc(true,V+g,W+c-o,g,o,Math.PI,Math.PI/2);this.cLineTo(V+b-f,W+c);this.cElpsArc(true,V+b-f,W+c-n,f,n,+Math.PI/2,0);this.cLineTo(V+b,W+m);this.cElpsArc(true,V+b-e,W+m,e,m,0,-Math.PI/2)}}else{if(Y<0){R(this,U,V+d,W+c);this.cLineTo(V+b-f,W+c);this.cElpsArc(true,V+b-f,W+c-n,f,n,+Math.PI/2,0);this.cLineTo(V+b,W+m);this.cElpsArc(true,V+b-e,W+m,e,m,0,-Math.PI/2);this.cLineTo(V+d,W);this.cElpsArc(true,V+d,W+l,d,l,-Math.PI/2,-Math.PI);this.cLineTo(V,W+c-o);this.cElpsArc(true,V+g,W+c-o,g,o,-Math.PI,-Math.PI*3/2)}else{R(this,U,V+d,W);this.cLineTo(V+b-e,W);this.cElpsArc(true,V+b-e,W+m,e,m,-Math.PI/2,0);this.cLineTo(V+b,W+c-n);this.cElpsArc(true,V+b-f,W+c-n,f,n,0,+Math.PI/2);this.cLineTo(V+g,W+c);this.cElpsArc(true,V+g,W+c-o,g,o,+Math.PI/2,Math.PI);this.cLineTo(V,W+l);this.cElpsArc(true,V+d,W+l,d,l,Math.PI,Math.PI*3/2)}}return this},cArw:function(U,V,W,X,Y,Z,a,b){var c=(X-V),d=(Y-W),e=Math.sqrt(c*c+d*d);if(E.stNumUtil.cIz(e)){return this}var f=c/e,g=d/e,h=-g,i=f,j=Math.max(e-Z,0),k=V-h*b,l=W-i*b,m=k+f*j,n=l+g*j,o=m-h*(a-b),p=n-i*(a-b),q=o+h*a*2,r=p+i*a*2,s=m+h*b*2,t=n+i*b*2,u=V+h*b,v=W+i*b;R(this,U,k,l);this.cLineTo(m,n);this.cLineTo(o,p);this.cLineTo(X,Y);this.cLineTo(q,r);this.cLineTo(s,t);this.cLineTo(u,v);this.cLineTo(k,l);return this},cEqlaPlgn:function(U,V,W,X,Y,Z){Z=Z||0;var a=Math.cos(Z),b=Math.sin(Z),c=V+X*a,d=W+X*b;R(this,U,c,d);var e=1;for(;e<Y;++e){S(e,V,W,X,X,Z,2*Math.PI/Y);this.cLineTo(O,P)}if(Y>=3){this.cLineTo(c,d)}return this},cStarPlgn:function(U,V,W,X,Y,Z,a){a=a||0;if(Z<=2){return this.cEqlaPlgn(U,V,W,Y,Z,a)}var b=Math.cos(a),c=Math.sin(a),d=V+Y*b,e=W+Y*c;R(this,U,d,e);var f=Z*2,g=1;for(;g<f;++g){S(g,V,W,X,Y,a,2*Math.PI/f);this.cLineTo(O,P)}this.cLineTo(d,e);return this}},{},false)})()}})();