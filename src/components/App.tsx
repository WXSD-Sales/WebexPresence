import React, {Component} from 'react';
import Webex from 'webex';
import moment from 'moment';
import {Button, Icon, Spinner, Avatar} from '@momentum-ui/react';

declare type Props = null;

export default class App extends Component {
  githubPage: string;
  state: any;
  webex: any;
  props: any;
  token: string;

  constructor(props: Props) {
    super(props);

    this.githubPage = 'https://github.com/WXSD-Sales/WebexPresence';
    this.token = "";
    this.state = {
      webexIsConnected: false,
      avatarSrc: '',
      avatarDisplayName: '',
      avatarType: '',
      title: '',
      token: ''
    };
    this.webex = new Webex({
      config: {
        credentials: {
          client_id: 'Cde0812fa83e09690c8e3bd1bf91883c8aea7f3579389aadc487004e628f7a997',
          // redirect_uri: 'https://webexvoicea.ngrok.io',
          redirect_uri: 'https://webexpresence.ngrok.io',
          scope: 'spark:all spark:kms'
        }
      }
    }); 
  }

  async componentDidMount(): Promise<void> {
    await this.requestToken();
  }

  async requestToken(): Promise<void> {
    this.webex.on('ready', async() => {
      await this.validateToken();
    })
  }

  async validateToken(): Promise<void> {
    if(localStorage.getItem('token')) {
      if((moment(localStorage.getItem('expires_in')).diff(moment.utc()) < 0)) {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_in');
        this.webex.authorization.initiateImplicitGrant();
      } else {
        const token = localStorage.getItem('token').replace('Bearer ', '');
        this.webex = new Webex({
          credentials: token
        });
  
        this.setState({webexIsConnected: true});
        await this.connect();
        this.subscribeToPresence();

      }
    } else if (this.webex.credentials.supertoken) {
      const {access_token, expires_in} = this.webex.credentials.supertoken;

      localStorage.setItem('token', access_token);
      localStorage.setItem('expires_in', expires_in);

      this.setState({webexIsConnected: true});
      await this.connect();
      this.subscribeToPresence();
    } else {
      this.webex.authorization.initiateImplicitGrant();
    }
  }

  async connect(): Promise<void> {
    try {
      await this.webex.internal.device.register();
      await this.webex.internal.mercury.connect();
      const {displayName, avatar, status} = await this.webex.people.get('me');
      this.setState({
        avatarSrc: avatar !== "" ? avatar : displayName,
        avatarDisplayName: displayName,
        avatarType: status
      })
    } catch (error) {
      console.log(error);
    }
  }

  subscribeToPresence(): void {
    this.webex.internal.mercury.on(
      'event:apheleia.subscription_update',
      event => {
        this.setState({
          avatarType: event.data.status
        })
      }
    );
  }

  render(): JSX.Element {
    const {webexIsConnected, avatarSrc, avatarType, avatarDisplayName} = this.state;

    return <div>
      {webexIsConnected ? 
        <div className="app">
          <div className="header">
            <h2>Webex Presence</h2>
            <Button circle color="blue" onClick={() => {window.open(this.githubPage, '_blank')}}>
              <Icon name="info_18" />  
            </Button >
          </div>
          <div className="content">
            <Avatar
              src={avatarSrc}
              type={avatarType}
            />
            <h3>{avatarDisplayName}</h3>
          </div>
        </div> : 
        <Spinner />}
    </div>
  }
}