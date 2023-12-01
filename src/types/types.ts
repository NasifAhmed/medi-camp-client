export type Camp = {
    _id?: string;
    name: string;
    img: string;
    date: string;
    venue: string;
    desc: string;
    fees: string;
    created_by: string;
    purpose?: string;
    benefits?: string;
    target_audience: string;
    special_service: string;
    phone_number: string;
    doctors?: Array<string | Doctor>;
    participants?: Array<string | Participant>;
    feedbacks?: string[];
    rating?: number;
};

export type UpcomingCamp = {
    doctors_interested: Array<string | Doctor>;
    doctors_accepted: Array<string | Doctor>;
    participants_registered: Array<string | Participant>;
    participants_accepted: Array<string | Doctor>;
} & Omit<Camp, "doctors" | "participants" | "feedbacks" | "rating">;

export type User = {
    _id: string;
    role: "organizer" | "participant" | "doctor";
    name: string;
    email: string;
    phone_number: string;
    info: any;
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
    attended_camps: Array<string | Camp>;
    registered_camps: Array<string | Camp>;
} & User;

export type RegisteredParticipant = {
    _id?: string;
    name: string;
    email: string;
    emergency_phone_number: string;
    age: number;
    gender: string;
    address: string;
    requirments?: string;
    registered_camp: Camp | string;
    payment_status: boolean;
    confirmation_status: boolean;
};

export type Feedback = {
    owner: string | User;
    camp: string | Camp;
    text: string;
    img: string;
    rating: number;
};
