export type Attempt={part:string;question:string;answer:string;correct:boolean;at:string};
export type AptisState={completed:string[];bookmarks:string[];notes:Record<string,string>;drafts:Record<string,string>;attempts:Attempt[]};
const key='english-mastery-aptis-v1';
const initial=():AptisState=>({completed:[],bookmarks:[],notes:{},drafts:{},attempts:[]});
export function readAptis():AptisState{
 const value=localStorage.getItem(key);
 if(!value)return initial();
 try {return JSON.parse(value) as AptisState} catch {throw new Error('Không đọc được tiến độ Aptis đã lưu.')}
}
export function saveAptis(state:AptisState){
 try{localStorage.setItem(key,JSON.stringify(state))}
 catch{throw new Error('Không thể lưu tiến độ Aptis. Kiểm tra dung lượng lưu trữ.')}
}
export function toggleValue(values:string[],value:string){return values.includes(value)?values.filter(x=>x!==value):[...values,value]}
