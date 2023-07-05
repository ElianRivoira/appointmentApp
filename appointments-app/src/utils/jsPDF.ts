import jsPDF from 'jspdf';

export function centerHeaders(text: string, doc: jsPDF, headingFontSize: number, y: number) {
  const headingText = text;
  const headingFontWidth = (doc.getStringUnitWidth(headingText) * headingFontSize) / doc.internal.scaleFactor;
  const headingX = (doc.internal.pageSize.getWidth() - headingFontWidth) / 2;
  doc.setFont('Helvetica', 'bold');
  doc.setFontSize(headingFontSize);
  doc.text(headingText, headingX, y);
}

export function checkPageBreak(doc: jsPDF, y: number, space?: number, header?: boolean) {
  const pageHeight = doc.internal.pageSize.getHeight();
  if (y > pageHeight - (space ? space : 15)) {
    doc.addPage();
    return header ? (y = 22) : (y = 10);
  } else return y;
}

export function subtitle(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  spacing: number,
  fontSize?: number,
  fontWeight?: string
): number {
  fontSize ? doc.setFontSize(fontSize) : doc.setFontSize(12);
  fontWeight ? doc.setFont('Helvetica', fontWeight) : doc.setFont('Helvetica', 'bold');
  doc.text(text, x, y);
  y += spacing;
  y = checkPageBreak(doc, y);
  return y;
}

export function inputLine(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  spacing: number,
  fontSize?: number,
  fontWeight?: string,
  notCheckPage?: boolean
): number {
  fontSize ? doc.setFontSize(fontSize) : doc.setFontSize(10);
  fontWeight ? doc.setFont('Helvetica', fontWeight) : doc.setFont('Helvetica', 'normal');
  doc.text(text, x, y);
  y += spacing;
  notCheckPage ? null : (y = checkPageBreak(doc, y));
  return y;
}

export function textArea(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  lineHeight: number,
  spacing?: number,
  fontSize?: number,
  fontWeight?: string,
  header?: boolean,
): number {
  fontSize ? doc.setFontSize(fontSize) : doc.setFontSize(10);
  fontWeight ? doc.setFont('Helvetica', fontWeight) : doc.setFont('Helvetica', 'normal');
  const splittedText = doc.splitTextToSize(text, 180);
  splittedText.forEach((line: string) => {
    doc.text(line, x, y);
    y += lineHeight;
    header ? y = checkPageBreak(doc, y, undefined, true) : y = checkPageBreak(doc, y);
  });
  y += spacing ? spacing : 5;
  header ? y = checkPageBreak(doc, y, undefined, true) : y = checkPageBreak(doc, y);
  return y;
}
