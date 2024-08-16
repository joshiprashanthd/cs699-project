drop database bookhavendb;
drop user bookhaven;
create user bookhaven with password 'password';
create database bookhavendb with template=template0 owner=bookhaven;
\connect bookhavendb;
alter default privileges grant all on tables to bookhaven;
alter default privileges grant all on sequences to bookhaven;

create table bh_users(
                         user_id integer primary key not null,
                         first_name varchar(40) not null,
                         last_name varchar(40) not null,
                         email varchar(50) not null,
                         password text not null,
                         is_admin boolean not null,
                         date_joined bigint not null,
                         about_me text
);

create table bh_books(
                         book_id integer primary key not null,
                         title varchar(500) not null,
                         subtitle varchar(500),
                         authors varchar(1000) not null,
                         genre varchar(500) not null,
                         description text,
                         published_year bigint not null,
                         num_pages integer not null,
                         image_url varchar(5000),
                         average_rating numeric(4, 1) not null,
                         ratings_count bigint not null
);

create table bh_book_reviews(
                                book_review_id bigint primary key not null,
                                book_id integer not null,
                                user_id integer not null,
                                rating numeric(4,1) not null,
                                review_text text not null,
                                review_datetime bigint not null
);
alter table bh_book_reviews add constraint book_reviews_book_fk
    foreign key (book_id) references bh_books(book_id);
alter table bh_book_reviews add constraint book_reviews_user_fk
    foreign key (user_id) references bh_users(user_id);

create table bh_user_libraries(
                                  user_library_id bigint primary key not null,
                                  user_id integer not null,
                                  book_id integer not null,
                                  has_read boolean not null,
                                  bookmarked boolean not null
);
alter table bh_user_libraries add constraint user_libraries_user_fk
    foreign key (user_id) references bh_users(user_id);
alter table bh_user_libraries add constraint user_libraries_book_fk
    foreign key (book_id) references bh_books(book_id);

create table bh_forums(
                          forum_id bigint primary key not null,
                          title varchar(500) not null,
                          created_by integer not null,
                          created_date bigint not null,
                          modified_date bigint not null
);
alter table bh_forums add constraint forums_user_fk
    foreign key (created_by) references bh_users(user_id);

create table bh_forum_chats(
                               forum_chat_id bigint primary key not null,
                               forum_id bigint not null,
                               user_id integer not null,
                               chat_text text not null,
                               created_date bigint not null,
                               modified_date bigint not null
);
alter table bh_forum_chats add constraint forum_chats_forum_fk
    foreign key (forum_id) references bh_forums(forum_id);
alter table bh_forum_chats add constraint forum_chats_user_fk
    foreign key (user_id) references bh_users(user_id);

create sequence bh_users_seq increment 1 start 1;
create sequence bh_books_seq increment 1 start 1;
create sequence bh_genres_seq increment 1 start 1;
create sequence bh_book_genre_mapping_seq increment 1 start 1;
create sequence bh_book_reviews_seq increment 1 start 1;
create sequence bh_user_libraries_seq increment 1 start 1;
create sequence bh_forums_seq increment 1 start 1;
create sequence bh_forum_chats_seq increment 1 start 1;