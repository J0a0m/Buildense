// ===============================
// BUILDENSE - SCRIPT.JS
// ===============================

// Seletores
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];


// ===============================
// LUCIDE ICONS
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }
});


// ===============================
// NAVBAR AO ROLAR A PÁGINA
// ===============================

const navbar = document.querySelector("#navbar");

function atualizarNavbar() {
  if (!navbar) return;

  if (window.scrollY > 12) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", atualizarNavbar);

atualizarNavbar();


// ===============================
// MENU MOBILE
// ===============================

const menuToggle = document.querySelector("#menuToggle");
const mobileMenu = document.querySelector("#mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const aberto = mobileMenu.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      aberto ? "true" : "false"
    );

    document.body.classList.toggle("menu-open", aberto);
  });
}


// Fecha menu quando clicar em link
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  });
});


// Fecha menu ao aumentar a tela
window.addEventListener("resize", () => {
  if (window.innerWidth > 820) {
    if (!mobileMenu || !menuToggle) return;

    mobileMenu.classList.remove("open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    document.body.classList.remove("menu-open");
  }
});


// ===============================
// ANIMAÇÕES AO ROLAR
// ===============================

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("is-visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );


  revealItems.forEach(item => {
    observer.observe(item);
  });

} else {

  revealItems.forEach(item => {
    item.classList.add("is-visible");
  });

}


// ===============================
// FAQ
// ===============================

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  const button = item.querySelector("button");

  if (!button) return;

  button.addEventListener("click", () => {

    const estavaAberto =
      item.classList.contains("open");


    // Fecha todos
    faqItems.forEach(faq => {
      faq.classList.remove("open");
    });


    // Abre o selecionado
    if (!estavaAberto) {
      item.classList.add("open");
    }

  });

});


// ===============================
// FORMULÁRIO
// ===============================

const form = document.querySelector("#contactForm");

const successState =
  document.querySelector("#successState");

const resetButton =
  document.querySelector("#resetForm");


// Mostrar erro
function mostrarErro(campo, mensagem) {

  const elemento =
    document.querySelector(
      `[data-error="${campo}"]`
    );

  if (elemento) {
    elemento.textContent = mensagem;
  }

}


// Limpar erros
function limparErros() {

  const campos = [
    "nome",
    "contato",
    "servico",
    "mensagem"
  ];

  campos.forEach(campo => {
    mostrarErro(campo, "");
  });

}


// Validação formulário
if (form) {

  form.addEventListener("submit", event => {

    event.preventDefault();

    limparErros();


    const dados = new FormData(form);


    const nome =
      String(
        dados.get("nome") || ""
      ).trim();


    const contato =
      String(
        dados.get("contato") || ""
      ).trim();


    const servico =
      String(
        dados.get("servico") || ""
      ).trim();


    const mensagem =
      String(
        dados.get("mensagem") || ""
      ).trim();


    let possuiErro = false;


    // Nome
    if (nome.length < 2) {

      mostrarErro(
        "nome",
        "Informe seu nome."
      );

      possuiErro = true;
    }


    // Contato
    if (contato.length < 8) {

      mostrarErro(
        "contato",
        "Informe um WhatsApp ou e-mail válido."
      );

      possuiErro = true;
    }


    // Serviço
    if (!servico) {

      mostrarErro(
        "servico",
        "Selecione um serviço."
      );

      possuiErro = true;
    }


    // Mensagem
    if (mensagem.length < 10) {

      mostrarErro(
        "mensagem",
        "Conte um pouco mais sobre sua empresa."
      );

      possuiErro = true;
    }


    if (possuiErro) {
      return;
    }


    // Esconde formulário
    form.hidden = true;


    // Mostra mensagem de sucesso
    if (successState) {
      successState.hidden = false;
    }

  });

}


// ===============================
// RESET DO FORMULÁRIO
// ===============================

if (resetButton) {

  resetButton.addEventListener("click", () => {

    if (!form) return;


    form.reset();

    limparErros();


    if (successState) {
      successState.hidden = true;
    }


    form.hidden = false;

  });

}


// ===============================
// ANO AUTOMÁTICO NO FOOTER
// ===============================

const currentYear =
  document.querySelector("#currentYear");

if (currentYear) {

  currentYear.textContent =
    new Date().getFullYear();

}