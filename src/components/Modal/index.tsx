import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalOptions {
    children: ReactNode
}

function ModalPortal ({ children }: ModalPortalOptions) {
    return createPortal(
        children,
        window.document.body
    );
}

interface ModalOptions {
    children: ReactNode,
    isVisible?: boolean,
    onClose: () => void
}

function Modal({ children, isVisible = false, onClose }: ModalOptions) {

    return (
        <ModalPortal>
            <div className={`fixed inset-0 z-1 scale-0 ${isVisible ? 'modal-show' : 'modal-hide'}`}>
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-75">  
                </div>

                <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center">
                    <div className="bg-white rounded-lg min-w-[200px] relative">
                        <div
                            onClick={onClose}
                            className="absolute right-2 top-2 h-6 aspect-square cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </div>
                        
                        {children}
                    </div>
                </div>
            </div>
        </ModalPortal>
    )
}

export default Modal;