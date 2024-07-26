export type Credentials = {
	email: string;
	password: string;
};

export interface Consultation {
	patientId: string;
	doctorId: string;
	currentIllnessHistory: string;
	recentSurgery: string;
	familyMedicalHistory: string;
	prescription?: string;
}
