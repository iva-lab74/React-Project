import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
//make sure icon not broken 
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

//moves map around 
function Recenter({ position }) {
    //grabs map
    const map = useMap();
    map.setView(position, map.getZoom());

    return null;
}

function MapView({ lat, lng, label }) {
    const position = [lat, lng];
    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />\
            <Marker position={position}>
                <Popup>{label}</Popup>
            </Marker>
            <Recenter position={position} />
        </MapContainer>
    );
}
//make importable
export default MapView;