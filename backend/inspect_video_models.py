import urllib.request
import json

candidates = [
    "dima806/deepfake_vs_real_image_detection",
    "KoreaPeter/ms-eff-gcvit-deepfake-b0-ff-plus-plus",
    "prithivMLmods/deepfake-detector-model-v1",
    "Wvolf/ViT_Deepfake_Detection",
]

for m in candidates:
    print(f"\n{'='*55}\nMODEL: {m}\n{'='*55}")
    url = f"https://huggingface.co/api/models/{m}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "VoiceGuard/1.0"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            print("Tags:", data.get("tags"))
            print("CardData:", data.get("cardData"))
            print("Files:", [s["rfilename"] for s in data.get("siblings", [])][:8])
    except Exception as e:
        print("API error:", e)

    # Fetch config.json
    cfg_url = f"https://huggingface.co/{m}/raw/main/config.json"
    try:
        req = urllib.request.Request(cfg_url, headers={"User-Agent": "VoiceGuard/1.0"})
        with urllib.request.urlopen(req) as res:
            cfg = json.loads(res.read().decode())
            print("Architectures:", cfg.get("architectures"))
            print("id2label:", cfg.get("id2label"))
            print("label2id:", cfg.get("label2id"))
    except Exception as e:
        print("Config error:", e)
