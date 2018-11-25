bt.addSource("Vimeo", function () {
    var domain = "https://vimeo.com";
    var q = domain + "/search?q={query}";

    return {
        url: {
            all: q,
            movies: q,
            music: q + "&category=9",
            docs: q + "&category=117&duration=long",
            mvids: q + "&category=9"
        },
        onParse: function (response) {

            try {
                var json = response.responseText;
                json = json.split('var data = ')[1];
                json = json.split('if (0) {')[0].trim().slice(0, -1);
                json = JSON.parse(json);
                json = json.filtered.data;
            } catch (e) {
                bt.showFailAlert(response);
                return null;
            }

            return json;
        },
        onRender: function (data, table) {
            var video, rows = "", id;

            for (var i = 0, len = data.length; i < len; i++) {
                video = data[i];
                rows += '<tr><td style="width:65%"><a href="' + video.clip.link + '" target="_blank" class="vimeo-link">' + video.clip.name + '</a></td><td style="white-space:nowrap;width:10%;">' + fmtMSS(video.clip.duration) + '</td><td style="width:25%;text-align:right;"><a href="' + video.clip.user.link + '" target="_blank">' + video.clip.user.name + '</a></td></tr>';
            }

            table.html(rows);
        },
        onEnable: function () {
            $(bt.mainColumn).on('click', 'a.vimeo-link', function (e) {
                e.preventDefault();
                e.stopPropagation();

                var a = $(this);
                var td = $(this.parentNode);
                var iframe = td.children("iframe");
                if (iframe.length > 0) {
                    iframe.remove();
                } else {
                    bt.mainColumn.find("iframe").remove();
                    var href = a.attr("href");
                    var id = href.split("vimeo.com/")[1].split("?")[0].split("/")[0]; // just in case
                    td.append('<iframe src="https://player.vimeo.com/video/'+ id +'?autoplay=1&color=ffffff&title=0&byline=0&portrait=0&badge=0" width="560" height="315" frameborder="0" style="display:block;margin-top:10px;" allowfullscreen></iframe>');
                }

                return false;
            });
        },
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/0lEQVQ4jaWTvw2CQBTGGYQQF2ACJsAFmMAJmMAJnMAJ7LQgFBQ0mlDYEGJjYSLxggLhMKIBzWd15E7+RPQlr3n5vt/7czlJXhJdsaLTyL5gSCpWdJKXRJd+MfMQaYhBc5NGTQCoToxNUgIA5oeirpt+Dlq+AAC0fMHwsiZAX6c4Fk/wwbp+xmx/EwGam9Qd+DC8DKafI6BVP4CNaXiZIDT9vBZ21RtH5LuxO5h+XteOxbP7iCP7gunuKohVJxbWm2xpP0Bfp8K4vNmOHv3PyLLtoAGtoDrxd4BFeBfMbJU2bSuAf9ZNUnaaOwFD8t/PRCR5RcaKFZHh5nMor8j4DUIXDtllgAeRAAAAAElFTkSuQmCC"
    };
});
