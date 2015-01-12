/*
*/

#include "stdafx.h"

#include <time.h>

#include <iostream>
using namespace std;


void w_JDToGD(const double &dbJD, int &year, int &month, int &day, int &hour, int &minute, int &second);
double w_GDToJD(const int &year, const int &month, const int &day, const int &hour, const int &minute, const int &second);

//----------------------------- 常量

// 节气枚举
enum SOLARTERMS
{
	ST_VERNAL_EQUINOX = 0,    // 春分
	ST_CLEAR_AND_BRIGHT = 15,   // 清明
	ST_GRAIN_RAIN = 30,     // 谷雨
	ST_SUMMER_BEGINS = 45,    // 立夏
	ST_GRAIN_BUDS = 60,     // 小满
	ST_GRAIN_IN_EAR = 75,    // 芒种
	ST_SUMMER_SOLSTICE = 90,   // 夏至
	ST_SLIGHT_HEAT = 105,    // 小暑
	ST_GREAT_HEAT = 120,    // 大暑
	ST_AUTUMN_BEGINS = 135,    // 立秋
	ST_STOPPING_THE_HEAT = 150,   // 处暑
	ST_WHITE_DEWS = 165,    // 白露
	ST_AUTUMN_EQUINOX = 180,   // 秋分
	ST_COLD_DEWS = 195,     // 寒露
	ST_HOAR_FROST_FALLS = 210,   // 霜降
	ST_WINTER_BEGINS = 225,    // 立冬
	ST_LIGHT_SNOW = 240,    // 小雪
	ST_HEAVY_SNOW = 255,    // 大雪
	ST_WINTER_SOLSTICE = 270,   // 冬至
	ST_SLIGHT_COLD = 285,    // 小寒
	ST_GREAT_COLD = 300,    // 大寒
	ST_SPRING_BEGINS = 315,    // 立春
	ST_THE_RAINS = 330,     // 雨水
	ST_INSECTS_AWAKEN = 345    // 惊蛰
};

// 圆周率
const double i_Pi = 3.1415926535897932384626433832795;


//----------------------------- 天文数据

struct VSOP87_COEFFICIENT
{
	double A, B, C;
};
int const i_SizeOfVsopCoe = sizeof(VSOP87_COEFFICIENT);

struct NUTATION_COEFFICIENT
{
	double   nD;
	double   nM;
	double   nMprime;
	double   nF;
	double   nOmega;
	double   nSincoeff1;
	double dSincoeff2;		// double
	double   nCoscoeff1;
	double dCoscoeff2;		// double
};
int const i_SizeOfNutnCoe = sizeof(NUTATION_COEFFICIENT);

