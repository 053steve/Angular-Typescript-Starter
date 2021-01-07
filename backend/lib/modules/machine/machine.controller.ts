import {
  Body,
  Get,
  Path,
  Post,
  Query,
  Route,
  Request,
  Put,
  Delete,
  Tags,
  Security,
} from "tsoa";
import * as express from 'express';
import { MachineService } from './machine.service';
import {ApiError} from "../../common/utils/apiError";
import {MachinePayload, MachineReq, MachineResponse} from "./machine.interface";

@Route("machine")
export class MachineController {

  @Post('create')
  @Tags('machine')
  public async createMachine(@Body() requestBody: MachineReq): Promise<MachineResponse> {
      const result: MachinePayload = await new MachineService().createNewMachine(requestBody)
      const machineResponse: MachineResponse = {
          success: true,
          payload: {
              machine: result.machine
          }
      }

      return machineResponse;
  }

    @Put("update/{machineId}")
    @Tags('machine')
    public async updateMachine(
        @Path() machineId: string,
        @Body() machine: MachineReq
    ) :Promise<MachineResponse> {
        const machineService = new MachineService();
        try {
            const getMachineResult: MachinePayload = await machineService.getMachine(machineId);
            const updatedMachineResult = await machineService.updateMachine(getMachineResult.machine, machine);

            const machineResponse: MachineResponse = {
                success: true,
                payload: {
                  machine: updatedMachineResult.machine
                }
            }

            return machineResponse;

        } catch (err) {
            throw new ApiError(false,"Update Fail",400,"Update failed");
        }

    }

    @Get("detail/{machineId}")
    @Tags('machine')
    public async getMachine(@Path() machineId: string): Promise<MachineResponse> {

        const result: MachinePayload = await new MachineService().getMachine(machineId);
        const machineResponse: MachineResponse = {
            success: true,
            payload: {
                machine: result.machine
            }
        }

        return machineResponse;

    }

    @Delete("delete/{machineId}")
    @Tags('machine')
    public async deleteMachine(
        @Path() machineId: string
    ): Promise<MachineResponse> {
        const machineService = new MachineService();
        try {
            const getMachineResult: MachinePayload = await machineService.getMachine(machineId);
            await machineService.deleteMachine(getMachineResult.machine);

            const machineResponse: MachineResponse = {
                success: true,
            }

            return machineResponse;

        } catch (err) {
            throw new ApiError(false,"Delete Fail",400,"Delete failed");
        }

    }

    @Get('list')
    @Tags('machine')
    public async getAllMachines(
        @Query() pageNumber?: number,
        @Query() pageSize?: number,
        @Query() filter?: string,
        @Query() sortOrder?: string,
        @Request() req?: express.Request
    ): Promise<MachineResponse> {
        const result: MachinePayload = await new MachineService().getAllMachines(req.query);
        const machineResponse: MachineResponse = {
            success: true,
            payload: {
                machines: result.machines,
                machineLength: result.machineLength
            }
        }

        return machineResponse;
    }

    @Get("search")
    @Tags('machine')
    public async getMachineByName(
        @Query() name: string,
        @Query() pageNumber?: number,
        @Query() pageSize?: number,
        @Query() filter?: string,
        @Query() sortOrder?: string,
        @Request() req?: express.Request
    ): Promise<MachineResponse> {
        const userService = new MachineService();
        try {
            const query = {
                name,
                pageNumber,
                pageSize,
                filter,
                sortOrder,
                ...req.query
            }

            const result: MachinePayload = await userService.getMachineByName(query);

            const machineResponse: MachineResponse = {
                success: true,
                payload: {
                    machines: result.machines,
                    machineLength: result.machineLength
                }
            }

            return machineResponse;

        } catch (err) {
            throw new ApiError(false,"Get Fail",400,"Cannot Get Machines");
        }

    }

}
