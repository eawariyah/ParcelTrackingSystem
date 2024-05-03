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

const userRegistrationForm = document.getElementById('userRegistrationForm');
const snackbar = document.getElementById('snackbar');

userRegistrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const sourceLocation = document.getElementById('sourceLocation').value;
    const destinationLocation = document.getElementById('destinationLocation').value;
    const vehicleId = document.getElementById('vehicleId').value;
    const senderName = document.getElementById('senderName').value;
    const SenderPhoneNumber = document.getElementById('SenderPhoneNumber').value;
    const receiverName = document.getElementById('receiverName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const packagingDimensions = document.getElementById('packagingDimensions').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const sentDate = document.getElementById('sentDate').value;
    const sentTime = document.getElementById('sentTime').value;

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
        sentTime: sentTime
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
