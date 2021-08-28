import React, {useState} from 'react';
import SearchList from './SearchList';
import {InputSearch} from '@momentum-ui/react';
import {searchPeople} from '../Webex';
import MyAvatarMenu from './MyAvatarMenu';

interface Props {
  webex: any,
  addPerson: (person: any) => void
}

const Search = ({webex, addPerson}: Props): JSX.Element => { 
  const [isLoading, setIsLoading] = useState(false);
  const [people, setPeople] = useState([]);

  const handleOnChange = (event) => {
    if(event.target.value === '') {
      setIsLoading(false);
      setPeople([]);
    } else  {
      setIsLoading(true);

      searchPeople(webex, event.target.value).then(({items}) => {
        setPeople(items.slice(0, 10));
        setIsLoading(false);
        
      });
    }
  } 

  const cleanList = (person: any) => {
    setPeople([]);
    addPerson(person);
  }

  return <div className="search">
    <MyAvatarMenu webex={webex} />
    <div className="searchInput">
      <InputSearch 
        clear
        htmlId='loadingSearchInput'
        containerSize='medium-6'
        isLoading={isLoading}
        name='loadingSearchInput'
        onChange={async (event) => {await handleOnChange(event)}}
        />
      <SearchList 
        webex={webex} 
        people={people}
        selectPerson={cleanList} />
    </div>
  </div>
};

export default Search;
