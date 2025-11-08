---


## Notes & Where Each Concept Appears (Inside the code files comments)


- **Critical Rendering Path**: `index.html` inlines small CSS for header and initial skeleton so the browser can paint quickly before JS loads. `main.jsx` keeps bundle minimal.


- **Core Web Vitals**: We avoid layout shifts by reserving image height (`.book-cover`), lazy load images to speed up `Largest Contentful Paint`, and minimize main-thread work.


- **HTTP Caching**: `public/books.json` acts as our API; in a real deployment you would add `Cache-Control` headers. `fetch` from `/books.json` simulates this.


- **Content Negotiation**: Home fetch uses `Accept-Language: navigator.language` so a real server could return localized content.


- **Lazy Loading**: Images use `loading="lazy"`. Routes (`BookDetails`, `CartPage`) use `React.lazy` + `Suspense`.


- **Bundle Splitting**: `React.lazy` breaks the app into route-level bundles.


- **Critical CSS**: `index.html` includes inline CSS for above-the-fold elements.


- **Essential State Model**: `CartContext` holds only essential state (cart items). Derived values (counts) computed on the fly.


- **Reducer Pattern**: `cartReducer.js` demonstrates simple reducer-based actions: ADD, REMOVE, CLEAR.


- **Windowing**: `Home.jsx` uses `react-window` to render a virtualized list for performance with large data sets.


- **Server Side Rendering / Rehydration**: This Vite React app is client-rendered, but comments explain how SSR would change the flow (pre-render HTML on server and rehydrate on client). If you port to Next.js the same code and inline critical CSS will demonstrate SSR + rehydration.


- **Partial Re-rendering**: Components update only on necessary state changes (e.g., adding to cart updates cart context and Header's count but doesn't re-render unrelated items).


- **Server Components**: Notes included in README section — to use Server Components convert data-fetching UI to server components in Next.js or similar.


- **Micro Frontends**: The code is modular: `BookCard`, `Header`, `Cart` could be separate microfrontends. A short note is provided in the README block inside this file.


---