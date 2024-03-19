import CryptoJS from "crypto-js"

const encrypt = (obj, encryption_key) => {
    const json_obj = JSON.stringify(obj);
    return CryptoJS.AES.encrypt(json_obj, encryption_key).toString()
}

const decrypt = (text, encryption_key) => {
    let json_obj = {}
    try{
         const dec_text = CryptoJS.AES.decrypt(text, encryption_key).toString(CryptoJS.enc.Utf8)
         json_obj = JSON.parse(dec_text)
    } catch (e) {
        return false
    }
    if (json_obj != {}){
        return json_obj
    }
    else {
        return false
    }
}

export const saveToStorage =  (key, value, encryption_key) => {
    const enc_obj = encrypt(value, encryption_key);
    localStorage.setItem(key,enc_obj);
}

export const loadFromStorage =  (key, encryption_key) => {
    const enc_obj = localStorage.getItem(key);
    if (enc_obj){
        return decrypt(enc_obj, encryption_key);
    }
    else {
        return false
    }
}
