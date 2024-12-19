"use client"
export const SettingsButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button className="group" title="Settings" aria-label="Settings" onClick={() => alert("Settings")}>
      {children}
    </button>
  )
}
