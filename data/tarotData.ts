import { TarotCard, ArcanaType, Suit, Spread } from '../types';

// 大阿卡纳数据 - name_short 直接使用图片文件名（去掉.pdf）
export const MAJOR_ARCANA: TarotCard[] = [
  { id: 0, name: "愚人", name_short: "愚人", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "新的开始，天真，自发性", meaning_rev: "鲁莽，冒险，不负责任", desc: "全新的开始，信仰的一跃。" },
  { id: 1, name: "魔术师", name_short: "魔术师", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "创造力，资源，意志力", meaning_rev: "欺骗，计划不周，滥用能力", desc: "你拥有所需的一切工具。" },
  { id: 2, name: "女祭司", name_short: "女祭司", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "直觉，潜意识，神秘", meaning_rev: "表面知识，忽视直觉", desc: "相信你的直觉。" },
  { id: 3, name: "皇后", name_short: "皇后", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "丰饶，母性，自然，美", meaning_rev: "创造力受阻，依赖他人", desc: "富足与创造力的流动。" },
  { id: 4, name: "国王", name_short: "国王", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "权威，结构，控制，父性", meaning_rev: "专制，僵化，缺乏纪律", desc: "为混乱带来秩序。" },
  { id: 5, name: "教皇", name_short: "教皇", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "传统，精神指引，信仰", meaning_rev: "挑战现状，个人信仰，自由", desc: "传统与共同的价值观。" },
  { id: 6, name: "恋人", name_short: "恋人", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "爱，和谐，关系，选择", meaning_rev: "不和谐，分离，错误的决定", desc: "深刻的连接与重要的选择。" },
  { id: 7, name: "战车", name_short: "战车", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "胜利，意志力，控制，行动", meaning_rev: "失控，缺乏方向，攻击性", desc: "通过专注和意志取得胜利。" },
  { id: 8, name: "力量", name_short: "力量", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "力量，勇气，耐心，同情", meaning_rev: "自我怀疑，软弱，不安全感", desc: "以柔克刚，内在的平静。" },
  { id: 9, name: "隐士", name_short: "隐士", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "内省，孤独，寻求真理", meaning_rev: "孤立，寂寞，逃避", desc: "向内寻找答案。" },
  { id: 10, name: "命运之轮", name_short: "命运之轮", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "好运，业力，生命周期", meaning_rev: "坏运气，抗拒改变", desc: "宇宙正在为你转动。" },
  { id: 11, name: "正义", name_short: "正义", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "公正，真理，因果", meaning_rev: "不公，缺乏责任感", desc: "真相终将大白。" },
  { id: 12, name: "吊人", name_short: "吊人", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "暂停，放手，新视角", meaning_rev: "拖延，无谓的牺牲，停滞", desc: "换个角度看世界。" },
  { id: 13, name: "死神", name_short: "死神", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "结束，转变，重生", meaning_rev: "抗拒改变，停滞不前", desc: "一扇门关闭，另一扇门打开。" },
  { id: 14, name: "节制", name_short: "节制", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "平衡，适度，耐心", meaning_rev: "失衡，过度，缺乏和谐", desc: "寻找中庸之道。" },
  { id: 15, name: "恶魔", name_short: "恶魔", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "束缚，沉迷，物质主义", meaning_rev: "打破枷锁，重获自由", desc: "打破束缚你的锁链。" },
  { id: 16, name: "高塔", name_short: "高塔", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "突变，灾难，觉醒", meaning_rev: "避免灾难，推迟改变", desc: "必要的崩塌以进行重建。" },
  { id: 17, name: "星星", name_short: "星星", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "希望，信仰，灵感", meaning_rev: "绝望，缺乏信心", desc: "黑暗中的一道光。" },
  { id: 18, name: "月亮", name_short: "月亮", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "幻觉，恐惧，潜意识", meaning_rev: "释放恐惧，清晰", desc: "事情并非表象那样。" },
  { id: 19, name: "太阳", name_short: "太阳", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "积极，快乐，成功", meaning_rev: "悲观，不切实际的期望", desc: "喜悦与成功在等待。" },
  { id: 20, name: "审判", name_short: "审判", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "觉醒，重生，感召", meaning_rev: "自我怀疑，拒绝改变", desc: "响应内心的召唤。" },
  { id: 21, name: "世界", name_short: "世界", suit: Suit.NONE, type: ArcanaType.MAJOR, meaning_up: "完成，整合，成就", meaning_rev: "未完成，缺乏闭环", desc: "一个周期的圆满结束。" }
];

