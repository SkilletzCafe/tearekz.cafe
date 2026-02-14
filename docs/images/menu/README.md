# Tea-Rek'z TV Menu Images

## How It Works

The website references these symlinks:

- `tearekz_menu_left.jpg` → points to the current left TV menu image
- `tearekz_menu_right.jpg` → points to the current right TV menu image

**⚠️ Do NOT edit `tearekz_menu_left.jpg` or `tearekz_menu_right.jpg` directly.**

These are symlinks. To update the menu:

1. Add the new image file with a `_YYYYMMDD` date suffix (e.g. `tearekz_menu_left_20260208.jpg`)
2. Delete the old dated file
3. Update the symlink to point to the new file
4. Commit and deploy

This approach means:

- No source code changes needed for menu updates
- Easy to see at a glance when each menu image was last updated
- Clean git history of menu changes
