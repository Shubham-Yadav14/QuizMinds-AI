import request from "./httpServices";

export const ChatServices = {
    AskQuiz:( subject:string,question:string)=>{
        return request.post("/answerQuestion",{   
        subject,question});
    }
}