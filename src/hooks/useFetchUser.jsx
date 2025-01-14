import { useState, useEffect } from "react";
import { FetchToken } from "../utils/fetchToken";
import { BASE_URL } from "../utils/config";

const useFetchUser = (id, token) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching user data...");
    const fetchUser = async () => {
      try {
        const response = await FetchToken(`${BASE_URL}/users/profile/${id}`, {
          method: "GET",
          headers: {
              "Authorization": `Bearer ${token}`,
          },
      });

      if (response.status === 204) {
        setError("No user data available.");
        return;
      }

      console.log("Response:", response);
      console.log("Status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Data received:", data)
        setUser(data);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Something went wrong");
      }
  } catch (error) {
      setError(error.message || "Failed to fetch user");
  }
};

if (id && token) {
  fetchUser();
}
}, [id, token]);

return { user, error };
};

export default useFetchUser;