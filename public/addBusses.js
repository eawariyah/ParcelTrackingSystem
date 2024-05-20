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

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const trackingForm = document.getElementById('trackingForm');
const snackbar = document.getElementById('snackbar');

function showSnackbar() {
  snackbar.style.display = 'block';
  setTimeout(() => {
    snackbar.style.display = 'none';
  }, 3000);
}

trackingForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const vehicleId = document.getElementById('vehicleId').value;
  const vehicleSnapshot = await database.ref('busses/' + vehicleId).once('value');
  if (vehicleSnapshot.exists()) {
    alert('The bus with the entered Vehicle ID already exists!');
    trackingForm.reset();
    return;
  }
  
  const initialCoordinatesName = document.getElementById('initialCoordinatesInput').value;
  const goalCoordinatesName = document.getElementById('goalCoordinatesInput').value;
  const currentLat = 0;
  const currentLon = 0;
  const currentSpeed = 0;
  const CurrentSatelliteNumber = 0;
  const currentAltitude = 0;

  // Fetch initial coordinates from Firebase
  const initialCoordinatesSnapshot = await database.ref('locations/' + initialCoordinatesName).once('value');
  const initialCoordinates = initialCoordinatesSnapshot.val();
  
  // Fetch goal coordinates from Firebase
  const goalCoordinatesSnapshot = await database.ref('locations/' + goalCoordinatesName).once('value');
  const goalCoordinates = goalCoordinatesSnapshot.val();

  if (!initialCoordinates || !goalCoordinates) {
    alert('One or both of the selected coordinates do not exist!');
    trackingForm.reset();
    return;
  }

  database.ref('busses/' + vehicleId).set({
    initialCoordinates: {
      sourceLocation: initialCoordinatesName,
      initialCoordinatesLat: initialCoordinates.latitude,
      initialCoordinatesLon: initialCoordinates.longitude,
    },
    goalCoordinates: {
      goalLocation: goalCoordinatesName,
      goalCoordinatesLat: goalCoordinates.latitude,
      goalCoordinatesLon: goalCoordinates.longitude,
    },
    currentCoordinates: {
      currentLat: currentLat,
      currentLon: currentLon,
      currentSpeed: currentSpeed,
      CurrentSatelliteNumber: CurrentSatelliteNumber,
      currentAltitude: currentAltitude,
      
    },
  }).then(() => {
    console.log('Data submitted successfully!');
    trackingForm.reset();
    showSnackbar();
  }).catch((error) => {
    console.error('Error submitting data:', error);
  });
});
