import axios from "axios";

export default function markersReducer(state = [], action) {
    console.log("action: ", action);

    if (action.type === "markers/get") {
        return [...state, ...action.payload];
    }

    if (action.type === "markers/save") {
        return [...state, action.payload];
    }

    // if (action.type === "user/offline") {
    //     return state.filter((user) => {
    //         return user.id != action.payload.id;
    //     });
    // }

    return state;
}

// export function usersOnline(data, userId) {
//     return async (dispatch) => {
//         const filteredData = data.filter((user) => user != userId);
//         const pendingUserPromises = filteredData.map(async (userId) => {
//             try {
//                 const resp = await axios.get(`/userInfo/${userId}`);
//                 console.log("data in slice User Online: ", resp);
//                 return resp.data;
//             } catch (error) {
//                 console.log(error);
//             }
//         });

//         Promise.all(pendingUserPromises).then((infoOnlineUsers) => {
//             dispatch({
//                 type: "users/online",
//                 payload: { infoOnlineUsers },
//             });
//         });
//     };
// }

export function getMarkers(data) {
    console.log("data in Action getMarkers: ", data);

    return {
        type: "markers/get",
        payload: data,
    };
}

export function saveNewMarker(data) {
    return async (dispatch) => {
        try {
            const newMarkerSaved = await axios.post(
                "/api/save-new-court",
                data
            );
            // return newMarkerSaved;
        } catch (error) {
            console.log(error);
        }

        dispatch({
            type: "markers/save",
            payload: data,
        });
    };
}
