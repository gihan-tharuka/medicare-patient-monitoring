import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Monitoring from './pages/Monitoring';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Amplify imports
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';

// Import the new Authenticator component & default styles
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

// Configure Amplify
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="App">
          <Router>
            <Layout signOut={signOut} user={user}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/monitoring" element={<Monitoring />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/analytics" element={<Analytics />} />
              </Routes>
            </Layout>
          </Router>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
