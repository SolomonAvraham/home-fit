export interface User {
  id?: string;
  email?: string;
  name?: string;
  role?: string;
  token?: string;
}

export interface GetUser {
  name?: string;
  email?: string;
  workoutCount?: number;
  exercisesCount?: number;
  createdAt?: string;
  updatedAt?: string;
  id?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface APIError {
  message: string;
  statusCode?: number;
  response: { data: { message: string } };
}
