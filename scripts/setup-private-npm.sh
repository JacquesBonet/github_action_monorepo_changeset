#!/bin/bash

# exit script if any command fails
set -e

echo "scope=jb_scope1" >> ~/.npmrc
echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
echo "@jb_scope1:registry=http://registry.npmjs.org/" >> ~/.npmrc
echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" >> ~/.npmrc

cat ~/.npmrc
