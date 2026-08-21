// ======================================================
// BUILDENSE
// script.js
// ======================================================

document.addEventListener("DOMContentLoaded", function () {

    // ====================================================
    // LUCIDE ICONS
    // ====================================================
  
    if (typeof lucide !== "undefined") {
      lucide.createIcons();
    }
  
  
    // ====================================================
    // NAVBAR
    // ====================================================
  
    const navbar =
      document.getElementById("navbar");
  
    function updateNavbar() {
  
      if (!navbar) {
        return;
      }
  
      if (window.scrollY > 12) {
  
        navbar.classList.add(
          "scrolled"
        );
  
      } else {
  
        navbar.classList.remove(
          "scrolled"
        );
  
      }
  
    }
  
    window.addEventListener(
      "scroll",
      updateNavbar
    );
  
    updateNavbar();
  
  
    // ====================================================
    // MENU MOBILE
    // ====================================================
  
    const menuToggle =
      document.getElementById(
        "menuToggle"
      );
  
    const mobileMenu =
      document.getElementById(
        "mobileMenu"
      );
  
  
    if (
      menuToggle &&
      mobileMenu
    ) {
  
      menuToggle.addEventListener(
        "click",
        function () {
  
          const open =
            mobileMenu.classList.toggle(
              "open"
            );
  
          menuToggle.setAttribute(
            "aria-expanded",
            String(open)
          );
  
          document.body.classList.toggle(
            "menu-open",
            open
          );
  
        }
      );
  
  
      const mobileLinks =
        mobileMenu.querySelectorAll(
          "a"
        );
  
      mobileLinks.forEach(
        function (link) {
  
          link.addEventListener(
            "click",
            function () {
  
              mobileMenu.classList.remove(
                "open"
              );
  
              document.body.classList.remove(
                "menu-open"
              );
  
              menuToggle.setAttribute(
                "aria-expanded",
                "false"
              );
  
            }
          );
  
        }
      );
  
    }
  
  
    // ====================================================
    // REVEAL AO SCROLL
    // ====================================================
  
    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );
  
  
    if (
      "IntersectionObserver"
      in window
    ) {
  
      const observer =
        new IntersectionObserver(
          function (entries) {
  
            entries.forEach(
              function (entry) {
  
                if (
                  entry.isIntersecting
                ) {
  
                  entry.target.classList.add(
                    "is-visible"
                  );
  
                  observer.unobserve(
                    entry.target
                  );
  
                }
  
              }
            );
  
          },
          {
            threshold: 0.1,
            rootMargin:
              "0px 0px -40px 0px"
          }
        );
  
  
      revealElements.forEach(
        function (element) {
  
          observer.observe(
            element
          );
  
        }
      );
  
    } else {
  
      revealElements.forEach(
        function (element) {
  
          element.classList.add(
            "is-visible"
          );
  
        }
      );
  
    }
  
  
    // ====================================================
    // FAQ
    // ====================================================
  
    const faqItems =
      document.querySelectorAll(
        ".faq-item"
      );
  
  
    faqItems.forEach(
      function (item) {
  
        const button =
          item.querySelector(
            "button"
          );
  
        if (!button) {
          return;
        }
  
  
        button.addEventListener(
          "click",
          function () {
  
            const alreadyOpen =
              item.classList.contains(
                "open"
              );
  
  
            faqItems.forEach(
              function (faq) {
  
                faq.classList.remove(
                  "open"
                );
  
              }
            );
  
  
            if (!alreadyOpen) {
  
              item.classList.add(
                "open"
              );
  
            }
  
          }
        );
  
      }
    );
  
  
    // ====================================================
    // BOTÕES DOS PLANOS
    // ====================================================
  
    const planButtons =
      document.querySelectorAll(
        ".select-plan"
      );
  
    const serviceSelect =
      document.getElementById(
        "serviceSelect"
      );
  
  
    planButtons.forEach(
      function (button) {
  
        button.addEventListener(
          "click",
          function () {
  
            const service =
              button.getAttribute(
                "data-service"
              );
  
  
            if (
              serviceSelect &&
              service
            ) {
  
              const options =
                serviceSelect.options;
  
  
              for (
                let i = 0;
                i < options.length;
                i++
              ) {
  
                if (
                  options[i].value ===
                  service
                ) {
  
                  serviceSelect.selectedIndex =
                    i;
  
                  break;
  
                }
  
              }
  
            }
  
  
            const formSection =
              document.getElementById(
                "orcamento"
              );
  
  
            if (formSection) {
  
              formSection.scrollIntoView({
                behavior: "smooth"
              });
  
            }
  
          }
        );
  
      }
    );
  
  
    // ====================================================
    // FORMULÁRIO
    // ====================================================
  
    const form =
      document.getElementById(
        "contactForm"
      );
  
    const successState =
      document.getElementById(
        "successState"
      );
  
    const resetButton =
      document.getElementById(
        "resetForm"
      );
  
  
    function showError(
      field,
      message
    ) {
  
      const error =
        document.querySelector(
          '[data-error="' +
          field +
          '"]'
        );
  
  
      if (error) {
  
        error.textContent =
          message;
  
      }
  
    }
  
  
    function clearErrors() {
  
      showError(
        "nome",
        ""
      );
  
      showError(
        "contato",
        ""
      );
  
      showError(
        "servico",
        ""
      );
  
      showError(
        "mensagem",
        ""
      );
  
    }
  
  
    if (form) {
  
      form.addEventListener(
        "submit",
        function (event) {
  
          event.preventDefault();
  
          clearErrors();
  
  
          const data =
            new FormData(form);
  
  
          const nome =
            String(
              data.get("nome") ||
              ""
            ).trim();
  
  
          const contato =
            String(
              data.get("contato") ||
              ""
            ).trim();
  
  
          const servico =
            String(
              data.get("servico") ||
              ""
            ).trim();
  
  
          const mensagem =
            String(
              data.get("mensagem") ||
              ""
            ).trim();
  
  
          let errorFound =
            false;
  
  
          // NOME
  
          if (
            nome.length < 2
          ) {
  
            showError(
              "nome",
              "Informe seu nome."
            );
  
            errorFound =
              true;
  
          }
  
  
          // CONTATO
  
          if (
            contato.length < 8
          ) {
  
            showError(
              "contato",
              "Informe um WhatsApp ou e-mail válido."
            );
  
            errorFound =
              true;
  
          }
  
  
          // SERVIÇO
  
          if (
            servico === ""
          ) {
  
            showError(
              "servico",
              "Selecione uma opção."
            );
  
            errorFound =
              true;
  
          }
  
  
          // MENSAGEM
  
          if (
            mensagem.length < 10
          ) {
  
            showError(
              "mensagem",
              "Conte um pouco mais sobre sua empresa."
            );
  
            errorFound =
              true;
  
          }
  
  
          if (
            errorFound
          ) {
  
            return;
  
          }
  
  
          form.style.display =
            "none";
  
  
          if (
            successState
          ) {
  
            successState.hidden =
              false;
  
          }
  
        }
      );
  
    }
  
  
    // ====================================================
    // RESET FORM
    // ====================================================
  
    if (
      resetButton &&
      form
    ) {
  
      resetButton.addEventListener(
        "click",
        function () {
  
          form.reset();
  
          clearErrors();
  
  
          form.style.display =
            "flex";
  
  
          if (
            successState
          ) {
  
            successState.hidden =
              true;
  
          }
  
        }
      );
  
    }
  
  
    // ====================================================
    // ANO DO FOOTER
    // ====================================================
  
    const year =
      document.getElementById(
        "currentYear"
      );
  
  
    if (year) {
  
      year.textContent =
        new Date().getFullYear();
  
    }
  
  });
