const tools = [
  'ChatGPT',
  'Claude',
  'Microsoft 365',
  'Google Workspace',
  'SharePoint',
  'OneDrive',
  'Outlook',
  'QuickBooks',
]

export default function ToolsStrip() {
  return (
    <section aria-label="Tools we set up and connect" className="border-t border-line px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 py-10 md:flex-row md:items-baseline md:gap-10">
        <p className="shrink-0 font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Set up and connected
        </p>
        <p className="font-display text-lg font-bold leading-relaxed md:text-xl">
          {tools.join('  ·  ')}
        </p>
      </div>
    </section>
  )
}
