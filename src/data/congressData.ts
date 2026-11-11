export interface AxisItem {
  id: string;
  axisNumber: string;
  title: string;
  subtitle: string;
  description: string;
  hours: string;
  topics: string[];
  speakers: { name: string; role: string; institution: string; lecture: string }[];
}

export interface AbstractPaper {
  id: string;
  code: string;
  area: 'Clínica Médica' | 'Cirurgia Geral & Trauma' | 'Saúde Ocular & Microcirurgia' | 'Interdisciplinar';
  title: string;
  authors: string;
  summary: string;
  keywords: string[];
}

export const CERTIFICATE_06_DATA = {
  certNumber: '06',
  bookNumber: '01/2024',
  sheetNumber: '32',
  code: 'EMS-CNG-2024-0906',
  controlKey: '0906-7027-9457-8D6E',
  sha256: '6f8a3d19c4b02e75a1928c40d6b51e29f8a17c63b4d52e90f1837a2b5c6d0906',
  defaultVercelUrl: 'https://congresso-medico-virtual-1.vercel.app',
  holderName: 'LUCAS GONÇALVES SILVEIRA',
  holderRole: 'Médico',
  holderCpf: '702.794.941-57',
  holderInstitution: 'Centro Universitário Alfredo Nasser (UNIFAN)',
  holderLine: 'Médico  |  CPF: 702.794.941-57  |  Centro Universitário Alfredo Nasser (UNIFAN)',
  eventTitle: 'I Congresso Médico Virtual Interdisciplinar de Atualização Clínica, Cirúrgica e Saúde Ocular',
  modality: 'Congresso Médico',
  categoryTitle: 'CERTIFICADO DE CONGRESSO MÉDICO',
  item09Enquadramento:
    'Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em instituições de ensino, cursos de língua e de computação, aprovação em concursos, congressos médicos (Pelo menos 30 horas por certificado)',
  period: '05 a 23 de agosto de 2024',
  periodShort: '05 a 23 de agosto de 2024',
  issueLocationAndDate: 'Goiânia - GO, 30 de agosto de 2024.',
  totalHoursNumeric: 30,
  totalHoursText: '30 (trinta) horas',
  grade: '9,8',
  status: 'APROVADO',
  frontParagraph1Lines: [
    'concluiu com APROVAÇÃO e aproveitamento integral a Atividade Extracurricular intitulada "I Congresso Médico Virtual Interdisciplinar de',
    'Atualização Clínica, Cirúrgica e Saúde Ocular", desenvolvida na modalidade de Congresso Médico, realizada no período de 05 a 23 de agosto',
    'de 2024, contabilizando carga horária total de 30 (trinta) horas.'
  ],
  frontParagraph2Lines: [
    'No âmbito deste evento científico interdisciplinar transmitido em ambiente virtual de aprendizagem, o profissional cumpriu integralmente a programação de',
    'conferências magnas, simpósios satélites, mesas-redondas digitais sobre manejo clínico-cirúrgico e urgências oftalmológicas, além do fórum científico de',
    'discussão de casos e resumos expandidos, obtendo frequência certificada de 100% e nota final 9,8 (APROVADO).'
  ],
  issuerLeft: {
    name: 'EDITORA MENTE E SAÚDE',
    cnpj: '51.372.335/0001-71',
    department: 'Conselho Editorial e Comissão Organizadora',
    signerName: 'BÁRBARA LIMA DOS SANTOS',
    signerRole: 'Editora-Chefe e Presidente da Comissão Organizadora',
    logoPath: '/assets/cert/img_1_320x320.png',
    signaturePath: '/assets/cert/img_25_480x140.png'
  },
  issuerRight: {
    name: 'CENTRO PROFISSIONALIZANTE',
    nameLine2: 'MARIA DALVA DE ARAÚJO',
    fullName: 'Centro Profissionalizante Maria Dalva de Araújo',
    shortName: 'Centro Maria Dalva de Araújo',
    cnpj: '51.269.112/0001-83',
    signerName: 'JAMES ARAÚJO DE SANTANA',
    signerRole: 'Coordenador de Extensão e Eventos Científicos',
    logoPath: '/assets/cert/img_23_320x320.png',
    signaturePath: '/assets/cert/img_28_480x140.png'
  },
  axes: [
    {
      id: 'eixo-1',
      axisNumber: 'Eixo I',
      titleLine1: 'Eixo I — Atualização em Clínica Médica, Emergências',
      titleLine2: 'Clínicas e Manejo Cardiometabólico Integrado',
      subtitle: 'Diretrizes Baseadas em Evidências, Sepse e Síndromes Coronarianas',
      descriptionLine1:
        'Conferências sobre manejo intensivo de emergências clínicas, atualização em hipertensão arterial resistente, diabetes mellitus',
      descriptionLine2:
        'tipo 2 com repercussão microvascular/retiniana e protocolos de estabilização hemodinâmica no pronto-atendimento.',
      hours: '08h 00min',
      topics: [
        'Manejo sistematizado da sepse e choque séptico nas primeiras 3 horas',
        'Interconexão cardiometabólica e microangiopatia sistêmica e retiniana',
        'Síndromes coronarianas agudas e estratificação de risco tromboembólico',
        'Controle glicêmico hospitalar e prevenção de desfechos vasculares agudos'
      ],
      speakers: [
        {
          name: 'Profa. Dra. Bárbara Lima dos Santos',
          role: 'Abertura Institucional e Curadoria Científica',
          institution: 'Editora Mente e Saúde',
          lecture: 'Medicina Baseada em Evidências na Integração Clínica, Cirúrgica e Oftalmológica'
        },
        {
          name: 'Dr. Henrique Vasconcelos Moura',
          role: 'Especialista em Clínica Médica e Terapia Intensiva',
          institution: 'Comitê Científico Convidado',
          lecture: 'Repercussões Microvasculares Sistêmicas da Crise Hipertensiva e Diabetes Descompensado'
        }
      ]
    },
    {
      id: 'eixo-2',
      axisNumber: 'Eixo II',
      titleLine1: 'Eixo II — Princípios de Cirurgia Geral, Trauma,',
      titleLine2: 'Cuidados Perioperatórios e Segurança Cirúrgica',
      subtitle: 'Protocolo ERAS/ACERTO, Trauma Craniofacial e Profilaxia Cirúrgica',
      descriptionLine1:
        'Simpósios aplicados sobre avaliação pré-anestésica, resposta endócrino-metabólica ao trauma, abordagem inicial ao politraumatizado',
      descriptionLine2:
        '(ATLS), manejo de feridas complexas, antibioticoprofilaxia cirúrgica e lista de verificação de cirurgia segura da OMS.',
      hours: '08h 00min',
      topics: [
        'Mitigação da resposta endócrino-metabólica e inflamatória ao trauma cirúrgico',
        'Abordagem primária no trauma craniofacial e orbitário em serviços de urgência',
        'Protocolos modernos de abreviação de jejum e reabilitação multimodal (ACERTO)',
        'Prevenção de infecção de sítio cirúrgico e tromboembolismo venoso perioperatório'
      ],
      speakers: [
        {
          name: 'Dr. Marcelo Alencar Peixoto',
          role: 'Cirurgião Geral e do Trauma',
          institution: 'Comitê Científico Convidado',
          lecture: 'Trauma Orbitofacial e Condutas Cirúrgicas Integradas na Sala de Emergência'
        },
        {
          name: 'Dra. Camila Fontes Nogueira',
          role: 'Anestesiologista e Segurança Perioperatória',
          institution: 'Grupo de Estudos Perioperatórios',
          lecture: 'Segurança Cirúrgica, Manejo Hemodinâmico e Proteção Ocular no Paciente Cirúrgico'
        }
      ]
    },
    {
      id: 'eixo-3',
      axisNumber: 'Eixo III',
      titleLine1: 'Eixo III — Saúde Ocular Interdisciplinar: Oftalmologia',
      titleLine2: 'Clínica, Urgências Oculares e Microcirurgia',
      subtitle: 'Síndrome do Olho Vermelho, Catarata, Glaucoma e Retinopatias',
      descriptionLine1:
        'Mesas-redondas sobre diagnóstico diferencial do olho vermelho agudo para o médico generalista, trauma ocular químico e perfurante,',
      descriptionLine2:
        'rastreamento de retinopatia diabética e hipertensiva, glaucoma agudo de ângulo fechado e avanços na facoemulsificação.',
      hours: '08h 00min',
      topics: [
        'Diagnóstico diferencial de urgência no Olho Vermelho Agudo: uveítes, ceratites e glaucoma agudo',
        'Conduta imediata no trauma ocular químico e mecânico antes da avaliação microcirúrgica',
        'Fundoscopia direta e rastreamento precoce da Retinopatia Diabética e DMRI na atenção primária',
        'Inovações em Facoemulsificação, lentes intraoculares premium e reabilitação visual pós-cirúrgica'
      ],
      speakers: [
        {
          name: 'Dr. Eduardo Paiva Cavalcanti',
          role: 'Cirurgião Oftalmologista — Segmento Anterior e Catarata',
          institution: 'Núcleo de Estudos em Saúde Ocular',
          lecture: 'Avanços Tecnológicos na Microcirurgia de Catarata e Manejo de Complicações'
        },
        {
          name: 'Dra. Renata Silveira Bernardes',
          role: 'Oftalmologista — Retina e Vítreo',
          institution: 'Divisão de Oftalmologia Clínica',
          lecture: 'Urgências Retinianas, Oclusões Vasculares e Interface com a Clínica Médica'
        }
      ]
    },
    {
      id: 'eixo-4',
      axisNumber: 'Eixo IV',
      titleLine1: 'Eixo IV — Mesas-Redondas Digitais, Discussão de',
      titleLine2: 'Casos Clínico-Cirúrgicos e Fórum de Resumos',
      subtitle: 'Tomada de Decisão Multidisciplinar, Ética Médica e Exame Certificador',
      descriptionLine1:
        'Fórum interativo de discussão de casos complexos na interface clínica-cirúrgica-oftalmológica, análise de resumos científicos',
      descriptionLine2:
        'submetidos aos anais do evento e aprovação na avaliação somativa final de certificação com nota 9,8.',
      hours: '06h 00min',
      topics: [
        'Sessão Anatomoclínica Interativa: Endocardite infecciosa com manchas de Roth e embolia séptica',
        'Discussão Colegiada: Preparo clínico-cirúrgico do paciente idoso polimórbido para cirurgia oftalmológica',
        'Apresentação de temas livres, pôsteres digitais e diretrizes éticas na comunicação médica',
        'Avaliação Somativa Final de Aproveitamento Científico (Nota obtida pelo titular: 9,8)'
      ],
      speakers: [
        {
          name: 'Prof. James Araújo de Santana',
          role: 'Coordenação de Extensão e Avaliação Pedagógica',
          institution: 'Centro Profissionalizante Maria Dalva de Araújo',
          lecture: 'Metodologia de Certificação Digital, Rastreabilidade SHA-256 e Validação Curricular'
        }
      ]
    }
  ]
};

