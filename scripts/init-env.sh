#!/bin/bash

export MBX_BACKEND_VERSION=$(jq .version package.json | tr -d '"')
echo "MoBrix-backend v$MBX_BACKEND_VERSION"

