CREATE TABLE user_sessions (
    password_hash TEXT NOT NULL,
    owner_publickey TEXT NOT NULL,
    session_publickey TEXT NOT NULL,
    soft_deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (owner_publickey, session_publickey)
);

-- Create an index on owner_publickey for faster lookups
CREATE INDEX idx_owner_publickey ON user_sessions (owner_publickey);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_timestamp_trigger
BEFORE UPDATE ON user_sessions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();
