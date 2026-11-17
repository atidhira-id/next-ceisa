import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";

const PgSession = connectPgSimple(session);

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL belum dikonfigurasi.");
}

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const sessionMiddleware = session({
  store: new PgSession({
    pool,
    tableName: "user_sessions",
    createTableIfMissing: true,
  }),
  name: "app.sid",
  secret: process.env.AUTH_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 8 * 60 * 60 * 1000,
  },
});
