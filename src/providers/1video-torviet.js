bt.addSource("TorViet", function () {
    var torviet = "http://torviet.com/torrents.php?incldead=0&search_area=0&search_mode=0&search={query}";

    return {
        url: {
            all: torviet,
            music: [torviet + "&sltCategory=5&sltSubCategory=126", torviet + "&sltCategory=5&sltSubCategory=130"],
            music_flac: torviet + "&sltCategory=5&sltSubCategory=126",
            //		music_mp3: torviet + "&sltCategory=5&sltSubCategory=130",
            movies: torviet + "&sltCategory=2",
            movies_1080: torviet + "&sltCategory=2&sltSubCategory=125",
            movies_720: torviet + "&sltCategory=2&sltSubCategory=124",
            movies_remux: torviet + " REMUX&sltCategory=2&sltSubCategory=127",
            movies_bluray: torviet + "&sltCategory=2&sltSubCategory=127",
            docs: [torviet + "&sltCategory=3&sltSubCategory=0&sltGenre=62", torviet + "&sltCategory=2&sltSubCategory=0&sltGenre=32"],
            tv: torviet + "&sltCategory=3&sltSubCategory=128",
            elearning: torviet + "&sltCategory=6",
            ebooks: torviet + "&sltCategory=6&sltSubCategory=112",
            abooks: torviet + "&sltCategory=6&sltSubCategory=117",
            mags: torviet + "&sltCategory=6&sltSubCategory=112",
            apps_win: torviet + "&sltCategory=4&sltSubCategory=76",
            mvids: torviet + "&sltCategory=5&sltSubCategory=92",
            games_pc: torviet + "&sltCategory=1&sltSubCategory=7"
        },
        onParse: {
            row: "#idtorrent table.torrents > tbody > tr:not(:first-child)",
            link_prepend: "http://torviet.com",
            sel: [
                {
                    text: ".torrentname a:eq(0)",
                    freeleech: ".pro_free"
                },
                {text: "> td:eq(4)"},
                {text: "> td:eq(3)", link: "a[href*='download.php']:eq(0)", noblank: true}
            ]
        },
		onFilter: [bt.filter3dMovies],
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADrUlEQVQ4jSXDe1DTBQDA8d//nP5B1x1pKCZwHV1xZ3/4R2eXCk5Ep1mKYR4QkIJLmURWdl6P8zSujjcRggaBD8YGIspwsKEww7En22SMjZccrzWGiMTz9+0PP3cf4VCeLuzoH49vJ1YYF5OqzaTWWjl520ZmvZ20W72k3Hg1qcZG4l8WDpSZ2FvSsyIpeKyJ++1RlHAwr1PxSXmPeLzKQvItOyeVT/nqrgt5ixu52kN6o5u0Bjepyn4OVzuJvdrL7jILHxUZxd15eosgLehaPFphIqnGRrrCgexOH/IWNzltHr7VDZLV6iWj2UOy0o20ug9JpZ3YP63sLDYRU/QEYX9+FzkKK+M+P9MzAXyBAMPTfnI0bn7RD/GTfojMlkGO1fVzqMbJvuu97Cm3sbvUREyJAeFAfheJ14xcUfexJoroh3z8qBlAP+JnZOYFw4F57rim0Q1MMeyfx+N7QeptJx8WGth+pRNhb+5D4gsNyBV2VtdEHvRPkVrv4tnMSzxTz/H6/8Plm+fphJ+llVUutT7lSI0ZaYWFmIJ/ECS/diAtNiCvc7C6JqLum0TW5GJ89iUDkwE8vgXMz+awjvqYXVgi446Dj6ts7C83E1PQjRB7WYu0+AmZNTZcE3P8bRghpc7JPcc4rvE5nGPPuXzfS6N5DMvoDKkKO9IKK/tKjcQWdCO8J7/P+xc6iP+9m2NlZqSlJo5XO0i43stnVb3sLDbxQZGJHYVGYkp6OHjVyK6Cbnbk6tl+qQMh/GQjEWc05N9zsby8iNYxzsLSMjrrMI9so5ytd1D5eIjSR4OcV9nxTs1yUWVj2886on/QIGxNU/GOvI2MChNrooh3IoD/xSJa+wSOkQC9wzN4J2dZWlmlwTiKKIrIa81EX3hA9PdqhNATCiJOt7Lr4kNWVtdYXl7G7JmmqWcM52gA52gA+8i/WAcmuKZ1IYoiOTctvCVvIVzejBAsrSX4cCOvH2miq9ONwTDMuQoDeQ0OVF1eTpUb6LSM0KwfJD63i7udHnIVZkJOtxAqa0ZYH1e1GCRREBRXT9BeJcEJzYTJ2ok4107UeR3vftdB1Dc6tmZrCc9uJyyrnc1nNITK1GyWNSGs21OpCJLUiUESBev2qwhJUbPxSw1bZRois9qI+lpLVE47b2e3seXsq5tlrWzKVIsbvrhhFdbH5kasjysxBMVc57VPbxHyuZI3Tih5M0XFlnQV4RkNRGY2EJnRwJZTKjalKwlNq2djcnX/hoTibf8Dg6DZMEdjmwAAAAAASUVORK5CYII="
    };
});
