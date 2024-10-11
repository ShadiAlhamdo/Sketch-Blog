import axios from "axios"

const request=axios.create({
    baseURL:"https://localhost"
});

export default request