import {db} from '../../db';
import {ApiError} from "../../common/utils/apiError";
import {IMachine, MachinePayload, ISafeMachine, MachineResponse, MachineReq} from "./machine.interface";
import {Query} from "tsoa";
import Sequelize from "sequelize";

const Op = Sequelize.Op;

export class MachineService {

  public async createNewMachine(machine): Promise<MachinePayload> {

    let newMachine: any;

    try {

      newMachine = await db.Machine.create(machine);

    } catch (err) {
        console.log(err);
        throw new ApiError(false, "SaveError",422, err.message, err.code);
    }
    return { machine: newMachine };
}

public async updateMachine(machine: any, updateMachine: MachineReq): Promise<MachinePayload> {


  if (!machine || !updateMachine) {
      throw new ApiError(false,"MachineServiceError",422,"update machine not sent");
  }

  Object.assign(machine, updateMachine);

  try {
      await machine.save()

      return { machine };

  } catch (err) {
      throw new ApiError(false,"MachineServiceError",422,"cannot save machine");
  }
}

public async getMachine(machineId): Promise<MachinePayload>  {

  let machine: any;

  try {
    machine = await db.Machine.findOne({where: {id: machineId}});

      if (!machine) {
          throw new ApiError(false,"MachineNotFound",400,"machine not found");
      }

      return { machine };

  } catch (err) {

      if (err === 404 || err.name === 'CastError') {
          throw new ApiError(false,"CastError",404,"cast error");

      }

      throw new ApiError(false,"MachineNotFound",422,"something wrong while getting machine");
  }

}

public async deleteMachine(machine: any): Promise<MachinePayload> {
  if (!machine) { //passing user
      throw new ApiError(false,"MachineServiceError",422,"update machine not sent");
  }

  try {
      await machine.destroy();
      return { machine };

  } catch (err) {
      throw new ApiError(false,"MachineServiceError",422,"cannot save machine");
  }

}

public async getMachineByName(reqQuery: any): Promise<MachinePayload> {

  const pageOptions = {
      pageNumber: Number(reqQuery.pageNumber) || 0,
      pageSize: Number(reqQuery.pageSize) || 10,
      filter: reqQuery.filter || '',
      sortOrder:reqQuery.sortOrder || 'desc'
  }

  const query = (
      reqQuery.name
  ) ? this.transformQueryToObj(reqQuery) : {};

  try {
      const machines: any[] = await db.Machine.findAll({
          where: query,
          offset: pageOptions.pageNumber * pageOptions.pageSize,
          limit: pageOptions.pageSize,
          order: [['createdAt', pageOptions.sortOrder]]
      });

      if (!machines) {
          throw new ApiError(false,"MachineNotFound",422,"cannot find machine");
      }

      const machineLength = await db.Machine.count({where: query});

      return {machines: machines, machineLength }
  } catch (err) {
      throw new ApiError(false,"MachineServiceError",422,"cannot get machine");
  }
}

public async getAllMachines(reqQuery): Promise<MachinePayload> {

  const pageOptions = {
      pageNumber: Number(reqQuery.pageNumber) || 0,
      pageSize: Number(reqQuery.pageSize) || 10,
      filter: reqQuery.filter || '',
      sortOrder: reqQuery.sortOrder || 'DESC'
  }

  try {

      const machines: any[] = await db.Machine.findAll({
          offset: pageOptions.pageNumber * pageOptions.pageSize,
          limit: pageOptions.pageSize,
          order: [['createdAt', pageOptions.sortOrder]]
      });


      if (!machines) {
          throw new ApiError(false,"MachineNotFound",422,"cannot find machine");
      }

      const machineLength = await db.Machine.count();


      return { machines, machineLength }

  } catch (err) {
      if (err === 404 || err.name === 'CastError') {
          throw new ApiError(false,"MachineNotFound",404,"CastError");
      }

      throw new ApiError(false,"MachineNotFound",422,"something wrong while getting machine");
  }
}

private transformQueryToObj(query) {
  return {
      ...query.name && {name: { [Op.like]: `%${query.name}%` }}
  };
}

}
