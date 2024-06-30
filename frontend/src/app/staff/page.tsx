

// Import the functions you need from the SDKs you need
// import { useRouter } from 'next/navigation'
'use client'


import { useEffect, useState } from "react";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn,  auth_s } from "../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
// import { signInWithEmailAndPassword } from 'firebase/auth';

import * as m from "@mui/material";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



export default function addUsers(){

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const router = useRouter()
    const [errorMsg, setErrorMsg] = useState('')



    function signInStaff(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if (email === undefined || password === undefined) {
            return;
        }

        signInWithEmailAndPassword(auth, email, password).then((userCred) => {
            console.log('User Signed In')
            console.log(isLoggedIn())
            // console.log(isSupervisorLoggedIn())
            const getRoleFunction = httpsCallable(functions, "getRole");
                    getRoleFunction({
                        'uid':userCred.user.uid
                    }).then((data) => {
                        const x = JSON.stringify(data)
                        const d = JSON.parse(x)
                        if (d.data.role === 'staff'){
                            router.push('/staff/getProducts')
                        }
                        else{
                            setErrorMsg('This user does not have access to the Supervisor page')
                        }
                    }).catch((error) => {
                        console.log('oops')
                        console.log("Error adding user ", error.code, error.message);
                        setErrorMsg("Cannot access role of this user");
                    })
            
            
        }).catch((error) => {
            setErrorMsg("Error signin in: "+ error.code + ' ' + error.message);
        });
        


    }
    
        


  
    return (
        <m.Stack alignItems="center" spacing={2} >
            <m.Typography variant="h4" >
              Staff
          <m.Divider orientation="horizontal" variant="fullWidth"/>   
          </m.Typography>         

            <form onSubmit={signInStaff}>
                <m.Stack spacing={2} >
                    <m.TextField type="text" label="Email" required onChange={(event) => setEmail(event.target.value)} />
                    <m.TextField type="password" label="Password" required onChange={(event) => setPassword(event.target.value)} />
                    <m.Button type='submit'>Sign In</m.Button>
                </m.Stack >
            </form> 
            <m.Typography variant="h5" color="error" >
            {errorMsg}
          </m.Typography>

          
        </m.Stack>
    )
    
    
}