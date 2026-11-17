import {useEffect,useState} from 'react';
import {Link,useParams,useSearchParams} from 'react-router-dom';
import {AudioButton} from '../../shared/speech';
import {parts,skills,sources,reading4Conflict,type Part} from './data/aptis-data';
import {extraExercises} from './data/aptis-extra-exercises';
import {samples,wordCount} from './data/aptis-samples';
import {readAptis,saveAptis,toggleValue,type AptisState} from './aptis-store';
import {StructureDetails} from './exam-structure';

const keyOf=(p:Part)=>p.skill+'/'+p.number;
const linkOf=(p:Part)=>'/aptis/'+p.skill+'/part-'+p.number;
const tabs=['Cấu trúc & cách thi','Tổng quan','Hướng dẫn','Mẹo làm bài','Ví dụ giải chi tiết','Lỗi thường gặp','Kinh nghiệm cộng đồng','Nguồn'] as const;
function useAptis(){
 const [state,setState]=useState<AptisState>(readAptis);
 const [error,setError]=useState('');
 const update=(fn:(prev:AptisState)=>AptisState)=>{try{const next=fn(readAptis());saveAptis(next);setState(next);setError('')}catch(e){setError((e as Error).message)}};
 return {state,update,error};
}
function SourceLinks(){return <ul>{[sources.overview,sources.teachers,sources.prepare].map(s=><li key={s.url}><a href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a> · kiểm tra {s.verifiedAt}</li>)}</ul>}
function Community({part}:{part?:Part}){
 const relevant=!part||(part.skill==='reading'&&(part.number===2||part.number===4));
 if(!relevant)return <p>Chưa có kinh nghiệm cộng đồng được xác minh cho phần này.</p>;
 return <article className="word-card"><span className="tag">CỘNG ĐỒNG · kinh nghiệm giảng dạy</span><h3>{part?.number===4?'Đọc ý chính trước khi chọn tiêu đề':'Tìm đại từ và từ nối khi sắp xếp câu'}</h3><p>Trạm English gợi ý {part?.number===4?'đọc câu đầu và cuối như điểm bắt đầu, rồi đọc kỹ khi còn phân vân; cần xác minh ý chính của cả đoạn.':'chú ý đại từ và từ nối để tìm quan hệ giữa các câu.'} Đây là kinh nghiệm của giáo viên, không phải quy định chính thức hay công thức luôn đúng.</p><p>Nguồn mô tả Aptis General và ví dụ mô phỏng riêng; không dùng bài này để xác định cấu trúc ESOL.</p><a href={sources.community.url} target="_blank" rel="noreferrer">{sources.community.title} ↗</a><small> · cập nhật {sources.community.updatedAt} · kiểm tra {sources.community.verifiedAt}</small></article>;
}
export function AptisHome(){
 const {state}=useAptis();
 return <><div className="eyebrow">LỘ TRÌNH LUYỆN THI</div><h1>Aptis ESOL General</h1><p className="lead">Năm thành phần · 18 phần · Thông tin cấu trúc đối chiếu British Council.</p><div className="toolbar"><Link className="primary" to="/aptis/exam-structure">Bắt đầu với cấu trúc A–Z →</Link><Link to="/aptis/exam-day">Quy trình ngày thi</Link><Link to="/aptis/exam-interface">Làm quen giao diện</Link></div><p>Đã đánh dấu hoàn thành <strong>{state.completed.length}/18</strong> phần.</p><div className="cards">{skills.map(s=><article className="word-card" key={s.id}><span className="tag">{s.duration}</span><div className="word-title"><h2>{s.title}</h2><AudioButton text={s.title}/></div><p>{state.completed.filter(k=>k.startsWith(s.id+'/')).length}/{parts.filter(p=>p.skill===s.id).length} phần đã học</p>{parts.filter(p=>p.skill===s.id).map(p=><p key={p.number}><Link to={linkOf(p)}>Phần {p.number} · {p.title}</Link> <AudioButton text={p.title}/></p>)}</article>)}</div><div className="toolbar"><Link className="primary" to="/aptis/community-tips">Kinh nghiệm cộng đồng</Link></div><SourceLinks/></>;
}
export function AptisCommunity(){return <><h1>Kinh nghiệm cộng đồng</h1><p className="lead">Nguồn ngoài British Council được phân biệt với thông tin chính thức.</p><Community/></>}
const sequence=[
 'Mia bought a new plant.',
 'She put it near the window.',
 'There, the plant received sunlight for a week.',
 'After that week, its leaves began to grow.',
 'After noticing the new leaves, Mia watered it because the soil was dry.',
 'After watering it, she saw that the plant looked healthy.'
];
const secondSequence=[
 'On Saturday, Lena planned a picnic.',
 'First, she checked the weather forecast.',
 'It predicted rain in the afternoon.',
 'Because of that forecast, she moved the picnic indoors.',
 'She then told her friends about the new location.',
 'They met inside and enjoyed lunch together.'
];
export function AptisPart(){
 const {skill,part:slug}=useParams();const part=parts.find(p=>p.skill===skill&&'part-'+p.number===slug);
 if(!part)return <><h1>Không tìm thấy phần học</h1><Link to="/aptis">Về tổng quan Aptis</Link></>;
 return <PartContent key={keyOf(part)} part={part}/>;
}
function PartContent({part}:{part:Part}){
 const [search]=useSearchParams();const initialTab=search.get('tab')==='tips'?'Mẹo làm bài':'Cấu trúc & cách thi';
 const {state,update,error}=useAptis();const [tab,setTab]=useState<(typeof tabs)[number]>(initialTab);const id=keyOf(part),index=parts.indexOf(part),skill=skills.find(s=>s.id===part.skill)!;
 useEffect(()=>{const value=search.get('tab');if(value==='tips')setTab('Mẹo làm bài')},[search]);
 return <><Link to="/aptis">← Tổng quan Aptis</Link><div className="eyebrow">{skill.title.toUpperCase()} / PHẦN {part.number}</div><div className="word-title"><h1>{part.title}</h1><AudioButton text={part.title}/></div><p className="lead">{part.meaning}</p><div className="toolbar"><button onClick={()=>update(s=>({...s,completed:toggleValue(s.completed,id)}))}>{state.completed.includes(id)?'✓ Đã học':'Đánh dấu đã học'}</button><button onClick={()=>update(s=>({...s,bookmarks:toggleValue(s.bookmarks,id)}))}>{state.bookmarks.includes(id)?'♥ Đã lưu':'♡ Lưu phần này'}</button></div>{error&&<p role="alert">{error}</p>}<nav className="aptis-tabs" aria-label="Nội dung phần học">{tabs.map(t=><button key={t} className={t===tab?'active':''} aria-current={t===tab?'page':undefined} onClick={()=>setTab(t)}>{t}</button>)}</nav>
 {tab==='Cấu trúc & cách thi'&&<StructureDetails part={part}/>}
 {tab==='Tổng quan'&&<section><h2>Nhiệm vụ</h2><p>{part.meaning}</p><p><strong>Thông tin chính thức:</strong> {part.format}</p><p>Thời gian chung của {skill.title}: {skill.duration}. Các gợi ý luyện tập không phải quy định thi.</p>{part.skill==='reading'&&part.number===4&&<p className="notice">Các tài liệu mô tả cách đếm đoạn khác nhau; chưa xác định được sự khác biệt có do cách tính đoạn mẫu hay không. Xem tab Nguồn.</p>}</section>}
 {tab==='Hướng dẫn'&&<section><h2>Cách làm từng bước</h2><ol>{part.steps.map(x=><li key={x}>{x}</li>)}</ol><span className="tag">GỢI Ý LUYỆN TẬP</span></section>}
 {tab==='Mẹo làm bài'&&<section><p>Chiến lược luyện tập tự biên soạn; áp dụng linh hoạt theo ngữ cảnh.</p><div className="cards">{part.tips.map((t,i)=><article className="word-card" key={t}><span className="tag">GỢI Ý {i+1}</span><p>{t}</p></article>)}</div></section>}
 {tab==='Ví dụ giải chi tiết'&&<section><h2>Ví dụ tự biên soạn</h2>{part.quiz&&[part.quiz,...(extraExercises[id]||[])].slice(0,2).map((q,i)=><article className="word-card" key={q.question}><h3>Ví dụ {i+1}</h3><p>{q.question} <AudioButton text={q.question}/></p>{q.audio&&<p>{q.audio} <AudioButton text={q.audio}/></p>}<p>Đáp án: {q.options[q.answer]} <AudioButton text={q.options[q.answer]}/></p><p>{q.explanation}</p></article>)}{part.skill==='reading'&&part.number===2&&[sequence,secondSequence].map((seq,i)=><article className="word-card" key={i}><h3>Ví dụ {i+1}</h3><p>A: {seq[0]} <AudioButton text={seq[0]}/></p><p>B: {seq[1]} <AudioButton text={seq[1]}/></p><p>{i===0?'“She” chỉ Mia; “it” chỉ cây. Câu về ánh sáng cần vị trí gần cửa sổ được giới thiệu trước.':'“She” chỉ Lena; câu tiếp theo về dự báo cần câu đã giới thiệu bản dự báo trước.'}</p></article>)}{samples[id]?.map((example,i)=><article className="word-card" key={example.prompt}><h3>Ví dụ {i+1}</h3><p>{example.prompt} <AudioButton text={example.prompt}/></p><p className="sample-text">{example.answer} <AudioButton text={example.answer}/></p>{example.words&&<p>Số từ: {wordCount(example.answer)} (đếm theo khoảng trắng).</p>}<p>{example.explanation}</p></article>)}</section>}
 {tab==='Lỗi thường gặp'&&<section><h2>Lỗi cần tránh</h2><ul>{part.mistakes.map(x=><li key={x}>{x}</li>)}</ul><p>Đây là các lỗi cần chú ý, không phải xếp hạng tần suất.</p></section>}
 {tab==='Kinh nghiệm cộng đồng'&&<Community part={part}/>}
 {tab==='Nguồn'&&<section><h2>Nguồn và phạm vi xác minh</h2><SourceLinks/><p>Thông tin cấu trúc được đối chiếu tài liệu ESOL General; chiến lược và bài tập được biên soạn để học, không phải nội dung chính thức. Candidate Guide tại trang Việt Nam chưa mở được trong lần kiểm tra.</p>{part.skill==='reading'&&part.number===4&&<div className="notice"><p>Đã xác minh: {reading4Conflict.verifiedValue}</p><ul>{reading4Conflict.conflictingDescriptions.map(text=><li key={text}>{text}</li>)}</ul><p>Chưa đủ căn cứ xác định khác biệt do cách đếm đoạn mẫu hay thay đổi đề; cần đối chiếu thêm. Ngày kiểm tra: {reading4Conflict.lastVerifiedAt}.</p></div>}</section>}
 <label className="aptis-note">Ghi chú của bạn<textarea value={state.notes[id]||''} onChange={e=>{const value=e.target.value;update(s=>({...s,notes:{...s.notes,[id]:value}}))}}/></label><div className="section-head">{index>0&&<Link to={linkOf(parts[index-1])}>← Phần trước</Link>}{index<parts.length-1&&<Link to={linkOf(parts[index+1])}>Phần tiếp →</Link>}</div></>;
}
