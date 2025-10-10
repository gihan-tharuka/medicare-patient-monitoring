# Medicare Patient Monitoring System

<div align="center">
  <img src="./public/logo.png" alt="Medicare Patient Monitoring Logo" width="200"/>
  <br>
  <h3>Real-time Patient Health Monitoring Dashboard</h3>
</div>

## 📋 Overview

The Medicare Patient Monitoring System is a comprehensive web application designed to help healthcare providers monitor patients' vital signs in real-time. Built with React and AWS cloud services, this application enables medical professionals to track patient health metrics, receive alerts for critical conditions, and analyze health data trends.

## ✨ Key Features

- **Real-time Patient Monitoring**: Track vital signs including heart rate and oxygen levels
- **Alert System**: Receive instant notifications when patient vitals reach critical thresholds
- **Patient Management**: Add, view, and manage patient information
- **Data Visualization**: Interactive charts and graphs for vital sign trends
- **Analytics Dashboard**: Comprehensive analytics for patient health data
- **Secure Authentication**: AWS Amplify-powered user authentication system
- **Responsive Design**: Optimized for both desktop and mobile devices

## 🛠️ Technology Stack

- **Frontend**: React 19, React Router 7, Bootstrap 5.3
- **Visualization**: Chart.js, react-chartjs-2
- **Authentication**: AWS Amplify Authentication
- **API Communication**: Axios
- **Cloud Infrastructure**: AWS (API Gateway, Lambda, DynamoDB)
- **Building & Deployment**: React Scripts

## 🖼️ Screenshots

*[Add screenshots of key app screens here]*

## 🚀 Live Demo

*[If available, add a link to the live demo here]*

## 📦 Installation & Setup

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- AWS account (for backend services)

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/gihan-tharuka/medicare-patient-monitoring.git
   cd medicare-patient-monitoring
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure AWS Amplify:
   ```bash
   # If you haven't installed AWS Amplify CLI
   npm install -g @aws-amplify/cli
   
   # Configure Amplify
   amplify configure
   
   # Initialize Amplify in the project (if not already initialized)
   amplify init
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## ⚙️ Environment Variables

Create a `.env` file in the project root with the following variables:

```
REACT_APP_API_BASE_URL=https://your-api-gateway-url.amazonaws.com/dev
```

## 📝 Usage Guide

### User Authentication

The system requires authentication. You can create a new account or sign in using the AWS Amplify authenticator on the login page.

### Dashboard Navigation

- **Dashboard**: Overview of active patients and recent alerts
- **Patients**: Manage patient information and add new patients
- **Monitoring**: Real-time monitoring of vital signs
- **Alerts**: View and manage critical health alerts
- **Analytics**: Analyze health data and trends

### Patient Management

1. Navigate to the Patients tab
2. Click "Add New Patient" to register a patient
3. Fill in the required information (name, age, gender, contact)
4. Submit the form

### Monitoring Vital Signs

1. Go to the Monitoring tab
2. Select a patient from the dropdown
3. View real-time heart rate and oxygen level data
4. Toggle between different time ranges for historical data

### Managing Alerts

1. Navigate to the Alerts tab
2. View all alerts sorted by severity
3. Acknowledge alerts to mark them as reviewed
4. Filter alerts by patient ID or alert type

## 📁 Project Structure

```
medicare-patient-monitoring/
├── public/               # Public assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AddPatient.js
│   │   ├── AlertsList.js
│   │   ├── Dashboard.js
│   │   ├── HeartRateChart.js
│   │   ├── OxygenLevelChart.js
│   │   └── ...
│   ├── pages/            # Page components
│   │   ├── Dashboard.js
│   │   ├── Patients.js
│   │   ├── Monitoring.js
│   │   └── ...
│   ├── services/         # API and service functions
│   │   └── api.js
│   ├── styles/           # CSS and style files
│   └── App.js            # Main application component
└── package.json          # Project dependencies
```

## 👥 Contributing

We welcome contributions to the Medicare Patient Monitoring System! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's style guidelines and includes appropriate tests.

## 🧪 Testing

Run the test suite with:

```bash
npm test
```

The project uses Jest and React Testing Library for unit and integration testing.

## 📤 Deployment

### AWS Amplify Deployment

1. Configure your Amplify project:
   ```bash
   amplify add hosting
   ```

2. Publish the application:
   ```bash
   amplify publish
   ```

### Manual Deployment

1. Build the production version:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `build` folder to your web server or cloud hosting service.

## 🗺️ Roadmap

- Mobile application version
- Integration with wearable devices
- AI-powered predictive analytics for patient health trends
- Enhanced reporting and export features
- Multi-language support

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- AWS for cloud infrastructure services
- Chart.js for data visualization components
- All contributors to this project

## 📞 Contact Information

For questions or support, please contact:
- Project Maintainer: [Gihan Tharuka](mailto:gihantharuka2499@gmail.com)
- GitHub: [gihan-tharuka](https://github.com/gihan-tharuka)

---

<p align="center">Developed with ❤️ for better healthcare monitoring</p>
