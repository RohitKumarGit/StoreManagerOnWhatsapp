import { STATES } from "../config/constants";

export class State {
  public stateCode: STATES;
  public message: string = "";
  public responseValidator: any;
  public nextState?: STATES;
  handler?: any;
  successMessage?: string;
  customMessage?: string;
}
