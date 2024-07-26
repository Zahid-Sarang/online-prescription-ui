import { User } from "./store";

export type Credentials = {
	email: string;
	password: string;
};

export interface Consultation {
	_id?: string;
	patientId?: string;
	doctorId: string;
	currentIllnessHistory: string;
	recentSurgery: string;
	familyMedicalHistory: string;
	prescription?: string;
}

export interface Consultations {
	_id?: string;
	patientId: User;
	doctorId: string;
	currentIllnessHistory: string;
	recentSurgery: string;
	familyMedicalHistory: string;
	prescription?: string;
}
