//chamar assim:  [[/macroExec "Lanterna" itemName="Celular" bright="4.5" dim="9" color="#f7e7d5"]]{Ligar/Desligar Lanterna}

main()

async function main(){
	if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
		ui.notifications.error("Precisa selecionar um token");
		return;
	}
	let myTokenActor = canvas.tokens.controlled[0].actor;
	let myTokenCanvas = canvas.tokens.controlled[0];
	
	let myItem = myTokenActor.items.find(item => item.name == scope.itemName)
	if(myItem == null || myItem == undefined){
		ui.notifications.error("Não tem " + scope.itemName);
		return;
	}
	
	if(myItem.system.lanternaLigada == 1) {
		myTokenCanvas.document.update({ light:{ bright : 0, dim: 0}} );
		myItem.system.lanternaLigada = 0;
		return;
	}

	if (myItem.system.bateriaCarregada == 0) {
		ui.notifications.error("A bateria está descarregada");
		return;
	}
	
	/*
	//Subtract a torch
	await torch.update({"system.quantity": torch.system.quantity - 1})
	if(torch.system.quantity < 1){
		torch.delete();
	}
	*/
	
	// update light source
	myTokenCanvas.document.update({ light:{ bright : scope.bright, dim: scope.dim, color: scope.color}} );
	myItem.system.lanternaLigada = 1;
}