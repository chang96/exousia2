async function getProducts(){
    return await db.collection('products').get().then(data=>{
        return data
    }).catch(e=> console.log(e))
}



const setProps = function (data) {
    console.log(data)
   
    let html = ''
    data.forEach((dat, i)=> {
        let data = dat.data()
        let htm = `
        <div style="width: 90%; margin-left: 5%">
               <div style="border-bottom: 1px solid #000000" class="row">
                   <div style="border-right: 1px solid black" class="col l3">
                       <br>
                       <img style="width: 100%" src=${data.url}>
                       <p>Product Details:<br> ${data.productName} <br>₦${data.monthlyPayment || data.amount}<br>  </p>




                   </div>
          
                   <div  class="col l6">
                       <p><span style="color: red">Link</span><br>
                       https://exousia2-16947.web.app?productid=${data.id}
                       </p>
                   </div>

               </div>
           </div>
        `
        html+=htm
    })
    if(html === ''){
        document.getElementById('products').innerHTML = "<p></p>"
        return 
    }
    document.getElementById('products').innerHTML = html
    return html
}


let loaded = (async function (){
    let products = await getProducts()
    setProps(products)
})()


//http://localhost:5005