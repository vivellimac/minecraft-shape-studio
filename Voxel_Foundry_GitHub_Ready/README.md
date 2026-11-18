# Voxel Foundry

A browser-based Minecraft shape generator and layer-by-layer building reference.

## Publish with GitHub Pages (no terminal needed)

1. Unzip this download.
2. On GitHub, create a repository named `voxel-foundry`. Choose **Public** for the straightforward free GitHub Pages setup, and initialize it with a README so the upload menu is available.
3. In the repository, choose **Add file → Upload files**.
4. Open the extracted folder and drag its **contents** into GitHub. Upload the files, not the ZIP or the enclosing folder. `index.html` must sit at the repository root, alongside `app.js`, `worker.js`, `layers.js`, `guides.js`, and `style.css`. Include the `tests` folder for regression checks. Replace GitHub's starter README with this one.
5. Click **Commit changes** to save the upload to `main`.
6. Go to **Settings → Pages**. Under **Build and deployment**, select **Deploy from a branch**.
7. Select **main** and **/ (root)**, then click **Save**.
8. Wait for deployment to finish. GitHub shows the site link on that page, normally `https://YOUR-USERNAME.github.io/voxel-foundry/`.

The included `.nojekyll` disables Jekyll processing. Dotfiles may be hidden in Finder; press **Command + Shift + .** to show them when uploading. Alternatively, use **Add file → Create new file** on GitHub to create `.nojekyll` with a blank line. This plain HTML app also works with GitHub Pages' default processing.

Documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

The published website is public and does not require ChatGPT sign-in. The app needs no API keys, accounts, dependencies, backend, or build step.

## Features

- Spheres, ellipsoids, half-shapes, toruses, circles, ellipses, and cylinders.
- Diameter/radius input; up to 256 blocks per full parent dimension.
- Hollow shells, adjustable thickness, solid fill, and half-shape caps.
- 3D orbit/pan/zoom, 90° rotations, and flips.
- Single-layer, cumulative, and range views across three slice orientations.
- 2D onion skins, block coordinates, and run-length brackets.
- Optional 90° center-axis and 45° diagonal highlights.
- Total, visible, per-layer, and stack counts.
- Charcoal/slate palette, blue accents, and stone-gray default blocks.

## Using the tool

Half-shape dimensions describe the **full parent shape before cutting**. The object bounds display the actual resulting size. Layer Explorer uses the occupied bounding span, including after flips and rotations.

Drag to orbit in 3D. Shift-drag or right-drag to pan. In 2D, drag to pan. Scroll or use +/− to zoom. Arrow keys step layers when a form field is not focused. The in-app Guide explains the other controls.

Settings are saved locally in each browser. They do not synchronize across devices or between this site and the original hosted version.

## Preview locally

Because the app uses JavaScript modules and a worker, serve the folder over HTTP instead of double-clicking `index.html`.

If Python 3 is installed, open a terminal in this folder and run:

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000. Stop the server with Control+C.

## Regression checks (optional)

With Node.js installed, run from this folder:

```sh
node tests/geometry.cjs
node tests/guides.cjs
node tests/layers.cjs
```

No dependency installation is needed. Checks cover geometry, counts, guide alignment, half-shape layer indexing, flips, rotations, and caps.

## Updating the site

Upload replacement files to this repository and commit to `main`. GitHub Pages redeploys automatically. Later changes to the original ChatGPT-hosted site do not automatically update this separate GitHub copy.

## Export details

Exported from the charcoal-and-blue version, source revision `620a0533c3bc355d1f4c58679970014ac9336b7d`.

Only the application, regression checks, and setup guide are included. Hosting-specific metadata and Git credentials are excluded. No open-source license has been selected; add one if you want to grant explicit reuse permissions.
