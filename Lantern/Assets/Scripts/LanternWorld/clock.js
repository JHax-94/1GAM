#pragma strict

var Days : int = 0;
var Weeks : int = 0;
var Months : int = 0;
var Years : int = 0;

var RawTime : float = 0;

function Start()
{
	Days = 0;
	Weeks = 0;
	Months = 0;
	Years = 0;
	RawTime = 0;	
}


function Update () 
{
	RawTime += Time.deltaTime;
	var oldDay = Days;
	Days = Mathf.RoundToInt(RawTime)%7;
	if(Days != oldDay)
	{	
		var transforms = GetComponentsInChildren(Transform);
		
		for(var T : Component in transforms)
		{
			if(T.tag == "Villager")
			{
				T.transform.GetComponent(personality).checkDeath();
			}
		}
		
		GetComponent(worldStats).incrementBook();
		GetComponent(worldStats).incrementArt();	
		
		
		if(oldDay == 6)
		{	
			
			GetComponent(worldStats).incrementEnlight();
			
			Weeks ++;
			
			if(Weeks == 4)
			{
				Weeks = 0;
				Months ++;
				
				if(Months%3 == 0)
				{
					GetComponent(events).seasonalEvent();
				}
				
				if(Months == 12)
				{
					Months = 0;
					Years ++;
					//GetComponent(events).randomEvent();
					RawTime = 0;
					
					
				}
			}
		}
	}
}