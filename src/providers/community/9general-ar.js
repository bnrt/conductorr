bt.addSource("AR", function () {
    var ar = "https://alpharatio.cc/torrents.php?action=basic&searchstr={query}";

    return {
        url: {
            all: ar,
            movies: ar + "&filter_cat[6]=1&filter_cat[7]=1&filter_cat[8]=1&filter_cat[9]=1",
            movies_1080: ar + " 1080p&filter_cat[7]=1&filter_cat[9]=1",
            movies_720: ar + " 720p&filter_cat[7]=1&filter_cat[9]=1",
            movies_bluray: ar + " COMPLETE&filter_cat[7]=1",
            movies_remux: ar + " REMUX&filter_cat[7]=1",
            docs: ar + "&filter_cat[1]=1&filter_cat[2]=1&filter_cat[3]=1&filter_cat[6]=1&filter_cat[7]=1&filter_cat[24]=1",
            tv: ar + "&filter_cat[2]=1&filter_cat[3]=1&filter_cat[5]=1",
            mvids: ar + "&filter_cat[11]=1",
            elearning: ar + "&filter_cat[21]=1&filter_cat[22]=1&filter_cat[24]=1",
            ebooks: ar + "&filter_cat[21]=1",
            abooks: ar + "&filter_cat[22]=1",
            games_pc: ar + "&filter_cat[12]=1",
            apps_win: ar + "&filter_cat[16]=1",
            music: ar + "&filter_cat[23]=1",
            music_flac: ar + " FLAC&filter_cat[23]=1",
            xxx: ar + "&filter_cat[10]=1&filter_cat[20]=1"
        },
        onParse: {
            row: "#torrent_table tr.torrent",
            link_prepend: "https://alpharatio.cc/",
            sel: [
                {text: ".group_info > a:eq(0)"},
                {text: "> td:eq(7)"},
                {text: "> td:eq(5)", link: "a[href*='action=download']:eq(0)", noblank: true}
            ]
        },
		onFilter: bt.filter3dMovies,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACO0lEQVQ4jWNgoCV4euep7PTNv1Lv3n0mR1DxqlWrmK/evq117e5d1du3Hylfv3tXraF7fS+H27H/BdWLF9y581jl2bNnXDgNuH37kbJz0+ZD3GXnvjHXPPrPkbbtP2vO1f+suVf/Mxc+/s9SduW/XNWJxztO3fDA6xKrtmMnGdq//xdVD/2vGbDvgVfK9kOMHr/+C+ql/Gds/fxfqObGuydPngjjNMC54+BBxtZP/7nsVv6fMOd4+YZtJ0IYPT795zJZ+p81/8R/xqYP/7fvO+iF0wCntoMHGFs+/Bd2nv7tyZMnMs+ePeNSDz5xl9n96X+29J3/GVs+/V+7eWcITgMc2w4eYGz99D89o30dTKxj0oFGFts9/5kanvznrb716cGDB5J4DWBo+/J/856TAfdevhRft/dMaEbP6tksuaf/M1T9+9+/+kgJ3kC0bTxwjLH18/9dRy+4bTt+1dOz68BO56bt+1mqHv1iiPj7v6Tz6EScmh/euqXEG3f5O0Pr5/87Dp9Fia6cmXsnM5T9+y/qff7d8+fPRbEaUNq6vY8h6d9/hrav/+cu35yKLHfh6m1txsoH/xnCf/+fMO9AIYrGx48fc+7Zc8SR3+PSJ4aSv/8Z2n/+r+lf1Hbv3j15qBLGM2fOGCkV77zHUPbvv1rUmTtHTpy1gBuwbvuxUNWkZXdVk/fcVSnbc1elbPdd1cwld12LZu9hYGBguH73rppOzpLrqsXb7qqW7b2rGrrzrpb/gutIFgwgAACAXCA9/NcOuQAAAABJRU5ErkJggg=="
    };
});
