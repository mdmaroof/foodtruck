const TextBox = ({ heading, data }) => (
    <div>
      <div className="text-sm font-bold">{heading}</div>
      <div className="text-sm font-extralight">{data || "NA"}</div>
    </div>
  );
const DataView = ({ selectedTruck, setSelectedTruck }) => (
  <>
    {selectedTruck && (
      <div className="absolute left-5 top-24 bg-[rgba(0,0,0,0.75)] w-[300px] z-10 text-white px-4 py-2 flex flex-col gap-2">
        <TextBox heading="Applicant" data={selectedTruck.applicant} />
        <TextBox heading="Food Item" data={selectedTruck.fooditems} />
        <TextBox heading="Open Timing" data={selectedTruck.dayshours} />
        <TextBox heading="Facility Type" data={selectedTruck.facilitytype} />
        <TextBox heading="Status" data={selectedTruck.status} />
        <TextBox heading="Address" data={selectedTruck.address} />
        <TextBox heading="Location" data={selectedTruck.locationdescription} />

        <div
          className="border py-2 text-center w-full cursor-pointer my-2"
          onClick={() => setSelectedTruck(null)}
        >
          Close
        </div>
      </div>
    )}
  </>
);

export default DataView;
