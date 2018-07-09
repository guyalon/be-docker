--    CREATE USER postgres;
--    DROP DATABASE IF EXISTS twitter;
--    CREATE DATABASE twitter;
--    GRANT ALL PRIVILEGES ON DATABASE twitter TO postgres;
--

    \c twitter;

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