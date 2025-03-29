# Building Mantra Store - A Next JS app (App router)

Building Mantra Store (an online store) using the App Router

-   Using TypeScript
-   Using Tailwind CSS
-   Using Module Sass files for styling

## Pre-requisites

-   Good knowledge of React
-   Working knowledge of Node JS

## Software

-   Node JS installed (preferably v22) - https://nodejs.org

## References

-   Choose the App Router from the dropdown in the official Next JS documentation - https://nextjs.org/docs/getting-started/installation
-   Tailwind documentation - https://tailwindcss.com/

## Step 1: Creating the app

-   Open the terminal folder where you would like your project to be created.
-   Run

```
npx create-next-app mantra-store
```

If you find issues with the Node JS version, you may use an older version of create-next-app

```
npx create-next-app@14 mantra-store
```

-   Answer the questions asked like so

✔ Would you like to use TypeScript? … No / __Yes__  
✔ Would you like to use ESLint? … No / __Yes__  
✔ Would you like to use Tailwind CSS? … No / __Yes__  
✔ Would you like your code inside a `src/` directory? … No / __Yes__  
✔ Would you like to use App Router? (recommended) … No / __Yes__  
✔ Would you like to use Turbopack for `next dev`? … __No__ / Yes  
✔ Would you like to customize the import alias (`@/*` by default)? … __No__ / Yes  

-   Your project would be created in a few moments. You will find the mantra-store folder. Navigate to the folder from within the terminal.

```
cd mantra-store
```

## Step 2: Understanding the project structure

-   The instructor shall explain the files and folders. Make sure to understand the purpose of each file and folder.
-   The project has the application code in `src/` folder because we chose so at project creation time (else it will not have the folder).
-   Since we are using the App router, the page components shall go within the `app/` folder (for the older Pages router, the page files would be within the `pages/` folder). This is one way to know which router you are working with - Pages or App router.

## Step 3: Running the development server

-   Launch the dev server by running the `dev` script

```
npm run dev
```

-   It launches on port 3000 by default. Open http://localhost:3000 in the browser - you see the page which is essentially src/pages/index.tsx

## Step 4: Organizing files

Add the following folders to the src/ folder. This is of course only a guidance. In an application you build at work or for pleasure, you are free to organize as you please. **But for this project please follow this structure only**.

```
mkdir src/components src/context src/data src/hooks src/services src/styles src/types
```

-   **components/** - Houses the components that are not pages
-   **context/** - Houses the context objects used for sharing data across the app
-   **data/** - Houses the code for connecting to the backend, defining models, and DB services (methods with DB queries that shall be shared across the app)
-   **app/** - already exists - it houses the page-level components
-   **services/** - Houses the API methods called by client-side code (like making API calls to fetch data, post data etc.)
-   **styles/** - already exists - it houses the global styles
-   **types/** - Houses the TS types (interfaces, types, classes etc.) we shall define

**Tip**:
Going forward, make note of each one's purpose. Next JS being a full-stack React + Node JS app will have both frontend and backend files. Carefully make note of which files / functions execute...

-   exclusively on the client
-   exclusively on the server
-   exclusively at build time (or regenerated through a periodically running process)
-   at various places (client and server)

Making this distinction will help you to understand Next JS easily.

## Step 5: Setting up the Home page

-   `src/components/home/home.tsx` - Create a basic UI for the home page - We shall define the actual UI for every page in a component in the components/ folder. Thus we frst create this component first. Note that we shall be creating a folder for each component. Again emphasizing - you are free to organize folders as you like, **but please stick to this organization for this project**.

```js
export default function Home() {
    return <div>Home component</div>;
}
```

-   `src/app/page.tsx` - Edit the HomePage

```tsx
import Home from "@/components/home/home";

export default function HomePage() {
    return (
        <>
            <Home />
        </>
    );
}
```

## Step 6: Adding metadata

-   `src/app/page.tsx` - Edit the HomePage to add metadata for a page like so. You shall use the Head component in future for any page you create and set appropriate metadata

```tsx
import Home from "@/components/home/home";
import type { Metadata } from "next";

export const metadata : Metadata = {
  title: "Mantra Store",
  description:
    "Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep.",
};

export default function HomePage() {
  return <Home />;
}
```

-   `app/globals.css` - Set up the theme for your app like so. Understand the various pieces in the code (Setting up theme color palette, font, typography). Tailwind v4 encourages a CSS-first config (e.g. via `@theme`).
The `next/font/google` injects fonts via inline styles, making it harder to manage in Tailwind’s new `@theme` system.
```css
@import "tailwindcss";

:root {
    --background: #ffffff;
    --foreground: #171717;
}

@theme {
    --color-background: var(--background);
    --color-foreground: var(--foreground);
    --font-sans: "Roboto", ui-sans-serif, system-ui, -apple-system, sans-serif;
}

.theme-dark {
    --color-background: #0a0a0a;
    --color-foreground: #ededed;
}

@media (prefers-color-scheme: dark) {
    :root {
        --background: #0a0a0a;
        --foreground: #ededed;
    }
}

body {
    background-color: var(--color-background);
    color: var(--color-foreground);
    font-family: var(--font-sans);
    min-height: calc(100vh + 16px);
}
```
- In `app/layout.tsx`
```tsx
import type { Metadata } from "next";

/**
 * When using Tailwind CSS v4's @theme in CSS-first config mode (introduced in v4.0) variables must reference a font-family already available in the CSS cascade — which is immediate when using <link href="https://fonts.googleapis.com/..." rel="stylesheet" />

 Whereas with next/font, the fonts are injected asynchronously and scoped via class names, which doesn't align well with Tailwind's global CSS variable-based theming.

 If not using Tailwind CSS v4, include font this way instead of <link />
 */
// import { Roboto } from "next/font/google";

import "./globals.css";


// If not using Tailwind CSS v4...
// const roboto = Roboto({
//   weight: ["400", "500", "700"],
//   subsets: ["latin"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Mantra Store",
  description: "Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* If not using Tailwind CSS v4 */}
      {/* <body className={`${roboto.className} antialiased`}> */}
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

## Step 8: Creating a layout for the app as a whole

-   Our app requires a main navigation menu for every page. We create the `MainNavigation` component first, and then a custom `Layout` component
-   `src/components/main-navigation/main-navigation.tsx` - Add the following.

```tsx
import { useState } from "react"
import Link from "next/link"

export default function ResponsiveAppBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide uppercase hidden md:block">
          Mantra
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/products/add" className="hover:underline">
            Add a Product
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
          <Link
            href="/products"
            className="block w-full text-left hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/products/add"
            className="block w-full text-left hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Add a Product
          </Link>
        </div>
      )}
    </header>
  )
}
```

-   Add the following in `src/components/layout/layout.tsx`

```tsx
import MainNavigation from "@/components/main-navigation/main-navigation";
```
```tsx
<body className="antialiased">
  <MainNavigation />
  <div className="max-w-screen-xl mx-auto mt-12 px-4">
    {children}
  </div>
</body>
```
- You get an error saying `MainNavigation` should be a __client component__ as it uses a hook - `useState`.
- Add this as the first line in `src/components/main-navigation/main-navigation.tsx`
```tsx
'use client';
```
- Making the entire `MainNavigation` is however a blanket approach to making the menu work (by rendering it entirely in the client). In Next JS we try to "push down" client-side rendering as far down the component tree as possible. The top-level components are server components, and client components appear at the bottom level down to the leaves of the component tree. Following this approach, split the `MainNavigation` as follows
- `src/components/main-navigation/logo/logo.tsx` (server component)
```tsx
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="text-xl font-bold tracking-wide uppercase hidden md:block">
      Mantra
    </Link>
  );
}
```
- `src/components/main-navigation/DesktopNavigation` (server component)
```tsx
import Link from "next/link";

export default function DesktopNav() {
  return (
    <nav className="hidden md:flex gap-6">
      <Link href="/products" className="hover:underline">
        Products
      </Link>
      <Link href="/products/add" className="hover:underline">
        Add a Product
      </Link>
    </nav>
  );
}
```
- `src/components/main-navigation/DesktopNavigation` (client component)
```tsx
'use client';

import { useState } from "react";
import Link from "next/link";

export default function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
          <Link href="/products" className="block w-full text-left hover:underline" onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link href="/products/add" className="block w-full text-left hover:underline" onClick={() => setMenuOpen(false)}>
            Add a Product
          </Link>
        </div>
      )}
    </>
  );
}
```
- `src/components/main-navigation/main-navigation.tsx`
```tsx
import Logo from "./logo/logo";
import DesktopNav from "./desktop-navigation/desktop-navigation";
import MobileMenu from "./mobile-navigation/mobile-navigation";

export default function ResponsiveAppBar() {
  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Logo />
        <MobileMenu />
        <DesktopNav />
      </div>
    </header>
  );
}
```

### Tailwind CSS Breakdown

