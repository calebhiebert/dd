
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id          VARCHAR       NOT NULL      PRIMARY KEY,
  name        VARCHAR(30)   NOT NULL,
  image_url   VARCHAR(2000) NOT NULL,
  created_at  BIGINT        NOT NULL      DEFAULT EXTRACT(EPOCH FROM NOW())
);