# Learnings

## Portfolio UI

- Keep section structure simple. Missing closing tags in `index.html` can hide everything after the hero and are hard to spot visually.
- For interactive cards, separate the animated surface from the CTA. Hover effects should not interfere with button clicks.
- Hardcoded light colors break dark mode quickly. Prefer theme variables for panel backgrounds, card surfaces, borders, and text.
- Real product-style thumbnails work better than abstract gradients when the goal is to show product depth quickly.
- Short compressed hover videos are practical; large raw recordings are not.

## Frontend Implementation

- Build hover interactions around explicit wrapper classes like `js-hover-video-card` so behavior is easy to scope.
- Keep card sizing consistent with flex-based layouts instead of relying on content height matching by chance.
- Use lightweight poster images for video-backed cards so the initial load stays responsive.
- When adding polished UI in an existing site, preserve the existing layout system rather than introducing parallel structures.

## Process

- Validate HTML structure after larger manual edits, especially when moving nested sections.
- Push incremental visual changes only after checking both light and dark themes.
- Treat mobile and desktop separately for animation density and performance-sensitive effects.
