# sherclock-extensions

These are all the implementation of chrome and safari extensions for sherclock.

## To build and distribute it

Just run `make build` to build a new `./dist/` folder with the compiled/copied
code for all browsers.

## To intall it (some dev skills needed)

Sorry for all this inconvenience, we will build a original certified safari
extension soon, and put the compiled files on the dist folders. Thanks.

### On chrome

* Clone this repo:

```bash
git clone https://github.com/kelvinst/sherclock-extensions.git
```

* Build the extension with `make build`;
* Visit `chrome://extensions` in your browser;
* Ensure that the Developer mode checkbox in the top right-hand corner is
checked;
* Click "Load unpacked extension..." to pop up a file-selection dialog;
* Navigate to the directory in which your extension files live, and select its
`dist/chrome` subfolder;
* Alternatively, you can drag and drop the `dist/chrome` directory onto
`chrome://extensions` in your browser to load it.

### On Safari

* Clone this repo:

```bash
git clone https://github.com/kelvinst/sherclock-extensions.git
```

* Build the extension with `make build`;
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

This project was built following [these tutorial](tutorial).

If you have any question, refer to it for some basic structure explanations
(like the Makefile, and other structure patterns).

[tutorial]: http://www.wolfe.id.au/2014/02/01/getting-a-new-node-project-started-with-npm/
