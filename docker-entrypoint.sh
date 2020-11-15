#!/usr/bin/env sh

yarn migration:run || { echo 'Running migration failed. Exiting application...' ; exit 1; }
node dist/index.js