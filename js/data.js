// const DATES = [
//   createDate('26', '30', 'Июня'),
//   createDate('12', '15', 'Июля'),
//   createDate('27', '29', 'Июля'),
//   createDate('11', '16', 'Августа'),
//   createDate('26', '22', 'Июля'),
// ];

// const DESCRIPTIONS = [
//   'Дополнительно предоставляются полезные экскурсии на предприятия, общение с экспертами ведущих компаний отрасли.',
//   'Мы ожидаем авторов текущих проектов в различных технологических областях и не ограничиваем вас в выборе темы. Проекты могут быть исследовательскими, инженерными или цифровыми.',
//   'Мы ожидаем полезные экскурсии на предприятия и общение с экспертами ведущих компаний в отрасли.',
//   'Мы не ограничиваем ваше воображение, но важно, чтобы ваша идея решала реальную проблему. Ваши работы будут оцениваться настоящими экспертами в своей области - специалистами от компании "Российские Желез...',
//   'Команды, показавшие лучшие результаты, будут приглашены на яркое заключительное событие, где у них будет возможность представить свое решение руководству компании, и, возможно, ваш проект будет реализован.'
// ];

// const TITLES = [
//   'Беспокойный поток',
//   'Форум кванториан',
//   'Кодерский симпозиум',
//   'Цифровая коллекция',
//   'Конгресс инноваций',
// ];

// const TYPES = [
//   'Чемпионат',
//   'Конкурс',
//   'Соревнование',
//   'Акселератор',
//   'Фестиваль',
// ];
// const ADRESES = [
//   'Екатеринбург',
//   'Томск',
//   'Тюмень',
//   'Москва',
//   'Улан-Удэ',
// ];

// const FORMATS = [
//   'Очная форма проведения',
//   'Заочная форма проведения',
// ];

// const ORGS = [
//   'Трактор', 
//   'Мангал клаб',
//   'Бебра',
//   'Поезда',
//   'Лол'
// ]

// const tags = [
//   'Робототехника',
//   '3D моделирование',
//   'VR/AR технологии',
//   'Soft skills',
//   'Хайтек',
//   'Искусственный интеллект',
// ];

const months = [
  'Января', 
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];


function castEventDate(date) {
  const dayDate = date.getDate();
  return dayDate < 10 ? '0' + dayDate : dayDate;
}

const createBriefDescription = (event, wordCount) => {
  const words = event.event_description.split(' ');
  const briefText = words.slice(0, wordCount).join(' ');
  return briefText + (words.length > wordCount ? '...' : '');
}
const createDate = (event) => ({
  startDate : castEventDate(new Date(event.event_startdate)),
  endDate : castEventDate(new Date(event.event_enddate)),
  month : months[new Date(event.event_enddate).getMonth()]
});


const createTags = (event) => {
  console.log(event.event_address);
  return event.event_tags.split('_');
};

const createCard = (event, i) => ({
  id: i + 1,

  url: `img/cards/image${((i + 1) % 5) + 1}.png`,

  description: event.event_description,
  
  title: event.event_title,

  date: createDate(event),

  type: event.event_type,

  tags: createTags(event),

  org: event.event_organizer,
  
  format:  event.event_platform,

  address: event.event_address,
});



  export {createCard};