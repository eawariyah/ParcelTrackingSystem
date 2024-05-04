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
  
  const locationForm = document.getElementById('locationForm');
  const snackbar = document.getElementById('snackbar');
  
  function showSnackbar() {
    snackbar.style.display = 'block';
    setTimeout(() => {
      snackbar.style.display = 'none';
    }, 3000);
  }
  
  locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const locationName = document.getElementById('locationName').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
  
    // Check if latitude and longitude are valid numbers
    if (isNaN(latitude) || isNaN(longitude)) {
      alert('Latitude and longitude must be valid numbers!');
      return;
    }
  
    // Check if location name already exists
    const locationSnapshot = await database.ref('locations/' + locationName).once('value');
    if (locationSnapshot.exists()) {
      alert('The location with the entered name already exists!');
      locationForm.reset();
      return;
    }
  
    // Add location to the database
    database.ref('locations/' + locationName).set({
      latitude: latitude,
      longitude: longitude
    }).then(() => {
      console.log('Location added successfully!');
      locationForm.reset();
      showSnackbar();
    }).catch((error) => {
      console.error('Error adding location:', error);
    });
  });
  