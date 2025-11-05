import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCu-pVyxLiMTU5WcmBrIbG8yhBHu-QS34w",
    authDomain: "input-be7ab.firebaseapp.com",
    databaseURL: "https://input-be7ab-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "input-be7ab",
    storageBucket: "input-be7ab.firebasestorage.app",
    messagingSenderId: "858680331857",
    appId: "1:858680331857:web:9b57ef82ade8f04d29b270",
    measurementId: "G-RMKYHWT31C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference to 'mahasiswa' node
const mahasiswaRef = ref(database, 'mahasiswa');

// Get table body element
const tableBody = document.querySelector('tbody');

// Listen for data changes
onValue(mahasiswaRef, (snapshot) => {
    // Clear existing table data
    tableBody.innerHTML = '';
    
    // Counter for numbering
    let counter = 1;

    snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        
        // Create new row
        const row = document.createElement('tr');
        
        // Create table cells
        const cells = [
            counter,
            data.nama,
            data.nim,
            data.mk,
            data.nilai
        ].map(text => {
            const td = document.createElement('td');
            td.textContent = text;
            return td;
        });
        
        // Add cells to row
        cells.forEach(cell => row.appendChild(cell));
        
        // Add row to table
        tableBody.appendChild(row);
        
        counter++;
    });
});