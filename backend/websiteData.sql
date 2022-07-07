DROP TABLE IF EXISTS hospitals,gallery,physicians,users,ratings,reviews,hratings,hreviews ;


-- CREATE TABLE users(
--     id SERIAL PRIMARY KEY,
--     username TEXT NOT NULL,
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     password TEXT NOT NULL,
--     email TEXT NOT NULL,
--     is_admin BOOLEAN NOT NULL DEFAULT FALSE 
-- );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    image_url TEXT,
    isAdmin BOOLEAN DEFAULT FALSE
);
CREATE TABLE gallery(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    image_url TEXT NOT NULL
);

CREATE TABLE hospitals (
    id SERIAL PRIMARY KEY,
    name TEXT,
    city TEXT,
    service_type TEXT,
    location_type TEXT,
    address TEXT,
    phone TEXT,
    fax TEXT,
    hospital_website TEXT ,
    rating INTEGER DEFAULT 0
    );
CREATE TABLE physicians (
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT,
    title TEXT,
    specialty TEXT,
    located TEXT,
    street_name TEXT,
    city TEXT,
    image_url TEXT,
    phone TEXT,
    physician_bio TEXT,
    rating INTEGER DEFAULT 0
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY ,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    physician_id INTEGER REFERENCES physicians ON DELETE CASCADE,
    review TEXT,
    rating INTEGER NOT NULL
    
);
CREATE TABLE hreviews(
    id SERIAL PRIMARY KEY ,
    user_id INTEGER REFERENCES users ON DELETE CASCADE,
    hospital_id INTEGER REFERENCES physicians ON DELETE CASCADE,
    review TEXT,
    rating INTEGER NOT NULL
);


