import React, {useEffect, useState} from 'react';
import {Menu, MenuContent, MenuItem} from '@momentum-ui/react';
import PresenceAvatar from './PresenceAvatar';

interface Props {
  webex: any,
  person: any,
  removePerson: (person: any) => void
}

const Fav = ({webex, person, removePerson}: Props) => {
  const handleClick = (event) => {
    event.preventDefault();
    removePerson(person);
  }

  return <div className="menuContentWrapper">
    <button className="cancelButton"
      onClick={(event) => {handleClick(event)}}
    >
      <i className="md-icon icon icon-cancel_16" />
    </button>
    <MenuContent className="menuContent">
      <PresenceAvatar 
        webex={webex}
        person={person}
        allowSubscription={true}
        size={84}
        />
      <div className="info">
        <div className="displayName">{person.displayName}</div>
        <div className="email">{person.emails[0]}</div>
      </div>
    </MenuContent>
    <Menu className="menu">
      <MenuItem 
        title="meet"
        label="meet"
        className="menuItem"
        onClick={() => {window.open(`webexteams://meet?sip=${person.emails[0]}`)}}
      />
      <MenuItem 
        title="chat"
        label="chat"
        className="menuItem"
        onClick={() => {window.open(`webexteams://im?email=${person.emails[0]}`)}}
      />
      <MenuItem 
        title="email"
        label="email"
        className="emailMenuItem"
        onClick={() => {window.open(`mailto:${person.emails[0]}`)}}
      />
    </Menu>
  </div>
};

export default Fav;
