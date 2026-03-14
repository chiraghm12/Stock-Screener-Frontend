import { useEffect, useState } from 'react';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PatternSection } from '../../components/PatternSection';
import { FaHammer } from 'react-icons/fa6';
import { apiClient } from '../../api/axios';

const Hammer = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchHammerData = async () => {
            try {
                setIsLoading(true);
                const response = await apiClient.get('/patterns/hammer/');
                console.log("responseData: ", response);
                setData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                console.error('Failed to fetch hammer data:', error);
                setData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHammerData();
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
                                title="Hammer Pattern"
                                stocks={data}
                                patternType="hammer"
                                icon={
                                    <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                                        <svg
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6"
                                        >
                                            <g id="SVGRepo_bgCarrier"></g>
                                            <g id="SVGRepo_tracerCarrier"></g>
                                            <g id="SVGRepo_iconCarrier">
                                                <path
                                                    d="M7.5 4.5H7.25V2C7.25 1.59 6.91 1.25 6.5 1.25C6.09 1.25 5.75 1.59 5.75 2V4.5H5.5C3.91 4.5 3 5.41 3 7V13C3 14.59 3.91 15.5 5.5 15.5H5.75V22C5.75 22.41 6.09 22.75 6.5 22.75C6.91 22.75 7.25 22.41 7.25 22V15.5H7.5C9.09 15.5 10 14.59 10 13V7C10 5.41 9.09 4.5 7.5 4.5Z"
                                                    fill="#FFFFFF"
                                                />
                                                <path
                                                    d="M18.5 8.5H18.25V2C18.25 1.59 17.91 1.25 17.5 1.25C17.09 1.25 16.75 1.59 16.75 2V8.5H16.5C14.91 8.5 14 9.41 14 11V17C14 18.59 14.91 19.5 16.5 19.5H16.75V22C16.75 22.41 17.09 22.75 17.5 22.75C17.91 22.75 18.25 22.41 18.25 22V19.5H18.5C20.09 19.5 21 18.59 21 17V11C21 9.41 20.09 8.5 18.5 8.5Z"
                                                    fill="#FFFFFF"
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

export default Hammer;