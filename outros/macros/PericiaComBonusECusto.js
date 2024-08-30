//chamar assim:  [[/macroExec "PericiaComBonusECusto" skillName="medicine" cost="2" bonus="5"]]{Atacar com -1d20}

main()

async function main() {
	//Is a token selected? If not, error
	if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
		ui.notifications.error("Precisa selecionar um token");
		return;
	}
	let myTokenActor = canvas.tokens.controlled[0].actor;
	let myTokenCanvas = canvas.tokens.controlled[0];
	
	let skill = myTokenActor.system.skills[scope.skillName];
	
	if (skill == undefined) {
		ui.notifications.error(`Não tem ${scope.skillName}`);
		return;
	}
	
	let pd = myTokenActor.system.PE.value;
	if (pd < cost) {
		ui.notifications.error(`Não tem PD suficiente`);
		return;
	}
	
	await myTokenActor.update({"system.PE.value": parseInt(myTokenActor.system.PE.value) - parseInt(scope.cost)});
		
	let roll = new Roll(skill.formula + "+" + scope.bonus);
	roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
	
	//myTokenActor.system.PE.value = parseInt(myTokenActor.system.PE.value) + parseInt(roll.result);
	//myItem.system.quantity -= 1;
	
	roll.toMessage({
		speaker: ChatMessage.getSpeaker({ actor: myTokenActor })
	});
}