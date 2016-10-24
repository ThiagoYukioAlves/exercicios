var model = {
	init: function(){
		function catObject(name, imgSrc){
			this.name = name;
			this.imgSrc = imgSrc;
			this.clickCount = 0; 
		}

		var catShowed = 0;

		var catsArray = [new catObject("Burrito", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQASlEv3pALbLaKU8Q4Fou4GfBUxiXJ0RMwKkU7oFn6uDfwev66ABPP6Pc"),
			new catObject("Marceline", "https://s-media-cache-ak0.pinimg.com/236x/bd/06/21/bd0621cfdf4cf49def9bfa9a3446df07.jpg"),
			new catObject("Hari", "https://i.ytimg.com/vi/Dnx0z1cC8u8/maxresdefault.jpg"),
			new catObject("Chato", "https://pbs.twimg.com/profile_images/616542814319415296/McCTpH_E.jpg")
		];
	},

	addCat: function(name, imgSrc){
		catsArray.append(new catObject(name, imgSrc));
	},

};


//model.addCat("Leao", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGA07VZae-o7s0mBgMB0cwv4g-GtcJR52wjEjcoEbHnEAHbMdWR1zvnOk");
var view = {
	init: function(){
		displayView.init();
		listView.init();
	},

	displayView: {
		init: function(){
			document.getElementById("catsName").textContent = "Click on a cat on the list!!";
		},

		render: function(){

		}
	},

	listView: {
		init: function(){
			catsArray = controller.getCatsArray();
			for(var i = 0; i < catsArray.length; i++){
				listView.addCat(catsArray[i]);
			}
		},

		addCat: function(cat){
			var list = document.getElementById("catsList");
			var listItem = document.createElement("li");
			listItem.textContent = cat.name;

			listView.addClickListener(cat, listItem);

			list.appendChild(listItem);
		},

		addClickListener: function(cat, listItem){
			listItem.addEventListener('click', function(){
				document.getElementById('catsName').textContent = cat.name;
				document.getElementById('catsImage').src = cat.imgSrc;
				document.getElementById("count").textContent = ("This cat was clicked " + (controller.getClickCount(cat)) + " times!!");
			});
		}
	}
};
			

document.getElementById('catsImage').addEventListener('click', function(){
	document.getElementById("count").textContent = ("This cat was clicked " + (++(catsArray[catShowed].clickCount)) + " times!!");
});


var controller = {
	init: function(){
		model.init();
		view.init();
	},

	getClickCount: function(cat){
		return cat.clickCount;
	}
};