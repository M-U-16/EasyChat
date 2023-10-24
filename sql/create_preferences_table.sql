create table users (
	user_id bigint unsigned primary key not null auto_increment collate utf8mb4_0900_ai_ci,
    username varchar(60) not null unique,
    email varchar(100) not null unique,
    password varchar(100) not null
);

create table rooms (
	room_id bigint unsigned primary key not null auto_increment collate utf8mb4_0900_ai_ci,
    room_name varchar(100),
    private boolean
);

create table messages (
	message_id bigint primary key auto_increment not null collate utf8mb4_0900_ai_ci,
    room_id bigint unsigned not null,
    message text,
    user_id bigint unsigned not null,
    cration_date datetime,
    foreign key(user_id) references users(user_id),
    foreign key(room_id) references rooms(room_id)
);

create table participants (
	participant_id bigint unsigned primary key not null auto_increment collate utf8mb4_0900_ai_ci,
    room_id bigint unsigned not null collate utf8mb4_0900_ai_ci,
    user_id bigint unsigned not null collate utf8mb4_0900_ai_ci,
    foreign key(room_id) references rooms(room_id),
    foreign key(user_id) references users(user_id)
);

alter table participants add foreign key (room_id) references rooms(room_id);
alter table participants add foreign key (user_id) references users(user_id);
alter table messages add foreign key (room_id) references rooms(room_id);
alter table messages add foreign key (user_id) references users(user_id);

show full columns from messages;
show full columns from participants;
show full columns from user_settings;
show full columns from users;

#alter table room drop column room_id;

# dropping all tables
drop table users;
drop table messages;
drop table participants;
drop table rooms;