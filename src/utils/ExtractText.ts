import { getDocument } from "pdfjs-dist";

const pdfjs = await import("pdfjs-dist");
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  if (!file) return "";
  const pdfData = await file.arrayBuffer();
  const pdfDoc = await getDocument(pdfData).promise;

  let text = "";
  for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
    const page = await pdfDoc.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item: any) => (item as any).str)
      .join(" ");
    text += pageText + "\n";
  }
  return text;
};
