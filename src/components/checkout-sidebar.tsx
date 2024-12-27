"use client";

import { CartCountContext } from "@/app/(frontend)/cart-count-context";
import { CheckoutSidebarContext } from "@/app/(frontend)/checkout-sidebar-context";
import { useContext } from "react";

export const CheckoutSidebar = () => {
  const { isOpen, setIsOpen } = useContext(CheckoutSidebarContext)!;
  const { cartCount, reloadCartCount } = useContext(CartCountContext)!;

  const handleClearCart = () => {
    if (!confirm("Anda yakin ingin mengosongkan keranjang?")) {
      return;
    }

    localStorage.removeItem("cart");
    reloadCartCount();
  };

  return (
    <div onClick={() => setIsOpen(false)} className={`${isOpen ? "block" : "hidden"} w-full h-view fixed top-0 right-0 bg-black/30 backdrop-blur cursor-pointer`}>
      <div onClick={e => e.stopPropagation()} onWheel={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} className='fixed top-0 cursor-default right-0 w-3/4 sm:w-2/5 md:w-2/6 h-full bg-white shadow-lg shadow-black/70 overflow-hidden overflow-y-scroll'>
        <div className='flex justify-center py-2 px-4 pt-16 sm:pt-16 md:pt-16 lg:pt-20'>
          {cartCount > 0 && <button onClick={handleClearCart} className='flex items-center gap-1 text-white bg-red-600 hover:bg-red-800 transition px-4 py-1 rounded'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Bersihkan Keranjang
          </button>}

          {(cartCount === 0) && <div className='flex flex-col items-center justify-center h-full text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className='text-gray-600'>Keranjang kosong</p>
          </div>}
        </div>
      </div>
    </div>
  );
}