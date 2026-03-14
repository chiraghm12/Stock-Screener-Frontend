import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Hammer from './pages/Candlestick/Hammer';
import InvertedHammer from './pages/Candlestick/InvertedHammer';
import BullishEngulfing from './pages/Candlestick/BullishEngulfing';
import BearishEngulfing from './pages/Candlestick/BearishEngulfing';
import Doji from './pages/Candlestick/Doji';
import BullishKicker from './pages/Candlestick/BullishKicker';
import BearishKicker from './pages/Candlestick/BearishKicker';
import ProGapPositive from './pages/Candlestick/ProGapPositive';
import ProGapNegative from './pages/Candlestick/ProGapNegative';
import Delivery from './pages/Delivery/Delivery';
import AppLayout from './layout/AppLayout';
import { Toaster } from 'react-hot-toast';

// const App = () => {
//   const [data, setData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const fetchData = async () => {
//     setIsLoading(true);
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     setData(mockData);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleRefresh = () => {
//     fetchData();
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       <Header
//         date={data?.date || new Date().toISOString().split('T')[0]}
//         onRefresh={handleRefresh}
//         isLoading={isLoading}
//       />

//       <main className="container mx-auto px-4 py-8">
//         {isLoading ? (
//           <LoadingSkeleton />
//         ) : data ? (
//           <div className="space-y-12">
//             <PatternSection
//               title="Hammer Pattern"
//               stocks={data.hammer}
//               patternType="hammer"
//               icon={
//                 <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
//                   <Hammer className="w-6 h-6 text-emerald-400" />
//                 </div>
//               }
//             />

//             <PatternSection
//               title="Inverted Hammer Pattern"
//               stocks={data.inverted_hammer}
//               patternType="inverted_hammer"
//               icon={
//                 <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30">
//                   <FlipVertical2 className="w-6 h-6 text-blue-400" />
//                 </div>
//               }
//             />
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <p className="text-slate-400 text-lg">Failed to load data</p>
//           </div>
//         )}
//       </main>

//       <footer className="border-t border-slate-800 mt-20">
//         <div className="container mx-auto px-4 py-8">
//           <div className="text-center text-slate-500 text-sm">
//             <p>
//               NIFTY 500 Candlestick Scanner | Data updates daily at market close
//             </p>
//             <p className="mt-2 text-xs">
//               This is a frontend demonstration with mock data
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Router>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/candlestick-patterns" replace />} />
            <Route path="/candlestick-patterns" element={<Navigate to="/hammer" replace />} />
            <Route path="/hammer" element={<Hammer />} />
            <Route path="/inverted-hammer" element={<InvertedHammer />} />
            <Route path="/bullish-engulfing" element={<BullishEngulfing />} />
            <Route path="/bearish-engulfing" element={<BearishEngulfing />} />
            <Route path="/doji" element={<Doji />} />
            <Route path="/bullish-kicker" element={<BullishKicker />} />
            <Route path="/bearish-kicker" element={<BearishKicker />} />
            <Route path="/pro-gap-positive" element={<ProGapPositive />} />
            <Route path="/pro-gap-negative" element={<ProGapNegative />} />
            <Route path="/delivery" element={<Delivery />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
