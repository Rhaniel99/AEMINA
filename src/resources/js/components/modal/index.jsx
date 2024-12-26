export default function Modal({ open, onClose, children }) {
    return (
        <>
            <div
                onClick={onClose}
                className={`fixed inset-0 flex justify-center items-center transition-colors 
                    ${open ? "visible bg-black/50" : "invisible"}`}
            >
                {/* Modal */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-white dark:bg-[#CB665A] dark:border-[#F3BD97] rounded-xl shadow-lg p-2 transition-all 
                        ${
                            open
                                ? "scale-100 opacity-100"
                                : "scale-125 opacity-0"
                        }`}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors duration-200"
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>
        </>
    );
}
