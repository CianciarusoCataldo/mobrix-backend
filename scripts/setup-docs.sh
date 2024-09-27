#!/bin/bash

rm -rf docs/index.md
rm -rf docs/CHANGELOG.md
rm -rf docs/LICENSE
cp README.md docs/index.md
cp CHANGELOG.md docs/Changelog.md
cp LICENSE docs/License.md
mkdocs build -d docs-build