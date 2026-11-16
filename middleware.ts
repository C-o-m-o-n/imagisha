import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Routes that can be accessed while signed out
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/credits",
  "/api/webhooks/clerk",
  "/api/webhooks/stripe",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|txt)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
