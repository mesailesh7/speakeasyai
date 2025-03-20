import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    // redirect to login
    //redirect can only be used in a server component
    // but to redirect user in client component when using something like a click handler or anyother event handler then use "useRouter"
    return redirect("/api/auth/register");
  }

  return <div>Hello from the dashboard</div>;
};

export default Dashboard;
