CREATE TABLE participants (
    owner_publickey TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (owner_publickey)
);

