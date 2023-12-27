export type IPaginatedResource<T> = {
    totalItems: number;
    items: T[];
    page: number;
    size: number;
};
