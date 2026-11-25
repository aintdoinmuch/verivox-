# Verivox AI — Python Multimodal Detection Microservice

This microservice handles heavy deep learning inference for Verivox AI:
1. **Audio Deepfake Detection:** Wav2Vec2-Base fine-tuned checkpoint (`mo-thecreator/Deepfake-audio-detection`).
2. **Video Deepfake Detection:** Dual-Engine Vision Transformers (`dima806/deepfake_vs_real_image_detection` and `dima806/ai_vs_real_image_detection`) + 2D FFT Spectral Frequency Analysis.

---

## Why is this separate from the Next.js Vercel frontend?

* **Vercel Architecture:** Vercel is a serverless platform designed for Node.js, Next.js, and Edge runtimes. Serverless function bundles are restricted to **250MB** with execution timeouts between 10s and 60s.
* **PyTorch & Model Weights:** PyTorch, TorchAudio, Transformers, and the cached neural network checkpoints require **~3GB+** of storage and dedicated memory. Vercel cannot host persistent GPU/CPU PyTorch inference servers inside standard serverless functions.
* **Decoupled Gateway Pattern:** The Next.js app routes `/api/detect/audio` and `/api/detect/video` act as a secure proxy gateway. They forward user requests to this microservice (via the `PYTHON_BACKEND_URL` environment variable) and return structured forensic verdicts to the client.

---

## Free & Low-Cost Cloud Deployment Options

### Option 1: Hugging Face Spaces (Recommended — Free CPU / Low-cost GPU)
1. Go to [huggingface.co/spaces](https://huggingface.co/spaces) and click **Create new Space**.
2. Space Name: `voiceguard-detector`
3. Space SDK: Select **Docker** (Blank).
4. Clone the repo and push the `backend/` directory contents (including `Dockerfile`, `server.py`, `detector.py`, `video_detector.py`, `requirements.txt`).
5. Your public Space URL will be: `https://<your-username>-voiceguard-detector.hf.space`.
6. In your Vercel Project Settings, add:
   ```env
   PYTHON_BACKEND_URL=https://<your-username>-voiceguard-detector.hf.space
   ```

### Option 2: Render.com (Web Service)
1. Go to [render.com](https://render.com) &rarr; **New Web Service**.
2. Connect your repository, set the Root Directory to `backend/`.
3. Select **Docker** or **Python 3**.
4. Build command: `pip install -r requirements.txt`
5. Start command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Copy the assigned URL (e.g., `https://voiceguard-backend.onrender.com`) and paste into Vercel as `PYTHON_BACKEND_URL`.

### Option 3: Local Development (Default)
When developing locally, run:
```bash
python -m uvicorn server:app --app-dir backend --host 127.0.0.1 --port 8000
```
Next.js will automatically default to `http://127.0.0.1:8000`.
