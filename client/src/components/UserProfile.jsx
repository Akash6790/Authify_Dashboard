export default function UserProfile({ user }) {
  if (!user) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">User Profile</h2>
      <p><span className="font-medium">Name:</span> {user.name}</p>
      <p><span className="font-medium">Email:</span> {user.email}</p>
    </div>
  );
}
