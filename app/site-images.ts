// A fresh URL avoids permanent www redirects retained in visitors' image caches.
const imageRevision = "20261102";

export function imageAssetUrl(path: `/assets/${string}.webp`) {
  return `${path}?v=${imageRevision}`;
}
