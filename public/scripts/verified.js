async function getProducts(){
    return await db.collection('verifiedUser').get().then(data=>{
        return data
    }).catch(e=> console.log(e))
}

async function getproduct(id){
    let product = await db.collection("products").where("id", "==", id).get().then(res=> res.docs[0].data())
    return product
}


const setProps = async function (datax) {
    console.log(datax)
   
    let html = ''
    for(let i=0; i< datax.docs.length; i++) {
        let dat = datax.docs[i]
        let data = dat.data()
        let product = await getproduct(data.id)
        let htm = `
        <div style="width: 90%; margin-left: 5%">
        <div style="border-bottom: 1px solid black;" class="row">
            <div style="border-right: 1px solid black" class="col l3">
                <br>
                <img style="width: 100%" src=${product.url}>
                <p>Product Details:<br> ${product.productName} <br>₦ ${product.monthlyPayment || product.amount}<br>  </p>




            </div>
            <div style="border-right: 1px solid black"  class="col l3">
                <br>
                <img style="width: 100%" src="3.jpg">
                <p>Client Name: ${data.name}<br>
                     <br>
                    Gambling rate: ${data.behaviouralAnalysis.gamblingRate}<br>
                    

                </p>
            </div>
            <div  class="col l6">
                <p><span style="color: red">Result</span><br>
                    verified user
                </p>
            </div>

        </div>
    </div>


           
        `
        html+=htm
    }


    if(html === ''){
        document.getElementById('users').innerHTML = "<p></p>"
        return 
    }
    document.getElementById('users').innerHTML = html
    return html
}


let loaded = (async function (){
    let products = await getProducts()
    setProps(products)
})()