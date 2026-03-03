import React from 'react';
import { StockCard } from './StockCard';
import { Package } from 'lucide-react';

export const PatternSection = ({ title, stocks, patternType, icon }) => {
  if (stocks.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <p className="text-sm text-slate-400">No stocks found</p>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-12 border border-slate-700/50 text-center">
          <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 text-lg">
            No {title.toLowerCase()} detected on this timeframe
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <div>
            <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
            <p className="text-sm text-slate-400">
              <span
                className={`font-semibold ${
                  patternType === 'hammer' ? 'text-emerald-400' : 'text-blue-400'
                }`}
              >
                {stocks.length}
              </span>{' '}
              {stocks.length === 1 ? 'stock' : 'stocks'} detected
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stocks.map((stock, index) => (
          <div
            key={stock.symbol}
            className="animate-in fade-in-50 slide-in-from-bottom-4"
            style={{
              animationDelay: `${index * 50}ms`,
              animationFillMode: 'backwards',
            }}
          >
            <StockCard stock={stock} patternType={patternType} />
          </div>
        ))}
      </div>
    </div>
  );
};
