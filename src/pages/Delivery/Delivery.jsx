import React, { useEffect, useState, useMemo } from 'react';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { apiClient } from '../../api/axios';
import { Package, TrendingUp, Search } from 'lucide-react';

const Delivery = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [onlyGreater, setOnlyGreater] = useState(false);

    const filters = [
        { label: 'Nifty 50', value: 'nifty_50' },
        { label: 'Nifty Next 50', value: 'nifty_next_50' },
        { label: 'Nifty 100', value: 'nifty_100' },
        { label: 'Nifty 200', value: 'nifty_200' },
        { label: 'Nifty 500', value: 'nifty_500' },
    ];

    useEffect(() => {
        const fetchDeliveryData = async () => {
            try {
                setIsLoading(true);
                // Dynamically append only_greater based on the checkbox state
                const response = await apiClient.get('/delivery-data/', {
                    params: {
                        only_greater: onlyGreater ? 'true' : 'false'
                    }
                });
                setData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch delivery data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDeliveryData();
    }, [onlyGreater]);

    const toggleFilter = (filterValue) => {
        setSelectedFilters((prev) => {
            if (prev.includes(filterValue)) {
                return prev.filter((f) => f !== filterValue);
            } else {
                return [...prev, filterValue];
            }
        });
    };

    const filteredData = useMemo(() => {
        return data.filter((stock) => {
            // Check Nifty Index 
            const matchesFilter = selectedFilters.length === 0 || selectedFilters.some((f) => stock[f] === true);
            
            // Check Search Query
            const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  stock.name.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesFilter && matchesSearch;
        });
    }, [data, selectedFilters, searchQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <main className="container mx-auto px-4 py-8">
                <div className="space-y-6">
                    {/* Header Details */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                                <TrendingUp className="text-emerald-400 w-8 h-8" />
                                Delivery Analysis
                            </h1>
                            <p className="text-slate-400 mt-2">
                                Track the latest delivery percentages against their 30-day average. 
                                Stocks with higher latest delivery indicate strong holding intent.
                            </p>
                        </div>
                    </div>

                    {/* Filters & Search */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                        {/* Checkboxes */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div className="flex flex-wrap items-center gap-4 border-r border-slate-700/50 pr-6">
                                {filters.map((f) => (
                                    <label key={f.value} className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={selectedFilters.includes(f.value)}
                                            onChange={() => toggleFilter(f.value)}
                                            className="w-4 h-4 rounded border-slate-700/50 bg-slate-800 text-slate-500 focus:ring-1 focus:ring-emerald-500 focus:ring-offset-slate-900 focus:ring-offset-2 transition-colors cursor-pointer"
                                        />
                                        <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors select-none font-medium">
                                            {f.label}
                                        </span>
                                    </label>
                                ))}
                            </div>
                            
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <input
                                    type="checkbox"
                                    checked={onlyGreater}
                                    onChange={(e) => setOnlyGreater(e.target.checked)}
                                    className="w-4 h-4 rounded border-slate-700/50 bg-emerald-500/20 text-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:ring-offset-slate-900 focus:ring-offset-2 transition-colors cursor-pointer"
                                />
                                <span className="text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors select-none">
                                    Show Only Above Avg
                                </span>
                            </label>
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full lg:w-72">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search stocks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/80 text-slate-200 border border-slate-700 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-slate-500"
                            />
                        </div>
                    </div>

                    {/* Data Display */}
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : filteredData.length === 0 ? (
                        <div className="bg-slate-900/50 rounded-xl p-16 border border-slate-800 text-center">
                            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-slate-300 mb-2">No Delivery Data Found</h3>
                            <p className="text-slate-500 max-w-sm mx-auto">
                                We couldn't find any stocks matching your selected filters or search query.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-slate-900/40 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-800/80 border-b border-slate-700 text-sm font-semibold text-slate-300 tracking-wide uppercase">
                                            <th className="p-4 pl-6">Stock</th>
                                            <th className="p-4 text-right">Latest Delivery %</th>
                                            <th className="p-4 text-right">30D Avg Delivery %</th>
                                            <th className="p-4 pr-6 text-center">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800/50 text-sm text-slate-300">
                                        {filteredData.map((stock) => (
                                            <tr 
                                                key={stock.stock_id} 
                                                className="hover:bg-slate-800/40 transition-colors group"
                                            >
                                                <td className="p-4 pl-6">
                                                    <div className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">
                                                        {stock.symbol}
                                                    </div>
                                                    <div className="text-xs text-slate-500 mt-1 truncate max-w-[200px] md:max-w-xs">
                                                        {stock.name}
                                                    </div>
                                                </td>
                                                <td className={`p-4 text-right font-medium ${stock.is_greater_than_avg ? 'text-emerald-400' : 'text-slate-300'}`}>
                                                    {stock.latest_delivery_percentage ? `${stock.latest_delivery_percentage.toFixed(2)}%` : 'N/A'}
                                                </td>
                                                <td className="p-4 text-right text-slate-400">
                                                    {stock.average_delivery_percentage ? `${stock.average_delivery_percentage.toFixed(2)}%` : 'N/A'}
                                                </td>
                                                <td className="p-4 pr-6">
                                                    <div className="flex justify-center">
                                                        {stock.is_greater_than_avg ? (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                                Above Avg
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-400 border border-slate-700">
                                                                Below Avg
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Delivery;
