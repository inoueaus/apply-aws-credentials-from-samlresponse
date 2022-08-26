## How to Use

First, create a `.env` file in this directory. In the `.env` file include the following information.

```
ACCNUM=<AWS account number>
ROLE=<AWS arn role name>
PROVIDER=<SAML provider name>
FILE=samlresponse.log
CONFIG_LOCATION=<location of aws config, defaults to .aws/credentials>
PROFILE=<profile name, will create new profile if not provided>
```

Then, login to AWS through SAML and copy your samlresponse from the redirect payload.

Paste the long SAMLResponse to a local file, for example `samlresponse.log`, using vim.

```
vim samlresponse.log
```
(press CMD + V)

Finally run the following command to login.

```
node index.js
```


