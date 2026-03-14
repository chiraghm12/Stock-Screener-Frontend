import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useSidebar } from "../context/SidebarContext";
import { apiClient } from "../api/axios";
// import { ThemeToggleButton } from "../components/common/ThemeToggleButton";
// import UserDropdown from "../components/header/UserDropdown";
import {
    IoCloseOutline,
    HiBars3,
    HiOutlineDotsHorizontal,
    CiSearch,
} from "../icons";
// import { useAuth } from "../context/AuthContext";

const AppHeader = () => {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
    const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
    const [isRefreshing, setIsRefreshing] = useState(false);

    //   const { user, loading } = useAuth();

    const handleToggle = () => {
        if (window.innerWidth >= 1024) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    const toggleApplicationMenu = () => {
        setApplicationMenuOpen(!isApplicationMenuOpen);
    };

    const handleRefresh = async () => {
        try {
            setIsRefreshing(true);
            await apiClient.post("/create-stock-prices/");
            console.log("refresh api called successfully");
        } catch (error) {
            console.error("Failed to refresh data:", error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <header className="sticky top-0 flex w-full bg-slate-950 border-b border-gray-800 z-50 lg:border-b">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    {/* Toggle Sidebar Button */}
                    <button
                        className="items-center justify-center w-10 h-10 text-gray-400 border-gray-800 rounded-lg z-50 lg:flex lg:h-11 lg:w-11 lg:border hover:bg-slate-800/50 hover:text-gray-100"
                        onClick={handleToggle}
                        aria-label="Toggle Sidebar"
                    >
                        {isMobileOpen ? (
                            // Close Icon
                            <IoCloseOutline className="w-6 h-6" />
                        ) : (
                            // Bars Icon
                            <HiBars3 className="w-6 h-6" />
                        )}
                    </button>

                    {/* Logo */}
                    <Link to="/candlestick-patterns" className="lg:hidden">
                        <img
                            className="dark:hidden"
                            src="/src/assets/images/MoneyTrackerLogo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                        <img
                            className="hidden dark:block"
                            src="/src/assets/images/MoneyTrackerLogo.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        />
                    </Link>

                    {/* Toggle Application Menu Button */}
                    <button
                        onClick={toggleApplicationMenu}
                        className="flex items-center justify-center w-10 h-10 text-gray-400 rounded-lg z-50 hover:bg-slate-800/50 hover:text-gray-100 lg:hidden"
                    >
                        <HiOutlineDotsHorizontal className="w-6 h-6" />
                    </button>

                    {/* Search Input for Large Screens */}
                    {/* <div className="hidden lg:block">
            <form>
              <div className="relative">
                <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                  <CiSearch className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search or type command..."
                  className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
                />
                <button className="absolute right-2.5 top-1/2 inline-flex -translate-y-1/2 items-center gap-0.5 rounded-lg border border-gray-200 bg-gray-50 px-[7px] py-[4.5px] text-xs -tracking-[0.2px] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                  <span> ⌘ </span>
                  <span> K </span>
                </button>
              </div>
            </form>
          </div> */}
                </div>

                <div
                    className={`${isApplicationMenuOpen ? "flex" : "hidden"
                        } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0 border-t border-gray-800 lg:border-t-0 bg-slate-950 lg:bg-transparent`}
                >
                    <div className="flex items-center gap-2 2xsm:gap-3">
                        {/* Theme Toggle Button */}
                        {/* <ThemeToggleButton /> */}
                        {/* <NotificationDropdown /> */}

                        <button
                            type="button"
                            onClick={handleRefresh}
                            disabled={isRefreshing}
                            className={`inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium border border-gray-700 text-gray-100 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed`}
                        >
                            {isRefreshing ? "Refreshing..." : "Refresh Data"}
                        </button>
                    </div>
                    {/* User Dropdown */}
                    {/* <UserDropdown user={user} loading={loading} /> */}
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