// 小阿卡纳数据 - 根据你提供的图片文件名
const WANDS_CARDS = [
  { id: 22, name: "权杖一", name_short: "权杖一", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "新的开始，创造力，机会", meaning_rev: "延迟，缺乏方向", desc: "创造力的萌芽。" },
  { id: 23, name: "权杖二", name_short: "权杖二", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "计划，决定，未来规划", meaning_rev: "优柔寡断，错失机会", desc: "站在十字路口。" },
  { id: 24, name: "权杖三", name_short: "权杖三", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "远见，合作，探索", meaning_rev: "挫折，延迟的进展", desc: "展望未来。" },
  { id: 25, name: "权杖四", name_short: "权杖四", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "稳定，庆祝，家庭和谐", meaning_rev: "不稳定，缺乏支持", desc: "坚实的基础。" },
  { id: 26, name: "权杖五", name_short: "权杖五", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "冲突，竞争，分歧", meaning_rev: "避免冲突，内部斗争", desc: "价值观的碰撞。" },
  { id: 27, name: "权杖六", name_short: "权杖六", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "胜利，公众认可，进展", meaning_rev: "自我怀疑，缺乏信心", desc: "荣耀的时刻。" },
  { id: 28, name: "权杖七", name_short: "权杖七", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "挑战，坚持，防御", meaning_rev: "不知所措，放弃", desc: "坚守阵地。" },
  { id: 29, name: "权杖八", name_short: "权杖八", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "快速行动，旅行，消息", meaning_rev: "延迟，混乱，冲动", desc: "迅速的进展。" },
  { id: 30, name: "权杖九", name_short: "权杖九", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "坚韧，警惕，经验教训", meaning_rev: "偏执，疲惫，防御性", desc: "从经验中学习。" },
  { id: 31, name: "权杖十", name_short: "权杖十", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "负担，责任，压力", meaning_rev: "释放负担，寻求帮助", desc: "承受的重量。" },
  { id: 32, name: "权杖侍者", name_short: "权杖侍者", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "探索，热情，新消息", meaning_rev: "缺乏动力，坏消息", desc: "年轻的学习者。" },
  { id: 33, name: "权杖骑士", name_short: "权杖骑士", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "行动，冒险，改变", meaning_rev: "冲动，鲁莽，不耐烦", desc: "火热的行动者。" },
  { id: 34, name: "权杖王后", name_short: "权杖王后", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "自信，热情，独立", meaning_rev: "嫉妒，固执，专横", desc: "热情的领袖。" },
  { id: 35, name: "权杖国王", name_short: "权杖国王", suit: Suit.WANDS, type: ArcanaType.MINOR, meaning_up: "领导力，远见，成熟", meaning_rev: "独裁，控制，冲动", desc: "智慧的领导者。" }
];