// 太阳黄经
double const i_Earth_L0[] =
{
	175347046.0, 0.0000000, 000000.0000000,
	3341656.0, 4.6692568, 6283.0758500,
	34894.0, 4.6261000, 12566.1517000,
	3497.0, 2.7441000, 5753.3849000,
	3418.0, 2.8289000, 3.5231000,
	3136.0, 3.6277000, 77713.7715000,
	2676.0, 4.4181000, 7860.4194000,
	2343.0, 6.1352000, 3930.2097000,
	1324.0, 0.7425000, 11506.7698000,
	1273.0, 2.0371000, 529.6910000,
	1199.0, 1.1096000, 1577.3435000,
	990.0, 5.2330000, 5884.9270000,
	902.0, 2.0450000, 26.2980000,
	857.0, 3.5080000, 398.1490000,
	780.0, 1.1790000, 5223.6940000,
	753.0, 2.5330000, 5507.5530000,
	505.0, 4.5830000, 18849.2280000,
	492.0, 4.2050000, 775.5230000,
	357.0, 2.9200000, 000000.0670000,
	317.0, 5.8490000, 11790.6290000,
	284.0, 1.8990000, 796.2880000,
	271.0, 0.3150000, 10977.0790000,
	243.0, 0.3450000, 5486.7780000,
	206.0, 4.8060000, 2544.3140000,
	205.0, 1.8690000, 5573.1430000,
	202.0, 2.4580000, 6069.7770000,
	156.0, 0.8330000, 213.2990000,
	132.0, 3.4110000, 2942.4630000,
	126.0, 1.0830000, 20.7750000,
	115.0, 0.6450000, 000000.9800000,
	103.0, 0.6360000, 4694.0030000,
	102.0, 0.9760000, 15720.8390000,
	102.0, 4.2670000, 7.1140000,
	99.0, 6.2100000, 2146.1700000,
	98.0, 0.6800000, 155.4200000,
	86.0, 5.9800000, 161000.6900000,
	85.0, 1.3000000, 6275.9600000,
	85.0, 3.6700000, 71430.7000000,
	80.0, 1.8100000, 17260.1500000,
	79.0, 3.0400000, 12036.4600000,
	75.0, 1.7600000, 5088.6300000,
	74.0, 3.5000000, 3154.6900000,
	74.0, 4.6800000, 801.8200000,
	70.0, 0.8300000, 9437.7600000,
	62.0, 3.9800000, 8827.3900000,
	61.0, 1.8200000, 7084.9000000,
	57.0, 2.7800000, 6286.6000000,
	56.0, 4.3900000, 14143.5000000,
	56.0, 3.4700000, 6279.5500000,
	52.0, 0.1900000, 12139.5500000,
	52.0, 1.3300000, 1748.0200000,
	51.0, 0.2800000, 5856.4800000,
	49.0, 0.4900000, 1194.4500000,
	41.0, 5.3700000, 8429.2400000,
	41.0, 2.4000000, 19651.0500000,
	39.0, 6.1700000, 10447.3900000,
	37.0, 6.0400000, 10213.2900000,
	37.0, 2.5700000, 1059.3800000,
	36.0, 1.7100000, 2352.8700000,
	36.0, 1.7800000, 6812.7700000,
	33.0, 0.5900000, 17789.8500000,
	30.0, 0.4400000, 83996.8500000,
	30.0, 2.7400000, 1349.8700000,
	25.0, 3.1600000, 4690.4800000
};

double const i_Earth_L1[] = 
{
	628331966747.0, 0.000000, 00000.0000000,
	206059.0, 2.678235, 6283.0758500,
	4303.0, 2.635100, 12566.1517000,
	425.0, 1.590000, 3.5230000,
	119.0, 5.796000, 26.2980000,
	109.0, 2.966000, 1577.3440000,
	93.0, 2.590000, 18849.2300000,
	72.0, 1.140000, 529.6900000,
	68.0, 1.870000, 398.1500000,
	67.0, 4.410000, 5507.5500000,
	59.0, 2.890000, 5223.6900000,
	56.0, 2.170000, 155.4200000,
	45.0, 0.400000, 796.3000000,
	36.0, 0.470000, 775.5200000,
	29.0, 2.650000, 7.1100000,
	21.0, 5.430000, 00000.9800000,
	19.0, 1.850000, 5486.7800000,
	19.0, 4.970000, 213.3000000,
	17.0, 2.990000, 6275.9600000,
	16.0, 0.030000, 2544.3100000,
	16.0, 1.430000, 2146.1700000,
	15.0, 1.210000, 10977.0800000,
	12.0, 2.830000, 1748.0200000,
	12.0, 3.260000, 5088.6300000,
	12.0, 5.270000, 1194.4500000,
	12.0, 2.080000, 4694.0000000,
	11.0, 0.770000, 553.5700000,
	10.0, 1.300000, 6286.6000000,
	10.0, 4.240000, 1349.8700000,
	9.0, 2.700000, 242.7300000,
	9.0, 5.640000, 951.7200000,
	8.0, 5.300000, 2352.8700000,
	6.0, 2.650000, 9437.7600000,
	6.0, 4.670000, 4690.4800000
};

double const i_Earth_L2[] =
{
	52919.0, 0.0000, 00000.0000,
	8720.0, 1.0721, 6283.0758,
	309.0, 0.8670, 12566.1520,
	27.0, 0.0500, 3.5200,
	16.0, 5.1900, 26.3000,
	16.0, 3.6800, 155.4200,
	10.0, 0.7600, 18849.2300,
	9.0, 2.0600, 77713.7700,
	7.0, 0.8300, 775.5200,
	5.0, 4.6600, 1577.3400,
	4.0, 1.0300, 7.1100,
	4.0, 3.4400, 5573.1400,
	3.0, 5.1400, 796.3000,
	3.0, 6.0500, 5507.5500,
	3.0, 1.1900, 242.7300,
	3.0, 6.1200, 529.6900,
	3.0, 0.3100, 398.1500,
	3.0, 2.2800, 553.5700,
	2.0, 4.3800, 5223.6900,
	2.0, 3.7500, 00000.9800
};

