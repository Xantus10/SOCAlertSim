

/**
 * One alert data
 */
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
   * Severity of the alert  
   * `1 - Critical`  
   * `2 - High`  
   * `3 - Medium`  
   * `4 - Low`  
   */
  severity: 1 | 2 | 3 | 4;

  /**
   * Brief description of the triggered alert
   */
  briefdesc: string;

  /**
   * Full description of the alert (and the rule triggered)
   */
  description: string;

  /**
   * An object of fields to include in alert (src_ip, process_name, etc.)
   */
  fields: {[fieldName: string]: string}
};

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