const CUPS_CARDS = [
  { id: 36, name: "圣杯一", name_short: "圣杯一", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "新情感，直觉，爱", meaning_rev: "情感空虚，不平衡", desc: "情感的源泉。" },
  { id: 37, name: "圣杯二", name_short: "圣杯二", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "和谐，伙伴关系，结合", meaning_rev: "分离，不和谐，冲突", desc: "心灵的结合。" },
  { id: 38, name: "圣杯三", name_short: "圣杯三", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "庆祝，友谊，社区", meaning_rev: "孤立，过度放纵", desc: "欢乐的聚会。" },
  { id: 39, name: "圣杯四", name_short: "圣杯四", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "沉思，不满，机会", meaning_rev: "接受，新机遇，行动", desc: "内心的反思。" },
  { id: 40, name: "圣杯五", name_short: "圣杯五", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "失落，悲伤，后悔", meaning_rev: "接受，前进，希望", desc: "面对失落。" },
  { id: 41, name: "圣杯六", name_short: "圣杯六", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "怀旧，童年，单纯快乐", meaning_rev: "活在当下，未来", desc: "美好的回忆。" },
  { id: 42, name: "圣杯七", name_short: "圣杯七", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "选择，幻想，白日梦", meaning_rev: "清晰，决定，现实", desc: "梦想的选择。" },
  { id: 43, name: "圣杯八", name_short: "圣杯八", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "放弃，寻找更深层含义", meaning_rev: "停滞，恐惧改变", desc: "寻求更深的意义。" },
  { id: 44, name: "圣杯九", name_short: "圣杯九", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "满足，愿望达成", meaning_rev: "不满，物质主义", desc: "愿望的满足。" },
  { id: 45, name: "圣杯十", name_short: "圣杯十", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "和谐，家庭幸福，情感圆满", meaning_rev: "家庭冲突，不和谐", desc: "情感的圆满。" },
  { id: 46, name: "圣杯侍者", name_short: "圣杯侍者", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "创意，直觉，新情感机会", meaning_rev: "情感不成熟，幻想破灭", desc: "情感的使者。" },
  { id: 47, name: "圣杯骑士", name_short: "圣杯骑士", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "浪漫，邀请，追随内心", meaning_rev: "幻想，情绪化，不稳定", desc: "浪漫的追求者。" },
  { id: 48, name: "圣杯王后", name_short: "圣杯王后", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "情感成熟，同理心，爱", meaning_rev: "情绪依赖，情感操纵", desc: "情感的守护者。" },
  { id: 49, name: "圣杯国王", name_short: "圣杯国王", suit: Suit.CUPS, type: ArcanaType.MINOR, meaning_up: "情感平衡，同情心，智慧", meaning_rev: "情绪压抑，冷漠", desc: "情感的智者。" }
];

const SWORDS_CARDS = [
  { id: 50, name: "宝剑一", name_short: "宝剑一", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "突破，清晰，新想法", meaning_rev: "混乱，破坏，坏主意", desc: "思想的利剑。" },
  { id: 51, name: "宝剑二", name_short: "宝剑二", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "僵局，艰难选择，拒绝", meaning_rev: "释放，接受真相", desc: "内心的冲突。" },
  { id: 52, name: "宝剑三", name_short: "宝剑三", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "心碎，悲伤，痛苦", meaning_rev: "恢复，接受，放下", desc: "心灵的痛苦。" },
  { id: 53, name: "宝剑四", name_short: "宝剑四", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "休息，恢复，撤退", meaning_rev: "重新进入世界，谨慎", desc: "必要的休息。" },
  { id: 54, name: "宝剑五", name_short: "宝剑五", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "冲突，自私，胜利代价", meaning_rev: "和解，让过去过去", desc: "胜利的代价。" },
  { id: 55, name: "宝剑六", name_short: "宝剑六", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "过渡，离开困难，向前", meaning_rev: "被困，无法前进", desc: "渡过难关。" },
  { id: 56, name: "宝剑七", name_short: "宝剑七", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "欺骗，策略，独自行动", meaning_rev: "诚实，悔恨，被抓住", desc: "秘密的行动。" },
  { id: 57, name: "宝剑八", name_short: "宝剑八", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "限制，无力，恐惧", meaning_rev: "自由，新视角", desc: "自我限制。" },
  { id: 58, name: "宝剑九", name_short: "宝剑九", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "焦虑，噩梦，负罪感", meaning_rev: "希望，释放恐惧", desc: "内心的恐惧。" },
  { id: 59, name: "宝剑十", name_short: "宝剑十", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "结束，痛苦结局，重生", meaning_rev: "恢复，新开始", desc: "彻底的结束。" },
  { id: 60, name: "宝剑侍者", name_short: "宝剑侍者", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "好奇心，警惕，新想法", meaning_rev: "欺骗，轻率，幼稚", desc: "思想的探索者。" },
  { id: 61, name: "宝剑骑士", name_short: "宝剑骑士", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "行动，速度，思想清晰", meaning_rev: "冲动，侵略性，鲁莽", desc: "思想的战士。" },
  { id: 62, name: "宝剑王后", name_short: "宝剑王后", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "独立，清晰思考，诚实", meaning_rev: "冷酷，批判，无情", desc: "智慧的女士。" },
  { id: 63, name: "宝剑国王", name_short: "宝剑国王", suit: Suit.SWORDS, type: ArcanaType.MINOR, meaning_up: "权威，真理，清晰判断", meaning_rev: "操纵，控制，无情", desc: "思想的统治者。" }
];

