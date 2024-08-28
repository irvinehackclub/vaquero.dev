import { ClerkLoaded, SignIn } from "@clerk/nextjs";
 
const SignInPage = () => (
  <>
    <ClerkLoaded>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </ClerkLoaded>
    <span style={{ display: 'none' }} className="thisPageIsClerkSignInOrSignUp"></span>
    <div id="info">
      <p>vaquero.dev is a coding and hosting platform built for students. It is not affiliated with Irvine High School or Irvine Unified School District. <a href="https://vaquero.dev/about" target="_blank">Learn more</a></p>
    </div>
  </>
);
export default SignInPage;
