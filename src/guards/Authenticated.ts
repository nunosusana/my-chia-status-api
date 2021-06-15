import { CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import  { Utils } from '../utils/utils'

const crypto = require('crypto');

export class Authenthicated implements CanActivate {

  sha256(s) {
    return crypto.createHash('sha256').update(s).digest('base64');
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const utils:Utils = new Utils();

    try{
      var key = req.headers['authorization']?.split(' ')[1]; 
      if (utils.sha256(key) == process.env.KEY)
        return true;
      return false;
    } catch(err) {
      Logger.error(err);
      return false;
    }

  }
}
