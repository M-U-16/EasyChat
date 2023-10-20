use chatapp;
drop table user_preferences;
create table user_preferences (
	preference_id int not null unique,
    user_id int not null unique,
    save_user_login boolean,
    primary key (preference_id),
    foreign key (user_id) references users(user_id)
);
select * from users;