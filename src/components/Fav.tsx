import React, {useEffect, useState} from 'react';
import {Menu, SubMenu, MenuContent, MenuItem} from '@momentum-ui/react';
import PresenceAvatar from './PresenceAvatar';

interface Props {
  webex: any,
  person: any
}



const Fav = ({webex, person}: Props) => {
  return <div className="menuContentWrapper">
    <MenuContent className="menuContent">
      <PresenceAvatar 
        webex={webex}
        person={person}
        allowSubscription={true}
        size={84}
        />
      <div className="info">
        <div>{person.displayName}</div>
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
