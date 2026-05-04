// NodeJS Event Loop va Callback functionlar

// Plan: 
// - NodeJS - Single Thread hamda Multi Process Dasturlash
// - Asynchronous dasturlash: Callback functionlar
// - Callback amallarni NodeJS backend serverda ahamiyati


// Backend languages are Single Thread or Multi Thread

// Node.js single thread bo'lsa ham tez ishlashining sababi:
// Request keldi → DB ga so'rov yubordi → kutmasdan keyingi requestni qabul qiladi → DB javob berganda qaytib keladi (callback/async)



/* Asynchronous function > Callback | Async | Promise 

    DEFINITION                  CALL

    callback          >       callback
    async/await       >       then/catch || async/await
    promise           >       then/catch || async/await
 
*/




// console.log('Jack Ma`s advice for young people')
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
        setTimeout(function () {
            callback(null, list[5])        // ==> async ni ichida core module functionlar ishlamaydi
        }, 1000);
    }
}



// console.log('passed here 0')
// giveAdvice(70, (err, data) => {
//     if(err) console.log('ERROR:', err);
//     else { 
//         // console.log(`Advice for your age: ${data}`);
//         console.log(data)
//     }
// });
// console.log('passed here 1')








// Asynchronouse functions
// Promise functions
// Callback vs Asynchronouse vs Promise


// ASYNC function (def)
async function giveAdvice(a) {
    if(typeof a !== 'number') throw new Error ('Please insert a number!', null)
    else if(a <= 20) return list[0];
    else if(a > 20 && a <= 30) return list[1];
    else if(a > 30 && a <= 40) return list[2];
    else if(a > 40 && a <= 50) return list[3];
    else if(a > 50 && a <= 60) return list[4];
    else {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(list[5]);
            }, 5000)
        });


        
        
        // setTimeout(() => {
            //     return list[5]       ==> async ni ichida core module functionlar ishlamaydi
            // }, 5000);               
        }
    }


    // resolve bu return ga teng
    // promise ichida code functionlar(setTimeOut, setInterval) yaxshi ishlaydi, asyncda ishlamaydi
    



// call via then/catch
// console.log('passed here 0')
giveAdvice(31)
    .then((data) => {
        // console.log(`Advice for your age: ${data}`);
    })
    .catch((err) => {
        // console.log('ERROR:', err);
    })
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








// A-TASK

function countLetter(letter, word) {
    let count = 0;
    for(let i = 0; i < word.length; i++) {
        if(word[i] === letter) count++;
    }
    return count;
}

// console.log(countLetter('e', 'engineer')); 
// console.log(countLetter('p', 'pineapple'));
// console.log(countLetter('n', 'banana'));
// console.log(countLetter('u', 'cucumber'));


// count 0dan boshlayd, i ham 0dan, argumentda berilgan sozimizni uzunligigacha har iteration boganda i ga +1 qoshib boradi
// if - sozni ichidagi i === type ham value si ham argumentda berilgan harfga teng bolsa count ni +1 ga oshiradi
// iteration tugagach countni qaytaradi, yani loop nech marta aylansa va letterga teng bogan nechta i bolsa => countda qaytadi





// B-TASK

function countDigits(str) {
    let count = 0; 

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            count++;
        }
    }

    return count;
}


// C-TASK
function checkContent(str1, str2) {
  if (str1.length !== str2.length) return false;

  let count = {};

  for (let char of str1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}

// console.log(checkContent("mitgroup", "gmtiprou")); 
// console.log(checkContent("kiyik", "kiyik"));       
// console.log(checkContent("ayiq", "asal"));       




// D-TASK
class Shop {
  constructor(non, lagmon, cola) {
    this.non = non;
    this.lagmon = lagmon;
    this.cola = cola;
  }

  vaqt() {
    let now = new Date();
    return now.getHours() + ":" + now.getMinutes();
  }

  qoldiq() {
    console.log(
      `Hozir ${this.vaqt()} da ${this.non}ta non, ${this.lagmon}ta lagmon va ${this.cola}ta cola bor`
    );
  }

  sotish(product, count) {
    if (product === "non") {
      this.non -= count;
    } else if (product === "lagmon") {
      this.lagmon -= count;
    } else if (product === "cola") {
      this.cola -= count;
    }

    console.log(`${count}ta ${product} sotildi`);
  }

  qabul(product, count) {
    if (product === "non") {
      this.non += count;
    } else if (product === "lagmon") {
      this.lagmon += count;
    } else if (product === "cola") {
      this.cola += count;
    }

    console.log(`${count}ta ${product} qo‘shildi`);
  }
}


const shop = new Shop(4, 5, 2);

shop.qoldiq();

shop.sotish("non", 3);
shop.qabul("cola", 4);

shop.qoldiq();