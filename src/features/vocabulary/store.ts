import {rows} from './data/words';
import {extraRows} from './data/extra-words';
import {moreRows} from './data/more-words';
import {finalRows} from './data/final-words';
import {idiomRows} from './data/idioms';
import {schedule} from './schedule';

export type Word={id:number;text:string;kind:string;category:string;meaning:string;explanation:string;examples:string};
type Rating='again'|'hard'|'good'|'easy';
type Saved={id:number;text:string;meaning:string;note:string;state:string;interval:number;repetitions:number;ease:number;nextReview:string};
type Data={saved:Saved[];learned:number[];attempts:{question:string;correct:boolean}[];reviews:{vocabularyId:number;rating:Rating;date:string}[]};
const key='english-mastery-data-v1';
const empty=():Data=>({saved:[],learned:[],attempts:[],reviews:[]});
function read():Data {const raw=localStorage.getItem(key);if(!raw)return empty();try{return JSON.parse(raw) as Data}catch{throw new Error('Không đọc được dữ liệu lưu trên trình duyệt.')}}
function write(data:Data){try{localStorage.setItem(key,JSON.stringify(data))}catch{throw new Error('Không thể lưu dữ liệu. Hãy kiểm tra dung lượng hoặc quyền lưu trữ của trình duyệt.')}}
export const words:Word[]=[...rows,...extraRows,...moreRows,...finalRows,...idiomRows].map(([text,kind,category,meaning,explanation,examples],i)=>({id:i+1,text,kind,category,meaning,explanation,examples:JSON.stringify(examples)}));
export const store={
 async words(kind:string){return words.filter(w=>w.kind===kind).sort((a,b)=>a.text.localeCompare(b.text))},
 async saved(){return read().saved},
 async learned(){return read().learned.map(wordId=>({wordId}))},
 async progress(){const d=read();return {learned:d.learned.length,saved:d.saved.length,due:d.saved.filter(x=>new Date(x.nextReview)<=new Date()).length,attempts:d.attempts.length}},
 async save(text:string,meaning:string){const d=read();text=text.trim().toLowerCase();meaning=meaning.trim();if(!text||text.length>100||!meaning||meaning.length>500)throw new Error('Vui lòng nhập từ và nghĩa hợp lệ.');if(d.saved.some(x=>x.text===text))throw new Error('Mục này đã được lưu.');d.saved.unshift({id:Math.max(Date.now(),...d.saved.map(x=>x.id+1)),text,meaning,note:'',state:'new',interval:0,repetitions:0,ease:2.5,nextReview:new Date().toISOString()});write(d)},
 async note(id:number,note:string){const d=read(), item=d.saved.find(x=>x.id===id);if(!item)throw new Error('Không tìm thấy mục.');if(note.length>2000)throw new Error('Ghi chú quá dài.');item.note=note;write(d)},
 async remove(id:number){const d=read();d.saved=d.saved.filter(x=>x.id!==id);d.reviews=d.reviews.filter(x=>x.vocabularyId!==id);write(d)},
 async setLearned(id:number,learned:boolean){const d=read();if(!words.some(w=>w.id===id))throw new Error('Không tìm thấy từ.');d.learned=d.learned.filter(x=>x!==id);if(learned)d.learned.push(id);write(d)},
 async review(id:number,rating:string){if(!['again','hard','good','easy'].includes(rating))throw new Error('Đánh giá không hợp lệ.');const d=read(),item=d.saved.find(x=>x.id===id);if(!item)throw new Error('Không tìm thấy mục.');const next=schedule(item,rating as Rating);Object.assign(item,next,{nextReview:next.nextReview.toISOString()});d.reviews.push({vocabularyId:id,rating:rating as Rating,date:new Date().toISOString()});write(d)},
 async attempt(question:string,correct:boolean){const d=read();d.attempts.push({question,correct});write(d)}
};
export async function dictionary(term:string){
 const matches=words.filter(w=>w.text.toLowerCase()===term.trim().toLowerCase());
 if(!matches.length)throw new Error('Chưa có từ này trong bộ từ học sẵn.');
 return matches.map(w=>({word:w.text,phonetic:undefined as string|undefined,meanings:[{partOfSpeech:w.kind,definitions:[{definition:w.meaning}]}]}));
}
