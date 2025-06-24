import { IsNull, Not, LessThan, LessThanOrEqual, MoreThan, MoreThanOrEqual, ILike, In } from "typeorm";
import {IFiltering} from "../service/filter.service";
import {FilterRule} from "../../enum/FilterRuleEnum";
import {Sorting} from "../service/sorting.service";

export const getOrder = (sort: Sorting) => sort ? { [sort.property]: sort.direction } : {};

export const getWhere = (filters: IFiltering[]): Record<string, any> => {
    const where: Record<string, any> = {};

    for (const filter of filters) {
        if (!filter) continue;

        let condition: any;

        switch (filter.rule) {
            case FilterRule.IS_NULL:
                condition = IsNull();
                break;
            case FilterRule.IS_NOT_NULL:
                condition = Not(IsNull());
                break;
            case FilterRule.EQUALS:
                condition = filter.value;
                break;
            case FilterRule.NOT_EQUALS:
                condition = Not(filter.value);
                break;
            case FilterRule.GREATER_THAN:
                condition = MoreThan(filter.value);
                break;
            case FilterRule.GREATER_THAN_OR_EQUALS:
                condition = MoreThanOrEqual(filter.value);
                break;
            case FilterRule.LESS_THAN:
                condition = LessThan(filter.value);
                break;
            case FilterRule.LESS_THAN_OR_EQUALS:
                condition = LessThanOrEqual(filter.value);
                break;
            case FilterRule.LIKE:
                condition = ILike(`%${filter.value}%`);
                break;
            case FilterRule.NOT_LIKE:
                condition = Not(ILike(`%${filter.value}%`));
                break;
            case FilterRule.IN:
                condition = In(filter.value.split(','));
                break;
            case FilterRule.NOT_IN:
                condition = Not(In(filter.value.split(',')));
                break;
        }

        if (condition !== undefined) {
            where[filter.property] = condition;
        }
    }

    return where;
};


//Function for single filter param
// export const getWhere = (filter: IFiltering) => {
//     if (!filter) return {};
//
//     if (filter.rule == FilterRule.IS_NULL) return { [filter.property]: IsNull() };
//     if (filter.rule == FilterRule.IS_NOT_NULL) return { [filter.property]: Not(IsNull()) };
//     if (filter.rule == FilterRule.EQUALS) return { [filter.property]: filter.value };
//     if (filter.rule == FilterRule.NOT_EQUALS) return { [filter.property]: Not(filter.value) };
//     if (filter.rule == FilterRule.GREATER_THAN) return { [filter.property]: MoreThan(filter.value) };
//     if (filter.rule == FilterRule.GREATER_THAN_OR_EQUALS) return { [filter.property]: MoreThanOrEqual(filter.value) };
//     if (filter.rule == FilterRule.LESS_THAN) return { [filter.property]: LessThan(filter.value) };
//     if (filter.rule == FilterRule.LESS_THAN_OR_EQUALS) return { [filter.property]: LessThanOrEqual(filter.value) };
//     if (filter.rule == FilterRule.LIKE) return { [filter.property]: ILike(`%${filter.value}%`) };
//     if (filter.rule == FilterRule.NOT_LIKE) return { [filter.property]: Not(ILike(`%${filter.value}%`)) };
//     if (filter.rule == FilterRule.IN) return { [filter.property]: In(filter.value.split(',')) };
//     if (filter.rule == FilterRule.NOT_IN) return { [filter.property]: Not(In(filter.value.split(','))) };
// }