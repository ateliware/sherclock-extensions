all: build_chrome build_safari

build_chrome:
	rm -rf ./dist/chrome
	mkdir ./dist/chrome
	cp ./lib/chrome/manifest.json ./dist/chrome
	cp ./lib/pipefy.js ./dist/chrome

build_safari:
	rm -rf ./dist/safari
	mkdir ./dist/safari
	mkdir ./dist/safari/sherclock.safariextension
	mkdir ./dist/safari/sherclock.safariextension/js
	cp ./lib/safari/Info.plist ./dist/safari/sherclock.safariextension
	cp ./lib/safari/Settings.plist ./dist/safari/sherclock.safariextension
	cp ./lib/pipefy.js ./dist/safari/sherclock.safariextension/js

