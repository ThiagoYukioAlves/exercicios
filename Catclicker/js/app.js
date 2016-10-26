var model = {
	catObject: function(name, imgSrc){
		this.name = name;
		this.imgSrc = imgSrc;
		this.clickCount = 0; 
	},

	init: function(){
		this.catsArray = [new this.catObject("Burrito", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASlEv3pALbLaKU8Q4Fou4GfBUxiXJ0RMwKkU7oFn6uDfwev66ABPP6Pc"),
			new this.catObject("Marceline", "https://s-media-cache-ak0.pinimg.com/236x/bd/06/21/bd0621cfdf4cf49def9bfa9a3446df07.jpg"),
			new this.catObject("Hari", "http://www.animale.me/wp-content/uploads/2012/08/gato-bengal.jpg"),
			new this.catObject("Chato", "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg")
		];
	},

	addCat: function(name, imgSrc){
		var cat = new this.catObject(name, imgSrc);
		this.catsArray.push(cat);
		controller.catWasAdded(cat);
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


var view = {
	init: function(){
		this.display.init();
		this.list.init();
	},

	display: {
		catShowed: null,

		init: function(){
			document.getElementById("catsName").textContent = "Click on a cat on the list!!";
			this.catShowed = null;  

			document.getElementById('catsImage').addEventListener('click', function(){
				if(this.catShowed !== null){
					controller.catWasClicked();
				}
			});

		},

		render: function(){
			document.getElementById('catsName').textContent = this.catShowed.name;
			document.getElementById('catsImage').src = this.catShowed.imgSrc;
			document.getElementById('count').textContent = ("This cat was clicked " + (controller.getClickCount()) + " times!!");
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
		return model.getClickCount(view.display.catShowed);
	},

	// Funcao para a display avisa o model que o gato foi clicado
	catWasClicked: function(){
		model.catWasClicked(view.display.catShowed);
		view.display.render();
	},

	getCatsArray: function(){
		return model.catsArray;
	},

	catWasAdded: function(cat){
		view.list.addCat(cat);
	},
};


// Inicializa o app
controller.init();

model.addCat("Leao", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGA07VZae-o7s0mBgMB0cwv4g-GtcJR52wjEjcoEbHnEAHbMdWR1zvnOk");