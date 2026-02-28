import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await API.get(`/auth/verify-email/${token}`, {
          withCredentials: true,
        });

        setStatus("success");

        // update local user instantly
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
          user.isEmailVerified = true;
          localStorage.setItem("user", JSON.stringify(user));
        }

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (err) {
        setStatus("failed");
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      {status === "verifying" && <h2>Verifying email...</h2>}
      {status === "success" && <h2>✅ Email verified successfully!</h2>}
      {status === "failed" && <h2>❌ Verification failed or expired.</h2>}
    </div>
  );
};

export default VerifyEmail;