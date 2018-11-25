# Conductorr
UserScript for multi-tracker search. 

## Installation
Create a local html file `conductorr.html` containing the code `<!DOCTYPE html>`.

Make sure local files are accessible from userscripts in your browser:
- With GreaseMonkey for Firefox, open `about:config` and change `greasemonkey.fileIsGreaseable` to `true`. Although, Conductorr is not tested with GreaseMonkey 4+, it may not work.
- With TamperMonkey (both Firefox and Chrome), open its settings and enable the option named like `Allow access to file URLs` or `Allow scripts to access local files`.

## Hints
- To clear the page, clear the search input twice.

- The script uses HTTPS everywhere possible. If a source reports a host error, click on its icon in the message and check, if there is a browser message about invalid certificate preventing the page from loading. If the issue is non-critical, like an expired certificate, you can add it to exceptions.

- Movies support years in queries, tv shows support resolutions.

## Known issues
- Not compatible with the First Party Isolation mode in Firefox.
- Cyrillic queries don't work on BlueBird.
