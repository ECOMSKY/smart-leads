export default function Formulaire() {
  return (
    <section id="formulaire" className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="fade-in font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main">
          Testez votre éligibilité
        </h2>
        <p className="fade-in mt-2 text-text-secondary italic">
          et découvrez la technologie en action
        </p>
        <p className="fade-in mt-4 text-text-secondary leading-relaxed">
          Répondez à quelques questions pour voir si mon accompagnement peut s&apos;appliquer à
          votre activité. Temps estimé&nbsp;: 90 secondes.
        </p>

        {/* ===== Conteneur du formulaire embed ===== */}
        <div id="okko-form-container" className="fade-in mt-10 min-h-[400px]">
          {/* Coller ici le script embed OKKO Flow */}
        </div>

        <p className="fade-in mt-6 text-sm text-text-secondary">
          🔒 Vos données restent confidentielles et ne sont utilisées que pour évaluer votre
          éligibilité.
        </p>
      </div>
    </section>
  );
}
