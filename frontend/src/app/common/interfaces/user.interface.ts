export interface UserProfile {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    user_type: string;
    employee_no: string;
    email: string;
}

export interface ReqNewPass {
    userId: string;
    oldPass: string;
    newPass: string;
}
