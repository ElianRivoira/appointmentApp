import jsPDF from 'jspdf';
import { UseMutationResult } from '@tanstack/react-query';

import { centerHeaders, checkPageBreak, inputLine, subtitle, textArea } from '@/utils/jsPDF';
import bigCheck from '@/assets/images/bigCheck.png';

export const generateAppointmentProof = (
  reserve: reserveUser,
  branch: string,
  postProof: UseMutationResult<void, any, FormData, unknown>
) => {
  const doc = new jsPDF();

  const lineHeight = 5;
  const spacing = 6;
  const headingFontSize = 14;
  const x = 10;
  let y = 10;

  const creationDate = new Date(reserve.creationDate).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const creationDateArray = creationDate.split(',');

  const reserveDate = new Date(reserve.date).toLocaleString('en-GB', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  const reserveDateArray = reserveDate.split(',');

  centerHeaders('COMPROBANTE DE TURNO', doc, headingFontSize, y);
  y += spacing;

  bigCheck && doc.addImage(bigCheck.src, 'PNG', 85, y, 40, 40);
  y += 47;
  y = subtitle(doc, '¡Gracias por tu reserva!', x, y, spacing);
  y = inputLine(doc, `Presentate con este comprobante en la sucursal indicada.`, x, y, (spacing+10));
  y = subtitle(doc, `Reserva #${reserve.id}`, x, y, spacing);
  y = inputLine(
    doc,
    `Hecho el ${creationDateArray[0]} a las ${creationDateArray[1]} para el ${reserveDateArray[0]} a las ${reserveDateArray[1]}.`,
    x,
    y,
    (spacing+8)
  );

  subtitle(doc, `${reserve?.name}`, x, y, spacing);
  y = subtitle(doc, `Reserva`, 70, y, spacing);
  inputLine(doc, `Mail: ${reserve?.email}`, x, y, spacing);
  y = inputLine(doc, `Sucursal: ${branch}`, 70, y, spacing);
  inputLine(doc, `Teléfono: ${reserve?.phone}`, x, y, spacing);
  y = inputLine(doc, `Horario: ${reserveDateArray[1]}`, 70, y, spacing);

  const blobDoc = doc.output('blob');
  const file = new File([blobDoc], `proof.pdf`, {
    type: 'application/pdf',
  });

    const formData = new FormData();
    formData.append('name', reserve.name);
    formData.append('reserveId', reserve.id);
    formData.append('proof', file as Blob);
    postProof.mutate(formData);
};
