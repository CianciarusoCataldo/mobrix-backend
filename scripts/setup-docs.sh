#!/bin/bash

./scripts/init-env.sh

echo "\n Docs setup \n"

rm -rf docs/index.md
rm -rf docs/CHANGELOG.md
rm -rf docs/LICENSE
cp README.md docs/index.md
cp CHANGELOG.md docs/Changelog.md
cp LICENSE docs/License.md
cp config/mkdocs.yml mkdocs.yml
mkdocs build -d docs-build
rm -rf mkdocs.yml
rm -rf docs/index.md
rm -rf docs/CHANGELOG.md
rm -rf docs/LICENSE