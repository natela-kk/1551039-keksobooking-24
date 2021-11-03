import {createAnnouncement} from './data.js';
import {createPinMarker} from './map.js';


const getAnnouncementsList = () => {
  const announcements =[];
  for(let i = 1; i <= 11; i++){
    announcements.push(createAnnouncement(i));
  }
  return announcements;
};

getAnnouncementsList().forEach((announcement) => {
  createPinMarker(announcement);
});
