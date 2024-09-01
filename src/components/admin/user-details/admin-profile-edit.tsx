import { useEffect, useState } from "react";
import ProfileForm from "./profile-form";
import axiosInstance from "@/axios/instance";
import { UserT } from "@/lib/types";

const AdminProfile = () => {
  const [userDetails, setUserDetails] = useState<UserT[]>();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/user-details");
        setUserDetails(res.data[0]);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, []);
  return (
    <>
      <ProfileForm initialData={userDetails} />
    </>
  );
};

export default AdminProfile;
