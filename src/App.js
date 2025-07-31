import Header from './components/Header';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

function App({ signOut, user }) {
  return (
    <div className="App">
      <Header />
      <div style={{ float: 'right', padding: '10px' }}>
        <span style={{ marginRight: '10px' }}>Hello, {user?.username}</span>
        <button className="btn btn-outline-secondary btn-sm" onClick={signOut}>Sign Out</button>
      </div>
      <Dashboard />
    </div>
  );
}

export default withAuthenticator(App);
