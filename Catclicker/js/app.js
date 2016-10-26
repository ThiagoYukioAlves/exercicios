var model = {
	init: function(){
		function catObject(name, imgSrc){
			this.name = name;
			this.imgSrc = imgSrc;
			this.clickCount = 0; 
		}


		this.catsArray = [new catObject("Burrito", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASlEv3pALbLaKU8Q4Fou4GfBUxiXJ0RMwKkU7oFn6uDfwev66ABPP6Pc"),
			new catObject("Marceline", "https://s-media-cache-ak0.pinimg.com/236x/bd/06/21/bd0621cfdf4cf49def9bfa9a3446df07.jpg"),
			new catObject("Hari", "https://i.ytimg.com/vi/Dnx0z1cC8u8/maxresdefault.jpg"),
			new catObject("Chato", "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg")
		];
	},

	addCat: function(name, imgSrc){
		catsArray.append(new catObject(name, imgSrc));
	},

	catWasClicked: function(cat){
		cat.clickCount++;
	},

	getClickCount: function(cat){
		return cat.clickCount;
	},

	getImgSrc: function(cat){
		return cat.imgSrc;
	}


};


//model.addCat("Leao", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGA07VZae-o7s0mBgMB0cwv4g-GtcJR52wjEjcoEbHnEAHbMdWR1zvnOk");
var view = {
	init: function(){
		this.display.init();
		this.list.init();
	},

	display: {
		catShowed: 0,

		init: function(){
			document.getElementById("catsName").textContent = "Click on a cat on the list!!";
			this.catShowed = 0;  

			document.getElementById('catsImage').addEventListener('click', function(){
				if(catShowed !== 0){
					controller.catWasClicked();
				}
			});

		},

		render: function(){
			document.getElementById('catsName').textContent = catShowed.name;
			document.getElementById('catsImage').src = catShowed.imgSrc;
			document.getElementById("count").textContent = ("This cat was clicked " + (controller.getClickCount()) + " times!!");
		},

		changeCatSelection: function(newCat){
			this.catShowed = newCat;
			this.render();
		},
	},

	list: {
		init: function(){
			var catsArray = controller.getCatsArray();
			
			for(var i = 0; i < catsArray.length; i++){
				this.addCat(catsArray[i]);
			}
		},

		addCat: function(cat){
			var catsList = document.getElementById("catsList");
			var listItem = document.createElement("li");
			listItem.textContent = cat.name;

			this.addClickListener(cat, listItem);
			catsList.appendChild(listItem);
		},

		addClickListener: function(cat, listItem){
			listItem.addEventListener('click', function(){
				view.display.changeCatSelection(cat);
			});
		}
	}
};
			


var controller = {
	init: function(){
		model.init();
		view.init();
	},

	// Funcao para a view pegar o numero de clicks do model
	getClickCount: function(){
		return model.getClickCount(view.catShowed);
	},

	// Funcao para a display avisa o model que o gato foi clicado
	catWasClicked: function(){
		model.catWasClicked(view.catShowed);
		view.display.render();
	},

	getCatsArray: function(){
		return model.catsArray;
	},
};


// Inicializa o app
controller.init();