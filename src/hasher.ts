import crypto, {Hash} from 'crypto';

export async function genHash(src: string | null) {
    var hash: Hash = crypto.createHash('sha256');
    if (src != null) {
        hash.update(src);
    }
    const result: string = hash.digest('hex');
    return result;
};

export async function compareHash(src: string | null, hash: string) {
    const srcComparable: string = await genHash(src);
    if (srcComparable === hash){
        return true;
    } else {
        return false;
    }
};