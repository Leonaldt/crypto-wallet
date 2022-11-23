#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE users (
		id SERIAL PRIMARY KEY,
		nickname character varying(255) NOT NULL UNIQUE,
		created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
		updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
	);

	CREATE TABLE wallets (
		id SERIAL PRIMARY KEY,
		name character varying(255) NOT NULL UNIQUE,
		user_id integer NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users (id)
	);

	CREATE TABLE assets (
		id SERIAL PRIMARY KEY,
		name character varying(100) NOT NULL UNIQUE, 
		symbol character varying(50) NOT NULL UNIQUE
	);

	INSERT INTO assets (name, symbol) VALUES ('Bitcoin', 'BTC');
	INSERT INTO assets (name, symbol) VALUES ('Ethereum', 'ETH');
	INSERT INTO assets (name, symbol) VALUES ('Tether', 'USDT');
	INSERT INTO assets (name, symbol) VALUES ('USD Coin', 'USDC');
	INSERT INTO assets (name, symbol) VALUES ('Binance USD', 'BUSD');
	INSERT INTO assets (name, symbol) VALUES ('Cardano', 'ADA');
	INSERT INTO assets (name, symbol) VALUES ('Polygon', 'MATIC');
	INSERT INTO assets (name, symbol) VALUES ('Polkadot', 'DOT');
	INSERT INTO assets (name, symbol) VALUES ('BNB', 'BNB');
	INSERT INTO assets (name, symbol) VALUES ('Chainlink', 'LINK');
	
	CREATE TABLE assets_wallets (
		price numeric(10, 2) NOT NULL,
		amount numeric(10, 2) NOT NULL,
		asset_id integer NOT NULL,
		wallet_id integer NOT NULL,
		FOREIGN KEY (asset_id) REFERENCES assets (id),
		FOREIGN KEY (wallet_id) REFERENCES wallets (id),
		created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
	);
EOSQL