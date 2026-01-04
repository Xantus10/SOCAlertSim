import type { Severity } from "./v1";


export interface Log {
  /**
   * Id of the log
   */
  id: number;

  /**
   * UNIX Timestamp
   */
  timestamp: number;

  /**
   * Source of the log
   */
  source: string;

  /**
   * Brief description to display
   */
  description: string;

  /**
   * Full raw payload of the log
   */
  payload: string;
};


export interface Alert {
  /**
   * Id of the alert (Should be unique)
   */
  id: number;

  /**
   * UNIX Timestamp (When was the alert triggered)
   */
  timestamp: number;

  /**
   * Severity
   */
  severity: Severity;

  /**
   * Brief description of the triggered alert
   */
  briefdesc: string;

  /**
   * Full description of the alert (and the rule triggered)
   */
  description: string;

  /**
   * Array of logs related to the alert
   */
  logs: Log[];
};

/**
 * Whole json structure
 */
export interface Json {
  /**
   * Version of the schema
   */
  version: 2;

  /**
   * Name of the lab
   */
  name: string;

  /**
   * Array of defined alerts
   */
  alerts: Alert[];
};

/**
 * Json enriched with partial error checking
 */
export interface JsonECpart extends Json {
  /**
   * Indicates support for error checking
   */
  ec: 'partial';

  /**
   * Hash for error checking
   *  
   * Will be calculated by appending the string values of the eval numbers
   */
  solution: string;
};

/**
 * Json enriched with full error checking
 */
export interface JsonECfull extends Json {
  /**
   * Indicates support for error checking
   */
  ec: 'full';

  /**
   * Salt for the hashing algorithm
   */
  salt: string;

  /**
   * Hash for error checking
   * 
   * Will be calculated by hash(prev_hash + str(cur_ev))  
   * For the first hash prev_hash=salt
   */
  solution: string[];
};

export type V2Json = Json | JsonECpart | JsonECfull;
