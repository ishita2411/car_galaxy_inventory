'use client'


import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";
import { auth, db, functions, isLoggedIn,  auth_s } from "../../page";


import * as m from "@mui/material";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";




export default function addUsers(){


    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);
    const [productGrp, setProductGrp] = useState('');
    const [company, setCompany] = useState('');
    const [items, setItems] = useState(false)

    useEffect(() => {
        const getCompaniesFunction = httpsCallable(functions, "getCompanies");
                getCompaniesFunction().then((data) => {
                            console.log(data)
                            setCompanies(data.data.data)
                        }).catch((error) => {
                            console.log('error')
                            // router.push('/error')
                        })

        const getProductsFunction  = httpsCallable(functions, "getProducts");
                getProductsFunction().then((data) => {
                    console.log(data)

                            setProducts(data.data.data)
                        }).catch((error) => {
                            console.log('error')

                        })

    }, []);

    function getItems(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(productGrp, company)

        const getAllProductsFunction  = httpsCallable(functions, "getAllProducts");
        getAllProductsFunction({
                        'productGrp' : productGrp,
                        'company': company
                    }).then((data) => {
                            setItems(data.data.data)
                            console.log(data)
                        }).catch((error) => {
                            console.log('oops')
                        })

    }
        


  
    return (
        <m.Stack alignItems="center" spacing={2} >
            <m.Typography variant="h4" >
              Get Products
          <m.Divider orientation="horizontal" variant="fullWidth"/>        
          </m.Typography>  
          <m.Box
            width={600}
            my={4}
            alignItems="center"
            gap={4}
            p={2}
            >
          <form onSubmit={getItems}>
                    
                    <m.Stack direction={"row"} spacing={2}>

                    <m.FormControl fullWidth  >
                            <m.InputLabel id="productGrp">Product Group</m.InputLabel>
                            <m.Select
                            labelId="productGrp"
                            value={productGrp}
                            label="role"
                            onChange={(event) => setProductGrp(event.target.value)} required
                            >

                                {
                                    products.map((product) => <m.MenuItem value={product['newproduct']} key={product['newproduct']}>{product['newproduct']}</m.MenuItem>)
                                }
                            
                            </m.Select>
                    </m.FormControl>

                    <m.FormControl fullWidth >
                            <m.InputLabel id="company">Company</m.InputLabel>
                            <m.Select
                            labelId="company"
                            value={company}
                            label="role"
                            onChange={(event) => setCompany(event.target.value)} required
                            >

                                {
                                    companies.map((company) => <m.MenuItem value={company['newcompany']} key={company['newcompany']}>{company['newcompany']}</m.MenuItem>)
                                }
                            
                            </m.Select>
                    </m.FormControl>
                    <m.Button type="submit">Submit details</m.Button>

{/* 
                    <m.TextField type="text" label="Supplier" required onChange={(event) => setSupplier(event.target.value)} />
                    <m.TextField type="text" label="Price" required onChange={(event) => setPrice(event.target.value)} /> */}

                    


                    </m.Stack>


                    
                </form>
                </m.Box>
                {
                    items && <m.Stack spacing={2}>
                    
    
                                    {
                                        items.map((item) => <m.Typography key={item['itemName']}>{item['itemName']}</m.Typography>)
                                    }
              
    
                    </m.Stack>
                }

                


        </m.Stack>
    )
    
    
}