// library
import { useEffect, useState, createContext } from "react";
// component
import Heading from "./component/routes/mapRoute/heading";
import FilterBox from "./component/routes/mapRoute/filterBox";
import DataView from "./component/routes/mapRoute/dataView";
import MapView from "./component/routes/mapRoute/mapView";
import { Loader } from "./component/common/loader";

export const SelectedTruckContext = createContext();

// api call
import { callAPi } from "./api/mapApi/apiCall";

const App = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);
  const [filterFacilityTypeSelect, setFilterFacilityType] = useState(null);
  const [filterStatusSelect, setFilterStatus] = useState(null);
  const [selectedTruck, setSelectedTruck] = useState(null);

  const dataHandle = async () => {
    setLoader(true);
    try {
      const dataApi = await callAPi();
      setData(dataApi);
      setTimeout(() => {
        setLoader(false);
      }, 2000);
    } catch (err) {
      setLoader(false);
      alert(err);
    }
  };

  useEffect(() => {
    dataHandle();
  }, []);

  return (
    <div className="relative w-full h-screen">
      {loader && <Loader />}
      {!loader && (
        <>
          <Heading />
          <FilterBox
            setFilterStatus={setFilterStatus}
            setFilterFacilityType={setFilterFacilityType}
            data={data}
          />
          <SelectedTruckContext.Provider
            value={{
              selectedTruck,
              setSelectedTruck,
              data,
              filterFacilityTypeSelect,
              filterStatusSelect,
            }}
          >
            <DataView
              selectedTruck={selectedTruck}
              setSelectedTruck={setSelectedTruck}
            />
            <MapView />
          </SelectedTruckContext.Provider>
        </>
      )}
    </div>
  );
};

export default App;
