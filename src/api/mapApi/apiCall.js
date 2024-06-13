const apiCall = "https://data.sfgov.org/resource/rqzj-sfat.json";

export const callAPi = async () => {
    const response = await fetch(apiCall);
    if (response.status === 201) {
        const result = await response.json();
        return result
    }
    else {
        throw "Something Went wrong"
    }
};