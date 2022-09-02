export function mapObjectToUpdateQuery({ object: any, offset = 1 }) {
    const objectColumns = Object.keys(any)
        .map((key, index) => `"${key}"=$${index + offset}`)
        .join(",");
    const objectValues = Object.values(any);

    return { objectColumns, objectValues };
}
