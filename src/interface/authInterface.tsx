export interface ChangePasswordInterface {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface UserData {
  token: string;
  forceChangePassword: boolean;
  allPrivilege: boolean;
  addMatchPrivilege: boolean;
  betFairMatchPrivilege: boolean;
  bookmakerMatchPrivilege: boolean;
  sessionMatchPrivilege: boolean;
}

export interface LoginInterface {
  userName: string;
  password: string;
}
export interface CheckOldPasswordInterface {
  oldPassword: string;
}
