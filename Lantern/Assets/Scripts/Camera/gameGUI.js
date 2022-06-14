#pragma strict

var bookGridStrings : String[] = ["Aggression", "Amorousness", "Charisma", "Curiosity", "Industriousness", "Organisation"];
var bookGridInt : int = 0;

var artGridStrings : String[] = ["Technology", "Culture", "Politics"];
var artGridInt : int = 0;

var spiritGridStrings : String[] = ["Love", "Wanderlust", "Peace"];
var spiritGridInt : int = 0;

var customGUI : GUIStyle;
var lineStyle : GUIStyle;

var BookTifactMenu : boolean = false;
var Pause : boolean = false;
var averageStats : int[] = [0, 0, 0, 0, 0, 0];



function Update()
{
	if(Input.GetKeyDown(KeyCode.Space))
	{
		if(BookTifactMenu == true)
		{
			BookTifactMenu = false;
		}	
		else
		{
			BookTifactMenu = true;
		}
	}
	
	if(Pause == false)
	{
		if(Input.GetKeyDown(KeyCode.P) || Input.GetKeyDown(KeyCode.Escape))
		{	
			Pause = true;
			Time.timeScale = 0;
		}
	}
	else
	{
		if(Input.GetKeyDown(KeyCode.P))
		{
			Pause = false;
			Time.timeScale = 1;
		}
		else if(Input.GetKeyDown(KeyCode.Escape))
		{
			Time.timeScale = 1;
			Application.LoadLevel(0);
		}
	}
}

function OnGUI()
{
	var statScript = GameObject.FindGameObjectWithTag("Lantern").GetComponent(worldStats);

	GUI.Box(Rect(0, 0, Screen.width, 20), "", customGUI);
	
	GUI.Label(Rect(15, 2, 100, 15), "Book: " + statScript.bookPoints, customGUI);
	GUI.Label(Rect(115, 2, 100, 15), "/" + statScript.bookThresh, customGUI);
	
	GUI.Label(Rect(215, 2, 100, 15), "Artifact: " + statScript.artPoints, customGUI);
	GUI.Label(Rect(315, 2, 100, 15), "/" + statScript.artThresh, customGUI);
	
	GUI.Label(Rect(550, 2, 100, 15), "Enlightenment: " + statScript.enlightenment, customGUI);
	
	GUI.Label(Rect(700, 2, 100, 15), "/300", customGUI);
	
	if(statScript.coolDown > 0)
	{
		var chillBro : float = (Mathf.Round((statScript.coolDown)*100))/100;
	
		GUI.Label(Rect(15, 20, 100, 25), "Cooldown: " + chillBro);
	}
	
	if(BookTifactMenu == true)
	{	
		averageStats = statScript.averageStats;
	
		GUI.Box(Rect(25, Screen.height- 125, Screen.width-50, 200), "");
		
		for(var i : int = 0; i < 6; i ++)
		{
			GUI.Label(Rect(Screen.width/3*(i%3)+40,Screen.height - 122+15*Mathf.FloorToInt(i/3) , 100, 30), bookGridStrings[i] + ": ");
			GUI.Label(Rect(Screen.width/3*(i%3) + 140, Screen.height - 122+15*Mathf.FloorToInt(i/3), 100, 30), averageStats[i].ToString());
		}
		
		GUI.Label(Rect(35, Screen.height-86, Screen.width -70, 2), " ", lineStyle);
		GUI.Label(Rect(Screen.width/2-13, Screen.height-82, 2, 78), " ", lineStyle);
		//GUI.Label(Rect(Screen.width/2-10, Screen.height - 42, Screen.width/2-20, 1), " ", lineStyle);
		
		GUI.Label(Rect(40, Screen.height-85, 200, 30), "Book: " + statScript.bookType);
		
		
		GUI.Label(Rect(Screen.width/2, Screen.height-85, 200, 30), "Artifact: " + statScript.artType); 
		
		//GUI.Label(Rect(Screen.width/2, Screen.height-45, 200, 30), "Spirit:");
		
		/*GUI.Button(Rect(Screen.width/2-5, Screen.height - 25, 100, 20), "Love");
		GUI.Button(Rect(Screen.width/2+120, Screen.height - 25, 100, 20), "Wanderlust");
		GUI.Button(Rect(Screen.width/2+245, Screen.height - 25, 100, 20), "Peace");*/
		
		bookGridInt = GUI.SelectionGrid(Rect(35, Screen.height - 65, Screen.width/2-55, 60), bookGridInt, bookGridStrings, 3);
		statScript.bookType = bookGridStrings[bookGridInt];
		
		artGridInt = GUI.SelectionGrid(Rect(Screen.width/2 - 5, Screen.height -65, Screen.width/2-30, 60), artGridInt, artGridStrings, 3);
		statScript.artType = artGridStrings[artGridInt];
		
		//spiritGridInt = GUI.SelectionGrid(Rect(Screen.width/2 - 5, Screen.height - 27, 390, 22), spiritGridInt, spiritGridStrings, 3);
		
	}
	
	if(Pause == true)
	{
		GUI.Box(Rect(Screen.width/2 - 150, Screen.height/2 - 50, 300, 100), "Paused");
		GUI.Label(Rect(Screen.width/2 - 140, Screen.height/2 - 20, 280, 120), "Press P to resume.\nPress Escape to return to Main Menu (progress will be lost).");
	}
	

	
	
	
}