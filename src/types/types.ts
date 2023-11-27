export type Camp = {
    _id: string;
    name: string;
    img: string;
    date: string;
    venue: string;
    desc: string;
    fees: string;
    purpose: string;
    benefits: string;
    target_audience: string;
    phone_number: string;
    doctors: Array<string | Doctor>;
    participants: Array<string | Participant>;
    feedbacks?: string[];
    rating?: number;
};

export type UpcomingCamp = {
    doctors_interested: Array<string | Doctor>;
    doctors_accepted: Array<string | Doctor>;
    participants_registered: Array<string | Participant>;
    participants_accepted: Array<string | Doctor>;
} & Omit<Camp, "doctors" | "participants" | "feedbacks" | "rating">;

type User = {
    _id: string;
    role: "organizer" | "participant" | "doctor";
    name: string;
    email: string;
    phone_number: string;
};

export type Organizer = {
    organized_camps: Array<string | Camp>;
    feedbacks: string[];
} & User;

export type Doctor = {
    speciality: string;
    certification: string;
    interested_camps: Array<string | Camp>;
    accepted_camps: Array<string | Camp>;
} & User;

export type Participant = {
    age: number;
    gender: string;
    address: string;
    requirments?: string;
    attended_camps: Array<string | Camp>;
    registered_camps: Array<string | Camp>;
} & User;
