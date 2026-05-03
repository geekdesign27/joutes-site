import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";

interface Props {
  ga4Id?: string;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function loadGA4(measurementId: string) {
  if (typeof window === "undefined") return;
  if (document.querySelector(`script[data-ga4="${measurementId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.ga4 = measurementId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });
}

export default function CookieBanner({ ga4Id }: Props) {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box",
          position: "bottom right",
          equalWeightButtons: true,
          flipButtons: false,
        },
        preferencesModal: {
          layout: "box",
          equalWeightButtons: true,
          flipButtons: false,
        },
      },
      categories: {
        necessary: { enabled: true, readOnly: true },
        analytics: {
          enabled: false,
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: "_gid" }],
          },
          services: ga4Id
            ? {
                ga4: {
                  label: "Google Analytics 4",
                  onAccept: () => loadGA4(ga4Id),
                },
              }
            : {},
        },
      },
      language: {
        default: "fr",
        translations: {
          fr: {
            consentModal: {
              title: "Cookies & vie privée",
              description:
                "Ce site utilise uniquement des cookies de mesure d'audience anonymes pour comprendre la fréquentation. Aucune donnée n'est partagée à des fins publicitaires.",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser",
              showPreferencesBtn: "Personnaliser",
              footer: '<a href="/mentions-legales">Mentions légales</a>',
            },
            preferencesModal: {
              title: "Préférences cookies",
              acceptAllBtn: "Tout accepter",
              acceptNecessaryBtn: "Refuser",
              savePreferencesBtn: "Enregistrer mes choix",
              closeIconLabel: "Fermer",
              sections: [
                {
                  title: "Cookies strictement nécessaires",
                  description:
                    "Ces cookies sont indispensables au fonctionnement du site et ne peuvent être désactivés.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Mesure d'audience",
                  description:
                    "Cookies Google Analytics 4 anonymisés pour mesurer la fréquentation. Optionnels.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });
  }, [ga4Id]);

  return null;
}