double const i_Earth_L3[] =
{
	289.0, 5.844, 6283.076,
	35.0, 0.000, 00000.000,
	17.0, 5.490, 12566.150,
	3.0, 5.200, 155.420,
	1.0, 4.720, 3.520,
	1.0, 5.300, 18849.230,
	1.0, 5.970, 242.730
};

double const i_Earth_L4[] =
{
	114.0, 3.142, 00000.00,
	8.0, 4.130, 6283.08,
	1.0, 3.840, 12566.15
};

double const i_Earth_L5[] =
{
	1.0, 3.14, 0.0
};

// 太阳黄纬
double const i_Earth_B0[] =
{
	280.0, 3.199, 84334.662,
	102.0, 5.422, 5507.553,
	80.0, 3.880, 5223.690,
	44.0, 3.700, 2352.870,
	32.0, 4.000, 1577.340
};

double const i_Earth_B1[] =
{
	9.0, 3.90, 5507.55,
	6.0, 1.73, 5223.69
};

double const i_Earth_B2[] =
{
	22378.0, 3.38509, 10213.28555,
	282.0, 0.00000, 00000.00000,
	173.0, 5.25600, 20426.57100,
	27.0, 3.87000, 30639.86000
};

double const i_Earth_B3[] =
{
	647.0, 4.992, 10213.286,
	20.0, 3.140, 00000.000,
	6.0, 0.770, 20426.570,
	3.0, 5.440, 30639.860
};

double const i_Earth_B4[] =
{
	14.0, 0.32, 10213.29
};

// 太阳地球距离
double const i_Earth_R0[] =
{
	100013989, 0, 0,
	1670700, 3.0984635, 6283.0758500,
	13956, 3.05525, 12566.15170,
	3084, 5.1985, 77713.7715,
	1628, 1.1739, 5753.3849,
	1576, 2.8469, 7860.4194,
	925, 5.453, 11506.770,
	542, 4.564, 3930.210,
	472, 3.661, 5884.927,
	346, 0.964, 5507.553,
	329, 5.900, 5223.694,
	307, 0.299, 5573.143,
	243, 4.273, 11790.629,
	212, 5.847, 1577.344,
	186, 5.022, 10977.079,
	175, 3.012, 18849.228,
	110, 5.055, 5486.778,
	98, 0.89, 6069.78,
	86, 5.69, 15720.84,
	86, 1.27, 161000.69,
	65, 0.27, 17260.15,
	63, 0.92, 529.69,
	57, 2.01, 83996.85,
	56, 5.24, 71430.70,
	49, 3.25, 2544.31,
	47, 2.58, 775.52,
	45, 5.54, 9437.76,
	43, 6.01, 6275.96,
	39, 5.36, 4694.00,
	38, 2.39, 8827.39,
	37, 0.83, 19651.05,
	37, 4.90, 12139.55,
	36, 1.67, 12036.46,
	35, 1.84, 2942.46,
	33, 0.24, 7084.90,
	32, 0.18, 5088.63,
	32, 1.78, 398.15,
	28, 1.21, 6286.60,
	28, 1.90, 6279.55,
	26, 4.59, 10447.39
};

double const i_Earth_R1[] =
{
	103019, 1.107490, 6283.075850,
	1721, 1.0644, 12566.1517,
	702, 3.142, 0,
	32, 1.02, 18849.23,
	31, 2.84, 5507.55,
	25, 1.32, 5223.69,
	18, 1.42, 1577.34,
	10, 5.91, 10977.08,
	9, 1.42, 6275.96,
	9, 0.27, 5486.78
};

double const i_Earth_R2[] =
{
	4359, 5.7846, 6283.0758,
	124, 5.579, 12566.152,
	12, 3.14, 0,
	9, 3.63, 77713.77,
	6, 1.87, 5573.14,
	3, 5.47, 18849.23
};

double const i_Earth_R3[] =
{
	145, 4.273, 6283.076,
	7, 3.92, 12566.15
};

double const i_Earth_R4[] =
{
	4, 2.56, 6283.08
};