- `max-w-screen-xl`: maps to MUI's `maxWidth="xl"`.
- `mx-auto`: centers the container horizontally.
- `mt-12`: corresponds to `mt: 3` (3 × 4px = `12px`, and Tailwind’s `mt-12` = `48px`, so adjust if needed).
- `px-4`: optional padding for horizontal spacing on small screens (like MUI's default gutters).

---

-   `src/pages/_app.tsx` - Now wrap the page rendering within Layout

```tsx
// some imports above...
import Layout from "@/components/layout/layout";

function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <Layout>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}

export default App;
```

## Step 9: Set up pages and components for /products and /products/add

-   Go ahead and set up page components and their corresponding components (ProductsList and AddProduct) for the 2 routes - /products and /products/add
-   This is left as an exercise. Make sure to set up appropriate metadata as well for the pages.
-   Confirm your implementation with the instructor  

__Solution__
- `components/products-list/products-list.tsx`
```tsx
const ProductsList = () => {
    return (
        <div>
            <h1>Products List</h1>
        </div>
    );
};

export default ProductsList;
```
- `components/add-product/add-product.tsx`
```tsx
const AddProduct = () => {
    return <div>Add a Product</div>;
};

export default AddProduct;
```
- `app/products/page.tsx`
```tsx
import ProductsList from "@/components/products-list/products-list";

export const metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default function ProductsPage() {
  return <ProductsList />;
}
```
- `app/products/add/page.tsx`
```tsx
import AddProduct from "@/components/add-product/add-product";

export const metadata = {
  title: "Add a Product",
  description: "Mantra Store - add a new product to the store",
};

export default function AddProductsPage() {
  return <AddProduct />;
}
```

## Step 10: A decent Home component

-   `src/components/home/home.tsx` - We create a responsive grid of images. 
-   Understand the Tailwind CSS classes and how they make the UI responsive.

```tsx
import Image from "next/image"

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-7">
      {/* Image Grid */}
      <div>
        <div className="grid grid-cols-3 gap-4">
          {itemData.map((item) => (
            <div key={item.img} className="relative w-full h-44">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover rounded"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex items-center justify-center text-2xl font-semibold">
        Mantra
      </div>
    </div>
  )
}

const itemData = [
  {
    img: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  },
  {
    img: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    title: "White Gold Plated Princess",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
  },
  {
    img: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
  },
  {
    img: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
]
```

### Tailwind CSS breakdown

- `grid grid-cols-3 gap-4`: matches MUI’s `cols={3}` and spacing.
- `h-44`: approximates `rowHeight={168}` in pixels.
- `Image fill + object-cover`: replaces raw `<img>` to maintain aspect ratio and responsive fit.
- `lg:grid-cols-2`: achieves responsive 2-column layout like `md={12} lg={6}`.

---

-   Set text with different font sizes (replace the division with the name of the store)

```tsx
<div className="lg:col-span-1">
  <h1 className="text-3xl font-semibold mb-2">Mantra</h1>
  <h2 className="text-xl font-medium mb-6">The Honest Store</h2>
  <p className="text-base leading-relaxed">
    If you cannot find what you are looking for here, it is likely not a
    thing! If you find it elsewhere at a lesser price, we will match the
    price for you!!
  </p>
</div>
```

### Tailwind CSS breakdown

- **`text-3xl`**: Sets the font size to "3xl" (typically `1.875rem` or `30px`).
- **`font-semibold`**: Applies a semi-bold font weight (`600`).
- **`text-xl`**: Sets the font size to "xl" (`1.25rem` or `20px`).
- **`font-medium`**: Applies a medium font weight (`500`).
- **`text-base`**: Sets the font size to base (`1rem` or `16px`), standard for body text.
- **`leading-relaxed`**: Applies relaxed line height (typically `1.625`), improving readability.
- **`mb-2`**: Adds a bottom margin of `0.5rem` (`8px`).
- **`mb-6`**: Adds a bottom margin of `1.5rem` (`24px`).
- **`lg:col-span-1`**: In large viewports, spans 1 column in a grid layout. Used for layout control inside responsive grids.

---

__Optional Step__: Fetching JSON data from a local JSON file
- In `/public/data/products-images.json`
```json
[
    {
        "img": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
    },
    {
        "img": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet"
    },
    {
        "img": "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
        "title": "Camera"
    },
    {
        "img": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        "title": "White Gold Plated Princess"
    },
    {
        "img": "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
        "title": "Hats"
    },
    {
        "img": "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
        "title": "Honey"
    },
    {
        "img": "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
        "title": "Basketball"
    },
    {
        "img": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0"
    },
    {
        "img": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
        "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s"
    },
    {
        "img": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
        "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats"
    },
    {
        "img": "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
        "title": "Sea star"
    },
    {
        "img": "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
        "title": "Bike"
    }
]
```
- In `.env.local`
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```
- In `app/page.tsx`
```tsx
export default async function HomePage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/data/product-images.json`, {
    cache: 'force-cache'
  });
  const images = await res.json();

  return <Home images={images} />;
}
```
- The page component being a serve component, runs on the server. When called without any argument, `fetch` executes at build time and caches the response. It is neve called again (when individual request comes in for the home page). Instead the response cached at build time is reused. This is the equivalent of Static Site Generation (SSG) for this page, implemented using `getStaticProps()` in Pages router.
- For SSG (Static Site Generation) in the App Router, this is fetch configuration default. So we can actually omit it from this particular call.
```ts
{
  cache: 'force-cache'
}
```
- Modify `components/home/home.tsx` to accept the image data as props
```tsx
import Image from "next/image";

interface Props {
    images: { img: string, title: string }[];
}

export default function Home( { images } : Props ) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 gap-x-7">
            {/* Image Grid */}
            <div>
                <div className="grid grid-cols-3 gap-4">
                    {images.map((item) => (
                        <div key={item.img} className="relative w-full h-44">
                            <Image
                                src={item.img}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Text Content */}
            <div className="lg:col-span-1">
                <h1 className="text-3xl font-semibold mb-2">Mantra</h1>
                <h2 className="text-xl font-medium mb-6">The Honest Store</h2>
                <p className="text-base leading-relaxed">
                    If you cannot find what you are looking for here, it is
                    likely not a thing! If you find it elsewhere at a lesser
                    price, we will match the price for you!!
                </p>
            </div>
        </div>
    );
}
```

## Step 11: The Image component of Next JS

-   When working with images we use the Image component provided by Next JS. It enables many optimizations (resizing images as per width and height props, preventing layout shifts, serving image in optimized image format based on browser, lazy loading of images etc.)
-   Read more about it here - https://nextjs.org/docs/pages/building-your-application/optimizing/images

-   `next.config.ts`- You also need to add the following to support images from external domains

```ts
const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "fakestoreapi.com",
            },
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};
```

-   Observe the difference in look. Apart from this all optimizations are enabled.


## Step 12: Understanding Rendering models - mainly SSG

**Next.js (using the App Router)** enables building full-stack applications by combining server-side logic with client-side interactivity. It supports rendering components on the server as well as the client. Data fetching and component rendering can happen in the following ways:
  - **Static Site Generation (SSG)** — Data is fetched at **build time** and the result is cached and reused. This is the default behavior when using `fetch()` without options (i.e., `cache: 'force-cache'`).
  - **Server-Side Rendering (SSR)** — Data is fetched on **every request**. This is enabled using `fetch()` with `{ cache: 'no-store' }` or `{ next: { revalidate: 0 } }`.
  - **React Server Components (RSC)** — Components rendered on the server **without producing client-side JavaScript**. RSCs are streamed to the browser as a serialized React tree and are **not hydrated**, making them highly efficient.
**Important:**
  - RSC is **not a separate rendering strategy like SSG or SSR** — it's a rendering **model**. RSC is a *component model*, not a fetch/render timing strategy. RSCs can be static (SSG), cached, or dynamic (SSR-like).
  - In the App Router, **RSC is the default rendering model** for all components that do not include `'use client'`. 

__NOTE__:
- `getStaticProps()` (SSG), `getStaticPaths()` (SSG), `getServerSideProps()` (SSR), is part of the Pages Router API
- In the App Router, it's replaced by:
  - `fetch()` in Server Components (to control caching behavior and render using SSG / SSR rendering strategy)
  - `generateStaticParams()` for dynamic static pages (equivalent of `getStaticPaths()` for SSG)
  - `generateMetadata()` for `<head>` metadata (especially for `title`, and other `meta` information in dynamic static pages (SSG), SSR pages)

-   Right click the Home page and "View page source" -> you will find rendered HTML coming from the server rather than an empty `<div id="root"></div>` like in regular client-side only React apps (like the one created using create-react-app)
-   From the terminal run
```
npm run build
```
- __NOTE__: This will encounter an error if you implemented the optional step of fetching data from the public folder via the server (since the dev server may not be running). You can overcome this in one of the 2 ways below
  - Make sure the development server is running in one terminal, and run the build from a separate terminal
  - Use the `fs` module instead to read the JSON. Make the following changes in `app/page.tsx`
```tsx
import fs from "fs/promises";
import path from "path";
import Home from "@/components/home/home";

export const metadata = {
  title: "Mantra Store",
  description:
    "Mantra Store - shop from our wide variety of products. Have them delivered within 2 hours at your doorstep.",
};

export default async function HomePage() {
  const filePath = path.join(process.cwd(), "public/data/product-images.json");
  const jsonData = await fs.readFile(filePath, "utf-8");
  const images = JSON.parse(jsonData);

  return <Home images={images} />;
}
```

---

### Rendering Legend

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand

--

-   This creates the production build. You will see the type of rendering model applied to the pages. You will see that all pages are rendered using SSG right now (the default when `fetch` is not used in components, or used with default options).
-   Open the `.next` folder.
    -   Under `.next/server/pages` you will find the assets for SSG/SSR pages, and API routing. These run only on the server (not sent to the browser).
-   Apart from this Next JS code-splits content of every page, i.e. it creates a chunk JS for every page (this is to improve initial page load time in your SPA).
-   For statically generated pages, Next.js serves pre-rendered HTML files by default.
-   When navigating between statically generated pages (all components in Pages router, and client components only in App router) using client-side routing, Next.js uses client-side JavaScript to handle the navigation and loads necessary JavaScript chunks for the new page while still using the pre-rendered HTML content. It hydrates the existing static HTML content with the client-side JavaScript, allowing for interactive behavior without a full server round-trip.
    -   These chunks can be found in the `.next/static/chunks/pages` folder.
- Run the production build. You should notice a perceptible difference in the app's responsiveness when you navigate bwteen pages.
```
npm start
```

## Step 13: Product List page - Setting up server-side code to connect to the DB and fetch products data, to render it using SSG

-   For the product list page to be rendered using at build time (SSG), we need to be able to fetch data from the DB - i.e. we need to set up the server-side logic that connects to the DB, and queries the DB.
-   `.env.local` - Set up DB related variables. Some of these environment variables would probably not be used, and may be deleted - we will mainly use DATABASE_CONNECTION_STRING.

```
NODE_ENV=production
DATABASE_HOST=cluster0.duet2eg.mongodb.net
DATABASE_PORT=27017
DATABASE_NAME=mantra
DATABASE_USER=puranik
DATABASE_PASSWORD=Mantra123$
DATABASE_CONNECTION_STRING=mongodb+srv://puranik:Mantra123$@cluster0.duet2eg.mongodb.net/mantra?retryWrites=true&w=majority&appName=Cluster0
```

-   `src/data/init.ts` - Set up the database connection.
-   Install mongoose.
```sh
npm i mongoose
```
This is an alternative to using the MongoDB official driver for Node JS - MongoClient. It is an ODM (like ORM for RDBMS) and provides model validation, mapping based on relationships between collections etc.
-

```ts
import mongoose from "mongoose";

export const connect = async () => {
    const connectionStr =
        process.env.DATABASE_CONNECTION_STRING ||
        "mongodb://localhost:27017/mantra";

    try {
        await mongoose.connect(connectionStr);
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error((error as Error).message);
        throw error;
    }
};

export const disconnect = async () => {
    await mongoose.disconnect();
    console.log("Disconnected from the database");
};

connect();

export default mongoose;
```

-   **Pitfall**: Note that destructuring does not work on environment variables (`process.env` object) in Next JS
    -   https://nextjs.org/docs/pages/api-reference/next-config-js/env
-   Ideally we need more conditional checks to connect to different DB environments based on development/production etc. This code is simplistic.

## Step 14: Define Product model

-   Set up a `src/data/models/` folder - This houses the DB collection schema for validation, and creates the models (used for querying the collections).
-   When working with TypeScript in Mongoose, we need to also create TypeScript types that parallel the schema definitions. These types we shall create in the `src/types/` folder.
-   Understand how the schema is setup, and how the model is created from the schema.
-   For more information on using Mongoose check - https://mongoosejs.com/docs/guide.html

-   `src/types/Product.ts`

```ts
export interface IReview {
    _id?: string;
    username: string;
    rating: number;
    date: Date | string;
    text: string;
}

export interface IProduct {
    _id?: string;
    title: string;
    price: number;
    description: string;
    category:
        | "men's clothing"
        | "women's clothing"
        | "jewelery"
        | "electronics";
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    reviews: IReview[];
}
```

-   `src/data/models/Product.ts`

```ts
import mongoose from "mongoose";
import { IProduct, IReview } from "@/types/Product";

export const Review = new mongoose.Schema<IReview>({
    username: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 5,
        min: 0,
        max: 5,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    text: {
        type: String,
        required: true,
        minlength: 20,
    },
});

export const schema = new mongoose.Schema<IProduct>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (value: any) {
                return typeof value === "number";
            },
            message: "price must be a number.",
        },
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ["men's clothing", "women's clothing", "jewelery", "electronics"],
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        // required: true,
        rate: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        count: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    reviews: {
        type: [Review],
        default: [],
    },
});

if (!mongoose.modelNames().includes("Product")) {
    mongoose.model<IProduct>("Product", schema);
}
```

-   The model will be created only if the models/Product.ts file runs. We make sure it does by simply importing the model file in `src/data/init.ts`
-   `src/data/init.ts` - Add this import. Similarly import any model you shall be creating in future.

```ts
import mongoose from "mongoose";

// define Mongoose models by importing them
import "./models/Product";
// ...import any models you create in future here

// ...rest of the code
```

## Step 15: Define DB service to fetch Products (with pagination)

-   Define methods that shall make DB queries. Since these shall be useful across the app, we define it as a service.
-   Create a `src/data/services/` folder
-   **IMPORTANT**: Note that this is **NOT** the `src/services` folder - this is for a different purpose (client-side services for data fetching)
-   Within `src/data/services/products.ts`
    -   Define a method to get products whilst supporting pagination
    -   Make sure you understand the code well.

```ts
import mongoose from "@/data/init";

const Product = mongoose.model("Product");

export const getProducts = async (page: number = 1) => {
    let inferredPage = 1;

    if (page) {
        if (!isNaN(+page)) {
            inferredPage = +page;
        }
    }

    const count = await Product.countDocuments();

    const products = await Product.find()
        .skip((inferredPage - 1) * 10)
        .limit(10)
        .select("-__v -createdAt -updatedAt -description -reviews");

    const mappedProducts = products.map((p) =>
        p.toJSON({ flattenObjectIds: true })
    );

    return {
        count,
        page: inferredPage,
        products: mappedProducts,
    };
};
```

## Step 16: Fetch data for the Products List page at build time (SSG), and render it at build time

-   Make sure you understand the following code well, especially how it gets created at build time (especially when we run `npm run build`)
    -   Understand how the data it generates is passed as props for the component.
    -   **NOTE**: During client-side navigation to this page, getStaticProps() does not execute again by default. Instead, the previously generated static page with its associated data is served from the cache.
        -   You can regenerate this data periodically using the `revalidate` option passed in the returned object (in addition to props option).
-   `src/app/products/page.tsx`

```tsx
import type { Metadata } from "next";
// import { notFound } from "next/navigation";

import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/data/services/products";
import type { IProduct } from "@/types/Product";

export const metadata: Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default async function ProductsPage() {
  try {
    const { count, page, products }: {
      count: number;
      page: number;
      products: IProduct[];
    } = await getProducts();

    return <ProductsList products={products} count={count} page={page} />;
  } catch (error) {
    // console.error("Failed to load products:", (error as Error).message);
    // Option 1: Render a fallback UI - Graceful Fallback UI that shows up on /products route in the client
    // return <div>Failed to load products. Please try again later.</div>;

    // Option 2: Interrupts rendering and bubbles up to error boundaries
    // go to the closest `error.tsx` boundary (or the root one) - Error page gets access to the error and reset method to retry page rendering and is a client component
    throw new Error("Failed to load products. Please try again later.");
    
    // Option 3
    // trigger the /app/not-found.tsx route (if defined) - Not Found page does not get access to the error and is a server component
    // notFound(); // if you want to mimic `return { notFound: true }`
  }
}
```

-  `app/products/error.tsx` (alternatively you can create `app/error.tsx` for making this available to every page in the application)
```tsx
'use client';

// The error object passed by Next.js often includes a digest (a hashed error signature for debugging)
interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: Props) {
  console.error("Page error:", error);

  return (
    <div>
      <h2>Something went wrong.</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

- Alternatively, if you called `notFound()` (option 3), you can create a `app/products/not-found.tsx` (you can create `app/not-found.tsx` for making this available to every page in the application)
```tsx
export default function NotFoundPage() {
  return (
    <div>
      <h1>Products not found</h1>
      <p>We couldn't load the product list. Please try again later.</p>
    </div>
  );
}
```

-   `src/components/products-list/products-list.tsx` - update it to accept the data and render it

```tsx
import { IProduct } from "@/types/Product";

type Props = {
    count: number;
    page: number;
    products: IProduct[];
};

const ProductsList = ({ products, count, page }: Props) => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-4">List of products</h1>
            <hr className="border-b border-gray-300 mb-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
                {products.map((product) => (
                    <div key={product._id} className="flex items-stretch">
                        <ProductListItem product={product} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProductsList;
```

-   Following usual React JS practice, render a product (item) using a separate component `item.tsx`.
-   We shall be applying additional component styles (for item.tsx) using `src/components/products-list/item/item.module.scss`. For this first install `sass`

```
npm i -D sass
```

-   `src/components/products-list/item/item.module.scss` - Make sure you understand the code.

```scss
.category__container {
    position: relative;

    .category {
        position: absolute;
        top: 0px;
        left: 0px;
        height: 144px;
        width: 144px;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        opacity: 0.75;
        border-radius: 0;
        font-size: 1em;
        transform: rotate(-45deg) translateY(-100px);
        background-color: crimson;
        color: white;
    }
}
```

-   `src/components/products-list/item/item.tsx` - Make sure you understand the code. But before that install `react-icons`
```sh
npm i react-icons
```
```tsx
import { IProduct } from "@/types/Product"
import Link from "next/link"
import Image from "next/image"
import { FaShareAlt } from "react-icons/fa"

import classes from "./item.module.scss";

type Props = {
  product: IProduct
}

const getBgColor = (category: IProduct["category"]) => {
  const categoryBgColorMap = {
    "men's clothing": "bg-olive-600",
    "women's clothing": "bg-blue-600",
    jewelery: "bg-yellow-600",
    electronics: "bg-gray-600",
  }

  return categoryBgColorMap[category] || "bg-gray-400"
}

const ProductListItem = ({ product }: Props) => {
  return (
    <div className="`flex flex-col w-full rounded-md shadow-md overflow-hidden border bg-white ${classes.category__container}`">
      {/* Category Tag */}
      <div className={`text-white text-sm px-3 py-1 ${classes.category} ${getBgColor(product.category)}`}>
        {product.category}
      </div>

      {/* Image */}
      <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={192}
            className="w-full h-48 object-contain p-4"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
        />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <h3 className="text-lg font-medium mb-3 truncate">{product.title}</h3>

        <div className="flex items-center gap-2 text-sm mb-4">
          <span title={product.rating.rate.toFixed(2)}>
            ⭐ {product.rating.rate.toFixed(1)}
          </span>
          <span className="text-gray-500">({product.rating.count} ratings)</span>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          <strong>Price:</strong> ${product.price}
        </p>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex items-center justify-between border-t">
        <button
          aria-label="share"
          className="text-gray-600 hover:text-gray-900 transition"
        >
          <FaShareAlt />
        </button>
        <Link
          href={`/products/${product._id}`}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          KNOW MORE
        </Link>
      </div>
    </div>
  )
}

export default ProductListItem
```

## Step 17: Set up API route to fetch products page-by-page from the client-side

-   We shall set up pagination on the client-side. For that however, our backend must expose relevant APIs to the frontend.
-   APIs are set up in the `src/app/api` folder
-   Such code is server-side code. The methods we shall set up will receive HTTP requests and send HTTP responses.
-   Routing setup for APIs (`src/app/api/` folder) works the same way as client-side pages routing (except we use `route.ts` instead of `page.tsx`)
-   `src/types/api` - Set up the types `IApiResponse`, `IErrorMessage`

```ts
export interface IApiResponse<Message> {
    status: "success" | "error";
    message: Message;
}

export type IErrorMessage = IApiResponse<string>;
```

-   `src/app/api/products/route.ts` - Set up the requests handler like so

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IProduct } from "@/types/Product";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { getProducts } from "@/data/services/products";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const page = pageParam ? Number(pageParam) : 1;

    const {
      count,
      page: inferredPage,
      products,
    } = await getProducts(page);

    const json: IApiResponse<{
      count: number;
      page: number;
      products: IProduct[];
    }> = {
      status: "success",
      message: {
        count,
        page: inferredPage,
        products,
      },
    };

    return NextResponse.json(json);
  } catch (error) {
    const err: IErrorMessage = {
      status: "error",
      message: (error as Error).message,
    };
    return NextResponse.json(err, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    {
      status: "error",
      message: "METHOD=POST not allowed",
    } satisfies IErrorMessage,
    { status: 405 }
  );
}
```

-   Test the `/api/products` API out with Postman or your browser

## Step 18: Fetch products page-by-page from the client-side

-   `src/services/products.ts` - Note that this is **different from** `src/data/services/products.ts`. - We shall set up client-side API services in this new file.

```tsx
import { IProduct } from "../types/Product"

type IGetProductsResponse = {
  status: "success" | "error"
  message: {
    count: number
    page: number
    products: IProduct[]
  }
}

export const getProducts = async (page = 1): Promise<IGetProductsResponse> => {
  // const res = await fetch(`/api/products?page=${page}`)
  
  // NOTE: process.env.NEXT_PUBLIC_SITE_URL -> Needs dev server to be running during build to work. Work around @todo -> SSG in `app/products/page.tsx` needs to fetch from DB service rather than this frontend API service, but yet construct cached response for frontend in this response format - i.e. { status: 'success', message: { count, page, products } }
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products?page=${page}`)

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const data: IGetProductsResponse = await res.json()
  return data
};
```

-   `src/components/products-list/products-list.tsx` - Add support for client-side pagination. We also handle loading state, and show errors in a Snackbar. Most of the Snackbar code is taken from an example on the component in the MUI documentation.

```tsx
'use client';

import { useEffect, useState } from "react"
import { IProduct } from "@/types/Product"
import ProductListItem from "./item/item"
import { getProducts } from "@/services/products"

type Props = {
  count: number
  page: number
  products: IProduct[]
}

const ProductsList = ({ count, page, products }: Props) => {
  const [actualPage, setActualPage] = useState(page)
  const [actualCount, setActualCount] = useState(count)
  const [actualProducts, setActualProducts] = useState(products)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const {
          message: { products, count },
        } = await getProducts(actualPage)
        setActualProducts(products)
        setActualCount(count)
        setError(null)
        setShowError(false)
      } catch (err) {
        setError(err as Error)
        setShowError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [actualPage])

  const totalPages = Math.ceil(actualCount / 10)

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">List of products</h1>
      <hr className="border-b border-gray-300 mb-6" />

      {/* Pagination Controls */}
      <div className="flex justify-center mb-6">
        <nav className="inline-flex rounded-md shadow-sm">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNumber = idx + 1
            return (
              <button
                key={pageNumber}
                onClick={() => setActualPage(pageNumber)}
                className={`px-4 py-2 border text-sm ${
                  actualPage === pageNumber
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
        </div>
      )}

      {/* Error Snackbar */}
      {showError && error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-xl mx-auto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <button
            onClick={() => setShowError(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className="fill-current h-6 w-6 text-red-700"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 001.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
            </svg>
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
          {actualProducts.map((product) => (
            <div key={product._id} className="flex items-stretch">
              <ProductListItem product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList
```

### Optional improvement: Caching data using TanStack Query
You can use __Tanstack Query__ aka __React Query__ to cache data fetched on the client-side
```
npm i @tanstack/react-query
```
- In `src/components/lib/react-query/hydrate-client.tsx`
```tsx
'use client';

import { HydrationBoundary, HydrationBoundaryProps } from '@tanstack/react-query';

type Props = HydrationBoundaryProps & {
  children: React.ReactNode;
};

export default function HydrateClient({ children, ...props }: Props) {
  return <HydrationBoundary {...props}>{children}</HydrationBoundary>;
}
```
- In `src/app/products/page.tsx`, wrap `getProducts()` with React Query - This allows the initial request to be cached and reused by React Query on the client. Then add `dehydratedState` to the returned props. This will help hydrate the TanStack Query cache on the client side in the next step we do. Note that you are no longer using the data services - you are using the same API services as used in the client-side (`@/services/products`)
- __TODO__: Check if this works at build-time if dev server is NOT running, as it hits client-side API service.
```tsx
import { dehydrate, QueryClient } from "@tanstack/react-query";
import HydrateClient from "@/components/lib/react-query/hydrate-client";
import ProductsList from "@/components/products-list/products-list";
import { getProducts } from "@/services/products";
import type { Metadata } from "next";
import type { IProduct } from "@/types/Product";

export const metadata: Metadata = {
  title: "List of products",
  description: "Mantra Store - search through our variety of products.",
};

export default async function ProductsPage() {
  try {
    // SSG with React Query hydration
    const queryClient = new QueryClient();

    // Preload the page=1 data into React Query's cache
    await queryClient.prefetchQuery({
      queryKey: ["products", 1],
      queryFn: () => getProducts(1),
    });

    const {
      products, count, page
    } = await getProducts(1);

    const dehydratedState = dehydrate(queryClient);

    return (
      <HydrateClient state={dehydratedState}>
        <ProductsList products={products} count={count} page={page} />
      </HydrateClient>
    );
  } catch (error) {
    throw new Error("Failed to load products. Please try again later.");
  }
}
```
- In `src/app/layout.tsx` we could then set up the app for rehydrating the cached products data on the client side this way...
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
```
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* If not using Tailwind CSS v4 */}
      {/* <body className={`${roboto.className} antialiased`}> */}
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <MainNavigation />
          <div className="max-w-screen-xl mx-auto mt-12 px-4">
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
```
- __IMPORTANT__: Wrapping part of your app in a client component is fine, but making your `RootLayout` a client component forces everything below it to hydrate (makes everything within a client component)
- Since it is a bad idea to make `RootLayout` a client component, we implement the hydration setup differently.
- In `src/components/lib/providers/providers.tsx`
```tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```
- In `app/layout.tsx`
```tsx
// IMPORTANT: No more a client component
// 'use client';

import { ReactNode } from 'react';
import type { Metadata } from "next";
import MainNavigation from "@/components/main-navigation/main-navigation";
// This instead is a client component
import Providers from '@/components/lib/providers/providers';
```
```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* If not using Tailwind CSS v4 */}
      {/* <body className={`${roboto.className} antialiased`}> */}
      <body className="antialiased">
        <Providers>
          <MainNavigation />
          <div className="max-w-screen-xl mx-auto mt-12 px-4">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
```
- In `hooks/useProducts.ts`
```ts
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products";

export const useProducts = (page: number = 1) => {
    return useQuery({
        queryKey: ["products", page],
        queryFn: () => getProducts(page),
        staleTime: 1000 * 60 * 5, // Optional: 5 minutes cache
    });
};
```
- Then in `src/components/products-list/products-list.tsx` do this.
    - This uses SSG data for page 1 immediately.
    - Switches to React Query fetching for subsequent page changes.
    - Avoids flickering or redundant fetch on initial page load.
```tsx
'use client';

import { useEffect, useState } from "react"
import { useProducts } from "@/hooks/useProducts"
import { IProduct } from "@/types/Product"
import ProductListItem from "./item/item"

type Props = {
  count: number
  page: number
  products: IProduct[]
}

const ProductsList = ({ count, page, products }: Props) => {
  const [actualPage, setActualPage] = useState(page)
  const [actualProducts, setActualProducts] = useState(products)
  const [actualCount, setActualCount] = useState(count)
  const [showError, setShowError] = useState(false)

  const { data, isLoading, error } = useProducts(actualPage)

  useEffect(() => {
    if (actualPage !== page && data?.message) {
      setActualProducts(data.message.products)
      setActualCount(data.message.count)
    }
  }, [actualPage, data, page])

  const totalPages = Math.ceil(actualCount / 10)

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">List of products</h1>
      <hr className="border-b border-gray-300 mb-6" />

      {/* Pagination Controls */}
      <div className="flex justify-center mb-6">
        <nav className="inline-flex rounded-md shadow-sm">
          {[...Array(totalPages)].map((_, idx) => {
            const pageNumber = idx + 1
            return (
              <button
                key={pageNumber}
                onClick={() => setActualPage(pageNumber)}
                className={`px-4 py-2 border text-sm ${
                  actualPage === pageNumber
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Loading Spinner (only when changing pages) */}
      {actualPage !== page && isLoading && (
        <div className="flex justify-center my-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600" />
        </div>
      )}

      {/* Error Snackbar */}
      {showError && error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 max-w-xl mx-auto">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error.message}</span>
          <button
            onClick={() => setShowError(false)}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <svg
              className="fill-current h-6 w-6 text-red-700"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 00-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 001.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
            </svg>
          </button>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && actualProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-4 gap-x-6">
          {actualProducts.map((product) => (
            <div key={product._id} className="flex items-stretch">
              <ProductListItem product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductsList
```

- Now the duplicate fetching of products is prevented after the list renders for the first time on the client (keep the network tab open on page load and check for outgoing requests).

__NOTE__: When navigating back to page 1, the API call does not go out now. It happens because `actualPage` is `1` when we navigate back to page `1`. Now the condition within the effect function ends up preventing the API call. To overcome this we can use a ref to track the first render.
```tsx
import { useEffect, useState, useRef } from "react"
```
```tsx
const initialRender = useRef(true);

useEffect(
  () => {
    if ((!initialRender.current || actualPage !== page) && data?.message) {
        setActualProducts(data.message.products)
        setActualCount(data.message.count)
    }

    initialRender.current = false;
  },
  [actualPage, data, page]
)
```
- Check the network tab - you will see that once you visit a page, the network request to fetch data does not go out when you visit the page once again. TanStack Query's caching at work!

### Optional improvement:  Sync actualPage to the URL (query params) for deep linking and SEO
- In `src/components/products-list/products-list.tsx`
```tsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
```
- Extract page parameter and set `actualPage` based on it
```tsx
const router = useRouter();
const searchParams = useSearchParams();

const pageParam = searchParams.get('page');
const actualPage = useMemo(() => {
  const num = parseInt(pageParam ?? '1', 10);
  return isNaN(num) ? 1 : num;
}, [pageParam]);
```
- Update URL query param on page change
```tsx
const updatePage = (newPage: number) => {
  const newParams = new URLSearchParams(searchParams.toString());
  newParams.set('page', String(newPage));
  router.push(`?${newParams.toString()}`);
};
```
- Update the pagination handling
```tsx
<button
  key={pageNumber}
  onClick={() => updatePage(pageNumber)}
  className={`px-4 py-2 border text-sm ${
    actualPage === pageNumber
      ? 'bg-blue-600 text-white border-blue-600'
      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
  }`}
>
  {pageNumber}
</button>
```

__NOTE__: Right now, the backend is not handling query string parameters and the SSG-rendering always renders page 1 of products. This has to be taken care of.

## Step 19: Create the Product Details page

-   `src/pages/products/[id]/index.tsx` (`ProductDetailsPage`) - This defines the `/products/[id]` route where `[id]` is a placeholder for any product's id. Note that we can also create it as `[id].tsx` if we do not plan to have any paths building on this one.
-   This component shall also render at build time (SSG), and hence needs the product details.
-   `src/data/services/products.ts` - Define the service method to get a product's details

```ts
export const getProductById = async (_id: string) => {
    const product = await Product.findById(_id);
    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });

    return {
        ...product.toJSON({ flattenObjectIds: true }),
        reviews: serializedProductReviews,
    };
};
```

-   `src/components/product-detail/product-detail.tsx` - The component rendered by the `ProductDetailsPage`

```tsx
import { IProduct } from "@/types/Product"
import Image from "next/image"

type Props = {
  productId: string | undefined
  product: IProduct
}

const ProductDetail = ({ productId, product }: Props) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {/* Image Section */}
        <div className="flex justify-center p-4">
          <Image
            src={product.image}
            alt={product.title}
            width={320}
            height={240}
            className="object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-semibold">{product.title}</h1>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span title={product.rating.rate.toFixed(2)}>⭐ {product.rating.rate.toFixed(1)}</span>
            <span>({product.rating.count} people rated)</span>
          </div>

          <p className="text-lg text-gray-800">
            <strong>Price:</strong> ${product.price}
          </p>

          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
```

-   `src/pages/products/[id]/index.tsx` - The page component. Note the comment on `useRouter()` hook, and the usage of `params` argument passed to `getStaticProps()` to get the value of the dynamic params (`id`). Also note the usage of `revalidate` prop to periodically regenerate this SSG page (every 60 seconds).

```tsx
import Head from "next/head";
import { GetStaticPropsContext } from "next";

import ProductDetail from "@/components/product-detail/product-detail";
import { getProductById } from "@/data/services/products";
import { IProduct } from "@/types/Product";

// import { useRouter } from 'next/router';

type Props = {
    id: string;
    product: IProduct;
};

const ProductDetailPage = ({ id, product }: Props) => {
    // NOTE: The useRouter() hook can be used to get params information on the client-side. We shall use this in future.
    // const router = useRouter();

    // console.log(router.pathname);
    // console.log(router.query);

    // const id = router.query.id as string;

    return (
        <>
            <Head>
                <title>{product?.title || "Product details"}</title>
                <meta name="description" content={product?.description || ""} />
            </Head>
            <ProductDetail productId={id} product={product} />
        </>
    );
};

export const getStaticProps = async (
    context: GetStaticPropsContext<{ id: string }>
) => {
    const { params } = context;
    const id = params?.id as string;

    return {
        props: {
            id: id,
            product: await getProductById(id),
        },
        revalidate: 60,
    };
};

export default ProductDetailPage;
```

-   However after this step we get this error in the browser when visiting the product details page

```
Runtime Error
Error: getStaticPaths is required for dynamic SSG pages and is missing for '/products/[id]'.
Read more: https://nextjs.org/docs/messages/invalid-getstaticpaths-value
```

-   For dynamic routes, Next JS does not know what params (`id` values) exist. It will be unable to generate the pages without the information regarding all possible id values (or at least the ones which are treated as "relevant" enough so as to generate their product detail pages at build time - for example a set of "featured" products).
    -   To overcome this problem, Next JS requires us to define a `getStaticPaths()` function as well for pages with dynamic params.
-   `src/data/services/products.ts` - Add the service method that returns list of all product ids (at least the ones considered relevant for SSG).

```tsx
export const getProductsIds = async () => {
    const products = await Product.find().select("_id");
    return products.map((p) => p._id.toString());
};
```

-   `src/pages/products/[id]/index.tsx` - Add `getStaticPaths()`

```tsx
// import getProductsIds as well now
import { getProductById, getProductsIds } from "@/data/services/products";

// ...component code, getStaticProps() code

export const getStaticPaths = async () => {
    const ids = await getProductsIds();
    return {
        paths: ids.map((id) => {
            return {
                params: { id: id },
            };
        }),
        fallback: true,
    };
};
```

## Step 20: Create a `ProductReviews` component to render below Product details (on `/products/[id]`), and an `AddReview` component to render below it on `/products/[id]/addreview`

-   The `ProductDetail` component shows on top for both routes, but what shows below it changes (either `ProductReviews` or `AddReview`)
-   One way to achieve this is using Dynamic routes which match any number of params - this is indicated by naming the file as `[...id]` instead of `[id]`. We start by creating the 2 new components though.
-   `src/components/product-details/product-reviews/product-reviews.tsx` - Create `ProductReviews` component
    -   Create a basic component (left as an exercise)
-   `src/components/product-details/add-review/add-review.tsx` - Create `AddReview` component
    -   Create a basic component (left as an exercise)
-   `src/pages/products/[_id]/index.tsx` -> Update its name to `src/pages/products/[...id]/index.tsx`
-   Now change the code within the same file to work with array params `id` instead of a single param.

```tsx
// type of id is string[] because of the "catch all" dynamic route [...id]
export const getStaticProps = async (
    context: GetStaticPropsContext<{ id: string[] }>
) => {
    const { params } = context;
    const id = params?.id as string[]; // an array of strings

    return {
        props: {
            id: id,
            product: await getProductById(id[0]), // extract the first param which is the product id
        },
        revalidate: 60,
    };
};

export const getStaticPaths = async () => {
    const ids = await getProductsIds();
    return {
        paths: ids.map((id) => {
            return {
                // returns an array of paths with params
                params: { id: [id] },
            };
        }),
        fallback: true,
    };
};
```

-   `src/components/product-detail/product-detail.tsx` - Use the `useRouter()` hook to get the value of `id[1]`. Use it to decide which component to show.

```tsx
// ...other imports
import { useRouter } from "next/router";

import ProductReviews from "./product-reviews/product-reviews";
import AddReview from "./add-review/add-review";

// ...other code

const ProductDetail = ({ productId, product }: Props) => {
    const router = useRouter();

    const idRouter = router.query.id as string[];

    if (!idRouter) {
        return <div>Loading...</div>;
    }

    let el;

    if (idRouter[1] === undefined) {
        el = <ProductReviews />;
    } else if (idRouter[1] !== "addreview") {
        el = <div>Something went wrong</div>;
    } else {
        el = <AddReview />;
    }

    return (
        <div>
            <div className="bg-white shadow-md rounded-lg p-6">{/* UI as before */}</div>

            <div className="mt-6">{el}</div>
        </div>
    );
};
```

-   You will need to manually add `/addreview` at the end of the product details URL to see the component change.

## Step 21: Render product reviews

-   `src/components/product-detail/product-reviews/product-reviews.tsx`

```tsx
import { IReview } from "@/types/Product"

type Props = {
  productId: string | undefined
  reviews: IReview[]
}

const ProductReviews = ({ productId, reviews }: Props) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews yet. Be the first one to add a review!</p>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <ul className="space-y-6">
        {reviews.map((review) => (
          <li key={review._id} className="flex items-start space-x-4">
            {/* Avatar */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              {review.username.substring(0, 1).toUpperCase()}
            </div>

            {/* Review content */}
            <div className="flex-1 space-y-2">
              <div className="text-sm text-gray-500">{new Date(review.date).toDateString().substring(0,10)}</div>

              {/* Simple rating stars using emoji (or swap with custom SVG if desired) */}
              <div className="flex items-center text-yellow-500 text-sm">
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>

              <p className="text-gray-800">{review.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductReviews
```

-   `src/components/product-detail/product-detail.tsx` - Make changes to pass the props that ProductReviews now expects

```tsx
if (idRouter[1] === undefined) {
    el = <ProductReviews productId={productId} reviews={product.reviews} />;
}
```

-   You can now see the product reviews displayed below the product details

## Step 22: Render a button to navigate to `/products/[id]/addreview`

-   Ideally we can do this using a Next JS Link. However, just for the purpose of learning how to navigate programatically, we do it using the router's `push()` method
-   `src/components/product-detail/product-reviews/product-reviews.tsx` - Add a button with a click handler that when invoked uses the router's `push()` method for navigation

```tsx
import { useRouter } from "next/router";

// ...code

const ProductReviews = ({ productId, reviews }: Props) => {
    const router = useRouter();
    const id = router.query.id as string[];

    const navigateToAddReview = () => {
        router.push(`/products/${id[0]}/addreview`);
    };

    // ...code

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <button
                onClick={navigateToAddReview}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded my-6"
            >
                Add Review
            </button>
            {/* more UI */}
        </div>
    );
};
```

## Step 23: Adding `/auth` to show login page

-   Further steps like adding review, adding product, adding product to cart requires a user to be authenticated. We can implement authentication using JWT using jsonwebtoken library ourselves, but Next JS apps usually implement authentication/authorization using `next-auth`. We also install bcryptjs as this is needed for password hashing.

```
npm i --force next-auth bcryptjs @types/bcryptjs
```

-   We start by building the login/register page to be shown on `/auth`
-   `src/components/auth/auth-form.tsx`

```tsx
import { useState } from "react"

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h1>

      <form className="space-y-4">
        {!isLogin && (
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              required
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full max-w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <button
            type="button"
            onClick={switchAuthModeHandler}
            className="w-full text-blue-600 hover:underline text-sm"
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
```

-   `src/pages/auth/index.tsx` - Create the page component that shows the auth form

```tsx
import Head from "next/head";

import AuthForm from "@/components/auth/auth-form";

export default function AuthPage() {
    return (
        <>
            <Head>
                <title>Login/Register | Mantra Store</title>
                <meta
                    name="description"
                    content="Login / Register with Mantra Store"
                />
            </Head>

            <AuthForm />
        </>
    );
}
```

## Step 24: Make modifications to the main navigation to show new items based on whether user is logged in or not

-   `src/components/main-navigation/main-navigation`

```tsx
import { useState } from "react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const authenticatedUserMenu = [
  { href: "/profile", text: "Profile" },
  { href: "/logout", text: "Logout" },
]

const unauthenticatedUserMenu = [
  { href: "/auth", text: "Login/Register" },
]

export default function ResponsiveAppBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  const toggleUserMenu = () => setUserMenuOpen(!userMenuOpen)

  const handleUserMenuClick = (href: string) => {
    setUserMenuOpen(false)
    router.push(href)
  }

  return (
    <header className="bg-gray-900 text-white relative z-20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-wide uppercase hidden md:block">
          Mantra
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/products/add" className="hover:underline">
            Add a Product
          </Link>

          {/* Right Auth Avatar */}
          <div className="relative">
            <button
              onClick={toggleUserMenu}
              className="ml-4 rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center text-sm font-bold"
            >
              {session?.user?.email?.charAt(0).toUpperCase() || "U"}
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1">
                {(status === "authenticated" ? authenticatedUserMenu : unauthenticatedUserMenu).map((item) => (
                  <button
                    key={item.text}
                    onClick={() => handleUserMenuClick(item.href)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 text-white px-4 py-2 space-y-2">
          <Link
            href="/products"
            className="block w-full text-left hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Products
          </Link>
          <Link
            href="/products/add"
            className="block w-full text-left hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Add a Product
          </Link>
        </div>
      )}
    </header>
  )
}
```
- `src/pages/_app.tsx` - In order to use `useSession`, we need to wrap the application in a `SessionProvider` 
```tsx
import { SessionProvider } from "next-auth/react"
```
```tsx
<SessionProvider session={pageProps.session}>
    <QueryClientProvider client={queryClient}>
    {/* rest of UI */}
    </QueryClientProvider>
</SessionProvider>
```

## Step 25: Set up the User model, and DB services to register a user

-   `src/types/User.ts` - Set up the Types required to set up the User model using Mongoose. Since the `User` documents also store the cart for the user (array of cart items), we will define how a cart item looks like.

```ts
export interface IUserCartItem {
    productId: string;
    quantity: number;
}

export interface IUser {
    email: string;
    username: string;
    password: string;
    role?: "customer" | "admin";
    cart?: IUserCartItem[];
}
```

-   `src/data/models/User.ts` - Set up a User model

```ts
import mongoose from "mongoose";
import { IUserCartItem, IUser } from "@/types/User";

export const CartItem = new mongoose.Schema<IUserCartItem>({
    productId: {
        type: String,
        required: true,
        unique: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
});

export const schema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["customer", "admin"],
        default: "customer",
    },
    cart: {
        type: [CartItem],
        default: [],
    },
});

if (!mongoose.modelNames().includes("User")) {
    mongoose.model<IUser>("User", schema);
}
```

-   `src/data/services/auth.ts` - Define a service method to register a new user

```ts
import mongoose from "@/data/init";
import { IUser } from "@/types/User";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

export const register = async (user: IUser) => {
    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        user.password = hashedPassword;

        const registeredUser = await User.create(user);
        const serializedUser = registeredUser.toJSON({
            flattenObjectIds: true,
        });

        delete serializedUser.password;
        delete serializedUser.cart;

        return serializedUser;
    } catch (error) {
        if ((error as any).code === 11000) {
            throw new Error("User already exists");
        }

        throw error;
    }
};
```

-   `src/data/init.ts` - Register the User model by running the model file

```ts
import "./models/User";
```

## Step 26: Create the register API route

-   `src/pages/api/auth/register.ts` - Set up the API to register a new user

```tsx
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { IUser } from "@/types/User";
import { IApiResponse, IErrorMessage } from "@/types/api";
import { register } from "@/data/services/auth";

const handler: NextApiHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<IApiResponse<IUser> | IErrorMessage>
) => {
    const { method } = req;

    switch (method) {
        case "POST":
            const user = req.body;

            try {
                const registeredUser = await register(user);
                return res.status(201).json({
                    status: "success",
                    message: registeredUser,
                });
            } catch (error) {
                return res.status(500).json({
                    status: "error",
                    message: (error as Error).message,
                });
            }
        default:
            return res.status(405).json({
                status: "error",
                message: `METHOD=${method} not allowed`,
            });
    }
};

export default handler;
```

## Step 27: Set up frontend service for registration and consume it in the auth-form to enable registration

-   `src/types/User.ts` - Add the following types

```tsx
export type IRegister = Pick<IUser, "email" | "username" | "password">;

export type ICredentials = Pick<IUser, "email" | "password">;
```

-   `src/services/auth.ts` - Set up the service method for registration from the frontend. If you ahve not installed axios, do so first
```ts
npm i axios
```

```ts
import { ICredentials, IRegister } from "@/types/User";
import axios from "axios";

type IRegisterResponse = {
    status: "success" | "error";
    message: {
        email: string;
        role: "customer" | "admin";
    };
};

export const register = async (credentials: IRegister) => {
    const response = await axios.post<IRegisterResponse>(
        `/api/auth/register`,
        credentials,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
```

-   `src/components/auth/auth-form.tsx` - Make the API call when a new user tries to register

-   Import the service

```tsx
import { register } from "@/services/auth";
```

-   Add the following method in the compoent

```tsx
async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
        // registration
        if (!isLogin) {
            await register({ email, username, password });
            alert(username + " registered successfully");
            setIsLogin(true);
            return;
        }
    } catch (error) {
        alert((error as Error).message);
    }
}
```

-   Set it up as the form submit event handler

```tsx
<form onSubmit={submitHandler}>{/* for ui */}</form>
```

-   With this a user should be able to create a new account

## Step 28: Create login and other API endpoints using Next Auth

- In `.env` - Add JWT secret key
```
NEXTAUTH_SECRET=super_secret_mantra
```

-   `src/types/User.ts` - Add the following interface

```tsx
export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}
```

-   `src/pages/api/auth/[...nextauth].ts` - Setup API routes for auth through Next Auth

```tsx
import NextAuth, {
    Account,
    AuthOptions,
    Session,
    User as NextAuthUser,
} from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import mongoose from "@/data/init";
// import { ICredentials } from "@/types/User";

const User = mongoose.model("User");

console.log("User", User);

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (
                    !credentials ||
                    !credentials.email ||
                    !credentials.password
                ) {
                    throw new Error("Missing email or password");
                }

                const { email, password } = credentials;

                const user = await User.findOne({ email });

                if (!user) {
                    throw new Error("User not found");
                }

                const isPasswordValid = await bcrypt.compare(
                    password,
                    user.password
                );

                if (!isPasswordValid) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    username: user.username,
                    role: user.role,
                    name: user.username,
                    image: null,
                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 30,
    },

    callbacks: {
        async jwt({
            token,
            user,
            account,
        }: {
            token: JWT;
            user?: NextAuthUser;
            account?: Account | null;
        }): Promise<JWT> {
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },

        async session({
            session,
            token,
        }: {
            session: Session;
            token: JWT;
        }): Promise<Session> {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.username = token.username as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);
```

## Step 29: Implement login in the frontend

-   `src/components/auth/auth-form.tsx`
-   Add the necessary imports

```tsx
import { signIn } from "next-auth/react"
import { useRouter } from "next/router"
```

-   Get the router for programmatic navigation. Add the code to handle login.

```tsx
function AuthForm() {
    const router = useRouter();

    // ...more code

    async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            // registration
            // ...code handling registration

            // login
            if (isLogin) {
                try {
                  // login
                  const result = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                  })

                  if (result?.ok && !result.error) {
                    router.push("/products")
                  } else {
                    alert("Login failed")
                  }
                } catch (error) {
                  alert((error as Error).message)
                }
            }
        } catch (error) {
            alert((error as Error).message);
        }
    }

    // ...more code
}
```

-   You will find yourself redirected to /products on successful login. Observe the changes in the main navigation as well.

## Step 30: Handling logout

-   `src/components/main-navigation/main-navigation.tsx`
-   Add the necessary imports

```tsx
import { useSession, signOut } from "next-auth/react"
```

-   Make code changes to handle click of "Logout"

```tsx
const { data: session, status } = useSession()
const router = useRouter()

const handleCloseUserMenu = async (event: React.MouseEvent, href?: string) => {
  event.preventDefault();

  setUserMenuOpen(false)
  setAnchorElUser(null)

  console.log('href=', href);

  if (!href) return

  if (href === "/logout") {
    await signOut({
      callbackUrl: "/auth",
    })
    // window.location.href = "/auth
  } else {
    router.push(href)
  }
}
```
```tsx
{userMenuOpen && (
  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-1">
    {(status === "authenticated" ? authenticatedUserMenu : unauthenticatedUserMenu).map((item) => (
      <Link
        href={item.href}
        key={item.text}
        onClick={(event) => {
          handleCloseUserMenu(event, item.href);
          // handleUserMenuClick(item.href);
        }}
        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
      >
        {item.text}
      </Link>
    ))}
  </div>
)}
```

## Step 31: Preventing navigation to login page once logged in

-   `src/components/auth/auth-form.tsx`
-   Add the necessary imports

```tsx
import { useState, useEffect } from "react";
import { signIn, getSession } from "next-auth/react";
```

-   Add this code just before your return the form UI

```tsx
// prevent navigation to this page if session exists
const [isLoading, setIsLoading] = useState(true)

useEffect(() => {
  getSession().then((session) => {
    if (session) {
      // bad but a temporray fix for router.push() giving problems
      window.location.href = "/profile"
    } else {
      setIsLoading(false)
    }
  })
}, [])

if (isLoading) {
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      Loading...
    </div>
  )
}

// return the actual form UI
// ...
```
### Step 32: Adding `change-password` API route, and the profile page which enables user to change password in the frontend

-   `src/pages/api/auth/change-password.ts`- Setup as API route to change password (just like user registration, such user management functions are not part of Next Auth)
-   **Note**: This API is protected (user needs to be authentcated in order to use this API). Such API protection is enabled using getSession() of Next Auth - yes, this method works on the client-side as well as the server-side.

```tsx
import mongoose from "@/data/init";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import bcrypt from "bcryptjs";

const User = mongoose.model("User");

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PATCH") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const session = await getServerSession(req, res, authOptions);

    if (!session) {
        return res.status(401).json({ message: "Not authenticated!" });
    }

    const email = session.user?.email;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid password!" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await User.findOneAndUpdate({ email }, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: "An error occurred!" });
    }
}

