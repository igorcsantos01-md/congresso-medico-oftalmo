/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  FileDown,
  Printer,
  ShieldCheck,
  Terminal,
  BookOpen,
  Award,
  Globe,
  Check,
  Copy,
  FileText,
  Layers
} from 'lucide-react';
import {
  CERTIFICATE_06_DATA,
  CONGRESS_ABSTRACTS,
  generateMasterGitHubPrompt
} from './data/congressData';
import { CertificatePreview } from './components/CertificatePreview';
import { ValidatorSection } from './components/ValidatorSection';
import { GitHubCommandModal } from './components/GitHubCommandModal';
import { generateCertificate06Pdf } from './utils/generateCertificatePdf';

export default function App() {
  const [baseUrl, setBaseUrl] = useState<string>(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return CERTIFICATE_06_DATA.defaultVercelUrl;
  });
  const [activeAxisId, setActiveAxisId] = useState<string>('eixo-1');
  const [abstractFilter, setAbstractFilter] = useState<string>('Todos');
  const [certPageFilter, setCertPageFilter] = useState<'both' | 'page1' | 'page2'>('both');
  const [urlCodeParam, setUrlCodeParam] = useState<string>('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const codigo = params.get('codigo') || params.get('chave') || '';
    if (codigo) {
      setUrlCodeParam(codigo);
    }
    if (codigo || window.location.hash === '#validador') {
      setTimeout(() => {
        const el = document.getElementById('validador');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generateCertificate06Pdf(baseUrl);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleNativePrint = () => {
    setCertPageFilter('both');
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredAbstracts =
    abstractFilter === 'Todos'
      ? CONGRESS_ABSTRACTS
      : CONGRESS_ABSTRACTS.filter((item) => item.area === abstractFilter);

  const selectedAxis =
    CERTIFICATE_06_DATA.axes.find((a) => a.id === activeAxisId) || CERTIFICATE_06_DATA.axes[0];

  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const fullVerificationUrl = `${cleanBaseUrl}/?codigo=${CERTIFICATE_06_DATA.code}#validador`;

  const handleCopyMasterPrompt = () => {
    navigator.clipboard.writeText(generateMasterGitHubPrompt(baseUrl));
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F9FB] text-[#0F172A]">
      {/* TOP BAR CONTRACT: 3 ZONES (Brand | 4 Nav Links | 1 Primary CTA) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-3.5 no-print">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#topo"
            className="text-lg font-editorial font-bold tracking-tight text-[#064E3B] whitespace-nowrap shrink-0"
          >
            Editora Mente e Saúde · I CMV-ICSO
          </a>

          {/* Zone 2: 4 concise single-line navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#congresso"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              O Congresso
            </a>
            <a
              href="#programacao"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Programação 30h
            </a>
            <a
              href="#certificado"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Certificado Nº 06
            </a>
            <a
              href="#validador"
              className="hover:text-[#064E3B] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Validador Oficial
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#064E3B] hover:bg-[#053F30] rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer disabled:opacity-60"
            >
              <FileDown className="w-3.5 h-3.5" />
              {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF Oficial'}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION & INSTITUTIONAL OVERVIEW */}
      <section
        id="topo"
        className="bg-gradient-to-b from-[#071D33] via-[#0B2545] to-[#0F3156] text-white pt-14 pb-12 border-b border-slate-800 no-print"
      >
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Event Narrative & Primary Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#34D399]">
                  Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde · Edição 2024
                </p>
                <h1
                  className="text-3xl sm:text-4xl lg:text-[42px] font-editorial font-bold text-white leading-[1.12] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  I Congresso Médico Virtual Interdisciplinar de Atualização Clínica, Cirúrgica e Saúde Ocular
                </h1>
                <p className="text-slate-200 text-base leading-relaxed max-w-[68ch]">
                  Evento científico nacional transmitido 100% em ambiente virtual de aprendizagem entre{' '}
                  <strong className="text-white font-semibold">05 e 23 de agosto de 2024</strong>, integrando
                  conferências magnas, mesas-redondas digitais e fórum de resumos expandidos nas interfaces entre a
                  Clínica Médica, a Cirurgia Geral e a Oftalmologia Clínica e Cirúrgica.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-5 py-3 bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-md cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  <FileDown className="w-4 h-4" />
                  {isGeneratingPdf
                    ? 'Gerando PDF Vetorial (2 Laudas)...'
                    : 'Baixar Certificado Nº 06 (PDF Editável/Selecionável)'}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('certificado')}
                  className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <FileText className="w-4 h-4" />
                  Visualizar Certificado na Tela
                </button>
                <button
                  type="button"
                  onClick={() => setIsGitHubModalOpen(true)}
                  className="px-4 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-mono-tabular font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Terminal className="w-4 h-4" />
                  Comando GitHub & Prompt
                </button>
              </div>
            </div>

            {/* Right Column: Official Registry & Institutional Co-Emission Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-[#102C4E]/90 border border-slate-700/80 rounded-xl p-6 shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                  <div className="flex items-center gap-3">
                    <img
                      src={CERTIFICATE_06_DATA.issuerLeft.logoPath}
                      alt="Editora Mente e Saúde"
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-md bg-white p-0.5 object-contain"
                    />
                    <img
                      src={CERTIFICATE_06_DATA.issuerRight.logoPath}
                      alt="Centro Profissionalizante Maria Dalva de Araújo"
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full bg-white p-0.5 object-contain"
                    />
                  </div>
                  <div className="text-right font-mono-tabular">
                    <span className="text-xs text-emerald-300 block">CERTIFICADO Nº 06 · ITEM 09</span>
                    <span className="text-sm font-bold text-white">{CERTIFICATE_06_DATA.code}</span>
                  </div>
                </div>

                <dl className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <dt className="text-slate-400">Profissional Certificado</dt>
                    <dd className="font-bold text-white text-right">{CERTIFICATE_06_DATA.holderName}</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <dt className="text-slate-400">Registro / Vínculo</dt>
                    <dd className="font-mono-tabular text-slate-200 text-right">
                      CPF: {CERTIFICATE_06_DATA.holderCpf} · UNIFAN
                    </dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <dt className="text-slate-400">Enquadramento Curricular</dt>
                    <dd className="text-emerald-300 font-medium text-right">Item 09 — Congressos Médicos (30h)</dd>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <dt className="text-slate-400">Chave de Controle</dt>
                    <dd className="font-mono-tabular font-semibold text-amber-300 text-right">
                      {CERTIFICATE_06_DATA.controlKey}
                    </dd>
                  </div>
                  <div className="flex justify-between py-1">
                    <dt className="text-slate-400">Livro / Folha / Nota</dt>
                    <dd className="font-mono-tabular text-slate-200 text-right">
                      Livro {CERTIFICATE_06_DATA.bookNumber} · Folha {CERTIFICATE_06_DATA.sheetNumber} · Nota{' '}
                      {CERTIFICATE_06_DATA.grade}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-700/80 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-300">
                  Verificação Pública SHA-256 Ativa
                </span>
                <button
                  type="button"
                  onClick={() => scrollToSection('validador')}
                  className="px-3.5 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/40 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Validar Agora
                </button>
              </div>
            </div>
          </div>

          {/* Operational Utility Strip (Full-Width 4-Column Row below Hero Split) */}
          <div className="mt-10 pt-6 border-t border-slate-700/70 grid grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-300 font-mono-tabular">
            <div>
              <span className="text-slate-400 block">CARGA HORÁRIA CERTIFICADA</span>
              <strong className="text-base text-white font-bold">30 Horas (4 Eixos Temáticos)</strong>
            </div>
            <div>
              <span className="text-slate-400 block">PERÍODO DE REALIZAÇÃO</span>
              <strong className="text-base text-white font-bold">05 a 23 de Agosto de 2024</strong>
            </div>
            <div>
              <span className="text-slate-400 block">ENTIDADES CERTIFICADORAS</span>
              <strong className="text-sm text-white font-bold">Editora Mente e Saúde & Centro M. D. Araújo</strong>
            </div>
            <div>
              <span className="text-slate-400 block">AMPARO LEGAL & EDITAL</span>
              <strong className="text-sm text-emerald-300 font-bold">Lei nº 9.394/96 · Item 09 (&ge; 30h)</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: EXPLICAÇÃO DETALHADA E INTERATIVA SOBRE O I CONGRESSO MÉDICO VIRTUAL */}
      <section id="congresso" className="py-16 bg-white border-b border-slate-200 no-print">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Editorial Essay Column (70%) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B]">
                  01. Arquitetura Científica e Escopo Interdisciplinar
                </p>
                <h2 className="text-3xl sm:text-4xl font-editorial font-bold text-slate-900 tracking-tight">
                  A Convergência entre a Clínica Médica, a Cirurgia Geral e a Saúde Ocular
                </h2>
              </div>

              <div className="prose prose-slate max-w-[70ch] text-slate-700 leading-relaxed space-y-4 text-[15.5px]">
                <p className="first-letter:text-5xl first-letter:font-editorial first-letter:font-bold first-letter:text-[#064E3B] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                  O <strong>I Congresso Médico Virtual Interdisciplinar de Atualização Clínica, Cirúrgica e Saúde Ocular</strong>{' '}
                  foi concebido pela Comissão Organizadora da <em>Editora Mente e Saúde</em> (CNPJ: 51.372.335/0001-71)
                  em cooperação técnica e pedagógica com o <em>Centro Profissionalizante Maria Dalva de Araújo</em>{' '}
                  (CNPJ: 51.269.112/0001-83) para responder a uma lacuna crítica da prática médica contemporânea: a
                  necessidade de articulação diagnóstica e terapêutica entre as grandes áreas da medicina clínica, o
                  cuidado perioperatório e as manifestações oftalmológicas de doenças sistêmicas.
                </p>
                <p>
                  Ao longo de <strong>30 (trinta) horas</strong> distribuídas entre 05 e 23 de agosto de 2024 em
                  ambiente virtual de aprendizagem (AVA), o congresso reuniu conferências síncronas e assíncronas,
                  simpósios satélites, mesas-redondas baseadas em casos reais e um fórum de discussão de resumos
                  científicos. O programa destacou como patologias de alta prevalência — tais como hipertensão arterial
                  sistêmica resistente, diabetes mellitus descompensado, sepse, traumas craniofaciais e distúrbios da
                  coagulação — impactam diretamente a microcirculação retiniana, o nervo óptico e o planejamento de
                  microcirurgias oculares.
                </p>
                <p>
                  Para fins de comprovação curricular e pontuação em processos seletivos de residência médica (em
                  especial o <strong>Item 09 — Atividades Extracurriculares: Congressos Médicos com pelo menos 30 horas</strong>),
                  a participação integral exigiu presença comprovada nos quatro eixos estruturantes e aprovação na
                  avaliação somativa final de conhecimentos interdisciplinares, na qual o médico titular{' '}
                  <strong>Lucas Gonçalves Silveira</strong> obteve aproveitamento de excelência com{' '}
                  <strong>nota final 9,8 (Aprovado)</strong>.
                </p>
              </div>
            </div>

            {/* Institutional Margin Sidebar (30%) */}
            <aside className="lg:col-span-4 bg-[#F7F9FB] border border-slate-200 rounded-xl p-6 space-y-5">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-wider text-[#0A1D56] font-semibold">
                  Ficha Técnica do Evento
                </p>
                <h3 className="text-xl font-editorial font-bold text-slate-900 mt-1">
                  Diretrizes e Chancela Institucional
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-700 divide-y divide-slate-200">
                <div className="pt-2">
                  <span className="font-semibold text-slate-900 block">Organização Executiva e Científica</span>
                  <span>Editora Mente e Saúde — Conselho Editorial e Comissão Organizadora (CNPJ: 51.372.335/0001-71)</span>
                </div>
                <div className="pt-3">
                  <span className="font-semibold text-slate-900 block">Co-Emissão e Registro Educacional</span>
                  <span>Centro Profissionalizante Maria Dalva de Araújo (CNPJ: 51.269.112/0001-83)</span>
                </div>
                <div className="pt-3">
                  <span className="font-semibold text-slate-900 block">Metodologia de Transmissão e Avaliação</span>
                  <span>
                    Ambiente Virtual de Aprendizagem com controle eletrônico de frequência (100%), fórum de discussão
                    clínico-cirúrgica e exame certificador final.
                  </span>
                </div>
                <div className="pt-3">
                  <span className="font-semibold text-slate-900 block">Rastreabilidade Pública</span>
                  <span className="font-mono-tabular text-[#064E3B] block mt-0.5">
                    Livro nº 01/2024 · Folha 32 · Cód. EMS-CNG-2024-0906
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* SECTION 2: PROGRAMAÇÃO CIENTÍFICA INTERATIVA (4 EIXOS = 30 HORAS) & ANAIS */}
      <section id="programacao" className="py-16 bg-[#F7F9FB] border-b border-slate-200 no-print">
        <div className="max-w-[1200px] mx-auto px-6 space-y-12">
          {/* Interactive 4-Axis Explorer */}
          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B]">
                  02. Matriz Programática e Metodologia Pedagógica (30 Horas)
                </p>
                <h2 className="text-3xl font-editorial font-bold text-slate-900 mt-1">
                  Explore os 4 Eixos Científicos do Congresso
                </h2>
              </div>
              <p className="text-xs font-mono-tabular text-slate-600">
                Selecione um eixo abaixo para inspecionar conferências, temas e carga horária
              </p>
            </div>

            {/* Interactive Segmented Axis Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
              {CERTIFICATE_06_DATA.axes.map((axis) => {
                const isSelected = axis.id === activeAxisId;
                return (
                  <button
                    key={axis.id}
                    type="button"
                    onClick={() => setActiveAxisId(axis.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#064E3B] text-white border-[#064E3B] shadow-md'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-mono-tabular font-bold uppercase ${
                            isSelected ? 'text-emerald-200' : 'text-[#064E3B]'
                          }`}
                        >
                          {axis.axisNumber}
                        </span>
                        <span
                          className={`text-xs font-mono-tabular font-bold ${
                            isSelected ? 'text-amber-300' : 'text-slate-600'
                          }`}
                        >
                          {axis.hours}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm mt-2 leading-snug">
                        {axis.titleLine1.replace(/^Eixo [I|V]+ — /, '')} {axis.titleLine2}
                      </h3>
                    </div>
                    <p
                      className={`text-xs mt-3 line-clamp-2 ${
                        isSelected ? 'text-emerald-100' : 'text-slate-500'
                      }`}
                    >
                      {axis.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Axis Detail View */}
            <div className="mt-6 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#064E3B] font-semibold">
                    {selectedAxis.axisNumber} · Carga Horária Certificada: {selectedAxis.hours}
                  </span>
                  <h3 className="text-2xl font-editorial font-bold text-slate-900 mt-1">
                    {selectedAxis.titleLine1} {selectedAxis.titleLine2}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{selectedAxis.subtitle}</p>
                </div>
                <div className="text-left lg:text-right font-mono-tabular shrink-0">
                  <span className="text-xs text-slate-500 block">STATUS DO TITULAR NESTE EIXO</span>
                  <span className="text-sm font-bold text-[#064E3B]">100% Concluído · Aprovado</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                <div className="lg:col-span-7 space-y-4">
                  <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-slate-500 font-semibold">
                    Ementa Analítica e Conteúdos Abordados
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedAxis.descriptionLine1} {selectedAxis.descriptionLine2}
                  </p>
                  <ul className="space-y-2.5 pt-2">
                    {selectedAxis.topics.map((topic, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-800">
                        <span className="font-mono-tabular font-bold text-xs text-[#064E3B] mt-0.5">
                          0{i + 1}.
                        </span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 space-y-4 bg-slate-50 border border-slate-200/80 rounded-lg p-5">
                  <h4 className="text-xs font-mono-tabular uppercase tracking-wider text-[#0A1D56] font-semibold">
                    Conferencistas e Mesas-Redondas do Eixo
                  </h4>
                  <div className="space-y-4 divide-y divide-slate-200">
                    {selectedAxis.speakers.map((sp, idx) => (
                      <div key={idx} className={idx > 0 ? 'pt-4' : ''}>
                        <p className="font-bold text-sm text-slate-900">{sp.name}</p>
                        <p className="text-xs text-slate-500">
                          {sp.role} · {sp.institution}
                        </p>
                        <p className="text-xs font-medium text-[#064E3B] mt-1.5">
                          Palestra: "{sp.lecture}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fórum de Resumos Expandidos e Anais do Congresso */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#0A1D56]">
                  Anais Científicos · ISSN / Registro Editorial EMS-2024
                </p>
                <h3 className="text-2xl font-editorial font-bold text-slate-900 mt-1">
                  Fórum de Resumos Expandidos e Discussão de Casos
                </h3>
              </div>

              {/* Interactive Area Filter */}
              <div className="flex flex-wrap items-center gap-1.5 bg-slate-200/80 p-1 rounded-lg">
                {['Todos', 'Saúde Ocular & Microcirurgia', 'Clínica Médica', 'Cirurgia Geral & Trauma', 'Interdisciplinar'].map(
                  (area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => setAbstractFilter(area)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        abstractFilter === area
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {area}
                    </button>
                  )
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {filteredAbstracts.map((paper) => (
                <article
                  key={paper.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-slate-500">
                      <span>{paper.code}</span>
                      <span>·</span>
                      <span className="text-[#064E3B] font-semibold">{paper.area}</span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900 leading-snug">{paper.title}</h4>
                    <p className="text-xs text-slate-600 italic">Autores: {paper.authors}</p>
                    <p className="text-sm text-slate-700 leading-relaxed pt-1">{paper.summary}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Descritores (DeCS/MeSH): </span>
                    {paper.keywords.join(' · ')}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VISUALIZADOR DO CERTIFICADO OFICIAL Nº 06 (FRENTE E VERSO EM A4 PAISAGEM) */}
      <section id="certificado" className="py-16 bg-slate-100 border-b border-slate-300">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Controls Header (Hidden on Print) */}
          <div className="mb-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs no-print">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B] font-semibold">
                  03. Documento Oficial Incorporado · Padrão de 2 Laudas A4 Paisagem (297mm × 210mm)
                </p>
                <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 mt-1">
                  Certificado Nº 06 — Visualização Fiel com Texto Selecionável e Download PDF
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Todos os elementos gráficos, logotipos oficiais, rubricas caligráficas, selo de fé pública e QR Code
                  abaixo seguem rigorosamente o Guia de Estilo do Item 09. O texto é 100% selecionável na tela e no PDF
                  baixado.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="px-5 py-3 bg-[#064E3B] hover:bg-[#053F30] text-white text-sm font-semibold rounded-lg transition-colors flex items-center gap-2 shadow-sm cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  <FileDown className="w-4 h-4" />
                  {isGeneratingPdf ? 'Gerando PDF...' : 'Baixar PDF Oficial (2 Laudas)'}
                </button>
                <button
                  type="button"
                  onClick={handleNativePrint}
                  className="px-4 py-3 bg-[#0A1D56] hover:bg-[#071540] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <Printer className="w-4 h-4" />
                  Imprimir / Salvar PDF A4
                </button>
              </div>
            </div>

            {/* Toolbar for Page View & Dynamic Vercel URL Configuration */}
            <div className="pt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Page Selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono-tabular text-slate-500 flex items-center gap-1.5 mr-1">
                  <Layers className="w-3.5 h-3.5 text-[#064E3B]" />
                  Exibição:
                </span>
                <div className="inline-flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setCertPageFilter('both')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      certPageFilter === 'both'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    2 Laudas (Frente + Verso)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCertPageFilter('page1')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      certPageFilter === 'page1'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lauda 1 (Frente)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCertPageFilter('page2')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      certPageFilter === 'page2'
                        ? 'bg-white text-slate-900 shadow-xs font-semibold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Lauda 2 (Verso 30h)
                  </button>
                </div>
              </div>

              {/* Dynamic Verification URL / Vercel Subdomain Input */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1 max-w-xl">
                <label
                  htmlFor="cert-domain-input"
                  className="text-xs font-mono-tabular text-slate-600 whitespace-nowrap flex items-center gap-1"
                >
                  <Globe className="w-3.5 h-3.5 text-[#064E3B]" />
                  Domínio no QR Code:
                </label>
                <input
                  id="cert-domain-input"
                  type="url"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-mono-tabular text-slate-900 focus:border-[#064E3B] focus:outline-none"
                  placeholder="https://congresso-medico-virtual-1.vercel.app"
                />
                <button
                  type="button"
                  onClick={() => setBaseUrl(CERTIFICATE_06_DATA.defaultVercelUrl)}
                  className="px-2.5 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  title="Definir subdomínio padrão da Vercel"
                >
                  Subdomínio Vercel
                </button>
                {typeof window !== 'undefined' && baseUrl !== window.location.origin && (
                  <button
                    type="button"
                    onClick={() => setBaseUrl(window.location.origin)}
                    className="px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-[#064E3B] text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer"
                  >
                    URL Atual
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ACTUAL 2-PAGE A4 LANDSCAPE CERTIFICATE RENDER */}
          <CertificatePreview baseUrl={baseUrl} activePageFilter={certPageFilter} />
        </div>
      </section>

      {/* SECTION 4: SISTEMA VALIDADOR DE AUTENTICIDADE (#validador) */}
      <ValidatorSection
        initialQuery={urlCodeParam}
        baseUrl={baseUrl}
        onDownloadPdf={handleDownloadPdf}
        onPrintPdf={handleNativePrint}
        onScrollToCert={() => scrollToSection('certificado')}
        isGeneratingPdf={isGeneratingPdf}
      />

      {/* SECTION 5: COMANDO PARA REPOSITÓRIO GITHUB & PROMPT MESTRE (PRONTO PARA COPIAR) */}
      <section id="github-comando" className="py-16 bg-white border-b border-slate-200 no-print">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <p className="text-xs font-mono-tabular uppercase tracking-widest text-[#064E3B]">
                05. Repositório GitHub, Deploy na Vercel e Comando Mestre
              </p>
              <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 mt-1">
                Comando Estruturado para GitHub & Especificação Completa (Certificado Nº 06)
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Utilize o botão abaixo para copiar o comando completo para o seu repositório no GitHub ou abrir o
                configurador de comandos Git/Vercel.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleCopyMasterPrompt}
                className="px-4 py-2.5 bg-[#064E3B] hover:bg-[#053F30] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {copiedPrompt ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                {copiedPrompt ? 'Comando Copiado com Sucesso!' : 'Copiar Comando p/ GitHub'}
              </button>
              <button
                type="button"
                onClick={() => setIsGitHubModalOpen(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Terminal className="w-4 h-4" />
                Abrir Painel Git / Vercel
              </button>
            </div>
          </div>

          <div className="mt-6 bg-slate-950 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-xs font-mono-tabular text-slate-400">
              <span>PROMPT_MESTRE_GITHUB_CERTIFICADO_06_EMS-CNG-2024-0906.md</span>
              <span>URL Verificadora Ativa: {fullVerificationUrl}</span>
            </div>
            <pre className="text-xs font-mono-tabular text-slate-200 overflow-x-auto whitespace-pre-wrap max-h-80 leading-relaxed">
              {generateMasterGitHubPrompt(baseUrl)}
            </pre>
          </div>
        </div>
      </section>

      {/* INSTITUTIONAL FOOTER */}
      <footer className="bg-[#071626] text-slate-400 py-10 text-xs no-print">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-semibold text-white">
              Editora Mente e Saúde (CNPJ: 51.372.335/0001-71) & Centro Profissionalizante Maria Dalva de Araújo (CNPJ:
              51.269.112/0001-83)
            </p>
            <p>
              Programa Interinstitucional de Extensão, Comunicação Científica e Educação em Saúde · Goiânia - GO ·
              Registro Oficial Livro nº {CERTIFICATE_06_DATA.bookNumber}, Folha {CERTIFICATE_06_DATA.sheetNumber}.
            </p>
          </div>
          <div className="flex items-center gap-4 font-mono-tabular shrink-0">
            <a href="#certificado" className="hover:text-white transition-colors">
              Certificado Nº 06
            </a>
            <span>·</span>
            <a href="#validador" className="hover:text-white transition-colors">
              Validador SHA-256
            </a>
            <span>·</span>
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
            >
              Baixar PDF (2 Laudas)
            </button>
          </div>
        </div>
      </footer>

      {/* GITHUB COMMAND & PROMPT MODAL */}
      <GitHubCommandModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
        baseUrl={baseUrl}
        onChangeBaseUrl={setBaseUrl}
      />
    </div>
  );
}
