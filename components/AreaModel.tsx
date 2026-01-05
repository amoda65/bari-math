
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3Icon, ArrowDown, ArrowLeft } from 'lucide-react';

interface Props {
  table: number;
}

const AreaModel: React.FC<Props> = ({ table }) => {
  const [multiplier, setMultiplier] = useState(4);
  const [showCount, setShowCount] = useState(false);

  const totalCells = table * multiplier;

  return (
    <div className="flex flex-col h-full items-center justify-center p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Grid3x3Icon className="w-7 h-7" />
          روش مستطیل (شمارش خانه‌ها)
        </h2>
        <p className="text-gray-400">ضرب یعنی شمارش خانه‌های یک مستطیل!</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full max-w-6xl">
        {/* کنترل‌ها */}
        <div className="glass rounded-3xl p-8 w-full lg:w-80 space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">تعداد ردیف‌ها ({table})</label>
            <div className="text-4xl font-bold text-center p-4 bg-blue-600/30 rounded-2xl">
              {table}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">تعداد ستون‌ها</label>
            <input
              type="range"
              min="1"
              max="10"
              value={multiplier}
              onChange={(e) => {
                setMultiplier(parseInt(e.target.value));
                setShowCount(false);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="text-4xl font-bold text-center p-4 bg-purple-600/30 rounded-2xl mt-2">
              {multiplier}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-center mb-4">
              <p className="text-lg text-gray-300 mb-2">
                {table} ردیف × {multiplier} ستون
              </p>
              <motion.p
                key={totalCells}
                initial={{ scale: 1.2, color: '#60a5fa' }}
                animate={{ scale: 1, color: '#ffffff' }}
                className="text-5xl font-black"
              >
                = {totalCells}
              </motion.p>
            </div>

            <button
              onClick={() => setShowCount(!showCount)}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-colors"
            >
              {showCount ? '🔢 مخفی کردن اعداد' : '🔢 نمایش شماره خانه‌ها'}
            </button>
          </div>
        </div>

        {/* مستطیل */}
        <div className="flex-1 flex items-center justify-center">
          <div className="glass rounded-3xl p-8 inline-block">
            <div className="relative">
              {/* برچسب بالا */}
              <div className="absolute -top-12 left-0 right-0 flex items-center justify-center gap-2">
                <ArrowDown className="w-5 h-5 text-purple-400" />
                <span className="text-xl font-bold text-purple-400">{multiplier} ستون</span>
                <ArrowDown className="w-5 h-5 text-purple-400" />
              </div>

              {/* برچسب چپ */}
              <div className="absolute -left-24 top-0 bottom-0 flex flex-col items-center justify-center gap-2">
                <ArrowLeft className="w-5 h-5 text-blue-400" />
                <span className="text-xl font-bold text-blue-400 -rotate-90 whitespace-nowrap">
                  {table} ردیف
                </span>
                <ArrowLeft className="w-5 h-5 text-blue-400" />
              </div>

              {/* Grid مستطیل */}
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${multiplier}, minmax(0, 1fr))`,
                }}
              >
                {Array.from({ length: totalCells }, (_, i) => (
                  <motion.div
                    key={`${table}-${multiplier}-${i}`}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: i * 0.02,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg hover:scale-110 transition-transform cursor-pointer"
                  >
                    {showCount && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-sm"
                      >
                        {i + 1}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* توضیح زیر مستطیل */}
            <motion.div
              key={`${table}-${multiplier}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-white/5 rounded-2xl text-center"
            >
              <p className="text-lg">
                شمردیم: <span className="font-bold text-green-400">{totalCells} خانه</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                پس {table} × {multiplier} = {totalCells}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AreaModel;
