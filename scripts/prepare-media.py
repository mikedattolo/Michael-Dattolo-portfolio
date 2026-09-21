#!/usr/bin/env python3
"""Regenerate approved, optimized portfolio images. Requires Pillow; no AI imagery.
Original project assets are retained separately. No enlargement or content retouching.
"""
import hashlib
import json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'portfolio'
OUT.mkdir(parents=True, exist_ok=True)
manifest = json.loads((ROOT / 'content/media.json').read_text())
result = {}
for key, item in manifest.items():
    src = ROOT / item['source']
    if not src.is_file():
        raise FileNotFoundError(f'Missing approved image: {src}')
    with Image.open(src) as raw:
        image = ImageOps.exif_transpose(raw).convert('RGB')
        variants = []
        for width in sorted(set(min(n, image.width) for n in [480, 960, 1600])):
            resized = image.resize((width, round(image.height * width / image.width)), Image.Resampling.LANCZOS)
            name = f'{key}-{width}.webp'
            resized.save(OUT / name, 'WEBP', quality=84, method=6)
            variants.append({'src':f'/assets/portfolio/{name}', 'width':resized.width, 'height':resized.height})
        result[key] = {**item, 'width':image.width, 'height':image.height, 'variants':variants}
# A typographic sharing card, using the actual mechanism photograph (not a new rendering).
card = Image.new('RGB', (1200,630), '#131714')
draw = ImageDraw.Draw(card)
def font(size):
    for name in ['DejaVuSans.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf']:
        try: return ImageFont.truetype(name, size)
        except OSError: pass
    return ImageFont.load_default(size=size)
draw.text((64,58),'MIKE DATTOLO',font=font(24),fill='#bad3ab')
for y,line in [(169,'3D printing.'),(241,'CAD.'),(313,'Practical product'),(385,'development.')]:
    draw.text((64,y),line,font=font(49),fill='#f1f3ec')
draw.text((64,553),'Hackettstown, New Jersey  /  mike-dattolo.com',font=font(20),fill='#b5bdb4')
with Image.open(ROOT / manifest['printing-mechanism']['source']) as source:
    image=ImageOps.contain(source.convert('RGB'), (442,400))
    card.paste(image,(708+(442-image.width)//2,180+(400-image.height)//2))
card.save(OUT/'social-card.jpg',quality=88,optimize=True)
(ROOT/'content/media-build.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(f'Prepared {len(result)} approved images; original images preserved.')
