const items = document.querySelectorAll(".flex-items-container__item");

// selects the siblings of the argument
let siblings = (item) =>{
	let siblings = [];
	let sibling = item.parentNode.firstChild;

	while(sibling){
		if (sibling.nodeName == "DIV" && sibling != item){
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling;
	}

	return siblings;
}

const activate = (item) =>{
	item.classList.remove("flex-items-container__item--inactive");
	item.classList.add("flex-items-container__item--active");
}

const deactivate = (item) => {
	item.classList.remove("flex-items-container__item--active");
	item.classList.add("flex-items-container__item--inactive");
}

items.forEach(item => item.addEventListener("click", () => {	
	// reverses the active status once clicked
	item.active = !item.active;
	
	if(item.active){
		// deactivates siblings if item is clicked
		for(sibling of siblings(item)){
			sibling.active = false;
			deactivate(sibling);
		}

		activate(item);
	}else{
		deactivate(item);
	}
}));

