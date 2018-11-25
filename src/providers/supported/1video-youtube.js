bt.addSource("YouTube", function () {
    var q = "https://m.youtube.com/results?ajax=1&tsp=1&q={query}";

    return {
        url: {
            all: q,
            docs: q,
            music: q,
            movies: q,
            mvids: q,
            games_pc: q
        },
        onHttpRequest: function (requestData) {
            requestData.headers = {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 5 Build/LMY48B; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.65 Mobile Safari/537.36'
            };
        },
        onParse: function(response){
            try {
                var data = JSON.parse(response.responseText.slice(response.responseText.indexOf("{")));
            } catch (e) {
                bt.showFailAlert(response, "unexpected data");
                return null;
            }

            if (!data || !("result" in data) || data.result !== 'ok') {
                bt.showFailAlert(response, "unexpected data");
                return null;
            }

            if ("content" in data && "search_results" in data.content && "contents" in data.content.search_results) {
                return data.content.search_results.contents;
            }

            return [];
        },
        onRender: function (data, table) {
            var video, rows = "", id;
            console.log(data);
            for (var i = 0, len = data.length; i < len; i++) {
                video = data[i];

                switch (video.item_type) {
                    case "compact_video":
                        rows += '<tr><td><a href="https://youtube.com' + video.endpoint.url + '" data-video-id="' + video.encrypted_id + '" target="_blank" class="youtube-link">' + video.title.runs[0].text + '</a></td><td>' + video.length.runs[0].text + '</td><td style="width:20%;text-align:right;">' + video.short_byline.runs[0].text + '</td></tr>';
                        break;
                    case "compact_playlist":
                        rows += '<tr><td><a href="https://youtube.com' + video.endpoint.url + '" data-playlist-id="' + video.playlist_id + '" target="_blank" class="youtube-link">' + video.title.runs[0].text + '</a></td><td style="white-space:nowrap;">' + (video.video_count_short.runs.length ? video.video_count_short.runs[0].text : "no") + ' videos </td><td style="width:20%;text-align:right;">[PLAYLIST]</td></tr>';
                        break;
                    case "compact_channel":
                        rows += '<tr><td><a href="https://youtube.com' + video.endpoint.url + '" data-user-id="' + video.endpoint.url.split("/").pop() + '" target="_blank" class="youtube-link">' + video.title.runs[0].text + '</a></td><td style="white-space:nowrap;">' + (video.video_count.runs.length ? video.video_count.runs[0].text : "no videos") + '</td><td style="width:20%;text-align:right;">[CHANNEL]</td></tr>';
                        break;
                }
            }

            table.html(rows);
        },
        /*
        onParse: {
            row: "ol.item-section > li:has(a[href*='watch?v='])",
            link_prepend: "https://www.youtube.com",
            sel: [
                {
                    text: "h3 > .yt-uix-tile-link",
                    class: "youtube-link",
                    vod: ".yt-badge-ypc"
                },
				{text: ".video-time"},
				{text: ".yt-lockup-byline > .g-hovercard", width:"20%"}
            ]
        },
        */
        onEnable: function(){
            $(bt.mainColumn).on('click', '.youtube-link', function (e) {
                var id, a = $(this), td = $(this.parentNode);
                var iframe = td.children("iframe");
                if (iframe.length > 0) {
                    iframe.remove();
                } else {
                    bt.mainColumn.find("iframe").remove();

                    var url = "https://www.youtube.com/embed/";
                    if (id = a.data("video-id")) {
                        url += id + "?autoplay=1";
                    } else if (id = a.data("playlist-id")) {
                        url += "?listType=playlist&autoplay=1&iv_load_policy=3&list=" + id;
                    } else if (id = a.data("user-id")) {
                        url += "?listType=user_uploads&autoplay=1&iv_load_policy=3&list=" + id;
                    } else {
                        return;
                    }

                    td.append('<iframe width="560" height="315" src="' + url + '" frameborder="0" allowfullscreen style="display:block;margin-top:10px;"></iframe>');
                }

                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        },
        onFilter: function(data, response){
            response.context.searchUrl = "https://www.youtube.com/results?q=" + encodeURIComponent(response.context.query);

            if (response.context.category === "mvids" || response.context.category === "docs") {
                return data.filter(function (v) {
                    if (!~v.item_type.indexOf("compact_")) {
                        return false;
                    }

                    var title = v.title.runs[0].text.toLowerCase();

                    return !(~title.indexOf("audio") || ~title.indexOf("lyric") || ~title.indexOf("album"));
                });
            }

            return data;
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAArklEQVQ4jWNgGDTgia7a/Ke66v+JwU901ebDNV7VFuV5qK32nxx8Q12El+Gepup/SjDDbXWV/5Rghuuqyv+xYRjAJQ/DDFeUlf5jw8jgxYMHWNVcUVb6z3BRUek/NowMLigqfcWljuGsvOJ/bPj/////r3n6nMUlD8MMp2QV/lOCGY5Jy/+nBDPsFxXlOSwp958cvF9UlAeeIg+IyTQeEJf9TwzeLy4zeSCyG3YAAIY9jDwMQOfNAAAAAElFTkSuQmCC"
    };
});
