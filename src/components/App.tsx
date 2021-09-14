import React, {Component} from 'react';
import Webex from 'webex';
import moment from 'moment';
import {Button, Icon, Spinner, Avatar} from '@momentum-ui/react';
import Content from './Content';


declare type Props = null;

export default class App extends Component {
  state: any;
  webex: any;
  props: any;
  token: string;

  constructor(props: Props) {
    super(props);

    this.token = "";
    this.state = {
      webexIsConnected: false,
    };
    this.webex = new Webex({
      config: {
        credentials: {
          client_id: 'Cde0812fa83e09690c8e3bd1bf91883c8aea7f3579389aadc487004e628f7a997',
          // redirect_uri: 'https://wxsd-sales.github.io/WebexPresence',
          redirect_uri: 'https://webexpresence.ngrok.io',
          scope: 'spark:all spark:kms'
        }
      }
    }); 
  }

  async componentDidMount(): Promise<void> {
    this.webex.on('ready', async() => {
      await this.validateToken();
    })
  }

  async validateToken(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_in');
    localStorage.removeItem('access_token');

    if(localStorage.getItem('webex_token')) {
      if((moment(localStorage.getItem('expiration_date')).diff(moment.utc()) < 0)) {
        localStorage.removeItem('webex_token');
        localStorage.removeItem('expiration_date');
        this.webex.authorization.initiateImplicitGrant();
      } else {
        const token = localStorage.getItem('webex_token').replace('Bearer ', '');

        await this.connect(token);
      }
    } else if (this.webex.credentials.supertoken) {
      const {access_token, expires_in} = this.webex.credentials.supertoken;
      const startDate = moment.utc();
      const expirationDate = startDate.add(Number(expires_in), 'seconds');

      localStorage.setItem('webex_token', access_token);
      localStorage.setItem('expiration_date', expirationDate.format());

      await this.connect(access_token);
    } else {
      this.webex.authorization.initiateImplicitGrant();
    }
  }

  async connect(token: string): Promise<void> {
    try {
      this.webex = new Webex({
        credentials: token
      });
      await this.webex.internal.device.register();
      await this.webex.internal.mercury.connect();

      this.setState({webexIsConnected: true});
    } catch (error) {
      console.log(error);
    }
  }


  render(): JSX.Element {
    return <div>
      {this.state.webexIsConnected ? 
        <div className="app">
          <div className="header" >
            <h1> My Fav Five </h1>
          </div>
          <div className="content">
            <Content webex={this.webex}/>
          </div>
        </div> : 
        <Spinner />}
    </div>
  }
}