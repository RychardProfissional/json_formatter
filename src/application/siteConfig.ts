export const SITE = {
  domain: "respawntech.dev",
  url: "https://respawntech.dev",
  adsenseClient: "ca-pub-4583546796463766",
  adsenseSlots: {
    // Set your AdSense ad unit slot ids here (string numbers).
    // Keep empty to disable rendering.

    // Home
    homeTop: "9024163024",
    homeMiddle: "9024163024",
    homeBottom: "9024163024",

    // Tools Index (/tools)
    toolsIndexTop: "9024163024", // Old: toolsIndex
    toolsIndexBottom: "9024163024",

    // Tool Pages (General Layout)
    toolSidebar: "7586780666", // Old: tools (sidebar)
    toolContentTop: "9024163024", // Old: tools (content) - split from sidebar
    toolContentBottom: "3044900422", // Old: toolsExtra3

    // Blog Index (/blog)
    blogIndexTop: "9024163024",
    blogIndexBottom: "9024163024",

    // Blog Post (/blog/slug)
    blogPostSidebar: "9024163024",
    blogPostContent: "9024163024",
    blogPostBottom: "9024163024",
  },
  plausibleDomain: "respawntech.dev",
} as const;
