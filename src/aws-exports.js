const awsconfig = {
  Auth: {
    Cognito: {
      // REQUIRED - Amazon Cognito Region
      region: 'eu-north-1', // Replace with your region

      // OPTIONAL - Amazon Cognito User Pool ID
      userPoolId: 'eu-north-1_NMJwcXCAw', // Replace with your User Pool ID

      // OPTIONAL - Amazon Cognito Web Client ID (App client ID)
      userPoolClientId: '46fejrs6cvbe3kqp5veimnq0gk', // Replace with your App client id

      // OPTIONAL - Amazon Cognito Web Client Secret (only if your app client is configured with a secret)
      //userPoolClientSecret: '15ueifnfvf5vu0rfqqo06t9hapvo86g1obgtk2dc6t3v727htrad', // Uncomment and add your client secret if needed

      // OPTIONAL - This is used to set the authentication flow type. 
      loginWith: {
        email: true,
        username: false,
        phone: false
      }
    }
  }
};

export default awsconfig;
