#pragma strict

var player1Team : int[];
var player2Team : int[];

var hoverString : String = "";

var player1Count : int = 0;
var player2Count : int = 0;

var playerTurn : int = 1;

var maxChars : int = 1;

var Done : boolean = false;

var menuGUI : GUIStyle;
var characterGUI : GUIStyle;

function chooseCharacter(ID : int)
{
	if(playerTurn == 1)
	{
		player1Team[player1Count] = ID;
		player1Count ++;	
		playerTurn = 2;
	}
	else if(playerTurn == 2)
	{
		player2Team[player2Count] = ID;
		player2Count ++;
		playerTurn = 1;
	}
	
	hoverString = "";
	characterGUI.normal.background = null;
	
}	

function Start () 
{
	player1Team = new int[5];
	player2Team = new int[5];
	
	if(PlayerPrefs.HasKey("pointsToWin") != true)
	{
		Debug.Log("Error loading points to win!");
	}
	else
	{
		maxChars = PlayerPrefs.GetInt("pointsToWin");
	}
	
	for(var i = 0; i < 5; i ++)
	{
		if(PlayerPrefs.HasKey("player1Char"+i) != true)
		{
			PlayerPrefs.SetInt("player1Char"+i, 0);
		}
		
		if(PlayerPrefs.HasKey("player2Char"+i) != true)
		{
			PlayerPrefs.SetInt("player2Char"+i, 0);
		}
	}
	
}

function Update () 
{
	if(Done == true)
	{
		Debug.Log("This is working, at least!");
	
		if(Input.GetKeyDown(KeyCode.Space))
		{
			Debug.Log("HAJIME!!!");
			
			Debug.Log("Max Characters: " + maxChars);
			
			for(var i : int = 0; i < maxChars; i ++)
			{
				Debug.Log("Saving round " + i + "...");
				
				//Debug.Log("Player 1 Char " + i + ": " + player1Team[i]);
				
				PlayerPrefs.SetInt("player1Char"+i.ToString(), player1Team[i]);
				PlayerPrefs.SetInt("player2Char"+i.ToString(), player2Team[i]);
				Debug.Log("Saved!");
			}
			
			PlayerPrefs.Save();
			
			Debug.Log("Save written to file!");
			
			Application.LoadLevel(2);
			
		}
	}
}

function OnGUI()
{
	if(maxChars > player1Count || maxChars > player2Count)
	{
		if(playerTurn == 1)
		{
			GUI.Label(Rect(10, 10, 100, 60), "THE", menuGUI);
			GUI.Label(Rect(60, 40, 200, 60), hoverString, menuGUI); 
			GUI.Box(Rect(Screen.width/4-275, Screen.height/2-200, 400, 540), "", characterGUI); 
			GUI.Box(Rect(Screen.width*3/4-50, Screen.height/2 - 30, 200, 60), "PLAYER 1 CHOOSING", menuGUI);
		}
		else if(playerTurn == 2)
		{
			GUI.Label(Rect(Screen.width/2+120, 10, 100, 60), "THE", menuGUI);
			GUI.Label(Rect(Screen.width - 260, 40, 200, 60), hoverString, menuGUI); 
			GUI.Box(Rect(Screen.width*3/4-100, Screen.height/2-200, 400, 540), "", characterGUI); 
			GUI.Box(Rect(Screen.width/8, Screen.height/2 - 30, 100, 60), "PLAYER 2 CHOOSING", menuGUI);
		}
		
		GUI.Label(Rect(Screen.width/8, Screen.height-60, 100, 60), "Picks left: "+ (maxChars-player1Count).ToString(), menuGUI);
		GUI.Label(Rect(Screen.width*3/4, Screen.height-60, 100, 60), "Picks left: " + (maxChars-player2Count).ToString(), menuGUI);
	}
	else
	{
		GUI.Label(Rect(Screen.width/2-100, Screen.height/2-20, 200, 40), "PRESS SPACE TO BEGIN", menuGUI);
		Done = true;
	}
}