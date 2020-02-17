create table member_t(
	username varchar(20) not null,
    password varchar(20) not null,
    fullname varchar(40) not null,
    dateofbirth date not null,
    gender enum('M', 'F') not null,
    email varchar(30) not null,
    issuspended bool not null, -- Need to initialize issuspended - false
    participantflag bool not null,
    university varchar(40),
    ownerflag bool not null,
    organization varchar(40),
    nationalid varchar(13),
    constraint member_pk primary key (username)
);

delimiter //
create trigger member_issuspended before insert on member_t for each row
if (isnull(new.issuspended)) then
set new.issuspended = false;
end if;
//
delimiter ;

create table workshop(
	workshopid varchar(20) not null,
    name varchar(40) not null,
    place varchar(100) not null,
    publishtime timestamp not null, -- Trigger now() before insert
	deadlinetime timestamp not null, -- User input?
    description varchar(300) not null,
    pictureurl varchar(512),
    cost decimal(7,2) not null, -- 0.00 <= cost <= 99999.99
    capacity int not null, -- 1 <= capacity <= 10000
    starttime timestamp, -- can be null in case if TBD?
    endtime timestamp, -- can be null in case if TBD?
    speakername varchar(80),
    ownerusername varchar(20) not null, -- FK to username:member_t
    constraint workshop_pk primary key (workshopid),
    check (cost >= 0 and cost <= 99999.99),
    check (capacity >= 1 and capacity <= 10000),
    constraint workshop_fk foreign key (ownerusername) references member_t(username)
	on update cascade on delete cascade
);

delimiter //
create trigger workshop_publishtime before insert on workshop for each row
if (isnull(new.publishtime)) then
set new.publishtime = now();
end if;
//
delimiter ;

create table carddetail(
	cardid varchar(16) not null,
    expirydate datetime not null, -- Maybe always label date as 1?
	username varchar(20) not null, -- FK to username:member_t
    constraint carddetail_pk primary key (cardid, username),
    constraint carddetail_fk foreign key (username) references member_t(username)
	on update cascade on delete cascade -- If the username is updated, the card points to the new username. If the user is deleted, the card is also deleted.
);

create table feedback(
	feedbackid varchar(20) not null,
    comment varchar(150) not null,
    username varchar(20) not null, -- FK to username:member_t
    constraint feedback_pk primary key (feedbackid),
    constraint feedback_fk foreign key (username) references member_t(username)
	on update cascade on delete cascade -- If the username is updated, the feedback points to the new username. If the user is deleted, the feedback will also be deleted.
);

create table review(
	reviewid varchar(20) not null,
    rating decimal(2,1) not null, -- 0.5 <= value <= 5
    timewritten timestamp not null, -- Trigger now() before insert
    comment varchar(15) not null,
    workshopid varchar(20) not null, -- FK to workshopid:workshop
    username varchar(20) not null, -- FK to username:member_t
    constraint review_pk primary key (reviewid),
    check (rating >= 0.5 AND rating <= 5),
    constraint review_fk1 foreign key (username) references member_t(username)
	on update cascade on delete cascade, -- If the username is updated, the review points to the new username. If the user is deleted, the review will also be deleted.
    constraint review_fk2 foreign key (workshopid) references workshop(workshopid)
	on update cascade on delete cascade -- If the workshopid is updated, the review points to the new workshopid. If the workshop is deleted, the review will also be deleted.
);

delimiter //
create trigger review_timewritten before insert on review for each row
if (isnull(new.timewritten)) then
set new.timewritten = now();
end if;
//
delimiter ;

create table books(
	username varchar(20) not null, -- FK to username:member_t
    workshopid varchar(20) not null, -- FK to workshopid:workshop
    timebooked timestamp not null, -- now()?
    hasparticipated bool not null, -- false on created?
    transactiondetails varchar(256), -- varchar for now
    constraint books_pk primary key (username, workshopid),
    constraint books_fk1 foreign key (username) references member_t(username)
	on update cascade on delete cascade, -- If the username is updated, the booking points to the new username. If the user is deleted, the booking will also be deleted.
    constraint books_fk2 foreign key (workshopid) references workshop(workshopid)
	on update cascade on delete cascade -- If the workshopid is updated, the booking points to the new workshopid. If the workshop is deleted, the booking will also be deleted.
);

delimiter //
create trigger books_timebooked before insert on books for each row
if (isnull(new.timebooked)) then
set new.timebooked = now();
end if;
//
delimiter ;

delimiter //
create trigger books_hasparticipated before insert on books for each row
if (isnull(new.hasparticipated)) then
set new.hasparticipated = false;
end if;
//
delimiter ;

create table tags(
	workshopid varchar(20) not null, -- FK to workshopid:workshop
    tag varchar(30) not null,
    constraint tags_pk primary key (workshopid, tag),
    constraint tags_fk foreign key (workshopid) references workshop(workshopid)
	on update cascade on delete cascade -- If the workshopid is updated, the tag points to the new workshopid. If the workshop is deleted, the tag will also be deleted.
);