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
	},

	updateCatInfo: function(cat, newName, newImg, newClicks){
		cat.name = newName;
		cat.imgSrc = newImg;
		cat.clickCount = newClicks;
	},

};


var view = {
	init: function(){
		this.display.init();
		this.list.init();
		this.adminArea.init();
	},

	adminArea: {
		init: function(){
			var button = document.getElementById("adminButton");
			var area = document.getElementById("adminArea");

			// Inicializa com botao visivel e painel invisivel
			button.style.display = "block";
			area.style.display = "none";

			// Adiciona listener caso o botao de admin seja pressionado
			button.addEventListener('click', function(){
				button.style.display = "none";
				area.style.display = "block";
				this.render();
			});

			// Adiciona listener caso o cancel seja pressionado
			document.getElementById("formCancel").addEventListener('click', function(){
				button.style.display = "block";
				area.style.display = "none";
			});

			// Adiciona listener caso o submit seja pressionado
			document.getElementById("formChange").addEventListener('click', function(){
				var newName = document.getElementById("formName").value;
				var newImg = document.getElementById("formImg").value;
				var newClicks = document.getElementById("formClicks").value;

				controller.updateCatInfo(newName, newImg, newClicks);
			});

		},

		render: function(){
			if(view.display.catShowed !== null){
				document.getElementById("formName").value = view.display.catShowed.name;
				document.getElementById("formImg").value = view.display.catShowed.imgSrc;
				document.getElementById("formClicks").value = view.display.catShowed.clickCount;
			}
		},
	},


	display: {
		catShowed: null,

		init: function(){
			document.getElementById("catsName").textContent = "Click on a cat on the list!!";
			this.catShowed = null;  

			document.getElementById('catsImage').addEventListener('click', function(){
				if(this.catShowed !== null){
					controller.catWasClicked();
					view.adminArea.render();
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
				view.adminArea.render();
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

	updateCatInfo: function(name, imgSrc, clicksNumber){
		model.updateCatInfo(view.display.catShowed, name, imgSrc, clicksNumber);
		view.display.render();
	},
};


// Inicializa o app
controller.init();

model.addCat("Leao", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGA07VZae-o7s0mBgMB0cwv4g-GtcJR52wjEjcoEbHnEAHbMdWR1zvnOk");