// 地球章动
double const i_Earth_N0[] =
{
	0, 0, 0, 0, 1, -171996, -174.2, 92025, 8.9,
	-2, 0, 0, 2, 2, -13187, -1.6, 5736, -3.1,
	0, 0, 0, 2, 2, -2274, -0.2, 977, -0.5,
	0, 0, 0, 0, 2, 2062, 0.2, -895, 0.5,
	0, 1, 0, 0, 0, 1426, -3.4, 54, -0.1,
	0, 0, 1, 0, 0, 712, 0.1, -7, 0,
	-2, 1, 0, 2, 2, -517, 1.2, 224, -0.6,
	0, 0, 0, 2, 1, -386, -0.4, 200, 0,
	0, 0, 1, 2, 2, -301, 0, 129, -0.1,
	-2, -1, 0, 2, 2, 217, -0.5, -95, 0.3,
	-2, 0, 1, 0, 0, -158, 0, 0, 0,
	-2, 0, 0, 2, 1, 129, 0.1, -70, 0,
	0, 0, -1, 2, 2, 123, 0, -53, 0,
	2, 0, 0, 0, 0, 63, 0, 0, 0,
	0, 0, 1, 0, 1, 63, 0.1, -33, 0,
	2, 0, -1, 2, 2, -59, 0, 26, 0,
	0, 0, -1, 0, 1, -58, -0.1, 32, 0,
	0, 0, 1, 2, 1, -51, 0, 27, 0,
	-2, 0, 2, 0, 0, 48, 0, 0, 0,
	0, 0, -2, 2, 1, 46, 0, -24, 0,
	2, 0, 0, 2, 2, -38, 0, 16, 0,
	0, 0, 2, 2, 2, -31, 0, 13, 0,
	0, 0, 2, 0, 0, 29, 0, 0, 0,
	-2, 0, 1, 2, 2, 29, 0, -12, 0,
	0, 0, 0, 2, 0, 26, 0, 0, 0,
	-2, 0, 0, 2, 0, -22, 0, 0, 0,
	0, 0, -1, 2, 1, 21, 0, -10, 0,
	0, 2, 0, 0, 0, 17, -0.1, 0, 0,
	2, 0, -1, 0, 1, 16, 0, -8, 0,
	-2, 2, 0, 2, 2, -16, 0.1, 7, 0,
	0, 1, 0, 0, 1, -15, 0, 9, 0,
	-2, 0, 1, 0, 1, -13, 0, 7, 0,
	0, -1, 0, 0, 1, -12, 0, 6, 0,
	0, 0, 2, -2, 0, 11, 0, 0, 0,
	2, 0, -1, 2, 1, -10, 0, 5, 0,
	2, 0, 1, 2, 2, -8, 0, 3, 0,
	0, 1, 0, 2, 2, 7, 0, -3, 0,
	-2, 1, 1, 0, 0, -7, 0, 0, 0,
	0, -1, 0, 2, 2, -7, 0, 3, 0,
	2, 0, 0, 2, 1, -7, 0, 3, 0,
	2, 0, 1, 0, 0, 6, 0, 0, 0,
	-2, 0, 2, 2, 2, 6, 0, -3, 0,
	-2, 0, 1, 2, 1, 6, 0, -3, 0,
	2, 0, -2, 0, 1, -6, 0, 3, 0,
	2, 0, 0, 0, 1, -6, 0, 3, 0,
	0, -1, 1, 0, 0, 5, 0, 0, 0,
	-2, -1, 0, 2, 1, -5, 0, 3, 0,
	-2, 0, 0, 0, 1, -5, 0, 3, 0,
	0, 0, 2, 2, 1, -5, 0, 3, 0,
	-2, 0, 2, 0, 1, 4, 0, 0, 0,
	-2, 1, 0, 2, 1, 4, 0, 0, 0,
	0, 0, 1, -2, 0, 4, 0, 0, 0,
	-1, 0, 1, 0, 0, -4, 0, 0, 0,
	-2, 1, 0, 0, 0, -4, 0, 0, 0,
	1, 0, 0, 0, 0, -4, 0, 0, 0,
	0, 0, 1, 2, 0, 3, 0, 0, 0,
	0, 0, -2, 2, 2, -3, 0, 0, 0,
	-1, -1, 1, 0, 0, -3, 0, 0, 0,
	0, 1, 1, 0, 0, -3, 0, 0, 0,
	0, -1, 1, 2, 2, -3, 0, 0, 0,
	2, -1, -1, 2, 2, -3, 0, 0, 0,
	0, 0, 3, 2, 2, -3, 0, 0, 0,
	2, -1, 0, 2, 2, -3, 0, 0, 0
};

