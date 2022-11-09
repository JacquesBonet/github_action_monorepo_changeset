#!/bin/bash

# exit script if any command fails
set -e

echo "tag-version-prefix=" >> ~/.npmrc
echo "scope=izberg" >> ~/.npmrc
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

cat ~/.npmrc
