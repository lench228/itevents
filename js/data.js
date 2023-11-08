const DESCRIPTIONS = [
    'In addition, useful excursions to enterprises, communication with experts from leading companies in the industry',
    'We are waiting for the authors of current projects in a variety of technological fields and do not limit you In subjects. Projects can be either research, engineering or digital',
    'We are waiting for useful excursions to enterprises,communication with experts from leading companies in the industry',
    'We do not limit your imagination – but it is important that your idea solves a real problem. The works will be watched by real experts in their field – specialists from the Russian Railways company and tutors of the Federal Center for Additional Education, acting engineers and programmers',
    'The teams that have shown the best results will be invited to a bright final event – there will be an opportunity to present their decision to the company`s management and, maybe, your project will be implemented',
  ];
  
  const TITLES = [
    'The Unruly Stream',
    'Forum of Quantorians',
    'Coder Symposium',
    'Digital Collection',
    'Innovation Congress',
  ];

  const TYPES = [
    'Championship',
    'Contest',
    'Competition',
    'Accelerator',
    'Festival',
  ];
  
  const DATES = [
    '26-30 June',
    '12-15 Jule',
    '27-29 Jule',
    '11-16 August',
    '18-22 Jule',
  ];
  const CARDS_COUNT = 5;
  
  
  const createCard = (i) => ({
    id: i+1,
  
    url: `img/cards/image${i+1}.png`,
  
    description: DESCRIPTIONS[i],
    
    title: TITLES[i],

    date: DATES[i],

    type: TYPES[i]
  });


  export {createCard};