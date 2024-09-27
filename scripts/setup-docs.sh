#!/bin/bash

rm -rf docs/index.md
rm -rf docs/CHANGELOG.md
rm -rf docs/LICENSE
cp README.md docs/index.md
cp README.md docs/CHANGELOG.md
cp LICENSE docs/LICENSE
mkdocs build -d docs-build