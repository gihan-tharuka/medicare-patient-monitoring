import axios from 'axios';
import { getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';


const API_BASE_URL = 'https://q0c3ofpp25.execute-api.eu-north-1.amazonaws.com/dev/'; // Replace with your API Gateway URL

const api = axios.create({
baseURL: API_BASE_URL,
timeout: 10000,
headers: {
'Content-Type': 'application/json',
'Accept': 'application/json',
},
withCredentials: false, // Don't send cookies with cross-origin requests
});

export const apiService = {
// Send patient data
sendPatientData: async (patientData) => {
try {
console.log('Sending patient data:', patientData);
console.log('API URL:', `${API_BASE_URL}/patient-data`);
const response = await api.post('/patient-data', patientData);
console.log('Response:', response.data);
return response.data;
} catch (error) {
console.error('Error sending patient data:', error);
if (error.response) {
console.error('Response status:', error.response.status);
console.error('Response data:', error.response.data);
console.error('Response headers:', error.response.headers);
} else if (error.request) {
console.error('Request was made but no response received:', error.request);
} else {
console.error('Error message:', error.message);
}
throw error;
}
},

// Get dashboard data
getDashboardData: async () => {
try {
const response = await api.get('/dashboard');
return response.data;
} catch (error) {
console.error('Error fetching dashboard data:', error);
throw error;
}
},

getPatientTrend: async (patientId) => {
    try {
      const response = await api.get(`/patient-trend/${patientId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching patient trend:', error);
      throw error;
    }
  },

  // createPatient: async (patientData) => {
  //   try {
  //     const response = await api.post('/add-patient', patientData);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error creating patient:', error);
  //     throw error;
  //   }
  // },
  createPatient: async (patientData) => {
  try {
    // Get JWT from current session using Amplify v6 syntax
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    // Call API with Authorization header
    const response = await api.post(
      '/add-patient',
      patientData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
},


// Send test data
sendTestData: async (patientId, heartRate, oxygenLevel, inactivityMinutes = 0) => {
const testData = {
patientId,
heartRate,
oxygenLevel,
inactivityMinutes,
timestamp: Date.now()
};

return await apiService.sendPatientData(testData);
}
};

export default apiService;