const posts = [
  {
    id: 1,
    title: 'Основы JavaScript',
    description:
      'Изучение базовых концепций языка программирования JavaScript для начинающих разработчиков.',
  },
  {
    id: 2,
    title: 'Введение в React',
    description:
      'Первый шаг в освоении популярного фреймворка для создания пользовательских интерфейсов.',
  },
  {
    id: 3,
    title: 'Советы по CSS',
    description:
      'Полезные приемы и лучшие практики для эффективной работы с каскадными таблицами стилей.',
  },
  {
    id: 4,
    title: 'Базы данных для веб-разработки',
    description:
      'Обзор различных систем управления базами данных и их применение в веб-проектах.',
  },
  {
    id: 5,
    title: 'Алгоритмы и структуры данных',
    description:
      'Важные алгоритмы и структуры данных, которые должен знать каждый программист.',
  },
  {
    id: 6,
    title: 'Версионный контроль с Git',
    description:
      'Основы работы с системой контроля версий Git и популярные команды для ежедневного использования.',
  },
  {
    id: 7,
    title: 'Оптимизация производительности веб-сайтов',
    description:
      'Техники и инструменты для ускорения загрузки и улучшения производительности веб-приложений.',
  },
  {
    id: 8,
    title: 'Основы безопасности веб-приложений',
    description:
      'Ключевые принципы безопасности и распространенные уязвимости, которые следует избегать.',
  },
  {
    id: 9,
    title: 'Работа с API',
    description:
      'Как создавать и использовать RESTful API для взаимодействия между различными системами.',
  },
  {
    id: 10,
    title: 'Деплой приложений',
    description:
      'Процесс развертывания веб-приложений на различных хостинг-платформах и серверах.',
  },
];

const postWrapper = document.querySelector('#posts-wrapper');
const favoriteList = document.querySelector('#favorite-list');

const post = [];

const renderPosts = () => {
  let markup = '';

  posts.forEach((post) => {
    markup += `<div data-id="${post.id}"  class="post border rounded-3xl p-3 border-white w-100 h-50 flex gap-4 flex-col">
              <h3 class="text-white text-xl font-bold"> ${post.title}<span class="text-white cursor-pointer text-5xl">*</span></h3>
              <p class="text-white">${post.description}
              </p>
              <button
              class = "rounded-md bg-blue-700 hover:bg-blue-800 text-white px-3 py-3 cursor-pointer disabled:opacity-45 disabled:bg-blue-700 disabled:cursor-auto" value="asdas">
              Добавить в избранное
              </button>
          </div>`;
  });

  postWrapper.insertAdjacentHTML('afterbegin', markup);
};

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();

  postWrapper.addEventListener('click', (e) => {
    if (e.target.matches('.post button')) {
      const title = e.target.parentElement.querySelector('h3').textContent;
      const favoritePostMarkup = `<li class="bg-gray-950 rounded-xl p-3 flex justify-between">
                <span>${title}</span>
                <button class="cursor-pointer">✕</button>
            </li>`;
      favoriteList.insertAdjacentHTML('beforeend', favoritePostMarkup);
    }
    if(e.target.matches(".post span")){
      const oldtTitle=e.target.parentElement.textContent;
      const newTitle="random"
      e.target.parentElement.textContent=newTitle
       for(const element of favoriteList.children){
        if(element.querySelector('span').textContent===oldtTitle){
          element.textContent=newTitle
        }
        
       }
    }
  });
});
