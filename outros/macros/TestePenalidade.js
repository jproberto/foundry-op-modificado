//chamar assim:  [[/macroExec "TestePenalidade" itemName="Vassoura" attribute="str" skillName="fight"]]{Atacar com -1d20}

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
	
	// Busca a perícia pelo nome
	let skill = actor.system.skills[scope.skillName];
	if (!skill) {
		ui.notifications.warn(`A perícia '${scope.skillName}' não foi encontrada.`);
		return;
	}
	
	let attr = skill.attr[1]-1;
	
	let formula;
	if (attr <= 0) {
		formula = attr+2+"d20kl"+skill.value;
	} else {
		formula = skill.formula;
	}
	
	let roll = new Roll(formula);
	roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
	
	roll.toMessage({
    speaker: ChatMessage.getSpeaker({ actor: actor }),
    flavor: `Teste com Penalidade: ${skillName}`
});
}