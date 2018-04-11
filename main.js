window.onload = function(e){
	const URL = "https://diogocezar.github.io/bazar/json/database.json";
	fetch(URL)
    .then((response) => { return response.json(); })
    .then((json) => {
    	const container = document.getElementsByClassName("personal-info");
    	const wrap = document.getElementsByClassName("wrap");
    	container[0].innerHTML = configBuilder(json.configs);
    	json.products.forEach((item) => {
    		wrap[0].innerHTML += productBuilder(item);
    	})

    });

    const configBuilder = function(configs) {
    	const title =  `<h1>${configs.title}</h1>`;
    	const subtitle = `<h2>${configs.subTitle}</h1>`;
    	const config = `${title} ${subtitle}`;
  		return config;
    }

	const productBuilder = function(produto){
		const url = "https://diogocezar.github.io/bazar";
		const titulo = `<h2> ${produto.name} </h2>`;
		const img = `<img src=${url + clearUrl(produto.image)}></img>`;
		const desc = descriptionBuilder(produto.description);
		const item = `<div class="selling"> ${titulo} ${img} ${desc}</div>`;
		return item;
	}
	const descriptionBuilder = function(descricao){
		let html = "";
		descricao.forEach((item) => {
			const dsc = getTextBetweenQuotes(JSON.stringify(item));
			console.log(dsc);
			 	html += `<${dsc.tag}>${dsc.texto}</${dsc.tag}>`;
		})
		return `<div class="description">${html}</div>`;
    }

	const clearUrl = function(url){		
		return url.substring(1, url.length);
		console.log(url);
	}

	const getTextBetweenQuotes = function(descricao){
		const regex = new RegExp('"(.*?)"', "g");
		const tag = descricao.substring(0, descricao.indexOf(":"));
		const texto = descricao.substring(descricao.indexOf(":"), descricao.lenght);
		return {
			tag	: tag.split('"')[1],
			texto : texto.split('"')[1]
		}

	}
};


