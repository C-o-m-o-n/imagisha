# Session Log

## 2026-11-16 — Upgrade + Cloudflare Workers prep (branch `cloudflare-workers`)

**Changed**
- Next 14.1 → 16.4.6, React 18 → 19.2, Clerk v4 → v7 (Core 3), next-cloudinary 5 → 7, Radix/lucide/swr/react-hook-form bumped.
- Clerk migration: `authMiddleware` → `clerkMiddleware` + `createRouteMatcher`; `auth()` is awaited and imported from `@clerk/nextjs/server`;
  `clerkClient()` is awaited; `<SignedIn>/<SignedOut>` → `<Show when="signed-in|signed-out">`; `afterSignOutUrl` moved to `<ClerkProvider>`.
- Next 15+/16: page `params`/`searchParams` and `headers()` are now Promises (awaited).
- Added `@opennextjs/cloudflare`, `wrangler.jsonc` (worker `imagisha`, nodejs_compat, IMAGES binding), `open-next.config.ts`, `next.config.ts`.
- ESLint 9 flat config (`eslint.config.mjs`); `next lint` removed in Next 16.
- Removed unused deps: `mpesa-node`, `unirest`, `@types/axios`, `@types/mpesa-node`.

**Verified**: `tsc --noEmit` passes; `npx opennextjs-cloudflare build` completes; `npm ci --dry-run` is clean.

**Not verified / still open**
- Have not run the Worker locally (`wrangler dev`) or deployed it. The main runtime risk is Mongoose/MongoDB driver over `node:net` on Workers.
- 3 ESLint errors from new React-compiler rules (Checkout.tsx:91, FreeCheckout.tsx:97, TransformationForm.tsx:182). These are old patterns and don't block the build.
- `middleware.ts` triggers a Next 16 deprecation warning ("use proxy"). It's kept on purpose: OpenNext Cloudflare runs edge middleware, not Node `proxy.ts`.
- `app/api/mpesa/route.ts` was already broken before this change (calls `res.status` on parsed JSON; passkey placeholder).
- Untracked `pnpm-lock.yaml` should not be committed (Cloudflare would switch to pnpm).

**Next steps**: update the Cloudflare build/deploy commands, set build vars and runtime secrets, allow 0.0.0.0/0 in Atlas, push the branch, then smoke-test the deployed URL (sign-in, /profile, a transformation, the Clerk webhook).

## 2026-11-16 (later) — Cloudflare build failed on pnpm
The stale `pnpm-lock.yaml` (generated from the old Next 14 package.json) was committed in 4cf24de. When it's present, Cloudflare picks pnpm and runs `pnpm install --frozen-lockfile`, which failed. Untracked it and added it to `.gitignore`; npm and `package-lock.json` are the only package manager and lockfile now.

## 2026-11-16 (later) — Deploy failed: "Could not find compiled Open Next config"
Cloudflare's build command was still `npm run build` (plain `next build`), so `.open-next/` never existed. Fix: `build` script is now `opennextjs-cloudflare build`;
plain Next build moved to `build:next`, and `open-next.config.ts` sets `buildCommand = "npm run build:next"` so it doesn't recurse. The default dashboard commands
(`npm run build` + `npx wrangler deploy`) now work. Verified locally: `npm run build` → `.open-next/worker.js`; `wrangler deploy --dry-run` OK (2.5 MiB gzip).

## 2026-11-16 (later) — Build OK, deploy failed on `npx wrangler preview`
- Build now passes in Cloudflare. The deploy for the non-production branch `cloudflare-workers` ran `npx wrangler preview` (beta), which requires a `previews` block in wrangler config.
  Fix in the dashboard: set the non-production deploy command to `npx wrangler versions upload`, or deploy from the production branch with `npx wrangler deploy`.
  Do NOT add a `previews.vars` block with real values to wrangler.jsonc; it would commit secrets.
- SECURITY: that error printed every env value (Clerk secret, Cloudinary secret, Mongo URL with password, Clerk webhook secret, Vercel OIDC token) in plain text in the build log.
  They didn't come from git (history checked clean), so they must be set as Cloudflare build variables. Recommended: rotate them, move server secrets to Worker runtime Secrets,
  keep only NEXT_PUBLIC_* as build vars, and drop VERCEL_OIDC_TOKEN.

## 2026-11-16 (later) — Env vars sorted
- The user rotated the secrets and set them as encrypted Worker runtime secrets.
- NEXT_PUBLIC_* are inlined at build time, so as runtime vars they did nothing. They're now committed in `.env.production` (public values only; `.gitignore` has `!.env.production`).
  The plain-text NEXT_PUBLIC_* runtime vars in the dashboard can be deleted (wrangler deploy would drop them anyway, since wrangler.jsonc has no `vars`).
- Fixed: `createTransaction` called `redirect()` inside try/catch, so handleError swallowed NEXT_REDIRECT and it never redirected. It also used `${NEXT_PUBLIC_SERVER_URL}/profile` = `//profile`.
  Now `redirect("/profile")` runs after the try/catch. `NEXT_PUBLIC_SERVER_URL` is no longer used.
- Still open: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is unset, so Checkout.tsx calls loadStripe(undefined). This predates the upgrade; Stripe checkout is commented out anyway.
