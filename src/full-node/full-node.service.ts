import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class FullNodeService {

  agent: Agent
  hostname: string
  port: string

  constructor() {
    this.hostname = process.env.CHIA_HOST;
    this.port = process.env.FULL_NODE_PORT,
    this.agent = new Agent({
      cert: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.FULL_NODE_CERT),
      key: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.FULL_NODE_KEY),
      rejectUnauthorized: false,
    });
  }
  
  /*
  ##### Full node 8555
  "/get_blockchain_state"
  "/get_block"
  "/get_blocks"
  "/get_block_record_by_height"
  "/get_block_record"
  "/get_block_records"
  "/get_unfinished_block_headers"
  "/get_network_space"
  "/get_additions_and_removals"
  "/get_initial_freeze_period"
  "/get_network_info"
  */


  async getNetworkInfo() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_network_info`, 
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

  async getBlockchainState() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_blockchain_state`, 
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

  async getBlocks() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_blocks`, 
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

  async getNetworkSpace() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_network_space`, 
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

