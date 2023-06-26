import {User} from "../user/user.model";
import ApiError from "../../../erros/ApiError";
import {IAdmin} from "./admin.interface";
import {Admin} from "./admin.model";
import {ILoginAdmin, ILoginAdminResponse} from "./admin.constant";
import {jwtHelpers} from "../../../helpers/jwtHelpers";
import config from "../../../config";
import {Secret} from "jsonwebtoken";

const createAdmin = async (admin: IAdmin): Promise<IAdmin | null> => {
    ////TODO: have to extract password
    const createdAdmin = await Admin.create(admin);
    if (!createdAdmin) {
        throw new ApiError(500, 'Failed to create admin!');
    }
    return createdAdmin;
};

const loginAdmin = async (payload: ILoginAdmin): Promise<ILoginAdminResponse> => {
    const { phoneNumber, password } = payload;

    const isUserExist = await Admin.isUserExits(phoneNumber);
    if (!isUserExist) throw new ApiError(404, 'User does not exist');

    const isPasswordMatch = await Admin.isPasswordMatched(
        password,
        isUserExist.password
    );
    if (!isPasswordMatch) throw new ApiError(401, 'Password does not match');

    const { _id, role} = isUserExist;
    const accessToken = jwtHelpers.createToken(
        { id: _id, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { id: _id, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
      accessToken,
      refreshToken
    };
};

export const AdminService = {
    createAdmin,
    loginAdmin,
}