export const CONGRESS_ABSTRACTS: AbstractPaper[] = [
  {
    id: 'abs-01',
    code: 'ANAIS-CNG-2024-014',
    area: 'Saúde Ocular & Microcirurgia',
    title: 'Manejo do Olho Vermelho Agudo no Pronto-Atendimento: Critérios de Alerta para Encaminhamento Oftalmológico de Urgência',
    authors: 'Silveira, L. G.; Santos, B. L.; Cavalcanti, E. P.',
    summary:
      'Revisão sistematizada dos sinais clínicos de alarme (redução da acuidade visual, dor ocular profunda, fotofobia intensa, hipópio, hiperemia ciliar e alterações pupilares) essenciais para diferenciar conjuntivites autolimitadas de emergências ameaçadoras à visão, como crise glaucomatosa aguda, ceratite infecciosa e uveíte anterior aguda.',
    keywords: ['Olho Vermelho', 'Emergências Oftalmológicas', 'Glaucoma Agudo', 'Atenção Primária']
  },
  {
    id: 'abs-02',
    code: 'ANAIS-CNG-2024-029',
    area: 'Clínica Médica',
    title: 'Correlação entre Controle Glicêmico Intensivo e Progressão da Retinopatia Diabética Não-Proliferativa em Pacientes Hipertensos',
    authors: 'Moura, H. V.; Silveira, L. G.; Bernardes, R. S.',
    summary:
      'Análise interdisciplinar do impacto sinérgico do controle pressórico rigoroso (<130/80 mmHg) aliado à redução sustentada da HbA1c na desaceleração do edema macular diabético e de microaneurismas retinianos, reforçando o fluxo de referência compartilhada entre clínico e oftalmologista.',
    keywords: ['Retinopatia Diabética', 'Hipertensão Arterial', 'Microangiopatia', 'Clínica Médica']
  },
  {
    id: 'abs-03',
    code: 'ANAIS-CNG-2024-042',
    area: 'Cirurgia Geral & Trauma',
    title: 'Avaliação Perioperatória e Gestão de Antitrombóticos em Cirurgias Eletivas de Médio Porte e Microcirurgias Oculares',
    authors: 'Peixoto, M. A.; Nogueira, C. F.; Santana, J. A.',
    summary:
      'Síntese de diretrizes atualizadas sobre manutenção versus suspensão temporária de antiagregantes plaquetários e anticoagulantes orais diretos (DOACs) em procedimentos cirúrgicos gerais e facoemulsificação sob anestesia tópica/locorregional, equilibrando risco hemorrágico e eventos tromboembólicos.',
    keywords: ['Segurança Cirúrgica', 'Perioperatório', 'Facoemulsificação', 'Anticoagulação']
  },
  {
    id: 'abs-04',
    code: 'ANAIS-CNG-2024-058',
    area: 'Interdisciplinar',
    title: 'Trauma Craniofacial com Comprometimento Orbitário: Protocolo de Atendimento Integrado entre Cirurgia do Trauma e Oftalmologia',
    authors: 'Peixoto, M. A.; Cavalcanti, E. P.; Silveira, L. G.',
    summary:
      'Estruturação de fluxograma assistencial para fraturas do assoalho orbitário (blow-out), hematoma retrobulbar com síndrome compartimental orbitária e indicação emergencial de cantotomia lateral para preservação do nervo óptico.',
    keywords: ['Trauma Orbitário', 'Cantotomia Lateral', 'ATLS', 'Interdisciplinaridade']
  }
];

