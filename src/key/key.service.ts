import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
var shell = require('shelljs');
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class KeyService {

  /*
  ##### Key management WALLET
  "/log_in": self.log_in,
  "/get_public_keys": self.get_public_keys,
  "/get_private_key": self.get_private_key,
  "/generate_mnemonic": self.generate_mnemonic,
  "/add_key": self.add_key,
  "/delete_key": self.delete_key,
  "/delete_all_keys": self.delete_all_keys,
  */

  agent: Agent
  hostname: string
  port: string

  constructor() {
    this.hostname = process.env.CHIA_HOST;
    this.port = process.env.WALLET_PORT,
    this.agent = new Agent({
      cert: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.WALLET_CERT),
      key: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.WALLET_KEY),
      rejectUnauthorized: false,
    });
  }

  async getPublicKeys() {
    try {
      Logger.log('Listing public keys...');
      var response = await axios
        .post(`https://${this.hostname}:${this.port}/get_public_keys`, 
            {}, 
            {
              httpsAgent: this.agent,
            }
        );
      return response.data;
    }
    catch (err) {
      Logger.log(err)
      throw new HttpException('Some error has occurred', HttpStatus.BAD_REQUEST);
    }
  }

}

