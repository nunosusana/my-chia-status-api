const crypto = require('crypto');

export class Utils {

    constructor() {}
    
    sha256(s) {
        return crypto.createHash('sha256').update(s).digest('base64');
    }

}