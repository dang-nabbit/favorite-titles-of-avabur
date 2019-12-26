# Favorite Titles of Avabur
Easily switch between your favorite titles!

Made by @dang, donations are accepted. :)

## Installation
1. Install a userscript browser addon like Greasemonkey or Violentmonkey
1. [Click here](https://github.com/dang-nabbit/favorite-titles-of-avabur/raw/master/favorite-titles-of-avabur.user.js) to install the script and confirm installation on the tab that opens. (Or click the (favorite-titles-of-avabur.user.js)[https://github.com/dang-nabbit/favorite-titles-of-avabur/blob/master/favorite-titles-of-avabur.user.js] file in the list above, then click the **Raw** button on the top right of the code.)

## Usage
In the titles panel, there's a **Favorites** button to the left of the title type buttons. Clicking this button will show the titles you marked as favorite, allowing you to use them or edit their color.

To the left of each title in the regular title lists, there's a star icon. Clicking a "blank" star (✩) will add that title to the favorites list. Clicking a "filled" star (★) will remove that title from the favorites list.

Unmarking a title as favorite directly from the favorite titles list won't remove the title from the list right away, only when you switch to a regular title list. This is in case you did it by mistake and want to mark it as favorite again.

## Possible future feature(s)
- Reordering favorite titles

## Known issues
- The title you currently have in use doesn't have a star next to it. To mark the current title as favorite, switch to any other title to make the star appear, then you can switch back to it.
(_Long explanation: the script copies the whole title row to the **Favorites** panel, including the **Use** and **Edit** links. This was easier than recreating these links myself. Because of this, adding current title to favorites would make it appear with the **In use** text instead of the **Use** link, making it pretty much useless. Plus, it would be impossible to obtain the ID of titles other than **Nobility** and **Custom** titles, since the ID is only contained in the **Use** and **Edit** links, and such titles don't have **Edit** links._)
- Editing a title after it's added to the favorites list doesn't update the text in the favorites panel (same reason as above). If you want to update the title in favorites panel, unmark it as mark it as favorite again. Just make sure you mark it as favorite from the main title panel, not the favorites panel. In a similar fashion, **Pride Month** titles don't switch colors at random in the favorites panel (this means you can keep trying to reload the **Event Titles** panel until you get a rainbow proc or whatever color you prefer and then mark it as favorite to keep that color in the favorites panel).
- Your current title doesn't show the **In use** text in the favorites panel, for the same reason as the first issue.
- When clicking the **Use** link for a title in the favorites panel, the original title type panel is selected automatically. This is just how the **Use** link works, blame @Vysn.
- When you unmark a title as favorite and mark it as favorite again, it will be added to the end of the favorites list. I might fix this is it bothers people too much.
- I can't make the favorites panel show as default when you refresh the page, because the game automatically selects **Nobility Titles** as default. Again, blame @Vysn.

## Special thanks
- @Lotusenta, who gave me the idea. Without her, this wouldn't exist.
- @WinterPhoenix, since I used his [Notifications of Avabur](https://github.com/davidmcclelland/notifications-of-avabur) script as a basis for the code.
- @Vysn, for helping out with some finer technical understandings of the titles panels (and making/maintaining the game of course lol)
