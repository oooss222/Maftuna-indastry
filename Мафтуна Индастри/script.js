document.addEventListener("DOMContentLoaded", function() {
  // ====== Меню ======
  const toggleBtn = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".site-nav");
  const breakpoint = 768; // Ширина экрана для переключения между мобильным и десктопным режимом

  // Функция для управления состоянием меню
  function handleMenuState() {
    if (window.innerWidth > breakpoint) {
      // Для десктопного режима убираем класс .open и показываем меню
      navMenu.classList.remove("open");
      navMenu.style.display = "flex"; // Десктопное меню всегда видно
    } else {
      // Для мобильного режима скрываем меню, если оно не открыто
      if (!navMenu.classList.contains("open")) {
        navMenu.style.display = "none";
      }
    }
  }

  // Обработчик клика по кнопке переключения меню
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", function() {
      const isOpen = navMenu.classList.toggle("open");
      navMenu.style.display = isOpen ? "flex" : "none"; // Показываем/скрываем меню
      toggleBtn.setAttribute("aria-expanded", isOpen);
      navMenu.setAttribute("aria-hidden", !isOpen);
    });
    // Инициализация атрибутов доступности
    toggleBtn.setAttribute("aria-expanded", "false");
    navMenu.setAttribute("aria-hidden", "true");
  }

  // Обработчик изменения размера окна
  window.addEventListener("resize", handleMenuState);

  // Вызываем при загрузке страницы
  handleMenuState();

  // ====== Функции ======
  function getData(k, d) {
    try { const r = localStorage.getItem(k); return r ? JSON.parse(r) : d; } catch (e) { return d }
  }
  function setData(k, v) { localStorage.setItem(k, JSON.stringify(v)) }

  function renderContacts() {
    const c = getData('maftuna_contacts', {
      address: 'Душанбе, ул. Примерная, 10',
      phone: '+992900000000',
      email: 'info@maftuna.tj',
      telegram: 'https://t.me/your_tg',
      whatsapp: 'https://wa.me/992900000000',
      instagram: 'https://instagram.com/your_inst'
    });
    const a = document.getElementById('address-text'); if (a) a.textContent = c.address;
    const p = document.getElementById('phone-link'); if (p) { p.href = 'tel:' + c.phone.replace(/\s+/g, ''); p.textContent = c.phone; }
    const e = document.getElementById('email-link'); if (e) { e.href = 'mailto:' + c.email; e.textContent = c.email; }
    const tg = document.getElementById('telegram-link'); if (tg) tg.href = c.telegram;
    const wa = document.getElementById('whatsapp-link'); if (wa) wa.href = c.whatsapp;
    const ig = document.getElementById('instagram-link'); if (ig) ig.href = c.instagram;
    const ylink = document.getElementById('yandex-link');
    if (ylink) {
      const enc = encodeURIComponent(c.address);
      ylink.href = 'yandexmaps://maps.yandex.ru/?text=' + enc;
      ylink.dataset.fallback = 'https://yandex.ru/maps/?text=' + enc;
      ylink.addEventListener('click', () => setTimeout(() => window.open(ylink.dataset.fallback, '_blank'), 700));
    }
  }

  function renderNews() {
    const lang = localStorage.getItem('maftuna_lang') || 'ru';
    const all = getData('maftuna_news', [
      { id: 'n1', lang: 'ru', title: 'Проект начат', content: 'Запущены подготовительные работы на новом объекте.' },
      { id: 'n2', lang: 'en', title: 'Project started', content: 'Preparatory works started on a new site.' }
    ]);
    const list = document.getElementById('news-list');
    if (!list) return;
    list.innerHTML = '';
    const f = all.filter(n => n.lang === lang);
    if (f.length === 0) {
      list.innerHTML = '<p style="padding:12px;background:var(--card);border-radius:8px">No news</p>';
      return;
    }
    f.slice().reverse().forEach(n => {
      const el = document.createElement('div');
      el.className = 'news-item';
      el.innerHTML = `<h3>${escape(n.title)}</h3><p>${escape(n.content)}</p>`;
      list.appendChild(el)
    });
  }

  function renderProjects() {
    const lang = localStorage.getItem('maftuna_lang') || 'ru';
    const all = getData('maftuna_projects', [
      { id: 'p1', lang: 'ru', img: 'img/project1.jpg', desc: 'Реконструкция участка дороги.' },
      { id: 'p2', lang: 'en', img: 'img/project2.jpg', desc: 'Bridge support installation.' }
    ]);
    const grid = document.getElementById('projects-list');
    if (!grid) return;
    grid.innerHTML = '';
    const f = all.filter(p => p.lang === lang);
    if (f.length === 0) {
      grid.innerHTML = '<p style="padding:12px;background:var(--card);border-radius:8px">No projects</p>';
      return;
    }
    f.slice().reverse().forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-item';
      card.innerHTML = `<img src="${escape(p.img)}" alt=""><div class="descr"><p>${escape(p.desc)}</p></div>`;
      grid.appendChild(card)
    });
  }

  function escape(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // ====== Модалка (старый блок) ======
  var modal = document.getElementById("adminModal");
  var btn = document.getElementById("adminBtn");
  var span = document.getElementsByClassName("close")[0];

  if (btn) {
    btn.onclick = function () {
      modal.style.display = "block";
    }
  }
  if (span) {
    span.onclick = function () {
      modal.style.display = "none";
    }
  }
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // ====== Админ кнопка ======
  (function () {
    var btn = document.getElementById('adminFloatBtn');
    var modal = document.getElementById('adminModal');
    var closeBtn = document.getElementById('modalClose');
    var cancelBtn = document.getElementById('modalCancel');
    var loginError = document.getElementById('loginError');

    if (!btn || !modal) return;

    function openModal() {
      modal.setAttribute('aria-hidden', 'false');
      var pw = document.getElementById('adminPassword');
      if (pw) pw.focus();
    }
    function closeModal() {
      modal.setAttribute('aria-hidden', 'true');
      loginError.textContent = '';
    }

    btn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });

    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('login_error')) {
        openModal();
        if (loginError) loginError.textContent = 'Неверный пароль. Попробуйте снова.';
      }
    } catch (e) { }
  })();

  // Вызываем функции рендеринга
  renderContacts();
  renderNews();
  renderProjects();
});