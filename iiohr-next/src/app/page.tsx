export default function Home() {
  return (
    <div className="min-h-screen bg-[#f6f3ed] text-[#1e2a38]">
      <header className="sticky top-0 z-50 border-b border-[#d7d1c7] bg-[#f6f3ed]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="/" className="text-xl font-semibold tracking-wide">
            IIOHR
          </a>
          <nav className="hidden gap-5 text-sm md:flex">
            <a href="#difference">About</a>
            <a href="#pathway">Training Pathway</a>
            <a href="#pillars">Practical FUE</a>
            <a href="#follicle-intelligence">Follicle Intelligence</a>
            <a href="#for-whom">For Clinics</a>
            <a
              href="#apply"
              className="rounded border border-[#1e2a38] px-3 py-1.5 font-medium"
            >
              Apply for Training
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-5 py-24">
          <p className="mb-4 text-xs tracking-[0.15em] text-[#5a6169] uppercase">
            International Institute of Hair Restoration
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight font-semibold md:text-6xl">
            Beyond the short course.
            <br />
            From technician to surgeon.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-[#5a6169]">
            Training, auditing and mentoring for the next generation of hair
            restoration surgeons.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#difference"
              className="rounded bg-[#1e2a38] px-6 py-3 text-sm font-semibold text-[#f7f5f1]"
            >
              Explore the Institute
            </a>
            <a
              href="#pathway"
              className="rounded border border-[#b79a67] px-6 py-3 text-sm font-semibold"
            >
              View Training Pathway
            </a>
          </div>
        </section>

        <section id="problem" className="border-t border-[#d7d1c7] bg-[#ede9e1]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Context
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              The problem with traditional training
            </h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              Hair restoration training is often too short, too shallow, and too
              unsupported to build lasting surgical competence.
            </p>
            <ul className="mt-8 grid gap-4 text-[#2d3846] md:grid-cols-2">
              <li>Short and shallow intensive training windows.</li>
              <li>Doctors left alone after completion.</li>
              <li>Limited outcome feedback loops.</li>
              <li>No clear, structured progression pathway.</li>
            </ul>
          </div>
        </section>

        <section id="difference" className="border-t border-[#d7d1c7]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Our approach
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              The IIOHR difference
            </h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              A pathway built on practical training, advanced theory, ongoing
              support, and measured improvement.
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              <li>Practical FUE training with hands-on surgical exposure</li>
              <li>Live-patient surgery under supervision</li>
              <li>Advanced trichology and hair loss science</li>
              <li>Ongoing development support and mentoring</li>
              <li>Audit-backed improvement with Follicle Intelligence</li>
              <li>Australian standards as a guiding framework</li>
            </ul>
          </div>
        </section>

        <section id="pillars" className="border-t border-[#2f3b49] bg-[#1e2a38] text-[#f7f5f1]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#c4ad82] uppercase">
              Curriculum
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Training pillars</h2>
            <p className="mt-4 max-w-3xl text-[#d7dfe7]">
              Five integrated elements of the IIOHR pathway.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                "Practical FUE surgery training",
                "Live patient surgical exposure",
                "Hair loss science and trichology",
                "Follicle Intelligence auditing",
                "Ongoing mentorship and surgeon development",
              ].map((item) => (
                <article key={item} className="rounded border border-[#3b4b5f] p-5">
                  <h3 className="text-lg font-semibold">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="follicle-intelligence" className="border-t border-[#d7d1c7]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Research and development
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Follicle Intelligence
            </h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              Surgeon development is strengthened through structured auditing,
              feedback, benchmarking, and case-based learning support.
            </p>
            <p className="mt-4 max-w-4xl text-[#5a6169]">
              Follicle Intelligence supports the pathway after initial training:
              longitudinal case review, outcome feedback, and comparison against
              benchmarks. The result is a clearer picture of where you stand and
              where to focus.
            </p>
            <a
              href="https://follicleintelligence.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block font-medium underline"
            >
              Learn how Follicle Intelligence supports the pathway
            </a>
          </div>
        </section>

        <section id="pathway" className="border-t border-[#d7d1c7] bg-[#ede9e1]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Pathway
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">Progression pathway</h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              A structured journey from learning to advancement.
            </p>
            <ol className="mt-8 grid gap-3 text-sm font-semibold tracking-wide uppercase sm:grid-cols-2 lg:grid-cols-6">
              {["Learn", "Observe", "Perform", "Audit", "Improve", "Advance"].map(
                (step) => (
                  <li key={step} className="border-t border-[#cfc8bc] pt-3">
                    {step}
                  </li>
                ),
              )}
            </ol>
          </div>
        </section>

        <section id="ecosystem" className="border-t border-[#d7d1c7]">
          <div className="mx-auto max-w-5xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Connected system
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Training Within a Connected Intelligence System
            </h2>
            <p className="mt-4 text-[#5a6169]">
              IIOHR is the education and certification pillar within the broader
              Hair Intelligence ecosystem. Training connects to surgical quality,
              treatment understanding, and analytical intelligence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-sm">
              <a href="https://hairaudit.com" target="_blank" rel="noopener noreferrer">
                HairAudit
              </a>
              <a
                href="https://follicleintelligence.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                Follicle Intelligence
              </a>
              <a
                href="https://hairlongevityinstitute.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hair Longevity Institute
              </a>
            </div>
          </div>
        </section>

        <section id="why-model" className="border-t border-[#d7d1c7]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Why this model produces better surgeons
            </h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              Development that is structured, supported, and measurable.
            </p>
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              <li>Repetition through supervised practice and live exposure.</li>
              <li>Feedback loops from auditing and mentoring.</li>
              <li>Measured development reviewed against benchmarks.</li>
              <li>Support after training, not just during the course.</li>
              <li>Standards from Australian surgical discipline.</li>
              <li>Deeper theoretical understanding informing decisions.</li>
            </ul>
          </div>
        </section>

        <section id="mentorship" className="border-t border-[#d7d1c7] bg-[#ede9e1]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Mentorship
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Expert guidance through the pathway
            </h2>
            <p className="mt-4 max-w-4xl text-[#5a6169]">
              Development is supported by experienced surgeons who mentor,
              review, and help refine technique and judgment through case
              discussion, audit feedback, and structured progression.
            </p>
          </div>
        </section>

        <section id="for-whom" className="border-t border-[#d7d1c7] bg-[#ede9e1]">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <p className="mb-3 text-xs tracking-[0.15em] text-[#b79a67] uppercase">
              Audience
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">For whom</h2>
            <p className="mt-4 max-w-3xl text-[#5a6169]">
              The pathway serves doctors and clinics at different stages.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded border border-[#d7d1c7] bg-white p-5">
                <h3 className="text-xl font-semibold">New entrant doctors</h3>
                <p className="mt-2 text-[#5a6169]">
                  Hands-on FUE, theory, and ongoing support beyond a one-off
                  short course.
                </p>
              </article>
              <article className="rounded border border-[#d7d1c7] bg-white p-5">
                <h3 className="text-xl font-semibold">Existing hair surgeons</h3>
                <p className="mt-2 text-[#5a6169]">
                  Improve outcomes through audit-led feedback, mentoring, and
                  deeper trichology and science.
                </p>
              </article>
              <article className="rounded border border-[#d7d1c7] bg-white p-5">
                <h3 className="text-xl font-semibold">
                  Clinics developing internal talent
                </h3>
                <p className="mt-2 text-[#5a6169]">
                  Structured surgeon development with measurable,
                  standards-aligned support.
                </p>
              </article>
              <article className="rounded border border-[#d7d1c7] bg-white p-5">
                <h3 className="text-xl font-semibold">International surgeons</h3>
                <p className="mt-2 text-[#5a6169]">
                  Training informed by Australian standards and clear
                  progression.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="apply" className="border-t border-[#2f3b49] bg-[#1e2a38] text-[#f7f5f1]">
          <div className="mx-auto max-w-5xl px-5 py-20 text-center">
            <h2 className="text-3xl font-semibold md:text-4xl">Begin the pathway</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[#d7dfe7]">
              Apply for training, book a conversation, or explore the pathway in
              more detail.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@iiohr.com"
                className="rounded border border-[#b79a67] px-6 py-3 text-sm font-semibold text-[#c8ad7e]"
              >
                Apply for training
              </a>
              <a
                href="mailto:info@iiohr.com"
                className="rounded border border-[#c8ad7e] px-6 py-3 text-sm font-semibold"
              >
                Book a conversation
              </a>
              <a
                href="#pathway"
                className="rounded border border-[#738092] px-6 py-3 text-sm font-semibold"
              >
                Explore the pathway
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#1e2a38] text-[#e8e0d8]">
        <div className="border-t border-[#3b4b5f]">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-5 py-6 text-xs tracking-wide">
            <span>Part of the Surgical Intelligence Ecosystem</span>
            <a href="https://hairaudit.com" target="_blank" rel="noopener noreferrer">
              HairAudit
            </a>
            <a
              href="https://follicleintelligence.ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follicle Intelligence
            </a>
            <a
              href="https://hairlongevityinstitute.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hair Longevity Institute
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-5 py-10">
          <p className="max-w-3xl text-sm text-[#d7dfe7]">
            An institute-led pathway for hair restoration surgery, combining
            training, auditing, mentoring, and structured development.
          </p>
          <p className="mt-6 text-xs text-[#9ba8b9]">
            © {new Date().getFullYear()} IIOHR. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
