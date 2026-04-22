const phone = document.querySelector(".phone");
const screens = document.querySelectorAll(".screen");
const navButtons = document.querySelectorAll(".nav-button");
const onboardingSteps = document.querySelectorAll(".onboarding-step");
const dots = document.querySelectorAll(".dot");
const nextStepButton = document.querySelector("#next-step");
const backStepButton = document.querySelector("#back-step");
const captureSheet = document.querySelector("#capture-sheet");
const toast = document.querySelector("#undo-toast");
const demoStart = document.querySelector("#demo-start");
const heroWaitlist = document.querySelector("#hero-waitlist");
const waitlistForm = document.querySelector("#waitlist-form");
const waitlistStatus = document.querySelector("#waitlist-status");
const languageButtons = document.querySelectorAll(".language-switch button");

const SUPABASE_URL = "https://YOUR_PROJECT_REF.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
const WAITLIST_TABLE = "mika_waitlist";

let onboardingStep = 0;
let activeAppScreen = "home";
let currentLanguage = "en";

const translations = {
  en: {
    betaBadge: "Private beta for default parents",
    heroEyebrow: "For moms who remember everything",
    heroTitle: "Turn family chaos into a morning brief.",
    heroCopy:
      "Mika gathers the school forms, voice notes, calendar chaos, and partner handoffs before they become the thing everyone forgot.",
    heroEmailPlaceholder: "you@family.com",
    heroWaitlistButton: "Get early access",
    demoLink: "Try the live demo ->",
    privacyLine: "Your family data never trains anyone else's AI.",
    signalForms: "School forms",
    signalVoice: "Voice notes",
    signalCalendar: "Fridge calendar",
    signalHandoffs: "Partner handoffs",
    flowBeforeTitle: "Before Mika",
    flowBeforeCopy:
      "Notes, texts, calendars, paper forms, and one mom trying to hold the whole week in her head.",
    flowCaptureTitle: "Capture the chaos",
    flowCaptureCopy: "Snap the form or say the messy thing. Mika quietly turns it into a draft.",
    flowBriefTitle: "Morning brief",
    flowBriefCopy: "The family gets a clean 7 AM readout of today, to-dos, and what might slip.",
    flowHandoffTitle: "No asking required",
    flowHandoffCopy: "Co-parents know what needs doing before the group chat spiral starts.",
    beforeLabel: "Before Mika",
    beforeTitle: "Wait. What did we forget?",
    noteSlip: "Field trip slip?",
    notePickup: "Who has swim pickup?",
    noteRsvp: "RSVP deadline",
    noteMilk: "Milk. Again.",
    afterLabel: "After Mika",
    afterTitle: "Your 7 AM family brief.",
    briefPreviewTitle: "Today is handled.",
    briefPreviewCopy:
      "Swim at 4, Sam pickup. Field trip slip due tomorrow. RSVP by Friday. Milk is on the list.",
    trustCopy:
      "Built for organized-but-overwhelmed moms running the house from Notes, calendars, texts, WhatsApp, and one heroic fridge magnet.",
    proofOne: '"This is the app I wanted after the third forgotten permission slip."',
    proofOneByline: "Beta mom · 2 kids · Google Calendar household",
    proofTwo: '"It finally gives the co-parent the context, not just another calendar invite."',
    proofTwoByline: "Working parent · founder household",
    guideTitle: "Tap the prototype",
    guideCopy: "Start onboarding or hit + to add a messy family thing.",
    feedbackEyebrow: "Join the private beta",
    feedbackTitle: "Tell us what your family always forgets.",
    feedbackCopy: "Leave your details and the one logistics problem you wish Mika would solve first.",
    firstNameLabel: "First name",
    emailLabel: "Email",
    locationLabel: "Location",
    parentTypeLabel: "Parent type",
    commentLabel: "Product feedback",
    firstNamePlaceholder: "Chan",
    emailPlaceholder: "you@family.com",
    locationPlaceholder: "Toronto, ON",
    commentPlaceholder:
      "What does your family always forget? What would make Mika useful enough to share?",
    parentWorking: "Working mom",
    parentStayHome: "Stay-at-home mom",
    parentDefault: "Default parent",
    parentCoparent: "Co-parent",
    parentFounder: "Founder household",
    feedbackButton: "Get early access",
    formDefaultStatus: "Privacy-first beta. No kid data sold. No spam.",
    formSaving: "Saving your note for Mika...",
    formLocal:
      "Prototype saved this locally. Add your Supabase URL and anon key in app.js to collect real submissions.",
    formSuccess: "You're on the Mika list. Thank you for helping shape the product.",
    formError: "Something did not save. Please try again, or send feedback directly to Chan.",
    sending: "Sending...",
    onboarding: [
      {
        title: "Set up your household in minutes.",
        copy:
          "Mika learns who is in the family, when your brief should arrive, and what calendar to watch.",
      },
      {
        title: "Add the kids Mika should recognize.",
        copy:
          "Names and ages help Mika understand school forms, activities, and who each item belongs to.",
      },
      {
        title: "Connect the calendar you already trust.",
        copy:
          "Mika augments your calendar. It does not replace it, and every AI-created event is reviewable.",
      },
      {
        title: "Choose when Mika should brief you.",
        copy:
          "The morning brief is the product's heartbeat: calm, short, and ready before the day starts.",
      },
    ],
    back: "Back",
    skip: "Skip",
    continue: "Continue",
    startMika: "Start Mika",
  },
  fr: {
    betaBadge: "Beta privée pour les parents qui portent tout",
    heroEyebrow: "Pour les mères qui pensent à tout",
    heroTitle: "Transformez le chaos familial en briefing du matin.",
    heroCopy:
      "Mika rassemble les formulaires d'école, notes vocales, calendriers et relais entre parents avant qu'ils deviennent le truc oublié.",
    heroEmailPlaceholder: "vous@famille.com",
    heroWaitlistButton: "Demander un accès",
    demoLink: "Essayer la démo ->",
    privacyLine: "Les données de votre famille n'entraînent jamais l'IA de quelqu'un d'autre.",
    signalForms: "Formulaires d'école",
    signalVoice: "Notes vocales",
    signalCalendar: "Calendrier du frigo",
    signalHandoffs: "Relais entre parents",
    flowBeforeTitle: "Avant Mika",
    flowBeforeCopy:
      "Notes, textos, calendriers, papiers d'école, et une mère qui essaie de garder toute la semaine en tête.",
    flowCaptureTitle: "Capturez le chaos",
    flowCaptureCopy: "Prenez une photo ou dictez la note. Mika la transforme discrètement en brouillon.",
    flowBriefTitle: "Briefing du matin",
    flowBriefCopy: "La famille reçoit à 7 h un résumé clair de la journée, des tâches et de ce qui risque de tomber.",
    flowHandoffTitle: "Plus besoin de demander",
    flowHandoffCopy: "Les co-parents savent quoi faire avant que la conversation de groupe parte dans tous les sens.",
    beforeLabel: "Avant Mika",
    beforeTitle: "Attends. Qu'est-ce qu'on a oublié?",
    noteSlip: "Permission signée?",
    notePickup: "Qui récupère au cours de natation?",
    noteRsvp: "Réponse avant vendredi",
    noteMilk: "Du lait. Encore.",
    afterLabel: "Avec Mika",
    afterTitle: "Votre briefing familial de 7 h.",
    briefPreviewTitle: "Aujourd'hui est sous contrôle.",
    briefPreviewCopy:
      "Natation à 16 h, Sam récupère. Permission due demain. Réponse avant vendredi. Le lait est sur la liste.",
    trustCopy:
      "Pensé pour les mères organisées mais débordées qui gèrent la maison avec Notes, calendriers, textos, WhatsApp et un aimant de frigo héroïque.",
    proofOne: "\"C'est l'app que je voulais après le troisième formulaire oublié.\"",
    proofOneByline: "Maman beta · 2 enfants · famille Google Calendar",
    proofTwo: '"Ça donne enfin le contexte au co-parent, pas juste une autre invitation calendrier."',
    proofTwoByline: "Parent actif · foyer de fondateur",
    guideTitle: "Touchez le prototype",
    guideCopy: "Commencez l'onboarding ou appuyez sur + pour ajouter un truc familial en vrac.",
    feedbackEyebrow: "Rejoindre la beta privée",
    feedbackTitle: "Dites-nous ce que votre famille oublie toujours.",
    feedbackCopy: "Laissez vos infos et le problème logistique que Mika devrait résoudre en premier.",
    firstNameLabel: "Prénom",
    emailLabel: "Courriel",
    locationLabel: "Lieu",
    parentTypeLabel: "Type de parent",
    commentLabel: "Commentaire produit",
    firstNamePlaceholder: "Chan",
    emailPlaceholder: "vous@famille.com",
    locationPlaceholder: "Toronto, ON",
    commentPlaceholder:
      "Qu'est-ce que votre famille oublie toujours? Qu'est-ce qui rendrait Mika assez utile pour le partager?",
    parentWorking: "Maman qui travaille",
    parentStayHome: "Maman à la maison",
    parentDefault: "Parent par défaut",
    parentCoparent: "Co-parent",
    parentFounder: "Foyer de fondateur",
    feedbackButton: "Demander un accès",
    formDefaultStatus: "Beta privée. Aucune donnée d'enfant vendue. Aucun spam.",
    formSaving: "On enregistre votre note pour Mika...",
    formLocal:
      "Prototype enregistré localement. Ajoutez l'URL Supabase et la clé anon dans app.js pour collecter les vraies soumissions.",
    formSuccess: "Vous êtes sur la liste Mika. Merci d'aider à façonner le produit.",
    formError: "L'enregistrement n'a pas fonctionné. Réessayez ou envoyez le feedback directement à Chan.",
    sending: "Envoi...",
    onboarding: [
      {
        title: "Configurez votre foyer en quelques minutes.",
        copy:
          "Mika apprend qui fait partie de la famille, quand envoyer le briefing et quel calendrier surveiller.",
      },
      {
        title: "Ajoutez les enfants que Mika doit reconnaître.",
        copy:
          "Les prénoms et les âges aident Mika à comprendre les formulaires d'école, les activités et à qui chaque item appartient.",
      },
      {
        title: "Connectez le calendrier que vous utilisez déjà.",
        copy:
          "Mika complète votre calendrier. Il ne le remplace pas, et chaque événement créé est toujours vérifiable.",
      },
      {
        title: "Choisissez l'heure du briefing Mika.",
        copy:
          "Le briefing du matin est le coeur du produit: calme, court, prêt avant que la journée commence.",
      },
    ],
    back: "Retour",
    skip: "Passer",
    continue: "Continuer",
    startMika: "Démarrer Mika",
  },
};

