# MY CHIA STATUS API

## Global
- POST /global/set-token  
    Request:
    ```JSON
    {
        "token": "my-token"
    }
    ```  
    Response:
    ```JSON
    New token received
    ```
- GET /global/version (only works if the API server is running locally and not inside docker)  
    Response:
    ```JSON
    {
        "version": string
    }
    ```

## Wallets
- GET /wallet/get-wallet-balance/<wallet_id>  
    Response:
    ```JSON
    {
        "success": bool,
        "wallet_balance": {
            "confirmed_wallet_balance": number,
            "max_send_amount": number,
            "pending_change": number,
            "pending_coin_removal_count": number,
            "spendable_balance": number,
            "unconfirmed_wallet_balance": number,
            "unspent_coin_count": number,
            "wallet_id": number
        }
    }
    ```
- GET /wallet/get-wallets  
    Response:
    ```JSON
    {
        "success": bool,
        "wallets": [
            {
                "data": string,
                "id": number,
                "name": string,
                "type": number
            },
            ...
        ]
    }
    ```
- GET /wallet/get-transactions/<wallet_id>  
    Response:
    ```JSON
    {
        "success": bool,
        "transactions": [
            {
                "additions": [
                    {
                        "amount": number,
                        "parent_coin_info": string,
                        "puzzle_hash": string
                    }
                ],
                "amount": number,
                "confirmed": bool,
                "confirmed_at_height": number,
                "created_at_time": number,
                "fee_amount": number,
                "name": string,
                "removals": [],
                "sent": number,
                "sent_to": [],
                "spend_bundle": null,
                "to_address": string,
                "to_puzzle_hash": string,
                "trade_id": null,
                "type": number,
                "wallet_id": number
            },
            ...
        ],
        "wallet_id": number
    }
    ```

## Harvester
- GET /harvester/list-plots  
    Response:
    ```JSON
    {
        "failed_to_open_filenames": [],
        "not_found_filenames": [],
        "plots": [],
        "success": bool,
        "n_plots": number
    }
    ```
- GET /harvester/list-plots-directories  
    Response:
    ```JSON
    {
        "directories": [
            string,
            string,
            ...
        ],
        "success": bool
    }
    ```
- GET /harvester/refresh-plots  
    Response:
    ```JSON
    {
        "success": bool
    }
    ```

## Full-Node
- GET /full-node/get-network-info  
    Response:
    ```JSON
    {
        "network_name": string,
        "network_prefix": string,
        "success": bool
    }
    ```

## Farmer
- GET /farmer/get-signage-points  
    Response:
    ```JSON
    {
        "signage_points": [
            {
                "proofs": [],
                "signage_point": {
                    "challenge_chain_sp": string,
                    "challenge_hash": string,
                    "difficulty": number,
                    "reward_chain_sp": string,
                    "signage_point_index": number,
                    "sub_slot_iters": number
                }
            },
            ...
        ],
        "success": bool
    }
    ```
- GET /farmer/get-signage-point/<signage_point_index>  
    Response:
    ```JSON
    {
        "challenge_chain_sp": string,
        "challenge_hash": string,
        "difficulty": number,
        "reward_chain_sp": string,
        "signage_point_index": number,
        "sub_slot_iters": number
    }
    ```

## Coins
- GET /coins/get-mempool-items  
    Response: check on Postman

- GET /coins/get-mempool-txids  
    Response: check on Postman

## Keys
- GET /key/get-public-keys  
    Response:
    ```JSON
    {
        "public_key_fingerprints": [
            number,
            number,
            ...
        ],
        "success": bool
    }
    ```

