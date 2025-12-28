
/**
 * Severity of the alert  
 * `1 - Critical`  
 * `2 - High`  
 * `3 - Medium`  
 * `4 - Low`  
 */
type Severity = 1 | 2 | 3 | 4;


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
