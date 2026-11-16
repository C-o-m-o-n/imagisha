import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Every route is dynamic (Clerk auth + MongoDB), so no incremental cache is configured.
// Add an R2 incremental cache here if you introduce ISR / static revalidation later.
export default defineCloudflareConfig({});
