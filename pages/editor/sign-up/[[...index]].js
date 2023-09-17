import { SignUp } from "@clerk/nextjs";
 
const SignUpPage = () => (
  <>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    <span style={{ display: 'none' }} className="thisPageIsClerkSignInOrSignUp"></span>
  </>
);
export default SignUpPage;