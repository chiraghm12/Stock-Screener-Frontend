import React, { useState } from 'react';
import { RefreshCw, Calendar, TrendingUp } from 'lucide-react';

export const Header = ({ date, onRefresh, isLoading }) => {
  const timeframes = ['5m', '15m', '1H', '4H', '1D', '1W'];
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-xl border border-emerald-500/30">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-100 tracking-tight">
                NIFTY 500 Candlestick Scanner
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="w-4 h-4 text-slate-400" />
                <p className="text-sm text-slate-400">{formatDate(date)}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-lg p-1.5 border border-slate-700/50">
              {timeframes.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  disabled={tf !== '1D'}
                  className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                    tf === selectedTimeframe
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                      : tf === '1D'
                      ? 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
                      : 'text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-slate-100 font-semibold h-full px-4 py-2 rounded-md flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
