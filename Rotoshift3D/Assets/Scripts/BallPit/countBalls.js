#pragma strict

var Balls : int;
var totalTime : float;

function Update () 
{
	Balls = transform.childCount;	
	
	if(Balls == 0)
	{
		
		Time.timeScale = 0;
		
		if(Input.anyKey || Input.GetMouseButton(0) || Input.GetMouseButton(1) || Input.GetMouseButton(2))
		{
			var scoringScript : scoreControl;
			scoringScript = GetComponent(scoreControl);
			
			scoringScript.setHighScore((Application.loadedLevel-1), totalTime);
			
			Application.LoadLevel(0);
			Time.timeScale = 1;
		}
		
		
	}
	
}

function OnGUI()
{
	if(Balls == 0)
	{
		totalTime = Time.timeSinceLevelLoad;
		totalTime = Mathf.Floor(totalTime * 10)/10;
		
		GUI.Box(Rect(Screen.width/2 - 100, Screen.height/2 - 43, 200, 86), "\nVictory in " + totalTime + " seconds!\n\nPress any key to continue...");	
	}
}