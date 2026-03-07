import { useState } from 'react';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PatternSection } from '../../components/PatternSection';
import { mockData } from '../../data/mockData';
import { FaArrowTurnUp } from 'react-icons/fa6';

const InvertedHammer = () => {
    const [data, setData] = useState(mockData);
    const [isLoading, setIsLoading] = useState(false);
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                <main className="container mx-auto px-4 py-8">
                    {isLoading ? (
                        <LoadingSkeleton />
                    ) : data ? (
                        <div className="space-y-12">
                            <PatternSection
                                title="Inverted Hammer Pattern"
                                stocks={data.inverted_hammer}
                                patternType="inverted_hammer"
                                icon={
                                    <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
                                        <FaArrowTurnUp className="w-6 h-6 text-blue-400" />
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

export default InvertedHammer;
