import { FAIRSHOTS_API } from "./constants";
import { sendPhotoGetUrl } from "./photo-actions";
import toggleLoading from "./toggleLoading";

export function register(userType, formProps) {
    return async dispatch => {
        dispatch(toggleLoading());
        try {
            let imgRes = { secure_url: "/images/org-logo.png" };
            if ((formProps.ProfilePic && formProps.ProfilePic[0]) || (formProps.Logo && formProps.Logo[0])) {
                if (userType === "photographer") {
                    imgRes = await sendPhotoGetUrl(formProps.ProfilePic[0], "lsofhgqb");
                } else {
                    imgRes = await sendPhotoGetUrl(formProps.Logo[0], "lsofhgqb");
                }
            }
            const config = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: userType === "photographer" ? JSON.stringify({ ...formProps, ProfilePic: imgRes.secure_url })
                    : JSON.stringify({ ...formProps, Logo: imgRes.secure_url, FundingPartner: formProps.funding === "Yes" })
            };
            console.log(config);
            const res = await fetch(`${FAIRSHOTS_API}api/${userType}`, config);
            if (res.ok) {
                const userProfile = await res.json();
                console.log(userProfile);
                dispatch(
                    {
                        type: "REG_SUCCESS",
                        payload: "Registration was successful. Please login now"
                    }
                );
                dispatch(toggleLoading());
            } else throw res;
        } catch (e) {
            console.log(e);
            dispatch(
                {
                    type: "REG_ERROR",
                    payload: "Oops! Something went wrong. Plase try again"
                }
            );
            dispatch(toggleLoading());
        }
    };
}

export function checkForm() {
    return {
        type: "REG_CHECKFORM",
        payload: "Please check your form"
    };
}

export function resetMessages() {
    return {
        type: "REG_RESET"
    };
}
