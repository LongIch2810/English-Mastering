export type Sample={prompt:string;answer:string;explanation:string;words?:[number,number]};
export const samples:Record<string,Sample[]>={
 'speaking/1':[
  {prompt:'What do you enjoy doing in your free time?',answer:'I enjoy reading in my free time. I usually read before bed because it helps me relax.',explanation:'Trả lời trực tiếp, thêm thói quen và một lý do.'},
  {prompt:'Tell me about your hometown.',answer:'I come from a small town near the coast. I like it because the people are friendly.',explanation:'Nêu địa điểm và một đặc điểm cá nhân.'}
 ],
 'speaking/2':[
  {prompt:'What do you enjoy about spending time outdoors?',answer:'I enjoy walking in the park. It helps me relax after work, and I can spend time with my friends.',explanation:'Trả lời câu hỏi ý kiến và đưa hai chi tiết; đây không phải ví dụ mô tả ảnh.'},
  {prompt:'Why do people enjoy visiting parks?',answer:'I think parks give people a quiet place to exercise and meet friends. For example, my family walks there on weekends.',explanation:'Nêu quan điểm, lý do và ví dụ; đây là câu tiếp theo về chủ đề, không phải mô tả ảnh.'}
 ],
 'speaking/3':[
  {prompt:'Do you prefer exercising indoors or outdoors? Why?',answer:'I prefer exercising outdoors because I enjoy fresh air. However, an indoor gym is useful when it rains.',explanation:'So sánh hai lựa chọn và giải thích sở thích; ví dụ chưa có ảnh.'},
  {prompt:'What are the benefits of exercising with other people?',answer:'Exercise with friends can be more enjoyable. People can encourage each other, while exercising alone gives you more flexibility.',explanation:'Nêu lợi ích và đối chiếu; ví dụ chưa có hai ảnh để mô tả.'}
 ],
 'speaking/4':[
  {prompt:'Describe a time you learned something difficult. How did you feel? Why is learning new skills important?',answer:'I learned to ride a bicycle when I was a child. At first, I felt nervous because I fell several times. With practice, I became more confident. I think learning new skills is important because it helps people solve problems and become more independent.',explanation:'Bao phủ ba ý: trải nghiệm, cảm xúc và quan điểm chung; đây là mẫu ngắn để phát triển thêm trong hai phút.'},
  {prompt:'Describe a time you helped someone. How did you feel? Why is helping others important?',answer:'I once helped a neighbor carry groceries. I felt pleased because the task was easier for her. Helping others is important because it builds trust and makes communities friendlier.',explanation:'Trả lời lần lượt ba câu và giải thích ý kiến; có thể mở rộng ví dụ khi luyện hai phút.'}
 ],
 'writing/1':[
  {prompt:'What is your favorite hobby?',answer:'Reading',explanation:'Câu hỏi yêu cầu sở thích; một từ có thể trả lời trực tiếp.'},
  {prompt:'Where do you live?',answer:'Hanoi',explanation:'Câu hỏi yêu cầu địa điểm; tên thành phố cần viết hoa.'}
 ],
 'writing/2':[
  {prompt:'Tell the club why you want to learn English.',answer:'I want to learn English because I enjoy traveling and meeting new people. I also hope to use it at work.',explanation:'Nêu lý do, thêm mục đích sử dụng và viết câu hoàn chỉnh.',words:[20,30]},
  {prompt:'Tell the club what you like doing on weekends.',answer:'On weekends I enjoy walking in the park with my friends. We usually talk, take photos, and have coffee together afterward.',explanation:'Nêu hoạt động và chi tiết về thời gian, bạn đồng hành.',words:[20,30]}
 ],
 'writing/3':[
  {prompt:'What activity would you like the club to organize? Why?',answer:'I would like the club to organize a monthly conversation evening. Members could meet in small groups and discuss everyday topics. This would help us practice speaking and get to know one another.',explanation:'Trả lời hoạt động muốn tổ chức và lý do, sau đó thêm chi tiết.',words:[30,40]},
  {prompt:'How can new members feel welcome?',answer:'New members could be paired with experienced members during their first meeting. A friendly introduction would help them learn about the club and ask questions. This would make it easier to participate.',explanation:'Đề xuất một biện pháp, giải thích cách áp dụng và lợi ích.',words:[30,40]}
 ],
 'writing/4':[
  {prompt:'Your club has changed its meeting time. Write an informal email to a friend.',answer:'Hi Lan,\nThe club has moved our meetings to Friday evenings. I am a little disappointed because I usually work late then. Are you free at that time? Perhaps we can ask the manager whether another day is possible. Let me know what you think.\nBest,\nMai',explanation:'Giọng thân mật, nêu thay đổi, cảm nhận và đề xuất; không có một cách mở hoặc kết bắt buộc.',words:[40,50]},
  {prompt:'Your club has changed its meeting time. Write a formal email to the manager.',answer:'Dear Club Manager,\nI am writing about the recent decision to move our weekly meetings to Friday evenings. I appreciate the work involved in organizing the club, but I am concerned that the new time may prevent some members from attending.\nI usually work late on Fridays, and several other members have told me that they also have commitments at that time. The previous schedule allowed us to attend regularly and take part in group activities. Could the club consider an alternative evening or ask members which times would be suitable? A short survey might help identify an option that works for more people.\nThank you for considering my request. I would be grateful for any information about the reasons for the change and the possibility of reviewing it.\nKind regards,\nMai',explanation:'Nêu mục đích, giải thích tác động, yêu cầu lịch sự và kết thư phù hợp; đây là mẫu tham khảo, không phải đáp án duy nhất.',words:[120,150]}
 ]
};
export function wordCount(text:string){return (text.trim().match(/\S+/g)||[]).length}
