# Deployment

This documentation covers backoffices v3 deployment guide & some related concepts.

## Summary

- [Deployment workflow](#deployment-workflow)
- [Deployment Guides](#deployment-guides)
    - [Beta deployment](#beta-deployment)
    - [Production deployment](#production-deployment)
    - [Hotfix](#hotfix)
    - [Custom environment](#custom-environment)
    - [Backoffices V2 deployment](#backoffices-v2-deployment)
    
![github-large](https://raw.githubusercontent.com/izberg-marketplace/izberg-backoffice-ui/b482e2a337ecb4ac16c8fc823ef57fc088c9e673/docs/workflow-bov3.svg?token=AACRRLVVVNS4V6LD3GORZDK7KH7BI)    


## Deployment workflow

A normal feature/bugfix lifecycle of Backoffice is as follow :

```
local env -> custom environment -> ci -> beta -> production
```

First, the feature is developed locally on a new feature branch (we use standard git workflow).

Once the development is completed, the developer push the feature into github. This triggers a [custom environment deployment](#custom-environment).

Once the QA passed, the developer merges the feature branch into `master`. This triggers a ci deployment.

Then, the developer merges a batch of features from `master` to `beta` environment. This triggers a [beta deployment](#beta-deployment). 

Finally, when the prod release day comes, the developer merges `beta` to `production` branch. This triggers a [production deployment](#production-deployment). This is when the new feature/bugfix becomes visible to the users.

In following section, step-by-step guide to deploy backoffice is provided.

## Deployment Guides

### Beta Deployment

- First, ensure that all translations for new features are done and merged (at least in french). For more information about localization process, see [Localization](/docs/Localization).

- Create a PR from `master` to `beta` ([link](https://github.com/izberg-marketplace/izberg-backoffice-ui/compare/beta...master)).
    - The PR should be titled `feat: Release Beta YYYYMMDD`
    - The PR should be tagged with github tag `Release`

- Merge this PR once all checks passed. 
- Monitor the merge commit build in [Travis](https://travis-ci.com/github/izberg-marketplace/izberg-backoffice-ui/branches). Once this build passes, the beta deployment is completed.

Note: if production & beta deployment happen on the same day, the beta merge should always be done after the production merge. 


### Production deployment

- Create a PR from `beta` to `production` ([link](https://github.com/izberg-marketplace/izberg-backoffice-ui/compare/production...beta)).
    - The PR should be titled `feat: Release YYYYMMDD`
    - The PR should be tagged with github tag `Release`
- Merge this PR once all checks passed. 
- Monitor the merge commit build in [Travis](https://travis-ci.com/github/izberg-marketplace/izberg-backoffice-ui/branches). Once this build passes, the production deployment is completed.

### Hotfix

- To begin a hotfix, create a feature branch from `production`:

```sh
git checkout production
git checkout -b feat-{{BUG_ID}}
```

- Implement the hotfix
- Push the branch to github, and create a PR from the branch to `production`
- Merge this PR once all checks passed.
- Monitor the merge commit build in [Travis](https://travis-ci.com/github/izberg-marketplace/izberg-backoffice-ui/branches). Once this build passes, the production hotfix deployment is completed.


### Custom environment

Custom environment is created when the feature branch begins with `feat-`.

It uses [serverless framework](https://www.serverless.com/) which will create a cloudformation stack (as opposed to ci/beta/prod environment which are elasticbeanstalk containers).

When the feature PR is merged into `master`, the stack remove command is executed (a [github webhook](https://github.com/izberg-marketplace/izberg-backoffice-ui/settings/hooks/239519114) is sent to [codebuild](https://eu-west-1.console.aws.amazon.com/codesuite/codebuild/171946876898/projects/bo-env-killer/history?region=eu-west-1&builds-meta=%7B%22f%22%3A%7B%22text%22%3A%22%22%7D%2C%22s%22%3A%7B%7D%2C%22n%22%3A20%2C%22i%22%3A0%7D) which triggers a `remove` build). You can also use `@izbot kill` command in slack to remove the stack manually. 

Caveats: Due to an [API Gateway limitation](https://stackoverflow.com/questions/46567910/aws-cloudfront-distribution-does-not-show-api-gateway-distribution), the certificate created during custom environment creation can't be removed using remove command. It's recommended to visit the [AWS Certificate Manager](https://console.aws.amazon.com/acm/home?region=us-east-1#/) to clean the old certifs once in a while.


### Backoffices V2 deployment

[Backoffices V2 Deployment Guide](https://izberg.atlassian.net/wiki/spaces/DEV/pages/265027587/PRD+-+IA+-+BO+-+Deployment+Guide) still applies, with some modifications :

- During bo v2 stage deployment, `beta` needs to be merged into `production`, instead of `master` into `production`. This corresponds to BO V3 [Production Deployment](#production-deployment) step.

- BO V2 production & hotfix deployment remain unchanged. 

It is recommended to deploy bo v3 production & beta environment each week (production & then beta). Every two weeks, the developer deploys bo v2 stage environment, and the following week the developer deploys bo v2 production environment. 

This creates for some US a delay of 1 week between bo v3 & bo v2 production environment. But the main focus is BO v3, and BO v2 is to be deprecated, so this limit should be tolerable.
