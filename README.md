# Tinkering With Durable Objects

Some experiments with Cloudflare's Durable Objects

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