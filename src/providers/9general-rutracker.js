bt.addSource("RuTracker", function () {
    var tru = "http://rutracker.org/forum/tracker.php?nm={query}";
    var truMovies = "&f=100,101,1235,124,1543,1576,1577,1666,1670,187,1900,208,209,2090,2091,2092,2093,212,2198,2199,22,2200,2201,2220,2221,2258,2339,2343,2365,2459,312,313,376,4,484,505,521,539,572,7,709,822,905,93,930,934,941";
    var truDocs = "&f=103,1114,1280,1327,1453,1467,1468,1469,1475,2076,2107,2112,2123,2159,2160,2168,2176,2177,2178,2323,2380,249,251,2538,294,314,46,500,552,56,670,671,672,752,821,851,876,97,98";
    var truFiction = "&f=2039,2041,2042,2043,2044,2045,2047,2080,2193,2355,2356,2357,2474";
    var truMvids = "&f=1107,1121,1122,1141,1142,1174,1189,1227,1228,1455,1775,1777,1781,1782,1783,1787,1788,1789,1790,1791,1792,1793,1794,1795,1812,1886,1887,1912,1913,1990,2088,2089,2241,2261,2262,2263,2264,2271,2304,2305,2306,2351,2352,2377,2378,2379,2383,2384,2426,2507,2508,2509,2510,2529,2530,2531,2532,2534,431,442,445,475,655,702,983,984,986,988";
    var truAbooks = "&f=1036,1279,1501,1580,2152,2165,2324,2325,2326,2327,2328,2342,2387,2388,2389,2413,399,400,401,402,403,490,499,525,530,574,695,716";
    var truGamesPC = "&f=1008,1098,127,128,139,2067,2115,2117,2118,2119,2142,2143,2145,2146,2147,2155,2187,2203,2204,2225,2226,2227,2228,2385,240,2415,246,2478,2479,2480,2481,2482,2483,2484,2485,2533,278,5,50,51,52,53,54,55,635,637,642,643,644,645,646,647,649,650,761,900,959,960,961,962";
    var truAppsWin = "&f=1012,1013,1014,1016,1018,1019,1021,1025,1027,1028,1029,1030,1031,1032,1033,1034,1035,1038,1039,1040,1041,1042,1051,1052,1053,1054,1055,1056,1057,1058,1060,1061,1062,1063,1064,1065,1066,1067,1068,1071,1073,1079,1080,1081,1082,1083,1084,1085,1086,1087,1088,1089,1090,1091,1092,1192,1193,1199,1204,1503,1507,1508,1509,1510,1511,1512,1513,1514,1515,1516,1517,1526,1536,1636,2077,2153";
    var truComics = "&f=2461,2462,2463,2464,2465,2473,862";

    return {
        url: {
            all: tru,
            music: tru + " lossless|MP3|AAC|OGG|FLAC|APE|ALAC|WV",
            music_flac: tru + " lossless|FLAC|APE|ALAC|WV",
            //		music_mp3: tru + "+MP3|AAC|OGG",
            movies: tru + truMovies,
            movies_1080: tru + " 1080p -remux -bdremux -disc" + truMovies,
            movies_720: tru + " 720p -remux -bdremux -disc" + truMovies,
            movies_remux: tru + " remux|bdremux" + truMovies,
            movies_bluray: tru + " \"blu ray\" | bluray -DVD -DVD5 -DVD9 -rip -remux -bdremux" + truMovies,
            movies_dvd: tru + " DVD|DVD5|DVD9" + truMovies,
            tv: tru + " 720p|1080p",
            mvids: tru + truMvids,
            games_pc: tru + truGamesPC,
            apps_win: tru + truAppsWin,
            docs: tru + truDocs,
            elearning: tru,
            ebooks: tru + " PDF|EPUB|MOBI|CHM|DJVU|FB2",
            abooks: tru + truAbooks,
            mags: tru + " PDF",
            comics: tru + truComics,
            fiction: tru + truFiction
        },
        onEnable: function () {
            $(bt.mainColumn).on('click', 'a[href^="http://dl.rutracker.org/"]', function () {
                $('<form target="_blank" method="post" action="' + $(this).attr("href") + '"></form>')
                    .appendTo(document.body)
                    .submit()
                    .remove();
                return false;
            });
        },
        onParse: {
            row: "#tor-tbl > tbody > tr:not(:has('td.pad_12'))",
            link_prepend: "http://rutracker.org/forum/",
            sel: [
                {text: "a.tLink"},
                {text: ".seedmed"},
                {
                    text: function (context) {
                        var size = context.children().eq(-5)[0].firstElementChild.textContent;
                        return bt.humanizeSize(size);
                    },
                    link: "> td.tor-size > a",
                    noblank: true
                }
            ]
        },
		onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACH0lEQVQ4jY3SQUiTcRjH8d3roG90CCIUAqG6dbDLdBEEkxJCaCJFBEmNdtohgkTC0xhBhxa8GsTrsBe6CCIFkeJhh4RZr4zXMLZ373/vH5R3L68l0xeCsW+HcGuZ6Q/+t+f5/Hl4nlDokKytreG6LofV7YvneexlaWkJx3HY2to6OmRZFruZt3wffsyfKZfLSCkPhoQQ+L5PEAR4F0dwlQiuEsHruQHA+Pg4lmX9G5BS0mg0WF5eZvX2o2azq0T4+eET0egAqqr+f4w7Zi++76OqKpvd15q/76SnUVWVhYWFdmB9fZ03m8956TzhqXWX/nwHALqus9o7zM67HACBNo9t28zNzbUDudzvgv58R9tL2Q8BmJx8TTjcx73RUQqFArquI4RoIZVKhXq9zuWVE83m7MYzABKJBMc7b3L67CRDI4skkh8xTZNsNtsChBAAPPh6hemNdHOEcLiP8xeucuzkCzrPfEbpqjD/3sMwDGZmZlqA53lsb2+j6zqzs7N82zUAiMfjDI0sonRVULpdlG4XgFgsxsrKlxZgmiaapjE1NUUmk2FiYoJarUY0OoDjOJzqcTl3qcqt+z94NR0gpcQwjBbg+z6lUgkhBKVSCV3XyeVypFIppJRErvtYdr3tGvet8u+Uy2WKxSKFQoEgCBgcHCQej5NMJhkbGzsc2IthGKTTaTRNo1gsIqXEtm2q1erRACEE+Xz+4NsPhUK/ACWu6h+j7c7tAAAAAElFTkSuQmCC"
    };
});
