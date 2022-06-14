#pragma strict

var bookPoints : int = 0;
var bookThresh : int = 0;

var bookType : String = "None";

var artPoints : int = 0;
var artThresh : int = 0;

var artType : String = "None";

var totalPop : int; 

var coolDown : float = 0;

var totalStats : int[];
var averageStats : int[];

var enlightenment : int = 0;
var enlightenmentRate : int = 0;
var enlightenmentThresh : int = 0;

var victoryMessage : boolean = false;
var defeatMessage : boolean = false;
var continueGame : boolean = false;

function Awake()
{
	totalStats = new int[6];
	averageStats = new int[6];
	
	
	for(var i : int = 0; i < 6; i ++)
	{
		totalStats[i] = 0;
		averageStats[i] = 0;
	}
}

function villagerDeath(villagerStats : float[])
{
	totalPop --;
	
	for(var i : int = 0; i < 6; i ++)
	{
		villagerStats[i] = -1*villagerStats[i];
	}
	
	updateStats(villagerStats);
	if(totalPop == 0)
	{
		defeatMessage = false;
	}
	
}

function updateStats(newStats : float[])
{
	
	if(totalPop != 0)
	{
		for(var i : int = 0; i < 6; i ++)
		{
			totalStats[i] += newStats[i];
			averageStats[i] = Mathf.RoundToInt(totalStats[i]/totalPop);
		}
	}
}

function artRate()
{
	var rate : int = 0;
	
	rate = averageStats[0];
	
	for(var i : int = 0; i < 6; i ++)
	{
		if(averageStats[i] < rate)
		{
			rate = averageStats[i];
		}
	}
	
	return rate;
}

function Start()
{
	bookThresh = 10;
	artThresh = 10;
	enlightenmentThresh = 10;
}

function resetBookCounter()
{
	bookPoints = 0;
	bookThresh += 10;
}

function incrementBook()
{
	bookPoints += Mathf.Floor(averageStats[3]/5)+1;
	
	if(bookPoints > bookThresh)
	{
		bookPoints = bookThresh;
	}	
}

function isBookSpawnable()
{
	var YN : boolean = false;
	
	if(bookPoints == bookThresh)
	{
		YN = true;
	}
	
	return YN;
}

function resetArtCount()
{
	artPoints = 0;
	artThresh += 10;
}

function incrementArt()
{
	artPoints += artRate();
	
	if(artPoints > artThresh)
	{
		artPoints = artThresh;
	}
}

function isArtSpawnable()
{
	var YN : boolean = false;
	
	if(artPoints == artThresh)
	{
		YN = true;
	}
	
	return YN;	
}

function boostThreshold()
{
	enlightenmentThresh += 10;
	if(enlightenmentThresh > 300)
	{
		enlightenmentThresh = 300;
	}
}

function dropThreshold()
{
	enlightenmentThresh -= 10;
	
	if(enlightenmentThresh < 0)
	{
		enlightenmentThresh = 0;
	}
}

function incrementEnlight()
{
	enlightenment += enlightenmentRate;
	if(enlightenment > enlightenmentThresh)
	{
		enlightenment = enlightenmentThresh;
	}
	
	if(enlightenment == 300)
	{
		enlightenment = 300;
		victoryMessage = true;
	}
}

function setCoolDown()
{
	coolDown = 10;
}	

function Update () 
{
	coolDown -= Time.deltaTime;
	
	if(coolDown < 0)
	{
		coolDown = 0;
	}
}

function OnGUI()
{
	if(victoryMessage == true && continueGame == false)
	{
		Time.timeScale = 0;

		GUI.Box(Rect(Screen.width/2 -200, Screen.height/2 - 30, 400, 60), "Congratulations!\nYou have guided your people to enlightenment!");
		if(GUI.Button(Rect(Screen.width/2-200, Screen.height/2+30, 75, 30), "Continue"))
		{
			Time.timeScale = 1;
			continueGame = true;
		}
		
		if(GUI.Button(Rect(Screen.width/2 +125, Screen.height/2 + 30, 75, 30), "End Game"))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
		}
	}
	
	if(totalPop == 0)
	{
		Time.timeScale = 0;
		
		
		GUI.Box(Rect(Screen.width/2 - 100, Screen.height/2 - 50, 200, 100), "Game Over");
		
		GUI.Label(Rect(Screen.width/2 -90, Screen.height/2-15, 180, 25), "Oh dear tut tut pity there there.");
		
		if(GUI.Button(Rect(Screen.width/2-50, Screen.height/2+50, 100, 50), "Back to Menu"))
		{
			Time.timeScale = 1;
		
			Application.LoadLevel(0);
		}
		
	}

}