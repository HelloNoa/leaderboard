"use server";
import jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';
import * as process from "process";

dotenv.config({
    path: '.env.local',
});
// JWT 시크릿 키
const secretKey = process.env.SECRET_KEY ?? '';
const authId = process.env.AUTH_ID ?? '';
const auth_password = process.env.AUTH_PASSWORD ?? '';

type user = {
    id: string;
    password: string;
}

export async function JWTsign(user: user) {
    // const cookieStore = cookies();
    if (user.id === authId && user.password === auth_password) {
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '30d' });
        // cookieStore.set("token", token);
        return token;
    } else {
        return false;
    }
}

// JWT 검증 미들웨어
export async function JWTverify(token:string): Promise<boolean> {
    // const cookieStore = cookies();
    // const token = cookieStore.get('token')?.value as string;
    let verify = false;
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            verify = false;
            return;
        }
        verify = true;
        // req.userId = decoded.userId;
    });
    return verify;
}
