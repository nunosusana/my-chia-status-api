import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class HarvesterService {

  /*
  ##### Harvester - 8560
  "/get_plots"
  "/refresh_plots"
  "/delete_plot"
  "/add_plot_directory"
  "/get_plot_directories"
  "/remove_plot_directory"
  */

  agent: Agent
  hostname: string
  port: string

  constructor() {
    this.hostname = process.env.CHIA_HOST;
    this.port = process.env.HARVESTER_PORT,
    this.agent = new Agent({
      cert: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.HARVESTER_CERT),
      key: readFileSync((this.hostname === 'localhost' ? process.env.HOME:"")+process.env.CHIA_SSL_PATH+process.env.HARVESTER_KEY),
      rejectUnauthorized: false,
    });
  }

  async listPlots() {
    try {
      Logger.log('Listing plots...');
      var response = await axios
        .post(`https://${this.hostname}:${this.port}/get_plots`, 
            {}, 
            {
              httpsAgent: this.agent,
            }
        );
      const nplots = Object.keys(response.data["plots"]).length;
      response.data['n_plots'] = nplots;
      return response.data;
    }
    catch (err) {
      Logger.log(err)
      throw new HttpException('Some error has occurred', HttpStatus.BAD_REQUEST);
    }
  }

  async refreshPlots() {
    try {
      Logger.log('Refreshing plots...');
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/refresh_plots`, 
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

  async listPlotsDirectories() {
    try {
      Logger.log('Listing plots directories...');
      const response = await axios
        .post(`https://${this.hostname}:${this.port}/get_plot_directories`, 
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

