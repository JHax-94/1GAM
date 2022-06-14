#pragma strict

var nullMaterial : Material;
var loveMaterial : Material;
var wanderMaterial : Material;
var peaceMaterial : Material;

var SpellOn : int;


function magicOn(spell : int)
{
	switch(spell)
	{
		case 1:
		
			transform.renderer.sharedMaterial = loveMaterial;
		
		break;
		
		case 2: 
		
			transform.renderer.sharedMaterial = wanderMaterial;
		
		break;
		
		case 3:
		
			transform.renderer.sharedMaterial = peaceMaterial;
		
		break;
		
		
		
	}
	SpellOn = spell;
}	

function magicOff(coolDown : boolean)
{
	transform.renderer.sharedMaterial = nullMaterial;
	var World = GameObject.FindGameObjectWithTag("Lantern");
	
	if(coolDown == true)
	{
		World.GetComponent(worldStats).setCoolDown();
	}
	
	SpellOn = 0;
}

function magicOff()
{
	magicOff(true);
}