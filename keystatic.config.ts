import { config, fields, collection, singleton } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "geekdesign27/joutes-site",
  },
  ui: {
    brand: { name: "Joutes 2026" },
    navigation: {
      Réglages: ["site"],
      Sections: ["hero", "ouvertATous", "match"],
      Sponsors: ["sponsors"],
    },
  },
  singletons: {
    site: singleton({
      label: "Réglages du site",
      path: "src/content/settings/site",
      format: { data: "json" },
      schema: {
        title: fields.text({
          label: "Title SEO",
          defaultValue: "Joutes Inter-Pompiers de la Sarine 2026",
        }),
        description: fields.text({
          label: "Meta description",
          multiline: true,
          defaultValue:
            "Joutes Inter-Pompiers de la Sarine 2026 — Une journée festive avec compétitions, diffusion du match Suisse-Qatar de la Coupe du Monde, et soirée. Le 13 juin 2026 à Villars-sur-Glâne.",
        }),
        eventDate: fields.text({
          label: "Date événement (ISO ex: 2026-06-13)",
          defaultValue: "2026-06-13",
        }),
        eventTime: fields.text({
          label: "Heure de début",
          defaultValue: "12h00",
        }),
        eventLocation: fields.text({
          label: "Lieu",
          defaultValue: "Villars-sur-Glâne — Nuithonie",
        }),
        organizationName: fields.text({
          label: "Nom de l'organisation",
          defaultValue: "Compagnie des Sapeurs-Pompiers de Moncor",
        }),
        addressStreet: fields.text({
          label: "Adresse — rue",
          defaultValue: "CP Moncor, Rte de Chandolan 1",
        }),
        addressCity: fields.text({
          label: "Adresse — ville",
          defaultValue: "1752 Villars-sur-Glâne",
        }),
        instagramUrl: fields.url({
          label: "Instagram",
          defaultValue: "https://instagram.com/",
        }),
        facebookUrl: fields.url({
          label: "Facebook",
          defaultValue: "https://facebook.com/",
        }),
        ga4Id: fields.text({
          label: "GA4 Measurement ID",
          description: "Format: G-XXXXXXXXXX (laisser vide pour désactiver)",
          defaultValue: "",
        }),
      },
    }),
    hero: singleton({
      label: "Section Hero",
      path: "src/content/sections/hero",
      format: { data: "json" },
      schema: {
        line1: fields.text({
          label: "Ligne 1 (serif italique)",
          defaultValue: "Joutes",
        }),
        line2: fields.text({
          label: "Ligne 2 (sans bold)",
          defaultValue: "Inter-Pompiers",
        }),
        line3a: fields.text({
          label: "Ligne 3 partie A (serif)",
          defaultValue: "De la",
        }),
        line3b: fields.text({
          label: "Ligne 3 partie B (sans bold)",
          defaultValue: "Sarine",
        }),
        backgroundImage: fields.image({
          label: "Image de fond du hero (optionnelle)",
          description:
            "Si renseignée, s'affiche sous le gradient. Sinon, gradient seul.",
          directory: "public/hero",
          publicPath: "/hero/",
        }),
      },
    }),
    ouvertATous: singleton({
      label: "Section Ouvert à tous",
      path: "src/content/sections/ouvert-a-tous",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({
          label: "Eyebrow",
          defaultValue: "Édition 2026",
        }),
        title: fields.text({ label: "Titre", defaultValue: "Ouvert\nà tous" }),
        subtitle: fields.text({
          label: "Sous-titre",
          defaultValue: "Bar, snacks, ambiance & soirée",
        }),
        paragraph1: fields.text({
          label: "Paragraphe 1",
          multiline: true,
          defaultValue:
            "Venez vivre une journée conviviale au cœur des sapeurs-pompiers de la Sarine.",
        }),
        paragraph2: fields.text({
          label: "Paragraphe 2",
          multiline: true,
          defaultValue:
            "Entre compétitions ludiques, moments de partage et ambiance festive, les Joutes 2026 s'ouvrent à toutes et tous — familles, amis et curieux.",
        }),
        paragraph3: fields.text({
          label: "Paragraphe 3",
          multiline: true,
          defaultValue:
            "La journée se prolongera en soirée avec une atmosphère chaleureuse, de la musique et de quoi se restaurer.",
        }),
        callout: fields.text({
          label: "Phrase d'appel finale",
          defaultValue: "On vous attend nombreux !",
        }),
      },
    }),
    match: singleton({
      label: "Section Match Suisse-Qatar",
      path: "src/content/sections/match",
      format: { data: "json" },
      schema: {
        eyebrow: fields.text({
          label: "Eyebrow",
          defaultValue: "Coupe du Monde · Live",
        }),
        title: fields.text({
          label: "Titre (\\n pour saut de ligne)",
          defaultValue: "Diffusion\ndu match\nSuisse-Qatar",
        }),
        body: fields.text({
          label: "Texte principal",
          multiline: true,
          defaultValue:
            "Cette édition 2026 prend une dimension encore plus festive avec la diffusion en direct du match de la Coupe du Monde. Un écran géant, une ambiance survoltée et un moment à partager tous ensemble entre passion du sport et esprit pompier.",
        }),
        callout: fields.text({
          label: "Appel final",
          defaultValue: "Venez vibrer avec nous !",
        }),
        kickoff: fields.text({
          label: "Coup d'envoi",
          defaultValue: "À définir",
        }),
        location: fields.text({
          label: "Lieu de diffusion",
          defaultValue: "Écran géant",
        }),
        entry: fields.text({ label: "Entrée", defaultValue: "Libre" }),
      },
    }),
  },
  collections: {
    sponsors: collection({
      label: "Sponsors",
      slugField: "name",
      path: "src/content/sponsors/*",
      format: { data: "json" },
      schema: {
        name: fields.slug({
          name: { label: "Nom du sponsor" },
        }),
        url: fields.url({
          label: "Site web",
          validation: { isRequired: true },
        }),
        logo: fields.image({
          label: "Logo",
          directory: "public/sponsors",
          publicPath: "/sponsors/",
          validation: { isRequired: true },
        }),
        recolor: fields.checkbox({
          label: "Appliquer le filtre orange",
          description:
            "Décocher si le logo doit garder ses couleurs natives (PNG/JPG couleurs).",
          defaultValue: true,
        }),
        order: fields.integer({
          label: "Ordre d'affichage",
          defaultValue: 0,
        }),
      },
    }),
  },
});
