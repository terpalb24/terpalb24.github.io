import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Hero section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Welcome to TERPAL B 24
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Software Engineering Class at Politeknik Negeri Batam
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/members">
                  Meet Our Team <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/projects">View Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">About Our Class</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                TERPAL B 24 is a Software Engineering class focused on developing practical skills and knowledge in
                modern software development.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Collaborative Learning</h3>
              <p className="text-sm text-muted-foreground text-center">
                We work together on projects to develop teamwork and communication skills.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Practical Projects</h3>
              <p className="text-sm text-muted-foreground text-center">
                Hands-on experience with real-world software engineering challenges.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Industry Preparation</h3>
              <p className="text-sm text-muted-foreground text-center">
                Curriculum designed to prepare students for careers in software development.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

