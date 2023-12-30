import axios from "axios";
import {newWordroute,testWordroute} from "./routes.js"

export async function makeApiRequest(method, data = "") {
    try {
        if(method.toUpperCase() === "GET"){
            const response = await axios.get(newWordroute, {});
            return response.data.word
        }else{
            const response = await axios.post(testWordroute, { word: data.toLowerCase() });
            return response.data.isWord;
        }
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la vérification du mot :', error);
        return false;
    }

}

