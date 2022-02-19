
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
            console.log('loaded client')

            gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,
            })

            gapi.client.load('calendar', 'v3', () => console.log('bam!'))

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

                    // const event = {
                    //     'summary': 'Happy Hour!',
                    //     'location': '800 Howard St., San Francisco, CA 94103',
                    //     'description': 'Really great refreshments',
                    //     'start': {
                    //         'timeZone': 'GMT',
                    //         'dateTime': '2022-02-20T23:00:00.000Z'
                    //     },
                    //     'end': {
                    //         'dateTime': '2022-02-20T23:00:00.000Z',
                    //         'timeZone': 'GMT'
                    //     },
                    //     'recurrence': [
                    //         'RRULE:FREQ=DAILY;COUNT=1'
                    //     ],
                    //     'attendees': [
                    //         { 'email': user.email },
                    //     ],
                    //     'reminders': {
                    //         'useDefault': false,
                    //         'overrides': [
                    //             { 'method': 'email', 'minutes': 24 * 60 },
                    //             { 'method': 'popup', 'minutes': 10 }
                    //         ]
                    //     }
                    // }

                    const request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': googleEvent,
                    })

                    request.execute(event => {
                        console.log(event)
                        window.open(event.htmlLink)
                    })


                    /*
                        Uncomment the following block to get events
                    */

                    // get events
                    // gapi.client.calendar.events.list({
                    //   'calendarId': 'primary',
                    //   'timeMin': (new Date()).toISOString(),
                    //   'showDeleted': false,
                    //   'singleEvents': true,
                    //   'maxResults': 10,
                    //   'orderBy': 'startTime'
                    // }).then(response => {
                    //   const events = response.result.items
                    //   console.log('EVENTS: ', events)
                    // })

                })
        })
    }


    return (
        <div className='calendar-container'>
            <button onClick={handleClick}>Add Event to Google Calendar</button>
        </div>
    )
}

export default Calendar;