export default handler;
```

-   `src/services/auth.ts` - Add a frontend API service method used to call this API. Note that the necessary type was created earlier as part of another unrelated step.

```tsx
import { IChangePassword } from "@/types/User";
import axios from "axios";

type IChangePasswordResponse = {
    message: string;
};

export async function changePassword(passwordData: IChangePassword) {
    const response = await axios.patch<IChangePasswordResponse>(
        "/api/auth/change-password",
        passwordData,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
}
```

-   `src/components/profile/profile-form.tsx`

```tsx
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { getSession } from "next-auth/react"
import { changePassword } from "@/services/auth"

export default function ProfileForm() {
  const router = useRouter()

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/auth")
      } else {
        setIsLoading(false)
      }
    })
  }, [router])

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    try {
      await changePassword({ oldPassword, newPassword })
      setOldPassword("")
      setNewPassword("")
      alert("Password has been updated")
    } catch (error) {
      alert("Password has not been updated")
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen px-4">
        Loading...
      </div>
    )
  }

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-6 text-center">Change Password</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="oldPassword" className="block text-sm font-medium mb-1">
            Old Password
          </label>
          <input
            required
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium mb-1">
            New Password
          </label>
          <input
            required
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Change password
          </button>
        </div>
      </form>
    </section>
  )
}
```

-   `src/pages/profile/index.tsx` - Create the page component that renders the profile form component

```tsx
import Head from "next/head";
import ProfileForm from "@/components/profile/profile-form";

