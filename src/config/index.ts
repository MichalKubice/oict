import dotenv from "dotenv";

dotenv.config();

function requireEnvVariable(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

const config = {
  PORT: requireEnvVariable("PORT"),
  BASE_API_URL: requireEnvVariable("BASE_API_URL"),
  API_KEY: requireEnvVariable("API_KEY"),
};

export default config;
