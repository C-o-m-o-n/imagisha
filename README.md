### Imagisha

[website url](https://imagisha.vercel.app)

#### Video Demo:
  [link](https://youtu.be/w450opaa4Fo?si=D5yDqmJVD6TKrzlM)

#### Description:
  an AI-powered image generation and and transformation platform.

### Features and tools used:
-  Cloudinary AI for image manipulation
-  Stable diffusion api (comming soon) for image generation
-  Safaricom daraja API for payment management
-  Clerk for user authentication
-  MongoDB for data storage
-  Nextjs for development
-  Vercel for deployment


## Getting Started
First, run the development server:

```bash
npm install

#then

npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploying to Cloudflare Workers

The app runs on Cloudflare Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).
Config lives in `wrangler.jsonc` and `open-next.config.ts`.

### Workers Builds (Git-connected) settings
- **Build command:** `npm run build` (runs `opennextjs-cloudflare build`, which calls `npm run build:next` internally)
- **Deploy command:** `npx wrangler deploy`

### Environment variables
- **Public build-time values** (`NEXT_PUBLIC_*`) are committed in `.env.production`. Next.js inlines them during the build, so setting them as Worker runtime variables does nothing.
- **Runtime secrets** (Worker > Settings > Variables and Secrets, type *Secret*): see `.dev.vars.example`.

### MongoDB Atlas
Workers have no fixed egress IP, so the Atlas network access list must allow `0.0.0.0/0`.

### Local preview in the Workers runtime
```bash
cp .dev.vars.example .dev.vars   # fill in values
npm run preview
```
