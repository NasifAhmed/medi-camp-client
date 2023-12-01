import axios from "axios";

export function imgBBupload(img: string) {
    const body = new FormData();
    body.set("key", `${import.meta.env.VITE_IMGBB_API_KEY}`);
    body.append("image", img);

    return axios({
        method: "post",
        url: "https://api.imgbb.com/1/upload",
        data: body,
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
