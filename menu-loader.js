// ==============================
// MENU LOADER + CONTROLES
// ==============================

(function () {

  const MENU_PATH = "/delta-prompts/menu.html";

  document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
  });

  function loadMenu() {
    fetch(MENU_PATH)
      .then(res => {
        if (!res.ok) throw new Error("Falha ao carregar menu: " + res.status);
        return res.text();
      })
      .then(html => {
        const container = document.getElementById("menu");
        if (!container) {
          console.warn("menu-loader: #menu não encontrado.");
          return;
        }

        container.innerHTML = html;
        attachMenuControls();
      })
      .catch(err => {
        console.error(err);
        const c = document.getElementById("menu");
        if (c) {
          c.innerHTML = '<div style="padding:16px;color:#c00;">Erro ao carregar menu</div>';
        }
      });
  }

  // ==========================================
  // CONTROLES DO MENU
  // ==========================================

  function attachMenuControls() {

    const menuEl = document.getElementById("menu");
    if (!menuEl) return;

    const sidebar = menuEl.querySelector(".sidebar");
    const toggle = menuEl.querySelector(".menu-toggle");

    if (!sidebar || !toggle) return;

    function setOpen(open) {
      if (open) {
        sidebar.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
        document.documentElement.classList.add("menu-open");
      } else {
        sidebar.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        document.documentElement.classList.remove("menu-open");
      }
    }

    // Toggle botão hamburguer
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      setOpen(!sidebar.classList.contains("active"));
    });

    // Fecha ao clicar em link
    menuEl.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => setOpen(false));
    });

    // Fecha ao clicar fora
    document.addEventListener("click", (ev) => {
      if (!sidebar.classList.contains("active")) return;
      if (!sidebar.contains(ev.target) && !toggle.contains(ev.target)) {
        setOpen(false);
      }
    });

    // Fecha com ESC
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") setOpen(false);
    });

    // ==============================
    // ACORDEÃO DESKTOP
    // ==============================

    const sections = menuEl.querySelectorAll(".menu-section");

    sections.forEach(section => {

      const title = section.querySelector(".menu-title");
      const links = section.querySelector(".menu-links");

      if (!title || !links) return;

      // Abre Pessoal e Trabalho por padrão
      const text = title.innerText.toLowerCase();
      if (text.includes("pessoal") || text.includes("trabalho")) {
        links.classList.add("active");
      }

      title.addEventListener("click", () => {

        // Fecha todos
        menuEl.querySelectorAll(".menu-links").forEach(menu => {
          if (menu !== links) {
            menu.classList.remove("active");
          }
        });

        // Alterna atual
        links.classList.toggle("active");
      });

    });

  }

})();
