import axios from "axios"
import React, { useContext, useState, useEffect, useCallback } from "react"
import { UserContext} from "../context/UserContext"
import Profile from "../components/Profile"
import {ProfileFuncContext } from "../context/ProfileFuncContext"
import { Grid, Button } from "@mui/material"
import Input from "../components/Input"
import UserList from "../components/UserList"

function ProfilePage() {
    const [users, setUsers] = useState([])
    const [userProfile, setUserProfile] = useState([])
    const {user} = useContext(UserContext)

    /* 
        function that returns user profile information
    */
    const getUser = useCallback(async () => {
        axios.get("/get-user", {
            params: {
                userID: user.userID,
            }
        }).then((resp) => {
            console.log("got user: ", user.userID)
            console.log(resp.data.user)
            setUserProfile(resp.data.user)
        }).catch((err) => {
            console.log(err)
        })
    },[user]);

    /* 
        function that gets all users -- only available to admins
    */
    const getAllUsers = async () => {
        axios.get("/users"
        ).then((resp) => {
            console.log("got all users")
            console.log(resp.data.rows)
            setUsers(resp.data.rows)
        }).catch((err) => {
            console.log("ERROR: ", err)
        })
    }

    useEffect(() => {
        if (!user || user.userID === '') return

        console.log("profile page useEffect()", user)
        getUser()
        getAllUsers()
    }, [getUser, user])

    const updateUser = (userInfo) => {
        console.log("updateUser", userInfo)
        axios.post("/update-user", userInfo)
            .then(resp => {
                console.log(resp)
                getUser()
            })
            .catch(err => {
                console.log(err)
            })
    }

    /* 
        function that updates any specific user -- only available to admins
    */
    const updateUserAdmin = (userInfo) => {
        console.log("updateUserAdmin", userInfo)
        axios.post("/update-user-admin", userInfo)
            .then(resp => {
                console.log(resp)
                getAllUsers()
            })
            .catch(err => {
                console.log(err)
            })
    }

    /* 
        function that deletes any specific user -- only available to admins
    */
    const deleteUser = ( usrID ) => {
        console.log("Deleting User", usrID)

        axios
            .post("/delete-user", {
                userID: usrID
            })
            .then((res) => {
                console.log("deleted user!")
                console.log(res)
                getAllUsers()
            })
            .catch(err => console.log(err))
    }

    const adminAddUser = (usr) => {
        console.log("adminAddUser()", usr)
        axios.post("/createAccount", usr)
            .then(resp => {
                console.log(resp)
                getAllUsers()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const functions = {
        updateUser,
        updateUserAdmin,
        deleteUser,
        adminAddUser,
    }


    return (
       <div className="ProfilePage" style={{
            display: "flex",
            justifyContent: "center",
        }}>
    {/* // <div> */}
            <ProfileFuncContext.Provider value={functions}>
                <Profile userProfile = {userProfile}></Profile>
                {user.isAdmin && <UserList users = {users}></UserList>
                }
            </ProfileFuncContext.Provider>
         </div>
    )
}

export default ProfilePage