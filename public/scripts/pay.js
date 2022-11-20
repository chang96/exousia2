async function mp() {
    return auth.onAuthStateChanged(async user => {
        if (user) {
            var m = user.email
            const xuser = await finder("email", m)
            console.log(xuser)
            db.collection("users").doc(xuser[1]).update({
                balance: 10000
            }).then(()=>{
                // alert("Payment completed!")
                document.getElementById("funds").innerHTML = '₦10,000'
            })
            const API_publicKey = "FLWPUBK-7ec99fb2a852438b0f110e8a85ceb4c0-X"  // "FLWPUBK_TEST-f559ef05568430b40bf7c91b44ae846f-X" //"FLWPUBK-7ec99fb2a852438b0f110e8a85ceb4c0-X"; FLWPUBK-c8f706b4c924ef766a3cf0e0b66ee68c-X
            function paywithSeerbit() {
                var x = SeerbitPay({
                    "public_key": "SBTESTPUBK_TTWvu38ckVPgOlnUxUIphfxzI74FwfOA",
                    "tranref": new Date().getTime(),
                    "currency": "NGN",
                    "country": "NG",
                    "amount": "15000.00",
                    "email": "rorewole@gmail.com",
                    //optional field. Set to true to allow customer set the amount
                    "setAmountByCustomer": false,
                    "full_name": "John Doe", //optional
                    "callbackurl": "https://exousia.com.ng",
                },
                async function callback(response, closeModal) {
                    var txref = response.data.txRef; // collect txRef returned and pass to a                    server page to complete status check.
                        console.log("This is the response returned after a charge", await response, response.data);
                        if (
                            response.respcode == "00" ||
                            response.data.responseCode == "00" ||
                            response.data.responseCode == "0" || response.success == true || response.data.responsemessage == 'successful'
                        ) {

                           let user = await finder('email', m)
                           await update('amount', Number(amount), user[1])
                           await add(m, Number(amount), 'credit')
                           alert("transaction Successful")
                           window.location.reload()
                            // redirect to a failure page.
                            //    await db.collection('users').where('email', '==', m).get().then(async d=>{
                            //         let ido = d.docs[0].id
                            //         console.log(ido)
                            //         await db.collection('users').doc(ido).update({paymentStatus: 200})
                            //     })
                            //     alert('payemnt recieved, you can begin to share the link to your site to your customers')
                            //     window.location.href = '/loggedin.html'
                        }

                        x.close(); // use this to close the modal immediately after payment.


                   },
                   function close(close) {
                    console.log(close) //transaction close
                   }
                );
            }
            paywithSeerbit()

        } else {

        }
    })

}

async function findUser(email) {
    return await db.collection('users').where("email", '==', email).where("type", "==", "admin").get().then(data => {
        return data.docs[0].data()
    }).catch(e => console.log(e))
}
async function finder(key, value) {
    console.log(key, value)
    return await db.collection('users').where("type", "==", "admin").where(key, '==', value).get().then(data => {
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e => console.log(e))
}
async function update(key, value, id) {
    return await db.collection('users').doc(id).update({ [key]: value }).then(data => {
        return 'done'
    }).catch(e => console.log(e))
}

async function add(email, amount, type){
    return await db.collection('records').add({
        user: email,
        amount: amount,
        date: Date.now(),
        type: type
    }).then(data=> 'done').catch(e=> {
        console.log(e)
        return "error occured"
    })
}


function findN(Sn) {
    let n = 2
    while (Math.pow(3, n) - 1 < (Sn + 1) * 2) {
        n = n + 1
    }
    n == 1 ? Sn_1 = Math.ceil((0.5) * (Math.pow(3, n) - 1)) : Sn_1 = Math.ceil((0.5) * (Math.pow(3, n - 1) - 1))
    return [n, Sn_1, Sn - Sn_1 + 1]
}

// console.log(findN(5)) //if tot referral  = 4 then first position in third gen is picked
// // if no one is found give no one

// "id": "3005351b-b379-5c9c-bb52-e979ce27b9d9",
// "integratorId": "273b23f0-f32d-5306-b61d-b30dd25e956b"


// "id": "3005351b-b379-5c9c-bb52-e979ce27b9d9",
// "integratorId": "273b23f0-f32d-5306-b61d-b30dd25e956b"

//c61060e9-635a-5392-b39d-b1c27479d67c
