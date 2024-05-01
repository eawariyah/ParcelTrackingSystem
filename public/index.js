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

function displayFirebaseValues() {
  // Reference to the testValues node
  const testValuesRef = database.ref("gpsCoordinates");

  // Fetch data once from the testValues node
  testValuesRef.once("value", (snapshot) => {
    // Get the snapshot value
    const data = snapshot.val();

    // Log each value to the console
    // console.log("altitudeValue:", data.altitudeValue);
    // console.log("latitudeValue:", data.latitudeValue);
    // console.log("longitudeValue:", data.longitudeValue);
    // console.log("satelliteValue:", data.satelliteValue);
    // console.log("speedValue:", data.speedValue);

    const lat1 = 5.695604; // Start
    const lon1 = -0.247041; // Start

    const lat2 = 5.761273; // Goal
    const lon2 = -0.22054; // Goal

    const currentLat = data.latitudeValue; // Current
    const currentLon = data.longitudeValue; // Current

    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // in metres

    document.getElementById("distanceValue").innerHTML =
      distance.toFixed(2) + " meters";

    // Calculate the distance from current location to goal
    const φ3 = (currentLat * Math.PI) / 180;
    const φ4 = (lat2 * Math.PI) / 180;
    const Δφ2 = ((lat2 - currentLat) * Math.PI) / 180;
    const Δλ2 = ((lon2 - currentLon) * Math.PI) / 180;

    const a2 =
      Math.sin(Δφ2 / 2) * Math.sin(Δφ2 / 2) +
      Math.cos(φ3) * Math.cos(φ4) * Math.sin(Δλ2 / 2) * Math.sin(Δλ2 / 2);
    const c2 = 2 * Math.atan2(Math.sqrt(a2), Math.sqrt(1 - a2));

    const currentDistance = R * c2; // in metres

    // Calculate the percentage of the current distance relative to the total distance
    const progressPercentage =
      ((distance - currentDistance) / distance) * 100;
    document.getElementById("progressStatus").innerHTML =
      progressPercentage.toFixed(2) + "%";

    // Update the progress bar
    document.getElementById("progressBar").value = progressPercentage;

    // Update arrivedState based on progressPercentage
    const arrivedState = progressPercentage >= 95.0 ? true : false;

    // Set or update arrivedState in Firebase
    const arrivedStateRef = database.ref("arrivedState");
    arrivedStateRef
      .set(arrivedState)
      .then(() => {
        console.log("arrivedState updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating arrivedState:", error);
      });
    const speed = 30; // Average speed in km/h
    const estimatedTimeSeconds = distance / ((speed * 1000) / 3600); // Distance in km, speed in km/h
    const estimatedHours = Math.floor(estimatedTimeSeconds / 3600);
    const estimatedMinutes = Math.floor(
      (estimatedTimeSeconds % 3600) / 60
    );
    document.getElementById(
      "estimatedTime"
    ).innerText = `${estimatedHours} hours ${estimatedMinutes} minutes`;
  });
}

setInterval(displayFirebaseValues, 1000);
function toggleDrawer() {
    var drawer = document.getElementById("drawer");
    if (drawer.style.display === "block") {
      drawer.style.display = "none";
    } else {
      drawer.style.display = "block";
    }
  }

