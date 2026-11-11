import React, { useEffect, useState, useRef } from 'react';
import QRCode from 'qrcode';
import { CERTIFICATE_06_DATA } from '../data/congressData';

interface CertificatePreviewProps {
  baseUrl: string;
  activePageFilter?: 'both' | 'page1' | 'page2';
}

export const CertificatePreview: React.FC<CertificatePreviewProps> = ({
  baseUrl,
  activePageFilter = 'both'
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [scale, setScale] = useState<number>(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_06_DATA.code}#validador`;
  const shortDisplayUrl = `${cleanBaseUrl}/`;

  useEffect(() => {
    let mounted = true;
    QRCode.toDataURL(fullVerificationUrl, {
      errorCorrectionLevel: 'M',
      margin: 1,
      width: 360,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    }).then((url) => {
      if (mounted) setQrDataUrl(url);
    });
    return () => {
      mounted = false;
    };
  }, [fullVerificationUrl]);

  useEffect(() => {
    const updateScale = () => {
      if (!wrapperRef.current) return;
      const availableWidth = wrapperRef.current.clientWidth;
      // 297mm at 96dpi is ~1122.5px
      const targetWidth = 1122.5;
      if (availableWidth < targetWidth) {
        setScale(Math.max(0.32, (availableWidth - 16) / targetWidth));
      } else {
        setScale(1);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <div ref={wrapperRef} className="w-full flex flex-col items-center print-only-wrapper">
      {/* LAUDA 1 — FRENTE DO CERTIFICADO */}
      {(activePageFilter === 'both' || activePageFilter === 'page1') && (
        <div
          className="w-full flex justify-center mb-8 print:mb-0"
          style={{
            height: scale < 1 ? `${793.7 * scale}px` : 'auto'
          }}
        >
          <div
            className="cert-scale-container origin-top"
            style={{
              transform: scale < 1 ? `scale(${scale})` : 'none'
            }}
          >
            <article
              aria-label="Lauda 1 - Frente do Certificado Oficial Nº 06"
              className="cert-a4-page shadow-xl border border-slate-300/80 select-text text-[#0F172A]"
            >
              {/* Triple Institutional Borders */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '5mm',
                  border: '0.8mm solid #054F3B'
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '6.8mm',
                  border: '0.35mm solid #D97805'
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '8.2mm',
                  border: '0.5mm solid #0A1C57'
                }}
              />

              {/* Inner Content Area */}
              <div
                className="relative w-full h-full flex flex-col justify-between"
                style={{ padding: '12mm 14mm 11mm 14mm' }}
              >
                {/* TOP HEADER TRIPARTITE */}
                <div>
                  <div className="flex items-center justify-between pb-[3mm] border-b border-[#054F3B]">
                    {/* Left Emitter */}
                    <div className="flex items-center gap-[3mm] w-[78mm]">
                      <img
                        src={CERTIFICATE_06_DATA.issuerLeft.logoPath}
                        alt="Brasão Editora Mente e Saúde"
                        referrerPolicy="no-referrer"
                        className="w-[20mm] h-[20mm] object-contain shrink-0"
                      />
                      <div className="leading-tight">
                        <p className="font-sans font-bold text-[8.5pt] text-[#064E3B] tracking-tight">
                          EDITORA MENTE E SAÚDE
                        </p>
                        <p className="font-mono-tabular font-bold text-[7.5pt] text-[#0F172A] mt-[0.8mm]">
                          CNPJ: 51.372.335/0001-71
                        </p>
                        <p className="font-sans text-[7pt] text-[#0D9488] mt-[0.8mm]">
                          Conselho Editorial e Extensão Científica
                        </p>
                      </div>
                    </div>

                    {/* Center Program Header */}
                    <div className="text-center flex-1 px-[2mm]">
                      <p className="font-sans font-bold text-[8.5pt] text-[#064E3B] leading-snug">
                        PROGRAMA INTERINSTITUCIONAL DE EXTENSÃO, COMUNICAÇÃO CIENTÍFICA
                        <br />E EDUCAÇÃO EM SAÚDE
                      </p>
                      <p className="font-mono-tabular font-bold text-[7.5pt] text-[#0A1D56] mt-[1.5mm]">
                        Certificado Nº {CERTIFICATE_06_DATA.certNumber} · Livro de Extensão nº{' '}
                        {CERTIFICATE_06_DATA.bookNumber} · Cód. {CERTIFICATE_06_DATA.code}
                      </p>
                    </div>

                    {/* Right Emitter */}
                    <div className="flex items-center justify-end gap-[3mm] w-[78mm] text-right">
                      <div className="leading-tight">
                        <p className="font-sans font-bold text-[8.5pt] text-[#0A1D56] tracking-tight">
                          CENTRO PROFISSIONALIZANTE
                          <br />
                          MARIA DALVA DE ARAÚJO
                        </p>
                        <p className="font-mono-tabular font-bold text-[7.5pt] text-[#0F172A] mt-[0.8mm]">
                          CNPJ: 51.269.112/0001-83
                        </p>
                      </div>
                      <img
                        src={CERTIFICATE_06_DATA.issuerRight.logoPath}
                        alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                        referrerPolicy="no-referrer"
                        className="w-[20mm] h-[20mm] object-contain shrink-0"
                      />
                    </div>
                  </div>

                  {/* MAIN TITLE */}
                  <div className="text-center mt-[4.5mm]">
                    <h2
                      className="font-bold text-[23.5pt] text-[#064E3B] tracking-wide leading-none"
                      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                    >
                      {CERTIFICATE_06_DATA.categoryTitle}
                    </h2>
                    <div className="w-[107mm] h-[0.5mm] bg-[#D97805] mx-auto mt-[2.2mm]" />
                  </div>

                  {/* INTRODUCTORY PARAGRAPH */}
                  <p className="text-center font-sans text-[10.2pt] text-[#0F172A] leading-[1.38] mt-[3.8mm] max-w-[248mm] mx-auto">
                    A <strong className="font-semibold">Editora Mente e Saúde</strong> (CNPJ: 51.372.335/0001-71), em
                    parceria institucional com o{' '}
                    <strong className="font-semibold">Centro Profissionalizante Maria Dalva de Araújo</strong> (CNPJ:
                    51.269.112/0001-83), certifica para os devidos fins de comprovação curricular, acadêmica e de
                    títulos (Lei nº 9.394/96) que
                  </p>

                  {/* HOLDER HIGHLIGHT BOX */}
                  <div
                    className="mx-auto mt-[3.5mm] flex flex-col items-center justify-center text-center"
                    style={{
                      width: '249mm',
                      height: '21mm',
                      backgroundColor: '#EDFCF5',
                      border: '0.35mm solid #D97805'
                    }}
                  >
                    <h3
                      className="font-bold text-[22.5pt] text-[#0A1D56] tracking-wide leading-none"
                      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                    >
                      {CERTIFICATE_06_DATA.holderName}
                    </h3>
                    <p className="font-sans font-bold text-[10pt] text-[#0F172A] mt-[2mm]">
                      Médico &nbsp;|&nbsp; CPF: {CERTIFICATE_06_DATA.holderCpf} &nbsp;|&nbsp;{' '}
                      {CERTIFICATE_06_DATA.holderInstitution}
                    </p>
                  </div>

                  {/* BODY DESCRIPTIVE PARAGRAPHS */}
                  <div className="mx-auto mt-[4.2mm] w-[249mm] text-left font-sans text-[10pt] text-[#0F172A] leading-[1.42] space-y-[3.2mm]">
                    <p>
                      concluiu com <strong className="font-semibold">APROVAÇÃO</strong> e aproveitamento integral a
                      Atividade Extracurricular intitulada{' '}
                      <strong className="font-semibold">"{CERTIFICATE_06_DATA.eventTitle}"</strong>, desenvolvida na
                      modalidade de <strong className="font-semibold">Congresso Médico</strong>, realizada no período de{' '}
                      <strong className="font-semibold">{CERTIFICATE_06_DATA.period}</strong>, contabilizando carga
                      horária total de <strong className="font-semibold">{CERTIFICATE_06_DATA.totalHoursText}</strong>.
                    </p>
                    <p>
                      No âmbito deste evento científico interdisciplinar transmitido em ambiente virtual de
                      aprendizagem, o profissional cumpriu integralmente a programação de conferências magnas, simpósios
                      satélites, mesas-redondas digitais sobre manejo clínico-cirúrgico e urgências oftalmológicas, além
                      do fórum científico de discussão de casos e resumos expandidos, obtendo frequência certificada de
                      100% e nota final <strong className="font-semibold">{CERTIFICATE_06_DATA.grade} (APROVADO)</strong>.
                    </p>
                  </div>

                  {/* LOCATION AND DATE */}
                  <p
                    className="text-center italic text-[13pt] text-[#0F172A] mt-[4.5mm]"
                    style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                  >
                    {CERTIFICATE_06_DATA.issueLocationAndDate}
                  </p>
                </div>

                {/* BOTTOM SIGNATURES, SEAL, QR CODE & MANUAL AUTHENTICATION */}
                <div>
                  <div className="flex items-end justify-between mt-[1mm]">
                    {/* Left Signature */}
                    <div className="w-[78mm] flex flex-col items-center text-center">
                      <img
                        src={CERTIFICATE_06_DATA.issuerLeft.signaturePath}
                        alt="Assinatura Bárbara Lima dos Santos"
                        referrerPolicy="no-referrer"
                        className="w-[62mm] h-[17.5mm] object-contain -mb-[1mm]"
                      />
                      <div className="w-full h-[0.35mm] bg-[#0F172A] mb-[1.2mm]" />
                      <p className="font-sans font-bold text-[7.8pt] text-[#064E3B]">BÁRBARA LIMA DOS SANTOS</p>
                      <p className="font-sans text-[6.8pt] text-[#0F172A]">
                        Editora-Chefe e Coordenadora de Extensão Editorial
                      </p>
                      <p className="font-mono-tabular font-bold text-[6.1pt] text-[#064E3B] mt-[0.4mm]">
                        Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                      </p>
                    </div>

                    {/* Center Triple Authentication Lock (Golden Seal + QR Code + Manual Key Box) */}
                    <div className="flex items-center gap-[2.5mm]">
                      {/* Golden Public Faith Seal */}
                      <div
                        className="rounded-full flex flex-col items-center justify-center text-center shrink-0"
                        style={{
                          width: '23mm',
                          height: '23mm',
                          backgroundColor: '#FFF2C7',
                          border: '0.6mm solid #D97805'
                        }}
                      >
                        <span
                          className="font-bold text-[6.3pt] text-[#78350F] leading-tight"
                          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                        >
                          SELO OFICIAL
                        </span>
                        <span
                          className="font-bold text-[7.8pt] text-[#78350F] leading-tight mt-[0.5mm]"
                          style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                        >
                          FÉ PÚBLICA
                        </span>
                        <span className="font-mono-tabular font-bold text-[5.2pt] text-[#78350F] mt-[1mm]">
                          {CERTIFICATE_06_DATA.code}
                        </span>
                      </div>

                      {/* QR Code Box */}
                      <a
                        href={fullVerificationUrl}
                        className="bg-white flex items-center justify-center p-[1mm] shrink-0"
                        style={{
                          width: '25mm',
                          height: '25mm',
                          border: '0.3mm solid #054F3B'
                        }}
                        title="Verificar autenticidade via QR Code"
                      >
                        {qrDataUrl && (
                          <img
                            src={qrDataUrl}
                            alt={`QR Code de Verificação ${CERTIFICATE_06_DATA.code}`}
                            className="w-full h-full object-contain"
                          />
                        )}
                      </a>

                      {/* Manual Authentication Box */}
                      <div
                        className="bg-white flex flex-col justify-between p-[2mm] text-left shrink-0"
                        style={{
                          width: '51mm',
                          height: '25mm',
                          border: '0.3mm solid #054F3B'
                        }}
                      >
                        <p className="font-sans font-bold text-[6pt] text-[#064E3B] tracking-tight">
                          AUTENTICAÇÃO PÚBLICA MANUAL
                        </p>
                        <p className="font-mono-tabular font-bold text-[6.1pt] text-[#0F172A]">
                          Cód.: {CERTIFICATE_06_DATA.code}
                        </p>
                        <p className="font-mono-tabular font-bold text-[6.1pt] text-[#92400E]">
                          Chave: {CERTIFICATE_06_DATA.controlKey}
                        </p>
                        <div>
                          <p className="font-sans font-bold text-[5.5pt] text-[#0A1D56]">
                            Endereço p/ Verificação Online:
                          </p>
                          <a
                            href={fullVerificationUrl}
                            className="font-mono-tabular text-[4.7pt] text-[#0F172A] hover:underline block truncate"
                          >
                            {shortDisplayUrl}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right Signature */}
                    <div className="w-[78mm] flex flex-col items-center text-center">
                      <img
                        src={CERTIFICATE_06_DATA.issuerRight.signaturePath}
                        alt="Assinatura James Araújo de Santana"
                        referrerPolicy="no-referrer"
                        className="w-[62mm] h-[17.5mm] object-contain -mb-[1mm]"
                      />
                      <div className="w-full h-[0.35mm] bg-[#0F172A] mb-[1.2mm]" />
                      <p className="font-sans font-bold text-[7.8pt] text-[#0A1D56]">JAMES ARAÚJO DE SANTANA</p>
                      <p className="font-sans text-[6.8pt] text-[#0F172A]">
                        Coordenador de Extensão e Projetos Educativos
                      </p>
                      <p className="font-mono-tabular font-bold text-[5.9pt] text-[#0A1D56] mt-[0.4mm]">
                        Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                      </p>
                    </div>
                  </div>

                  {/* Bottom Verification Strip */}
                  <div className="text-center mt-[3mm]">
                    <p className="font-mono-tabular font-bold text-[6.1pt] text-[#064E3B]">
                      Verifique via QR Code ou acesse{' '}
                      <a href={fullVerificationUrl} className="underline">
                        {shortDisplayUrl}
                      </a>{' '}
                      informando o Código {CERTIFICATE_06_DATA.code} ou Chave {CERTIFICATE_06_DATA.controlKey}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}

      {/* LAUDA 2 — VERSO OFICIAL (MEMORIAL DESCRITIVO E MATRIZ DE 30 HORAS) */}
      {(activePageFilter === 'both' || activePageFilter === 'page2') && (
        <div
          className="w-full flex justify-center"
          style={{
            height: scale < 1 ? `${793.7 * scale}px` : 'auto'
          }}
        >
          <div
            className="cert-scale-container origin-top"
            style={{
              transform: scale < 1 ? `scale(${scale})` : 'none'
            }}
          >
            <article
              aria-label="Lauda 2 - Verso Oficial do Certificado Nº 06"
              className="cert-a4-page shadow-xl border border-slate-300/80 select-text text-[#0F172A]"
            >
              {/* Triple Institutional Borders */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '5mm',
                  border: '0.8mm solid #054F3B'
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '6.8mm',
                  border: '0.35mm solid #D97805'
                }}
              />
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: '8.2mm',
                  border: '0.5mm solid #0A1C57'
                }}
              />

              {/* Inner Content Area */}
              <div
                className="relative w-full h-full flex flex-col justify-between"
                style={{ padding: '12mm 14mm 10.5mm 14mm' }}
              >
                <div>
                  {/* VERSO HEADER */}
                  <div className="flex items-center gap-[3.5mm] pb-[2.8mm] border-b-[0.5mm] border-[#054F3B]">
                    <div className="flex items-center gap-[2mm] shrink-0">
                      <img
                        src={CERTIFICATE_06_DATA.issuerLeft.logoPath}
                        alt="Logo Editora Mente e Saúde"
                        referrerPolicy="no-referrer"
                        className="w-[13mm] h-[13mm] object-contain"
                      />
                      <img
                        src={CERTIFICATE_06_DATA.issuerRight.logoPath}
                        alt="Logo Centro Profissionalizante Maria Dalva de Araújo"
                        referrerPolicy="no-referrer"
                        className="w-[13mm] h-[13mm] object-contain"
                      />
                    </div>
                    <div>
                      <h2
                        className="font-bold text-[13.5pt] text-[#064E3B] tracking-tight leading-tight"
                        style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                      >
                        MEMORIAL DESCRITIVO E REGISTRO ACADÊMICO DE ATIVIDADE EXTRACURRICULAR
                      </h2>
                      <p className="font-sans text-[8.5pt] text-[#0F172A] mt-[0.5mm]">
                        Verso Oficial do Certificado Nº {CERTIFICATE_06_DATA.certNumber} · Fé Pública Interinstitucional
                        e Validação Curricular
                      </p>
                    </div>
                  </div>

                  {/* SECTION 1 & SECTION 2 BOXES */}
                  <div className="grid grid-cols-12 gap-[4mm] mt-[3mm]">
                    {/* Box 1: Dados de Identificação do Profissional */}
                    <div
                      className="col-span-7 bg-white p-[3.2mm]"
                      style={{ border: '0.3mm solid #054F3B' }}
                    >
                      <h3 className="font-sans font-bold text-[8.2pt] text-[#064E3B] mb-[1.8mm]">
                        1. DADOS DE IDENTIFICAÇÃO DO PROFISSIONAL
                      </h3>
                      <div className="font-sans text-[8.3pt] text-[#0F172A] space-y-[1.1mm] leading-snug">
                        <p>
                          <span className="font-medium">Titular Certificado:</span> {CERTIFICATE_06_DATA.holderName}
                        </p>
                        <p>
                          <span className="font-medium">CPF Registrado:</span> {CERTIFICATE_06_DATA.holderCpf}
                        </p>
                        <p>
                          <span className="font-medium">Qualificação Profissional:</span>{' '}
                          {CERTIFICATE_06_DATA.holderRole}
                        </p>
                        <p>
                          <span className="font-medium">Instituição de Origem:</span>{' '}
                          {CERTIFICATE_06_DATA.holderInstitution}
                        </p>
                      </div>
                    </div>

                    {/* Box 2: Enquadramento Curricular e Pontuação */}
                    <div
                      className="col-span-5 bg-[#F0F5FF] p-[3.2mm] flex flex-col justify-between"
                      style={{ border: '0.3mm solid #0A1C57' }}
                    >
                      <div>
                        <h3 className="font-sans font-bold text-[8.2pt] text-[#0A1D56] mb-[1.8mm]">
                          2. ENQUADRAMENTO CURRICULAR E PONTUAÇÃO
                        </h3>
                        <p className="font-sans font-bold text-[7.8pt] text-[#0F172A] leading-[1.32]">
                          {CERTIFICATE_06_DATA.item09Enquadramento}
                        </p>
                      </div>
                      <p className="font-mono-tabular font-bold text-[6.6pt] text-[#064E3B] mt-[2mm]">
                        Período: {CERTIFICATE_06_DATA.periodShort} | Total: 30h (APROVADO - Nota{' '}
                        {CERTIFICATE_06_DATA.grade})
                      </p>
                    </div>
                  </div>

                  {/* SECTION 3: MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (30 HORAS) */}
                  <div className="mt-[3mm]">
                    <div
                      className="bg-[#EDFCF5] px-[4mm] py-[1.6mm]"
                      style={{ border: '0.3mm solid #054F3B' }}
                    >
                      <h3 className="font-sans font-bold text-[8.2pt] text-[#064E3B]">
                        3. MATRIZ PROGRAMÁTICA E METODOLOGIA PEDAGÓGICA (30 HORAS)
                      </h3>
                    </div>

                    <div className="border-x border-b border-[#CCD6E0] divide-y divide-[#CCD6E0] bg-white">
                      {CERTIFICATE_06_DATA.axes.map((axis) => (
                        <div
                          key={axis.id}
                          className="grid grid-cols-12 items-center"
                          style={{ minHeight: '14mm' }}
                        >
                          <div className="col-span-4 px-[3mm] py-[1.5mm] border-r border-[#E2E8F0] h-full flex flex-col justify-center">
                            <p className="font-sans font-bold text-[7.3pt] text-[#0A1D56] leading-[1.18]">
                              {axis.titleLine1}
                              <br />
                              {axis.titleLine2}
                            </p>
                            <p className="font-sans text-[6.2pt] text-[#475569] mt-[0.8mm] leading-tight">
                              {axis.subtitle}
                            </p>
                          </div>
                          <div className="col-span-7 px-[3mm] py-[1.5mm] border-r border-[#E2E8F0] h-full flex items-center">
                            <p className="font-sans text-[7.3pt] text-[#0F172A] leading-[1.25]">
                              {axis.descriptionLine1} {axis.descriptionLine2}
                            </p>
                          </div>
                          <div className="col-span-1 px-[2mm] py-[1.5mm] text-center font-mono-tabular font-bold text-[8pt] text-[#064E3B]">
                            {axis.hours}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 4: REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES */}
                  <div
                    className="mt-[3mm] bg-[#FFFAEB] p-[3.2mm] flex items-center justify-between gap-[4mm]"
                    style={{ border: '0.35mm solid #D97805' }}
                  >
                    <div className="flex-1 space-y-[1.1mm]">
                      <h3 className="font-sans font-bold text-[8.2pt] text-[#92400E]">
                        4. REGISTRO OFICIAL DE FÉ PÚBLICA, ENDEREÇO WEB E CHAVES DE VERIFICAÇÃO DE AUTENTICIDADE
                      </h3>
                      <p className="font-sans text-[7.8pt] text-[#0F172A] leading-[1.25]">
                        Certificado registrado sob o nº {CERTIFICATE_06_DATA.certNumber} no Livro de Extensão e Cursos
                        nº {CERTIFICATE_06_DATA.bookNumber}, Folha {CERTIFICATE_06_DATA.sheetNumber}, expedido pela
                        Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) e Centro Profissionalizante Maria Dalva de
                        Araújo (CNPJ: 51.269.112/0001-83).
                      </p>
                      <p className="font-mono-tabular font-bold text-[7.6pt] text-[#064E3B]">
                        CÓDIGO DE AUTENTICIDADE: {CERTIFICATE_06_DATA.code} &nbsp;|&nbsp; CHAVE DE CONTROLE / DÍGITO:{' '}
                        {CERTIFICATE_06_DATA.controlKey}
                      </p>
                      <p className="font-mono-tabular font-bold text-[6.8pt] text-[#0A1D56]">
                        ENDEREÇO PARA VERIFICAÇÃO MANUAL (SEM QR CODE):{' '}
                        <a href={fullVerificationUrl} className="underline">
                          {fullVerificationUrl}
                        </a>
                      </p>
                      <p className="font-mono-tabular font-bold text-[7pt] text-[#0F172A]">
                        HASH SHA-256: {CERTIFICATE_06_DATA.sha256}
                      </p>
                    </div>

                    {/* Verso QR Code */}
                    <a
                      href={fullVerificationUrl}
                      className="bg-white p-[1mm] shrink-0 flex items-center justify-center"
                      style={{
                        width: '25.5mm',
                        height: '25.5mm',
                        border: '0.3mm solid #054F3B'
                      }}
                      title="Verificar autenticidade"
                    >
                      {qrDataUrl && (
                        <img
                          src={qrDataUrl}
                          alt={`QR Code Verso ${CERTIFICATE_06_DATA.code}`}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </a>
                  </div>
                </div>

                {/* VERSO FOOTER SIGNATURES */}
                <div className="flex items-end justify-between pt-[1mm]">
                  {/* Left Compact Signature */}
                  <div className="w-[74mm] flex flex-col items-center text-center">
                    <img
                      src={CERTIFICATE_06_DATA.issuerLeft.signaturePath}
                      alt="Assinatura Bárbara Lima dos Santos"
                      referrerPolicy="no-referrer"
                      className="w-[54mm] h-[14.5mm] object-contain -mb-[1mm]"
                    />
                    <div className="w-full h-[0.35mm] bg-[#0F172A] mb-[1mm]" />
                    <p className="font-sans font-bold text-[7.6pt] text-[#064E3B]">BÁRBARA LIMA DOS SANTOS</p>
                    <p className="font-mono-tabular font-bold text-[6.2pt] text-[#064E3B]">
                      Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)
                    </p>
                  </div>

                  {/* Center Date & Validity Notice */}
                  <div className="text-center flex-1 px-[3mm]">
                    <p
                      className="italic text-[10.5pt] text-[#0F172A]"
                      style={{ fontFamily: "'Times New Roman', Georgia, serif" }}
                    >
                      {CERTIFICATE_06_DATA.issueLocationAndDate}
                    </p>
                    <p className="font-sans font-bold text-[6.8pt] text-[#475569] mt-[0.8mm]">
                      Documento Oficial de 2 Laudas (Frente e Verso) · Válido em Todo o Território Nacional
                    </p>
                    <p className="font-mono-tabular text-[6.2pt] text-[#064E3B] mt-[0.5mm]">
                      Registro: {CERTIFICATE_06_DATA.code} · Chave: {CERTIFICATE_06_DATA.controlKey}
                    </p>
                  </div>

                  {/* Right Compact Signature */}
                  <div className="w-[74mm] flex flex-col items-center text-center">
                    <img
                      src={CERTIFICATE_06_DATA.issuerRight.signaturePath}
                      alt="Assinatura James Araújo de Santana"
                      referrerPolicy="no-referrer"
                      className="w-[54mm] h-[14.5mm] object-contain -mb-[1mm]"
                    />
                    <div className="w-full h-[0.35mm] bg-[#0F172A] mb-[1mm]" />
                    <p className="font-sans font-bold text-[7.6pt] text-[#0A1D56]">JAMES ARAÚJO DE SANTANA</p>
                    <p className="font-mono-tabular font-bold text-[6.2pt] text-[#0A1D56]">
                      Centro Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      )}
    </div>
  );
};
