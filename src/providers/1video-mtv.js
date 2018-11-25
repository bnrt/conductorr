bt.addSource("MoreThanTV", function () {
    var q = "https://www.morethan.tv/ajax.php?action=browse&order_by=time&searchsubmit=1&searchstr={query}";

    return {
        url: {
            all: q,
            tv: q + "&filter_cat[2]=1",
            docs: q + "&taglist=documentary"
        },
        onPrepareQuery: function(context){
            var i,
                len = context.url.length,
                res = bt.extractResolution(context);

            if (res) {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&encoding=" + res;
                }
            }

            var year = bt.extractYear(context);

            if (year) {
                for (i = 0; i < len; i++) {
                    context.url[i] += "&filelist=" + year;
                }
            }
        },
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

            response.context.searchUrl = response.finalUrl.replace("ajax.php?action=browse", "torrents.php?action=basic");

            return data.response.results;
        },
        onRender: function (torrents, table) {
            var title, rows = "";

            for (var i = 0, l = torrents.length; i < l; i++) {
                title = '<a href="https://www.morethan.tv/torrents.php?id=' + torrents[i].groupId + '&torrentid=' + torrents[i].torrentId + '" target="_blank">' + torrents[i].groupName + '</a>';

                if (torrents[i].fileCount > 1) {
                    title += ' (' + torrents[i].fileCount + ' files)';
                }

                if (torrents[i].isFreeleech) {
                    title += ' <span class="label label-success">Freeleech</span>';
                }

                rows += '<tr><td>' + title + '</td><td>' + torrents[i].seeders + '</td><td><a href="https://www.morethan.tv/torrents.php?action=download&id=' + torrents[i].torrentId + '">' + bt.humanizeSize(torrents[i].size) + '</a></td></tr>';
            }

            table.html(rows);
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABZ0lEQVQ4jcWTu0qDYQyGA4qCDuJisV/S/m8c3HTwCgQXL6CTizg4eAAPQ1EQHAV1ETxUsF/i2FVw0UEEN2/B2c0bcPgcfv9ixVMnX3iHF5KHhBAiIroImPSAbQs4MMHmZ8egGxZ0ywWHzlhxrs42yuUBIiKyERmLIVuLgh0Luu6c1XOYbhX2gG0TbEbRBRPcu2gywbMzJmi/VBrcJeqjLuSsDy6aPOC4m762TOAumixos5MsuHHR9D8AYzRcNHUaL0RENlqZes83PwEWTfDkoimH5dPEgJpzVnfR5JzV/7xCDKgVMBN9dNF0MlQZ/hOgKHTBy4d1Wu06xuV3gFbR0CzrTHv09/wroFmqqDEaxmg0SxUtcmTd+/UK3agDcETUXyPq6QrAeuuiKYqe0UUZ45Gxmn8ZVkyw/JWj6JKxzjnjKj+pvnqoTtMuUW8M2bwJ3BnnUfTsK5voqQccO+POWK89VKeJiN4AsErg8gM6/z4AAAAASUVORK5CYII="
    };
});
