<a href="docs/images/logo.png"><img src="docs/images/logo.png"></a>

# Clouds And Edges

A Serverless & Databaseless Event-Sourced game powered by Cloudflare's Workers and Durable Objects.

This is a proof of concept projected created to test the feasibility of building an Event-Sourced system purely on Cloudflare Workers and Durable Objects. 

To properly explore the space I implemented a simple multiplayer game based on the popular [Dots and Boxes](https://en.wikipedia.org/wiki/Dots_and_Boxes) which I call "Clouds & Edges". 

## What it looks like

[INSERT VIDEO LINK HERE]

You can play this over at: [INSERT LINK HERE]

## Packages

At the top level the project is divided into a number of packages that use [yarn workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and [lerna](https://github.com/lerna/lerna).

- **essentials** - contains some basic utilities that can be shared with all packages
- **shared** - contains the the shared API and model that the site and server depend on
- **server** - contains the server-side part of the system that run on Cloudflare
- **site** - react application that runs in the browser
- **site-worker** - hosts the site on Cloudflare
- **workers-es** - contains project agnostic "Workers Event-Sourcing" code. This could potentially be turned into a public repo and published to npm.

See this part of the miro document for an overview of how all these parts fit together [TODO: INSERT MIRO HERE]

## Running it yourself

If you would like to run a copy of this locally yourself then you can, first clone the project and install the dependencies:

```
yarn install
```

Due to the way the mono-repo is structured for optimal IDE performance you must have TSC compiling in the background at all times:

```
yarn dev
```

Then in another terminal you can start the server running:

```
yarn server dev
```

In a third terminal window you can have the site running:

```
yarn site dev
```

There are a bunch of other commands you an run such as storybook or tests. See the "scripts" in the relevant `package.json` for whats available.

## Issues

I ran into a number of issues during development that perhaps make building an Event-Sourced system purely on Workers and Durable Objects. Its definitely possible as this repo demonstrates but it would probably make development considerably simpler if some external services were used too.

### Async and Cloudflare Workers

- can things run in the background?

## ToDo

Theres a number of outstanding tasks that if I had more time to spend I would look into.

### Proper Authentication

Currently the "auth token" is simply your user ID. This means that in theory anyone could execute API calls on behalf of any other user so long as you know their ID. Given more time it would fairly simple to implement some sort of simple auth such as JWT.

### Authorization

Hand in hand with Authentication comes Authorization. Currently there is no permissions or roles for users. Given more time it would be nice to give users roles particularly for "System Users" so that a distinction in user ability can be made.

### API Input Validation

Its obviously a good idea for a server to validate a user's input rather than blindly trusting it..well this project does none of that. It would be a simple matter of using [Zod](https://github.com/colinhacks/zod) or [io-ts](https://github.com/gcanti/io-ts) to ensure the input types at runtime match what you expect at compile time.

## Edge Cases

My past experience building a Serverless Event-Sourced solution at [Bamboo](https://www.getbamboo.io/) taught me that the devil is in the details with Event-Sourcing. There are a number of "gotchas" and edge-cases that you need to think about.

This project is functional however I know it likely has some nasty out-of-order bugs and edge cases that need to be properly thought out and tests cases written for.

Some quick edge-cases that would need to be considered:

- Ensure that when building / rebuilding read-models events are correctly buffered and played in the correct order
- Proper error handling and rollback of transactions if things go wrong
- 

## More Testing

Unit tests are embarrassingly sparse in this project unfortunately. I am usually a big fan of automated testing and often use TDD. Unfortunately however when you are kind of exploring your problem space by simply coding it things get added, deleted and moved around all the time. Doing thorough testing during that process just slows things down and makes the architecture too rigid too early.

Anyways, given more time I would most definitely be adding many more tests of various sorts (unit, integration, e2e) to ensure that all the various edge cases are handled.



## Notes For Video

1. Take them through the app
2. Take them into Miro and show them how the bits fit together
3. To dive a little deeper explain a rough overview of how the project is laid out, again can use miro
4. Rather than going through the code line by line, it might be best to explain some of the things it DOESNT do
  - 
5. Some of the things it DOES do..
  - hooks
  - rpc





- Make sure that the DO doesnt close the processes and projects
- Adding event to event store should be done in transaction just incase it fails the aggregate state set should be rolled back
- What happenes to the stored state if you dont reference it for a while?
- Issues are that the projections might have to use a different DB to support more powerful queries
- Make better use of react query keys according to that site
- probably xstate would be better for aggregates
- processes are not atomic so theres room for state corruption in there
- think about error retrys in processes, what if an event handler fails, do we retry?
- need to rebuild aggregates too
- Rebuilding Aggregates

- Lexographic order on event store means problems for event store
- event store currently has a limit or 9
- There are definately issues around rebuilding readmodels where events can come in while rebuilding etc



## Inspiration

I have been a fan of Event Sourcing for some time now and have even built a Serverless Event-Sourced system on AWS when I was working at [Bamboo](https://www.getbamboo.io/). At the time there was virtually nothing on the topic so we struggled through all the various edge cases to build the working system.

Now however there are a few good examples, one I have been watching for some time now is [Resolve](https://github.com/reimagined/resolve) from DevExpress. They are a much more competent at event 