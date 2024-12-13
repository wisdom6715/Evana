import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { useRouter } from "next/navigation";


const useThirdpartyAuth = () => {
    const providerGoogle = new GoogleAuthProvider();
    const providerMicrosoft = new OAuthProvider('microsoft.com');
    const router = useRouter()
    const auth = getAuth();

    /// Google Authentication
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            
            // The signed-in user info.
            const user = result.user;
            router.push('/welcome')
            // Additional user info provided by the sign-in provider.
            // IdP data available using getAdditionalUserInfo(result)
            // You can add any additional info handling here
            console.log(user, token);
        } catch (error: any) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            
            // The email of the user's account used.
            const email = error.customData.email;
            
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            
            // You can handle or log the error details as needed
            console.error(`Error: ${errorCode} - ${errorMessage}`);
            console.error(`User email: ${email}`);
        }
    };

    /// Microsoft Authentication Provider
    const handleMicrosoftSignin = async () =>{
        try{
            const result = await signInWithPopup(auth, providerMicrosoft)
            // User is signed in.
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            const idToken = credential?.idToken;
            router.push('/welcome')
        }catch (err) {
            console.error(err);
            
        }

    }
    // returns from the custom hook function
    return {
        handleGoogleSignIn,
        handleMicrosoftSignin
    }
}

export default useThirdpartyAuth