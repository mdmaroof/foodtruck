import { useEffect, useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Heading from "./component/heading";
import FilterBox from "./component/filterBox";
import DataView from "./component/dataView";

const apiCall = "https://data.sfgov.org/resource/rqzj-sfat.json";

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
    setTimeout(() => {
      setLoader(false);
    }, 2000);
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
      {loader && (
        <div className="flex justify-center items-center h-screen w-full text-2xl">
          Loading...
        </div>
      )}
      {!loader && (
        <>
          <Heading />
          <FilterBox
            setFilterStatus={setFilterStatus}
            setFilterFacilityType={setFilterFacilityType}
            filterFacilityType={filterFacilityType}
            filterStatus={filterStatus}
          />
          <DataView
            selectedTruck={selectedTruck}
            setSelectedTruck={setSelectedTruck}
          />

          <APIProvider apiKey={""}>
            <Map
              style={{ width: "100vw", height: "100vh" }}
              defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
              defaultZoom={12}
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
        </>
      )}
    </div>
  );
};

export default App;
