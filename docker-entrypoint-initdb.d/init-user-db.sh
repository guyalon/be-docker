#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER $POSTGRES_USER;
    DROP DATABASE IF EXISTS $POSTGRES_DB;
    CREATE DATABASE $POSTGRES_DB;
    GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;

    \c $POSTGRES_DB;

    CREATE TABLE tweets (
      ID SERIAL PRIMARY KEY,
      content VARCHAR(140),
      username VARCHAR(20),
      likes_count INTEGER,
      retweet_count INTEGER,
      created_at DATE,
      updated_at DATE
    );

    CREATE TABLE retweets (
      retweet_id SERIAL PRIMARY KEY,
      content VARCHAR(140),
      tweet_user VARCHAR(20),
      tweet_id INTEGER references tweets(ID),
      created_at DATE,
      updated_at DATE
    );

    CREATE TABLE likes (
      like_user VARCHAR(20),
      tweet_id INTEGER references tweets(ID),
      created_at DATE,
      updated_at DATE
    );


    INSERT INTO tweets (content, username, likes_count, retweet_count, created_at, updated_at)
      VALUES ('This is all i have to say', 'TweeterGuy', 1, 1,now(),now());

    INSERT INTO retweets (content, tweet_user, tweet_id, created_at, updated_at)
      VALUES ('No way you cannot say anything else', 'TweeterDude', 1, now(),now());

    INSERT INTO likes (like_user, tweet_id, created_at, updated_at)
      VALUES ('TweeterBro', 1, now(),now());

EOSQL
