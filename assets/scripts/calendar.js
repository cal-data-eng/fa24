---
---

let GOOGLE_CALENDAR_ID = '{{ site.google_calendar.google_calendar_id }}';
let EVENT_CONFIG = {{ site.google_calendar.event_types | jsonify }};

let extend_event = (event, config) => {
  if (config.background_color) {
      event.backgroundColor = `#${config.background_color}`;
      event.borderColor = '#FFFFFF';
    }
  if (config.text_color) { event.textColor = `#${config.text_color}`; }
  if (config.class) { event.classNames = config.class; }
  if (config.icon) {
    event.extendedProps ||= {};
    event.extendedProps.icon = config.icon;
  }
  return event;
}

let transform_calendar_event = (event) => {
  let title = event.title.trim();
  for (config of EVENT_CONFIG) {
    if (config.prefix && title.startsWith(config.prefix)) {
      return extend_event(event, config);
    }
    if (config.suffix && title.endsWith(config.suffix.trim())) {
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
    // TODO: 30 min default makes the calendar tall...
    // 1 hour is too compact?
    // slotDuration: '01:00:00',
    slotMinTime: '09:00:00',
    slotMaxTime: '21:00:00',
    height: '1080px',
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    },
    eventClassNames: 'berkeley-calendar',
    eventSources: [
      {
        googleCalendarId: GOOGLE_CALENDAR_ID,
        eventDataTransform: transform_calendar_event,
      },
      {
        // UC Berkeley Student Services Calendar
        googleCalendarId: 'c_lublpqqigfijlbc1l4rudcpi5s@group.calendar.google.com',
        backgroundColor: '#B3E59A',
        textColor: '#000000',
      }
    ],
    // eventContent: function(arg) {
    //   console.log('event content', arg.event.title)
    //   // return { html: '<i class="fa-solid fa-school" aria-hidden="true"></i>' + arg.event.title }
    //   return arg
    // },
    eventDidMount: function(args) {
      console.log('event did mount', args.event)
      // This can be called after the event is rendered to manipulate the dom...
      let props = args.event.extendedProps;
      let location = '';
      let icon = '';
      let titleEl = args.el.querySelector('.fc-event-title'),
          eventTitleContainer = args.el.querySelector('.fc-event-title-container'),
          eventTimeContainer = args.el.querySelector('.fc-event-main-frame'),
          eventTime = args.el.querySelector('.fc-event-time');

      if (eventTimeContainer && eventTitleContainer && eventTime) {
        eventTimeContainer.removeChild(eventTime);
        eventTitleContainer.appendChild(eventTime);
      }

      if (!props) { return; }
      if (props.icon) {
        icon = `<i class="fa-solid ${props.icon}" aria-hidden="true"></i>&nbsp;`
      }
      if (props.location) {
        location = `<br><span class="cal-event-location">${props.location}</span>`;
      }

      titleEl.innerHTML = `${icon}${titleEl.innerHTML}${location}`;
    }
  });
  calendar.render();
  window.cal = calendar;
});
