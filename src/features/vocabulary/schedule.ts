export function schedule(current: {interval:number; repetitions:number; ease:number}, rating: 'again'|'hard'|'good'|'easy', now = new Date()) {
 let {interval,repetitions,ease}=current;
 if(rating==='again'){ repetitions=0; interval=1; ease=Math.max(1.3,ease-0.2); }
 else { repetitions++; interval = repetitions===1 ? 1 : repetitions===2 ? 6 : Math.max(1,Math.round(interval*ease)); if(rating==='hard') {interval=Math.max(1,Math.round(interval*0.8)); ease=Math.max(1.3,ease-0.15)} if(rating==='easy'){interval=Math.max(1,Math.round(interval*1.3)); ease+=0.15} }
 return {interval,repetitions,ease,nextReview:new Date(now.getTime()+interval*86400000),state: repetitions>=5?'mastered':repetitions>=2?'reviewing':'learning'};
}