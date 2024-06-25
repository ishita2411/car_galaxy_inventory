

// Import the functions you need from the SDKs you need
// import { useRouter } from 'next/navigation'
'use client'

import { functions } from "@/app/page";
import * as m from "@mui/material";




export default function addUsers(){
    function generateQRFunction() {
        console.log('oops')
    }
        


  
    return (
        <m.Stack alignItems="center" spacing={2} >
            <m.Typography variant="h4" >
              <m.Button onClick={generateQRFunction}>Press this button</m.Button>
          <m.Divider orientation="horizontal" variant="fullWidth"/>          

          </m.Typography>  
        </m.Stack>
    )
    
    
}