const basePath = location.hostname.includes("github.io")
  ? "/delta-prompts/"
  : "/";

fetch(basePath + "menu.html")
  .then(response => {
    if (!response.ok) {
      throw new Error("Erro ao carregar menu.");
    }
    return response.text();
  })
  .then(html => {
    const menuContainer = document.getElementById("menu");

    if (!menuContainer) {
      console.warn("Elemento #menu não encontrado.");
      return;
    }

    menuContainer.innerHTML = html;

    // Ajusta links automaticamente
    document.querySelectorAll("#menu a").forEach(link => {
      const href = link.getAttribute("href");

      if (!href.startsWith("http") && !href.startsWith("#")) {
        link.setAttribute("href", basePath + href);
      }
    });
  })
  .catch(error => {
    console.error("Falha ao carregar o menu:", error);
  });
