const firebaseConfig = {
    apiKey: "AIzaSyBy9PfTUKSklxPDo4Sm8Cr7Q4yQvpDoz-A",
    authDomain: "bustrackingsystem-7f036.firebaseapp.com",
    databaseURL:
      "https://bustrackingsystem-7f036-default-rtdb.firebaseio.com",
    projectId: "bustrackingsystem-7f036",
    storageBucket: "bustrackingsystem-7f036.appspot.com",
    messagingSenderId: "226831139838",
    appId: "1:226831139838:web:9fd76bb79423b0fc23f6af",
    measurementId: "G-S72Z6K6WVQ",
  };

  
  const userRegistrationForm = document.getElementById('userRegistrationForm');
  const snackbar = document.getElementById('snackbar');
  firebase.initializeApp(firebaseConfig);
const database = firebase.database();

async function updateDatalistOptions() {
    const sourceLocationList = document.getElementById('sourceLocationList');
    const destinationLocationList = document.getElementById('destinationLocationList');
    const VehicleIdList = document.getElementById('VehicleIdList');

    // Fetch source locations from Firebase
    const sourceLocationsSnapshot = await database.ref('locations').once('value');
    sourceLocationsSnapshot.forEach((childSnapshot) => {
        const locationName = childSnapshot.key;
        const option = document.createElement('option');
        option.value = locationName;
        sourceLocationList.appendChild(option);
    });

    // Fetch destination locations from Firebase
    const destinationLocationsSnapshot = await database.ref('locations').once('value');
    destinationLocationsSnapshot.forEach((childSnapshot) => {
        const locationName = childSnapshot.key;
        const option = document.createElement('option');
        option.value = locationName;
        destinationLocationList.appendChild(option);
    });

    // Fetch vehicle IDs from Firebase
    const vehicleIdsSnapshot = await database.ref('busses').once('value');
    vehicleIdsSnapshot.forEach((childSnapshot) => {
        const vehicleId = childSnapshot.key;
        const option = document.createElement('option');
        option.value = vehicleId;
        VehicleIdList.appendChild(option);
    });
}

// Update datalist options when the page loads
updateDatalistOptions();
  
  userRegistrationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const sourceLocation = document.getElementById('sourceLocation').value;
    const destinationLocation = document.getElementById('destinationLocation').value;
    const vehicleId = document.getElementById('vehicleId').value;
    // Fetch vehicle data from Firebase
    const vehicleSnapshot = await database.ref('busses/' + vehicleId).once('value');
    if (!vehicleSnapshot.exists()) {
      alert('The entered Vehicle ID does not exist!');
      return;
    }
    const vehicleData = vehicleSnapshot.val();
    const sourceLocationMatch = vehicleData.initialCoordinates.sourceLocation === sourceLocation;
    const destinationLocationMatch = vehicleData.goalCoordinates.goalLocation === destinationLocation;
    const vehicleIdMatch = vehicleData.vehicleId === vehicleId;
    if (!sourceLocationMatch || !destinationLocationMatch || !vehicleIdMatch) {
      alert('The entered source location, destination location, or vehicle ID does not match the data in the database!');
      return;
    }
  
    // Proceed with registration if everything matches
    const senderName = document.getElementById('senderName').value;
    const SenderPhoneNumber = document.getElementById('SenderPhoneNumber').value;
    const receiverName = document.getElementById('receiverName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const packagingDimensions = document.getElementById('packagingDimensions').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const sentDate = document.getElementById('sentDate').value;
    const sentTime = document.getElementById('sentTime').value;
    const approvedState = false;
    const processedState = false;
    const transitState = false;
    const deliveredState = false;
    const receivedState = false;
  
    const uniqueId = generateUniqueId(10);
  
    database.ref('users/' + uniqueId).set({
      sourceLocation: sourceLocation,
      destinationLocation: destinationLocation,
      vehicleId: vehicleId,
      senderName: senderName,
      SenderPhoneNumber: SenderPhoneNumber,
      receiverName: receiverName,
      phoneNumber: phoneNumber,
      packagingDimensions: packagingDimensions,
      paymentMethod: paymentMethod,
      sentDate: sentDate,
      sentTime: sentTime,
      approvedState: approvedState,
      processedState: processedState,
      transitState: transitState,
      deliveredState: deliveredState,
      receivedState: receivedState,
    }).then(() => {
      console.log('User registered successfully!');
      userRegistrationForm.reset();
      showSnackbar();
    }).catch((error) => {
      console.error('Error registering user:', error);
    });
  });
  
  function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  function showSnackbar() {
    snackbar.classList.add('show');
    setTimeout(() => {
      snackbar.classList.remove('show');
    }, 3000); // Hide after 3 seconds
  }
  