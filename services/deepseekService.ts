import { DrawnCard, Spread } from "../types";

const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;
const API_URL =
  import.meta.env.VITE_DEEPSEEK_API_URL ||
  "https://api.deepseek.com/chat/completions";

const buildFallbackReading = (
  question: string,
  drawnCards: DrawnCard[],
  spread: Spread
) => {
  const cards = drawnCards
    .map((drawn) => {
      const position = spread.layout.find((p) => p.id === drawn.positionId);
      const meaning = drawn.isReversed
        ? drawn.card.meaning_rev
        : drawn.card.meaning_up;

      return `- **${position?.name ?? "牌位"}：${drawn.card.name}${
        drawn.isReversed ? "（逆位）" : ""
      }**\n  ${meaning}。${drawn.card.desc}`;
    })
    .join("\n");

  return `## 本地演示解读

你提出的问题是：**${question}**

当前没有配置 DeepSeek API Key，因此 Pop Tarot 先基于内置牌义生成一份本地解读：

${cards}

### 温柔提醒

这组牌更适合被看作一次自我观察：先确认你真正关心的是什么，再把注意力放回可以行动的一小步。配置 API Key 后，系统会生成更完整、更连贯的 AI 解读。`;
};

export const getTarotReading = async (
  question: string,
  drawnCards: DrawnCard[],
  spread: Spread
): Promise<string> => {
  if (!API_KEY) {
    return buildFallbackReading(question, drawnCards, spread);
  }

  const cardList = drawnCards
    .map((d) => {
      const position = spread.layout.find((p) => p.id === d.positionId);
      return `- 位置 "${position?.name}" (${position?.description}):\n  卡牌: ${d.card.name}\n  含义: ${
        d.isReversed ? d.card.meaning_rev : d.card.meaning_up
      }`;
    })
    .join("\n");

  const prompt = `
你是一位语气温柔、现代感强、善于结合情绪的塔罗占卜师。
请根据以下内容为用户生成塔罗解读：

🔮 用户问题：
${question}

🃏 抽到的牌阵与含义：
${cardList}

请输出结构清晰、自然、温暖、有启发性的塔罗解读。
`;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API request failed: ${response.status}`);
    }

    const data = await response.json();

    return (
      data.choices?.[0]?.message?.content ||
      "🌀 宇宙似乎有些安静，请稍后再尝试连接塔罗能量。"
    );
  } catch (error) {
    console.error("DeepSeek API Error:", error);
    return "⚡️ 与宇宙沟通时出现了一些干扰，请稍后重试。";
  }
};
