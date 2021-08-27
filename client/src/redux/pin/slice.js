export default function pinReducer(state = [], action) {
    if (action.type === "court/pin") {
        return action.payload;
    }

    return state;
}

export function newPin(data) {
    console.log("data in Action pin: ", data);

    return {
        type: "court/pin",
        payload: data,
    };
}
