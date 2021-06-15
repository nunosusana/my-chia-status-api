import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class CoinsService {
  
  /*
  ##### Coins 8555
  "/get_coin_records_by_puzzle_hash"
  "/get_coin_records_by_puzzle_hashes"
  "/get_coin_record_by_name"
  "/push_tx"
  ##### Mempool 8555
  "/get_all_mempool_tx_ids"
  "/get_all_mempool_items"
  "/get_mempool_item_by_tx_id"
  */

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

  async getAllMempoolItems() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_all_mempool_items`, 
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

  async getAllMempoolTxIds() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_all_mempool_items`, 
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

