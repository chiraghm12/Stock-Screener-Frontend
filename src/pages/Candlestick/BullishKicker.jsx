import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PatternSection } from '../../components/PatternSection';
import { apiClient } from '../../api/axios';

const BullishKicker = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBullishKickerData = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/patterns/bullish-kicker/');
                console.log("responseData: ", response);
                setData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch bullish kicker data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBullishKickerData();
    }, []);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <main className="container mx-auto px-4 py-8">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : data && data.length ? (
                        <div className="space-y-12">
                            <PatternSection
                                title="Bullish Kicker Pattern"
                                stocks={data}
                                patternType="bullish_kicker"
                                icon={
                                    <div className="p-3 flex items-center justify-center bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                                        <svg
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                        >
                                            <g id="SVGRepo_bgCarrier"></g>
                                            <g id="SVGRepo_tracerCarrier"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M7.5 7.5H7.25V4C7.25 3.59 6.91 3.25 6.5 3.25C6.09 3.25 5.75 3.59 5.75 4V7.5H5.5C3.91 7.5 3 8.41 3 10V18C3 19.59 3.91 20.5 5.5 20.5H5.75V22C5.75 22.41 6.09 22.75 6.5 22.75C6.91 22.75 7.25 22.41 7.25 22V20.5H7.5C9.09 20.5 10 19.59 10 18V10C10 8.41 9.09 7.5 7.5 7.5Z"
                                                    fill="#EF4444"
                                                />
                                                <path
                                                    d="M18.5 2.5H18.25V2C18.25 1.59 17.91 1.25 17.5 1.25C17.09 1.25 16.75 1.59 16.75 2V2.5H16.5C14.91 2.5 14 3.41 14 5V13C14 14.59 14.91 15.5 16.5 15.5H16.75V19C16.75 19.41 17.09 19.75 17.5 19.75C17.91 19.75 18.25 19.41 18.25 19V15.5H18.5C20.09 15.5 21 14.59 21 13V5C21 3.41 20.09 2.5 18.5 2.5Z"
                                                    fill="#10B981"
                                                />
                                            </g>
                                        </svg>
                                    </div>
                                }
                            />
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-slate-400 text-lg">Failed to load data</p>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
};

export default BullishKicker;
