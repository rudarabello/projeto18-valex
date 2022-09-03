import Cryptr from "cryptr";
const cryptr = new Cryptr('chaveSuperSecreta');

export function encrypt(password:string){
    return cryptr.encrypt(password);
}

export function decrypt(password:string){
    return cryptr.decrypt(password);
}