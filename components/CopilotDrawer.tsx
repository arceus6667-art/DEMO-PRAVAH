import React, { useState } from 'react';
import { usePravahState } from '../hooks/usePravahState';
import { RAGService } from '../services/ragService';
import { RAGAnswer } from '../types/platform';
import {
  Sparkles,
  X,
  Send,
  ShieldAlert,
  BookOpen,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'USER' | 'COPILOT';
  text: string;
  timestamp: string;
  ragAnswer?: RAGAnswer;
  actionRecommendation?: {
    label: string;
    tabTarget: string;
  };
}

export const CopilotDrawer: React.FC = () => {
  const { isCopilotOpen, setIsCopilotOpen, setActiveTab } = usePravahState();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-init',
      sender: 'COPILOT',
      text: 'Namaste! I am the PRAVAH Regulatory Copilot. Grounded strictly in certified Maharashtra gazettes, UDCPR 2020, Factories Act 1948, and CGWA 2020 circulars. (Demonstration regulatory data — verify against official sources).',
      timestamp: '11:42 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  if (!isCopilotOpen) return null;

  const quickPrompts = [
    'What is the turning radius for fire tenders in MIDC?',
    'Explain CGWA groundwater exemption rationale',
    'What are the effluent thresholds for Orange category?',
    'What changed in Gazette Amendment IND-44/B?',
    'Can I build an atomic power plant in Chakan?' // Out-of-scope query to test strict refusal fallback
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'USER',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const ragResult = RAGService.queryRegulatoryKnowledge(text);

    let actionRec: ChatMessage['actionRecommendation'] = undefined;
    if (text.toLowerCase().includes('fire') || text.toLowerCase().includes('radius')) {
      actionRec = { label: 'Go to Evidence Wallet to Resolve', tabTarget: 'evidence-wallet' };
    } else if (text.toLowerCase().includes('amendment') || text.toLowerCase().includes('solar')) {
      actionRec = { label: 'View Regulatory Impact Engine', tabTarget: 'regulatory-impact' };
    } else if (text.toLowerCase().includes('sla') || text.toLowerCase().includes('risk')) {
      actionRec = { label: 'View SLA Guardian Matrix', tabTarget: 'sla-guardian' };
    }

    const copilotMsg: ChatMessage = {
      id: `c-${Date.now()}`,
      sender: 'COPILOT',
      text: ragResult.answer,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ragAnswer: ragResult,
      actionRecommendation: actionRec
    };

    setMessages((prev) => [...prev, userMsg, copilotMsg]);
    setInputText('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[480px] bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <span>PRAVAH Regulatory RAG Copilot</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                Strict Grounding
              </span>
            </h2>
            <p className="text-[10px] text-slate-500">
              Statutory RAG & Explainable Process Guidance
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsCopilotOpen(false)}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/50 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Safety Guardrail & Statutory Notice */}
      <div className="bg-amber-50/80 px-4 py-2 border-b border-amber-200/70 flex flex-col gap-0.5 text-[11px] text-amber-900">
        <div className="flex items-center gap-1.5 font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Statutory Guardrail Active: Zero Hallucination Policy</span>
        </div>
        <span className="text-[10px] text-amber-800/90">
          Demonstration regulatory data — verify against official sources. Unverified topics are strictly refused.
        </span>
      </div>

      {/* Conversation Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'USER' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[92%] p-3.5 rounded-xl text-xs leading-relaxed ${
                msg.sender === 'USER'
                  ? 'bg-blue-600 text-white rounded-br-xs shadow-xs'
                  : msg.ragAnswer?.verified === false
                  ? 'bg-red-50 border border-red-200 text-red-900 rounded-bl-xs'
                  : 'bg-slate-100 text-slate-800 rounded-bl-xs'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {/* RAG Answer Contract Details */}
              {msg.ragAnswer && (
                <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-semibold">Verification Status:</span>
                    {msg.ragAnswer.verified ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        STATUTORILY VERIFIED
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3 text-red-600" />
                        UNVERIFIED / REFUSED
                      </span>
                    )}
                  </div>

                  {msg.ragAnswer.sourceVersion !== 'N/A' && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Source Version:</span>
                      <span className="font-semibold text-slate-700">{msg.ragAnswer.sourceVersion}</span>
                    </div>
                  )}

                  {/* Citations list */}
                  {msg.ragAnswer.citations.length > 0 && (
                    <div className="mt-1 space-y-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-emerald-600" />
                        <span>Statutory Citations:</span>
                      </span>
                      {msg.ragAnswer.citations.map((c, i) => (
                        <div
                          key={i}
                          className="text-[10px] font-mono text-slate-600 bg-white p-2 rounded border border-slate-200"
                        >
                          <strong className="text-slate-800">{c.sourceTitle}</strong>
                          <div className="text-slate-500 mt-0.5">
                            {c.section} (Page {c.page}) • Effective: {c.effectiveDate}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Action Recommendation */}
              {msg.actionRecommendation && (
                <div className="mt-2 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => {
                      setActiveTab(msg.actionRecommendation!.tabTarget as any);
                      setIsCopilotOpen(false);
                    }}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-1.5 px-2.5 rounded-lg text-[11px] flex items-center justify-between transition-colors shadow-xs cursor-pointer"
                  >
                    <span>{msg.actionRecommendation.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
            <span className="text-[9px] text-slate-400 mt-1 font-mono">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Suggested Quick Prompts */}
      <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/50">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
          Sample Regulatory Queries (Grounded vs Out-of-Scope)
        </span>
        <div className="flex flex-wrap gap-1">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-[10px] text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 px-2 py-1 rounded-md transition-colors cursor-pointer text-left"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Tray */}
      <div className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
          placeholder="Ask regulatory question or verify statutory rule..."
          className="flex-1 bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-xs text-slate-800 placeholder:text-slate-400 outline-hidden focus:bg-white"
        />
        <button
          onClick={() => handleSend(inputText)}
          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-2xs cursor-pointer"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
