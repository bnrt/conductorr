bt.addSource("XBT", function () {
    var xbt = "https://xbtmusic.org/torrents-search.php?s=i&b=d&cat=0&active=0&page=0&own=&mode=2&search_pedrovia={query}";

    return {
        url: {
            all: xbt,
            music: xbt,
            music_flac: xbt,
            mvids: [xbt + "&cat=29", xbt + "&cat=201"],
            docs: xbt + "&cat=134",
            abooks: xbt + "&cat=54"
        },
        onParse: {
            cleanup: ["td.small a"],
            row: "table.submain > tbody > tr",
            link_prepend: "https://xbtmusic.org",
            sel: [
                {text: "a[href*='/torrents-details.php?id=']:eq(0)"},
                {text: "> td:eq(2) > table:eq(0) > tbody > tr > td:eq(1) > span:eq(0)"},
                {
                    text: function (context) {
                        return $("> td:eq(2) > table:eq(0) > tbody > tr > td:eq(0)", context).text().split('in')[0];
                    },
                    link: function (context) {
                        var id = $("a[href*='/torrents-details.php?id=']:eq(0)", context).attr('href').split('id=')[1].split(bt.matchFirstNonDigit)[0];
                        return '/download.php?id=' + id;
                    },
                    noblank: true
                }
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB/0lEQVQ4jZWTP4jacBTHf6Xc0g539jqVdiiloy4OAYlHklpiIFAswSSo8cCocVCiiEhdghgQhPNstboG63WyDuJSoX/QoYtDdBBKC4Wj6+nQSrkOr0vvqNwdNd/1vc97j++Xh9AlAoDt5XJpA4Cty+pXqtlsUrIs9xVFOZUkCViW/R6NRg9M07z7b99oNLJdgPP5PK8oCmQymZf1ev2Jqqr7NE1/wnEcAoHAV9M07yOEEMdxdZqmF9Vq9fAcNk3zJsuyxxRFAc/znwuFwrOzmiRJH10uF+RyuXcIISSK4ojjONB1/fn5AMMwdgmC+GW328HhcIDb7YZIJHILIYS63e4ejuOnDMP87vV6D8bj8Z3BYPAYAK6tXSCK4jGGYYBhGDAM81NV1Z2/ht5gGOaEJEnQNM2PEEKz2cwFANfXPGi32y5Zlo8kSTpqtVqPzjYAgC0cDi+cTieoqvo0nU6/4TgOisXii42SAYBtQRBOcBwHwzD4eDzeJQhi0Wg0Dv9PI4Tm8/kuSZI/PB4P9Pv9hwCw1el0LsZ4lWq1mo+iKPD5fB/WjNtUwWDwvdfrBU3TCMuwruv7JEmCLMtty3CpVAoLggCJROKLpZ8YDof2ZDL5yu/3QyqVer1are5tBE4mE7pSqVSz2ey3UCj0Vtd12tLJ0+mUKZfLe7FY7LYV7g8x5uX55Jg5HQAAAABJRU5ErkJggg=="
    };
});
