export class LoginModel {
  userName: string;
  password: string;
  granttype: string;
  constructor(name, pass, grant) {
    this.userName = name;
    this.password = pass;
    this.granttype = grant;
  }
}
