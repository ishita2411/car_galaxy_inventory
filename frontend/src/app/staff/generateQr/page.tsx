

// Import the functions you need from the SDKs you need
// import { useRouter } from 'next/navigation'
'use client'

import * as m from "@mui/material";
import { httpsCallable } from "firebase/functions";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn,  auth_s } from "../../page";
import { useEffect, useState } from "react";
import { saveAs } from 'file-saver';






export default function addUsers(){

    useEffect(() => {}, [])
    const [image, setImage] = useState('');
    var FileSaver = require('file-saver');

    function generateQRFunction() {
        const generateQrCodeFunction = httpsCallable(functions, "generateQrCode");
        generateQrCodeFunction({
                    }).then((data) => {
                        setImage('data:image/png;base64,'+data.data.base64)
                    }).catch((error) => {
                        console.log('oops')
                    })
    }

    function downloadImage(){
        FileSaver.saveAs(image, "hello.png");

    }
        


  
    return (
        <m.Stack alignItems="center" spacing={2} >
            <m.Typography variant="h4" >
              <m.Button onClick={generateQRFunction}>Press this button</m.Button>
              <img src = {image} />
              <m.Button onClick={downloadImage}>Download image</m.Button>
          <m.Divider orientation="horizontal" variant="fullWidth"/>          

          </m.Typography>  
        </m.Stack>
    )
    
    
}