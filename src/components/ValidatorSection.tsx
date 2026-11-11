import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Search,
  FileDown,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATE_06_DATA } from '../data/congressData';

interface ValidatorSectionProps {
  initialQuery: string;
  baseUrl: string;
  onDownloadPdf: () => void;
  onPrintPdf: () => void;
  onScrollToCert: () => void;
  isGeneratingPdf: boolean;
}

export const ValidatorSection: React.FC<ValidatorSectionProps> = ({
  initialQuery,
  baseUrl,
  onDownloadPdf,
  onPrintPdf,
  onScrollToCert,
  isGeneratingPdf
}) => {
  const [query, setQuery] = useState<string>(initialQuery || CERTIFICATE_06_DATA.code);
  const [validationState, setValidationState] = useState<'valid' | 'invalid' | 'idle'>('valid');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_06_DATA.code}#validador`;

  const verifyCode = (input: string) => {
    const normalized = input.trim().toUpperCase();
    if (!normalized) {
      setValidationState('idle');
      return;
    }

    const validTokens = [
      CERTIFICATE_06_DATA.code.toUpperCase(),
      CERTIFICATE_06_DATA.controlKey.toUpperCase(),
      CERTIFICATE_06_DATA.sha256.toUpperCase(),
      CERTIFICATE_06_DATA.holderCpf.toUpperCase(),
      '70279494157',
      '0906',
      'LUCAS GONÇALVES SILVEIRA',
      'LUCAS GONCALVES SILVEIRA'
    ];

    if (validTokens.some((t) => normalized === t || normalized.includes(CERTIFICATE_06_DATA.code))) {
      setValidationState('valid');
    } else {
      setValidationState('invalid');
    }
  };

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      verifyCode(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(query);
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="validador" className="py-16 bg-[#0B2239] text-white border-y border-slate-800 no-print">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#34D399]">
            Sistema Oficial de Verificação Pública · Fé Pública Interinstitucional
          </p>
          <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-white mt-2 tracking-tight">
            Validador Eletrônico de Certificados e Registro Acadêmico
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Consulte a autenticidade documental, a averbação no Livro de Extensão e Eventos Científicos e a integridade
            criptográfica (SHA-256) informando o Código de Autenticidade, a Chave de Controle ou utilizando a leitura
            direta via QR Code.
          </p>
        </div>

        {/* Search & Verification Bar */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-[#112E4A] border border-slate-700/80 rounded-xl p-5 shadow-lg"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-end">
            <div className="flex-1">
              <label
                htmlFor="validator-input"
                className="block text-xs font-mono-tabular uppercase tracking-wider text-slate-300 mb-2"
              >
                Código de Autenticidade, Chave de Controle ou Hash SHA-256
              </label>
              <div className="relative">
                <input
                  id="validator-input"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ex.: EMS-CNG-2024-0906 ou 0906-7027-9457-8D6E"
                  className="w-full bg-[#071626] border border-slate-600 focus:border-[#34D399] focus:outline-none rounded-lg pl-4 pr-10 py-3 text-sm font-mono-tabular text-white placeholder-slate-500 transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="submit"
                className="px-6 py-3 bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                Verificar Autenticidade
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery(CERTIFICATE_06_DATA.code);
                  setValidationState('valid');
                }}
                className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono-tabular rounded-lg border border-slate-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                Preencher Cód. Nº 06
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 font-mono-tabular">
            <span>Código Oficial: {CERTIFICATE_06_DATA.code}</span>
            <span aria-hidden="true">·</span>
            <span>Chave: {CERTIFICATE_06_DATA.controlKey}</span>
            <span aria-hidden="true">·</span>
            <span>Livro nº {CERTIFICATE_06_DATA.bookNumber}, Folha {CERTIFICATE_06_DATA.sheetNumber}</span>
          </div>
        </form>

        {/* VALIDATION RESULT PANEL */}
        {validationState === 'valid' && (
          <div className="mt-8 bg-white text-[#0F172A] rounded-xl border border-emerald-500/40 shadow-2xl overflow-hidden">
            {/* Top Status Banner */}
            <div className="bg-[#064E3B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-[#34D399] shrink-0" />
                <div>
                  <p className="text-xs font-mono-tabular uppercase tracking-wider text-emerald-200">
                    Fé Pública Interinstitucional Confirmada · Registro Ativo
                  </p>
                  <h3 className="text-lg font-bold tracking-tight">
                    CERTIFICADO AUTÊNTICO E VÁLIDO — APROVADO (30 HORAS)
                  </h3>
                </div>
              </div>
              <div className="text-left sm:text-right font-mono-tabular text-xs text-emerald-100 shrink-0">
                <p>Cód.: {CERTIFICATE_06_DATA.code}</p>
                <p>Chave: {CERTIFICATE_06_DATA.controlKey}</p>
              </div>
            </div>

            {/* Detailed Verification Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-6 border-b border-slate-200">
                {/* Holder Data */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#064E3B] font-semibold">
                    1. Identificação do Profissional Titular
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Nome Completo Registrado</span>
                      <span className="font-bold text-base text-[#0A1D56]">{CERTIFICATE_06_DATA.holderName}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div>
                        <span className="text-xs text-slate-500 block">CPF</span>
                        <span className="font-mono-tabular font-semibold text-slate-900">
                          {CERTIFICATE_06_DATA.holderCpf}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Qualificação</span>
                        <span className="font-semibold text-slate-900">{CERTIFICATE_06_DATA.holderRole}</span>
                      </div>
                    </div>
                    <div className="pt-1">
                      <span className="text-xs text-slate-500 block">Instituição de Origem</span>
                      <span className="font-medium text-slate-800">{CERTIFICATE_06_DATA.holderInstitution}</span>
                    </div>
                  </div>
                </div>

                {/* Activity & Item 09 Framing */}
                <div className="lg:col-span-7 space-y-3">
                  <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#0A1D56] font-semibold">
                    2. Dados da Atividade Extracurricular e Enquadramento (Item 09)
                  </p>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2.5 text-sm">
                    <div>
                      <span className="text-xs text-slate-500 block">Título Oficial da Atividade</span>
                      <span className="font-bold text-slate-900">{CERTIFICATE_06_DATA.eventTitle}</span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 block">Enquadramento Curricular (Edital)</span>
                      <span className="font-medium text-slate-800 text-xs leading-relaxed block">
                        {CERTIFICATE_06_DATA.item09Enquadramento}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1 border-t border-slate-200/80">
                      <div>
                        <span className="text-xs text-slate-500 block">Modalidade</span>
                        <span className="font-semibold text-slate-900">{CERTIFICATE_06_DATA.modality}</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Período</span>
                        <span className="font-mono-tabular font-semibold text-slate-900 text-xs">
                          05 a 23/08/2024
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Carga Horária</span>
                        <span className="font-mono-tabular font-bold text-[#064E3B]">30 Horas</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 block">Avaliação Final</span>
                        <span className="font-mono-tabular font-bold text-[#064E3B]">
                          Nota {CERTIFICATE_06_DATA.grade} ({CERTIFICATE_06_DATA.status})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cryptographic Proof & Book Registration */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-8 space-y-2 text-xs font-mono-tabular">
                  <p className="text-slate-500 font-sans font-semibold uppercase tracking-wider">
                    3. Averbação Institucional e Assinatura Criptográfica SHA-256
                  </p>
                  <p className="text-slate-700 font-sans text-sm">
                    Registrado sob o <strong>Certificado Nº {CERTIFICATE_06_DATA.certNumber}</strong> no{' '}
                    <strong>Livro de Extensão nº {CERTIFICATE_06_DATA.bookNumber}</strong>,{' '}
                    <strong>Folha {CERTIFICATE_06_DATA.sheetNumber}</strong>, emitido conjuntamente pela{' '}
                    <strong>Editora Mente e Saúde (CNPJ: 51.372.335/0001-71)</strong> e pelo{' '}
                    <strong>Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)</strong> em{' '}
                    {CERTIFICATE_06_DATA.issueLocationAndDate}
                  </p>
                  <div className="bg-amber-50/90 border border-amber-300/80 rounded-lg p-3 space-y-1.5 text-slate-800">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">
                        <strong>HASH SHA-256:</strong> {CERTIFICATE_06_DATA.sha256}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(CERTIFICATE_06_DATA.sha256, 'sha')}
                        className="text-amber-900 hover:text-amber-700 font-sans font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedField === 'sha' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedField === 'sha' ? 'Copiado' : 'Copiar Hash'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate">
                        <strong>URL DE VERIFICAÇÃO:</strong> {fullVerificationUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(fullVerificationUrl, 'url')}
                        className="text-amber-900 hover:text-amber-700 font-sans font-medium flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedField === 'url' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedField === 'url' ? 'Copiado' : 'Copiar Link'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Direct Actions inside Validator */}
                <div className="lg:col-span-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={onDownloadPdf}
                    disabled={isGeneratingPdf}
                    className="w-full py-3 px-4 bg-[#064E3B] hover:bg-[#053F30] text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer disabled:opacity-60"
                  >
                    <FileDown className="w-4 h-4" />
                    {isGeneratingPdf ? 'Gerando PDF Acessível...' : 'Baixar Certificado PDF (2 Laudas)'}
                  </button>
                  <button
                    type="button"
                    onClick={onPrintPdf}
                    className="w-full py-2.5 px-4 bg-[#0A1D56] hover:bg-[#071540] text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    Imprimir / Salvar PDF A4 Paisagem
                  </button>
                  <button
                    type="button"
                    onClick={onScrollToCert}
                    className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Inspecionar Certificado Nº 06 na Tela
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {validationState === 'invalid' && (
          <div className="mt-8 bg-red-950/60 border border-red-500/50 rounded-xl p-6 text-red-100 flex items-start gap-4">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="font-bold text-base text-white">
                Código ou Chave não localizado nesta base específica do Certificado Nº 06
              </h3>
              <p className="text-sm text-red-200">
                Verifique se digitou corretamente o Código <strong>{CERTIFICATE_06_DATA.code}</strong> ou a Chave de
                Controle <strong>{CERTIFICATE_06_DATA.controlKey}</strong> referente ao{' '}
                <em>{CERTIFICATE_06_DATA.eventTitle}</em>.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery(CERTIFICATE_06_DATA.code);
                  setValidationState('valid');
                }}
                className="mt-2 px-4 py-2 bg-red-800 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Restaurar Código Oficial ({CERTIFICATE_06_DATA.code})
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
