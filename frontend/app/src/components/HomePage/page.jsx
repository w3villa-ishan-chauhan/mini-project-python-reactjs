import React from 'react'
import "./HomePage.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import 'normalize.css';
import { useEffect, useState } from "react";
import { get_user_details } from "../../api/api";
import ProfileImage from "../ProfileImage/page";
import { useAuth } from '../../context/authcontext';
import MapComponent from '../Maps/page';
import DownloadProfile from '../DownloadProfile/page';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from "../Payment/page";
import { toast } from 'react-toastify';

const stripe_access_key = process.env.REACT_APP_STRIPE_PUBLIC_KEY
const stripePromise = loadStripe(stripe_access_key);
console.log("stripePromise ", stripePromise)

function HomePage() {
    const { authState, token, logout, setUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profileImageUrl, setProfileImageUrl] = useState('');

    console.log('Token updated:', token);
    useEffect(() => {
        if (token) {
            console.log('Token updated:', token);
            localStorage.setItem("access_token", token);
            const fetchUserDetails = async () => {
                try {
                    const userData = await get_user_details(token);
                    setUser({ user: userData });
                    setProfileImageUrl("true");

                    console.log("userData:", userData);
                    console.log("profileImgurl:", profileImageUrl);

                } catch (error) {
                    console.error("Failed to fetch user details:", error);
                    logout();
                }
                finally {
                    setLoading(false); // Set loading to false after fetching or error
                }
            };
            fetchUserDetails();
        } else {
            localStorage.removeItem("access_token");
        }

    }, [token]);
    // const email = authState.user?.data.email || 'No email available';
    const handleLogout = () => {
        logout();
    }
    const handleDownload = () => {

        DownloadProfile(authState.user.data)
    }
    console.log(authState)
    return (
        <body className="home">

            <section className='home' >
                <div className="text-center">
                    <div id="slide" className="hide">
                        <div className="dashboard">
                            <div className="profile-column container-fluid">
                                <div className="row row-top justify-content-center">
                                    <div className=" col profile m-2">
                                        <div>
                                            {loading ? (
                                                <p>Loading...</p>
                                            ) : (
                                                <img src={`${authState.user.data.profile_image ? authState.user.data.profile_image : "https://as2.ftcdn.net/v2/jpg/01/97/15/87/1000_F_197158744_1NBB1dEAHV2j9xETSUClYqZo7SEadToU.jpg"}`}></img>
                                            )}
                                        </div>
                                        {profileImageUrl &&
                                            <div className="profileImage">
                                                <ProfileImage />
                                            </div>}
                                    </div>
                                </div>

                                <div className="row row-bottom justify-content-center">

                                    <button className="logoutButton" onClick={handleLogout}>Logout</button>

                                </div>
                            </div>
                            <div className="responsive-container container-fluid">
                                <div className="middlebar container-fluid">
                                    <div className="row mt-2 header-section">
                                        <div className='col heading'>
                                            <h2>Mini Project</h2>
                                        </div>

                                        <div className="col notification">
                                            {loading ? (<p>Loading...</p>) :
                                                (
                                                    authState.user.data.subscription_type === 'Gold' ? (
                                                        <button
                                                            type="button"
                                                            className="btn btn-primary notification-button"
                                                            onClick={handleDownload}
                                                        >
                                                            Download
                                                        </button>
                                                    ) : (
                                                        <div className='disable-download-section'>

                                                            <button
                                                                type="button"
                                                                className="btn btn-primary btn-disabled"
                                                                onClick={() => { toast.error("Upgrade your plan to Gold") }}
                                                            >
                                                                Download
                                                            </button>
                                                        </div>

                                                    )
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="row send-money">
                                        <div className="row send-money-heading">
                                            <p className="h6">Address and Location</p>
                                        </div>

                                        <div className="address-section m-0 p-0">
                                            <MapComponent />
                                        </div>

                                    </div>
                                    <div className="row payment-container ">
                                        <div className="row send-money-heading">
                                            <p className="h6">Upgrade Your Plan</p>
                                        </div>
                                        <div className="row payment-section mx-1">
                                            <Elements stripe={stripePromise}>
                                                <Payment />
                                            </Elements>
                                        </div>

                                    </div>

                                </div>
                                <div className="rightbar container-fluid">
                                    <div>
                                        <div className="heading mt-4">
                                            {loading ? (
                                                <p>Loading...</p> // Fixed the closing tag
                                            ) : (
                                                <div>
                                                    <p className="h6">Hello, {authState.user.data.email}</p>
                                                    <p className="small-grey text-warning">Active plan : {authState.user.data.subscription_type}</p>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>

    );
}
export default HomePage;