export default function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap isolate">
      <span
        aria-hidden
        className="highlight-swipe absolute -inset-x-[0.15em] bottom-[0.02em] top-[0.12em] -z-10 -rotate-1 rounded-[0.25em] bg-marker"
      />
      {children}
    </span>
  )
}
