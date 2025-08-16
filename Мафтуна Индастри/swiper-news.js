const newsData = [
  {
    titleKey: 'news.item1.title',
    descKey: 'news.item1.desc',
    images: ['img/picture1.jpg', 'img/picture2.jpg', 'img/picture3.jpg'],
    readMoreKey: 'news.read_more'
  },
  {
    titleKey: 'news.item2.title',
    descKey: 'news.item2.desc',
    images: ['img/picture2.jpg', 'img/picture1.jpg'],
    readMoreKey: 'news.read_more'
  },
  {
    titleKey: 'news.item3.title',
    descKey: 'news.item3.desc',
    images: ['img/picture3.jpg', 'img/picture1.jpg'],
    readMoreKey: 'news.read_more'
  }
];

function renderNews(lang) {
  const newsList = document.getElementById('news-list');
  if (!newsList) return;

  newsList.innerHTML = newsData.length ? '' : `<p data-i18n="news.no_news">${I18N[lang]['news.no_news']}</p>`;

  newsData.forEach((news, index) => {
    const swiperId = `news-swiper-${index}`;
    const newsItem = document.createElement('article');
    newsItem.className = 'news-item';
    newsItem.innerHTML = `
      <div class="news-swiper swiper" id="${swiperId}">
        <div class="swiper-wrapper">
          ${news.images.map(img => `<div class="swiper-slide"><img src="${img}" alt="News image" loading="lazy"></div>`).join('')}
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="news-content">
        <h3 data-i18n="${news.titleKey}">${I18N[lang][news.titleKey]}</h3>
        <p data-i18n="${news.descKey}">${I18N[lang][news.descKey]}</p>
        <a href="#" class="read-more" data-i18n="${news.readMoreKey}">${I18N[lang][news.readMoreKey]}</a>
      </div>
    `;
    newsList.appendChild(newsItem);

    new Swiper(`#${swiperId}`, {
      loop: true,
      pagination: {
        el: `.swiper-pagination`,
        clickable: true
      },
      navigation: {
        nextEl: `.swiper-button-next`,
        prevEl: `.swiper-button-prev`
      },
      spaceBetween: 10,
      breakpoints: {
        320: { slidesPerView: 1 },
        600: { slidesPerView: 1 },
        768: { slidesPerView: 1 }
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = localStorage.getItem('maftuna_lang') || 'ru';
  renderNews(lang);

  document.getElementById('lang-ru')?.addEventListener('click', () => {
    applyI18n('ru');
    renderNews('ru');
  });
  document.getElementById('lang-en')?.addEventListener('click', () => {
    applyI18n('en');
    renderNews('en');
  });
});