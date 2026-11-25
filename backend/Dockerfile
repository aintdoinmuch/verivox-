# ==============================================================================
# VoiceGuard AI — Multimodal Audio & Video Deepfake Detection Microservice
# Pretrained Models: Wav2Vec2 + Dual-Engine Vision Transformers (ViT-Base)
# Deployable to: Hugging Face Spaces, Render, Railway, Fly.io, or AWS EC2
# ==============================================================================

FROM python:3.11-slim

# Install system dependencies for audio decoding (soundfile, librosa) and imaging
RUN apt-get update && apt-get install -y --no-install-recommends \
    libsndfile1 \
    ffmpeg \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency specifications
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Pre-cache Hugging Face transformer models during Docker build for zero cold-start delay
RUN python -c "from transformers import AutoFeatureExtractor, AutoModelForAudioClassification, AutoImageProcessor, AutoModelForImageClassification; \
    AutoFeatureExtractor.from_pretrained('mo-thecreator/Deepfake-audio-detection'); \
    AutoModelForAudioClassification.from_pretrained('mo-thecreator/Deepfake-audio-detection'); \
    AutoImageProcessor.from_pretrained('dima806/deepfake_vs_real_image_detection'); \
    AutoModelForImageClassification.from_pretrained('dima806/deepfake_vs_real_image_detection'); \
    AutoImageProcessor.from_pretrained('dima806/ai_vs_real_image_detection'); \
    AutoModelForImageClassification.from_pretrained('dima806/ai_vs_real_image_detection'); \
    print('All neural models pre-cached successfully.')"

# Copy application files
COPY . .

# Default port
EXPOSE 8000

ENV HOST=0.0.0.0
ENV PORT=8000

# Start FastAPI ASGI server
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8000"]
