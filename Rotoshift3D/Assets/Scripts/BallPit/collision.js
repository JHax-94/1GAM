#pragma strict


function OnTriggerEnter()
{	
	Debug.Log("Collision!");
	
	Destroy(gameObject);
	
	
}