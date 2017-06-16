# sherclock-extensions

[![Build Status](https://semaphoreci.com/api/v1/kelvinst/sherclock-extensions/branches/master/shields_badge.svg)](https://semaphoreci.com/kelvinst/sherclock-extensions)
[![Code Climate](https://codeclimate.com/github/kelvinst/sherclock-extensions/badges/gpa.svg)](https://codeclimate.com/github/kelvinst/sherclock-extensions)
[![Test Coverage](https://codeclimate.com/github/kelvinst/sherclock-extensions/badges/coverage.svg)](https://codeclimate.com/github/kelvinst/sherclock-extensions/coverage)
[![Issue Count](https://codeclimate.com/github/kelvinst/sherclock-extensions/badges/issue_count.svg)](https://codeclimate.com/github/kelvinst/sherclock-extensions)

These are all the implementation of chrome and safari extensions for sherclock.

## Installation

Follow this steps to install the chrome extension:

- Go to the [latest release page](https://github.com/kelvinst/sherclock-extensions/releases/latest)
and download the extension file on it.
- Download the `chrome.crx` file from the page.
- Open `chrome://extensions` in other tab of your browser (type it on the
address bar).
- Drag the downloaded extension to the extensions page.
- Click "Add extension" to accept the extension installation.
- Done!

## Release

Here's how to release a new version of the extensions:

* Search for the last version on the files (you can get it on the `package.json`
file, the `"version"` key) and increment all of it, except for the one on the
`dist` folder (they will be overwritten anyway).
* Run `make`.
* Commit everything.
* To generate the chrome extension.
  * Visit `chrome://extensions`.
  * Click "Pack extension..." to pop up the pack dialog.
  * For the "Extension root directory" field, navigate to the directory in which
  your extension files live, and select its `dist/chrome` subfolder.
    * If it's the first time you're realeasing it on your machine, leave the
    "Private key file" empty
    * If not, you can use the them `.pem` file generated from the previous
    build.
  * It will generate the `.crx` file and a `.pem` file.
* Go to the [releases page](https://github.com/kelvinst/sherclock-extensions/releases),
and click on the "Draft a new release" button.
* Set the same version you incremented to the tag and the release title.
* Upload the `.crx` on the "attach binaries" field.
* Save the release and :tada:, you're done!

## TODO

- [ ] Document how to release the safari extension
- [ ] Release the official extensions on the chrome and safari stores

## Contribute

Here's is how to install the plugins in dev mode on all browsers

### On chrome

* Clone this repo:

```bash
git clone https://github.com/kelvinst/sherclock-extensions.git
```

* Build the extension with `make`;
* Visit `chrome://extensions` in your browser;
* Ensure that the Developer mode checkbox in the top right-hand corner is
checked;
* Click "Load unpacked extension..." to pop up a file-selection dialog;
* Navigate to the directory in which your extension files live, and select its
`dist/chrome` subfolder;

### On Safari

* Clone this repo:

```bash
git clone https://github.com/kelvinst/sherclock-extensions.git
```

* Build the extension with `make`;
* Go to the safari preferences (menu "Safari > Preferences" or use the `cmd + ,`
shortcut);
* On the "Advanced" tab, make sure that the "Show Develop menu in the menu bar"
is checked;
* Go to the menu "Develop > Show Extension Builder";
* On the extension builder window, click on the "+" button at the bottom left
corner, then "Add extension";
* Navigate to the directory in which your extension files live, and select its
`dist/safari/sherclock.safariextension` subfolder;
* Click on the "Install" button at the top right corner.

## Important info

This project was built following [these tutorial](http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/).

If you have any question, refer to it for some basic structure explanations
(like the Makefile, and other structure patterns).

## TODO

- [ ] Update this readme with safari extension release information
- [ ] Update this readme with deploy to the play store and safari ext directory
- [ ] Make the release a `make` task, to ease the releasing
