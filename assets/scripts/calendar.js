---
---

let CALENDAR_FEED_URL = '{{ site.google_calendar.ics_calendar_url }}';

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('full-calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    // plugins: [FullCalendar.TimeGrid, FullCalendar.ICalendar],
    initialView: 'timeGridWeek',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    },
    events: {
      url: CALENDAR_FEED_URL,
      format: 'ics'
    }
  });
  calendar.render();
});
