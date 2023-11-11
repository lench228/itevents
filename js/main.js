import './hero_rotate.js';
import{createCard} from './data.js';
import {renderCards} from './cards.js';
import './filters.js';
import { openPage } from './card-page.js';
let cards = [];
for(let i= 0; i < 5; i++){
    cards[i] = createCard(i);
}


renderCards(cards);
openPage(cards);