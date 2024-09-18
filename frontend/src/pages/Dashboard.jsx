import Sidebar from "../dashboard/Sidebar"
import { useAuth } from "../context/AuthProvider";
import MyProfile from "../dashboard/MyProfile";
import MyBlogs from "../dashboard/MyBlogs";
import CreateBlog from "../dashboard/CreateBlog";
import UpdateBlog from "../dashboard/UpdateBlog";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function Dashboard() {
    const { profile, isAuthenticated } = useAuth();
    const [component, setComponent] = useState("My Blogs");
    console.log(profile);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <div>
<div>
<Sidebar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}

</div>
    </div>
  )
}

export default Dashboard;