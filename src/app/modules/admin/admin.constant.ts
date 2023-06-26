export const adminTypes: string[] = ['admin'];

export type ILoginAdminResponse = {
    accessToken: string;
    refreshToken?: string;
};

export type ILoginAdmin = {
    phoneNumber: string;
    password: string;
}