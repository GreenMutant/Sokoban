

(function() {
	
	
	function drawMap(map) {
		var main = document.createElement("div");
		main.style.width = map.width * 50 + "px";

		for(var row = 0;row < map.height;row++) {
			var rowDiv = document.createElement("div");

			for(var cell = 0;cell < map.width;cell++) { 
				var cellDiv = document.createElement("div");
				cellDiv.id = row + "-" + cell;

				if(map.mapGrid[row][cell][0] === "W") {
					cellDiv.className = Tiles.Wall;
				} else if(map.mapGrid[row][cell][0] === "G") {
					
					cellDiv.className = Tiles.Goal;
					
				} else {
					cellDiv.className = Tiles.Space;
				}
				if(map.mapGrid[row][cell][0] === "P") {
					player.positionX = row;
					player.positionY = cell;
					cellDiv.classList.add(Entities.Character);
				} else if (map.mapGrid[row][cell][0] === "B") {
					cellDiv.classList.add(Entities.Block);		
					blocks.push({positionX: row, positionY: cell, isPlayer: false, type: Entities.Block});
				}

				cellDiv.style.float = "left"
				rowDiv.appendChild(cellDiv);
			}
			
			main.appendChild(rowDiv);
			
		}
		document.body.appendChild(main);
		
	}

	function move(entity, direction) {
		var x = entity.positionX;
		var y = entity.positionY;

		switch(direction) {
			case "left":
				y--;
				break;
			case "up":
				x--;
				break;
			case "right":
				y++;
				break;
			case "down":
				x++;
				break;
			default:
				return false;
		}
	
		var nPosition = document.getElementById(x + "-" + y); 
		var oPosition = document.getElementById(entity.positionX + "-" + entity.positionY);
		let goalTiles = document.getElementsByClassName(Tiles.Goal)
		let blockDoneTiles = document.getElementsByClassName(Entities.BlockDone)

	
		if(nPosition.classList.contains(Tiles.Wall)) {
			return false;
		} else {

			if(nPosition.classList.contains(Entities.Block)) {
				
				var blockIndex = blocks.findIndex((e, i) => e.positionY == y && e.positionX == x);
				var block = blockIndex > -1 ? blocks[blockIndex] : null;
				if(block !== null) {

					if(!entity.isPlayer) {
						return false;
					}
					if(!move(block, direction)){
						return false;
					}

					for(i = 0; i < goalTiles.length; i ++) {
						if (goalTiles[i].classList.contains(Entities.Block)) {
							goalTiles[i].classList.add(Entities.BlockDone);
						} else {
							goalTiles[i].classList.remove(Entities.BlockDone)
						}
					}
					
					if( blockDoneTiles.length == goalTiles.length) {
						
						Congratulations()
					}
					
					nPosition.classList.add(entity.type);
					oPosition.classList.remove(entity.type);

				}
				
			}
		}
		
		nPosition.classList.add(entity.type);
		oPosition.classList.remove(entity.type);

		entity.positionX = x;
		entity.positionY = y;
		return true;
	}
	
	function readKey(event) {

		switch(event.keyCode) {
			case 37:
				move(player, "left");
				break;
			case 38:
				move(player, "up");
				break;
			case 39:
				move(player, "right");
				break;
			case 40:
				move(player, "down");
				break;
			default:
				break;
		}
	}

	var blocks = [];

	var player = {
		positionX: 0,
		positionY: 0,
		isPlayer: true,
		type: Entities.Character
	}
	document.onreadystatechange = function() {
		if(document.readyState === 'complete') {
			drawMap(tileMap01);
			document.onkeyup = readKey;
		}
	}
	
})();

function Congratulations() {
	setTimeout(function(){ alert("Congratulations!\nOK - New Game") ? "" : location.reload(); }, 300);
	
	
}
