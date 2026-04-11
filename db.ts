import Database from "better-sqlite3";

export const db = new Database("amigademos.db", {
  readonly: false, // optional (good for safety if you only read)
});

// db.ts


export const getLessons = () =>
  db.prepare("SELECT * FROM lessons").all();