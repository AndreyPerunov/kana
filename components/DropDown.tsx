"use client"
import { IoIosArrowDown } from "react-icons/io"
import { useState, useRef } from "react"

export const DropDown = ({ children, title, subTitle, className }: { children: React.ReactNode; title: string; subTitle: React.ReactNode; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={"w-full " + className}>
      <h1 className="cursor-pointer text-3xl flex items-center select-none text-passive" onClick={toggleDropdown}>
        {<IoIosArrowDown className={`inline-block transition-transform origin-center ${isOpen ? "scale-y-100" : "-scale-y-100"}`} />} {title}
      </h1>
      {subTitle}
      {/* TODO: FIX Responsive content to be hidden */}
      <div ref={contentRef} style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight ? `${contentRef.current.scrollHeight}px` : ""}` : "0" }} className="transition-all duration-500 ease-in-out overflow-hidden pb-4 px-4">
        {children}
      </div>
    </div>
  )
}
