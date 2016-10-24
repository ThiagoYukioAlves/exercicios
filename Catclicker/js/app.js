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
			

			for(var i = 0; i < catsArray.length; i++){
				var list = document.getElementById("catsList");
				var listItem = document.createElement("li");
				listItem.textContent = catsArray[i].name;
				


				listItem.addEventListener('click', (function(iCopy){
					return function(){
						document.getElementById('catsName').textContent = catsArray[iCopy].name;
						document.getElementById('catsImage').src = catsArray[iCopy].imgSrc;
						catShowed = iCopy;
						document.getElementById("count").textContent = ("This cat was clicked " + (catsArray[catShowed].clickCount) + " times!!");
						
					};
				})(i));

				list.appendChild(listItem);
			}			

			document.getElementById('catsImage').addEventListener('click', function(){
						document.getElementById("count").textContent = ("This cat was clicked " + (++(catsArray[catShowed].clickCount)) + " times!!");
			});
