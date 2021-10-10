<a href="docs/images/logo.png"><img src="docs/images/logo.png"></a>

# Clouds And Edges

A serverless & databaseless event-sourced game powered by Cloudflare's Workers and Durable Objects.

## Getting Started

```
yarn install
```

At all times have the type-checker running

```
yarn dev
```

In one terminal:

```
yarn server dev
```

In another

```
yarn site dev
yarn site storybook
```

## ToDo

- Stronger typesafty on commands
- Proper validation for commands coming from the client
- Do proper configs
- Ensure event stoage is secure and no overlaps or lost events etc
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