export function generateMasterGitHubPrompt(verificationBaseUrl: string): string {
  const cleanUrl = verificationBaseUrl.replace(/\/$/, '');
  return `# COMANDO / PROMPT MESTRE PARA REPOSITÓRIO GITHUB & VERCEL — CERTIFICADO Nº 06 (ITEM 09)

## 1. Comandos Git para Subir o Repositório no GitHub e Publicar na Vercel
\`\`\`bash
# 1. Inicializar o repositório local e adicionar todos os arquivos da plataforma
git init
git add .
git commit -m "feat: Plataforma Oficial e Certificado No 06 - I Congresso Medico Virtual Interdisciplinar (EMS-CNG-2024-0906)"

# 2. Definir branch principal e conectar ao seu repositório no GitHub
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/congresso-medico-virtual-1.git
git push -u origin main

# 3. Deploy direto na Vercel (opcional via CLI ou automático pelo painel da Vercel)
npx vercel --prod --yes
\`\`\`

---

## 2. Prompt Mestre Completo (Para Replicação ou Evolução do Sistema)

CONTEXTO E OBJETIVO:
Você é um Engenheiro Front-End Sênior e Designer Editorial Acadêmico. Sua missão é manter/gerar a aplicação web completa da plataforma oficial do "I Congresso Médico Virtual Interdisciplinar de Atualização Clínica, Cirúrgica e Saúde Ocular" + Certificado Oficial Nº 06 (Item 09) em 2 Laudas A4 Paisagem (297mm x 210mm) com textos selecionáveis, download direto em PDF vetorial e sistema autenticador interativo (#validador).

DADOS EXATOS DO CERTIFICADO Nº 06 DO ITEM 09 (CONGRESSO MÉDICO — 30 HORAS):
- Titular Certificado: LUCAS GONÇALVES SILVEIRA
- Qualificação e IES: Médico | CPF: 702.794.941-57 | Centro Universitário Alfredo Nasser (UNIFAN)
- Enquadramento no Edital FUBOG: Item 09 - Atividades Extracurriculares: Cursos de extensão, estágios em instituições de ensino, cursos de língua e de computação, aprovação em concursos, congressos médicos (Pelo menos 30 horas por certificado)
- Número e Livro de Registro: Certificado Nº 06 · Livro de Extensão nº 01/2024 · Folha 32
- Código de Autenticidade: EMS-CNG-2024-0906
- Chave de Controle / Dígito: 0906-7027-9457-8D6E
- Endereço de Verificação Online: ${cleanUrl}/?codigo=EMS-CNG-2024-0906#validador
- Hash SHA-256: 6f8a3d19c4b02e75a1928c40d6b51e29f8a17c63b4d52e90f1837a2b5c6d0906
- Título da Atividade: "I Congresso Médico Virtual Interdisciplinar de Atualização Clínica, Cirúrgica e Saúde Ocular"
- Modalidade Curricular: Congresso Médico
- Período de Realização: 05 a 23 de agosto de 2024
- Data de Emissão: Goiânia - GO, 30 de agosto de 2024.
- Carga Horária Total: 30 (trinta) horas (Nota Final: 9,8 — APROVADO)

ESTRUTURA DOS 4 EIXOS NO VERSO (LAUDA 2 — 30 HORAS):
- Eixo I — Atualização em Clínica Médica, Emergências Clínicas e Manejo Cardiometabólico Integrado (08h 00min)
- Eixo II — Princípios de Cirurgia Geral, Trauma, Cuidados Perioperatórios e Segurança Cirúrgica (08h 00min)
- Eixo III — Saúde Ocular Interdisciplinar: Oftalmologia Clínica, Urgências Oculares e Microcirurgia (08h 00min)
- Eixo IV — Mesas-Redondas Digitais, Discussão de Casos Clínico-Cirúrgicos e Fórum de Resumos (06h 00min)

ASSINATURAS E INSTITUIÇÕES EMISSORAS:
- Esquerda: EDITORA MENTE E SAÚDE (CNPJ: 51.372.335/0001-71) — BÁRBARA LIMA DOS SANTOS (Editora-Chefe e Coordenadora de Extensão Editorial)
- Direita: CENTRO PROFISSIONALIZANTE MARIA DALVA DE ARAÚJO (CNPJ: 51.269.112/0001-83) — JAMES ARAÚJO DE SANTANA (Coordenador de Extensão e Projetos Educativos)`;
}
