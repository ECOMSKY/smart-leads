export default function Hero() {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-[120px] px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Texte */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="font-outfit text-3xl sm:text-4xl lg:text-5xl font-bold text-text-main leading-tight">
            Vos pubs génèrent des leads.{" "}
            <span className="text-primary">Mais combien deviennent clients&nbsp;?</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
            Je déploie une technologie d&apos;IA qui empêche les mauvais leads de polluer vos
            algorithmes publicitaires. Résultat&nbsp;: vos campagnes optimisent sur les bons
            signaux, votre coût par client qualifié baisse.
          </p>
          <a
            href="#video"
            className="mt-8 inline-block bg-primary hover:bg-primary-hover text-white font-medium px-8 py-3.5 rounded-lg transition-colors text-lg"
          >
            Découvrir comment ↓
          </a>
        </div>

        {/* Placeholder illustration */}
        <div className="flex-1 w-full max-w-md lg:max-w-none">
          <div className="aspect-square max-w-[420px] mx-auto bg-bg-alt rounded-2xl border border-gray-200 flex items-center justify-center">
            {/* TODO: Remplacer par une illustration ou image */}
            <span className="text-text-secondary text-sm">Illustration</span>
          </div>
        </div>
      </div>
    </section>
  );
}
