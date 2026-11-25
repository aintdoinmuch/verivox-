/**
 * Lightweight helper to encode raw float32 PCM samples into a 16-bit PCM WAV container
 * and convert to base64. Runs client-side with 0 external dependencies.
 */

export function encodeMonoWav(samples: Float32Array, sampleRate: number = 16000): Uint8Array {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  // RIFF identifier
  writeString(view, 0, "RIFF");
  // File length minus RIFF identifier & file length (36 + data size)
  view.setUint32(4, 36 + samples.length * 2, true);
  // RIFF type
  writeString(view, 8, "WAVE");
  // Format chunk identifier
  writeString(view, 12, "fmt ");
  // Format chunk length (16 for PCM)
  view.setUint32(16, 16, true);
  // Sample format (1 = raw integer PCM)
  view.setUint16(20, 1, true);
  // Channel count (1 = mono)
  view.setUint16(22, 1, true);
  // Sample rate (16000 Hz)
  view.setUint32(24, sampleRate, true);
  // Byte rate (sampleRate * 1 channel * 2 bytes)
  view.setUint32(28, sampleRate * 2, true);
  // Block align (1 channel * 2 bytes)
  view.setUint16(32, 2, true);
  // Bits per sample
  view.setUint16(34, 16, true);
  // Data chunk identifier
  writeString(view, 36, "data");
  // Data chunk length
  view.setUint32(40, samples.length * 2, true);

  // Write the 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    // 16-bit signed integer conversion
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }

  return new Uint8Array(buffer);
}

function writeString(view: DataView, offset: number, string: string): void {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

export function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
