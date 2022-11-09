# External Resources

This documentation lists critical external ressources used by BO V3.

## Summary
- [BO V3 prod](#bo-v3-prod)
- [BO V3 beta](#bo-v3-prod)
- [BO V3 ci](#bo-v3-ci)
- [BO V3 Custom Env](#bo-v3-custom-env)

Note: aws components can be in either `production` (default) or `izberg-dev` environments. Make sure you are in the right environment (to switch to aws dev env: [link](https://signin.aws.amazon.com/switchrole?roleName=OrganizationAccountAccessRole&account=izberg-dev&displayName=IZBERG%20Dev&color=B7CA9D)).

AWS components are always in `eu-west-1` (Ireland) regions, unless specified otherwise.


## BO V3 Prod

aws environment: `production`.

- [ElasticBeanstalk: backoffices/backoffices-production](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/dashboard?applicationName=backoffices&environmentId=e-fv6gchzqem)

This is where the application server's health can be monitored, & actions like Restart app server(s) are available.

- [DynamoDB: backoffices-web-prod-sessions](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1#tables:selected=backoffices-web-prod-sessions;tab=overview)

This is where the user's session data is stored. You can inspect & debug session data from here.
 
- [EB Logs](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/logs?applicationName=backoffices&environmentId=e-fv6gchzqem)

To access server logs for debugging, you can do it from elasticbeanstalk logs tab.

## BO V3 Beta

aws environment: `production`.

- [ElasticBeanstalk: backoffices/backoffices-beta](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/dashboard?applicationName=backoffices&environmentId=e-fv6gchzqem)
- [DynamoDB: backoffices-web-prod-sessions](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1#tables:selected=backoffices-web-beta-sessions;tab=overview)
- [EB Logs](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/logs?applicationName=backoffices&environmentId=e-rv9sm3jsjr)

## BO V3 CI

aws environment: `izberg-dev`.


- [ElasticBeanstalk: backoffices/Backoffices-ci](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/dashboard?applicationName=backoffices&environmentId=e-n3yk9avtwu)
- [DynamoDB: backoffices-web-ci-sessions](https://eu-west-1.console.aws.amazon.com/dynamodb/home?region=eu-west-1#tables:selected=backoffices-web-ci-sessions;tab=overview)
- [EB Logs](https://eu-west-1.console.aws.amazon.com/elasticbeanstalk/home?region=eu-west-1#/environment/logs?applicationName=backoffices&environmentId=e-n3yk9avtwu)

## BO V3 Custom Env

aws environment: `izberg-dev`.

- [CloudFormation: izb-feat-*](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks?filteringText=izb-feat-&filteringStatus=active&viewNested=true&hideStacks=false&stackId=)

This is where the list of custom envs & their health status are available.

Logs are available in the Cloudwatch attached to each CloudFormation (Ressources tab)

- [CodeBuild: bo-env-killer](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/171946876898/projects/bo-env-killer/history?region=eu-west-1&builds-meta=%7B%22f%22%3A%7B%22text%22%3A%22%22%7D%2C%22s%22%3A%7B%7D%2C%22n%22%3A20%2C%22i%22%3A0%7D)

This codebuild is responsible for removing custom envs once the PR is merged (or `@izbot kill` command is launched).