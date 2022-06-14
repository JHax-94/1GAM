#pragma strict

var bookType : String;
var readerInbound : boolean = false;
var reader : Transform;

var timer : float = 0;

var worldScript : worldStats;// = transform.parent.parent.parent.GetComponent(worldStats);

function Initialise()
{
	worldScript = transform.parent.parent.parent.GetComponent(worldStats);
	bookType = worldScript.bookType;
	worldScript.resetBookCounter();
	
	Debug.Log("Setting worldScript...");
}

function readBook()
{
	var readerStat = reader.GetComponent(personality);
	var worldUpdate = new float[6];
	
	if(bookType == "Aggression")
	{
		readerStat.Aggression += 5;
		worldUpdate[0] = 5;
		
	}
	else if(bookType == "Amorousness")
	{
		readerStat.Amorousness += 5;
		worldUpdate[1] = 5;
	}
	else if(bookType == "Charisma")
	{
		readerStat.Charisma += 5;
		worldUpdate[2] = 5;
	}
	else if(bookType == "Curiosity")
	{
		readerStat.Curiosity += 5;
		worldUpdate[3] = 5;
	}
	else if(bookType == "Industriousness")
	{
		readerStat.Industriousness += 5;
		worldUpdate[4] = 5;
	}
	else if(bookType == "Organisation")
	{
		readerStat.Organisation += 5;
		worldUpdate[5] = 5;
	}
	

	//transform.parent.parent.parent.GetComponent(worldStats).resetBookCounter();
	worldScript.updateStats(worldUpdate);
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
	if(readerInbound == false && timer == 0)
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
		
		
		reader = faceInfo.closestVillager(planarPosition);
		
		if(reader.tag != "Face")
		{
			var readerScript = reader.GetComponent(personality);
			readerScript.giveTask("GoToBook");
			readerScript.Target = planarPosition;
			reader.rigidbody.velocity = (planarPosition - reader.position)/(planarPosition - reader.position).magnitude;
			readerInbound = true;
		}
		
		timer = 7;
		
	}
	else
	{
		if(reader == null)
		{
			readerInbound = false;
		}
		
	}
	
}