import io
import base64
import json
from PIL import Image, ImageDraw

frames = []
for i in range(4):
    img = Image.new('RGB', (224, 224), color=(70 + i * 30, 90 + i * 20, 140))
    d = ImageDraw.Draw(img)
    d.rectangle([50, 50, 174, 174], fill=(200 - i * 20, 160, 120))
    buf = io.BytesIO()
    img.save(buf, format='JPEG')
    b64 = "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode('ascii')
    frames.append({
        "frame_index": i + 1,
        "timestamp": round(float(i * 1.5), 2),
        "data": b64,
        "thumbnail": b64,
        "face_detected": True,
    })

with open("scripts/test_frames.json", "w") as f:
    json.dump(frames, f)
print(f"Generated scripts/test_frames.json with {len(frames)} frames matching VideoFrameItem schema.")
