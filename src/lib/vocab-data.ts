// 150 từ vựng HSK 1.0 chính thức
// Chia theo 12 chủ đề, mỗi từ có: Hán tự, pinyin, nghĩa TV, từ loại, ví dụ, emoji, bộ thủ

export type PartOfSpeech =
  | "Danh từ"
  | "Động từ"
  | "Tính từ"
  | "Phó từ"
  | "Đại từ"
  | "Số từ"
  | "Lượng từ"
  | "Giới từ"
  | "Liên từ"
  | "Trợ từ"
  | "Tình thái từ"
  | "Thán từ";

export interface VocabWord {
  id: number;
  han: string;        // Hán tự
  pinyin: string;     // Pinyin với dấu
  meaning: string;    // Nghĩa tiếng Việt
  pos: PartOfSpeech;  // Từ loại
  radical?: string;   // Bộ thủ
  emoji: string;      // Emoji minh họa
  example: string;    // Câu ví dụ tiếng Trung
  examplePinyin: string; // Pinyin câu ví dụ
  exampleVi: string;  // Dịch câu ví dụ sang tiếng Việt
  topic: TopicId;     // Chủ đề
}

export type TopicId =
  | "greetings"
  | "pronouns"
  | "family"
  | "numbers"
  | "time"
  | "objects"
  | "food"
  | "body"
  | "verbs"
  | "adjectives"
  | "places"
  | "misc";

export interface Topic {
  id: TopicId;
  name: string;
  emoji: string;
  color: string;       // gradient tailwind
  description: string;
}

export const TOPICS: Topic[] = [
  { id: "greetings",   name: "Chào hỏi",      emoji: "👋", color: "from-rose-400 to-pink-400",       description: "Câu chào, cảm ơn, xin lỗi" },
  { id: "pronouns",    name: "Đại từ",        emoji: "🧑", color: "from-amber-400 to-orange-400",    description: "Ngôi xưng hô cơ bản" },
  { id: "family",      name: "Gia đình",      emoji: "👨‍👩‍👧", color: "from-orange-400 to-red-400",  description: "Các thành viên gia đình" },
  { id: "numbers",     name: "Số đếm",        emoji: "🔢", color: "from-yellow-400 to-amber-400",    description: "Số và lượng từ" },
  { id: "time",        name: "Thời gian",     emoji: "🕐", color: "from-lime-400 to-green-400",      description: "Ngày tháng, giờ giấc" },
  { id: "objects",     name: "Đồ vật",        emoji: "🎒", color: "from-emerald-400 to-teal-400",    description: "Đồ dùng học tập & sinh hoạt" },
  { id: "food",        name: "Thực phẩm",     emoji: "🍚", color: "from-teal-400 to-cyan-400",       description: "Ăn uống, đồ ăn thức uống" },
  { id: "body",        name: "Cơ thể",        emoji: "🧠", color: "from-cyan-400 to-sky-400",        description: "Bộ phận cơ thể" },
  { id: "verbs",       name: "Động từ",       emoji: "🏃", color: "from-sky-400 to-blue-400",        description: "Các hành động phổ biến" },
  { id: "adjectives",  name: "Tính từ",       emoji: "✨", color: "from-violet-400 to-purple-400",   description: "Mô tả tính chất sự vật" },
  { id: "places",      name: "Nơi chốn",      emoji: "🏛️", color: "from-fuchsia-400 to-pink-400",   description: "Địa điểm & phương hướng" },
  { id: "misc",        name: "Bổ sung",       emoji: "📚", color: "from-slate-400 to-gray-400",      description: "Từ vựng bổ sung theo bài học" },
];

