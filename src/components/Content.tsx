import React, {useState} from 'react';
import Search from './Search';
import Fav from './Fav';

interface Props {
  webex: any
}
const Placeholder = () => <div className="placeholder" />;

const Content = ({webex}: Props): JSX.Element => {
  const [people, setPeople] = useState(JSON.parse(localStorage.getItem('people')) || []);
  const initialPlaceholders = [
    <Placeholder key="0"/>, 
    <Placeholder key="1"/>, 
    <Placeholder key="2"/>, 
    <Placeholder key="3"/>, 
    <Placeholder key="4"/>
  ];
  const [placeholders, setPlaceholders] = useState(initialPlaceholders.slice(people.length));
  const addPerson = (person) => {
    placeholders.shift();
    setPlaceholders([...placeholders]);

    if(people.length < 5) {
      const newPeople = [...people, person];
      localStorage.setItem('people', JSON.stringify(newPeople));
      setPeople(newPeople);
    }
  };
  const removePerson = (person) => {
    placeholders.unshift(<Placeholder key={`${placeholders.length}`}/>);
    setPlaceholders([...placeholders]);

    const folks = people.filter((peep) => peep !== person);
    localStorage.setItem('people', JSON.stringify(folks));
    setPeople([...folks]);
  }

  const favs = people.map((person) => 
    <Fav key={person.id} person={person} webex={webex} removePerson={removePerson}/>
  );

  return <div className="content">
    <Search 
      webex={webex}
      addPerson={addPerson}/>
    <div className="favs">
      {favs}  
      {placeholders}
    </div>
  </div>;
};

export default Content;
