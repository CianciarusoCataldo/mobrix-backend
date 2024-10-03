#!/bin/bash

./scripts/init-env.sh

export DOCS_TEMPLATES_DIR='docs-gen/templates'
export DOCS_INDEX_FILE='docs/index.md'
export DOCS_README_FILE='README.md'
export DOCS_CHAPTERS_DIR="$DOCS_TEMPLATES_DIR/chapters"

echo "\n Docs setup \n"


mkdir "tmp"
mkdir "docs"
cp -r "docs-gen/assets" "docs/assets"
mkdir "docs/api"
mkdir "docs/guide"
rm -rf $DOCS_README_FILE

touch $DOCS_INDEX_FILE
touch $DOCS_README_FILE
touch "docs/api/configuration.md"

cp "$DOCS_CHAPTERS_DIR/get-started.md" "tmp/get-started.md"

sed -i "s/# / /g" "tmp/get-started.md"

cat "$DOCS_CHAPTERS_DIR/header.md" >>"$DOCS_INDEX_FILE"
cat "$DOCS_INDEX_FILE" >>"$DOCS_README_FILE"
echo "\n" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/summary.md" >>"$DOCS_README_FILE"
echo "\n" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/intro.md" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/intro.md" >>"$DOCS_INDEX_FILE"
echo "\n" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/get-started.md" >>"$DOCS_README_FILE"
echo "## Configuration parameters\n\n" >>"$DOCS_README_FILE"
echo "# Configuration parameters\n\n" >>"docs/api/configuration.md"
cat "$DOCS_CHAPTERS_DIR/configuration-table.md" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/configuration-table.md" >>"docs/api/configuration.md"
cat "$DOCS_CHAPTERS_DIR/configuration-details.md" >>"docs/api/configuration.md"
echo "\n" >>"$DOCS_README_FILE"
cat "$DOCS_CHAPTERS_DIR/footer.md" >>"$DOCS_README_FILE"
cp "tmp/get-started.md" "docs/guide/get-started.md"
cp CHANGELOG.md docs/Changelog.md
cp LICENSE docs/License.md
cp config/mkdocs.yml mkdocs.yml

npx --yes prettier --log-level silent --write "$DOCS_README_FILE" docs/index.md docs/api/* docs/guide/*

mkdocs build -d docs-build

rm -rf docs
rm -rf tmp
