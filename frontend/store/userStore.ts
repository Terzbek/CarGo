import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "@/axios";

type User = {
  phone_number: string;
  full_name: string;
  email: string;
  password: string;
  created_at: string;
  id: number;
};

type UserStore = {
  user: User | null;
  loginUser: (credentials: {
    phone_number: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  registerUser: (user: User) => Promise<void>;
  setUser: (any) => any;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: null) => set({ user }),
      loginUser: async (user) => {
        try {
          const response = await axios.post("/api/v1/user/login", user);
          set({ user: response.data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
      logout: () => set({ user: null }),
      registerUser: async (user) => {
        try {
          const response = await axios.post("/api/v1/user", user);
          set({ user: response.data });
          return response.data;
        } catch (error) {
          throw error;
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
