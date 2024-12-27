"use client";

import { CheckoutSidebarContext } from "@/app/(frontend)/checkout-sidebar-context";
import { useContext } from "react";

export const CheckoutSidebar = () => {
  const {isOpen, setIsOpen} = useContext(CheckoutSidebarContext)!;

  return (
    <div onClick={() => setIsOpen(false)} className={`${isOpen ? "block" : "hidden"} w-full h-view fixed top-0 right-0 bg-black/30 backdrop-blur cursor-pointer`}>
      <div  onClick={e => e.stopPropagation()} onWheel={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()} onTouchEnd={e => e.stopPropagation()} onTouchMove={e => e.stopPropagation()} className='fixed top-0 cursor-default right-0 w-3/4 sm:w-2/5 md:w-2/6 h-full bg-white shadow-lg shadow-black/70 overflow-hidden overflow-y-scroll'>
      </div>
    </div>
  );
}