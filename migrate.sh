#!/bin/bash

set -e

DATABASE_URL=postgres://postgres@127.0.0.1:5432/heirloomdb?sslmode=disable dbmate up

cd server
NODE_ENV=development npx mikro-orm generate-entities --save --path=src/entities
