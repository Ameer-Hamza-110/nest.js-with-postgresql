import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
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

}
