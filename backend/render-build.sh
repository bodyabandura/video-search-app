#!/usr/bin/env bash
npm install
npm run build
npx mikro-orm migration:up