const ProfilePage = () => {
    return (
        <>
            <Head>
                <title>My profile</title>
                <meta name="description" content="User profile information" />
            </Head>

            <ProfileForm />
        </>
    );
};

export default ProfilePage;
```

-   An additional way to prevent navigation to a route is via `getServerSideProps()` that checks if the request is associated with a session, and if not, prevents navigation to the profile page. If you implement this, you can remove the corresponding check (that uses `loading` and `getSession()` inside a `useEffect()`).
-   `src/pages/profile.tsx`
-   Add the necessary imports

```tsx
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]"
import { GetServerSidePropsContext } from "next"
```

-   Add session check in `getServerSideProps()`

```tsx
// NOTE: This is the server-side alternative to the useEffect() to protect the /profile route in the Profile component
export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: "/auth",
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
```
```tsx
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    }
  }

  return {
    props: { session },
  }
}
```

## Step 33: Adding a review

-   `src/data/services/reviews.ts` - Backend service to add a review for a product with given `_id`

```ts
import mongoose from "@/data/init";
import { IReview } from "@/types/Product";

const Product = mongoose.model("Product");

export const createReview = async (_id: string, review: IReview) => {
    const product = await Product.findByIdAndUpdate(
        _id,
        {
            $push: {
                reviews: review,
            },
        },
        { new: true }
    );

    const serializedProductReviews = product.reviews.map((review: any) => {
        return {
            ...review.toJSON({ flattenObjectIds: true }),
            date: review.date.toString(),
        };
    });
    return serializedProductReviews.reviews;
};
```

-   `src/pages/api/products/[id]/reviews.ts` - Add API for adding a review for a product with given `id`. Note how we protect this API using `getSession()`

```ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { IProduct } from "@/types/Product"
import { IApiResponse, IErrorMessage } from "@/types/api"
import { createReview } from "@/data/services/reviews"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]"

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse<IProduct> | IErrorMessage>
) => {
  const { method } = req

  switch (method) {
    case "POST": {
      const session = await getServerSession(req, res, authOptions)

      if (!session) {
        return res.status(401).json({
          status: "error",
          message: "Not authenticated!",
        })
      }

      try {
        const _id = req.query.id as string
        const review = req.body

        review.username = session.user?.email
        review.date = new Date().toISOString()

        const reviews = await createReview(_id, review)

        return res.status(201).json({
          status: "success",
          message: reviews,
        })
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: (error as Error).message,
        })
      }
    }

    default:
      return res.status(405).json({
        status: "error",
        message: `METHOD=${method} not allowed`,
      })
  }
}

