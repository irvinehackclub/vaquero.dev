import crypto from 'crypto';

export default class APIAuth {
    constructor (prefix, length = 32) {
        this.prefix = prefix;
        this.length = length;
    }

    generate () {
        const randomBytes = crypto.randomBytes(this.length).toString('hex').substring(0, this.length);
        const clientKey = `${this.prefix.toLowerCase()}${randomBytes}`;
        const hash = crypto.createHash('sha512').update(randomBytes).digest('hex').substring(0, this.length);
        const serverKey = `${this.prefix.toUpperCase()}${hash.toUpperCase()}`;
    
        if (!this.validate(clientKey, serverKey)) throw new Error('Generated key pair is invalid');

        return {
            clientKey,
            serverKey
        };
    }

    validate (clientKey, serverKey) {
        const hash = crypto.createHash('sha512').update(clientKey.substring(3)).digest('hex').substring(0, this.length);
        const expectedServerKey = (this.prefix + hash).toUpperCase();

        return expectedServerKey === serverKey;
    }

    static prefix (prefix) {
        return new APIAuth(prefix);
    }

    length (length) {
        this.length = length;

        return this;
    }
}