'use client'
import { useRouter } from 'next/navigation'
export default function addUsers(){
    const router = useRouter()
    

  
    return (
        
        <div>
            You are not allowed access to this page
            <button onClick={() => router.push('/')}>Return to home</button>
        </div>
    )
    
    
}