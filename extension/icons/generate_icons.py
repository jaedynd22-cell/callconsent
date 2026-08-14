"""Generates simple placeholder PNG icons for the CallConsent extension."""
from PIL import Image, ImageDraw

for size in [16, 48, 128]:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.ellipse([0, 0, size - 1, size - 1], fill=(26, 26, 46, 255))
    cx, cy = size / 2, size / 2
    r = size * 0.28
    d.ellipse([cx - r, cy - r * 1.3, cx + r, cy + r * 0.5], fill=(244, 244, 248, 255))
    bar_w = max(1, size * 0.09)
    d.rectangle([cx - bar_w / 2, cy + r * 0.6, cx + bar_w / 2, cy + r * 1.15], fill=(244, 244, 248, 255))
    dot_r = max(1, size * 0.045)
    d.ellipse(
        [cx - dot_r, cy + r * 1.35 - dot_r, cx + dot_r, cy + r * 1.35 + dot_r],
        fill=(230, 57, 70, 255),
    )
    img.save(f"icon{size}.png")
print("done")
