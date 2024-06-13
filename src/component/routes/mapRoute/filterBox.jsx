const FilterBox = ({
  setFilterStatus,
  setFilterFacilityType,
  data
}) => {

  const uniq = (items) => [...new Set(items)];
  const filterFacilityType = uniq(data.map((item) => item.facilitytype));
  const filterStatus = uniq(data.map((item) => item.status));


  return (
    <>
      <div className="absolute right-5 top-5 bg-[rgba(0,0,0,0.75)] w-[300px] z-10 flex flex-col p-5 gap-3 border-2">
        <div className="text-2xl text-white">Filter</div>
        <div className="gap-1 flex flex-col text-white">
          <div>Status of Food Truck</div>
          <select
            onChange={(e) => setFilterStatus(e.target.value || null)}
            className="bg-transparent border border-white border-solid py-1"
          >
            <option value={""}>Select Status of Food Truck</option>
            {filterStatus.length > 0 &&
              filterStatus.map((z) => {
                if (z) return <option key={z}  value={z}>{z}</option>;
              })}
          </select>
        </div>
        <div className="gap-1 flex flex-col text-white">
          <div>Facility Type</div>
          <select
            onChange={(e) => setFilterFacilityType(e.target.value || null)}
            className="bg-transparent border border-white border-solid py-1"
          >
            <option value={""}>Select Facility Type</option>
            {filterFacilityType.length > 0 &&
              filterFacilityType.map((z) => {
                if (z) return <option key={z} value={z}>{z}</option>;
              })}
          </select>
        </div>
      </div>
    </>
  );
};

export default FilterBox;
