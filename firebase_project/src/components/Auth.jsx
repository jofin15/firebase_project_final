import { useState } from "react"
import { auth,googleProvider } from "../config/conf"
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from "firebase/auth"




export const Auth=()=>{

    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    console.log(auth?.currentUser?.photoURL)
    const signIn=async()=>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
            
        } catch (error) {
            console.log(error );
        }

    }

    const logOut=async()=>{
        try {
            await signOut(auth)
            
        } catch (error) {
            console.log(error );
        }

    }

    const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
        } catch (err) {
          console.error(err);
        }
      };
      
    return (
        <div>
            <p>Email</p>
            <input placeholder="email.." onChange={(e)=>setEmail(e.target.value)}/>
            <p>Password</p>
            <input placeholder="password ... " onChange={(e)=>setPassword(e.target.value)} type="password" />
            <br />
            <br />
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign In With Google </button>
            <button onClick={logOut}>LogOut</button>
        </div>
    )
}

