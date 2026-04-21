# PARAM CREATION — Website Guide
### Designed by Basit

---

## 📁 FOLDER STRUCTURE

```
param-creation/
├── index.html          ← Main website file
├── style.css           ← All styling
├── script.js           ← All JavaScript
├── README.md           ← This guide
└── images/             ← 📸 PUT YOUR PHOTOS HERE
    ├── cat-traditional.jpg   (Category card image)
    ├── cat-western.jpg       (Category card image)
    ├── cat-new.jpg           (Category card image)
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    ├── gallery-3.jpg
    ├── gallery-4.jpg
    ├── gallery-5.jpg
    ├── gallery-6.jpg
    ├── gallery-7.jpg
    ├── gallery-8.jpg
    └── gallery-9.jpg
```

---

## 🖼️ HOW TO CHANGE PHOTOS

### Method 1 — Replace Images (No Coding)
1. Create a folder named `images` in the same folder as `index.html`
2. Name your photos exactly as listed above (e.g. `gallery-1.jpg`)
3. Copy your photos into the `images` folder
4. Open `index.html` in your browser — photos auto-load!

> 💡 **Tip:** If you don't add a photo, the website shows a nice placeholder automatically.

### Method 2 — Add More Gallery Photos (Edit HTML)
1. Open `index.html` in Notepad or VS Code
2. Find the gallery section (search for `gallery-9`)
3. Copy one `<div class="gallery-item">` block
4. Paste it below and change `src="images/gallery-9.jpg"` to `src="images/your-photo.jpg"`
5. Set `data-category="traditional"` or `"western"` or `"new"`

---

## 🔐 SECRET ADMIN PANEL

- **How to open:** Click the **PC logo** in the top-left navbar **5 times quickly**
- **Username:** `paramcreation`
- **Password:** `param@2024`
- **What you can do:**
  - Upload photos directly from your device
  - Choose category (Traditional / Western / New Arrivals)
  - Delete uploaded photos
  - Photos are saved in browser memory (localStorage)

> ⚠️ To change credentials, open `script.js` and edit line 8-9:
> ```js
> const ADMIN_ID   = 'paramcreation';
> const ADMIN_PASS = 'param@2024';
> ```

---

## 🚀 HOW TO PUBLISH ONLINE

### Option A — Vercel (Free, Recommended)
1. Create free account at https://vercel.com
2. Click **"Add New Project"**
3. Drag & drop your entire `param-creation` folder
4. Click **Deploy** → Your site is live in 60 seconds!
5. You get a free URL like: `param-creation.vercel.app`

### Option B — GitHub Pages (Free)
1. Create account at https://github.com
2. Click **New Repository** → name it `param-creation`
3. Upload all files (index.html, style.css, script.js, images/)
4. Go to **Settings → Pages → Branch: main → Save**
5. Live at: `yourusername.github.io/param-creation`

### Option C — Netlify (Free, Drag & Drop)
1. Go to https://netlify.com → Sign up free
2. Drag your entire project folder into the Netlify dashboard
3. Done! Instant live URL provided

---

## 🎨 QUICK CUSTOMIZATIONS

| What to change | Where to find it |
|---|---|
| Phone number | Search `9875291200` in index.html, replace all |
| WhatsApp number | Same — search `919875291200` |
| Instagram handle | Search `param._creations` |
| Email | Search `Paramcreation26@gmail.com` |
| Map location | Find `<iframe` in contact section, replace Google Maps embed URL |
| Admin password | `script.js` lines 8-9 |
| Colors | `style.css` lines 3-22 (CSS variables) |

---

## 📱 FEATURES INCLUDED
- ✅ Preloader animation
- ✅ Sticky gold navbar with scroll effect
- ✅ Hero with animated PC logo + particles
- ✅ Category cards with hover 3D effect
- ✅ Gallery with filter (Traditional / Western / New)
- ✅ Hover zoom + WhatsApp button on every photo
- ✅ Contact section with map
- ✅ Floating WhatsApp button (always visible)
- ✅ Secret admin panel (5-click logo)
- ✅ Admin photo upload + delete
- ✅ Fully mobile responsive
- ✅ Smooth scroll animations

---

*Website designed by **Basit***
