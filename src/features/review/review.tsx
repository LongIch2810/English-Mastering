import {useMemo,useState} from 'react';
import {AudioButton} from '../../shared/speech';
import {store} from '../vocabulary/store';
import {DAILY_COUNT,buildPool,buildQuiz,dailyMode,dayKey,kindLabels,loadStats,recordAnswer,recordDaily,saveStats,streak,typeLabels,type Mode,type QType,type Question,type Stats} from './quiz';

type Screen='menu'|'quiz'|'result';
const allTypes:QType[]=['vi2en','cloze','en2vi'];

export function Review(){
 const pool=useMemo(buildPool,[]);
 const [stats,setStats]=useState<Stats>(loadStats);
 const [screen,setScreen]=useState<Screen>('menu');
 const [questions,setQuestions]=useState<Question[]>([]);
 const [index,setIndex]=useState(0),[picked,setPicked]=useState<string|null>(null);
 const [wrong,setWrong]=useState<Question[]>([]),[score,setScore]=useState(0);
 const [isDaily,setIsDaily]=useState(false),[message,setMessage]=useState('');
 const [kind,setKind]=useState('all'),[type,setType]=useState<'mix'|QType>('mix'),[count,setCount]=useState('20'),[onlyWeak,setOnlyWeak]=useState(false);
 const today=dayKey(),todayResult=stats.daily[today];
 const seen=Object.keys(stats.words).length,totals=Object.values(stats.words).reduce((a,x)=>({r:a.r+x.r,w:a.w+x.w}),{r:0,w:0});
 const accuracy=totals.r+totals.w?Math.round(100*totals.r/(totals.r+totals.w)):null;

 const start=(qs:Question[],daily:boolean)=>{
  if(!qs.length){setMessage('Không có câu hỏi phù hợp với lựa chọn này.');return}
  setMessage('');setQuestions(qs);setIndex(0);setPicked(null);setWrong([]);setScore(0);setIsDaily(daily);setScreen('quiz');
 };
 const startDaily=()=>start(buildQuiz(pool,dailyMode(),stats,'daily-'+today),true);
 const startCustom=()=>{
  const mode:Mode={kinds:kind==='all'?[]:[kind],types:type==='mix'?allTypes:[type],count:count==='all'?'all':Number(count),onlyWeak};
  start(buildQuiz(pool,mode,stats,'custom-'+Date.now()+'-'+Math.random()),false);
 };
 const q=questions[index];
 const answer=(option:string)=>{
  if(picked!==null||!q)return;
  const ok=option===q.answer;
  setPicked(option);
  if(ok)setScore(s=>s+1);else setWrong(w=>[...w,q]);
  const next=recordAnswer(stats,q.item.id,ok);setStats(next);
  if(!saveStats(next))setMessage('Không lưu được tiến độ ôn tập trên trình duyệt này.');
 };
 const next=()=>{
  if(index+1<questions.length){setIndex(index+1);setPicked(null);return}
  if(isDaily){const done=recordDaily(stats,score,questions.length);setStats(done);saveStats(done)}
  setScreen('result');
 };
 const saveWrong=async()=>{
  let added=0;
  for(const w of wrong){try{await store.save(w.item.text,w.item.meaning);added++}catch{/* đã lưu hoặc không hợp lệ */}}
  setMessage(added?'Đã lưu '+added+' từ vào Từ vựng của tôi để ôn bằng flashcards.':'Các từ này đã có trong Từ vựng của tôi.');
 };

 if(screen==='quiz'&&q){
  const ok=picked===q.answer,example=q.item.examples[0];
  return <>
   <div className="eyebrow">ÔN TẬP TỪ VỰNG · {isDaily?'HÔM NAY':'TỰ CHỌN'}</div>
   <p className="lead">Câu {index+1}/{questions.length} · Đúng {score}</p>
   <progress value={index+(picked===null?0:1)} max={questions.length} style={{width:'100%'}} aria-label="Tiến độ"/>
   <article className="word-card quiz">
    {q.type==='vi2en'&&<><p>Nghĩa tiếng Việt:</p><h2>{q.item.meaning}</h2><p>Chọn từ tiếng Anh tương ứng:</p></>}
    {q.type==='cloze'&&<><p>Chọn từ điền vào chỗ trống:</p><h2>{q.sentence}</h2><p className="muted">Gợi ý nghĩa: {q.translation}{q.inflected&&' · Chọn dạng nguyên mẫu của từ.'}</p></>}
    {q.type==='en2vi'&&<><p>Nghĩa của từ này là gì?</p><h2>{q.item.text} <AudioButton text={q.item.text}/></h2></>}
    <div className="choices" role="group" aria-label="Các đáp án">
     {q.options.map((option,i)=>{
      const state=picked===null?'':option===q.answer?' right':option===picked?' wrong':'';
      return <button key={option} className={'choice'+state} disabled={picked!==null} onClick={()=>answer(option)}><b>{'ABCD'[i]}.</b> {option}</button>;
     })}
    </div>
    {picked!==null&&<div className="notice" role="status">
     <strong>{ok?'Chính xác!':'Chưa đúng.'}</strong>
     <p>{q.item.text} <AudioButton text={q.item.text}/> — {q.item.meaning}</p>
     {q.item.explanation&&<p>{q.item.explanation}</p>}
     {example&&<p>{example[0]} <AudioButton text={example[0]}/><br/><small>{example[1]}</small></p>}
     <button className="primary" onClick={next}>{index+1<questions.length?'Câu tiếp theo →':'Xem kết quả'}</button>
    </div>}
   </article>
   <button className="text-button" onClick={()=>setScreen('menu')}>Thoát về menu</button>
   {message&&<p role="alert">{message}</p>}
  </>;
 }

 if(screen==='result'){
  const pct=Math.round(100*score/questions.length);
  return <>
   <div className="eyebrow">KẾT QUẢ</div><h1>{score}/{questions.length} câu đúng ({pct}%)</h1>
   <p className="lead">{isDaily?'Bạn đã hoàn thành bài ôn hôm nay. Chuỗi ngày liên tiếp: '+streak(stats)+' ngày.':'Bài ôn tự chọn đã hoàn thành.'}</p>
   {wrong.length>0?<><h2>Các từ cần ôn lại</h2><div className="cards">{wrong.map(w=><article className="word-card" key={w.id}><h3>{w.item.text} <AudioButton text={w.item.text}/></h3><p>{w.item.meaning}</p>{w.item.examples[0]&&<small>{w.item.examples[0][0]}</small>}</article>)}</div>
    <div className="toolbar"><button className="primary" onClick={saveWrong}>Lưu các từ sai vào Từ vựng của tôi</button><button onClick={()=>start(wrong.map(w=>({...w,options:[...w.options].reverse()})),false)}>Làm lại các câu sai</button></div></>
    :<p className="notice">Bạn trả lời đúng tất cả. Hãy quay lại vào ngày mai để giữ chuỗi ôn tập.</p>}
   {message&&<p role="status">{message}</p>}
   <button onClick={()=>{setScreen('menu');setMessage('')}}>Về menu ôn tập</button>
  </>;
 }

 return <>
  <div className="eyebrow">ÔN TẬP TỪ VỰNG</div><h1>Ôn từ vựng mỗi ngày</h1>
  <p className="lead">Chọn đáp án tiếng Anh theo nghĩa tiếng Việt, điền từ vào câu hoặc chọn nghĩa của từ. Làm {DAILY_COUNT} câu mỗi ngày để nhớ lâu hơn.</p>
  <div className="stats">
   <div className="stat"><div className="stat-label">Chuỗi ngày</div><strong>{streak(stats)}</strong><small>ngày liên tiếp</small></div>
   <div className="stat"><div className="stat-label">Đã ôn</div><strong>{seen}</strong><small>/ {pool.length} mục từ</small></div>
   <div className="stat"><div className="stat-label">Độ chính xác</div><strong>{accuracy===null?'—':accuracy+'%'}</strong><small>trên mọi câu đã làm</small></div>
  </div>
  <section className="hero"><div><span className="pill">BÀI ÔN HÔM NAY</span><h2>{todayResult?'Hôm nay bạn đã làm '+todayResult.correct+'/'+todayResult.total+' câu':DAILY_COUNT+' câu cho hôm nay'}</h2><p>Ưu tiên từ bạn hay sai, từ chưa gặp và từ lâu chưa ôn. Bộ câu hỏi giữ nguyên trong cùng một ngày.</p><button className="primary" onClick={startDaily}>{todayResult?'Làm lại bài hôm nay':'Bắt đầu ôn hôm nay →'}</button></div></section>
  <h2>Tự chọn bài ôn</h2>
  <div className="toolbar">
   <label>Loại từ <select value={kind} onChange={e=>setKind(e.target.value)}><option value="all">Tất cả các từ</option>{Object.entries(kindLabels).map(([k,l])=><option key={k} value={k}>{l} ({pool.filter(x=>x.kind===k).length})</option>)}</select></label>
   <label>Dạng câu hỏi <select value={type} onChange={e=>setType(e.target.value as 'mix'|QType)}><option value="mix">Hỗn hợp cả ba dạng</option>{allTypes.map(t=><option key={t} value={t}>{typeLabels[t]}</option>)}</select></label>
   <label>Số câu <select value={count} onChange={e=>setCount(e.target.value)}>{['10','20','50','100'].map(n=><option key={n} value={n}>{n} câu</option>)}<option value="all">Tất cả các từ</option></select></label>
   <label><input type="checkbox" checked={onlyWeak} onChange={e=>setOnlyWeak(e.target.checked)}/> Chỉ các từ tôi hay sai</label>
  </div>
  <button className="primary" onClick={startCustom}>Bắt đầu bài ôn</button>
  {message&&<p role="alert">{message}</p>}
  <p className="notice">Tiến độ ôn tập được lưu trong trình duyệt trên thiết bị này. Với câu điền từ, nếu nhiều đáp án cùng hợp lệ, hãy dựa vào gợi ý nghĩa tiếng Việt.</p>
 </>;
}
