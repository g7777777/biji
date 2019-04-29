-- SQL 是一门标准计算机语言,用来访问和操作数据库系统
-- SQL语言分类
-- DML  数据操纵语言 (*)
	-- insert 
	-- delete
	-- update
	-- select
-- DDL  数据定义语言
	-- create
	-- drop 
	-- alter 
	-- truncate   -- 删除表记录
-- DCL  数据控制语言
   -- grant
   -- revoke

-- 数据表的结构是一个二维表,定义表结构的时候就是在定义列(列名,列类型,默认值等)
   -- 数据列又称字段或者域
   -- 数据行又称记录或实体
   
-- 每一张数据表应该有一个主键 (primary key), 主键保证数据的唯一性,此表中不充许存在相同的主键
	-- 这是对数据表尽量不冗余(不应该存在两条完全一样的数据行)
   
-- 插入记录
-- insert into 数据库名.数据表名[(字段名1, 字段名2...)] values (值1, 值2...)
	--  其中(字段名1, 字段名2...)可以省略,代表所有字段,且按照正常顺序
-- insert into 数据库名.数据表名[(字段名1, 字段名2...)] values 
	-- (值1, 值2...),
	-- (值1, 值2...),
	-- (值1, 值2...)
					
insert into student.student_info values (1001, '小明', '15269875654');

insert into student.student_info (stu_id, stu_name) values (1005, '小红');

insert into student.student_info (stu_name, stu_id) values
											('aaa', 1060),
											('bbb', 1096),
											('ccc', 1895);
											
insert into student.student_info (stu_id, stu_name) values (1800, '刘丽'), (1956, '刘一明'), (1630, '李明');
									
-- insert into student.student_info (stu_name, stu_id) values ('aaa', 1895);  主键重复,报错

-- 删除数据记录(表的行)
-- delete from 数据库名.数据表名 [where 条件]
-- delete from student.student_info;   --删除全表数据
-- 只删除符合条件stu_id=1895的记录
delete from student.student_info where stu_id = 1895;
-- 删除电话信息为null的记录
delete from student.student_info where stu_phone is null;
-- 删除id在1095-1900之间的记录
delete from student.student_info where stu_id between 1095 and 1900;
-- 删除姓刘的学员记录
delete from student.student_info where stu_name like '刘%';
-- 删除姓刘并且名字是两个字符的记录
delete from student.student_info where stu_name like '刘_';

-- 另一种删除全表数据的方法(高效),不能根据条件删除
truncate table student.student_info;


insert into bbs.user_info values (null, 'admin', password('123'), now(), '15689784563');
insert into bbs.user_info values (null, '管理员', password('456'), now(), '15687845563');


-- 修改数据(更新数据)
-- update 数据库名.表名 set 字段名=新值,字段名=新值 [where 条件]
-- 为uid=1的用户修改电话
update bbs.user_info set phone = '13529986544' where uid = 1;
-- 为所有人改密码为'111'
update bbs.user_info set userpwd = md5('111');
-- 为用户名为admin的用户修改密码及电话
update bbs.user_info set userpwd = md5('admin'), phone = '77777777777' where username = 'admin';

-- 查询数据
-- select 字段名1,字段2... from 数据库.数据表 [where 条件 group by ... order by...]
	-- select * from  数据库.数据表   (查询某个表下的所有数据列)
select * from bbs.user_info;
select * from bbs.user_info where username = 'admin';
select * from bbs.user_info where phone = '77777777777';
-- 查询用户为admin密码为admin的用户是否存在
select * from bbs.user_info where username = 'admin' and userpwd = md5('amin');
-- 查询uid为1或2的用户信息
select * from bbs.user_info where uid = 1 or uid = 2;

select username, regtime from bbs.user_info where uid = 1 or uid = 2;



-- DDL
-- 删除表(删除表结构以及表数据)
drop table student.student_info;

-- 删除库
drop database student;