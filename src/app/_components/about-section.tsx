export default function AboutSection() {
  return (
    <section id="about" className="container py-24">
      <div className="mx-auto flex flex-col md:flex-row max-w-3xl gap-12">
        <h2 className="text-primary md:w-48 text-center md:text-right text-5xl leading-normal font-extrabold">
          Who We Are?
        </h2>
        <p className="about-desc flex-1 text-center md:text-left md:leading-normal text-xl md:text-2xl leading-normal font-semibold">
          Terpal B 24 is a{" "}
          <span className="text-primary">software engineering class</span> at{" "}
          <span className="text-secondary">Politeknik Negeri Batam</span>.
          <br />
          Focusing on developing skills in{" "}
          <span className="text-primary">software development</span>, teamwork,
          and project management.
        </p>
      </div>
    </section>
  );
}
