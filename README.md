# sherclock-extensions

These are all the implementation of chrome and safari extensions for sherclock.

## Installation

Go to the [latest release page](https://github.com/kelvinst/sherclock-extensions/releases/latest),
select the version (I suggest the last stable :grin:) and download the extension
file on it. The `.crx` is for chrome and `.safariextz` is for safari.

## Release

Here's how to release a new version of the extensions:

* Search for the last version on the files (you can get it on the `package.json`
file, the `"version"` key) and increment all of it, except for the one on the
`dist` folder (they will be overwritten anyway);
* Run `make`;
* Commit everything;
* To generate the safari extension:
  * ...
* To generate the chrome extension:
  * Visit `chrome://extensions`;
  * Click "Pack extension..." to pop up the pack dialog;
  * For the "Extension root directory" field, navigate to the directory in which
  your extension files live, and select its `dist/chrome` subfolder;
  * It will generate the `.crx` file and a `.pem` file (to update the `.crx`,
  you will need the `.pem` file)
* Go to the [releases page](https://github.com/kelvinst/sherclock-extensions/releases),
and click on the "Draft a new release" button;
* Set the same version you incremented to the tag and the release title;
* Upload the `.crx` and the `.safariextz` on the "attach binaries" field;
* Save the release and :tada:, you're done!

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
