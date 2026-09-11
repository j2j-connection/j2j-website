import Image from 'next/image'
import { summit } from '@/content/site'

const team = [
  {
    name: 'Hayden',
    bio: 'Five years putting AI in front of sales teams.',
    photo: '/team/hayden.png',
  },
  {
    name: 'Tom',
    bio: 'Twelve years building software in Silicon Valley.',
    photo: '/team/tom.png',
  },
]

export default function WhoWeAre() {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line px-6 lg:px-8">
      <div className="mx-auto max-w-5xl py-20 md:py-28">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Who we are</p>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight md:text-4xl">
          Two brothers. One standard: it has to actually work.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          J2J Connection is Hayden and Tom. We keep it small on purpose: the
          people you talk to on the first call are the same people who build
          your system and answer when something needs attention.
        </p>
        <div className="mt-12 grid max-w-2xl gap-8 sm:grid-cols-2">
          {team.map((person) => (
            <div key={person.name} className="border-t-2 border-ink pt-5">
              <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full bg-marker-soft">
                <Image src={person.photo} alt={person.name} fill className="object-cover" />
              </div>
              <div className="font-display text-lg font-bold">{person.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{person.bio}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-xl rounded-lg border border-line bg-marker-soft/40 p-6">
          <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Speaking</div>
          <p className="mt-2 leading-relaxed">
            <span className="font-display font-bold">“{summit.title}”</span>{' '}
            <span className="text-muted">{summit.detail}</span>
          </p>
        </div>
      </div>
    </section>
  )
}
