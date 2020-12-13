# Twitter Bot for AWS Lambda

_Twitter Bot for AWS Lambda_ is the source code for an AWS Lambda function that,
when invoked, will publish a random tweet to the specific Twitter account. The
recommended use is to harness Amazon EventBridge to invoke the Lambda
periodically (e.g. once every 11 hours).
