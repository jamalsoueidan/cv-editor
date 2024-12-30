import type { CookieConsentConfig } from "vanilla-cookieconsent";

export const configConsent: CookieConsentConfig = {
  root: "#app",

  guiOptions: {
    consentModal: {
      layout: "box wide",
      position: "bottom right",
    },
    preferencesModal: {
      layout: "box",
    },
  },

  onFirstConsent: () => {
    console.log("onFirstAction fired");
  },

  onConsent: () => {
    console.log("onConsent fired ...");
  },

  onChange: () => {
    console.log("onChange fired ...");
  },

  categories: {
    necessary: {
      readOnly: true,
      enabled: true,
    },
    analytics: {
      autoClear: {
        cookies: [
          {
            name: /^(_ga|_gid)/,
          },
        ],
      },
    },
    ads: {},
  },

  language: {
    default: "en",

    translations: {
      en: {
        consentModal: {
          title: "We use only essential cookies",
          description:
            "This website only uses essential cookies for proper functionality. No personal data or tracking cookies are stored.",
          acceptAllBtn: "Accept",
          acceptNecessaryBtn: "Reject",
          showPreferencesBtn: "Manage preferences",
          closeIconLabel: "Close",
          footer: `
            <a href="/privacy">Privacy Policy</a>
          `,
        },
        preferencesModal: {
          title: "Cookie preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          sections: [
            {
              title: "Essential cookies",
              description:
                "These cookies are necessary for the website to function and cannot be turned off. They are only used to provide you with services or functions you have requested.",
              linkedCategory: "necessary",
            },
            {
              title: "More information",
              description:
                'For any questions about our use of cookies, please <a class="cc__link" href="#yourdomain.com">contact us</a>.',
            },
          ],
        },
      },
    },
  },
};
