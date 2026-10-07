# Portable USB Blender — sales funnel

Static, dependency-free implementation of `project/Portable Blender Funnel.dc.html`.

```
site/
  index.html   page content (Arabic, RTL, SEO meta + Product JSON-LD)
  styles.css   design tokens and layout (mobile-first, no frameworks)
  app.js       wilaya selector, delivery/total calculation, validation,
               FormSubmit, WhatsApp, sticky CTA, lightbox
  images/      product photos
```

Deploy by uploading the `site/` folder to any static host (Netlify, Vercel, GitHub Pages, cPanel…).
Preview locally with `python3 -m http.server -d site 8000`.

## Before going live

- **Activate FormSubmit.** The first order sends an activation email to the inbox in `ENDPOINT`
  (`app.js`). Orders won't be delivered until you click it. FormSubmit then gives you a random
  alias; put it in `ENDPOINT` so the email address isn't visible in the page source.
- **Social preview image.** `og:image` is relative; change it to the absolute URL once the domain is known.
- **Check the dimensions** shown in the hero (7.8 cm diameter, 25.5 cm height) against the real product.

## Editing prices

Delivery prices live in the `RAW` table at the top of `app.js` (`[code, arabic, french, stopDeskPrice]`).
`null` means "price not confirmed": checkout is replaced by a WhatsApp order.
Home delivery is always Stop Desk + `HOME_EXTRA` (350 DA). Product price is `PRICE` (3000 DA).

Toggles in `app.js`: `STICKY_DESKTOP` (show the sticky CTA on desktop too) and
`SHOW_WA_SECONDARY` (extra WhatsApp link under the submit button).
