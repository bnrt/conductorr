bt.addSource("OPS", function () {
    var wcd = "https://orpheus.network/ajax.php?action=browse&searchstr={query}";

    return {
        website: "https://orpheus.network/",
        url: {
            all: wcd,
            music: wcd + "&filter_cat[1]=1",
            music_flac: wcd + "&filter_cat[1]=1&format=FLAC",
            //		music_mp3: wcd + "&filter_cat[1]=1&format=AAC|MP3",
            elearning: wcd + "&filter_cat[3]=1&filter_cat[4]=1&filter_cat[5]=1&filter_cat[7]=1",
            mags: wcd + "&filter_cat[3]=1",
            ebooks: wcd + "&filter_cat[3]=1",
            fiction: wcd + "&filter_cat[3]=1",
            abooks: wcd + "&filter_cat[4]=1",
            comics: wcd + "&filter_cat[7]=1",
            apps_win: wcd + "&filter_cat[2]=1"
        },
        onPrepareQuery: bt.extractGazelleYear,
        onParse: function (response) {
            try {
                var data = JSON.parse(response.responseText);
            } catch (e) {
                bt.showFailAlert(response);
                return null;
            }

            if (!('status' in data) || data.status !== 'success' || !('response' in data) || !('results' in data.response)) {
                bt.showFailAlert(response, "unexpected data");
                return null;
            }

            return data.response.results;
        },
        onFilter: function (data, response) {
            var words = response.context.query.toLowerCase().split(' ');

            response.context.searchUrl = response.finalUrl.replace('ajax.php?action=browse', 'torrents.php?action=basic');

            return data.filter(function (value) {
                for (var i = 0, l = words.length; i < l; i++) {
                    if ((('artist' in value && value.artist.toLowerCase().indexOf(words[i]) === -1) || !('artist' in value)) && value.groupName.toLowerCase().indexOf(words[i]) === -1) {
                        return false;
                    }
                }

                return true;
            });
        },
        onRender: function (data, table) {
            var nl, group, torrent, groupTable, groupTableHTML, torRow, tr, n, score, cue, ed = "", media = "", link, artist;

            var torrentGroupHeader = bt.trtd.clone();
            $(torrentGroupHeader[0].firstChild).append(
                bt.h4.clone().addClass("torrent-group")
            );

            for (var i = 0, l = data.length; i < l; i++) {
				ed = ""; media = "";
                group = data[i];
                link = "https://orpheus.network/torrents.php?id=" + group.groupId;

                if ("torrents" in group) {
                    artist = (group.artist === 'Various Artists')
                        ? 'Various Artists'
                        : bt.ab.clone().attr("href", "https://orpheus.network/artist.php?id=" + group.torrents[0].artists[0].id).html(group.artist);

                    tr = torrentGroupHeader.clone();
                    tr[0].firstChild.setAttribute("colspan", "3");
                    $(tr[0].firstChild.firstChild).append(
                        artist,
                        " - ",
                        bt.ab.clone().attr("href", link).html(group.groupName),
                        ' [' + group.groupYear + '] [' + group.releaseType + ']'
                    );

                    if (group.cover) {
                        $(tr[0].firstChild)
                            .addClass('cover')
                            .css('backgroundImage', 'url(' + group.cover + ')');
                    }

                    groupTableHTML = "";
                    for (n = 0, nl = group.torrents.length; n < nl; n++) {
                        torrent = group.torrents[n];

                        if (ed !== torrent.remasterTitle || media !== torrent.media) {
                            ed = torrent.remasterTitle;
                            media = torrent.media;
                            groupTableHTML += '<tr><td colspan="3" class="tr-title">' + (ed ? ed : "Original Release") + ' ' + torrent.remasterCatalogueNumber + ' ' + (torrent.remasterYear ? torrent.remasterYear : "") + ' / ' + media + "</td></tr>";
                        }

                        score = torrent.hasLog ? ' / Log (' + torrent.logScore + '%)' : '';
                        cue = torrent.hasCue ? ' / Cue' : '';

                        groupTableHTML += '<tr><td><a href="https://orpheus.network/torrents.php?torrentid=' + torrent.torrentId + '" target="_blank">' + torrent.format + ' / ' + torrent.encoding + score + cue + '</a>' + (torrent.isFreeleech ? ' <span class="label label-success">Freeleech</span>' : '') + '</td><td>' + torrent.seeders + '</td><td><a href="https://orpheus.network/torrents.php?action=download&id=' + torrent.torrentId + '">' + bt.humanizeSize(torrent.size) + '</a></td></tr>';
                    }

                    groupTable = bt.table.clone()
                        .addClass("torrent-table")
                        .html(groupTableHTML);

                    torRow = bt.tr.clone().append(bt.td.clone().attr("colspan", "3"));
                    torRow[0].firstChild.appendChild(groupTable[0]);

                    table.append(tr, torRow);
                } else {
                    table.append('<tr><td><a href="' + link + '" target="_blank">' + group.groupName + '</a></td><td>' + group.seeders + '</td><td><a href="https://orpheus.network/torrents.php?action=download&id=' + group.torrentId + '">' + bt.humanizeSize(group.size) + '</a></td></tr>');
                }
            }
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADBElEQVQ4y31TPWgkZRh+3vl+ZnZ3ZnO5S2IWyV4WlfwQF7IX7EIIVjZWksZgmcIihZDiGrGIWBgLGxGbNEoawcbWwBmrwCYQWbLHSQiXQGLkQjY7uzvzzTffa+OBdx4+5cvzPsXzA7wCWmsCoHzf12tra3J/f1+cnJzQq7gvHGdmZsaYeUkI8aBarQYLCwvXs7OzcRiG1jnXyfP8D2tta2Vl5eYFgbm5OY+Z32XmT3zfn67X61fz8/N/Dg0NGSJiIgIzg5nzPM9Psyz7MY7j5sbGBksAIKL3AHyhtb7baDSeTk1NXRtj5NXVlel0Ov5gMCiXSiUThmHmeV7dOXffWvsNgD1qNBrTzPwtM79ZrVafTU9PPwNAnucdKKW+39vbC7rd7rrW+p3x8fHu5OTkjVIKzPw0y7LPxMTExLrneUtBEJhKpRJba2Wapo+ttZ9vbW09OT09Pa9UKvvM/KDb7db6/b5USuVpmt5L0xSiVqt9KqUsFwqFTGvNaZqSMea77e3t5nOjLi4ubmu1WialXLLWKmaGtVYYY+7JIAhGARghBMdxrAHcAHj8clyFQqEF4BrAcJIkyhjjAEzIYrGYAXDGGNHr9TQA9XK8AFAqlRwzWwBZkiRiMBhoIrIyDMMzInp9MBi4TqcTOOeGAcwBaP9bIIqiKeecz8wmjuNSkiSKiC68MAwfRVGUjoyM9MvlcmKMCdI0/aher088f15fX69EUfR+uVzOlVK21+tpY4wwxvwqoyj6SUpZJ6JqGIZ/+b6fXV5evm2M+XJxcfHr5eXlxFr7oXPuDWbun5+fj/b7/QDAEyL6gQBgc3NzUUr5sed5Q8457na7Ko5jv1AodIaHhw2AIhG54+PjuwcHB/ezLLsmooetVutnCQC+7/9WLBYTpdQHQojJsbEx8U99yTnn3d7e5oeHh68dHR2Npmn6OxF9xcy//GdMOzs7d4QQc0KIt4ioHMexarfbYbPZvHN2dpbked4kokftdvsK/4dWq0W7u7tidXVVaq01ABUEwSvn/DeWnXyjwHaNHQAAAABJRU5ErkJggg=="
    };
});
