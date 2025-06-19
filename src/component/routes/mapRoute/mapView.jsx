import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { styles } from "../../../mapStyle";
import Markers from "../../../component/common/Marker";

const MapView = () => {
  return (
    <APIProvider apiKey={"AIzaSyBqgs_hvjwBuPDZ9qn0ntHprZq3hBJSqTI"}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        options={{ styles }}
      >
        <Markers/>
      </Map>
    </APIProvider>
  );
};

export default MapView;
