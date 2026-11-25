import urllib.request
import json

queries = ["deepfake", "face-forensics", "fake-face", "deepfake-detection", "ai-face"]
found = {}

for q in queries:
    for ptag in ["image-classification", "video-classification"]:
        url = f"https://huggingface.co/api/models?pipeline_tag={ptag}&search={q}&limit=20"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "VoiceGuard/1.0"})
            with urllib.request.urlopen(req) as response:
                items = json.loads(response.read().decode())
                for item in items:
                    mid = item["id"]
                    if mid not in found:
                        found[mid] = (item.get("downloads", 0), ptag)
        except Exception as e:
            print(f"Error querying {q} {ptag}: {e}")

sorted_models = sorted(found.items(), key=lambda x: x[1][0], reverse=True)
print(f"Total candidate models found: {len(sorted_models)}")
for mid, (dls, ptag) in sorted_models[:20]:
    print(f"- {mid} ({ptag}): {dls} downloads")
