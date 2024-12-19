export const ProgressBar = ({ fill }: { fill: number }) => {
  const sanitizedFill = Math.max(0, Math.min(100, fill))

  return (
    <div className="w-full h-4 bg-neutral rounded-full overflow-hidden">
      <div className="h-full bg-primary transition-all " style={{ width: `${sanitizedFill}%` }}></div>
    </div>
  )
}
