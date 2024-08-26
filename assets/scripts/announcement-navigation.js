document.addEventListener('DOMContentLoaded', function () {
    const prevButton = document.getElementById('prev-week');
    const nextButton = document.getElementById('next-week');
    const announcements = document.querySelectorAll('.announcement[data-week]');
  
    function getValidWeeks() {
      const validAnnouncements = Array.from(announcements).filter(a => {
        const announcementDate = new Date(a.dataset.date);
        return announcementDate <= new Date();  // Only past or present announcements
      });
  
      return validAnnouncements.map(a => parseInt(a.dataset.week)).sort((a, b) => a - b);
    }
  
    function showAnnouncement(week) {
      announcements.forEach(announcement => {
        const announcementWeek = parseInt(announcement.dataset.week);
        if (announcementWeek === week) {
          announcement.style.display = 'block';
        } else {
          announcement.style.display = 'none';
        }
      });
  
      const validWeeks = getValidWeeks();
      const maxWeek = Math.max(...validWeeks);
      const minWeek = Math.min(...validWeeks);
  
      prevButton.dataset.week = week - 1;
      nextButton.dataset.week = week + 1;
  
      prevButton.style.visibility = week > minWeek ? 'visible' : 'hidden';
      nextButton.style.visibility = week < maxWeek ? 'visible' : 'hidden';
    }
  
    // Initial load
    const validWeeks = getValidWeeks();
    const initialWeek = validWeeks[validWeeks.length - 1];  // Most recent valid week
    showAnnouncement(initialWeek);
  
    prevButton.addEventListener('click', function (e) {
      e.preventDefault();
      const week = parseInt(prevButton.dataset.week);
      if (week >= Math.min(...getValidWeeks())) {
        showAnnouncement(week);
      }
    });
  
    nextButton.addEventListener('click', function (e) {
      e.preventDefault();
      const week = parseInt(nextButton.dataset.week);
      if (week <= Math.max(...getValidWeeks())) {
        showAnnouncement(week);
      }
    });
  });
  