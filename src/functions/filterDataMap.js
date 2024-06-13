export const filterDataFunction = (data, filterFacilityTypeSelect, filterStatusSelect) => {
    let filterData = data;
    if (filterFacilityTypeSelect) {
        filterData = filterData.filter(
            (z) => z.facilitytype === filterFacilityTypeSelect
        );
    }
    if (filterStatusSelect) {
        filterData = filterData.filter((z) => z.status === filterStatusSelect);
    }

    return filterData;
}