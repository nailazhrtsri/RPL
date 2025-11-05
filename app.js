import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const form = document.getElementById('dataForm');
const alertElement = document.querySelector('.alert');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Create reference to 'mahasiswa' node in database
const mahasiswaRef = ref(database, 'mahasiswa');

if (!form) {
    console.error('Form with id "dataForm" not found!');
} else {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nama = document.getElementById('nama').value;
        const nim = document.getElementById('nim').value;
        const mk = document.getElementById('mk').value;
        const nilai = document.getElementById('nilai').value;

        // Validate input
        if (!nama || !nim || !mk || !nilai) {
            alert('Semua field harus diisi!');
            return;
        }

        // Push data to Firebase
        push(mahasiswaRef, {
            nama: nama,
            nim: nim,
            mk: mk,
            nilai: nilai,
            timestamp: new Date().toISOString()
        }).then(() => {
            if (alertElement) {
                alertElement.style.display = 'block';
                setTimeout(() => {
                    alertElement.style.display = 'none';
                }, 3000); // Hide alert after 3 seconds
            }
            form.reset();
        }).catch(error => {
            console.error('Error:', error);
            alert('Gagal menyimpan data: ' + error.message);
        });
    });
}