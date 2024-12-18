"use client"
import { useState } from "react"
import { createPortal } from "react-dom"

interface CursorDropDownProps {
  children: React.ReactNode
  content: React.ReactNode
  isExpanded: boolean
  xOffset: number
  yOffset: number
}

export const CursorDropDown = ({ children, content, isExpanded, xOffset, yOffset }: CursorDropDownProps) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  return (
    <div
      className="relative"
      onMouseMove={e => {
        setCursorPosition({
          x: e.clientX,
          y: e.clientY
        })
      }}
    >
      {children}
      {isExpanded &&
        createPortal(
          <div
            className="absolute bg-white p-4 rounded-xl shadow z-50 animate-fade-in"
            style={{
              top: cursorPosition.y + yOffset,
              left: cursorPosition.x + xOffset
            }}
          >
            {content}
          </div>,
          document.body // Render the expanded info in the body element for proper layering
        )}
    </div>
  )
}
