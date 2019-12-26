// ==UserScript==
// @name           Favorite Titles of Avabur
// @namespace      https://github.com/dang-nabbit/
// @author         dang
// @homepage       https://github.com/dang-nabbit/favorite-titles-of-avabur
// @supportURL     https://github.com/dang-nabbit/favorite-titles-of-avabur/issues
// @downloadURL    https://github.com/dang-nabbit/favorite-titles-of-avabur/raw/master/favorite-titles-of-avabur.user.js
// @description    Easily switch between your favorite titles!
// @match          *avabur.com/game*
// @include        *avabur.com/game*
// @version        1.0
// @icon           https://www.google.com/s2/favicons?domain=https://avabur.com
// @run-at         document-end
// @license        LGPL-2.1
// @noframes
// ==/UserScript==

//Check if the browser can support adding favorite links (✩★) to titles
if (typeof (MutationObserver) === "undefined") {
    console.log("Cannot support mutation observer!");
} else {
    'use strict';

    /** VSCode settings */
    // @ts-check
    `import 'jquery'`;
    /** VSCode settings */

    const DEFAULT_USER_SETTINGS = {
        titles: []
    };

    const SETTINGS_KEY = 'FToASettings';

    const favoritesButton = $('<input id="titleFavoritesButton" value="Favorites" type="button" style="padding: 6.5px;">');
    const favoriteTitlesDiv = $('<div id="titleFavoritesList" class="col-xs-12 col-md-12 col-centered" style="vertical-align:top;">');
    const titleListDiv = $('#accountTitleList');

    let userSettings = null;

    /** Misc function container */
    const fn = {
        log: msg => console.log('[Favorite Titles of Avabur] ' + msg),
        saveUserSettings: () => localStorage.setItem(SETTINGS_KEY, JSON.stringify(userSettings)),
        loadUserSettings: () => {
            fn.log('Loading user settings');

            const loadedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
            userSettings = loadedSettings || DEFAULT_USER_SETTINGS;

            fn.saveUserSettings(userSettings);
        },
        getTitleId: $row => $row.find('.setTitleButton').attr('data-id'),
        getTitleFavoriteIndex: titleId => userSettings.titles.findIndex(titleData => titleData.titleId === titleId),
        getFavoriteIcon: isFavorite => (!isFavorite) ? '✩' : '★',
        getFavoriteLink: titleId => {
            let favoriteLink = $('<a class="titleFavorite" style="text-decoration: none; padding-right: 5px;">');
            favoriteLink.attr('data-id', titleId);
            favoriteLink.text(fn.getFavoriteIcon(fn.getTitleFavoriteIndex(titleId) > -1));

            return favoriteLink;
        },
        toggleFavorite: function() {
            const favoriteLink = $(this);
            const row = favoriteLink.closest('.row');
            const titleId = fn.getTitleId(row);
            const index = fn.getTitleFavoriteIndex(titleId);
            const isFavorite = (index > -1);

            favoriteLink.text(fn.getFavoriteIcon(!isFavorite));

            if (isFavorite) {
                userSettings.titles.splice(index, 1);
            } else {
                userSettings.titles.push({
                    titleId: titleId,
                    type: $('.titleButton.active').attr('data-type'),
                    rowHTML: row[0].outerHTML
                });
            }

            fn.saveUserSettings();
        },
        addFavoriteLink: function() {
            const row = $(this);
            row.children('div:first-child').prepend(fn.getFavoriteLink(fn.getTitleId(row)));
        },
        addFavoriteRows: () => {
            titleListDiv.append(favoriteTitlesDiv);
            userSettings.titles.forEach(titleData => favoriteTitlesDiv.append(titleData.rowHTML));
        },
        showFavoriteTitles: e => {
            e.preventDefault();

            $('.titleButton').removeClass('active');
            favoritesButton.addClass('active');
            favoritesButton.css('color', '#ff7')

            titleListDiv.empty();
            favoriteTitlesDiv.empty();
            fn.addFavoriteRows();
        },
        showSelectedTitleType: function(e) {
            e.preventDefault();
            const type = userSettings.titles[fn.getTitleFavoriteIndex($(this).attr('data-id'))].type;
            $('input.titleButton[data-type="' + type + '"]').click();
        }
    };

    function addObserversListeners() {
        fn.log('Adding observers and listeners.');

        $('#settingsAccountTitlesWrapper').on('click', '.titleButton', () => {
            favoritesButton.removeClass('active');
            favoritesButton.css('color', '');
        });
        $('#settingsAccountTitlesWrapper').on('click', '.titleFavorite', fn.toggleFavorite);
        $('#settingsAccountTitlesWrapper').on('click', '#titleFavoritesList .setTitleButton', fn.showSelectedTitleType);
        favoritesButton.on('click', fn.showFavoriteTitles);

        const observerTitleList = new MutationObserver(
            records => {
                if (!favoritesButton.hasClass('active')) {
                    records.forEach(record => {
                        record.addedNodes.forEach(node => {
                            $(node).find('.row:not(:has(h3)):has(a.setTitleButton)').each(fn.addFavoriteLink);
                        });
                    });
                }
            }
        );
        observerTitleList.observe(document.getElementById('accountTitleList'), { childList: true });
    }

    (function init(){
        fn.loadUserSettings();

        addObserversListeners();
        $('#settingsAccountTitlesWrapper .titleTypeHolder').prepend(favoritesButton);
    })();
}
