import { ClerkLoaded, SignIn } from "@clerk/nextjs";
 
const SignInPage = () => (
  <>
    <ClerkLoaded>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </ClerkLoaded>
    <span style={{ display: 'none' }} className="thisPageIsClerkSignInOrSignUp"></span>
  </>
);
export default SignInPage;
