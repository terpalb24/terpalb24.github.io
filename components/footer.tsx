export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} TERPAL B 24 - Software Engineering Class at Politeknik Negeri Batam
        </p>
      </div>
    </footer>
  )
}