function showScreen(id) {
  phone.classList.add("guide-hidden");

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });

  const isOnboarding = id === "onboarding";
  phone.classList.toggle("app-ready", !isOnboarding);

  if (!isOnboarding && id !== "confirm") {
    activeAppScreen = id;
    navButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.target === id);
    });
  }
}

function translate(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function applyLanguage(language) {
  currentLanguage = language;
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    element.placeholder = translate(element.dataset.i18nPlaceholder);
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  renderOnboardingStep();
}

function renderOnboardingStep() {
  const content = translations[currentLanguage].onboarding[onboardingStep];
  document.querySelector("#onboarding-title").textContent = content.title;
  document.querySelector("#onboarding-copy").textContent = content.copy;

  onboardingSteps.forEach((panel) => {
    panel.classList.toggle(
      "active",
      Number(panel.dataset.stepPanel) === onboardingStep,
    );
  });

  dots.forEach((dot) => {
    dot.classList.toggle("active", Number(dot.dataset.step) === onboardingStep);
  });

  backStepButton.textContent =
    onboardingStep === 0 ? translate("skip") : translate("back");
  nextStepButton.textContent =
    onboardingStep === 3 ? translate("startMika") : translate("continue");
}

nextStepButton.addEventListener("click", () => {
  phone.classList.add("guide-hidden");

  if (onboardingStep < 3) {
    onboardingStep += 1;
    renderOnboardingStep();
    return;
  }

  showScreen("home");
});

backStepButton.addEventListener("click", () => {
  phone.classList.add("guide-hidden");

  if (onboardingStep > 0) {
    onboardingStep -= 1;
    renderOnboardingStep();
    return;
  }

  showScreen("home");
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    phone.classList.add("guide-hidden");
    onboardingStep = Number(dot.dataset.step);
    renderOnboardingStep();
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.target);
  });
});

