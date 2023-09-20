import React, { useState,useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { Helmet } from "react-helmet"
import Location from './Location'
import UserInfoComponent from './UserInfo.jsx';
import UserHistoryComponent from './UserHis.jsx';

// import { useParams } from 'react-router-dom'
import './UserProfile.css'


const ProfileBio = ({ currentProfile}) => {
    
    const [points, setPoints] = useState(0);
    const [showHistory, setShowHistory] = useState(false);
    
    const Points = async () => {
        try {
          // Retrieve 'Profile' data from local storage
          const profileData = JSON.parse(localStorage.getItem('Profile'));
      
          if (!profileData) {
            console.error('Profile data not found in local storage');
            return;
          }
      
          const response = await fetch("https://stackoverflow-clone-server-mv3m.onrender.com/answer/points", {
            method: "POST",
            headers: {
              'Content-Type': "application/json"
            },
            body: JSON.stringify({ profileData }) // Send the 'Profile' data in the request body
          });
      
          const json = await response.json();
          setPoints(json.points);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      
      useEffect(() => {
        Points();
      }, []);

      
      
    
    return (
        <div>
           
            <div>
                {
                    currentProfile?.tags.length !==0 ? (
                        <>
                            <h4>Tags Watched</h4>
                            {
                                currentProfile?.tags.map((tag) => (
                                    <p key={tag}> { tag }</p>
                                ))
                            }
                        </>
                    ):(
                    <p>0 tags watched</p> 
                    )
                }
            </div>
            <div>
                {
                    currentProfile?.about ? (
                        <>
                        <h4>About</h4>
                        <p>{ currentProfile?.about}</p>  
                        </>
                    ) : (
                        <p>No bio found</p>
                    )
                }

            </div>
            <h4>Achievements</h4>
            <div>Points: {points}</div>
            
            <div>
                <UserInfoComponent />

                {/* Button to toggle user history visibility */}
                <button style={{display:'block'}} onClick={() => setShowHistory(!showHistory)}>
                    {showHistory ? 'Hide History' : 'Show History'}
                </button>

                {/* Display UserHistoryComponent if showHistory is true */}
                {showHistory && <UserHistoryComponent />}
            </div>
          
            <Location />
          



        </div>
    )
}

export default ProfileBio