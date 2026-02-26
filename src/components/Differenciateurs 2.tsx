const cards = [
  {
    emoji: "🎯",
    title: "Je n'optimise pas vos campagnes. J'optimise vos signaux.",
    description:
      "Les consultants classiques ajustent vos enchères et vos audiences. Moi, je m'attaque à la racine : la qualité des données que vos pixels envoient aux algorithmes. Moins de bruit, plus de signal.",
  },
  {
    emoji: "🤖",
    title: "Une technologie d'IA propriétaire",
    description:
      "Chaque lead qui remplit un formulaire est scoré en temps réel par une IA. Seuls les leads qualifiés déclenchent le pixel de conversion. Vos algorithmes apprennent uniquement des bons profils.",
  },
  {
    emoji: "📊",
    title: "Des résultats mesurables, pas des promesses",
    description:
      "Je ne vends pas du conseil. Je déploie un outil concret sur vos formulaires et je mesure l'impact : coût par lead qualifié, taux de conversion, ROAS. Si les chiffres ne bougent pas, ça se voit.",
  },
];

export default function Differenciateurs() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="fade-in font-outfit text-2xl sm:text-3xl lg:text-4xl font-bold text-text-main text-center">
          Ce que je fais différemment
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {cards.map((card, i) => (
            <div
              key={i}
              className="fade-in border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              <span className="text-4xl">{card.emoji}</span>
              <h3 className="mt-4 font-outfit text-lg font-semibold text-text-main">
                {card.title}
              </h3>
              <p className="mt-3 text-text-secondary leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
