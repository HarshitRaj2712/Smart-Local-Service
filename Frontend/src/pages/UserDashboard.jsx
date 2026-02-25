import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold mb-6">
        User Dashboard
      </h2>

      {!user?.isEmailVerified && (
        <div className="bg-yellow-100 text-yellow-800 p-3 rounded-lg mb-4">
          Please verify your email to unlock full features.
        </div>
      )}
    </div>
  );
};

export default UserDashboard;