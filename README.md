# About this Application

This application was built to copy the AWS credentials provided by logging into AWS using a SAML Response.

I found it very annoying to have to copy the credentials over every time, and thought it would be cool to do it with Node!

# How to Use

## Store your SAML Response in a Local File

First, you must store the SAML Response you obtained from logging in to a local log file, such as `samlresponse.log`

You can simply paste the SAML repsonse using `vim samlresponse.log` and it will create a new file for you as well.

```
vim samlresponse.log
```

(press CMD + V then :wq)

## Provide Settings to the Application

This application requires you provide the your AWS account number, ARN role name, SAML provider name, SAML Response file location

You can provide settings by creating a `.env` file in the directory of execution, or providing the necessary information with flags in the cli.

### Creating an `.env` File

First, create a `.env` file in this directory using vim or a text editor. In the `.env` file include the following information.

```
ACCNUM=<AWS account number>
ROLE=<AWS arn role name>
PROVIDER=<SAML provider name>
FILE=samlresponse.log
CONFIG_LOCATION=<location of aws config, defaults to .aws/credentials>
PROFILE=<profile name, will create new profile if not provided>
```

### Using Flags

Prepare the following arguments for the command.

**Required**

```
--account-number <AWS account number> --role <AWS arn role name> --provider <SAML provider name>
```

**Optional**

```
--file <SAML Response text file> --config-location <location of aws config> -- <profile name>
```

Finally run the following command to login.

```
node lib/index.js <Flags>
```

OR

```
yarn apply <Flags>
```
