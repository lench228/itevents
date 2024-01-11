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
  return event.event_tags.split('_');
};

const createCard = (event, i) => ({
  dataId: event.event_id,

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