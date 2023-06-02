import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../Firebase/Firebase.config';
import axios from 'axios';

export const AuthContext = createContext()

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const loginUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const signOutUser = () =>{
        setLoading(true)
        return signOut(auth)
    }
    const updateUserProfile = (photo) =>{
        return updateProfile(auth, currentUser =>{
        photoURL: photo
        });
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser)
            setLoading(false)
            if (currentUser) {
                axios.post('http://localhost:3000/jwt', {email : currentUser.email})
                .then(data => {
                    localStorage.setItem('access-token', data.data.token)
                })
            } else {
                localStorage.removeItem('access-token')
            }
            
        })

        return () =>{
            unsubscribe()
        }
    },[])

    const authInfo = {
        loading,
        setLoading,
        user,
        setUser,
        createUser,
        loginUser,
        googleLogin,
        signOutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;