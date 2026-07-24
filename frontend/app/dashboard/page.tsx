"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "@/src/services/auth";


export default function DashboardPage() {

    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);


    useEffect(() => {

        const loadData = async () => {

            try {

                // Get logged in user
                const userData = await getCurrentUser();

                setUser(userData);


                // Get Instagram Profile

                const token = localStorage.getItem(
                    "access_token"
                );


                const response = await fetch(
                    "http://127.0.0.1:8000/api/profile/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );


                const profileData = await response.json();


                setProfile(profileData);


            }
            catch(error){

                console.error(
                    "Dashboard loading error",
                    error
                );

                router.push("/login");

            }

        };


        loadData();


    },[router]);



    const logout =()=>{

        localStorage.removeItem(
            "access_token"
        );


        document.cookie =
        "access_token=; path=/; max-age=0;";


        router.push("/login");

    };



    if(!user){

        return (
            <div>
                Loading User...
            </div>
        );

    }



    return (

        <div style={{padding:"40px"}}>


            <h1>
                🚀 Mission IG Follower Dashboard
            </h1>


            <h2>
                Welcome {user.full_name || user.username}
            </h2>


            <p>
                Email: {user.email}
            </p>



            <hr />



            <h2>
                Instagram Profile
            </h2>


            <p>
                Username:
                {
                    profile?.instagram_username || 
                    "Not Connected"
                }
            </p>


            <div style={{
                display:"flex",
                gap:"30px",
                marginTop:"30px"
            }}>


                <div>
                    <h3>
                        Followers
                    </h3>

                    <h2>
                        {profile?.followers || 0}
                    </h2>

                </div>



                <div>
                    <h3>
                        Posts
                    </h3>

                    <h2>
                        {profile?.posts || 0}
                    </h2>

                </div>



                <div>
                    <h3>
                        Engagement
                    </h3>

                    <h2>
                        {profile?.engagement || 0}%
                    </h2>

                </div>


            </div>




            <button
                onClick={logout}
                style={{
                    marginTop:"40px"
                }}
            >

                Logout

            </button>


        </div>

    );

}