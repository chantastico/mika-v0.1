# Mika Prototype

Static clickable prototype for Mika, a consumer family-operations product for moms who are tired of everyone forgetting things.

## Open Locally

Open `index.html` in a browser.

## Publish On GitHub Pages

1. Create a new GitHub repository.
2. Upload these files to the repository root:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `mika-logo.png`
   - `mika-logo-cropped.png`
   - `supabase-setup.sql`
   - `README.md`
3. In GitHub, go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and `/root`, then save.

GitHub will provide a public URL after the Pages deploy finishes.

## Connect The Waitlist To Supabase

1. In Supabase, open the SQL Editor.
2. Paste and run the contents of `supabase-setup.sql`.
3. Go to `Project Settings` -> `API`.
4. Copy your Project URL and anon public key.
5. In `app.js`, replace:
   - `https://YOUR_PROJECT_REF.supabase.co`
   - `YOUR_SUPABASE_ANON_KEY`
6. Commit and redeploy the updated `app.js`.

The form collects first name, email, location, 1-5 rating, usefulness signal, feedback keywords, optional family dynamics/structure, product feedback, language, page URL, user agent, and timestamp.

## Feedback Collection Recommendation

Use Supabase as the source of truth for live submissions. It safely receives form entries from GitHub Pages and automatically stores `created_at` timestamps.

For analysis, export the `mika_waitlist` table from Supabase as CSV and open it in Google Sheets or Excel. This gives you spreadsheet analysis without trying to make the static website write directly into a spreadsheet.

## Language Toggle

The prototype includes an `EN / FR` switch in the top-left corner. Main landing copy, onboarding copy, guidance, and waitlist/feedback form text are translated in `app.js`.
