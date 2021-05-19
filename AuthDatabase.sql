
Create table Roles(
	roleid int not null primary key identity(1,1),
	rolename nvarchar(2000) not null
);

Create table Users (
	usid int not null identity(1,1) primary key ,
	username nvarchar(4000) not null,
	email nvarchar(2000),
	password nvarchar(4000) not null,
	phone nvarchar(10),
	role int not null,
	address nvarchar(4000)
	foreign key (role) references Roles(roleid)
);

Create table Groups(
	groupid int not null primary key identity(1,1),
	groupname nvarchar(4000) not null,
	active bit,
	note nvarchar(4000)
);
Create table UserPermissions(
	usid int not null,
	groupid int not null,
	primary key (usid,groupid),
	createday datetime,
	foreign key (usid) references Users(usid),
	foreign key (groupid) references Groups(groupid)
); 

Create table Permissions(
	perid int not null identity (1,1) primary key,
	pername nvarchar(4000) not null,
	policy nvarchar(4000) not null,
	active bit,
	link nvarchar(4000),
	action nvarchar(1000),
	note nvarchar(4000),
	parent_id int
);

ALTER TABLE Permissions ADD CONSTRAINT fk_parent_id
    FOREIGN KEY (parent_id) REFERENCES Permissions(perid);
	
create table GroupPermissions(
	groupid int not null,
	perid int not null,
	primary key (groupid,perid),
	foreign key (groupid) references Groups(groupid),
	foreign key (perid) references Permissions(perid),
	createday datetime
);


Create table PermissionTranslations(
transid int not null primary key,
perid int not null ,
languages nvarchar(2000) not null,
pername nvarchar(4000) not null,
foreign key (perid) references Permissions(perid)
);

Create table Languages(
	langid int not null primary key identity(1,1),
	langname nvarchar(2000) not null,
	active bit,
	languages nvarchar(100) not null
);
--drop table Actions;
--drop table Categories;
--drop table Permisions;
--drop table UserPermisstions;
--drop table Users;