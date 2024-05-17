


let arr = [];
let row = document.querySelector('.row');
let x = 24;
let array = []
let y = 0
let index = 0

let span = document.querySelector('.span')
let li = document.querySelectorAll('li')
let ul = document.querySelector('ul')
let h6 = document.querySelector('.h6')

span.addEventListener('click',() =>{
	span.style.cssText = "display:none;"
	h6.style.display = 'block'
	li.forEach((li)=>{
		ul.style.cssText = "display: block"
		li.style.cssText = "display: block;"
	})
})

h6.addEventListener('click',() =>{
	h6.style.cssText = "display:none;"
	span.style.display = 'block'
	for(let i = 1; i < li.length; i++){
		li[i].style.display = "none"
	}
})

let showmore = document.querySelector('#showmore')
const fetchAPN = async (z) => {
    let url = `https://api.themoviedb.org/3/movie/popular?page=${z}&api_key=761998e7939f98d4ae0e1f1950b743f3`;

    let respons = await fetch(url);
	
    let data = await respons.json();

	setTimeout (() => {
		showmore.style.display = "inline"
	},4000)
	
    return data 
		
};
let tPage = async (i,arr1) => {
    for (let z = 1; z > 0; z++) {
        let url1 = `https://api.themoviedb.org/3/movie/popular?page=${z}&api_key=761998e7939f98d4ae0e1f1950b743f3`;
        let respons = await fetch(url1);
        if (respons.status !== 200) {
            break;
        }else i+=1
    }
	for (let z = 1; z <= i; z++) {
		let responseData = await fetchAPN(z);
        arr1 = arr1.concat(responseData.results);
    }
    console.log(arr1);

	const img = () =>{
		for(let i = y; i < x; i++){
			tags(i)
		}
		y=x
	}
	
	console.log(arr1)
	const tags = (i)=>{
		let col = document.createElement('div')
		let backdropPath = arr1[i].backdrop_path
		let base_url = 'https://image.tmdb.org/t/p/original'
		let posterPath = arr1[i].poster_path
		let image = base_url + posterPath
		let hover = document.createElement('div')
		// console.log(image)
		
		background_url = base_url + backdropPath
		col.setAttribute('id', `col${i}`)
		col.setAttribute('class','col_1')
		let img = document.createElement('img');
		img.setAttribute('src', image);
		hover.setAttribute('class','hover')
		col.style.position = 'relative'

    // Diğer kodlar aynı kalır

    // Özet metnini ayarla
    	
		
		
		img.style.cssText = 'object-fit: cover; \
		width: 92%; \
		margin-bottom: 20px; \
		margin-left: 12px; \
		height: 300px'
		hover.style.cssText = 'position:absolute; \
		left:6%; \
		bottom: 7%; \
		width: 93%; \
		height: 0px; \
		z-index: 5; \
		background: white;'
		col.appendChild(hover)
		col.appendChild(img)
		row.appendChild(col)
		row.style.cssText = "display: grid; \
		grid-template-columns: 24% 24% 24% 24%; \
		width: 100%; \
		justify-content: center; \
		"
		
		
		for (let i = 0; i < arr1.length; i++) {
			if (arr1[i].overview.trim() != "") {
				$(`#col${i}`).hover(
					function () {
						$(this).find('.hover').css({
							'height': '200px',
							'transition': 'height 0.5s'
						});
						hover.textContent = arr1[i].overview;
		
						// Diğer hover efekti kodları...
					},
					function () {
						$(this).find('.hover').css({
							'height': '0',
							'transition': 'height 0.5s'
						});
						hover.textContent = '';
		
						// Diğer hover efekti kodları...
					}
				);
			}
		}
		


		$(`#col${i}`).hover(
			function() {
				$(`#col${i}`).siblings().css({
					'opacity': '0',
					'transition': 'all 0.5s'
				});
				hover.textContent = arr1[i].overview;
				
				let body1 = document.querySelector('#body1');
				body1.style.backgroundImage = `url(${base_url + backdropPath})`;
				body1.style.backgroundPosition = 'center';
				body1.style.backgroundSize = '100% 700px';
				body1.style.backgroundRepeat = "no-repeat"
				body1.style.backgroundAttachment = 'fixed';
				
			},
			function() {
				
				
				hover.textContent = '';
				let body1 = document.querySelector('#body1');
				body1.style.backgroundImage = '';
		
				$(`#col${i}`).siblings().css({
					'opacity': '1',
					'transition': 'all 0.5s'
				});
			}
		);
		
		
		

		





	}
document.addEventListener('keypress', (e)=>{
	if(e.key == "Enter"){
		let have = 0
		if(array != "" && array != []){
			row.innerHTML = ""
			for(let i = 0; i < arr1.length; i++){
				if(arr1[i].original_title.toLowerCase().includes(array.toLowerCase())){
					tags(i)
					have+=1
				}
				console.log(i)
			}
		}else if(array == "" && array == [])img()
		if(!have && array != "" && array != []){
			row.innerHTML = "<h1 style = 'text-align:center; color: white;'>Melumat Tapilmadi</h1>"
			row.style.cssText = "display: block; \
			width: 300px; \
			text-align: center;"
		}
		
	}
	
})
	return arr1,img()
};
tPage(index,arr)
$(document).ready(function (){
	$("#showmore").click(function(){
		x+=24
		tPage(index,arr)
		
		console.log(array)
	})
})


$( "#s2" ).on( "keyup", function(e) {

	let element = e.target.value
	array = element.split()
	array = String(array).trim()
});


const getData = async () => {
    for (let z = 1; z > 0; z++) {
		let responseData = await fetchAPN(z);
        if (!x) {
            break;
        }
        
        arr = arr.concat(responseData.results);
    }
    console.log(arr);
	
};