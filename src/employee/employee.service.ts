import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity.js';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {
    constructor(@InjectRepository(Employee) private employeeRepo: Repository<Employee>) { }

    async createEmployee(data: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepo.create(data);
        return await this.employeeRepo.save(employee);
    }


    async findAllEmployee(): Promise<Employee[]> {
        return await this.employeeRepo.find()
    }

    async findOneEmployee(id: number): Promise<Employee> {
        const employee = await this.employeeRepo.findOneBy({ id })
        if (!employee) throw new NotFoundException(`Employee with: ${id} not found`);
        return employee;
    }
}
