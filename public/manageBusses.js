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

const busTable = document.getElementById('busTable');
const busList = document.getElementById('busList');

function displayBuses() {
    busList.innerHTML = ''; // Clear previous bus data

    database.ref('busses').once('value', (snapshot) => {
        snapshot.forEach((bus) => {
            const busData = bus.val();
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bus.key}</td>
                <td>${busData.initialCoordinates.sourceLocation}</td>
                <td>${busData.goalCoordinates.goalLocation}</td>
                <td>
                    <button onclick="editCoordinates('${bus.key}')">Edit</button>
                    <button onclick="deleteBus('${bus.key}')">Delete</button>
                </td>
            `;
            busList.appendChild(row);
        });
    });
}

function editCoordinates(busId) {
    const newInitialCoordinates = prompt(`Enter new Initial Coordinates for bus ${busId}:`);
    const newGoalCoordinates = prompt(`Enter new Goal Coordinates for bus ${busId}:`);

    if (newInitialCoordinates !== null && newGoalCoordinates !== null) {
        // Update the bus coordinates in the database
        database.ref(`busses/${busId}`).update({
            initialCoordinates: {
                sourceLocation: newInitialCoordinates,
                initialCoordinatesLat: '', // Update with new latitude
                initialCoordinatesLon: '', // Update with new longitude
            },
            goalCoordinates: {
                goalLocation: newGoalCoordinates,
                goalCoordinatesLat: '', // Update with new latitude
                goalCoordinatesLon: '', // Update with new longitude
            }
        }).then(() => {
            alert(`Coordinates updated successfully for bus ${busId}`);
            displayBuses();
        }).catch((error) => {
            console.error('Error updating coordinates:', error);
            alert('An error occurred while updating coordinates. Please try again.');
        });
    }
}

function deleteBus(busId) {
    if (confirm(`Are you sure you want to delete bus ${busId}?`)) {
        // Remove the bus from the database
        database.ref(`busses/${busId}`).remove().then(() => {
            alert(`Bus ${busId} deleted successfully`);
            displayBuses();
        }).catch((error) => {
            console.error('Error deleting bus:', error);
            alert('An error occurred while deleting the bus. Please try again.');
        });
    }
}

// Initial display of buses
displayBuses();
