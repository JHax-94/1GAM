#pragma strict

var siteType : String;
var siteEdge : int;

var builders : int = 0;
var buildersCalled : int = 0;
var maxBuilders : int;

var faceScript : faceInfo;
var cubeScript : cubeInfo;

var Delay : float = 0;

function addBuilder()
{
	builders ++;
}

function Dismantle()
{
	Destroy(gameObject);
}

function Initialise()
{
	faceScript = transform.parent.GetComponent(faceInfo);
	cubeScript = transform.parent.parent.GetComponent(cubeInfo);
}

function callBuilders()
{

	//var faceInfo = transform.parent.GetComponent(faceInfo);
	
	/*var	builders = new Transform[cubeInfo.villagerCount];
	builders = cubeInfo.getVillagers(cubeInfo.Vectorify(transform.parent.name));*/
	
	//Debug.Log("Array size: " + potentialMates.length);
		
	var Builder = faceScript.closestVillager(/*builders,*/ transform.position);
	if(Builder.tag == "Villager")
	{
		var builderScript = Builder.GetComponent(personality);
		
		if(cubeScript.cubeType == "Land")
		{
			builderScript.giveTask("GoToSite", transform.position);
			buildersCalled ++;
		}
		else
		{
			var dist = (transform.position - Builder.position).magnitude;
				
			if(dist < 4)
			{
				
				builderScript.giveTask("GoToSite", transform.position);
				buildersCalled ++;
			}	
		}
	}	
}


/*

function Start()
{
	callBuilders();
}
*/
function FixedUpdate()
{
	

	Delay -= Time.fixedDeltaTime;
	
	if(Delay < 0)
	{
		if(siteType == "bridge")
		{
			if(faceScript.bridges[siteEdge] == true)
			{
				faceScript.siteCount --;
				Destroy(gameObject);
			}
		}
	
		Delay = 10f;
		if(buildersCalled < maxBuilders)
		{
			Debug.Log("Calling Villagers");
			callBuilders();
		}
	}

	
	
	if(builders == maxBuilders)
	{
		Debug.Log("Construction parent: " + transform.parent.name);
			
		transform.parent.GetComponent(spawnScript).transmogrify(transform, siteType, siteEdge);		
		//Destroy(gameObject);
	}
	
}