import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    OAuthProvider, 
    AuthError 
} from "firebase/auth";
import { useRouter } from "next/navigation";

const useThirdpartyAuth = () => {
    const router = useRouter();
    const providerGoogle = new GoogleAuthProvider();
    const providerMicrosoft = new OAuthProvider('microsoft.com');
    
    const auth = getAuth();

    /// Google Authentication
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, providerGoogle);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            
            // The signed-in user info.
            const user = result.user;
            router.push('/welcome')
            // Additional user info provided by the sign-in provider.
            // IdP data available using getAdditionalUserInfo(result)
            // You can add any additional info handling here
            router.replace('/welcome')
            console.log(user, token);
        } catch (error) {
            // Type assertion to handle Firebase authentication errors
            const authError = error as AuthError;
            
            // Handle Errors here.
            const errorCode = authError.code;
            const errorMessage = authError.message;
            
            // You can handle or log the error details as needed
            console.error(`Google Sign-In Error: ${errorCode} - ${errorMessage}`);
            
            // Optionally, you can add more specific error handling
            if (errorCode === 'auth/popup-closed-by-user') {
                console.log('Sign-in popup was closed by the user');
            }
        }
    };

    /// Microsoft Authentication Provider
    const handleMicrosoftSignin = async () => {
        try {
            const result = await signInWithPopup(auth, providerMicrosoft);
            // User is signed in.
            const credential = OAuthProvider.credentialFromResult(result);
            const accessToken = credential?.accessToken;
            const idToken = credential?.idToken;

            // If necessary, use these tokens for additional handling or logging
            console.log("Microsoft Access Token:", accessToken);
            console.log("Microsoft ID Token:", idToken);

            router.replace('/welcome');
        } catch (error) {
            // Type assertion to handle Firebase authentication errors
            const authError = error as AuthError;
            
            console.error(`Microsoft Sign-In Error: ${authError.code} - ${authError.message}`);
            
            // Optionally, you can add more specific error handling
            if (authError.code === 'auth/popup-closed-by-user') {
                console.log('Sign-in popup was closed by the user');
            }
        }
    };

    // returns from the custom hook function
    return {
        handleGoogleSignIn,
        handleMicrosoftSignin
    }
}

export default useThirdpartyAuth;