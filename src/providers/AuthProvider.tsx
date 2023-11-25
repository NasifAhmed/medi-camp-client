import { ReactNode, createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    signInWithPopup,
    updateProfile,
    User,
    UserCredential,
} from "firebase/auth";
import app from "../config/firebase.config.ts";
// import { useAxios } from "../hooks/useAxios";

// Types
type createUser = (email: string, password: string) => Promise<UserCredential>;
type signIn = (email: string, password: string) => Promise<UserCredential>;
type updateUser = (
    user: User,
    displayName: string,
    photoURL: string
) => Promise<void>;
type authContextValues = {
    user: User | null;
    loading: boolean;
    createUser: createUser;
    signIn: signIn;
    logOut: () => Promise<void>;
    updateUser: updateUser;
    googleSignIn: () => Promise<UserCredential>;
};

export const AuthContext = createContext<authContextValues | null>(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    // const axios = useAxios();
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (currentUser: User | null) => {
                console.log("user in the auth state changed", currentUser);
                setUser(currentUser);
                setLoading(false);
            }
        );
        return () => {
            unSubscribe();
        };
    }, []);

    const createUser = (email: string, password: string) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email: string, password: string) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const updateUser = (user: User, displayName: string, photoURL: string) => {
        setLoading(true);
        return updateProfile(user, { displayName, photoURL });
    };

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUser,
        googleSignIn,
    };
    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
