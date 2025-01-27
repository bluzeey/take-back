export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string; // Optional property if it may not be always present
  points?: number; // Optional for user's points balance based on your implementation
}

export interface UserRegistration {
  username: string;
  email: string;
  password: string;
  password2: string;
}

export interface Token {
  access: string;
  refresh: string;
}

export interface Material {
  id: string;
  name: string;
  description: string;
  tracking_id: string;
  status: "In Tracking" | "Recycled" | "Pending Pickup";
}
