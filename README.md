# Creative Review Board

A single page that shows HTML5 and SVG creatives side by side, with a comment thread under each one for customer review. No build step, no server.

```
index.html          the app (configure it in the CONFIG block at the top)
assets/             your creatives: HTML5 banner folders and .svg files
assets/brand/       Superside logo files from the brand kit (don't edit)
apps-script/Code.gs optional: shares comments between reviewers via a Google Sheet
.nojekyll           tells GitHub Pages to serve files as they are
```

## Brand
The page follows the Superside web design system (Borealis):
- **Colors:** Cloud background with Pine text in light mode; Pine background with Cloud text in dark mode. The page follows each reviewer's system setting. Spark is used only for the open-comments count and the dark-mode primary button.
- **Type:** Inter Tight for headings and UI, Raleway for body copy (both load from Google Fonts).
- **Shape:** pill buttons and fields, 16px cards, 12px preview stage.
- **Logo:** the primary wordmark from the brand kit, inlined unmodified. It switches between Pine and Cloud with the theme.
- **Copy:** sentence case, plain verbs, same name for the same action everywhere ("Post comment", "Export comments").
- Creatives are shown square-cornered and unstyled on purpose, so reviewers see them exactly as built.

## Publish on GitHub Pages

### Option A: browser only
1. On github.com, click **New repository**. Name it (for example `creative-review`) and set it to **Public** (free Pages requires a public repo).
2. Click **uploading an existing file**, drag in the *contents* of this folder (including `.nojekyll` and the `assets` folder), and commit.
3. Go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After about a minute your board is live at `https://YOUR-USERNAME.github.io/creative-review/`.

### Option B: command line
```bash
cd review-board
git init -b main
git add .
git commit -m "Add creative review board"
git remote add origin https://github.com/YOUR-USERNAME/creative-review.git
git push -u origin main
```
Then enable Pages as in step 3 above.

To update later, edit `index.html` or add files to `assets/` and commit. The site refreshes in a minute or two.

## Add creatives

Put files in `assets/`, then add entries to `CONFIG.items` in `index.html`:

```js
{ id:"hero", title:"Homepage hero", type:"html", src:"assets/hero/index.html", width:1280, height:720 },
{ id:"icon", title:"App icon",      type:"svg",  src:"assets/icon.svg",       width:512,  height:512 }
```

- Keep each `id` unique and never change it once reviewers have commented.
- An HTML5 creative keeps its own folder (`assets/hero/index.html` plus its images, JS and CSS).
- Change `CONFIG.projectId` for each new review round so comments stay separate.
- Delete the two sample items when you add your own.

## Comments

**Default:** comments are saved in each reviewer's browser. Reviewers use **Export comments** (CSV) to send them back to you.

**Shared (optional):** all reviewers see each other's comments, stored in a Google Sheet.
1. Create a Google Sheet, then **Extensions > Apps Script**, and paste in `apps-script/Code.gs`.
2. **Deploy > New deployment > Web app**. Execute as: *Me*. Who has access: *Anyone*. Copy the `/exec` URL.
3. Paste the URL into `CONFIG.endpoint` in `index.html` and commit.

Comments then appear in the sheet and refresh for everyone every 30 seconds.

## Privacy notes
- A public repo means anyone who finds the URL can see the creatives. Use a non-obvious repo name for client work, or host on a private repo with a plan that supports private Pages.
- With shared comments on, anyone with the link can read and post comments, and the Apps Script URL is visible in the page source.
- Don't put confidential work behind this without checking with your client first.
