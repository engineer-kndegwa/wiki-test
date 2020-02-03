(
    function(){
        const input = document.getElementById("title-input");
        const loadingText = document.getElementsByClassName("loading-text")[0];
        const submitArticleTitleBtn = document.getElementById("submit-article-title");
        const BASE_API_URL = "https://en.wikipedia.org/api/rest_v1/page/metadata/";
        const LANGUAGES = [
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
            {
                key: 'en',
                language: "English"
            }
        ]

        submitArticleTitleBtn.addEventListener("click", ()=>{
            // Show loader text
            loadingText.classList.remove('hide');
            const query = input.value;
            if(query.length){
            fetch(`${BASE_API_URL}${query}`)
            .then(data=>{
                console.log(data)
               if(data.ok){
                    data
                    .json()
                    .then(info=>{
                        loadingText.classList.add('hide');
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
                        loading = false;
                    });
    
               } else {
                    loadingText.classList.add('hide');
                   throw new Error("Data response not a 200")
               }
            })
            .catch(error=>{
                loadingText.classList.add('hide');
                console.log(error, "error occured")
            });
            } else {
                loadingText.classList.add('hide');
                console.log("Nothing submitted")
            }
        });
    }
)();
