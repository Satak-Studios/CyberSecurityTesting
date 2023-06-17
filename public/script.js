function saveUserInfo() {
  var userInformation = {
    ipAddress: '',
    deviceName: '',
    timestamp: ''
  };

  // Fetch IP address using a public API
  fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
      userInformation.ipAddress = data.ip;
      getUserDeviceName();
    })
    .catch(error => console.log('Error fetching IP address:', error));

  // Get the device name
  function getUserDeviceName() {
    userInformation.deviceName = navigator.userAgent;
    userInformation.timestamp = new Date().toLocaleString();
    saveToFile(JSON.stringify(userInformation));
  }

  // Save user information to a file on the server
  function saveToFile(data) {
    fetch('/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: data })
    })
      .then(response => {
        if (response.ok) {
          console.log('User information saved successfully.');
        } else {
          console.log('Failed to save user information.');
        }
      })
      .catch(error => console.log('Error saving user information:', error));
  }
}

// Automatically save user information when the page loads
window.onload = saveUserInfo;