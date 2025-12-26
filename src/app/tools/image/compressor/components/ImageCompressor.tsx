"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import imageCompression from "browser-image-compression";

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / Math.pow(1024, i);
  const digits = i === 0 ? 0 : value < 10 ? 2 : 1;
  return `${value.toFixed(digits)} ${units[i]}`;
}

function extForMime(mime: string | undefined): string {
  if (!mime) return "jpg";
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

function isSupportedImage(file: File): boolean {
  return ["image/png", "image/jpeg", "image/webp"].includes(file.type);
}

export function ImageCompressor() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [dragActive, setDragActive] = useState(false);
  const [quality, setQuality] = useState(80);
  const [file, setFile] = useState<File | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [compressed, setCompressed] = useState<Blob | null>(null);

  const originalUrl = useMemo(() => {
    if (!file) return null;
    return URL.createObjectURL(file);
  }, [file]);

  const compressedUrl = useMemo(() => {
    if (!compressed) return null;
    return URL.createObjectURL(compressed);
  }, [compressed]);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  useEffect(() => {
    return () => {
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [compressedUrl]);

  const originalSize = file?.size ?? 0;
  const compressedSize = compressed?.size ?? 0;

  const savingsPct = useMemo(() => {
    if (!originalSize || !compressedSize) return null;
    const saved = 1 - compressedSize / originalSize;
    return Math.max(0, Math.min(100, Math.round(saved * 100)));
  }, [originalSize, compressedSize]);

  const pickFile = () => inputRef.current?.click();

  const onFiles = (files: FileList | null) => {
    const first = files?.[0];
    if (!first) return;

    if (!isSupportedImage(first)) {
      setError("Formato não suportado. Envie PNG, JPG/JPEG ou WebP.");
      setFile(null);
      setCompressed(null);
      return;
    }

    setError(null);
    setFile(first);
    setCompressed(null);
  };

  const compress = async () => {
    if (!file) return;
    setCompressing(true);
    setError(null);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: Math.max(0.1, Math.min(0.9, quality / 100))
      };

      const result = await imageCompression(file, options);
      setCompressed(result);
    } catch {
      setError("Não foi possível comprimir a imagem. Tente novamente com outro arquivo.");
      setCompressed(null);
    } finally {
      setCompressing(false);
    }
  };

  const download = () => {
    if (!file || !compressed) return;

    const url = URL.createObjectURL(compressed);

    const ext = extForMime(compressed.type);
    const baseName = file.name.replace(/\.(png|jpg|jpeg|webp)$/i, "");

    const link = document.createElement("a");
    link.href = url;
    link.download = `${baseName}-compressed.${ext}`;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-bold">Comprimir imagem</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Escolha um arquivo e ajuste a qualidade. A compressão acontece no navegador.
          </p>
        </div>

        <div className="w-full md:w-80">
          <label className="block text-sm font-semibold">Qualidade: {quality}%</label>
          <input
            className="mt-2 w-full"
            type="range"
            min={10}
            max={90}
            step={1}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            aria-label="Qualidade"
          />
        </div>
      </div>

      <div
        className={
          "mt-5 rounded-2xl border border-dashed p-6 text-center " +
          (dragActive
            ? "border-blue-400 bg-blue-50/40 dark:border-blue-700 dark:bg-blue-950/30"
            : "border-slate-300 bg-white dark:border-slate-800 dark:bg-slate-950")
        }
        onDragEnter={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDragActive(false);
          onFiles(e.dataTransfer.files);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />

        <p className="text-slate-700 dark:text-slate-200">Arraste e solte a imagem aqui</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">PNG, JPG/JPEG ou WebP</p>

        <button
          type="button"
          className="mt-4 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          onClick={pickFile}
        >
          Selecionar arquivo
        </button>

        {file ? (
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-300">
            <p>
              <span className="font-semibold">Arquivo:</span> {file.name}
            </p>
            <p>
              <span className="font-semibold">Tamanho original:</span> {formatBytes(originalSize)}
            </p>
          </div>
        ) : null}

        {error ? <p className="mt-4 text-sm font-semibold text-red-600">{error}</p> : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 font-semibold hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-900"
          onClick={compress}
          disabled={!file || compressing}
        >
          {compressing ? "Comprimindo…" : "Comprimir"}
        </button>

        <button
          type="button"
          className="rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={download}
          disabled={!compressed}
        >
          Download imagem comprimida
        </button>
      </div>

      {compressed ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-bold">Antes</h3>
            {originalUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={originalUrl} alt="Prévia antes" className="mt-3 max-h-80 w-full rounded-xl object-contain" />
            ) : null}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
            <h3 className="font-bold">Depois</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              <span className="font-semibold">Tamanho comprimido:</span> {formatBytes(compressedSize)}
              {savingsPct !== null ? <span> ({savingsPct}% menor)</span> : null}
            </p>
            {compressedUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={compressedUrl} alt="Prévia depois" className="mt-3 max-h-80 w-full rounded-xl object-contain" />
            ) : null}
          </div>
        </div>
      ) : null}

      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Dica: se o arquivo já estiver otimizado, a redução pode ser pequena. Para fotos, reduzir a qualidade costuma ter
        mais impacto do que redimensionar.
      </p>
    </div>
  );
}
