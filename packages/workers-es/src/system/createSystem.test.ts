import { AggreateDurableObject } from "../aggregates/AggreateDurableObject";
import { ProjectionDurableObject } from "../projections/ProjectionDurableObject";
import { ProcessDurableObject } from "../processes/ProcessDurableObject";
import { BaseEventStore } from "../events/BaseEventStore";
import { createSystem, ESSystemDefinition } from "./system";
import { DurableObjectNamespace } from "miniflare/dist/modules/do";

class TestAggregate extends AggreateDurableObject {}

class TestProjection extends ProjectionDurableObject {}

class TestProcess extends ProcessDurableObject {}

class TestEventStore extends BaseEventStore {}

const env: any = {
  TestEventStore: new DurableObjectNamespace(`TestEventStore`, jest.fn()) as any,
  TestAggregate: new DurableObjectNamespace(`TestAggregate`, jest.fn()) as any,
  TestProjection: new DurableObjectNamespace(`TestProjection`, jest.fn()) as any,
  TestProcess: new DurableObjectNamespace(`TestProcess`, jest.fn()) as any,
};

const createTestSystem = () =>
  createSystem({
    namespaces: {
      aggregates: {
        testAgg: TestAggregate,
      },
      projections: {
        testProj: TestProjection,
      },
      processes: {
        testProc: TestProcess,
      },
      events: TestEventStore,
    },
  });

it(`can get the event store proxy`, () => {
  const system = createTestSystem();
  const store = system.getEventStore(env);
  expect(store).not.toBeNull();
});

it(`can get an aggregate stub`, () => {
  const system = createTestSystem();
  const stub = system.getAggregateStub("testAgg", env, `123`);
  expect(stub).not.toBeNull();
});

it(`can get a projection proxy`, () => {
  const system = createTestSystem();
  const stub = system.getProjection("testProj", env);
  expect(stub).not.toBeNull();
});
