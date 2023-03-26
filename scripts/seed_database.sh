#!/bin/sh

set -ue

if [ $# -eq 0 ]; then
    >&2 echo "No database seed file provided (e.g. ./database/seeds.sql)"
    exit 1
fi

DB_SEED_FILE=$1

echo "Creating categories..."
mysql -h $DB_HOST -u $DB_USER -D $DB_NAME -p < $DB_SEED_FILE

echo "Database seeded with success!"