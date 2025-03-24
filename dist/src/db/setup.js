"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new pg_1.Client({
    user: process.env.PG_USER || "postgres",
    host: process.env.PG_HOST || "localhost",
    database: process.env.PG_DATABASE || "your_database",
    password: process.env.PG_PASSWORD || "your_password",
    port: Number(process.env.PG_PORT) || 5432,
    ssl: {
        rejectUnauthorized: false, // Render의 SSL 인증서가 필요 없음
    },
});
const checkTableExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_name = 'users'
    );
  `;
    try {
        const res = yield client.query(query);
        return res.rows[0].exists;
    }
    catch (err) {
        console.error("❌ Error checking users table existence:", err);
        return false;
    }
});
const createUsersTable = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) NOT NULL UNIQUE,
      nickname VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(255) NOT NULL,
      profile_url TEXT,
      vegetarian_stage VARCHAR(50) NOT NULL,
      vegetarian_start_year INT NOT NULL,
      community_points INT NOT NULL DEFAULT 0,
      push_notification BOOLEAN NOT NULL DEFAULT TRUE,
      advertising_consent BOOLEAN NOT NULL DEFAULT FALSE,
      like_notification BOOLEAN NOT NULL DEFAULT TRUE,
      comment_notification BOOLEAN NOT NULL DEFAULT TRUE,
      message_notification BOOLEAN NOT NULL DEFAULT TRUE,
      usage_restriction TEXT,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
    try {
        yield client.query(query);
        console.log("✅ users table created successfully");
    }
    catch (err) {
        console.error("❌ Error creating users table:", err);
    }
});
const checkUserExists = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = "SELECT COUNT(*) FROM users;";
    try {
        const res = yield client.query(query);
        return parseInt(res.rows[0].count, 10) > 0;
    }
    catch (err) {
        console.error("❌ Error checking user existence:", err);
        return false;
    }
});
const insertSampleUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const query = `
    INSERT INTO users (email, nickname, name, profile_url, vegetarian_stage, vegetarian_start_year)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
    const values = [
        "test@example.com",
        "testuser",
        "Test User",
        "https://example.com/profile.jpg",
        "Vegan",
        2020,
    ];
    try {
        const res = yield client.query(query, values);
        console.log("✅ Sample user inserted:", res.rows[0]);
    }
    catch (err) {
        console.error("❌ Error inserting sample user:", err);
    }
});
const setupDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        const tableExists = yield checkTableExists();
        if (!tableExists) {
            yield createUsersTable();
        }
        else {
            console.log("⚡ users table already exists, skipping creation.");
        }
        const userExists = yield checkUserExists();
        if (!userExists) {
            yield insertSampleUser();
        }
        else {
            console.log("⚡ Sample user already exists, skipping insertion.");
        }
    }
    catch (err) {
        console.error("❌ Error in setupDatabase:", err);
    }
    finally {
        yield client.end();
    }
});
setupDatabase();
