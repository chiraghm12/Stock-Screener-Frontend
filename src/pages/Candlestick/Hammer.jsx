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
                                        <FaHammer className="w-6 h-6 text-emerald-400" />
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