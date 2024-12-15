import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../../Context/UserContext";
import Cookies from "universal-cookie";
import LoadingScreen from "../../Components/Loading";

export default function PersistLogin() {
  // Loading Screen
  const [loading, setLoading] = useState(true);

  // User Context (to get current token & data from)
  const user = useContext(User);

  // Define Cookie to get the token from (Token has been already saved to cookies on Login / Register)
  const cookie = new Cookies();

  useEffect(() => {
    // Refresh user's data if token exists in cookies
    async function refresh() {
      // Retrieve Token From Cookies
      const getToken = cookie.get("JWT");

      if (getToken) {
        // Simulating refreshing token
        const fetchedData = user.auth.userData || {}; // Use existing data if available

        // Update context & send it back (to keep the user logged-in, because the context data deleted on every refresh)
        user.setAuth({ token: getToken, userData: fetchedData });
        console.log("Updated user context with token and data.");
      } else {
        console.log("No token found in cookies. User remains unauthenticated.");
      }

      setLoading(false); // Stop loading
    }

    refresh();
  }, []); // Run only once on mount

  return loading ? <LoadingScreen /> : <Outlet />;
}
