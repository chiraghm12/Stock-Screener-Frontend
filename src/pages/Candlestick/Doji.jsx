import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PatternSection } from '../../components/PatternSection';
import { apiClient } from '../../api/axios';

const Doji = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchDojiData = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/patterns/doji/');
                console.log("responseData: ", response);
                setData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch doji data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDojiData();
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
                                title="Doji Pattern"
                                stocks={data}
                                patternType="doji"
                                icon={
                                    <div className="p-3 flex items-center justify-center bg-blue-500/20 rounded-xl border border-blue-500/30">
                                        <svg
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                        >
                                            <g id="SVGRepo_bgCarrier"></g>
                                            <g id="SVGRepo_tracerCarrier"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M12.5 12.5H16.5C16.78 12.5 17 12.28 17 12C17 11.72 16.78 11.5 16.5 11.5H12.5V4.5C12.5 4.22 12.28 4 12 4C11.72 4 11.5 4.22 11.5 4.5V11.5H7.5C7.22 11.5 7 11.72 7 12C7 12.28 7.22 12.5 7.5 12.5H11.5V19.5C11.5 19.78 11.72 20 12 20C12.28 20 12.5 19.78 12.5 19.5V12.5Z"
                                                    fill="#60A5FA"
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

export default Doji;
