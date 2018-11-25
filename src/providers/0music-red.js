bt.addSource("RED", function () {
    var wcd = "https://redacted.ch/ajax.php?action=browse&searchstr={query}";

    return {
        website: "https://redacted.ch/",
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
                link = "https://redacted.ch/torrents.php?id=" + group.groupId;

                if ("torrents" in group) {
                    artist = (group.artist === 'Various Artists')
                        ? 'Various Artists'
                        : bt.ab.clone().attr("href", "https://redacted.ch/artist.php?id=" + group.torrents[0].artists[0].id).html(group.artist);

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

                        groupTableHTML += '<tr><td><a href="https://redacted.ch/torrents.php?torrentid=' + torrent.torrentId + '" target="_blank">' + torrent.format + ' / ' + torrent.encoding + score + cue + '</a>' + (torrent.isFreeleech ? ' <span class="label label-success">Freeleech</span>' : '') + '</td><td>' + torrent.seeders + '</td><td><a href="https://redacted.ch/torrents.php?action=download&id=' + torrent.torrentId + '">' + bt.humanizeSize(torrent.size) + '</a></td></tr>';
                    }

                    groupTable = bt.table.clone()
                        .addClass("torrent-table")
                        .html(groupTableHTML);

                    torRow = bt.tr.clone().append(bt.td.clone().attr("colspan", "3"));
                    torRow[0].firstChild.appendChild(groupTable[0]);

                    table.append(tr, torRow);
                } else {
                    table.append('<tr><td><a href="' + link + '" target="_blank">' + group.groupName + '</a></td><td>' + group.seeders + '</td><td><a href="https://redacted.ch/torrents.php?action=download&id=' + group.torrentId + '">' + bt.humanizeSize(group.size) + '</a></td></tr>');
                }
            }
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABtUlEQVQ4jd2PT0iTcRjHP6bw6qZIIHh4IXYaBq8YlUXuT6WmhGwXy+pQMRAEQQRpB4faQt4RFBWGGEgSRHTUg4jaJepiogi9bEWHPJiHBkERZHT5dnknc5t494HP6ff9fn7PA8VzFngOfAH+uXwGpoGWEvndKQcm6utNpVKPtbr6SdnsjrLZP1pZScu2H8k0jwmYBCpKCZ6Gw23KZLZl209kWadlGIYMw5Df36jhYVvp9De1tnYKeFZYPm+aPq2vb6q9vUtASZqbW7S2timfzy+gI1/wZnx8UgMDY/uWc8Rig3rwcEbA+1y5xuPxamk5o9raugMFHk+NFpfSqq4+KqAO4JJlBZS6/3pPsAx0w6WsQJK890InT7UJiAIMNp24qFB47+3XQT9cegoEweDlnOAOwN3KSq8i0dvq748rEAgXCa65xVDogoaGErra06uqKq+AJMBoR+dNzc45cpzvisdH9j0hkUhqa+u33r77qkgkJmAMIBmJ9hYJSpEv6L7St7vBIRDcajh+Ri9ffcgXbAAO8NfFATZygvmFj7IazwmIARwBpoBf7k8/gSDFE3Tf5GangPL/2aNkki5A3X4AAAAASUVORK5CYII="
    };
});
