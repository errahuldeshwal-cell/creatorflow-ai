"use client";


import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  getCurrentUser,
  updateProfile
} from "@/src/services/auth";



export default function ProfilePage(){


  const router = useRouter();


  const [username,setUsername] = useState("");

  const [fullName,setFullName] = useState("");

  const [email,setEmail] = useState("");

  const [message,setMessage] = useState("");



  useEffect(()=>{


    const loadProfile = async()=>{


      try{


        const user = await getCurrentUser();


        setUsername(
          user.username
        );


        setFullName(
          user.full_name || ""
        );


        setEmail(
          user.email
        );


      }
      catch(error){


        console.error(error);

        router.push("/login");


      }


    };


    loadProfile();


  },[router]);





  const saveProfile = async()=>{


    try{


      const response = await updateProfile({

        username,

        full_name: fullName

      });



      console.log(response);



      setMessage(
        "✅ Profile Updated Successfully"
      );


    }
    catch(error){


      console.error(error);


      setMessage(
        "❌ Profile Update Failed"
      );


    }


  };





  return (

    <div

      style={{

        maxWidth:"500px",

        margin:"50px auto",

        padding:"30px"

      }}

    >


      <h1>

        👤 My Profile

      </h1>



      <hr />



      <label>

        Username

      </label>


      <input

        value={username}

        onChange={(e)=>

          setUsername(e.target.value)

        }

      />



      <br/><br/>




      <label>

        Full Name

      </label>


      <input

        value={fullName}

        onChange={(e)=>

          setFullName(e.target.value)

        }

      />



      <br/><br/>




      <label>

        Email

      </label>


      <input

        value={email}

        disabled

      />



      <br/><br/>




      <button

        onClick={saveProfile}

      >

        Save Profile

      </button>




      <p>

        {message}

      </p>




    </div>

  );


}