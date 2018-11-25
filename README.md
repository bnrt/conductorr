# Conductorr
UserScript for multi-tracker search. 

## Installation
- Install the userscript from [GreasyFork](https://greasyfork.org/en/scripts/12013-conductorr).
- Save [conductorr.html](https://raw.githubusercontent.com/bnrt/conductorr/master/conductorr.html) locally and open it.

Make sure local files are accessible from userscripts in your browser:
- GreaseMonkey 3: open `about:config` and change `greasemonkey.fileIsGreaseable` to `true`,
- GreaseMonkey 4: incompatible,
- TamperMonkey: open settings and enable the option named like `Allow access to file URLs` or `Allow scripts to access local files`,
- Violentmonkey: works out-of-the-box.

## Hints
- To clear the page, clear the search input twice.

- The script uses HTTPS everywhere possible. If a source reports a host error, click on its icon in the message and check, if there is a browser message about invalid certificate preventing the page from loading. If the issue is non-critical, like an expired certificate, you can add it to exceptions.

- Movies support years in queries, tv shows support resolutions.

## Contributions
In order to add a new provider, submit a pull request into the [src/providers/community](https://github.com/bnrt/conductorr/tree/master/src/providers/community) directory.

## Known issues
- Incompatible with the First Party Isolation mode in Firefox.
- Cyrillic queries don't work on BlueBird.
