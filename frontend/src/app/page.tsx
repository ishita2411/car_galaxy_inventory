'use client'

import { useRouter } from 'next/navigation'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, setPersistence, browserLocalPersistence, connectAuthEmulator } from 'firebase/auth';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { useEffect, useState } from "react";


import * as m from "@mui/material";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhWiEV55ZGoLuhNptA5ukVtcD_SvYvIN0",
  authDomain: "car-galaxy-inventory.firebaseapp.com",
  projectId: "car-galaxy-inventory",
  storageBucket: "car-galaxy-inventory.appspot.com",
  messagingSenderId: "1088852511834",
  appId: "1:1088852511834:web:621de6a19da8bbb5cd9c63"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const auth_s = getAuth(firebaseApp);

export const auth_supervisor = getAuth(firebaseApp);
export const auth_staff = getAuth(firebaseApp);

export const functions = getFunctions(firebaseApp);
connectAuthEmulator(auth, 'http://127.0.0.1:9099');
connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export function isLoggedIn() {
    return auth.currentUser != null && !auth.currentUser.isAnonymous
  }

export function isSupervisorLoggedIn() {
return auth_supervisor.currentUser != null && !auth_supervisor.currentUser.isAnonymous
}
  

export default function app(){
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     setPersistence(auth, browserLocalPersistence).then(() => {
    //     setIsLoading(false);
    //     }).catch((error) => {
    //     console.log('error occurred...', error);
    //     });

    // });


    return (
        <m.Stack spacing={2} alignItems="center">
            <m.Box
      height={100}
      width={200}
      my={4}
      display="flex"
      alignItems="center"
      gap={4}
      p={2}>

    </m.Box>
            <m.Button variant="contained" onClick={() => router.push('/admin')}>Admin</m.Button>
                <m.Button variant="contained" onClick={() => router.push('/supervisor')}>Supervisor</m.Button>
                <m.Button variant="contained" onClick={() => router.push('/staff')}>Staff</m.Button> 
        
                

        </m.Stack>
            
    )
    
    
}