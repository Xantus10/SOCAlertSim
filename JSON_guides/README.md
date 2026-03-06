# Creating your own exercise

To create your own exercise, you need to create a JSON file containing all the information. There are multiple formats supported - Different versions of the JSON.

You can find these in the JSON-vX files. (Note: most of the file contents are the same, there are only certain differences)

**I highly reccommend checking out the example jsons in public\\json directory**

The brief explanations of the different versions are here:

## Differences

### Version 1

The first version supports key-value pairs for alert triage. It is great for introduction level exercises since all the information is presented in a simple table. However, because of this you do not hone the skill of extracting the important information from raw logs.

### Version 2

In version 2 you pass raw logs as information for the alert triage. The logs are passed as a simple string, so it is recommended to have the raw logs formatted as a JSON string. Now, you need to look for the few specific fields you need for the triage.
