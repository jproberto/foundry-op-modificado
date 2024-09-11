//chamar assim:  [[/macroExec "RecarregarBateria" itemName="Celular"]]{Recarregar Bateria}

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
	
	await myItem.update({"system.bateriaCarregada": 1});
	await myItem.update({"system.quantidadeUsos": 0});
	
	ui.notifications.info("A bateria foi carregada");
}
