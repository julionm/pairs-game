import { ReactNode, useRef } from "react";
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
    onClose?: () => void
}

export function Modal({ children, isVisible = false, onClose }: ModalOptions) {

    const modal = useRef<HTMLDivElement | null>(null);

    function closeModal() {
        if (!modal.current) return;

        modal.current.classList.remove('modal-show');
        modal.current.classList.add('modal-hide');

        onClose && onClose();
    }

    return (
        <ModalPortal>
            <div
                ref={modal}
                className={`fixed inset-0 z-1 scale-0 ${isVisible ? 'modal-show' : 'modal-hide'}`}>
                <div
                    onClick={closeModal}
                    className="fixed inset-0 bg-black bg-opacity-75">  
                </div>

                <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center">
                    <div className="bg-white rounded-lg min-w-[200px] relative">
                        <div
                            onClick={closeModal}
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
