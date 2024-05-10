import { createApp } from 'vue';
import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 

createApp({
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            signupEmail: '',
            signupPassword: '',
        };
    },
    methods: {
        async login() {
            try {
                await signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword);
                console.log("User logged in");
                // Redirect or perform some action upon login
            } catch (error) {
                console.error("Login error:", error.message);
            }
        },
        async signup() {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, this.signupEmail, this.signupPassword);
                console.log("User created");
                // Store additional user details in Firestore
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    email: this.signupEmail,
                    // Add any additional fields you require
                });
                // Redirect or perform some action upon signup
            } catch (error) {
                console.error("Signup error:", error.message);
            }
        }
    }
}).mount('#app');
