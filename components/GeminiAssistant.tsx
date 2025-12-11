import React, { useState } from 'react';
import { analyzeCareerConcerns, refineInquiry, generateDeepCareerInsight } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

type Mode = 'analyze' | 'refine' | 'deep-insight';

export const GeminiAssistant: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<Mode>('analyze');
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setResult('');

    try {
      if (mode === 'analyze') {
        const analysis = await analyzeCareerConcerns(inputText);
        setResult(analysis);
      } else if (mode === 'refine') {
        const refined = await refineInquiry(inputText);
        setResult(refined);
      } else if (mode === 'deep-insight') {
        const deepInsight = await generateDeepCareerInsight(inputText);
        setResult(deepInsight);
      }
    } catch (e) {
      setResult("エラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (mode) {
      case 'analyze': return "例：今の仕事は安定しているけど、将来が見えなくて不安。副業にも興味があるけど時間がない...";
      case 'refine': return "例：キャリアについて相談したいです。よろしくお願いします。";
      case 'deep-insight': return "例：35歳、営業職。年収500万。毎日同じことの繰り返しで成長を感じられない。昔はもっと挑戦的だったのに、今は失敗が怖くて動けない。家族もいるのでリスクは取れないが、このまま終わりたくない。";
      default: return "";
    }
  };

  return (
    <div className="bg-gradient-to-br from-brand-50 to-white p-6 rounded-2xl shadow-xl border border-brand-100 my-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="bg-brand-600 text-white p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <div>
           <h3 className="text-xl font-bold text-slate-800">AI キャリアアシスタント (Gemini)</h3>
           <p className="text-xs text-slate-500">Powered by Google Gemini</p>
        </div>
      </div>
      
      <p className="text-slate-600 mb-6 text-sm">
        あなたの現在のモヤモヤや、コーチへの相談内容を入力してください。<br/>
        目的に応じて最適なAIモデルがあなたの思考整理をサポートします。
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setMode('analyze')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
            mode === 'analyze' 
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          ⚡️ クイック壁打ち
        </button>
        <button
          onClick={() => setMode('refine')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
            mode === 'refine' 
              ? 'bg-brand-50 border-brand-500 text-brand-700 shadow-sm' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          ✏️ 相談文の清書
        </button>
        <button
          onClick={() => setMode('deep-insight')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border flex items-center gap-1 ${
            mode === 'deep-insight' 
              ? 'bg-gradient-to-r from-violet-100 to-fuchsia-100 border-violet-500 text-violet-800 shadow-sm' 
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>💎</span> ディープ診断 (Pro)
        </button>
      </div>

      <textarea
        className="w-full p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none min-h-[140px] text-slate-700 mb-4 transition-all"
        placeholder={getPlaceholder()}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          onClick={handleAction}
          disabled={loading || !inputText}
          className={`font-bold py-2.5 px-6 rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 text-white ${
            mode === 'deep-insight' ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700' : 'bg-brand-600 hover:bg-brand-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {mode === 'deep-insight' ? '深層分析中...' : 'AI思考中...'}
            </>
          ) : (
            '実行する'
          )}
        </button>
      </div>

      {result && (
        <div className={`mt-6 p-6 rounded-lg border prose prose-slate max-w-none animate-fade-in ${
          mode === 'deep-insight' ? 'bg-violet-50 border-violet-200' : 'bg-white border-brand-200'
        }`}>
           <ReactMarkdown>{result}</ReactMarkdown>
           {mode === 'refine' && (
             <div className="mt-4 pt-4 border-t border-slate-200">
               <p className="text-xs text-slate-500">この内容で問い合わせフォームに入力してみましょう。</p>
             </div>
           )}
        </div>
      )}
    </div>
  );
};
