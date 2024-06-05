"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import prisma from "@repo/db/client";
import { Select } from "@repo/ui/select";
import { getMerchants, getUsers } from "../app/lib/action";
import { Spinner } from "@repo/ui/spinner";
import { Toast } from "@repo/ui/toast";

const BACKEND_URL="http://ec2-16-171-169-198.eu-north-1.compute.amazonaws.com:3001"



export function MerchantCard() {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState(0);
    const router=useRouter();
    const [merchants,setMerchants]=useState<{name:string}[]>([]);
    const [toast,setToast]=useState(false);
   

    useEffect(()=>{
        //@ts-ignore
        getMerchants().then((val)=>setMerchants(val))   
    },[])

  
    return <div className="h-[90vh]">
       
            <Card title="Send">
                <div className="min-w-72 pt-2">
                    <div>
                        Merchant
                    </div>

                    <Select  onSelect={(val)=>setName(val)}  options={merchants.map(x => ({
                        key: x.name,
                        value: x.name
                    }))} />


                    
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(Number(value))
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            const res=await axios.post(`${BACKEND_URL}/api/merchant`,{
                                amount:amount*100,
                                to:name
                            })
                            setToast(true)

                            
                            setTimeout(()=>setToast(false),3000)
                            
                            setTimeout(()=>{
                                router.push("/dashboard")
                            },5000)
                           

                        }}>Send</Button>
                    </div>
                    
                </div>
            </Card>
            {toast?<Toast />:<></>}
            
        
       </div>
}

























