export default function HomeCard( { children, isActive } ) {
    return (
        <div className={`relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200`}>
            <div className={`container_home relative w-full max-w-4xl min-h-[480px] rounded-lg shadow-lg overflow-hidden ${isActive ? "active" : ""}`}>
                {children}
            </div>
        </div>
    )
}