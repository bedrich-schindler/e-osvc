#!/usr/bin/env sh

set -e

npm install
npm test
npm run build
