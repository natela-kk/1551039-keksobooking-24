import {createAnnouncement} from './data.js';

const getAnnouncementsList = () => {
  const announcements =[];
  for(let i = 1; i <= 10; i++){
    announcements.push(createAnnouncement(i));
  }
  return announcements;
};
getAnnouncementsList();
