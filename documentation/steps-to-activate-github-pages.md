# How to Host Your HTML, CSS, and JavaScript on GitHub Pages

## 1. Change Your GitHub Repository to Public
1. Go to your **GitHub repository**.
2. Navigate to **Settings** → **General**.
3. Scroll down to the **Danger Zone** section.
4. Click **Change repository visibility** and set it to **Public**.
5. Confirm the change.

## 2. Enable GitHub Pages
1. Go to **Settings** → **Pages**.
2. Under **Branch**, select `main` (or your default branch).
3. Click **Save**.
4. GitHub will provide a **public URL** like:
   - `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`
5. Wait a few minutes for the site to become available.

## 3. Organize Your Files for Deployment
Ensure your project has the necessary files in the root directory:

- `index.html` (Rename `api-variable-lookup.html` to `index.html`)
- `api-variable-lookup-styles.css`
- `api-variable-lookup-functionality.js`
- Any images or assets in an `images/` folder

**Important:** GitHub Pages looks for `index.html` as the main entry point. Rename your `api-variable-lookup.html` to `index.html` to ensure it loads properly.

## 4. Push Your Changes to GitHub
If your files are already in the repository, skip this step. Otherwise, use the following commands:

1. Clone your repository:
   - `git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git`
2. Move into the repository folder:
   - `cd YOUR_REPOSITORY`
3. Add your files if needed.
4. Commit and push your changes:
   - `git add .`
   - `git commit -m "Deploying site to GitHub Pages"`
   - `git push origin main`

## 5. Test Your Site
Once GitHub Pages is enabled and your files are pushed:
- Visit **`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`**.
- Ensure the page loads correctly.
- If styles or scripts do not load, check file paths (they should be **relative**, like `./api-variable-lookup-styles.css` instead of `/api-variable-lookup-styles.css`).

## 6. (Optional) Use a `docs/` Directory Instead of Root
If you don’t want your website files in the root directory, you can put them in a `docs/` folder:

- Create a `docs/` folder in your repository.
- Move `index.html`, CSS, JavaScript, and other assets into `docs/`.
- In **GitHub Pages Settings**, change the **Source** from "main" to "docs".

## 7. (Optional) Set Up a Custom Domain
1. Go to **Settings** → **Pages**.
2. Under **Custom domain**, enter `yourdomain.com`.
3. Configure your DNS records with GitHub’s instructions.

## ✅ You're Done!
Your website is now hosted on GitHub Pages. If you run into issues, check **Settings → Pages** or your repository's file structure to ensure everything is correct.
