'use client'


import { useEffect, useState } from "react";
import { auth, isSupervisorLoggedIn, db, functions, isLoggedIn} from "../../page";
import { useRouter } from 'next/navigation'
import { httpsCallable } from "firebase/functions";

import * as m from "@mui/material";




export default function supervisor(){

    const router = useRouter()

    const [newVal, setNewVal] = useState<string | undefined>(undefined);
    const [option, setOption] = useState('company');
    // const [hideAddDetails, setHideAddDetails] = useState(false);
    // const [hideAddCompProd, setHideAddCompProd] = useState(false);

    // const [action, setAction] = useState('newProdComp')

    const [itemName, setItemName] = useState<string | undefined>(undefined);
    const [productGrp, setProductGrp] = useState('');
    const [company, setCompany] = useState('');
    const [supplier, setSupplier] = useState<string | undefined>(undefined);
    const [price, setPrice] = useState<string | undefined>(undefined);


    const [companies, setCompanies] = useState([]);
    const [products, setProducts] = useState([]);

    const [alignment, setAlignment] = useState('web');
    const [action, setAction] = useState('newProdComp')


    const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
    ) => {
        console.log(newAlignment)
        setAction(newAlignment);
        console.log(newAlignment)

    };

    useEffect(() => {
        // if (!isLoggedIn()){
        //     router.push('/error')
            
        // }

        // const getRoleFunction = httpsCallable(functions, "getRole");
        //             getRoleFunction({
        //                 'uid':auth.currentUser!.uid!
        //             }).then((data) => {
        //                 const x = JSON.stringify(data)
        //                 const d = JSON.parse(x)
        //                 if (d.data.role === 'supervisor'){
        //                     const role ='supervisor'
        //                 }
        //                 else{
        //                     router.push('/error')
        //                 }
        //             }).catch((error) => {
        //                 router.push('/error')
        //             })

        const getCompaniesFunction = httpsCallable(functions, "getCompanies");
                getCompaniesFunction().then((data) => {
                            console.log(data)
                            setCompanies(data.data.data)
                        }).catch((error) => {
                            router.push('/error')
                        })

        const getProductsFunction  = httpsCallable(functions, "getProducts");
                getProductsFunction().then((data) => {
                            setProducts(data.data.data)
                        }).catch((error) => {
                            router.push('/error')
                        })
    }, []);
    // useEffect(()=>{console.log('its a change')});


    function addCompanyOrProduct(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        console.log(option)
        console.log(companies)
        console.log(products)
        const addCompProdFunction = httpsCallable(functions, "addCompProd");
                    addCompProdFunction({
                        'option' : option,
                        'value' : newVal
                    }).then((data) => {
                        if (option === "company"){                            
                            let new_data = {'newcompany' : newVal}
                            console.log(new_data)
                            const comp = companies
                            comp.push(new_data)
                            setCompanies(comp)
                        }
                        else{
                            
                            let new_data = {'newproduct' : newVal}
                            console.log(new_data)
                            const prod = products
                            prod.push(new_data)
                            setProducts(prod)
                            
                        }
                    }).catch((error) => {
                        console.log("Error adding new product/ company ", error.code, error.message);
                        alert("Error adding new product/ company. Please try again.");
                    })
    }

    const selectAddDetails = () =>{
        setAction('newItem')
    }

    const selectAddCompanyOrProduct = () => { 
        setAction('newProdComp')
    }

    function additemDetails(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        // console.log(itemName, company, productGrp, price, supplier)
        const addItemDetailsFunction  = httpsCallable(functions, "addItemDetails");
        addItemDetailsFunction({
                        'itemName' : itemName,
                        'productGrp' : productGrp,
                        'company': company
                    }).then((data) => {
            console.log('wtf')
                        }).catch((error) => {
                            router.push('/error')
                        })
    }

    const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOption((event.target as HTMLInputElement).value);
      };

    
    return (
        <m.Stack>
                <m.ToggleButtonGroup
                    color="primary"
                    value={action}
                    exclusive
                    fullWidth
                    aria-label="Platform">
                    <m.ToggleButton onClick={selectAddCompanyOrProduct}  value="newProdComp">Add new Product Group or Company</m.ToggleButton>
                    <m.ToggleButton onClick={selectAddDetails} value="newItem">Add New Item</m.ToggleButton>
                </m.ToggleButtonGroup>

           {action === 'newItem'?<m.Stack></m.Stack>:<m.Stack alignItems="center" spacing={2}>
           <m.Typography variant="h4" >
                    New Company or Product
            <m.Divider orientation="horizontal" variant="fullWidth"/> 
            </m.Typography>
            
                <form onSubmit={addCompanyOrProduct}>
                    <m.Stack spacing={2}>
                    <m.FormControl>
                        <m.RadioGroup
                            row
                            defaultValue="company"
                            value={option}
                            onChange={handleOptionChange}
                        >
                            <m.FormControlLabel value="company" control={<m.Radio />} label="Company" />
                            <m.FormControlLabel value="product" control={<m.Radio />} label="Product" />
                        </m.RadioGroup>
                    </m.FormControl>

                    <m.TextField type="text" label="Enter Value" required onChange={(event) => setNewVal(event.target.value)} />
                    <m.Button type="submit">Add New Value</m.Button>
                    </m.Stack>
                </form>
                </m.Stack>}





            {action ==="newProdComp"?<m.Stack></m.Stack>:<m.Stack spacing={2} alignItems={"center"}>
            <m.Typography variant="h4" >
                    Add Product Details
            <m.Divider orientation="horizontal" variant="fullWidth"/> 
            </m.Typography>
            <m.Box
      width={600}
      my={4}
      alignItems="center"
      gap={4}
      p={2}
    >
    

                <form onSubmit={additemDetails}>
                    <m.Stack spacing={2}>
                    <m.TextField type="text" label="Item Name" required onChange={(event) => setItemName(event.target.value)} />
                    
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
                    </m.Stack>
{/* 
                    <m.TextField type="text" label="Supplier" required onChange={(event) => setSupplier(event.target.value)} />
                    <m.TextField type="text" label="Price" required onChange={(event) => setPrice(event.target.value)} /> */}

                    <m.Button type="submit">Submit details</m.Button>


                    </m.Stack>


                    
                </form>
                </m.Box>
                </m.Stack>}
        
        </m.Stack>
    )
    
    
}