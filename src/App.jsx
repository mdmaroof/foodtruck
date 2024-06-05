// import { Map, Marker } from "pigeon-maps";
// import { maptiler } from "pigeon-maps/providers";
import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

// const maptilerProvider = maptiler("med80Nv6Q9kituik21N0", "streets");

const apiCall = "https://data.sfgov.org/resource/rqzj-sfat.json";

const TextBox = ({ heading, data }) => (
  <div>
    <div className="text-sm font-bold">{heading}</div>
    <div className="text-sm font-extralight">{data || "NA"}</div>
  </div>
);

const App = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterFacilityTypeSelect, setFilterFacilityType] = useState(null);
  const [filterStatusSelect, setFilterStatus] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const callAPi = async () => {
    setLoader(true);
    const response = await fetch(apiCall);
    if (response.status === 200) {
      const result = await response.json();
      setData(result);
    }
    setLoader(false);
  };

  useEffect(() => {
    callAPi();
  }, []);

  const uniq = (items) => [...new Set(items)];
  const filterFacilityType = uniq(data.map((item) => item.facilitytype));
  const filterStatus = uniq(data.map((item) => item.status));

  let filterData = data;

  if (filterFacilityTypeSelect) {
    filterData = filterData.filter(
      (z) => z.facilitytype === filterFacilityTypeSelect
    );
  }

  if (filterStatusSelect) {
    filterData = filterData.filter((z) => z.status === filterStatusSelect);
  }

  return (
    <div className="w-full h-screen relative">
      {/* Logo */}

      <div className="absolute top-2 left-5 z-10 p-4 text-white text-2xl font-bold bg-[rgba(0,0,0,0.75)]">
        Food Trucks in San Francisco
      </div>

      {/* filter box */}
      <div className="absolute right-5 top-5 bg-[rgba(0,0,0,0.75)] w-[300px] z-10 flex flex-col p-5 gap-3">
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
                if (z) return <option value={z}>{z}</option>;
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
                if (z) return <option value={z}>{z}</option>;
              })}
          </select>
        </div>
      </div>

      {/* data view */}
      {selectedTruck && (
        <div className="absolute left-5 top-24 bg-[rgba(0,0,0,0.75)] w-[300px] z-10 text-white px-4 py-2 flex flex-col gap-2">
          <TextBox heading="Applicant" data={selectedTruck.applicant} />
          <TextBox heading="Food Item" data={selectedTruck.fooditems} />
          <TextBox heading="Open Timing" data={selectedTruck.dayshours} />
          <TextBox heading="Facility Type" data={selectedTruck.facilitytype} />
          <TextBox heading="Status" data={selectedTruck.status} />
          <TextBox heading="Address" data={selectedTruck.address} />
          <TextBox
            heading="Location"
            data={selectedTruck.locationdescription}
          />

          <div
            className="border py-2 text-center w-full cursor-pointer my-2"
            onClick={() => setSelectedTruck(null)}
          >
            Close
          </div>
        </div>
      )}

      {loader && "Loading"}
      {!loader && (
        <APIProvider apiKey={""}>
          <Map
            style={{ width: "100vw", height: "100vh" }}
            defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
            defaultZoom={16}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          />

          {filterData.length > 0 &&
            filterData.map((z) => {
              return (
                <Marker
                  key={z.objectid}
                  position={{ lat: +z.latitude, lng: +z.longitude }}
                  onClick={() => setSelectedTruck(z)}
                />
              );
            })}
        </APIProvider>
      )}
    </div>
  );
};

export default App;
