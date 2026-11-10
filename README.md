# `opengraph-image` flips between static and dynamic across identical builds

Minimal reproduction for a Next.js issue: with `cacheComponents: true`, a
metadata image route whose default export synchronously returns
`new ImageResponse(...)` is classified as static (`○`) in some builds and
dynamic (`ƒ`) in others, on identical code.

```bash
npm install
for i in 1 2 3 4 5 6; do
  rm -rf .next
  npx next build --debug-prerender | grep opengraph-image
done
```

Watch the route symbol and whether
`.next/server/app/opengraph-image.body` is emitted:

| build | route | `.body` |
| --- | --- | --- |
| some | `○` | written |
| others | `ƒ` | missing |

Observed on `next@16.4.5` (1 static / 5 dynamic in 6 cold builds) and on
`next@16.5.0-canary.46` (3 static / 3 dynamic in 6 cold builds). A plain
`next build` was always `○`.

The route uses no dynamic APIs — no `headers()`, `cookies()`, `fetch`,
`Date.now()` or `Math.random()` — and exports no `dynamic`/`revalidate`
options.
