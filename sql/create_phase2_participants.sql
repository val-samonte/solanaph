CREATE TABLE participants_phase2 (
    owner_publickey TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (owner_publickey)
);

