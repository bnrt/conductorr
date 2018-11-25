bt.addSource("BTN", function () {
    return {
        url: {
            all: "https://broadcasthe.net/torrents.php?searchstr=",
            tv: "https://broadcasthe.net/torrents.php?searchstr=",
            docs: "https://broadcasthe.net/torrents.php?searchstr="
        },
        onHttpRequest: function (requestData) {
            var btnKey = bt.getPersistentValue("BTN_KEY", "").trim();

            var data = {
                method: "getTorrents",
                params: [btnKey, {"Resolution": ["720p", "1080p", "1080i"]}, 50],
                id: Date.now()
            };

            if (requestData.context.query) {
                if (requestData.context.category === "docs") {
                    bt.extractYear(requestData.context);
                    bt.extractResolution(requestData.context);
                    data.params[1] = requestData.context.query;
                } else {
                    bt.extractYear(requestData.context);

                    var res = bt.extractResolution(requestData.context);
                    if (res) {
                        data.params[1].Resolution = res;
                    }

                    data.params[1].Series = '%' + requestData.context.query.trim().replace(bt.spacesRegex, '%') + '%';
                }
            }

            $.extend(requestData, {
                method: "POST",
                url: "https://api.broadcasthe.net/",
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify(data)
            });

            console.log("BTN request data", JSON.stringify(requestData));
        },
        onParse: function (response) {
            console.log("BTN response data");
            console.log(response.statusText, JSON.stringify(response.responseHeaders));
            console.log(response.responseText);

            try {
                var data = JSON.parse(response.responseText);
            } catch (e) {
                bt.showFailAlert(response);
                return null;
            }

            if (typeof data !== "object" || !("result" in data) || data.result === null || !("results" in data.result)) {
                if ("error" in data && data.error !== null && "message" in data.error) {
                    bt.showFailAlert(response, data.error.message);
                    return null;
                } else {
                    console.warn("Unexpected data from BTN", data, response);
                    return [];
                }
            }

            var num = parseInt(data.result.results);

            response.context.searchUrl = "https://broadcasthe.net/torrents.php?searchstr=" + encodeURIComponent(response.context.query);

            if (num === 0) {
                return [];
            } else {
                data = data.result.torrents;
                data = Object.keys(data).map(function (k) {
                    return data[k];
                });
                return data;
            }
        },
        onRender: function (torrents, table, response) {
            var title, rows = "";

            for (var i = 0, tl = torrents.length; i < tl; i++) {
                title = '<a href="https://broadcasthe.net/torrents.php?id=' + torrents[i].GroupID + '&torrentid=' + torrents[i].TorrentID + '" target="_blank">' + torrents[i].ReleaseName + '.' + torrents[i].Container.toLowerCase() + '</a>';

                if (response.context.category === "docs") {
                    title = '<a href="https://broadcasthe.net/series.php?id=' + torrents[i].SeriesID + '" target="_blank">' + torrents[i].Series + '</a> - ' + title;
                }

                rows += '<tr><td>' + title + '</td><td>' + torrents[i].Seeders + '</td><td><a href="' + torrents[i].DownloadURL + '">' + bt.humanizeSize(torrents[i].Size) + '</a></td></tr>';
            }

            table.html(rows);
        },
        config: function () {
            var form = $('<div class="form-inline"><div class="form-group">Enter your API key from <a href="https://broadcasthe.net/user.php?action=edit#section5.editprofile" target="_blank" style="text-decoration:underline;">here</a>:</div></form>');
            var input = $('<input type="text" class="form-control input-sm" style="width:250px">').val(bt.getPersistentValue("BTN_KEY"));
            var btn = $('<button type="submit" class="btn btn-primary btn-sm">Save</button>')
                .on("click", function () {
                    bt.setPersistentValue("BTN_KEY", input.val().trim());
                    alert("Saved!");
                });

            form
                .append(' ', btn)
                .children().first().append(' ', input);

            return form;
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACi0lEQVQ4jY1R3UuTcRQ+6d73/Z0TQh83XtSFXRt0UYyIatClUFer/8A+pi5fP1abydtgGhNsa1u5D/dOpxOmmIHSxSILES3FVTBtWlohdBF4VUSoO13MKYYfPfC7eXiec57fcwD2QHH8c4Xc9enaXppdIaIfTlDs4x/S51jS50/9n0tfKjX0fD0HACAF3xspOMMUnGHxJG0CAJD6lozQs3xsR68cmS3H7oXv1DW/bogvnpc8E0byjjN5x1k8nDDJ+txJ6s6uUvfCD0nPntnuDk6T0DNZimYY9cxPOTJbLrW9NJI7xeROsWhNmSCQKSU9s5LXzC6Dnj60tb1jugXDacZwOqcEZ2oAACTnkJGcQ0zOIRbaU1NeN3UFw+k1DKdZ6Zjybw5QfJPvKPCGhX8yC1pSBgCQ7vYZyd7LZO9l0RQ35ZV8AH2TExvaRQAAKLG0HBWesV/kGWPR/rq1MFSq7ThN9RGm+giLusiFAo9to7fRM8boGVtFNXocDt/wlqM7xehO8UHXSMNmLLO5WK7266LG3wvmdizQdH/Qgu4UY9sLxvrOswCVlRK6hlfINczC+axzv0sLbfABuYZZuIZ/Q2NnSb6De/3PSRtgbE6uQG3kyK7u2nbE5v5F0gZYNCffbl3BHr+KjsQ6ORKs2BP9hSK3QRs1KHcSHnQkGB2JnNSUuL49mk1Poi3GaIvlRGNsWlFDl0WVr0xU+cqU+mCFaIhOYmMsR7YYC1tXCkAr2r7BrMmKGhpBNcRUF2KsC+eEGloTamgN1XAuz4VYqOFXUBmknf9oNhfLVn+TqAl8QWuAaeOhNcDCGvgmVz92gaYZ9isaQNOKDDcfXVQsXlW+5W00WLyXQPs3ch5/AabcHAKs7QdQAAAAAElFTkSuQmCC"
    };
});
