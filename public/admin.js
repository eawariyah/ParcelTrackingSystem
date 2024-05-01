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

function setCoordinates(coords, input) {
  const isInitial = input.id === 'initialCoordinatesInput';

  if (input.value === coords) {
    // If already selected, clear input value
    input.value = '';
  } else {
    // Set input value to selected coordinates
    input.value = coords;
  }
}
function showSnackbar() {
    snackbar.style.display = 'block'; // Show the snackbar
    setTimeout(() => {
      snackbar.style.display = 'none'; // Hide the snackbar after 3 seconds
    }, 3000);
  }
  

trackingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const vehicleId = document.getElementById('vehicleId').value;
  var initialCoordinates = document.getElementById('initialCoordinatesInput').value;
  var goalCoordinates = document.getElementById('goalCoordinatesInput').value;
  const approved = document.getElementById('approved').checked;
  const processed = document.getElementById('processed').checked;
  const inTransit = document.getElementById('inTransit').checked;
  const delivered = document.getElementById('delivered').checked;
  const received = document.getElementById('received').checked;


if(initialCoordinates === "Accra"){
initialCoordinates = "5.568028, -0.219707";
}
if(goalCoordinates === "Accra"){
goalCoordinates = "5.568028, -0.219707";
}
if(initialCoordinates === "Kumasi"){
initialCoordinates = "6.687768, -1.595859";
}
if(goalCoordinates === "Kumasi"){
goalCoordinates = "6.687768, -1.595859";
}
if(initialCoordinates === "Sunyani"){
initialCoordinates = "7.331780, -2.320112";
}
if(goalCoordinates === "Sunyani"){
goalCoordinates = "7.331780, -2.320112";
}
if (initialCoordinates === goalCoordinates) {
    alert('Initial and goal coordinates cannot be the same!');
    trackingForm.reset();

}

  // Push data to Firebase RTDB
  database.ref('parcels/' + vehicleId).set({
    initialCoordinates: initialCoordinates,
    goalCoordinates: goalCoordinates,
    states: {
      approved: approved,
      processed: processed,
      inTransit: inTransit,
      delivered: delivered,
      received: received
    }
  }).then(() => {
    console.log('Data submitted successfully!');
    // Clear form fields
    trackingForm.reset();
    showSnackbar();

  }).catch((error) => {
    console.error('Error submitting data:', error);
  });
});