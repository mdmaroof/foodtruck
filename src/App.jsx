import { useEffect, useState } from "react";
import Heading from "./component/heading";
import FilterBox from "./component/filterBox";
import DataView from "./component/dataView";
import { callAPi } from "./api/mapApi/apiCall";
import MapView from "./component/mapView";
import { filterDataFunction } from "./functions/filterDataMap";


const App = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterFacilityTypeSelect, setFilterFacilityType] = useState(null);
  const [filterStatusSelect, setFilterStatus] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);

  useEffect(() => {
    setLoader(true);
    callAPi()
      .then(res => setData(res))
      .catch(err => alert(err))

    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  const uniq = (items) => [...new Set(items)];
  const filterFacilityType = uniq(data.map((item) => item.facilitytype));
  const filterStatus = uniq(data.map((item) => item.status));

  let filterData = filterDataFunction(data, filterFacilityTypeSelect, filterStatusSelect);

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
          <MapView data={filterData} />

        </>
      )}
    </div>
  );
};

export default App;
