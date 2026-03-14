import React, { useState, useMemo } from 'react';
import { StockCard } from './StockCard';
import { Package, ExternalLink, Info } from 'lucide-react';

export const PatternSection = ({ title, stocks, patternType, icon }) => {
    // Array of selected index value strings (e.g. ['nifty_50', 'nifty_100'])
    const [selectedFilters, setSelectedFilters] = useState([]);

    const filters = [
        { label: 'Nifty 50', value: 'nifty_50' },
        { label: 'Nifty Next 50', value: 'nifty_next_50' },
        { label: 'Nifty 100', value: 'nifty_100' },
        { label: 'Nifty 200', value: 'nifty_200' },
        { label: 'Nifty 500', value: 'nifty_500' },
    ];

    const toggleFilter = (filterValue) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filterValue)) {
                return prev.filter((f) => f !== filterValue);
            } else {
                return [...prev, filterValue];
            }
        });
    };

    const filteredStocks = useMemo(() => {
        if (selectedFilters.length === 0) return stocks;
        return stocks.filter((s) => {
            return selectedFilters.some((filterValue) => s.stock && s.stock[filterValue] === true);
        });
    }, [stocks, selectedFilters]);

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
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                    {icon}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-100">{title}</h2>
                        <p className="text-sm text-slate-400">
                            <span
                                className={`font-semibold ${['hammer', 'bullish_engulfing', 'bullish_kicker', 'pro_gap_positive'].includes(patternType) ? 'text-emerald-400' : patternType === 'doji' ? 'text-blue-400' : 'text-red-400'
                                    }`}
                            >
                                {filteredStocks.length}
                            </span>{' '}
                            {filteredStocks.length === 1 ? 'stock' : 'stocks'} detected
                        </p>
                    </div>
                </div>

                {/* Filter Checkboxes */}
                <div className="flex flex-wrap items-center gap-3">
                    {filters.map((f) => (
                        <label key={f.value} className="flex items-center gap-2 cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedFilters.includes(f.value)}
                                onChange={() => toggleFilter(f.value)}
                                className="w-4 h-4 rounded border-slate-700/50 bg-slate-800 text-slate-500 focus:ring-1 focus:ring-slate-500 focus:ring-offset-slate-900 focus:ring-offset-2 transition-colors cursor-pointer"
                            />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none font-medium">
                                {f.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {filteredStocks.length === 0 ? (
                <div className="bg-slate-900/50 rounded-xl p-12 border border-slate-700/50 text-center">
                    <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">
                        No {title.toLowerCase()} inside the selected indices on this timeframe
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredStocks.map((stock, index) => (
                        <div
                            key={stock.stock?.symbol ?? index}
                            className="animate-in fade-in-50 slide-in-from-bottom-4"
                            style={{
                                animationDelay: `${index * 50}ms`,
                                animationFillMode: 'backwards',
                            }}
                        >
                            <StockCard
                                stock={stock}
                                patternType={patternType}
                                linkUrl={stock.stock?.chart_link}
                                linkIcon={ExternalLink}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
