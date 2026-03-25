
/**
 * Severity of the alert  
 * `1 - Critical`  
 * `2 - High`  
 * `3 - Medium`  
 * `4 - Low`  
 */
export type Severity = 1 | 2 | 3 | 4;


export function severityString(sev: Severity) {
  switch (sev) {
    case 1:
      return 'Critical';
    case 2:
      return 'High';
    case 3:
      return 'Medium';
    case 4:
      return 'Low';
    default:
      return 'Undefined'
  }
}

export function severityColor(sev: Severity) {
  switch (sev) {
    case 1:
      return 'red';
    case 2:
      return 'orange';
    case 3:
      return 'yellow';
    case 4:
      return 'lightgreen';
    default:
      return 'white'
  }
}


interface UnchangingAlert {
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
   * List of MITRE IDs
   */
  mitre: string[];

  /**
   * An object of fields to include in alert (src_ip, process_name, etc.)
   */
  fields: {[fieldName: string]: string}
}

/**
 * One alert data
 */
export interface Alert extends UnchangingAlert {
  /**
   * Id of the alert (Should be unique)
   */
  id: number;

  /**
   * UNIX Timestamp (When was the alert triggered)
   */
  timestamp: number;

};

export interface PresetAlert extends UnchangingAlert {
  /**
   * Real evaluation of the alert
   */
  eval: 'TP' | 'FP';
}

/**
 * Whole json structure
 */
export interface Json {
  /**
   * Version of the schema
   */
  version: 1;

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

export type V1Json = Json | JsonECpart | JsonECfull;


export type AlertEval = -1 | 0 | 1;

export const evals: AlertEval[] = [-1, 0, 1];

export function alertEvalString(e: AlertEval) {
  switch (e) {
    case -1:
      return 'Not evaluated';
    case 0:
      return 'False positive';
    case 1:
      return 'True positive';
    default:
      return 'Undefined';
  }
}

export function alertEvalColor(e: AlertEval) {
  switch (e) {
    case -1:
      return 'inherit';
    case 0:
      return 'red';
    case 1:
      return 'green';
    default:
      return 'inherit';
  }
}