export const VOCAB: VocabWord[] = [
  // ===== 1. CHÀO HỎI (10 từ) =====
  { id: 1,  han: "你好",   pinyin: "nǐ hǎo",       meaning: "xin chào",            pos: "Thán từ",   emoji: "👋", example: "你好，我叫小明。",        examplePinyin: "Nǐ hǎo, wǒ jiào Xiǎomíng.",         exampleVi: "Xin chào, tôi tên là Tiểu Minh.", topic: "greetings" },
  { id: 2,  han: "再见",   pinyin: "zàijiàn",     meaning: "Tạm biệt",            pos: "Thán từ",   emoji: "🙋", example: "明天见，再见！",          examplePinyin: "Míngtiān jiàn, zài jiàn!",          exampleVi: "Hẹn gặp lại ngày mai, tạm biệt!", topic: "greetings" },
  { id: 3,  han: "谢谢",   pinyin: "xièxie",      meaning: "Cảm ơn",              pos: "Động từ",   emoji: "🙏", example: "谢谢你帮我。",            examplePinyin: "Xièxie nǐ bāng wǒ.",                exampleVi: "Cảm ơn bạn đã giúp tôi.", topic: "greetings" },
  { id: 4,  han: "不客气", pinyin: "bùkèqi",     meaning: "Đừng khách sáo",        pos: "Tình thái từ", emoji: "😊", example: "不客气，应该的。",      examplePinyin: "Bú kèqi, yīnggāi de.",              exampleVi: "Không có chi, điều đáng làm.", topic: "greetings" },
  { id: 5,  han: "对不起", pinyin: "duìbùqǐ",    meaning: "Xin lỗi",             pos: "Động từ",   emoji: "😔", example: "对不起，我迟到了。",      examplePinyin: "Duìbuqǐ, wǒ chídào le.",            exampleVi: "Xin lỗi, tôi đến muộn.", topic: "greetings" },
  { id: 6,  han: "没关系", pinyin: "méiguānxi",  meaning: "Không sao, không có gì",           pos: "Tình thái từ", emoji: "🤗", example: "没关系，别担心。",      examplePinyin: "Méi guānxi, bié dānxīn.",           exampleVi: "Không sao, đừng lo lắng.", topic: "greetings" },
  { id: 7,  han: "请",     pinyin: "qǐng",         meaning: "Xin, mời",    pos: "Động từ",   emoji: "🤝", example: "请进，请坐。",            examplePinyin: "Qǐng jìn, qǐng zuò.",               exampleVi: "Mời vào, mời ngồi.", topic: "greetings" },
  { id: 8,  han: "是",     pinyin: "shì",          meaning: "là",                  pos: "Động từ",   emoji: "✅", example: "我是学生。",              examplePinyin: "Wǒ shì xuéshēng.",                  exampleVi: "Tôi là học sinh.", topic: "greetings" },
  { id: 9,  han: "不",     pinyin: "bù",           meaning: "Không, đừng",               pos: "Phó từ",    emoji: "❌", example: "我不是老师。",            examplePinyin: "Wǒ bú shì lǎoshī.",                 exampleVi: "Tôi không phải là giáo viên.", topic: "greetings" },
  { id: 10, han: "欢迎",   pinyin: "huān yíng",    meaning: "hoan nghênh",         pos: "Động từ",   emoji: "🎉", example: "欢迎你们来中国！",        examplePinyin: "Huānyíng nǐmen lái Zhōngguó!",      exampleVi: "Hoan nghênh các bạn đến Trung Quốc!", topic: "greetings" },

  // ===== 2. ĐẠI TỪ (15 từ) =====
  { id: 11, han: "我",     pinyin: "wǒ",           meaning: "tôi",                 pos: "Đại từ",    emoji: "🙋", example: "我很高兴。",              examplePinyin: "Wǒ hěn gāoxìng.",                   exampleVi: "Tôi rất vui.", topic: "pronouns" },
  { id: 12, han: "你",     pinyin: "nǐ",           meaning: "Bạn, anh, chị",                 pos: "Đại từ",    emoji: "👉", example: "你好吗？",                examplePinyin: "Nǐ hǎo ma?",                        exampleVi: "Bạn khỏe không?", topic: "pronouns" },
  { id: 13, han: "您",     pinyin: "nín",          meaning: "ông, bà, ngài (lịch sự)", pos: "Đại từ",   emoji: "🙇", example: "您贵姓？",                examplePinyin: "Nín guì xìng?",                     exampleVi: "Xin hỏi quý danh?", topic: "pronouns" },
  { id: 14, han: "他",     pinyin: "tā",           meaning: "anh ấy",              pos: "Đại từ",    emoji: "👨", example: "他是医生。",              examplePinyin: "Tā shì yīshēng.",                   exampleVi: "Anh ấy là bác sĩ.", topic: "pronouns" },
  { id: 15, han: "她",     pinyin: "tā",           meaning: "cô ấy",               pos: "Đại từ",    emoji: "👩", example: "她很漂亮。",              examplePinyin: "Tā hěn piàoliang.",                 exampleVi: "Cô ấy rất xinh đẹp.", topic: "pronouns" },
  { id: 16, han: "我们",   pinyin: "wǒmen",       meaning: "Chúng ta",           pos: "Đại từ",    emoji: "👥", example: "我们是同学。",            examplePinyin: "Wǒmen shì tóngxué.",                exampleVi: "Chúng tôi là bạn học cùng lớp.", topic: "pronouns" },
  { id: 17, han: "你们",   pinyin: "nǐmen",       meaning: "Các anh,các chị, các bạn",             pos: "Đại từ",    emoji: "👫", example: "你们去哪儿？",            examplePinyin: "Nǐmen qù nǎr?",                    exampleVi: "Các bạn đi đâu?", topic: "pronouns" },
  { id: 18, han: "他们",   pinyin: "tā men",       meaning: "họ (nam)",            pos: "Đại từ",    emoji: "👬", example: "他们在学校。",            examplePinyin: "Tāmen zài xuéxiào.",                exampleVi: "Họ đang ở trường.", topic: "pronouns" },
  { id: 19, han: "这",     pinyin: "zhè",          meaning: "Đây, này",           pos: "Đại từ",    emoji: "👈", example: "这是我的书。",            examplePinyin: "Zhè shì wǒ de shū.",                exampleVi: "Đây là quyển sách của tôi.", topic: "pronouns" },
  { id: 20, han: "那",     pinyin: "nà",           meaning: "Kia, đó",            pos: "Đại từ",    emoji: "👉", example: "那是谁？",                examplePinyin: "Nà shì shuí?",                      exampleVi: "Kia là ai?", topic: "pronouns" },
  { id: 21, han: "谁",     pinyin: "shéi",         meaning: "Ai",                  pos: "Đại từ",    emoji: "❓", example: "你是谁？",                examplePinyin: "Nǐ shì shuí?",                      exampleVi: "Bạn là ai?", topic: "pronouns" },
  { id: 22, han: "什么",   pinyin: "shénme",      meaning: "gì?, cái gì?",         pos: "Đại từ",    emoji: "❔", example: "这是什么？",              examplePinyin: "Zhè shì shénme?",                   exampleVi: "Đây là cái gì?", topic: "pronouns" },
  { id: 23, han: "哪",     pinyin: "nǎ",           meaning: "nào",                 pos: "Đại từ",    emoji: "🤔", example: "你是哪国人？",            examplePinyin: "Nǐ shì nǎ guó rén?",                exampleVi: "Bạn là người nước nào?", topic: "pronouns" },
  { id: 24, han: "怎么",   pinyin: "zěnme",       meaning: "Như thế nào (chỉ cách thức, tình trạng)",         pos: "Đại từ",    emoji: "🤷", example: "你怎么了？",              examplePinyin: "Nǐ zěnme le?",                      exampleVi: "Bạn làm sao vậy?", topic: "pronouns" },
  { id: 25, han: "为什么", pinyin: "wèi shén me",  meaning: "tại sao",             pos: "Đại từ",    emoji: "💭", example: "为什么不去？",            examplePinyin: "Wèishénme bú qù?",                  exampleVi: "Tại sao không đi?", topic: "pronouns" },

  // ===== 3. GIA ĐÌNH (13 từ) =====
  { id: 26, han: "爸爸",   pinyin: "bàba",        meaning: "cha, bố",             pos: "Danh từ",   emoji: "👨", example: "我爸爸是老师。",          examplePinyin: "Wǒ bàba shì lǎoshī.",               exampleVi: "Bố tôi là giáo viên.", topic: "family" },
  { id: 27, han: "妈妈",   pinyin: "māma",        meaning: "Mẹ",             pos: "Danh từ",   emoji: "👩", example: "妈妈做饭。",              examplePinyin: "Māma zuò fàn.",                     exampleVi: "Mẹ đang nấu cơm.", topic: "family" },
  { id: 28, han: "哥哥",   pinyin: "gē ge",        meaning: "anh trai",            pos: "Danh từ",   emoji: "👦", example: "哥哥很高。",              examplePinyin: "Gēge hěn gāo.",                     exampleVi: "Anh trai tôi rất cao.", topic: "family" },
  { id: 29, han: "弟弟",   pinyin: "dì di",        meaning: "em trai",             pos: "Danh từ",   emoji: "👦", example: "弟弟今年五岁。",          examplePinyin: "Dìdi jīnnián wǔ suì.",              exampleVi: "Em trai tôi năm nay 5 tuổi.", topic: "family" },
  { id: 30, han: "姐姐",   pinyin: "jiě jie",      meaning: "chị gái",             pos: "Danh từ",   emoji: "👧", example: "姐姐是学生。",            examplePinyin: "Jiějie shì xuéshēng.",              exampleVi: "Chị gái là học sinh.", topic: "family" },
  { id: 31, han: "妹妹",   pinyin: "mèi mei",      meaning: "em gái",              pos: "Danh từ",   emoji: "👧", example: "妹妹很可爱。",            examplePinyin: "Mèimei hěn kě'ài.",                 exampleVi: "Em gái rất đáng yêu.", topic: "family" },
  { id: 32, han: "儿子",   pinyin: "érzi",        meaning: "Con trai",            pos: "Danh từ",   emoji: "👶", example: "他们的儿子很聪明。",      examplePinyin: "Tāmen de érzi hěn cōngming.",       exampleVi: "Con trai họ rất thông minh.", topic: "family" },
  { id: 33, han: "女儿",   pinyin: "nǚ’ér",        meaning: "Con gái",             pos: "Danh từ",   emoji: "👶", example: "女儿喜欢唱歌。",          examplePinyin: "Nǚ'ér xǐhuan chàng gē.",            exampleVi: "Con gái thích hát.", topic: "family" },
  { id: 34, han: "家",     pinyin: "jiā",          meaning: "Nhà",      pos: "Danh từ",   emoji: "🏠", example: "我家在北京。",            examplePinyin: "Wǒ jiā zài Běijīng.",               exampleVi: "Nhà tôi ở Bắc Kinh.", topic: "family" },
  { id: 35, han: "孩子",   pinyin: "hái zi",       meaning: "đứa trẻ / con cái",   pos: "Danh từ",   emoji: "🧒", example: "孩子们在玩儿。",          examplePinyin: "Háizimen zài wánr.",                exampleVi: "Các em đang chơi.", topic: "family" },
  { id: 36, han: "先生",   pinyin: "xiānsheng",   meaning: "Ông, ngài",  pos: "Danh từ",   emoji: "🤵", example: "王先生是医生。",          examplePinyin: "Wáng xiānsheng shì yīshēng.",       exampleVi: "Ông Vương là bác sĩ.", topic: "family" },
  { id: 37, han: "太太",   pinyin: "tài tai",      meaning: "bà / phu nhân / vợ",  pos: "Danh từ",   emoji: "👰", example: "李太太很热情。",          examplePinyin: "Lǐ tàitai hěn rèqíng.",             exampleVi: "Bà Lý rất nhiệt tình.", topic: "family" },
  { id: 38, han: "小姐",   pinyin: "xiǎojiě",     meaning: "Tiểu thư",       pos: "Danh từ",   emoji: "💁‍♀️", example: "小姐，请喝茶。",        examplePinyin: "Xiǎojie, qǐng hē chá.",             exampleVi: "Cô ơi, mời uống trà.", topic: "family" },

  // ===== 4. SỐ ĐẾM & LƯỢNG TỪ (17 từ) =====
  { id: 39, han: "一",     pinyin: "yī",           meaning: "một",                 pos: "Số từ",     emoji: "1️⃣", example: "我有一个苹果。",         examplePinyin: "Wǒ yǒu yí ge píngguǒ.",             exampleVi: "Tôi có một quả táo.", topic: "numbers" },
  { id: 40, han: "二",     pinyin: "èr",           meaning: "hai",                 pos: "Số từ",     emoji: "2️⃣", example: "我二十岁。",             examplePinyin: "Wǒ èrshí suì.",                     exampleVi: "Tôi hai mươi tuổi.", topic: "numbers" },
  { id: 41, han: "三",     pinyin: "sān",          meaning: "ba",                  pos: "Số từ",     emoji: "3️⃣", example: "三个人在这儿。",         examplePinyin: "Sān ge rén zài zhèr.",              exampleVi: "Ba người ở đây.", topic: "numbers" },
  { id: 42, han: "四",     pinyin: "sì",           meaning: "bốn",                 pos: "Số từ",     emoji: "4️⃣", example: "桌子上有四本书。",       examplePinyin: "Zhuōzi shàng yǒu sì běn shū.",      exampleVi: "Trên bàn có bốn quyển sách.", topic: "numbers" },
  { id: 43, han: "五",     pinyin: "wǔ",           meaning: "năm",                 pos: "Số từ",     emoji: "5️⃣", example: "我有五个朋友。",         examplePinyin: "Wǒ yǒu wǔ ge péngyou.",             exampleVi: "Tôi có năm người bạn.", topic: "numbers" },
  { id: 44, han: "六",     pinyin: "liù",          meaning: "sáu",                 pos: "Số từ",     emoji: "6️⃣", example: "现在六点。",             examplePinyin: "Xiànzài liù diǎn.",                 exampleVi: "Bây giờ là sáu giờ.", topic: "numbers" },
  { id: 45, han: "七",     pinyin: "qī",           meaning: "bảy",                 pos: "Số từ",     emoji: "7️⃣", example: "一周有七天。",           examplePinyin: "Yì zhōu yǒu qī tiān.",              exampleVi: "Một tuần có bảy ngày.", topic: "numbers" },
  { id: 46, han: "八",     pinyin: "bā",           meaning: "tám",                 pos: "Số từ",     emoji: "8️⃣", example: "八月很热。",             examplePinyin: "Bā yuè hěn rè.",                    exampleVi: "Tháng tám rất nóng.", topic: "numbers" },
  { id: 47, han: "九",     pinyin: "jiǔ",          meaning: "chín",                pos: "Số từ",     emoji: "9️⃣", example: "九点开始上课。",         examplePinyin: "Jiǔ diǎn kāishǐ shàngkè.",          exampleVi: "Chín giờ bắt đầu học.", topic: "numbers" },
  { id: 48, han: "十",     pinyin: "shí",          meaning: "mười",                pos: "Số từ",     emoji: "🔟", example: "十个人来了。",           examplePinyin: "Shí ge rén lái le.",                exampleVi: "Mười người đã đến.", topic: "numbers" },
  { id: 49, han: "百",     pinyin: "bǎi",          meaning: "trăm",                pos: "Số từ",     emoji: "💯", example: "一百个学生。",           examplePinyin: "Yì bǎi ge xuéshēng.",               exampleVi: "Một trăm học sinh.", topic: "numbers" },
  { id: 50, han: "千",     pinyin: "qiān",         meaning: "nghìn",               pos: "Số từ",     emoji: "🔢", example: "一千块钱。",             examplePinyin: "Yì qiān kuài qián.",                exampleVi: "Một nghìn tệ.", topic: "numbers" },
  { id: 51, han: "万",     pinyin: "wàn",          meaning: "mười nghìn",          pos: "Số từ",     emoji: "🔢", example: "一年有几天？",           examplePinyin: "Yì nián yǒu jǐ tiān?",              exampleVi: "Một năm có bao nhiêu ngày?", topic: "numbers" },
  { id: 52, han: "零",     pinyin: "líng",         meaning: "số không",            pos: "Số từ",     emoji: "0️⃣", example: "电话号码是零。",         examplePinyin: "Diànhuà hàomǎ shì líng.",           exampleVi: "Số điện thoại có số không.", topic: "numbers" },
  { id: 53, han: "两",     pinyin: "liǎng",        meaning: "hai (với lượng từ)",  pos: "Số từ",     emoji: "✌️", example: "我有两个苹果。",         examplePinyin: "Wǒ yǒu liǎng ge píngguǒ.",          exampleVi: "Tôi có hai quả táo.", topic: "numbers" },
  { id: 54, han: "个",     pinyin: "gè",           meaning: "Cái", pos: "Lượng từ",  emoji: "▫️", example: "一个人，一个苹果。",     examplePinyin: "Yí ge rén, yí ge píngguǒ.",         exampleVi: "Một người, một quả táo.", topic: "numbers" },
  { id: 55, han: "岁",     pinyin: "suì",          meaning: "tuổi",                pos: "Lượng từ",  emoji: "🎂", example: "你几岁了？",             examplePinyin: "Nǐ jǐ suì le?",                     exampleVi: "Bạn bao nhiêu tuổi?", topic: "numbers" },

  // ===== 5. THỜI GIAN (16 từ) =====
  { id: 56, han: "年",     pinyin: "nián",         meaning: "năm",                 pos: "Danh từ",   emoji: "📅", example: "今年是2024年。",         examplePinyin: "Jīnnián shì èr líng èr sì nián.",   exampleVi: "Năm nay là năm 2024.", topic: "time" },
  { id: 57, han: "月",     pinyin: "yuè",          meaning: "tháng",               pos: "Danh từ",   emoji: "🗓️", example: "现在是几月？",          examplePinyin: "Xiànzài shì jǐ yuè?",               exampleVi: "Bây giờ là tháng mấy?", topic: "time" },
  { id: 58, han: "日",     pinyin: "rì",           meaning: "ngày / mặt trời",     pos: "Danh từ",   emoji: "☀️", example: "十月一日是国庆节。",     examplePinyin: "Shí yuè yí rì shì guóqìng jié.",    exampleVi: "Mùng 1 tháng 10 là Quốc khánh.", topic: "time" },
  { id: 59, han: "号",     pinyin: "hào",          meaning: "Ngày",  pos: "Danh từ",   emoji: "📅", example: "今天几号？",             examplePinyin: "Jīntiān jǐ hào?",                   exampleVi: "Hôm nay ngày mấy?", topic: "time" },
  { id: 60, han: "星期",   pinyin: "xīngqī",      meaning: "Tuần, thứ",          pos: "Danh từ",   emoji: "📆", example: "今天星期几？",           examplePinyin: "Jīntiān xīngqī jǐ?",                exampleVi: "Hôm nay là thứ mấy?", topic: "time" },
  { id: 61, han: "天",     pinyin: "tiān",         meaning: "ngày / bầu trời",     pos: "Danh từ",   emoji: "🌤️", example: "今天天气很好。",        examplePinyin: "Jīntiān tiānqì hěn hǎo.",           exampleVi: "Hôm nay thời tiết rất đẹp.", topic: "time" },
  { id: 62, han: "今天",   pinyin: "jīntiān",     meaning: "Hôm nay",             pos: "Danh từ",   emoji: "📌", example: "今天我很忙。",           examplePinyin: "Jīntiān wǒ hěn máng.",              exampleVi: "Hôm nay tôi rất bận.", topic: "time" },
  { id: 63, han: "明天",   pinyin: "míngtiān",    meaning: "Ngày mai",            pos: "Danh từ",   emoji: "🔜", example: "明天我去北京。",         examplePinyin: "Míngtiān wǒ qù Běijīng.",           exampleVi: "Ngày mai tôi đi Bắc Kinh.", topic: "time" },
  { id: 64, han: "昨天",   pinyin: "zuótiān",     meaning: "Hôm qua",             pos: "Danh từ",   emoji: "🔙", example: "昨天我去看电影了。",     examplePinyin: "Zuótiān wǒ qù kàn diànyǐng le.",    exampleVi: "Hôm qua tôi đi xem phim.", topic: "time" },
  { id: 65, han: "现在",   pinyin: "xiànzài",     meaning: "Hiện tại , bây giờ",             pos: "Danh từ",   emoji: "⏰", example: "现在几点？",             examplePinyin: "Xiànzài jǐ diǎn?",                  exampleVi: "Bây giờ là mấy giờ?", topic: "time" },
  { id: 66, han: "时候",   pinyin: "shíhou",      meaning: "Lúc , khi",     pos: "Danh từ",   emoji: "⌚", example: "什么时候去？",           examplePinyin: "Shénme shíhou qù?",                 exampleVi: "Lúc nào đi?", topic: "time" },
  { id: 67, han: "点",     pinyin: "diǎn",         meaning: "Giờ",       pos: "Lượng từ",  emoji: "🕐", example: "三点钟见面。",           examplePinyin: "Sān diǎn zhōng jiàn miàn.",         exampleVi: "Ba giờ gặp nhau.", topic: "time" },
  { id: 68, han: "分",     pinyin: "fēn",          meaning: "phút",                pos: "Lượng từ",  emoji: "⏱️", example: "三点二十分。",          examplePinyin: "Sān diǎn èrshí fēn.",               exampleVi: "Ba giờ hai mươi phút.", topic: "time" },
  { id: 69, han: "上午",   pinyin: "Shàngwǔ",     meaning: "Buổi sáng",           pos: "Danh từ",   emoji: "🌅", example: "上午我去上课。",         examplePinyin: "Shàngwǔ wǒ qù shàngkè.",            exampleVi: "Buổi sáng tôi đi học.", topic: "time" },
  { id: 70, han: "下午",   pinyin: "xiawǔ",       meaning: "Buổi chiều",          pos: "Danh từ",   emoji: "🌇", example: "下午我去打球。",         examplePinyin: "Xiàwǔ wǒ qù dǎ qiú.",               exampleVi: "Buổi chiều tôi đi chơi bóng.", topic: "time" },
  { id: 71, han: "时间",   pinyin: "shí jiān",     meaning: "thời gian",           pos: "Danh từ",   emoji: "⏳", example: "时间过得真快！",         examplePinyin: "Shíjiān guò de zhēn kuài!",         exampleVi: "Thời gian trôi nhanh thật!", topic: "time" },

  // ===== 6. ĐỒ VẬT (16 từ) =====
  { id: 72, han: "书",     pinyin: "shū",          meaning: "sách",                pos: "Danh từ",   emoji: "📚", example: "这是一本好书。",         examplePinyin: "Zhè shì yì běn hǎo shū.",            exampleVi: "Đây là một quyển sách hay.", topic: "objects" },
  { id: 73, han: "桌子",   pinyin: "zhuōzi",      meaning: "Cái bàn",                 pos: "Danh từ",   emoji: "", example: "桌子上有书。",           examplePinyin: "Zhuōzi shàng yǒu shū.",             exampleVi: "Trên bàn có sách.", topic: "objects" },
  { id: 74, han: "椅子",   pinyin: "yǐzi",        meaning: "Ghế dựa",                 pos: "Danh từ",   emoji: "🪑", example: "请坐在椅子上。",         examplePinyin: "Qǐng zuò zài yǐzi shàng.",          exampleVi: "Xin ngồi trên ghế.", topic: "objects" },
  { id: 75, han: "杯子",   pinyin: "bēizi",       meaning: "Ly, tách",             pos: "Danh từ",   emoji: "🥤", example: "杯子里有水。",           examplePinyin: "Bēizi lǐ yǒu shuǐ.",                exampleVi: "Trong cốc có nước.", topic: "objects" },
  { id: 76, han: "电脑",   pinyin: "diànnǎo",     meaning: "Máy tính",            pos: "Danh từ",   emoji: "💻", example: "我要买电脑。",           examplePinyin: "Wǒ yào mǎi diànnǎo.",               exampleVi: "Tôi muốn mua máy tính.", topic: "objects" },
  { id: 77, han: "电视",   pinyin: "diànshì",     meaning: "Tivi",                pos: "Danh từ",   emoji: "📺", example: "他在看电视。",           examplePinyin: "Tā zài kàn diànshì.",               exampleVi: "Anh ấy đang xem tivi.", topic: "objects" },
  { id: 78, han: "电话",   pinyin: "diàn huà",     meaning: "điện thoại",          pos: "Danh từ",   emoji: "📞", example: "你的电话号码是多少？",   examplePinyin: "Nǐ de diànhuà hàomǎ shì duōshao?",  exampleVi: "Số điện thoại của bạn là bao nhiêu?", topic: "objects" },
  { id: 79, han: "车",     pinyin: "chē",          meaning: "xe",                  pos: "Danh từ",   emoji: "🚗", example: "这是我的车。",           examplePinyin: "Zhè shì wǒ de chē.",                exampleVi: "Đây là xe của tôi.", topic: "objects" },
  { id: 80, han: "笔",     pinyin: "bǐ",           meaning: "bút",                 pos: "Danh từ",   emoji: "🖊️", example: "你有几支笔？",          examplePinyin: "Nǐ yǒu jǐ zhī bǐ?",                 exampleVi: "Bạn có mấy cây bút?", topic: "objects" },
  { id: 81, han: "衣服",   pinyin: "yīfu",        meaning: "Quần áo",             pos: "Danh từ",   emoji: "👕", example: "这件衣服很漂亮。",       examplePinyin: "Zhè jiàn yīfu hěn piàoliang.",      exampleVi: "Bộ quần áo này rất đẹp.", topic: "objects" },
  { id: 82, han: "伞",     pinyin: "sǎn",          meaning: "ô / dù",              pos: "Danh từ",   emoji: "☂️", example: "今天带伞了吗？",        examplePinyin: "Jīntiān dài sǎn le ma?",            exampleVi: "Hôm nay bạn mang ô chưa?", topic: "objects" },
  { id: 83, han: "表",     pinyin: "biǎo",         meaning: "đồng hồ đeo tay",     pos: "Danh từ",   emoji: "⌚", example: "我的表很准。",           examplePinyin: "Wǒ de biǎo hěn zhǔn.",              exampleVi: "Đồng hồ của tôi rất chuẩn.", topic: "objects" },
  { id: 84, han: "钱",     pinyin: "qián",         meaning: "tiền",                pos: "Danh từ",   emoji: "💰", example: "我没带钱。",             examplePinyin: "Wǒ méi dài qián.",                  exampleVi: "Tôi không mang tiền.", topic: "objects" },
  { id: 85, han: "票",     pinyin: "piào",         meaning: "vé",                  pos: "Danh từ",   emoji: "🎟️", example: "买两张票。",            examplePinyin: "Mǎi liǎng zhāng piào.",             exampleVi: "Mua hai tấm vé.", topic: "objects" },
  { id: 86, han: "纸",     pinyin: "zhǐ",          meaning: "giấy",                pos: "Danh từ",   emoji: "📄", example: "给我一张纸。",           examplePinyin: "Gěi wǒ yì zhāng zhǐ.",              exampleVi: "Cho tôi một tờ giấy.", topic: "objects" },
  { id: 87, han: "水果",   pinyin: "shuíguǒ",     meaning: "Trái cây",            pos: "Danh từ",   emoji: "🍎", example: "我喜欢吃水果。",         examplePinyin: "Wǒ xǐhuan chī shuǐguǒ.",            exampleVi: "Tôi thích ăn trái cây.", topic: "objects" },

  // ===== 7. THỰC PHẨM (12 từ) =====
  { id: 88, han: "吃",     pinyin: "chī",          meaning: "ăn",                  pos: "Động từ",   emoji: "🍽️", example: "我们吃饭吧。",          examplePinyin: "Wǒmen chī fàn ba.",                 exampleVi: "Chúng ta ăn cơm đi.", topic: "food" },
  { id: 89, han: "喝",     pinyin: "hē",           meaning: "uống",                pos: "Động từ",   emoji: "🥤", example: "我想喝水。",             examplePinyin: "Wǒ xiǎng hē shuǐ.",                 exampleVi: "Tôi muốn uống nước.", topic: "food" },
  { id: 90, han: "饭",     pinyin: "fàn",          meaning: "cơm / bữa ăn",        pos: "Danh từ",   emoji: "🍚", example: "你吃饭了吗？",           examplePinyin: "Nǐ chī fàn le ma?",                 exampleVi: "Bạn ăn cơm chưa?", topic: "food" },
  { id: 91, han: "水",     pinyin: "shuǐ",         meaning: "nước",                pos: "Danh từ",   emoji: "💧", example: "请给我一杯水。",         examplePinyin: "Qǐng gěi wǒ yì bēi shuǐ.",          exampleVi: "Xin cho tôi một cốc nước.", topic: "food" },
  { id: 92, han: "茶",     pinyin: "chá",          meaning: "trà",                 pos: "Danh từ",   emoji: "🍵", example: "请喝茶。",               examplePinyin: "Qǐng hē chá.",                      exampleVi: "Mời uống trà.", topic: "food" },
  { id: 93, han: "苹果",   pinyin: "píngguǒ",     meaning: "Trái táo",             pos: "Danh từ",   emoji: "🍎", example: "苹果很好吃。",           examplePinyin: "Píngguǒ hěn hǎo chī.",              exampleVi: "Táo rất ngon.", topic: "food" },
  { id: 94, han: "鸡蛋",   pinyin: "jī dàn",       meaning: "trứng gà",            pos: "Danh từ",   emoji: "🥚", example: "早上我吃鸡蛋。",         examplePinyin: "Zǎoshang wǒ chī jīdàn.",            exampleVi: "Buổi sáng tôi ăn trứng.", topic: "food" },
  { id: 95, han: "牛奶",   pinyin: "niú nǎi",      meaning: "sữa bò",              pos: "Danh từ",   emoji: "🥛", example: "我喜欢喝牛奶。",         examplePinyin: "Wǒ xǐhuan hē niúnǎi.",              exampleVi: "Tôi thích uống sữa.", topic: "food" },
  { id: 96, han: "米饭",   pinyin: "mǐfàn",       meaning: "Cơm",           pos: "Danh từ",   emoji: "🍚", example: "请来一碗米饭。",         examplePinyin: "Qǐng lái yì wǎn mǐfàn.",            exampleVi: "Cho một bát cơm.", topic: "food" },
  { id: 97, han: "菜",     pinyin: "cài",          meaning: "Thức ăn, món ăn",        pos: "Danh từ",   emoji: "🥬", example: "这个菜很好吃。",         examplePinyin: "Zhè ge cài hěn hǎo chī.",           exampleVi: "Món này rất ngon.", topic: "food" },
  { id: 98, han: "鱼",     pinyin: "yú",           meaning: "cá",                  pos: "Danh từ",   emoji: "🐟", example: "我不吃鱼。",             examplePinyin: "Wǒ bù chī yú.",                     exampleVi: "Tôi không ăn cá.", topic: "food" },
  { id: 99, han: "肉",     pinyin: "ròu",          meaning: "thịt",                pos: "Danh từ",   emoji: "🥩", example: "他爱吃肉。",             examplePinyin: "Tā ài chī ròu.",                    exampleVi: "Anh ấy thích ăn thịt.", topic: "food" },

  // ===== 8. CƠ THỂ (5 từ) =====
  { id: 100, han: "头",    pinyin: "tóu",          meaning: "đầu",                 pos: "Danh từ",   emoji: "🗣️", example: "我头疼。",               examplePinyin: "Wǒ tóu téng.",                      exampleVi: "Tôi đau đầu.", topic: "body" },
  { id: 101, han: "手",    pinyin: "shǒu",         meaning: "tay",                 pos: "Danh từ",   emoji: "✋", example: "他的手很大。",           examplePinyin: "Tā de shǒu hěn dà.",                exampleVi: "Tay anh ấy rất to.", topic: "body" },
  { id: 102, han: "脚",    pinyin: "jiǎo",         meaning: "chân / bàn chân",     pos: "Danh từ",   emoji: "🦶", example: "我的脚很冷。",           examplePinyin: "Wǒ de jiǎo hěn lěng.",              exampleVi: "Chân tôi rất lạnh.", topic: "body" },
  { id: 103, han: "眼睛",  pinyin: "yǎn jing",     meaning: "mắt",                 pos: "Danh từ",   emoji: "👁️", example: "她的眼睛很大。",        examplePinyin: "Tā de yǎnjing hěn dà.",             exampleVi: "Mắt cô ấy rất to.", topic: "body" },
  { id: 104, han: "嘴",    pinyin: "zuǐ",          meaning: "miệng",               pos: "Danh từ",   emoji: "👄", example: "他的嘴很小。",           examplePinyin: "Tā de zuǐ hěn xiǎo.",               exampleVi: "Miệng anh ấy rất nhỏ.", topic: "body" },

  // ===== 9. ĐỘNG TỪ (24 từ) =====
  { id: 105, han: "看",    pinyin: "kàn",          meaning: "Nhìn, xem",          pos: "Động từ",   emoji: "👀", example: "我在看书。",             examplePinyin: "Wǒ zài kàn shū.",                   exampleVi: "Tôi đang đọc sách.", topic: "verbs" },
  { id: 106, han: "听",    pinyin: "tīng",         meaning: "nghe",                pos: "Động từ",   emoji: "👂", example: "请听我说。",             examplePinyin: "Qǐng tīng wǒ shuō.",                exampleVi: "Xin hãy nghe tôi nói.", topic: "verbs" },
  { id: 107, han: "说",    pinyin: "shuō",         meaning: "nói",                 pos: "Động từ",   emoji: "💬", example: "你会说汉语吗？",         examplePinyin: "Nǐ huì shuō Hànyǔ ma?",             exampleVi: "Bạn nói được tiếng Trung không?", topic: "verbs" },
  { id: 108, han: "写",    pinyin: "xiě",          meaning: "viết",                pos: "Động từ",   emoji: "✍️", example: "请写你的名字。",         examplePinyin: "Qǐng xiě nǐ de míngzi.",            exampleVi: "Xin viết tên của bạn.", topic: "verbs" },
  { id: 109, han: "读",    pinyin: "dú",           meaning: "đọc",                 pos: "Động từ",   emoji: "📖", example: "请大声读。",             examplePinyin: "Qǐng dàshēng dú.",                  exampleVi: "Xin đọc to.", topic: "verbs" },
  { id: 110, han: "做",    pinyin: "zuò",          meaning: "làm",                 pos: "Động từ",   emoji: "🛠️", example: "你在做什么？",          examplePinyin: "Nǐ zài zuò shénme?",                exampleVi: "Bạn đang làm gì?", topic: "verbs" },
  { id: 111, han: "来",    pinyin: "lái",          meaning: "Đến, tới",                 pos: "Động từ",   emoji: "🚶", example: "他来了。",               examplePinyin: "Tā lái le.",                        exampleVi: "Anh ấy đã đến.", topic: "verbs" },
  { id: 112, han: "去",    pinyin: "qù",           meaning: "đi",                  pos: "Động từ",   emoji: "🏃", example: "我去学校。",             examplePinyin: "Wǒ qù xuéxiào.",                    exampleVi: "Tôi đi đến trường.", topic: "verbs" },
  { id: 113, han: "坐",    pinyin: "zuò",          meaning: "ngồi",                pos: "Động từ",   emoji: "🪑", example: "请坐。",                 examplePinyin: "Qǐng zuò.",                         exampleVi: "Xin ngồi.", topic: "verbs" },
  { id: 114, han: "站",    pinyin: "zhàn",         meaning: "đứng",                pos: "Động từ",   emoji: "🧍", example: "请站起来。",             examplePinyin: "Qǐng zhàn qǐlái.",                  exampleVi: "Xin đứng lên.", topic: "verbs" },
  { id: 115, han: "走",    pinyin: "zǒu",          meaning: "đi bộ",               pos: "Động từ",   emoji: "🚶‍♂️", example: "我们走吧。",          examplePinyin: "Wǒmen zǒu ba.",                     exampleVi: "Chúng ta đi thôi.", topic: "verbs" },
  { id: 116, han: "住",    pinyin: "zhù",          meaning: "Ở",            pos: "Động từ",   emoji: "🏘️", example: "你住在哪儿？",          examplePinyin: "Nǐ zhù zài nǎr?",                   exampleVi: "Bạn sống ở đâu?", topic: "verbs" },
  { id: 117, han: "喜欢",  pinyin: "xǐhuān",      meaning: "Thích",               pos: "Động từ",   emoji: "❤️", example: "我喜欢唱歌。",           examplePinyin: "Wǒ xǐhuan chàng gē.",               exampleVi: "Tôi thích hát.", topic: "verbs" },
  { id: 118, han: "想",    pinyin: "xiǎng",        meaning: "Muốn",         pos: "Động từ",   emoji: "💭", example: "我想去中国。",           examplePinyin: "Wǒ xiǎng qù Zhōngguó.",             exampleVi: "Tôi muốn đi Trung Quốc.", topic: "verbs" },
  { id: 119, han: "爱",    pinyin: "ài",           meaning: "Yêu, thích",                 pos: "Động từ",   emoji: "💖", example: "我爱我的家。",           examplePinyin: "Wǒ ài wǒ de jiā.",                  exampleVi: "Tôi yêu gia đình tôi.", topic: "verbs" },
  { id: 120, han: "买",    pinyin: "mǎi",          meaning: "mua",                 pos: "Động từ",   emoji: "🛒", example: "我要买水果。",           examplePinyin: "Wǒ yào mǎi shuǐguǒ.",               exampleVi: "Tôi muốn mua trái cây.", topic: "verbs" },
  { id: 121, han: "卖",    pinyin: "mài",          meaning: "bán",                 pos: "Động từ",   emoji: "🏷️", example: "他在卖衣服。",          examplePinyin: "Tā zài mài yīfu.",                  exampleVi: "Anh ấy đang bán quần áo.", topic: "verbs" },
  { id: 122, han: "工作",  pinyin: "gōngzuò",     meaning: "Làm việc, công việc", pos: "Động từ",  emoji: "💼", example: "他在哪儿工作？",         examplePinyin: "Tā zài nǎr gōngzuò?",               exampleVi: "Anh ấy làm việc ở đâu?", topic: "verbs" },
  { id: 123, han: "学习",  pinyin: "xuéxí",       meaning: "Học",             pos: "Động từ",   emoji: "🎓", example: "我们一起学习。",         examplePinyin: "Wǒmen yìqǐ xuéxí.",                 exampleVi: "Chúng ta cùng nhau học.", topic: "verbs" },
  { id: 124, han: "教",    pinyin: "jiāo",         meaning: "dạy",                 pos: "Động từ",   emoji: "👨‍🏫", example: "他教我们汉语。",      examplePinyin: "Tā jiāo wǒmen Hànyǔ.",              exampleVi: "Anh ấy dạy chúng tôi tiếng Trung.", topic: "verbs" },
  { id: 125, han: "认识",  pinyin: "rèn shi",      meaning: "biết / quen / nhận thức", pos: "Động từ", emoji: "🤝", example: "我认识他。",         examplePinyin: "Wǒ rènshi tā.",                     exampleVi: "Tôi quen anh ấy.", topic: "verbs" },
  { id: 126, han: "知道",  pinyin: "zhī dào",      meaning: "biết / hay biết",     pos: "Động từ",   emoji: "💡", example: "我知道这件事。",         examplePinyin: "Wǒ zhīdào zhè jiàn shì.",           exampleVi: "Tôi biết chuyện này.", topic: "verbs" },
  { id: 127, han: "会",    pinyin: "huì",          meaning: "Biết", pos: "Động từ",   emoji: "✨", example: "我会说汉语。",           examplePinyin: "Wǒ huì shuō Hànyǔ.",                exampleVi: "Tôi biết nói tiếng Trung.", topic: "verbs" },
  { id: 128, han: "能",    pinyin: "néng",         meaning: "có thể",              pos: "Động từ",   emoji: "💪", example: "你能帮我吗？",           examplePinyin: "Nǐ néng bāng wǒ ma?",               exampleVi: "Bạn có thể giúp tôi không?", topic: "verbs" },

  // ===== 10. TÍNH TỪ (16 từ) =====
  { id: 129, han: "好",    pinyin: "hǎo",          meaning: "Khỏe, tốt",                 pos: "Tính từ",   emoji: "👍", example: "这个很好。",             examplePinyin: "Zhège hěn hǎo.",                    exampleVi: "Cái này rất tốt.", topic: "adjectives" },
  { id: 130, han: "坏",    pinyin: "huài",         meaning: "xấu / hỏng",          pos: "Tính từ",   emoji: "👎", example: "电视坏了。",             examplePinyin: "Diànshì huài le.",                  exampleVi: "Tivi hỏng rồi.", topic: "adjectives" },
  { id: 131, han: "大",    pinyin: "dà",           meaning: "Lớn",            pos: "Tính từ",   emoji: "🐘", example: "这个房间很大。",         examplePinyin: "Zhège fángjiān hěn dà.",            exampleVi: "Phòng này rất lớn.", topic: "adjectives" },
  { id: 132, han: "小",    pinyin: "xiǎo",         meaning: "nhỏ , bé",                 pos: "Tính từ",   emoji: "🐜", example: "我的狗很小。",           examplePinyin: "Wǒ de gǒu hěn xiǎo.",               exampleVi: "Chó của tôi rất nhỏ.", topic: "adjectives" },
  { id: 133, han: "多",    pinyin: "duō",          meaning: "Nhiều (chỉ mức độ)",               pos: "Tính từ",   emoji: "📈", example: "很多人来了。",           examplePinyin: "Hěn duō rén lái le.",               exampleVi: "Rất nhiều người đã đến.", topic: "adjectives" },
  { id: 134, han: "少",    pinyin: "shǎo",         meaning: "ít",                  pos: "Tính từ",   emoji: "📉", example: "钱不多了。",             examplePinyin: "Qián bù duō le.",                   exampleVi: "Tiền không còn nhiều.", topic: "adjectives" },
  { id: 135, han: "高",    pinyin: "gāo",          meaning: "cao",                 pos: "Tính từ",   emoji: "📏", example: "他很高。",               examplePinyin: "Tā hěn gāo.",                       exampleVi: "Anh ấy rất cao.", topic: "adjectives" },
  { id: 136, han: "热",    pinyin: "rè",           meaning: "nóng",                pos: "Tính từ",   emoji: "🥵", example: "今天很热。",             examplePinyin: "Jīntiān hěn rè.",                   exampleVi: "Hôm nay rất nóng.", topic: "adjectives" },
  { id: 137, han: "冷",    pinyin: "lěng",         meaning: "lạnh",                pos: "Tính từ",   emoji: "🥶", example: "冬天很冷。",             examplePinyin: "Dōngtiān hěn lěng.",                exampleVi: "Mùa đông rất lạnh.", topic: "adjectives" },
  { id: 138, han: "新",    pinyin: "xīn",          meaning: "mới",                 pos: "Tính từ",   emoji: "🆕", example: "这是新衣服。",           examplePinyin: "Zhè shì xīn yīfu.",                 exampleVi: "Đây là quần áo mới.", topic: "adjectives" },
  { id: 139, han: "旧",    pinyin: "jiù",          meaning: "cũ",                  pos: "Tính từ",   emoji: "📜", example: "这是一本旧书。",         examplePinyin: "Zhè shì yì běn jiù shū.",           exampleVi: "Đây là một quyển sách cũ.", topic: "adjectives" },
  { id: 140, han: "漂亮",  pinyin: "piàoliang",   meaning: "Đẹp",                 pos: "Tính từ",   emoji: "🌹", example: "她很漂亮。",             examplePinyin: "Tā hěn piàoliang.",                 exampleVi: "Cô ấy rất đẹp.", topic: "adjectives" },
  { id: 141, han: "贵",    pinyin: "guì",          meaning: "đắt",                 pos: "Tính từ",   emoji: "💎", example: "这个太贵了。",           examplePinyin: "Zhège tài guì le.",                 exampleVi: "Cái này quá đắt.", topic: "adjectives" },
  { id: 142, han: "便宜",  pinyin: "pián yi",      meaning: "rẻ",                  pos: "Tính từ",   emoji: "🪙", example: "这个很便宜。",           examplePinyin: "Zhège hěn piányi.",                 exampleVi: "Cái này rất rẻ.", topic: "adjectives" },
  { id: 143, han: "快",    pinyin: "kuài",         meaning: "nhanh",               pos: "Tính từ",   emoji: "⚡", example: "他跑得很快。",           examplePinyin: "Tā pǎo de hěn kuài.",               exampleVi: "Anh ấy chạy rất nhanh.", topic: "adjectives" },
  { id: 144, han: "慢",    pinyin: "màn",          meaning: "chậm",                pos: "Tính từ",   emoji: "🐌", example: "请慢走。",               examplePinyin: "Qǐng màn zǒu.",                     exampleVi: "Xin đi từ từ.", topic: "adjectives" },

  // ===== 11. NƠI CHỐN & PHƯƠNG HƯỚNG (6 từ) =====
  { id: 145, han: "学校",  pinyin: "xuéxiào",     meaning: "Trường học",          pos: "Danh từ",   emoji: "🏫", example: "我们的学校很大。",       examplePinyin: "Wǒmen de xuéxiào hěn dà.",          exampleVi: "Trường của chúng tôi rất lớn.", topic: "places" },
  { id: 146, han: "医院",  pinyin: "yīyuàn",      meaning: "Bệnh viện",           pos: "Danh từ",   emoji: "🏥", example: "他在医院工作。",         examplePinyin: "Tā zài yīyuàn gōngzuò.",            exampleVi: "Anh ấy làm việc ở bệnh viện.", topic: "places" },
  { id: 147, han: "商店",  pinyin: "shāngdiàn",   meaning: "Cửa hàng",            pos: "Danh từ",   emoji: "🏬", example: "我去商店买东西。",       examplePinyin: "Wǒ qù shāngdiàn mǎi dōngxi.",       exampleVi: "Tôi đi cửa hàng mua đồ.", topic: "places" },
  { id: 148, han: "饭店",  pinyin: "fàn diàn",     meaning: "nhà hàng",            pos: "Danh từ",   emoji: "🏨", example: "这家饭店很好。",         examplePinyin: "Zhè jiā fàndiàn hěn hǎo.",          exampleVi: "Nhà hàng này rất tốt.", topic: "places" },
  { id: 149, han: "房间",  pinyin: "fáng jiān",    meaning: "phòng",               pos: "Danh từ",   emoji: "🚪", example: "我的房间很干净。",       examplePinyin: "Wǒ de fángjiān hěn gānjìng.",       exampleVi: "Phòng của tôi rất sạch.", topic: "places" },
  { id: 150, han: "里",    pinyin: "lǐ",           meaning: "trong / bên trong",   pos: "Danh từ",   emoji: "📥", example: "杯子里有水。",           examplePinyin: "Bēizi lǐ yǒu shuǐ.",                exampleVi: "Trong cốc có nước.", topic: "places" },
  // ===== TỪ VỰNG BỔ SUNG TỪ FILE HK1 (theo bài học) =====
  // --- Bài 3 ---
  { id: 151, han: "叫", pinyin: "jiào", meaning: "gọi, kêu", pos: "Động từ", emoji: "📢", example: "小鸟在树上叫。", examplePinyin: "xiǎo niǎo zài shù shàng jiào", exampleVi: "Chim nhỏ kêu trên cây.", topic: "pronouns" },
  { id: 152, han: "名字", pinyin: "míngzi", meaning: "Tên , họ tên", pos: "Danh từ", emoji: "🏷️", example: "你的名字是什么？", examplePinyin: "nǐ de míngzi shì shénme", exampleVi: "Tên của bạn là gì?", topic: "pronouns" },
  { id: 153, han: "老师", pinyin: "lǎoshī", meaning: "Giáo viên, thầy giáo, cô giáo", pos: "Danh từ", emoji: "👨‍🏫", example: "老师正在教我们中文。", examplePinyin: "lǎoshī zhèngzài jiào wǒmen zhōngwén", exampleVi: "Thầy/cô giáo đang dạy chúng tôi tiếng Trung.", topic: "pronouns" },
  { id: 154, han: "吗", pinyin: "ma", meaning: "...không? , …à?", pos: "Phó từ", emoji: "❓", example: "你好吗？", examplePinyin: "nǐ hǎo ma", exampleVi: "Bạn khỏe không?", topic: "pronouns" },
  { id: 155, han: "学生", pinyin: "xuéshēng", meaning: "học sinh", pos: "Danh từ", emoji: "🎓", example: "他是学生。", examplePinyin: "tā shì xuéshēng", exampleVi: "Anh ấy là học sinh.", topic: "pronouns" },
  { id: 156, han: "人", pinyin: "rén", meaning: "người", pos: "Danh từ", emoji: "🧑", example: "很多人喜欢喝茶。", examplePinyin: "hěn duō rén xǐhuān hē chá", exampleVi: "Nhiều người thích uống trà.", topic: "pronouns" },
  { id: 157, han: "越南", pinyin: "Yuènán", meaning: "Việt Nam", pos: "Danh từ", emoji: "🇻🇳", example: "越南有很多美丽的海滩。", examplePinyin: "Yuènán yǒu hěn duō měilì de hǎitān。", exampleVi: "Việt Nam có nhiều bãi biển đẹp.", topic: "pronouns" },
  { id: 158, han: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", pos: "Danh từ", emoji: "🇨🇳", example: "中国的长城很壮观。", examplePinyin: "Zhōngguó de Chángchéng hěn zhuàngguān。", exampleVi: "Vạn lý Trường Thành của Trung Quốc rất壮观。", topic: "pronouns" },
  { id: 159, han: "美国", pinyin: "Měiguó", meaning: "Mỹ", pos: "Danh từ", emoji: "🇺🇸", example: "美国有很多著名大学。", examplePinyin: "Měiguó yǒu hěn duō zhùmíng dàxué。", exampleVi: "Mỹ có nhiều trường đại học nổi tiếng.", topic: "pronouns" },
  { id: 160, han: "俄罗斯", pinyin: "Éluósī", meaning: "Nga", pos: "Danh từ", emoji: "🇷🇺", example: "俄罗斯很大。", examplePinyin: "Éluósī hěn dà。", exampleVi: "Nga rất rộng lớn.", topic: "pronouns" },
  // --- Bài 4 ---
  { id: 161, han: "的", pinyin: "de", meaning: "(Trợ từ)", pos: "Trợ từ", emoji: "🔗", example: "这是我的书。", examplePinyin: "Zhè shì wǒ de shū。", exampleVi: "Đây là sách của tôi.", topic: "pronouns" },
  { id: 162, han: "汉语", pinyin: "Hànyǔ", meaning: "Tiếng Trung", pos: "Danh từ", emoji: "🀄", example: "我学习汉语。", examplePinyin: "Wǒ xuéxí Hànyǔ。", exampleVi: "Tôi học tiếng Trung.", topic: "pronouns" },
  { id: 163, han: "国", pinyin: "guó", meaning: "Nước, quốc gia", pos: "Danh từ", emoji: "🏴", example: "中国是一个美丽的国家。", examplePinyin: "zhōng guó shì yī gè měi lì de guó jiā", exampleVi: "Trung Quốc là một quốc gia đẹp.", topic: "pronouns" },
  { id: 164, han: "呢", pinyin: "ne", meaning: "Trợ từ", pos: "Trợ từ", emoji: "🤔", example: "你今天去哪里呢？", examplePinyin: "nǐ jīn tiān qù nǎ lǐ ne", exampleVi: "Hôm nay bạn đi đâu vậy?", topic: "pronouns" },
  { id: 165, han: "同学", pinyin: "tóng xué", meaning: "Bạn học", pos: "Danh từ", emoji: "👫", example: "我的同学很聪明。", examplePinyin: "wǒ de tóng xué hěn cōng míng", exampleVi: "Bạn học của tôi rất thông minh.", topic: "pronouns" },
  { id: 166, han: "朋友", pinyin: "péngyou", meaning: "Bạn bè", pos: "Danh từ", emoji: "👥", example: "我有很多朋友。", examplePinyin: "wǒ yǒu hěn duō péngyou。", exampleVi: "Tôi có nhiều bạn bè.", topic: "pronouns" },
  // --- Bài 5 ---
  { id: 167, han: "有", pinyin: "yǒu", meaning: "Có", pos: "Danh từ", emoji: "✅", example: "他有钱。", examplePinyin: "tā yǒu qián。", exampleVi: "Anh ấy có tiền.", topic: "numbers" },
  { id: 168, han: "口", pinyin: "kǒu", meaning: "Lượng từ chỉ người", pos: "Lượng từ", emoji: "👄", example: "我家有三口人。", examplePinyin: "wǒ jiā yǒu sān kǒu rén。", exampleVi: "Gia đình tôi có ba người.", topic: "numbers" },
  { id: 169, han: "几", pinyin: "jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Số từ", emoji: "🔢", example: "你有几个苹果？", examplePinyin: "nǐ yǒu jǐ gè píng guǒ", exampleVi: "Bạn có mấy quả táo?", topic: "numbers" },
  { id: 170, han: "了", pinyin: "le", meaning: "Động từ +了: Nhấn mạnh hành động xong xuôi. 了 nằm cuối câu: Nhấn mạnh trạng thái thay đổi.", pos: "Trợ từ", emoji: "✓", example: "我吃了饭。", examplePinyin: "wǒ chī le fàn", exampleVi: "Tôi đã ăn cơm.", topic: "numbers" },
  { id: 171, han: "了", pinyin: "le", meaning: "了nằm cuối câu: Nhấn mạnh trạng thái thay đổi", pos: "Trợ từ", emoji: "✓", example: "下雨了。", examplePinyin: "xià yǔ le", exampleVi: "Trời mưa rồi.", topic: "numbers" },
  { id: 172, han: "今年", pinyin: "jīnnián", meaning: "Năm nay", pos: "Danh từ", emoji: "🗓️", example: "今年。", examplePinyin: "jīnnián.", exampleVi: "Năm nay.", topic: "numbers" },
  // --- Bài 6 ---
  { id: 173, han: "很", pinyin: "hěn", meaning: "Rất", pos: "Phó từ", emoji: "✨", example: "很。", examplePinyin: "hěn.", exampleVi: "Rất.", topic: "verbs" },
  { id: 174, han: "好吃", pinyin: "hǎochī", meaning: "Ngon", pos: "Động từ", emoji: "😋", example: "好吃。", examplePinyin: "hǎochī.", exampleVi: "Ngon.", topic: "verbs" },
  { id: 175, han: "汉字", pinyin: "Hànzì", meaning: "Hán tự", pos: "Danh từ", emoji: "🀄", example: "汉字。", examplePinyin: "Hànzì.", exampleVi: "Hán tự.", topic: "verbs" },
  { id: 176, han: "字", pinyin: "zì", meaning: "Chữ", pos: "Danh từ", emoji: "🔤", example: "字。", examplePinyin: "zì.", exampleVi: "Chữ.", topic: "verbs" },
  // --- Bài 7 ---
  { id: 177, han: "问", pinyin: "wèn", meaning: "Hỏi", pos: "Động từ", emoji: "❓", example: "问。", examplePinyin: "wèn.", exampleVi: "Hỏi.", topic: "verbs" },
  { id: 178, han: "答", pinyin: "dá", meaning: "Trả lời", pos: "Động từ", emoji: "💬", example: "答。", examplePinyin: "dá.", exampleVi: "Trả lời.", topic: "verbs" },
  // --- Bài 8 ---
  { id: 179, han: "多少", pinyin: "duōshao", meaning: "Bao nhiêu", pos: "Số từ", emoji: "🔢", example: "多少。", examplePinyin: "duōshao.", exampleVi: "Bao nhiêu.", topic: "numbers" },
  { id: 180, han: "块", pinyin: "kuài", meaning: "Đồng( đơn vị tiền tệ)", pos: "Lượng từ", emoji: "💴", example: "块。", examplePinyin: "kuài.", exampleVi: "Đồng( đơn vị tiền tệ).", topic: "numbers" },
  { id: 181, han: "几", pinyin: "Jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Số từ", emoji: "🔢", example: "几。", examplePinyin: "Jǐ.", exampleVi: "Mấy? (hỏi số lượng bao nhiêu).", topic: "numbers" },
  { id: 182, han: "午", pinyin: "wǔ", meaning: "Buổi trưa, giờ Ngọ", pos: "Danh từ", emoji: "", example: "午。", examplePinyin: "wǔ.", exampleVi: "Buổi trưa, giờ Ngọ.", topic: "numbers" },
  // --- Bài 9 ---
  { id: 183, han: "猫", pinyin: "māo", meaning: "Con mèo", pos: "Danh từ", emoji: "", example: "猫。", examplePinyin: "māo.", exampleVi: "Con mèo.", topic: "verbs" },
  { id: 184, han: "在", pinyin: "zài", meaning: "Ở", pos: "Danh từ", emoji: "", example: "在。", examplePinyin: "zài.", exampleVi: "Ở.", topic: "verbs" },
  { id: 185, han: "那儿", pinyin: "nàr", meaning: "Đó, nơi đó", pos: "Đại từ", emoji: "", example: "那儿。", examplePinyin: "nàr.", exampleVi: "Đó, nơi đó.", topic: "verbs" },
  { id: 186, han: "狗", pinyin: "gǒu", meaning: "con chó", pos: "Danh từ", emoji: "", example: "狗。", examplePinyin: "gǒu.", exampleVi: "con chó.", topic: "verbs" },
  { id: 187, han: "下面(下)", pinyin: "xiàmiàn (xià)", meaning: "Bên dưới (dưới)", pos: "Danh từ", emoji: "", example: "下面(下)。", examplePinyin: "xiàmiàn (xià).", exampleVi: "Bên dưới (dưới).", topic: "verbs" },
  { id: 188, han: "上面(上)", pinyin: "shàngmiàn (shàng)", meaning: "Bên trên (trên)", pos: "Danh từ", emoji: "", example: "上面(上)。", examplePinyin: "shàngmiàn (shàng).", exampleVi: "Bên trên (trên).", topic: "verbs" },
  { id: 189, han: "里面(里)", pinyin: "lǐmiàn (lǐ)", meaning: "Bên trong (trong)", pos: "Danh từ", emoji: "", example: "里面(里)。", examplePinyin: "lǐmiàn (lǐ).", exampleVi: "Bên trong (trong).", topic: "verbs" },
  { id: 190, han: "外面(外)", pinyin: "wàimian (wài)", meaning: "Bên ngoài (ngoài)", pos: "Danh từ", emoji: "", example: "外面(外)。", examplePinyin: "wàimian (wài).", exampleVi: "Bên ngoài (ngoài).", topic: "verbs" },
  { id: 191, han: "左边(左)", pinyin: "zuǒbiān (zuǒ)", meaning: "Bên trái (trái)", pos: "Danh từ", emoji: "", example: "左边(左)。", examplePinyin: "zuǒbiān (zuǒ).", exampleVi: "Bên trái (trái).", topic: "verbs" },
  { id: 192, han: "右边(右)", pinyin: "yòubiān (yòu)", meaning: "Bên phải (phải)", pos: "Danh từ", emoji: "", example: "右边(右)。", examplePinyin: "yòubiān (yòu).", exampleVi: "Bên phải (phải).", topic: "verbs" },
  { id: 193, han: "哪儿", pinyin: "nǎr", meaning: "Đâu", pos: "Đại từ", emoji: "", example: "哪儿。", examplePinyin: "nǎr.", exampleVi: "Đâu.", topic: "verbs" },
  { id: 194, han: "医生", pinyin: "yīshēng", meaning: "Bác sĩ", pos: "Danh từ", emoji: "👨‍⚕️", example: "医生。", examplePinyin: "yīshēng.", exampleVi: "Bác sĩ.", topic: "verbs" },
  { id: 195, han: "护士", pinyin: "hùshi", meaning: "Y tá", pos: "Danh từ", emoji: "", example: "护士。", examplePinyin: "hùshi.", exampleVi: "Y tá.", topic: "verbs" },
  { id: 196, han: "病人", pinyin: "bìngrén", meaning: "Bệnh  nhân", pos: "Danh từ", emoji: "", example: "病人。", examplePinyin: "bìngrén.", exampleVi: "Bệnh  nhân.", topic: "verbs" },
  // --- Bài 10 ---
  { id: 197, han: "上", pinyin: "shàng", meaning: "Trên, lên", pos: "Danh từ", emoji: "", example: "上。", examplePinyin: "shàng.", exampleVi: "Trên, lên.", topic: "verbs" },
  { id: 198, han: "下", pinyin: "xià", meaning: "Dưới, xuống / Rơi", pos: "Danh từ", emoji: "", example: "下。", examplePinyin: "xià.", exampleVi: "Dưới, xuống.", topic: "verbs" },
  { id: 199, han: "里面", pinyin: "lǐ miàn", meaning: "Bên trong", pos: "Danh từ", emoji: "", example: "里面。", examplePinyin: "lǐ miàn.", exampleVi: "Bên trong.", topic: "verbs" },
  { id: 200, han: "外边", pinyin: "wài biān", meaning: "Bên ngoài", pos: "Danh từ", emoji: "", example: "外边。", examplePinyin: "wài biān.", exampleVi: "Bên ngoài.", topic: "verbs" },
  { id: 201, han: "前面", pinyin: "qián miàn", meaning: "Phía trước", pos: "Danh từ", emoji: "", example: "前面。", examplePinyin: "qián miàn.", exampleVi: "Phía trước.", topic: "verbs" },
  { id: 202, han: "后面", pinyin: "hòu miàn", meaning: "Phía sau", pos: "Danh từ", emoji: "", example: "后面。", examplePinyin: "hòu miàn.", exampleVi: "Phía sau.", topic: "verbs" },
  { id: 203, han: "左边", pinyin: "zuǒ biān", meaning: "Bên trái", pos: "Danh từ", emoji: "", example: "左边。", examplePinyin: "zuǒ biān.", exampleVi: "Bên trái.", topic: "verbs" },
  { id: 204, han: "右边", pinyin: "yòu biān", meaning: "Bên phải", pos: "Danh từ", emoji: "", example: "右边。", examplePinyin: "yòu biān.", exampleVi: "Bên phải.", topic: "verbs" },
  { id: 205, han: "旁边", pinyin: "páng biān", meaning: "Bên cạnh", pos: "Danh từ", emoji: "", example: "旁边。", examplePinyin: "páng biān.", exampleVi: "Bên cạnh.", topic: "verbs" },
  { id: 206, han: "本", pinyin: "běn", meaning: "Quyển, cuốn", pos: "Danh từ", emoji: "", example: "本。", examplePinyin: "běn.", exampleVi: "Quyển, cuốn.", topic: "verbs" },
  { id: 207, han: "和", pinyin: "hé", meaning: "Và", pos: "Danh từ", emoji: "", example: "和。", examplePinyin: "hé.", exampleVi: "Và.", topic: "verbs" },
  { id: 208, han: "这儿", pinyin: "zhèr", meaning: "Chỗ này, ở đây", pos: "Đại từ", emoji: "", example: "这儿。", examplePinyin: "zhèr.", exampleVi: "Chỗ này, ở đây.", topic: "verbs" },
  { id: 209, han: "没有(没)", pinyin: "méiyǒu (méi)", meaning: "Không có", pos: "Phó từ", emoji: "", example: "没有(没)。", examplePinyin: "méiyǒu (méi).", exampleVi: "Không có.", topic: "verbs" },
  // --- Bài 11 ---
  { id: 210, han: "秒", pinyin: "miǎo", meaning: "Giây", pos: "Danh từ", emoji: "", example: "秒。", examplePinyin: "miǎo.", exampleVi: "Giây.", topic: "verbs" },
  { id: 211, han: "中午", pinyin: "zhōngwǔ", meaning: "Buổi trưa", pos: "Danh từ", emoji: "", example: "中午。", examplePinyin: "zhōngwǔ.", exampleVi: "Buổi trưa.", topic: "verbs" },
  { id: 212, han: "吃饭", pinyin: "chīfàn", meaning: "Ăn cơm", pos: "Động từ", emoji: "", example: "吃饭。", examplePinyin: "chīfàn.", exampleVi: "Ăn cơm.", topic: "verbs" },
  { id: 213, han: "回", pinyin: "huí", meaning: "Về, trở về", pos: "Danh từ", emoji: "", example: "回。", examplePinyin: "huí.", exampleVi: "Về, trở về.", topic: "verbs" },
  { id: 214, han: "电影", pinyin: "diànyǐng", meaning: "Phim", pos: "Danh từ", emoji: "", example: "电影。", examplePinyin: "diànyǐng.", exampleVi: "Phim.", topic: "verbs" },
  { id: 215, han: "前", pinyin: "qián", meaning: "Trước", pos: "Danh từ", emoji: "", example: "前。", examplePinyin: "qián.", exampleVi: "Trước.", topic: "verbs" },
  // --- Bài 12 ---
  { id: 216, han: "天气", pinyin: "tiānqì", meaning: "Thời tiết", pos: "Danh từ", emoji: "", example: "天气。", examplePinyin: "tiānqì.", exampleVi: "Thời tiết.", topic: "time" },
  { id: 217, han: "怎么样", pinyin: "zěnmeyàng", meaning: "Như thế nào", pos: "Đại từ", emoji: "", example: "怎么样。", examplePinyin: "zěnmeyàng.", exampleVi: "Như thế nào.", topic: "time" },
  { id: 218, han: "太", pinyin: "tài", meaning: "Quá, lắm", pos: "Danh từ", emoji: "", example: "太。", examplePinyin: "tài.", exampleVi: "Quá, lắm.", topic: "time" },
  { id: 219, han: "太....了", pinyin: "tài ......le", meaning: "Quá ….", pos: "Trợ từ", emoji: "", example: "太....了。", examplePinyin: "tài ......le.", exampleVi: "Quá …..", topic: "time" },
  { id: 220, han: "下雨", pinyin: "xiàyǔ", meaning: "Đỗ mưa", pos: "Danh từ", emoji: "", example: "下雨。", examplePinyin: "xiàyǔ.", exampleVi: "Đỗ mưa.", topic: "time" },
  { id: 221, han: "下", pinyin: "xià", meaning: "Rơi", pos: "Danh từ", emoji: "", example: "下。", examplePinyin: "xià.", exampleVi: "Rơi.", topic: "time" },
  { id: 222, han: "雨", pinyin: "yǔ", meaning: "Mưa", pos: "Danh từ", emoji: "", example: "雨。", examplePinyin: "yǔ.", exampleVi: "Mưa.", topic: "time" },
  { id: 223, han: "身体", pinyin: "shēntǐ", meaning: "Sức khỏe", pos: "Danh từ", emoji: "", example: "身体。", examplePinyin: "shēntǐ.", exampleVi: "Sức khỏe.", topic: "time" },
  { id: 224, han: "些", pinyin: "xiē", meaning: "Một it, một vài", pos: "Danh từ", emoji: "", example: "些。", examplePinyin: "xiē.", exampleVi: "Một it, một vài.", topic: "time" },
  { id: 225, han: "早", pinyin: "zǎo", meaning: "Sớm", pos: "Danh từ", emoji: "", example: "早。", examplePinyin: "zǎo.", exampleVi: "Sớm.", topic: "time" },
  { id: 226, han: "迟到", pinyin: "chídào", meaning: "Trễ, muộn", pos: "Danh từ", emoji: "", example: "迟到。", examplePinyin: "chídào.", exampleVi: "Trễ, muộn.", topic: "time" },
  { id: 227, han: "雨伞", pinyin: "yǔsǎn", meaning: "Cây dù", pos: "Danh từ", emoji: "", example: "雨伞。", examplePinyin: "yǔsǎn.", exampleVi: "Cây dù.", topic: "time" },
  { id: 228, han: "雨衣", pinyin: "yǔyī", meaning: "Áo mưa", pos: "Danh từ", emoji: "", example: "雨衣。", examplePinyin: "yǔyī.", exampleVi: "Áo mưa.", topic: "time" },
  { id: 229, han: "葡萄", pinyin: "pútáo", meaning: "Trái nho", pos: "Danh từ", emoji: "", example: "葡萄。", examplePinyin: "pútáo.", exampleVi: "Trái nho.", topic: "time" },
  { id: 230, han: "香蕉", pinyin: "xiāngjiāo", meaning: "Trái chuối", pos: "Danh từ", emoji: "", example: "香蕉。", examplePinyin: "xiāngjiāo.", exampleVi: "Trái chuối.", topic: "time" },
  { id: 231, han: "草莓", pinyin: "cǎoméi", meaning: "Dâu tây", pos: "Danh từ", emoji: "", example: "草莓。", examplePinyin: "cǎoméi.", exampleVi: "Dâu tây.", topic: "time" },
  { id: 232, han: "桃子", pinyin: "táozi", meaning: "Trái đào", pos: "Danh từ", emoji: "", example: "桃子。", examplePinyin: "táozi.", exampleVi: "Trái đào.", topic: "time" },
  { id: 233, han: "橘子", pinyin: "júzi", meaning: "Trái quýt", pos: "Danh từ", emoji: "", example: "橘子。", examplePinyin: "júzi.", exampleVi: "Trái quýt.", topic: "time" },
  { id: 234, han: "哈蜜瓜", pinyin: "hā mì guā", meaning: "Dưa lưới", pos: "Danh từ", emoji: "", example: "哈蜜瓜。", examplePinyin: "hā mì guā.", exampleVi: "Dưa lưới.", topic: "time" },
  { id: 235, han: "榴莲", pinyin: "liúlián", meaning: "Sầu riêng", pos: "Danh từ", emoji: "", example: "榴莲。", examplePinyin: "liúlián.", exampleVi: "Sầu riêng.", topic: "time" },
  { id: 236, han: "红毛丹", pinyin: "hóngmáodān", meaning: "Chôm chôm", pos: "Danh từ", emoji: "", example: "红毛丹。", examplePinyin: "hóngmáodān.", exampleVi: "Chôm chôm.", topic: "time" },
  { id: 237, han: "还好", pinyin: "háihǎo", meaning: "Cũng tốt", pos: "Tính từ", emoji: "", example: "还好。", examplePinyin: "háihǎo.", exampleVi: "Cũng tốt.", topic: "time" },
  { id: 238, han: "还可以", pinyin: "hái kěyǐ", meaning: "Cũng tạm, cũng được, khá ổn", pos: "Danh từ", emoji: "", example: "还可以。", examplePinyin: "hái kěyǐ.", exampleVi: "Cũng tạm, cũng được, khá ổn.", topic: "time" },
  { id: 239, han: "差不多", pinyin: "chàbuduō", meaning: "Cũng cũng", pos: "Danh từ", emoji: "", example: "差不多。", examplePinyin: "chàbuduō.", exampleVi: "Cũng cũng.", topic: "time" },
  { id: 240, han: "差", pinyin: "chà", meaning: "Kém, không tốt, tệ", pos: "Phó từ", emoji: "", example: "差。", examplePinyin: "chà.", exampleVi: "Kém, không tốt, tệ.", topic: "time" },
  { id: 241, han: "很差", pinyin: "hěn chà", meaning: "Rất kém", pos: "Phó từ", emoji: "", example: "很差。", examplePinyin: "hěn chà.", exampleVi: "Rất kém.", topic: "time" },
  // --- Bài 13 ---
  { id: 242, han: "喂", pinyin: "wèi", meaning: "A lô, này", pos: "Danh từ", emoji: "", example: "喂。", examplePinyin: "wèi.", exampleVi: "A lô, này.", topic: "adjectives" },
  { id: 243, han: "也", pinyin: "yě", meaning: "Cũng", pos: "Danh từ", emoji: "", example: "也。", examplePinyin: "yě.", exampleVi: "Cũng.", topic: "adjectives" },
  { id: 244, han: "睡觉", pinyin: "shuìjiào", meaning: "Đi ngủ", pos: "Danh từ", emoji: "", example: "睡觉。", examplePinyin: "shuìjiào.", exampleVi: "Đi ngủ.", topic: "adjectives" },
  { id: 245, han: "开心", pinyin: "kāixīn", meaning: "Vui", pos: "Danh từ", emoji: "", example: "开心。", examplePinyin: "kāixīn.", exampleVi: "Vui.", topic: "adjectives" },
  { id: 246, han: "难过", pinyin: "nánguò", meaning: "Buồn", pos: "Danh từ", emoji: "", example: "难过。", examplePinyin: "nánguò.", exampleVi: "Buồn.", topic: "adjectives" },
  { id: 247, han: "讨厌", pinyin: "tǎoyàn", meaning: "Ghét", pos: "Danh từ", emoji: "", example: "讨厌。", examplePinyin: "tǎoyàn.", exampleVi: "Ghét.", topic: "adjectives" },
  { id: 248, han: "给", pinyin: "gěi", meaning: "Đưa, cho", pos: "Danh từ", emoji: "", example: "给。", examplePinyin: "gěi.", exampleVi: "Đưa, cho.", topic: "adjectives" },
  { id: 249, han: "送", pinyin: "sòng", meaning: "Tặng, gửi", pos: "Danh từ", emoji: "", example: "送。", examplePinyin: "sòng.", exampleVi: "Tặng, gửi.", topic: "adjectives" },
  { id: 250, han: "打电话", pinyin: "dǎ diànhuà", meaning: "Gọi điện thoại", pos: "Danh từ", emoji: "", example: "打电话。", examplePinyin: "dǎ diànhuà.", exampleVi: "Gọi điện thoại.", topic: "adjectives" },
  { id: 251, han: "吧", pinyin: "ba", meaning: "Trợ từ ngữ khí dùng ở cuối câu dể diễn tả sự thương lượng, lời đề nghị thỉnh cầu hay mệnh lệnh", pos: "Trợ từ", emoji: "", example: "吧。", examplePinyin: "ba.", exampleVi: "Trợ từ ngữ khí dùng ở cuối câu dể diễn tả sự thương lượng, lời đề nghị thỉnh cầu hay mệnh lệnh.", topic: "adjectives" },
  // --- Bài 14 ---
  { id: 252, han: "东西", pinyin: "dōngxi", meaning: "Đồ, đồ đạc", pos: "Danh từ", emoji: "", example: "东西。", examplePinyin: "dōngxi.", exampleVi: "Đồ, đồ đạc.", topic: "places" },
  { id: 253, han: "一点儿", pinyin: "yīdiǎnr", meaning: "Một ít, một chút", pos: "Số từ", emoji: "", example: "一点儿。", examplePinyin: "yīdiǎnr.", exampleVi: "Một ít, một chút.", topic: "places" },
  { id: 254, han: "看见", pinyin: "kànjiàn", meaning: "Nhìn thấy", pos: "Động từ", emoji: "", example: "看见。", examplePinyin: "kànjiàn.", exampleVi: "Nhìn thấy.", topic: "places" },
  { id: 255, han: "开", pinyin: "kāi", meaning: "Mở", pos: "Danh từ", emoji: "", example: "开。", examplePinyin: "kāi.", exampleVi: "Mở.", topic: "places" },
  { id: 256, han: "关", pinyin: "guān", meaning: "Đóng", pos: "Danh từ", emoji: "", example: "关。", examplePinyin: "guān.", exampleVi: "Đóng.", topic: "places" },
  { id: 257, han: "回来", pinyin: "huílai", meaning: "Quay lại", pos: "Động từ", emoji: "", example: "回来。", examplePinyin: "huílai.", exampleVi: "Quay lại.", topic: "places" },
  { id: 258, han: "分钟", pinyin: "fēnzhōng", meaning: "Phút", pos: "Lượng từ", emoji: "", example: "分钟。", examplePinyin: "fēnzhōng.", exampleVi: "Phút.", topic: "places" },
  { id: 259, han: "后", pinyin: "hòu", meaning: "Sau", pos: "Danh từ", emoji: "", example: "后。", examplePinyin: "hòu.", exampleVi: "Sau.", topic: "places" },
  { id: 260, han: "啊", pinyin: "a", meaning: "Trợ từ ngữ khí", pos: "Danh từ", emoji: "", example: "啊。", examplePinyin: "a.", exampleVi: "Trợ từ ngữ khí.", topic: "places" },
  { id: 261, han: "不少", pinyin: "bùshǎo", meaning: "Không ít, nhiều", pos: "Phó từ", emoji: "", example: "不少。", examplePinyin: "bùshǎo.", exampleVi: "Không ít, nhiều.", topic: "places" },
  { id: 262, han: "这些", pinyin: "zhèxiē", meaning: "Những thứ này, những điều này", pos: "Đại từ", emoji: "", example: "这些。", examplePinyin: "zhèxiē.", exampleVi: "Những thứ này, những điều này.", topic: "places" },
  { id: 263, han: "都", pinyin: "dōu", meaning: "Đều", pos: "Danh từ", emoji: "", example: "都。", examplePinyin: "dōu.", exampleVi: "Đều.", topic: "places" },
  // --- Bài Bổ sung ---
  { id: 264, han: "摩托车", pinyin: "mótuōchē", meaning: "Xe moto", pos: "Danh từ", emoji: "", example: "摩托车。", examplePinyin: "mótuōchē.", exampleVi: "Xe moto.", topic: "misc" },
  { id: 265, han: "骑", pinyin: "qí", meaning: "Cưỡi, lái xe (moto,…)", pos: "Danh từ", emoji: "", example: "骑。", examplePinyin: "qí.", exampleVi: "Cưỡi, lái xe (moto,…).", topic: "misc" },
  { id: 266, han: "开车", pinyin: "kāichē", meaning: "Lái xe (oto)", pos: "Danh từ", emoji: "", example: "开车。", examplePinyin: "kāichē.", exampleVi: "Lái xe (oto).", topic: "misc" },
  { id: 267, han: "出租车", pinyin: "chūzūchē", meaning: "Xe taxi", pos: "Danh từ", emoji: "", example: "出租车。", examplePinyin: "chūzūchē.", exampleVi: "Xe taxi.", topic: "misc" },
  { id: 268, han: "汽车", pinyin: "qìchē", meaning: "Xe hơi, oto", pos: "Danh từ", emoji: "", example: "汽车。", examplePinyin: "qìchē.", exampleVi: "Xe hơi, oto.", topic: "misc" },
  { id: 269, han: "公交车", pinyin: "gōngjiāochē", meaning: "Xe buýt", pos: "Danh từ", emoji: "", example: "公交车。", examplePinyin: "gōngjiāochē.", exampleVi: "Xe buýt.", topic: "misc" },
  { id: 270, han: "打车", pinyin: "dǎchē", meaning: "Bắt xe", pos: "Danh từ", emoji: "", example: "打车。", examplePinyin: "dǎchē.", exampleVi: "Bắt xe.", topic: "misc" },
  { id: 271, han: "放心", pinyin: "fàngxīn", meaning: "Yên tâm", pos: "Danh từ", emoji: "", example: "放心。", examplePinyin: "fàngxīn.", exampleVi: "Yên tâm.", topic: "misc" },
  { id: 272, han: "安心", pinyin: "ānxīn", meaning: "An tâm", pos: "Danh từ", emoji: "", example: "安心。", examplePinyin: "ānxīn.", exampleVi: "An tâm.", topic: "misc" },
  { id: 273, han: "自行车", pinyin: "zìxíngchē", meaning: "Xe đạp", pos: "Danh từ", emoji: "", example: "自行车。", examplePinyin: "zìxíngchē.", exampleVi: "Xe đạp.", topic: "misc" },
  { id: 274, han: "电动车", pinyin: "diàndòngchē", meaning: "Xe điện", pos: "Danh từ", emoji: "", example: "电动车。", examplePinyin: "diàndòngchē.", exampleVi: "Xe điện.", topic: "misc" },
  { id: 275, han: "走路", pinyin: "zǒulù", meaning: "Đi bộ", pos: "Động từ", emoji: "", example: "走路。", examplePinyin: "zǒulù.", exampleVi: "Đi bộ.", topic: "misc" },
  { id: 276, han: "跑步", pinyin: "pǎobù", meaning: "Chạy bộ", pos: "Danh từ", emoji: "", example: "跑步。", examplePinyin: "pǎobù.", exampleVi: "Chạy bộ.", topic: "misc" },
  { id: 277, han: "自动", pinyin: "zìdòng", meaning: "Tự động", pos: "Danh từ", emoji: "", example: "自动。", examplePinyin: "zìdòng.", exampleVi: "Tự động.", topic: "misc" },
  { id: 278, han: "穿", pinyin: "chuān", meaning: "Đeo; mặc; mang (giày, tất)", pos: "Danh từ", emoji: "", example: "穿。", examplePinyin: "chuān.", exampleVi: "Đeo; mặc; mang (giày, tất).", topic: "misc" },
  { id: 279, han: "脱", pinyin: "tuō", meaning: "Cởi ra; bỏ ra", pos: "Danh từ", emoji: "", example: "脱。", examplePinyin: "tuō.", exampleVi: "Cởi ra; bỏ ra.", topic: "misc" },
];

// ===== Helpers =====
export const getWordsByTopic = (topic: TopicId): VocabWord[] =>
  VOCAB.filter(w => w.topic === topic);

export const getTopic = (id: TopicId): Topic =>
  TOPICS.find(t => t.id === id)!;

export const TOTAL_WORDS = VOCAB.length;
