//chamar assim:  [[/macroExec "Recarregar" weaponName="Pistola" reloadAmmount="6" ammoItemName="Balas Curtas"]]{Recarregar}

main()

async function main() {
	//Is a token selected? If not, error
	if(canvas.tokens.controlled.length == 0 || canvas.tokens.controlled.length > 1){
		ui.notifications.error("Precisa selecionar um token");
		return;
	}
	let myTokenActor = canvas.tokens.controlled[0].actor;
	let myTokenCanvas = canvas.tokens.controlled[0];
	
	let weapon = actor.items.find(i => i.name === weaponName);
	if (!weapon) {
		ui.notifications.warn(`A arma '${weaponName}' não foi encontrada no ator selecionado.`);
		return;
	}
	
	let ammoItem = actor.items.find(i => i.name === ammoItemName);
	if (!ammoItem) {
		ui.notifications.warn(`O item de munição '${ammoItemName}' não foi encontrado no inventário.`);
		return;
	}
	
	let currentAmmo = weapon.system.ammunitionQuantity || 0;
	if (currentAmmo >= reloadAmmount) {
		ui.notifications.warn(`A arma '${weaponName}' já está totalmente carregada.`);
		return;
	}
	
	let ammoQuantity = ammoItem.system.quantity;
	if (ammoQuantity < 1) {
		ui.notifications.warn(`Você não tem ${ammoItemName} o suficiente para recarregar.`);
		return;
	}
	
	let maxAmmo = reloadAmmount;
	
	if (ammoQuantity < reloadAmmount) {
		reloadAmmount = ammoQuantity
	}
	
	reloadAmmount -= currentAmmo;
	
	let newAmmo = Math.min(currentAmmo + reloadAmmount, maxAmmo);
	weapon.update({ "system.ammunitionQuantity": newAmmo });
	
	ammoItem.update({ "system.quantity": ammoQuantity - reloadAmmount });
	
	ui.notifications.info(`${weaponName} recarregada!`);
}