export function Wrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <section className="px-4 sm:px-16 lg:px-32 flex justify-center">
      <div className={`${className} max-w-[1920px] w-full`}>{children}</div>
    </section>
  )
}
