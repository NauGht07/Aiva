import { openDatabaseSync } from 'expo-sqlite';

let db: ReturnType<typeof openDatabaseSync> | null = null;

export const initLocalDatabase = () => {
  if (db) return db;

  db = openDatabaseSync('aiva.db');

  db.execSync(`
    CREATE TABLE IF NOT EXISTS journal_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      raw_text TEXT NOT NULL,
      extracted_summary TEXT,
      synced_at TEXT
    );

    CREATE TABLE IF NOT EXISTS notification_content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      habit_id TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      full_text TEXT NOT NULL,
      tone TEXT,
      synced_at TEXT
    );

    CREATE TABLE IF NOT EXISTS aiva_context (
      habit_id TEXT PRIMARY KEY,
      last_updated TEXT DEFAULT (datetime('now')),
      context_file TEXT
    );
  `);

  return db;
};

export const getLocalDatabase = () => {
  return db ?? initLocalDatabase();
};
