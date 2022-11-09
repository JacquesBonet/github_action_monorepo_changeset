# Commit Message Conventions

This documentation describes the conventions for commit messages in this repo & explains why it needs to be as strict.

## Summary
- [Allowed message formats](#allowed-message-formats)
- [Why we need to follow this format](#)
- [El Validator](#el-validator)

## Allowed message formats

```
feat(bd-123): title summaries the feature
fix(qq-456): title summaries the fix
refactor(misc): title summaries the refactor
feat: i don't have a jira ticket for this feature
[skip ci] fix(misc): title summaries the miscellaneous fix
```

The format is a subset of [Convential Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary), with the `scope` field reserved for jira ticket id.

## Why we need to follow this format

Above consistency, this format allows our internal tool changelog generator to work. This tool relies on the commit messages to know which features are being deployed, and post a changelog in `#bot-deploy`.

Changelog generator sourcecode is hosted in [deployment](https://github.com/izberg-marketplace/deployment/blob/master/izberg/deployment/scripts/generate_changelog.py) repo.

## El Validator

Hard-at-work El Validator is the commit message checker that pops up in `izberg-backoffice-ui` PRs. It's source code is hosted [here](https://github.com/izberg-marketplace/deployment/blob/master/izberg/deployment/lambdas/prchecker/backoffices.py). 