//----------------------------- 函数

double fRadFromDeg(double a_Deg)
{
	return a_Deg * i_Pi / 180;
}

double fDegFromRad(double a_Rad)
{
	return a_Rad * 180 / i_Pi;
}

double fNmlzDeg0360(double a_Deg) // ∈[0, 360)
{
	while (a_Deg < 0)
	{
		a_Deg += 360;
	}

	while (a_Deg >= 360)
	{
		a_Deg -= 360;
	}

	return a_Deg;
}

double fNmlzRad02Pi(double a_Rad) // ∈[0, 2Pi)
{
	auto i_2Pi = 2.0 * i_Pi;
	while (a_Rad < 0)
	{
		a_Rad += i_2Pi;
	}

	while (a_Rad >= i_2Pi)
	{
		a_Rad -= i_2Pi;
	}

	return a_Rad;
}

double fJMFromJD(double a_JD)
{
	auto l_Rst = (a_JD - 2451545.0) / 365250.0;
	return l_Rst;
}

double CalcPeriodicTerm(double const *a_pCoe, int a_Amt, int a_Npe, double a_JM) // millennium千年
{
	double l_Rst = 0;
	int l_ElmtAmt = a_Amt / a_Npe;
	int l_ElmtIdx = 0;
	int l_BaseIdx;
	for (; l_ElmtIdx < l_ElmtAmt; ++ l_ElmtIdx)
	{
		l_BaseIdx = l_ElmtIdx * a_Npe;
		l_Rst += a_pCoe[l_BaseIdx + 0] * ::cos(a_pCoe[l_BaseIdx + 1] + a_pCoe[l_BaseIdx + 2] * a_JM);
	}
	return l_Rst;
}

// 计算太阳黄经
double CalcSunEclipticLongitudeEC(double a_JM)
{
	auto l_JM = a_JM;
	auto l_L0 = CalcPeriodicTerm(i_Earth_L0, _countof(i_Earth_L0), 3, l_JM);
	auto l_L1 = CalcPeriodicTerm(i_Earth_L1, _countof(i_Earth_L1), 3, l_JM);
	auto l_L2 = CalcPeriodicTerm(i_Earth_L2, _countof(i_Earth_L2), 3, l_JM);
	auto l_L3 = CalcPeriodicTerm(i_Earth_L3, _countof(i_Earth_L3), 3, l_JM);
	auto l_L4 = CalcPeriodicTerm(i_Earth_L4, _countof(i_Earth_L4), 3, l_JM);
	auto l_L5 = CalcPeriodicTerm(i_Earth_L5, _countof(i_Earth_L5), 3, l_JM);
	auto l_L = (((((l_L5 * l_JM + l_L4) * l_JM + l_L3) * l_JM + l_L2) * l_JM + l_L1) * l_JM + l_L0) / 1e8; // 弧度
	auto l_Rst = fNmlzDeg0360(fNmlzDeg0360(fDegFromRad(l_L)) + 180);
	return l_Rst;
}

// 计算太阳黄纬
double CalcSunEclipticLatitudeEC(double a_JM)
{
	auto l_JM = a_JM;
	auto l_B0 = CalcPeriodicTerm(i_Earth_B0, _countof(i_Earth_B0), 3, l_JM);
	auto l_B1 = CalcPeriodicTerm(i_Earth_B1, _countof(i_Earth_B1), 3, l_JM);
	auto l_B2 = CalcPeriodicTerm(i_Earth_B2, _countof(i_Earth_B2), 3, l_JM);
	auto l_B3 = CalcPeriodicTerm(i_Earth_B3, _countof(i_Earth_B3), 3, l_JM);
	auto l_B4 = CalcPeriodicTerm(i_Earth_B4, _countof(i_Earth_B4), 3, l_JM);
	double l_B = (((((l_B4 * l_JM) + l_B3) * l_JM + l_B2) * l_JM + l_B1) * l_JM + l_B0) / 1e8; // 弧度
	auto l_Rst = -fDegFromRad(l_B);
	return l_Rst;
}

