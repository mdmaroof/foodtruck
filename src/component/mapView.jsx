import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { styles } from "../mapStyle";

const MapView = ({ data }) => {
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

            {data.length > 0 &&
                data.map((z) => {
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