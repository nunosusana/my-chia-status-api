import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class FarmerService {
 
  /*
  ##### Farmer 8559
  "/get_signage_point"
  "/get_signage_points"
  "/get_reward_targets"
  "/set_reward_targets"
  */

  agent: Agent
  hostname: string
  port: string

  constructor() {
    this.hostname = process.env.CHIA_HOST;
    this.port = process.env.FARMER_PORT,
    this.agent = new Agent({
      cert: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.FARMER_CERT),
      key: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.FARMER_KEY),
      rejectUnauthorized: false,
    });
  }

  async getSignagePoints() {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_signage_points`, 
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

  async getSignagePoint(id: number) {
    try {
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_signage_point`, 
            {"signage_point_index":id}, 
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

