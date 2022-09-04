import Cryptr from "cryptr";
const cryptr = new Cryptr('chaveSuperSecreta');

export function encrypt(password: string) {
    return cryptr.encrypt(password);
}

export function decrypt(password: any) {
    return cryptr.decrypt(password);
}