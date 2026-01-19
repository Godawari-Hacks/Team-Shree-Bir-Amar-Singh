import supabase from "@/config/supabase";

const getUserName = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) return;

  const {
    user: {
      app_metadata: { provider },
      user_metadata,
    },
  } = session;
  if (provider === "email") {
    return user_metadata.username;
    // console.log("username is",user_metadata.username)
  } else {
    return user_metadata.full_name;
    // console.log("username is ",user_metadata.full_name)
  }
};

export default getUserName;
