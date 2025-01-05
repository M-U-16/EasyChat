create table if not exists users (
	user_id INTEGER primary key AUTOINCREMENT,
    username varchar(60) not null unique,
    email varchar(100) not null unique,
    password varchar(100) not null,
    userDir text not null unique
);

create table if not exists rooms (
	room_id INTEGER primary key AUTOINCREMENT,
    room_hash varchar(100),
    room_name varchar(100),
    isContact boolean,
    private boolean
);

create table if not exists messages (
	message_id INTEGER primary key AUTOINCREMENT,
    room_id INTEGER not null,
    message text,
    user_id INTEGER not null,
    created_at datetime,
    foreign key(user_id) references users(user_id),
    foreign key(room_id) references rooms(room_id)
);

create table if not exists participants (
	participant_id INTEGER primary key AUTOINCREMENT,
    room_id INTEGER not null,
    user_id INTEGER not null,
    foreign key(room_id) references rooms(room_id),
    foreign key(user_id) references users(user_id)
);