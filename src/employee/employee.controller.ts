import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service.js';
import { Employee } from './employee.entity.js';
import { SupabaseAuthGuard } from '../auth/supabase-auth/supabase-auth.guard.js';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    async create(@Body() data: Partial<Employee>): Promise<Employee> {
        return this.employeeService.createEmployee(data)
    }

    @UseGuards(SupabaseAuthGuard)
    @Get()
    getAll() {
        return this.employeeService.findAllEmployee()
    }

    @Get('search') // why this search on top of :id route: so that nest find this route before :id route
    async searchEmployee(
        @Query('name') name?: string,
        @Query('department') department?: string,
    ) {
        return this.employeeService.searchEmployee({ name, department })
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
