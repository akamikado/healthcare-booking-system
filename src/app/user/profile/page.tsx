"use client"

import { useState, useEffect } from "react"
import { Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

export default function Profile(){

  const [name,setName] = useState("");

  const [age,setAge] = useState(0);

  const [birthDate,setBirthDate] = useState("");

  const [gender,setGender] = useState("");

  const [email,setEmail] = useState("")

  const [mobileNo,setMobileNo] = useState(0);

  const [invalid, setInvalid] = useState(false);

  const submitData = async () => {
    if(name == "" || age == 0 || birthDate == "" || gender == "" || mobileNo == 0){
      setInvalid(true);
      return;
    } 
    setInvalid(false);

    const res = await fetch('/api/user/profile',{
      method: 'POST',
      body: JSON.stringify({name,age,birthDate,gender,mobileNo,email})
    });

    const result = await res.json();

    if(result.err == false){

    }
  }

  useEffect(()=>{
    const fetchCurrentProfile = async ()=> {
      const req = await fetch(`/api/user/profile?email=${email}`);
      const result = await req.json();
      if(result.err == false){

      }
    }

  },[])

  return (
    <div >
      <h2 className="text-2xl font-bold tracking-wide content-center justify-center flex pt-6">Profile</h2>
      <div className="flex justify-center grid grid-cols-2">
        <h3 className="text-xl font-semibold flex justify-start">Name</h3>
        <Input
          isRequired
          size="sm"
          onChange={(e)=>setName(e.target.value)}
          className="w-25"
        />
      </div>
      <Input
        label="Age"
        isRequired
        size="sm"
        onChange={(e)=>{
          const value = e.target.value
          setAge(value as unknown as number)
        }}
      />
      <Input
        type="date"
        label="Date of Birth"
        size="sm"
        isRequired
        onChange={(e)=>setBirthDate(e.target.value)}
      />
      <Dropdown>
        <DropdownTrigger>
          <Button>
            {gender == "" ? "Select" : gender}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          onAction={(key) =>setGender(key as string)}
        >
          <DropdownItem key="Male">Male</DropdownItem>
          <DropdownItem key="Female">Female</DropdownItem>
        </DropdownMenu>
      </Dropdown> 
      <Input
        label="Email"
        isDisabled
        size="sm"
        value={email}
      />
      <Input
        type="tel"
        label="Mobile Number"
        size="sm"
        isRequired
        onChange={(e)=>{
          setMobileNo(e.target.value as unknown as number)
        }}
      />
      { invalid && "The form has invalid or empty entries"}
      <Button
        onClick={()=>{
          submitData()
        }}
      >
        Submit
      </Button>
    </div>
  )
}
