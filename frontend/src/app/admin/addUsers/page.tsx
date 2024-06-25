'use client'
import { useEffect, useState } from "react";
import { auth, db, functions, isLoggedIn,  auth_s } from "../../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";

// Import the functions you need from the SDKs you need
// import { useRouter } from 'next/navigation'
import * as m from "@mui/material";


import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";



export default function addUsers(){
    const router = useRouter()

    // useEffect(() => {
    //     if (!isLoggedIn()){
    //         router.push('/error')
    //     }
    // }, []);

    const [email, setEmail] = useState<string | undefined>(undefined);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const [value,setValue]=useState('');
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setsuccessMsg] = useState('')

    function addUserOnClick(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        // console.log(email, password, value)
        
        if (email === undefined || password === undefined) {
            return;
        }




        createUserWithEmailAndPassword(auth_s, email, password).then((userCred) => {
            // console.log(userCred.user.uid)
            const addUserFunction = httpsCallable(functions, "addUser");
                    addUserFunction({
                        'uid':userCred.user.uid,
                        'role' : value
                    }).then((data) => {
                        setsuccessMsg("Successfully added User");
                        setErrorMsg('')
                    }).catch((error) => {
                        alert("Error adding user. Please try again.");
                    })
            signOut(auth_s).then(() => {
                // console.log('this is necesssary')
            }).catch((error) => {
                // alert("error in logging out");

            })
        }).catch((error) => {
            setErrorMsg("User already exists. Please try again.");
            setsuccessMsg('')
        });
        
        
    }


  
    return (
        <m.Stack alignItems="center" spacing={2} >
            <m.Typography variant="h4" >
            Add Users
          <m.Divider orientation="horizontal" variant="fullWidth"/> 
          </m.Typography> 


            <form onSubmit={addUserOnClick}>
            <m.Stack spacing={2} >
            <m.TextField type="text" label="Email" required onChange={(event) => setEmail(event.target.value)} />
            <m.TextField type="password" label="Password" required onChange={(event) => setPassword(event.target.value)} />
      <m.FormControl fullWidth >
        <m.InputLabel id="role">role</m.InputLabel>
        <m.Select
          labelId="role"
          value={value}
          label="role"
        onChange={(event) => setValue(event.target.value)} required

        >
          <m.MenuItem value="supervisor">supervisor</m.MenuItem>
          <m.MenuItem value="staff">staff</m.MenuItem>
        </m.Select>
      </m.FormControl>

                <m.Button type="submit">Add User</m.Button>
                </m.Stack>
            </form>
            <m.Typography variant="h5" color="green" >
            {successMsg}
            </m.Typography>

            <m.Typography variant="h5" color="error" >
            {errorMsg}
          </m.Typography>
        </m.Stack>
    )
    
    
}