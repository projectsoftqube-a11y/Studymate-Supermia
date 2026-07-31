import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    q: "I finally understand chemistry. StudyMate explains each concept the way my teacher never could, patiently and in plain English.",
    name: "Maya R.",
    role: "AP Chemistry · 12th grade",
    color: "#16A34A",
  },
  {
    q: "My son went from dreading study time to asking to log in. I love seeing his weekly progress reports.",
    name: "Daniel K.",
    role: "Parent",
    color: "#0F172A",
  },
  {
    q: "As a teacher, this saves me hours. I can see exactly where each student is struggling before class.",
    name: "Ms. Alvarez",
    role: "High-school Biology",
    color: "#D4A373",
  },
  {
    q: "The quizzes adapt so well. It always knows what I need to work on next.",
    name: "Jordan T.",
    role: "College freshman",
    color: "#5B7CB8",
  },
];

const stats = [
  { v: "40k+", k: "Active students" },
  { v: "1.2M", k: "Questions answered" },
  { v: "+41%", k: "Avg. quiz improvement" },
  { v: "4.9/5", k: "Student rating" },
];

export default function TestimonialsSection() {
  return (
    <section className="relative bg-secondary/40 py-28 sm:py-36">
      <div className="mx-auto max-w-site px-6 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink-muted">
            Trusted by learners everywhere
          </div>
          <h2 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Real stories. Real progress.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="relative rounded-3xl border border-border bg-surface p-8 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <Quote className="h-8 w-8 text-accent/40" />
              <blockquote className="mt-4 text-lg leading-relaxed text-ink">"{t.q}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className="grid h-11 w-11 place-items-center rounded-full font-display font-bold text-white"
                  style={{ backgroundColor: t.color }}
                >
                  {t.name[0]}
                </span>
                <div>
                  <div className="text-sm font-semibold text-ink">{t.name}</div>
                  <div className="text-xs text-ink-muted">{t.role}</div>
                </div>
                <div className="ml-auto flex text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-current" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid grid-cols-2 gap-6 rounded-3xl border border-border bg-surface p-8 sm:grid-cols-4">
          {stats.map(({ v, k }) => (
            <div key={k} className="text-center">
              <div className="font-numeric text-3xl font-bold text-ink sm:text-4xl">{v}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-ink-muted">{k}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
