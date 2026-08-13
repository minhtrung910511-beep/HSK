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
  | "Thán từ"
  | "Trạng từ"
  | "Cụm từ"
  | "Giáo từ"
  | "Thành ngữ"
  | "Động từ/Tính từ"
  | "Trạng từ/Tính từ"
  | "Danh từ/Động từ";

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
  // === HSK2 additional topics ===
  | "cong_viec_nha_may"
  | "xa_hoi"
  | "tinh_trang"
  | "tam_ly"
  | "su_kien"
  | "tru_tuong"
  | "giao_dich"
  | "hoat_dong"
  | "giao_tu"
  | "trang_tu"
  | "su_co"
  | "nghe_thuat"
  | "mau_sac"
  | "mon_hoc"
  | "vi_giac"
  | "thuc_pham"
  | "trang_thai"
  | "gia_vi"
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
  // === HSK2 additional topics ===
  { id: "cong_viec_nha_may", name: "Công việc nhà máy", emoji: "🏭", color: "from-slate-500 to-gray-600", description: "" },
  { id: "xa_hoi", name: "Xã hội", emoji: "🏛️", color: "from-stone-400 to-slate-500", description: "" },
  { id: "tinh_trang", name: "Tình trạng", emoji: "📋", color: "from-amber-500 to-yellow-500", description: "" },
  { id: "tam_ly", name: "Tâm lý", emoji: "🧠", color: "from-purple-500 to-violet-500", description: "" },
  { id: "su_kien", name: "Sự kiện", emoji: "📅", color: "from-blue-500 to-indigo-500", description: "" },
  { id: "tru_tuong", name: "Trừu tượng", emoji: "💭", color: "from-gray-400 to-slate-400", description: "" },
  { id: "giao_dich", name: "Giao dịch", emoji: "🤝", color: "from-emerald-500 to-green-500", description: "" },
  { id: "hoat_dong", name: "Hoạt động", emoji: "⚡", color: "from-yellow-400 to-orange-400", description: "" },
  { id: "giao_tu", name: "Giáo từ", emoji: "🙏", color: "from-rose-400 to-pink-400", description: "" },
  { id: "trang_tu", name: "Trạng từ", emoji: "📶", color: "from-cyan-400 to-blue-400", description: "" },
  { id: "su_co", name: "Sự cố", emoji: "⚠️", color: "from-red-400 to-rose-400", description: "" },
  { id: "nghe_thuat", name: "Nghệ thuật", emoji: "🎨", color: "from-fuchsia-400 to-pink-400", description: "" },
  { id: "mau_sac", name: "Màu sắc", emoji: "🌈", color: "from-pink-400 to-purple-400", description: "" },
  { id: "mon_hoc", name: "Môn học", emoji: "📖", color: "from-teal-400 to-cyan-400", description: "" },
  { id: "vi_giac", name: "Vị giác", emoji: "👅", color: "from-orange-400 to-red-400", description: "" },
  { id: "thuc_pham", name: "Thực phẩm", emoji: "🍱", color: "from-amber-400 to-orange-400", description: "" },
  { id: "trang_thai", name: "Trạng thái", emoji: "🔄", color: "from-indigo-400 to-violet-400", description: "" },
  { id: "gia_vi", name: "Gia vị", emoji: "🧂", color: "from-yellow-500 to-amber-500", description: "" },
];
export const VOCAB: VocabWord[] = [
  { id: 1, han: "我", pinyin: "wǒ", meaning: "tôi", pos: "Đại từ", radical: "手", emoji: "", example: "我是越南人。", examplePinyin: "wǒ shì Yuènánrén", exampleVi: "Tôi là người Việt Nam.", topic: "ai_tu_xung_ho" },
  { id: 2, han: "你", pinyin: "nǐ", meaning: "Bạn, anh, chị", pos: "Đại từ", radical: "亻", emoji: "", example: "你叫什么名字？", examplePinyin: "nǐ jiào shénme míngzi", exampleVi: "Bạn tên là gì?", topic: "ai_tu_xung_ho" },
  { id: 3, han: "您", pinyin: "nín", meaning: "ông, bà, ngài (lịch sự)", pos: "Đại từ", radical: "你", emoji: "", example: "您好！", examplePinyin: "nín hǎo", exampleVi: "Xin chào (cách nói lịch sự)!", topic: "ai_tu_xung_ho" },
  { id: 4, han: "他", pinyin: "tā", meaning: "anh ấy", pos: "Đại từ", radical: "亻", emoji: "", example: "他是老师。", examplePinyin: "tā shì lǎoshī", exampleVi: "Anh ấy là giáo viên.", topic: "ai_tu_xung_ho" },
  { id: 5, han: "她", pinyin: "tā", meaning: "cô ấy", pos: "Đại từ", radical: "女", emoji: "", example: "她是学生。", examplePinyin: "tā shì xuéshēng", exampleVi: "Cô ấy là học sinh.", topic: "ai_tu_xung_ho" },
  { id: 6, han: "我们", pinyin: "wǒmen", meaning: "Chúng ta", pos: "Đại từ", radical: "我", emoji: "", example: "我们一起学习。", examplePinyin: "wǒmen yìqǐ xuéxí", exampleVi: "Chúng ta cùng nhau học.", topic: "ai_tu_xung_ho" },
  { id: 7, han: "你们", pinyin: "nǐmen", meaning: "Các anh,các chị, các bạn", pos: "Đại từ", radical: "你", emoji: "", example: "你们好！", examplePinyin: "nǐmen hǎo", exampleVi: "Xin chào mọi người!", topic: "ai_tu_xung_ho" },
  { id: 8, han: "他们", pinyin: "tā men", meaning: "họ (nam)", pos: "Đại từ", radical: "他", emoji: "", example: "他们都是员工。", examplePinyin: "tā men dōu shì yuán gōng", exampleVi: "Họ đều là nhân viên.", topic: "ai_tu_xung_ho" },
  { id: 9, han: "先生", pinyin: "xiānsheng", meaning: "Ông, ngài", pos: "Đại từ", radical: "先", emoji: "", example: "先生，请问您叫什么？", examplePinyin: "xiānsheng qǐngwèn nín jiào shénme", exampleVi: "Thưa ông, xin hỏi ông tên gì?", topic: "ai_tu_xung_ho" },
  { id: 10, han: "小姐", pinyin: "xiǎojiě", meaning: "Tiểu thư", pos: "Đại từ", radical: "小", emoji: "", example: "小姐，请问洗手间在哪里？", examplePinyin: "xiǎojiě qǐngwèn shǒu zàinǎlǐ", exampleVi: "Cô ơi, cho hỏi nhà vệ sinh ở đâu?", topic: "ai_tu_xung_ho" },
  { id: 11, han: "喜欢", pinyin: "xǐhuān", meaning: "Thích", pos: "Tính từ", emoji: "", example: "我喜欢喝茶。", examplePinyin: "wǒxǐhuān hēchá", exampleVi: "Tôi thích uống trà.", topic: "cam_xuc" },
  { id: 12, han: "爱", pinyin: "ài", meaning: "Yêu, thích", pos: "Tính từ", emoji: "", example: "我爱我的家人。", examplePinyin: "wǒ ài wǒde jiā rén", exampleVi: "Tôi yêu gia đình của tôi.", topic: "cam_xuc" },
  { id: 13, han: "开心", pinyin: "kāi xīn", meaning: "Vui", pos: "Tính từ", emoji: "", example: "今天我很开心。", examplePinyin: "jīntiān wǒ hěn kāi xīn", exampleVi: "Hôm nay tôi rất vui.", topic: "cam_xuc" },
  { id: 14, han: "难过", pinyin: "nán guò", meaning: "Buồn", pos: "Tính từ", emoji: "", example: "他今天很难过。", examplePinyin: "tā jīntiān hěnnán guò", exampleVi: "Hôm nay anh ấy rất buồn.", topic: "cam_xuc" },
  { id: 15, han: "讨厌", pinyin: "tǎo yàn", meaning: "Ghét", pos: "Tính từ", emoji: "", example: "我讨厌迟到。", examplePinyin: "wǒ tǎo yàn chídào", exampleVi: "Tôi ghét đi trễ.", topic: "cam_xuc" },
  { id: 16, han: "放心", pinyin: "fàng xīn", meaning: "Yên tâm", pos: "Tính từ", emoji: "", example: "放心吧，我会帮你。", examplePinyin: "fàng xīn ba wǒhuì bāng nǐ", exampleVi: "Yên tâm đi, tôi sẽ giúp bạn.", topic: "cam_xuc" },
  { id: 17, han: "安心", pinyin: "ān xīn", meaning: "An tâm", pos: "Tính từ", emoji: "", example: "你可以安心休息。", examplePinyin: "nǐ kě yǐ ān xīn xiū", exampleVi: "Bạn có thể yên tâm nghỉ ngơi.", topic: "cam_xuc" },
  { id: 18, han: "好讨厌", pinyin: "hǎo tǎo yàn", meaning: "Rất ghét", pos: "Tính từ", emoji: "", example: "这个味道好讨厌。", examplePinyin: "zhège hǎo tǎo yàn", exampleVi: "Mùi này thật khó chịu.", topic: "cam_xuc" },
  { id: 19, han: "最讨厌", pinyin: "zuì tǎo yàn", meaning: "Ghét nhất", pos: "Tính từ", emoji: "", example: "我最讨厌加班。", examplePinyin: "wǒ zuì tǎo yàn jiā bān", exampleVi: "Tôi ghét tăng ca nhất.", topic: "cam_xuc" },
  { id: 20, han: "最喜欢", pinyin: "zuì xǐ huān", meaning: "Thích nhất", pos: "Tính từ", emoji: "", example: "我最喜欢吃西瓜。", examplePinyin: "wǒ zuì xǐ huān chī xī guā", exampleVi: "Tôi thích ăn dưa hấu nhất.", topic: "cam_xuc" },
  { id: 21, han: "你好", pinyin: "nǐ hǎo", meaning: "xin chào", pos: "Thán từ", emoji: "", example: "我学习你好。", examplePinyin: "wǒ xuéxí nǐ hǎo", exampleVi: "Tôi học cách nói “xin chào”.", topic: "chao_hoi" },
  { id: 22, han: "再见", pinyin: "zàijiàn", meaning: "Tạm biệt", pos: "Thán từ", emoji: "", example: "明天再见！", examplePinyin: "míngtiān zàijiàn", exampleVi: "Hẹn gặp lại ngày mai!", topic: "chao_hoi" },
  { id: 23, han: "欢迎", pinyin: "huān yíng", meaning: "hoan nghênh", pos: "Thán từ", emoji: "", example: "我学习欢迎。", examplePinyin: "wǒ xuéxí huān yíng", exampleVi: "Tôi học cách dùng từ “hoan nghênh”.", topic: "chao_hoi" },
  { id: 24, han: "好", pinyin: "hǎo", meaning: "Khỏe, tốt", pos: "Thán từ", emoji: "", example: "我学习好。", examplePinyin: "wǒ xuéxí hǎo", exampleVi: "Tôi học cách dùng từ “tốt/khỏe”.", topic: "chao_hoi" },
  { id: 25, han: "早", pinyin: "zǎo", meaning: "Sớm", pos: "Thán từ", emoji: "", example: "你今天来得很早。", examplePinyin: "nǐ jīntiān lái hěn zǎo", exampleVi: "Hôm nay bạn đến rất sớm.", topic: "chao_hoi" },
  { id: 26, han: "周末愉快！", pinyin: "zhōu mò yú kuài!", meaning: "Chúc cuối tuần vui vẻ!", pos: "Thán từ", emoji: "", example: "周末愉快！", examplePinyin: "zhōumòyúkuài", exampleVi: "Chúc cuối tuần vui vẻ!", topic: "chao_hoi" },
  { id: 27, han: "生日快乐！", pinyin: "shēng rì kuài lè!", meaning: "Chúc mừng sinh nhật!", pos: "Thán từ", emoji: "", example: "祝你生日快乐！", examplePinyin: "zhù nǐ shēngrìkuàilè", exampleVi: "Chúc bạn sinh nhật vui vẻ!", topic: "chao_hoi" },
  { id: 28, han: "新年快乐！", pinyin: "xīn nián kuài lè!", meaning: "Chúc mừng năm mới!", pos: "Thán từ", emoji: "", example: "祝大家新年快乐！", examplePinyin: "zhù dàjiā xīnniánkuàilè", exampleVi: "Chúc mọi người năm mới vui vẻ!", topic: "chao_hoi" },
  { id: 29, han: "早上好！", pinyin: "zǎo shàng hǎo!", meaning: "Chào buổi sáng!", pos: "Thán từ", emoji: "", example: "早上好！", examplePinyin: "zǎoshanghǎo", exampleVi: "Chào buổi sáng!", topic: "chao_hoi" },
  { id: 30, han: "晚上好！", pinyin: "wǎn shàng hǎo!", meaning: "Chào buổi tối!", pos: "Thán từ", emoji: "", example: "晚上好！", examplePinyin: "wǎnshànghǎo", exampleVi: "Chào buổi tối!", topic: "chao_hoi" },
  { id: 31, han: "晚安！", pinyin: "wǎn ān!", meaning: "Chúc ngủ ngon!", pos: "Thán từ", emoji: "", example: "晚安，明天见！", examplePinyin: "wǎn'ān míngtiān jiàn", exampleVi: "Chúc ngủ ngon, hẹn gặp lại ngày mai!", topic: "chao_hoi" },
  { id: 32, han: "头", pinyin: "tóu", meaning: "đầu", pos: "Danh từ", emoji: "", example: "我学习头。", examplePinyin: "wǒ xuéxí tóu", exampleVi: "Tôi học từ “头”.", topic: "co_the" },
  { id: 33, han: "手", pinyin: "shǒu", meaning: "tay", pos: "Danh từ", emoji: "", example: "我学习手。", examplePinyin: "wǒ xuéxí shǒu", exampleVi: "Tôi học từ “手”.", topic: "co_the" },
  { id: 34, han: "脚", pinyin: "jiǎo", meaning: "chân / bàn chân", pos: "Danh từ", emoji: "", example: "我学习脚。", examplePinyin: "wǒ xuéxí jiǎo", exampleVi: "Tôi học từ “脚”.", topic: "co_the" },
  { id: 35, han: "眼睛", pinyin: "yǎn jing", meaning: "mắt", pos: "Danh từ", emoji: "", example: "我学习眼睛。", examplePinyin: "wǒ xuéxí yǎn jing", exampleVi: "Tôi học từ “眼睛”.", topic: "co_the" },
  { id: 36, han: "嘴", pinyin: "zuǐ", meaning: "miệng", pos: "Danh từ", emoji: "", example: "我学习嘴。", examplePinyin: "wǒ xuéxí zuǐ", exampleVi: "Tôi học từ “嘴”.", topic: "co_the" },
  { id: 37, han: "身体", pinyin: "shēntǐ", meaning: "Sức khỏe", pos: "Danh từ", emoji: "", example: "身体很重要。", examplePinyin: "shēntǐ hěn yào", exampleVi: "Sức khỏe rất quan trọng.", topic: "co_the" },
  { id: 38, han: "左脚", pinyin: "zuǒ jiǎo", meaning: "Chân trái", pos: "Danh từ", emoji: "", example: "我的左脚有点疼。", examplePinyin: "wǒde zuǒ jiǎo yǒudiǎn", exampleVi: "Chân trái của tôi hơi đau.", topic: "co_the" },
  { id: 39, han: "自动", pinyin: "zìdòng", meaning: "Tự động", pos: "Danh từ", emoji: "", example: "这台机器是自动的。", examplePinyin: "zhè jī shì zìdòng de", exampleVi: "Cái máy này hoạt động tự động.", topic: "cong_nghe" },
  { id: 40, han: "工作", pinyin: "gōngzuò", meaning: "Làm việc, công việc", pos: "Danh từ", emoji: "", example: "我在公司工作。", examplePinyin: "wǒzài gōng sī gōngzuò", exampleVi: "Tôi làm việc ở công ty.", topic: "cong_viec" },
  { id: 41, han: "上班", pinyin: "shàng bān", meaning: "Vào làm, đi làm", pos: "Danh từ", emoji: "", example: "我八点上班。", examplePinyin: "wǒ bā diǎn shàng bān", exampleVi: "Tôi đi làm lúc 8 giờ.", topic: "cong_viec" },
  { id: 42, han: "下班", pinyin: "xià bān", meaning: "Tan làm", pos: "Danh từ", emoji: "", example: "我五点下班。", examplePinyin: "wǒ wǔ diǎn xià bān", exampleVi: "Tôi tan làm lúc 5 giờ.", topic: "cong_viec" },
  { id: 43, han: "加班", pinyin: "jiā bān", meaning: "Tăng ca, làm thêm giờ", pos: "Danh từ", emoji: "", example: "今天我要加班。", examplePinyin: "jīntiān wǒyào jiā bān", exampleVi: "Hôm nay tôi phải tăng ca.", topic: "cong_viec" },
  { id: 44, han: "休年假", pinyin: "xiū nián jià", meaning: "Nghỉ phép năm", pos: "Danh từ", emoji: "", example: "我下个月休年假。", examplePinyin: "wǒ xià gè yuè xiū nián jià", exampleVi: "Tháng sau tôi nghỉ phép năm.", topic: "cong_viec" },
  { id: 45, han: "申请", pinyin: "shēn qǐng", meaning: "Xin phép, đăng ký, nộp đơn", pos: "Danh từ", emoji: "", example: "我已经提交申请。", examplePinyin: "wǒ jīng jiāo shēn qǐng", exampleVi: "Tôi đã nộp đơn.", topic: "cong_viec" },
  { id: 46, han: "厂商", pinyin: "chǎng shāng", meaning: "Nhà sản xuất, nhà cung cấp", pos: "Danh từ", emoji: "", example: "厂商正在确认订单。", examplePinyin: "chǎng shāng zhèng zài", exampleVi: "Nhà cung cấp đang xác nhận đơn hàng.", topic: "cong_viec" },
  { id: 47, han: "外包", pinyin: "wài bāo", meaning: "Thuê ngoài (outsourcing)", pos: "Danh từ", emoji: "", example: "这个工作是外包的。", examplePinyin: "zhège gōngzuò shì wài bāo de", exampleVi: "Công việc này được thuê ngoài.", topic: "cong_viec" },
  { id: 48, han: "备注", pinyin: "bèi zhù", meaning: "Ghi chú", pos: "Danh từ", emoji: "", example: "请在备注里写清楚。", examplePinyin: "qǐng zài bèi zhù lǐ xiě", exampleVi: "Vui lòng ghi rõ trong phần ghi chú.", topic: "cong_viec" },
  { id: 49, han: "送工艺", pinyin: "sòng gōng yì", meaning: "Gửi công nghệ (quy trình công nghệ)", pos: "Danh từ", emoji: "", example: "请把工艺文件送给我。", examplePinyin: "qǐng gōng sòng gěi wǒ", exampleVi: "Vui lòng gửi tài liệu quy trình công nghệ cho tôi.", topic: "cong_viec" },
  { id: 50, han: "爸爸", pinyin: "bàba", meaning: "cha, bố", pos: "Danh từ", emoji: "", example: "我爸爸在家。", examplePinyin: "wǒ bàba zài jiā", exampleVi: "Bố tôi ở nhà.", topic: "gia_inh" },
  { id: 51, han: "妈妈", pinyin: "māma", meaning: "Mẹ", pos: "Danh từ", emoji: "", example: "我妈妈会做菜。", examplePinyin: "wǒ māma huì zuòcài", exampleVi: "Mẹ tôi biết nấu ăn.", topic: "gia_inh" },
  { id: 52, han: "哥哥", pinyin: "gē ge", meaning: "anh trai", pos: "Danh từ", emoji: "", example: "我认识哥哥。", examplePinyin: "wǒ rèn shi gē ge", exampleVi: "Tôi quen anh trai.", topic: "gia_inh" },
  { id: 53, han: "弟弟", pinyin: "dì di", meaning: "em trai", pos: "Danh từ", emoji: "", example: "我认识弟弟。", examplePinyin: "wǒ rèn shi dì di", exampleVi: "Tôi quen em trai.", topic: "gia_inh" },
  { id: 54, han: "姐姐", pinyin: "jiě jie", meaning: "chị gái", pos: "Danh từ", emoji: "", example: "我认识姐姐。", examplePinyin: "wǒ rèn shi jiě jie", exampleVi: "Tôi quen chị gái.", topic: "gia_inh" },
  { id: 55, han: "妹妹", pinyin: "mèi mei", meaning: "em gái", pos: "Danh từ", emoji: "", example: "我认识妹妹。", examplePinyin: "wǒ rèn shi mèi mei", exampleVi: "Tôi quen em gái.", topic: "gia_inh" },
  { id: 56, han: "儿子", pinyin: "érzi", meaning: "Con trai", pos: "Danh từ", emoji: "", example: "我儿子四岁。", examplePinyin: "wǒ érzi sì suì", exampleVi: "Con trai tôi 4 tuổi.", topic: "gia_inh" },
  { id: 57, han: "女儿", pinyin: "nǚ’ér", meaning: "Con gái", pos: "Danh từ", emoji: "", example: "我女儿四岁。", examplePinyin: "wǒ nǚ’ér sì suì", exampleVi: "Con gái tôi 4 tuổi.", topic: "gia_inh" },
  { id: 58, han: "家庭", pinyin: "jiā tíng", meaning: "Gia đình", pos: "Danh từ", emoji: "", example: "我的家庭很幸福。", examplePinyin: "wǒde jiā tíng hěn", exampleVi: "Gia đình tôi rất hạnh phúc.", topic: "gia_inh" },
  { id: 59, han: "家人", pinyin: "jiā rén", meaning: "Người nhà, người thân", pos: "Danh từ", emoji: "", example: "我爱我的家人。", examplePinyin: "wǒ ài wǒde jiā rén", exampleVi: "Tôi yêu gia đình của tôi.", topic: "gia_inh" },
  { id: 60, han: "电视", pinyin: "diànshì", meaning: "Tivi", pos: "Danh từ", emoji: "", example: "我晚上看电视。", examplePinyin: "wǒ wǎn shàng kàn diànshì", exampleVi: "Buổi tối tôi xem TV.", topic: "giai_tri" },
  { id: 61, han: "电影", pinyin: "diànyǐng", meaning: "Phim", pos: "Danh từ", emoji: "", example: "我们去电影院看电影。", examplePinyin: "wǒmen qù diàn yǐng yuàn kàndiànyǐng", exampleVi: "Chúng tôi đi rạp chiếu phim xem phim.", topic: "giai_tri" },
  { id: 62, han: "谢谢", pinyin: "xièxie", meaning: "Cảm ơn", pos: "Động từ", emoji: "", example: "谢谢你的帮助。", examplePinyin: "xièxie nǐde bāng zhù", exampleVi: "Cảm ơn sự giúp đỡ của bạn.", topic: "giao_tiep" },
  { id: 63, han: "不客气", pinyin: "bùkèqi", meaning: "Đừng khách sáo", pos: "Động từ", emoji: "", example: "不客气。", examplePinyin: "búkèqi", exampleVi: "Không có gì.", topic: "giao_tiep" },
  { id: 64, han: "对不起", pinyin: "duìbùqǐ", meaning: "Xin lỗi", pos: "Động từ", emoji: "", example: "对不起，我迟到了。", examplePinyin: "duìbuqǐ wǒ chídàole", exampleVi: "Xin lỗi, tôi đến muộn.", topic: "giao_tiep" },
  { id: 65, han: "没关系", pinyin: "méiguānxi", meaning: "Không sao, không có gì", pos: "Động từ", emoji: "", example: "没关系，慢慢来。", examplePinyin: "méiguānxi mànmànlái", exampleVi: "Không sao, cứ từ từ.", topic: "giao_tiep" },
  { id: 66, han: "请", pinyin: "qǐng", meaning: "Xin, mời", pos: "Động từ", emoji: "", example: "他说：“请。”", examplePinyin: "tāshuō qǐng", exampleVi: "Anh ấy nói: “Xin/mời.”", topic: "giao_tiep" },
  { id: 67, han: "说", pinyin: "shuō", meaning: "nói", pos: "Động từ", emoji: "", example: "他说：“说。”", examplePinyin: "tāshuō shuō", exampleVi: "Anh ấy nói: “Nói đi.”", topic: "giao_tiep" },
  { id: 68, han: "知道", pinyin: "zhī dào", meaning: "Biết", pos: "Động từ", emoji: "", example: "他说：“知道。”", examplePinyin: "tāshuō zhī dào", exampleVi: "Anh ấy nói: “Biết rồi.”", topic: "giao_tiep" },
  { id: 69, han: "问", pinyin: "wèn", meaning: "Hỏi", pos: "Động từ", emoji: "", example: "他说：“问。”", examplePinyin: "tāshuō wèn", exampleVi: "Anh ấy nói: “Hỏi đi.”", topic: "giao_tiep" },
  { id: 70, han: "答", pinyin: "dá", meaning: "Trả lời", pos: "Động từ", emoji: "", example: "他说：“答。”", examplePinyin: "tāshuō dá", exampleVi: "Anh ấy nói: “Trả lời đi.”", topic: "giao_tiep" },
  { id: 71, han: "还好", pinyin: "hái hǎo", meaning: "Cũng tốt", pos: "Động từ", emoji: "", example: "他说：“还好。”", examplePinyin: "tāshuō hái hǎo", exampleVi: "Anh ấy nói: “Cũng ổn.”", topic: "giao_tiep" },
  { id: 72, han: "还可以", pinyin: "hái kěyǐ", meaning: "Cũng tạm, cũng được, khá ổn", pos: "Động từ", emoji: "", example: "他说：“还可以。”", examplePinyin: "tāshuō hái kěyǐ", exampleVi: "Anh ấy nói: “Cũng được.”", topic: "giao_tiep" },
  { id: 73, han: "差不多", pinyin: "chàbuduō", meaning: "Cũng cũng", pos: "Động từ", emoji: "", example: "差不多到了。", examplePinyin: "chàbuduō le", exampleVi: "Gần đến rồi.", topic: "giao_tiep" },
  { id: 74, han: "喂", pinyin: "wèi", meaning: "A lô, này", pos: "Động từ", emoji: "", example: "喂，你好！", examplePinyin: "wèi nǐ hǎo", exampleVi: "A lô, xin chào!", topic: "giao_tiep" },
  { id: 75, han: "打电话", pinyin: "dǎ diànhuà", meaning: "Gọi điện thoại", pos: "Động từ", emoji: "", example: "我给妈妈打电话。", examplePinyin: "wǒ gěi māma dǎdiànhuà", exampleVi: "Tôi gọi điện cho mẹ.", topic: "giao_tiep" },
  { id: 76, han: "回答", pinyin: "huí dá", meaning: "Trả lời", pos: "Động từ", emoji: "", example: "他说：“回答。”", examplePinyin: "tāshuō huí dá", exampleVi: "Anh ấy nói: “Trả lời đi.”", topic: "giao_tiep" },
  { id: 77, han: "不醉不回", pinyin: "bù zuì bù huí", meaning: "Không say không về", pos: "Động từ", emoji: "", example: "今天不醉不回！", examplePinyin: "jīntiān búzuìbùhuí", exampleVi: "Hôm nay không say không về!", topic: "giao_tiep" },
  { id: 78, han: "小心一点", pinyin: "xiǎo xīn yì diǎn", meaning: "Cẩn thận một chút", pos: "Động từ", emoji: "", example: "走路小心一点！", examplePinyin: "zǒu lù xiǎoxīnyìdiǎn", exampleVi: "Đi đường cẩn thận một chút!", topic: "giao_tiep" },
  { id: 79, han: "星期五前能回家吗？", pinyin: "xīng qī wǔ qián néng huí jiā ma?", meaning: "Có thể về nhà trước thứ Sáu không?", pos: "Động từ", emoji: "", example: "你星期五前能回家吗？", examplePinyin: "nǐ xīngqīwǔqián nénghuíjiāma", exampleVi: "Bạn có thể về nhà trước thứ Sáu không?", topic: "giao_tiep" },
  { id: 80, han: "我的天啊！", pinyin: "wǒ de tiān a!", meaning: "Trời ơi!", pos: "Động từ", emoji: "", example: "我的天啊！这么贵！", examplePinyin: "wǒdetiān'a zhè me guì", exampleVi: "Trời ơi! Đắt thế!", topic: "giao_tiep" },
  { id: 81, han: "我来", pinyin: "wǒ lái", meaning: "Để tôi (làm)", pos: "Động từ", emoji: "", example: "我来帮你。", examplePinyin: "wǒ lái bāng nǐ", exampleVi: "Để tôi giúp bạn.", topic: "giao_tiep" },
  { id: 82, han: "你忙吧！", pinyin: "nǐ máng ba!", meaning: "Bạn làm việc đi!", pos: "Động từ", emoji: "", example: "你忙吧，我先走了。", examplePinyin: "nǐ máng ba wǒ xiān zǒu le", exampleVi: "Bạn cứ làm việc đi, tôi đi trước.", topic: "giao_tiep" },
  { id: 83, han: "休息吧！", pinyin: "xiū xi ba!", meaning: "Nghỉ ngơi đi!", pos: "Động từ", emoji: "", example: "累了就休息吧！", examplePinyin: "le xiū ba", exampleVi: "Mệt thì nghỉ đi!", topic: "giao_tiep" },
  { id: 84, han: "了解", pinyin: "liǎojiě", meaning: "Hiểu, hiểu rõ", pos: "Động từ", emoji: "", example: "我了解你的意思。", examplePinyin: "wǒ liǎojiě nǐde yì", exampleVi: "Tôi hiểu ý của bạn.", topic: "giao_tiep" },
  { id: 85, han: "叫", pinyin: "jiào", meaning: "gọi, kêu", pos: "Động từ", emoji: "", example: "我叫小明。", examplePinyin: "wǒ jiào xiǎo míng", exampleVi: "Tôi tên là Tiểu Minh.", topic: "gioi_thieu_ban_than" },
  { id: 86, han: "吃", pinyin: "chī", meaning: "ăn", pos: "Động từ", emoji: "", example: "我们一起吃饭吧。", examplePinyin: "wǒmen yìqǐ chīfàn ba", exampleVi: "Chúng ta cùng ăn cơm nhé.", topic: "hanh_ong" },
  { id: 87, han: "喝", pinyin: "hē", meaning: "uống", pos: "Động từ", emoji: "", example: "我喜欢喝茶。", examplePinyin: "wǒxǐhuān hēchá", exampleVi: "Tôi thích uống trà.", topic: "hanh_ong" },
  { id: 88, han: "看", pinyin: "kàn", meaning: "Nhìn, xem", pos: "Động từ", emoji: "", example: "我喜欢看电影。", examplePinyin: "wǒxǐhuān kàndiànyǐng", exampleVi: "Tôi thích xem phim.", topic: "hanh_ong" },
  { id: 89, han: "听", pinyin: "tīng", meaning: "nghe", pos: "Động từ", emoji: "", example: "我会听。", examplePinyin: "wǒhuì tīng", exampleVi: "Tôi biết nghe.", topic: "hanh_ong" },
  { id: 90, han: "写", pinyin: "xiě", meaning: "viết", pos: "Động từ", emoji: "", example: "我会写汉字。", examplePinyin: "wǒhuì xiě hànzì", exampleVi: "Tôi biết viết chữ Hán.", topic: "hanh_ong" },
  { id: 91, han: "做", pinyin: "zuò", meaning: "làm", pos: "Động từ", emoji: "", example: "我会做饭。", examplePinyin: "wǒhuì zuòfàn", exampleVi: "Tôi biết nấu ăn.", topic: "hanh_ong" },
  { id: 92, han: "来", pinyin: "lái", meaning: "Đến, tới", pos: "Động từ", emoji: "", example: "你什么时候来？", examplePinyin: "nǐ shén me shí hou lái", exampleVi: "Khi nào bạn đến?", topic: "hanh_ong" },
  { id: 93, han: "去", pinyin: "qù", meaning: "đi", pos: "Động từ", emoji: "", example: "我去学校。", examplePinyin: "wǒ qù xuéxiào", exampleVi: "Tôi đi đến trường.", topic: "hanh_ong" },
  { id: 94, han: "坐", pinyin: "zuò", meaning: "ngồi", pos: "Động từ", emoji: "", example: "请坐这里。", examplePinyin: "qǐng zuò zhè lǐ", exampleVi: "Mời ngồi ở đây.", topic: "hanh_ong" },
  { id: 95, han: "站", pinyin: "zhàn", meaning: "đứng", pos: "Động từ", emoji: "", example: "我会站。", examplePinyin: "wǒhuì zhàn", exampleVi: "Tôi biết đứng.", topic: "hanh_ong" },
  { id: 96, han: "走", pinyin: "zǒu", meaning: "đi bộ", pos: "Động từ", emoji: "", example: "我会走。", examplePinyin: "wǒhuì zǒu", exampleVi: "Tôi biết đi bộ.", topic: "hanh_ong" },
  { id: 97, han: "住", pinyin: "zhù", meaning: "Ở, cư trú", pos: "Động từ", emoji: "", example: "我住在越南。", examplePinyin: "wǒ zhù zài Yuènán", exampleVi: "Tôi sống ở Việt Nam.", topic: "hanh_ong" },
  { id: 98, han: "买", pinyin: "mǎi", meaning: "mua", pos: "Động từ", emoji: "", example: "我想买鞋子。", examplePinyin: "wǒxiǎng mǎi xié zi", exampleVi: "Tôi muốn mua giày.", topic: "hanh_ong" },
  { id: 99, han: "卖", pinyin: "mài", meaning: "bán", pos: "Động từ", emoji: "", example: "这家店卖水果。", examplePinyin: "zhè jiā diàn mài shuíguǒ", exampleVi: "Cửa hàng này bán trái cây.", topic: "hanh_ong" },
  { id: 100, han: "教", pinyin: "jiāo", meaning: "dạy", pos: "Động từ", emoji: "", example: "我会教。", examplePinyin: "wǒhuì jiāo", exampleVi: "Tôi biết dạy.", topic: "hanh_ong" },
  { id: 101, han: "认识", pinyin: "rèn shi", meaning: "biết / quen / nhận thức", pos: "Động từ", emoji: "", example: "我会认识。", examplePinyin: "wǒhuì rèn shi", exampleVi: "Tôi biết làm quen/nhận biết.", topic: "hanh_ong" },
  { id: 102, han: "猫", pinyin: "māo", meaning: "Con mèo", pos: "Danh từ", emoji: "", example: "我学习猫。", examplePinyin: "wǒ xuéxí māo", exampleVi: "Tôi học từ “mèo”.", topic: "ong_vat" },
  { id: 103, han: "那儿", pinyin: "nàr", meaning: "Đó, nơi đó", pos: "Danh từ", emoji: "", example: "我在那儿。", examplePinyin: "wǒzài nàr", exampleVi: "Tôi ở đó.", topic: "ia_iem" },
  { id: 104, han: "狗", pinyin: "gǒu", meaning: "con chó", pos: "Danh từ", emoji: "", example: "我喜欢小狗。", examplePinyin: "wǒxǐhuān xiǎo gǒu", exampleVi: "Tôi thích chó con.", topic: "ong_vat" },
  { id: 105, han: "回", pinyin: "huí", meaning: "Về, trở về", pos: "Động từ", emoji: "", example: "我晚上回家。", examplePinyin: "wǒ wǎn shàng huíjiā", exampleVi: "Buổi tối tôi về nhà.", topic: "hanh_ong" },
  { id: 106, han: "睡觉", pinyin: "shuì jiào", meaning: "Đi ngủ", pos: "Động từ", emoji: "", example: "我晚上十点睡觉。", examplePinyin: "wǒ wǎn shàng shí diǎn shuìjiào", exampleVi: "Tôi đi ngủ lúc 10 giờ tối.", topic: "hanh_ong" },
  { id: 107, han: "送", pinyin: "sòng", meaning: "Tặng, gửi", pos: "Động từ", emoji: "", example: "我送你回家。", examplePinyin: "wǒ sòng nǐ huíjiā", exampleVi: "Tôi đưa bạn về nhà.", topic: "hanh_ong" },
  { id: 108, han: "看见", pinyin: "kànjiàn", meaning: "Nhìn thấy", pos: "Động từ", emoji: "", example: "我看见他了。", examplePinyin: "wǒ kànjiàn tā le", exampleVi: "Tôi nhìn thấy anh ấy rồi.", topic: "hanh_ong" },
  { id: 109, han: "开", pinyin: "kāi", meaning: "Mở", pos: "Động từ", emoji: "", example: "请开门。", examplePinyin: "qǐng kāi", exampleVi: "Vui lòng mở cửa.", topic: "hanh_ong" },
  { id: 110, han: "关", pinyin: "guān", meaning: "Đóng", pos: "Động từ", emoji: "", example: "请关门。", examplePinyin: "qǐng guān", exampleVi: "Vui lòng đóng cửa.", topic: "hanh_ong" },
  { id: 111, han: "回来", pinyin: "huílai", meaning: "Quay lại", pos: "Động từ", emoji: "", example: "你什么时候回来？", examplePinyin: "nǐ shén me shí hou huílai", exampleVi: "Khi nào bạn trở lại?", topic: "hanh_ong" },
  { id: 112, han: "骑", pinyin: "qí", meaning: "Cưỡi, lái xe (moto,…)", pos: "Động từ", emoji: "", example: "我会骑自行车。", examplePinyin: "wǒhuì qí zì xíng chē", exampleVi: "Tôi biết đi xe đạp.", topic: "hanh_ong" },
  { id: 113, han: "穿", pinyin: "chuān", meaning: "Đeo; mặc; mang (giày, tất)", pos: "Động từ", emoji: "", example: "今天很冷，要穿衣服。", examplePinyin: "jīntiān hěnlěng yào chuān yīfu", exampleVi: "Hôm nay rất lạnh, phải mặc quần áo.", topic: "hanh_ong" },
  { id: 114, han: "脱", pinyin: "tuō", meaning: "Cởi ra; bỏ ra", pos: "Động từ", emoji: "", example: "进屋以后请脱鞋。", examplePinyin: "hòu qǐng tuō", exampleVi: "Sau khi vào phòng, vui lòng cởi giày.", topic: "hanh_ong" },
  { id: 115, han: "继续", pinyin: "jì xù", meaning: "Tiếp tục", pos: "Động từ", emoji: "", example: "请继续学习。", examplePinyin: "qǐng jì xù xuéxí", exampleVi: "Hãy tiếp tục học.", topic: "hanh_ong" },
  { id: 116, han: "面对", pinyin: "miàn duì", meaning: "Đối mặt (với khó khăn, vấn đề...)", pos: "Động từ", emoji: "", example: "我们要面对问题。", examplePinyin: "wǒmen yào miàn duì wèn", exampleVi: "Chúng ta phải đối mặt với vấn đề.", topic: "hanh_ong" },
  { id: 117, han: "上楼", pinyin: "shàng lóu", meaning: "Đi lên lầu", pos: "Động từ", emoji: "", example: "我们一起上楼。", examplePinyin: "wǒmen yìqǐ shàng lóu", exampleVi: "Chúng ta cùng lên lầu.", topic: "hanh_ong" },
  { id: 118, han: "下楼", pinyin: "xià lóu", meaning: "Đi xuống lầu", pos: "Động từ", emoji: "", example: "请慢慢下楼。", examplePinyin: "qǐng màn màn xià lóu", exampleVi: "Vui lòng từ từ xuống lầu.", topic: "hanh_ong" },
  { id: 119, han: "打字", pinyin: "dǎ zì", meaning: "Đánh máy, đánh chữ", pos: "Động từ", emoji: "", example: "我会打字。", examplePinyin: "wǒhuì dǎ zì", exampleVi: "Tôi biết gõ chữ.", topic: "hanh_ong" },
  { id: 120, han: "打开", pinyin: "dǎ kāi", meaning: "Mở ra", pos: "Động từ", emoji: "", example: "请打开电脑。", examplePinyin: "qǐng dǎ kāi diànnǎo", exampleVi: "Vui lòng mở máy tính.", topic: "hanh_ong" },
  { id: 121, han: "回收", pinyin: "huí shōu", meaning: "Tái chế, thu hồi", pos: "Động từ", emoji: "", example: "请回收纸箱。", examplePinyin: "qǐng huí shōu zhǐ xiāng", exampleVi: "Vui lòng thu hồi thùng giấy.", topic: "hanh_ong" },
  { id: 122, han: "开始", pinyin: "kāi shǐ", meaning: "Bắt đầu", pos: "Động từ", emoji: "", example: "现在开始学习。", examplePinyin: "xiànzài kāi shǐ xuéxí", exampleVi: "Bây giờ bắt đầu học.", topic: "hanh_ong" },
  { id: 123, han: "结束", pinyin: "jié shù", meaning: "Kết thúc", pos: "Động từ", emoji: "", example: "会议几点结束？", examplePinyin: "huì jǐdiǎn jié shù", exampleVi: "Cuộc họp mấy giờ kết thúc?", topic: "hanh_ong" },
  { id: 124, han: "书", pinyin: "shū", meaning: "sách", pos: "Động từ", emoji: "", example: "我在看书。", examplePinyin: "wǒzài kàn shū", exampleVi: "Tôi đang đọc sách.", topic: "hoc_tap" },
  { id: 125, han: "纸", pinyin: "zhǐ", meaning: "giấy", pos: "Động từ", emoji: "", example: "桌子上有一张纸。", examplePinyin: "zhuōzi shàng yǒu yì zhāng zhǐ", exampleVi: "Trên bàn có một tờ giấy.", topic: "hoc_tap" },
  { id: 126, han: "读", pinyin: "dú", meaning: "đọc", pos: "Động từ", emoji: "", example: "请跟我读。", examplePinyin: "qǐng wǒ dú", exampleVi: "Hãy đọc theo tôi.", topic: "hoc_tap" },
  { id: 127, han: "学习", pinyin: "xuéxí", meaning: "Học", pos: "Động từ", emoji: "", example: "我每天学习汉语。", examplePinyin: "wǒměitiān xuéxí Hànyǔ", exampleVi: "Mỗi ngày tôi học tiếng Trung.", topic: "hoc_tap" },
  { id: 128, han: "汉字", pinyin: "hànzì", meaning: "Hán tự", pos: "Động từ", emoji: "", example: "我在学习汉字。", examplePinyin: "wǒzài xuéxí hànzì", exampleVi: "Tôi đang học chữ Hán.", topic: "hoc_tap" },
  { id: 129, han: "字", pinyin: "zì", meaning: "Chữ", pos: "Động từ", emoji: "", example: "这个字怎么读？", examplePinyin: "zhège zì zěnme dú", exampleVi: "Chữ này đọc thế nào?", topic: "hoc_tap" },
  { id: 130, han: "记得", pinyin: "jì de", meaning: "Nhớ (nhớ lại việc gì hoặc ai đó)", pos: "Động từ", emoji: "", example: "记得带雨伞。", examplePinyin: "jì de dài yǔsǎn", exampleVi: "Nhớ mang ô.", topic: "hoc_tap" },
  { id: 131, han: "记住", pinyin: "jì zhù", meaning: "Ghi nhớ, nhớ kỹ", pos: "Động từ", emoji: "", example: "请记住这个字。", examplePinyin: "qǐng jì zhù zhège zì", exampleVi: "Hãy nhớ chữ này.", topic: "hoc_tap" },
  { id: 132, han: "忘了", pinyin: "wàng le", meaning: "Quên rồi", pos: "Động từ", emoji: "", example: "我学习忘了。", examplePinyin: "wǒ xuéxí wàng le", exampleVi: "Tôi học từ “quên”.", topic: "hoc_tap" },
  { id: 133, han: "慢慢学", pinyin: "màn màn xué", meaning: "Từ từ học", pos: "Động từ", emoji: "", example: "不要着急，慢慢学。", examplePinyin: "búyào màn màn xué", exampleVi: "Đừng vội, cứ từ từ học.", topic: "hoc_tap" },
  { id: 134, han: "意义", pinyin: "yì yì", meaning: "Ý nghĩa", pos: "Động từ", emoji: "", example: "学习很有意义。", examplePinyin: "xuéxí hěn yǒu yì yì", exampleVi: "Học tập rất có ý nghĩa.", topic: "hoc_tap" },
  { id: 135, han: "一张纸", pinyin: "yì zhāng zhǐ", meaning: "Một tờ giấy", pos: "Động từ", emoji: "", example: "请给我一张纸。", examplePinyin: "qǐng gěi wǒ yì zhāng zhǐ", exampleVi: "Vui lòng đưa cho tôi một tờ giấy.", topic: "hoc_tap" },
  { id: 136, han: "医院", pinyin: "yīyuàn", meaning: "Bệnh viện", pos: "Danh từ", emoji: "", example: "医院在学校旁边。", examplePinyin: "yīyuàn zài xuéxiào pángbiān", exampleVi: "Bệnh viện ở bên cạnh trường học.", topic: "ia_iem" },
  { id: 137, han: "商店", pinyin: "shāngdiàn", meaning: "Cửa hàng", pos: "Danh từ", emoji: "", example: "这家商店很大。", examplePinyin: "zhè jiā shāngdiàn hěn dà", exampleVi: "Cửa hàng này rất lớn.", topic: "ia_iem" },
  { id: 138, han: "饭店", pinyin: "fàn diàn", meaning: "nhà hàng", pos: "Danh từ", emoji: "", example: "我在饭店。", examplePinyin: "wǒzài fàn diàn", exampleVi: "Tôi ở nhà hàng.", topic: "ia_iem" },
  { id: 139, han: "房间", pinyin: "fáng jiān", meaning: "phòng", pos: "Danh từ", emoji: "", example: "我在房间。", examplePinyin: "wǒzài fáng jiān", exampleVi: "Tôi ở trong phòng.", topic: "ia_iem" },
  { id: 140, han: "里", pinyin: "lǐ", meaning: "trong / bên trong", pos: "Danh từ", emoji: "", example: "他在里。", examplePinyin: "tā zài lǐ", exampleVi: "Anh ấy ở bên trong.", topic: "vi_tri" },
  { id: 141, han: "这儿", pinyin: "zhèr", meaning: "Chỗ này, ở đây", pos: "Danh từ", emoji: "", example: "你坐这儿吧。", examplePinyin: "nǐ zuò zhèr ba", exampleVi: "Bạn ngồi đây đi.", topic: "ia_iem" },
  { id: 142, han: "超市", pinyin: "chāo shì", meaning: "Siêu thị", pos: "Danh từ", emoji: "", example: "我去超市买东西。", examplePinyin: "wǒ qù chāo shì mǎi dōngxi", exampleVi: "Tôi đi siêu thị mua đồ.", topic: "ia_iem" },
  { id: 143, han: "饭馆", pinyin: "fàn guǎn", meaning: "Quán ăn, nhà hàng nhỏ", pos: "Danh từ", emoji: "", example: "我们在饭馆吃饭。", examplePinyin: "wǒmen zài fàn guǎn chīfàn", exampleVi: "Chúng tôi ăn cơm ở nhà hàng.", topic: "ia_iem" },
  { id: 144, han: "地点", pinyin: "dì diǎn", meaning: "Địa điểm", pos: "Danh từ", emoji: "", example: "请告诉我地点。", examplePinyin: "qǐng wǒ dì diǎn", exampleVi: "Vui lòng cho tôi biết địa điểm.", topic: "ia_iem" },
  { id: 145, han: "收货地点", pinyin: "shōu huò dì diǎn", meaning: "Địa điểm nhận hàng", pos: "Danh từ", emoji: "", example: "请确认收货地点。", examplePinyin: "qǐng shōu huò dì diǎn", exampleVi: "Vui lòng xác nhận địa điểm nhận hàng.", topic: "ia_iem" },
  { id: 146, han: "发货地点", pinyin: "fā huò dì diǎn", meaning: "Địa điểm phát hàng, gửi hàng", pos: "Danh từ", emoji: "", example: "请确认发货地点。", examplePinyin: "qǐng fā huò dì diǎn", exampleVi: "Vui lòng xác nhận địa điểm gửi hàng.", topic: "ia_iem" },
  { id: 147, han: "电影院", pinyin: "diàn yǐng yuàn", meaning: "Rạp chiếu phim", pos: "Danh từ", emoji: "", example: "我们去电影院看电影。", examplePinyin: "wǒmen qù diàn yǐng yuàn kàndiànyǐng", exampleVi: "Chúng tôi đi rạp chiếu phim xem phim.", topic: "ia_iem" },
  { id: 148, han: "个", pinyin: "gè", meaning: "Cái", pos: "Lượng từ", emoji: "", example: "我买了一个杯子。", examplePinyin: "wǒ mǎi le yíge bēizi", exampleVi: "Tôi đã mua một cái cốc.", topic: "luong_tu" },
  { id: 149, han: "口", pinyin: "kǒu", meaning: "Lượng từ chỉ người", pos: "Lượng từ", emoji: "", example: "我有一个口。", examplePinyin: "wǒyǒu yíge kǒu", exampleVi: "Tôi có một cái miệng.", topic: "luong_tu" },
  { id: 150, han: "本", pinyin: "běn", meaning: "Quyển, cuốn", pos: "Lượng từ", emoji: "", example: "我买了两本书。", examplePinyin: "wǒ mǎi le liǎng běn shū", exampleVi: "Tôi đã mua hai quyển sách.", topic: "luong_tu" },
  { id: 151, han: "些", pinyin: "xiē", meaning: "Một it, một vài", pos: "Lượng từ", emoji: "", example: "我买了一些水果。", examplePinyin: "wǒ mǎi le yìxiē shuíguǒ", exampleVi: "Tôi đã mua một ít trái cây.", topic: "luong_tu" },
  { id: 152, han: "双", pinyin: "shuāng", meaning: "Đôi (cặp)", pos: "Lượng từ", emoji: "", example: "我买了一双鞋。", examplePinyin: "wǒ mǎi le yìshuāng", exampleVi: "Tôi đã mua một đôi giày.", topic: "luong_tu" },
  { id: 153, han: "斤", pinyin: "jīn", meaning: "½ kg (500 g)", pos: "Lượng từ", emoji: "", example: "我买了两斤苹果。", examplePinyin: "wǒ mǎi le liǎngjīn píngguǒ", exampleVi: "Tôi đã mua hai cân táo.", topic: "luong_tu" },
  { id: 154, han: "公斤", pinyin: "gōng jīn", meaning: "1 kg (1.000 g)", pos: "Lượng từ", emoji: "", example: "这个包有五公斤。", examplePinyin: "zhège bāo yǒu wǔgōngjīn", exampleVi: "Cái túi này nặng 5 kg.", topic: "luong_tu" },
  { id: 155, han: "只", pinyin: "zhī", meaning: "Lượng từ dùng cho động vật, một số vật thể đơn chiếc", pos: "Lượng từ", emoji: "", example: "我有一只小狗。", examplePinyin: "wǒyǒu yì zhī xiǎo gǒu", exampleVi: "Tôi có một chú chó con.", topic: "luong_tu" },
  { id: 156, han: "坏", pinyin: "huài", meaning: "xấu / hỏng", pos: "Tính từ", emoji: "", example: "这个很坏。", examplePinyin: "zhège hěn huài", exampleVi: "Cái này rất xấu/tệ.", topic: "mieu_ta" },
  { id: 157, han: "大", pinyin: "dà", meaning: "Lớn", pos: "Tính từ", emoji: "", example: "我女儿不大。", examplePinyin: "wǒ nǚ’ér bù dà", exampleVi: "Con gái tôi không lớn.", topic: "mieu_ta" },
  { id: 158, han: "小", pinyin: "xiǎo", meaning: "nhỏ , bé", pos: "Tính từ", emoji: "", example: "这个很小。", examplePinyin: "zhège hěn xiǎo", exampleVi: "Cái này rất nhỏ.", topic: "mieu_ta" },
  { id: 159, han: "少", pinyin: "shǎo", meaning: "Ít, thiếu", pos: "Tính từ", emoji: "", example: "这里人很少。", examplePinyin: "zhè lǐ rén hěn shǎo", exampleVi: "Ở đây có rất ít người.", topic: "mieu_ta" },
  { id: 160, han: "高", pinyin: "gāo", meaning: "cao", pos: "Tính từ", emoji: "", example: "这个很高。", examplePinyin: "zhège hěn gāo", exampleVi: "Cái này rất cao.", topic: "mieu_ta" },
  { id: 161, han: "新", pinyin: "xīn", meaning: "mới", pos: "Tính từ", emoji: "", example: "这个很新。", examplePinyin: "zhège hěn xīn", exampleVi: "Cái này rất mới.", topic: "mieu_ta" },
  { id: 162, han: "旧", pinyin: "jiù", meaning: "cũ", pos: "Tính từ", emoji: "", example: "这个很旧。", examplePinyin: "zhège hěn jiù", exampleVi: "Cái này rất cũ.", topic: "mieu_ta" },
  { id: 163, han: "漂亮", pinyin: "piàoliang", meaning: "Đẹp", pos: "Tính từ", emoji: "", example: "这件衣服很漂亮。", examplePinyin: "zhè yīfu hěn piàoliang", exampleVi: "Bộ quần áo này rất đẹp.", topic: "mieu_ta" },
  { id: 164, han: "贵", pinyin: "guì", meaning: "đắt", pos: "Tính từ", emoji: "", example: "这个很贵。", examplePinyin: "zhège hěn guì", exampleVi: "Cái này rất đắt.", topic: "mieu_ta" },
  { id: 165, han: "便宜", pinyin: "pián yi", meaning: "rẻ", pos: "Tính từ", emoji: "", example: "这个很便宜。", examplePinyin: "zhège hěn pián yi", exampleVi: "Cái này rất rẻ.", topic: "mieu_ta" },
  { id: 166, han: "快", pinyin: "kuài", meaning: "nhanh", pos: "Tính từ", emoji: "", example: "这个很快。", examplePinyin: "zhège hěn kuài", exampleVi: "Cái này rất nhanh.", topic: "mieu_ta" },
  { id: 167, han: "慢", pinyin: "màn", meaning: "chậm", pos: "Tính từ", emoji: "", example: "这个很慢。", examplePinyin: "zhège hěn màn", exampleVi: "Cái này rất chậm.", topic: "mieu_ta" },
  { id: 168, han: "好吃", pinyin: "hǎochī", meaning: "Ngon", pos: "Tính từ", emoji: "", example: "这个很好吃。", examplePinyin: "zhège hěnhǎochī", exampleVi: "Cái này rất ngon.", topic: "mieu_ta" },
  { id: 169, han: "差", pinyin: "chà", meaning: "Kém, không tốt, tệ", pos: "Tính từ", emoji: "", example: "今天的天气很差。", examplePinyin: "jīntiān de tiānqì hěn chà", exampleVi: "Thời tiết hôm nay rất tệ.", topic: "mieu_ta" },
  { id: 170, han: "很差", pinyin: "hěn chà", meaning: "Rất kém", pos: "Tính từ", emoji: "", example: "今天的天气很差。", examplePinyin: "jīntiān de tiānqì hěn chà", exampleVi: "Thời tiết hôm nay rất tệ.", topic: "mieu_ta" },
  { id: 171, han: "甜", pinyin: "tián", meaning: "Ngọt", pos: "Tính từ", emoji: "", example: "这个西瓜很甜。", examplePinyin: "zhège xī guā hěn tián", exampleVi: "Quả dưa hấu này rất ngọt.", topic: "mieu_ta" },
  { id: 172, han: "辣", pinyin: "là", meaning: "Cay", pos: "Tính từ", emoji: "", example: "这个菜有点辣。", examplePinyin: "zhège cài yǒudiǎn là", exampleVi: "Món này hơi cay.", topic: "mieu_ta" },
  { id: 173, han: "容易", pinyin: "róng yì", meaning: "Dễ", pos: "Tính từ", emoji: "", example: "这个问题很容易。", examplePinyin: "zhège wèn hěn róng yì", exampleVi: "Câu hỏi này rất dễ.", topic: "mieu_ta" },
  { id: 174, han: "难", pinyin: "nán", meaning: "Khó", pos: "Tính từ", emoji: "", example: "这个汉字很难。", examplePinyin: "zhège hànzì hěnnán", exampleVi: "Chữ Hán này rất khó.", topic: "mieu_ta" },
  { id: 175, han: "醉", pinyin: "zuì", meaning: "Say", pos: "Tính từ", emoji: "", example: "他喝醉了。", examplePinyin: "tā hē zuì le", exampleVi: "Anh ấy uống say rồi.", topic: "mieu_ta" },
  { id: 176, han: "很慢", pinyin: "hěn màn", meaning: "Rất chậm", pos: "Tính từ", emoji: "", example: "他走得很慢。", examplePinyin: "tā zǒu hěn màn", exampleVi: "Anh ấy đi rất chậm.", topic: "mieu_ta" },
  { id: 177, han: "很快", pinyin: "hěn kuài", meaning: "Rất nhanh", pos: "Tính từ", emoji: "", example: "他跑得很快。", examplePinyin: "tā pǎo hěn kuài", exampleVi: "Anh ấy chạy rất nhanh.", topic: "mieu_ta" },
  { id: 178, han: "正常", pinyin: "zhèng cháng", meaning: "Bình thường", pos: "Tính từ", emoji: "", example: "这样很正常。", examplePinyin: "zhè yàng hěn zhèng cháng", exampleVi: "Như vậy là rất bình thường.", topic: "mieu_ta" },
  { id: 179, han: "朋友", pinyin: "péngyou", meaning: "Bạn bè", pos: "Danh từ", emoji: "", example: "我和朋友一起吃饭。", examplePinyin: "wǒ hé péngyou yìqǐ chīfàn", exampleVi: "Tôi ăn cơm cùng bạn.", topic: "moi_quan_he" },
  { id: 180, han: "便宜一点吧！", pinyin: "pián yi yì diǎn ba!", meaning: "Giảm một chút đi! (Làm ơn bớt giá một chút.)", pos: "Động từ", emoji: "", example: "可以便宜一点吧？", examplePinyin: "kě yǐ pián yi yī diǎn ba", exampleVi: "Có thể bớt rẻ một chút được không?", topic: "mua_sam" },
  { id: 181, han: "孩子", pinyin: "hái zi", meaning: "đứa trẻ / con cái", pos: "Danh từ", emoji: "", example: "我认识孩子。", examplePinyin: "wǒ rèn shi hái zi", exampleVi: "Tôi quen đứa trẻ.", topic: "gia_inh" },
  { id: 182, han: "太太", pinyin: "tài tai", meaning: "bà / phu nhân / vợ", pos: "Danh từ", emoji: "", example: "我认识太太。", examplePinyin: "wǒ rèn shi tài tai", exampleVi: "Tôi quen vợ.", topic: "gia_inh" },
  { id: 183, han: "老师", pinyin: "lǎoshī", meaning: "Giáo viên, thầy giáo, cô giáo", pos: "Danh từ", emoji: "", example: "她是老师。", examplePinyin: "tā shì lǎoshī", exampleVi: "Câu này có nghĩa: Giáo viên, thầy giáo, cô giáo.", topic: "nghe_nghiep" },
  { id: 184, han: "医生", pinyin: "yīshēng", meaning: "Bác sĩ", pos: "Danh từ", emoji: "", example: "医生正在看病人。", examplePinyin: "yīshēng zhèng zài kàn bìngrén", exampleVi: "Bác sĩ đang khám cho bệnh nhân.", topic: "nghe_nghiep" },
  { id: 185, han: "护士", pinyin: "hùshi", meaning: "Y tá", pos: "Danh từ", emoji: "", example: "护士在医院工作。", examplePinyin: "hùshi zài yīyuàn gōngzuò", exampleVi: "Y tá làm việc ở bệnh viện.", topic: "nghe_nghiep" },
  { id: 186, han: "组长", pinyin: "zǔ zhǎng", meaning: "Tổ trưởng", pos: "Danh từ", emoji: "", example: "他是我们的组长。", examplePinyin: "tā shì wǒmen de zǔ zhǎng", exampleVi: "Anh ấy là tổ trưởng của chúng tôi.", topic: "nghe_nghiep" },
  { id: 187, han: "部长", pinyin: "bù zhǎng", meaning: "Trưởng bộ phận, bộ trưởng", pos: "Danh từ", emoji: "", example: "部长正在开会。", examplePinyin: "bù zhǎng zhèng zài kāihuì", exampleVi: "Trưởng bộ phận đang họp.", topic: "nghe_nghiep" },
  { id: 188, han: "助理", pinyin: "zhù lǐ", meaning: "Trợ lý", pos: "Danh từ", emoji: "", example: "她是经理的助理。", examplePinyin: "tā shì jīng lǐ de zhù lǐ", exampleVi: "Cô ấy là trợ lý của quản lý.", topic: "nghe_nghiep" },
  { id: 189, han: "厂长", pinyin: "chǎng zhǎng", meaning: "Xưởng trưởng, giám đốc nhà máy", pos: "Danh từ", emoji: "", example: "厂长今天在公司。", examplePinyin: "chǎng zhǎng jīntiān zài gōng sī", exampleVi: "Hôm nay giám đốc nhà máy ở công ty.", topic: "nghe_nghiep" },
  { id: 190, han: "员工", pinyin: "yuán gōng", meaning: "Công nhân, nhân viên", pos: "Danh từ", emoji: "", example: "我是公司员工。", examplePinyin: "wǒ shì gōng sī yuán gōng", exampleVi: "Tôi là nhân viên công ty.", topic: "nghe_nghiep" },
  { id: 191, han: "人员", pinyin: "rén yuán", meaning: "Nhân viên, nhân sự, người làm việc", pos: "Danh từ", emoji: "", example: "相关人员已经到了。", examplePinyin: "guān rén yuán jīng le", exampleVi: "Nhân viên liên quan đã đến.", topic: "nghe_nghiep" },
  { id: 192, han: "海外干部", pinyin: "hǎi wài gàn bù", meaning: "Cán bộ hải ngoại", pos: "Danh từ", emoji: "", example: "他是海外干部。", examplePinyin: "tā shì hǎi wài gàn bù", exampleVi: "Anh ấy là cán bộ phụ trách ở nước ngoài.", topic: "nghe_nghiep" },
  { id: 193, han: "副理", pinyin: "fù lǐ", meaning: "Phó lý (Phó quản lý)", pos: "Danh từ", emoji: "", example: "副理正在开会。", examplePinyin: "fù lǐ zhèng zài kāihuì", exampleVi: "Phó quản lý đang họp.", topic: "nghe_nghiep" },
  { id: 194, han: "副经理", pinyin: "fù jīng lǐ", meaning: "Phó giám đốc / Phó quản lý", pos: "Danh từ", emoji: "", example: "她是副经理。", examplePinyin: "tā shì fù jīng lǐ", exampleVi: "Cô ấy là phó quản lý.", topic: "nghe_nghiep" },
  { id: 195, han: "经理", pinyin: "jīng lǐ", meaning: "Giám đốc / Quản lý", pos: "Danh từ", emoji: "", example: "经理今天很忙。", examplePinyin: "jīng lǐ jīntiān hěnmáng", exampleVi: "Hôm nay quản lý rất bận.", topic: "nghe_nghiep" },
  { id: 196, han: "协理", pinyin: "xié lǐ", meaning: "Hiệp lý (Trợ lý cấp cao của giám đốc)", pos: "Danh từ", emoji: "", example: "协理下午开会。", examplePinyin: "xié lǐ xiawǔ kāihuì", exampleVi: "Trợ lý cấp cao họp vào buổi chiều.", topic: "nghe_nghiep" },
  { id: 197, han: "副总经理", pinyin: "fù zǒng jīng lǐ", meaning: "Phó tổng giám đốc", pos: "Danh từ", emoji: "", example: "副总经理来了。", examplePinyin: "fù zǒng jīng lǐ lái le", exampleVi: "Phó tổng giám đốc đến rồi.", topic: "nghe_nghiep" },
  { id: 198, han: "总经理", pinyin: "zǒng jīng lǐ", meaning: "Tổng giám đốc", pos: "Danh từ", emoji: "", example: "总经理正在开会。", examplePinyin: "zǒng jīng lǐ zhèng zài kāihuì", exampleVi: "Tổng giám đốc đang họp.", topic: "nghe_nghiep" },
  { id: 199, han: "董事长", pinyin: "dǒng shì zhǎng", meaning: "Chủ tịch (HĐQT)", pos: "Danh từ", emoji: "", example: "董事长今天来公司。", examplePinyin: "dǒng shì zhǎng jīntiān lái gōng sī", exampleVi: "Hôm nay chủ tịch hội đồng quản trị đến công ty.", topic: "nghe_nghiep" },
  { id: 200, han: "副董事长", pinyin: "fù dǒng shì zhǎng", meaning: "Phó chủ tịch (Hội đồng quản trị)", pos: "Danh từ", emoji: "", example: "副董事长也参加了会议。", examplePinyin: "fù dǒng shì zhǎng yě jiā le huì", exampleVi: "Phó chủ tịch hội đồng quản trị cũng tham gia cuộc họp.", topic: "nghe_nghiep" },
  { id: 201, han: "保安", pinyin: "bǎo ān", meaning: "Bảo vệ", pos: "Danh từ", emoji: "", example: "我认识保安。", examplePinyin: "wǒ rèn shi bǎo ān", exampleVi: "Tôi quen nhân viên bảo vệ.", topic: "nghe_nghiep" },
  { id: 202, han: "领料员", pinyin: "lǐng liào yuán", meaning: "Người lãnh liệu", pos: "Danh từ", emoji: "", example: "领料员正在领料。", examplePinyin: "lǐng liào yuán zhèng zài lǐng liào", exampleVi: "Nhân viên lĩnh liệu đang nhận vật liệu.", topic: "nghe_nghiep" },
  { id: 203, han: "发料员", pinyin: "fā liào yuán", meaning: "Người phát liệu", pos: "Danh từ", emoji: "", example: "发料员正在发料。", examplePinyin: "fā liào yuán zhèng zài fā liào", exampleVi: "Nhân viên phát liệu đang cấp phát vật liệu.", topic: "nghe_nghiep" },
  { id: 204, han: "汉语", pinyin: "Hànyǔ", meaning: "Tiếng Trung", pos: "Danh từ", emoji: "", example: "我会说汉语。", examplePinyin: "wǒhuì shuōhànyǔ", exampleVi: "Tôi biết nói tiếng Trung.", topic: "ngon_ngu" },
  { id: 205, han: "是", pinyin: "shì", meaning: "là", pos: "Trợ từ", emoji: "", example: "我是学生。", examplePinyin: "wǒ shì xuéshēng", exampleVi: "Tôi là học sinh.", topic: "ngu_phap" },
  { id: 206, han: "不", pinyin: "bù", meaning: "Không, đừng", pos: "Trợ từ", emoji: "", example: "我不喝酒。", examplePinyin: "wǒ bù hē jiǔ", exampleVi: "Tôi không uống rượu.", topic: "ngu_phap" },
  { id: 207, han: "这", pinyin: "zhè", meaning: "Đây, này", pos: "Trợ từ", emoji: "", example: "这个杯子是我的。", examplePinyin: "zhège bēizi shì wǒde", exampleVi: "Cái cốc này là của tôi.", topic: "ngu_phap" },
  { id: 208, han: "那", pinyin: "nà", meaning: "Kia, đó", pos: "Trợ từ", emoji: "", example: "那个是什么？", examplePinyin: "nàge shì shénme", exampleVi: "Cái kia là gì?", topic: "ngu_phap" },
  { id: 209, han: "想", pinyin: "xiǎng", meaning: "Muốn", pos: "Trợ từ", emoji: "", example: "我想喝茶。", examplePinyin: "wǒxiǎng hēchá", exampleVi: "Tôi muốn uống trà.", topic: "ngu_phap" },
  { id: 210, han: "会", pinyin: "huì", meaning: "Biết", pos: "Trợ từ", emoji: "", example: "我会说汉语。", examplePinyin: "wǒhuì shuōhànyǔ", exampleVi: "Tôi biết nói tiếng Trung.", topic: "ngu_phap" },
  { id: 211, han: "能", pinyin: "néng", meaning: "có thể", pos: "Trợ từ", emoji: "", example: "你能帮我吗？", examplePinyin: "nǐ néng bāng wǒ ma", exampleVi: "Bạn có thể giúp tôi không?", topic: "ngu_phap" },
  { id: 212, han: "吗", pinyin: "ma", meaning: "...không? , …à?", pos: "Trợ từ", emoji: "", example: "你是学生吗？", examplePinyin: "nǐshì xuéshēng ma", exampleVi: "Bạn là học sinh phải không?", topic: "ngu_phap" },
  { id: 213, han: "的", pinyin: "de", meaning: "(Trợ từ)", pos: "Trợ từ", emoji: "", example: "这是我的书。", examplePinyin: "zhè shì wǒde shū", exampleVi: "Đây là sách của tôi.", topic: "ngu_phap" },
  { id: 214, han: "呢", pinyin: "ne", meaning: "Trợ từ", pos: "Trợ từ", emoji: "", example: "你呢？", examplePinyin: "nǐ ne", exampleVi: "Còn bạn thì sao?", topic: "ngu_phap" },
  { id: 215, han: "有", pinyin: "yǒu", meaning: "Có", pos: "Trợ từ", emoji: "", example: "我有一个女儿。", examplePinyin: "wǒyǒu yíge nǚ’ér", exampleVi: "Tôi có một cô con gái.", topic: "ngu_phap" },
  { id: 216, han: "了", pinyin: "le", meaning: "Động từ +了: Nhấn mạnh hành động xong xuôi.", pos: "Trợ từ", emoji: "", example: "我吃饭了。", examplePinyin: "wǒ chīfàn le", exampleVi: "Tôi ăn cơm rồi.", topic: "ngu_phap" },
  { id: 217, han: "了", pinyin: "le", meaning: "了nằm cuối câu: Nhấn mạnh trạng thái thay đổi", pos: "Trợ từ", emoji: "", example: "我吃饭了。", examplePinyin: "wǒ chīfàn le", exampleVi: "Tôi ăn cơm rồi.", topic: "ngu_phap" },
  { id: 218, han: "很", pinyin: "hěn", meaning: "Rất", pos: "Trợ từ", emoji: "", example: "今天天气很好。", examplePinyin: "jīntiān tiānqì hěnhǎo", exampleVi: "Thời tiết hôm nay rất đẹp.", topic: "ngu_phap" },
  { id: 219, han: "在", pinyin: "zài", meaning: "Ở, tại", pos: "Trợ từ", emoji: "", example: "我在公司。", examplePinyin: "wǒzài gōng sī", exampleVi: "Tôi ở công ty.", topic: "ngu_phap" },
  { id: 220, han: "和", pinyin: "hé", meaning: "Và", pos: "Trợ từ", emoji: "", example: "我和朋友一起吃饭。", examplePinyin: "wǒ hé péngyou yìqǐ chīfàn", exampleVi: "Tôi ăn cơm cùng bạn.", topic: "ngu_phap" },
  { id: 221, han: "没有(没)", pinyin: "méiyǒu (méi)", meaning: "Không có", pos: "Trợ từ", emoji: "", example: "我没有时间。", examplePinyin: "wǒ méiyǒu shí jiān", exampleVi: "Tôi không có thời gian.", topic: "ngu_phap" },
  { id: 222, han: "太", pinyin: "tài", meaning: "Quá, lắm", pos: "Trợ từ", emoji: "", example: "今天太热了。", examplePinyin: "jīntiān tàirèle", exampleVi: "Hôm nay nóng quá.", topic: "ngu_phap" },
  { id: 223, han: "太....了", pinyin: "tài ......le", meaning: "Quá ….", pos: "Trợ từ", emoji: "", example: "今天太热了！", examplePinyin: "jīntiān tàirèle", exampleVi: "Hôm nay nóng quá!", topic: "ngu_phap" },
  { id: 224, han: "也", pinyin: "yě", meaning: "Cũng", pos: "Trợ từ", emoji: "", example: "我也喜欢喝茶。", examplePinyin: "wǒ yě xǐhuān hēchá", exampleVi: "Tôi cũng thích uống trà.", topic: "ngu_phap" },
  { id: 225, han: "给", pinyin: "gěi", meaning: "Đưa, cho", pos: "Trợ từ", emoji: "", example: "请给我一杯水。", examplePinyin: "qǐng gěi wǒ yìbēi shuǐ", exampleVi: "Vui lòng cho tôi một cốc nước.", topic: "ngu_phap" },
  { id: 226, han: "吧", pinyin: "ba", meaning: "Trợ từ ngữ khí dùng ở cuối câu dể diễn tả sự thương lượng, lời đề nghị thỉnh cầu hay mệnh lệnh", pos: "Trợ từ", emoji: "", example: "我们走吧！", examplePinyin: "wǒmen zǒu ba", exampleVi: "Chúng ta đi thôi!", topic: "ngu_phap" },
  { id: 227, han: "啊", pinyin: "a", meaning: "Trợ từ ngữ khí", pos: "Trợ từ", emoji: "", example: "好漂亮啊！", examplePinyin: "hǎo piàoliang a", exampleVi: "Đẹp quá!", topic: "ngu_phap" },
  { id: 228, han: "这些", pinyin: "zhèxiē", meaning: "Những thứ này, những điều này", pos: "Trợ từ", emoji: "", example: "这些水果很好吃。", examplePinyin: "zhèxiē shuíguǒ hěnhǎochī", exampleVi: "Những loại trái cây này rất ngon.", topic: "ngu_phap" },
  { id: 229, han: "都", pinyin: "dōu", meaning: "Đều", pos: "Trợ từ", emoji: "", example: "我们都喜欢吃水果。", examplePinyin: "wǒmen dōu xǐhuān chī shuíguǒ", exampleVi: "Chúng tôi đều thích ăn trái cây.", topic: "ngu_phap" },
  { id: 230, han: "要", pinyin: "yào", meaning: "Cần, muốn", pos: "Trợ từ", emoji: "", example: "我要一杯茶。", examplePinyin: "wǒyào yìbēi chá", exampleVi: "Tôi muốn một cốc trà.", topic: "ngu_phap" },
  { id: 231, han: "打算", pinyin: "dǎ suàn", meaning: "Dự tính, dự định", pos: "Trợ từ", emoji: "", example: "我学习打算。", examplePinyin: "wǒ xuéxí dǎ suàn", exampleVi: "Tôi học cách dùng từ “dự định”.", topic: "ngu_phap" },
  { id: 232, han: "可以", pinyin: "kě yǐ", meaning: "Có thể (được phép, điều kiện khách quan cho phép)", pos: "Trợ từ", emoji: "", example: "你可以坐这里。", examplePinyin: "nǐ kě yǐ zuò zhè lǐ", exampleVi: "Bạn có thể ngồi ở đây.", topic: "ngu_phap" },
  { id: 233, han: "有可能", pinyin: "yǒu kě néng", meaning: "Có khả năng", pos: "Trợ từ", emoji: "", example: "明天有可能下雨。", examplePinyin: "míngtiān yǒu kě néng xià yǔ", exampleVi: "Ngày mai có khả năng trời mưa.", topic: "ngu_phap" },
  { id: 234, han: "家", pinyin: "jiā", meaning: "Nhà", pos: "Danh từ", emoji: "", example: "我晚上回家。", examplePinyin: "wǒ wǎn shàng huíjiā", exampleVi: "Buổi tối tôi về nhà.", topic: "nha_cua" },
  { id: 235, han: "饭", pinyin: "fàn", meaning: "cơm / bữa ăn", pos: "Danh từ", emoji: "", example: "我喜欢饭。", examplePinyin: "wǒxǐhuān fàn", exampleVi: "Tôi thích cơm.", topic: "o_an" },
  { id: 236, han: "鸡蛋", pinyin: "jī dàn", meaning: "trứng gà", pos: "Danh từ", emoji: "", example: "我喜欢鸡蛋。", examplePinyin: "wǒxǐhuān jī dàn", exampleVi: "Tôi thích trứng.", topic: "o_an" },
  { id: 237, han: "牛奶", pinyin: "niú nǎi", meaning: "sữa bò", pos: "Danh từ", emoji: "", example: "我喜欢牛奶。", examplePinyin: "wǒxǐhuān niú nǎi", exampleVi: "Tôi thích sữa.", topic: "o_an" },
  { id: 238, han: "米饭", pinyin: "mǐfàn", meaning: "Cơm", pos: "Danh từ", emoji: "", example: "我喜欢吃米饭。", examplePinyin: "wǒxǐhuān chī mǐfàn", exampleVi: "Tôi thích ăn cơm.", topic: "o_an" },
  { id: 239, han: "菜", pinyin: "cài", meaning: "Thức ăn, món ăn", pos: "Danh từ", emoji: "", example: "妈妈做的菜很好吃。", examplePinyin: "māma zuò de cài hěnhǎochī", exampleVi: "Món ăn mẹ nấu rất ngon.", topic: "o_an" },
  { id: 240, han: "鱼", pinyin: "yú", meaning: "cá", pos: "Danh từ", emoji: "", example: "我喜欢鱼。", examplePinyin: "wǒxǐhuān yú", exampleVi: "Tôi thích cá.", topic: "o_an" },
  { id: 241, han: "肉", pinyin: "ròu", meaning: "thịt", pos: "Danh từ", emoji: "", example: "我喜欢肉。", examplePinyin: "wǒxǐhuān ròu", exampleVi: "Tôi thích thịt.", topic: "o_an" },
  { id: 242, han: "吃饭", pinyin: "chī fàn", meaning: "Ăn cơm", pos: "Danh từ", emoji: "", example: "我们中午一起吃饭。", examplePinyin: "wǒmen zhōngwǔ yìqǐ chīfàn", exampleVi: "Buổi trưa chúng tôi cùng ăn cơm.", topic: "o_an" },
  { id: 243, han: "面条", pinyin: "miàn tiáo", meaning: "Mì sợi", pos: "Danh từ", emoji: "", example: "我喜欢吃面条。", examplePinyin: "wǒxǐhuān chī miàn tiáo", exampleVi: "Tôi thích ăn mì.", topic: "o_an" },
  { id: 244, han: "面包", pinyin: "miàn bāo", meaning: "Bánh mì", pos: "Danh từ", emoji: "", example: "我早餐吃面包。", examplePinyin: "wǒ zǎo chī miàn bāo", exampleVi: "Bữa sáng tôi ăn bánh mì.", topic: "o_an" },
  { id: 245, han: "馒头", pinyin: "mán tou", meaning: "Màn thầu", pos: "Danh từ", emoji: "", example: "我早上吃馒头。", examplePinyin: "wǒ zǎo shàng chī mán tou", exampleVi: "Buổi sáng tôi ăn bánh bao.", topic: "o_an" },
  { id: 246, han: "饺子", pinyin: "jiǎo zi", meaning: "Há cảo, sủi cảo", pos: "Danh từ", emoji: "", example: "我们一起吃饺子。", examplePinyin: "wǒmen yìqǐ chī jiǎo zi", exampleVi: "Chúng tôi cùng ăn bánh chẻo.", topic: "o_an" },
  { id: 247, han: "多吃", pinyin: "duō chī", meaning: "Ăn nhiều", pos: "Danh từ", emoji: "", example: "多吃水果。", examplePinyin: "duō chī shuíguǒ", exampleVi: "Ăn nhiều trái cây.", topic: "o_an" },
  { id: 248, han: "吃多", pinyin: "chī duō", meaning: "Ăn nhiều (ít dùng hơn, nhấn mạnh \\", pos: "Danh từ", emoji: "", example: "吃多了会不舒服。", examplePinyin: "chī duō le huì bù fú", exampleVi: "Ăn quá nhiều sẽ khó chịu.", topic: "o_an" },
  { id: 249, han: "桌子", pinyin: "zhuōzi", meaning: "Cái bàn", pos: "Danh từ", emoji: "", example: "电脑在桌子上。", examplePinyin: "diànnǎo zài zhuōzi shàng", exampleVi: "Máy tính ở trên bàn.", topic: "o_dung" },
  { id: 250, han: "椅子", pinyin: "yǐzi", meaning: "Ghế dựa", pos: "Danh từ", emoji: "", example: "请坐在椅子上。", examplePinyin: "qǐng zuò zài yǐzi shàng", exampleVi: "Vui lòng ngồi trên ghế.", topic: "o_dung" },
  { id: 251, han: "杯子", pinyin: "bēizi", meaning: "Ly, tách", pos: "Danh từ", emoji: "", example: "这是我的杯子。", examplePinyin: "zhè shì wǒde bēizi", exampleVi: "Đây là 杯子 của tôi.", topic: "o_dung" },
  { id: 252, han: "电脑", pinyin: "diànnǎo", meaning: "Máy tính", pos: "Danh từ", emoji: "", example: "我的电脑在桌子上。", examplePinyin: "wǒde diànnǎo zài zhuōzi shàng", exampleVi: "Câu này có nghĩa: Máy tính.", topic: "o_dung" },
  { id: 253, han: "电话", pinyin: "diàn huà", meaning: "điện thoại", pos: "Danh từ", emoji: "", example: "这是我的电话。", examplePinyin: "zhè shì wǒde diàn huà", exampleVi: "Đây là điện thoại của tôi.", topic: "o_dung" },
  { id: 254, han: "笔", pinyin: "bǐ", meaning: "bút", pos: "Danh từ", emoji: "", example: "这是我的笔。", examplePinyin: "zhè shì wǒde bǐ", exampleVi: "Đây là bút của tôi.", topic: "o_dung" },
  { id: 255, han: "伞", pinyin: "sǎn", meaning: "ô / dù", pos: "Danh từ", emoji: "", example: "这是我的伞。", examplePinyin: "zhè shì wǒde sǎn", exampleVi: "Đây là ô của tôi.", topic: "o_dung" },
  { id: 256, han: "表", pinyin: "biǎo", meaning: "đồng hồ đeo tay", pos: "Danh từ", emoji: "", example: "这是我的表。", examplePinyin: "zhè shì wǒde biǎo", exampleVi: "Đây là đồng hồ của tôi.", topic: "o_dung" },
  { id: 257, han: "票", pinyin: "piào", meaning: "vé", pos: "Danh từ", emoji: "", example: "这是我的票。", examplePinyin: "zhè shì wǒde piào", exampleVi: "Đây là vé của tôi.", topic: "o_dung" },
  { id: 258, han: "雨伞", pinyin: "yǔsǎn", meaning: "Cây dù", pos: "Danh từ", emoji: "", example: "下雨了，带上雨伞。", examplePinyin: "xiàyǔle dài shàng yǔsǎn", exampleVi: "Trời mưa rồi, mang theo ô.", topic: "o_dung" },
  { id: 259, han: "东西", pinyin: "dōngxi", meaning: "Đồ, đồ đạc", pos: "Danh từ", emoji: "", example: "桌子上有很多东西。", examplePinyin: "zhuōzi shàng yǒu hěn duō dōngxi", exampleVi: "Trên bàn có rất nhiều đồ.", topic: "o_dung" },
  { id: 260, han: "柜子", pinyin: "guì zi", meaning: "Cái tủ", pos: "Danh từ", emoji: "", example: "衣服在柜子里。", examplePinyin: "yīfu zài guì zi lǐ", exampleVi: "Quần áo ở trong tủ.", topic: "o_dung" },
  { id: 261, han: "架子", pinyin: "jià zi", meaning: "Kệ, giá đỡ", pos: "Danh từ", emoji: "", example: "书在架子上。", examplePinyin: "shū zài jià zi shàng", exampleVi: "Sách ở trên kệ.", topic: "o_dung" },
  { id: 262, han: "凳子", pinyin: "dèng zi", meaning: "Ghế đẩu (không tựa)", pos: "Danh từ", emoji: "", example: "请坐在凳子上。", examplePinyin: "qǐng zuò zài dèng zi shàng", exampleVi: "Vui lòng ngồi trên ghế đẩu.", topic: "o_dung" },
  { id: 263, han: "计算机", pinyin: "jì suàn jī", meaning: "Máy tính", pos: "Danh từ", emoji: "", example: "他在学习计算机。", examplePinyin: "tā zài xuéxí jì suàn jī", exampleVi: "Anh ấy đang học máy tính/công nghệ máy tính.", topic: "o_dung" },
  { id: 264, han: "纸箱", pinyin: "zhǐ xiāng", meaning: "Thùng giấy", pos: "Danh từ", emoji: "", example: "纸箱在桌子旁边。", examplePinyin: "zhǐ xiāng zài zhuōzi pángbiān", exampleVi: "Thùng giấy ở bên cạnh bàn.", topic: "o_dung" },
  { id: 265, han: "水", pinyin: "shuǐ", meaning: "nước", pos: "Danh từ", emoji: "", example: "请多喝水。", examplePinyin: "qǐng duō hē shuǐ", exampleVi: "Hãy uống nhiều nước.", topic: "o_uong" },
  { id: 266, han: "茶", pinyin: "chá", meaning: "trà", pos: "Danh từ", emoji: "", example: "我每天喝茶。", examplePinyin: "wǒměitiān hēchá", exampleVi: "Mỗi ngày tôi uống trà.", topic: "o_uong" },
  { id: 267, han: "奶茶", pinyin: "nǎi chá", meaning: "Trà sữa", pos: "Danh từ", emoji: "", example: "我喜欢喝奶茶。", examplePinyin: "wǒxǐhuān hē nǎi chá", exampleVi: "Tôi thích uống trà sữa.", topic: "o_uong" },
  { id: 268, han: "啤酒", pinyin: "pí jiǔ", meaning: "Bia", pos: "Danh từ", emoji: "", example: "他喜欢喝啤酒。", examplePinyin: "tā xǐhuān hē pí jiǔ", exampleVi: "Anh ấy thích uống bia.", topic: "o_uong" },
  { id: 269, han: "多喝", pinyin: "duō hē", meaning: "Uống nhiều", pos: "Danh từ", emoji: "", example: "多喝水。", examplePinyin: "duō hē shuǐ", exampleVi: "Uống nhiều nước.", topic: "o_uong" },
  { id: 270, han: "喝多", pinyin: "hē duō", meaning: "Uống nhiều (thường hiểu là uống quá nhiều, nhất là rượu bia)", pos: "Danh từ", emoji: "", example: "喝多了会醉。", examplePinyin: "hē duō le huì zuì", exampleVi: "Uống quá nhiều sẽ say.", topic: "o_uong" },
  { id: 271, han: "一只小狗", pinyin: "yì zhī xiǎo gǒu", meaning: "Một con chó nhỏ", pos: "Danh từ", emoji: "", example: "我家有一只小狗。", examplePinyin: "wǒ jiā yǒu yì zhī xiǎo gǒu", exampleVi: "Nhà tôi có một chú chó con.", topic: "ong_vat" },
  { id: 272, han: "车", pinyin: "chē", meaning: "xe", pos: "Danh từ", emoji: "", example: "我的车在外面。", examplePinyin: "wǒde chē zài wàimiàn", exampleVi: "Xe của tôi ở bên ngoài.", topic: "phuong_tien_and_di_chuyen" },
  { id: 273, han: "摩托车", pinyin: "mótuōchē", meaning: "Xe moto", pos: "Danh từ", emoji: "", example: "我骑摩托车上班。", examplePinyin: "wǒ qí mótuōchē shàng bān", exampleVi: "Tôi đi xe máy đi làm.", topic: "phuong_tien_and_di_chuyen" },
  { id: 274, han: "开车", pinyin: "kāi chē", meaning: "Lái xe (oto)", pos: "Danh từ", emoji: "", example: "我每天开车上班。", examplePinyin: "wǒměitiān kāi chē shàng bān", exampleVi: "Mỗi ngày tôi lái xe đi làm.", topic: "phuong_tien_and_di_chuyen" },
  { id: 275, han: "出租车", pinyin: "chū zū chē", meaning: "Xe taxi", pos: "Danh từ", emoji: "", example: "我们坐出租车去饭馆。", examplePinyin: "wǒmen zuò chū zū chē qù fàn guǎn", exampleVi: "Chúng tôi đi taxi đến nhà hàng.", topic: "phuong_tien_and_di_chuyen" },
  { id: 276, han: "汽车", pinyin: "qìchē", meaning: "Xe hơi, oto", pos: "Danh từ", emoji: "", example: "我的汽车在外面。", examplePinyin: "wǒde qìchē zài wàimiàn", exampleVi: "Ô tô của tôi ở bên ngoài.", topic: "phuong_tien_and_di_chuyen" },
  { id: 277, han: "公交车", pinyin: "gōngjiāochē", meaning: "Xe buýt", pos: "Danh từ", emoji: "", example: "我每天坐公交车上班。", examplePinyin: "wǒměitiān zuò gōngjiāochē shàng bān", exampleVi: "Mỗi ngày tôi đi xe buýt đi làm.", topic: "phuong_tien_and_di_chuyen" },
  { id: 278, han: "打车", pinyin: "dǎchē", meaning: "Bắt xe", pos: "Danh từ", emoji: "", example: "我们打车去饭馆。", examplePinyin: "wǒmen dǎchē qù fàn guǎn", exampleVi: "Chúng tôi bắt taxi đến nhà hàng.", topic: "phuong_tien_and_di_chuyen" },
  { id: 279, han: "自行车", pinyin: "zì xíng chē", meaning: "Xe đạp", pos: "Danh từ", emoji: "", example: "我骑自行车去学校。", examplePinyin: "wǒ qí zì xíng chē qù xuéxiào", exampleVi: "Tôi đi xe đạp đến trường.", topic: "phuong_tien_and_di_chuyen" },
  { id: 280, han: "电动车", pinyin: "diàn dòng chē", meaning: "Xe điện", pos: "Danh từ", emoji: "", example: "我骑电动车上班。", examplePinyin: "wǒ qí diàn dòng chē shàng bān", exampleVi: "Tôi đi xe điện đi làm.", topic: "phuong_tien_and_di_chuyen" },
  { id: 281, han: "走路", pinyin: "zǒu lù", meaning: "Đi bộ", pos: "Danh từ", emoji: "", example: "我每天走路去公司。", examplePinyin: "wǒměitiān zǒu lù qù gōng sī", exampleVi: "Mỗi ngày tôi đi bộ đến công ty.", topic: "phuong_tien_and_di_chuyen" },
  { id: 282, han: "骑摩托车", pinyin: "qí mótuōchē", meaning: "Lái xe máy", pos: "Danh từ", emoji: "", example: "我每天骑摩托车上班。", examplePinyin: "wǒměitiān qí mótuōchē shàng bān", exampleVi: "Mỗi ngày tôi đi xe máy đi làm.", topic: "phuong_tien_and_di_chuyen" },
  { id: 283, han: "衣服", pinyin: "yīfu", meaning: "Quần áo", pos: "Danh từ", emoji: "", example: "这件衣服很漂亮。", examplePinyin: "zhè yīfu hěn piàoliang", exampleVi: "Bộ quần áo này rất đẹp.", topic: "quan_ao" },
  { id: 284, han: "雨衣", pinyin: "yǔyī", meaning: "Áo mưa", pos: "Danh từ", emoji: "", example: "下雨天要穿雨衣。", examplePinyin: "xià yǔ tiān yào chuān yǔyī", exampleVi: "Ngày mưa phải mặc áo mưa.", topic: "quan_ao" },
  { id: 285, han: "领口", pinyin: "lǐng kǒu", meaning: "Cổ áo", pos: "Danh từ", emoji: "", example: "这件衣服的领口很漂亮。", examplePinyin: "zhè yīfu de lǐng kǒu hěn piàoliang", exampleVi: "Cổ áo của bộ quần áo này rất đẹp.", topic: "quan_ao" },
  { id: 286, han: "鞋子", pinyin: "xié zi", meaning: "Giày", pos: "Danh từ", emoji: "", example: "这双鞋子很漂亮。", examplePinyin: "zhè shuāng xié zi hěn piàoliang", exampleVi: "Đôi giày này rất đẹp.", topic: "quan_ao" },
  { id: 287, han: "越南", pinyin: "Yuènán", meaning: "Việt Nam", pos: "Danh từ", emoji: "", example: "我来自越南。", examplePinyin: "wǒ lái zì Yuènán", exampleVi: "Tôi đến từ Việt Nam.", topic: "quoc_gia" },
  { id: 288, han: "中国", pinyin: "Zhōngguó", meaning: "Trung Quốc", pos: "Danh từ", emoji: "", example: "我想去中国。", examplePinyin: "wǒxiǎng qù Zhōngguó", exampleVi: "Tôi muốn đi Trung Quốc.", topic: "quoc_gia" },
  { id: 289, han: "美国", pinyin: "Měiguó", meaning: "Mỹ", pos: "Danh từ", emoji: "", example: "他在美国工作。", examplePinyin: "tā zài Měiguó gōngzuò", exampleVi: "Anh ấy làm việc ở Mỹ.", topic: "quoc_gia" },
  { id: 290, han: "俄罗斯", pinyin: "Éluósī", meaning: "Nga", pos: "Danh từ", emoji: "", example: "他来自俄罗斯。", examplePinyin: "tā lái zì Éluósī", exampleVi: "Anh ấy đến từ Nga.", topic: "quoc_gia" },
  { id: 291, han: "国", pinyin: "guó", meaning: "Nước, quốc gia", pos: "Danh từ", emoji: "", example: "你是哪国人？", examplePinyin: "nǐshì nǎguórén", exampleVi: "Bạn là người nước nào?", topic: "quoc_gia" },
  { id: 292, han: "一", pinyin: "yī", meaning: "một", pos: "Số từ", emoji: "", example: "这里有一。", examplePinyin: "zhè lǐ yǒu yī", exampleVi: "Ở đây có 1.", topic: "so_luong" },
  { id: 293, han: "二", pinyin: "èr", meaning: "hai", pos: "Số từ", emoji: "", example: "这里有二。", examplePinyin: "zhè lǐ yǒu èr", exampleVi: "Ở đây có 2.", topic: "so_luong" },
  { id: 294, han: "三", pinyin: "sān", meaning: "ba", pos: "Số từ", emoji: "", example: "这里有三。", examplePinyin: "zhè lǐ yǒu sān", exampleVi: "Ở đây có 3.", topic: "so_luong" },
  { id: 295, han: "四", pinyin: "sì", meaning: "bốn", pos: "Số từ", emoji: "", example: "这里有四。", examplePinyin: "zhè lǐ yǒu sì", exampleVi: "Ở đây có 4.", topic: "so_luong" },
  { id: 296, han: "五", pinyin: "wǔ", meaning: "năm", pos: "Số từ", emoji: "", example: "这里有五。", examplePinyin: "zhè lǐ yǒu wǔ", exampleVi: "Ở đây có 5.", topic: "so_luong" },
  { id: 297, han: "六", pinyin: "liù", meaning: "sáu", pos: "Số từ", emoji: "", example: "这里有六。", examplePinyin: "zhè lǐ yǒu liù", exampleVi: "Ở đây có 6.", topic: "so_luong" },
  { id: 298, han: "七", pinyin: "qī", meaning: "bảy", pos: "Số từ", emoji: "", example: "这里有七。", examplePinyin: "zhè lǐ yǒu qī", exampleVi: "Ở đây có 7.", topic: "so_luong" },
  { id: 299, han: "八", pinyin: "bā", meaning: "tám", pos: "Số từ", emoji: "", example: "这里有八。", examplePinyin: "zhè lǐ yǒu bā", exampleVi: "Ở đây có 8.", topic: "so_luong" },
  { id: 300, han: "九", pinyin: "jiǔ", meaning: "chín", pos: "Số từ", emoji: "", example: "这里有九。", examplePinyin: "zhè lǐ yǒu jiǔ", exampleVi: "Ở đây có 9.", topic: "so_luong" },
  { id: 301, han: "十", pinyin: "shí", meaning: "mười", pos: "Số từ", emoji: "", example: "这里有十。", examplePinyin: "zhè lǐ yǒu shí", exampleVi: "Ở đây có 10.", topic: "so_luong" },
  { id: 302, han: "百", pinyin: "bǎi", meaning: "trăm", pos: "Số từ", emoji: "", example: "这里有百。", examplePinyin: "zhè lǐ yǒu bǎi", exampleVi: "Ở đây có 100.", topic: "so_luong" },
  { id: 303, han: "千", pinyin: "qiān", meaning: "Nghìn (1.000)", pos: "Số từ", emoji: "", example: "这个电脑要三千块。", examplePinyin: "zhège diànnǎo yào sānqiānkuài", exampleVi: "Cái máy tính này giá 3.000 tệ.", topic: "so_luong" },
  { id: 304, han: "万", pinyin: "wàn", meaning: "Mười nghìn (10.000)", pos: "Số từ", emoji: "", example: "这个项目花了一万块。", examplePinyin: "zhège le yíwànkuài", exampleVi: "Dự án này tốn 10.000 tệ.", topic: "so_luong" },
  { id: 305, han: "零", pinyin: "líng", meaning: "số không", pos: "Số từ", emoji: "", example: "这里有零。", examplePinyin: "zhè lǐ yǒu líng", exampleVi: "Ở đây có 0.", topic: "so_luong" },
  { id: 306, han: "两", pinyin: "liǎng", meaning: "hai (với lượng từ)", pos: "Số từ", emoji: "", example: "这里有两。", examplePinyin: "zhè lǐ yǒu liǎng", exampleVi: "Ở đây có 2.", topic: "so_luong" },
  { id: 307, han: "几", pinyin: "jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Số từ", emoji: "", example: "你有几个孩子？", examplePinyin: "nǐ yǒu jǐge hái zi", exampleVi: "Bạn có mấy người con?", topic: "so_luong" },
  { id: 308, han: "一点儿", pinyin: "yīdiǎnr", meaning: "Một ít, một chút", pos: "Số từ", emoji: "", example: "请给我一点儿水。", examplePinyin: "qǐng gěi wǒ yìdiǎnr shuǐ", exampleVi: "Vui lòng cho tôi một ít nước.", topic: "so_luong" },
  { id: 309, han: "不少", pinyin: "bùshǎo", meaning: "Không ít, nhiều", pos: "Số từ", emoji: "", example: "这里有不少人。", examplePinyin: "zhè lǐ yǒu bùshǎo rén", exampleVi: "Ở đây có khá nhiều người.", topic: "so_luong" },
  { id: 310, han: "两百", pinyin: "liǎng bǎi", meaning: "Hai trăm", pos: "Số từ", emoji: "", example: "这个两百块钱。", examplePinyin: "zhège liǎngbǎikuài qián", exampleVi: "Cái này giá 200 tệ.", topic: "so_luong" },
  { id: 311, han: "两百零二", pinyin: "liǎng bǎi líng èr", meaning: "Hai trăm lẻ hai (202)", pos: "Số từ", emoji: "", example: "一共两百零二块。", examplePinyin: "yī liǎng bǎi líng èr kuài", exampleVi: "Tổng cộng 202 tệ.", topic: "so_luong" },
  { id: 312, han: "幺", pinyin: "yāo", meaning: "Số 1 khi đọc dãy số (điện thoại, biển số, mã số...)", pos: "Số từ", emoji: "", example: "这里有幺。", examplePinyin: "zhè lǐ yǒu yāo", exampleVi: "Ở đây có 1.", topic: "so_luong" },
  { id: 313, han: "病人", pinyin: "bìngrén", meaning: "Bệnh  nhân", pos: "Danh từ", emoji: "", example: "病人在医院休息。", examplePinyin: "bìngrén zài yīyuàn xiū", exampleVi: "Bệnh nhân nghỉ ngơi ở bệnh viện.", topic: "suc_khoe" },
  { id: 314, han: "跑步", pinyin: "pǎo bù", meaning: "Chạy bộ", pos: "Danh từ", emoji: "", example: "我每天早上跑步。", examplePinyin: "wǒměitiān zǎo shàng pǎo bù", exampleVi: "Mỗi sáng tôi chạy bộ.", topic: "the_thao" },
  { id: 315, han: "年", pinyin: "nián", meaning: "năm", pos: "Danh từ", emoji: "", example: "今年是二零二六年。", examplePinyin: "jīnnián shì èr líng èr liù nián", exampleVi: "Năm nay là năm 2026.", topic: "thoi_gian" },
  { id: 316, han: "月", pinyin: "yuè", meaning: "tháng", pos: "Danh từ", emoji: "", example: "这个月我很忙。", examplePinyin: "zhège yuè wǒ hěnmáng", exampleVi: "Tháng này tôi rất bận.", topic: "thoi_gian" },
  { id: 317, han: "日", pinyin: "rì", meaning: "ngày / mặt trời", pos: "Danh từ", emoji: "", example: "现在是日。", examplePinyin: "xiànzài shì rì", exampleVi: "Bây giờ là ngày.", topic: "thoi_gian" },
  { id: 318, han: "号", pinyin: "hào", meaning: "Ngày", pos: "Danh từ", emoji: "", example: "今天是十号。", examplePinyin: "jīntiān shì shí hào", exampleVi: "Hôm nay là ngày 10.", topic: "thoi_gian" },
  { id: 319, han: "星期", pinyin: "xīngqī", meaning: "Tuần, thứ", pos: "Danh từ", emoji: "", example: "今天是星期几？", examplePinyin: "jīntiān shì xīngqī jǐ", exampleVi: "Hôm nay là thứ mấy?", topic: "thoi_gian" },
  { id: 320, han: "天", pinyin: "tiān", meaning: "Ngày (đơn vị đếm số ngày)", pos: "Danh từ", emoji: "", example: "现在是天。", examplePinyin: "xiànzài shì tiān", exampleVi: "Bây giờ là ngày.", topic: "thoi_gian" },
  { id: 321, han: "今天", pinyin: "jīntiān", meaning: "Hôm nay", pos: "Danh từ", emoji: "", example: "今天是星期五。", examplePinyin: "jīntiān shì xīngqī wǔ", exampleVi: "Hôm nay là thứ Sáu.", topic: "thoi_gian" },
  { id: 322, han: "明天", pinyin: "míngtiān", meaning: "Ngày mai", pos: "Danh từ", emoji: "", example: "明天我要上班。", examplePinyin: "míngtiān wǒyào shàng bān", exampleVi: "Ngày mai tôi phải đi làm.", topic: "thoi_gian" },
  { id: 323, han: "昨天", pinyin: "zuótiān", meaning: "Hôm qua", pos: "Danh từ", emoji: "", example: "昨天我上班了。", examplePinyin: "zuótiān wǒ shàngbānle", exampleVi: "Hôm qua tôi đã đi làm.", topic: "thoi_gian" },
  { id: 324, han: "现在", pinyin: "xiànzài", meaning: "Hiện tại , bây giờ", pos: "Danh từ", emoji: "", example: "现在几点？", examplePinyin: "xiànzài jǐdiǎn", exampleVi: "Bây giờ là mấy giờ?", topic: "thoi_gian" },
  { id: 325, han: "时候", pinyin: "shíhou", meaning: "Lúc , khi", pos: "Danh từ", emoji: "", example: "你什么时候回家？", examplePinyin: "nǐ shén me shí hou huíjiā", exampleVi: "Khi nào bạn về nhà?", topic: "thoi_gian" },
  { id: 326, han: "点", pinyin: "diǎn", meaning: "Giờ", pos: "Danh từ", emoji: "", example: "现在两点。", examplePinyin: "xiànzài liǎng diǎn", exampleVi: "Bây giờ là 2 giờ.", topic: "thoi_gian" },
  { id: 327, han: "分", pinyin: "fēn", meaning: "phút", pos: "Danh từ", emoji: "", example: "现在两点十分。", examplePinyin: "xiànzài liǎng diǎn shí fēn", exampleVi: "Bây giờ là 2 giờ 10 phút.", topic: "thoi_gian" },
  { id: 328, han: "上午", pinyin: "Shàngwǔ", meaning: "Buổi sáng", pos: "Danh từ", emoji: "", example: "上午我上班。", examplePinyin: "Shàngwǔ wǒ shàng bān", exampleVi: "Buổi sáng tôi đi làm.", topic: "thoi_gian" },
  { id: 329, han: "下午", pinyin: "xiawǔ", meaning: "Buổi chiều", pos: "Danh từ", emoji: "", example: "下午两点开会。", examplePinyin: "xiawǔ liǎng diǎn kāihuì", exampleVi: "2 giờ chiều họp.", topic: "thoi_gian" },
  { id: 330, han: "时间", pinyin: "shí jiān", meaning: "thời gian", pos: "Danh từ", emoji: "", example: "现在是时间。", examplePinyin: "xiànzài shì shí jiān", exampleVi: "Bây giờ là thời gian.", topic: "thoi_gian" },
  { id: 331, han: "今年", pinyin: "jīnnián", meaning: "Năm nay", pos: "Danh từ", emoji: "", example: "今年是二零二六年。", examplePinyin: "jīnnián shì èr líng èr liù nián", exampleVi: "Năm nay là năm 2026.", topic: "thoi_gian" },
  { id: 332, han: "午", pinyin: "wǔ", meaning: "Buổi trưa, giờ Ngọ", pos: "Danh từ", emoji: "", example: "中午吃饭。", examplePinyin: "zhōngwǔ chīfàn", exampleVi: "Buổi trưa ăn cơm.", topic: "thoi_gian" },
  { id: 333, han: "秒", pinyin: "miǎo", meaning: "Giây", pos: "Danh từ", emoji: "", example: "等十秒钟。", examplePinyin: "děng shí miǎo", exampleVi: "Đợi 10 giây.", topic: "thoi_gian" },
  { id: 334, han: "中午", pinyin: "zhōngwǔ", meaning: "Buổi trưa", pos: "Danh từ", emoji: "", example: "中午我们一起吃饭。", examplePinyin: "zhōngwǔ wǒmen yìqǐ chīfàn", exampleVi: "Buổi trưa chúng tôi cùng ăn cơm.", topic: "thoi_gian" },
  { id: 335, han: "下", pinyin: "xià", meaning: "Rơi", pos: "Danh từ", emoji: "", example: "书在桌子下面。", examplePinyin: "shū zài zhuōzi xiàmiàn", exampleVi: "Sách ở dưới bàn.", topic: "vi_tri" },
  { id: 336, han: "分钟", pinyin: "fēn zhōng", meaning: "Phút", pos: "Danh từ", emoji: "", example: "现在是分钟。", examplePinyin: "xiànzài shì fēn zhōng", exampleVi: "Bây giờ là phút.", topic: "thoi_gian" },
  { id: 337, han: "二零二六", pinyin: "èr líng èr liù", meaning: "2026 (cách đọc năm)", pos: "Danh từ", emoji: "", example: "现在是二零二六。", examplePinyin: "xiànzài shì èr líng èr liù", exampleVi: "Bây giờ là năm 2026.", topic: "thoi_gian" },
  { id: 338, han: "后天", pinyin: "hòu tiān", meaning: "Ngày kia (ngày sau ngày mai)", pos: "Danh từ", emoji: "", example: "后天我要上班。", examplePinyin: "hòu tiān wǒyào shàng bān", exampleVi: "Ngày kia tôi phải đi làm.", topic: "thoi_gian" },
  { id: 339, han: "前天", pinyin: "qián tiān", meaning: "Hôm kia (ngày trước hôm qua)", pos: "Danh từ", emoji: "", example: "前天我休息。", examplePinyin: "qián tiān wǒ xiū", exampleVi: "Hôm kia tôi nghỉ.", topic: "thoi_gian" },
  { id: 340, han: "晚", pinyin: "wǎn", meaning: "Muộn, trễ", pos: "Danh từ", emoji: "", example: "晚上我回家。", examplePinyin: "wǎn shàng wǒ huíjiā", exampleVi: "Buổi tối tôi về nhà.", topic: "thoi_gian" },
  { id: 341, han: "礼拜", pinyin: "lǐ bài", meaning: "Thứ, tuần (cách nói thông dụng)", pos: "Danh từ", emoji: "", example: "下个礼拜见。", examplePinyin: "xià gè lǐ bài jiàn", exampleVi: "Hẹn gặp tuần sau.", topic: "thoi_gian" },
  { id: 342, han: "上周", pinyin: "shàng zhōu", meaning: "Tuần trước", pos: "Danh từ", emoji: "", example: "上周我很忙。", examplePinyin: "shàng zhōu wǒ hěnmáng", exampleVi: "Tuần trước tôi rất bận.", topic: "thoi_gian" },
  { id: 343, han: "下周", pinyin: "xià zhōu", meaning: "Tuần sau", pos: "Danh từ", emoji: "", example: "下周我要上班。", examplePinyin: "xià zhōu wǒyào shàng bān", exampleVi: "Tuần sau tôi phải đi làm.", topic: "thoi_gian" },
  { id: 344, han: "一个星期", pinyin: "yí gè xīng qī", meaning: "Một tuần", pos: "Danh từ", emoji: "", example: "我学习一个星期。", examplePinyin: "wǒ xuéxí yíge xīngqī", exampleVi: "Tôi học trong một tuần.", topic: "thoi_gian" },
  { id: 345, han: "有时候", pinyin: "yǒu shí hou", meaning: "Có lúc, đôi khi", pos: "Danh từ", emoji: "", example: "我有时候喝茶。", examplePinyin: "wǒyǒu shíhou hēchá", exampleVi: "Đôi khi tôi uống trà.", topic: "thoi_gian" },
  { id: 346, han: "常常", pinyin: "cháng cháng", meaning: "Thường thường", pos: "Danh từ", emoji: "", example: "我常常看电影。", examplePinyin: "wǒ chángcháng kàndiànyǐng", exampleVi: "Tôi thường xem phim.", topic: "thoi_gian" },
  { id: 347, han: "经常", pinyin: "jīng cháng", meaning: "Thường xuyên", pos: "Danh từ", emoji: "", example: "他经常加班。", examplePinyin: "tā jīngcháng jiā bān", exampleVi: "Anh ấy thường xuyên tăng ca.", topic: "thoi_gian" },
  { id: 348, han: "目前", pinyin: "mù qián", meaning: "Hiện tại", pos: "Danh từ", emoji: "", example: "目前我在公司。", examplePinyin: "mù qián wǒzài gōng sī", exampleVi: "Hiện tại tôi đang ở công ty.", topic: "thoi_gian" },
  { id: 349, han: "十一点半", pinyin: "shí yī diǎn bàn", meaning: "11 giờ rưỡi", pos: "Danh từ", emoji: "", example: "现在十一点半。", examplePinyin: "xiànzài shí yī diǎn bàn", exampleVi: "Bây giờ là 11 giờ rưỡi.", topic: "thoi_gian" },
  { id: 350, han: "两点", pinyin: "liǎng diǎn", meaning: "2 giờ", pos: "Danh từ", emoji: "", example: "下午两点开会。", examplePinyin: "xiawǔ liǎng diǎn kāihuì", exampleVi: "2 giờ chiều họp.", topic: "thoi_gian" },
  { id: 351, han: "两天", pinyin: "liǎng tiān", meaning: "Hai ngày", pos: "Danh từ", emoji: "", example: "我休息两天。", examplePinyin: "wǒ xiū liǎngtiān", exampleVi: "Tôi nghỉ hai ngày.", topic: "thoi_gian" },
  { id: 352, han: "岁", pinyin: "suì", meaning: "tuổi", pos: "Danh từ", emoji: "", example: "我女儿四岁。", examplePinyin: "wǒ nǚ’ér sì suì", exampleVi: "Con gái tôi 4 tuổi.", topic: "thoi_gian" },
  { id: 353, han: "热", pinyin: "rè", meaning: "nóng", pos: "Tính từ", emoji: "", example: "今天很热。", examplePinyin: "jīntiān hěnrè", exampleVi: "Hôm nay rất nóng.", topic: "thoi_tiet" },
  { id: 354, han: "冷", pinyin: "lěng", meaning: "lạnh", pos: "Tính từ", emoji: "", example: "今天很冷。", examplePinyin: "jīntiān hěnlěng", exampleVi: "Hôm nay rất lạnh.", topic: "thoi_tiet" },
  { id: 355, han: "天气", pinyin: "tiānqì", meaning: "Thời tiết", pos: "Tính từ", emoji: "", example: "今天天气怎么样？", examplePinyin: "jīntiān tiānqì zěn me yàng", exampleVi: "Thời tiết hôm nay thế nào?", topic: "thoi_tiet" },
  { id: 356, han: "下雨", pinyin: "xià yǔ", meaning: "Đỗ mưa", pos: "Tính từ", emoji: "", example: "今天下雨了。", examplePinyin: "jīntiān xiàyǔle", exampleVi: "Hôm nay trời mưa.", topic: "thoi_tiet" },
  { id: 357, han: "雨", pinyin: "yǔ", meaning: "Mưa", pos: "Tính từ", emoji: "", example: "外面下雨了。", examplePinyin: "wàimiàn xiàyǔle", exampleVi: "Bên ngoài trời mưa.", topic: "thoi_tiet" },
  { id: 358, han: "名字", pinyin: "míngzi", meaning: "Tên , họ tên", pos: "Danh từ", emoji: "", example: "你的名字叫什么？", examplePinyin: "nǐde míngzi jiào shénme", exampleVi: "Tên bạn là gì?", topic: "thong_tin_ca_nhan" },
  { id: 359, han: "人", pinyin: "rén", meaning: "người", pos: "Danh từ", emoji: "", example: "我认识人。", examplePinyin: "wǒ rèn shi rén", exampleVi: "Tôi quen một người.", topic: "thong_tin_ca_nhan" },
  { id: 360, han: "电话号码", pinyin: "diàn huà hào mǎ", meaning: "Số điện thoại", pos: "Danh từ", emoji: "", example: "我认识电话号码。", examplePinyin: "wǒ rèn shi diànhuàhàomǎ", exampleVi: "Tôi biết số điện thoại.", topic: "thong_tin_ca_nhan" },
  { id: 361, han: "钱", pinyin: "qián", meaning: "tiền", pos: "Danh từ", emoji: "", example: "我没有钱。", examplePinyin: "wǒ méiyǒu qián", exampleVi: "Tôi không có tiền.", topic: "tien_bac" },
  { id: 362, han: "块", pinyin: "kuài", meaning: "Đồng( đơn vị tiền tệ)", pos: "Danh từ", emoji: "", example: "这个十块钱。", examplePinyin: "zhège shíkuàiqián", exampleVi: "Cái này 10 tệ.", topic: "tien_bac" },
  { id: 363, han: "赚钱", pinyin: "zhuàn qián", meaning: "Kiếm tiền", pos: "Danh từ", emoji: "", example: "努力工作赚钱。", examplePinyin: "gōngzuò zhuàn qián", exampleVi: "Chăm chỉ làm việc để kiếm tiền.", topic: "tien_bac" },
  { id: 364, han: "人民币", pinyin: "rén mín bì", meaning: "Nhân dân tệ (CNY)", pos: "Danh từ", emoji: "", example: "这个用人民币付款。", examplePinyin: "zhège rén mín bì", exampleVi: "Cái này thanh toán bằng nhân dân tệ.", topic: "tien_bac" },
  { id: 365, han: "越南盾", pinyin: "Yuè Nán dùn", meaning: "Việt Nam đồng (VND)", pos: "Danh từ", emoji: "", example: "我用越南盾付款。", examplePinyin: "wǒ Yuè Nán dùn", exampleVi: "Tôi thanh toán bằng tiền Việt.", topic: "tien_bac" },
  { id: 366, han: "一块都没有", pinyin: "yí kuài dōu méi yǒu", meaning: "Không có một đồng nào; Không còn một xu nào", pos: "Danh từ", emoji: "", example: "我身上一块钱都没有。", examplePinyin: "wǒ shēn shàng yī kuài qián dōu méiyǒu", exampleVi: "Trên người tôi không có lấy một đồng.", topic: "tien_bac" },
  { id: 367, han: "水果", pinyin: "shuíguǒ", meaning: "Trái cây", pos: "Danh từ", emoji: "", example: "我喜欢吃水果。", examplePinyin: "wǒxǐhuān chī shuíguǒ", exampleVi: "Tôi thích ăn trái cây.", topic: "trai_cay" },
  { id: 368, han: "苹果", pinyin: "píngguǒ", meaning: "Trái táo", pos: "Danh từ", emoji: "", example: "我喜欢吃苹果。", examplePinyin: "wǒxǐhuān chī píngguǒ", exampleVi: "Tôi thích ăn táo.", topic: "trai_cay" },
  { id: 369, han: "葡萄", pinyin: "pútáo", meaning: "Trái nho", pos: "Danh từ", emoji: "", example: "我喜欢吃葡萄。", examplePinyin: "wǒxǐhuān chī pútáo", exampleVi: "Tôi thích ăn nho.", topic: "trai_cay" },
  { id: 370, han: "香蕉", pinyin: "xiāngjiāo", meaning: "Trái chuối", pos: "Danh từ", emoji: "", example: "我每天吃香蕉。", examplePinyin: "wǒměitiān chī xiāngjiāo", exampleVi: "Mỗi ngày tôi ăn chuối.", topic: "trai_cay" },
  { id: 371, han: "草莓", pinyin: "cǎoméi", meaning: "Dâu tây", pos: "Danh từ", emoji: "", example: "草莓很好吃。", examplePinyin: "cǎoméi hěnhǎochī", exampleVi: "Dâu tây rất ngon.", topic: "trai_cay" },
  { id: 372, han: "桃子", pinyin: "táozi", meaning: "Trái đào", pos: "Danh từ", emoji: "", example: "这个桃子很甜。", examplePinyin: "zhège táozi hěn tián", exampleVi: "Quả đào này rất ngọt.", topic: "trai_cay" },
  { id: 373, han: "橘子", pinyin: "júzi", meaning: "Trái quýt", pos: "Danh từ", emoji: "", example: "我喜欢吃橘子。", examplePinyin: "wǒxǐhuān chī júzi", exampleVi: "Tôi thích ăn quýt.", topic: "trai_cay" },
  { id: 374, han: "哈蜜瓜", pinyin: "hā mì guā", meaning: "Dưa lưới", pos: "Danh từ", emoji: "", example: "哈密瓜很甜。", examplePinyin: "hā guā hěn tián", exampleVi: "Dưa lưới rất ngọt.", topic: "trai_cay" },
  { id: 375, han: "榴莲", pinyin: "liú lián", meaning: "Sầu riêng", pos: "Danh từ", emoji: "", example: "我喜欢吃榴莲。", examplePinyin: "wǒxǐhuān chī liú lián", exampleVi: "Tôi thích ăn sầu riêng.", topic: "trai_cay" },
  { id: 376, han: "红毛丹", pinyin: "hóng máo dān", meaning: "Chôm chôm", pos: "Danh từ", emoji: "", example: "红毛丹很好吃。", examplePinyin: "hóng máo dān hěnhǎochī", exampleVi: "Chôm chôm rất ngon.", topic: "trai_cay" },
  { id: 377, han: "西瓜", pinyin: "xī guā", meaning: "Dưa hấu", pos: "Danh từ", emoji: "", example: "这个西瓜很甜。", examplePinyin: "zhège xī guā hěn tián", exampleVi: "Quả dưa hấu này rất ngọt.", topic: "trai_cay" },
  { id: 378, han: "樱桃", pinyin: "yīng táo", meaning: "Cherry", pos: "Danh từ", emoji: "", example: "樱桃很好吃。", examplePinyin: "yīng táo hěnhǎochī", exampleVi: "Cherry rất ngon.", topic: "trai_cay" },
  { id: 379, han: "菠萝蜜", pinyin: "bō luó mì", meaning: "Mít", pos: "Danh từ", emoji: "", example: "菠萝蜜很甜。", examplePinyin: "bō luó mì hěn tián", exampleVi: "Mít rất ngọt.", topic: "trai_cay" },
  { id: 380, han: "学校", pinyin: "xuéxiào", meaning: "Trường học", pos: "Danh từ", emoji: "", example: "我每天去学校。", examplePinyin: "wǒměitiān qù xuéxiào", exampleVi: "Mỗi ngày tôi đi học.", topic: "truong_hoc" },
  { id: 381, han: "学生", pinyin: "xuéshēng", meaning: "học sinh", pos: "Danh từ", emoji: "", example: "我是学生。", examplePinyin: "wǒ shì xuéshēng", exampleVi: "Tôi là học sinh.", topic: "truong_hoc" },
  { id: 382, han: "同学", pinyin: "tóng xué", meaning: "Bạn học", pos: "Danh từ", emoji: "", example: "他是我的同学。", examplePinyin: "tā shì wǒde tóng xué", exampleVi: "Anh ấy là bạn học của tôi.", topic: "truong_hoc" },
  { id: 383, han: "迟到", pinyin: "chídào", meaning: "Trễ, muộn", pos: "Danh từ", emoji: "", example: "我今天上班迟到了。", examplePinyin: "wǒ jīntiān shàng bān chídàole", exampleVi: "Hôm nay tôi đi làm muộn.", topic: "truong_hoc" },
  { id: 384, han: "上课！", pinyin: "shàngkè", meaning: "Vào học đi", pos: "Danh từ", emoji: "", example: "上课了，请看黑板！", examplePinyin: "shàng le qǐng kàn", exampleVi: "Đến giờ học rồi, hãy nhìn lên bảng!", topic: "truong_hoc" },
  { id: 385, han: "下课！", pinyin: "xiàkè", meaning: "Đã hết giờ học rồi", pos: "Danh từ", emoji: "", example: "下课了，大家休息吧！", examplePinyin: "xià le dàjiā xiū ba", exampleVi: "Hết giờ học rồi, mọi người nghỉ đi!", topic: "truong_hoc" },
  { id: 386, han: "现在休息！", pinyin: "Xiànzài xiūxi", meaning: "Nghỉ giải lao nhé", pos: "Danh từ", emoji: "", example: "现在休息十分钟！", examplePinyin: "xiànzài xiū shí fēn zhōng", exampleVi: "Bây giờ nghỉ 10 phút!", topic: "truong_hoc" },
  { id: 387, han: "看黑板！", pinyin: "Kàn hēibǎn", meaning: "Hãy nhìn lên bảng", pos: "Danh từ", emoji: "", example: "请看黑板！", examplePinyin: "qǐng kàn", exampleVi: "Hãy nhìn lên bảng!", topic: "truong_hoc" },
  { id: 388, han: "跟我读！", pinyin: "Gēn wǒ dú", meaning: "Hãy đọc theo tôi", pos: "Danh từ", emoji: "", example: "跟我读一遍！", examplePinyin: "wǒ dú yī", exampleVi: "Hãy đọc theo tôi một lần!", topic: "truong_hoc" },
  { id: 389, han: "谁", pinyin: "shéi", meaning: "Ai", pos: "Đại từ", emoji: "", example: "他是谁？", examplePinyin: "tā shì shéi", exampleVi: "Anh ấy là ai?", topic: "tu_e_hoi" },
  { id: 390, han: "什么", pinyin: "shénme", meaning: "gì?, cái gì?", pos: "Đại từ", emoji: "", example: "你叫什么名字？", examplePinyin: "nǐ jiào shénme míngzi", exampleVi: "Bạn tên là gì?", topic: "tu_e_hoi" },
  { id: 391, han: "为什么", pinyin: "wèi shén me", meaning: "tại sao", pos: "Đại từ", emoji: "", example: "你为什么迟到？", examplePinyin: "nǐ wèi shén me chídào", exampleVi: "Tại sao bạn đến muộn?", topic: "tu_e_hoi" },
  { id: 392, han: "哪", pinyin: "nǎ", meaning: "nào", pos: "Đại từ", emoji: "", example: "你是哪国人？", examplePinyin: "nǐshì nǎguórén", exampleVi: "Bạn là người nước nào?", topic: "tu_e_hoi" },
  { id: 393, han: "怎么", pinyin: "zěnme", meaning: "Như thế nào (chỉ cách thức, tình trạng)", pos: "Đại từ", emoji: "", example: "这个字怎么读？", examplePinyin: "zhège zì zěnme dú", exampleVi: "Chữ này đọc thế nào?", topic: "tu_e_hoi" },
  { id: 394, han: "多", pinyin: "duō", meaning: "Nhiều (chỉ mức độ)", pos: "Đại từ", emoji: "", example: "你多大？", examplePinyin: "nǐ duōdà", exampleVi: "Bạn bao nhiêu tuổi?", topic: "tu_e_hoi" },
  { id: 395, han: "几", pinyin: "jǐ", meaning: "Mấy? (hỏi số lượng bao nhiêu)", pos: "Đại từ", emoji: "", example: "你有几个孩子？", examplePinyin: "nǐ yǒu jǐge hái zi", exampleVi: "Bạn có mấy người con?", topic: "tu_e_hoi" },
  { id: 396, han: "多少", pinyin: "duōshao", meaning: "Bao nhiêu", pos: "Đại từ", emoji: "", example: "这个多少钱？", examplePinyin: "zhège duōshaoqián", exampleVi: "Cái này bao nhiêu tiền?", topic: "tu_e_hoi" },
  { id: 397, han: "哪儿", pinyin: "nǎr", meaning: "Đâu", pos: "Đại từ", emoji: "", example: "你去哪儿？", examplePinyin: "nǐ qù nǎr", exampleVi: "Bạn đi đâu?", topic: "tu_e_hoi" },
  { id: 398, han: "怎么样", pinyin: "zěn me yàng", meaning: "Như thế nào", pos: "Đại từ", emoji: "", example: "今天天气怎么样？", examplePinyin: "jīntiān tiānqì zěn me yàng", exampleVi: "Thời tiết hôm nay thế nào?", topic: "tu_e_hoi" },
  { id: 399, han: "多大", pinyin: "duō dà", meaning: "Lớn bao nhiêu, bao nhiêu tuổi (đối với người)", pos: "Đại từ", emoji: "", example: "你女儿多大？", examplePinyin: "nǐ nǚ’ér duōdà", exampleVi: "Con gái bạn bao nhiêu tuổi?", topic: "tu_e_hoi" },
  { id: 400, han: "多少钱", pinyin: "duō shǎo qián", meaning: "Bao nhiêu tiền", pos: "Đại từ", emoji: "", example: "你知道多少钱吗？", examplePinyin: "nǐ zhī dào duōshaoqián ma", exampleVi: "Bạn có biết bao nhiêu tiền không?", topic: "tu_e_hoi" },
  { id: 401, han: "什么时候", pinyin: "shén me shí hou", meaning: "Khi nào", pos: "Đại từ", emoji: "", example: "你什么时候回来？", examplePinyin: "nǐ shén me shí hou huílai", exampleVi: "Khi nào bạn trở lại?", topic: "tu_e_hoi" },
  { id: 402, han: "下面(下)", pinyin: "xiàmiàn (xià)", meaning: "Bên dưới (dưới)", pos: "Danh từ", emoji: "", example: "书在桌子下面。", examplePinyin: "shū zài zhuōzi xiàmiàn", exampleVi: "Sách ở dưới bàn.", topic: "vi_tri" },
  { id: 403, han: "上面(上)", pinyin: "shàngmiàn (shàng)", meaning: "Bên trên (trên)", pos: "Danh từ", emoji: "", example: "书在桌子上面。", examplePinyin: "shū zài zhuōzi shàngmiàn", exampleVi: "Sách ở trên bàn.", topic: "vi_tri" },
  { id: 404, han: "里面(里)", pinyin: "lǐmiàn (lǐ)", meaning: "Bên trong (trong)", pos: "Danh từ", emoji: "", example: "东西在里面。", examplePinyin: "dōngxi zài lǐmiàn", exampleVi: "Đồ ở bên trong.", topic: "vi_tri" },
  { id: 405, han: "外面(外)", pinyin: "wàimian (wài)", meaning: "Bên ngoài (ngoài)", pos: "Danh từ", emoji: "", example: "他在公司外面。", examplePinyin: "tā zài gōng sī wài miàn", exampleVi: "Anh ấy ở bên ngoài công ty.", topic: "vi_tri" },
  { id: 406, han: "左边(左)", pinyin: "zuǒbiān (zuǒ)", meaning: "Bên trái (trái)", pos: "Danh từ", emoji: "", example: "银行在左边。", examplePinyin: "zài zuǒbiān", exampleVi: "Ngân hàng ở bên trái.", topic: "vi_tri" },
  { id: 407, han: "右边(右)", pinyin: "yòubiān (yòu)", meaning: "Bên phải (phải)", pos: "Danh từ", emoji: "", example: "商店在右边。", examplePinyin: "shāngdiàn zài yòubiān", exampleVi: "Cửa hàng ở bên phải.", topic: "vi_tri" },
  { id: 408, han: "上", pinyin: "shàng", meaning: "Trên, lên", pos: "Danh từ", emoji: "", example: "书在桌子上。", examplePinyin: "shū zài zhuōzi shàng", exampleVi: "Sách ở trên bàn.", topic: "vi_tri" },
  { id: 409, han: "下", pinyin: "xià", meaning: "Dưới, xuống, rơi", pos: "Danh từ", emoji: "", example: "书在桌子下面。", examplePinyin: "shū zài zhuōzi xiàmiàn", exampleVi: "Sách ở dưới bàn.", topic: "vi_tri" },
  { id: 410, han: "里面", pinyin: "lǐ miàn", meaning: "Bên trong", pos: "Danh từ", emoji: "", example: "他在房间里面。", examplePinyin: "tā zài fángjiānlǐ miàn", exampleVi: "Anh ấy ở trong phòng.", topic: "vi_tri" },
  { id: 411, han: "外边", pinyin: "wài biān", meaning: "Bên ngoài", pos: "Danh từ", emoji: "", example: "他在外边等我。", examplePinyin: "tā zài wài biān děng wǒ", exampleVi: "Anh ấy đang đợi tôi ở bên ngoài.", topic: "vi_tri" },
  { id: 412, han: "前面", pinyin: "qián miàn", meaning: "Phía trước", pos: "Danh từ", emoji: "", example: "学校在前面。", examplePinyin: "xuéxiào zài qiánmiàn", exampleVi: "Trường học ở phía trước.", topic: "vi_tri" },
  { id: 413, han: "后面", pinyin: "hòu miàn", meaning: "Phía sau", pos: "Danh từ", emoji: "", example: "商店在后面。", examplePinyin: "shāngdiàn zài hòumiàn", exampleVi: "Cửa hàng ở phía sau.", topic: "vi_tri" },
  { id: 414, han: "左边", pinyin: "zuǒ biān", meaning: "Bên trái", pos: "Danh từ", emoji: "", example: "银行在左边。", examplePinyin: "zài zuǒbiān", exampleVi: "Ngân hàng ở bên trái.", topic: "vi_tri" },
  { id: 415, han: "右边", pinyin: "yòu biān", meaning: "Bên phải", pos: "Danh từ", emoji: "", example: "公司在右边。", examplePinyin: "gōng sī zài yòubiān", exampleVi: "Công ty ở bên phải.", topic: "vi_tri" },
  { id: 416, han: "旁边", pinyin: "páng biān", meaning: "Bên cạnh", pos: "Danh từ", emoji: "", example: "学校在医院旁边。", examplePinyin: "xuéxiào zài yīyuàn pángbiān", exampleVi: "Trường học ở bên cạnh bệnh viện.", topic: "vi_tri" },
  { id: 417, han: "前", pinyin: "qián", meaning: "Trước", pos: "Danh từ", emoji: "", example: "公司在学校前面。", examplePinyin: "gōng sī zài xuéxiào qiánmiàn", exampleVi: "Công ty ở phía trước trường học.", topic: "vi_tri" },
  { id: 418, han: "后", pinyin: "hòu", meaning: "Sau", pos: "Danh từ", emoji: "", example: "学校在公司后面。", examplePinyin: "xuéxiào zài gōng sī hòumiàn", exampleVi: "Trường học ở phía sau công ty.", topic: "vi_tri" },
  { id: 419, han: "上面", pinyin: "shàng miàn", meaning: "Bên trên", pos: "Danh từ", emoji: "", example: "手机在桌子上面。", examplePinyin: "shǒu jī zài zhuōzi shàngmiàn", exampleVi: "Điện thoại ở trên bàn.", topic: "vi_tri" },
  { id: 420, han: "下面", pinyin: "xià miàn", meaning: "Bên dưới", pos: "Danh từ", emoji: "", example: "鞋子在椅子下面。", examplePinyin: "xié zi zài yǐzi xiàmiàn", exampleVi: "Giày ở dưới ghế.", topic: "vi_tri" },
  { id: 421, han: "外面", pinyin: "wài miàn", meaning: "Bên ngoài", pos: "Danh từ", emoji: "", example: "他在外面。", examplePinyin: "tā zài wàimiàn", exampleVi: "Anh ấy ở bên ngoài.", topic: "vi_tri" },
  { id: 422, han: "对面", pinyin: "duì miàn", meaning: "Đối diện", pos: "Danh từ", emoji: "", example: "银行在公司对面。", examplePinyin: "zài gōng sī duìmiàn", exampleVi: "Ngân hàng ở đối diện công ty.", topic: "vi_tri" },
  { id: 423, han: "公司里面", pinyin: "gōng sī lǐ miàn", meaning: "Bên trong công ty", pos: "Danh từ", emoji: "", example: "他在公司里面。", examplePinyin: "tā zài gōng sī lǐ miàn", exampleVi: "Anh ấy ở trong công ty.", topic: "vi_tri" },
  { id: 424, han: "公司外面", pinyin: "gōng sī wài miàn", meaning: "Bên ngoài công ty", pos: "Danh từ", emoji: "", example: "他在公司外面。", examplePinyin: "tā zài gōng sī wài miàn", exampleVi: "Anh ấy ở bên ngoài công ty.", topic: "vi_tri" },
  { id: 425, han: "楼上", pinyin: "lóu shàng", meaning: "Trên lầu", pos: "Danh từ", emoji: "", example: "他在楼上。", examplePinyin: "tā zài lóushàng", exampleVi: "Anh ấy ở trên lầu.", topic: "vi_tri" },
  { id: 426, han: "弯", pinyin: "wān", meaning: "Cong, uốn; rẽ", pos: "Tính từ", emoji: "", example: "这条路很弯。", examplePinyin: "zhè hěn wān", exampleVi: "Con đường này rất quanh co.", topic: "mieu_ta" },
];

// ===== Helpers =====
export const getWordsByTopic = (topic: TopicId): VocabWord[] =>
  VOCAB.filter(w => w.topic === topic);

export const getTopic = (id: TopicId): Topic =>
  TOPICS.find(t => t.id === id) || TOPICS[0];

export const TOTAL_WORDS = VOCAB.length;
