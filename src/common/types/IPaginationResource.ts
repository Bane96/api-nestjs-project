export type IPaginatedResource<T> = {
    totalItems: number;
    data: T[];
    page: number;
    size: number;
};
