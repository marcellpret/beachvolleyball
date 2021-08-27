export default function infoReducer(state = false, action) {
    if (action.type === "info/toggle") {
        return action.payload;
    }

    return state;
}

export function toggleInfo(boolean, idMarker) {
    return {
        type: "info/toggle",
        payload: { boolean, idMarker },
    };
}
