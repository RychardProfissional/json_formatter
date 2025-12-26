import { PDFDocument } from "pdf-lib";

export type ImageInput = {
  bytes: ArrayBuffer;
  mime: string;
};

const A4 = { width: 595.28, height: 841.89 };

function isJpeg(mime: string) {
  const m = mime.toLowerCase();
  return m === "image/jpeg" || m === "image/jpg";
}

function isPng(mime: string) {
  return mime.toLowerCase() === "image/png";
}

export async function imagesToPdf(images: ImageInput[]): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();

  for (const img of images) {
    const bytes = new Uint8Array(img.bytes);

    const embedded = isPng(img.mime)
      ? await pdf.embedPng(bytes)
      : isJpeg(img.mime)
        ? await pdf.embedJpg(bytes)
        : null;

    if (!embedded) {
      throw new Error(`Unsupported image type: ${img.mime}`);
    }

    const iw = embedded.width;
    const ih = embedded.height;
    const landscape = iw > ih;
    const pageSize = landscape ? { width: A4.height, height: A4.width } : A4;

    const page = pdf.addPage([pageSize.width, pageSize.height]);
    const margin = 24;

    const maxW = pageSize.width - margin * 2;
    const maxH = pageSize.height - margin * 2;
    const scale = Math.min(maxW / iw, maxH / ih);

    const w = iw * scale;
    const h = ih * scale;
    const x = (pageSize.width - w) / 2;
    const y = (pageSize.height - h) / 2;

    page.drawImage(embedded, { x, y, width: w, height: h });
  }

  return await pdf.save();
}

export async function mergePdfs(pdfs: ArrayBuffer[]): Promise<Uint8Array> {
  const out = await PDFDocument.create();

  for (const bytes of pdfs) {
    const src = await PDFDocument.load(bytes);
    const copied = await out.copyPages(src, src.getPageIndices());
    for (const page of copied) out.addPage(page);
  }

  return await out.save();
}
