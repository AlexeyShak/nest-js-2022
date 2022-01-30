export interface IUser extends IUserCreate {
  id: string;
}

export interface IUserCreate {
  name: string;
  login: string;
  password: string;
}
