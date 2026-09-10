# Instagram feed on the site

The "Follow us" section shows the six most recent posts from @whimsy_flower, each linking to the post on Instagram. Posts come from Meta's Instagram Graph API (the only supported way to read a profile grid; scraping is blocked). The site fetches them server-side once an hour, so visitors never call Instagram directly. If no token is configured the section shows studio photos instead, so nothing breaks while this is being set up.

## One-time setup (owner)

1. In the Instagram app, make sure the account is a **Professional** account (Business or Creator). Settings, Account type and tools, Switch to professional account. Free.
2. Go to https://developers.facebook.com/apps and create an app. Choose **Other**, then **Business**. Name it anything (for example "Whimsy Flower Website").
3. In the app dashboard, add the **Instagram** product and pick **API setup with Instagram login**.
4. Under "Generate access tokens", add the @whimsy_flower account as an Instagram tester and generate a token. Accept the invite in the Instagram app (Settings, Website permissions, Apps and websites, Tester invites), then generate again if needed. Copy the **long-lived token** (valid 60 days).
5. In Vercel, Project, Settings, Environment Variables: add `INSTAGRAM_ACCESS_TOKEN` with that value for Production (and Preview if wanted). Redeploy. The grid switches to the live feed on the next build.

## Keeping the token alive

Long-lived tokens expire after 60 days. Refresh any time after the first 24 hours by opening this URL in a browser (replace TOKEN):

```
https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN
```

The response contains a new token; paste it into the Vercel variable and redeploy. A calendar reminder every 50 days is enough. If the token lapses the section simply falls back to studio photos until a new token is set.

## Where the code lives

- `src/lib/instagram.ts`: fetches `/me/media` (id, caption, media type, media URL, thumbnail, permalink), keeps the first six usable posts, caches for an hour.
- `src/components/followUs.tsx`: three-column grid; live posts when available, otherwise six studio photos.
- `next.config.ts`: allows Instagram's CDN hosts for images.
