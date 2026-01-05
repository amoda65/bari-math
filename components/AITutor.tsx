
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, CheckCircle } from 'lucide-react';

interface Props {
  table: number;
}

const educationalContent: Record<number, {
  concept: string;
  realWorld: string;
  trick: string;
  example: string;
}> = {
  1: {
    concept: "هر عددی ضرب در ۱ میشه خودش! مثل اینه که یه چیزو یک بار داشته باشی.",
    realWorld: "اگه یک پیتزا داشته باشی، همون یک پیتزا رو خواهی خورد!",
    trick: "ساده‌ترین جدول! فقط کافیه عدد رو بنویسی.",
    example: "۱ × ۵ = ۵ چون یک دسته ۵ تایی داریم."
  },
  2: {
    concept: "ضرب در ۲ یعنی دوبرابر! مثل اینکه دو تا از یه چیز داشته باشی.",
    realWorld: "اگه دو تا دست داری و هرکدوم ۳ تا انگشت داشته باشن، جمعاً ۶ تا انگشتی!",
    trick: "عدد رو اول با خودش جمع کن: ۴ × ۲ = ۴ + ۴ = ۸",
    example: "۲ × ۶ = ۱۲ چون دو دسته ۶ تایی میشه ۱۲ تا."
  },
  3: {
    concept: "ضرب در ۳ یعنی سه تا! مثل سه قسمت یک چیز.",
    realWorld: "سه نفر دوست داری، به هرکدوم ۴ تا شیرینی میدی = ۱۲ تا شیرینی!",
    trick: "عدد رو سه بار جمع کن: ۳ × ۴ = ۴ + ۴ + ۴ = ۱۲",
    example: "۳ × ۵ = ۱۵ چون سه دسته ۵ تایی میشه ۱۵."
  },
  4: {
    concept: "ضرب در ۴ مثل چهار گوشه یک چیزه! دو برابر دو برابر.",
    realWorld: "یه میز ۴ پا داره، اگه ۳ تا میز داشته باشی = ۱۲ تا پا!",
    trick: "دو بار دوبرابر کن: ۴ × ۳ → ابتدا ۳ × ۲ = ۶ بعد ۶ × ۲ = ۱۲",
    example: "۴ × ۵ = ۲۰ چون چهار دسته ۵ تایی."
  },
  5: {
    concept: "ضرب در ۵ خیلی راحته! همیشه به ۰ یا ۵ ختم میشه.",
    realWorld: "پنج انگشت داری، ۴ نفر = ۲۰ انگشت کل!",
    trick: "عدد رو ضرب در ۱۰ کن و نصفش کن: ۵ × ۶ → ۶ × ۱۰ = ۶۰، نصفش = ۳۰",
    example: "۵ × ۷ = ۳۵ چون پنج دسته ۷ تایی."
  },
  6: {
    concept: "ضرب در ۶ ترکیب ۲ و ۳ هست! راحت‌تر از چیزی که فکر می‌کنی.",
    realWorld: "یه تخم مرغ بسته ۶ تایی داره، ۴ بسته = ۲۴ تا تخم مرغ!",
    trick: "ابتدا ضرب در ۳ کن، بعد دو برابر: ۶ × ۴ → ۳ × ۴ = ۱۲، بعد ۱۲ × ۲ = ۲۴",
    example: "۶ × ۵ = ۳۰ چون شش دسته ۵ تایی."
  },
  7: {
    concept: "ضرب در ۷ یکم سخت‌تره ولی با تمرین راحت میشه!",
    realWorld: "هفته ۷ روزه، ۳ هفته = ۲۱ روز!",
    trick: "از ۵ کمک بگیر: ۷ × ۶ = (۵ × ۶) + (۲ × ۶) = ۳۰ + ۱۲ = ۴۲",
    example: "۷ × ۸ = ۵۶ چون هفت دسته ۸ تایی."
  },
  8: {
    concept: "ضرب در ۸ یعنی دو برابر، دو برابر، دو برابر!",
    realWorld: "یه اختاپوس ۸ تا پا داره، ۳ تا اختاپوس = ۲۴ پا!",
    trick: "سه بار دوبرابر کن: ۸ × ۵ → ۵×۲=۱۰ → ۱۰×۲=۲۰ → ۲۰×۲=۴۰",
    example: "۸ × ۶ = ۴۸ چون هشت دسته ۶ تایی."
  },
  9: {
    concept: "ضرب در ۹ یه ترفند جالب داره! انگشتات میتونن کمکت کنن.",
    realWorld: "۹ تا موز در هر دسته، ۵ دسته = ۴۵ تا موز!",
    trick: "ضرب در ۱۰ کن، یکی کم کن: ۹ × ۷ = (۱۰ × ۷) - ۷ = ۷۰ - ۷ = ۶۳",
    example: "۹ × ۴ = ۳۶ چون نه دسته ۴ تایی."
  },
  10: {
    concept: "ساده‌ترین جدول بعد از ۱! فقط یه صفر اضافه کن.",
    realWorld: "۱۰ تا انگشت داری، ۳ نفر = ۳۰ انگشت!",
    trick: "فقط صفر بنویس: ۱۰ × ۶ = ۶۰",
    example: "۱۰ × ۸ = ۸۰ چون ده دسته ۸ تایی."
  }
};

const AITutor: React.FC<Props> = ({ table }) => {
  const [selectedMultiplier, setSelectedMultiplier] = useState(5);
  const content = educationalContent[table] || educationalContent[1];
  const result = table * selectedMultiplier;

  return (
    <div className="flex flex-col h-full">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">راهنمای جدول {table}</h2>
        <p className="text-gray-400">بیا با هم یاد بگیریم چطور جدول {table} رو راحت‌تر یاد بگیریم!</p>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-6">
        {/* مفهوم اصلی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 p-3 rounded-xl">
              <Lightbulb className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">مفهوم اصلی</h3>
          </div>
          <p className="text-lg leading-relaxed text-blue-100">{content.concept}</p>
        </motion.div>

        {/* مثال واقعی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-600 p-3 rounded-xl">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">مثال از زندگی</h3>
          </div>
          <p className="text-lg leading-relaxed text-green-100">{content.realWorld}</p>
        </motion.div>

        {/* ترفند یادگیری */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 p-3 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold">ترفند حل سریع</h3>
          </div>
          <p className="text-lg leading-relaxed text-purple-100">{content.trick}</p>
        </motion.div>

        {/* تمرین عملی */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-3xl p-6"
        >
          <h3 className="text-xl font-bold mb-4">تمرین کن!</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-lg">تعداد:</span>
              <input
                type="range"
                min="1"
                max="10"
                value={selectedMultiplier}
                onChange={(e) => setSelectedMultiplier(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-2xl font-bold w-8">{selectedMultiplier}</span>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 text-center">
              <p className="text-3xl font-bold mb-2">
                {table} × {selectedMultiplier} = {result}
              </p>
              <p className="text-gray-400">{content.example.replace(/\d+/g, (match) => {
                const num = parseInt(match);
                if (num === table * selectedMultiplier) return result.toString();
                if (match === table.toString()) return table.toString();
                return selectedMultiplier.toString();
              })}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AITutor;
