# Next Tea

A simple e‑commerce demo built with **Next.js 15 (App Router)** and **NextAuth.js**. The app includes public and protected pages: visitors can browse a landing page and product details; signed‑in users can access a protected dashboard page to add new products (saved to MongoDB).

**Live:** https://nexttea.vercel.app/  
**Repository:** https://github.com/arifuddincoder/nexttea

---

## ✨ Core Features

1. **Landing Page (`/`)**
   - Sections: **Navbar**, **Hero**, **Product Highlights**, **Footer**
   - Navigation to **Login** and **Products**
   - No authentication required

2. **Login with NextAuth (`/login`)**
   - Social login (Google / GitHub) and/or **Credentials**
   - Redirects to **`/products`** after successful login

3. **Product List Page (`/products`)**
   - Publicly accessible
   - Fetches products from **MongoDB via Route Handler `/api/products`**
   - Each card shows: **name, description, price**, and **View Details** button

4. **Product Details Page (`/products/[id]`)**
   - Publicly accessible
   - Full details of a product
   - Dynamic **SEO metadata** (title & description)

5. **Protected Page: Add Product (`/dashboard/add-product`)**
   - Only accessible when logged in
   - Form to add a product (name, description, price, **image** via IMGBB upload)
   - Saves to **MongoDB**
   - Unauthenticated users are redirected to `/login`

> **Optional Enhancements** (not implemented for this submission): loading spinner/toast, theme toggle.

---

## 🧰 Tech Stack

- **Next.js 15** (App Router)
- **NextAuth.js**
- **MongoDB** (Atlas) with the **mongodb** native driver
- **Tailwind CSS** (+ light DaisyUI usage)

---

## 📁 Key Structure

```
src/
  app/
    api/
      products/
        route.js                 # GET (list), POST (create - auth required)
      products/[id]/route.js     # GET by id
      auth/[...nextauth]/route.js# NextAuth handler
    dashboard/
      layout.jsx                 # centered bordered container for dashboard pages
      add-product/
        page.jsx                 # server-side session guard + wrapper
        AddProductForm.jsx       # client form + IMGBB upload
    products/
      page.jsx                   # product list (links to details)
      [id]/page.jsx              # product details + generateMetadata
    page.jsx                     # landing (hero + highlights)
  lib/
    dbConnect.js                 # mongodb connection helper
```

---

## 🔐 Environment Variables

Create `.env.local` and add:

```bash
# Mongo / NextAuth
MONGODB_URI=your-mongodb-connection-string
DB_NAME=nexttea
NEXTAUTH_SECRET=your-strong-secret

# Base URLs
NEXTAUTH_URL=http://localhost:3000                 # set to your production domain on Vercel
NEXT_PUBLIC_BASE_URL=http://localhost:3000         # set to your production domain on Vercel

# OAuth (use what you need)
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_ID=...
GITHUB_SECRET=...

# Image upload
NEXT_PUBLIC_IMGBB_KEY=...
```

**OAuth Redirects (Production):**
- Google: `https://<your-domain>/api/auth/callback/google`
- GitHub: `https://<your-domain>/api/auth/callback/github`

---

## ▶️ Local Development

```bash
npm install
npm run dev
# open http://localhost:3000
```

MongoDB Atlas: ensure your IP/connection is allowed under **Network Access**.

---

## 🧪 Quick Test Plan

- `/` — Hero + Product Highlights
- `/login` — Login (Google/GitHub/Credentials); success → `/products`
- `/products` — lists products from MongoDB
- `/products/[id]` — details page
- `/dashboard/add-product` — redirects to `/login` if not signed in; otherwise shows form
- Add a product (with image upload) → verify it appears on `/products`

---

## 🔗 Route Summary

| Route                        | Type       | Description                                   |
|-----------------------------|------------|-----------------------------------------------|
| `/`                         | Public     | Navbar, Hero, Product Highlights, Footer      |
| `/login`                    | Public     | NextAuth login; redirects to `/products`      |
| `/products`                 | Public     | All products (MongoDB via `/api/products`)    |
| `/products/[id]`            | Public     | Product details + dynamic metadata            |
| `/dashboard/add-product`    | Protected  | Add product form (IMGBB upload)               |
| `/api/products`             | API        | `GET` list, `POST` create (auth required)     |
| `/api/products/[id]`        | API        | `GET` product by id                           |
| `/api/auth/*`               | API        | NextAuth handlers                             |

---

## 🧱 Data Model (Product)

```json
{
  "name": "Green Tea",
  "description": "Delicate, floral aroma...",
  "price": 8.5,
  "image": "https://i.ibb.co/.../image.jpg",
  "createdAt": "2025-08-22T00:00:00.000Z",
  "createdBy": "user@email.com"
}
```

Seed (Mongo shell/Compass):
```js
db.products.insertMany([
  { name: "Green Tea", description: "Delicate, floral aroma...", price: 8.5, image: "https://placehold.co/400x500?text=Green+Tea", createdAt: new Date() },
  { name: "Black Tea", description: "Bold and malty body...", price: 9.0, image: "https://placehold.co/400x500?text=Black+Tea", createdAt: new Date() },
  { name: "Oolong Tea", description: "Smooth semi-oxidized...", price: 10.5, image: "https://placehold.co/400x500?text=Oolong+Tea", createdAt: new Date() }
]);
```

---

## 🚀 Deploy to Vercel

1. Import the GitHub repo in **Vercel** → create project  
2. Add **Environment Variables** for Production/Preview/Development  
3. Deploy  
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain

> Tip: To avoid BASE URL issues, you can use **relative fetch** in server components: `await fetch("/api/products")`.

---


## 👨‍💻 Developer Info

**Md Arif Uddin**  
📧 arifuddincoder@gmail.com  
🌐 [https://codebyarif.web.app](https://codebyarif.web.app)  
🔗 [LinkedIn](https://linkedin.com/in/arifuddincoder) | [GitHub](https://github.com/arifuddincoder)

---

## 📄 License

MIT
