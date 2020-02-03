(
    function(){
        const API_URL_SUFFIX = "wikipedia.org/api/rest_v1/page/metadata/";
        const input = document.getElementById("title-input");
        const loadingText = document.getElementsByClassName("loading-text")[0];
        const info = document.getElementsByClassName("info")[0];
        const error = document.getElementsByClassName("error")[0];
        const submitArticleTitleBtn = document.getElementById("submit-article-title");
        // Language Selection.
        const LANGUAGES = [
            {
                key: 'en',
                language: "English",
                dir:"ltr"
            },
            {
                key: 'fr',
                language: "Français",
                dir:"ltr"
            },
            {
                key: 'it',
                language: "Italiano",
                dir:"ltr"
            },
            {
                key: 'pt',
                language: "Português",
                dir:"ltr"
            },
            {
                key: 'pl',
                language: "Polski",
                dir:"ltr"
            },
            {
                key: 'zh',
                language: "中文",
                dir:"ltr"
            },
            {
                key: 'de',
                language: "Deutsch",
                dir:"ltr"
            },
            {
                key: 'es',
                language: "Deutsch",
                dir:"ltr"
            },
            {
                key: 'ar',
                language: 'العربية',
                dir:"rtl"
            }
        ];
        // Select Language Paragraph
        const selectLanguageParagraph = document.getElementsByClassName("select-language-section")[0];
        // Insert Languages Dynamically in the DOM
        const options = LANGUAGES.map(lang=>{
            return `<option value=${lang.key} dir=${lang.dir}>${lang.language}</option>`
        });

        // Note. InnerHTML is expensive. For consideration later.
        selectLanguageParagraph.innerHTML = `<select id="language-options">${options}</select>`;
        submitArticleTitleBtn.addEventListener("click", ()=>{
            // Show loader text
            loadingText.classList.remove('hide');

            // Get Language
            const lang = document.getElementById("language-options").value;
            const query = input.value;
            if(query.length){
            fetch(`https://${lang}.${API_URL_SUFFIX}${query}`)
            .then(data=>{
               if(data.ok){
                    data
                    .json()
                    .then(info=>{
                        error.classList.add('hide'); // Info Text Hide
                        loadingText.classList.add('hide');
                        const resultsSection = document.getElementById('results-section');
                        const data = info.toc.entries.filter(item=>item.html);
                        let text = '';
                        for(let i=0; i < data.length; i++){
                            console.log(data[i], "here we go")
                            text = text + `<p>${data[i].number}. ${data[i].html}</p>`
                        };
                        resultsSection.innerHTML = `
                            <div class="results-list">
                            ${text}
                            </div>
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
                error.classList.remove('hide');
                console.log(error, "error occured")
            });
            } else {
                loadingText.classList.add('hide');
                info.classList.remove('hide');
                console.log("Nothing submitted")
            }
        });
    }
)();
