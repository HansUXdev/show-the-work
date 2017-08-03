/*
Let's say, you, the kid, promise your friend 
that you will show them the new phone when your mom buy you one.
*/ 



/* ES5 */
var isMomHappy = true;



// call our promise
var askMom = function () {
    console.log('before asking Mom'); // log before
    willIGetNewPhone
        .then(finalResult)
        .then(function (fulfilled) {
            console.log(fulfilled);
        })
        .catch(function (error) {
            console.log(error.message);
        });
    console.log('after asking mom'); // log after
}


// Promise
var willIGetNewPhone = new Promise(
    (resolve, reject)=>{
        if (isMomHappy) 
        {
            var phone = {
                brand: 'Samsung',
                color: 'black'
            };
            resolve(phone); // fulfilled
        } else {
            var reason = new Error('mom is not happy');
            reject(reason); // reject
        }

    }
);

var finalResult = function (phone) {
    var message = `Hey friend, I have a new ${phone.color} ${phone.brand} phone`;
    return Promise.resolve(message);
};




askMom();
