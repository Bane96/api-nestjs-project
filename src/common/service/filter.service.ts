import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import {FilterRule} from "../../enum/FilterRuleEnum";

export interface IFiltering {
    property: string;
    rule: string;
    value: string;
}

// valid filter rules
export const FilteringParams = createParamDecorator((data, ctx: ExecutionContext): IFiltering => {
    const req: Request = ctx.switchToHttp().getRequest();
    const filter = req.query.filter as string;
    if (!filter) return null;

    // check if the valid params sent is an array
    if (typeof data != 'object') throw new BadRequestException('Invalid filter parameter');

    // validate the format of the filter, if the rule is 'isnull' or 'isnotnull' it don't need to have a value
    if (!filter.match(/^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/) && !filter.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)) {
        throw new BadRequestException('Invalid filter parameter');
    }

    // extract the parameters and validate if the rule and the property are valid
    const [property, rule, value] = filter.split(':');
    if (!data.includes(property)) throw new BadRequestException(`Invalid filter property: ${property}`);
    if (!Object.values(FilterRule).includes(rule as FilterRule)) throw new BadRequestException(`Invalid filter rule: ${rule}`);
    console.log(property, rule, value)
    return { property, rule, value };
});
