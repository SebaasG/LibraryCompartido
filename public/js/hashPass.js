import crypto from 'crypto';


export async function hashPass(pass) {
    const hash = crypto.createHash('sha3-256');
    hash.update(pass);
    return hash.digest('hex');
}

