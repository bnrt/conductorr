bt.addSource("Genesis_NonFiction", function () {
    var gen = "http://gen.lib.rus.ec/search.php?open=0&view=simple&column=def&req=";

    return {
        url: {
            all: gen,
            elearning: gen,
            ebooks: gen
        },
        onParse: {
            prepare: function (response) {
                if (response.responseText.indexOf('<table width=100% cellspacing=1') === -1) {
                    return "<table></table>";
                }

                var html = response.responseText.replace(bt.imgTagRegex, '<meta ').split('<table width=100% cellspacing=1')[1];
                html = '<table width=100% cellspacing=1' + html;
                html = html.split('</table')[0];
                html += '</table>';

                return html;
            },
            row: "tr:gt(0)",
            link_prepend: "http://gen.lib.rus.ec/",
            sel: [
                {text: "a[href*='book/']:eq(0), > td:eq(8)"},
                {text: "> td:eq(7)", link: "a[href*='/ads.php']:eq(0)", noblank: true}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABkElEQVQ4jaWTvUtbYRSHXV5KpgydxEkcOohUkESNF6RaDIhoqYNDl4o6aNvBj6VIktdrFBFNU100BGnFKIIZxIA2JVkUvSZim8SP+JmIzvdfeDokm2Ju6PDjwBkeznkOp0TXs/xPSp5qZu4zSF+I+fUokViyeICuZ/nwNYCwOhA1DjpHVooHaIkUY4u/mFndY8i7YxwQ3o/z0blB6+cfvO3186Z7gfYvy3yaDHJ6fVEYkHnIUNU1h1BUhOLOVxVhk0hfyNgK679jiGoHJmWM8jYPrzo8mJVxfob2jDuIxJKkrm6JxE/Y2j1me/8vB4mz5wFaIoW9x0+pfZoXNhfC4kRYZD5OhFViH1h6foLhb5uIOomwSYRNRdS78sn1zE3uwis09vlz4urzU1hdiFoHok7y+v1cYUBgR6PynZfB2U0C2xqHqUuO03f8SV+TTJ8bk6jrWU5vblkLa/RPBHnZME4wemTsCiPeMObmyZwLizPnwyqJxB//xZOAYPSIspYpRIOKSVGpaPcw+n2ruF8wmn/uAT7c5N64IAAAAABJRU5ErkJggg=="
    };
});
