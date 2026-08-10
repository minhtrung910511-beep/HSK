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
  | "chao_hoi"
  | "giao_tiep"
  | "ai_tu_xung_ho"
  | "tu_e_hoi"
  | "thong_tin_ca_nhan"
  | "gioi_thieu_ban_than"
  | "gia_inh"
  | "moi_quan_he"
  | "nghe_nghiep"
  | "so_luong"
  | "luong_tu"
  | "thoi_gian"
  | "thoi_gian_tuoi_tac"
  | "o_dung"
  | "nha_cua"
  | "cong_nghe"
  | "quan_ao"
  | "o_an"
  | "o_uong"
  | "trai_cay"
  | "co_the"
  | "suc_khoe"
  | "hanh_ong"
  | "cong_viec"
  | "hoc_tap"
  | "truong_hoc"
  | "ia_iem"
  | "vi_tri"
  | "quoc_gia"
  | "phuong_tien_and_di_chuyen"
  | "mieu_ta"
  | "cam_xuc"
  | "thoi_tiet"
  | "tien_bac"
  | "mua_sam"
  | "ngu_phap"
  | "ngon_ngu"
  | "giai_tri"
  | "the_thao"
  | "ong_vat"
  | "misc";

export interface Topic {
  id: TopicId;
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export const TOPICS: Topic[] = [
  { id: "chao_hoi", name: "Chào hỏi", emoji: "👋", color: "from-rose-400 to-pink-400", description: "" },
  { id: "giao_tiep", name: "Giao tiếp", emoji: "💬", color: "from-pink-400 to-rose-400", description: "" },
  { id: "ai_tu_xung_ho", name: "Đại từ xưng hô", emoji: "🧑", color: "from-amber-400 to-orange-400", description: "" },
  { id: "tu_e_hoi", name: "Từ để hỏi", emoji: "❓", color: "from-orange-400 to-amber-400", description: "" },
  { id: "thong_tin_ca_nhan", name: "Thông tin cá nhân", emoji: "🪪", color: "from-yellow-400 to-amber-400", description: "" },
  { id: "gioi_thieu_ban_than", name: "Giới thiệu bản thân", emoji: "🙋", color: "from-amber-400 to-yellow-400", description: "" },
  { id: "gia_inh", name: "Gia đình", emoji: "👨‍👩‍👧", color: "from-orange-400 to-red-400", description: "" },
  { id: "moi_quan_he", name: "Mối quan hệ", emoji: "🤝", color: "from-red-400 to-orange-400", description: "" },
  { id: "nghe_nghiep", name: "Nghề nghiệp", emoji: "💼", color: "from-lime-400 to-green-400", description: "" },
  { id: "so_luong", name: "Số lượng", emoji: "🔢", color: "from-green-400 to-lime-400", description: "" },
  { id: "luong_tu", name: "Lượng từ", emoji: "📊", color: "from-emerald-400 to-teal-400", description: "" },
  { id: "thoi_gian", name: "Thời gian", emoji: "🕐", color: "from-teal-400 to-emerald-400", description: "" },
  { id: "thoi_gian_tuoi_tac", name: "Thời gian (Tuổi tác)", emoji: "🎂", color: "from-cyan-400 to-teal-400", description: "" },
  { id: "o_dung", name: "Đồ dùng", emoji: "🎒", color: "from-sky-400 to-cyan-400", description: "" },
  { id: "nha_cua", name: "Nhà cửa", emoji: "🏠", color: "from-blue-400 to-sky-400", description: "" },
  { id: "cong_nghe", name: "Công nghệ", emoji: "💻", color: "from-indigo-400 to-blue-400", description: "" },
  { id: "quan_ao", name: "Quần áo", emoji: "👕", color: "from-violet-400 to-indigo-400", description: "" },
  { id: "o_an", name: "Đồ ăn", emoji: "🍚", color: "from-purple-400 to-violet-400", description: "" },
  { id: "o_uong", name: "Đồ uống", emoji: "🥤", color: "from-fuchsia-400 to-purple-400", description: "" },
  { id: "trai_cay", name: "Trái cây", emoji: "🍎", color: "from-pink-400 to-fuchsia-400", description: "" },
  { id: "co_the", name: "Cơ thể", emoji: "🧠", color: "from-rose-400 to-pink-400", description: "" },
  { id: "suc_khoe", name: "Sức khỏe", emoji: "🏥", color: "from-amber-400 to-rose-400", description: "" },
  { id: "hanh_ong", name: "Hành động", emoji: "🏃", color: "from-yellow-400 to-amber-400", description: "" },
  { id: "cong_viec", name: "Công việc", emoji: "💼", color: "from-lime-400 to-yellow-400", description: "" },
  { id: "hoc_tap", name: "Học tập", emoji: "📚", color: "from-green-400 to-lime-400", description: "" },
  { id: "truong_hoc", name: "Trường học", emoji: "🏫", color: "from-emerald-400 to-green-400", description: "" },
  { id: "ia_iem", name: "Địa điểm", emoji: "📍", color: "from-teal-400 to-emerald-400", description: "" },
  { id: "vi_tri", name: "Vị trí", emoji: "🧭", color: "from-cyan-400 to-teal-400", description: "" },
  { id: "quoc_gia", name: "Quốc gia", emoji: "🌍", color: "from-sky-400 to-cyan-400", description: "" },
  { id: "phuong_tien_and_di_chuyen", name: "Phương tiện & Di chuyển", emoji: "🚗", color: "from-blue-400 to-sky-400", description: "" },
  { id: "mieu_ta", name: "Miêu tả", emoji: "✨", color: "from-indigo-400 to-blue-400", description: "" },
  { id: "cam_xuc", name: "Cảm xúc", emoji: "😊", color: "from-violet-400 to-indigo-400", description: "" },
  { id: "thoi_tiet", name: "Thời tiết", emoji: "🌤️", color: "from-purple-400 to-violet-400", description: "" },
  { id: "tien_bac", name: "Tiền bạc", emoji: "💰", color: "from-fuchsia-400 to-purple-400", description: "" },
  { id: "mua_sam", name: "Mua sắm", emoji: "🛒", color: "from-pink-400 to-fuchsia-400", description: "" },
  { id: "ngu_phap", name: "Ngữ pháp", emoji: "📝", color: "from-slate-400 to-gray-400", description: "" },
  { id: "ngon_ngu", name: "Ngôn ngữ", emoji: "🔤", color: "from-gray-400 to-slate-400", description: "" },
  { id: "giai_tri", name: "Giải trí", emoji: "🎮", color: "from-rose-400 to-amber-400", description: "" },
  { id: "the_thao", name: "Thể thao", emoji: "⚽", color: "from-orange-400 to-yellow-400", description: "" },
  { id: "ong_vat", name: "Động vật", emoji: "🐱", color: "from-green-400 to-emerald-400", description: "" },
];
export const VOCAB: VocabWord[] = [
  // ===== 1. CHÀO HỎI (10 từ) =====
  { id: 1,  han: "你好",   pinyin: "nǐ hǎo",       meaning: "xin chào",            pos: "Thán từ",   emoji: "👋", example: "你好，我叫小明。",        examplePinyin: "Nǐ hǎo, wǒ jiào Xiǎomíng.",         exampleVi: "Xin chào, tôi tên là Tiểu Minh.", topic: "greetings" },
  { id: 2,  han: "再见",   pinyin: "zàijiàn",     meaning: "Tạm biệt",            pos: "Thán từ",   emoji: "🙋", example: "明天见，再见！",          examplePinyin: "Míngtiān jiàn, zài jiàn!",          exampleVi: "Hẹn gặp lại ngày mai, tạm biệt!", topic: "chao_hoi" },
  { id: 3,  han: "谢谢",   pinyin: "xièxie",      meaning: "Cảm ơn",              pos: "Động từ",   emoji: "🙏", example: "谢谢你帮我。",            examplePinyin: "Xièxie nǐ bāng wǒ.",                exampleVi: "Cảm ơn bạn đã giúp tôi.", topic: "giao_tiep" },
  { id: 4,  han: "不客气", pinyin: "bùkèqi",     meaning: "Đừng khách sáo",        pos: "Tình thái từ", emoji: "😊", example: "不客气，应该的。",      examplePinyin: "Bú kèqi, yīnggāi de.",              exampleVi: "Không có chi, điều đáng làm.", topic: "giao_tiep" },
  { id: 5,  han: "对不起", pinyin: "duìbùqǐ",    meaning: "Xin lỗi",             pos: "Động từ",   emoji: "😔", example: "对不起，我迟到了。",      examplePinyin: "Duìbuqǐ, wǒ chídào le.",            exampleVi: "Xin lỗi, tôi đến muộn.", topic: "giao_tiep" },
  { id: 6,  han: "没关系", pinyin: "méiguānxi",  meaning: "Không sao, không có gì",           pos: "Tình thái từ", emoji: "🤗", example: "没关系，别担心。",      examplePinyin: "Méi guānxi, bié dānxīn.",           exampleVi: "Không sao, đừng lo lắng.", topic: "giao_tiep" },
  { id: 7,  han: "请",     pinyin: "qǐng",         meaning: "Xin, mời",    pos: "Động từ",   emoji: "🤝", example: "请进，请坐。",            examplePinyin: "Qǐng jìn, qǐng zuò.",               exampleVi: "Mời vào, mời ngồi.", topic: "giao_tiep" },
  { id: 8,  han: "是",     pinyin: "shì",          meaning: "là",                  pos: "Động từ",   emoji: "✅", example: "我是学生。",              examplePinyin: "Wǒ shì xuéshēng.",                  exampleVi: "Tôi là học sinh.", topic: "ngu_phap" },
  { id: 9,  han: "不",     pinyin: "bù",           meaning: "Không, đừng",               pos: "Phó từ",    emoji: "❌", example: "我不是老师。",            examplePinyin: "Wǒ bú shì lǎoshī.",                 exampleVi: "Tôi không phải là giáo viên.", topic: "ngu_phap" },
  { id: 10, han: "欢迎",   pinyin: "huān yíng",    meaning: "hoan nghênh",         pos: "Động từ",   emoji: "🎉", example: "欢迎你们来中国！",        examplePinyin: "Huānyíng nǐmen lái Zhōngguó!",      exampleVi: "Hoan nghênh các bạn đến Trung Quốc!", topic: "greetings" },

  // ===== 2. ĐẠI TỪ (15 từ) =====
  { id: 11, han: "我",     pinyin: "wǒ",           meaning: "tôi",                 pos: "Đại từ",    emoji: "🙋", example: "我很高兴。",              examplePinyin: "Wǒ hěn gāoxìng.",                   exampleVi: "Tôi rất vui.", topic: "ai_tu_xung_ho" },
  { id: 12, han: "你",     pinyin: "nǐ",           meaning: "Bạn, anh, chị",                 pos: "Đại từ",    emoji: "👉", example: "你是我的好朋友。",                examplePinyin: "nǐ shì wǒ de hǎo péngyou.",                        exampleVi: "Bạn là bạn tốt của tôi.", topic: "ai_tu_xung_ho" },
  { id: 13, han: "您",     pinyin: "nín",          meaning: "ông, bà, ngài (lịch sự)", pos: "Đại từ",   emoji: "🙇", example: "老师，您好！",                examplePinyin: "lǎoshī, nín hǎo!",                     exampleVi: "Thầy/cô giáo, xin chào!", topic: "ai_tu_xung_ho" },
  { id: 14, han: "他",     pinyin: "tā",           meaning: "anh ấy",              pos: "Đại từ",    emoji: "👨", example: "他是医生。",              examplePinyin: "Tā shì yīshēng.",                   exampleVi: "Anh ấy là bác sĩ.", topic: "ai_tu_xung_ho" },
  { id: 15, han: "她",     pinyin: "tā",           meaning: "cô ấy",               pos: "Đại từ",    emoji: "👩", example: "她很漂亮。",              examplePinyin: "Tā hěn piàoliang.",                 exampleVi: "Cô ấy rất xinh đẹp.", topic: "ai_tu_xung_ho" },
  { id: 16, han: "我们",   pinyin: "wǒmen",       meaning: "Chúng ta",           pos: "Đại từ",    emoji: "👥", example: "我们是同学。",            examplePinyin: "Wǒmen shì tóngxué.",                exampleVi: "Chúng tôi là bạn học cùng lớp.", topic: "ai_tu_xung_ho" },
  { id: 17, han: "你们",   pinyin: "nǐmen",       meaning: "Các anh,các chị, các bạn",             pos: "Đại từ",    emoji: "👫", example: "你们去哪儿？",            examplePinyin: "Nǐmen qù nǎr?",                    exampleVi: "Các bạn đi đâu?", topic: "ai_tu_xung_ho" },
  { id: 18, han: "他们",   pinyin: "tā men",       meaning: "họ (nam)",            pos: "Đại từ",    emoji: "👬", example: "他们在学校。",            examplePinyin: "Tāmen zài xuéxiào.",                exampleVi: "Họ đang ở trường.", topic: "pronouns" },
  { id: 19, han: "这",     pinyin: "zhè",          meaning: "Đây, này",           pos: "Đại từ",    emoji: "👈", example: "这是我的书。",            examplePinyin: "Zhè shì wǒ de shū.",                exampleVi: "Đây là quyển sách của tôi.", topic: "ngu_phap" },
  { id: 20, han: "那",     pinyin: "nà",           meaning: "Kia, đó",            pos: "Đại từ",    emoji: "👉", example: "那个人是谁？",                examplePinyin: "nà ge rén shì shéi?",                      exampleVi: "Người kia là ai?", topic: "ngu_phap" },
  { id: 21, han: "谁",     pinyin: "shéi",         meaning: "Ai",                  pos: "Đại từ",    emoji: "❓", example: "你是谁？",                examplePinyin: "Nǐ shì shuí?",                      exampleVi: "Bạn là ai?", topic: "tu_e_hoi" },
  { id: 22, han: "什么",   pinyin: "shénme",      meaning: "gì?, cái gì?",         pos: "Đại từ",    emoji: "❔", example: "这是什么？",              examplePinyin: "Zhè shì shénme?",                   exampleVi: "Đây là cái gì?", topic: "tu_e_hoi" },
  { id: 23, han: "哪",     pinyin: "nǎ",           meaning: "nào",                 pos: "Đại từ",    emoji: "🤔", example: "你是哪国人？",            examplePinyin: "Nǐ shì nǎ guó rén?",                exampleVi: "Bạn là người nước nào?", topic: "tu_e_hoi" },
  { id: 24, han: "怎么",   pinyin: "zěnme",       meaning: "Như thế nào (chỉ cách thức, tình trạng)",         pos: "Đại từ",    emoji: "🤷", example: "你怎么了？",              examplePinyin: "Nǐ zěnme le?",                      exampleVi: "Bạn làm sao vậy?", topic: "tu_e_hoi" },
  { id: 25, han: "为什么", pinyin: "wèi shén me",  meaning: "tại sao",             pos: "Đại từ",    emoji: "💭", example: "你为什么不去上课？",            examplePinyin: "nǐ wèi shénme bú qù shàngkè?",                  exampleVi: "Tại sao bạn không đi học?", topic: "pronouns" },

  // ===== 3. GIA ĐÌNH (13 từ) =====
  { id: 26, han: "爸爸",   pinyin: "bàba",        meaning: "cha, bố",             pos: "Danh từ",   emoji: "👨", example: "我爸爸是老师。",          examplePinyin: "Wǒ bàba shì lǎoshī.",               exampleVi: "Bố tôi là giáo viên.", topic: "gia_inh" },
  { id: 27, han: "妈妈",   pinyin: "māma",        meaning: "Mẹ",             pos: "Danh từ",   emoji: "👩", example: "妈妈在做饭。",              examplePinyin: "māma zài zuò fàn.",                     exampleVi: "Mẹ đang nấu cơm.", topic: "gia_inh" },
  { id: 28, han: "哥哥",   pinyin: "gē ge",        meaning: "anh trai",            pos: "Danh từ",   emoji: "👦", example: "我的哥哥很高。",              examplePinyin: "wǒ de gēge hěn gāo.",                     exampleVi: "Anh trai tôi rất cao.", topic: "family" },
  { id: 29, han: "弟弟",   pinyin: "dì di",        meaning: "em trai",             pos: "Danh từ",   emoji: "👦", example: "弟弟今年五岁。",          examplePinyin: "Dìdi jīnnián wǔ suì.",              exampleVi: "Em trai tôi năm nay 5 tuổi.", topic: "family" },
  { id: 30, han: "姐姐",   pinyin: "jiě jie",      meaning: "chị gái",             pos: "Danh từ",   emoji: "👧", example: "姐姐是学生。",            examplePinyin: "Jiějie shì xuéshēng.",              exampleVi: "Chị gái là học sinh.", topic: "family" },
  { id: 31, han: "妹妹",   pinyin: "mèi mei",      meaning: "em gái",              pos: "Danh từ",   emoji: "👧", example: "妹妹很可爱。",            examplePinyin: "Mèimei hěn kě'ài.",                 exampleVi: "Em gái rất đáng yêu.", topic: "family" },
  { id: 32, han: "儿子",   pinyin: "érzi",        meaning: "Con trai",            pos: "Danh từ",   emoji: "👶", example: "他们的儿子很聪明。",      examplePinyin: "Tāmen de érzi hěn cōngming.",       exampleVi: "Con trai họ rất thông minh.", topic: "gia_inh" },
  { id: 33, han: "女儿",   pinyin: "nǚ’ér",        meaning: "Con gái",             pos: "Danh từ",   emoji: "👶", example: "女儿喜欢唱歌。",          examplePinyin: "Nǚ'ér xǐhuan chàng gē.",            exampleVi: "Con gái thích hát.", topic: "gia_inh" },
  { id: 34, han: "家",     pinyin: "jiā",          meaning: "Nhà",      pos: "Danh từ",   emoji: "🏠", example: "我家在北京。",            examplePinyin: "Wǒ jiā zài Běijīng.",               exampleVi: "Nhà tôi ở Bắc Kinh.", topic: "nha_cua" },
  { id: 35, han: "孩子",   pinyin: "hái zi",       meaning: "đứa trẻ / con cái",   pos: "Danh từ",   emoji: "🧒", example: "孩子们在玩儿。",          examplePinyin: "Háizimen zài wánr.",                exampleVi: "Các em đang chơi.", topic: "people" },
  { id: 36, han: "先生",   pinyin: "xiānsheng",   meaning: "Ông, ngài",  pos: "Danh từ",   emoji: "🤵", example: "王先生是医生。",          examplePinyin: "Wáng xiānsheng shì yīshēng.",       exampleVi: "Ông Vương là bác sĩ.", topic: "ai_tu_xung_ho" },
  { id: 37, han: "太太",   pinyin: "tài tai",      meaning: "bà / phu nhân / vợ",  pos: "Danh từ",   emoji: "👰", example: "李太太很热情。",          examplePinyin: "Lǐ tàitai hěn rèqíng.",             exampleVi: "Bà Lý rất nhiệt tình.", topic: "people" },
  { id: 38, han: "小姐",   pinyin: "xiǎojiě",     meaning: "Tiểu thư",       pos: "Danh từ",   emoji: "💁‍♀️", example: "小姐，请喝茶。",        examplePinyin: "Xiǎojie, qǐng hē chá.",             exampleVi: "Cô ơi, mời uống trà.", topic: "ai_tu_xung_ho" },

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
  { id: 50, han: "千",     pinyin: "qiān",         meaning: "Nghìn (1.000)",               pos: "Số từ",     emoji: "🔢", example: "一千块钱。",             examplePinyin: "Yì qiān kuài qián.",                exampleVi: "Một nghìn tệ.", topic: "so_luong" },
  { id: 51, han: "万",     pinyin: "wàn",          meaning: "Mười nghìn (10.000)",          pos: "Số từ",     emoji: "🔢", example: "一年有几天？",           examplePinyin: "Yì nián yǒu jǐ tiān?",              exampleVi: "Một năm có bao nhiêu ngày?", topic: "so_luong" },
  { id: 52, han: "零",     pinyin: "líng",         meaning: "số không",            pos: "Số từ",     emoji: "0️⃣", example: "电话号码是零。",         examplePinyin: "Diànhuà hàomǎ shì líng.",           exampleVi: "Số điện thoại có số không.", topic: "numbers" },
  { id: 53, han: "两",     pinyin: "liǎng",        meaning: "hai (với lượng từ)",  pos: "Số từ",     emoji: "✌️", example: "我有两个苹果。",         examplePinyin: "Wǒ yǒu liǎng ge píngguǒ.",          exampleVi: "Tôi có hai quả táo.", topic: "numbers" },
  { id: 54, han: "个",     pinyin: "gè",           meaning: "Cái", pos: "Lượng từ",  emoji: "▫️", example: "一个人，一个苹果。",     examplePinyin: "Yí ge rén, yí ge píngguǒ.",         exampleVi: "Một người, một quả táo.", topic: "luong_tu" },
  { id: 55, han: "岁",     pinyin: "suì",          meaning: "tuổi",                pos: "Lượng từ",  emoji: "🎂", example: "你几岁了？",             examplePinyin: "Nǐ jǐ suì le?",                     exampleVi: "Bạn bao nhiêu tuổi?", topic: "thoi_gian_tuoi_tac" },

  // ===== 5. THỜI GIAN (16 từ) =====
  { id: 56, han: "年",     pinyin: "nián",         meaning: "năm",                 pos: "Danh từ",   emoji: "📅", example: "今年是2024年。",         examplePinyin: "Jīnnián shì èr líng èr sì nián.",   exampleVi: "Năm nay là năm 2024.", topic: "thoi_gian" },
  { id: 57, han: "月",     pinyin: "yuè",          meaning: "tháng",               pos: "Danh từ",   emoji: "🗓️", example: "现在是几月？",          examplePinyin: "Xiànzài shì jǐ yuè?",               exampleVi: "Bây giờ là tháng mấy?", topic: "thoi_gian" },
  { id: 58, han: "日",     pinyin: "rì",           meaning: "ngày / mặt trời",     pos: "Danh từ",   emoji: "☀️", example: "十月一日是国庆节。",     examplePinyin: "Shí yuè yí rì shì guóqìng jié.",    exampleVi: "Mùng 1 tháng 10 là Quốc khánh.", topic: "time" },
  { id: 59, han: "号",     pinyin: "hào",          meaning: "Ngày",  pos: "Danh từ",   emoji: "📅", example: "今天几号？",             examplePinyin: "Jīntiān jǐ hào?",                   exampleVi: "Hôm nay ngày mấy?", topic: "thoi_gian" },
  { id: 60, han: "星期",   pinyin: "xīngqī",      meaning: "Tuần, thứ",          pos: "Danh từ",   emoji: "📆", example: "今天星期几？",           examplePinyin: "Jīntiān xīngqī jǐ?",                exampleVi: "Hôm nay là thứ mấy?", topic: "thoi_gian" },
  { id: 61, han: "天",     pinyin: "tiān",         meaning: "Ngày (đơn vị đếm số ngày)",     pos: "Danh từ",   emoji: "🌤️", example: "今天天气很好。",        examplePinyin: "Jīntiān tiānqì hěn hǎo.",           exampleVi: "Hôm nay thời tiết rất đẹp.", topic: "thoi_gian" },
  { id: 62, han: "今天",   pinyin: "jīntiān",     meaning: "Hôm nay",             pos: "Danh từ",   emoji: "📌", example: "今天我很忙。",           examplePinyin: "Jīntiān wǒ hěn máng.",              exampleVi: "Hôm nay tôi rất bận.", topic: "thoi_gian" },
  { id: 63, han: "明天",   pinyin: "míngtiān",    meaning: "Ngày mai",            pos: "Danh từ",   emoji: "🔜", example: "明天我去北京。",         examplePinyin: "Míngtiān wǒ qù Běijīng.",           exampleVi: "Ngày mai tôi đi Bắc Kinh.", topic: "thoi_gian" },
  { id: 64, han: "昨天",   pinyin: "zuótiān",     meaning: "Hôm qua",             pos: "Danh từ",   emoji: "🔙", example: "昨天我去看电影了。",     examplePinyin: "Zuótiān wǒ qù kàn diànyǐng le.",    exampleVi: "Hôm qua tôi đi xem phim.", topic: "thoi_gian" },
  { id: 65, han: "现在",   pinyin: "xiànzài",     meaning: "Hiện tại , bây giờ",             pos: "Danh từ",   emoji: "⏰", example: "现在几点了？",             examplePinyin: "xiànzài jǐ diǎn le?",                  exampleVi: "Bây giờ là mấy giờ rồi?", topic: "thoi_gian" },
  { id: 66, han: "时候",   pinyin: "shíhou",      meaning: "Lúc , khi",     pos: "Danh từ",   emoji: "⌚", example: "什么时候去？",           examplePinyin: "Shénme shíhou qù?",                 exampleVi: "Lúc nào đi?", topic: "thoi_gian" },
  { id: 67, han: "点",     pinyin: "diǎn",         meaning: "Giờ",       pos: "Lượng từ",  emoji: "🕐", example: "三点钟见面。",           examplePinyin: "Sān diǎn zhōng jiàn miàn.",         exampleVi: "Ba giờ gặp nhau.", topic: "thoi_gian" },
  { id: 68, han: "分",     pinyin: "fēn",          meaning: "phút",                pos: "Lượng từ",  emoji: "⏱️", example: "三点二十分。",          examplePinyin: "Sān diǎn èrshí fēn.",               exampleVi: "Ba giờ hai mươi phút.", topic: "thoi_gian" },
  { id: 69, han: "上午",   pinyin: "Shàngwǔ",     meaning: "Buổi sáng",           pos: "Danh từ",   emoji: "🌅", example: "上午我去上课。",         examplePinyin: "Shàngwǔ wǒ qù shàngkè.",            exampleVi: "Buổi sáng tôi đi học.", topic: "thoi_gian" },
  { id: 70, han: "下午",   pinyin: "xiawǔ",       meaning: "Buổi chiều",          pos: "Danh từ",   emoji: "🌇", example: "下午我去打球。",         examplePinyin: "Xiàwǔ wǒ qù dǎ qiú.",               exampleVi: "Buổi chiều tôi đi chơi bóng.", topic: "thoi_gian" },
  { id: 71, han: "时间",   pinyin: "shí jiān",     meaning: "thời gian",           pos: "Danh từ",   emoji: "⏳", example: "时间过得真快！",         examplePinyin: "Shíjiān guò de zhēn kuài!",         exampleVi: "Thời gian trôi nhanh thật!", topic: "time" },

  // ===== 6. ĐỒ VẬT (16 từ) =====
  { id: 72, han: "书",     pinyin: "shū",          meaning: "sách",                pos: "Danh từ",   emoji: "📚", example: "这是一本好书。",         examplePinyin: "Zhè shì yì běn hǎo shū.",            exampleVi: "Đây là một quyển sách hay.", topic: "hoc_tap" },
  { id: 73, han: "桌子",   pinyin: "zhuōzi",      meaning: "Cái bàn",                 pos: "Danh từ",   emoji: "", example: "桌子上有书。",           examplePinyin: "Zhuōzi shàng yǒu shū.",             exampleVi: "Trên bàn có sách.", topic: "o_dung" },
  { id: 74, han: "椅子",   pinyin: "yǐzi",        meaning: "Ghế dựa",                 pos: "Danh từ",   emoji: "🪑", example: "请坐在椅子上。",         examplePinyin: "Qǐng zuò zài yǐzi shàng.",          exampleVi: "Xin ngồi trên ghế.", topic: "o_dung" },
  { id: 75, han: "杯子",   pinyin: "bēizi",       meaning: "Ly, tách",             pos: "Danh từ",   emoji: "🥤", example: "杯子里有水。",           examplePinyin: "Bēizi lǐ yǒu shuǐ.",                exampleVi: "Trong cốc có nước.", topic: "o_dung" },
  { id: 76, han: "电脑",   pinyin: "diànnǎo",     meaning: "Máy tính",            pos: "Danh từ",   emoji: "💻", example: "我要买电脑。",           examplePinyin: "Wǒ yào mǎi diànnǎo.",               exampleVi: "Tôi muốn mua máy tính.", topic: "o_dung" },
  { id: 77, han: "电视",   pinyin: "diànshì",     meaning: "Tivi",                pos: "Danh từ",   emoji: "📺", example: "他在看电视。",           examplePinyin: "Tā zài kàn diànshì.",               exampleVi: "Anh ấy đang xem tivi.", topic: "giai_tri" },
  { id: 78, han: "电话",   pinyin: "diàn huà",     meaning: "điện thoại",          pos: "Danh từ",   emoji: "📞", example: "你的电话号码是多少？",   examplePinyin: "Nǐ de diànhuà hàomǎ shì duōshao?",  exampleVi: "Số điện thoại của bạn là bao nhiêu?", topic: "objects" },
  { id: 79, han: "车",     pinyin: "chē",          meaning: "xe",                  pos: "Danh từ",   emoji: "🚗", example: "这是我的车。",           examplePinyin: "Zhè shì wǒ de chē.",                exampleVi: "Đây là xe của tôi.", topic: "phuong_tien_and_di_chuyen" },
  { id: 80, han: "笔",     pinyin: "bǐ",           meaning: "bút",                 pos: "Danh từ",   emoji: "🖊️", example: "你有几支笔？",          examplePinyin: "Nǐ yǒu jǐ zhī bǐ?",                 exampleVi: "Bạn có mấy cây bút?", topic: "objects" },
  { id: 81, han: "衣服",   pinyin: "yīfu",        meaning: "Quần áo",             pos: "Danh từ",   emoji: "👕", example: "这件衣服很漂亮。",       examplePinyin: "Zhè jiàn yīfu hěn piàoliang.",      exampleVi: "Bộ quần áo này rất đẹp.", topic: "quan_ao" },
  { id: 82, han: "伞",     pinyin: "sǎn",          meaning: "ô / dù",              pos: "Danh từ",   emoji: "☂️", example: "今天带伞了吗？",        examplePinyin: "Jīntiān dài sǎn le ma?",            exampleVi: "Hôm nay bạn mang ô chưa?", topic: "objects" },
  { id: 83, han: "表",     pinyin: "biǎo",         meaning: "đồng hồ đeo tay",     pos: "Danh từ",   emoji: "⌚", example: "我的表很准。",           examplePinyin: "Wǒ de biǎo hěn zhǔn.",              exampleVi: "Đồng hồ của tôi rất chuẩn.", topic: "objects" },
  { id: 84, han: "钱",     pinyin: "qián",         meaning: "tiền",                pos: "Danh từ",   emoji: "💰", example: "我没带钱。",             examplePinyin: "Wǒ méi dài qián.",                  exampleVi: "Tôi không mang tiền.", topic: "tien_bac" },
  { id: 85, han: "票",     pinyin: "piào",         meaning: "vé",                  pos: "Danh từ",   emoji: "🎟️", example: "买两张票。",            examplePinyin: "Mǎi liǎng zhāng piào.",             exampleVi: "Mua hai tấm vé.", topic: "objects" },
  { id: 86, han: "纸",     pinyin: "zhǐ",          meaning: "giấy",                pos: "Danh từ",   emoji: "📄", example: "给我一张纸。",           examplePinyin: "Gěi wǒ yì zhāng zhǐ.",              exampleVi: "Cho tôi một tờ giấy.", topic: "hoc_tap" },
  { id: 87, han: "水果",   pinyin: "shuíguǒ",     meaning: "Trái cây",            pos: "Danh từ",   emoji: "🍎", example: "我喜欢吃水果。",         examplePinyin: "Wǒ xǐhuan chī shuǐguǒ.",            exampleVi: "Tôi thích ăn trái cây.", topic: "trai_cay" },

  // ===== 7. THỰC PHẨM (12 từ) =====
  { id: 88, han: "吃",     pinyin: "chī",          meaning: "ăn",                  pos: "Động từ",   emoji: "🍽️", example: "我们吃饭吧。",          examplePinyin: "Wǒmen chī fàn ba.",                 exampleVi: "Chúng ta ăn cơm đi.", topic: "hanh_ong" },
  { id: 89, han: "喝",     pinyin: "hē",           meaning: "uống",                pos: "Động từ",   emoji: "🥤", example: "我想喝水。",             examplePinyin: "Wǒ xiǎng hē shuǐ.",                 exampleVi: "Tôi muốn uống nước.", topic: "hanh_ong" },
  { id: 90, han: "饭",     pinyin: "fàn",          meaning: "cơm / bữa ăn",        pos: "Danh từ",   emoji: "🍚", example: "你吃饭了吗？",           examplePinyin: "Nǐ chī fàn le ma?",                 exampleVi: "Bạn ăn cơm chưa?", topic: "food" },
  { id: 91, han: "水",     pinyin: "shuǐ",         meaning: "nước",                pos: "Danh từ",   emoji: "💧", example: "请给我一杯水。",         examplePinyin: "Qǐng gěi wǒ yì bēi shuǐ.",          exampleVi: "Xin cho tôi một cốc nước.", topic: "o_uong" },
  { id: 92, han: "茶",     pinyin: "chá",          meaning: "trà",                 pos: "Danh từ",   emoji: "🍵", example: "请喝茶。",               examplePinyin: "Qǐng hē chá.",                      exampleVi: "Mời uống trà.", topic: "o_uong" },
  { id: 93, han: "苹果",   pinyin: "píngguǒ",     meaning: "Trái táo",             pos: "Danh từ",   emoji: "🍎", example: "苹果很好吃。",           examplePinyin: "Píngguǒ hěn hǎo chī.",              exampleVi: "Táo rất ngon.", topic: "trai_cay" },
  { id: 94, han: "鸡蛋",   pinyin: "jī dàn",       meaning: "trứng gà",            pos: "Danh từ",   emoji: "🥚", example: "早上我吃鸡蛋。",         examplePinyin: "Zǎoshang wǒ chī jīdàn.",            exampleVi: "Buổi sáng tôi ăn trứng.", topic: "food" },
  { id: 95, han: "牛奶",   pinyin: "niú nǎi",      meaning: "sữa bò",              pos: "Danh từ",   emoji: "🥛", example: "我喜欢喝牛奶。",         examplePinyin: "Wǒ xǐhuan hē niúnǎi.",              exampleVi: "Tôi thích uống sữa.", topic: "food" },
  { id: 96, han: "米饭",   pinyin: "mǐfàn",       meaning: "Cơm",           pos: "Danh từ",   emoji: "🍚", example: "请来一碗米饭。",         examplePinyin: "Qǐng lái yì wǎn mǐfàn.",            exampleVi: "Cho một bát cơm.", topic: "o_an" },
  { id: 97, han: "菜",     pinyin: "cài",          meaning: "Thức ăn, món ăn",        pos: "Danh từ",   emoji: "🥬", example: "这个菜很好吃。",         examplePinyin: "Zhè ge cài hěn hǎo chī.",           exampleVi: "Món này rất ngon.", topic: "o_an" },
  { id: 98, han: "鱼",     pinyin: "yú",           meaning: "cá",                  pos: "Danh từ",   emoji: "🐟", example: "我不吃鱼。",             examplePinyin: "Wǒ bù chī yú.",                     exampleVi: "Tôi không ăn cá.", topic: "food" },
  { id: 99, han: "肉",     pinyin: "ròu",          meaning: "thịt",                pos: "Danh từ",   emoji: "🥩", example: "他爱吃肉。",             examplePinyin: "Tā ài chī ròu.",                    exampleVi: "Anh ấy thích ăn thịt.", topic: "food" },

  // ===== 8. CƠ THỂ (5 từ) =====
  { id: 100, han: "头",    pinyin: "tóu",          meaning: "đầu",                 pos: "Danh từ",   emoji: "🗣️", example: "我头疼。",               examplePinyin: "Wǒ tóu téng.",                      exampleVi: "Tôi đau đầu.", topic: "body" },
  { id: 101, han: "手",    pinyin: "shǒu",         meaning: "tay",                 pos: "Danh từ",   emoji: "✋", example: "他的手很大。",           examplePinyin: "Tā de shǒu hěn dà.",                exampleVi: "Tay anh ấy rất to.", topic: "body" },
  { id: 102, han: "脚",    pinyin: "jiǎo",         meaning: "chân / bàn chân",     pos: "Danh từ",   emoji: "🦶", example: "我的脚很冷。",           examplePinyin: "Wǒ de jiǎo hěn lěng.",              exampleVi: "Chân tôi rất lạnh.", topic: "body" },
  { id: 103, han: "眼睛",  pinyin: "yǎn jing",     meaning: "mắt",                 pos: "Danh từ",   emoji: "👁️", example: "她的眼睛很大。",        examplePinyin: "Tā de yǎnjing hěn dà.",             exampleVi: "Mắt cô ấy rất to.", topic: "body" },
  { id: 104, han: "嘴",    pinyin: "zuǐ",          meaning: "miệng",               pos: "Danh từ",   emoji: "👄", example: "他的嘴很小。",           examplePinyin: "Tā de zuǐ hěn xiǎo.",               exampleVi: "Miệng anh ấy rất nhỏ.", topic: "body" },

  // ===== 9. ĐỘNG TỪ (24 từ) =====
  { id: 105, han: "看",    pinyin: "kàn",          meaning: "Nhìn, xem",          pos: "Động từ",   emoji: "👀", example: "我在看书。",             examplePinyin: "Wǒ zài kàn shū.",                   exampleVi: "Tôi đang đọc sách.", topic: "hanh_ong" },
  { id: 106, han: "听",    pinyin: "tīng",         meaning: "nghe",                pos: "Động từ",   emoji: "👂", example: "请听我说。",             examplePinyin: "Qǐng tīng wǒ shuō.",                exampleVi: "Xin hãy nghe tôi nói.", topic: "verbs" },
  { id: 107, han: "说",    pinyin: "shuō",         meaning: "nói",                 pos: "Động từ",   emoji: "💬", example: "你会说汉语吗？",         examplePinyin: "Nǐ huì shuō Hànyǔ ma?",             exampleVi: "Bạn nói được tiếng Trung không?", topic: "giao_tiep" },
  { id: 108, han: "写",    pinyin: "xiě",          meaning: "viết",                pos: "Động từ",   emoji: "✍️", example: "请写你的名字。",         examplePinyin: "Qǐng xiě nǐ de míngzi.",            exampleVi: "Xin viết tên của bạn.", topic: "hanh_ong" },
  { id: 109, han: "读",    pinyin: "dú",           meaning: "đọc",                 pos: "Động từ",   emoji: "📖", example: "请大声读。",             examplePinyin: "Qǐng dàshēng dú.",                  exampleVi: "Xin đọc to.", topic: "hoc_tap" },
  { id: 110, han: "做",    pinyin: "zuò",          meaning: "làm",                 pos: "Động từ",   emoji: "🛠️", example: "你在做什么？",          examplePinyin: "Nǐ zài zuò shénme?",                exampleVi: "Bạn đang làm gì?", topic: "hanh_ong" },
  { id: 111, han: "来",    pinyin: "lái",          meaning: "Đến, tới",                 pos: "Động từ",   emoji: "🚶", example: "他来了。",               examplePinyin: "Tā lái le.",                        exampleVi: "Anh ấy đã đến.", topic: "hanh_ong" },
  { id: 112, han: "去",    pinyin: "qù",           meaning: "đi",                  pos: "Động từ",   emoji: "🏃", example: "我去学校。",             examplePinyin: "Wǒ qù xuéxiào.",                    exampleVi: "Tôi đi đến trường.", topic: "hanh_ong" },
  { id: 113, han: "坐",    pinyin: "zuò",          meaning: "ngồi",                pos: "Động từ",   emoji: "🪑", example: "请坐。",                 examplePinyin: "Qǐng zuò.",                         exampleVi: "Xin ngồi.", topic: "hanh_ong" },
  { id: 114, han: "站",    pinyin: "zhàn",         meaning: "đứng",                pos: "Động từ",   emoji: "🧍", example: "请站起来。",             examplePinyin: "Qǐng zhàn qǐlái.",                  exampleVi: "Xin đứng lên.", topic: "verbs" },
  { id: 115, han: "走",    pinyin: "zǒu",          meaning: "đi bộ",               pos: "Động từ",   emoji: "🚶‍♂️", example: "我们走吧。",          examplePinyin: "Wǒmen zǒu ba.",                     exampleVi: "Chúng ta đi thôi.", topic: "verbs" },
  { id: 116, han: "住",    pinyin: "zhù",          meaning: "Ở, cư trú",            pos: "Động từ",   emoji: "🏘️", example: "你住在哪儿？",          examplePinyin: "Nǐ zhù zài nǎr?",                   exampleVi: "Bạn sống ở đâu?", topic: "hanh_ong" },
  { id: 117, han: "喜欢",  pinyin: "xǐhuān",      meaning: "Thích",               pos: "Động từ",   emoji: "❤️", example: "我喜欢唱歌。",           examplePinyin: "Wǒ xǐhuan chàng gē.",               exampleVi: "Tôi thích hát.", topic: "cam_xuc" },
  { id: 118, han: "想",    pinyin: "xiǎng",        meaning: "Muốn",         pos: "Động từ",   emoji: "💭", example: "我想去中国。",           examplePinyin: "Wǒ xiǎng qù Zhōngguó.",             exampleVi: "Tôi muốn đi Trung Quốc.", topic: "ngu_phap" },
  { id: 119, han: "爱",    pinyin: "ài",           meaning: "Yêu, thích",                 pos: "Động từ",   emoji: "💖", example: "我爱我的家。",           examplePinyin: "Wǒ ài wǒ de jiā.",                  exampleVi: "Tôi yêu gia đình tôi.", topic: "cam_xuc" },
  { id: 120, han: "买",    pinyin: "mǎi",          meaning: "mua",                 pos: "Động từ",   emoji: "🛒", example: "我要买水果。",           examplePinyin: "Wǒ yào mǎi shuǐguǒ.",               exampleVi: "Tôi muốn mua trái cây.", topic: "hanh_ong" },
  { id: 121, han: "卖",    pinyin: "mài",          meaning: "bán",                 pos: "Động từ",   emoji: "🏷️", example: "他在卖衣服。",          examplePinyin: "Tā zài mài yīfu.",                  exampleVi: "Anh ấy đang bán quần áo.", topic: "hanh_ong" },
  { id: 122, han: "工作",  pinyin: "gōngzuò",     meaning: "Làm việc, công việc", pos: "Động từ",  emoji: "💼", example: "他在哪儿工作？",         examplePinyin: "Tā zài nǎr gōngzuò?",               exampleVi: "Anh ấy làm việc ở đâu?", topic: "cong_viec" },
  { id: 123, han: "学习",  pinyin: "xuéxí",       meaning: "Học",             pos: "Động từ",   emoji: "🎓", example: "我们一起学习。",         examplePinyin: "Wǒmen yìqǐ xuéxí.",                 exampleVi: "Chúng ta cùng nhau học.", topic: "hoc_tap" },
  { id: 124, han: "教",    pinyin: "jiāo",         meaning: "dạy",                 pos: "Động từ",   emoji: "👨‍🏫", example: "他教我们汉语。",      examplePinyin: "Tā jiāo wǒmen Hànyǔ.",              exampleVi: "Anh ấy dạy chúng tôi tiếng Trung.", topic: "verbs" },
  { id: 125, han: "认识",  pinyin: "rèn shi",      meaning: "biết / quen / nhận thức", pos: "Động từ", emoji: "🤝", example: "我认识他。",         examplePinyin: "Wǒ rènshi tā.",                     exampleVi: "Tôi quen anh ấy.", topic: "verbs" },
  { id: 126, han: "知道",  pinyin: "zhī dào",      meaning: "Biết",     pos: "Động từ",   emoji: "💡", example: "我知道这件事。",         examplePinyin: "Wǒ zhīdào zhè jiàn shì.",           exampleVi: "Tôi biết chuyện này.", topic: "giao_tiep" },
  { id: 127, han: "会",    pinyin: "huì",          meaning: "Biết", pos: "Động từ",   emoji: "✨", example: "我会说汉语。",           examplePinyin: "Wǒ huì shuō Hànyǔ.",                exampleVi: "Tôi biết nói tiếng Trung.", topic: "ngu_phap" },
  { id: 128, han: "能",    pinyin: "néng",         meaning: "có thể",              pos: "Động từ",   emoji: "💪", example: "你能帮我吗？",           examplePinyin: "Nǐ néng bāng wǒ ma?",               exampleVi: "Bạn có thể giúp tôi không?", topic: "ngu_phap" },

  // ===== 10. TÍNH TỪ (16 từ) =====
  { id: 129, han: "好",    pinyin: "hǎo",          meaning: "Khỏe, tốt",                 pos: "Tính từ",   emoji: "👍", example: "这个很好。",             examplePinyin: "Zhège hěn hǎo.",                    exampleVi: "Cái này rất tốt.", topic: "chao_hoi" },
  { id: 130, han: "坏",    pinyin: "huài",         meaning: "xấu / hỏng",          pos: "Tính từ",   emoji: "👎", example: "电视坏了。",             examplePinyin: "Diànshì huài le.",                  exampleVi: "Tivi hỏng rồi.", topic: "adjectives" },
  { id: 131, han: "大",    pinyin: "dà",           meaning: "Lớn",            pos: "Tính từ",   emoji: "🐘", example: "这个房间很大。",         examplePinyin: "Zhège fángjiān hěn dà.",            exampleVi: "Phòng này rất lớn.", topic: "mieu_ta" },
  { id: 132, han: "小",    pinyin: "xiǎo",         meaning: "nhỏ , bé",                 pos: "Tính từ",   emoji: "🐜", example: "我的狗很小。",           examplePinyin: "Wǒ de gǒu hěn xiǎo.",               exampleVi: "Chó của tôi rất nhỏ.", topic: "adjectives" },
  { id: 133, han: "多",    pinyin: "duō",          meaning: "Nhiều (chỉ mức độ)",               pos: "Tính từ",   emoji: "📈", example: "很多人来了。",           examplePinyin: "Hěn duō rén lái le.",               exampleVi: "Rất nhiều người đã đến.", topic: "tu_e_hoi" },
  { id: 134, han: "少",    pinyin: "shǎo",         meaning: "Ít, thiếu",                  pos: "Tính từ",   emoji: "📉", example: "钱不多了。",             examplePinyin: "Qián bù duō le.",                   exampleVi: "Tiền không còn nhiều.", topic: "mieu_ta" },
  { id: 135, han: "高",    pinyin: "gāo",          meaning: "cao",                 pos: "Tính từ",   emoji: "📏", example: "他很高。",               examplePinyin: "Tā hěn gāo.",                       exampleVi: "Anh ấy rất cao.", topic: "adjectives" },
  { id: 136, han: "热",    pinyin: "rè",           meaning: "nóng",                pos: "Tính từ",   emoji: "🥵", example: "今天很热。",             examplePinyin: "Jīntiān hěn rè.",                   exampleVi: "Hôm nay rất nóng.", topic: "thoi_tiet" },
  { id: 137, han: "冷",    pinyin: "lěng",         meaning: "lạnh",                pos: "Tính từ",   emoji: "🥶", example: "冬天很冷。",             examplePinyin: "Dōngtiān hěn lěng.",                exampleVi: "Mùa đông rất lạnh.", topic: "thoi_tiet" },
  { id: 138, han: "新",    pinyin: "xīn",          meaning: "mới",                 pos: "Tính từ",   emoji: "🆕", example: "这是新衣服。",           examplePinyin: "Zhè shì xīn yīfu.",                 exampleVi: "Đây là quần áo mới.", topic: "adjectives" },
  { id: 139, han: "旧",    pinyin: "jiù",          meaning: "cũ",                  pos: "Tính từ",   emoji: "📜", example: "这是一本旧书。",         examplePinyin: "Zhè shì yì běn jiù shū.",           exampleVi: "Đây là một quyển sách cũ.", topic: "adjectives" },
  { id: 140, han: "漂亮",  pinyin: "piàoliang",   meaning: "Đẹp",                 pos: "Tính từ",   emoji: "🌹", example: "她很漂亮。",             examplePinyin: "Tā hěn piàoliang.",                 exampleVi: "Cô ấy rất đẹp.", topic: "mieu_ta" },
  { id: 141, han: "贵",    pinyin: "guì",          meaning: "đắt",                 pos: "Tính từ",   emoji: "💎", example: "这个太贵了。",           examplePinyin: "Zhège tài guì le.",                 exampleVi: "Cái này quá đắt.", topic: "adjectives" },
  { id: 142, han: "便宜",  pinyin: "pián yi",      meaning: "rẻ",                  pos: "Tính từ",   emoji: "🪙", example: "这个很便宜。",           examplePinyin: "Zhège hěn piányi.",                 exampleVi: "Cái này rất rẻ.", topic: "adjectives" },
  { id: 143, han: "快",    pinyin: "kuài",         meaning: "nhanh",               pos: "Tính từ",   emoji: "⚡", example: "他跑得很快。",           examplePinyin: "Tā pǎo de hěn kuài.",               exampleVi: "Anh ấy chạy rất nhanh.", topic: "adjectives" },
  { id: 144, han: "慢",    pinyin: "màn",          meaning: "chậm",                pos: "Tính từ",   emoji: "🐌", example: "请慢走。",               examplePinyin: "Qǐng màn zǒu.",                     exampleVi: "Xin đi từ từ.", topic: "adjectives" },

  // ===== 11. NƠI CHỐN & PHƯƠNG HƯỚNG (6 từ) =====
  { id: 145, han: "学校",  pinyin: "xuéxiào",     meaning: "Trường học",          pos: "Danh từ",   emoji: "🏫", example: "我们的学校很大。",       examplePinyin: "Wǒmen de xuéxiào hěn dà.",          exampleVi: "Trường của chúng tôi rất lớn.", topic: "truong_hoc" },
  { id: 146, han: "医院",  pinyin: "yīyuàn",      meaning: "Bệnh viện",           pos: "Danh từ",   emoji: "🏥", example: "他在医院工作。",         examplePinyin: "Tā zài yīyuàn gōngzuò.",            exampleVi: "Anh ấy làm việc ở bệnh viện.", topic: "ia_iem" },
  { id: 147, han: "商店",  pinyin: "shāngdiàn",   meaning: "Cửa hàng",            pos: "Danh từ",   emoji: "🏬", example: "我去商店买东西。",       examplePinyin: "Wǒ qù shāngdiàn mǎi dōngxi.",       exampleVi: "Tôi đi cửa hàng mua đồ.", topic: "ia_iem" },
  { id: 148, han: "饭店",  pinyin: "fàn diàn",     meaning: "nhà hàng",            pos: "Danh từ",   emoji: "🏨", example: "这家饭店很好。",         examplePinyin: "Zhè jiā fàndiàn hěn hǎo.",          exampleVi: "Nhà hàng này rất tốt.", topic: "places" },
  { id: 149, han: "房间",  pinyin: "fáng jiān",    meaning: "phòng",               pos: "Danh từ",   emoji: "🚪", example: "我的房间很干净。",       examplePinyin: "Wǒ de fángjiān hěn gānjìng.",       exampleVi: "Phòng của tôi rất sạch.", topic: "places" },
  { id: 150, han: "里",    pinyin: "lǐ",           meaning: "trong / bên trong",   pos: "Danh từ",   emoji: "📥", example: "杯子里有水。",           examplePinyin: "Bēizi lǐ yǒu shuǐ.",                exampleVi: "Trong cốc có nước.", topic: "places" },
  // ===== TỪ VỰNG BỔ SUNG TỪ FILE HK1 (theo bài học) =====
  // --- Bài 3 ---
  { id: 151, han: "叫", pinyin: "jiào", meaning: "gọi, kêu", pos: "Động từ", emoji: "📢", example: "小鸟在树上叫。", examplePinyin: "xiǎo niǎo zài shù shàng jiào", exampleVi: "Chim nhỏ kêu trên cây.", topic: "gioi_thieu_ban_than" },
  { id: 152, han: "名字", pinyin: "míngzi", meaning: "Tên , họ tên", pos: "Danh từ", emoji: "🏷️", example: "你的名字是什么？", examplePinyin: "nǐ de míngzi shì shénme", exampleVi: "Tên của bạn là gì?", topic: "thong_tin_ca_nhan" },
  { id: 153, han: "老师", pinyin: "lǎoshī", meaning: "Giáo viên, thầy giáo, cô giáo", pos: "Danh từ", emoji: "👨‍🏫", example: "老师正在教我们中文。", examplePinyin: "lǎoshī zhèngzài jiào wǒmen zhōngwén", exampleVi: "Thầy/cô giáo đang dạy chúng tôi tiếng Trung.", topic: "nghe_nghiep" },
  { id: 154, han: "吗", pinyin: "ma", meaning: "...không? , …à?", pos: "Phó từ", emoji: "❓", example: "你好吗？", examplePinyin: "nǐ hǎo ma", exampleVi: "Bạn khỏe không?", topic: "ngu_phap" },
  { id: 155, han: "学生", pinyin: "xuéshēng", meaning: "học sinh", pos: "Danh từ", emoji: "🎓", example: "他是学生。", examplePinyin: "tā shì xuéshēng", exampleVi: "Anh ấy là học sinh.", topic: "truong_hoc" },
  { id: 156, han: "人", pinyin: "rén", meaning: "người", pos: "Danh từ", emoji: "🧑", example: "很多人喜欢喝茶。", examplePinyin: "hěn duō rén xǐhuān hē chá", exampleVi: "Nhiều người thích uống trà.", topic: "thong_tin_ca_nhan" },
  { id: 157, han: "越南", pinyin: "Yuènán", meaning: "Việt Nam", pos: "Danh từ", emoji: "🇻🇳", example: "越南有很多美丽的海滩。", examplePinyin: "Yuènán yǒu hěn duō měilì de hǎitān。", exampleVi: "Việt Nam có nhiều bãi biển đẹp.", topic: "quoc_gia" },
  { id: 158, han: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", pos: "Danh từ", emoji: "🇨🇳", example: "中国的长城很壮观。", examplePinyin: "Zhōngguó de Chángchéng hěn zhuàngguān。", exampleVi: "Vạn lý Trường Thành của Trung Quốc rất壮观。", topic: "quoc_gia" },
  { id: 159, han: "美国", pinyin: "Měiguó", meaning: "Mỹ", pos: "Danh từ", emoji: "🇺🇸", example: "美国有很多著名大学。", examplePinyin: "Měiguó yǒu hěn duō zhùmíng dàxué。", exampleVi: "Mỹ có nhiều trường đại học nổi tiếng.", topic: "quoc_gia" },
  { id: 160, han: "俄罗斯", pinyin: "Éluósī", meaning: "Nga", pos: "Danh từ", emoji: "🇷🇺", example: "俄罗斯很大。", examplePinyin: "Éluósī hěn dà.", exampleVi: "Nga rất rộng lớn.", topic: "quoc_gia" },
  // --- Bài 4 ---
  { id: 161, han: "的", pinyin: "de", meaning: "(Trợ từ)", pos: "Trợ từ", emoji: "🔗", example: "这是我的书。", examplePinyin: "Zhè shì wǒ de shū。", exampleVi: "Đây là sách của tôi.", topic: "ngu_phap" },
  { id: 162, han: "汉语", pinyin: "Hànyǔ", meaning: "Tiếng Trung", pos: "Danh từ", emoji: "🀄", example: "我学习汉语。", examplePinyin: "Wǒ xuéxí Hànyǔ。", exampleVi: "Tôi học tiếng Trung.", topic: "ngon_ngu" },
  { id: 163, han: "国", pinyin: "guó", meaning: "Nước, quốc gia", pos: "Danh từ", emoji: "🏴", example: "中国是一个美丽的国家。", examplePinyin: "zhōng guó shì yī gè měi lì de guó jiā", exampleVi: "Trung Quốc là một quốc gia đẹp.", topic: "quoc_gia" },
  { id: 164, han: "呢", pinyin: "ne", meaning: "Trợ từ", pos: "Trợ từ", emoji: "🤔", example: "你今天去哪里呢？", examplePinyin: "nǐ jīn tiān qù nǎ lǐ ne", exampleVi: "Hôm nay bạn đi đâu vậy?", topic: "ngu_phap" },
  { id: 165, han: "同学", pinyin: "tóng xué", meaning: "Bạn học", pos: "Danh từ", emoji: "👫", example: "我的同学很聪明。", examplePinyin: "wǒ de tóng xué hěn cōng míng", exampleVi: "Bạn học của tôi rất thông minh.", topic: "truong_hoc" },
  { id: 166, han: "朋友", pinyin: "péngyou", meaning: "Bạn bè", pos: "Danh từ", emoji: "👥", example: "我有很多朋友。", examplePinyin: "wǒ yǒu hěn duō péngyou。", exampleVi: "Tôi có nhiều bạn bè.", topic: "moi_quan_he" },
  // --- Bài 5 ---
  { id: 167, han: "有", pinyin: "yǒu", meaning: "Có", pos: "Danh từ", emoji: "✅", example: "他有钱。", examplePinyin: "tā yǒu qián。", exampleVi: "Anh ấy có tiền.", topic: "ngu_phap" },
  { id: 168, han: "口", pinyin: "kǒu", meaning: "Lượng từ chỉ người", pos: "Lượng từ", emoji: "👄", example: "我家有三口人。", examplePinyin: "wǒ jiā yǒu sān kǒu rén。", exampleVi: "Gia đình tôi có ba người.", topic: "luong_tu" },
  { id: 169, han: "几", pinyin: "jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Số từ", emoji: "🔢", example: "你有几个苹果？", examplePinyin: "nǐ yǒu jǐ gè píng guǒ", exampleVi: "Bạn có mấy quả táo?", topic: "tu_e_hoi" },
  { id: 170, han: "了", pinyin: "le", meaning: "Động từ +了: Nhấn mạnh hành động xong xuôi.", pos: "Trợ từ", emoji: "✓", example: "我吃了饭。", examplePinyin: "wǒ chī le fàn", exampleVi: "Tôi đã ăn cơm.", topic: "ngu_phap" },
  { id: 171, han: "了", pinyin: "le", meaning: "了nằm cuối câu: Nhấn mạnh trạng thái thay đổi", pos: "Trợ từ", emoji: "✓", example: "下雨了。", examplePinyin: "xià yǔ le", exampleVi: "Trời mưa rồi.", topic: "misc" },
  { id: 172, han: "今年", pinyin: "jīnnián", meaning: "Năm nay", pos: "Danh từ", emoji: "🗓️", example: "今年我二十岁。", examplePinyin: "jīn nián wǒ èr shí suì", exampleVi: "Năm nay tôi hai mươi tuổi.", topic: "thoi_gian" },
  // --- Bài 6 ---
  { id: 173, han: "很", pinyin: "hěn", meaning: "Rất", pos: "Phó từ", emoji: "✨", example: "今天天气很好。", examplePinyin: "jīn tiān tiān qì hěn hǎo", exampleVi: "Hôm nay thời tiết rất tốt.", topic: "ngu_phap" },
  { id: 174, han: "好吃", pinyin: "hǎochī", meaning: "Ngon", pos: "Động từ", emoji: "😋", example: "这个包子很好吃。", examplePinyin: "zhè ge bāozi hěn hǎochī", exampleVi: "Bánh bao này rất ngon.", topic: "mieu_ta" },
  { id: 175, han: "汉字", pinyin: "hànzì", meaning: "Hán tự", pos: "Danh từ", emoji: "🀄", example: "汉字很难学。", examplePinyin: "hànzì hěn nán xué", exampleVi: "Hán tự rất khó học.", topic: "hoc_tap" },
  { id: 176, han: "字", pinyin: "zì", meaning: "Chữ", pos: "Danh từ", emoji: "🔤", example: "这个字怎么写？", examplePinyin: "zhège zì zěnme xiě", exampleVi: "Chữ này viết thế nào?", topic: "hoc_tap" },
  // --- Bài 7 ---
  { id: 177, han: "问", pinyin: "wèn", meaning: "Hỏi", pos: "Động từ", emoji: "❓", example: "我可以问你一个问题吗？", examplePinyin: "wǒ kěyǐ wèn nǐ yí gè wèntí ma", exampleVi: "Tôi có thể hỏi bạn một câu được không?", topic: "giao_tiep" },
  { id: 178, han: "答", pinyin: "dá", meaning: "Trả lời", pos: "Động từ", emoji: "💬", example: "请回答问题。", examplePinyin: "qǐng huí dá wèn tí", exampleVi: "Vui lòng trả lời câu hỏi.", topic: "giao_tiep" },
  // --- Bài 8 ---
  { id: 179, han: "多少", pinyin: "duōshao", meaning: "Bao nhiêu", pos: "Số từ", emoji: "🔢", example: "这个苹果多少钱？", examplePinyin: "zhè ge píng guǒ duō shao qián", exampleVi: "Quả táo này bao nhiêu tiền?", topic: "tu_e_hoi" },
  { id: 180, han: "块", pinyin: "kuài", meaning: "Đồng( đơn vị tiền tệ)", pos: "Lượng từ", emoji: "💴", example: "我有一百块钱。", examplePinyin: "wǒ yǒu yì bǎi kuài qián", exampleVi: "Tôi có một trăm đồng.", topic: "tien_bac" },
  { id: 181, han: "几", pinyin: "jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Số từ", emoji: "🔢", example: "你有几个苹果？", examplePinyin: "nǐ yǒu jǐ gè píng guǒ", exampleVi: "Bạn có mấy quả táo?", topic: "numbers" },
  { id: 182, han: "午", pinyin: "wǔ", meaning: "Buổi trưa, giờ Ngọ", pos: "Danh từ", emoji: "", example: "我们中午吃饭。", examplePinyin: "wǒ men zhōng wǔ chī fàn", exampleVi: "Chúng ta ăn trưa.", topic: "thoi_gian" },
  // --- Bài 9 ---
  { id: 183, han: "猫", pinyin: "māo", meaning: "Con mèo", pos: "Danh từ", emoji: "", example: "这只猫很可爱。", examplePinyin: "zhè zhī māo hěn kě ài", exampleVi: "Con mèo này rất đáng yêu.", topic: "verbs" },
  { id: 184, han: "在", pinyin: "zài", meaning: "Ở, tại", pos: "Danh từ", emoji: "", example: "他在家。", examplePinyin: "tā zài jiā", exampleVi: "Anh ấy ở nhà.", topic: "ngu_phap" },
  { id: 185, han: "那儿", pinyin: "nàr", meaning: "Đó, nơi đó", pos: "Đại từ", emoji: "", example: "商店在那儿。", examplePinyin: "shāngdiàn zài nàr", exampleVi: "Cửa hàng ở đó.", topic: "verbs" },
  { id: 186, han: "狗", pinyin: "gǒu", meaning: "con chó", pos: "Danh từ", emoji: "", example: "这只狗很可爱。", examplePinyin: "zhè zhī gǒu hěn kě'ài", exampleVi: "Con chó này rất đáng yêu.", topic: "verbs" },
  { id: 187, han: "下面(下)", pinyin: "xiàmiàn (xià)", meaning: "Bên dưới (dưới)", pos: "Danh từ", emoji: "", example: "桌子下面有一只猫。", examplePinyin: "zhuōzi xiàmiàn yǒu yī zhī māo.", exampleVi: "Bên dưới cái bàn có một con mèo.", topic: "vi_tri" },
  { id: 188, han: "上面(上)", pinyin: "shàngmiàn (shàng)", meaning: "Bên trên (trên)", pos: "Danh từ", emoji: "", example: "书架上面有很多书。", examplePinyin: "shūjià shàngmiàn yǒu hěn duō shū.", exampleVi: "Bên trên cái kệ sách có nhiều sách.", topic: "vi_tri" },
  { id: 189, han: "里面(里)", pinyin: "lǐmiàn (lǐ)", meaning: "Bên trong (trong)", pos: "Danh từ", emoji: "", example: "包里面有什么东西？", examplePinyin: "bāo lǐmiàn yǒu shénme dōngxi?", exampleVi: "Bên trong cái túi có gì?", topic: "vi_tri" },
  { id: 190, han: "外面(外)", pinyin: "wàimian (wài)", meaning: "Bên ngoài (ngoài)", pos: "Danh từ", emoji: "", example: "外面下雨了。", examplePinyin: "wài miàn xià yǔ le", exampleVi: "Bên ngoài đang mưa.", topic: "vi_tri" },
  { id: 191, han: "左边(左)", pinyin: "zuǒbiān (zuǒ)", meaning: "Bên trái (trái)", pos: "Danh từ", emoji: "", example: "左边有家书店。", examplePinyin: "zuǒ biān yǒu jiā shū diàn", exampleVi: "Bên trái có một hiệu sách.", topic: "vi_tri" },
  { id: 192, han: "右边(右)", pinyin: "yòubiān (yòu)", meaning: "Bên phải (phải)", pos: "Danh từ", emoji: "", example: "右边是银行。", examplePinyin: "yòu biān shì yín háng", exampleVi: "Bên phải là ngân hàng.", topic: "vi_tri" },
  { id: 193, han: "哪儿", pinyin: "nǎr", meaning: "Đâu", pos: "Đại từ", emoji: "", example: "书店在哪儿？", examplePinyin: "shū diàn zài nǎr", exampleVi: "Cửa sách ở đâu?", topic: "tu_e_hoi" },
  { id: 194, han: "医生", pinyin: "yīshēng", meaning: "Bác sĩ", pos: "Danh từ", emoji: "👨‍⚕️", example: "医生很专业。", examplePinyin: "yī shēng hěn zhuān yè", exampleVi: "Bác sĩ rất chuyên nghiệp.", topic: "nghe_nghiep" },
  { id: 195, han: "护士", pinyin: "hùshi", meaning: "Y tá", pos: "Danh từ", emoji: "", example: "护士照顾病人。", examplePinyin: "hù shì zhào gù bìng rén", exampleVi: "Y tá chăm sóc bệnh nhân.", topic: "nghe_nghiep" },
  { id: 196, han: "病人", pinyin: "bìngrén", meaning: "Bệnh  nhân", pos: "Danh từ", emoji: "", example: "病人需要休息。", examplePinyin: "bìngrén xūyào xiūxi", exampleVi: "Bệnh nhân cần nghỉ ngơi.", topic: "suc_khoe" },
  // --- Bài 10 ---
  { id: 197, han: "上", pinyin: "shàng", meaning: "Trên, lên", pos: "Danh từ", emoji: "", example: "请上车。", examplePinyin: "qǐng shàng chē", exampleVi: "Xin lên xe.", topic: "vi_tri" },
  { id: 198, han: "下", pinyin: "xià", meaning: "Dưới, xuống, rơi", pos: "Danh từ", emoji: "", example: "请下车。", examplePinyin: "qǐng xià chē", exampleVi: "Xin xuống xe.", topic: "vi_tri" },
  { id: 199, han: "里面", pinyin: "lǐ miàn", meaning: "Bên trong", pos: "Danh từ", emoji: "", example: "钱包在里面。", examplePinyin: "qián bāo zài lǐ miàn", exampleVi: "Ví tiền ở bên trong.", topic: "vi_tri" },
  { id: 200, han: "外边", pinyin: "wài biān", meaning: "Bên ngoài", pos: "Danh từ", emoji: "", example: "外边天气很冷。", examplePinyin: "wàibian tiānqì hěn lěng.", exampleVi: "Thời tiết ngoài trời rất lạnh.", topic: "vi_tri" },
  { id: 201, han: "前面", pinyin: "qián miàn", meaning: "Phía trước", pos: "Danh từ", emoji: "", example: "车在前面。", examplePinyin: "chē zài qián miàn", exampleVi: "Chiếc xe ở phía trước.", topic: "vi_tri" },
  { id: 202, han: "后面", pinyin: "hòu miàn", meaning: "Phía sau", pos: "Danh từ", emoji: "", example: "椅子在桌子后面。", examplePinyin: "yǐ zi zài zhuō zi hòu miàn", exampleVi: "Cái ghì ở sau cái bàn.", topic: "vi_tri" },
  { id: 203, han: "左边", pinyin: "zuǒ biān", meaning: "Bên trái", pos: "Danh từ", emoji: "", example: "请站在我的左边。", examplePinyin: "qǐng zhàn zài wǒ de zuǒ biān", exampleVi: "Vui lòng đứng bên trái tôi.", topic: "vi_tri" },
  { id: 204, han: "右边", pinyin: "yòu biān", meaning: "Bên phải", pos: "Danh từ", emoji: "", example: "银行在马路的右边。", examplePinyin: "yín háng zài mǎ lù de yòu biān", exampleVi: "Ngân hàng ở bên phải con đường.", topic: "vi_tri" },
  { id: 205, han: "旁边", pinyin: "páng biān", meaning: "Bên cạnh", pos: "Danh từ", emoji: "", example: "桌子旁边有一把椅子。", examplePinyin: "zhuō zi páng biān yǒu yī bǎ yǐ zi", exampleVi: "Bên cạnh bàn có một cái ghế.", topic: "vi_tri" },
  { id: 206, han: "本", pinyin: "běn", meaning: "Quyển, cuốn", pos: "Danh từ", emoji: "", example: "我想买这本新书。", examplePinyin: "wǒ xiǎng mǎi zhè běn xīn shū", exampleVi: "Tôi muốn mua quyển sách mới này.", topic: "luong_tu" },
  { id: 207, han: "和", pinyin: "hé", meaning: "Và", pos: "Danh từ", emoji: "", example: "我和妈妈去公园。", examplePinyin: "wǒ hé mā mā qù gōng yuán", exampleVi: "Tôi và mẹ đi công viên.", topic: "ngu_phap" },
  { id: 208, han: "这儿", pinyin: "zhèr", meaning: "Chỗ này, ở đây", pos: "Đại từ", emoji: "", example: "我们在这儿吃饭。", examplePinyin: "wǒ men zài zhèr chī fàn", exampleVi: "Chúng tôi ăn cơm ở đây.", topic: "ia_iem" },
  { id: 209, han: "没有(没)", pinyin: "méiyǒu (méi)", meaning: "Không có", pos: "Phó từ", emoji: "", example: "我没有时间。", examplePinyin: "wǒ méiyǒu shí jiān", exampleVi: "Tôi không có thời gian.", topic: "ngu_phap" },
  // --- Bài 11 ---
  { id: 210, han: "秒", pinyin: "miǎo", meaning: "Giây", pos: "Danh từ", emoji: "", example: "请等一分钟。", examplePinyin: "qǐng děng yī fēn zhōng", exampleVi: "Vui lòng đợi một phút.", topic: "thoi_gian" },
  { id: 211, han: "中午", pinyin: "zhōngwǔ", meaning: "Buổi trưa", pos: "Danh từ", emoji: "", example: "我们中午一起吃饭吧。", examplePinyin: "wǒ men zhōng wǔ yì qǐ chī fàn ba", exampleVi: "Chúng ta cùng ăn trưa nhé.", topic: "thoi_gian" },
  { id: 212, han: "吃饭", pinyin: "chī fàn", meaning: "Ăn cơm", pos: "Động từ", emoji: "", example: "妈妈正在做饭。", examplePinyin: "mā ma zhèng zài zuò fàn", exampleVi: "Mẹ đang nấu cơm.", topic: "o_an" },
  { id: 213, han: "回", pinyin: "huí", meaning: "Về, trở về", pos: "Danh từ", emoji: "", example: "我每天晚上回家。", examplePinyin: "wǒ měi tiān wǎn shàng huí jiā", exampleVi: "Tôi về nhà mỗi tối.", topic: "hanh_ong" },
  { id: 214, han: "电影", pinyin: "diànyǐng", meaning: "Phim", pos: "Danh từ", emoji: "", example: "我们看一部电影吧。", examplePinyin: "wǒ men kàn yī bù diàn yǐng ba", exampleVi: "Chúng ta hãy xem một bộ phim đi.", topic: "giai_tri" },
  { id: 215, han: "前", pinyin: "qián", meaning: "Trước", pos: "Danh từ", emoji: "", example: "学校前面有一家商店。", examplePinyin: "xué xiào qián miàn yǒu yī jiā shāng diàn", exampleVi: "Trước trường học có một cửa hàng.", topic: "vi_tri" },
  // --- Bài 12 ---
  { id: 216, han: "天气", pinyin: "tiānqì", meaning: "Thời tiết", pos: "Danh từ", emoji: "", example: "今天的天气很好。", examplePinyin: "jīn tiān de tiān qì hěn hǎo", exampleVi: "Thời tiết hôm nay rất tốt.", topic: "thoi_tiet" },
  { id: 217, han: "怎么样", pinyin: "zěn me yàng", meaning: "Như thế nào", pos: "Đại từ", emoji: "", example: "今天天气怎么样？", examplePinyin: "jīn tiān tiān qì zěn me yàng", exampleVi: "Hôm nay thời tiết như thế nào?", topic: "tu_e_hoi" },
  { id: 218, han: "太", pinyin: "tài", meaning: "Quá, lắm", pos: "Danh từ", emoji: "", example: "这个苹果太甜了。", examplePinyin: "zhè ge píng guǒ tài tián le", exampleVi: "Quả táo này ngọt quá.", topic: "ngu_phap" },
  { id: 219, han: "太....了", pinyin: "tài ......le", meaning: "Quá ….", pos: "Trợ từ", emoji: "", example: "这个书包太贵了。", examplePinyin: "zhè ge shū bāo tài guì le", exampleVi: "Cái cặp này đắt quá.", topic: "ngu_phap" },
  { id: 220, han: "下雨", pinyin: "xià yǔ", meaning: "Đỗ mưa", pos: "Danh từ", emoji: "", example: "今天下午下雨。", examplePinyin: "jīn tiān xià wǔ xià yǔ", exampleVi: "Hôm nay chiều trời mưa.", topic: "thoi_tiet" },
  { id: 221, han: "下", pinyin: "xià", meaning: "Rơi", pos: "Danh từ", emoji: "", example: "苹果从树上下来。", examplePinyin: "píng guǒ cóng shù shàng xià lái", exampleVi: "Quả táo rơi từ trên cây xuống.", topic: "time" },
  { id: 222, han: "雨", pinyin: "yǔ", meaning: "Mưa", pos: "Danh từ", emoji: "", example: "外面雨很大。", examplePinyin: "wài miàn yǔ hěn dà", exampleVi: "Bên ngoài mưa rất to.", topic: "thoi_tiet" },
  { id: 223, han: "身体", pinyin: "shēntǐ", meaning: "Sức khỏe", pos: "Danh từ", emoji: "", example: "他的身体很好。", examplePinyin: "tā de shēntǐ hěn hǎo", exampleVi: "Cơ thể anh ấy rất khỏe mạnh.", topic: "co_the" },
  { id: 224, han: "些", pinyin: "xiē", meaning: "Một it, một vài", pos: "Danh từ", emoji: "", example: "我买些水果。", examplePinyin: "wǒ mǎi xiē shuǐguǒ", exampleVi: "Tôi mua chút trái cây.", topic: "luong_tu" },
  { id: 225, han: "早", pinyin: "zǎo", meaning: "Sớm", pos: "Danh từ", emoji: "", example: "他每天早睡。", examplePinyin: "tā měitiān zǎo shuì", exampleVi: "Anh ấy ngủ sớm mỗi ngày.", topic: "chao_hoi" },
  { id: 226, han: "迟到", pinyin: "chídào", meaning: "Trễ, muộn", pos: "Danh từ", emoji: "", example: "他今天上课迟到了。", examplePinyin: "tā jīntiān shàngkè chídào le", exampleVi: "Hôm nay cậu ấy đã đến lớp muộn.", topic: "truong_hoc" },
  { id: 227, han: "雨伞", pinyin: "yǔsǎn", meaning: "Cây dù", pos: "Danh từ", emoji: "", example: "下雨了，记得带雨伞。", examplePinyin: "xià yǔ le, jìdé dài yǔsǎn", exampleVi: "Trời mưa rồi, nhớ mang theo cây dù.", topic: "o_dung" },
  { id: 228, han: "雨衣", pinyin: "yǔyī", meaning: "Áo mưa", pos: "Danh từ", emoji: "", example: "她穿着雨衣去上班。", examplePinyin: "tā chuānzhe yǔyī qù shàngbān", exampleVi: "Cô ấy mặc áo mưa đi làm.", topic: "quan_ao" },
  { id: 229, han: "葡萄", pinyin: "pútáo", meaning: "Trái nho", pos: "Danh từ", emoji: "", example: "葡萄很甜。", examplePinyin: "pútáo hěn tián.", exampleVi: "Nho rất ngọt.", topic: "trai_cay" },
  { id: 230, han: "香蕉", pinyin: "xiāngjiāo", meaning: "Trái chuối", pos: "Danh từ", emoji: "", example: "我喜欢吃香蕉。", examplePinyin: "wǒ xǐhuān chī xiāngjiāo.", exampleVi: "Tôi thích ăn chuối.", topic: "trai_cay" },
  { id: 231, han: "草莓", pinyin: "cǎoméi", meaning: "Dâu tây", pos: "Danh từ", emoji: "", example: "草莓是红色的。", examplePinyin: "cǎoméi shì hóngsè de.", exampleVi: "Dâu tây màu đỏ.", topic: "trai_cay" },
  { id: 232, han: "桃子", pinyin: "táozi", meaning: "Trái đào", pos: "Danh từ", emoji: "", example: "这个桃子很甜。", examplePinyin: "zhè ge táozi hěn tián.", exampleVi: "Quả đào này rất ngọt.", topic: "trai_cay" },
  { id: 233, han: "橘子", pinyin: "júzi", meaning: "Trái quýt", pos: "Danh từ", emoji: "", example: "我喜欢吃橘子。", examplePinyin: "wǒ xǐhuān chī júzi.", exampleVi: "Tôi thích ăn quả quýt.", topic: "trai_cay" },
  { id: 234, han: "哈蜜瓜", pinyin: "hā mì guā", meaning: "Dưa lưới", pos: "Danh từ", emoji: "", example: "哈蜜瓜汁很好喝。", examplePinyin: "hā mì guā zhī hěn hǎo hē.", exampleVi: "Nước ép dưa lưới rất ngon.", topic: "trai_cay" },
  { id: 235, han: "榴莲", pinyin: "liú lián", meaning: "Sầu riêng", pos: "Danh từ", emoji: "", example: "榴莲闻起来很香。", examplePinyin: "liúlián wén qǐlái hěn xiāng.", exampleVi: "Sầu riêng ngửi rất thơm.", topic: "trai_cay" },
  { id: 236, han: "红毛丹", pinyin: "hóng máo dān", meaning: "Chôm chôm", pos: "Danh từ", emoji: "", example: "红毛丹真好吃。", examplePinyin: "hóng máo dān zhēn hǎo chī.", exampleVi: "Chôm chôm thật ngon.", topic: "trai_cay" },
  { id: 237, han: "还好", pinyin: "hái hǎo", meaning: "Cũng tốt", pos: "Tính từ", emoji: "", example: "今天还好。", examplePinyin: "jīn tiān hái hǎo.", exampleVi: "Hôm nay cũng tốt.", topic: "giao_tiep" },
  { id: 238, han: "还可以", pinyin: "hái kěyǐ", meaning: "Cũng tạm, cũng được, khá ổn", pos: "Danh từ", emoji: "", example: "今天的天气还可以。", examplePinyin: "jīn tiān de tiān qì hái kě yǐ", exampleVi: "Thời tiết hôm nay cũng được.", topic: "giao_tiep" },
  { id: 239, han: "差不多", pinyin: "chàbuduō", meaning: "Cũng cũng", pos: "Danh từ", emoji: "", example: "我们的身高差不多。", examplePinyin: "wǒ men de shēn gāo chà buō duō", exampleVi: "Chiều cao của chúng tôi cũng tương đương.", topic: "giao_tiep" },
  { id: 240, han: "差", pinyin: "chà", meaning: "Kém, không tốt, tệ", pos: "Phó từ", emoji: "", example: "他的成绩很差。", examplePinyin: "tā de chéng jì hěn chà", exampleVi: "Kết quả học tập của anh ấy rất kém.", topic: "mieu_ta" },
  { id: 241, han: "很差", pinyin: "hěn chà", meaning: "Rất kém", pos: "Phó từ", emoji: "", example: "他的中文很差。", examplePinyin: "tā de zhōng wén hěn chà", exampleVi: "Tiếng Trung của anh ấy rất kém.", topic: "mieu_ta" },
  // --- Bài 13 ---
  { id: 242, han: "喂", pinyin: "wèi", meaning: "A lô, này", pos: "Danh từ", emoji: "", example: "喂，你好吗？", examplePinyin: "wèi nǐ hǎo ma", exampleVi: "A lô, bạn khỏe không?", topic: "giao_tiep" },
  { id: 243, han: "也", pinyin: "yě", meaning: "Cũng", pos: "Danh từ", emoji: "", example: "我也喜欢中文。", examplePinyin: "wǒ yě xǐ huān zhōng wén", exampleVi: "Tôi cũng thích tiếng Trung.", topic: "ngu_phap" },
  { id: 244, han: "睡觉", pinyin: "shuì jiào", meaning: "Đi ngủ", pos: "Danh từ", emoji: "", example: "我每天晚上九点睡觉。", examplePinyin: "wǒ měi tiān wǎn shàng jiǔ diǎn shuì jiào", exampleVi: "Tôi mỗi tối 9 giờ đi ngủ.", topic: "hanh_ong" },
  { id: 245, han: "开心", pinyin: "kāi xīn", meaning: "Vui", pos: "Danh từ", emoji: "", example: "看到你我很开心。", examplePinyin: "kàn dào nǐ wǒ hěn kāi xīn", exampleVi: "Thấy bạn tôi rất vui.", topic: "cam_xuc" },
  { id: 246, han: "难过", pinyin: "nán guò", meaning: "Buồn", pos: "Danh từ", emoji: "", example: "考试没考好，我很难过。", examplePinyin: "kǎo shì méi kǎo hǎo wǒ hěn nán guò", exampleVi: "Thi không tốt, tôi rất buồn.", topic: "cam_xuc" },
  { id: 247, han: "讨厌", pinyin: "tǎo yàn", meaning: "Ghét", pos: "Danh từ", emoji: "", example: "他真讨厌。", examplePinyin: "tā zhēn tǎo yàn", exampleVi: "Cậu ta thật sự đáng ghét.", topic: "cam_xuc" },
  { id: 248, han: "给", pinyin: "gěi", meaning: "Đưa, cho", pos: "Danh từ", emoji: "", example: "请给我一杯水。", examplePinyin: "qǐng gěi wǒ yī bēi shuǐ", exampleVi: "Cho tôi một ly nước.", topic: "ngu_phap" },
  { id: 249, han: "送", pinyin: "sòng", meaning: "Tặng, gửi", pos: "Danh từ", emoji: "", example: "我送你一本书。", examplePinyin: "wǒ sòng nǐ yī běn shū", exampleVi: "Tặng bạn một cuốn sách.", topic: "hanh_ong" },
  { id: 250, han: "打电话", pinyin: "dǎ diànhuà", meaning: "Gọi điện thoại", pos: "Danh từ", emoji: "", example: "我每天打电话给妈妈。", examplePinyin: "wǒ měi tiān dǎ diànhuà gěi māma", exampleVi: "Tôi gọi điện cho mẹ mỗi ngày.", topic: "giao_tiep" },
  { id: 251, han: "吧", pinyin: "ba", meaning: "Trợ từ ngữ khí dùng ở cuối câu dể diễn tả sự thương lượng, lời đề nghị thỉnh cầu hay mệnh lệnh", pos: "Trợ từ", emoji: "", example: "我们去看电影吧。", examplePinyin: "wǒmen qù kàn diànyǐng ba", exampleVi: "Chúng ta đi xem phim nhé.", topic: "ngu_phap" },
  // --- Bài 14 ---
  { id: 252, han: "东西", pinyin: "dōngxi", meaning: "Đồ, đồ đạc", pos: "Danh từ", emoji: "", example: "我的房间里有很多东西。", examplePinyin: "wǒ de fángjiān lǐ yǒu hěn duō dōngxi", exampleVi: "Phòng tôi có rất nhiều đồ đạc.", topic: "o_dung" },
  { id: 253, han: "一点儿", pinyin: "yīdiǎnr", meaning: "Một ít, một chút", pos: "Số từ", emoji: "", example: "我吃一点儿米饭。", examplePinyin: "wǒ chī yīdiǎnr mǐfàn", exampleVi: "Tôi ăn một chút cơm.", topic: "so_luong" },
  { id: 254, han: "看见", pinyin: "kànjiàn", meaning: "Nhìn thấy", pos: "Động từ", emoji: "", example: "我看见一只小鸟。", examplePinyin: "wǒ kànjiàn yī zhī xiǎo niǎo", exampleVi: "Tôi nhìn thấy một chú chim nhỏ.", topic: "hanh_ong" },
  { id: 255, han: "开", pinyin: "kāi", meaning: "Mở", pos: "Danh từ", emoji: "", example: "请开门，谢谢。", examplePinyin: "qǐng kāi mén xièxiè", exampleVi: "Mời mở cửa, cảm ơn.", topic: "hanh_ong" },
  { id: 256, han: "关", pinyin: "guān", meaning: "Đóng", pos: "Danh từ", emoji: "", example: "请关上门。", examplePinyin: "qǐng guān shàng mén", exampleVi: "Vui lòng đóng cửa lại.", topic: "hanh_ong" },
  { id: 257, han: "回来", pinyin: "huílai", meaning: "Quay lại", pos: "Động từ", emoji: "", example: "他晚上回来。", examplePinyin: "tā wǎn shang huí lái", exampleVi: "Anh ấy về vào buổi tối.", topic: "hanh_ong" },
  { id: 258, han: "分钟", pinyin: "fēn zhōng", meaning: "Phút", pos: "Lượng từ", emoji: "", example: "等十分钟。", examplePinyin: "děng shí fēn zhōng", exampleVi: "Đợi mười phút.", topic: "thoi_gian" },
  { id: 259, han: "后", pinyin: "hòu", meaning: "Sau", pos: "Danh từ", emoji: "", example: "他坐在我的后边。", examplePinyin: "tā zuò zài wǒ de hòu biān", exampleVi: "Anh ấy ngồi sau tôi.", topic: "vi_tri" },
  { id: 260, han: "啊", pinyin: "a", meaning: "Trợ từ ngữ khí", pos: "Danh từ", emoji: "", example: "今天天气真好啊！", examplePinyin: "jīn tiān tiān qì zhēn hǎo a", exampleVi: "Thời tiết hôm nay thật tốt quá!", topic: "ngu_phap" },
  { id: 261, han: "不少", pinyin: "bùshǎo", meaning: "Không ít, nhiều", pos: "Phó từ", emoji: "", example: "这个城市有不少公园。", examplePinyin: "zhè ge chéng shì yǒu bù shǎo gōng yuán", exampleVi: "Thành phố này không ít công viên.", topic: "so_luong" },
  { id: 262, han: "这些", pinyin: "zhèxiē", meaning: "Những thứ này, những điều này", pos: "Đại từ", emoji: "", example: "这些都是我的书。", examplePinyin: "zhèxiē dōu shì wǒ de shū.", exampleVi: "Tất cả những cuốn này đều là sách của tôi.", topic: "ngu_phap" },
  { id: 263, han: "都", pinyin: "dōu", meaning: "Đều", pos: "Danh từ", emoji: "", example: "我们都喜欢喝茶。", examplePinyin: "wǒmen dōu xǐhuan hē chá.", exampleVi: "Chúng tôi đều thích uống trà.", topic: "ngu_phap" },
  // --- Bài Bổ sung ---
  { id: 264, han: "摩托车", pinyin: "mótuōchē", meaning: "Xe moto", pos: "Danh từ", emoji: "", example: "他骑摩托车上班。", examplePinyin: "tā qí mótuōchē shàngbān.", exampleVi: "Anh ấy đi xe máy đến công tác.", topic: "phuong_tien_and_di_chuyen" },
  { id: 265, han: "骑", pinyin: "qí", meaning: "Cưỡi, lái xe (moto,…)", pos: "Danh từ", emoji: "", example: "他喜欢骑自行车。", examplePinyin: "tā xǐhuān qí zìxíngchē", exampleVi: "Anh ấy thích đạp xe đạp.", topic: "hanh_ong" },
  { id: 266, han: "开车", pinyin: "kāi chē", meaning: "Lái xe (oto)", pos: "Danh từ", emoji: "", example: "他会开车去公司。", examplePinyin: "tā huì kāi chē qù gōngsī", exampleVi: "Anh ấy sẽ lái xe đến công ty.", topic: "phuong_tien_and_di_chuyen" },
  { id: 267, han: "出租车", pinyin: "chū zū chē", meaning: "Xe taxi", pos: "Danh từ", emoji: "", example: "我们坐出租车回家。", examplePinyin: "wǒmen zuò chūzūchē huí jiā", exampleVi: "Chúng tôi đi taxi về nhà.", topic: "phuong_tien_and_di_chuyen" },
  { id: 268, han: "汽车", pinyin: "qìchē", meaning: "Xe hơi, oto", pos: "Danh từ", emoji: "", example: "爸爸开汽车上班。", examplePinyin: "bàba kāi qìchē shàngbān.", exampleVi: "Bố đi làm bằng xe hơi.", topic: "phuong_tien_and_di_chuyen" },
  { id: 269, han: "公交车", pinyin: "gōngjiāochē", meaning: "Xe buýt", pos: "Danh từ", emoji: "", example: "我每天坐公交车回家。", examplePinyin: "wǒ měitiān zuò gōngjiāochē huíjiā.", exampleVi: "Tôi đi xe buýt về nhà mỗi ngày.", topic: "phuong_tien_and_di_chuyen" },
  { id: 270, han: "打车", pinyin: "dǎchē", meaning: "Bắt xe", pos: "Danh từ", emoji: "", example: "下雨天我喜欢打车出门。", examplePinyin: "xià yǔ tiān wǒ xǐhuān dǎchē chūmén.", exampleVi: "Khi trời mưa tôi thích bắt xe ra ngoài.", topic: "phuong_tien_and_di_chuyen" },
  { id: 271, han: "放心", pinyin: "fàng xīn", meaning: "Yên tâm", pos: "Danh từ", emoji: "", example: "请放心，我会照顾好自己。", examplePinyin: "qǐng fàng xīn, wǒ huì zhào gù hǎo zì jǐ.", exampleVi: "Hãy yên tâm, tôi sẽ chăm sóc tốt bản thân.", topic: "cam_xuc" },
  { id: 272, han: "安心", pinyin: "ān xīn", meaning: "An tâm", pos: "Danh từ", emoji: "", example: "孩子很安心地在睡觉。", examplePinyin: "hái zi hěn ān xīn de zài shuì jiào.", exampleVi: "Đang ngủ rất yên tâm.", topic: "cam_xuc" },
  { id: 273, han: "自行车", pinyin: "zì xíng chē", meaning: "Xe đạp", pos: "Danh từ", emoji: "", example: "我每天骑自行车上班。", examplePinyin: "wǒ měi tiān qí zì xíng chē shàng bān.", exampleVi: "Tôi đi xe đạp đi làm mỗi ngày.", topic: "phuong_tien_and_di_chuyen" },
  { id: 274, han: "电动车", pinyin: "diàn dòng chē", meaning: "Xe điện", pos: "Danh từ", emoji: "", example: "我每天骑电动车上班。", examplePinyin: "wǒ měi tiān qí diàn dòng chē shàng bān", exampleVi: "Tôi đi làm bằng xe điện mỗi ngày.", topic: "phuong_tien_and_di_chuyen" },
  { id: 275, han: "走路", pinyin: "zǒu lù", meaning: "Đi bộ", pos: "Động từ", emoji: "", example: "天气好，我喜欢走路。", examplePinyin: "tiān qì hǎo, wǒ xǐ huān zǒu lù", exampleVi: "Thời tiết tốt, tôi thích đi bộ.", topic: "phuong_tien_and_di_chuyen" },
  { id: 276, han: "跑步", pinyin: "pǎo bù", meaning: "Chạy bộ", pos: "Danh từ", emoji: "", example: "他每天早上跑步锻炼身体。", examplePinyin: "tā měi tiān zǎo shàng pǎo bù duàn liàn shēn tǐ", exampleVi: "Anh ấy chạy bộ mỗi sáng để rèn luyện sức khỏe.", topic: "the_thao" },
  { id: 277, han: "自动", pinyin: "zìdòng", meaning: "Tự động", pos: "Danh từ", emoji: "", example: "门是自动开的。", examplePinyin: "mén shì zì dòng kāi de", exampleVi: "Cửa tự động mở ra.", topic: "cong_nghe" },
  { id: 278, han: "穿", pinyin: "chuān", meaning: "Đeo; mặc; mang (giày, tất)", pos: "Danh từ", emoji: "", example: "他每天都穿蓝色衣服。", examplePinyin: "tā měi tiān dōu chuān lán sè yī fu", exampleVi: "Anh ấy mỗi ngày đều mặc quần áo màu xanh.", topic: "hanh_ong" },
  { id: 279, han: "脱", pinyin: "tuō", meaning: "Cởi ra; bỏ ra", pos: "Danh từ", emoji: "", example: "请脱下你的外套。", examplePinyin: "qǐng tuō xià nǐ de wài tào", exampleVi: "Vui lòng cởi chiếc áo khoác của bạn ra.", topic: "hanh_ong" },
  // ===== TỪ VỰNG BỔ SUNG TỪ FILE PHÚ (40 chủ đề) =====
  // --- Trường học ---
  { id: 280, han: "上课！", pinyin: "shàngkè", meaning: "Vào học đi", pos: "Động từ", emoji: "", example: "上课！。", examplePinyin: "shàngkè。", exampleVi: "Vào học đi。", topic: "truong_hoc" },
  { id: 281, han: "下课！", pinyin: "xiàkè", meaning: "Đã hết giờ học rồi", pos: "Động từ", emoji: "", example: "下课！。", examplePinyin: "xiàkè。", exampleVi: "Đã hết giờ học rồi。", topic: "truong_hoc" },
  { id: 282, han: "现在休息！", pinyin: "Xiànzài xiūxi", meaning: "Nghỉ giải lao nhé", pos: "Động từ", emoji: "", example: "现在休息！。", examplePinyin: "Xiànzài xiūxi。", exampleVi: "Nghỉ giải lao nhé。", topic: "truong_hoc" },
  { id: 283, han: "看黑板！", pinyin: "Kàn hēibǎn", meaning: "Hãy nhìn lên bảng", pos: "Động từ", emoji: "", example: "看黑板！。", examplePinyin: "Kàn hēibǎn。", exampleVi: "Hãy nhìn lên bảng。", topic: "truong_hoc" },
  { id: 284, han: "跟我读！", pinyin: "Gēn wǒ dú", meaning: "Hãy đọc theo tôi", pos: "Động từ", emoji: "", example: "跟我读！。", examplePinyin: "Gēn wǒ dú。", exampleVi: "Hãy đọc theo tôi。", topic: "truong_hoc" },
  // --- Công việc ---
  { id: 285, han: "上班", pinyin: "shàng bān", meaning: "Vào làm, đi làm", pos: "Động từ", emoji: "", example: "上班。", examplePinyin: "shàng bān。", exampleVi: "Vào làm, đi làm。", topic: "cong_viec" },
  { id: 286, han: "下班", pinyin: "xià bān", meaning: "Tan làm", pos: "Động từ", emoji: "", example: "下班。", examplePinyin: "xià bān。", exampleVi: "Tan làm。", topic: "cong_viec" },
  { id: 287, han: "加班", pinyin: "jiā bān", meaning: "Tăng ca, làm thêm giờ", pos: "Động từ", emoji: "", example: "加班。", examplePinyin: "jiā bān。", exampleVi: "Tăng ca, làm thêm giờ。", topic: "cong_viec" },
  { id: 288, han: "休年假", pinyin: "xiū nián jià", meaning: "Nghỉ phép năm", pos: "Danh từ", emoji: "", example: "休年假。", examplePinyin: "xiū nián jià。", exampleVi: "Nghỉ phép năm。", topic: "cong_viec" },
  // --- Gia đình ---
  { id: 289, han: "家庭", pinyin: "jiā tíng", meaning: "Gia đình", pos: "Danh từ", emoji: "", example: "家庭。", examplePinyin: "jiā tíng。", exampleVi: "Gia đình。", topic: "gia_inh" },
  { id: 290, han: "家人", pinyin: "jiā rén", meaning: "Người nhà, người thân", pos: "Danh từ", emoji: "", example: "家人。", examplePinyin: "jiā rén。", exampleVi: "Người nhà, người thân。", topic: "gia_inh" },
  // --- Quần áo ---
  { id: 291, han: "领口", pinyin: "lǐng kǒu", meaning: "Cổ áo", pos: "Danh từ", emoji: "", example: "领口。", examplePinyin: "lǐng kǒu。", exampleVi: "Cổ áo。", topic: "quan_ao" },
  // --- Từ để hỏi ---
  { id: 292, han: "多大", pinyin: "duō dà", meaning: "Lớn bao nhiêu, bao nhiêu tuổi (đối với người)", pos: "Tính từ", emoji: "", example: "多大。", examplePinyin: "duō dà。", exampleVi: "Lớn bao nhiêu, bao nhiêu tuổi (đối với người)。", topic: "tu_e_hoi" },
  { id: 293, han: "多少钱", pinyin: "duō shǎo qián", meaning: "Bao nhiêu tiền", pos: "Tính từ", emoji: "", example: "多少钱。", examplePinyin: "duō shǎo qián。", exampleVi: "Bao nhiêu tiền。", topic: "tu_e_hoi" },
  // --- Nghề nghiệp ---
  { id: 294, han: "组长", pinyin: "zǔ zhǎng", meaning: "Tổ trưởng", pos: "Danh từ", emoji: "", example: "组长。", examplePinyin: "zǔ zhǎng。", exampleVi: "Tổ trưởng。", topic: "nghe_nghiep" },
  { id: 295, han: "部长", pinyin: "bù zhǎng", meaning: "Trưởng bộ phận, bộ trưởng", pos: "Danh từ", emoji: "", example: "部长。", examplePinyin: "bù zhǎng。", exampleVi: "Trưởng bộ phận, bộ trưởng。", topic: "nghe_nghiep" },
  { id: 296, han: "助理", pinyin: "zhù lǐ", meaning: "Trợ lý", pos: "Danh từ", emoji: "", example: "助理。", examplePinyin: "zhù lǐ。", exampleVi: "Trợ lý。", topic: "nghe_nghiep" },
  { id: 297, han: "厂长", pinyin: "chǎng zhǎng", meaning: "Xưởng trưởng, giám đốc nhà máy", pos: "Danh từ", emoji: "", example: "厂长。", examplePinyin: "chǎng zhǎng。", exampleVi: "Xưởng trưởng, giám đốc nhà máy。", topic: "nghe_nghiep" },
  { id: 298, han: "员工", pinyin: "yuán gōng", meaning: "Công nhân, nhân viên", pos: "Danh từ", emoji: "", example: "员工。", examplePinyin: "yuán gōng。", exampleVi: "Công nhân, nhân viên。", topic: "nghe_nghiep" },
  { id: 299, han: "人员", pinyin: "rén yuán", meaning: "Nhân viên, nhân sự, người làm việc", pos: "Danh từ", emoji: "", example: "人员。", examplePinyin: "rén yuán。", exampleVi: "Nhân viên, nhân sự, người làm việc。", topic: "nghe_nghiep" },
  { id: 300, han: "海外干部", pinyin: "hǎi wài gàn bù", meaning: "Cán bộ hải ngoại", pos: "Danh từ", emoji: "", example: "海外干部。", examplePinyin: "hǎi wài gàn bù。", exampleVi: "Cán bộ hải ngoại。", topic: "nghe_nghiep" },
  { id: 301, han: "副理", pinyin: "fù lǐ", meaning: "Phó lý (Phó quản lý)", pos: "Danh từ", emoji: "", example: "副理。", examplePinyin: "fù lǐ。", exampleVi: "Phó lý (Phó quản lý)。", topic: "nghe_nghiep" },
  { id: 302, han: "副经理", pinyin: "fù jīng lǐ", meaning: "Phó giám đốc / Phó quản lý", pos: "Danh từ", emoji: "", example: "副经理。", examplePinyin: "fù jīng lǐ。", exampleVi: "Phó giám đốc / Phó quản lý。", topic: "nghe_nghiep" },
  { id: 303, han: "经理", pinyin: "jīng lǐ", meaning: "Giám đốc / Quản lý", pos: "Danh từ", emoji: "", example: "经理。", examplePinyin: "jīng lǐ。", exampleVi: "Giám đốc / Quản lý。", topic: "nghe_nghiep" },
  { id: 304, han: "协理", pinyin: "xié lǐ", meaning: "Hiệp lý (Trợ lý cấp cao của giám đốc)", pos: "Danh từ", emoji: "", example: "协理。", examplePinyin: "xié lǐ。", exampleVi: "Hiệp lý (Trợ lý cấp cao của giám đốc)。", topic: "nghe_nghiep" },
  { id: 305, han: "副总经理", pinyin: "fù zǒng jīng lǐ", meaning: "Phó tổng giám đốc", pos: "Danh từ", emoji: "", example: "副总经理。", examplePinyin: "fù zǒng jīng lǐ。", exampleVi: "Phó tổng giám đốc。", topic: "nghe_nghiep" },
  { id: 306, han: "总经理", pinyin: "zǒng jīng lǐ", meaning: "Tổng giám đốc", pos: "Danh từ", emoji: "", example: "总经理。", examplePinyin: "zǒng jīng lǐ。", exampleVi: "Tổng giám đốc。", topic: "nghe_nghiep" },
  { id: 307, han: "董事长", pinyin: "dǒng shì zhǎng", meaning: "Chủ tịch (HĐQT)", pos: "Danh từ", emoji: "", example: "董事长。", examplePinyin: "dǒng shì zhǎng。", exampleVi: "Chủ tịch (HĐQT)。", topic: "nghe_nghiep" },
  { id: 308, han: "副董事长", pinyin: "fù dǒng shì zhǎng", meaning: "Phó chủ tịch (Hội đồng quản trị)", pos: "Danh từ", emoji: "", example: "副董事长。", examplePinyin: "fù dǒng shì zhǎng。", exampleVi: "Phó chủ tịch (Hội đồng quản trị)。", topic: "nghe_nghiep" },
  // --- Lượng từ ---
  { id: 309, han: "双", pinyin: "shuāng", meaning: "Đôi (cặp)", pos: "Danh từ", emoji: "", example: "双。", examplePinyin: "shuāng。", exampleVi: "Đôi (cặp)。", topic: "luong_tu" },
  // --- Quần áo ---
  { id: 310, han: "鞋子", pinyin: "xié zi", meaning: "Giày", pos: "Danh từ", emoji: "", example: "鞋子。", examplePinyin: "xié zi。", exampleVi: "Giày。", topic: "quan_ao" },
  // --- Số lượng ---
  { id: 311, han: "两百", pinyin: "liǎng bǎi", meaning: "Hai trăm", pos: "Danh từ", emoji: "", example: "两百。", examplePinyin: "liǎng bǎi。", exampleVi: "Hai trăm。", topic: "so_luong" },
  { id: 312, han: "两百零二", pinyin: "liǎng bǎi líng èr", meaning: "Hai trăm lẻ hai (202)", pos: "Danh từ", emoji: "", example: "两百零二。", examplePinyin: "liǎng bǎi líng èr。", exampleVi: "Hai trăm lẻ hai (202)。", topic: "so_luong" },
  // --- Công việc ---
  { id: 313, han: "申请", pinyin: "shēn qǐng", meaning: "Xin phép, đăng ký, nộp đơn", pos: "Danh từ", emoji: "", example: "申请。", examplePinyin: "shēn qǐng。", exampleVi: "Xin phép, đăng ký, nộp đơn。", topic: "cong_viec" },
  // --- Giao tiếp ---
  { id: 314, han: "回答", pinyin: "huí dá", meaning: "Trả lời", pos: "Động từ", emoji: "", example: "回答。", examplePinyin: "huí dá。", exampleVi: "Trả lời。", topic: "giao_tiep" },
  // --- Thời gian ---
  { id: 315, han: "二零二六", pinyin: "èr líng èr liù", meaning: "2026 (cách đọc năm)", pos: "Danh từ", emoji: "", example: "二零二六。", examplePinyin: "èr líng èr liù。", exampleVi: "2026 (cách đọc năm)。", topic: "thoi_gian" },
  // --- Số lượng ---
  { id: 316, han: "幺", pinyin: "yāo", meaning: "Số 1 khi đọc dãy số (điện thoại, biển số, mã số...)", pos: "Danh từ", emoji: "", example: "幺。", examplePinyin: "yāo。", exampleVi: "Số 1 khi đọc dãy số (điện thoại, biển số, mã số...)。", topic: "so_luong" },
  // --- Tiền bạc ---
  { id: 317, han: "赚钱", pinyin: "zhuàn qián", meaning: "Kiếm tiền", pos: "Danh từ", emoji: "", example: "赚钱。", examplePinyin: "zhuàn qián。", exampleVi: "Kiếm tiền。", topic: "tien_bac" },
  // --- Miêu tả ---
  { id: 318, han: "甜", pinyin: "tián", meaning: "Ngọt", pos: "Danh từ", emoji: "", example: "甜。", examplePinyin: "tián。", exampleVi: "Ngọt。", topic: "mieu_ta" },
  { id: 319, han: "辣", pinyin: "là", meaning: "Cay", pos: "Danh từ", emoji: "", example: "辣。", examplePinyin: "là。", exampleVi: "Cay。", topic: "mieu_ta" },
  { id: 320, han: "容易", pinyin: "róng yì", meaning: "Dễ", pos: "Tính từ", emoji: "", example: "容易。", examplePinyin: "róng yì。", exampleVi: "Dễ。", topic: "mieu_ta" },
  { id: 321, han: "难", pinyin: "nán", meaning: "Khó", pos: "Tính từ", emoji: "", example: "难。", examplePinyin: "nán。", exampleVi: "Khó。", topic: "mieu_ta" },
  // --- Thời gian ---
  { id: 322, han: "后天", pinyin: "hòu tiān", meaning: "Ngày kia (ngày sau ngày mai)", pos: "Danh từ", emoji: "", example: "后天。", examplePinyin: "hòu tiān。", exampleVi: "Ngày kia (ngày sau ngày mai)。", topic: "thoi_gian" },
  { id: 323, han: "前天", pinyin: "qián tiān", meaning: "Hôm kia (ngày trước hôm qua)", pos: "Danh từ", emoji: "", example: "前天。", examplePinyin: "qián tiān。", exampleVi: "Hôm kia (ngày trước hôm qua)。", topic: "thoi_gian" },
  // --- Chào hỏi ---
  { id: 324, han: "周末愉快！", pinyin: "zhōu mò yú kuài!", meaning: "Chúc cuối tuần vui vẻ!", pos: "Tính từ", emoji: "", example: "周末愉快！。", examplePinyin: "zhōu mò yú kuài!。", exampleVi: "Chúc cuối tuần vui vẻ!。", topic: "chao_hoi" },
  { id: 325, han: "生日快乐！", pinyin: "shēng rì kuài lè!", meaning: "Chúc mừng sinh nhật!", pos: "Tính từ", emoji: "", example: "生日快乐！。", examplePinyin: "shēng rì kuài lè!。", exampleVi: "Chúc mừng sinh nhật!。", topic: "chao_hoi" },
  { id: 326, han: "新年快乐！", pinyin: "xīn nián kuài lè!", meaning: "Chúc mừng năm mới!", pos: "Tính từ", emoji: "", example: "新年快乐！。", examplePinyin: "xīn nián kuài lè!。", exampleVi: "Chúc mừng năm mới!。", topic: "chao_hoi" },
  { id: 327, han: "早上好！", pinyin: "zǎo shàng hǎo!", meaning: "Chào buổi sáng!", pos: "Tính từ", emoji: "", example: "早上好！。", examplePinyin: "zǎo shàng hǎo!。", exampleVi: "Chào buổi sáng!。", topic: "chao_hoi" },
  { id: 328, han: "晚上好！", pinyin: "wǎn shàng hǎo!", meaning: "Chào buổi tối!", pos: "Tính từ", emoji: "", example: "晚上好！。", examplePinyin: "wǎn shàng hǎo!。", exampleVi: "Chào buổi tối!。", topic: "chao_hoi" },
  { id: 329, han: "晚安！", pinyin: "wǎn ān!", meaning: "Chúc ngủ ngon!", pos: "Danh từ", emoji: "", example: "晚安！。", examplePinyin: "wǎn ān!。", exampleVi: "Chúc ngủ ngon!。", topic: "chao_hoi" },
  // --- Địa điểm ---
  { id: 330, han: "超市", pinyin: "chāo shì", meaning: "Siêu thị", pos: "Danh từ", emoji: "", example: "超市。", examplePinyin: "chāo shì。", exampleVi: "Siêu thị。", topic: "ia_iem" },
  { id: 331, han: "饭馆", pinyin: "fàn guǎn", meaning: "Quán ăn, nhà hàng nhỏ", pos: "Danh từ", emoji: "", example: "饭馆。", examplePinyin: "fàn guǎn。", exampleVi: "Quán ăn, nhà hàng nhỏ。", topic: "ia_iem" },
  // --- Mua sắm ---
  { id: 332, han: "便宜一点吧！", pinyin: "pián yi yì diǎn ba!", meaning: "Giảm một chút đi! (Làm ơn bớt giá một chút.)", pos: "Tính từ", emoji: "", example: "便宜一点吧！。", examplePinyin: "pián yi yì diǎn ba!。", exampleVi: "Giảm một chút đi! (Làm ơn bớt giá một chút.)。", topic: "mua_sam" },
  // --- Ngữ pháp ---
  { id: 333, han: "要", pinyin: "yào", meaning: "Cần, muốn", pos: "Danh từ", emoji: "", example: "要。", examplePinyin: "yào。", exampleVi: "Cần, muốn。", topic: "ngu_phap" },
  // --- Thời gian ---
  { id: 334, han: "晚", pinyin: "wǎn", meaning: "Muộn, trễ", pos: "Danh từ", emoji: "", example: "晚。", examplePinyin: "wǎn。", exampleVi: "Muộn, trễ。", topic: "thoi_gian" },
  // --- Đồ ăn ---
  { id: 335, han: "面条", pinyin: "miàn tiáo", meaning: "Mì sợi", pos: "Danh từ", emoji: "", example: "面条。", examplePinyin: "miàn tiáo。", exampleVi: "Mì sợi。", topic: "o_an" },
  { id: 336, han: "面包", pinyin: "miàn bāo", meaning: "Bánh mì", pos: "Danh từ", emoji: "", example: "面包。", examplePinyin: "miàn bāo。", exampleVi: "Bánh mì。", topic: "o_an" },
  { id: 337, han: "馒头", pinyin: "mán tou", meaning: "Màn thầu", pos: "Danh từ", emoji: "", example: "馒头。", examplePinyin: "mán tou。", exampleVi: "Màn thầu。", topic: "o_an" },
  { id: 338, han: "饺子", pinyin: "jiǎo zi", meaning: "Há cảo, sủi cảo", pos: "Danh từ", emoji: "", example: "饺子。", examplePinyin: "jiǎo zi。", exampleVi: "Há cảo, sủi cảo。", topic: "o_an" },
  // --- Đồ uống ---
  { id: 339, han: "奶茶", pinyin: "nǎi chá", meaning: "Trà sữa", pos: "Danh từ", emoji: "", example: "奶茶。", examplePinyin: "nǎi chá。", exampleVi: "Trà sữa。", topic: "o_uong" },
  // --- Công việc ---
  { id: 340, han: "厂商", pinyin: "chǎng shāng", meaning: "Nhà sản xuất, nhà cung cấp", pos: "Danh từ", emoji: "", example: "厂商。", examplePinyin: "chǎng shāng。", exampleVi: "Nhà sản xuất, nhà cung cấp。", topic: "cong_viec" },
  { id: 341, han: "外包", pinyin: "wài bāo", meaning: "Thuê ngoài (outsourcing)", pos: "Danh từ", emoji: "", example: "外包。", examplePinyin: "wài bāo。", exampleVi: "Thuê ngoài (outsourcing)。", topic: "cong_viec" },
  { id: 342, han: "备注", pinyin: "bèi zhù", meaning: "Ghi chú", pos: "Danh từ", emoji: "", example: "备注。", examplePinyin: "bèi zhù。", exampleVi: "Ghi chú。", topic: "cong_viec" },
  // --- Học tập ---
  { id: 343, han: "记得", pinyin: "jì de", meaning: "Nhớ (nhớ lại việc gì hoặc ai đó)", pos: "Động từ", emoji: "", example: "记得。", examplePinyin: "jì de。", exampleVi: "Nhớ (nhớ lại việc gì hoặc ai đó)。", topic: "hoc_tap" },
  { id: 344, han: "记住", pinyin: "jì zhù", meaning: "Ghi nhớ, nhớ kỹ", pos: "Động từ", emoji: "", example: "记住。", examplePinyin: "jì zhù。", exampleVi: "Ghi nhớ, nhớ kỹ。", topic: "hoc_tap" },
  // --- Hành động ---
  { id: 345, han: "继续", pinyin: "jì xù", meaning: "Tiếp tục", pos: "Động từ", emoji: "", example: "继续。", examplePinyin: "jì xù。", exampleVi: "Tiếp tục。", topic: "hanh_ong" },
  // --- Đồ uống ---
  { id: 346, han: "啤酒", pinyin: "pí jiǔ", meaning: "Bia", pos: "Danh từ", emoji: "", example: "啤酒。", examplePinyin: "pí jiǔ。", exampleVi: "Bia。", topic: "o_uong" },
  // --- Miêu tả ---
  { id: 347, han: "醉", pinyin: "zuì", meaning: "Say", pos: "Danh từ", emoji: "", example: "醉。", examplePinyin: "zuì。", exampleVi: "Say。", topic: "mieu_ta" },
  // --- Giao tiếp ---
  { id: 348, han: "不醉不回", pinyin: "bù zuì bù huí", meaning: "Không say không về", pos: "Danh từ", emoji: "", example: "不醉不回。", examplePinyin: "bù zuì bù huí。", exampleVi: "Không say không về。", topic: "giao_tiep" },
  // --- Tiền bạc ---
  { id: 349, han: "人民币", pinyin: "rén mín bì", meaning: "Nhân dân tệ (CNY)", pos: "Danh từ", emoji: "", example: "人民币。", examplePinyin: "rén mín bì。", exampleVi: "Nhân dân tệ (CNY)。", topic: "tien_bac" },
  { id: 350, han: "越南盾", pinyin: "Yuè Nán dùn", meaning: "Việt Nam đồng (VND)", pos: "Danh từ", emoji: "", example: "越南盾。", examplePinyin: "Yuè Nán dùn。", exampleVi: "Việt Nam đồng (VND)。", topic: "tien_bac" },
  // --- Lượng từ ---
  { id: 351, han: "斤", pinyin: "jīn", meaning: "½ kg (500 g)", pos: "Danh từ", emoji: "", example: "斤。", examplePinyin: "jīn。", exampleVi: "½ kg (500 g)。", topic: "luong_tu" },
  { id: 352, han: "公斤", pinyin: "gōng jīn", meaning: "1 kg (1.000 g)", pos: "Danh từ", emoji: "", example: "公斤。", examplePinyin: "gōng jīn。", exampleVi: "1 kg (1.000 g)。", topic: "luong_tu" },
  // --- Học tập ---
  { id: 353, han: "忘了", pinyin: "wàng le", meaning: "Quên rồi", pos: "Trợ từ", emoji: "", example: "忘了。", examplePinyin: "wàng le。", exampleVi: "Quên rồi。", topic: "hoc_tap" },
  // --- Cơ thể ---
  { id: 354, han: "左脚", pinyin: "zuǒ jiǎo", meaning: "Chân trái", pos: "Danh từ", emoji: "", example: "左脚。", examplePinyin: "zuǒ jiǎo。", exampleVi: "Chân trái。", topic: "co_the" },
  // --- Vị trí ---
  { id: 355, han: "上面", pinyin: "shàng miàn", meaning: "Bên trên", pos: "Danh từ", emoji: "", example: "上面。", examplePinyin: "shàng miàn。", exampleVi: "Bên trên。", topic: "vi_tri" },
  { id: 356, han: "下面", pinyin: "xià miàn", meaning: "Bên dưới", pos: "Danh từ", emoji: "", example: "下面。", examplePinyin: "xià miàn。", exampleVi: "Bên dưới。", topic: "vi_tri" },
  { id: 357, han: "外面", pinyin: "wài miàn", meaning: "Bên ngoài", pos: "Danh từ", emoji: "", example: "外面。", examplePinyin: "wài miàn。", exampleVi: "Bên ngoài。", topic: "vi_tri" },
  // --- Đồ dùng ---
  { id: 358, han: "柜子", pinyin: "guì zi", meaning: "Cái tủ", pos: "Danh từ", emoji: "", example: "柜子。", examplePinyin: "guì zi。", exampleVi: "Cái tủ。", topic: "o_dung" },
  { id: 359, han: "架子", pinyin: "jià zi", meaning: "Kệ, giá đỡ", pos: "Danh từ", emoji: "", example: "架子。", examplePinyin: "jià zi。", exampleVi: "Kệ, giá đỡ。", topic: "o_dung" },
  { id: 360, han: "凳子", pinyin: "dèng zi", meaning: "Ghế đẩu (không tựa)", pos: "Danh từ", emoji: "", example: "凳子。", examplePinyin: "dèng zi。", exampleVi: "Ghế đẩu (không tựa)。", topic: "o_dung" },
  // --- Vị trí ---
  { id: 361, han: "对面", pinyin: "duì miàn", meaning: "Đối diện", pos: "Tính từ", emoji: "", example: "对面。", examplePinyin: "duì miàn。", exampleVi: "Đối diện。", topic: "vi_tri" },
  // --- Nghề nghiệp ---
  { id: 362, han: "保安", pinyin: "bǎo ān", meaning: "Bảo vệ", pos: "Danh từ", emoji: "", example: "保安。", examplePinyin: "bǎo ān。", exampleVi: "Bảo vệ。", topic: "nghe_nghiep" },
  // --- Hành động ---
  { id: 363, han: "面对", pinyin: "miàn duì", meaning: "Đối mặt (với khó khăn, vấn đề...)", pos: "Tính từ", emoji: "", example: "面对。", examplePinyin: "miàn duì。", exampleVi: "Đối mặt (với khó khăn, vấn đề...)。", topic: "hanh_ong" },
  // --- Vị trí ---
  { id: 364, han: "公司里面", pinyin: "gōng sī lǐ miàn", meaning: "Bên trong công ty", pos: "Danh từ", emoji: "", example: "公司里面。", examplePinyin: "gōng sī lǐ miàn。", exampleVi: "Bên trong công ty。", topic: "vi_tri" },
  { id: 365, han: "公司外面", pinyin: "gōng sī wài miàn", meaning: "Bên ngoài công ty", pos: "Danh từ", emoji: "", example: "公司外面。", examplePinyin: "gōng sī wài miàn。", exampleVi: "Bên ngoài công ty。", topic: "vi_tri" },
  // --- Hành động ---
  { id: 366, han: "上楼", pinyin: "shàng lóu", meaning: "Đi lên lầu", pos: "Danh từ", emoji: "", example: "上楼。", examplePinyin: "shàng lóu。", exampleVi: "Đi lên lầu。", topic: "hanh_ong" },
  { id: 367, han: "下楼", pinyin: "xià lóu", meaning: "Đi xuống lầu", pos: "Danh từ", emoji: "", example: "下楼。", examplePinyin: "xià lóu。", exampleVi: "Đi xuống lầu。", topic: "hanh_ong" },
  // --- Vị trí ---
  { id: 368, han: "楼上", pinyin: "lóu shàng", meaning: "Trên lầu", pos: "Danh từ", emoji: "", example: "楼上。", examplePinyin: "lóu shàng。", exampleVi: "Trên lầu。", topic: "vi_tri" },
  // --- Giao tiếp ---
  { id: 369, han: "小心一点", pinyin: "xiǎo xīn yì diǎn", meaning: "Cẩn thận một chút", pos: "Tính từ", emoji: "", example: "小心一点。", examplePinyin: "xiǎo xīn yì diǎn。", exampleVi: "Cẩn thận một chút。", topic: "giao_tiep" },
  // --- Học tập ---
  { id: 370, han: "慢慢学", pinyin: "màn màn xué", meaning: "Từ từ học", pos: "Tính từ", emoji: "", example: "慢慢学。", examplePinyin: "màn màn xué。", exampleVi: "Từ từ học。", topic: "hoc_tap" },
  // --- Miêu tả ---
  { id: 371, han: "很慢", pinyin: "hěn màn", meaning: "Rất chậm", pos: "Tính từ", emoji: "", example: "很慢。", examplePinyin: "hěn màn。", exampleVi: "Rất chậm。", topic: "mieu_ta" },
  { id: 372, han: "很快", pinyin: "hěn kuài", meaning: "Rất nhanh", pos: "Tính từ", emoji: "", example: "很快。", examplePinyin: "hěn kuài。", exampleVi: "Rất nhanh。", topic: "mieu_ta" },
  // --- Đồ dùng ---
  { id: 373, han: "计算机", pinyin: "jì suàn jī", meaning: "Máy tính", pos: "Danh từ", emoji: "", example: "计算机。", examplePinyin: "jì suàn jī。", exampleVi: "Máy tính。", topic: "o_dung" },
  // --- Hành động ---
  { id: 374, han: "打字", pinyin: "dǎ zì", meaning: "Đánh máy, đánh chữ", pos: "Động từ", emoji: "", example: "打字。", examplePinyin: "dǎ zì。", exampleVi: "Đánh máy, đánh chữ。", topic: "hanh_ong" },
  { id: 375, han: "打开", pinyin: "dǎ kāi", meaning: "Mở ra", pos: "Động từ", emoji: "", example: "打开。", examplePinyin: "dǎ kāi。", exampleVi: "Mở ra。", topic: "hanh_ong" },
  { id: 376, han: "回收", pinyin: "huí shōu", meaning: "Tái chế, thu hồi", pos: "Danh từ", emoji: "", example: "回收。", examplePinyin: "huí shōu。", exampleVi: "Tái chế, thu hồi。", topic: "hanh_ong" },
  // --- Học tập ---
  { id: 377, han: "意义", pinyin: "yì yì", meaning: "Ý nghĩa", pos: "Danh từ", emoji: "", example: "意义。", examplePinyin: "yì yì。", exampleVi: "Ý nghĩa。", topic: "hoc_tap" },
  // --- Đồ dùng ---
  { id: 378, han: "纸箱", pinyin: "zhǐ xiāng", meaning: "Thùng giấy", pos: "Danh từ", emoji: "", example: "纸箱。", examplePinyin: "zhǐ xiāng。", exampleVi: "Thùng giấy。", topic: "o_dung" },
  // --- Học tập ---
  { id: 379, han: "一张纸", pinyin: "yì zhāng zhǐ", meaning: "Một tờ giấy", pos: "Danh từ", emoji: "", example: "一张纸。", examplePinyin: "yì zhāng zhǐ。", exampleVi: "Một tờ giấy。", topic: "hoc_tap" },
  // --- Lượng từ ---
  { id: 380, han: "只", pinyin: "zhī", meaning: "Lượng từ dùng cho động vật, một số vật thể đơn chiếc", pos: "Danh từ", emoji: "", example: "只。", examplePinyin: "zhī。", exampleVi: "Lượng từ dùng cho động vật, một số vật thể đơn chiếc。", topic: "luong_tu" },
  // --- Động vật ---
  { id: 381, han: "一只小狗", pinyin: "yì zhī xiǎo gǒu", meaning: "Một con chó nhỏ", pos: "Tính từ", emoji: "", example: "一只小狗。", examplePinyin: "yì zhī xiǎo gǒu。", exampleVi: "Một con chó nhỏ。", topic: "ong_vat" },
  // --- Tiền bạc ---
  { id: 382, han: "一块都没有", pinyin: "yí kuài dōu méi yǒu", meaning: "Không có một đồng nào; Không còn một xu nào", pos: "Danh từ", emoji: "", example: "一块都没有。", examplePinyin: "yí kuài dōu méi yǒu。", exampleVi: "Không có một đồng nào; Không còn một xu nào。", topic: "tien_bac" },
  // --- Ngữ pháp ---
  { id: 383, han: "打算", pinyin: "dǎ suàn", meaning: "Dự tính, dự định", pos: "Động từ", emoji: "", example: "打算。", examplePinyin: "dǎ suàn。", exampleVi: "Dự tính, dự định。", topic: "ngu_phap" },
  // --- Từ để hỏi ---
  { id: 384, han: "什么时候", pinyin: "shén me shí hou", meaning: "Khi nào", pos: "Danh từ", emoji: "", example: "什么时候。", examplePinyin: "shén me shí hou。", exampleVi: "Khi nào。", topic: "tu_e_hoi" },
  // --- Thời gian ---
  { id: 385, han: "礼拜", pinyin: "lǐ bài", meaning: "Thứ, tuần (cách nói thông dụng)", pos: "Danh từ", emoji: "", example: "礼拜。", examplePinyin: "lǐ bài。", exampleVi: "Thứ, tuần (cách nói thông dụng)。", topic: "thoi_gian" },
  { id: 386, han: "上周", pinyin: "shàng zhōu", meaning: "Tuần trước", pos: "Danh từ", emoji: "", example: "上周。", examplePinyin: "shàng zhōu。", exampleVi: "Tuần trước。", topic: "thoi_gian" },
  { id: 387, han: "下周", pinyin: "xià zhōu", meaning: "Tuần sau", pos: "Danh từ", emoji: "", example: "下周。", examplePinyin: "xià zhōu。", exampleVi: "Tuần sau。", topic: "thoi_gian" },
  { id: 388, han: "一个星期", pinyin: "yí gè xīng qī", meaning: "Một tuần", pos: "Danh từ", emoji: "", example: "一个星期。", examplePinyin: "yí gè xīng qī。", exampleVi: "Một tuần。", topic: "thoi_gian" },
  // --- Ngữ pháp ---
  { id: 389, han: "可以", pinyin: "kě yǐ", meaning: "Có thể (được phép, điều kiện khách quan cho phép)", pos: "Danh từ", emoji: "", example: "可以。", examplePinyin: "kě yǐ。", exampleVi: "Có thể (được phép, điều kiện khách quan cho phép)。", topic: "ngu_phap" },
  { id: 390, han: "有可能", pinyin: "yǒu kě néng", meaning: "Có khả năng", pos: "Động từ", emoji: "", example: "有可能。", examplePinyin: "yǒu kě néng。", exampleVi: "Có khả năng。", topic: "ngu_phap" },
  // --- Giao tiếp ---
  { id: 391, han: "星期五前能回家吗？", pinyin: "xīng qī wǔ qián néng huí jiā ma?", meaning: "Có thể về nhà trước thứ Sáu không?", pos: "Động từ", emoji: "", example: "星期五前能回家吗？。", examplePinyin: "xīng qī wǔ qián néng huí jiā ma?。", exampleVi: "Có thể về nhà trước thứ Sáu không?。", topic: "giao_tiep" },
  // --- Thời gian ---
  { id: 392, han: "有时候", pinyin: "yǒu shí hou", meaning: "Có lúc, đôi khi", pos: "Danh từ", emoji: "", example: "有时候。", examplePinyin: "yǒu shí hou。", exampleVi: "Có lúc, đôi khi。", topic: "thoi_gian" },
  { id: 393, han: "常常", pinyin: "cháng cháng", meaning: "Thường thường", pos: "Danh từ", emoji: "", example: "常常。", examplePinyin: "cháng cháng。", exampleVi: "Thường thường。", topic: "thoi_gian" },
  { id: 394, han: "经常", pinyin: "jīng cháng", meaning: "Thường xuyên", pos: "Danh từ", emoji: "", example: "经常。", examplePinyin: "jīng cháng。", exampleVi: "Thường xuyên。", topic: "thoi_gian" },
  // --- Miêu tả ---
  { id: 395, han: "正常", pinyin: "zhèng cháng", meaning: "Bình thường", pos: "Danh từ", emoji: "", example: "正常。", examplePinyin: "zhèng cháng。", exampleVi: "Bình thường。", topic: "mieu_ta" },
  // --- Thời gian ---
  { id: 396, han: "目前", pinyin: "mù qián", meaning: "Hiện tại", pos: "Danh từ", emoji: "", example: "目前。", examplePinyin: "mù qián。", exampleVi: "Hiện tại。", topic: "thoi_gian" },
  // --- Địa điểm ---
  { id: 397, han: "地点", pinyin: "dì diǎn", meaning: "Địa điểm", pos: "Danh từ", emoji: "", example: "地点。", examplePinyin: "dì diǎn。", exampleVi: "Địa điểm。", topic: "ia_iem" },
  { id: 398, han: "收货地点", pinyin: "shōu huò dì diǎn", meaning: "Địa điểm nhận hàng", pos: "Danh từ", emoji: "", example: "收货地点。", examplePinyin: "shōu huò dì diǎn。", exampleVi: "Địa điểm nhận hàng。", topic: "ia_iem" },
  { id: 399, han: "发货地点", pinyin: "fā huò dì diǎn", meaning: "Địa điểm phát hàng, gửi hàng", pos: "Danh từ", emoji: "", example: "发货地点。", examplePinyin: "fā huò dì diǎn。", exampleVi: "Địa điểm phát hàng, gửi hàng。", topic: "ia_iem" },
  // --- Nghề nghiệp ---
  { id: 400, han: "领料员", pinyin: "lǐng liào yuán", meaning: "Người lãnh liệu", pos: "Danh từ", emoji: "", example: "领料员。", examplePinyin: "lǐng liào yuán。", exampleVi: "Người lãnh liệu。", topic: "nghe_nghiep" },
  { id: 401, han: "发料员", pinyin: "fā liào yuán", meaning: "Người phát liệu", pos: "Danh từ", emoji: "", example: "发料员。", examplePinyin: "fā liào yuán。", exampleVi: "Người phát liệu。", topic: "nghe_nghiep" },
  // --- Thời gian ---
  { id: 402, han: "十一点半", pinyin: "shí yī diǎn bàn", meaning: "11 giờ rưỡi", pos: "Danh từ", emoji: "", example: "十一点半。", examplePinyin: "shí yī diǎn bàn。", exampleVi: "11 giờ rưỡi。", topic: "thoi_gian" },
  { id: 403, han: "两点", pinyin: "liǎng diǎn", meaning: "2 giờ", pos: "Danh từ", emoji: "", example: "两点。", examplePinyin: "liǎng diǎn。", exampleVi: "2 giờ。", topic: "thoi_gian" },
  // --- Hành động ---
  { id: 404, han: "开始", pinyin: "kāi shǐ", meaning: "Bắt đầu", pos: "Động từ", emoji: "", example: "开始。", examplePinyin: "kāi shǐ。", exampleVi: "Bắt đầu。", topic: "hanh_ong" },
  { id: 405, han: "结束", pinyin: "jié shù", meaning: "Kết thúc", pos: "Động từ", emoji: "", example: "结束。", examplePinyin: "jié shù。", exampleVi: "Kết thúc。", topic: "hanh_ong" },
  // --- Giao tiếp ---
  { id: 406, han: "我的天啊！", pinyin: "wǒ de tiān a!", meaning: "Trời ơi!", pos: "Trợ từ", emoji: "", example: "我的天啊！。", examplePinyin: "wǒ de tiān a!。", exampleVi: "Trời ơi!。", topic: "giao_tiep" },
  { id: 407, han: "我来", pinyin: "wǒ lái", meaning: "Để tôi (làm)", pos: "Động từ", emoji: "", example: "我来。", examplePinyin: "wǒ lái。", exampleVi: "Để tôi (làm)。", topic: "giao_tiep" },
  // --- Trái cây ---
  { id: 408, han: "西瓜", pinyin: "xī guā", meaning: "Dưa hấu", pos: "Danh từ", emoji: "", example: "西瓜。", examplePinyin: "xī guā。", exampleVi: "Dưa hấu。", topic: "trai_cay" },
  { id: 409, han: "樱桃", pinyin: "yīng táo", meaning: "Cherry", pos: "Danh từ", emoji: "", example: "樱桃。", examplePinyin: "yīng táo。", exampleVi: "Cherry。", topic: "trai_cay" },
  { id: 410, han: "菠萝蜜", pinyin: "bō luó mì", meaning: "Mít", pos: "Danh từ", emoji: "", example: "菠萝蜜。", examplePinyin: "bō luó mì。", exampleVi: "Mít。", topic: "trai_cay" },
  // --- Đồ ăn ---
  { id: 411, han: "多吃", pinyin: "duō chī", meaning: "Ăn nhiều", pos: "Động từ", emoji: "", example: "多吃。", examplePinyin: "duō chī。", exampleVi: "Ăn nhiều。", topic: "o_an" },
  // --- Đồ uống ---
  { id: 412, han: "多喝", pinyin: "duō hē", meaning: "Uống nhiều", pos: "Động từ", emoji: "", example: "多喝。", examplePinyin: "duō hē。", exampleVi: "Uống nhiều。", topic: "o_uong" },
  // --- Đồ ăn ---
  { id: 413, han: "吃多", pinyin: "chī duō", meaning: "Ăn nhiều (ít dùng hơn, nhấn mạnh \"ăn quá nhiều\")", pos: "Động từ", emoji: "", example: "吃多。", examplePinyin: "chī duō。", exampleVi: "Ăn nhiều (ít dùng hơn, nhấn mạnh \"ăn quá nhiều\")。", topic: "o_an" },
  // --- Đồ uống ---
  { id: 414, han: "喝多", pinyin: "hē duō", meaning: "Uống nhiều (thường hiểu là uống quá nhiều, nhất là rượu bia)", pos: "Động từ", emoji: "", example: "喝多。", examplePinyin: "hē duō。", exampleVi: "Uống nhiều (thường hiểu là uống quá nhiều, nhất là rượu bia)。", topic: "o_uong" },
  // --- Thông tin cá nhân ---
  { id: 415, han: "电话号码", pinyin: "diàn huà hào mǎ", meaning: "Số điện thoại", pos: "Danh từ", emoji: "", example: "电话号码。", examplePinyin: "diàn huà hào mǎ。", exampleVi: "Số điện thoại。", topic: "thong_tin_ca_nhan" },
  // --- Địa điểm ---
  { id: 416, han: "电影院", pinyin: "diàn yǐng yuàn", meaning: "Rạp chiếu phim", pos: "Danh từ", emoji: "", example: "电影院。", examplePinyin: "diàn yǐng yuàn。", exampleVi: "Rạp chiếu phim。", topic: "ia_iem" },
  // --- Cảm xúc ---
  { id: 417, han: "好讨厌", pinyin: "hǎo tǎo yàn", meaning: "Rất ghét", pos: "Tính từ", emoji: "", example: "好讨厌。", examplePinyin: "hǎo tǎo yàn。", exampleVi: "Rất ghét。", topic: "cam_xuc" },
  { id: 418, han: "最讨厌", pinyin: "zuì tǎo yàn", meaning: "Ghét nhất", pos: "Danh từ", emoji: "", example: "最讨厌。", examplePinyin: "zuì tǎo yàn。", exampleVi: "Ghét nhất。", topic: "cam_xuc" },
  { id: 419, han: "最喜欢", pinyin: "zuì xǐ huān", meaning: "Thích nhất", pos: "Động từ", emoji: "", example: "最喜欢。", examplePinyin: "zuì xǐ huān。", exampleVi: "Thích nhất。", topic: "cam_xuc" },
  // --- Công việc ---
  { id: 420, han: "送工艺", pinyin: "sòng gōng yì", meaning: "Gửi công nghệ (quy trình công nghệ)", pos: "Động từ", emoji: "", example: "送工艺。", examplePinyin: "sòng gōng yì。", exampleVi: "Gửi công nghệ (quy trình công nghệ)。", topic: "cong_viec" },
  // --- Giao tiếp ---
  { id: 421, han: "你忙吧！", pinyin: "nǐ máng ba!", meaning: "Bạn làm việc đi!", pos: "Trợ từ", emoji: "", example: "你忙吧！。", examplePinyin: "nǐ máng ba!。", exampleVi: "Bạn làm việc đi!。", topic: "giao_tiep" },
  { id: 422, han: "休息吧！", pinyin: "xiū xi ba!", meaning: "Nghỉ ngơi đi!", pos: "Động từ", emoji: "", example: "休息吧！。", examplePinyin: "xiū xi ba!。", exampleVi: "Nghỉ ngơi đi!。", topic: "giao_tiep" },
  // --- Thời gian ---
  { id: 423, han: "两天", pinyin: "liǎng tiān", meaning: "Hai ngày", pos: "Danh từ", emoji: "", example: "两天。", examplePinyin: "liǎng tiān。", exampleVi: "Hai ngày。", topic: "thoi_gian" },
  // --- Vị trí ---
  { id: 424, han: "弯", pinyin: "wān", meaning: "Cong, uốn; rẽ", pos: "Danh từ", emoji: "", example: "弯。", examplePinyin: "wān。", exampleVi: "Cong, uốn; rẽ。", topic: "vi_tri" },
  // --- Phương tiện & Di chuyển ---
  { id: 425, han: "骑摩托车", pinyin: "qí mótuōchē", meaning: "Lái xe máy", pos: "Động từ", emoji: "", example: "骑摩托车。", examplePinyin: "qí mótuōchē。", exampleVi: "Lái xe máy。", topic: "phuong_tien_and_di_chuyen" },
  // --- Giao tiếp ---
  { id: 426, han: "了解", pinyin: "liǎojiě", meaning: "Hiểu, hiểu rõ", pos: "Trợ từ", emoji: "", example: "了解。", examplePinyin: "liǎojiě。", exampleVi: "Hiểu, hiểu rõ。", topic: "giao_tiep" },
];

// ===== Helpers =====
export const getWordsByTopic = (topic: TopicId): VocabWord[] =>
  VOCAB.filter(w => w.topic === topic);

export const getTopic = (id: TopicId): Topic =>
  TOPICS.find(t => t.id === id) || TOPICS[0];

export const TOTAL_WORDS = VOCAB.length;
