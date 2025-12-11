import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const analyzeCareerConcerns = async (concernText: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `
      あなたはプロフェッショナルなキャリアコーチ（加藤 寛之）のアシスタントAIです。
      ユーザーの「仕事の悩み」や「現状」を入力として受け取ります。
      自己理解 × 行動設計トレーナーの視点から、以下の3つの観点で分析し、Markdown形式で励ましと洞察を与えてください。

      1. **潜在的な強み (Hidden Strengths)**: 悩みの中に隠れている、その人の責任感や向上心などの強みを指摘してください。
      2. **視点の転換 (Reframing)**: その悩みを「どう解決するか」という前向きな問いに書き換えてください。
      3. **最初の一歩 (First Step)**: 明日からできる5分以内の小さなアクションを提案してください。

      トーン＆マナー：
      - 優しく、共感的であること。
      - 専門的だが、難解な言葉を使わないこと。
      - 30代〜40代の会社員に響く言葉選びをすること。
      - 返答は長すぎず、端的に（Flashモデルの特性を活かして）。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: concernText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "申し訳ありません。分析中にエラーが発生しました。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "現在AIサービスが混み合っており、応答できませんでした。後ほど再度お試しください。";
  }
};

export const refineInquiry = async (draftText: string): Promise<string> => {
    if (!apiKey) {
      return "API Key is missing.";
    }
  
    try {
      const model = 'gemini-2.5-flash';
      const prompt = `
        以下のテキストは、キャリアコーチへの問い合わせ・相談の下書きです。
        内容は変えずに、より「自分の意志が伝わる」「具体的で建設的な」文章に整えてください。
        
        元のテキスト:
        "${draftText}"
      `;
  
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
      });
  
      return response.text || "編集できませんでした。";
    } catch (error) {
      console.error("Gemini Edit Error:", error);
      return draftText; // Fallback to original
    }
};

export const generateDeepCareerInsight = async (userInfo: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing.";
  }

  try {
    // Using gemini-3-pro-preview for complex reasoning tasks as requested
    const model = 'gemini-3-pro-preview';
    const systemInstruction = `
      あなたは「自己理解 × 行動設計トレーナー」の加藤 寛之として振る舞ってください。
      初対面8000人の表情・声・間から“無意識のスイッチ”を見抜く観察力を持つプロフェッショナルです。

      ユーザーから入力された現状の悩みや背景情報（テキスト）を深く読み解き、以下の構造で診断レポートを作成してください。
      
      ## 1. "無意識のスイッチ"と本音の解像度
      入力されたテキストの言葉の端々から、ユーザー自身も気づいていない「本当の恐れ」や「本当の願い」を推測して言語化してください。
      （例：「時間がない」と言っているが、実は「失敗するのが怖い」のではないか、等）

      ## 2. 才能と価値観の仮説
      このユーザーが本来持っているであろう「才能（自然にできてしまうこと）」や「価値観（大切にしたいこと）」の仮説を立ててください。

      ## 3. あなたらしい行動戦略
      「現状維持」から抜け出すための、このユーザーのタイプに合った具体的な行動戦略を提案してください。
      抽象論ではなく、副業やキャリアチェンジに向けた現実的なステップを含めてください。

      トーン＆マナー：
      - プロフェッショナルで頼りがいがあるが、押し付けがましくない。
      - 読んだ瞬間に「ハッとする」ような深い洞察を目指す。
      - Markdown形式で見やすく整形する。
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: userInfo,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8, // Slightly higher creativity for insights
      }
    });

    return response.text || "詳細診断を作成できませんでした。";
  } catch (error) {
    console.error("Gemini Deep Insight Error:", error);
    return "申し訳ありません。現在プロフェッショナル分析モデルへのアクセスが集中しています。時間をおいて再度お試しください。";
  }
};
