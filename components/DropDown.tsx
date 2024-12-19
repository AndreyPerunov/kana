"use client"
import { IoIosArrowDown } from "react-icons/io"
import { useState, useRef } from "react"

export const DropDown = ({ children, title, subTitle, className }: { children: React.ReactNode; title: string; subTitle: React.ReactNode; className?: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState("0px")
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    if (contentRef.current) {
      setHeight(isOpen ? "0px" : `${contentRef.current.scrollHeight}px`)
    }
  }

  return (
    <div className={"w-full " + className}>
      <h1 className="cursor-pointer text-3xl flex items-center select-none text-passive" onClick={toggleDropdown}>
        {<IoIosArrowDown className={`inline-block transition-transform origin-center ${isOpen ? "scale-y-100" : "-scale-y-100"}`} />} {title}
      </h1>
      {subTitle}
      <div ref={contentRef} style={{ maxHeight: height }} className={`mt-4 transition-max-height duration-150 ease-in-out overflow-hidden`}>
        {children}
      </div>
    </div>
  )
}
