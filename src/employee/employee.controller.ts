import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { Employee } from './employee.entity.js';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    async create(@Body() data: Partial<Employee>): Promise<Employee> {
        return this.employeeService.createEmployee(data)
    }

    @Get()
    getAll() {
        return this.employeeService.findAllEmployee()
    }

    @Get(':id')
    getOne(@Param("id") id: number) {
        return this.employeeService.findOneEmployee(id)
    }


    @Put(':id')
    async update(
        @Param("id") id: number,
        @Body() data: Partial<Employee>
    ) {
        return await this.employeeService.updateData(id, data)
    }


    @Delete(":id")
    async delete(@Param("id") id: number): Promise<{ message: string }> {
        return await this.employeeService.deleteData(id)
    }
}
