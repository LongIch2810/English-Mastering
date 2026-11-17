import {useState} from 'react';
import {Link,useParams} from 'react-router-dom';
import {AudioButton} from '../../shared/speech';
import {parts,skills,sources,reading4Conflict,type Part,type Skill} from './data/aptis-data';

const skillOrder:Skill[]=['grammar-vocabulary','reading','listening','writing','speaking'];
const url=(p:Part)=>'/aptis/'+p.skill+'/part-'+p.number;
const ordered=skillOrder.flatMap(skill=>parts.filter(p=>p.skill===skill));
const vietnamese:Record<string,string>={
 'grammar-vocabulary/1':'Ngữ pháp','grammar-vocabulary/2':'Từ vựng','reading/1':'Hiểu câu','reading/2':'Liên kết văn bản','reading/3':'Ghép quan điểm','reading/4':'Hiểu bài đọc dài',
 'listening/1':'Nhận diện thông tin','listening/2':'Ghép thông tin','listening/3':'Ghép quan điểm','listening/4':'Hiểu độc thoại',
 'speaking/1':'Thông tin cá nhân','speaking/2':'Mô tả một bức ảnh','speaking/3':'So sánh hai bức ảnh','speaking/4':'Trải nghiệm và chủ đề trừu tượng',
 'writing/1':'Viết từ hoặc cụm ngắn','writing/2':'Viết đoạn ngắn','writing/3':'Ba câu trả lời','writing/4':'Email thân mật và trang trọng'
};
const skillDescription:Record<Skill,string>={
 'grammar-vocabulary':'Đọc câu, chọn ngữ pháp và xử lý nghĩa hoặc cụm từ. Core gồm 50 câu.',
 reading:'Đọc câu, sắp xếp đoạn, ghép ý kiến và tiêu đề.',
 listening:'Nghe thông tin, ghép ý kiến và hiểu độc thoại.',
 speaking:'Trả lời câu hỏi bằng giọng nói; bài nói được ghi lại để giám khảo đánh giá.',
 writing:'Trả lời trong bối cảnh câu lạc bộ, khóa học hoặc nhóm; bài viết được giám khảo đánh giá.'
};
export function StructureDetails({part}:{part:Part}){
 const siblings=parts.filter(p=>p.skill===part.skill),prev=siblings.find(p=>p.number===part.number-1),next=siblings.find(p=>p.number===part.number+1);
 const [read,setRead]=useState(()=>{try{return JSON.parse(localStorage.getItem('aptis-structure-read-v1')||'[]') as string[]}catch{return []}});
 const [error,setError]=useState('');const id=part.skill+'/'+part.number;
 const toggle=()=>{const nextRead=read.includes(id)?read.filter(x=>x!==id):[...read,id];try{localStorage.setItem('aptis-structure-read-v1',JSON.stringify(nextRead));setRead(nextRead);setError('')}catch{setError('Không thể lưu tiến độ trên thiết bị.')}};
 return <section><h2>Cấu trúc & cách thi · Phần {part.number}</h2><p><strong>{vietnamese[id]}</strong> — {part.meaning}</p><p><strong>Trước:</strong> {prev?'Part '+prev.number+' · '+prev.title:'Đây là phần đầu của hợp phần.'} <strong>Sau:</strong> {next?'Part '+next.number+' · '+next.title:'Đây là phần cuối của hợp phần.'}</p><p><strong>Số câu và nhiệm vụ:</strong> {part.format}</p><p><strong>Thời gian:</strong> {part.timer?(part.number===4?'1 phút chuẩn bị và 2 phút trả lời.':part.timer+' giây cho mỗi câu trả lời.'):'Dùng thời gian chung của hợp phần; chưa xác minh giới hạn riêng cho phần này.'}</p><p><strong>Trả lời:</strong> {part.skill==='speaking'?'Nói vào microphone theo hướng dẫn của hệ thống và giám thị.':part.skill==='writing'?'Nhập câu trả lời trên máy theo yêu cầu từng phần.':part.skill==='listening'?'Nghe bản ghi và chọn hoặc ghép thông tin theo yêu cầu.':part.skill==='reading'?'Đọc và chọn, ghép hoặc sắp xếp theo dạng bài.':'Đọc rồi chọn hoặc ghép đáp án theo yêu cầu.'}</p><p><strong>Điều hướng, sửa bài và chuyển phần:</strong> Chưa xác minh được đầy đủ cho từng phần từ tài liệu chính thức; hãy làm theo hướng dẫn của hệ thống và giám thị.</p>{part.quiz&&<p><strong>Ví dụ tự biên soạn:</strong> {part.quiz.question} <AudioButton text={part.quiz.question}/></p>}{part.skill==='reading'&&part.number===4&&<p className="notice">{reading4Conflict.conflictingDescriptions.join(' ')} Chưa xác định được lý do khác biệt.</p>}
 <button onClick={toggle}>{read.includes(id)?'✓ Đã đọc cấu trúc':'Đánh dấu đã đọc cấu trúc'}</button>{error&&<p role="alert">{error}</p>} <Link to={url(part)+'?tab=practice'}>Thử dạng bài này →</Link> · <Link to={url(part)+'?tab=tips'}>Học mẹo làm phần này →</Link><p><a href={sources.overview.url} target="_blank" rel="noreferrer">Nguồn: British Council Test Format Overview ↗</a> · kiểm tra 17/11/2026</p></section>;
}
export function ExamStructure(){
 const [detail,setDetail]=useState(false);
 return <><div className="eyebrow">BẮT ĐẦU TỪ ĐÂY</div><h1>Cấu trúc bài thi Aptis ESOL General từ A đến Z</h1><p className="lead">Chưa biết thi Aptis như thế nào? Tìm hiểu từng phần của bài thi, thời gian, dạng câu hỏi và cách trả lời.</p><p className="notice">Tổng thời lượng năm hợp phần là 162 phút; chưa tính các hoạt động tổ chức khác. Đây không phải thời gian chắc chắn ngồi trong phòng thi. Thứ tự tổ chức các hợp phần do hội đồng thi hoặc hệ thống quy định; sơ đồ dưới đây là thứ tự website trình bày.</p><div className="toolbar"><button onClick={()=>setDetail(false)} aria-pressed={!detail}>Xem nhanh</button><button onClick={()=>setDetail(true)} aria-pressed={detail}>Xem chi tiết</button><Link to="/aptis/walkthrough">Bắt đầu hướng dẫn 18 phần →</Link></div><div className="cards">{skillOrder.map(id=>{const skill=skills.find(s=>s.id===id)!,group=parts.filter(p=>p.skill===id);return <article className="word-card" key={id}><span className="tag">{skill.duration} · {group.length} PART{id==='grammar-vocabulary'?' · 50 CÂU':''}</span><h2>{skill.title} <AudioButton text={skill.title}/></h2><p>{skillDescription[id]}</p><button onClick={()=>document.getElementById('structure-'+id)?.scrollIntoView({behavior:'smooth'})}>Xem cấu trúc chi tiết →</button></article>})}</div><h2>Sơ đồ hợp phần và các Part</h2><p>Sơ đồ phân cấp, không phải thứ tự thi bắt buộc.</p>{skillOrder.map(id=>{const skill=skills.find(s=>s.id===id)!;return <section id={'structure-'+id} className="word-card" key={id}><h2>{skill.title} <AudioButton text={skill.title}/></h2><p>{skill.duration} · {skillDescription[id]}</p><ol>{parts.filter(p=>p.skill===id).map(p=><li key={p.number}><Link to={url(p)}>Part {p.number}: {p.title}</Link> <AudioButton text={p.title}/> — {vietnamese[id+'/'+p.number]}{detail&&<><p>{p.format}</p><p>{p.meaning}</p><Link to={url(p)+'?tab=practice'}>Thử dạng bài →</Link></>}</li>)}</ol></section>})}<p>Listening: trang British Council Việt Nam nêu khoảng 28 (±4) câu; trang chuẩn bị chung mô tả 17 nhiệm vụ và 20 bản ghi. Câu hỏi, nhiệm vụ và bản ghi là các đơn vị khác nhau; không suy ra chúng bằng nhau.</p><p><a href="https://www.britishcouncil.vn/en/exam/aptis/variants/general" target="_blank" rel="noreferrer">British Council Việt Nam — ESOL General ↗</a> · <a href={sources.prepare.url} target="_blank" rel="noreferrer">Trang chuẩn bị British Council ↗</a></p></>;
}
export function ExamDay(){const steps=['Đến địa điểm theo hướng dẫn nhận được.','Kiểm tra giấy tờ tùy thân và thực hiện thủ tục theo yêu cầu của đơn vị tổ chức.','Vào phòng, ổn định vị trí và nghe phổ biến nội quy.','Làm theo hướng dẫn đăng nhập và kiểm tra thông tin hiển thị.','Kiểm tra thiết bị theo hướng dẫn: tai nghe hoặc âm thanh cho Listening; microphone cho Speaking.','Bắt đầu các hợp phần theo thứ tự do hội đồng thi hoặc hệ thống quy định.','Hoàn thành bài thi theo hướng dẫn của giám thị.'];return <><Link to="/aptis/exam-structure">← Cấu trúc bài thi</Link><h1>Quy trình ngày thi</h1><p className="notice">Danh sách giúp hình dung việc chuẩn bị; thời điểm, giấy tờ và thứ tự thực tế theo thông báo của đơn vị tổ chức. Thời gian nghỉ và quyền điều hướng chưa xác minh cho từng ca thi.</p><ol>{steps.map(x=><li className="word-card" key={x}>{x}</li>)}</ol><a href="https://www.britishcouncil.vn/thi/aptis/chuan-bi" target="_blank" rel="noreferrer">British Council Việt Nam — chuẩn bị thi ↗</a></>}
export function Walkthrough(){
 const {step}=useParams(),n=Number(step||1),part=ordered[n-1];
 if(!Number.isInteger(n)||!part)return <><h1>Không tìm thấy phần hướng dẫn</h1><Link to="/aptis/walkthrough/1">Bắt đầu lại</Link></>;
 return <><Link to="/aptis/exam-structure">← Cấu trúc bài thi</Link><h1>Hướng dẫn lần lượt</h1><p>Phần {n}/18 · Thứ tự học do website chọn, không phải thứ tự thi bắt buộc.</p><progress value={n} max={18} aria-label="Tiến độ xem 18 phần"/><StructureDetails key={n} part={part}/><div className="toolbar">{n>1&&<Link to={'/aptis/walkthrough/'+(n-1)}>← Phần trước</Link>}{n<18?<Link className="primary" to={'/aptis/walkthrough/'+(n+1)}>Tiếp tục sang Part tiếp theo →</Link>:<Link className="primary" to="/aptis/exam-structure">Hoàn tất hướng dẫn →</Link>}</div></>;
}
export function ExamInterface(){return <><h1>Làm quen giao diện thi</h1><p className="notice">Giao diện mô phỏng để luyện tập, không phải giao diện thi chính thức. Các nút, bố cục và điều hướng dưới đây là thiết kế của website.</p><div className="cards">{[
 ['Chọn A/B/C','Chọn một đáp án rồi xem giải thích.','/aptis/grammar-vocabulary/part-1?tab=practice'],
 ['Ghép thông tin','Chọn người phù hợp bằng danh sách.','/aptis/reading/part-3?tab=practice'],
 ['Sắp xếp câu','Kéo câu hoặc dùng nút lên/xuống.','/aptis/reading/part-2?tab=practice'],
 ['Nghe','Bật giới hạn lượt nghe và chọn đáp án.','/aptis/listening/part-1?tab=practice'],
 ['Viết','Nhập bài, xem số từ và dùng đồng hồ tham khảo.','/aptis/writing/part-3?tab=practice'],
 ['Nói','Xem câu hỏi, đồng hồ và tự ghi âm.','/aptis/speaking/part-4?tab=practice']
 ].map(([title,desc,to])=><article className="word-card" key={title}><h2>{title}</h2><p>{desc}</p><Link to={to}>Mở bài thử →</Link></article>)}</div></>}
