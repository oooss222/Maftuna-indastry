// Функция для добавления новости в админ-панели
function addNews() {
  // Получаем значения из полей ввода
  const lang = document.getElementById('admin-news-lang').value; // Язык новости
  const title = document.getElementById('admin-news-title').value; // Заголовок новости
  const content = document.getElementById('admin-news-content').value; // Содержимое новости
  const imageInput = document.getElementById('admin-news-image'); // Поле для загрузки изображения
  let imageUrl = ''; // URL изображения (будет заполнен, если файл выбран)

  // Проверяем, заполнены ли обязательные поля
  if (!title || !content) {
    alert('Заполните заголовок и текст новости!'); // Выводим предупреждение, если поля пустые
    return; // Прерываем выполнение функции
  }

  // Если выбрано изображение, обрабатываем его (здесь заглушка, так как реальная загрузка требует сервера)
  if (imageInput.files && imageInput.files[0]) {
    // В реальности здесь нужно загрузить файл на сервер и получить URL
    // Для демонстрации просто используем имя файла как URL (заглушка)
    imageUrl = 'img/' + imageInput.files[0].name;
  }

  // Получаем текущий список новостей из localStorage или инициализируем пустым массивом
  let newsList = getData('maftuna_news', []);

  // Генерируем уникальный ID для новости (на основе времени)
  const newId = 'n' + Date.now();

  // Добавляем новую новость в массив
  newsList.push({
    id: newId,
    lang: lang,
    title: title,
    content: content,
    image: imageUrl // Добавляем URL изображения, если есть
  });

  // Сохраняем обновленный список в localStorage
  setData('maftuna_news', newsList);

  // Обновляем отображение списка новостей в админ-панели
  renderAdminNewsList();

  // Очищаем поля ввода после добавления
  document.getElementById('admin-news-title').value = '';
  document.getElementById('admin-news-content').value = '';
  imageInput.value = ''; // Очищаем поле файла
  alert('Новость добавлена и сохранена!'); // Уведомляем об успехе
}

// Функция для рендеринга списка новостей в админ-панели
function renderAdminNewsList() {
  const list = document.getElementById('admin-news-list'); // Контейнер для списка
  list.innerHTML = ''; // Очищаем текущий список

  // Получаем все новости из localStorage
  const allNews = getData('maftuna_news', []);

  // Для каждой новости создаем элемент в списке
  allNews.forEach((news, index) => {
    const div = document.createElement('div');
    div.className = 'news-item'; // Класс для стилизации
    div.innerHTML = `
      <strong>${news.lang.toUpperCase()}: ${news.title}</strong><br>
      <span>${news.content}</span>
      ${news.image ? `<br><img src="${news.image}" alt="Изображение новости" style="max-width:100px;">` : ''}
      <button class="delete-btn" onclick="deleteNews(${index})">Удалить</button>
    `;
    list.appendChild(div); // Добавляем элемент в контейнер
  });
}

// Функция для удаления новости по индексу
function deleteNews(index) {
  let newsList = getData('maftuna_news', []); // Получаем список новостей
  newsList.splice(index, 1); // Удаляем элемент по индексу
  setData('maftuna_news', newsList); // Сохраняем обновленный список
  renderAdminNewsList(); // Обновляем отображение списка
}

// Функция для сохранения контактов
function saveContacts() {
  // Получаем значения из полей ввода
  const address = document.getElementById('admin-address').value;
  const phone = document.getElementById('admin-phone').value;
  const email = document.getElementById('admin-email').value;
  const tg = document.getElementById('admin-tg').value;
  const wa = document.getElementById('admin-wa').value;
  const ig = document.getElementById('admin-ig').value;

  // Проверяем, заполнены ли обязательные поля (минимум адрес и телефон)
  if (!address || !phone) {
    alert('Заполните как минимум адрес и телефон!');
    return;
  }

  // Создаем объект с контактами
  const contacts = {
    address: address,
    phone: phone,
    email: email,
    telegram: tg,
    whatsapp: wa,
    instagram: ig
  };

  // Сохраняем в localStorage
  setData('maftuna_contacts', contacts);

  alert('Контакты сохранены!'); // Уведомляем об успехе
}

// Функция для добавления проекта
function addProject() {
  // Получаем значения из полей ввода
  const lang = document.getElementById('admin-project-lang').value; // Язык проекта
  const desc = document.getElementById('admin-project-desc').value; // Описание проекта
  const img = document.getElementById('admin-project-img').value; // Ссылка на изображение

  // Проверяем, заполнены ли обязательные поля
  if (!desc || !img) {
    alert('Заполните описание и ссылку на изображение!');
    return;
  }

  // Получаем текущий список проектов из localStorage
  let projects = getData('maftuna_projects', []);

  // Генерируем уникальный ID
  const newId = 'p' + Date.now();

  // Добавляем новый проект
  projects.push({
    id: newId,
    lang: lang,
    img: img,
    desc: desc
  });

  // Сохраняем обновленный список
  setData('maftuna_projects', projects);

  // Обновляем отображение списка проектов в админ-панели
  renderAdminProjectsList();

  // Очищаем поля
  document.getElementById('admin-project-desc').value = '';
  document.getElementById('admin-project-img').value = '';
  alert('Проект добавлен и сохранен!');
}

// Функция для рендеринга списка проектов в админ-панели
function renderAdminProjectsList() {
  const list = document.getElementById('admin-projects-list');
  list.innerHTML = '';

  const allProjects = getData('maftuna_projects', []);

  allProjects.forEach((project, index) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.innerHTML = `
      <strong>${project.lang.toUpperCase()}: ${project.desc}</strong><br>
      <img src="${project.img}" alt="Изображение проекта" style="max-width:100px;"><br>
      <button class="delete-btn" onclick="deleteProject(${index})">Удалить</button>
    `;
    list.appendChild(div);
  });
}

// Функция для удаления проекта по индексу
function deleteProject(index) {
  let projects = getData('maftuna_projects', []);
  projects.splice(index, 1);
  setData('maftuna_projects', projects);
  renderAdminProjectsList();
}

// Функция для сброса всех данных
function resetAll() {
  if (confirm('Вы уверены? Это удалит все данные!')) { // Подтверждение действия
    localStorage.clear(); // Очищаем весь localStorage
    alert('Все данные сброшены!');
    // Обновляем списки в админ-панели
    renderAdminNewsList();
    renderAdminProjectsList();
  }
}

// Инициализация при загрузке страницы админ-панели
document.addEventListener('DOMContentLoaded', () => {
  // Рендерим текущие списки новостей и проектов
  renderAdminNewsList();
  renderAdminProjectsList();

  // Загружаем текущие контакты в поля ввода
  const contacts = getData('maftuna_contacts', {});
  document.getElementById('admin-address').value = contacts.address || '';
  document.getElementById('admin-phone').value = contacts.phone || '';
  document.getElementById('admin-email').value = contacts.email || '';
  document.getElementById('admin-tg').value = contacts.telegram || '';
  document.getElementById('admin-wa').value = contacts.whatsapp || '';
  document.getElementById('admin-ig').value = contacts.instagram || '';
});