import React, { useState } from 'react';
import { 
  MISSION, 
  VISION, 
  SERVICE_NAME, 
  REPRESENTATIVE, 
  PRICING_PLANS, 
  CONTACT_URL, 
  LINE_URL,
  LEGAL_TEXT,
  EMAIL,
  NOTE_URL,
  STANDFM_URL
} from './constants';
import { SectionId } from './types';
import { GeminiAssistant } from './components/GeminiAssistant';

const FAQ_ITEMS = [
  { q: "オンラインでもしっかり自己理解できますか？", a: "はい、むしろオンラインの方が本音が出やすい方が多いです。自宅など安心できる場所で話すことで、余計な緊張が減り、感情や表情も自然に表れます。これまでの受講者もすべてオンラインで成果を出しています。" },
  { q: "仕事が忙しくてもついていけますか？", a: "問題ありません。セッションは月2回・1時間ですし、チャットサポートはスキマ時間で活用できます。多忙な会社員の方こそ「自分だけの行動戦略」が武器になります。" },
  { q: "副業経験がなくても大丈夫ですか？", a: "はい。副業未経験の主婦・会社員もサポートしてきました。強みの言語化から、どんなサービスに変えるか、どんな人に届けるかまで伴走します。" },
  { q: "特別なスキルや資格は必要ですか？", a: "必要ありません。あなたの“これまでの経験”が材料になります。強みも才能も、すでにあなたの中にあります。" },
  { q: "成果は必ず出ますか？", a: "行動量と継続による個人差はありますが、「自分の軸が分かる」「キャリアの方向性が定まる」という変化は全員が実感しています。行動戦略も一緒に設計するため、動ける状態まで伴走します。" },
  { q: "どんな人には向きませんか？", a: "誰かの正解をそのまま教えてほしい方、自分と向き合う意志がない方にはこのプログラムはおすすめしません。“自分の人生を自分でデザインしたい”という方に最適です。" },
];

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLegal, setShowLegal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-brand-600 tracking-tight">{SERVICE_NAME}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollTo(SectionId.ABOUT)} className="text-slate-600 hover:text-brand-600 font-medium">私について</button>
              <button onClick={() => scrollTo(SectionId.SERVICES)} className="text-slate-600 hover:text-brand-600 font-medium">プラン</button>
              <button onClick={() => scrollTo(SectionId.AI_TOOL)} className="text-slate-600 hover:text-brand-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                AI相談
              </button>
              <a 
                href={CONTACT_URL} 
                target="_blank" 
                rel="noreferrer"
                className="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2 rounded-full font-bold transition-all shadow-md transform hover:-translate-y-0.5"
              >
                無料相談を予約
              </a>
            </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <button onClick={() => scrollTo(SectionId.ABOUT)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-md text-left">私について</button>
              <button onClick={() => scrollTo(SectionId.SERVICES)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-md text-left">プラン</button>
              <button onClick={() => scrollTo(SectionId.AI_TOOL)} className="block px-3 py-2 text-base font-medium text-slate-700 hover:bg-brand-50 rounded-md text-left">AI相談</button>
              <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="block w-full text-center mt-2 bg-brand-600 text-white px-3 py-3 rounded-lg font-bold">無料相談を予約</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id={SectionId.HERO} className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/1920/1080?grayscale&blur=2" alt="Background" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              {MISSION}
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 font-light">
              {VISION}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="bg-brand-500 hover:bg-brand-400 text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 text-center">
                30分無料体験に申し込む
              </a>
              <a href={LINE_URL} target="_blank" rel="noreferrer" className="bg-[#06C755] hover:bg-[#05b34c] text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105 text-center flex items-center justify-center gap-2">
                 LINEで簡単予約
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 leading-snug">
            「このまま今の会社で歳を重ねて…<br className="hidden md:block" />本当に後悔しないと言い切れますか？」
          </h2>
          <div className="text-lg text-slate-700 leading-relaxed text-left md:text-center space-y-6">
            <p>
              あなたの胸の奥で、ふと湧き上がるこの小さな違和感。実はそこに“まだ言語化できていない本音”が隠れています。
            </p>
            <p>
              8000人以上の無意識の表情・声・間を観察してきた中で、多くの会社員が「強みが分からない」ために自分らしいキャリアを選べず、望まない働き方を続けている現実を見てきました。
            </p>
            <p className="font-bold text-brand-600 text-xl pt-4">
              その声から生まれたのが、この<br className="md:hidden" />《キャリア自己理解コーチングプログラム》です。
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 & 3: Problem & Empathy */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">
              なぜ、頑張って働いてきたのに<br />“自分らしいキャリア”が見つからないのでしょうか。
            </h3>
            <div className="text-slate-700 space-y-6 leading-relaxed text-left md:text-center max-w-3xl mx-auto">
              <p>
                実はその原因の多くは「スキル不足」ではなく、<span className="font-bold text-brand-600">“自分を正しく理解できていないこと”</span>にあります。
              </p>
              <p>
                強み・価値観・才能が言語化できないまま働き方を選ぶと、どれだけ転職サイトを眺めても、副業講座に申し込んでも、本質的な変化は起きません。どれも“他人の正解”に沿った選択だからです。
              </p>
              <p>
                しかし、自分の無意識レベルの欲求・才能・行動パターンが明確になれば、選ぶ仕事も、行動も、未来のデザインも一気にクリアになります。
              </p>
              <p>
                このプログラムは、あなたの中に眠る才能を引き出し、価値観に合ったキャリア戦略へと落とし込むことで、「自然に前へ進める状態」をつくります。
              </p>
              <div className="bg-white p-8 rounded-xl shadow-md border-l-4 border-brand-500 mt-8">
                <p className="font-bold text-lg text-slate-800">
                  良いキャリアを“探す”のではなく、“自分でつくる力”を身につけられる。<br />これが、このサービスの本質的な価値です。
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
            <div className="order-2 md:order-1 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">
                「強みが分からない」「やりたいことが見つからない」...
              </h3>
              <p className="text-slate-700 leading-relaxed">
                「副業に興味はあるけど動けない」──そんな悩みを抱えていませんか？<br/>
                そして、できない自分を責めてしまったり、「今さら遅いよな…」と諦めかけていませんか？
              </p>
              <div className="bg-brand-50 p-6 rounded-lg">
                <p className="text-brand-800 font-bold text-lg mb-2">
                  安心してください。あなたが悪いのではありません。
                </p>
                <p className="text-brand-700 leading-relaxed">
                  これまでの仕事の中で、あなたの本音を丁寧に掘り下げてくれる環境が一度も無かっただけです。
                  同じような悩みを抱えていた会社員の方々が、この“才能発掘×行動設計”によって、自然に前へ進める自分へと変わっていきました。
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
               <img src="https://picsum.photos/600/400?random=2" alt="Counselling session" className="rounded-2xl shadow-xl w-full object-cover transform md:rotate-2 hover:rotate-0 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Story (Replaces old About) */}
      <section id={SectionId.ABOUT} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 text-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-5/12 relative min-h-[400px]">
                 <img src="https://picsum.photos/800/800?random=3" alt={REPRESENTATIVE} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent md:bg-gradient-to-r"></div>
              </div>
              <div className="md:w-7/12 p-8 md:p-16 flex flex-col justify-center">
                <span className="text-brand-400 font-bold uppercase tracking-wider mb-2 text-sm">Representative Story</span>
                <h2 className="text-3xl font-bold mb-6">{REPRESENTATIVE}</h2>
                <h3 className="text-xl text-brand-200 mb-8 font-medium">自己理解 × 行動設計トレーナー</h3>
                
                <div className="space-y-4 text-slate-300 leading-relaxed">
                  <p>
                    実は私自身、かつては「自分の強みなんて分からない」「この働き方を一生続けるのは違う気がする」──そんなモヤモヤを抱えながら働いていました。
                  </p>
                  <p>
                    どれだけ本を読んでも、転職サイトを眺めても、しっくりくる選択ができず、行動できない自分に嫌気がさしたこともあります。
                  </p>
                  <p>
                    転機になったのは、“無意識の本音が行動を決めている”という事実に気づき、<strong className="text-white">8000人以上の表情・声・間から「言葉になる前の気持ち」を読み解くスキル</strong>を磨いたことでした。
                  </p>
                  <p>
                    そこから、自己理解と行動設計を合わせた独自メソッドを構築し、フリーランス・会社員・主婦・高校生まで幅広い方をサポート。
                    セールス未経験だった私が、副業初月で収益化できたのも、自分の本音を理解し“自然に進める行動戦略”を手に入れたからでした。
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a 
                    href={NOTE_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full transition-all text-sm font-bold"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.04 4.938a2.536 2.536 0 0 0-2.485 2.536v6.95c0 .604.223 1.155.59 1.58.267.31.606.55.992.685l.004.002.006.002c.03.01.062.017.094.025a2.502 2.502 0 0 0 .798.13c1.373 0 2.486-1.135 2.486-2.535v-6.84c0-1.4-1.113-2.535-2.485-2.535zM4.96 4.938a2.536 2.536 0 0 0-2.486 2.536v6.95a2.515 2.515 0 0 0 .59 1.58c.268.31.606.55.993.685l.004.002.006.002c.03.01.062.017.094.025a2.503 2.503 0 0 0 .799.13c1.372 0 2.485-1.135 2.485-2.535v-6.84c0-1.4-1.113-2.535-2.485-2.535zm7.04 0a2.536 2.536 0 0 0-2.485 2.536v6.95c0 .604.223 1.155.59 1.58.267.31.606.55.992.685l.004.002.006.002c.03.01.062.017.094.025a2.502 2.502 0 0 0 .799.13c1.372 0 2.485-1.135 2.485-2.535v-6.84c0-1.4-1.113-2.535-2.485-2.535z" />
                    </svg>
                    noteで読む
                  </a>
                  <a 
                    href={STANDFM_URL} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-full transition-all text-sm font-bold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                    stand.fmで聴く
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Solution */}
      <section className="py-20 bg-brand-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">解決策：自然に動ける自分へ</h2>
          <div className="text-lg leading-relaxed space-y-8 text-left md:text-center">
            <p>
              そこで開発した《キャリア自己理解コーチングプログラム》では、あなたの“まだ言語化できていない本音”を丁寧に読み解き、強み・才能を引き出しながら、無理なく進める行動戦略へ落とし込みます。
            </p>
            <p>
              難しい理論を覚える必要はありません。オンラインでの対話セッションに参加し、こちらの質問に答えていくだけで、あなたの中にある輪郭のない想いが整理され、自然に動ける計画へ変わっていきます。
            </p>
            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 shadow-lg mt-8">
              <p className="font-bold text-xl md:text-2xl mb-4">
                どこにもない「才能発掘 × 行動設計」の組み合わせ
              </p>
              <p className="text-brand-100">
                あなたに合ったキャリアや副業の形が見えてきます。<br/>
                まずは“自分がどう生きたいか”をはっきりさせることから始めましょう。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">本プログラムで得られる5つの変化</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[
               "自分の強み・才能が言語化できる",
               "迷いが消え、行動の軸が明確になる",
               "副業・転職の方向性が自然に定まる",
               "無理なく続く行動戦略が手に入る",
               "将来の選択に対する不安が大幅に減る"
             ].map((benefit, index) => (
               <div key={index} className="flex items-start bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                 <div className="bg-brand-100 text-brand-600 rounded-full p-2 mr-4 shrink-0">
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                   </svg>
                 </div>
                 <p className="font-bold text-slate-800 text-lg leading-snug">{benefit}</p>
               </div>
             ))}
             <div className="flex items-center justify-center bg-brand-50 p-6 rounded-xl border border-brand-100 lg:col-span-1 md:col-span-1">
                <p className="text-brand-700 font-bold text-center">and more...</p>
             </div>
          </div>
        </div>
      </section>

      {/* Section 7 & 8: Details */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Online Detail */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">完全オンライン対応</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                本プログラムのメインとなるセッションは、すべてオンラインで実施します。あなたは自宅でも、出張先でも、通勤中でも、場所を選ばず受講することができます。パソコンはもちろん、スマートフォンからでも参加可能。忙しい会社員の方でも時間を確保しやすいよう、柔軟なスケジュール調整を行っています。
              </p>
              <p className="text-slate-600 leading-relaxed">
                オンライン形式を採用している理由は、<span className="font-bold text-slate-900">「本音は、安心できる環境でこそ自然に現れる」</span>からです。慣れない場所や対面の緊張があると、自分の気持ちが正しく言語化されにくくなります。セッションではあなたの表情・声・沈黙・間も含めて丁寧に観察し、まだ言葉になっていない想いや価値観を掘り起こしていきます。
              </p>
            </div>

            {/* Chat Detail */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-slate-900">質問無制限のチャットサポート</h3>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                プログラム期間中は、チャットワークにて質問無制限サポートを提供します。セッションで浮かんだ疑問や、日々の行動の中で生まれる迷い、キャリアや副業の方向性に関する相談など、どんな小さなことでも気軽に送っていただけます。
              </p>
              <p className="text-slate-600 leading-relaxed">
                テキストでのやり取りだからこそ、「思いついた瞬間」にすぐ質問でき、悩みを抱えたまま行動が止まることを防げます。また、言語化のサポートとしても効果的で、あなたの思考が整理されやすくなります。一人で悩まず、常に伴走者が隣にいる安心感を得られるサポート体制です。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Pricing) */}
      <section id={SectionId.SERVICES} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">料金プラン</h2>
            <p className="mt-4 text-slate-600">あなたのペースに合わせて選べる3つのコース</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, index) => (
              <div key={index} className={`border rounded-2xl p-8 flex flex-col transition-all hover:shadow-xl ${index === 1 ? 'border-brand-500 shadow-md ring-1 ring-brand-500' : 'border-slate-200'}`}>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-900">{plan.duration}</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  </div>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-6 w-6 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-3 text-slate-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <a 
                  href={CONTACT_URL} 
                  target="_blank" 
                  rel="noreferrer"
                  className={`block w-full text-center py-3 px-6 rounded-lg font-bold transition-colors ${
                    index === 1 
                      ? 'bg-brand-600 text-white hover:bg-brand-700' 
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  選択する
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-slate-500 text-sm">※ キャンセルポリシー等の詳細は特定商取引法に基づく表記をご確認ください。</p>
          </div>
        </div>
      </section>

      {/* Section 9: FAQ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">よくある質問</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-slate-800 text-lg pr-4"><span className="text-brand-500 mr-2">Q.</span>{item.q}</span>
                  <span className={`transform transition-transform duration-200 text-slate-400 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <span className="font-bold text-brand-600 mr-2">A.</span>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tool Section */}
      <section id={SectionId.AI_TOOL} className="py-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <span className="bg-brand-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Beta Feature</span>
            <h2 className="text-3xl font-bold mt-4">AIキャリア壁打ち</h2>
            <p className="mt-2 text-slate-300">
              まだ言葉にならないモヤモヤを、AIにぶつけてみませんか？<br/>
              Geminiがあなたの思考の整理をサポートします。
            </p>
          </div>
          
          <GeminiAssistant />

          <div className="text-center mt-8">
            <p className="text-sm text-slate-400">
              ※ 入力された内容はAIによる分析のみに使用され、保存されることはありません。<br/>
              より深い分析をご希望の方は、ぜひ無料体験セッションへお越しください。
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">自分の人生を、自分でデザインする一歩を。</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href={CONTACT_URL} target="_blank" rel="noreferrer" className="bg-white text-brand-600 hover:bg-slate-100 text-xl font-bold px-10 py-4 rounded-full shadow-lg transition-transform transform hover:scale-105">
              今すぐ申し込む
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">{SERVICE_NAME}</h3>
              <p className="mb-2">代表: {REPRESENTATIVE}</p>
              <p className="mb-2">Email: {EMAIL}</p>
              <p>営業時間: 10:00〜17:00</p>
            </div>
            <div className="md:text-right">
              <div className="space-y-2 flex flex-col md:items-end">
                <button 
                  onClick={() => setShowLegal(!showLegal)} 
                  className="text-slate-400 hover:text-white transition-colors text-sm underline decoration-slate-600 underline-offset-4"
                >
                  プライバシーポリシー・特定商取引法に基づく表記
                </button>
              </div>
            </div>
          </div>

          {showLegal && (
            <div className="border-t border-slate-800 pt-8 mt-8 animate-fade-in">
              <div className="bg-white p-8 rounded-xl text-lg leading-relaxed text-slate-900 whitespace-pre-wrap h-[600px] overflow-y-auto shadow-2xl relative">
                <button 
                  onClick={() => setShowLegal(false)}
                  className="absolute top-4 right-6 text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full p-2 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                {LEGAL_TEXT}
              </div>
            </div>
          )}

          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>&copy; {currentYear} {REPRESENTATIVE} All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;