#pragma strict

var loveMat : Material;
var wanderMat : Material;
var peaceMat : Material;

var spiritType : int;

var timer : float = 0;

var villagerCalled : boolean = false;

var villager : Transform;

function callVillager()
{
	var faceInfo = transform.parent.GetComponent(faceInfo);	
	var outwardVec = faceInfo.Normal;
	var planarPosition : Vector3 = transform.position;
		
	if(outwardVec.x != 0)
	{
		planarPosition.x = 40.3*outwardVec.x;
	}
	else if(outwardVec.y != 0)
	{
		planarPosition.y = 40.3*outwardVec.y;
	}
	else if(outwardVec.z != 0)
	{
		planarPosition.z = 40.3*outwardVec.z;
	}
		
	villager = faceInfo.closestVillager(planarPosition);
		
	if(villager.tag != "Face")
	{
		var villagerScript = villager.GetComponent(personality);
	
		villagerScript.giveTask("GoToSpirit");
		villagerScript.Target = planarPosition;
		villager.rigidbody.velocity = (planarPosition - villager.position)/(planarPosition-villager.position).magnitude;
		villagerCalled = true;			
	}
}

function Start()
{
	var hand = GameObject.FindGameObjectWithTag("Hand");
	spiritType = hand.GetComponentInChildren(spellOn).SpellOn;	
	
	if(spiritType == 1)
	{
		transform.renderer.sharedMaterial = loveMat;
	}
	else if(spiritType == 2)
	{
		transform.renderer.sharedMaterial = wanderMat;
	}
	else if(spiritType == 3)
	{
		transform.renderer.sharedMaterial = peaceMat;
	}
	hand.GetComponentInChildren(spellOn).magicOff();
	
	callVillager();
				
}


function imbueSpirit()
{
	var villagerScript = villager.GetComponent(personality);

	if(spiritType == 1)
	{
		villager.rigidbody.velocity = Vector3.zero;
	
		villagerScript.wantToBreed = true;
		villagerScript.giveTask("SearchForPartner");
		villagerScript.findPartner();
	}
	else if(spiritType == 2)
	{
		villager.rigidbody.velocity = Vector3.zero;
		//villager.GetComponent(personality).giveTask("None");
		villagerScript.Wanderlust();
	}
	else if(spiritType == 3)
	{
		villagerScript.Aggression /= 2;
		villager.rigidbody.velocity = Vector3.zero;
		villagerScript.giveTask("None");
	}
	
	
	Destroy(gameObject);
}

function Update()
{
	if(timer != 0)
	{
		timer -= Time.deltaTime;
		if(timer <= 0)
		{
			timer = 0;
		}
	}
}

function FixedUpdate () 
{
	if(villagerCalled == false && timer == 0)
	{
		callVillager();
		timer = 7;
	}
	else
	{
		if(villager == null)
		{
			villagerCalled = false;		
		}
		else if(villager.tag != "Villager")
		{
			villagerCalled = false;
		}
		
	}
}