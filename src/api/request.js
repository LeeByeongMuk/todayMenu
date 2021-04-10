const request = async (url, options) => {
    try {
        const response = await fetch(url, options);
        const data = await response.json();

        console.log(data);


        if (response.ok) {
            return data;
        } else {
            throw data;
        }
    } catch(e) {
        throw {
            message: e.message,
            status: e.status
        }
    }
};

export default request;