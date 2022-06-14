#pragma strict

var artType : String;
var archaeologistInbound : boolean = false;
var indianaJones : Transform;

var timer : float = 0;

var worldScript : worldStats;// = transform.parent.parent.parent.GetComponent(worldStats);

function Initialise()
{
	worldScript = transform.parent.parent.parent.GetComponent(worldStats);
	
	worldScript.resetArtCount();
	
	artType = worldScript.artType;
}

function studyArtifact()
{
	var personalityScript = indianaJones.GetComponent(personality);

	personalityScript.lifeExpectancy *= 2;
	var worldUpdate = new float[6];	
	
	
	if(artType == "Technology")
	{
		personalityScript.Curiosity += 5;
		personalityScript.Industriousness += 5;
	 	worldUpdate[3] = 5;
	 	worldUpdate[4] = 5;
	}
	else if(artType == "Culture")
	{
		personalityScript.Amorousness += 5;
		personalityScript.Curiosity += 5;
		worldUpdate[1] = 5;
		worldUpdate[3] = 5;
	}
	else if(artType == "Politics")
	{
		personalityScript.Charisma += 5;
		personalityScript.Organisation += 5;
		worldUpdate[2] = 5;
		worldUpdate[5] = 5;
	}
	
	worldScript.updateStats(worldUpdate);
	worldScript.enlightenmentRate ++;
	//transform.parent.parent.parent.GetComponent(worldStats).resetArtCount();
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
	if(archaeologistInbound == false && timer == 0)
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
		
		indianaJones = faceInfo.closestVillager(planarPosition);
		
		if(indianaJones.tag != "Face")
		{
			var personalityScript = indianaJones.GetComponent(personality);
		
			personalityScript.giveTask("GoToArtifact");
			personalityScript.Target = planarPosition;
			indianaJones.rigidbody.velocity = (planarPosition - indianaJones.position)/(planarPosition-indianaJones.position).magnitude;
			archaeologistInbound = true;			
		}
		timer = 7;
	}
	else
	{
		if(indianaJones == null)
		{
			archaeologistInbound = false;
		}
	
	
	}
}