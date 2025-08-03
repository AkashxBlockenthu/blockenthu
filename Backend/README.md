# Blockex Backend API Documentation

This document provides documentation for the backend APIs of the Blockex application.

## Swap API

### Get Quote

- **Endpoint:** `GET /api/swap/quote`
- **Description:** Get a quote for a token swap.
- **Query Parameters:**
  - `fromTokenAddress` (string, required): The address of the token to swap from.
  - `toTokenAddress` (string, required): The address of the token to swap to.
  - `amount` (string, required): The amount of the `fromToken` to swap, in wei.
  - `chainId` (number, required): The ID of the chain.
- **Example Response:**
  ```json
  {
    "fromToken": {
      "symbol": "ETH",
      "name": "Ethereum",
      "decimals": 18,
      "address": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      "logoURI": "..."
    },
    "toToken": {
      "symbol": "DAI",
      "name": "Dai Stablecoin",
      "decimals": 18,
      "address": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "logoURI": "..."
    },
    "toTokenAmount": "...",
    "fromTokenAmount": "...",
    "protocols": [ ... ],
    "estimatedGas": "..."
  }
  ```

### Get Swap Data

- **Endpoint:** `POST /api/swap/swap`
- **Description:** Get the transaction data for a token swap.
- **Body Parameters:**
  - `fromTokenAddress` (string, required): The address of the token to swap from.
  - `toTokenAddress` (string, required): The address of the token to swap to.
  - `amount` (string, required): The amount of the `fromToken` to swap, in wei.
  - `fromAddress` (string, required): The address of the user performing the swap.
  - `slippage` (number, required): The slippage tolerance in percentage.
  - `chainId` (number, required): The ID of the chain.
- **Example Response:**
  ```json
  {
    "fromToken": { ... },
    "toToken": { ... },
    "toTokenAmount": "...",
    "fromTokenAmount": "...",
    "tx": {
      "from": "...",
      "to": "...",
      "data": "...",
      "value": "...",
      "gasPrice": "...",
      "gas": "..."
    }
  }
  ```

## Bridge API

### Get Bridge Quote

- **Endpoint:** `GET /api/bridge/quote`
- **Description:** Get a quote for a same-chain swap using the Fusion API.
- **Query Parameters:**
  - `fromTokenAddress` (string, required): The address of the token to swap from.
  - `toTokenAddress` (string, required): The address of the token to swap to.
  - `amount` (string, required): The amount of the `fromToken` to swap, in wei.
  - `chainId` (number, required): The ID of the chain.
- **Example Response:**
  ```json
  { ... } // The quote object from the 1inch Fusion SDK
  ```

### Get Bridge Swap Data

- **Endpoint:** `POST /api/bridge/swap`
- **Description:** Get the transaction data for a same-chain swap using the Fusion API.
- **Body Parameters:**
  - `fromTokenAddress` (string, required): The address of the token to swap from.
  - `toTokenAddress` (string, required): The address of the token to swap to.
  - `amount` (string, required): The amount of the `fromToken` to swap, in wei.
  - `fromAddress` (string, required): The address of the user performing the swap.
  - `chainId` (number, required): The ID of the chain.
- **Example Response:**
  ```json
  { ... } // The order object from the 1inch Fusion SDK
  ```

## Chart API

### Get Chart Data

- **Endpoint:** `GET /api/chart`
- **Description:** Get historical price data for a token.
- **Query Parameters:**
  - `tokenAddress` (string, required): The address of the token.
  - `chainId` (number, required): The ID of the chain.
  - `from` (number, required): The start timestamp.
  - `to` (number, required): The end timestamp.
  - `resolution` (string, required): The chart resolution (e.g., '1m', '1h', '1d').
- **Example Response:**
  ```json
  [
    {
      "time": 1672531200,
      "open": 100,
      "high": 105,
      "low": 95,
      "close": 102
    },
    ...
  ]
  ```

## History API

### Get Transaction History

- **Endpoint:** `GET /api/history/:address`
- **Description:** Get the transaction history for a given address.
- **URL Parameters:**
  - `address` (string, required): The user's wallet address.
- **Query Parameters:**
    - `chainId` (number, required): The ID of the chain.
- **Example Response:**
  ```json
  [
    {
      "id": "...",
      "type": "...",
      ...
    },
    ...
  ]
  ```
