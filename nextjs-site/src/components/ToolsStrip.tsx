// The two platforms we set up, then the tools we connect them to.
const platforms = ['ChatGPT', 'Claude']
const connected = [
  'Microsoft 365',
  'Google Workspace',
  'SharePoint',
  'OneDrive',
  'Outlook',
  'QuickBooks',
]

export default function ToolsStrip() {
  return (
    <section aria-labelledby="tools-strip-title" className="border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-10">
        <p id="tools-strip-title" className="font-mono text-xs uppercase tracking-[0.25em] text-muted">
          Set up and connected
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {platforms.map((tool) => (
            <li key={tool} className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-paper">
              {tool}
            </li>
          ))}
          {connected.map((tool) => (
            <li key={tool} className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium">
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
