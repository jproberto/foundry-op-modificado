//chamar assim:  [[/macroExec "T" testName="Resistência de Fortitude" skillName="resilience" dt="15" ]]{Atacar com -1d20}

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
	
	let roll = new Roll(skill.formula);
	roll.evaluate();
	await game.dice3d.showForRoll(roll, game.user, true);
	
	let resultMessage = roll.total >= scope.dt ? "Sucesso!" : "Falha!";
	
	roll.toMessage({
		speaker: ChatMessage.getSpeaker({ actor: myTokenActor }),
		flavor: `${scope.testName} (DT ${dt}): ${resultMessage}`
	});
}