// 计算日地距离
double CalcSunEarthRadius(double a_JM)
{
	auto l_JM = a_JM;
	auto l_R0 = CalcPeriodicTerm(i_Earth_R0, _countof(i_Earth_R0), 3, l_JM);
	auto l_R1 = CalcPeriodicTerm(i_Earth_R1, _countof(i_Earth_R1), 3, l_JM);
	auto l_R2 = CalcPeriodicTerm(i_Earth_R2, _countof(i_Earth_R2), 3, l_JM);
	auto l_R3 = CalcPeriodicTerm(i_Earth_R3, _countof(i_Earth_R3), 3, l_JM);
	auto l_R4 = CalcPeriodicTerm(i_Earth_R4, _countof(i_Earth_R4), 3, l_JM);
	double l_R = (((((l_R4 * l_JM) + l_R3) * l_JM + l_R2) * l_JM + l_R1) * l_JM + l_R0) / 1e8;
	auto l_Rst = l_R;
	return l_Rst;
}

// 修正太阳黄经
double AdjustSunEclipticLongitudeEC(double a_LonDeg, double a_LatDeg, double a_JM)
{
	auto l_JC = a_JM * 10;	// 儒略世纪
	auto l_DtaLonDeg = a_LonDeg - 1.397 * l_JC - 0.00031 * l_JC * l_JC;
	auto l_DtaLonRad = fRadFromDeg(l_DtaLonDeg);
	auto l_LatRad = fRadFromDeg(a_LatDeg);
	auto l_Rst = (-0.09033 + 0.03916 * (::cos(l_DtaLonRad) + ::sin(l_DtaLonRad)) * ::tan(l_LatRad)) / 3600.0; // 从秒（度分秒）转成度
	return l_Rst;
}

// 计算地球章动
void GetEarthNutationParameter(double a_JC, double *D, double *M, double *Mp, double*F, double *Omega)
{
	auto l_JC = a_JC;
	auto l_JC2 = l_JC * l_JC;
	auto l_JC3 = l_JC2 * l_JC;

	// 平距角（如月对地心的角距离）
	*D = 297.85036 + 445267.111480 * l_JC - 0.0019142 * l_JC2 + l_JC3 / 189474.0;

	// 太阳（地球）平近点角
	*M = 357.52772 + 35999.050340 * l_JC - 0.0001603 * l_JC2 - l_JC3 / 300000.0;

	// 月亮平近点角
	*Mp = 134.96298 + 477198.867398 * l_JC + 0.0086972 * l_JC2 + l_JC3 / 56250.0;

	// 月亮纬度参数
	*F = 93.27191 + 483202.017538 * l_JC - 0.0036825 * l_JC2 + l_JC3 / 327270.0;

	// 黄道与月亮平轨道升交点黄经
	*Omega = 125.04452 - 1934.136261 * l_JC + 0.0020708 * l_JC2 + l_JC3 / 450000.0;

	*D = fNmlzDeg0360(*D);
	*M = fNmlzDeg0360(*M);
	*Mp = fNmlzDeg0360(*Mp);
	*F = fNmlzDeg0360(*F);
	*Omega = fNmlzDeg0360(*Omega);
}

double fCalcNutnPeriodicTerm(double const *a_pCoe, int a_Amt, int a_Npe, double a_JM, // millennium千年
	double D, double M, double Mp, double F, double Omega, double a_JC)
{
	//struct NUTATION_COEFFICIENT
	//{
	//	double   nD;
	//	double   nM;
	//	double   nMprime;
	//	double   nF;
	//	double   nOmega;
	//	double   nSincoeff1;
	//	double dSincoeff2;		// double
	//	double   nCoscoeff1;
	//	double dCoscoeff2;		// double
	//}

	double l_Rst = 0;
	int l_ElmtAmt = a_Amt / a_Npe;
	int l_ElmtIdx = 0;
	int l_BaseIdx;
	double l_Tht;
	for (; l_ElmtIdx < l_ElmtAmt; ++l_ElmtIdx)
	{
		l_BaseIdx = l_ElmtIdx * a_Npe;
		l_Tht = a_pCoe[l_BaseIdx + 0] * D + a_pCoe[l_BaseIdx + 1] * M
			+ a_pCoe[l_BaseIdx + 2] * Mp + a_pCoe[l_BaseIdx + 3] * F + a_pCoe[l_BaseIdx + 4] * Omega;

	//	l_Tht = fNmlzRad02Pi(l_Tht);	// 算出来的是弧度？×
		l_Tht = fRadFromDeg(fNmlzDeg0360(l_Tht));	// 还是角度？√
		l_Rst += (a_pCoe[l_BaseIdx + 5] + a_pCoe[l_BaseIdx + 6] * a_JC) * ::sin(l_Tht);
	}
	return l_Rst;
}

