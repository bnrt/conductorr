bt.addSource("PTP", function () {
    var ptpMovies = "https://passthepopcorn.me/torrents.php?action=advanced&filter_cat[1]=1&filter_cat[2]=1&filter_cat[3]=1&order_by=relevance&grouping=1&searchstr={query}";

    return {
        url: {
            all: "https://passthepopcorn.me/torrents.php?action=basic&order_by=relevance&grouping=1&searchstr={query}",
            movies: ptpMovies,
//			movies_hd: ptpMovies + "&resolution=anyhd",
            movies_dvd: ptpMovies + "&format[]=DVD5&format[]=DVD9&grouping=0",
            movies_bluray: ptpMovies + "&format[]=BD25&format[]=BD50&grouping=0",
            movies_remux: ptpMovies + "&remastertitle=Remux",
            movies_720: ptpMovies + "&resolution=720p",
            movies_1080: ptpMovies + "&resolution=anyhd",
            docs: ptpMovies + "&taglist=documentary",
            mvids: "https://passthepopcorn.me/torrents.php?action=advanced&order_by=relevance&filter_cat[5]=1&searchstr={query}",
            tv: "https://passthepopcorn.me/torrents.php?action=advanced&order_by=relevance&filter_cat[3]=1&searchstr={query}"
        },
        onPrepareQuery: [bt.extractGazelleYear, bt.extractGazelleResolution],
        onParse: function (response) {
            // If redirected to a single search result
            if (response.finalUrl.indexOf('torrents.php?id=') !== -1) {
                var html = $(bt.replaceImages(response.responseText));

                $('.torrent-info-link span', html).remove();

                var torrents = [];

                $(".group_torrent_header", html).each(function () {
                    var row = $(this);
                    var cols = row.children();
                    var href = $("a[title='Permalink']", row).first().attr('href');

                    var title = $(".torrent-info-link", row);
					var seeding = title.hasClass("torrent-info-link--user-seeding");
					title = title.first().text();

                    torrents.push({
                        Title: '<a href="' + href + '"' + (seeding ? ' class="torrent-info-link--user-seeding"' : '') + '>' + title + '</a>',
                        TorrentId: href.split("torrentid=")[1],
                        Size: cols.eq(1).text(),
                        Seeders: cols.eq(3).text()
                    });
                });

                return [{
                    GroupId: response.finalUrl.split('?id=')[1].split(bt.matchFirstNonDigit)[0],
                    Title: html.find('h2.page__title').first().text().split(' [')[0],
                    Year: html.find('h2.page__title').first().text().split(' [')[1].split(']')[0],
                    Cover: $('meta.sidebar-cover-image', html).length > 0 ? $('meta.sidebar-cover-image', html).first().attr('src') : null,
                    GroupingQualities: [{
                        Torrents: torrents
                    }]
                }];
            }

            if (response.responseText.indexOf('PageData = ') === -1) {
                return [];
            }

            var data = response.responseText.split('PageData = ')[1].trim().split('</script>')[0].trim().slice(0, -1);

            try {
                return JSON.parse(data).Movies;
            } catch (e) {
                console.warn("PTP JSON parsing failed.", data);
                return [];
            }
        },
        onEnable: function(){
            if (bt.customCSS.text().indexOf('.torrent-info-link--user-seeding') === -1) {
                bt.customCSS.append(' .torrent-info-link--user-seeding {font-weight:bold;color:darkorange} ');
            }
        },
        onRender: function (movies, table) {
            var groupTable, groupTableHTML, torrent, tr;

            for (var i = 0, ml = movies.length; i < ml; i++) {
                tr = '<tr><td><h4 class="torrent-group"><a href="https://passthepopcorn.me/torrents.php?id=' + movies[i].GroupId + '" target="_blank">' + movies[i].Title + '</a> [' + movies[i].Year + ']</a></td></tr>';

                if (movies[i].Cover) {
                    tr = $(tr);
                    $(tr[0].firstChild)
                        .addClass('cover')
                        .css('backgroundImage', 'url(' + movies[i].Cover + ')');
                }

                if (!('GroupingQualities' in movies[i])) return;

                var groups = movies[i].GroupingQualities;
                groupTable = bt.table.clone().addClass("torrent-table");

                groupTableHTML = "";
                for (var g = 0, gl = groups.length; g < gl; g++) {
                    if ('CategoryName' in groups[g]) {
                        groupTableHTML += '<tr><td colspan=3><b>' + groups[g].CategoryName + ' / ' + groups[g].QualityName + '</b></td></tr>';
                    }

                    for (var n = 0, nl = groups[g].Torrents.length; n < nl; n++) {
                        torrent = groups[g].Torrents[n];

                        var title = bt.span.clone().html(torrent.Title);
                        var a = title.children('a').first();
                        a.attr("target", "_blank");
                        a.attr("href", "https://passthepopcorn.me/" + a.attr("href"));

                        groupTableHTML += '<tr><td>' + title.html() + '</td><td>' + torrent.Seeders + '</td><td><a href="https://passthepopcorn.me/torrents.php?action=download&id=' + torrent.TorrentId + '">' + torrent.Size + '</a></td></tr>';
                    }
                }
                groupTable.html(groupTableHTML);

                var torRow = bt.tr.clone().append(bt.td.clone().append(groupTable));

                table.append(tr, torRow);
            }
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4jWNgYGD4TyFm+A8D5LCpYwDlXqhJ+/9/S9r//6/T/n/+m/GfgYHhf+/98v/plzr+p91a+T/t7bX/DAwM/9O2PPuf1nb6f1rGnv8T0w6OGjDMDBjheQEA+80xL75IvfsAAAAASUVORK5CYII="
    };
});
