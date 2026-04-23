import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Reveal } from "./components/Reveal";
import { SectionHeader } from "./components/SectionHeader";
import { Stars } from "./components/Stars";
import {
  contactCards,
  featuredDishes,
  galleryImages,
  menuCategories,
  navItems,
  reviews,
  serviceHighlights,
  stats,
} from "./data/lereve";
import { cn } from "./utils/cn";
import { openWhatsAppChat, notifyReservationWhatsApp, RESTAURANT_DISPLAY } from "./utils/whatsapp";

type ReservationState = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
};

const initialReservationState: ReservationState = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState(menuCategories[0].id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState<ReservationState>(initialReservationState);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setLoading(false);
    }, 1150);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrollY(currentY);
      setScrolled(currentY > 18);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const activeMenu = menuCategories.find((category) => category.id === activeCategory) ?? menuCategories[0];

  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Le Rêve Alexandria Egypt")}`;

  const primaryButtonClass =
    "inline-flex items-center justify-center rounded-full border border-[#d6b16a] bg-[#d6b16a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#17120a] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e6c886] focus:outline-none focus:ring-2 focus:ring-[#d6b16a]/70 focus:ring-offset-2 focus:ring-offset-[#050505]";
  const secondaryButtonClass =
    "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-0.5 hover:border-[#d6b16a]/40 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#050505]";

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    setReservation((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    notifyReservationWhatsApp(reservation);
  };

  return (
    <div className="relative overflow-x-hidden bg-[#050505] text-stone-100">
      {loading ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#050505]/96 backdrop-blur-2xl">
          <div className="relative flex flex-col items-center gap-5 text-center">
            <div className="loader-ring loader-ring-delay absolute h-48 w-48 rounded-full border border-[#d6b16a]/20" />
            <div className="loader-ring h-32 w-32 rounded-full border border-[#d6b16a]/35" />
            <div className="relative space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-[#d6b16a]/80">Le Rêve</p>
              <h1 className="font-display text-5xl text-white sm:text-6xl">International Cuisine</h1>
              <p className="text-sm uppercase tracking-[0.28em] text-stone-400">Preparing an unforgettable evening</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[30rem] w-[30rem] rounded-full bg-[#d6b16a]/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-emerald-900/20 blur-[140px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d6b16a]/20 to-transparent" />
      </div>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition duration-500",
          scrolled ? "border-b border-white/10 bg-[#090909]/72 backdrop-blur-2xl" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
          <a href="#home" className="group inline-flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d6b16a]/35 bg-[#d6b16a]/10 shadow-[0_0_30px_rgba(214,177,106,0.18)] overflow-hidden">
              <img
                src="https://ik.imagekit.io/lvqicqcvj/image.png"
                alt="Le Rêve logo"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-2xl leading-none text-white">Le Rêve</p>
              <p className="text-[10px] uppercase tracking-[0.42em] text-stone-400">International Cuisine</p>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium uppercase tracking-[0.26em] text-stone-300 transition duration-300 hover:text-[#f5d89d]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#reservation" className={primaryButtonClass}>
              Reserve now
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              {isMenuOpen ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-white/10 bg-[#0a0a0a]/96 px-6 py-5 backdrop-blur-2xl lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-white/8 bg-white/3 px-4 py-3 text-sm uppercase tracking-[0.24em] text-stone-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a href="#reservation" className={primaryButtonClass} onClick={() => setIsMenuOpen(false)}>
                Reserve now
              </a>
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10">
        <section id="home" className="relative isolate min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/images/hero-le-reve.png"
              alt="Le Rêve luxury interior"
              className="h-full w-full object-cover opacity-90"
              style={{ transform: `scale(1.08) translateY(${scrollY * 0.12}px)` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.4),rgba(5,5,5,0.76)_46%,rgba(5,5,5,0.98))]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,177,106,0.18),transparent_34%)]" />
          </div>

          <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-32 sm:px-8 lg:px-10">
            <div className="grid w-full gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-3xl space-y-8">
                <Reveal>
                  <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(214,177,106,0.24)] bg-[rgba(255,255,255,0.06)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#f5d89d] backdrop-blur-xl">
                    <span className="h-2 w-2 rounded-full bg-[#d6b16a] shadow-[0_0_14px_rgba(214,177,106,0.9)]" />
                    Alexandria’s premium dining atmosphere
                  </div>
                </Reveal>

                <Reveal delay={120}>
                  <div className="space-y-6">
                    <h1 className="font-display text-6xl leading-[0.92] text-white sm:text-7xl lg:text-[6rem]">
                      Where Fine Dining
                      <span className="block text-[#f1d395]">Becomes an Experience</span>
                    </h1>
                    <p className="max-w-2xl text-base leading-8 text-stone-200/88 sm:text-lg">
                      Le Rêve blends exceptional food quality, romantic calm, and attentive service into one luxurious destination for dates,
                      special occasions, and unforgettable evenings in Alexandria.
                    </p>
                  </div>
                </Reveal>

                <Reveal delay={220}>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <a href="#reservation" className={primaryButtonClass}>
                      Reserve instantly
                    </a>
                    <a href="#menu" className={secondaryButtonClass}>
                      Explore the menu
                    </a>
                  </div>
                </Reveal>

                <Reveal delay={320} className="grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="glass-panel rounded-[28px] p-5">
                      <p className="font-display text-3xl text-[#f1d395]">{stat.value}</p>
                      <p className="mt-2 text-sm leading-7 text-stone-300/85">{stat.label}</p>
                    </div>
                  ))}
                </Reveal>
              </div>

              <Reveal delay={260} className="relative lg:ml-auto lg:w-full lg:max-w-2xl">
                <div className="glass-panel rounded-[36px] p-4 sm:p-5">
                  <div className="grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
                    <div className="relative overflow-hidden rounded-[28px] border border-white/10">
                      <img src="/images/interior-le-reve.png" alt="Elegant Le Rêve dining room" className="h-[22rem] w-full object-cover" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent p-6">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#d6b16a]/25 bg-[#050505]/55 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-[#d6b16a] backdrop-blur">
                          Signature ambience
                        </div>
                        <h2 className="mt-3 font-display text-4xl text-white">Soft light. Calm conversation. Beautiful plates.</h2>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="glass-panel rounded-[28px] p-5">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#d6b16a]">Guest favorite</p>
                        <div className="mt-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-display text-3xl text-white">Date Night</p>
                            <p className="mt-2 text-sm leading-7 text-stone-300/80">
                              Crafted for meaningful moments, special celebrations, and effortless elegance.
                            </p>
                          </div>
                          <div className="rounded-full border border-[#d6b16a]/25 bg-[#d6b16a]/10 px-4 py-3 text-sm font-semibold text-[#f1d395]">
                            5★
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[28px] border border-white/10 bg-black/45 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-xs uppercase tracking-[0.28em] text-stone-400">Tonight’s note</p>
                            <p className="mt-2 font-display text-3xl text-white">Reserve before sunset</p>
                          </div>
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d6b16a]/30 bg-[#d6b16a]/10 text-[#d6b16a]">
                            ✦
                          </span>
                        </div>
                        <p className="mt-4 text-sm leading-7 text-stone-300/80">
                          Free parking, spacious seating, and a setting designed to slow time down.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="about" className="section-grid relative py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <Reveal>
                <div className="space-y-7">
                  <SectionHeader
                    eyebrow="About Le Rêve"
                    title="An elegant story told through atmosphere, service, and detail"
                    description="Every table, texture, and course at Le Rêve is curated to feel intimate and elevated. The experience is not rushed. It is composed — with attention to presentation, gracious hospitality, and a mood that invites long evenings."
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    {serviceHighlights.map((highlight, index) => (
                      <div
                        key={highlight}
                        className={cn(
                          "rounded-[28px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl",
                          index === 0 ? "sm:col-span-2" : ""
                        )}
                      >
                        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#d6b16a]/30 bg-[#d6b16a]/10 text-[#d6b16a]">
                          0{index + 1}
                        </div>
                        <p className="text-sm leading-7 text-stone-300/85">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="relative">
                  <div className="grid gap-4 sm:grid-cols-[0.88fr_1.12fr]">
                    <div className="space-y-4 sm:pt-16">
                      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
                        <img src="/images/garden-night-le-reve.png" alt="Romantic garden coffee setting" className="h-[18rem] w-full object-cover" />
                      </div>
                      <div className="glass-panel rounded-[30px] p-5">
                        <p className="text-xs uppercase tracking-[0.32em] text-[#d6b16a]">Atmosphere</p>
                        <p className="mt-3 font-display text-3xl text-white">Peaceful. Sophisticated. Unmistakably premium.</p>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/5">
                      <img src="/images/patio-le-reve.png" alt="Le Rêve outdoor patio" className="h-full min-h-[32rem] w-full object-cover" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <SectionHeader
                eyebrow="Featured dishes"
                title="Italian-inspired signatures, beautifully plated"
                description="From premium cuts and refined starters to the lemon chicken guests keep coming back for, each dish is designed to look exceptional and taste even better."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {featuredDishes.map((dish, index) => (
                <Reveal key={dish.name} delay={index * 100}>
                  <article className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-[#d6b16a]/20">
                    <div className="overflow-hidden">
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="h-72 w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="space-y-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-display text-3xl text-white">{dish.name}</h3>
                          <p className="mt-3 text-sm leading-7 text-stone-300/80">{dish.description}</p>
                        </div>
                        <span className="rounded-full border border-[#d6b16a]/25 bg-[#d6b16a]/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f1d395]">
                          Chef’s pick
                        </span>
                      </div>
                      <div className="fine-line h-px w-full" />
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.26em] text-stone-400">Starting from</p>
                        <p className="font-display text-3xl text-[#f1d395]">{dish.price}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="section-grid py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
              <Reveal>
                <div className="space-y-8 lg:sticky lg:top-28">
                  <SectionHeader
                    eyebrow="Menu"
                    title="An elegant menu built for lingering dinners"
                    description="Navigate by course and discover a curation of starters, Napoli-style pizzas, premium cuts, seafood, and signature plates that suit special nights out."
                  />

                  <div className="flex gap-3 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
                    {menuCategories.map((category) => (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          "min-w-fit rounded-full border px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.24em] transition duration-300 lg:rounded-[24px] lg:px-6 lg:py-5",
                          activeCategory === category.id
                            ? "border-[#d6b16a]/40 bg-[#d6b16a]/12 text-[#f1d395] shadow-[0_0_30px_rgba(214,177,106,0.12)]"
                            : "border-white/10 bg-white/[0.04] text-stone-300 hover:border-white/20 hover:bg-white/[0.07]"
                        )}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal delay={140}>
                <div className="overflow-hidden rounded-[38px] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.34)] backdrop-blur-xl">
                  <div className="border-b border-white/10 px-6 py-7 sm:px-8">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#d6b16a]">Current selection</p>
                    <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <h3 className="font-display text-4xl text-white sm:text-5xl">{activeMenu.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-stone-300/80">{activeMenu.description}</p>
                      </div>
                      <a href="#reservation" className={secondaryButtonClass}>
                        Book a table
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-5 p-6 sm:p-8">
                    {activeMenu.items.map((item, index) => (
                      <article
                        key={item.name}
                        className="grid gap-5 rounded-[30px] border border-white/8 bg-black/30 p-4 sm:grid-cols-[10rem_1fr] sm:p-5"
                      >
                        <div className="overflow-hidden rounded-[24px] border border-white/8">
                          <img src={item.image} alt={item.name} className="h-44 w-full object-cover sm:h-full" />
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                          <div>
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                              <div>
                                <p className="text-xs uppercase tracking-[0.28em] text-stone-500">Course {index + 1}</p>
                                <h4 className="mt-2 font-display text-3xl text-white">{item.name}</h4>
                              </div>
                              <span className="rounded-full border border-[#d6b16a]/25 bg-[#d6b16a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#f1d395]">
                                {item.price}
                              </span>
                            </div>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-300/80">{item.description}</p>
                          </div>
                          <div className="fine-line h-px w-full" />
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="gallery" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <SectionHeader
                eyebrow="Gallery"
                title="A visual preview of the mood, the lighting, and the plates"
                description="Explore the atmosphere Le Rêve is known for — polished interiors, romantic outdoor corners, and the warm details that turn dinner into an occasion."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {galleryImages.map((image, index) => (
                <Reveal
                  key={image.title}
                  delay={index * 80}
                  className={cn(index === 0 || index === 5 ? "xl:col-span-2" : "", index === 2 ? "md:col-span-2 xl:col-span-1" : "")}
                >
                  <div
                    className={cn(
                      "group relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] shadow-[0_18px_50px_rgba(0,0,0,0.28)]",
                      index % 3 === 0 ? "min-h-[26rem]" : "min-h-[22rem]"
                    )}
                  >
                    <img
                      src={image.image}
                      alt={image.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="text-xs uppercase tracking-[0.3em] text-[#d6b16a]">Le Rêve moment</p>
                      <h3 className="mt-3 font-display text-4xl text-white">{image.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-stone-200/80">{image.subtitle}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="reviews" className="section-grid py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <Reveal>
                <div className="space-y-8">
                  <SectionHeader
                    eyebrow="Reviews"
                    title="Guests remember how Le Rêve made them feel"
                    description="The strongest impression comes from the balance of exceptional food, elegant surroundings, and sincere hospitality — the qualities guests mention again and again."
                  />

                  <div className="glass-panel rounded-[34px] p-7">
                    <Stars />
                    <p className="mt-5 font-display text-4xl text-white sm:text-5xl">
                      “One of the best fine dining experiences in Alexandria.”
                    </p>
                    <p className="mt-4 text-sm uppercase tracking-[0.28em] text-stone-400">Loved by couples, celebration diners, and regulars alike</p>
                  </div>
                </div>
              </Reveal>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {reviews.map((review, index) => (
                  <Reveal key={review.name} delay={index * 90}>
                    <article className="h-full rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1.5 hover:border-[#d6b16a]/25">
                      <Stars className="mb-4" />
                      <p className="font-display text-3xl leading-tight text-white">“{review.quote}”</p>
                      <div className="mt-6 flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b16a]/25 bg-[#d6b16a]/10 text-sm font-semibold text-[#f1d395]">
                          {review.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-100">{review.name}</p>
                          <p className="text-xs uppercase tracking-[0.24em] text-stone-500">Verified guest</p>
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reservation" className="py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.04] shadow-[0_35px_90px_rgba(0,0,0,0.38)] backdrop-blur-xl">
              <div className="grid gap-0 lg:grid-cols-[0.88fr_1.12fr]">
                <Reveal className="relative overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r">
                  <img src="/images/garden-day-le-reve.png" alt="Le Rêve garden dining table" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.16),rgba(5,5,5,0.82))]" />
                  <div className="relative z-10 flex h-full flex-col justify-between gap-12 p-8 sm:p-10 lg:min-h-[42rem] lg:p-12">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(214,177,106,0.25)] bg-[rgba(5,5,5,0.32)] px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-[#d6b16a] backdrop-blur-xl">
                        Reservations
                      </div>
                      <h2 className="font-display text-5xl leading-none text-white sm:text-6xl">Reserve your evening in seconds</h2>
                      <p className="max-w-lg text-base leading-8 text-stone-200/84">
                        Fill in your details and we’ll open WhatsApp with your reservation request prefilled so you can confirm your table instantly.
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#d6b16a]">For couples</p>
                        <p className="mt-3 text-sm leading-7 text-stone-200/80">A polished, romantic atmosphere ideal for memorable date nights.</p>
                      </div>
                      <div className="rounded-[28px] border border-white/10 bg-black/35 p-5 backdrop-blur-xl">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#d6b16a]">For occasions</p>
                        <p className="mt-3 text-sm leading-7 text-stone-200/80">Birthdays, anniversaries, and special evenings feel elevated from arrival to dessert.</p>
                      </div>
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={120} className="p-8 sm:p-10 lg:p-12">
                  <div className="space-y-8">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.32em] text-[#d6b16a]">Reservation form</p>
                      <h3 className="font-display text-4xl text-white sm:text-5xl">Book your table</h3>
                    </div>

                    <form className="grid gap-5" onSubmit={handleSubmit}>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <label className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-400">Name</span>
                          <input
                            name="name"
                            type="text"
                            placeholder="Your full name"
                            value={reservation.name}
                            onChange={handleChange}
                            className="w-full rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-[#d6b16a]/40 focus:bg-black/40"
                            required
                          />
                        </label>
                        <label className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-400">Phone</span>
                          <input
                            name="phone"
                            type="tel"
                            placeholder="+20"
                            value={reservation.phone}
                            onChange={handleChange}
                            className="w-full rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition placeholder:text-stone-500 focus:border-[#d6b16a]/40 focus:bg-black/40"
                            required
                          />
                        </label>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-3">
                        <label className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-400">Date</span>
                          <input
                            name="date"
                            type="date"
                            value={reservation.date}
                            onChange={handleChange}
                            className="w-full rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition focus:border-[#d6b16a]/40 focus:bg-black/40"
                            required
                          />
                        </label>
                        <label className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-400">Time</span>
                          <input
                            name="time"
                            type="time"
                            value={reservation.time}
                            onChange={handleChange}
                            className="w-full rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition focus:border-[#d6b16a]/40 focus:bg-black/40"
                            required
                          />
                        </label>
                        <label className="space-y-3">
                          <span className="text-xs uppercase tracking-[0.28em] text-stone-400">Guests</span>
                          <select
                            name="guests"
                            value={reservation.guests}
                            onChange={handleChange}
                            className="w-full rounded-[22px] border border-white/10 bg-black/30 px-5 py-4 text-sm text-white outline-none transition focus:border-[#d6b16a]/40 focus:bg-black/40"
                          >
                            <option value="2">2 guests</option>
                            <option value="3">3 guests</option>
                            <option value="4">4 guests</option>
                            <option value="5">5 guests</option>
                            <option value="6+">6+ guests</option>
                          </select>
                        </label>
                      </div>

                      <div className="grid gap-4 pt-2 sm:grid-cols-2">
                        <button type="submit" className={primaryButtonClass}>
                          Reserve via WhatsApp
                        </button>
                        <button
                          type="button"
                          onClick={() => openWhatsAppChat("Hi Le Rêve, I'd like to inquire about availability and options.\n\nمرحبا لو ريف، أود الاستفسار عن التوفر والخيارات المتاحة.")}
                          className={secondaryButtonClass}
                        >
                          Open WhatsApp now
                        </button>
                      </div>

                      <p className="text-sm leading-7 text-stone-400">
                        By submitting, you’ll open WhatsApp with a ready-to-send reservation message for Le Rêve.
                      </p>
                    </form>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section-grid py-24 sm:py-28">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <Reveal>
              <SectionHeader
                eyebrow="Contact"
                title="Plan your visit with confidence"
                description="Everything around the evening is designed to feel easy — from the location and parking to the welcoming pace of the service once you arrive."
                align="center"
              />
            </Reveal>

            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {contactCards.map((card, index) => (
                <Reveal key={card.title} delay={index * 100}>
                  <article className="h-full rounded-[32px] border border-white/10 bg-white/[0.04] p-7 shadow-[0_18px_40px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#d6b16a]/25 bg-[#d6b16a]/10 text-sm font-semibold text-[#f1d395]">
                      0{index + 1}
                    </div>
                    <h3 className="mt-5 font-display text-4xl text-white">{card.title}</h3>
                    <p className="mt-4 text-sm leading-7 text-stone-300/82">
                      {card.phone ? (
                        <button
                          type="button"
                          onClick={() => openWhatsAppChat(`Hi Le Rêve, I'd like to inquire about a reservation.\n\nمرحبا لو ريف، أود الاستفسار عن الحجز.`)}
                          className="text-[#f1d395] transition hover:text-white hover:underline"
                        >
                          {RESTAURANT_DISPLAY}
                        </button>
                      ) : (
                        card.description
                      )}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>

            <Reveal delay={180} className="mt-8 overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:p-10">
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="space-y-5">
                  <p className="text-xs uppercase tracking-[0.32em] text-[#d6b16a]">Visit Le Rêve</p>
                  <h3 className="font-display text-4xl text-white sm:text-5xl">Alexandria’s address for elegant dinners and special nights out</h3>
                  <p className="max-w-2xl text-sm leading-8 text-stone-300/82">
                    Whether you are planning an intimate dinner, a celebration with friends, or simply an elevated evening in a calm setting, Le Rêve offers the atmosphere, polish, and comfort to make it memorable.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                  <a href={mapLink} target="_blank" rel="noreferrer" className={primaryButtonClass}>
                    Open in Maps
                  </a>
                  <a href="#reservation" className={secondaryButtonClass}>
                    Reserve your table
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/8 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-stone-400 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div>
            <p className="font-display text-3xl text-white">Le Rêve</p>
            <p className="mt-1 uppercase tracking-[0.28em]">Luxury dining in Alexandria</p>
          </div>
          <div className="flex flex-wrap items-center gap-5 text-xs uppercase tracking-[0.24em]">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#f1d395]">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <button
        type="button"
        onClick={() => openWhatsAppChat("Hi Le Rêve! I'd like to make a reservation.\n\nمرحبا لو ريف! أود تقديم طلب حجز.")}
        aria-label="Reserve on WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#d6b16a]/30 bg-[#111111]/90 text-[#f1d395] shadow-[0_16px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[#171717]"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M19.11 17.2c-.29-.15-1.7-.84-1.96-.93-.26-.1-.45-.15-.64.15-.19.29-.74.93-.91 1.12-.17.19-.34.22-.63.08-.29-.15-1.22-.45-2.32-1.45-.86-.76-1.45-1.7-1.62-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.56-.88-2.14-.23-.55-.46-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 1-.99 2.44.02 1.43 1.04 2.82 1.19 3.01.14.19 2.02 3.08 4.89 4.32.68.29 1.2.46 1.61.58.68.22 1.3.19 1.79.12.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34Z" />
          <path d="M16.04 3.2c-7.05 0-12.77 5.67-12.79 12.67 0 2.24.59 4.43 1.71 6.35L3 29l6.96-1.82a12.87 12.87 0 0 0 6.07 1.54h.01c7.05 0 12.78-5.67 12.8-12.68A12.73 12.73 0 0 0 16.04 3.2Zm0 23.37h-.01a10.7 10.7 0 0 1-5.44-1.49l-.39-.23-4.13 1.08 1.1-4.02-.26-.41a10.5 10.5 0 0 1-1.63-5.63c.01-5.82 4.77-10.55 10.76-10.55 2.88 0 5.58 1.11 7.61 3.13a10.43 10.43 0 0 1 3.14 7.44c-.02 5.82-4.78 10.55-10.75 10.55Z" />
        </svg>
      </button>
      <Analytics />
    </div>
  );
}
