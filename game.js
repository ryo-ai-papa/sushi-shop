(() => {
'use strict';
const foods=['まぐろ','サーモン','たまご','いくら','いか','たこ'];
const $=id=>document.getElementById(id);
const svg=body=>`<svg class="sushi-art" viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
const riceShape='<ellipse cx="90" cy="91" rx="64" ry="14" fill="#603c2b" opacity=".12"/><rect x="30" y="48" width="120" height="49" rx="25" fill="#fffefa" stroke="#e4d9c1" stroke-width="3"/><g fill="none" stroke="#e6e1ce" stroke-width="3" stroke-linecap="round"><path d="m48 76 4 3m13 4 5-2m14 8 5-1m17-9 5 2m15-11 5 2m-74-9 5-1m26 3 4-2m35 19 4-3"/></g>';
function toppingShape(kind){
let top='';
if(kind===0)top='<path d="M25 54Q27 29 61 27L140 32Q159 34 157 59L147 70Q89 59 34 72Z" fill="#e55b59" stroke="#bd3f46" stroke-width="3"/><path d="m55 34-12 25m39-25L70 59m39-22L97 61m38-22-12 23" stroke="#f58a80" stroke-width="5" stroke-linecap="round"/>';
if(kind===1)top='<path d="M25 54Q27 29 61 27L140 32Q159 34 157 59L147 70Q89 59 34 72Z" fill="#f49b54" stroke="#da773d" stroke-width="3"/><g stroke="#ffe4bf" stroke-width="5" fill="none"><path d="m49 32 12 15-16 19m29-36 13 17-16 16m29-31 14 18-15 15m28-30 14 17-13 14"/></g>';
if(kind===2)top='<path d="M30 40 144 34 154 66 39 78 27 65Z" fill="#e9ab36" stroke="#ce8e28" stroke-width="3"/><path d="m30 40 111-9 13 25L39 68Z" fill="#ffdb62"/>';
if(kind===3){
for(const [y,count,start] of [[27,3,70],[40,5,52],[54,6,43]])for(let col=0;col<count;col++){
const x=start+col*19;
top+=`<circle cx="${x}" cy="${y}" r="11" fill="#f18a30" stroke="#d96328" stroke-width="2"/><circle cx="${x-3}" cy="${y-4}" r="3" fill="#ffce72"/>`;
}}
if(kind===4)top='<path d="M34 34Q92 21 146 35L155 67 122 62 102 71 80 63 58 73 26 64Z" fill="#f4fbfa" fill-opacity=".95" stroke="#b8d4d1" stroke-width="3"/><path d="m51 39-7 19m28-22-6 23m29-24-5 25m28-24-4 21m26-19-1 17" stroke="#cddfdf" stroke-width="3" stroke-linecap="round"/>';
if(kind===5)top='<path d="M31 55Q33 32 71 29Q101 26 116 44Q134 59 150 42Q168 66 144 75Q121 83 100 63Q76 50 45 75Z" fill="#faf2e9" stroke="#b55275" stroke-width="7"/><g fill="#f7c4c7" stroke="#af5371" stroke-width="2"><ellipse cx="47" cy="61" rx="6" ry="4"/><ellipse cx="64" cy="54" rx="6" ry="4"/><ellipse cx="83" cy="53" rx="6" ry="4"/><ellipse cx="115" cy="64" rx="6" ry="4"/><ellipse cx="136" cy="68" rx="6" ry="4"/></g>';
return top;
}
function finishLayers(kind){
const nori=kind===3?'<g class="nori-layer"><path d="M27 49Q90 23 153 49V84Q90 112 27 84Z" fill="#344d41" stroke="#253d34" stroke-width="3"/><ellipse cx="90" cy="49" rx="63" ry="24" fill="#fff7de" stroke="#344d41" stroke-width="6"/><path d="M37 74v9m8-7v9m90-12v10" stroke="#71816a" stroke-width="3"/></g>':'';
const band=kind===2?'<g class="nori-layer egg-band"><path d="m85 36 22-2 4 62-23 1Z" fill="#354c40"/><path d="m91 40 9-1" stroke="#71816a" stroke-width="3"/></g>':'';
return nori+'<g class="topping-layer" data-kind="'+kind+'">'+toppingShape(kind)+'</g>'+band;
}
function ingredientArt(kind){return svg('<g transform="translate(0 13)">'+toppingShape(kind)+'</g>').replace('0 0 180 120','15 25 150 70');}
function sushi(kind,onlyRice=false){return svg('<g class="rice-layer">'+riceShape+'</g><g class="topping-slot">'+(onlyRice?'':finishLayers(kind))+'</g>');}
function renderPlate(){
if(state==='rice'){$('sushi').innerHTML='';return;}
if(!$('sushi').querySelector('.rice-layer'))$('sushi').innerHTML=sushi(null,true);
const slot=$('sushi').querySelector('.topping-slot');
const key=selected===null?'':String(selected);
if(slot.getAttribute('data-selected')!==key){slot.innerHTML=selected===null?'':finishLayers(selected);slot.setAttribute('data-selected',key);}
}
function animal(type){
const color=['#bc8555','#fff4de','#edbc70'][type];
const ears=type===1?'<g class="ear"><ellipse cx="65" cy="40" rx="17" ry="37" fill="#fff4de" stroke="#b78e6a" stroke-width="3"/><ellipse cx="65" cy="37" rx="7" ry="23" fill="#eeb4aa"/></g><g class="ear"><ellipse cx="116" cy="40" rx="17" ry="37" fill="#fff4de" stroke="#b78e6a" stroke-width="3"/><ellipse cx="116" cy="37" rx="7" ry="23" fill="#eeb4aa"/></g>':type===0?'<circle cx="46" cy="57" r="25" fill="#bc8555"/><circle cx="134" cy="57" r="25" fill="#bc8555"/><circle cx="46" cy="57" r="13" fill="#e6af80"/><circle cx="134" cy="57" r="13" fill="#e6af80"/>':'<path d="m30 79 5-54 42 34m28 0 42-34 4 54" fill="#edbc70" stroke="#b3814f" stroke-width="3"/><path d="m42 55 1-17 18 22m59 0 17-22 2 19" fill="#d98f83"/>';
return `<svg class="animal" viewBox="0 0 180 190" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M39 184q-2-55 51-55t51 55" fill="${color}"/><path d="m61 150 29 13 29-13 9 38H52Z" fill="#597e71"/>${ears}<ellipse cx="90" cy="100" rx="65" ry="57" fill="${color}" stroke="#a57853" stroke-width="2"/><ellipse cx="90" cy="118" rx="30" ry="23" fill="#fff1d7"/><g class="normal-eyes" fill="#533e32"><ellipse cx="65" cy="95" rx="5" ry="7"/><ellipse cx="115" cy="95" rx="5" ry="7"/></g><g class="smile-eyes" stroke="#533e32" stroke-width="4" fill="none" stroke-linecap="round"><path d="m57 97q8-12 16 0m34 0q8-12 16 0"/></g><ellipse cx="48" cy="113" rx="13" ry="8" fill="#e89386" opacity=".7"/><ellipse cx="132" cy="113" rx="13" ry="8" fill="#e89386" opacity=".7"/><path d="M83 109q7-5 14 0l-7 7Z" fill="#694438"/><path d="M79 121q11 13 22 0" fill="none" stroke="#694438" stroke-width="3" stroke-linecap="round"/>${type===2?'<path d="m24 108 23 4m-24 9 24-1m88-8 23-4m-23 12 24 1" stroke="#926440" stroke-width="2"/>':''}${type===0?'<g class="cheek-hand" fill="#c28e5c" stroke="#a57853" stroke-width="2"><ellipse cx="44" cy="129" rx="18" ry="25" transform="rotate(-20 44 129)"/><ellipse cx="136" cy="129" rx="18" ry="25" transform="rotate(20 136 129)"/></g>':''}</svg>`;
}
let state='title',order=-1,selected=null,count=0,help=true,sound=true,bag=[],animalIndex=-1,epoch=0;
let timers=new Set(),audio=null,nodes=new Set(),voicePlayer=null,voiceToken=0;
const voiceFiles={"へい、らっしゃい！":"chef-welcome","ぎゅっ！":"chef-rice","へい、おまち！":"chef-serve","おいしい！ありがとう！":"customer-thanks","ありがとう！おすしの めいじん！":"customer-reward"};
foods.forEach((name,i)=>voiceFiles[name+"のおすし、ください！"]="customer-order-"+i);
const speech=window.speechSynthesis;
function later(fn,ms){const e=epoch;const id=setTimeout(()=>{timers.delete(id);if(e===epoch)fn();},ms);timers.add(id);}
function stopVoice(){voiceToken++;if(voicePlayer){voicePlayer.onended=null;voicePlayer.onerror=null;voicePlayer.pause();voicePlayer.currentTime=0;}}
function stopAudio(){stopVoice();if(speech) speech.cancel();for(const n of nodes){try{n.stop();}catch{}}nodes.clear();}
function clearScene(){epoch++;for(const t of timers)clearTimeout(t);timers.clear();stopAudio();$('sushi').className='';$('customer').className='';}
function unlock(){try{if(!audio)audio=new(window.AudioContext||window.webkitAudioContext)();audio.resume().catch(()=>{});}catch{} }
function say(text){
stopVoice();if(speech)speech.cancel();if(!sound)return;
const keys=text.startsWith('へい、らっしゃい！ ')?['chef-welcome',voiceFiles[text.slice('へい、らっしゃい！ '.length)]]:[voiceFiles[text]];
const token=voiceToken;let index=0;
const customerVoice=['bear','rabbit','cat'][animalIndex]||'rabbit';
if(!voicePlayer&&window.Audio)voicePlayer=new window.Audio();
function playNext(){
if(token!==voiceToken||!sound||index>=keys.length)return;
const logicalKey=keys[index++],chef=logicalKey&&logicalKey.startsWith('chef-');
const key=logicalKey&&logicalKey.replace('customer-',customerVoice+'-');let failed=false;
function fallback(){
if(failed||token!==voiceToken||!sound)return;failed=true;
if(!speech||!window.SpeechSynthesisUtterance){playNext();return;}
const line=Object.keys(voiceFiles).find(t=>voiceFiles[t]===logicalKey)||text;
const u=new SpeechSynthesisUtterance(line);u.lang='ja-JP';u.rate=chef?1:.95;u.pitch=chef?1.3:1.08;
const voices=speech.getVoices().filter(v=>v.lang.startsWith('ja')&&v.localService);if(voices.length)u.voice=voices[chef&&voices.length>1?1:0];
u.onend=()=>{if(token===voiceToken)playNext();};try{speech.speak(u);}catch{playNext();}
}
if(!voicePlayer||!key){fallback();return;}
voicePlayer.src='./audio/'+key+'.wav';voicePlayer.onended=playNext;voicePlayer.onerror=fallback;voicePlayer.play().catch(fallback);
}
playNext();
}
function tone(kind){if(!sound||!audio)return;const seq=kind==='win'?[523,659,784]:kind==='rice'?[210,300]:[540,760];seq.forEach((freq,i)=>{const o=audio.createOscillator(),g=audio.createGain();o.type='sine';o.frequency.setValueAtTime(freq,audio.currentTime);o.connect(g);g.connect(audio.destination);const t=audio.currentTime+i*.09;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.12,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.start(t);o.stop(t+.16);nodes.add(o);o.onended=()=>nodes.delete(o);});}
function show(screen){for(const id of ['title','game','reward'])$(id).hidden=id!==screen;$('back').hidden=screen==='title';$('progress').hidden=screen==='title';}
function progress(){$('progress').innerHTML=[0,1,2].map(i=>`<span class="dot ${i<count?'done':''}" aria-hidden="true"></span>`).join('');$('progress').setAttribute('aria-label',`3人中${count}人にお届け`);}
function guide(){for(const el of document.querySelectorAll('.guided'))el.classList.remove('guided');if(!help)return;if(state==='rice')$('rice').classList.add('guided');if(state==='topping'){if(selected===order)$('serve').classList.add('guided');else $('ingredients').children[order].classList.add('guided');}}
function render(){const making=state==='topping';$('rice').disabled=state!=='rice';$('serve').hidden=!making||selected===null;for(const [i,b] of [...$('ingredients').children].entries()){b.disabled=!making;b.classList.toggle('selected',i===selected);b.setAttribute('aria-pressed',String(i===selected));}renderPlate();$('plate').setAttribute('aria-label',state==='rice'?'空のお皿':selected===null?'シャリ':foods[selected]+'のおすし');guide();}
function nextOrder(){clearScene();if(!bag.length){bag=[0,1,2,3,4,5];for(let i=5;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}if(bag[bag.length-1]===order)[bag[0],bag[bag.length-1]]=[bag[bag.length-1],bag[0]];}order=bag.pop();animalIndex=(animalIndex+1)%3;selected=null;state='rice';$('customer').innerHTML=animal(animalIndex);$('customer').setAttribute('aria-label',['くま','うさぎ','ねこ'][animalIndex]+'のおきゃくさん');$('orderArt').innerHTML=sushi(order);$('orderText').textContent=foods[order]+'、ください！';$('hint').textContent='ごはんを ぎゅっ！';show('game');progress();render();say('へい、らっしゃい！ '+foods[order]+'のおすし、ください！');}
function start(){unlock();count=0;nextOrder();}
function home(){clearScene();state='title';show('title');guide();}
$('ingredients').innerHTML=foods.map((name,i)=>`<button class="ingredient" data-food="${i}" aria-label="${name}をのせる" aria-pressed="false">${ingredientArt(i)}<span>${name}</span></button>`).join('');
$('ingredients').addEventListener('click',event=>{const b=event.target.closest('button[data-food]');if(!b||state!=='topping')return;selected=Number(b.dataset.food);$('hint').textContent='できたら おきゃくさんへ！';render();const layer=$('sushi').querySelector('.topping-layer');layer.classList.remove('placing');void layer.getBoundingClientRect();layer.classList.add('placing');tone('top');});
$('rice').onclick=()=>{if(state!=='rice')return;state='squeezing';render();$('sushi').className='squeeze';tone('rice');say('ぎゅっ！');later(()=>{state='topping';$('sushi').className='';$('hint').textContent='ネタを のせよう！';render();},420);};
$('serve').onclick=()=>{if(state!=='topping'||selected===null)return;if(selected!==order){$('hint').textContent='これを おねがい！ えらびなおせるよ';$('orderArt').innerHTML=sushi(order);say(foods[order]+'のおすし、ください！');$('order').classList.remove('pop');void $('order').offsetWidth;$('order').classList.add('pop');guide();return;}state='serving';render();$('hint').textContent='へい、おまち！';$('sushi').className='deliver';tone('win');say('へい、おまち！');later(()=>{$('sushi').innerHTML='';$('customer').className='happy';$('hint').textContent='おいしい！ ありがとう！';say('おいしい！ありがとう！');count++;progress();},2000);later(()=>{if(count===3){clearScene();state='reward';show('reward');$('stickerArt').innerHTML=sushi(order);say('ありがとう！おすしの めいじん！');}else nextOrder();},4200);};
$('order').onclick=()=>{if(!['rice','squeezing','topping'].includes(state))return;unlock();say(foods[order]+'のおすし、ください！');};
$('help').onclick=()=>{help=!help;$('help').setAttribute('aria-pressed',String(help));$('help').innerHTML='☀ <span>おたすけ '+(help?'ON':'OFF')+'</span>';guide();};
$('sound').onclick=()=>{sound=!sound;$('sound').setAttribute('aria-pressed',String(sound));$('sound').innerHTML='♪ <span>おと '+(sound?'ON':'OFF')+'</span>';if(!sound)stopAudio();else{unlock();if(['rice','topping'].includes(state))say(foods[order]+'のおすし、ください！');}};
$('back').onclick=home;$('finish').onclick=home;$('play').onclick=start;$('more').onclick=start;
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});window.addEventListener('pagehide',stopAudio);
const tub='<ellipse cx="90" cy="108" rx="79" ry="9" fill="#8b5731" opacity=".16"/><path d="M12 51h156l-7 43q-4 18-71 18T19 94Z" fill="#c99957" stroke="#976336" stroke-width="3"/><g stroke="#ac783c" stroke-width="2"><path d="m28 62 4 37m15-34 3 40m20-37 1 41m21-41v41m21-43-1 42m21-45-3 39m20-43-4 36"/></g><path d="M19 80q71 30 142 0l-2 9q-69 29-138 0Z" fill="#92552f"/><path d="M22 99q68 24 136 0" fill="none" stroke="#92552f" stroke-width="5"/><ellipse cx="90" cy="52" rx="78" ry="35" fill="#efd099" stroke="#bd8b4b" stroke-width="5"/><ellipse cx="90" cy="52" rx="69" ry="28" fill="#fff9e9"/><path d="M25 53q-2-12 12-13 0-12 16-10 7-14 22-6 12-15 28-3 19-6 27 10 18-2 21 14 12 4 4 18-65 25-130-1Z" fill="#fffef8" stroke="#e9e0c9" stroke-width="2"/><path d="m107 35 46-30q5-3 8 2t-2 7l-43 30Z" fill="#f7e3b7" stroke="#c5a16e" stroke-width="2"/><ellipse cx="105" cy="40" rx="20" ry="11" transform="rotate(-27 105 40)" fill="#f7e3b7" stroke="#c5a16e" stroke-width="2"/>';
let grains='';for(const [x,y] of [[42,45],[57,39],[75,33],[90,45],[120,54],[138,49],[66,57],[48,61],[84,63],[103,59],[118,68],[99,73],[72,72],[36,54],[148,58],[59,49],[80,52]])grains+='<ellipse cx="'+x+'" cy="'+y+'" rx="4" ry="2.2" transform="rotate(-25 '+x+' '+y+')" fill="#ffffff" stroke="#ddd4ba" stroke-width="1"/>';
$('riceArt').innerHTML=svg(tub+grains);
$('titleArt').innerHTML=animal(0)+sushi(0)+sushi(2);show('title');progress();
})();