double CalcEarthLongitudeNutation(double a_JM)
{
	auto l_JC = a_JM * 10;	// 儒略世纪

	double D, M, Mp, F, Omega;	// 都是角度！
	GetEarthNutationParameter(l_JC, &D, &M, &Mp, &F, &Omega);

	auto l_Nutn = fCalcNutnPeriodicTerm(i_Earth_N0, _countof(i_Earth_N0), 9, a_JM, D, M, Mp, F, Omega, l_JC);
	l_Nutn = l_Nutn * 0.0001 / 3600.0; // 先乘以章动表的系数 0.0001，然后换算成度的单位
	return l_Nutn;
}

// 计算太阳的地心黄经
double GetSunEclipticLongitudeECDegree(double a_JD, SOLARTERMS ST_SolarTerms)
{
	auto l_JM = fJMFromJD(a_JD); // 儒略千年

	// 计算太阳的地心黄经
	double longitude = CalcSunEclipticLongitudeEC(l_JM);

	// 计算太阳的地心黄纬
//	double latitude = CalcSunEclipticLatitudeEC(l_JM) * 3600.0;
	double latitude = CalcSunEclipticLatitudeEC(l_JM);

	// 修正精度
	longitude += AdjustSunEclipticLongitudeEC(longitude, latitude, l_JM);

	// 修正天体章动
	longitude += CalcEarthLongitudeNutation(l_JM);

	// 修正光行差
	// 太阳地心黄经光行差修正项是: -20".4898/R
	auto i_K = 20.49552 / 3600; // 20.4898 20.49552
//	longitude -= (i_K / CalcSunEarthRadius(l_JM));					// 慢了大约2分钟
	longitude -= (i_K / CalcSunEarthRadius(l_JM)) * 0.8;			// 快了约12秒
//	longitude -= (i_K / CalcSunEarthRadius(l_JM)) * (0.8 + 0.00625);	// 快了24秒
//	longitude -= (i_K / CalcSunEarthRadius(l_JM)) * (0.8 + 0.00625);	// 快了24秒

//	longitude -= (i_K / CalcSunEarthRadius(l_JM)) / (20 * i_Pi);	// 快了大约7分钟

	longitude = ((ST_SolarTerms == ST_VERNAL_EQUINOX) && (longitude > 345.0)) ? (longitude - 360) : longitude;
	return longitude;
}

double fEstmInitGuess(int a_Year, SOLARTERMS a_Ang);
double fCalcSolarTerms_Newton2(const int &year, const SOLARTERMS &ST_SolarTerms)
{
	double JD0, JD1, stDegree, stDegreep;
	JD1 = fEstmInitGuess(year, ST_SolarTerms);

	int l_Cnt = 0;
	do
	{
		JD0 = JD1;
		stDegree = GetSunEclipticLongitudeECDegree(JD0, ST_SolarTerms) - (double)ST_SolarTerms;
	//	cout << stDegree << endl;

		stDegreep = (GetSunEclipticLongitudeECDegree(JD0 + 0.000005, ST_SolarTerms) 
			- GetSunEclipticLongitudeECDegree(JD0 - 0.000005, ST_SolarTerms)) / 0.00001;
		JD1 = JD0 - stDegree / stDegreep;

		++l_Cnt;
	} while ((fabs(JD1 - JD0) > 0.0000001) && (l_Cnt < 100));	// 最多迭代100次

	cout << "牛顿迭代次数 = " << l_Cnt << endl;
	return JD1;
}

//// 测试
void fTest()
{
	/*auto l_JM = (2456006.5000000000 - 2451545.0) / 365250.0;
	CalcSunEclipticLatitudeEC(l_JM);*/
}



