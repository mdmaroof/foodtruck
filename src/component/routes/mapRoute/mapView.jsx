import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { styles } from "../../../mapStyle";
import { filterDataFunction } from "../../../functions/filterDataMap";

const MapView = ({ data, filterStatusSelect, filterFacilityTypeSelect }) => {
    let filterData = filterDataFunction(data, filterFacilityTypeSelect, filterStatusSelect);
    return (
        <APIProvider apiKey={"AIzaSyBqgs_hvjwBuPDZ9qn0ntHprZq3hBJSqTI"}>
            <Map
                style={{ width: "100vw", height: "100vh" }}
                defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                defaultZoom={14}
                gestureHandling={"greedy"}
                disableDefaultUI={true}
                options={{ styles }}
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
    )
}

export default MapView;