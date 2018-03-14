# MeetOps

Quick dev-ops style tools to help meetup organisers written in node.js

# NONE OF THIS EXISTS!! IT IS A LIE

I am documenting things up front so I know what I want and how the end
result of the tool should feel. Things may change but this is more of a
goal/scope document for the project.

## Folder Structure

```
- docs/ - documentation for project
- events/ - test event data for triggering functions
- functions/ - specific functions (to be hosted on AWS/GC/Azure Serverless)
- packages/ - npm packages published to npm for re-use
```

## Use these yourself

`npm i @meetops/cli --save-dev` | `yarn add @meetops/cli -D`

All the following commands can be run either via:

* `npx meetops {command}` when using npm >= 5.0
* `yarn meetops {command}`

If running on npm < 5.0 either install globally `npm i @meetops/cli -g` or
add `"meetops": "meetops --",` to your `package.json` scripts then use

* `npm run meetops {command}`

## Command List

* `-h, --help` - show cli tool help
* `-v, --version` - show cli version
* `init` - setup folder structure and walk through some intial settings
* `use {function-name}` - copy down the latest version of the function
    from git, where `function-name` is the files name, without extension
* `deploy` - deploy your functions to the cloud provider (as configured) TODO
* `set` - set a configuration option (saved in meetops.js)