const PENTACLES_CARDS = [
  { id: 64, name: "星币一", name_short: "星币一", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "新开始，富足，机会", meaning_rev: "错失机会，延迟富足", desc: "物质的种子。" },
  { id: 65, name: "星币二", name_short: "星币二", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "平衡，适应，财务管理", meaning_rev: "不平衡，混乱，财务压力", desc: "财务的平衡。" },
  { id: 66, name: "星币三", name_short: "星币三", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "协作，学习，工艺", meaning_rev: "缺乏协作，平庸", desc: "技能的展示。" },
  { id: 67, name: "星币四", name_short: "星币四", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "安全，保守，控制", meaning_rev: "浪费，吝啬，不稳定", desc: "财富的守护。" },
  { id: 68, name: "星币五", name_short: "星币五", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "匮乏，困难，孤立", meaning_rev: "恢复，支持，新开始", desc: "物质的困难。" },
  { id: 69, name: "星币六", name_short: "星币六", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "慷慨，慈善，给予", meaning_rev: "自私，嫉妒，不平衡", desc: "财富的分享。" },
  { id: 70, name: "星币七", name_short: "星币七", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "耐心，评估，成长", meaning_rev: "不耐烦，缺乏远见", desc: "耐心的等待。" },
  { id: 71, name: "星币八", name_short: "星币八", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "工艺，专注，技能发展", meaning_rev: "匆忙，平庸，缺乏激情", desc: "专注的工匠。" },
  { id: 72, name: "星币九", name_short: "星币九", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "富足，享受，独立", meaning_rev: "过度依赖，物质主义", desc: "收获的喜悦。" },
  { id: 73, name: "星币十", name_short: "星币十", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "遗产，家庭，财富，稳定", meaning_rev: "家庭冲突，财务损失", desc: "家族的财富。" },
  { id: 74, name: "星币侍从", name_short: "星币侍从", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "学习，务实，新机会", meaning_rev: "懒惰，缺乏野心", desc: "勤奋的学习者。" },
  { id: 75, name: "星币骑士", name_short: "星币骑士", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "责任，可靠，进步", meaning_rev: "停滞，无聊，缺乏动力", desc: "可靠的执行者。" },
  { id: 76, name: "星币王后", name_short: "星币王后", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "繁荣，养育，务实", meaning_rev: "自我怀疑，物质焦虑", desc: "财富的守护者。" },
  { id: 77, name: "星币国王", name_short: "星币国王", suit: Suit.PENTACLES, type: ArcanaType.MINOR, meaning_up: "富足，商业智慧，安全", meaning_rev: "贪婪，保守，物质主义", desc: "财富的管理者。" }
];

export const MINOR_ARCANA = [...WANDS_CARDS, ...CUPS_CARDS, ...SWORDS_CARDS, ...PENTACLES_CARDS];
export const FULL_DECK = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export const SPREADS: Spread[] = [
  {
    id: "one_card",
    name: "单张指引",
    description: "快速回答当下的困惑，适合每日运势或简单的是非题。",
    cards: 1,
    layout: [
      { id: 1, name: "核心答案", description: "针对你问题的核心指引。", x: 2, y: 2 }
    ]
  },
  {
    id: "three_card",
    name: "时间流牌阵",
    description: "探索过去、现在和未来的发展脉络。",
    cards: 3,
    layout: [
      { id: 1, name: "过去", description: "影响当前局面的过去因素。", x: 1, y: 2 },
      { id: 2, name: "现在", description: "事情发展的当前状态。", x: 2, y: 2 },
      { id: 3, name: "未来", description: "如果按照当前路径发展，可能的结果。", x: 3, y: 2 }
    ]
  },
  {
    id: "relationship",
    name: "爱之维纳斯",
    description: "深度解析你与他人之间的关系动态。",
    cards: 5,
    layout: [
      { id: 1, name: "你", description: "你在关系中的状态与态度。", x: 1, y: 2 },
      { id: 2, name: "对方", description: "对方在关系中的状态与态度。", x: 3, y: 2 },
      { id: 3, name: "连接", description: "目前关系的本质与连接点。", x: 2, y: 2 },
      { id: 4, name: "优势", description: "维系关系的积极力量。", x: 2, y: 1 },
      { id: 5, name: "挑战", description: "阻碍关系发展的障碍。", x: 2, y: 3 }
    ]
  }
];