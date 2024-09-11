//chamar assim:  [[/macroExec "Bateria" itemName="Celular"]]{Checar Bateria}

main()

async function main() {
	//Is a token selected? If not, error
	if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
		ui.notifications.error("Precisa selecionar um token");
		return;
	}
	let myTokenActor = canvas.tokens.controlled[0].actor;
	let myTokenCanvas = canvas.tokens.controlled[0];
	
	let myItem = myTokenActor.items.find(item => item.name == scope.itemName)
	if(myItem == null || myItem == undefined){
		ui.notifications.error("Não tem um " + scope.itemName);
		return;
	}
	
	if (myItem.system.usaBateria == 0) {
		ui.notifications.error("O item não usa bateria");
		return;
	}
	
	if (myItem.system.bateriaCarregada == 0) {
		ui.notifications.error("A bateria está descarregada");
		return;
	}
	
	let roll;
	if (myItem.system.bateriaPotente == 0) {
		switch(myItem.system.quantidadeUsos) {
			case 0: 
				roll = new Roll(`1d12`);
				break;
			case 1: 
				roll = new Roll(`1d10`);
				break;
			case 2: 
				roll = new Roll(`1d8`);
				break;
			case 3: 
				roll = new Roll(`1d6`);
				break;
			default: 
				roll = new Roll(`1d4`);
		}
	} else {
		switch(myItem.system.quantidadeUsos) {
			case 0: 
			case 1: 
				roll = new Roll(`1d12`);
				break;
			case 2: 
			case 3: 
				roll = new Roll(`1d10`);
				break;
			case 4: 
			case 5: 
				roll = new Roll(`1d8`);
				break;
			case 6: 
			case 7: 
				roll = new Roll(`1d6`);
				break;
			default: 
				roll = new Roll(`1d4`);
		}
	}
	
	await roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
//	console.log(roll._formula);
//	console.log(roll.result);
	
	if (roll.result == 1) {
		myItem.system.bateriaCarregada = 0;
		
		ui.notifications.error("A bateria descarregou");
		return;
	} else {
		ui.notifications.info("A bateria continua carregada");
	}
	
	await myItem.update({"system.quantidadeUsos": myItem.system.quantidadeUsos+1});
}
