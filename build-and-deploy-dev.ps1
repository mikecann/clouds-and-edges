# First lets build the server
yarn server build

# Now we can publish the server
yarn server deploy

# Now lets build the site ensuring that its going to point to the corrcet location
yarn cross-env VITE_SERVER_ROOT="https://clouds-and-edges-server-dev.mikeysee.workers.dev" yarn build

# Now we can deploy the site to the worker
yarn site-worker deploy
