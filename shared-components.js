/**
 * shared-components.js
 * ─────────────────────────────────────────────────────────────────────────
 * Web Components for Alice Cheng's portfolio site.
 * Defines <site-nav> and <site-footer> as custom elements.
 *
 * Usage in every HTML page:
 *   1. In <head>: <script src="shared-components.js"></script>
 *   2. In <body>: replace <nav> with <site-nav></site-nav>
 *                 replace <section class="contact"> + <footer> with <site-footer></site-footer>
 *
 * To update nav or footer for ALL pages: edit only this file.
 * ─────────────────────────────────────────────────────────────────────────
 */

/* ── SITE NAV ───────────────────────────────────────────────────────────── */

class SiteNav extends HTMLElement {
  connectedCallback() {
    // Detect if we're on the landing page (index.html or root "/")
    const isIndex = location.pathname === '/' ||
                    location.pathname.endsWith('index.html') ||
                    location.pathname.endsWith('/');

    this.innerHTML = `
      <nav class="nav" id="top">
        <div class="nav-inner">
          <a href="${isIndex ? '#top' : 'index.html'}" class="nav-logo">Alice <em>Cheng</em></a>
          <div class="nav-links">
            <a href="${isIndex ? '#works' : 'index.html#works'}">WORKS</a>
            <a href="${isIndex ? '#about' : 'index.html#about'}">ABOUT</a>
            <a href="${isIndex ? '#contact' : 'index.html#contact'}">CONTACT ↗</a>
          </div>
          ${!isIndex ? '<a href="index.html#works" class="nav-back">← ALL WORKS</a>' : ''}
        </div>
      </nav>
    `;
  }
}

customElements.define('site-nav', SiteNav);


/* ── SITE FOOTER ────────────────────────────────────────────────────────── */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class="contact" id="contact">  <!-- id 保留，供 #contact 錨點連結使用 -->
        <div class="contact-inner">
          <div class="contact-quote">
            <p>"Let's make something worth remembering."</p>
          </div>
          <div class="contact-email">
            <p class="contact-email-label">GET IN TOUCH</p>
            <a href="mailto:tofu@yahooinc.com">tofu@yahooinc.com</a>
          </div>
          <div class="contact-social">
            <a href="#">LinkedIn ↗</a>
            <a href="#">Behance ↗</a>
            <a href="#">Dribbble ↗</a>
          </div>
        </div>
      </section>
      <footer>
        <div class="footer-inner">
          <span>© 2026 Alice Cheng · AI Workflow Design Lab</span>
          <span>TAIPEI, TAIWAN</span>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
