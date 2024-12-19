"use client"
import { useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { IoClose } from "react-icons/io5"

export const Modal = ({ onClose, children }: { onClose: () => void; children: React.ReactNode }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleFocus = (event: FocusEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        event.stopPropagation()
        modalRef.current.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("focusin", handleFocus)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("focusin", handleFocus)
    }
  }, [onClose])

  return createPortal(
    <div className="h-screen w-screen fixed top-0 left-0 flex items-center justify-center bg-black bg-opacity-50" onClick={onClose} tabIndex={-1} ref={modalRef}>
      <div className="bg-white p-7 rounded-lg relative max-h-[80vh] overflow-y-auto scrollbar-br-rounded" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0">
          <button className="absolute top-0 right-0 cursor-pointer group" title="Close" aria-label="Close" onClick={onClose}>
            <IoClose className="size-7 text-secondary transition-all group-hover:text-primary group-hover:rotate-180 group-hover:animate-pulse group-focus-within:rotate-180 group-focus-within:text-primary group-focus-within:animate-pulse" />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}
