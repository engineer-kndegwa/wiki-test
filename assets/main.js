(
    function(){
        const BASE_API_URL = "https://en.wikipedia.org/api/rest_v1/page/metadata/";
        fetch(`${BASE_API_URL}douglas_adams`)
        .then(data=>{
           if(data.ok){
                data
                .json()
                .then(info=>{
                    const resultsSection = document.getElementById('results-section');
                    const data = info.toc.entries.filter(item=>item.html);
                    let text = '';
                    for(let i=0; i < data.length; i++){
                        text = text + `<li> ${data[i].html} <li/>`
                    };
                    resultsSection.innerHTML = `
                    <ul>
                        ${text}
                    </ul>
                    
                    `
                });

           } else {
               throw new Error("Data response not a 200")
           }
        })
        .catch(error=>{
            console.log(error, "error occured")
        });
    }
)();
