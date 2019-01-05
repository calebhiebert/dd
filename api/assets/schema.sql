
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR       NOT NULL      PRIMARY KEY,
  name        VARCHAR(30)   NOT NULL,
  image_url   VARCHAR(2000) NOT NULL,
  created_at  BIGINT        NOT NULL      DEFAULT EXTRACT(EPOCH FROM NOW())
);

CREATE TABLE IF NOT EXISTS temporary_ids (
  id          CHAR(16)      NOT NULL      PRIMARY KEY,
  type        VARCHAR(10)   NOT NULL,
  user_id     VARCHAR       NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS access_token_cache (
  token       VARCHAR       NOT NULL,
  user_id     VARCHAR       NOT NULL,

  FOREIGN KEY (user_id) REFERENCES users (id)
)