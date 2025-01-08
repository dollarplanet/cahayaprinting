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
    <div onClick={() => setIsOpen(false)} className={`${isOpen ? "block" : "hidden"} w-full z-10 h-view fixed top-0 right-0 bg-black/30 backdrop-blur cursor-pointer`}>
      <div onClick={e => e.stopPropagation()} onWheel={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} className='fixed top-0 cursor-default right-0 w-3/4 sm:w-2/5 md:w-2/6 h-full bg-white shadow-lg shadow-black/70 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        <div className='flex justify-center py-2 px-4 pt-16 sm:pt-16 md:pt-16 lg:pt-20'>

          {(cartCount === 0) && <div className='flex flex-col items-center justify-center h-full text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-40 w-40 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <p className='text-gray-600'>Keranjang kosong</p>
          </div>}
        </div>

        {(cartCount > 0) && <div onClick={handleClearCart} className="absolute w-full flex flex-col items-stretch bottom-0 right-0">
          <div className=" bg-red-600 cursor-pointer hover:bg-red-500 flex items-center justify-center gap-4 text-left py-2 text-gray-200" >
            Bersihkan Keranjang
          </div>
          <div className="bg-blue-600 cursor-pointer hover:bg-blue-500 flex items-center justify-center gap-4 text-left py-2 text-white" >
            Lanjut Checkout
          </div>
        </div>}
      </div>
    </div>
  );
}