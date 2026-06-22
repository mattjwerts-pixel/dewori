# Dewori Skin — Headless Shopify Storefront

A fully custom e-commerce frontend for **Dewori Skin**, a Korean hydrating sheet mask brand. Built with Next.js 14 and connected to Shopify via the Storefront API.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Language | TypeScript |
| Backend / Commerce | Shopify Storefront API |
| Fonts | Inter + Playfair Display (Google Fonts) |
| Hosting | Vercel (free tier) |

---

## Project Structure

```
dewori-skin/
├── app/                    # All pages (Next.js App Router)
│   ├── page.tsx            # Homepage
│   ├── shop/
│   │   ├── page.tsx        # Shop listing page
│   │   └── [handle]/
│   │       └── page.tsx    # Individual product page
│   ├── cart/
│   │   └── page.tsx        # Cart page
│   └── about/
│       └── page.tsx        # About page
├── components/             # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── ProductCard.tsx
│   ├── BundleCard.tsx
│   ├── AnnouncementBar.tsx
│   └── ProductActions.tsx
├── lib/
│   ├── shopify.ts          # All Shopify Storefront API functions
│   ├── actions.ts          # Next.js Server Actions (cart mutations)
│   └── cart-context.tsx    # React context for cart state
├── types/
│   └── shopify.ts          # TypeScript types for Shopify data
└── .env.local              # Your secret credentials (never commit this)
```

---

## Step 1 — Get your Shopify Storefront API credentials

You need two values from your Shopify store. Here is exactly how to get them:

### 1a. Find your Store Domain

Your store domain is the `.myshopify.com` URL of your store.

1. Log in to your **Shopify Admin** (admin.shopify.com)
2. Go to **Settings** (bottom-left gear icon)
3. Under **Store details**, look for your store address — it ends in `.myshopify.com`
4. Copy just the domain, e.g. `dewori-skin.myshopify.com`

### 1b. Create a Storefront API access token

1. In Shopify Admin, go to **Settings → Apps and sales channels**
2. Click **Develop apps** (top right)
3. If prompted, click **Allow custom app development**
4. Click **Create an app**, give it a name like `Next.js Storefront`
5. Click **Configure Storefront API scopes**
6. Enable these scopes:
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts`
   - `unauthenticated_read_checkouts`
   - `unauthenticated_write_customers`
7. Click **Save**
8. Click **Install app**
9. Under **API credentials**, copy the **Storefront API access token**

> The Storefront API token is designed to be used by frontend apps. It only has read access to products and write access to carts/checkouts — it cannot modify your store data.

---

## Step 2 — Set up your environment variables

1. In the project root, open `.env.local` (already created for you)
2. Replace the placeholder values with your real credentials:

```bash
SHOPIFY_STORE_DOMAIN=dewori-skin.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-actual-token-here
```

3. Save the file and restart the dev server: `npm run dev`

The shop page at `http://localhost:3000/shop` will now load your real products.

---

## Step 3 — Set up products in Shopify

For the bundle model to work, create products in Shopify that represent each pack size.

**Recommended product setup:**

| Product title | Handle (URL slug) | Price |
|---|---|---|
| Korean Hydrating Sheet Mask — 5 Pack | `sheet-mask-5-pack` | $19.99 |
| Korean Hydrating Sheet Mask — 10 Pack | `sheet-mask-10-pack` | $29.99 |
| Korean Hydrating Sheet Mask — 20 Pack | `sheet-mask-20-pack` | $44.99 |

For each product:
1. Add a product image
2. Set the price
3. Make sure **Track quantity** is on and stock is available
4. Under **Sales channels**, make sure **Online Store** and your Storefront are checked

---

## Step 4 — Wire up Bundle Card variant IDs

Once your products are live in Shopify, you need to connect the Bundle Cards on the homepage to the real Shopify variant IDs.

### Finding a variant ID

1. Go to Shopify Admin → **Products** → click a product
2. Scroll down to **Variants** and click on a variant
3. Look at the URL — it ends with the variant ID, e.g. `.../variants/12345678901234`
4. Copy the numeric ID

### Adding it to the code

Open `app/page.tsx` and find the `bundles` array at the top of the file:

```typescript
const bundles = [
  {
    title: '5-Pack',
    maskCount: 5,
    price: 19.99,
    pricePerMask: 4.0,
    isBestValue: false,
    variantId: undefined,           // ← Replace with your variant ID
  },
  {
    title: '10-Pack',
    maskCount: 10,
    price: 29.99,
    pricePerMask: 3.0,
    isBestValue: true,
    variantId: undefined,           // ← Replace with your variant ID
  },
  {
    title: '20-Pack',
    maskCount: 20,
    price: 44.99,
    pricePerMask: 2.25,
    isBestValue: false,
    variantId: undefined,           // ← Replace with your variant ID
  },
]
```

Replace each `undefined` with the actual variant GID from Shopify, which looks like:

```typescript
variantId: 'gid://shopify/ProductVariant/12345678901234'
```

> **Note:** The Storefront API uses base64-encoded GIDs, not raw numeric IDs. The easiest way to get the correct GID is to run a product query in the Shopify GraphiQL app or copy it from the API response when your products load on `/shop`.

---

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type check
npx tsc --noEmit

# Production build
npm run build
```

---

## Deploying to Vercel

1. Push this project to a GitHub repository
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add both variables:
   - `SHOPIFY_STORE_DOMAIN` — your `.myshopify.com` domain
   - `SHOPIFY_STOREFRONT_ACCESS_TOKEN` — your Storefront API token
5. Click **Deploy**

Vercel will automatically redeploy every time you push to `main`.

---

## Environment Variables Reference

| Variable | Description | Example |
|---|---|---|
| `SHOPIFY_STORE_DOMAIN` | Your `.myshopify.com` store domain | `dewori-skin.myshopify.com` |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Public Storefront API token from your custom app | `shpat_xxxxxxxxxxxx` |

Both variables are server-side only — they are never sent to the browser. Cart mutations go through Next.js Server Actions, which run on the server.

---

## Shopify handles — do not build

- Payment processing (Checkout button redirects to Shopify's hosted checkout)
- Order management and fulfillment
- Customer accounts
- Inventory tracking
- Discount codes
- Tax calculation

---

## Brand

- **Brand name:** Dewori Skin
- **Tagline:** Your daily glow ritual
- **Product:** Korean Hydrating Sheet Face Masks
- **Primary color:** Cream `#FAF7F2`
- **Accent color:** Dusty Rose `#D4A5A5`
- **Text:** Charcoal `#2C2C2C`
