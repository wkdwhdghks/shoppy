import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addOrUpdateToCart,
  getCart,
  onUserStateChange,
  removeFromCart,
} from "../api/firebase";
import { useEffect, useState } from "react";

export default function useCart() {
  interface UserInfo {
    uid: string;
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

  const queryClient = useQueryClient();
  const cartQuery = useQuery(
    ["carts", (user && user.uid) || ""],
    () => getCart(user && user.uid),
    {
      enabled: !!user?.uid,
    }
  );

  const addOrUpdateItem = useMutation(
    (product) => addOrUpdateToCart(user?.uid, product),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["carts", user && user.uid]);
      },
    }
  );

  const removeItem = useMutation((id) => removeFromCart(user?.uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(["carts", user?.uid]);
    },
  });

  return { cartQuery, addOrUpdateItem, removeItem };
}
