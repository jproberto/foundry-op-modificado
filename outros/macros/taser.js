//chamar assim:  [[/macroExec "Taser" itemName="Taser"]]{Atacar com -1d20}

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
	
	if (myItem.system.quantidadeUsos <= 0) {
		ui.notifications.warn("O taser não tem mais carga!");
		return;
	}
	
	await myItem.update({"system.quantidadeUsos": myItem.system.quantidadeUsos-1});
	
	let roll = new Roll("1d6");
	roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
	
	await roll.toMessage({
		speaker: ChatMessage.getSpeaker({ actor: myTokenActor }),
		flavor: `Dano de Eletricidade`
	});
	
	let formulaFortitude = "@fortitude.formula";
	//let dt = 10 + myTokenActor.system.nivel.value + myTokenActor.system.attributes.dex.value;
	let dt = 11 + myTokenActor.system.attributes.dex.value;
	let content = `<button> [[/macroExec "TestePericia" testName="Resistência de Fortitude" skillName="resilience" dt="${dt}" ]]{Rolar Fortitude}</button>`;
	
	ChatMessage.create({
		content: content,
		spealer: ChatMessage.getSpeaker({ token: myTokenActor }),
	});
}