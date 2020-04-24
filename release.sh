#!/bin/sh
node ./build.js
git br -D release
git co -b release
git add -f public/js/*
git commit -m'build assets'

