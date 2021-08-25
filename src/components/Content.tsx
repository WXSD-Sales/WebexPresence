import React, {useState} from 'react';
import Search from './Search';
import Fav from './Fav';

interface Props {
  webex: any
}
const Placeholder = () => <div className="placeholder" />;

const Content = ({webex}: Props): JSX.Element => {
  const one = {
    "id": "Y2lzY29zcGFyazovL3VzL1BFT1BMRS80N2MzMmQwYi0wNDQ0LTQ2MGQtOGJjZS0yMjY1YjUwMWFhYzU",
    "emails": [
        "akoushke@cisco.com"
    ],
    "phoneNumbers": [
        {
            "type": "mobile",
            "value": "+1 408-527-6715"
        },
        {
            "type": "work",
            "value": "+1 408-894-5448"
        }
    ],
    "displayName": "Arash Koushkebaghi",
    "nickName": "Arash",
    "firstName": "Arash",
    "lastName": "Koushkebaghi",
    "avatar": "https://avatar-prod-us-east-2.webexcontent.com/Avtr~V1~1eb65fdf-9643-417f-9974-ad72cae0e10f/V1~47c32d0b-0444-460d-8bce-2265b501aac5~311b7801865d484fb072dd0d5e8374bd~1600",
    "orgId": "Y2lzY29zcGFyazovL3VzL09SR0FOSVpBVElPTi8xZWI2NWZkZi05NjQzLTQxN2YtOTk3NC1hZDcyY2FlMGUxMGY",
    "created": "2016-12-04T15:55:38.969Z",
    "lastModified": "2021-08-17T18:29:16.008Z",
    "lastActivity": "2021-08-24T04:09:17.929Z",
    "status": "active",
    "type": "person",
    "xmppFederationJid": "akoushke@cisco.com"
  };
  const [people, setPeople] = useState([]);
  const [placeholders, setPlaceholders] = useState([
    <Placeholder key="0"/>, 
    <Placeholder key="1"/>, 
    <Placeholder key="2"/>, 
    <Placeholder key="3"/>, 
    <Placeholder key="4"/>
  ])

  const getPerson = (person) => {
    placeholders.shift();
    setPlaceholders([...placeholders]);

    if(people.length < 5) {
      setPeople([...people, person]);
    }
  };

  const favs = people.map((person) => 
    <Fav key={person.id} person={person} webex={webex}/>
  );

  return <div className="content">
    <Search 
      webex={webex}
      selectPerson={getPerson}/>
    <div className="favs">
      {favs}  
      {placeholders}
    </div>
  </div>;
};

export default Content;
