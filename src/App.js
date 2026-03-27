import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Monitoring from './pages/Monitoring';
import Alerts from './pages/Alerts';
import Analytics from './pages/Analytics';
import Landing from './pages/Landing';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Amplify imports
import { Amplify } from 'aws-amplify';
import { Auth } from '@aws-amplify/ui-react';
import awsconfig from './aws-exports';

// Import the new Authenticator component & default styles
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './styles/amplify-custom.css';

// Configure Amplify
Amplify.configure(awsconfig);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    const listener = Auth.addEventListener('authState', checkAuthStatus);
    return () => listener.remove();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setIsAuthenticated(!!user);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />}
          />
          <Route 
            path="/login" 
            element={
              <Authenticator>
                {({ signOut, user }) => (
                  <div>
                    <Layout signOut={signOut} user={user}>
                      <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/monitoring" element={<Monitoring />} />
                        <Route path="/alerts" element={<Alerts />} />
                        <Route path="/analytics" element={<Analytics />} />
                      </Routes>
                    </Layout>
                  </div>
                )}
              </Authenticator>
            }
          />
          <Route 
            path="/dashboard" 
            element={
              isAuthenticated ? (
                <Layout>
                  <Dashboard />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            path="/patients" 
            element={
              isAuthenticated ? (
                <Layout>
                  <Patients />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            path="/monitoring" 
            element={
              isAuthenticated ? (
                <Layout>
                  <Monitoring />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            path="/alerts" 
            element={
              isAuthenticated ? (
                <Layout>
                  <Alerts />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route 
            path="/analytics" 
            element={
              isAuthenticated ? (
                <Layout>
                  <Analytics />
                </Layout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
