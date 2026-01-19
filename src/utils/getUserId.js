import supabase from "@/config/supabase";

const getUserId = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if(!session) return
  return session.user.id;
};

export default getUserId;
