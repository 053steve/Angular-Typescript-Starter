import {FormatResponse} from "../../common/interfaces";
import {Base} from "../../common/interfaces/base";

export interface IMachine extends Base{
  name: string;
  shortName?: string;
  longName?: string;
}

export type ISafeMachine = Pick<IMachine, "name" | "shortName" | "longName" | "createdAt" | "updatedAt">;

export type MachineReq = Pick<IMachine,"name">;

export interface MachinePayload {
  machine?: ISafeMachine;
  machines?: ISafeMachine[];
  machineLength?: number;
}

export interface MachineResponse extends FormatResponse {
  payload? : MachinePayload
}
