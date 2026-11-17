import {AudioButton} from '../../shared/speech';
export const groups = [
 {title:'Động từ + to + động từ nguyên mẫu',description:'Sau các động từ này, một hành động tiếp theo thường được diễn đạt bằng to + động từ nguyên mẫu.',items:[
 ['want to','muốn','I want to improve my English.','Tôi muốn cải thiện tiếng Anh.'],
 ['need to','cần','We need to leave now.','Chúng ta cần đi ngay.'],
 ['decide to','quyết định','She decided to study abroad.','Cô ấy quyết định học ở nước ngoài.'],
 ['plan to','dự định','They plan to visit Hanoi.','Họ dự định đến Hà Nội.'],
 ['hope to','hy vọng','I hope to see you soon.','Tôi hy vọng sớm gặp bạn.'],
 ['promise to','hứa','He promised to call me.','Anh ấy hứa gọi cho tôi.'],
 ['agree to','đồng ý','We agreed to meet on Friday.','Chúng tôi đồng ý gặp nhau vào thứ Sáu.'],
 ['learn to','học cách','She learned to drive.','Cô ấy đã học lái xe.'],
 ['refuse to','từ chối','He refused to answer.','Anh ấy từ chối trả lời.'],
 ['offer to','đề nghị','She offered to help us.','Cô ấy đề nghị giúp chúng tôi.'],
 ]},
 {title:'Động từ + V-ing',description:'Sau các động từ này, hành động tiếp theo thường ở dạng V-ing.',items:[
 ['enjoy doing','thích làm','I enjoy reading in the evening.','Tôi thích đọc sách vào buổi tối.'],
 ['avoid doing','tránh làm','She avoids driving at night.','Cô ấy tránh lái xe vào ban đêm.'],
 ['finish doing','hoàn thành việc','He finished writing the report.','Anh ấy đã viết xong báo cáo.'],
 ['keep doing','tiếp tục làm','Keep practicing every day.','Hãy tiếp tục luyện tập mỗi ngày.'],
 ['suggest doing','đề xuất làm','She suggested taking a break.','Cô ấy đề xuất nghỉ giải lao.'],
 ['consider doing','cân nhắc làm','We are considering moving.','Chúng tôi đang cân nhắc chuyển nhà.'],
 ['mind doing','phiền khi làm','Do you mind opening the window?','Bạn có phiền mở cửa sổ không?'],
 ['practice doing','luyện tập làm','I practice speaking English.','Tôi luyện nói tiếng Anh.'],
 ['miss doing','nhớ việc từng làm','I miss seeing my friends.','Tôi nhớ những lần gặp bạn bè.'],
 ['give up doing','từ bỏ việc','He gave up smoking.','Anh ấy đã bỏ thuốc lá.'],
 ]},
 {title:'Cả hai dạng: chú ý sự khác biệt',description:'Một số động từ đi được với cả hai dạng; ý nghĩa có thể thay đổi theo dạng và ngữ cảnh.',items:[
 ['remember to do','nhớ phải làm','Remember to lock the door.','Hãy nhớ khóa cửa.'],
 ['remember doing','nhớ đã làm','I remember locking the door.','Tôi nhớ mình đã khóa cửa.'],
 ['stop to do','dừng lại để làm việc khác','We stopped to buy water.','Chúng tôi dừng lại để mua nước.'],
 ['stop doing','ngừng làm việc đang làm','He stopped talking.','Anh ấy ngừng nói.'],
 ['try to do','cố gắng làm','I tried to open the door.','Tôi đã cố mở cửa.'],
 ['try doing','thử làm như một cách giải quyết','Try restarting the computer.','Hãy thử khởi động lại máy tính.'],
 ]}
] as const;
export function VerbPatterns(){return <><div className="eyebrow">NGỮ PHÁP THỰC HÀNH</div><h1>Động từ + to V / V-ing</h1><p className="lead">Học cấu trúc cùng ví dụ thay vì đoán theo nghĩa tiếng Việt.</p><p className="notice">Đây là các cấu trúc thường gặp, không phải danh sách đầy đủ. Sau giới từ thường dùng danh từ hoặc V-ing: “look forward to seeing you”. <AudioButton text="I look forward to seeing you."/></p>{groups.map(group=><section key={group.title}><div className="section-head"><div><h2>{group.title}</h2><p>{group.description}</p></div></div><div className="cards">{group.items.map(([pattern,meaning,example,translation])=><article className="word-card" key={pattern}><div className="word-title"><h3>{pattern}</h3><AudioButton text={pattern}/></div><p>{meaning}</p><div className="example-en"><span>{example}</span><AudioButton text={example}/></div><p>{translation}</p></article>)}</div></section>)}</>}
