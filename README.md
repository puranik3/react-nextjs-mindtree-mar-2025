## React and Next JS training
- LTI Mindtree
- March 26 - April 10 (10 half days)
- 9:30 AM - 1:30 PM

## Mantra store online server
https://mantra-server-nzl2.onrender.com/api

## Clarifications
- Client components can have their markup rendered on the server, but their interactivity (hooks, event handlers) only kicks in on the client (though the process of __hydration__).
- External images used with `<Image>` are not downloaded at build time. Instead, it
    - Proxies it through the built-in image optimization API route (`/_next/image`)
    - Downloads the image on-demand, the first time it's requested
    - Caches it (if possible) for future requests (on the server or CDN like Vercel)
