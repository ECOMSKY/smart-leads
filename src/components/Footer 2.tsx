export default function Footer() {
  return (
    <footer className="bg-[#0F172A] text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-outfit font-semibold text-lg">
              Alain — Consultant Lead Qualification
            </p>
            <a
              href="mailto:placeholder@email.com"
              className="mt-1 inline-block text-gray-400 hover:text-white transition-colors text-sm"
            >
              {/* TODO: Remplacer par la vraie adresse email */}
              placeholder@email.com
            </a>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            {/* TODO: Remplacer par le vrai lien LinkedIn */}
            <a
              href="https://linkedin.com/in/placeholder"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            {/* TODO: Remplacer par le vrai lien mentions légales */}
            <a href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-gray-500">
          © 2026 Smart Leads — Tous droits réservés
        </div>
      </div>
    </footer>
  );
}
