import axios from "axios";

function httpGet(url, param, timeout) {
    return new Promise((resolve, reject) => {
        let config = {}
        if(param) {
            config.params = param
        }
        if(timeout) {
            config.timeout = timeout
        }
        axios.get(url, config).then(function(responsr) {
            if (responsr.data.code === 200) {
                resolve(responsr.data.data)
            } else {
                resolve(responsr.data.message)
            }
        }).catch(function(err){
            reject(err)
        })
    })
}
export {httpGet}