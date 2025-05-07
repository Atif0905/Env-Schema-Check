import fs from 'fs';
import dotenv from 'dotenv';
import chalk from 'chalk';

export function validateEnv(envPath = '.env', schemaPath = 'schema.json') {
  // Check if files exist
  if (!fs.existsSync(envPath)) {
    console.error(chalk.red(`❌ Environment file not found: ${envPath}`));
    return false;
  }

  if (!fs.existsSync(schemaPath)) {
    console.error(chalk.red(`❌ Schema file not found: ${schemaPath}`));
    return false;
  }

  // Parse files
  const envFile = dotenv.parse(fs.readFileSync(envPath));
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));

  // Extract keys
  const required = schema.REQUIRED_KEYS || [];
  const optional = schema.OPTIONAL_KEYS || [];
  const envKeys = Object.keys(envFile);
  const allExpected = [...required, ...optional];

  let hasError = false;

  // Check for missing required keys
  required.forEach((key) => {
    if (!envFile[key]) {
      console.error(chalk.red(`❌ Missing required key: ${key}`));
      hasError = true;
    }
  });

  // Check for unexpected keys
  envKeys.forEach((key) => {
    if (!allExpected.includes(key)) {
      console.warn(chalk.yellow(`⚠️  Unexpected key in .env: ${key}`));
    }
  });

  if (!hasError) {
    console.log(chalk.green('✅ .env file is valid!'));
  }

  return !hasError;
}
