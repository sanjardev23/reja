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

// function giveAdvice(a, callback) {
//     if(typeof a !== 'number') callback('Please insert a number!', null)
//     else if(a <= 20) setTimeout(() => callback(null, list[0]), 5000);
//     else if(a > 20 && a <= 30) setTimeout(() => callback(null, list[1]), 3000);
//     else if(a > 30 && a <= 40) setTimeout(() => callback(null, list[2]), 3000);
//     else if(a > 40 && a <= 50) setTimeout(() => callback(null, list[3]), 3000);
//     else if(a > 50 && a <= 60) setTimeout(() => callback(null, list[4]), 3000);
//     else setTimeout(() => callback(null, list[5]), 5000);
// }



// CALLBACK function
function giveAdvice(a, callback) {
    if(typeof a !== 'number') callback('Please insert a number!', null)
    else if(a <= 20) callback(null, list[0]);
    else if(a > 20 && a <= 30) callback(null, list[1]);
    else if(a > 30 && a <= 40) callback(null, list[2]);
    else if(a > 40 && a <= 50) callback(null, list[3]);
    else if(a > 50 && a <= 60) callback(null, list[4]);
    else {
        setInterval(function () {
            callback(null, list[5])        // ==> async ni ichida core module functionlar ishlamaydi
        }, 1000);
    }
}



console.log('passed here 0')
giveAdvice(70, (err, data) => {
    if(err) console.log('ERROR:', err);
    else { 
        // console.log(`Advice for your age: ${data}`);
        console.log(data)
    }
});
console.log('passed here 1')








// Asynchronouse functions
// Promise functions
// Callback vs Asynchronouse vs Promise


// ASYNC function (def)
// async function giveAdvice(a) {
//     if(typeof a !== 'number') throw new Error ('Please insert a number!', null)
//     else if(a <= 20) return list[0];
//     else if(a > 20 && a <= 30) return list[1];
//     else if(a > 30 && a <= 40) return list[2];
//     else if(a > 40 && a <= 50) return list[3];
//     else if(a > 50 && a <= 60) return list[4];
//     else {
//         return new Promise((resolve, reject) => {
//             setTimeout(() => {
//                 resolve(list[5]);
//             }, 5000)
//         });


// resolve bu return ga teng
// promise ichida code functionlar(setTimeOut, setInterval) yaxshi ishlaydi, asyncda ishlamaydi


//         // setTimeout(() => {
//         //     return list[5]       ==> async ni ichida core module functionlar ishlamaydi
//         // }, 5000);               
//     }
// }


// call via then/catch
// console.log('passed here 0')
// giveAdvice(31)
//     .then((data) => {
//         console.log(`Advice for your age: ${data}`);
//     })
//     .catch((err) => {
//         console.log('ERROR:', err);
//     })
// console.log('passed here 1')

// sync function pass bolgandan kn node js async bn ishlaydi



// call via async/await
// async function run() {
//     let answer = await giveAdvice(25);
//     console.log(answer);
//     answer = await giveAdvice(65);    // await bu yerda value olmaguncha keyingi stepga otmaydi
//     console.log(answer);
//     answer = await giveAdvice(41);
//     console.log(answer);
// }
// run();