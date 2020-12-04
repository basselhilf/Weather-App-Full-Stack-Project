const render = new Renderer()
const temp = new TempManager()



async function loadPage(){
    await temp.getDataFromDB()
    render.renderData(temp.cityData)
}

async function handleSearch(){
    let info = await $('#input').val()
    info = info.charAt(0).toUpperCase()+info.slice(1)
    if(temp.cityData.find((c)=>c.name===info)){
        $('#input').val('The city exist').css('color','red')
        setTimeout(()=>{
            $('#input').val('').css('color','black')
        },3000)
    }else{
        await temp.getCityData(info)
        await render.renderData(temp.cityData)
        $('#input').val('')
    }
}

$('#btn').on('click',function(){
    handleSearch()
})

$('#list').on('click','.save',function(){
    let cityName = $(this).closest($('div')).find($('.cityN')).html()
    temp.saveCity(cityName)
})

$('#list').on('click', '.delete', function () {
    let cityName = $(this).closest($('div')).find($('.cityN')).html();
    temp.removeCity(cityName);
    render.renderData(temp.cityData);
  })
  
  loadPage()