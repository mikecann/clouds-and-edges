export type ReadModelAdminStatus = `not-built` | `building` | `built`;

export interface ReadModelAdminState {
  status: ReadModelAdminStatus;
}
