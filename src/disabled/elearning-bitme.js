bt.addSource("BitMe", function () {
    var bitme = "http://www.bitme.org/browse.php?incldead=1&search={query}";

    return {
        url: {
            all: bitme,
            elearning: bitme,
            ebooks: bitme,
            abooks: bitme + "&cat=2",
            docs: bitme + "&cat=5",
            mags: bitme + "&cat=6"
        },
        onParse: {
            row: "form ~ table:eq(0) tr:not(:first-child)",
            link_prepend: "http://www.bitme.org/",
            sel: [
                {text: "a[href*='details.php']:eq(0)"},
                {text: "> td:eq(8)"},
                {text: "> td:eq(6)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onFilter: bt.requireAllWords,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABU0lEQVQ4ja2SO4oCQRCGy4YBdYwMDFQQmWgmdEJPYC74CA08hUfxDHqDnmhAMBoxMBENFMHAwAcTfhssttu4C6Jb0ND14Ku/u0pEhA+P8K5ZABFBKYVSCq01aZqilDJx4Mm3APfgaDQyd4BqtfrU9VcFmUzGUnC3crn8GsBxHKPgZ1GlUnkNcO9eLBbRWnO9XlFK4TiO9aQ/Ae+YAXy8B4VCgUajQS6XMwnf9wmCwIyuXq8TBAFhGOL7Ptls9gHodDoAjMdjRIRWqwXAer02wP1+b8nvdrsPQLvdNolarcZsNgNguVwawPF4JEkSPM/D8zxc130Aer0ep9OJKIrY7XbEcUySJJaCzWZDmqasVisWi4UN6Pf7nM9nwjAEYDgcorVmu91aCubzOa7rks/n7U8cDAbA9zaWSiVEhMPhwOVyMYW32w2AyWTCdDql2Wz+zxi/AECKPay4236DAAAAAElFTkSuQmCC"
    };
});
