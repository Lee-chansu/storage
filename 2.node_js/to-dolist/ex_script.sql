SELECT * FROM todolist.users;

insert into users values(null, "tutle", "tutle482!@#", "010-xxxx-xxxx",now(), now());
insert into users values(null, "root", "1234", "010-xxxx-xxxx",now(), now());
insert into users values(null, "java", "java482!@#", "010-xxxx-xxxx",now(), now());

SELECT * FROM todolist.schedules;

INSERT INTO schedules VALUES(null, 1, "tutle님의 스케줄러", "2.숨쉬기", "2024-02-21", now(), now());
INSERT INTO schedules VALUES(null, 2, "java님의 스케줄러", "1.책읽기", "2024-02-20", now(), now());