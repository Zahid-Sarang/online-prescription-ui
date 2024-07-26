import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface User {
	_id: string;
	profilePicture: string;
	name: string;
	specialty?: string;
	email: string;
	phoneNumber: string;
	age?: number;
	historyOfSurgery?: string;
	historyOfIllness?: string;
	role: "doctor" | "patient";
	password: string;
	yearsOfExperience: {
		$numberDecimal: number;
	};
}

interface AuthState {
	user: null | User;
	setUser: (user: User) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>()(
	devtools((set) => ({
		user: null,
		setUser: (user) => set({ user }),
		logout: () => set({ user: null }),
	}))
);
