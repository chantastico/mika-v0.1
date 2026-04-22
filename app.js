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

let onboardingStep = 0;
let activeAppScreen = "home";

const onboardingCopy = [
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
];

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

function renderOnboardingStep() {
  const content = onboardingCopy[onboardingStep];
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

  backStepButton.textContent = onboardingStep === 0 ? "Skip" : "Back";
  nextStepButton.textContent = onboardingStep === 3 ? "Start Mika" : "Continue";
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

renderOnboardingStep();
