#!/bin/bash

./scripts/init-env.sh

echo "\n Unit tests \n"
jest --config config/jest.config.js
