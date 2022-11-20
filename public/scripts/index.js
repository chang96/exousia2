//integrator id 52165cfe-bbb6-4734-9b4c-811ee9bf02ed
// https://webhook.site/f9d3b260-0ff0-4222-94f4-96ef448c5329
//f9d3b260-0ff0-4222-94f4-96ef448c5329@email.webhook.site
//https://webhook.site/#!/f9d3b260-0ff0-4222-94f4-96ef448c5329


const head = `http://localhost:3006`;


async function findUser(email){
    return await db.collection('users').where("email", '==', email).get().then(data=>{
        return data.docs[0].data()
    }).catch(e=> console.log(e))
}
async function finder(key, value){
    console.log(key, value)
    return await db.collection('users').where(key, '==', value).get().then(data=>{
        console.log(data)
        return [data.docs[0].data(), data.docs[0].id]
    }).catch(e=> console.log(e))
}
async function update(key, value, id){
    return await db.collection('users').doc(id).update({[key]: value}).then(data=>{
        return 'done'
    }).catch(e=> console.log(e))
}
async function login(){

    const email = document.getElementById('email').value.toLowerCase()
    const password = document.getElementById('password').value
    
        auth.signInWithEmailAndPassword(email, password).then(async c => {
            
                db.collection('logs').add({
                    who: email,
                    date: Date.now()
                }).then(function(d){
                    window.location.href = 'Dashboard.html' 
                })
      
  
}).catch(e =>{
    console.log(e)
    alert(e.message)
})
}



// needed forget password page
// verify email page
// 