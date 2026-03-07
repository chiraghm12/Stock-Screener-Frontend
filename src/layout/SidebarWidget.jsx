const SidebarWidget = () => {
  return (
    <>
      <footer className="border-t border-slate-800 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-slate-500 text-sm">
            <p className="font-bold mb-2">
              Stock Screener
            </p>
            <p className="text-sm">
              Candlestick Patterns & Delivery Data
            </p>
            <p className="mt-2 text-xs">
              Developed by <a href="https://www.linkedin.com/in/chirag-mandaviya-4b5b971ab" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Chirag Mandaviya</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default SidebarWidget;
