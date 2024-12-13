export default function HomeCard({ children, isActive }) {
    return (
        <div
            className={`relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200`}
        >
            <div
                className={`container_home bg-white relative w-[768px] max-w-full min-h-[480px] rounded-[30px] shadow-[0_5px_15px_rgba(0,0,0,0.35)] overflow-hidden ${
                    isActive ? "transform -translate-x-full rounded-[0_150px_100px_0]" : ""
                }`}
            >
                {children}
            </div>
        </div>
    );
}
