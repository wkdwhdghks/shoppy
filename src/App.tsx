import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { onUserStateChange } from "./api/firebase";

const queryClient = new QueryClient();
export default function App(): JSX.Element {
  interface UserInfo {
    photoURL: string;
    displayName: string;
    isAdmin: string;
  }

  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    onUserStateChange((user: any) => {
      setUser(user);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Navbar user={user} />
      {user && <Outlet context={{ user: user }} />}
    </QueryClientProvider>
  );
}
