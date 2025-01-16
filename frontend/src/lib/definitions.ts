export interface User {
  id: string;
  username: string;
  email: string;
  profile_picture?: string; // Optional property if it may not be always present
  points_balance?: number; // Optional for user's points balance based on your implementation
}
