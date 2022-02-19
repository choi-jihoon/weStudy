import { useSelector } from 'react-redux';

const Calendar = () => {
    const user = useSelector(state => state.session.user);

    const gapi = window.gapi;
    const CLIENT_ID = "1088658194258-u4v5os24sv6pn330i0ebrkrp0mhb03e5.apps.googleusercontent.com";
    const API_KEY = "AIzaSyAC8cnxIzUN8YAkk9uF_gZ2CKdij-QOW8w"
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
    const SCOPES = "https://www.googleapis.com/auth/calendar.events"

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

                    const event = {
                        'summary': 'Happy Hour!',
                        'location': '800 Howard St., San Francisco, CA 94103',
                        'description': 'Really great refreshments',
                        'start': {
                            'dateTime': '2022-02-20T09:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'end': {
                            'dateTime': '2022-02-20T17:00:00-07:00',
                            'timeZone': 'America/Los_Angeles'
                        },
                        'recurrence': [
                            'RRULE:FREQ=DAILY;COUNT=1'
                        ],
                        'attendees': [
                            { 'email': user.email },
                        ],
                        'reminders': {
                            'useDefault': false,
                            'overrides': [
                                { 'method': 'email', 'minutes': 24 * 60 },
                                { 'method': 'popup', 'minutes': 10 }
                            ]
                        }
                    }

                    const request = gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event,
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
            CALENDAR
            <button onClick={handleClick}>Add Event</button>
        </div>
    )
}

export default Calendar;
