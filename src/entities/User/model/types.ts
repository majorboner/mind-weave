export interface User {
  id: string;
  username: string;
  avatar?: string;
}

export interface UserSchema {
  userData?: User;
  isLoading: boolean;
}
