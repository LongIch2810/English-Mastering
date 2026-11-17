import {useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {AudioButton} from '../../shared/speech';
import {store} from '../vocabulary/store';
import {buildPool,forgetWord,kindLabels,loadStats,saveStats,weakItems,type Stats} from './quiz';

export function WeakWords(){
 const pool=useMemo(buildPool,[]);
 const [stats,setStats]=useState<Stats>(loadStats);
 const [filter,setFilter]=useState<'forgetting'|'all'>('forgetting'),[kind,setKind]=useState('all'),[q,setQ]=useState(''),[message,setMessage]=useState('');
 const all=weakItems(pool,stats);
 const list=all.filter(e=>(filter==='all'||e.forgetting)&&(kind==='all'||e.item.kind===kind)&&(e.item.text.toLowerCase().includes(q.toLowerCase())||e.item.meaning.toLowerCase().includes(q.toLowerCase())));
 const forgettingCount=all.filter(e=>e.forgetting).length;
 const remove=(id:string)=>{const next=forgetWord(stats,id);setStats(next);if(!saveStats(next))setMessage('Không lưu được thay đổi trên trình duyệt này.')};
 const save=async(text:string,meaning:string)=>{try{await store.save(text,meaning);setMessage('Đã lưu “'+text+'” vào Từ vựng của tôi.')}catch(e){setMessage((e as Error).message)}};
 return <>
  <div className="eyebrow">ÔN TẬP TỪ VỰNG</div><h1>Từ hay sai, dễ quên</h1>
  <p className="lead">Mỗi khi trả lời sai trong phần ôn tập, từ đó được ghi lại ở đây để bạn đọc lại. Từ sẽ chuyển sang “đã nhớ dần” khi bạn trả lời đúng nhiều hơn sai.</p>
  <div className="stats">
   <div className="stat"><div className="stat-label">Đang quên</div><strong>{forgettingCount}</strong><small>từ cần đọc lại</small></div>
   <div className="stat"><div className="stat-label">Từng sai</div><strong>{all.length}</strong><small>từ đã ghi lại</small></div>
  </div>
  <div className="toolbar">
   <Link className="primary" to="/review?mode=weak">Ôn lại các từ hay sai →</Link>
   <input aria-label="Tìm từ" placeholder="Tìm theo từ hoặc nghĩa..." value={q} onChange={e=>setQ(e.target.value)}/>
   <label>Hiển thị <select value={filter} onChange={e=>setFilter(e.target.value as 'forgetting'|'all')}><option value="forgetting">Chỉ từ đang quên</option><option value="all">Tất cả từ từng sai</option></select></label>
   <label>Loại từ <select value={kind} onChange={e=>setKind(e.target.value)}><option value="all">Tất cả</option>{Object.entries(kindLabels).map(([k,l])=><option key={k} value={k}>{l}</option>)}</select></label>
  </div>
  {message&&<p role="status" className="notice">{message}</p>}
  {!all.length&&<p className="notice">Chưa có từ nào. Hãy làm bài ở <Link to="/review">Ôn tập từ vựng</Link>; mỗi câu trả lời sai sẽ được ghi vào đây.</p>}
  {all.length>0&&!list.length&&<p>Không có từ nào khớp bộ lọc.</p>}
  <div className="cards">{list.map(({item,r,w,last,forgetting})=>{
   const example=item.examples[0];
   return <article className="word-card" key={item.id}>
    <div className="card-top"><span className="tag">{kindLabels[item.kind]||item.kind}</span><span className="tag">{forgetting?'Đang quên':'Đã nhớ dần'}</span></div>
    <div className="word-title"><h2>{item.text}</h2><AudioButton text={item.text}/></div>
    <h3>{item.meaning}</h3>
    {item.explanation&&<p>{item.explanation}</p>}
    {example&&<div className="examples"><p>{example[0]} <AudioButton text={example[0]}/></p><small>{example[1]}</small></div>}
    <p className="muted">Sai {w} lần · đúng {r} lần{last&&' · gần nhất '+last}</p>
    <div className="toolbar"><button onClick={()=>save(item.text,item.meaning)}>Lưu vào Từ vựng của tôi</button><button className="text-button" onClick={()=>remove(item.id)}>Xóa khỏi danh sách</button></div>
   </article>;
  })}</div>
 </>;
}
