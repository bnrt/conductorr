bt.addSource("EBZ", function () {
    var ebz = "http://app.elbitz.net/browse.php?incldead=1&typ=0&search={query}";

    return {
        url: {
            all: ebz,
            elearning: ebz,
            docs: ebz + "&c10=1",
            ebooks: ebz,
            mags: ebz + "&c16=1",
            abooks: ebz + "&c6=1"
        },
        onParse: {
            row: "tr:not(:has('tr')):has(a[href*='download.php'])",
            sel: [
                {
                    text: function (context) {
                        return context.find("a[href*='details.php']:eq(0)").attr('title');
                    },
                    link: "a[href*='details.php']:eq(0)",
                },
                {text: "> td:eq(6)"},
                {text: "> td:eq(5)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABrElEQVQ4jWNgQAO3b99mX7NyempyvO0RazOuH+bG7H+x4R07loWh62W4evWUQViw7lVcmmDYwoTj192719VQNJ85s9/G0VboAyHN5sbsfxvqkhegaH769I6sm6PEK0K2+ngpPZg1o6nmzJkzrCgGVJSGr0DXEB6qf/nQvo3et2/fZsfwKzJ48uS2DHpgRYWbnH/37i4/Xo0wsGnTolh028+c2W9z+PBWj4QYyxNhwbpXseFD+zZ6MzAwMDBMn1pXj6zZzVHi1bt37/gd7UTe4QuTixcPmzMwMDAwTJxQ2Y4s4eOl9ODBgweSFibsf3Bpjo2yOLVq1SpmBgYGBoali/oKkSWtzbh+vHx5T7ymMnYpNs1pSY4H7969KwcPg/OnDlqhK+rpKuxjYGBgvHr1tOGZM/ttYPjWrcuaGIG4atUq5kA/jVuocc7+Z9aMphq4MwmBXdtXhGJzrp+36r26moQFPV2FfT1dhX1zZrVWPnhwQxGrIZ3tuZOJScb21oKf9+xcE4DVK/3dJb3EGOLmKPHq7du3fFhdcvjwVo/YSNNzhAw5cmCbJwMDAwMAh9dGMcvzkAcAAAAASUVORK5CYII="
    };
});
