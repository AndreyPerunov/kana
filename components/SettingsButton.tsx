"use client"
import { useState } from "react"
import { Modal } from "@/components/Modal"
import { Settings } from "@/components/Settings"

export const SettingsButton = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button className="group" disabled={isModalOpen} title="Settings" aria-label="Settings" onClick={handleOpenModal}>
        {children}
      </button>
      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <Settings />
        </Modal>
      )}
    </>
  )
}
