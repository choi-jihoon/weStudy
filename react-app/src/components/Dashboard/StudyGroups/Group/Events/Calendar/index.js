const Calendar = ({ event }) => {

    const gapi = window.gapi;
    const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
    const API_KEY = process.env.REACT_APP_API_KEY
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"

    const offset = new Date().getTimezoneOffset() / 60;
    const start = new Date(new Date(event.start_time).setHours((new Date(event.start_time)).getHours() + offset)).toISOString();
    const end = new Date(new Date(event.end_time).setHours((new Date(event.end_time)).getHours() + offset)).toISOString();


    const handleClick = () => {
        gapi.load('client:auth2', () => {

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => null)

            gapi.auth2.getAuthInstance().signIn()
                .then(() => {

                    const googleEvent = {
                        'summary': event.summary,
                        'description': event.description,
                        'start': {
                            'timeZone': 'GMT',
                            'dateTime': start
                        },
                        'end': {
                            'timeZone': 'GMT',
                            'dateTime': end
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=1'
                        ],
                        'attendees': [
                            // { 'email': event.user_id },
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    for (let i = 0; i < event.attendees.length; i++) {
                        googleEvent['attendees'].push({'email': event.attendees[i].email})
                    }

                    const request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': googleEvent,
                    })

                    request.execute(event => {
                        window.open(event.htmlLink)
                    })
                })
        })
    }


    return (
        <div className='google-calendar-icon'>
            <img alt='google calendar logo' onClick={handleClick} src="https://img.icons8.com/fluency/48/000000/google-calendar--v2.png"/>
            <div className='add-to-google-cal'>Add to Google Calendar</div>
        </div>
    )
}

export default Calendar;
