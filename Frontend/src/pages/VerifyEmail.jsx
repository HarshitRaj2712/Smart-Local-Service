import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        // ✅ verify email
        await API.get(`/auth/verify-email/${token}`);

        // ✅ fetch updated user
        const userRes = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // ✅ update local storage
        localStorage.setItem(
          "user",
          JSON.stringify(userRes.data)
        );

        alert("Email verified ✅");

        // refresh dashboard state
        window.location.href = "/user";

      } catch (err) {
        alert("Verification failed");
        navigate("/login");
      }
    };

    verify();
  }, [token]);

  return (
    <h2 className="text-center mt-20">
      Verifying email...
    </h2>
  );
};

export default VerifyEmail;