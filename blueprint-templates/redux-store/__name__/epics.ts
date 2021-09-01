import { logger } from "@project/essentials";
import { ThunkAC } from "../types";

const { log } = logger(`{{name}}`);

export const someEpic = (): ThunkAC => (dispatch) => {};
