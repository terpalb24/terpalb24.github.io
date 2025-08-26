export default function Footer() {
  return (
    <footer className="py-24">
      <div className="container flex flex-col items-center justify-center gap-4">
        <p className="text-center font-semibold">
          &copy; {new Date().getFullYear()} Terpal B 24. All rights reserved.
        </p>
        <p className="text-center text-sm">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/terpalb24/terpalb24.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            The Contributor
          </a>
        </p>
      </div>
    </footer>
  );
}
