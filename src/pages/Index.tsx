import { useEffect, useState } from "react";
import { Github, ExternalLink, Mail, Code2, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const GITHUB_USER = "pironoid14";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
};

const featuredOrder = [
  "Ticket-Generator",
  "HNG-QR-Menu-Card-Public",
  "Authenticator-app",
  "my-dashboard",
  "text-processor",
  "drummachine",
  "Javacalculator",
  "quotemachine",
  "markdown",
  "color-guess-game-project",
];

const skills = {
  Backend: ["Python",  "Django"],
  Frontend: ["React", "TypeScript",  "Tailwind CSS", "Vite"],
  Tools: ["Git", "GitHub",  "Node.js"],
};

const roles = ["Python Developer", "React developer", "Frontend Builder"];

const Index = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`)
      .then((r) => r.json())
      .then((data: Repo[]) => {
        if (!Array.isArray(data)) return;
        const filtered = data.filter((r) => !r.fork);
        const featured = featuredOrder
          .map((n) => filtered.find((r) => r.name === n))
          .filter(Boolean) as Repo[];
        const rest = filtered.filter((r) => !featuredOrder.includes(r.name));
        setRepos([...featured, ...rest].slice(0, 9));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const word = roles[roleIdx];
    let i = 0;
    setTyped("");
    const typer = setInterval(() => {
      i++;
      setTyped(word.slice(0, i));
      if (i >= word.length) clearInterval(typer);
    }, 70);
    const next = setTimeout(() => setRoleIdx((idx) => (idx + 1) % roles.length), 2800);
    return () => {
      clearInterval(typer);
      clearTimeout(next);
    };
  }, [roleIdx]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="font-mono text-lg font-bold gradient-text">
            &lt;Peter&gt;
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a>
            <a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a>
            <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
          </div>
          <Button asChild size="sm" variant="outline">
            <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
              <Github /> GitHub
            </a>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <header id="top" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />

        <div className="container relative py-24 md:py-36">
          <Badge variant="outline" className="font-mono mb-6 border-primary/40 text-primary">
            <Sparkles className="mr-1 h-3 w-3" /> Available for work
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
            Hi, I'm <span className="gradient-text">Peter</span>.
            <br />I am a{" "}
            <span className="font-mono text-primary text-glow">
              {typed}
              <span className="animate-pulse">_</span>
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl">
            Python &amp; frontend developer crafting clean APIs and snappy React/Vue interfaces.
            I ship side projects, ticket generators, dashboards, and the occasional drum machine.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#projects">
                View Projects <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#contact">
                <Mail /> Get in touch
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Skills */}
      <section id="skills" className="container py-20 md:py-28">
        <div className="mb-12">
          <p className="font-mono text-sm text-primary mb-2">// what i work with</p>
          <h2 className="text-3xl md:text-4xl font-bold">Skills &amp; Stack</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {Object.entries(skills).map(([cat, items]) => (
            <div
              key={cat}
              className="card-hover rounded-lg border border-border bg-card p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="h-5 w-5 text-primary" />
                <h3 className="font-mono font-semibold">{cat}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <Badge key={s} variant="secondary" className="font-mono text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="container py-20 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-sm text-primary mb-2">// from my github</p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </div>
          <a
            href={`https://github.com/${GITHUB_USER}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1"
          >
            See all repos <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {repos.length === 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 rounded-lg border border-border bg-card animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((r) => (
              <article
                key={r.id}
                className="card-hover group flex flex-col rounded-lg border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-mono font-semibold text-lg break-all group-hover:text-primary transition-colors">
                    {r.name}
                  </h3>
                  {r.language && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {r.language}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground flex-1 mb-4">
                  {r.description || "A project built and shipped — explore the source on GitHub."}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <a
                    href={r.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-4 w-4" /> Code
                  </a>
                  {r.homepage && (
                    <a
                      href={r.homepage}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-10 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <p className="font-mono text-sm text-primary mb-2">// let's build something</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Got an idea? <span className="gradient-text">Let's ship it.</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Open to freelance work, collaborations, and interesting projects in Python or React.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noreferrer">
                  <Github /> Follow on GitHub
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="mailto:emiejeoghenekaro@gmail.com"><Mail />Email me</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p className="font-mono">© {new Date().getFullYear()} Peter</p>
          <p className="font-mono">Built with React + Tailwind</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
