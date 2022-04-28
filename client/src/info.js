import { useDispatch, useSelector } from "react-redux";
import { toggleInfo } from "./redux/info/slice";
import Weather from "./weather";

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
                    <p>Rating: {courtInfo[0].rating} stars</p>
                    <div className="flex">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 0 24 24"
                            width="24px"
                        >
                            <path d="M0 0h24v24H0z" fill="none" />
                            <path d="M21.71 11.29l-9-9c-.39-.39-1.02-.39-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z" />
                        </svg>
                        <a
                            href={`https://www.google.com/maps?saddr=My+Location&daddr=${courtInfo[0].lat},${courtInfo[0].lng}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Get directions to this court
                        </a>
                    </div>
                    <Weather />
                </div>
                <div className="close" onClick={closeInfo}>
                    Close
                </div>
            </div>
        </div>
    );
}
