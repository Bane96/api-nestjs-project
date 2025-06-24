import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {FilterRule} from "../../enum/FilterRuleEnum";

export interface IFiltering {
    property: string;
    rule: string;
    value: string;
}

// valid filter rules
export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): IFiltering[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) return [];

    if (typeof data !== 'object') {
        throw new BadRequestException('Invalid filter parameter');
    }

    const filters = filter.split(',');

    const result: IFiltering[] = filters.map(f => {
        // Validate format
        const isValid =
            /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_@.:\-]+$/.test(f) ||
            /^[a-zA-Z0-9_]+:(isnull|isnotnull)$/.test(f);

        if (!isValid) {
            throw new BadRequestException(`Invalid filter format: ${f}`);
        }

        const [property, rule, value] = f.split(':');

        if (!data.includes(property)) {
            throw new BadRequestException(`Invalid filter property: ${property}`);
        }

        if (!Object.values(FilterRule).includes(rule as FilterRule)) {
            throw new BadRequestException(`Invalid filter rule: ${rule}`);
        }

        return { property, rule: rule as FilterRule, value };
    });
    console.log(result);
    return result;
});
