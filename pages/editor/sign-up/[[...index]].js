import { SignUp } from "@clerk/nextjs";
 
const SignUpPage = () => (
  <>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    <span style="display: none;" class="thisPageIsClerkSignInOrSignUp"></span>
  </>
);
export default SignUpPage;