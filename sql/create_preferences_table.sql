CREATE TABLE users (
  user_id bigint unsigned auto_increment PRIMARY KEY,
  username varchar(60) NOT NULL UNIQUE,
  email varchar(100) Not null unique,
  password varchar(100) not null
);

create table user_preferences (
	preference_id int unique auto_increment,
    user_id int,
    auto_login boolean,
    primary key (preference_id),
    foreign key (user_id) references users(user_id)
);

CREATE TABLE chat_groups (
  group_id bigint unsigned auto_increment PRIMARY KEY,
  groupname varchar(60) NOT NULL UNIQUE
);

CREATE TABLE group_users (
  group_id bigint unsigned,
  user_id bigint unsigned,
  PRIMARY KEY (group_id, user_id),
  CONSTRAINT group_users_fk1 FOREIGN KEY (group_id) REFERENCES chat_groups (group_id),
  CONSTRAINT group_users_fk2 FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE messages (
  message_id bigint unsigned auto_increment PRIMARY KEY,
  user_id bigint unsigned,
  message TEXT,
  CONSTRAINT messages_fk1 FOREIGN KEY (user_id) REFERENCES users (user_id)    
); 