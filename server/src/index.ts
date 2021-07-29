import isOdd from 'is-odd'

export interface EnvInterface {
  COUNTER: DurableObjectNamespace
}

// In order for the workers runtime to find the class that implements
// our Durable Object namespace, we must export it from the root module.
export { Counter } from './Counter'

export default {
  async fetch(request: Request, env: EnvInterface): Promise<Response> {
    try {
      return await handleRequest(request, env)
    } catch (e) {
      return new Response(e.message)
    }
  },
}

async function handleRequest(
  request: Request,
  env: EnvInterface,
): Promise<Response> {
  const startTime = Date.now()

  let id = env.COUNTER.idFromName('A')
  let obj = env.COUNTER.get(id)
  let resp = await obj.fetch(request.url)
  let count = parseInt(await resp.text())
  let wasOdd = isOdd(count) ? 'is odd' : 'is even'

  const delta = Date.now() - startTime

  return new Response(`Hi Mike  ${count} ${wasOdd} that took ${delta}ms`)
}
