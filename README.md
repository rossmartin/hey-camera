# Hey Camera — website

Marketing site, support page and privacy policy for the
[Hey Camera](https://apps.apple.com/us/app/hey-camera/id1271273970) iPhone app.

Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub
Pages by GitHub Actions on every push to `main`.

Live at <https://rossmartin.github.io/hey-camera/>

## Develop

```bash
npm install
npm run dev      # http://localhost:4321/hey-camera
npm run build    # output to dist/
npm run preview  # serve the built site
```

## Pages

| Path       | Purpose                                             |
| ---------- | --------------------------------------------------- |
| `/`        | Landing page                                        |
| `/support` | **App Store Connect support URL** — contact details |
| `/privacy` | **App Store Connect privacy policy URL**            |

## Moving to a custom domain

1. In `astro.config.mjs`, set `site` to the domain and `base` to `'/'`.
2. Add `public/CNAME` containing the bare domain, e.g. `heycamera.app`.
3. Point the domain's DNS at GitHub Pages, then set it in repo Settings → Pages.
4. Update the support and privacy URLs in App Store Connect.

Internal links go through `withBase()` in `src/lib/url.ts`, so they follow
whatever `base` is set to — no link edits needed.

## Screenshots

`src/assets/screenshots/` are the framed App Store screenshots, generated in the
app repo at `docs/ios-store-screenshots/`. Astro optimizes them at build time.
