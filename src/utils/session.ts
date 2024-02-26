import * as jose from "jose"
import { cookies } from "next/headers";
export async function SetSession(id: string) {
    const secret = new TextEncoder().encode(process.env.JOSE_TOKEN_SECRET as string);
    const token = await new jose.SignJWT({ value: id })
        .setProtectedHeader({ alg: 'HS256' })
        .sign(secret);

    const cookiesStore = cookies();
    cookiesStore.set('token', token, { httpOnly: true });
}

export async function GetSession() {
    const cookiesStore = cookies();
    const tokenJWT = cookiesStore.get('token');
    if (tokenJWT === undefined) {
        return undefined;
    }

    const secret = new TextEncoder().encode(process.env.JOSE_TOKEN_SECRET as string);
    const token = await jose.jwtVerify(tokenJWT.value, secret).then(data => data).catch(_ => undefined);
    return token;
}

export async function DestroySession() {
    const cookiesStore = cookies();
    cookiesStore.delete('token');
}