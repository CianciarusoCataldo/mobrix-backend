#!/bin/bash

./scripts/init-env.sh

echo "\n Build \n"

rollup -c ./config/rollup.build.config.js
