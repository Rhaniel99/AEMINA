export default function HomeToggle({ children }) {
    return (
        <div className="toggle-container_home absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-300 rounded-r-lg z-20">
            <div className="toggle bg-gradient-to-r from-indigo-500 to-purple-600 h-full text-white flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
}
