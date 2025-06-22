import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA2SEsQqGO8tXIuIg8seVdt8t20_PpQMdM",
  authDomain: "carinventory1710.firebaseapp.com",
  projectId: "carinventory1710",
  storageBucket: "carinventory1710.firebasestorage.app",
  messagingSenderId: "869643546993",
  appId: "1:869643546993:web:090a767cb09d2f483506d0",
  measurementId: "G-HL086JHQVZ"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// List of car objects with extended specs
const cars = [
  {
    brand: 'Ford',
    model: 'Mustang',
    type: 'Sports',
    fuel: 'Petrol',
    price: '₹45–60L',
    body_type: 'Coupe',
    useCase: 'Performance driving, car shows'
  },
  {
    brand: 'Porsche',
    model: '911 Carrera S',
    type: 'Sports',
    fuel: 'Petrol',
    price: '₹1.8–2.1Cr',
    body_type: 'Coupe',
    useCase: 'Luxury performance, high-speed touring'
  },
  {
    brand: 'Lamborghini',
    model: 'Huracán Evo',
    type: 'Sports',
    fuel: 'Petrol',
    price: '₹3.2–3.5Cr',
    body_type: 'Coupe',
    useCase: 'Supercar performance, exotic driving'
  },
  {
    brand: 'Ferrari',
    model: '488 GTB',
    type: 'Sports',
    fuel: 'Petrol',
    price: '₹3.9Cr',
    body_type: 'Coupe',
    useCase: 'Track days, exotic show events'
  }
];

// Upload each car to Firestore
async function addCars() {
  try {
    for (const car of cars) {
      const docRef = await addDoc(collection(db, 'cars'), car);
      console.log(`Car (${car.make} ${car.model}) added with ID: ${docRef.id}`);
    }
  } catch (e) {
    console.error('Error adding cars:', e);
  }
}

addCars();
