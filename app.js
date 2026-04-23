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
const footerWaitlist = document.querySelector("#footer-waitlist");
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
    betaBadge: "Private beta for busy families",
    heroTitle: "Your family’s personal assistant.",
    heroCopy:
      "Mika helps with school forms, birthday invites, schedules, school breaks, weekend plans, and the hundred little things that usually live in your head. So your week feels lighter, calmer, and more under control.",
    heroEmailPlaceholder: "you@email.com",
    heroWaitlistButton: "Try Mika",
    demoLink: "Join the private beta",
    privacyLine: "Private by design. Your family data stays yours.",
    signalForms: "School forms",
    signalVoice: "Voice notes",
    signalCalendar: "Birthday invites",
    signalHandoffs: "School breaks",
    flowBeforeTitle: "Before Mika",
    flowBeforeCopy:
      "If you’re the one remembering school forms, pickups, birthdays, groceries, camp deadlines, and who needs to be where — Mika is for you.",
    flowCaptureTitle: "A family assistant, not another calendar",
    flowCaptureCopy: "Most calendars were built for meetings. Mika was built for family life.",
    flowBriefTitle: "See the full week",
    flowBriefCopy: "Mika quietly keeps track of what’s coming up, reminds the right person, and helps your family stay one step ahead.",
    flowHandoffTitle: "For every kind of family",
    flowHandoffCopy: "For busy families. For co-parents. For solo parents. For anyone carrying too much in their head.",
    beforeLabel: "Before Mika",
    beforeTitle: "Wait. What did we forget?",
    noteSlip: "Field trip slip?",
    notePickup: "Who has swim pickup?",
    noteRsvp: "Birthday gift",
    noteMilk: "Milk. Again.",
    afterLabel: "After Mika",
    afterTitle: "Your family, one step ahead.",
    briefPreviewTitle: "This week is handled.",
    briefPreviewCopy:
      "Swim at 4, Sam pickup. Field trip slip due tomorrow. RSVP by Friday. Saturday birthday party at 2. Mika already surfaced what matters.",
    trustCopy:
      "Mika supports weekdays and weekends, school-year rhythms, school breaks, sports schedules, family gatherings, birthday parties, and the invisible logistics in between. Because family life doesn’t only happen Monday to Friday.",
    proofOne: "“This feels like having help.”",
    proofOneByline: "“Finally, someone else remembers the family stuff.”",
    proofTwo: "“The first family app that actually reduces mental load.”",
    proofTwoByline: "Working parent · shared custody schedule",
    footerEyebrow: "Early access",
    footerTitle: "Ready for less mental load?",
    footerCopy:
      "Join the first families using Mika to make weeks smoother, weekends calmer, and nothing important slip through the cracks.",
    footerButton: "Join the waitlist",
    footerPrivacy: "No kid data sold, ever. You can delete everything in one tap.",
    appWelcome: "Welcome to Mika",
    householdNameLabel: "Household name",
    timezoneLabel: "Timezone",
    childLabel: "Child",
    addChildButton: "Add another child",
    googleCalendarTitle: "Google Calendar",
    googleCalendarCopy: "Use the calendar you already trust so Mika can help with school, activities, and what’s coming up.",
    connectCalendarButton: "Bring in my calendar",
    skipPrototypeButton: "Skip for now",
    briefTimeLabel: "When should Mika check in?",
    emailBriefLabel: "Email summary",
    pushNotificationLabel: "Phone reminder",
    homeDate: "Wednesday, Apr 22",
    homeGreeting: "Here’s your day, handled.",
    briefHeroEyebrow: "Today at a glance",
    briefHeroText: "3 events, 4 tasks, 1 thing that might slip.",
    briefTodayTitle: "Today",
    briefTodayCopy:
      "Mia has swim at 4:00 at Rec Center, and Sam is on pickup. Leo has library day, so the book bag needs to leave with him.",
    briefTodoTitle: "To Do",
    briefTodoCopy:
      "RSVP for Aria's birthday by Friday. Buy milk tonight, and sign the field trip form before backpacks are packed.",
    briefFallingTitle: "Falling Through",
    briefFallingCopy:
      "The field trip permission slip is due tomorrow morning and still needs a parent signature.",
    briefWinTitle: "Small Win",
    briefWinCopy: "Saturday morning is still clear. Mika is keeping it that way.",
    tasksEyebrow: "What Mika is helping with",
    tasksTitle: "What needs attention",
    tabToday: "Today",
    tabWeek: "Week",
    tabLater: "Later",
    tabDone: "Done",
    taskSlipTitle: "Sign field trip form",
    taskSlipMeta: "Due tomorrow morning · From photo",
    taskMilkTitle: "Buy milk",
    taskMilkMeta: "No date · Kitchen note",
    taskRsvpTitle: "RSVP to Aria's birthday",
    taskRsvpMeta: "Friday by 5:00 PM",
    undoToast: "Marked done. Undo",
    calendarEyebrow: "Family calendar",
    calendarTitle: "This week",
    selectedEventEyebrow: "Selected event",
    selectedEventTitle: "Mia swim class",
    selectedEventCopy: "Today, 4:00 PM at Rec Center. Sam is on pickup.",
    mealsEyebrow: "Meals this week",
    mealsTitle: "This week",
    settingsEyebrow: "Settings",
    settingsTitle: "The Carter Family",
    settingsHousehold: "Household",
    settingsHouseholdValue: "2 parents, 2 kids",
    settingsBrief: "Daily brief",
    settingsNotifications: "Notifications",
    settingsNotificationsValue: "Email + push",
    settingsExport: "Data export",
    confirmEyebrow: "Review before saving",
    confirmTitle: "Here’s what Mika took care of",
    typeLabel: "Type",
    titleLabel: "Title",
    dateTimeLabel: "Date and time",
    ownerLabel: "Owner",
    saveMikaButton: "Save to Mika",
    captureTitle: "Add something you’d like help with",
    captureCopy: "Type it, say it out loud, or snap the form. Mika helps you make sense of it.",
    voiceButton: "Voice",
    photoButton: "Photo",
    parseButton: "Let Mika help",
    navHome: "Home",
    navTasks: "Tasks",
    navEvents: "Events",
    navMeals: "Meals",
    feedbackEyebrow: "Join the private beta",
    feedbackTitle: "Tell us what would make your family life easier.",
    feedbackCopy: "We’re building Mika with real families first. Join early access and help shape the assistant modern families actually need.",
    firstNameLabel: "First name",
    emailLabel: "Email",
    locationLabel: "Location",
    ratingLabel: "How would you rate the app?",
    usefulnessLabel: "After trying the prototype, it feels...",
    usefulnessPlaceholder: "Choose one",
    usefulnessLove: "like an amazing fit for my family",
    usefulnessVery: "very useful for our everyday logistics",
    usefulnessInteresting: "interesting, but I need to see more",
    usefulnessUnclear: "not clear enough yet",
    usefulnessNot: "Not useful for my family",
    keywordsLabel: "What would be your main priorities?",
    keywordForms: "School, sports activities, birthday parties, etc.",
    keywordCalendar: "Calendar management",
    keywordHandoffs: "Co-parent handoffs",
    keywordTasks: "Notifications for forgotten tasks",
    keywordMeals: "Meals and meal prep",
    keywordBrief: "Morning, weekly, or monthly briefs",
    familySnapshotLabel: "Tell us more about your family dynamics or family structure.",
    familySnapshotPlaceholder:
      "Example: 2 parents, 2 kids ages 4 and 7. One parent travels often, one manages school logistics.",
    commentLabel: "What can we improve? What features do you want to see in the product?",
    firstNamePlaceholder: "Alex",
    emailPlaceholder: "you@email.com",
    locationPlaceholder: "Toronto, ON",
    commentPlaceholder:
      "What does your family always forget? What would make Mika useful enough to share?",
    feedbackButton: "Send your feedback",
    formDefaultStatus: "Privacy-first beta. No kid data sold. No spam.",
    formSaving: "Saving your note for Mika...",
    formLocal:
      "Prototype saved this locally. Add your Supabase URL and anon key in app.js to collect real submissions.",
    formSuccess:
      "Thank you so much for helping us. Do not forget to join the waitlist so we can let you know when Mika launches.",
    formError: "Something did not save. Please try again in a moment.",
    sending: "Sending...",
    onboarding: [
      {
        title: "Let’s get your family set up.",
        copy:
          "Tell Mika who’s in the family, when you'd like updates, and which calendar you already use.",
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
    skip: "Skip for now",
    continue: "Continue",
    startMika: "Start Mika",
  },
  fr: {
    betaBadge: "Beta privée pour familles occupées",
    heroTitle: "L’assistante personnelle de votre famille.",
    heroCopy:
      "Mika vous aide avec les formulaires d’école, les invitations d’anniversaire, les horaires, les congés scolaires, les plans de fin de semaine et les cent petites choses qui vivent habituellement dans votre tête. Pour que la semaine soit plus légère, plus calme et plus maîtrisée.",
    heroEmailPlaceholder: "vous@email.com",
    heroWaitlistButton: "Essayer Mika",
    demoLink: "Rejoindre la beta privée",
    privacyLine: "Confidentiel par design. Les données de votre famille restent à vous.",
    signalForms: "Formulaires d'école",
    signalVoice: "Notes vocales",
    signalCalendar: "Invitations d’anniversaire",
    signalHandoffs: "Congés scolaires",
    flowBeforeTitle: "Avant Mika",
    flowBeforeCopy:
      "Si vous êtes la personne qui se souvient des formulaires, pickups, anniversaires, courses, inscriptions au camp et qui doit être où — Mika est pour vous.",
    flowCaptureTitle: "Une assistante familiale, pas un autre calendrier",
    flowCaptureCopy: "La plupart des calendriers sont faits pour les réunions. Mika est fait pour la vie de famille.",
    flowBriefTitle: "Voir toute la semaine",
    flowBriefCopy: "Mika garde discrètement un oeil sur ce qui arrive, rappelle la bonne personne et aide votre famille à garder une longueur d’avance.",
    flowHandoffTitle: "Pour toutes les familles",
    flowHandoffCopy: "Pour les familles occupées. Pour les co-parents. Pour les parents solos. Pour toute personne qui porte trop de choses dans sa tête.",
    beforeLabel: "Avant Mika",
    beforeTitle: "Attends. Qu'est-ce qu'on a oublié?",
    noteSlip: "Permission signée?",
    notePickup: "Qui récupère au cours de natation?",
    noteRsvp: "Cadeau d’anniversaire",
    noteMilk: "Du lait. Encore.",
    afterLabel: "Avec Mika",
    afterTitle: "Votre famille, une longueur d’avance.",
    briefPreviewTitle: "La semaine est sous contrôle.",
    briefPreviewCopy:
      "Natation à 16 h, Sam récupère. Permission due demain. Réponse avant vendredi. Fête d’anniversaire samedi à 14 h. Mika a déjà fait remonter ce qui compte.",
    trustCopy:
      "Mika soutient les jours de semaine et les fins de semaine, le rythme scolaire, les congés, les sports, les réunions de famille, les anniversaires et toute la logistique invisible entre les deux. Parce que la vie de famille ne se passe pas seulement du lundi au vendredi.",
    proofOne: "« On dirait enfin qu’on a de l’aide. »",
    proofOneByline: "« Enfin, quelqu’un d’autre se souvient des choses de la famille. »",
    proofTwo: "« La première app familiale qui réduit vraiment la charge mentale. »",
    proofTwoByline: "Parent actif · garde partagée",
    footerEyebrow: "Accès anticipé",
    footerTitle: "Prêt pour moins de charge mentale?",
    footerCopy:
      "Rejoignez les premières familles qui utilisent Mika pour rendre les semaines plus simples, les fins de semaine plus calmes et éviter que les choses importantes passent entre les craques.",
    footerButton: "Rejoindre la liste",
    footerPrivacy: "Aucune donnée d'enfant vendue, jamais. Vous pouvez tout supprimer en un tap.",
    appWelcome: "Bienvenue dans Mika",
    householdNameLabel: "Nom de la famille",
    timezoneLabel: "Fuseau horaire",
    childLabel: "Enfant",
    addChildButton: "Ajouter un autre enfant",
    googleCalendarTitle: "Google Calendar",
    googleCalendarCopy: "Utilisez le calendrier que vous connaissez déjà pour que Mika puisse aider avec l’école, les activités et ce qui arrive.",
    connectCalendarButton: "Importer mon calendrier",
    skipPrototypeButton: "Passer pour l’instant",
    briefTimeLabel: "Quand Mika devrait-il faire le point?",
    emailBriefLabel: "Résumé par courriel",
    pushNotificationLabel: "Rappel sur le téléphone",
    homeDate: "Mercredi 22 avril",
    homeGreeting: "Votre journée, déjà plus claire.",
    briefHeroEyebrow: "Aujourd'hui, en un coup d'oeil",
    briefHeroText: "3 événements, 4 tâches, 1 chose qui risque de tomber.",
    briefTodayTitle: "Aujourd'hui",
    briefTodayCopy:
      "Mia a natation à 16 h au centre sportif, et Sam récupère. Leo a bibliothèque, donc le sac de livres doit partir avec lui.",
    briefTodoTitle: "À faire",
    briefTodoCopy:
      "Répondre à l'anniversaire d'Aria avant vendredi. Acheter du lait ce soir et signer le formulaire de sortie avant de préparer les sacs.",
    briefFallingTitle: "À risque",
    briefFallingCopy:
      "Le formulaire de sortie est dû demain matin et il manque encore une signature de parent.",
    briefWinTitle: "Petite victoire",
    briefWinCopy: "Samedi matin est encore libre. Mika le garde comme ça.",
    tasksEyebrow: "Ce que Mika aide à gérer",
    tasksTitle: "Ce qui demande votre attention",
    tabToday: "Aujourd'hui",
    tabWeek: "Semaine",
    tabLater: "Plus tard",
    tabDone: "Terminé",
    taskSlipTitle: "Signer le formulaire de sortie",
    taskSlipMeta: "Dû demain matin · Depuis une photo",
    taskMilkTitle: "Acheter du lait",
    taskMilkMeta: "Pas de date · Note de cuisine",
    taskRsvpTitle: "Répondre à l'anniversaire d'Aria",
    taskRsvpMeta: "Vendredi avant 17 h",
    undoToast: "Marqué comme fait. Annuler",
    calendarEyebrow: "Calendrier familial",
    calendarTitle: "Cette semaine",
    selectedEventEyebrow: "Événement sélectionné",
    selectedEventTitle: "Cours de natation de Mia",
    selectedEventCopy: "Aujourd'hui, 16 h au centre sportif. Sam récupère.",
    mealsEyebrow: "Repas de la semaine",
    mealsTitle: "Cette semaine",
    settingsEyebrow: "Réglages",
    settingsTitle: "La famille Carter",
    settingsHousehold: "Famille",
    settingsHouseholdValue: "2 parents, 2 enfants",
    settingsBrief: "Briefing quotidien",
    settingsNotifications: "Notifications",
    settingsNotificationsValue: "Courriel + push",
    settingsExport: "Export des données",
    confirmEyebrow: "Vérifier avant d'enregistrer",
    confirmTitle: "Voici ce que Mika a pris en main",
    typeLabel: "Type",
    titleLabel: "Titre",
    dateTimeLabel: "Date et heure",
    ownerLabel: "Responsable",
    saveMikaButton: "Enregistrer dans Mika",
    captureTitle: "Ajoutez quelque chose pour lequel vous voulez de l’aide",
    captureCopy: "Tapez, dites-le à voix haute ou prenez le formulaire en photo. Mika vous aide à y voir clair.",
    voiceButton: "Voix",
    photoButton: "Photo",
    parseButton: "Laisser Mika aider",
    navHome: "Accueil",
    navTasks: "Tâches",
    navEvents: "Événements",
    navMeals: "Repas",
    feedbackEyebrow: "Rejoindre la beta privée",
    feedbackTitle: "Dites-nous ce qui rendrait votre vie familiale plus simple.",
    feedbackCopy: "Nous construisons Mika avec de vraies familles d’abord. Rejoignez l’accès anticipé et aidez-nous à créer l’assistante dont les familles modernes ont vraiment besoin.",
    firstNameLabel: "Prénom",
    emailLabel: "Courriel",
    locationLabel: "Lieu",
    ratingLabel: "Comment évaluez-vous l'app?",
    usefulnessLabel: "Après avoir essayé le prototype, ça semble...",
    usefulnessPlaceholder: "Choisissez une réponse",
    usefulnessLove: "parfaitement adapté à ma famille",
    usefulnessVery: "très utile pour notre logistique quotidienne",
    usefulnessInteresting: "intéressant, mais j'ai besoin d'en voir plus",
    usefulnessUnclear: "pas encore assez clair",
    usefulnessNot: "Pas utile pour ma famille",
    keywordsLabel: "Quelles seraient vos priorités?",
    keywordForms: "École, activités sportives, fêtes d'anniversaire, etc.",
    keywordCalendar: "Gestion du calendrier",
    keywordHandoffs: "Relais entre co-parents",
    keywordTasks: "Notifications pour les tâches oubliées",
    keywordMeals: "Repas et préparation des repas",
    keywordBrief: "Briefing du matin, de la semaine ou du mois",
    familySnapshotLabel: "Parlez-nous de votre dynamique ou structure familiale.",
    familySnapshotPlaceholder:
      "Exemple: 2 parents, 2 enfants de 4 et 7 ans. Un parent voyage souvent, l'autre gère l'école.",
    commentLabel: "Que pouvons-nous améliorer? Quelles fonctionnalités voulez-vous voir dans le produit?",
    firstNamePlaceholder: "Alex",
    emailPlaceholder: "vous@famille.com",
    locationPlaceholder: "Toronto, ON",
    commentPlaceholder:
      "Qu'est-ce que votre famille oublie toujours? Qu'est-ce qui rendrait Mika assez utile pour le partager?",
    feedbackButton: "Envoyer votre feedback",
    formDefaultStatus: "Beta privée. Aucune donnée d'enfant vendue. Aucun spam.",
    formSaving: "On enregistre votre note pour Mika...",
    formLocal:
      "Prototype enregistré localement. Ajoutez l'URL Supabase et la clé anon dans app.js pour collecter les vraies soumissions.",
    formSuccess:
      "Merci beaucoup de nous aider. N'oubliez pas de rejoindre la liste d'attente pour être prévenu au lancement de Mika.",
    formError: "L'enregistrement n'a pas fonctionné. Réessayez dans un instant.",
    sending: "Envoi...",
    onboarding: [
      {
        title: "Installons Mika pour votre famille.",
        copy:
          "Dites à Mika qui fait partie de la famille, quand vous voulez recevoir des nouvelles et quel calendrier vous utilisez déjà.",
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
    skip: "Passer pour l’instant",
    continue: "Continuer",
    startMika: "Démarrer Mika",
  },
};

function showScreen(id) {
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
  if (onboardingStep < 3) {
    onboardingStep += 1;
    renderOnboardingStep();
    return;
  }

  showScreen("home");
});

backStepButton.addEventListener("click", () => {
  if (onboardingStep > 0) {
    onboardingStep -= 1;
    renderOnboardingStep();
    return;
  }

  showScreen("home");
});

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
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

footerWaitlist.addEventListener("submit", (event) => {
  event.preventDefault();

  const footerEmail = new FormData(footerWaitlist).get("footer_email").trim();
  waitlistForm.querySelector('input[name="email"]').value = footerEmail;
  document.querySelector(".feedback-card").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  waitlistForm.querySelector('input[name="first_name"]').focus({
    preventScroll: true,
  });
});

document.querySelector("#open-capture").addEventListener("click", () => {
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
  const feedbackKeywords = formData.getAll("feedback_keywords").join(", ");
  const payload = {
    first_name: formData.get("first_name").trim(),
    email: formData.get("email").trim(),
    location: formData.get("location").trim(),
    rating: Number(formData.get("rating")),
    usefulness: formData.get("usefulness"),
    feedback_keywords: feedbackKeywords,
    family_snapshot: formData.get("family_snapshot").trim(),
    comment: formData.get("comment").trim(),
    language: currentLanguage,
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
