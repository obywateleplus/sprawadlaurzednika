import crypto, {Hash} from 'crypto';

export async function genHash(_object: string) {
    var hash: Hash = crypto.createHash('sha256');
    hash.update(_object);
    const result: string = hash.digest('hex');
    return result;
};

export async function compareHash(src: string, hash: string) {
    var hasher: Hash = crypto.createHash('sha256');
    hasher.update(src);
    const srcComparable: string = hasher.digest('hex');
    if (srcComparable === hash){
        return true;
    } else {
        return false;
    }
};