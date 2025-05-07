#!/usr/bin/env node

import { validateEnv } from '../src/index.js';

let envFile = '.env';
let schemaFile = 'schema.json';

// Simple CLI arg parser
process.argv.slice(2).forEach(arg => {
  if (arg.startsWith('--env=')) {
    envFile = arg.split('=')[1];
  } else if (arg.startsWith('--schema=')) {
    schemaFile = arg.split('=')[1];
  }
});

validateEnv(envFile, schemaFile);
