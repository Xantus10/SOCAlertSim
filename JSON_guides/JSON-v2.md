# JSON version 1

## Fields

### `version`

Has a value of `2`.

### `name`

A string with the exercise name.

### `alerts`

This is an array of alerts, alerts in v1 feature the following:

`id - unique integer id of the alert`

`timestamp - the UNIX timestamp (in ms)`

`severity - a number 1-4 where 1=Critical`

`briefdesc - a brief description of the alert (essentially a name of the alert)`

`description - a longer and more detailed description of the alert (alert rule)`

`logs - an array of log objects (explained below)`

#### `logs` object

`id - unique integer id of the log`

`timestamp - the UNIX timestamp (in ms)`

`source - the sourcetype string of the log (like Sysmon or SurricattaIDS)`

`description - name of the event (brief description)`

`payload - the raw string of the log body`

## Optional fields

### `ec`

"Error Checking" - Can have values 'partial' and 'full'

Partial allows only for evaluating the exercise as "Correct" and "Incorrect".

Full allows for "Reveal solution", since it tells the user where the issue is at.

### Fields for `ec:partial`

#### `solution`

An SHA256 hash of a string constructed in the following way:

1. Decide all your alerts as `True positive` or `False positive`
2. Assign values TruePos=1 and FalsePos=0
3. Now construct a string from them, with no separator (TruePos,TruePos,FalsePos => "110")
4. Create a hash from this string

### Fields for `ec:full`

#### `salt`

A string which will be used in the hash construction process

#### `solution`

An array of SHA256 hashes constructed in the following way:

1. Evaluate the alert as TruePos or FalsePos and assign the 1 and 0 values
2. Compute the first hash as SHA256(salt+number) (So like SHA256(MY_RANDOM_SALT0))
3. Compute the next hash as SHA256(prev_hash+number)
4. Fill the whole solution like this
