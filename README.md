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

The form collects first name, email, location, parent type, product feedback, page URL, and user agent.

## Language Toggle

The prototype includes an `English / Français` switch in the top-right corner. Main landing copy, onboarding copy, guidance, and waitlist/feedback form text are translated in `app.js`.
