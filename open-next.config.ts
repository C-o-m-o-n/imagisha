import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every route is dynamic (Clerk auth + MongoDB), so no incremental cache is configured.
// Add an R2 incremental cache here if you introduce ISR / static revalidation later.
const config = defineCloudflareConfig({});

// `npm run build` runs the OpenNext build (so Cloudflare's default build command produces
// the Worker bundle). OpenNext must therefore call the plain Next build via a different
// script, otherwise it would recurse into itself.
config.buildCommand = "npm run build:next";

export default config;
