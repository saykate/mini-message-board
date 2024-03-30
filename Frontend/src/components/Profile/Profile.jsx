import styles from "./Profile.module.css";
import { React, useState, useEffect } from "react"
import useAuthContext from "../../hooks/useAuthContext";
import { useParams } from "react-router-dom";

const Profile = () => {
  const { username, token } = useAuthContext()
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState()
  const params = useParams()
  console.log(params)

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users/${params.id}`, {
        headers: {
          Authorization: token,
        },
      });
      const res = await response.json();
      console.log("Data", res);

      setUser(res.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={styles.profileContainer}>
      <div className={styles.mainCard} >
        <h1 className={styles.h1}>Profile</h1>
        <h2>User: {user.username}</h2>
      </div>
    </div>
  );
}

export default Profile;
