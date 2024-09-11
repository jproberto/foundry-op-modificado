//chamar assim:  [[/macroExec "RecuperarPD" itemName="Barra de Proteína" die="1d4"]]{Atacar com -1d20}

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
	
	let roll = new Roll(die);
	roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
	
	//myTokenActor.system.PE.value = parseInt(myTokenActor.system.PE.value) + parseInt(roll.result);
	//myItem.system.quantity -= 1;
	
	await myTokenActor.update({"system.PE.value": parseInt(myTokenActor.system.PE.value) + parseInt(roll.result)});
	await myItem.update({"system.quantity": myItem.system.quantity - 1})
	if(myItem.system.quantity < 1){
		myItem.delete();
	}
	
	roll.toMessage({
		speaker: ChatMessage.getSpeaker({ actor: myTokenActor }),
		flavor: `Recuperou PD`
	});
}