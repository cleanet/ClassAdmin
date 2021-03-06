-- Author: cleanet
-- cleannet29@gmail.com
--
-- Licensed by GNU GENERAL PUBLIC LICENSE VERSION 3
-- This file is part of ClassAdmin.
-- ClassAdmin is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
-- ClassAdmin is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
-- You should have received a copy of the GNU General Public License along with ClassAdmin. If not, see <https://www.gnu.org/licenses/>.
-- Copyright 2022 cleanet
--
CREATE USER 'ClassAdmin'@'%' IDENTIFIED BY '12345678';
GRANT ALL PRIVILEGES ON ClassAdmin.* TO 'ClassAdmin'@'%';
FLUSH PRIVILEGES;
CREATE DATABASE ClassAdmin;
use ClassAdmin;
CREATE TABLE server (
	id		INT		AUTO_INCREMENT,
	password	VARCHAR(500)	NOT NULL,
	ipaddress	VARCHAR(40)	NOT NULL,
	port		INT(5)		NOT NULL,
	clients		INT(5)		NOT NULL,
	CONSTRAINT 	server_PK 	PRIMARY KEY (id),
	CONSTRAINT ser_port_CK CHECK (port BETWEEN 0 AND 65535),
	CONSTRAINT ser_max_clients CHECK (clients BETWEEN 0 AND 999),
	CONSTRAINT ser_ipaddress_REGEXP CHECK (ipaddress REGEXP "^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$")
);

CREATE TABLE clients (
	id		INT		AUTO_INCREMENT,
	hostname	VARCHAR(50)	NOT NULL,
	ipaddress	VARCHAR(40)	NOT NULL,
	port		INT(5)		NOT NULL,
	status		VARCHAR(50)	NOT NULL,
	cli_ser_id	INT		NOT NULL,
	CONSTRAINT	clients_PK	PRIMARY KEY (id),
	CONSTRAINT cli_port_CK CHECK (port BETWEEN 0 AND 65535),
	CONSTRAINT cli_ipaddress_REGEXP CHECK (ipaddress REGEXP "^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$")
);

CREATE TABLE status (
	name	VARCHAR(50)	NOT NULL,
	CONSTRAINT status_PK PRIMARY KEY (name)
);
INSERT INTO status (name) VALUES ("CONNECTED"),("DISCONNECTED");

ALTER TABLE clients ADD CONSTRAINT cli_status_FK FOREIGN KEY (status) REFERENCES status (name);

ALTER TABLE clients ADD CONSTRAINT cli_ser_FK FOREIGN KEY (cli_ser_id) REFERENCES server (id);

INSERT INTO server (password,ipaddress,port,clients) VALUES 
(
	"fa585d89c851dd338a70dcf535aa2a92fee7836dd6aff1226583e88e0996293f16bc009c652826e0fc5c706695a03cddce372f139eff4d13959da6f1f5d3eabe",
	"127.0.0.1",
	7788,
	5
);
