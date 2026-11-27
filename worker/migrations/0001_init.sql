-- Enquiries submitted from the website forms.
CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  reference TEXT NOT NULL UNIQUE,
  kind TEXT NOT NULL CHECK (kind IN ('brief', 'quick')),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  company TEXT,
  service TEXT,
  answers TEXT NOT NULL,           -- JSON object of every answered field
  page TEXT,
  ip_hash TEXT NOT NULL,           -- salted SHA-256, used only for rate limiting
  country TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'won', 'lost', 'spam')),
  created_at INTEGER NOT NULL      -- epoch milliseconds
);
CREATE INDEX IF NOT EXISTS idx_enquiries_ip_time ON enquiries (ip_hash, created_at);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at);

-- Cookieless analytics. visitor_day is a salted hash of IP + user agent + date, so a
-- visitor can be counted once per day but never followed across days.
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  device TEXT,
  country TEXT,
  visitor_day TEXT NOT NULL,
  day TEXT NOT NULL,               -- YYYY-MM-DD (UTC)
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_day_name ON events (day, name);
CREATE INDEX IF NOT EXISTS idx_events_visitor_time ON events (visitor_day, created_at);
