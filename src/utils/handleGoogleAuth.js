import supabase from "../config/supabase";

//Signup or signin with google oauth
const handleGoogleAuth = async () => {
  const res = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin,
    },
  });

  console.log("response from google auth");
};

export default handleGoogleAuth;
