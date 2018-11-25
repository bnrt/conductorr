// ==UserScript==
// @name        Conductorr
// @description Searches across multiple sources at once.
// @namespace   BlackNullerNS
// @include     file:///*/btsearch.html*
// @include     file:///*/conductorr.html*
// @version     1.8
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/js/bootstrap.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/jquery.sticky/1.0.1/jquery.sticky.min.js
// ==/UserScript==

"use strict";

//window.console = {
//    log: function () {},
//    warn: function () {},
//    error: function () {}
//};

/*
 * jQuery Tiny Pub/Sub
 * https://github.com/cowboy/jquery-tiny-pubsub
 *
 * Copyright (c) 2013 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 */

(function ($) {

    var o = $({});

    $.subscribe = function () {
        //console.log("Subscribed", arguments[0]);
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        //console.log("Unsubscribed", arguments[0]);
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        //console.log("Fired event", arguments[0]);
        return o.trigger.apply(o, arguments);
    };

}(jQuery));

function fmtMSS(s){return(s-(s%=60))/60+(9<s?':':':0')+s}

var SearchEngine = function () {
    var self = this;

    self.sources = {};
    self.sourceCallbacks = {};
    self.pageId = false;
    self.categories = {};
    self.timeout = 8000;
    self.protocols = ["http", "https", "ftp", "magnet", "ed2k"];
    self.resolutions = ["480p","576p","720p","1080p","1080i"];
    self.all = "all";
    self.favorites = "favorites";

    self.nonAlphaNumericRegex = /^[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+$/;
	self.matchNonAlphaNumericRegex = /[^\u00BF-\u1FFF\u2C00-\uD7FF\w]+/g;
	self.matchFirstNonDigit = /[^\d]/;
	self.yearRegexSimple = /(([\ ]{1}|^)(19|20)[\d]{2}([\ ]{1}|$))/g;
	self.yearRegexAdvanced = /(([\ ]{1}|^)(19|20)[\d]{2}\-(19|20)[\d]{2}([\ ]{1}|$)|([\ ]{1}|^)\-(19|20)[\d]{2}([\ ]{1}|$)|([\ ]{1}|^)(19|20)[\d]{2}\-([\ ]{1}|$)|([\ ]{1}|^)(19|20)[\d]{2}([\ ]{1}|$))/g;
	self.imgTagRegex = /<img /g;
	self.dashRegex = /\-/g;
    self.queryRegex = /\{query\}/g;
    self.spacesRegex = /[ ]+/g;

    document.head.innerHTML = "\
		<meta charset=\"utf-8\">\
		<title>Conductorr</title>\
		<link rel=\"shortcut icon\" href=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5UlEQVQ4jXXR708SARgH8HsVoCjceQfIAYeKKZ5wdxC4stbWqq2t/gF9LW985Zt64Rs4r/EmzCN90dZW/4D/gD9w06mYiIIoWmqCwUZGq7XpC3XfXjQ3s/G8fZ7v58XzJUKhUElVVYyNjUFVVcTjcYiiGCKujSiKoat3qqpiYGCgRIyOjqJQKKBYLKJYLKJcLkMQhMh1QBCESKlUwuHhIY6OjlAoFBCLxUAoioL19XVkMhmsra0hl8vVBPL5PFKpFNLpNNLpNKLRKAhZljE9PY2pqSkkEgnMz8/XBFZWVjA7O4uZmRnMzc0hHA6D6Ovrg6IoGBkZgSzLUBSlJnC5j0QikGUZ/f39ICY8QVRsXTjmPPjOefHLFagJ/HYFccx5UbHzOOa8mPAEQYzzfuxSLPYYBw5MTlTb/DWBY6eAL+YWfKbt+EzbMd4pghjvvoV8kw07lA17DIeqU6wJVNv82Dc58Yl2IE+xGHdLIOJu/3mOYrFNsdijOVSdPvRI0n9AjyRFqi1+7DFObJEstigb4m7fOfGK95WyRis2SSt2KTtKlna8vPNgjed5/WWY53m9HLyfKlvd2CZZbBibsWGw4LU3UCKed/smt4wsUg0m5IxWHFAOfHMFzt7cfZR9FuiJPvUHourth9mKK3h2QDmw0WjGusGCrKEZL7p9k0SvIAzlae58tcGMlN6E7QYLjkgOP5kOnNr8OGUl/KDb8ZXkkG+0It1gxnI9gzzTcn5PEIYISZKYdy1d+8l6Ggs6Elm9GTt6CwqNVpQNNpQNNhw2NmNbb0JGb8ZiHYVkPY23zs59SZKYvw/yiIMJS+vJkpbCopZEUksio6OxVccgq6OxWcdgVdeEBS2JJR2FhKX1pMcjDv7z5V6PMPSB6yhn9JaL5A0jljUkkhoSyxojFjVGfNRQyNaZLt47Osq9HmHoekuXXbNPvOJw+Ca/EGvjK6qjA2N2F2JtfEVxexced3uHBUFgr2b+ALrXp0Lde/kOAAAAAElFTkSuQmCC\">\
	";

    self.customCSS = document.createElement("style");
	self.customCSS.textContent = "\
        td { font-size: 90%; } \
        h2 { margin-top: 0; margin-bottom: 14px; } \
        #container { min-width: 980px; margin-top: 18px; } \
        #sidebar .btn-group { display:block; } \
        #search-buttons > div { display:block; margin-bottom:3px; } \
        #search-buttons > div::after { display: table; clear:both; content: \" \" } \
        #sticky > div { margin-bottom: 14px; } \
        #search { margin-bottom: 18px; width:100%; padding-right: 22px; } \
        #searchclear { position: absolute; right: 5px; top: 0; bottom: 0; height: 14px; margin: auto; font-size: 14px; cursor: pointer; color: #ccc; } \
        #searchclear:hover { color: #999; } \
		#app-buttons > * { margin-right:6px; } \
        #main .panel:last-of-type { margin-bottom:20px; } \
        .dropdown-menu { padding-left: 7px; padding-right: 7px; } \
        .dropdown-menu button { margin:0 1px 2px 0; } \
        #category-favorites > div { display: block; margin: 0 0 12px 0; }\
        .torrent-table { margin:0; } \
        .torrent-table tr:first-child td { border-top:0; } \
        .torrent-table td { font-size: 95%; padding: 2px !important; } \
        .torrent-group { padding-left: 0; } \
        .icon { background-position: left center; background-repeat: no-repeat; padding-left: 22px; } \
        .icon.link-icon { display: inline-block; margin-bottom: -3px; margin-right:8px; width: 16px; height: 16px; padding-left: 0; } \
        .btn:focus { outline: none; } \
        button.icon { border-radius: 0; border:0; width: 22px; background-position: center center; padding-left: 0; } \
        .failed { background-color: #c00; color: #fff } \
        .result-panel { margin-bottom: 10px; }\
        .result-panel > .panel-heading { padding:6px 8px; cursor: pointer; } \
        .result-panel > .panel-body { padding:0; } \
        .result-panel > .panel-body > table { margin:0; } \
        .result-panel > .panel-body td { padding:5px 8px; } \
        .result-panel > .panel-body td:first-child { width: 80%; word-break: break-all; -webkit-hyphens: auto; -moz-hyphens: auto; hyphens: auto; } \
        .result-panel > .panel-body td:last-child:not(:only-child) { text-align: center; } \
        .result-panel > .panel-body td:not(:first-child):not(:last-child) { text-align: center; color: #999; } \
        .result-panel .label { display: inline-block; margin:0; } \
        .result-panel .tr-title { font-weight:bold; }\
        #no-results::before { content: \"No results: \"; margin-right: 10px; } \
        .panel > .close { padding: 3px 12px; } \
        .panel-primary > .close { color: white; } \
        .cover { padding-left: 90px !important; background-size: 80px auto; background-position: left center; background-repeat: no-repeat; } \
        #source-buttons { margin-bottom:18px; line-height:200%; }\
        #source-buttons > .btn-group { margin-right: 5px; }\
        #source-buttons ul { line-height:150%; }\
        #source-buttons .dropdown-menu a { display:inline-block; font-size: 80%; margin-top:10px; }\
    ";
	document.head.appendChild(self.customCSS);
	self.customCSS = $(self.customCSS);

    self.layout = $(
        '<div class="container" id="container">' +
            '<div class="row">' +
                '<div class="col-md-3 pull-left" id="sidebar">' +
                    '<div id="sticky">' +
                        '<div class="btn-group">' +
                            '<input type="text" class="form-control" id="search">' +
                            '<span id="searchclear" class="glyphicon glyphicon-remove-circle"></span>' +
                        '</div>' +
                        '<div id="search-buttons"></div>' +
                        '<div id="app-buttons"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-md-9 pull-right" id="main"></div>' +
            '</div>' +
        '</div>'
    );

    self.input = $('input', self.layout).first();

    self.buttons = $('#search-buttons', self.layout);

    self.mainColumn = $(self.layout[0].firstChild.lastChild)
        .on('click', '.close', function (e) {
            e.stopPropagation(e);
            $(this.parentNode).slideUp("fast", function () {
                $(this).remove();
                if ($('.close', self.mainColumn).length === 0) {
                    resetContent();
                }
            });
        })
        .on('click', '.panel-title > a', function (e) {
            e.stopPropagation();
        })
        .on('click', '.result-panel > .panel-heading', function () {
            $(this.nextElementSibling).slideToggle("fast");
        });

    $('#searchclear', self.layout)
        .on("click", function (e) {
            e.stopPropagation();

            if (self.input.val() === "") {
                resetContent();
            } else {
                self.input.val('');
            }

            self.input.val('').focus();
            document.location.hash = " ";
        });

    self.div = $(document.createElement("div"));
    self.span = $(document.createElement("span"));
    self.table = $(document.createElement("table")).addClass("table");
    self.tableStriped = self.table.clone().addClass("table-striped");
    self.tr = $(document.createElement("tr"));
    self.td = $(document.createElement("td"));
    self.trtd = self.tr.clone().append(self.td.clone());
    self.h2 = $(document.createElement("h2"));
    self.h4 = $(document.createElement("h4"));
    self.a = $(document.createElement("a"));
    self.ab = self.a.clone().attr("target", "_blank");

    self.iconLink = self.ab.clone().addClass("icon");
    self.iconBtn = $('<button type="button" class="btn btn-default btn-xs icon">&nbsp;</button>');
    self.categoryBtn = $('<div class="btn-group btn-group-xs"><button class="btn btn-primary"></button><button class="btn btn-primary dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><div class="dropdown-menu"></div></div>');
    self.resultPanel = $('<div class="panel panel-primary result-panel"><div class="panel-heading"><h4 class="panel-title"></h4></div><div class="panel-body"></div></div>');
    self.closeBtn = $('<button type="button" class="close">&times;</button>');
    self.failAlert = $('<div class="alert alert-danger alert-dismissible errors"></div>').append(self.closeBtn.clone());
    self.warningAlert = $('<div id="no-results" class="alert alert-warning alert-dismissible"></div>').append(self.closeBtn.clone());

    self.header = null;
    self.content = null;

    self.persistentData = null;
    self.persistentDataId = "search-persistent-data";

    $.subscribe('source-added', function (e, id) {
        console.log("Added", id);

        if (sourceIsEnabled(id)) {
            self.enableSource(id);
        }
    });

    $.subscribe('source-enabled', function (e, id, data) {
        console.log("Enabled", id);

        data.url[self.favorites] = data.url[Object.keys(data.url)[0]];

        self.sources[id] = $.extend(data, {
            name: id,
            iconCss: $(document.createElement('style'))
                .text('.icon-' + id + ' { background-image:url("' + data.icon + '"); }')
                .insertAfter(self.customCSS)
        });

        var btn, btnId, categories = Object.keys(data.url),
            disabledCategories = getDisabledCategories(id);

        for (var i = 0, len = categories.length; i < len; i++) {
            btnId = id + '__' + categories[i];
            if (disabledCategories.indexOf(categories[i]) === -1) {
                if ($('#' + btnId).length === 0) {
                    btn = self.iconBtn
                        .clone()
                        .addClass('icon-' + id)
                        .attr('id', btnId)
                        .attr('title', id)
                        .data('src', self.sources[id]);
                    categories[i] === self.favorites ? btn.appendTo(getCategoryGroup(categories[i])[0].firstChild) : btn.appendTo(getCategoryGroup(categories[i])[0].lastChild);
                }
            } else {
                $('#' + btnId).remove();
            }
        }

        self.buttons.children(':not(:has("button.icon"))').remove();

        if ("onEnable" in self.sources[id]) {
            self.sources[id].onEnable();
        }
    });

    $.subscribe('source-disabled', function (e, id) {
        console.log("Disabled", arguments);

        $('button.icon-' + id, self.buttons).remove();
        self.buttons.children(':not(:has("button.icon"))').fadeOut(200, function () {
            $(this).remove();
        });
        self.sources[id].iconCss.remove();

        delete self.sources[id];
    });

    self.renderPage = function () {
        $('<link rel="stylesheet" type="text/css">')
            .prependTo(document.head)
            .attr('href', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.5/css/bootstrap.min.css').load(function () {

                self.buttons
                    .on('click', '.icon', onSourceButtonClick)
                    .on('click', '> div > button:first-of-type', onCategoryButtonClick);

                resetContent();

                $.publish("layout-ready");

                $(document.body).empty().append(self.layout);

                $(function () {
                    var sticky = $('#sticky', self.layout);
                    if ($(window).height() > sticky.height()) {
                        sticky
                            .width(sticky.width())
                            .css("paddingBottom", "20px")
                            .sticky({topSpacing: 18});
                    }
                    self.input.select();
                });

                $(window).on('beforeunload', function () {
                    var data = getPersistentData();
                    $.publish("persistent-save", [data]);
                    GM_setValue(self.persistentDataId, data);
                });

                $.publish("page-rendered");
            });
    };

    var resetContent = function () {
        self.mainColumn.empty();
        self.header = self.h2.clone().hide().appendTo(self.mainColumn);
        self.content = self.div.clone().attr("id", "content").appendTo(self.mainColumn);
        $.publish("after-content-reset");
    };

    var getEnabledSources = function () {
        return self.getPersistentValue("enabledSources", []);
    };

    var sourceIsEnabled = function(id){
        return getEnabledSources().indexOf(id) !== -1;
    };

    var getDisabledCategories = function(name){
        var disabledCategories = self.getPersistentValue("disabledCategories", {});
        return name ? (name in disabledCategories ? disabledCategories[name] : []) : disabledCategories;
    };

    var getCategoryGroup = function (name) {
        var group = self.buttons.children('#category-' + name);

        if (group.length > 0) {
            return group;
        } else {
            var catTitle = (name in self.categories) ? self.categories[name] : name;

            group = self.categoryBtn
                .clone()
                .data("category", name)
                .data("categoryTitle", catTitle)
                .attr("id", "category-" + name);

            group[0].firstChild.textContent = catTitle;

            if (name === self.favorites) {
                group.removeClass("btn-group");
                $(group[0].lastChild).removeClass("dropdown-menu").prependTo(group);
                $(group[0].lastChild).remove();
                group.prependTo(self.buttons);
            } else {
                group.appendTo(self.buttons);
            }

            return group;
        }
    };

    self.addSource = function (id, callback) {
        if (id in self.sourceCallbacks) {
            console.warn(id + ' source is already registered, skipping to avoid overwriting.');
            return;
        }

        self.sourceCallbacks[id] = callback;

        $.publish('source-added', [id, callback]);
    };

    self.enableSource = function (id) {

        console.log("Enabling source " + id);

        var data = self.sourceCallbacks[id]();

        if (!('url' in data) || typeof data.url !== 'object') {
            console.warn('URL definition for ' + id + ' is missing or incorrect, skipping.');
            return;
        }

        var enabledSources = getEnabledSources();

        if (enabledSources.indexOf(id) === -1) {
            enabledSources.push(id);
        }

        $.publish('source-enabled', [id, data]);
    };

    self.disableSource = function (id) {
        console.log("Disabling source " + id);

        var enabledSources = getEnabledSources();
        enabledSources.splice(enabledSources.indexOf(id), 1);

        $.publish('source-disabled', [id]);
    };

    var onCategoryButtonClick = function () {
        var btn = $(this);
        window.scrollTo(0, 0);
        resetContent();

        self.pageId = Date.now();

        self.header
            .html(btn.text() + ' / <i>' + self.input.val() + '</i>')
            .show();

        var buttons = $(".icon", btn.parent());
        var category = btn.parent().data("category");

        $.publish("batch-request", [category, buttons]);

        buttons.each(function () {
            self.sendRequest($(this).data("src"), category, self.input.val());
        });
    };

    var onSourceButtonClick = function (e) {
        e.stopPropagation();

        window.scrollTo(0, 0);

        if (self.pageId) {
            resetContent();
            self.pageId = false;
        }

        var btn = $(this);
        var category = btn.parent().parent().data("category");

        $.publish("single-request", [btn, category]);

        self.sendRequest(btn.data("src"), category, self.input.val());
    };

    self.sendRequest = function (src, category, query, retry) {
        if (typeof src === "string") {
            if (src in self.sources) {
                src = self.sources[src];
            } else {
                console.warn("Unrecognized source", src);
                return false;
            }
        }

        if (!(category in src.url)) {
            console.warn("No " + category + " category found:", src.url);
            return;
        }

		query = query.trim();

        var i = 0, len = 0,
            method = ("method" in src) ? src.method : "GET",
            url = typeof src.url[category] === "string" ? [src.url[category]] : src.url[category].slice(),
            context = {
                valid: true,
                src: src,
                url: url,
                retry: !!retry,
                pageId: self.pageId,
                category: category,
                categoryTitle: (category in self.categories) ? self.categories[category] : category,
                originalQuery: query,
                query: query.replace(self.matchNonAlphaNumericRegex, ' ').replace(self.spacesRegex, ' ').trim()
            };

        if ("onPrepareQuery" in src) {
            if (Array.isArray(src.onPrepareQuery)) {
                for (i = 0, len = src.onPrepareQuery.length; i < len; i++) {
                    src.onPrepareQuery[i](context);
                }
            } else {
                src.onPrepareQuery(context);
            }
        }

		var urlen = context.url.length;

        for (i = 0; i < urlen; i++) {
            if (context.url[i].indexOf("{query}") > -1) {
                context.url[i] = context.url[i].replace(self.queryRegex, context.query);
            } else {
                context.url[i] += context.query;
            }
            context.url[i] = context.url[i].replace(self.spacesRegex, '%20');
        }

        for (i = 0; i < urlen; i++) {
            var requestData = {
                method: method,
                url: context.url[i],
                context: context,
                timeout: self.timeout,
                onload: onRequestSuccess,
                onerror: onRequestFail,
                ontimeout: onRequestTimeout
            };

            if ("onHttpRequest" in src) {
                if (src.onHttpRequest(requestData) === false) {
                    continue;
                }
            }

            console.log(requestData.method, requestData.url);

            GM_xmlhttpRequest(requestData);
        }
    };

    var onRequestSuccess = function (response) {
        if (typeof response !== "object" || !("context" in response)) {
            self.showFailAlert({});
            return;
        }

        if (isOutOfDate(response)) return;

        var i, data, html,
            src = response.context.src,
            originalQuery = response.context.originalQuery,
            pageId = response.context.pageId;

        $.publish('request-finish', [response]);

        if ("onValidate" in src) {
            response.context.valid = src.onValidate(response);
        }

        if (response.finalUrl !== null && response.finalUrl.indexOf("/login") !== -1) {
            response.context.valid = "login needed";
        }

        if (response.context.valid === false || typeof response.context.valid === "string" || !("finalUrl" in response) || typeof response.finalUrl !== "string") {
            self.showFailAlert(response, response.context.valid);
            return;
        }

        if (typeof src.onParse === "function") {
            data = src.onParse(response);
            if (data === null) return;
        } else if (typeof src.onParse === "object") {
            if ("prepare" in src.onParse) {
                html = src.onParse.prepare(response);
            } else {
                html = response.responseText;
            }

            html = self.replaceImages(html);

            try {
                html = $(html);
            } catch (e) {
                console.error("Parsing failed", response.responseText);
                self.showFailAlert(response, "unexpected content");
                return;
            }

            if ('cleanup' in src.onParse) {
                for (i = 0; i < src.onParse.cleanup.length; i++) {
                    $(src.onParse.cleanup[i], html).remove();
                }
            }

            data = $(src.onParse.row, html);
        } else {
            console.error("No parse configuration found for " + src.name, response);
            return;
        }

        if ('onFilter' in src) {
            var filters = Array.isArray(src.onFilter) ? src.onFilter : [src.onFilter];
            for (i = 0; i < filters.length; i++) {
                data = filters[i](data, response);
            }
        }

        var table = self.tableStriped.clone();

        var renderFunction = 'onRender' in src ? src.onRender : renderResults;
        renderFunction(data, table, response);

        var categoryTitle = response.context.categoryTitle;
        var searchUrl = ("searchUrl" in response.context) ? response.context.searchUrl : response.finalUrl;
        var resultLink = self.iconLink.clone()
            .attr("href", searchUrl)
            .addClass('icon-' + src.name);

        if (table[0].childElementCount > 0) {
            var panel = self.resultPanel.clone()
                .addClass('panel-src-' + src.name);

            resultLink.html(src.name + (pageId ? '' : ' / ' + categoryTitle + ' / <i>' + originalQuery + '</i>'));

            if ("length" in data) {
                resultLink.append(' (' + data.length + ')');
            }

            panel[0].firstChild.firstChild.appendChild(resultLink[0]);
            panel.prepend(self.closeBtn.clone());
            panel[0].lastChild.appendChild(table[0]);

            (!response.context.pageId || response.context.retry)
                ? panel.prependTo(self.content)
                : panel.appendTo(self.content);
        } else {
            var noResults = $('#no-results');
            var alert = noResults.length === 0
                ? self.warningAlert.clone().insertBefore(self.content)
                : noResults.first();

            resultLink
                .addClass("link-icon")
                .attr("title", src.name)
                .appendTo(alert);
        }
    };

    var renderResults = function (data, table, response) {
        var src = response.context.src;
		var i = 0, len = 0;

        data.each(function () {
            var n, nlen, context, that = $(this);
            var tr = self.tr.clone();
            var text = "", td, el, elen;
            var texts = [], link = "", linkTest = "", link_prepend = "";
            var freeleech = false, vod = false;

            for (i = 0, len = src.onParse.sel.length; i < len; i++) {
                context = that;
                text = link = link_prepend = "";
                freeleech = vod = false;
                td = self.td.clone();

                if ("class" in src.onParse.sel[i]) {
                    td.addClass(src.onParse.sel[i].class);
                }

                if ("width" in src.onParse.sel[i]) {
                    td.width(src.onParse.sel[i].width);
                }

                if ("align" in src.onParse.sel[i]) {
                    td.css("textAlign", src.onParse.sel[i].align);
                }

                if ("cleanup" in src.onParse.sel[i]) {
                    context = context.clone();
                    for (n = 0, nlen = src.onParse.sel[i].cleanup.length; n < nlen; n++) {
                        $(src.onParse.sel[i].cleanup[n], context).remove();
                    }
                }

                if (typeof src.onParse.sel[i].text === "function") {
                    el = src.onParse.sel[i].text(context);
                } else {
                    el = $(src.onParse.sel[i].text, context);
                }

                if (typeof el === "string") {
                    text = el;
                } else if (el instanceof jQuery) {
					elen = el.length;
                    if (elen === 0) {
                        td.appendTo(tr);
                        continue;
                    } else if (elen === 1) {
                        text = el.text();
                        if (link === "" && el.prop("tagName") === "A") {
                            link = el.attr("href");
                        }
                    } else {
                        texts = [];
                        for (n = 0; n < elen; n++) {
                            texts.push(el.eq(n).text());
                        }
                        text = texts.join(" - ");
                    }
                }

                text = text.trim();

                if (text === "") {
                    td.appendTo(tr);
                    continue;
                }

                if ("freeleech" in src.onParse.sel[i]) {
                    if (typeof src.onParse.sel[i].freeleech === "function") {
                        freeleech = src.onParse.sel[i].freeleech(context);
                    } else {
                        freeleech = $(src.onParse.sel[i].freeleech, context).length > 0;
                    }
                }

                if ("vod" in src.onParse.sel[i]) {
                    if (typeof src.onParse.sel[i].vod === "function") {
                        vod = src.onParse.sel[i].vod(context);
                    } else {
                        vod = $(src.onParse.sel[i].vod, context).length > 0;
                    }
                }

                if ("link" in src.onParse.sel[i]) {
                    if (typeof src.onParse.sel[i].link === "function") {
                        link = src.onParse.sel[i].link(context);
                    } else {
                        link = $(src.onParse.sel[i].link, context);
                    }
                }

                if (link instanceof jQuery) {
                    linkTest = link.attr("href");
                    if (typeof linkTest === "string") {
                        link = linkTest;
                    } else if (link[0] && (link[0].textContent.indexOf("http") === 0)) {
                        link = link[0].textContent;
                    }
                }

                if (typeof link === "string" && link !== "") {
                    if (self.protocols.indexOf(link.split(":")[0]) === -1) {
                        if ("link_prepend" in src.onParse.sel[i]) {
                            link_prepend = src.onParse.sel[i].link_prepend;
                        } else if ("link_prepend" in src.onParse) {
                            link_prepend = src.onParse.link_prepend;
                        }
                    }
                    if (link_prepend !== "") {
                        link = link_prepend + link;
                    }
                    td.html('<a href="' + link + '"' + (("noblank" in src.onParse.sel[i] && src.onParse.sel[i].noblank) ? '' : ' target="_blank"') + '>' + text + '</a>');
                } else {
                    td.html(text);
                }

                if (freeleech) {
                    td.append(' <span class="label label-success">Freeleech</span>');
                } else if (vod) {
                    td.append(' <span class="label label-warning">VOD</span>');
                }

                td.appendTo(tr);
            }

            tr.appendTo(table);
        });
    };

    var isOutOfDate = function (response) {
        return (typeof response !== "object" || !("context" in response) || !("pageId" in response.context) || self.pageId !== response.context.pageId);
    };

    self.showFailAlert = function (response, msg) {
        if (isOutOfDate(response)) return;

        var errors = $('.errors', self.layout);
        var alert = errors.length === 0
            ? self.failAlert.clone().insertBefore(self.content)
            : errors.first();

        if (!("context" in response)) {
            if (!msg) msg = "(error)";
            return alert.append(msg + '&nbsp;&nbsp; ');
        }

        var url = "finalUrl" in response ? response.finalUrl : null;
        var srcName = response.context.src.name;
        var categoryTitle = response.context.pageId ? null : response.context.categoryTitle;

        var target = 'target="_blank"';

        if (url === null) {
            if ("url" in response.context && response.context.url.length > 0) {
                url = response.context.url[0];
            } else {
                url = "javascript:alert('Domain not resolved.');";
                target = '';
            }
            msg = 'domain error';
        }

        if (!msg) msg = "error";

        return alert.append('<a href="' + url + '" ' + target + ' class="icon icon-' + srcName + '">' + srcName + (categoryTitle ? ' / ' + categoryTitle + ' / <i>' + self.input.val() + '</i>' : '') + '</a>&nbsp;(', msg, ')&nbsp;&nbsp; ');
    };

    var onRequestFail = function (response) {
        console.log(response);
        $.publish('request-finish', [response]);
        self.showFailAlert(response, "http request failed");
    };

    var retryTimedOutRequest = function () {
        var context = $(this).data("context");
        self.sendRequest(context.src, context.category, context.query, true);
        $(this).replaceWith('retried');
    };

    var onRequestTimeout = function (response) {
        console.log(response);
        $.publish('request-finish', [response]);
        var retry;
        if ("context" in response) {
            retry = $('<a href="javascript:void(0)" title="click to retry" class="timeout-link">timeout</a>')
                .data("context", response.context)
                .on("click", retryTimedOutRequest);
        } else {
            retry = "timeout";
        }

        self.showFailAlert(response, retry);
    };

    var getPersistentData = function () {
        if (!self.persistentData || typeof self.persistentData !== "object") {
            self.persistentData = GM_getValue(self.persistentDataId, {});
            if (!self.persistentData || typeof self.persistentData !== "object") {
                console.log("Invalid persistent data, resetting.");
                self.persistentData = {};
            }
        }

        return self.persistentData;
    };

    self.getPersistentValue = function (key, def) {
        if (typeof key === "string") {
            var persistentData = getPersistentData();

            if (!(key in persistentData)) {
                persistentData[key] = def;
            }

            return persistentData[key];
        }
    };

    self.setPersistentValue = function (key, value) {
        if (typeof key === "string") {
            var persistentData = getPersistentData();

            persistentData[key] = value;

            return value;
        }
    };

    self.humanizeSize = function (size) {
        size = parseInt(size);
        var i = Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    };

    self.requireAllWords = function (data, response) {
        if (typeof response.context.src.onParse !== "object") {
            return data;
        }

        var words = response.context.query.toLowerCase().split(' ');
        var wordsLen = words.length;
        var sel = response.context.src.onParse.sel[0].text;
        var isFunction = typeof sel === "function";

        return data.filter(function () {
            var text;
            if (isFunction) {
                text = sel($(this));
                if (text instanceof jQuery) {
                    text = text.text();
                } else if (text instanceof HTMLElement) {
                    text = text.textContent;
                } else if (typeof text !== "string") {
                    return true;
                }
                text = text.toLowerCase();
            } else {
                text = $(sel, this)[0].textContent.toLowerCase();
            }

            for (var i = 0; i < wordsLen; i++) {
                if (text.indexOf(words[i]) === -1) {
                    return false;
                }
            }

            return true;
        });
    };

	self.filter3dMovies = function (data, response) {
		if (response.context.category.indexOf("movies") === 0 && response.context.category !== "movies_dvd" && response.context.category !== "movies_3d") {
			return data.filter(function(){
				return this.textContent.indexOf('3D') === -1;
			});
		} else {
			return data;
		}
	};

    self.extractResolution = function (context) {
        for (var i = 0; i < self.resolutions.length; i++) {
            if (context.query.indexOf(self.resolutions[i]) !== -1) {
                context.query = context.query.replace(self.resolutions[i], "").replace(self.spacesRegex, ' ').trim();
                return self.resolutions[i];
            }
        }

        return null;
    };

    self.extractGazelleResolution = function (context) {
        var res = self.extractResolution(context);

        if (res) {
            for (var i = 0; i < context.url.length; i++) {
                context.url[i] += "&resolution=" + res;
            }
        }
    };

    self.extractYear = function (context, simple) {
        var re = simple ? self.yearRegexSimple : self.yearRegexAdvanced;
        var year = context.query.match(re);

        if (year && year.length > 0) {
            year = year[year.length - 1].trim();
            context.query = context.query.replace(new RegExp(year.replace(self.dashRegex, '\\\-'), "g"), '').replace(self.spacesRegex, ' ').trim();
        } else {
            year = null;
        }

        return year;
    };

    self.replaceImages = function (text) {
        return text.replace(self.imgTagRegex, '<meta ');
    };

    self.extractGazelleYear = function (context) {
        var year = self.extractYear(context);

        if (year) {
            for (var i = 0, len = context.url.length; i < len; i++) {
                context.url[i] += "&year=" + year;
            }
        }
    };




    ////// SETTINGS

    $.subscribe("layout-ready", function(){
		$("#app-buttons", self.layout)
			.append($('<button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-cog"></span></button>').on("click", renderConfigPage))
			.append('<a class="btn btn-default btn-xs" href="https://greasyfork.org/en/scripts/12013-conductorr" role="button" target="_blank"><span class="glyphicon glyphicon-globe"></span></a>');
    });

    var renderConfigPage = function () {
        resetContent();

		if (self.pageId === "Settings") {
			self.pageId = false;
			return;
		}

        self.pageId = "Settings";
        self.header.text(self.pageId).show();

        var sourceKeys = Object.keys(self.sourceCallbacks).sort(function (a, b) {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            }),
            srcButtons = self.div.clone().attr("id", "source-buttons").appendTo(self.content),
            btnStub = $('<div class="btn-group"><button type="button" class="btn btn-xs"></button><button type="button" class="btn btn-xs dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button><ul class="dropdown-menu"></ul></div>'),
            disabledCategories = getDisabledCategories(),
            btn, buttonClass,
            enabled = false,
            partially = false;

        for (var i = 0, len = sourceKeys.length; i < len; i++) {
            enabled = sourceIsEnabled(sourceKeys[i]);
            partially = (sourceKeys[i] in disabledCategories);

            btn = btnStub.clone();
            btn[0].firstChild.textContent = btn[0].dataset.src = sourceKeys[i];
            buttonClass = enabled ? (partially ? "btn-warning" : "btn-success") : "btn-danger";
            btn.children('button').addClass(buttonClass);

            srcButtons.append(btn);

            if (enabled) {
                showSourceConfigBox(sourceKeys[i]);
            }
        }

        $(".btn-group > button:first-child", srcButtons).on("click", function () {
            var name = this.parentNode.dataset.src;
            sourceIsEnabled(name) ? self.disableSource(name) : self.enableSource(name);
        });

        srcButtons.on("change", "input", function () {
            var group = $(this).closest(".btn-group");
            var srcName = group[0].dataset.src;
            var checkboxes = $('input[type="checkbox"]', group);
            var total = checkboxes.length;
            var unchecked = checkboxes.filter(":not(:checked)").length;
            var disabled = getDisabledCategories(srcName);

            if (this.checked) {
                if (disabled.indexOf(this.name) !== -1) {
                    disabledCategories[srcName].splice(disabledCategories[srcName].indexOf(this.name), 1);
                    if (disabledCategories[srcName].length === 0) {
                        delete disabledCategories[srcName];
                    }
                }
                self.enableSource(srcName);
            } else {
                if (disabled.indexOf(this.name) === -1) {
                    if (!(srcName in disabledCategories)) {
                        disabledCategories[srcName] = [];
                    }
                    disabledCategories[srcName].push(this.name);
                }
                total === unchecked
                    ? self.disableSource(srcName)
                    : self.enableSource(srcName);
            }
        });

        $(".btn-group", srcButtons).on("show.bs.dropdown", function () {
            if (this.lastChild.textContent === "") {
                var data = self.sourceCallbacks[this.textContent]();
                var cats = Object.keys(data.url);
                cats.unshift(self.favorites);

                var disabled = this.textContent in disabledCategories ? disabledCategories[this.textContent] : [];
                var catsHTML = '';
                for (var i = 0, len = cats.length; i < len; i++) {
                    catsHTML += '<label class="checkbox-inline"><input type="checkbox" name="' + cats[i] + '"' + (disabled.indexOf(cats[i]) === -1 ? ' checked="checked"' : '') + '> ' + (cats[i] in self.categories ? self.categories[cats[i]] : cats[i]) + '</label><br>';
                }
                //if ("website" in data && data.website) {
                //    catsHTML += '<a href="' + data.website + '" target="_blank">Visit website</a>';
                //}
                this.lastChild.innerHTML = catsHTML;
            }
        });

        $(".dropdown-menu", srcButtons).on("click", function (e) {
            e.stopPropagation();
        });
    };

    var showSourceConfigBox = function (name, buttons) {
        if (!("config" in self.sources[name])) return;

        var box = $("#config-" + name);

        if (box.length === 0) {
            box = $('<div id="config-' + name + '" class="panel panel-default"><div class="panel-heading">' + name + '</div><div class="panel-body"></div></div>')
                .insertAfter($("#source-buttons", self.content));

            $(box[0].lastChild)
                .empty()
                .append(self.sources[name].config());
        }
    };

    $.subscribe("source-disabled", function (e, id) {
        if (self.pageId === "Settings") {
            $('#source-buttons', self.content).children('[data-src="' + id + '"]').children("button").addClass("btn-danger").removeClass("btn-success btn-warning");
            $("#config-" + id, self.content).remove();
        }
    });

    $.subscribe("source-enabled", function (e, id, data) {
        if (self.pageId === "Settings") {
            var className = getDisabledCategories(id).length > 0 ? "btn-warning" : "btn-success";
            $('#source-buttons', self.content).children('[data-src="' + id + '"]').children("button").removeClass("btn-danger btn-warning btn-success").addClass(className);
            showSourceConfigBox(id);
        }
    });

    /////// PERSISTENT CONTENT

    var loadPersistentContent = function () {
        if (self.getPersistentValue("content", "")) {

            self.mainColumn.html(self.getPersistentValue("content", ""));

            $(".timeout-link", self.mainColumn).replaceWith("timeout");

            self.header = $('h2', self.mainColumn);
            if (self.header.length === 0) {
                self.header = self.h2.clone().hide().appendTo(self.mainColumn)
            } else {
                self.header = self.header.first();
            }

            self.content = $('#content', self.mainColumn);
            if (self.content.length === 0) {
                self.content = self.div.clone().attr("id", "content").appendTo(self.mainColumn);
            } else {
                self.content = self.content.first();
            }

            if (self.header.css("display") !== "none") {
                self.pageId = true;
            }
            if (self.header.text() === "Settings") {
                renderConfigPage();
            }
        }
    };

    $.subscribe('layout-ready', loadPersistentContent);

    $.subscribe('persistent-save', function (e, data) {
        data.content = self.mainColumn.html();
    });


    //////// PROGRESS BAR

    var progressBar = null;
    var progressFiller = null;
    var progressSteps = 0;
    var progressStyleSuccess = "progress-bar-success";
    var progressStyleInProcess = "progress-bar-warning";

    var initProgressBar = function () {
        progressBar = $(".progress", self.mainColumn);
        if (progressBar.length === 0) {
            progressBar = $('<div class="progress pull-right"><div class="progress-bar"></div></div>').prependTo(self.mainColumn);
        } else {
            progressBar = progressBar.first();
        }
        progressFiller = $(progressBar[0].firstChild);
        resetProgressBar(true);
    };

    var resetProgressBar = function (hide) {
        if (hide) {
            progressBar.hide();
        }

        progressFiller
            .width(0)
            .data("step", 0)
            .removeClass(progressStyleSuccess)
            .addClass(progressStyleInProcess)
            .text("0%");
        progressSteps = 0;
    };

    var startProgressCount = function (event, category, buttons) {
        resetProgressBar();

        progressSteps = 0;
        buttons.each(function () {
            var src = $(this).data('src');
            if (category in src.url) {
                progressSteps += typeof src.url[category] === "string" ? 1 : src.url[category].length;
            }
        });

        progressBar.show();
    };

    var incrementProgressBar = function (event, response) {
        if ("context" in response && isOutOfDate(response)) return;

        var step = progressFiller.data("step");
        step++;

        if (step === progressSteps) {
            progressFiller
                .width('100%')
                .removeClass(progressStyleInProcess)
                .addClass(progressStyleSuccess)
                .text(step + '/' + step);
//				setTimeout(resetProgressBar, 3000);
        } else {
            var width = (100 / progressSteps * step).toFixed(2);
            if (width > 100) width = 100;
            progressFiller
                .text(step + '/' + progressSteps)
                .width(width + '%')
                .data("step", step);
        }
    };


    self.customCSS.append("\
        .progress { width:120px; margin-top: 7px; margin-bottom:0; }\
        .progress-bar { width:0px; transition: none; }\
    ");

    $.subscribe('layout-ready after-content-reset', initProgressBar);
    $.subscribe('batch-request', startProgressCount);
    $.subscribe('request-finish', incrementProgressBar);


    ///////// HASH NAVIGATION

    var parseQueryString = function (queryString) {
        var params = {}, queries, temp, i, l;

        // Split into key/value pairs
        queries = queryString.split("&");

        // Convert the array of strings into an object
        for (i = 0, l = queries.length; i < l; i++) {
            temp = queries[i].split('=');
            params[temp[0]] = temp[1];
        }

        return params;
    };

    $.subscribe("layout-ready", function(){
        if (document.location.hash.trim().length > 1 && document.location.hash !== self.getPersistentValue("hash", "#")) {
            resetContent();
        }
    });

    $.subscribe("page-rendered", function(){
        var paramsStr = null;

        if (document.location.hash.trim().length > 1 && document.location.hash !== self.getPersistentValue("hash", "#")) {
            paramsStr = document.location.hash.slice(1);
        } else if (document.location.href.indexOf('?') > -1) {
            paramsStr = document.location.href.split('?', 2)[1];
        }

        if (!paramsStr) return;

        var params = parseQueryString(paramsStr);

        if ("q" in params && params.q.trim() !== "") {
            params.q = decodeURIComponent(params.q).replace(/\+/g, ' ');

            self.input.val(params.q);

            if ("cat" in params) {
                if ("src" in params) {
                    $("#" + params.src + "__" + params.cat).click();
                } else {
                    $("#category-" + params.cat).children('button').first().click();
                }
            } else if ("src" in params) {
                $("#" + params.src + "__" + self.all).click();
            }
        }

        self.setPersistentValue("hash", '#' + paramsStr);
    });

    $.subscribe("batch-request", function (e, category) {
        document.location.hash = "#cat=" + (category === self.favorites ? self.all : category) + "&q=" + self.input.val();
        self.setPersistentValue("hash", document.location.hash);
    });

    $.subscribe("single-request", function(e, btn, category){
        document.location.hash = "#cat=" + (category === self.favorites ? self.all : category) + "&src=" + btn.data("src").name + "&q=" + self.input.val();
        self.setPersistentValue("hash", document.location.hash);
    });
};

var bt = new SearchEngine();

/*
 onHttpRequest(requestData): {}.abort()
 onValidate(response): bool|string
 onParse(response)|object: collection|array
 onFilter(data, response): collection|array
 onRender(data, table): void
 */

bt.categories = {
    all: "Everywhere",
    favorites: "Favorites",
    music: "Music",
    music_flac: "Music / FLAC",
    movies: "Movies",
//		movies_hd: "Movies: HD",
    movies_1080: "Movies / 1080p",
    movies_720: "Movies / 720p",
    movies_remux: "Movies / Remuxes",
    movies_bluray: "Movies / Blu-rays",
    movies_dvd: "Movies / DVD",
    mvids: "Music Videos",
    docs: "Documentaries",
    tv: "TV Shows",
    elearning: "E-Learning",
    ebooks: "E-Books",
    games_pc: "Games / PC",
    mags: "Magazines",
    abooks: "Audiobooks",
    fiction: "Fiction",
    comics: "Comics",
    apps_win: "Apps / Win",
    xxx: "XXX"
};
