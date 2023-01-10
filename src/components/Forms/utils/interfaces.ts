export interface LoginFormTypes {
  email: string;
  password: string;
}
export interface LoginFormErrorTypes {
  email: boolean;
  password: boolean;

  valid: boolean;
}

export interface RegisterFormTypes {
  username: string;
  email: string;
  password: string;
}
export interface RegisterFormErrorTypes {
  username: boolean;
  email: boolean;
  password: boolean;

  valid: boolean;
}

export interface LoginState {
  setShowLoginModal: (value: boolean) => void;
}
export interface RegisterState {
  setShowRegisterModal: (value: boolean) => void;
}