export default handler
```

-   `src/services/reviews.ts`

```ts
import axios from "axios";
import { IReview } from "../types/Product";

type IPostReviewResponse = {
    status: "success" | "error";
    message: IReview[];
};

export const postReview = async (
    productId: string,
    review: Partial<IReview>
) => {
    const response = await axios.post<IPostReviewResponse>(
        `/api/products/${productId}/reviews`,
        review,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};
```

-   `src/components/product-details/add-review/add-review.tsx`

```tsx
import { useState } from "react"
import { useRouter } from "next/router"
import { postReview } from "@/services/reviews"

type Props = {
  productId: string | undefined
}

const AddReview = ({ productId }: Props) => {
  const router = useRouter()

  const [rating, setRating] = useState(0)
  const [text, setText] = useState("")

  const handleAddReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
        if( typeof productId === 'string' ) {
            await postReview(productId, { rating, text })
            router.push(`/products/${productId}`)
        }
    } catch (error) {
        alert(`Failed to add review: ${(error as Error).message}`)
    }
  }

  return (
    <div className="bg-white p-6 rounded-md shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold text-gray-800">Add a review</h2>
      <hr className="my-4 border-gray-300" />

      <form onSubmit={handleAddReview} className="space-y-4">
        {/* Star Rating */}
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className={`text-2xl ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              aria-label={`${star} star`}
            >
              ★
            </button>
          ))}
        </div>

        {/* Text Field */}
        <div>
          <textarea
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Add review
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddReview
```

-   `src/components/product-detail/product-detail.tsx` Pass on the `productId` prop to `AddReview`

```tsx
el = <AddReview productId={idRouter[0]} />;
```

## Step 34: Create backend services to get User's cart, update cart

-   `src/data/services/cart.ts`

```tsx
import mongoose from "@/data/init";
import { IUserCartItem } from "@/types/User";

const User = mongoose.model("User");
const Product = mongoose.model("Product");

export const getCart = async (email: string) => {
    const data = await User.findOne({ email });

    const cart = data.cart;

    const productIds = cart.map(
        (cartItem: IUserCartItem) => cartItem.productId
    );

    const products = await Product.find({
        _id: {
            $in: productIds,
        },
    }).select("_id title price image");

    const returnedCart = data.cart.map((cartItem: IUserCartItem) => {
        const product = products.find(
            (p) => (p as any)._id.toString() === cartItem.productId
        );

        return {
            product: {
                _id: product._id?.toString() || "",
                title: product.title || "",
                price: product.price || "",
                image: product.image || "",
            },
            quantity: cartItem.quantity,
        };
    });

    return returnedCart;
};

export const updateCart = async (email: string, cart: IUserCartItem) => {
    const data = await User.findOneAndUpdate(
        { email },
        {
            cart: cart,
        },
        { new: true }
    );
    const dataJson = data.toJSON({ flattenObjectIds: true });
    delete dataJson.password;

    return dataJson.cart;
};
```

## Step 35: Define API routes to work with the cart (get cart, update cart)

-   `src/pages/api/cart/index.ts`

```tsx
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

import { getCart, updateCart } from "@/data/services/cart"

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { method } = req

  const session = await getServerSession(req, res, authOptions)

  if (!session || !session.user) {
    return res.status(401).json({ message: "Not authenticated!" })
  }

  const email = session.user.email as string

  switch (method) {
    case "GET":
      try {
        const cart = await getCart(email)
        return res.status(200).json({
          status: "success",
          message: {
            cart,
          },
        })
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: (error as Error).message,
        })
      }

    case "PUT":
      try {
        const updatedCart = await updateCart(email, req.body)
        return res.status(200).json({
          status: "success",
          message: {
            cart: updatedCart,
          },
        })
      } catch (error) {
        return res.status(500).json({
          status: "error",
          message: (error as Error).message,
        })
      }

    default:
      return res.status(405).json({
        status: "error",
        message: `METHOD=${method} not allowed`,
      })
  }
}

export default handler
```

## Step 36: Define frontend service methods to work with the cart API (get cart, update cart)

-   `src/types/Cart.ts` - Define the `ICartItem` type to go with this service

```tsx
import { IProduct } from "./Product";

export interface ICartItem {
    product: string | IProduct;
    quantity: number;
}
```

-   `src/services/cart.ts`

```tsx
import axios from "axios";
import { ICartItem } from "@/types/Cart";

type IGetOrPutCartResponse = {
    status: "success" | "error";
    message: {
        cart: ICartItem[];
    };
};

export const getCart = async () => {
    const response = await axios.get<IGetOrPutCartResponse>(`/api/cart`);
    return response.data;
};

export const updateCart = async (
    cart: { productId: string; quantity: number }[]
) => {
    const response = await axios.put<IGetOrPutCartResponse>(`/api/cart`, cart, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
```

## Step 37: Define a context object to share cart information in the app

-   `src/context/shopping-cart.tsx`

```tsx
import { createContext, useContext } from "react";
import { ICartItem } from "@/types/Cart";

const CartContext = createContext({
    cart: [] as any[],
    changeQuantity: (productId: string | undefined, quantity: number) => {},
    setCart: (cart: ICartItem[]) => {},
});

export const CartProvider = CartContext.Provider;

export const useCart = () => useContext(CartContext);
```

## Step 38: Set up the context provider

-   The `src/pages/_app.tsx` wraps the complete app's UI, and is a good place to maintain the cart state and provide to the entire application using the shopping-cart context
-   In `src/pages/_app.tsx`
-   Add the necessary imports

```tsx
import { useState } from "react";
import { CartProvider } from "@/context/shopping-cart";
import { updateCart } from "@/services/cart";
```

-   Define the state maintaining the shopping cart and methods to make changes to this state. Gather all the information to be shared into a value object

```tsx
const [cart, setCart] = useState<any>([]);

const changeQuantity = async (
    productId: string | undefined,
    quantityToAdd: number
) => {
    if (!productId) {
        return;
    }

    let newCart = [...cart];

    const index = newCart.findIndex((item) => item.productId === productId);

    if (index >= 0) {
        newCart[index] = {
            ...newCart[index],
            quantity: newCart[index].quantity + quantityToAdd,
        };
    } else {
        newCart.push({ productId: productId, quantity: quantityToAdd });
    }

    newCart = newCart.filter((item) => item.quantity > 0);

    const cartToSend = newCart.map((item) => {
        return {
            productId: item.product ? item.product._id : item.productId,
            quantity: item.quantity,
        };
    });

    const response = await updateCart(cartToSend);

    const updatedCart = response.message.cart;

    setCart(updatedCart);

    return updatedCart;
};

const value = {
    cart,
    changeQuantity,
    setCart,
};
```

-   Share the shopping cart value using the shopping cart context object

```tsx
<HydrationBoundary state={pageProps.dehydratedState}>
  <CartProvider value={value}>
    <Layout>
      {/* rest of UI */}
    </Layout>
  </CartProvider>
</HydrationBoundary>
```

## Step 39: Populate the shopping cart from within the main navigation component, when user logs in

-   `src/components/main-navigation/main-navigation.tsx`
-   Add the necessary imports

```tsx
import { FaShoppingCart } from "react-icons/fa"
import { useCart } from "@/context/shopping-cart";
import { getCart } from "@/services/cart";
import { useEffect } from "react";
```

-   Update the shopping cart when user logs in

```tsx
// required values from the shopping cart context
const { cart, setCart } = useCart();

// Fetch the cart on page load, and every time user logs in (session value changes and is set)
useEffect(() => {
    const fetchCart = async () => {
        const data = await getCart();
        console.log("fetchCart data in main-navigation = ", data);
        setCart(
            data.message.cart.map((item) => {
                return {
                    productId: item.product._id,
                    product: item.product,
                    quantity: item.quantity,
                };
            })
        );
    };

    if (session) {
        fetchCart();
    }
}, [session, setCart]);
```

-   Add the shopping cart icon (which shows the cart status) before the user Avatar

```tsx
<div className="flex items-center">
  {/* Cart Icon */}
  {session && status === "authenticated" && (
    <div
      className="relative mr-6 cursor-pointer"
      onClick={(event) => handleCloseUserMenu(event, "/cart")}
      aria-label="Go to cart"
    >
      <FaShoppingCart className="text-white text-xl" />
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {cart.length}
        </span>
      )}
    </div>
  )}

  {/* Avatar Button */}
  <button
    onClick={toggleUserMenu}
    className="ml-4 rounded-full bg-gray-700 w-8 h-8 flex items-center justify-center text-sm font-bold"
  >
    {session?.user?.email?.charAt(0).toUpperCase() || "U"}
  </button>
</div>
```

-   You should see the number of items in the user's shopping cart when the user logs in

## Step 40: Add a cart icon on list page items, through which user can add to the cart

-   `src/components/products-list/items/item.tsx`
-   Add the necessary imports

```tsx
import { useCart } from "@/context/shopping-cart";
import { useSession } from "next-auth/react"
import { useState } from "react";
import { FaShareAlt, FaShoppingCart } from "react-icons/fa"
```

-   Add code to get the `changeQuantity()` method from the shopping cart context. Also get session information using `getSession()` and maintain it in state

```tsx
const { changeQuantity } = useCart();

// get session information using useSession(), and maintain the data in state
const { data: session, status } = useSession()
const loading = status === "loading"
```

-   Add a shopping cart icon (after the ShareIcon) to add the product to the cart if session exists (user is logged in)

```tsx
{
    /* Add a shopping cart icon to add the product to the cart if session exists (user is logged in) */
}
{
  session && !loading && (
    <button
      aria-label="add to cart"
      onClick={() => changeQuantity(product._id, 1)}
      className="text-gray-700 hover:text-gray-900 p-2 rounded"
    >
      <FaShoppingCart className="text-xl" />
    </button>
  )
}
```

-   After logging in you can find the shopping cart icon on the product list items. Clicking them adds to the cart (note the change in number of items in the main navigation menu).

## Step 41: Show the ShoppingCart page

-   `src/pages/[cart]/index.tsx` - We render this on the server-side using `getServerSideProps()`. This is ideal as the shopping cart is a very dynamic (fast-changing) page. SSG is not a good fit for it. We also make sure during SSR that if the user is not logged in, the cart page cannot be accessed.

```tsx
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

import Cart from "@/components/cart/cart";
import { ICartItem } from "@/types/Cart";
import { getCart } from "@/data/services/cart";

type Props = {
  cart: ICartItem[];
};

export default function CartPage({ cart }: Props) {
  return (
    <>
      <Head>
        <title>Shopping cart | Mantra Store</title>
        <meta name="description" content="Shopping cart" />
      </Head>

      <Cart cart={cart} />
    </>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  const email = session.user.email;
  const cart = await getCart(email);

  return {
    props: { cart },
  };
};
```

-   `src/components/cart/cart.tsx` - We create the `Cart` component that is used in the CartPage.

```tsx
import { useCart } from "@/context/shopping-cart"
import { ICartItem } from "@/types/Cart"
import { IProduct } from "@/types/Product"
import Image from "next/image"
import { FaPlus, FaMinus } from "react-icons/fa"

type Props = {
  cart: ICartItem[]
}

function Cart({ cart }: Props) {
  const { changeQuantity } = useCart()

  if (!cart || cart.length === 0) {
    return (
      <div className="flex justify-center items-center px-4 py-8 text-gray-600">
        Cart is empty
      </div>
    )
  }

  const total = cart.reduce(
    (acc, item) => acc + (item.product as IProduct).price * item.quantity,
    0
  )

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4">Shopping cart</h1>
      <hr className="mb-6 border-gray-300" />

      <div className="overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 border-b">
            <tr className="text-sm font-medium text-gray-700 text-left">
              <th className="py-3 px-4 text-center">S. No.</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4 text-center">Quantity</th>
              <th className="py-3 px-4 text-right">Price ($)</th>
              <th className="py-3 px-4 text-right">Total Price ($)</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(({ product, quantity }: any, idx: number) => (
              <tr key={product._id} className="border-b hover:bg-gray-50 text-sm">
                <td className="py-3 px-4 text-center">{idx + 1}</td>
                <td className="py-3 px-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={48}
                    height={48}
                  />
                </td>
                <td className="py-3 px-4">{product.title}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    aria-label="decrease quantity"
                    className="text-green-600 hover:text-green-800 mr-2"
                    onClick={async () => {
                      await changeQuantity(product._id, -1)
                      window.location.reload()
                    }}
                  >
                    <FaMinus />
                  </button>
                  {quantity}
                  <button
                    aria-label="increase quantity"
                    className="text-green-600 hover:text-green-800 ml-2"
                    onClick={async () => {
                      await changeQuantity(product._id, 1)
                      window.location.reload()
                    }}
                  >
                    <FaPlus />
                  </button>
                </td>
                <td className="py-3 px-4 text-right">
                  {product.price.toFixed(2)}
                </td>
                <td className="py-3 px-4 text-right">
                  {(quantity * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-50 text-sm font-medium text-gray-700 border-t">
              <td colSpan={4} />
              <td className="py-3 px-4 text-right">Total</td>
              <td className="py-3 px-4 text-right">{total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export default Cart
```
