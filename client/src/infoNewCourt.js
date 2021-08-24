import StarRating from "./starRating";
import { useDispatch } from "react-redux";

export default function InfoNewCourt() {
    const dispatch = useDispatch();

    function saveCourt() {
        console.log("U clicked the button");
    }

    return (
        <div className="new-court">
            <form>
                <label htmlFor="name">Name the court</label>
                <input type="text" name="name" id="name" />
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description"></textarea>
                <label htmlFor="conditions"></label>

                <StarRating />

                <button className="save" onClick={saveCourt}>
                    Save
                </button>
            </form>
        </div>
    );
}
