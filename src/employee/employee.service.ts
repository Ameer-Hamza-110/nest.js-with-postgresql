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
        if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);
        return employee;
    }

    async updateData(id: number, data: Partial<Employee>) {
        const employee = await this.employeeRepo.findOneBy({ id })
        if (!employee) throw new NotFoundException(`Employee with ID ${id} not found`);

        const updated = Object.assign(employee, data);
        return await this.employeeRepo.save(updated)
    }


    async deleteData(id: number): Promise<{ message: string }> {
        const result = await this.employeeRepo.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`)
        }
        return { message: `Employee with ID: ${id} hase been deleted` }
    }


    async searchEmployee(filters: { name?: string, department?: string }): Promise<Employee[]> {
        const query = this.employeeRepo.createQueryBuilder('employee');

        if (filters.name) {
            query.andWhere('employee.name ILIKE :name', { //ILIKE Ignores pg case sensitive rules
                name: `%${filters.name}%` // 
            })
        }

        if (filters.department) {
            query.andWhere('employee.department ILIKE :dept', {
                dept: `%${filters.department}%`
            })
        }

        return query.getMany();
    }
}
