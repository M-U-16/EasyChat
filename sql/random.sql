alter table participants add foreign key (room_id) references rooms(room_id);
alter table participants add foreign key (user_id) references users(user_id);
alter table messages add foreign key (room_id) references rooms(room_id);
alter table messages add foreign key (user_id) references users(user_id);

#show full columns from messages;
#show full columns from participants;
#show full columns from user_settings;
#show full columns from users;

#alter table room drop column room_id;

# dropping all tables
drop table users;
drop table messages;
drop table participants;
drop table rooms;

select last_insert_id();
alter table rooms auto_increment = 1;
#show table status from rooms like auto_increment;
SELECT `auto_increment` FROM INFORMATION_SCHEMA.TABLES
WHERE table_name = 'rooms';

select * from users;
select * from participants;
select * from rooms;
select * from messages;

update users set status=true where user_id > 0;

delete from participants where user_id > 0;
delete from users where user_id > 0;
delete from rooms where room_id > 0;

alter table rooms auto_increment=1;
alter table participants auto_increment=1;

select username from users
inner join participants on users.user_id = participants.user_id;