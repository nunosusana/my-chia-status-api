import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Utils } from 'src/utils/utils';
var shell = require('shelljs');


@Injectable()
export class GlobalService {

  utils:Utils = undefined

  constructor() {
    this.utils = new Utils()
  }

  async setToken(req: any) {
    if(process.env.KEY == "null"){
      process.env.KEY = this.utils.sha256(req.token)
      return "New token received"
    }
    return "Already has one token"
  }

  async version() {
    try {
      const result = '{"version": "'+(await shell.exec(process.env.CHIA_PATH+'chia version')).trim()+'"}';
      Logger.log(result);
      return JSON.parse(result);
    }
    catch (err) {
      Logger.log(err)
      throw new HttpException('Some error has occurred', HttpStatus.BAD_REQUEST);
    }
  }

}

