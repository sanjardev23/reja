// NodeJS Event Loop va Callback functionlar

// Plan: 
// - NodeJS - Single Thread hamda Multi Process Dasturlash
// - Asynchronous dasturlash: Callback functionlar
// - Callback amallarni NodeJS backend serverda ahamiyati


// Backend languages are Single Thread or Multi Thread

// Node.js single thread bo'lsa ham tez ishlashining sababi:
// Request keldi → DB ga so'rov yubordi → kutmasdan keyingi requestni qabul qiladi → DB javob berganda qaytib keladi (callback/async)


console.log('Jack Ma`s advice for young people')
const list = [
    'Learn as much as you can', // 0-20
    'Find a good boss to learn from rather than a good company', // 20-30 
    'Start doing something for yourself', // 30-40
    'Focus on your strengths and what you are good at', // 40-50
    'Invest in and support young people', // 50-60
    'Spend time for yourself', // 60
];

function giveAdvice(a, callback) {
    if(typeof a !== 'number') callback('Please insert a number!', null)
    else if(a <= 20) setTimeout(() => callback(null, list[0]), 5000);
    else if(a > 20 && a <= 30) setTimeout(() => callback(null, list[1]), 3000);
    else if(a > 30 && a <= 40) setTimeout(() => callback(null, list[2]), 3000);
    else if(a > 40 && a <= 50) setTimeout(() => callback(null, list[3]), 3000);
    else if(a > 50 && a <= 60) setTimeout(() => callback(null, list[4]), 3000);
    else setTimeout(() => callback(null, list[5]), 5000);
}


// function giveAdvice(a, callback) {
//     if(typeof a !== 'number') callback('Please insert a number!', null)
//     else if(a <= 20) callback(null, list[0]);
//     else if(a > 20 && a <= 30) callback(null, list[1]);
//     else if(a > 30 && a <= 40) callback(null, list[2]);
//     else if(a > 40 && a <= 50) callback(null, list[3]);
//     else if(a > 50 && a <= 60) callback(null, list[4]);
//     else {
//         setTimeout(() => {
//             callback(null, list[5])
//         }, 5000);
//     }
// }



console.log('passed here 0')
giveAdvice(15, (err, data) => {
    if(err) console.log('ERROR:', err);
    else { 
        console.log(`Advice for your age: ${data}`);
    }
});
console.log('passed here 1')




// Task
// C-Task
// B-Task
// A-TASK


