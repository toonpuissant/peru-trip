/**
 * PUISSANT PERU 2026 — Gedeelde JavaScript
 * 
 * Dit bestand bevat drie functionaliteiten:
 *   1. Navigatiebalk: hamburger-menu voor mobiel
 *   2. Accordion: dag-kaarten openklapbaar maken
 *   3. Scroll-animaties: elementen fade-in bij scrollen
 */

// -------------------------------------------------------
// 1. NAVIGATIE — Hamburger menu voor mobiel
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {

  // Zoek het hamburger-knopje en het mobiele menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobielmenu = document.querySelector('.nav-mobiel');

  if (hamburger && mobielmenu) {
    hamburger.addEventListener('click', () => {
      // Toggle de 'open' klasse om het menu te tonen/verbergen
      mobielmenu.classList.toggle('open');
    });
  }

  // Markeer de actieve navigatielink op basis van de huidige URL
  const huidigePagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobiel a').forEach(link => {
    if (link.getAttribute('href') === huidigePagina) {
      link.classList.add('actief');
    }
  });

  // -------------------------------------------------------
  // 2. ACCORDION — Dag-kaarten openklapbaar
  // -------------------------------------------------------
  // Selecteer alle accordion-knoppen
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      // Het parent-element is het volledige accordion-item
      const item = header.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');

      // Optioneel: alle andere accordions sluiten bij openen van een nieuwe
      // (verwijder de volgende 3 regels als je meerdere tegelijk open wil laten)
      document.querySelectorAll('.accordion-item.open').forEach(anderItem => {
        anderItem.classList.remove('open');
      });

      // Als dit item gesloten was, open het nu; anders laat het gesloten
      if (!wasOpen) {
        item.classList.add('open');
        // Zacht scrollen naar het item zodat het goed zichtbaar is
        setTimeout(() => {
          item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // -------------------------------------------------------
  // 3. SCROLL-ANIMATIES — Fade-in bij in beeld scrollen
  // -------------------------------------------------------
  // IntersectionObserver "kijkt" of een element zichtbaar is in het scherm.
  // Als het element voor 15% zichtbaar is, voegen we de klasse 'zichtbaar' toe.
  const observeer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('zichtbaar');
        // Eenmaal zichtbaar, stoppen met observeren (animatie hoeft maar 1x)
        observeer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // 15% van het element moet zichtbaar zijn
    rootMargin: '0px 0px -40px 0px' // kleine offset zodat het iets later triggert
  });

  // Observeer alle elementen met de klasse 'fade-in'
  document.querySelectorAll('.fade-in').forEach(el => observeer.observe(el));

  // -------------------------------------------------------
  // 4. HERO FOTO — Laat de foto langzaam "inzoomen" bij laden
  // -------------------------------------------------------
  const heroFoto = document.querySelector('.hero-foto');
  if (heroFoto) {
    // Kleine vertraging voor een vloeiend effect
    setTimeout(() => {
      heroFoto.style.transform = 'scale(1)';
    }, 100);
  }

});
