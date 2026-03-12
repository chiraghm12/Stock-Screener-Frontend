import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MiniChart } from './MiniChart';

export const StockCard = ({ stock, patternType, linkUrl, linkIcon: LinkIcon }) => {
    const isPositive = stock.stock_price_details.amount_change >= 0;

    const toNumber = (value) => {
        if (typeof value === 'number') return value;
        if (typeof value === 'string' && value.trim() !== '') {
            const n = Number(value);
            return Number.isFinite(n) ? n : null;
        }
        return null;
    };


    const formatVolume = (volume) => {
        if (volume >= 10000000) return `${(volume / 10000000).toFixed(2)}Cr`;
        if (volume >= 100000) return `${(volume / 100000).toFixed(2)}L`;
        return volume.toLocaleString();
    };

    return (
        <div
            className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/30 rounded-xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1 cursor-pointer overflow-hidden"
        >
            <div
                className={`absolute inset-0 bg-gradient-to-br ${patternType === 'hammer'
                    ? 'from-emerald-500/5 to-transparent'
                    : 'from-blue-500/5 to-transparent'
                    } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-slate-100">
                                {stock.stock.symbol}
                            </h3>
                            <span
                                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${patternType === 'hammer'
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                    }`}
                            >
                                {patternType === 'hammer' ? 'Hammer' : 'Inv. Hammer'}
                            </span>
                            {linkUrl && LinkIcon && (
                                <a
                                    href={linkUrl}
                                    target="_blank" rel="noopener noreferrer"
                                    className="ml-2 text-slate-400 hover:text-slate-200"
                                    onClick={(e) => e.stopPropagation()} // prevent card click if any
                                >
                                    <LinkIcon className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 line-clamp-1">{stock.stock.name}</p>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        {isPositive ? (
                            <TrendingUp className="w-5 h-5 text-emerald-400" />
                        ) : (
                            <TrendingDown className="w-5 h-5 text-rose-400" />
                        )}
                        <span
                            className={`text-xl font-bold ${isPositive ? 'text-emerald-400' : 'text-rose-400'
                                }`}
                        >
                            {isPositive ? '+' : ''}
                            {toNumber(stock.stock_price_details.percentage_change)?.toFixed(2) ?? '0.00'}%
                        </span>
                    </div>
                    {toNumber(stock.stock_price_details.closing_price) !== null && (
                        <span className="text-sm text-slate-300 font-semibold">
                            ₹{toNumber(stock.stock_price_details.closing_price).toFixed(2)}
                        </span>
                    )}
                </div>

                <div className="mb-4">
                    <MiniChart change={stock.stock_price_details.percentage_change} />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
                    <div className="flex items-center gap-1.5 text-slate-400">
                        <Activity className="w-4 h-4" />
                        <span className="text-xs font-medium">Traded Quantity</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-300">
                        {formatVolume(stock.stock_price_details.total_traded_quantity)}
                    </span>
                </div>
            </div>
        </div>
    );
};
