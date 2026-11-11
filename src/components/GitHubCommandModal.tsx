import React, { useState } from 'react';
import { Terminal, Copy, Check, X, Globe } from 'lucide-react';
import { generateMasterGitHubPrompt, CERTIFICATE_06_DATA } from '../data/congressData';

interface GitHubCommandModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
  onChangeBaseUrl: (url: string) => void;
}

export const GitHubCommandModal: React.FC<GitHubCommandModalProps> = ({
  isOpen,
  onClose,
  baseUrl,
  onChangeBaseUrl
}) => {
  const [copiedTab, setCopiedTab] = useState<'all' | 'git' | null>(null);

  if (!isOpen) return null;

  const fullPrompt = generateMasterGitHubPrompt(baseUrl);
  const gitCommandsOnly = `git init
git add .
git commit -m "feat: Plataforma Oficial e Certificado No 06 - I Congresso Medico Virtual Interdisciplinar (${CERTIFICATE_06_DATA.code})"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/congresso-medico-virtual-1.git
git push -u origin main`;

  const copyText = (text: string, type: 'all' | 'git') => {
    navigator.clipboard.writeText(text);
    setCopiedTab(type);
    setTimeout(() => setCopiedTab(null), 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 no-print"
      role="dialog"
      aria-modal="true"
      aria-labelledby="github-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0B2239] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-[#34D399]" />
            <div>
              <h2 id="github-modal-title" className="text-lg font-bold tracking-tight">
                Comando p/ Repositório GitHub & Prompt Mestre — Certificado Nº 06
              </h2>
              <p className="text-xs text-slate-300 font-mono-tabular">
                Código: {CERTIFICATE_06_DATA.code} · Chave: {CERTIFICATE_06_DATA.controlKey}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-800">
          {/* Customizer for Vercel Subdomain */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <label
              htmlFor="modal-vercel-url"
              className="flex items-center gap-2 text-xs font-mono-tabular uppercase tracking-wider text-slate-600 font-semibold mb-2"
            >
              <Globe className="w-4 h-4 text-[#064E3B]" />
              Endereço Base do Site Autenticador (Gravado no QR Code, PDF e Comando)
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="modal-vercel-url"
                type="url"
                value={baseUrl}
                onChange={(e) => onChangeBaseUrl(e.target.value)}
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-mono-tabular text-slate-900 focus:border-[#064E3B] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => onChangeBaseUrl(window.location.origin)}
                className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Usar URL Atual
              </button>
              <button
                type="button"
                onClick={() => onChangeBaseUrl(CERTIFICATE_06_DATA.defaultVercelUrl)}
                className="px-3 py-2 bg-[#064E3B] hover:bg-[#053F30] text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              >
                Padrão Vercel (Congresso)
              </button>
            </div>
          </div>

          {/* Git Commands Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">
                1. Comandos de Terminal (Git / GitHub / Deploy Vercel)
              </h3>
              <button
                type="button"
                onClick={() => copyText(gitCommandsOnly, 'git')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedTab === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedTab === 'git' ? 'Comandos Git Copiados!' : 'Copiar Comandos Git'}
              </button>
            </div>
            <pre className="bg-slate-950 text-emerald-300 p-4 rounded-lg text-xs font-mono-tabular overflow-x-auto leading-relaxed">
              {gitCommandsOnly}
            </pre>
          </div>

          {/* Master Prompt Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-slate-900">
                2. Prompt / Especificação Completa para Repositório GitHub (Certificado Nº 06)
              </h3>
              <button
                type="button"
                onClick={() => copyText(fullPrompt, 'all')}
                className="px-4 py-1.5 bg-[#064E3B] hover:bg-[#053F30] text-white text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedTab === 'all' ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedTab === 'all' ? 'Prompt Completo Copiado!' : 'Copiar Comando Completo'}
              </button>
            </div>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-xs font-mono-tabular overflow-x-auto whitespace-pre-wrap max-h-72 leading-relaxed">
              {fullPrompt}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
