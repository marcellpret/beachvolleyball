import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { saveNewMarker } from "./redux/markers/slice";
import { togglePopup } from "./redux/new_court/slice";
import { newPin } from "./redux/pin/slice";
import axios from "axios";

export default function InfoNewCourt() {
    const dispatch = useDispatch();
    const pin = useSelector((state) => state.pin);

    const [info, setInfo] = useState({});
    console.log("info: ", info);

    function saveCourt(e) {
        e.preventDefault();
        console.log("U clicked the button");
        dispatch(saveNewMarker(infos));
        dispatch(togglePopup(false));
    }

    function closeNewCourt() {
        dispatch(togglePopup(false));
        dispatch(newPin([]));
    }

    function handleChange({ target }) {
        setInfo({ ...info, [target.name]: target.value });
    }

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const infos = { rating: rating, ...info, lng: pin[0], lat: pin[1] };
    console.log("infos: ", infos);

    function selectingFile({ target }) {
        console.log("target: ", target.files[0].name);

        var formData = new FormData();
        formData.append("file", target.files[0]);

        axios
            .post("/api/uploadPicture", formData)
            .then(({ data }) => {
                console.log("data in picture: ", data);
                setInfo({
                    ...info,
                    foto: data.foto,
                });
            })
            .catch((err) => console.log("err in /method: ", err));
    }

    return (
        <div className="new-court">
            <div className="box">
                <form>
                    <label htmlFor="name">Name the court</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        onChange={handleChange}
                    ></textarea>

                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={
                                        index <= (hover || rating)
                                            ? "on"
                                            : "off"
                                    }
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                >
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </div>

                    <label htmlFor="file">🔽 Update your picture</label>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept="image/*"
                        onChange={selectingFile}
                    />

                    <button className="save" onClick={saveCourt}>
                        Save
                    </button>
                    <div className="close" onClick={closeNewCourt}>
                        Close
                    </div>
                </form>
            </div>
        </div>
    );
}
