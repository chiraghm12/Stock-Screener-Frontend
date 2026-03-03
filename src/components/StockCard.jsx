import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { MiniChart } from './MiniChart';

export const StockCard = ({ stock, patternType }) => {
  const isPositive = stock.change >= 0;

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
        className={`absolute inset-0 bg-gradient-to-br ${
          patternType === 'hammer'
            ? 'from-emerald-500/5 to-transparent'
            : 'from-blue-500/5 to-transparent'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold text-slate-100">
                {stock.symbol}
              </h3>
              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  patternType === 'hammer'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                }`}
              >
                {patternType === 'hammer' ? 'Hammer' : 'Inv. Hammer'}
              </span>
            </div>
            <p className="text-sm text-slate-400 line-clamp-1">{stock.name}</p>
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
              className={`text-xl font-bold ${
                isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {isPositive ? '+' : ''}
              {stock.change.toFixed(2)}%
            </span>
          </div>
          {stock.price && (
            <span className="text-sm text-slate-300 font-semibold">
              ₹{stock.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mb-4">
          <MiniChart change={stock.change} />
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Activity className="w-4 h-4" />
            <span className="text-xs font-medium">Volume</span>
          </div>
          <span className="text-sm font-semibold text-slate-300">
            {formatVolume(stock.volume)}
          </span>
        </div>
      </div>
    </div>
  );
};
