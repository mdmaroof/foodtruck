// library
import { useEffect, useState } from "react";
// component
import Heading from "./component/routes/mapRoute/heading";
import FilterBox from "./component/routes/mapRoute/filterBox";
import DataView from "./component/routes/mapRoute/dataView";
import MapView from "./component/routes/mapRoute/mapView";
import { Loader } from "./component/common/loader";
// functions
import { filterDataFunction } from "./functions/filterDataMap";
// api call
import { callAPi } from "./api/mapApi/apiCall";

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

  let filterData = filterDataFunction(data, filterFacilityTypeSelect, filterStatusSelect);

  return (
    <div className="w-full h-screen relative">
      {loader && <Loader />}
      {!loader && (
        <>
          <Heading />
          <FilterBox
            setFilterStatus={setFilterStatus}
            setFilterFacilityType={setFilterFacilityType}
            data={data}
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
