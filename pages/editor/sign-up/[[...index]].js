import { SignUp } from "@clerk/nextjs";
 
const SignUpPage = () => (
  <>
    <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    <span style={{ display: 'none' }} className="thisPageIsClerkSignInOrSignUp"></span>
    <div id="info">
      <p>vaquero.dev is a platform built for students in Irvine Hack Club. It is not affiliated with Irvine High School or Irvine Unified School District. <a href="https://vaquero.dev/about" target="_blank">Learn more</a></p>
    </div>
  </>
);
export default SignUpPage;