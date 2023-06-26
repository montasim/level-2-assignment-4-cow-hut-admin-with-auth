import {IRefreshTokenResponse} from "./auth.interface";
import {jwtHelpers} from "../../../helpers/jwtHelpers";
import config from "../../../config";
import {Secret} from "jsonwebtoken";
import ApiError from "../../../erros/ApiError";
import {User} from "../user/user.model";

const refreshToken = async (
    refreshToken: string
): Promise<IRefreshTokenResponse> => {
    let verifyRefreshToken = null;
    try {
        verifyRefreshToken = jwtHelpers.verifyToken(
            refreshToken,
            config.jwt.refresh_secret as Secret
        );
    } catch (e) {
        throw new ApiError(403, 'Invalid Refresh Token');
    }

    const { userId } = verifyRefreshToken;
    const isUserExist = await User.isUserExits(userId);
    if (!isUserExist) throw new ApiError(404, 'User does not exist'); //User was deleted by admin for any reason after token was issued
    const { id, role } = isUserExist;

    const newAccessToken = jwtHelpers.createToken(
        { userId: id, role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};

export const AuthService = {
    refreshToken,
}