demoStart.addEventListener("click", () => {
  document.body.classList.add("demo-open");
  showScreen("onboarding");
});

heroWaitlist.addEventListener("submit", (event) => {
  event.preventDefault();

  const heroEmail = new FormData(heroWaitlist).get("hero_email").trim();
  waitlistForm.querySelector('input[name="email"]').value = heroEmail;
  document.querySelector(".feedback-card").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  waitlistForm.querySelector('input[name="first_name"]').focus({
    preventScroll: true,
  });
});

document.querySelector("#open-capture").addEventListener("click", () => {
  phone.classList.add("guide-hidden");
  captureSheet.classList.add("open");
  captureSheet.setAttribute("aria-hidden", "false");
});

captureSheet.addEventListener("click", (event) => {
  if (event.target === captureSheet) {
    captureSheet.classList.remove("open");
    captureSheet.setAttribute("aria-hidden", "true");
  }
});

document.querySelector("#parse-capture").addEventListener("click", () => {
  captureSheet.classList.remove("open");
  captureSheet.setAttribute("aria-hidden", "true");
  showScreen("confirm");
});

document.querySelector("#close-confirm").addEventListener("click", () => {
  showScreen(activeAppScreen);
});

document.querySelector("#save-confirm").addEventListener("click", () => {
  showScreen("home");
});

