import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "./redux/info/slice";

export default function Info() {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.toggleInfo);
    const markers = useSelector((state) => state.markers);

    const courtInfo = markers.filter((marker) => marker.id === info.idMarker);

    function closeInfo() {
        dispatch(toggleInfo(false, null));
    }

    return (
        <div className="court-info">
            <div className="box">
                <img
                    onError={(e) =>
                        (e.target.src =
                            "https://www.tagesspiegel.de/images/heprodimagesfotos85120190621beach_362_1_20190620140240280-jpg/24483796/5-format6001.jpg")
                    }
                    src={
                        courtInfo[0].foto ||
                        "https://www.tagesspiegel.de/images/heprodimagesfotos85120190621beach_362_1_20190620140240280-jpg/24483796/5-format6001.jpg"
                    }
                    alt=""
                />
                <div className="text">
                    <h2>{courtInfo[0].name}</h2>
                    <p>{courtInfo[0].description}</p>
                    <p>Ratings: {courtInfo[0].rating}</p>
                </div>
                <a
                    href={`https://www.google.com/maps?saddr=My+Location&daddr=${courtInfo[0].lat},${courtInfo[0].lng}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Get directions to this place
                </a>
                <div className="close" onClick={closeInfo}>
                    Close
                </div>
            </div>
        </div>
    );
}
