import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { CERTIFICATE_06_DATA } from '../data/congressData';

async function loadImageAsDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateCertificate06Pdf(baseUrl: string): Promise<void> {
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_06_DATA.code}#validador`;
  const shortDisplayUrl = `${cleanBaseUrl}/`;

  // Load original transparent PNG assets extracted from the reference certificates
  const [logoLeftDataUrl, logoRightDataUrl, sigLeftDataUrl, sigRightDataUrl, qrDataUrl] = await Promise.all([
    loadImageAsDataUrl(CERTIFICATE_06_DATA.issuerLeft.logoPath),
    loadImageAsDataUrl(CERTIFICATE_06_DATA.issuerRight.logoPath),
    loadImageAsDataUrl(CERTIFICATE_06_DATA.issuerLeft.signaturePath),
    loadImageAsDataUrl(CERTIFICATE_06_DATA.issuerRight.signaturePath),
    QRCode.toDataURL(fullVerificationUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 480,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })
  ]);

  // Create A4 Landscape PDF using exact pt coordinates (841.89 x 595.28 pt)
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: 'a4',
    compress: true
  });

  const W = 841.89;
  const H = 595.28;

  const drawPageBorders = () => {
    // Warm archival background (#FFFDFA -> 1.0, 0.99, 0.98)
    doc.setFillColor(255, 253, 250);
    doc.rect(0, 0, W, H, 'F');

    // Outer Emerald Border
    doc.setDrawColor(5, 79, 59);
    doc.setLineWidth(2.268);
    doc.rect(14.173, 14.173, 813.543, 566.929, 'S');

    // Middle Gold Border
    doc.setDrawColor(217, 120, 5);
    doc.setLineWidth(0.992);
    doc.rect(19.276, 19.276, 803.339, 556.724, 'S');

    // Inner Navy Border
    doc.setDrawColor(10, 28, 87);
    doc.setLineWidth(1.417);
    doc.rect(23.244, 23.244, 795.402, 548.787, 'S');
  };

  // =========================================================================
  // LAUDA 1 (FRENTE DO CERTIFICADO)
  // =========================================================================
  drawPageBorders();

  // Left Logo & Header Text
  doc.addImage(logoLeftDataUrl, 'PNG', 39.685, 34.016, 56.693, 56.693);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text('EDITORA MENTE E SAÚDE', 104.882, 51.024);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.372.335/0001-71', 104.882, 63.78);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(13, 148, 136);
  doc.text('Conselho Editorial e Extensão Científica', 104.882, 75.118);

  // Center Header Text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(6, 78, 59);
  doc.text(
    'PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA',
    420.945,
    48.189,
    { align: 'center' }
  );
  doc.text('E EDUCAÇÃO EM SAÚDE', 420.945, 60.094, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(10, 29, 86);
  doc.text(
    `Certificado Nº ${CERTIFICATE_06_DATA.certNumber} · Livro de Extensão nº ${CERTIFICATE_06_DATA.bookNumber} · Cód. ${CERTIFICATE_06_DATA.code}`,
    420.945,
    74.268,
    { align: 'center' }
  );

  // Right Logo & Header Text
  doc.addImage(logoRightDataUrl, 'PNG', 745.512, 34.016, 56.693, 56.693);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(10, 29, 86);
  doc.text('CENTRO PROFISSIONALIZANTE', 737.008, 49.606, { align: 'right' });
  doc.text('MARIA DALVA DE ARAÚJO', 737.008, 61.795, { align: 'right' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(15, 23, 42);
  doc.text('CNPJ: 51.269.112/0001-83', 737.008, 74.268, { align: 'right' });

  // Header Divider Line
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.line(39.685, 99.213, 802.205, 99.213);

  // Main Certificate Title
  doc.setFont('times', 'bold');
  doc.setFontSize(23.5);
  doc.setTextColor(6, 78, 59);
  doc.text(CERTIFICATE_06_DATA.categoryTitle, 420.945, 133.228, { align: 'center' });

  // Gold Underline below Main Title
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(1.417);
  doc.line(269.291, 141.732, 572.598, 141.732);

  // Institutional Intro Text
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.2);
  doc.setTextColor(15, 23, 42);
  doc.text(
    'A Editora Mente e Saúde (CNPJ: 51.372.335/0001-71), em parceria institucional com o Centro Profissionalizante Maria Dalva de Araújo (CNPJ:',
    420.945,
    164.976,
    { align: 'center' }
  );
  doc.text(
    '51.269.112/0001-83), certifica para os devidos fins de comprovação curricular, acadêmica e de títulos (Lei nº 9.394/96) que',
    420.945,
    177.449,
    { align: 'center' }
  );

  // Holder Highlight Box
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.85);
  doc.rect(68.031, 189.921, 705.827, 59.528, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(22.5);
  doc.setTextColor(10, 29, 86);
  doc.text(CERTIFICATE_06_DATA.holderName, 420.945, 217.701, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text(CERTIFICATE_06_DATA.holderLine, 420.945, 238.11, { align: 'center' });

  // Body Paragraph 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  CERTIFICATE_06_DATA.frontParagraph1Lines.forEach((line, idx) => {
    doc.text(line, 69.449, 272.693 + idx * 11.5);
  });

  // Body Paragraph 2
  CERTIFICATE_06_DATA.frontParagraph2Lines.forEach((line, idx) => {
    doc.text(line, 69.449, 321.732 + idx * 11.5);
  });

  // Issue Location and Date
  doc.setFont('times', 'italic');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text(CERTIFICATE_06_DATA.issueLocationAndDate, 420.945, 388.346, { align: 'center' });

  // Left Signature Block
  doc.addImage(sigLeftDataUrl, 'PNG', 62.362, 422.362, 181.417, 51.024);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.992);
  doc.line(42.52, 477.638, 263.622, 477.638);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 153.071, 490.394, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Editora-Chefe e Coordenadora de Extensão Editorial', 153.071, 501.165, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.3);
  doc.setTextColor(6, 78, 59);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 153.071, 511.654, { align: 'center' });

  // Official Golden Seal
  doc.setFillColor(255, 242, 199);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(1.701);
  doc.circle(308.976, 467.717, 32.598, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(120, 53, 15);
  doc.text('SELO OFICIAL', 308.976, 456.945, { align: 'center' });

  doc.setFontSize(8);
  doc.text('FÉ PÚBLICA', 308.976, 468.283, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(5.4);
  doc.text(CERTIFICATE_06_DATA.code, 308.976, 480.472, { align: 'center' });

  // QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.rect(350.079, 429.449, 70.866, 70.866, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 352.913, 432.283, 65.197, 65.197);
  doc.link(350.079, 429.449, 70.866, 70.866, { url: fullVerificationUrl });

  // Manual Public Authentication Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.rect(426.614, 429.449, 143.15, 70.866, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(6, 78, 59);
  doc.text('AUTENTICAÇÃO PÚBLICA MANUAL', 432.283, 440.787);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.setTextColor(15, 23, 42);
  doc.text(`Cód.: ${CERTIFICATE_06_DATA.code}`, 432.283, 452.976);

  doc.setTextColor(146, 64, 14);
  doc.text(`Chave: ${CERTIFICATE_06_DATA.controlKey}`, 432.283, 464.315);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5.5);
  doc.setTextColor(10, 29, 86);
  doc.text('Endereço p/ Verificação Online:', 432.283, 475.654);

  doc.setFont('courier', 'normal');
  doc.setFontSize(4.8);
  doc.setTextColor(15, 23, 42);
  const displayUrlClipped = shortDisplayUrl.length > 44 ? shortDisplayUrl.slice(0, 44) : shortDisplayUrl;
  doc.text(displayUrlClipped, 432.283, 486.142);
  doc.link(426.614, 429.449, 143.15, 70.866, { url: fullVerificationUrl });

  // Right Signature Block
  doc.addImage(sigRightDataUrl, 'PNG', 595.276, 422.362, 181.417, 51.024);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.992);
  doc.line(575.433, 477.638, 799.37, 477.638);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 687.402, 490.394, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Coordenador de Extensão e Projetos Educativos', 687.402, 501.165, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6);
  doc.setTextColor(10, 29, 86);
  doc.text('Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 687.402, 511.654, {
    align: 'center'
  });

  // Footer Verification Line
  doc.setFont('courier', 'bold');
  doc.setFontSize(6.1);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Verifique via QR Code ou acesse ${shortDisplayUrl} informando o Código ${CERTIFICATE_06_DATA.code} ou Chave ${CERTIFICATE_06_DATA.controlKey}`,
    420.945,
    542.835,
    { align: 'center' }
  );
  doc.link(100, 535, 640, 12, { url: fullVerificationUrl });

  // =========================================================================
  // LAUDA 2 (VERSO OFICIAL — MEMORIAL DESCRITIVO E MATRIZ DE 30 HORAS)
  // =========================================================================
  doc.addPage('a4', 'landscape');
  drawPageBorders();

  // Top Header Logos & Title on Verso
  doc.addImage(logoLeftDataUrl, 'PNG', 39.685, 34.016, 36.85, 36.85);
  doc.addImage(logoRightDataUrl, 'PNG', 82.205, 34.016, 36.85, 36.85);

  doc.setFont('times', 'bold');
  doc.setFontSize(13.5);
  doc.setTextColor(6, 78, 59);
  doc.text('MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE EXTRACURRICULAR', 130.394, 49.606);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Verso Oficial do Certificado Nº ${CERTIFICATE_06_DATA.certNumber} · Fé Pública Interinstitucional e Validação Curricular`,
    130.394,
    63.78
  );

  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(1.417);
  doc.line(39.685, 79.37, 802.205, 79.37);

  // Box 1: Dados de Identificação do Profissional
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.rect(39.685, 87.874, 439.37, 87.874, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL', 51.024, 102.614);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.3);
  doc.setTextColor(15, 23, 42);
  doc.text(`Titular Certificado: ${CERTIFICATE_06_DATA.holderName}`, 51.024, 119.622);
  doc.text(`CPF Registrado: ${CERTIFICATE_06_DATA.holderCpf}`, 51.024, 134.362);
  doc.text(`Qualificação Profissional: ${CERTIFICATE_06_DATA.holderRole}`, 51.024, 149.102);
  doc.text(`Instituição de Origem: ${CERTIFICATE_06_DATA.holderInstitution}`, 51.024, 163.843);

  // Box 2: Enquadramento Curricular e Pontuação
  doc.setFillColor(240, 245, 255);
  doc.setDrawColor(10, 28, 87);
  doc.setLineWidth(0.709);
  doc.rect(490.394, 87.874, 311.811, 87.874, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(10, 29, 86);
  doc.text('2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO', 501.732, 102.614);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text('Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em', 501.732, 119.622);
  doc.text('instituições de ensino, cursos de língua e de computação, aprovação em', 501.732, 129.827);
  doc.text('concursos, congressos médicos (Pelo menos 30 horas por certificado)', 501.732, 140.031);

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.6);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Período: ${CERTIFICATE_06_DATA.periodShort} | Total: 30h (APROVADO - Nota ${CERTIFICATE_06_DATA.grade})`,
    501.732,
    164.409
  );

  // Box 3: Matriz Programática e Metodologia Pedagógica (30 Horas)
  doc.setFillColor(237, 252, 245);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.rect(39.685, 184.252, 762.52, 21.26, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(6, 78, 59);
  doc.text('3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (30 HORAS)', 51.024, 198.992);

  // 4 Axis Rows
  CERTIFICATE_06_DATA.axes.forEach((axis, idx) => {
    const rowTop = 205.512 + idx * 39.685;
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(204, 214, 224);
    doc.setLineWidth(0.709);
    doc.rect(39.685, rowTop, 762.52, 39.685, 'FD');

    doc.setDrawColor(227, 232, 240);
    doc.line(263.622, rowTop, 263.622, rowTop + 39.685);
    doc.line(731.339, rowTop, 731.339, rowTop + 39.685);

    // Axis Title (2 lines)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.3);
    doc.setTextColor(10, 29, 86);
    doc.text(axis.titleLine1, 48.189, rowTop + 12.189);
    doc.text(axis.titleLine2, 48.189, rowTop + 20.584);

    // Axis Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.2);
    doc.setTextColor(71, 85, 105);
    doc.text(axis.subtitle, 48.189, rowTop + 30.614);

    // Axis Description (2 lines)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.3);
    doc.setTextColor(15, 23, 42);
    doc.text(axis.descriptionLine1, 272.126, rowTop + 13.606);
    doc.text(axis.descriptionLine2, 272.126, rowTop + 22.001);

    // Axis Hours
    doc.setFont('courier', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(6, 78, 59);
    doc.text(axis.hours, 746.929, rowTop + 23.244);
  });

  // Box 4: Registro Oficial de Fé Pública, Endereço Web e Chaves de Verificação
  doc.setFillColor(255, 250, 235);
  doc.setDrawColor(217, 120, 5);
  doc.setLineWidth(0.992);
  doc.rect(39.685, 372.756, 762.52, 87.874, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(146, 64, 14);
  doc.text('4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE', 51.024, 387.78);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.8);
  doc.setTextColor(15, 23, 42);
  doc.text(
    `Certificado registrado sob o nº ${CERTIFICATE_06_DATA.certNumber} no Livro de Extensão e Cursos nº ${CERTIFICATE_06_DATA.bookNumber}, Folha ${CERTIFICATE_06_DATA.sheetNumber}, expedido pela Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria`,
    51.024,
    402.52
  );
  doc.text('Dalva de Araújo (CNPJ: 51.269.112/0001-83).', 51.024, 411.49);

  doc.setFont('courier', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `CÓDIGO DE AUTENTICIDADE: ${CERTIFICATE_06_DATA.code}   |   CHAVE DE CONTROLE / DÍGITO: ${CERTIFICATE_06_DATA.controlKey}`,
    51.024,
    424.63
  );

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.9);
  doc.setTextColor(10, 29, 86);
  doc.text(`ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE): ${fullVerificationUrl}`, 51.024, 438.803);
  doc.link(51.024, 431, 650, 10, { url: fullVerificationUrl });

  doc.setFont('courier', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(15, 23, 42);
  doc.text(`HASH SHA-256: ${CERTIFICATE_06_DATA.sha256}`, 51.024, 452.976);

  // Verso QR Code Box
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(5, 79, 59);
  doc.setLineWidth(0.709);
  doc.rect(718.583, 379.843, 73.701, 73.701, 'FD');
  doc.addImage(qrDataUrl, 'PNG', 721.417, 382.677, 68.031, 68.031);
  doc.link(718.583, 379.843, 73.701, 73.701, { url: fullVerificationUrl });

  // Verso Bottom Signatures & Center Footer
  doc.addImage(sigLeftDataUrl, 'PNG', 73.701, 464.882, 153.071, 42.52);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.992);
  doc.line(51.024, 510.236, 260.787, 510.236);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(6, 78, 59);
  doc.text('BÁRBARA LIMA DOS SANTOS', 155.906, 522.142, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)', 155.906, 532.913, { align: 'center' });

  // Center Footer on Verso
  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(15, 23, 42);
  doc.text(CERTIFICATE_06_DATA.issueLocationAndDate, 420.945, 508.819, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.8);
  doc.setTextColor(71, 85, 105);
  doc.text('Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional', 420.945, 522.142, {
    align: 'center'
  });

  doc.setFont('courier', 'normal');
  doc.setFontSize(6.2);
  doc.setTextColor(6, 78, 59);
  doc.text(
    `Registro: ${CERTIFICATE_06_DATA.code} · Chave: ${CERTIFICATE_06_DATA.controlKey}`,
    420.945,
    532.913,
    { align: 'center' }
  );

  // Right Signature on Verso
  doc.addImage(sigRightDataUrl, 'PNG', 609.449, 464.882, 153.071, 42.52);
  doc.setDrawColor(15, 23, 42);
  doc.setLineWidth(0.992);
  doc.line(578.268, 510.236, 790.866, 510.236);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  doc.setTextColor(10, 29, 86);
  doc.text('JAMES ARAÚJO DE SANTANA', 684.567, 522.142, { align: 'center' });

  doc.setFont('courier', 'bold');
  doc.setFontSize(6.2);
  doc.text('Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)', 684.567, 532.913, { align: 'center' });

  // Save vector, selectable PDF
  doc.save(`Certificado_Extensao_06_${CERTIFICATE_06_DATA.code}_LUCAS_GONCALVES_SILVEIRA.pdf`);
}
