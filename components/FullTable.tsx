
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Grid3x3, Sparkles } from 'lucide-react';

interface Props {
    table: number;
}

const FullTable: React.FC<Props> = ({ table }) => {
    const [hoveredCell, setHoveredCell] = useState<{ row: number, col: number } | null>(null);
    const [highlightedRow, setHighlightedRow] = useState<number | null>(null);
    const [highlightedCol, setHighlightedCol] = useState<number | null>(null);

    const getGradientColor = (value: number) => {
        if (value <= 10) return 'from-blue-500 to-blue-600';
        if (value <= 25) return 'from-green-500 to-green-600';
        if (value <= 50) return 'from-yellow-500 to-yellow-600';
        if (value <= 75) return 'from-orange-500 to-orange-600';
        return 'from-red-500 to-red-600';
    };

    return (
        <div className="flex flex-col h-full">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <Grid3x3 className="w-7 h-7" />
                    جدول ضرب کامل
                </h2>
                <p className="text-gray-400">روی هر سلول کلیک کن تا سطر و ستونش رو ببینی!</p>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-auto pb-4">
                <div className="inline-block">
                    {/* جدول ضرب */}
                    <div className="grid grid-cols-11 gap-1 p-2 glass rounded-2xl">
                        {/* سلول خالی گوشه */}
                        <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-yellow-400" />
                        </div>

                        {/* هدر ستون‌ها */}
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => (
                            <motion.div
                                key={`header-${col}`}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: col * 0.05 }}
                                className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-bold text-lg ${highlightedCol === col
                                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110 shadow-xl'
                                        : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                                    }`}
                            >
                                {col}
                            </motion.div>
                        ))}

                        {/* سطرها */}
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((row) => (
                            <React.Fragment key={`row-${row}`}>
                                {/* هدر سطر */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: row * 0.05 }}
                                    className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-bold text-lg ${highlightedRow === row
                                            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white scale-110 shadow-xl'
                                            : 'bg-gradient-to-br from-indigo-600 to-blue-600 text-white'
                                        }`}
                                >
                                    {row}
                                </motion.div>

                                {/* سلول‌های جدول */}
                                {Array.from({ length: 10 }, (_, i) => i + 1).map((col) => {
                                    const value = row * col;
                                    const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;
                                    const isHighlighted = highlightedRow === row || highlightedCol === col;

                                    return (
                                        <motion.div
                                            key={`cell-${row}-${col}`}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{
                                                delay: (row + col) * 0.02,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                zIndex: 10,
                                                transition: { duration: 0.2 }
                                            }}
                                            onMouseEnter={() => setHoveredCell({ row, col })}
                                            onMouseLeave={() => setHoveredCell(null)}
                                            onClick={() => {
                                                setHighlightedRow(highlightedRow === row ? null : row);
                                                setHighlightedCol(highlightedCol === col ? null : col);
                                            }}
                                            className={`
                        w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl font-bold
                        cursor-pointer relative transition-all duration-300
                        ${isHighlighted
                                                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg ring-2 ring-purple-300'
                                                    : isHovered
                                                        ? 'bg-gradient-to-br from-yellow-400 to-orange-400 text-white shadow-xl'
                                                        : `bg-gradient-to-br ${getGradientColor(value)} text-white opacity-80 hover:opacity-100`
                                                }
                      `}
                                        >
                                            {value}

                                            {/* انیمیشن ستاره برای اعداد خاص */}
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0, rotate: -180 }}
                                                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                        exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                                        className="absolute -top-1 -right-1"
                                                    >
                                                        <Sparkles className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* اطلاعات تعاملی */}
                    <AnimatePresence>
                        {hoveredCell && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="mt-4 text-center p-4 glass rounded-2xl"
                            >
                                <p className="text-xl font-bold">
                                    {hoveredCell.row} × {hoveredCell.col} = {hoveredCell.row * hoveredCell.col}
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {hoveredCell.row} دسته {hoveredCell.col} تایی میشه {hoveredCell.row * hoveredCell.col} تا!
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* راهنما */}
                    {!hoveredCell && !highlightedRow && !highlightedCol && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-4 text-center p-3 bg-white/5 rounded-xl border border-white/10"
                        >
                            <p className="text-sm text-gray-400">
                                💡 روی هر عدد hover کن یا کلیک کن!
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FullTable;
