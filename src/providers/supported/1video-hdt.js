bt.addSource("HDT", function () {
    var hdt = "https://hd-torrents.org/torrents.php?active=0&options=0&search={query}";

    return {
        url: {
            all: hdt,
            movies: hdt + "&category[]=1&category[]=2&category[]=5&category[]=3",
            movies_1080: hdt + "&category[]=5",
            movies_720: hdt + "&category[]=3",
            movies_remux: hdt + "&category[]=2",
            movies_bluray: hdt + "&category[]=1",
            music: hdt + "&category[]=44",
            music_flac: hdt + "&category[]=44",
            docs: hdt + "&genre[]=Documentary",
            tv: hdt + "&category[]=59&category[]=60&category[]=30&category[]=38",
            mvids: hdt + "&category[]=61&category[]=62&category[]=57&category[]=45",
            xxx: hdt + "&options=3&category[]=58&category[]=48&category[]=47"
        },
        onParse: {
            row: "table.mainblockcontenttt > tbody > tr:has(a[href*='download.php'])",
            link_prepend: "https://hd-torrents.org/",
            sel: [
                {text: "a:eq(1)"},
                {text: "> td:eq(9)"},
                {text: "> td:eq(7)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
        onValidate: function (response) {
            return response.responseText.indexOf("You're not authorized to view this Torrents") === -1 ? true : "login needed";
        },
        onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABrklEQVQ4jbXTvWoqcRDG4dldP/6uH2RdMVUgzSoiilFWMZusrgS0UkFIkUqICqa0CNFLiKVgZeENeAPe3C/VEcSkOJycgbcbnuadEfml4R/yy0A8HieTyWDbNrZtk06nsSyLq6srLMtCKfUzkMvl6Pf7tFotOp0Ovu9zf39PtVqlUqngui5BEHBzc3MJGIZBu91G0zR0XUdE0DQNEcGyLK6vrxERdF0nCILTzglQSlEul1FK8f7+jojw8vLCfD5nt9ux2Wz4+PhARPB9n0gkcg7EYjHq9TqmabJer0kkEkynU5bLJZPJBBHh8/OTWq3G3d3dJWCaJr7vYxgGx+OR/X7P4XBgNpsxHo8REYbDId1ul1wuRzgc/h4wTZPtdkssFuP5+ZnpdMpgMEBEeHt7o1Qq4TjO90Cj0UApxWq1QkTodDqMRiMWiwWTyYTX11c0TaNYLBIKhc6BUCjE09MTmqaRSqUQEaLRKEopHMchn8+fmmk2m5ctiAiFQoHRaMTj4yNBEPDw8IDnebiui+u6eJ5Hr9fj9vb250tMJpNks1kymczZRf6JaZr/+Rf+Nl8Ccia4Vb4rGwAAAABJRU5ErkJggg=="
    };
});
