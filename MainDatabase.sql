
CREATE TABLE [dbo].[KhoaSoTramBTS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[thang] [int] NULL,
	[nam] [int] NULL,
	[trang_thai] [int] NULL,
	[ngay_cn] [datetime] NULL,
	[nguoi_cn] [int] NULL,
)


CREATE TABLE [dbo].[SoTramBTS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[thang] [int] NULL,
	[nam] [int] NULL,
	[loai_tram] [nvarchar](50) NULL,
	[sitename] [nvarchar](50) NULL,
	[sitename_vnp] [nvarchar](50) NULL,
	[long_y] [nvarchar](50) NULL,
	[lat_x] [nvarchar](50) NULL,
	[ngayphatsong] [datetime] NULL,
	[ngaynhapks] [datetime] NULL,
	[sonha] [nvarchar](400) NULL,
	[tenap_vn] [nvarchar](50) NULL,
	[tenduong_vn] [nvarchar](400) NULL,
	[tenphuong_vn] [nvarchar](50) NULL,
	[tenquan_vn] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_cn] [datetime] NULL,
	[nguoi_cn] [int] NULL,
)