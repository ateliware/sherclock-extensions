REPORTER = spec

all: jshint test

build: build_chrome build_safari

build_chrome:
	rm -rf ./dist/chrome
	mkdir ./dist/chrome
	cp ./lib/chrome/manifest.json ./dist/chrome
	cp ./lib/pipefy.js ./dist/chrome

build_safari:
	rm -rf ./dist/safari
	mkdir ./dist/safari
	mkdir ./dist/safari/js
	cp ./lib/safari/Info.plist ./dist/safari
	cp ./lib/safari/Settings.plist ./dist/safari
	cp ./lib/pipefy.js ./dist/safari/js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

jshint:
	jshint lib examples test index.js

tests: test

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive -R xunit > results.xml --timeout 3000

skel:
	mkdir examples lib test
	touch index.js
	npm install mocha chai --save-dev

.PHONY: test tap unit jshint skel
