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
      <div className="mx-auto max-w-5xl py-20 md:py-28 lg:grid lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16">
        <div className="lg:col-start-1 lg:row-start-1">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted">Who we are</p>
        <h2 className="mt-4 max-w-2xl text-balance font-display text-3xl font-bold tracking-tight md:text-4xl">
          Two brothers. One standard: it has to actually work.
        </h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          J2J Connection is Hayden and Tom, based in Santa Monica,
          California. Our clients are owners of architecture, design,
          construction, and real estate firms who want AI working at their
          firm without having to become experts themselves. We keep it
          small on purpose: the people you talk to on the first call are
          the same people who build your system and answer when something
          needs attention.
        </p>
        </div>
        <div className="mt-12 grid max-w-2xl grid-cols-2 gap-5 sm:gap-8 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:max-w-none lg:gap-6 lg:self-start">
          {team.map((person) => (
            <div key={person.name}>
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-marker-soft">
                <Image src={person.photo} alt={person.name} fill sizes="(min-width: 1024px) 240px, 45vw" className="object-cover" />
              </div>
              <div className="mt-4 font-display text-lg font-bold">{person.name}</div>
              <p className="mt-1 text-sm leading-relaxed text-muted">{person.bio}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 max-w-xl rounded-lg border border-line bg-marker-soft/40 p-6 lg:col-start-1 lg:row-start-2 lg:mt-10 lg:self-start">
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
