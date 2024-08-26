// Chamar assim:  [[/macroExec "FlashCamera" itemName="Camera" bright="6" dim="9" angle="120" color="#ffffff"]]{Tirar Foto com Flash}

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
	
	await myTokenCanvas.document.update({ 
		light: { 
			bright: scope.bright, 
			dim: scope.dim, 
			angle: scope.angle, 
			color: scope.color
		} 
	});
	
	setTimeout(async () => {
		await myTokenCanvas.document.update({ 
			light: { 
				bright: 0, 
				dim: 0, 
				angle: 0 
			} 
		});
	}, 100); // 100 milissegundos = 0.1 segundos
	
	setTimeout(async () => {
		await myTokenCanvas.document.update({ 
			light: { 
				bright: scope.bright, 
				dim: scope.dim, 
				angle: scope.angle, 
				color: scope.color
			} 
		});
	}, 300); // 200 milissegundos = 0.2 segundos
	
	setTimeout(async () => {
		await myTokenCanvas.document.update({ 
			light: { 
				bright: 0, 
				dim: 0, 
				angle: 0 
			} 
		});
	}, 400); // 100 milissegundos = 0.1 segundos
}