document.querySelector("#open-settings").addEventListener("click", () => {
  showScreen("settings");
});

document.querySelectorAll(".task-item").forEach((item) => {
  item.addEventListener("click", () => {
    item.style.transform = "translateX(1.3rem)";
    item.style.opacity = "0";
    toast.classList.add("show");

    window.setTimeout(() => {
      item.style.transform = "";
      item.style.opacity = "";
    }, 850);

    window.setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  });
});

document.querySelectorAll(".toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOn = toggle.classList.toggle("on");
    toggle.setAttribute("aria-pressed", String(isOn));
  });
});

document.querySelectorAll(".tabs button").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tabs button").forEach((button) => {
      button.classList.toggle("active", button === tab);
    });
  });
});

document.querySelectorAll(".settings-list button").forEach((button) => {
  button.addEventListener("click", () => {
    button.animate(
      [
        { transform: "scale(1)", background: "#fffefb" },
        { transform: "scale(0.98)", background: "#eef4ef" },
        { transform: "scale(1)", background: "#fffefb" },
      ],
      { duration: 260, easing: "ease-out" },
    );
  });
});

function isSupabaseConfigured() {
  return (
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("YOUR_PROJECT_REF") &&
    SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
  );
}

function setWaitlistStatus(message, type = "") {
  waitlistStatus.textContent = message;
  waitlistStatus.className = type;
}

waitlistForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const submitButton = waitlistForm.querySelector('button[type="submit"]');
  const formData = new FormData(waitlistForm);
  const payload = {
    first_name: formData.get("first_name").trim(),
    email: formData.get("email").trim(),
    location: formData.get("location").trim(),
    parent_type: formData.get("parent_type"),
    comment: formData.get("comment").trim(),
    source: "github_pages_prototype",
    page_url: window.location.href,
    user_agent: window.navigator.userAgent,
  };

  submitButton.disabled = true;
  submitButton.textContent = translate("sending");
  setWaitlistStatus(translate("formSaving"), "");

  if (!isSupabaseConfigured()) {
    const saved = JSON.parse(localStorage.getItem("mika_waitlist_drafts") || "[]");
    saved.push({ ...payload, created_at: new Date().toISOString() });
    localStorage.setItem("mika_waitlist_drafts", JSON.stringify(saved));
    waitlistForm.reset();
    submitButton.disabled = false;
    submitButton.textContent = translate("feedbackButton");
    setWaitlistStatus(translate("formLocal"), "success");
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/${WAITLIST_TABLE}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Supabase insert failed with ${response.status}`);
    }

    waitlistForm.reset();
    setWaitlistStatus(translate("formSuccess"), "success");
  } catch (error) {
    setWaitlistStatus(translate("formError"), "error");
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = translate("feedbackButton");
  }
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
  });
});

applyLanguage("en");
