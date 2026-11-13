(() => {
  const pages = [
    ["/", "Home"],
    ["about.html", "About"],
    ["services.html", "Services"],
    ["gallery.html", "Gallery"],
    ["appointment.html", "Appointment"],
    ["contact.html", "Contact"]
  ];
  const currentPage = decodeURIComponent(window.location.pathname).split(/[\\/]/).pop() || "/";
  const headerHost = document.querySelector("[data-site-header]");
  const footerHost = document.querySelector("[data-site-footer]");

  if (!headerHost || !footerHost) {
    throw new Error("Shared site header/footer placeholders are missing.");
  }

  const links = pages.map(([href, label]) => {
    const active = href === currentPage;
    return `<a href="${href}"${active ? ' class="active" aria-current="page"' : ""}>${label}</a>`;
  }).join("");
  const mainContent = document.querySelector("main") || document.querySelector("body > section, body > .hero");
  if (!mainContent) {
    throw new Error("Main page content could not be found.");
  }
  if (!mainContent.id) {
    mainContent.id = "main";
  }
  headerHost.insertAdjacentHTML("beforebegin", '<a class="site-skip-link" href="#main">Skip to content</a>');

  headerHost.outerHTML = `
    <header class="site-header">
      <div class="site-header-inner">
        <a class="site-brand" href="/" aria-label="Glow and Grace home">
          <span class="site-brand-mark" aria-hidden="true">G<span>✿</span></span>
          <span class="site-brand-copy"><span class="site-brand-name">Glow and Grace</span><span class="site-brand-sub">BEAUTY SALON</span></span>
        </a>
        <nav class="site-nav" aria-label="Main navigation">${links}</nav>
        <div class="site-actions">
          <button class="site-theme-toggle" id="siteThemeToggle" type="button" aria-label="Toggle dark mode">🌙 Dark Mode</button>
          <a class="site-book" href="${currentPage === "appointment.html" ? "#booking" : "appointment.html"}">♡ &nbsp;Book Now</a>
        </div>
      </div>
    </header>`;

  footerHost.outerHTML = `
    <footer class="site-footer">
      <div class="site-footer-inner">
        <a class="site-brand site-footer-brand" href="/" aria-label="Glow and Grace home">
          <span class="site-brand-mark" aria-hidden="true">G<span>✿</span></span>
          <span class="site-brand-copy"><span class="site-brand-name">Glow and Grace</span><span class="site-brand-sub">BEAUTY SALON</span></span>
        </a>
        <nav class="site-footer-nav" aria-label="Footer navigation">${links}</nav>
        <div class="site-footer-contact">
          <span>Gulgasht Colony, Multan</span>
          <a href="tel:+923001234567">+92 300 1234567</a>
          <a href="mailto:glowandgrace@gmail.com">glowandgrace@gmail.com</a>
        </div>
        <div class="site-newsletter">
          <strong>Stay Connected</strong>
          <p>Beauty notes and salon updates, sent with care.</p>
          <form id="newsletterForm">
            <label class="site-visually-hidden" for="newsletterEmail">Your email address</label>
            <input id="newsletterEmail" type="email" placeholder="Your email address" required>
            <button type="submit" aria-label="Subscribe to salon updates">Join</button>
          </form>
        </div>
        <div class="site-footer-bottom">
          <span>© 2026 Glow and Grace Beauty Salon. All rights reserved.</span>
          <span>Beauty &nbsp;•&nbsp; Confidence &nbsp;•&nbsp; You ♡</span>
        </div>
      </div>
    </footer>`;

  const themeToggle = document.getElementById("siteThemeToggle");
  function updateThemeButton() {
    const dark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    themeToggle.setAttribute("aria-pressed", String(dark));
  }

  const isDark = localStorage.getItem("theme") === "dark";
  document.body.classList.toggle("dark-mode", isDark);
  document.body.classList.toggle("dark", isDark);
  updateThemeButton();
  themeToggle.addEventListener("click", () => {
    const dark = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", dark);
    document.body.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
    updateThemeButton();
  });

  const newsletterForm = document.getElementById("newsletterForm");
  newsletterForm.addEventListener("submit", event => {
    event.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]');
    if (!email.checkValidity()) {
      email.reportValidity();
      return;
    }
    alert("Thank you for your interest!");
    newsletterForm.reset();
  });
})();
