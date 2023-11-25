import { useEffect , useState } from "react"
import { useDispatch } from "react-redux";

import * as Action from '../redux/questions_reducer'
import { getServerData } from "../helper/helper";




export const useFetchQuestion=()=> {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({Loading:false, apiData:[], serverError:null});

    useEffect(()=>{
        setGetData(prev=>({...prev, isLoading:true}));
        (async()=>{
            try{
                
                const [{ questions,answers }] = await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data)

                if(questions.length > 0){
                    setGetData(prev => ({...prev,isLoading:false}));
                    setGetData(prev => ({...prev,apiData:questions}));

                    dispatch(Action.startExamAction({question:questions,answers}))  
                }else{
                    throw new Error("No Question Available");
                }
            }catch(error){
                setGetData(prev=>({...prev, isLoading:false}));
                setGetData(prev=>({...prev, serverError:error}));
            }
        })();

    },[dispatch]);

    return [getData, setGetData];

}

export const moveNextQuestion = ()=> async (dispatch) =>{
    try{
        dispatch(Action.moveNextAction());
    }catch(error){
        console.log(error)
    }
}
export const movePrevQuestion = ()=> async (dispatch) =>{
    try{
        dispatch(Action.movePrevAction());
    }catch(error){
        console.log(error)
    }
}