export default function Modal({ open, onClose, children }) {
    return (
        <>
            <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors 
                    ${ open ? "visible bg-black/20" : "invisible" }`}>
                
                {/* Modal */}
                <div onClick={(e) => e.stopPropagation()} className={`dark:bg-[#CB665A] dark:border-[#F3BD97] rounded-xl shadow p-6 transition-all 
                    ${ open ? "scale-100 opacity-100" : "scale-125 opacity-0" }`} >
                        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounred-lg text-gray-400 bg-[#CB665A] hover:bg-[#CB665A] hover:text-gray-600">
                            X
                        </button>
                                            {children}
                </div>
            </div>
        </>
    );
}
