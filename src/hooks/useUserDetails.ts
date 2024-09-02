import { useEffect, useState } from "react";
import axiosInstance from "@/axios/instance";
import socket from "@/socket/socket";
import { UserT } from "@/lib/types"; // Adjust the path as needed

const useUserData = () => {
  const [userData, setUserData] = useState<UserT[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get<UserT[]>(
          "/api/auth/user-details"
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();

    const handleUserUpdated = (updatedUser: UserT) => {
      setUserData((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser._id ? updatedUser : user
        )
      );
    };

    socket.on("user-updated", handleUserUpdated);

    return () => {
      socket.off("user-updated", handleUserUpdated);
    };
  }, []);

  return userData;
};

export default useUserData;
