export default function HomeToggle({ children, isActive }) {
    return (
        <div className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out rounded-[150px_0_0_100px] z-[1000] ${
            isActive ? "transform -translate-x-full rounded-[0_150px_100px_0]" : ""
        }`}>
            <div className="toggle bg-gradient-to-r from-indigo-500 to-purple-600 h-full text-white flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
}
