import UserList from "./_components/userList";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor all platform users
          </p>
        </div>
      </div>
      <UserList />
    </div>
  );
}
