import TechStack from "@/components/tech-stack";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { Fade, Slide } from "react-awesome-reveal";

export default function Home() {
  return (
    <main className="bg-background relative min-h-screen w-full overflow-hidden">
      {/* Hero Section */}
      <section
        className="relative min-h-screen w-full"
        style={{
          backgroundImage: `
      
      url('/hero/hero-bg.jpg')
    `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Gradient Overlay */}
        <div className="via-accent/20 to-accent-alt/20 absolute inset-0 bg-gradient-to-b from-transparent" />

        <div className="container mx-auto px-4">
          <Slide direction="down" triggerOnce duration={200}>
            <div className="relative flex min-h-screen flex-col items-center justify-center space-y-12 py-20">
              {/* Welcome Badge */}
              <div className="relative">
                <span className="from-accent via-primary to-secondary absolute -inset-1 rounded-lg bg-gradient-to-r opacity-70 blur"></span>
                <span className="bg-background/80 relative block rounded-lg px-8 py-3 text-sm font-medium backdrop-blur">
                  Welcome to my portfolio
                </span>
              </div>

              {/* Hero Content */}
              <div className="relative z-10 space-y-6 text-center">
                <h1 className="space-y-4">
                  <span className="text-text/90 block text-2xl font-medium tracking-tight md:text-4xl">
                    hey there! I&apos;m
                  </span>
                  <span className="relative inline-block">
                    <span className="block text-5xl font-bold md:text-7xl">
                      <span className="from-accent via-primary to-secondary relative bg-gradient-to-r bg-clip-text text-transparent">
                        Cornelius
                        <span className="from-accent via-primary to-secondary absolute -bottom-2 left-0 h-1 w-full rounded-full bg-gradient-to-r"></span>
                      </span>
                    </span>
                  </span>
                </h1>

                <p className="text-text/80 mx-auto max-w-2xl text-lg">
                  A tech-savvy innovator with expertise in{" "}
                  <span className="text-accent font-medium">
                    Web Development, CCTV Security & Networking
                  </span>
                </p>

                {/* CTA Buttons */}
                <div className="mt-8 flex items-center justify-center gap-6">
                  <Link
                    href="/contact"
                    className="group bg-button relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-3 transition-all hover:scale-105"
                  >
                    <span className="relative font-medium text-white">
                      Let&apos;s Talk
                    </span>
                    <ArrowRightIcon
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    href="/about"
                    className="group border-accent/20 hover:border-accent/40 relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 px-8 py-3 transition-all"
                  >
                    <span className="text-accent font-medium">Learn More</span>
                  </Link>
                </div>
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-background relative py-24">
        <div className="container mx-auto px-4">
          <Fade direction="up" duration={300} triggerOnce>
            <h2 className="mb-16 text-center">
              <span className="text-text/80 text-sm font-medium tracking-wider uppercase">
                Services
              </span>
              <p className="mt-2 text-3xl font-bold">
                What I <span className="text-accent">Do</span>
              </p>
            </h2>
          </Fade>

          <div className="grid gap-8 md:grid-cols-3">
            {/* ... existing service cards ... */}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-accent/5 relative py-24">
        <div className="container mx-auto px-4">
          <Fade direction="up" duration={300} triggerOnce>
            <h2 className="mb-16 text-center">
              <span className="text-text/80 text-sm font-medium tracking-wider uppercase">
                Technologies
              </span>
              <p className="mt-2 text-3xl font-bold">
                My Tech <span className="text-accent">Stack</span>
              </p>
            </h2>
            <div className="bg-background/50 rounded-2xl p-8 backdrop-blur">
              <div className="flex flex-wrap items-center justify-center gap-8">
                <TechStack />
              </div>
            </div>
          </Fade>
        </div>
      </section>
    </main>
  );
}
