import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { readFileSync } from "fs";
import { Agent } from "https";
import axios from "axios";

@Injectable()
export class WalletService {

  /*
  ##### Wallet node 9256
  "/get_sync_status": self.get_sync_status,
  "/get_height_info": self.get_height_info,
  "/farm_block": self.farm_block,  # Only when node simulator is running
  "/get_initial_freeze_period": self.get_initial_freeze_period,
  "/get_network_info": self.get_network_info,
  ##### Wallet management 9256
  "/get_wallets": self.get_wallets,
  "/create_new_wallet": self.create_new_wallet,
  ##### Wallet 9256
  "/get_wallet_balance": self.get_wallet_balance,
  "/get_transaction": self.get_transaction,
  "/get_transactions": self.get_transactions,
  "/get_next_address": self.get_next_address,
  "/send_transaction": self.send_transaction,
  "/create_backup": self.create_backup,
  "/get_transaction_count": self.get_transaction_count,
  "/get_farmed_amount": self.get_farmed_amount,
  "/create_signed_transaction": self.create_signed_transaction,
  ##### Coloured coins and trading 9256
  "/cc_set_name": self.cc_set_name,
  "/cc_get_name": self.cc_get_name,
  "/cc_spend": self.cc_spend,
  "/cc_get_colour": self.cc_get_colour,
  "/create_offer_for_ids": self.create_offer_for_ids,
  "/get_discrepancies_for_offer": self.get_discrepancies_for_offer,
  "/respond_to_offer": self.respond_to_offer,
  "/get_trade": self.get_trade,
  "/get_all_trades": self.get_all_trades,
  "/cancel_trade": self.cancel_trade,
  ##### DID Wallet 9256
  "/did_update_recovery_ids": self.did_update_recovery_ids,
  "/did_spend": self.did_spend,
  "/did_get_pubkey": self.did_get_pubkey,
  "/did_get_did": self.did_get_did,
  "/did_recovery_spend": self.did_recovery_spend,
  "/did_get_recovery_list": self.did_get_recovery_list,
  "/did_create_attest": self.did_create_attest,
  "/did_get_information_needed_for_recovery": self.did_get_information_needed_for_recovery,
  "/did_create_backup_file": self.did_create_backup_file,
  ##### RL wallet 9256
  "/rl_set_user_info": self.rl_set_user_info,
  "/send_clawback_transaction:": self.send_clawback_transaction,
  "/add_rate_limited_funds:": self.add_rate_limited_funds,
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

  async getWalletBalance(id: number) {
    try {
      Logger.log(`Showing balance of wallet ${id}...`);
      var response = await axios
        .post(`https://${this.hostname}:${this.port}/get_wallet_balance`, 
            {
              "wallet_id": id
            }, 
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

  async getWallets() {
    try {
      Logger.log('Listing wallets...');
      var response = await axios
        .post(`https://${this.hostname}:${this.port}/get_wallets`, 
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

  async getTransactions(id: number) {
    try {
      Logger.log('Listing transactions...');
      var response = await axios
        .post(`https://${this.hostname}:${this.port}/get_transactions`, 
            {
              "wallet_id": id
            }, 
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

