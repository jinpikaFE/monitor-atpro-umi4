declare namespace User {
  type LoginParams = {
    code: string;
    password: string;
    username: string;
    uuid: string;
  };
  type CurrentUser = {
    avatar: string;
    buttons: string[];
    code: number;
    deptId: number;
    introduction: string;
    name: string;
    permissions: string[];
    roles: string[];
    userId: number;
    userName: string;
  };
}
