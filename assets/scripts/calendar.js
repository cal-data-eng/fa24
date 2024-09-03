---
---

let GOOGLE_CALENDAR_ID = '{{ site.google_calendar.google_calendar_id }}';
let EVENT_CONFIG = {{ site.google_calendar.event_types | jsonify }};

let extend_event = (event, config) => {
  if (config.background_color) { event.backgroundColor = config.background_color; }
  if (config.text_color) { event.textColor = config.text_color; }
  if (config.class) { event.classNames = config.class; }
  if (config.icon) {
    event.extentedProps ||= {};
    event.extentedProps.icon = config.icon;
  }
  return event;
}

let transform_calendar_event = (event) => {
  let title = event.title.trim();
  for (config in EVENT_CONFIG) {
    if (title.startsWith(config.prefix)) {
      return extend_event(event, config);
    }
    if (title.endsWith(config.suffix)) {
      return extend_event(event, config);
    }
  }

  return event;
}

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('full-calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    // plugins: [FullCalendar.TimeGrid, FullCalendar.GoogleCalendar],
    googleCalendarApiKey: '{{ site.google_calendar.google_api_key }}',
    initialView: 'timeGridWeek',
    weekends: false,
    nowIndicator: true,
    // dayMinWidth: 256,
    // TODO: 30 min default makes the calendar tall...
    // 1 hour is too compact?
    // slotDuration: '01:00:00',
    slotMinTime: '09:00:00',
    slotMaxTime: '21:00:00',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    },
    eventClassNames: 'berkeley-calendar',
    events: {
      googleCalendarId: GOOGLE_CALENDAR_ID,
      eventDataTransform: transform_calendar_event,
    },
    // eventContent: function(arg) {
    //   console.log('event content', arg.event.title)
    //   // return { html: '<i class="fa-solid fa-school" aria-hidden="true"></i>' + arg.event.title }
    //   return arg
    // },
    eventDidMount: function(args) {
      // This can be called after the event is rendered to manipulate the dom...
      let event = args.event
      let el = args.el;
      let location = '';
      let icon = '';
      let titleEl = el.querySelector('.fc-event-title')
      if (event.extentedProps && event.extentedProps.icon) {
        icon = `'<i class="fa-solid ${event.extentedProps.icon}" aria-hidden="true"></i>&nbsp;`
      }
      if (event.location) {
        location = `<br><span class="cal-event-location>${event.location}</span>`;
      }

      titleEl.innerHTML = `${icon}${titleEl.innerHTML}${location}`
    }
  });
  calendar.render();
  window.cal = calendar;
});
