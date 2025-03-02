export interface AuthSchema {
  username: string;
  password: string;
  passwordRepeat?: string;
  isLoading: boolean;
  error?: string;
}
