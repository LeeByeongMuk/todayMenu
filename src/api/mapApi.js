import request from "./request";

const API_GEOCODE = `${process.env.REACT_APP_API_URL}/api/map/geocode`;

const fetchGeocode = async (params) => {
    params = new URLSearchParams(params);
    const url = `${API_GEOCODE}?${params}`;
    const options = {
        method: 'get',
        headers: {
            'Accept': 'application/json'
        }
    }

    try {
        const result = await request(url, options);

        return {
            success: true,
            data: result
        }
    } catch (e) {
        return {
            success: false,
            data: e
        }
    }
};

export {
    fetchGeocode
};