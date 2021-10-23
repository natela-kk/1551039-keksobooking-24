import {createAnnouncement} from './data.js';
import {renderOffer} from './similar-elements.js';
const cardsList = document.querySelector('.map__canvas');
cardsList.appendChild(renderOffer(createAnnouncement(1)));

// const getAnnouncementsList = () => {
//   const announcements =[];
//   for(let i = 1; i <= 10; i++){
//     announcements.push(createAnnouncement(i));
//   }
//   return announcements;
// };
// const getOffersDom = () => {
//   getAnnouncementsList().forEach((announcement) => {
//     cardsList.appendChild(renderOffer(announcement));
//   });
// };
// getOffersDom();
