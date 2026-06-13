import sharp from "sharp"
import { readFileSync, writeFileSync } from "node:fs"

const SRC = "public/logo.png"
const OUT = "public/logo-clean.png"

// 1) Load raw RGBA pixels
const img = sharp(SRC).ensureAlpha()
const { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
const { width, height, channels } = info

// 2) Make near-black pixels fully transparent, and feather the edges so the
//    artwork sits cleanly on any background. We also find the tight bounding
//    box of the visible artwork so we can crop away the dead space.
const LUMA_CUT = 42 // below this brightness => treat as background
let minX = width
let minY = height
let maxX = 0
let maxY = 0

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    const luma = 0.299 * r + 0.587 * g + 0.114 * b

    if (luma <= LUMA_CUT) {
      data[i + 3] = 0 // transparent
    } else {
      // Smooth alpha ramp just above the cutoff to avoid a hard black halo.
      if (luma < LUMA_CUT + 28) {
        data[i + 3] = Math.round(((luma - LUMA_CUT) / 28) * 255)
      }
      if (data[i + 3] > 10) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }
}

// 3) Crop to the artwork bounding box with a small padding
const pad = 12
const left = Math.max(0, minX - pad)
const top = Math.max(0, minY - pad)
const cropW = Math.min(width - left, maxX - minX + pad * 2)
const cropH = Math.min(height - top, maxY - minY + pad * 2)

await sharp(data, { raw: { width, height, channels } })
  .extract({ left, top, width: cropW, height: cropH })
  .png()
  .toFile(OUT)

console.log(`Trimmed logo: ${width}x${height} -> crop ${cropW}x${cropH} (offset ${left},${top})`)
