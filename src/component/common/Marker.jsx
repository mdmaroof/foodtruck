import { Marker, useMap } from "@vis.gl/react-google-maps";
import { useEffect, useContext } from "react";
import { createCircleIcon, createRectangleIcon } from "../../assets/svg";
import { SelectedTruckContext } from "../../App";
import { filterDataFunction } from "../../functions/filterDataMap";

const Markers = ({ trucks }) => {
  const map = useMap();
  const {
    data,
    filterFacilityTypeSelect,
    selectedTruck,
    setSelectedTruck,
    filterStatusSelect,
  } = useContext(SelectedTruckContext);
  const filterData = filterDataFunction(
    data,
    filterFacilityTypeSelect,
    filterStatusSelect
  );

  useEffect(() => {
    if (!selectedTruck) {
      if (map) {
        map.setZoom(14);
      }
    }
  }, [selectedTruck]);

  const handleMarkerClick = async (truck) => {
    if (selectedTruck === truck) {
      return;
    }
    setSelectedTruck(truck);
    const position = { lat: +truck.latitude, lng: +truck.longitude };
    if (map) {
      setTimeout(() => {
        map.panTo(position);
        map.setZoom(16);
      }, 100);
    }
  };

  return (
    <>
      {selectedTruck && (
        <Marker
          key={selectedTruck.objectid}
          position={{
            lat: +selectedTruck.latitude,
            lng: +selectedTruck.longitude,
          }}
          icon={
            selectedTruck.facilitytype === "Truck"
              ? createCircleIcon(selectedTruck.status)
              : createRectangleIcon(selectedTruck.status)
          }
          onClick={() => {}}
        />
      )}

      {!selectedTruck && (
        <>
          {filterData.map((truck) => {
            const isCircle = truck.facilitytype === "Truck";
            return (
              <Marker
                key={truck.objectid}
                position={{ lat: +truck.latitude, lng: +truck.longitude }}
                icon={
                  isCircle
                    ? createCircleIcon(truck.status)
                    : createRectangleIcon(truck.status)
                }
                onClick={() => handleMarkerClick(truck)}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default Markers;
