import { useProfile, useChangePassword } from "@/hooks/use-users";
import { useState } from "react";

export default function ProfilePage() {
  const { data: profileData, isLoading } = useProfile();
  const changePassword = useChangePassword();
  const user = profileData?.data;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwMsg, setPwMsg] = useState("");

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwMsg("");
    try {
      await changePassword.mutateAsync({ currentPassword, newPassword });
      setPwMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: unknown) {
      setPwMsg(err instanceof Error ? err.message : "Failed to change password");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Profile</h1>

      <div className="rounded-lg border border-border bg-card p-6 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground">Name</p>
          <p className="font-medium text-foreground">{user?.fullName}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Email</p>
          <p className="font-medium text-foreground">{user?.email}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Role</p>
          <p className="font-medium text-foreground">{user?.userType}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Agent Code</p>
          <p className="font-medium text-foreground">{user?.agentCode ?? "N/A"}</p>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          {pwMsg && (
            <p
              className={`text-sm ${
                pwMsg.includes("success") ? "text-green-600" : "text-destructive"
              }`}
            >
              {pwMsg}
            </p>
          )}
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Current password"
            required
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New password"
            required
            minLength={6}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={changePassword.isPending}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {changePassword.isPending ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
