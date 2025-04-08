
import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "sonner";

const AdminGuard = () => {
  const navigate = useNavigate();
  const isAdminLoggedIn = localStorage.getItem("admin_logged_in") === "true";

  useEffect(() => {
    if (!isAdminLoggedIn) {
      toast.error("Unauthorized", {
        description: "You must be logged in to access this page",
      });
      navigate("/");
    }
  }, [isAdminLoggedIn, navigate]);

  if (!isAdminLoggedIn) {
    return null;
  }

  return <Outlet />;
};

export default AdminGuard;
